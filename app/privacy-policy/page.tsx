import Link from "next/link"
import Footer from "@/components/footer"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy — Peak Study AI</h1>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground">
              Effective date: 2025-10-13
            </p>

            <hr className="my-6 border-border" />

            <h2>1. Introduction</h2>
            <p>
              Peak Study AI ("we", "our", or "the App") provides tools to convert audio, video, PDF, and text into study materials (summaries, quizzes, flashcards) and to interact with an AI study assistant. This Privacy Policy explains what information we collect, how we use it, how we share it, and the choices you have.
            </p>

            <hr className="my-6 border-border" />

            <h2>2. Data We Collect</h2>
            <p>
              We collect the following categories of information:
            </p>

            <h3>a) Account &amp; Authentication</h3>
            <ul>
              <li><strong>What:</strong> Email and basic profile info obtained when you sign in with third-party authentication (e.g., Google Sign-In).</li>
              <li><strong>Why:</strong> To authenticate you and manage your account.</li>
              <li><strong>Notes:</strong> You may delete your account from within the app.</li>
            </ul>

            <h3>b) User-Provided Inputs</h3>
            <ul>
              <li><strong>What:</strong> The audio, text, PDF, or video files you upload or record, and the raw text you paste into the app (the "Inputs").</li>
              <li><strong>Why:</strong> To process and generate study materials and provide the chat/AI experience.</li>
              <li><strong>Retention:</strong> Generated outputs based on these inputs may be stored per your account; raw prompts are not stored persistently (see below).</li>
            </ul>

            <h3>c) Generated Content &amp; Transcripts</h3>
            <ul>
              <li><strong>What:</strong> Transcriptions (from Whisper or equivalent), AI-generated study content (summaries, quizzes, flashcards), and metadata about those generated items.</li>
              <li><strong>Why:</strong> To let you access, edit, and reuse generated study materials.</li>
              <li><strong>Retention:</strong> Stored tied to your account until you delete them or your account.</li>
            </ul>

            <h3>d) App Usage &amp; Analytics</h3>
            <ul>
              <li><strong>What:</strong> Usage metrics, crash reports, and diagnostic data.</li>
              <li><strong>Why:</strong> To improve the app, fix bugs, and analyze feature usage.</li>
              <li><strong>Note:</strong> Currently limited during beta; we may expand analytics in future releases (you will be informed).</li>
            </ul>

            <h3>e) Payment &amp; Billing</h3>
            <ul>
              <li><strong>What:</strong> Transaction records and billing identifiers required by payment processors when you purchase a membership.</li>
              <li><strong>Why:</strong> To manage subscriptions and payments.</li>
              <li><strong>Note:</strong> Payments are handled by platform billing (Google Play / Apple). We do not store full card details.</li>
            </ul>

            <hr className="my-6 border-border" />

            <h2>3. How We Use Your Data</h2>
            <p>
              We use data to:
            </p>
            <ul>
              <li>Authenticate and manage your account.</li>
              <li>Process Inputs to produce transcripts and study materials.</li>
              <li>Provide the AI chat experience (the chat uses an external LLM).</li>
              <li>Persist generated outputs so you can access them later.</li>
              <li>Operate, maintain, and improve the service.</li>
              <li>Handle billing and subscriptions.</li>
              <li>Communicate important updates, e.g., policy or feature changes.</li>
            </ul>

            <hr className="my-6 border-border" />

            <h2>4. AI &amp; Third-Party Models</h2>
            <p>
              We use third-party models and services to perform certain tasks:
            </p>
            <ul>
              <li>Transcription: Automatic speech-to-text (e.g., Whisper or equivalent).</li>
              <li>AI chat / content generation: Large language models (e.g., Gemini or equivalent).</li>
            </ul>
            <p>
              These services process the Inputs to produce outputs. We do not store raw prompts long-term; however, generated outputs (summaries, quizzes, flashcards) may be saved to your account.
            </p>

            <hr className="my-6 border-border" />

            <h2>5. Sharing &amp; Third Parties</h2>
            <p>
              We may share data with:
            </p>
            <ul>
              <li>Service providers that host, store, or process data (cloud infrastructure, database, authentication providers, payment processors). We do not publish the exact infrastructure provider names in this policy.</li>
              <li>AI/ML providers for transcription and content generation.</li>
              <li>Legal requests: if required by law or to protect rights.</li>
            </ul>
            <p>
              We require third parties to maintain appropriate security and confidentiality.
            </p>

            <hr className="my-6 border-border" />

            <h2>6. Data Storage &amp; Security</h2>
            <ul>
              <li>Data is stored on third-party infrastructure and processed in locations that comply with industry security practices.</li>
              <li>We implement reasonable technical and organizational safeguards to protect data.</li>
              <li>No system is 100% secure; we will notify users and authorities as required by law in case of a data breach.</li>
            </ul>

            <hr className="my-6 border-border" />

            <h2>7. Data Retention &amp; Deletion</h2>
            <ul>
              <li>Account data, generated outputs, and transcripts are retained until you delete them or your account.</li>
              <li>You can request deletion of your account and associated data via the app (account deletion endpoint) or by contacting us.</li>
              <li>Some logs or backups may persist for a limited time for legal/compliance reasons.</li>
            </ul>

            <hr className="my-6 border-border" />

            <h2>8. Your Rights &amp; Choices</h2>
            <ul>
              <li><strong>Access:</strong> You can review data tied to your account.</li>
              <li><strong>Deletion:</strong> You can delete your account and content.</li>
              <li><strong>Authentication:</strong> If you used Google Sign-In you can revoke access via your Google account.</li>
              <li>For data requests, contact us at the address below.</li>
            </ul>

            <hr className="my-6 border-border" />

            <h2>9. Payments &amp; Subscriptions</h2>
            <ul>
              <li>The App will offer paid subscriptions (via in-app billing on Google Play and Apple App Store).</li>
              <li>Billing and payment details are managed by the platform; we receive transaction confirmations but do not store full card numbers.</li>
            </ul>

            <hr className="my-6 border-border" />

            <h2>10. Minors</h2>
            <p>
              The App is not directed to children under 13. We do not knowingly collect personal data from children under 13. If you believe we have collected such data, contact us to remove it.
            </p>

            <hr className="my-6 border-border" />

            <h2>11. International Use &amp; Transfers</h2>
            <p>
              The App is available globally. Data may be processed in different jurisdictions. We take steps to comply with applicable data protection laws (e.g., GDPR/CCPA) where required.
            </p>

            <hr className="my-6 border-border" />

            <h2>12. Changes to This Policy</h2>
            <p>
              We may update this policy. We will post the new policy with an updated effective date and, where required, notify users.
            </p>

            <hr className="my-6 border-border" />

            <h2>13. Contact</h2>
            <p>
              For privacy requests or questions: <a href="mailto:angelnavasdesign@gmail.com">angelnavasdesign@gmail.com</a>
            </p>
          </div>

          <div className="mt-8">
            <Link href="/" className="text-primary hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}