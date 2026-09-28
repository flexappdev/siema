import siemaDailyIndex from "./siema-index.json";

export type GenerationStatus = "published" | "draft" | "rejected";

export interface SiemaGeneration {
  id: string;
  slug: string;
  title: string;
  status: GenerationStatus;
  imageUrl?: string;
  generatedAt?: string;
  sourcePublisher?: string;
  sourceUrl?: string;
  note?: string;
  tt?: {
    hook: string;
    caption: string;
    hashtags: string[];
    cta: string;
  };
}

const published: SiemaGeneration[] = siemaDailyIndex.paintings.map((p) => ({
  id: p.id,
  slug: p.slug,
  title: p.title,
  status: "published",
  imageUrl: p.s3Key,
  generatedAt: p.generatedAt,
  sourcePublisher: p.sourcePublisher,
  sourceUrl: p.sourceUrl,
  tt: {
    hook: p.title,
    caption: p.description,
    hashtags: p.tags.map((tag) => `#${tag.replace(/[^a-z0-9]/gi, "")}`).filter(Boolean),
    cta: "Follow Siema for one AI story a day.",
  },
}));

// Chat-only generations are intentionally not fabricated here. Future SIEMA runs
// should append every generated binary + metadata to this archive before QA/publish.
export const SIEMA_GENERATIONS: SiemaGeneration[] = published;
