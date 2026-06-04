import React from "react";

interface HeroPreviewProps {
  content: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
    bgGradient?: string;
  };
}

export const HeroPreview: React.FC<HeroPreviewProps> = ({ content }) => {
  const {
    title = "Build Landing Pages Instantly",
    subtitle = "A fully customizable CMS block editor powered by Next.js and Context API.",
    buttonText = "Get Started Free",
    buttonLink = "#",
    bgGradient = "from-indigo-600 to-violet-850"
  } = content;

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br ${bgGradient} text-white py-20 px-8 sm:py-32 sm:px-12`}>
      {/* Decorative background circles */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-96 h-96 rounded-full bg-pink-500/10 blur-3xl pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center gap-6 z-10">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl animate-fade-in">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl font-light leading-relaxed">
            {subtitle}
          </p>
        )}
        <div className="mt-4">
          <a
            href={buttonLink}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-zinc-900 font-semibold shadow-lg shadow-black/10 hover:bg-zinc-100 hover:scale-102 active:scale-98 transition-all duration-200"
          >
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  );
};
