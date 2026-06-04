export interface CMSBlock {
  id: string;
  type: 'hero' | 'features' | 'testimonials' | 'cta';
  content: {
    // Hero
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
    bgGradient?: string;

    // Features
    sectionTitle?: string;
    features?: Array<{
      title: string;
      description: string;
    }>;

    // Testimonials
    quote?: string;
    authorName?: string;
    authorRole?: string;

    // CTA
    heading?: string;
  };
}
