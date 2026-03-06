"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import { extractReplyText } from "@/lib/chatbot-response";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const createMarkdownComponents = (variant: "user" | "bot"): Components => ({
  p(props) {
    return (
      <p
        {...props}
        className="mb-2 whitespace-pre-wrap leading-relaxed last:mb-0"
      />
    );
  },
  a(props) {
    return (
      <a
        {...props}
        target="_blank"
        rel="noreferrer"
        className={`underline decoration-dotted ${
          variant === "user"
            ? "text-blue-200 hover:text-blue-100"
            : "text-blue-600 hover:text-blue-500 dark:text-blue-300"
        }`}
      />
    );
  },
  img(props) {
    const { alt, ...rest } = props;
    const resolvedAlt =
      typeof alt === "string" && alt.trim().length > 0
        ? alt
        : "Externer Bildinhalt";
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...rest}
        alt={resolvedAlt}
        loading="lazy"
        className="mt-2 max-h-48 w-full rounded-md border border-zinc-200 object-contain dark:border-zinc-700"
      />
    );
  },
  ul(props) {
    return <ul {...props} className="mb-2 list-disc space-y-1 pl-4 last:mb-0" />;
  },
  ol(props) {
    return <ol {...props} className="mb-2 list-decimal space-y-1 pl-4 last:mb-0" />;
  },
  li(props) {
    return <li {...props} className="leading-relaxed" />;
  },
});

