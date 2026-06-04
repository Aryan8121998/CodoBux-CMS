import { CMSBlock } from "./types";

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  data?: CMSBlock[];
}

export function validateCMSBlocks(input: any): ValidationResult {
  if (!input) {
    return { isValid: false, error: "Input is empty or null." };
  }

  let blocks: any;
  if (typeof input === "string") {
    try {
      blocks = JSON.parse(input);
    } catch (e) {
      return { isValid: false, error: "Invalid JSON format." };
    }
  } else {
    blocks = input;
  }

  if (!Array.isArray(blocks)) {
    return { isValid: false, error: "Root configuration must be an array of blocks." };
  }

  const validTypes = ["hero", "features", "testimonials", "cta"];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    
    if (typeof block !== "object" || block === null) {
      return { isValid: false, error: `Block at index ${i} is not a valid object.` };
    }

    if (typeof block.id !== "string" || !block.id.trim()) {
      return { isValid: false, error: `Block at index ${i} is missing a valid 'id' string.` };
    }

    if (!validTypes.includes(block.type)) {
      return { 
        isValid: false, 
        error: `Block at index ${i} has an invalid type '${block.type}'. Must be one of: ${validTypes.join(", ")}` 
      };
    }

    if (typeof block.content !== "object" || block.content === null) {
      return { isValid: false, error: `Block at index ${i} ('${block.type}') must contain a 'content' object.` };
    }

    // Individual block validation and fallback repair if needed
    const { type, content } = block;
    if (type === "hero") {
      if (typeof content.title !== "string") content.title = "Hero Title";
      if (typeof content.subtitle !== "string") content.subtitle = "";
      if (typeof content.buttonText !== "string") content.buttonText = "Click Here";
      if (typeof content.buttonLink !== "string") content.buttonLink = "#";
      if (typeof content.bgGradient !== "string") content.bgGradient = "from-indigo-600 to-violet-800";
    } else if (type === "features") {
      if (typeof content.sectionTitle !== "string") content.sectionTitle = "Our Features";
      if (!Array.isArray(content.features)) {
        content.features = [];
      } else {
        for (const item of content.features) {
          if (typeof item !== "object" || item === null) {
            return { isValid: false, error: "Features items must be valid objects." };
          }
          if (typeof item.title !== "string") item.title = "Feature Title";
          if (typeof item.description !== "string") item.description = "Feature Description";
        }
      }
    } else if (type === "testimonials") {
      if (typeof content.sectionTitle !== "string") content.sectionTitle = "Testimonials";
      if (typeof content.quote !== "string") content.quote = "Wonderful quote here.";
      if (typeof content.authorName !== "string") content.authorName = "Unknown Author";
      if (typeof content.authorRole !== "string") content.authorRole = "";
    } else if (type === "cta") {
      if (typeof content.heading !== "string") content.heading = "Call to Action";
      if (typeof content.buttonText !== "string") content.buttonText = "Action Button";
      if (typeof content.buttonLink !== "string") content.buttonLink = "#";
      if (typeof content.bgGradient !== "string") content.bgGradient = "from-zinc-900 to-black";
    }
  }

  return { isValid: true, data: blocks as CMSBlock[] };
}
