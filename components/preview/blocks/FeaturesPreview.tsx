import React from "react";

interface FeatureItem {
  title: string;
  description: string;
}

interface FeaturesPreviewProps {
  content: {
    sectionTitle?: string;
    features?: FeatureItem[];
  };
}

export const FeaturesPreview: React.FC<FeaturesPreviewProps> = ({ content }) => {
  const {
    sectionTitle = "Our Core Features",
    features = [
      { title: "Instant Live Preview", description: "See all edits instantly reflected in the right pane." },
      { title: "Reusable Component Structure", description: "Easily maintainable, modular landing page building blocks." }
    ]
  } = content;

  return (
    <section className="bg-zinc-50 dark:bg-zinc-900/40 py-20 px-8 sm:px-12 border-y border-zinc-100 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-zinc-900 dark:text-white tracking-tight mb-12">
          {sectionTitle}
        </h2>
        
        {features.length === 0 ? (
          <div className="text-center text-zinc-400 dark:text-zinc-500 py-6 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
            No features added yet. Use the editor to add feature cards.
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-850 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 shadow-sm shadow-zinc-100/50 dark:shadow-none hover:shadow-md hover:border-indigo-500/35 dark:hover:border-indigo-500/35 transition-all duration-300 group"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold text-lg mb-5 group-hover:scale-105 transition-transform duration-200">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-semibold text-zinc-950 dark:text-zinc-100 mb-2.5">
                  {feature.title}
                </h3>
                <p className="text-zinc-650 dark:text-zinc-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
