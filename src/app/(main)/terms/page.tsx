import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Shree Shyam Talent Solutions',
  description: 'Read the terms and conditions for using Shree Shyam Talent Solutions recruitment services.',
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-slate-50">
        <section className="relative bg-slate-900 py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent" />
          <div className="container relative mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
                Terms of Service
              </h1>
              <p className="text-xl text-slate-300">
                Please read these terms carefully before using our recruitment services.
              </p>
              <p className="text-sm text-slate-400 mt-4">
                Last updated: January 2024
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 md:p-12 space-y-8">
                
                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
                    1. Acceptance of Terms
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    By accessing and using the Shree Shyam Talent Solutions website and services, you accept and agree 
                    to be bound by these Terms of Service. If you do not agree to these terms, please do not use 
                    our services. We reserve the right to modify these terms at any time, and your continued use 
                    of our services constitutes acceptance of any changes.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
                    2. Description of Services
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Shree Shyam Talent Solutions provides recruitment and placement services, including:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                    <li>Job matching and placement services for candidates</li>
                    <li>Resume collection and management</li>
                    <li>Career counseling and guidance</li>
                    <li>Connecting candidates with potential employers</li>
                    <li>Job listings and employment opportunities</li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
                    3. User Registration
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    When registering with our services, you agree to:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                    <li>Provide accurate, current, and complete information</li>
                    <li>Update your information promptly if there are any changes</li>
                    <li>Maintain the confidentiality of your account credentials</li>
                    <li>Accept responsibility for all activities under your account</li>
                    <li>Notify us immediately of any unauthorized use</li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
                    4. User Responsibilities
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    As a user of our services, you agree to:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                    <li>Use our services only for lawful purposes</li>
                    <li>Provide truthful and accurate information in your profile and applications</li>
                    <li>Not misrepresent your qualifications, experience, or credentials</li>
                    <li>Not submit false or misleading job applications</li>
                    <li>Respect the intellectual property rights of others</li>
                    <li>Not use our services to harass, abuse, or harm others</li>
                    <li>Not attempt to gain unauthorized access to our systems</li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
                    5. Prohibited Activities
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    You are prohibited from:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                    <li>Submitting fraudulent applications or documents</li>
                    <li>Impersonating another person or entity</li>
                    <li>Using automated systems or bots to access our services</li>
                    <li>Scraping or copying content from our website</li>
                    <li>Transmitting viruses, malware, or harmful code</li>
                    <li>Interfering with the proper functioning of our services</li>
                    <li>Using our services for any illegal or unauthorized purpose</li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
                    6. No Employment Guarantee
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    Shree Shyam Talent Solutions acts as an intermediary between job seekers and employers. 
                    We do not guarantee employment, interviews, or job offers. The final hiring decision 
                    rests solely with the employer. We are not responsible for the actions, decisions, 
                    or policies of any employer or the outcome of any job application.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
                    7. Intellectual Property
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    All content on our website, including text, graphics, logos, images, and software, 
                    is the property of Shree Shyam Talent Solutions or its content suppliers and is protected 
                    by intellectual property laws. You may not reproduce, distribute, modify, or create 
                    derivative works without our express written permission.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
                    8. User Content
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    By submitting content (including resumes, cover letters, and profile information) to our 
                    platform, you grant us a non-exclusive, worldwide, royalty-free license to use, store, 
                    display, and share your content for the purpose of providing our recruitment services. 
                    You retain ownership of your content and can request its deletion at any time.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
                    9. Limitation of Liability
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    To the maximum extent permitted by law, Shree Shyam Talent Solutions shall not be liable for 
                    any indirect, incidental, special, consequential, or punitive damages, including loss of 
                    profits, data, or other intangible losses, resulting from your use of our services. 
                    Our total liability for any claims arising from these terms shall not exceed the amount 
                    you paid us, if any, in the twelve months preceding the claim.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
                    10. Disclaimer of Warranties
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    Our services are provided &quot;as is&quot; and &quot;as available&quot; without any warranties of any kind, 
                    either express or implied. We do not warrant that our services will be uninterrupted, 
                    error-free, or secure. We disclaim all warranties, including merchantability, fitness 
                    for a particular purpose, and non-infringement.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
                    11. Indemnification
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    You agree to indemnify, defend, and hold harmless Shree Shyam Talent Solutions, its officers, 
                    directors, employees, and agents from any claims, damages, losses, liabilities, and 
                    expenses (including legal fees) arising from your use of our services, violation of 
                    these terms, or infringement of any third-party rights.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
                    12. Termination
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    We reserve the right to suspend or terminate your access to our services at any time, 
                    with or without cause, and with or without notice. You may also terminate your account 
                    at any time by contacting us. Upon termination, your right to use our services will 
                    immediately cease.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
                    13. Governing Law
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    These Terms of Service shall be governed by and construed in accordance with the laws 
                    of India. Any disputes arising from these terms or your use of our services shall be 
                    subject to the exclusive jurisdiction of the courts in Gurugram, Haryana, India.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
                    14. Severability
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    If any provision of these Terms of Service is found to be unenforceable or invalid, 
                    that provision shall be limited or eliminated to the minimum extent necessary so that 
                    these terms shall otherwise remain in full force and effect.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
                    15. Entire Agreement
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    These Terms of Service, together with our Privacy Policy, constitute the entire agreement 
                    between you and Shree Shyam Talent Solutions regarding your use of our services and supersede 
                    any prior agreements or understandings.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
                    16. Contact Us
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-slate-50 rounded-xl p-6">
                    <p className="font-semibold text-slate-900">Shree Shyam Talent Solutions</p>
                    <p className="text-slate-600 mt-2">Email: shreeshyamtalentsolutions@gmail.com</p>
                    <p className="text-slate-600">Phone: +91 8570022580</p>
                    <p className="text-slate-600">Address: Gurugram, Haryana, India</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>
  );
}
