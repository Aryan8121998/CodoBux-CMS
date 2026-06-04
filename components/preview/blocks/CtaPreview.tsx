import React from "react";

interface CtaPreviewProps {
  content: {
    heading?: string;
    buttonText?: string;
    buttonLink?: string;
    bgGradient?: string;
  };
}

export const CtaPreview: React.FC<CtaPreviewProps> = ({ content }) => {
  const {
    heading = "Ready to launch your product?",
    buttonText = "Start Building Now",
    buttonLink = "#",
    bgGradient = "from-zinc-900 to-black"
  } = content;

  return (
    <section className="py-12 px-6 sm:py-20 sm:px-12 bg-zinc-50 dark:bg-zinc-950">
      <div className={`max-w-5xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-r ${bgGradient} text-white shadow-xl shadow-zinc-200/50 dark:shadow-none p-10 sm:p-16 relative group`}>
        {/* Abstract glowing effect */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 blur-2xl group-hover:scale-110 transition-transform duration-700 pointer-events-none"></div>

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight max-w-xl text-center md:text-left">
            {heading}
          </h2>
          <div className="flex-shrink-0">
            <a
              href={buttonLink}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-zinc-900 font-bold hover:bg-zinc-100 hover:shadow-lg active:scale-98 transition-all duration-200"
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
