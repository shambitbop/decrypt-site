import { PageContent } from "./page-content";

// Skip static generation to avoid window is not defined errors during build
export const dynamic = "force-dynamic";

export default function Home() {
  return <PageContent />;
}
