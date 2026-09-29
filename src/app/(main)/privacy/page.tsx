import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Shree Shyam Talent Solutions',
  description: 'Learn how Shree Shyam Talent Solutions collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50">
        <section className="relative bg-slate-900 py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent" />
          <div className="container relative mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
                Privacy Policy
              </h1>
              <p className="text-xl text-slate-300">
                Your privacy is important to us. This policy explains how we collect, use, and protect your information.
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
                    1. Introduction
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    Shree Shyam Talent Solutions (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
                    you visit our website and use our recruitment services. Please read this privacy policy carefully. 
                    If you do not agree with the terms of this privacy policy, please do not access the site.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
                    2. Information We Collect
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    We collect information that you provide directly to us, including:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                    <li><strong>Personal Information:</strong> Name, email address, phone number, and location</li>
                    <li><strong>Professional Information:</strong> Current role, industry, experience level, qualifications, and salary expectations</li>
                    <li><strong>Documents:</strong> Resume/CV, cover letters, and other supporting documents</li>
                    <li><strong>Online Profiles:</strong> LinkedIn profile links and portfolio URLs</li>
                    <li><strong>Communication Data:</strong> Any correspondence you have with us</li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
                    3. How We Use Your Information
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    We use the information we collect for various purposes, including:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                    <li>To match you with suitable job opportunities</li>
                    <li>To communicate with you about potential positions</li>
                    <li>To share your profile with potential employers (with your consent)</li>
                    <li>To improve our services and website functionality</li>
                    <li>To send you relevant job alerts and newsletters</li>
                    <li>To comply with legal obligations</li>
                    <li>To protect against fraudulent or unauthorized activity</li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
                    4. Information Sharing
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    We may share your information in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                    <li><strong>With Employers:</strong> We share your application details with potential employers when you apply for positions or when we believe you may be a suitable candidate</li>
                    <li><strong>Service Providers:</strong> We may share information with third-party vendors who assist in operating our website and services</li>
                    <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to legal process</li>
                    <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
                    5. Data Security
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    We implement appropriate technical and organizational security measures to protect your personal 
                    information against unauthorized access, alteration, disclosure, or destruction. These measures 
                    include encryption, secure servers, and regular security assessments. However, no method of 
                    transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
                    6. Data Retention
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    We retain your personal information for as long as necessary to fulfill the purposes outlined 
                    in this privacy policy, unless a longer retention period is required or permitted by law. 
                    If you wish to have your data deleted, please contact us, and we will process your request 
                    in accordance with applicable laws.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
                    7. Your Rights
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Depending on your location, you may have the following rights regarding your personal information:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                    <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                    <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
                    <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
                    <li><strong>Objection:</strong> Object to certain types of processing</li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
                    8. Cookies and Tracking
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    Our website may use cookies and similar tracking technologies to enhance your browsing experience. 
                    Cookies are small files stored on your device that help us remember your preferences and understand 
                    how you use our website. You can control cookie preferences through your browser settings.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
                    9. Third-Party Links
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    Our website may contain links to third-party websites. We are not responsible for the privacy 
                    practices or content of these external sites. We encourage you to review the privacy policies 
                    of any third-party sites you visit.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
                    10. Children&apos;s Privacy
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    Our services are not intended for individuals under the age of 18. We do not knowingly collect 
                    personal information from children. If you believe we have collected information from a child, 
                    please contact us immediately.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
                    11. Changes to This Policy
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    We may update this privacy policy from time to time. We will notify you of any changes by 
                    posting the new privacy policy on this page and updating the &quot;Last updated&quot; date. 
                    We encourage you to review this policy periodically.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
                    12. Contact Us
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
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
