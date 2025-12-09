import Link from "next/link";

export default function BlogPage() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-4 text-center">
      <h1 className="text-5xl font-extrabold mb-8 bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
        Parabéns, você agora tem acesso a esse resource!
      </h1>
      <div className="flex justify-center mb-8">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/yH2vcwd5aiw"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="rounded-lg shadow-lg"
        ></iframe>
      </div>
    </main>
  );
}
