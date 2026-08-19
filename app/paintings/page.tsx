import { PAINTINGS } from "@/lib/paintings";
import { PaintingsIndex } from "@/components/PaintingsIndex";

export const metadata = {
  title: "Index — All Paintings · SIEMA",
  description: "Full index of every SIEMA sketch painting with title, slug, year, medium, dimensions, tags, and S3 key.",
};

export default function PaintingsIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  return <PaintingsIndex paintings={PAINTINGS} searchParams={searchParams} />;
}
