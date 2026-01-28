import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden w-full max-w-full">
        <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-slate-100">Blog</h1>
            <p className="text-slate-300/90 leading-relaxed">
              Hier erscheinen später automatisch erstellte Beiträge.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}


