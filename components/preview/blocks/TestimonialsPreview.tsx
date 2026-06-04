import React from "react";

interface TestimonialsPreviewProps {
  content: {
    sectionTitle?: string;
    quote?: string;
    authorName?: string;
    authorRole?: string;
  };
}

export const TestimonialsPreview: React.FC<TestimonialsPreviewProps> = ({ content }) => {
  const {
    sectionTitle = "What People Say",
    quote = "This CMS was incredibly easy to use. The instant preview and undo/redo buttons made designing our page a breeze!",
    authorName = "Jane Doe",
    authorRole = "Founder, TechStart"
  } = content;

  return (
    <section className="bg-white dark:bg-black py-20 px-8 sm:px-12 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8 relative z-10">
        {sectionTitle && (
          <h2 className="text-sm font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
            {sectionTitle}
          </h2>
        )}
        
        {/* Large Decorative Quotation Mark */}
        <span className="text-8xl font-serif text-indigo-200 dark:text-indigo-950/40 select-none leading-none absolute -top-4 left-4 sm:left-12 -z-10">
          “
        </span>

        <blockquote className="text-xl sm:text-2xl font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed italic max-w-3xl">
          “{quote}”
        </blockquote>

        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-pink-500 flex items-center justify-center text-white font-bold text-lg mb-3 shadow-md">
            {authorName ? authorName.charAt(0).toUpperCase() : "?"}
          </div>
          <cite className="not-italic">
            <span className="block text-base font-semibold text-zinc-900 dark:text-white">
              {authorName}
            </span>
            {authorRole && (
              <span className="block text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                {authorRole}
              </span>
            )}
          </cite>
        </div>
      </div>
    </section>
  );
};
