import { CMSBlock } from "./types";

export interface Template {
  name: string;
  description: string;
  blocks: CMSBlock[];
}

export const PRESET_TEMPLATES: Record<string, Template> = {
  saas: {
    name: "SaaS Launchpad",
    description: "Ideal for tech products, SaaS applications, and modern software landing pages.",
    blocks: [
      {
        id: "saas-hero",
        type: "hero",
        content: {
          title: "The Ultimate Platform for Collaborative Code",
          subtitle: "Streamline your engineering team's workflow, eliminate friction, and ship products twice as fast with real-time AI assistance.",
          buttonText: "Start 14-Day Free Trial",
          buttonLink: "#pricing",
          bgGradient: "from-indigo-600 via-purple-600 to-pink-600"
        }
      },
      {
        id: "saas-features",
        type: "features",
        content: {
          sectionTitle: "Features designed for scale",
          features: [
            {
              title: "Lightning-Fast Execution",
              description: "Optimized server rendering and static caching guarantee page loads under 100ms globally."
            },
            {
              title: "AI-Powered Autocomplete",
              description: "Intelligent code generation that understands your codebase patterns, conventions, and state architectures."
            },
            {
              title: "Collaborative Workspace",
              description: "Share live preview environments instantly with teammates, designers, and clients with one click."
            }
          ]
        }
      },
      {
        id: "saas-testimonials",
        type: "testimonials",
        content: {
          sectionTitle: "Trusted by Engineering Leaders",
          quote: "Using this landing page generator has transformed how we launch new features. We can spin up high-converting marketing pages in minutes rather than days.",
          authorName: "Sarah Jenkins",
          authorRole: "VP of Engineering at CloudSync"
        }
      },
      {
        id: "saas-cta",
        type: "cta",
        content: {
          heading: "Ready to accelerate your product development?",
          buttonText: "Create Account Now",
          buttonLink: "#register",
          bgGradient: "from-zinc-900 via-slate-800 to-zinc-950"
        }
      }
    ]
  },
  portfolio: {
    name: "Designer Portfolio",
    description: "A minimal, visual-first layout optimized for showcasing creative work and skills.",
    blocks: [
      {
        id: "port-hero",
        type: "hero",
        content: {
          title: "Designing Digital Experiences that Matter",
          subtitle: "I'm a UI/UX Designer & Frontend Engineer creating beautiful, functional, and accessible web interfaces.",
          buttonText: "View Case Studies",
          buttonLink: "#work",
          bgGradient: "from-emerald-500 to-teal-700"
        }
      },
      {
        id: "port-features",
        type: "features",
        content: {
          sectionTitle: "My Core Competencies",
          features: [
            {
              title: "Interface Design",
              description: "High-fidelity mockups, design systems, and responsive interactive web layouts."
            },
            {
              title: "React & Next.js",
              description: "Writing component-driven frontend architectures with clean, modern, and accessible code."
            },
            {
              title: "User Research",
              description: "Conducting user testing, interviews, and analytics reviews to design informed customer journeys."
            }
          ]
        }
      },
      {
        id: "port-testimonials",
        type: "testimonials",
        content: {
          sectionTitle: "What Clients Say",
          quote: "He delivered exceptional design fidelity and followed through with performant Next.js code. The project was completed ahead of schedule and blew our expectations away.",
          authorName: "Marcus Thorne",
          authorRole: "Director of Product, CreativeFlow"
        }
      },
      {
        id: "port-cta",
        type: "cta",
        content: {
          heading: "Let's collaborate on your next digital product",
          buttonText: "Schedule a Call",
          buttonLink: "#contact",
          bgGradient: "from-teal-900 to-zinc-950"
        }
      }
    ]
  },
  agency: {
    name: "Agency Showroom",
    description: "Bold styling tailored for digital agencies, marketing groups, and creative studios.",
    blocks: [
      {
        id: "agency-hero",
        type: "hero",
        content: {
          title: "We craft digital excellence",
          subtitle: "We partner with ambitious brands to construct web applications that command attention and drive exponential growth.",
          buttonText: "Explore Services",
          buttonLink: "#services",
          bgGradient: "from-orange-500 via-rose-500 to-red-600"
        }
      },
      {
        id: "agency-features",
        type: "features",
        content: {
          sectionTitle: "How we help your brand grow",
          features: [
            {
              title: "Brand Strategy",
              description: "Positioning your business for modern digital landscapes through deep research and bold statements."
            },
            {
              title: "Full-Stack Development",
              description: "Web apps built on Next.js, Server Components, and optimized serverless databases."
            },
            {
              title: "Conversion Optimization",
              description: "Funnel audits, rapid A/B testing, and heat-map designs to maximize marketing efficiency."
            }
          ]
        }
      },
      {
        id: "agency-testimonials",
        type: "testimonials",
        content: {
          sectionTitle: "Client Success Stories",
          quote: "Their team combined state-of-the-art UI engineering with a solid marketing strategy. Our conversion rate increased by 140% in the first month following the redesign.",
          authorName: "Elena Rostova",
          authorRole: "Chief Marketing Officer, FinTech Corp"
        }
      },
      {
        id: "agency-cta",
        type: "cta",
        content: {
          heading: "Let's build something remarkable together",
          buttonText: "Get Free Audit",
          buttonLink: "#audit",
          bgGradient: "from-zinc-950 via-red-950 to-zinc-900"
        }
      }
    ]
  }
};
