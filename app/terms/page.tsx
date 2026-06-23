import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/sub-chrome";

export const metadata: Metadata = {
  title: "Terms · Decrypt",
  description: "The terms for using the Decrypt site and working with the studio.",
};

export default function TermsPage() {
  return (
    <LegalPage kicker="TERMS" title="Terms" updated="Last updated June 2026">
      <LegalSection heading="Using this site">
        <p>
          This site exists to tell you what Decrypt does and to let you reach us. You are
          welcome to read it, share it, and send us a brief. Do not try to break it, scrape it
          at scale, or use it to do harm. That is the whole rule for the site itself.
        </p>
      </LegalSection>

      <LegalSection heading="What a brief is, and is not">
        <p>
          Sending a brief starts a conversation. It does not create a contract and it does not
          oblige either side to anything. We will read it and reply. If we decide to work
          together, the real terms live in a separate agreement we both sign before any work
          starts.
        </p>
      </LegalSection>

      <LegalSection heading="Our work and your work">
        <p>
          Anything we publish on this site, the words, the design, the code, and the brand, is
          ours. Anything you send us stays yours. By sending it you give us permission to read
          it and use it to respond and to scope the work, and nothing more.
        </p>
      </LegalSection>

      <LegalSection heading="No guarantees on this page">
        <p>
          The figures and sample work shown here are illustrative. We keep the site accurate,
          but we do not promise it is free of every error, and we may change or remove parts
          of it at any time. Estimates like a fixed-price starter package describe how we
          usually work, not a binding promise outside a signed agreement.
        </p>
      </LegalSection>

      <LegalSection heading="Liability">
        <p>
          We provide this site as is. To the extent the law allows, we are not liable for any
          loss that comes from using it. Where a project is involved, the signed agreement for
          that project sets out the liability terms that apply.
        </p>
      </LegalSection>

      <LegalSection heading="Changes">
        <p>
          We may update these terms. When we do, we change the date at the top. If you keep
          using the site after a change, you accept the new version.
        </p>
      </LegalSection>

      <LegalSection heading="Reaching us">
        <p>
          Questions about these terms go through the brief form on the home page. A real
          person on our team will get back to you.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
