import Link from "next/link"
import Footer from "@/components/footer"

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service — Peak Study AI</h1>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground">
              Effective Date: 2025-10-13<br />
              Last Updated: 2025-10-13
            </p>

            <hr className="my-6 border-border" />

            <h2>1. Acceptance of Terms</h2>
            <p>
              By downloading, installing, or using Peak Study AI ("the App", "we", "us"), you agree to be bound by these Terms of Service and our Privacy Policy.
              If you do not agree, do not use the App.
              These Terms apply to all users of the App, whether free or paid.
            </p>

            <hr className="my-6 border-border" />

            <h2>2. Description of Service</h2>
            <p>
              Peak Study AI allows users to upload, record, or input text, audio, PDF, or video files, and automatically generate study materials such as summaries, quizzes, flashcards, and chat responses using AI-powered models.
              The App may also offer premium memberships and other features that enhance your experience.
            </p>

            <hr className="my-6 border-border" />

            <h2>3. Account Registration</h2>
            <ul>
              <li>Users must sign in using third-party authentication (Google Sign-In).</li>
              <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
              <li>You may delete your account at any time within the app.</li>
            </ul>

            <hr className="my-6 border-border" />

            <h2>4. Beta Disclaimer</h2>
            <p>
              Peak Study AI is currently in beta testing. Features may change, experience may vary, and occasional bugs may occur.
              By using the app during the beta period, you acknowledge and accept these limitations.
            </p>

            <hr className="my-6 border-border" />

            <h2>5. Intellectual Property</h2>
            <ul>
              <li>All software, code, design, graphics, and content within Peak Study AI are the property of the developer and protected by applicable laws.</li>
              <li>You retain ownership of the materials you upload and the content generated for your personal use.</li>
              <li>You may not copy, distribute, sell, or use the app or its AI-generated outputs for commercial purposes without written permission.</li>
            </ul>

            <hr className="my-6 border-border" />

            <h2>6. User Content</h2>
            <ul>
              <li>You are solely responsible for the Inputs (audio, text, video, etc.) that you upload or record.</li>
              <li>You must ensure your content does not infringe third-party rights or violate any laws.</li>
              <li>We reserve the right to remove or restrict content deemed inappropriate, illegal, or abusive.</li>
            </ul>

            <hr className="my-6 border-border" />

            <h2>7. AI-Generated Content Disclaimer</h2>
            <ul>
              <li>The app uses artificial intelligence models (e.g., Gemini, Whisper, or equivalents) to generate content.</li>
              <li>AI-generated material may contain inaccuracies or inconsistencies. It is your responsibility to verify and interpret the information.</li>
              <li>The App and its developer are not liable for any decisions made based on AI-generated content.</li>
            </ul>

            <hr className="my-6 border-border" />

            <h2>8. Payment &amp; Subscriptions</h2>
            <ul>
              <li>Peak Study AI may offer paid memberships or features through in-app purchases using Google Play Billing or Apple In-App Purchases.</li>
              <li>All payments are handled securely by their respective platforms.</li>
              <li>Subscription terms, renewals, and cancellations are managed via your Google or Apple account settings.</li>
              <li>Refunds follow the respective store policies (Google Play / App Store).</li>
            </ul>

            <hr className="my-6 border-border" />

            <h2>9. Acceptable Use</h2>
            <p>
              You agree not to:
            </p>
            <ul>
              <li>Misuse, reverse engineer, or modify the app.</li>
              <li>Use the app for illegal, harmful, or deceptive purposes.</li>
              <li>Upload or distribute viruses, spam, or content that violates intellectual property laws.</li>
              <li>Attempt unauthorized access to any system or account.</li>
            </ul>

            <hr className="my-6 border-border" />

            <h2>10. Data &amp; Privacy</h2>
            <p>
              Your use of the App is also governed by our Privacy Policy, which explains how we collect, process, and protect data.
              By using the App, you consent to the processing of data as described in that policy.
            </p>

            <hr className="my-6 border-border" />

            <h2>11. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access if you:
            </p>
            <ul>
              <li>Breach these Terms,</li>
              <li>Use the app abusively or illegally, or</li>
              <li>Engage in activity that threatens the service or its users.</li>
            </ul>
            <p>
              Upon termination, your right to use the app ends immediately.
            </p>

            <hr className="my-6 border-border" />

            <h2>12. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law:
            </p>
            <ul>
              <li>The App is provided "AS IS" and "AS AVAILABLE".</li>
              <li>We do not guarantee uninterrupted service or accuracy of AI-generated outputs.</li>
              <li>We are not liable for any direct, indirect, incidental, or consequential damages arising from the use of the App.</li>
            </ul>

            <hr className="my-6 border-border" />

            <h2>13. Modifications</h2>
            <p>
              We may modify these Terms at any time. Updates will be posted within the App or on the official listing (Google Play / App Store). Continued use after an update implies acceptance.
            </p>

            <hr className="my-6 border-border" />

            <h2>14. Governing Law</h2>
            <p>
              These Terms are governed by applicable international consumer protection and data laws. Disputes will be resolved under the jurisdiction corresponding to your country of residence unless otherwise required by law.
            </p>

            <hr className="my-6 border-border" />

            <h2>15. Contact</h2>
            <p>
              For questions about these Terms or the App:<br />
              📩 <a href="mailto:angelnavasdesign@gmail.com">angelnavasdesign@gmail.com</a>
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