export default function Chatbot() {
  const CHATBOT_NAME = "Chorwi der FAQ Chatbot";
  const webhookUrl =
    process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ??
    "https://n8n.chorai.de/webhook/chatbot";
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      text: "Mit dem Versenden deiner Nachricht erklärst du dich mit den Regelungen unserer [Datenschutzerklärung](/datenschutz) einverstanden.",
      sender: "bot",
      timestamp: new Date(),
    },
    {
      id: "1",
      text: "Hallo! Wie kann ich dir helfen?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const promptTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const promptAutoHideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setShowPrompt(false);
      if (promptTimeoutRef.current) {
        clearTimeout(promptTimeoutRef.current);
        promptTimeoutRef.current = null;
      }
      if (promptAutoHideTimeoutRef.current) {
        clearTimeout(promptAutoHideTimeoutRef.current);
        promptAutoHideTimeoutRef.current = null;
      }
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    const hasSeenPrompt = window.sessionStorage.getItem("chat_prompt_seen");
    if (hasSeenPrompt === "true") {
      return;
    }

    promptTimeoutRef.current = setTimeout(() => {
      setShowPrompt(true);
      window.sessionStorage.setItem("chat_prompt_seen", "true");

      promptAutoHideTimeoutRef.current = setTimeout(() => {
        setShowPrompt(false);
      }, 10000);
    }, 30000);

    return () => {
      if (promptTimeoutRef.current) {
        clearTimeout(promptTimeoutRef.current);
        promptTimeoutRef.current = null;
      }
      if (promptAutoHideTimeoutRef.current) {
        clearTimeout(promptAutoHideTimeoutRef.current);
        promptAutoHideTimeoutRef.current = null;
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const STORAGE_KEY = "chatbot-session-id";
    const existingId = window.localStorage.getItem(STORAGE_KEY);

    if (existingId) {
      setSessionId(existingId);
      return;
    }

    const uuid =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `session-${Date.now()}-${Math.random().toString(16).slice(2)}`;

    window.localStorage.setItem(STORAGE_KEY, uuid);
    setSessionId(uuid);
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !sessionId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const metadata = {
        url:
          typeof window !== "undefined" ? window.location.pathname : undefined,
        userAgent:
          typeof navigator !== "undefined" ? navigator.userAgent : undefined,
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.text,
          sessionId,
          metadata,
        }),
      });

      // #region agent log
      const outboundLog = {
        sessionId: "debug-session",
        runId: "run2",
        hypothesisId: "H5",
        location: "components/Chatbot.tsx:sendMessage",
        message: "Sending request to webhook",
        data: {
          hasSessionId: !!sessionId,
          messageLength: userMessage.text.length,
          webhookUrl,
        },
        timestamp: Date.now(),
      };
      fetch("http://localhost:7242/ingest/cde80c10-4bbf-49dd-9871-235c903f9938", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(outboundLog),
      }).catch(() => {});
      fetch("/api/_debug-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(outboundLog),
      }).catch(() => {});
      // #endregion

      if (!response.ok) {
        throw new Error(`Webhook responded with ${response.status}`);
      }

      // #region agent log
      const statusLog = {
        sessionId: "debug-session",
        runId: "run2",
        hypothesisId: "H6",
        location: "components/Chatbot.tsx:sendMessage",
        message: "Webhook response status",
        data: { status: response.status },
        timestamp: Date.now(),
      };
      fetch("http://localhost:7242/ingest/cde80c10-4bbf-49dd-9871-235c903f9938", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(statusLog),
      }).catch(() => {});
      fetch("/api/_debug-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(statusLog),
      }).catch(() => {});
      // #endregion

      const data = await response.json();
      const botText =
        extractReplyText(data) ||
        "Entschuldigung, ich konnte keine Antwort generieren.";

      // #region agent log
      fetch("http://localhost:7242/ingest/cde80c10-4bbf-49dd-9871-235c903f9938", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: "debug-session",
          runId: "run2",
          hypothesisId: "H4",
          location: "components/Chatbot.tsx:sendMessage",
          message: "Browser received bot reply",
          data: {
            botTextLength: botText.length,
            hasReply: botText !== "Entschuldigung, ich konnte keine Antwort generieren.",
            topLevelKeys:
              data && typeof data === "object"
                ? Object.keys(data as Record<string, unknown>).slice(0, 6)
                : [],
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      fetch("/api/_debug-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: "debug-session",
          runId: "run2",
          hypothesisId: "H4",
          location: "components/Chatbot.tsx:sendMessage",
          message: "Browser received bot reply",
          data: {
            botTextLength: botText.length,
            hasReply:
              botText !== "Entschuldigung, ich konnte keine Antwort generieren.",
            topLevelKeys:
              data && typeof data === "object"
                ? Object.keys(data as Record<string, unknown>).slice(0, 6)
                : [],
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botText,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Entschuldigung, es ist ein Fehler aufgetreten. Bitte versuche es erneut.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Prompt Bubble */}
      {!isOpen && showPrompt && (
        <div className="fixed bottom-24 right-6 z-50 animate-bounce">
          <div className="relative rounded-2xl bg-white px-4 py-3 text-sm font-medium text-zinc-900 shadow-xl dark:bg-zinc-900 dark:text-white">
            Haben Sie noch Fragen?
            <span className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 rounded-sm bg-white dark:bg-zinc-900"></span>
          </div>
        </div>
      )}

      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all hover:bg-blue-700 hover:scale-110"
          aria-label={`${CHATBOT_NAME} öffnen`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-4 right-4 z-50 flex h-[calc(100vh-2.5rem)] w-[calc(100vw-2rem)] max-h-[calc(100vh-2.5rem)] max-w-md flex-col rounded-lg border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 md:bottom-6 md:right-6 md:h-[600px] md:w-[400px] md:max-h-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <h3 className="font-semibold">{CHATBOT_NAME}</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
              aria-label="Chat schließen"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                  }`}
                >
                  <div className="text-sm [&_strong]:font-semibold">
                    <ReactMarkdown
                      components={createMarkdownComponents(message.sender)}
                    >
                      {message.text}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-lg bg-zinc-100 px-4 py-2 dark:bg-zinc-800">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={sendMessage}
            className="border-t border-zinc-200 p-4 dark:border-zinc-800"
          >
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nachricht eingeben..."
                disabled={isLoading}
                className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim() || !sessionId}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
