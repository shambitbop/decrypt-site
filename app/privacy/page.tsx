import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/sub-chrome";

export const metadata: Metadata = {
  title: "Privacy · Decrypt",
  description: "How Decrypt handles the information you share with us.",
};

export default function PrivacyPage() {
  return (
    <LegalPage kicker="PRIVACY" title="Privacy" updated="Last updated June 2026">
      <LegalSection heading="The short version">
        <p>
          We collect only what we need to reply to you and run our work. We do not sell your
          information, we do not run ad trackers, and we do not add you to a marketing list
          you did not ask for. If you ever want your data removed, ask and we remove it.
        </p>
      </LegalSection>

      <LegalSection heading="What we collect">
        <p>
          When you send a brief or a careers note, we receive what you type into the form,
          your name, your email, anything you paste in, and any file you attach. That is it.
          We do not ask for more than the work requires.
        </p>
      </LegalSection>

      <LegalSection heading="How we use it">
        <p>
          We use what you send to read your request, reply to you, and scope the work. If we
          start a project together, we use it to deliver that project. We do not use it for
          anything else.
        </p>
      </LegalSection>

      <LegalSection heading="Who can see it">
        <p>
          Only the people on our team who need to. To send email we use Resend, a
          transactional email provider, which processes the message on our behalf. We keep
          the list of tools we rely on short and we vet the ones that touch your data.
        </p>
      </LegalSection>

      <LegalSection heading="How long we keep it">
        <p>
          We keep inquiries for as long as the conversation is useful, then we clear them. If
          we work together, we keep project records for as long as we are required to. You
          can ask us to delete your information at any time.
        </p>
      </LegalSection>

      <LegalSection heading="Your choices">
        <p>
          You can ask to see what we hold, correct it, or have it deleted. Send the request
          through the brief form on the home page and a real person will handle it.
        </p>
      </LegalSection>

      <LegalSection heading="Changes">
        <p>
          If we change how we handle your information, we update this page and change the date
          at the top. Continuing to use the site after a change means you accept the update.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
