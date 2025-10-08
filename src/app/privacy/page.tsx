export default function Page() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="prose dark:prose-invert max-w-none">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            <em>Last updated: {new Date().toLocaleDateString('en-AU')}</em>
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3 text-blue-900 dark:text-blue-100">Your Privacy Matters</h2>
          <p className="text-blue-800 dark:text-blue-200">
            xTechs Renewables Pty Ltd (ABN 30 673 983 572) is committed to protecting your privacy and personal information. 
            We comply with the Australian Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">1. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold mb-3">1.1 Personal Information</h3>
          <p className="mb-4">We collect personal information when you:</p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold mb-2">Contact & Identification</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Name and contact details (email, phone, address)</li>
                <li>Business information (company name, ABN)</li>
                <li>Property details for installations</li>
                <li>Communication preferences</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Service & Project Information</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Energy usage and requirements</li>
                <li>Property specifications and site details</li>
                <li>Installation preferences and quotes</li>
                <li>Service history and maintenance records</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">1.2 Technical Information</h3>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>Website usage data (pages visited, time spent, device information)</li>
            <li>IP address and location data (for service area verification)</li>
            <li>Cookies and tracking technologies (with your consent)</li>
            <li>Analytics data to improve our website and services</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">2. How We Use Your Information</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">2.1 Service Delivery</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Provide quotes and solar system designs</li>
                <li>Schedule and perform installations</li>
                <li>Deliver maintenance and support services</li>
                <li>Process payments and manage accounts</li>
                <li>Comply with regulatory requirements</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">2.2 Communication & Marketing</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Respond to inquiries and support requests</li>
                <li>Send service updates and notifications</li>
                <li>Provide relevant solar and energy information</li>
                <li>Marketing communications (with your consent)</li>
                <li>Customer satisfaction surveys</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">2.3 Business Operations</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Improve our products and services</li>
            <li>Analyze website performance and user experience</li>
            <li>Comply with legal and regulatory obligations</li>
            <li>Protect against fraud and security threats</li>
            <li>Maintain business records and documentation</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">3. Information Sharing</h2>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 dark:text-yellow-200 font-medium">
              We do not sell, rent, or trade your personal information to third parties for marketing purposes.
            </p>
          </div>

          <p className="mb-4">We may share your information with:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Service Providers:</strong> Installers, electricians, and maintenance contractors working on your project</li>
            <li><strong>Government Bodies:</strong> When required for rebate applications, compliance, or legal obligations</li>
            <li><strong>Financial Institutions:</strong> For payment processing and financing arrangements</li>
            <li><strong>Technology Partners:</strong> Website hosting, analytics, and customer management systems</li>
            <li><strong>Legal Requirements:</strong> When required by law, court order, or to protect our rights</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">4. Data Security</h2>
          
          <p className="mb-4">We implement appropriate security measures to protect your personal information:</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">4.1 Technical Safeguards</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>SSL encryption for data transmission</li>
                <li>Secure servers and databases</li>
                <li>Regular security updates and patches</li>
                <li>Access controls and authentication</li>
                <li>Regular backups and disaster recovery</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">4.2 Administrative Safeguards</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Staff training on privacy and security</li>
                <li>Limited access on need-to-know basis</li>
                <li>Regular security audits and assessments</li>
                <li>Incident response procedures</li>
                <li>Document retention and disposal policies</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">5. Cookies & Tracking</h2>
          
          <p className="mb-4">
            We use cookies and similar technologies to enhance your experience and analyze website usage. 
            For detailed information about our cookie practices, please see our{" "}
            <a href="/cookies" className="text-blue-600 dark:text-blue-400 hover:underline">
              Cookie Policy
            </a>.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Necessary Cookies</h3>
              <p className="text-sm">Essential for website functionality and security. Cannot be disabled.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Analytics Cookies</h3>
              <p className="text-sm">Help us understand website usage and improve performance. Optional.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Marketing Cookies</h3>
              <p className="text-sm">Enable personalized content and advertising. Optional.</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">6. Your Rights</h2>
          
          <p className="mb-4">Under Australian privacy law, you have the right to:</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">6.1 Access & Correction</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Request access to your personal information</li>
                <li>Correct inaccurate or outdated information</li>
                <li>Receive a copy of your data in a portable format</li>
                <li>Understand how your information is used</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">6.2 Control & Deletion</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Opt out of marketing communications</li>
                <li>Request deletion of your personal information</li>
                <li>Withdraw consent for data processing</li>
                <li>Lodge complaints with privacy authorities</li>
              </ul>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-6">
            <p className="text-green-800 dark:text-green-200">
              <strong>To exercise your rights:</strong> Contact us at inquiries@xtechsrenewables.com.au 
              or call 1300 983 247. We will respond within 30 days.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">7. Data Retention</h2>
          
          <p className="mb-4">We retain your personal information for as long as necessary to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Provide ongoing services and support</li>
            <li>Comply with legal and regulatory requirements</li>
            <li>Resolve disputes and enforce agreements</li>
            <li>Maintain business records for legitimate purposes</li>
          </ul>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Customer Records</h3>
              <p className="text-sm">Retained for 7 years after service completion or account closure.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Website Analytics</h3>
              <p className="text-sm">Aggregated data retained for 2 years; personal data deleted after 26 months.</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">8. International Transfers</h2>
          
          <p className="mb-4">
            Some of our service providers may be located outside Australia. When we transfer your information internationally, we ensure:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>The receiving country has adequate privacy protections</li>
            <li>We have contractual safeguards in place</li>
            <li>Your information is protected to Australian standards</li>
            <li>You have been informed of the transfer</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">9. Changes to This Policy</h2>
          
          <p className="mb-4">
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
            When we make significant changes, we will:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Post the updated policy on our website</li>
            <li>Notify you by email if you have an account with us</li>
            <li>Update the "Last updated" date at the top of this policy</li>
            <li>Provide a summary of material changes</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">10. Contact Us</h2>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <p className="mb-4">
              For questions about this Privacy Policy, to exercise your rights, or to make a privacy complaint, please contact us:
            </p>
            <div className="space-y-2">
              <p><strong>Privacy Officer:</strong> xTechs Renewables Pty Ltd</p>
              <p><strong>Email:</strong> inquiries@xtechsrenewables.com.au</p>
              <p><strong>Phone:</strong> 1300 983 247</p>
              <p><strong>Address:</strong> 2 Corporate Ave, Rowville VIC 3178</p>
              <p><strong>Business Hours:</strong> Monday - Friday, 8:00 AM - 6:00 PM</p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm">
                <strong>Privacy Complaints:</strong> If you are not satisfied with our response, you may contact the 
                <a href="https://www.oaic.gov.au/" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                  Office of the Australian Information Commissioner (OAIC)
                </a>.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
