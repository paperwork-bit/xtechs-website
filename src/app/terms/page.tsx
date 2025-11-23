export default function Page() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="prose dark:prose-invert max-w-none">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            <em>Last updated: {new Date().toLocaleDateString('en-AU')}</em>
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3 text-blue-900 dark:text-blue-100">Important Notice</h2>
          <p className="text-blue-800 dark:text-blue-200">
            By accessing and using xTechs Renewables' website and services, you acknowledge that you have read, 
            understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, 
            please do not use our services.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">1. General Agreement</h2>
          <p className="mb-4">
            These Terms of Service ("Terms") constitute a legally binding agreement between you ("Customer", "you", or "your") 
            and xTechs Renewables Pty Ltd ("xTechs", "we", "us", or "our"), ABN 30 673 983 572, 
            regarding your use of our website and services.
          </p>
          <p>
            These Terms apply to all visitors, users, and customers who access or use our website, 
            request quotes, engage our services, or otherwise interact with xTechs Renewables.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">2. Our Services</h2>
          <p className="mb-4">
            xTechs Renewables provides comprehensive clean energy solutions across Victoria, Australia, including:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="font-semibold mb-2">Solar & Battery Solutions</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Solar PV system design and installation</li>
                <li>Battery storage systems</li>
                <li>Off-grid power solutions</li>
                <li>System maintenance and monitoring</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Electrical & EV Services</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>EV charger installation</li>
                <li>Electrical upgrades and repairs</li>
                <li>Home automation systems</li>
                <li>Builder and commercial services</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">3. Service Terms & Conditions</h2>
          
          <h3 className="text-xl font-semibold mb-3">3.1 Compliance & Standards</h3>
          <p className="mb-4">
            All installations and services provided by xTechs Renewables comply with:
          </p>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>Australian Standards (AS/NZS) and relevant electrical safety regulations</li>
            <li>Clean Energy Council (CEC) guidelines and accreditation requirements</li>
            <li>Victorian electrical safety and building codes</li>
            <li>Manufacturer installation specifications and warranties</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">3.2 Site Assessment & Installation</h3>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>Site assessments may be required before installation to ensure suitability</li>
            <li>Installation timelines are estimates and may vary based on site conditions and weather</li>
            <li>Customer must provide safe access to installation areas</li>
            <li>Any site preparation requirements will be communicated in advance</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">3.3 Payment Terms</h3>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>Payment terms will be specified in individual service agreements</li>
            <li>Deposits may be required for custom installations</li>
            <li>Final payment is due upon completion and customer acceptance</li>
            <li>Late payment fees may apply as specified in service agreements</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">4. Warranties & Guarantees</h2>
          
          <h3 className="text-xl font-semibold mb-3">4.1 Workmanship Warranty</h3>
          <p className="mb-4">
            We provide comprehensive warranties on our workmanship and installation quality. 
            Specific warranty terms will be detailed in your individual service agreement.
          </p>

          <h3 className="text-xl font-semibold mb-3">4.2 Component Warranties</h3>
          <p className="mb-4">
            All components used in our installations come with manufacturer warranties. 
            We use only quality, certified products from reputable manufacturers.
          </p>

          <h3 className="text-xl font-semibold mb-3">4.3 Warranty Claims</h3>
          <p>
            Warranty claims must be reported promptly. We will assess and address any legitimate 
            warranty issues in accordance with the terms of the relevant warranty.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">5. Limitation of Liability</h2>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
            <p className="text-yellow-800 dark:text-yellow-200 font-medium">
              Our liability is limited to the cost of services provided under the relevant service agreement.
            </p>
          </div>
          <ul className="list-disc list-inside space-y-2">
            <li>We maintain appropriate professional indemnity and public liability insurance coverage</li>
            <li>We are not liable for consequential, indirect, or special damages</li>
            <li>Our total liability shall not exceed the total amount paid for the specific service</li>
            <li>Force majeure events may affect service delivery timelines</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">6. Privacy & Data Protection</h2>
          <p className="mb-4">
            Your privacy is important to us. We comply with the Australian Privacy Act 1988 and 
            maintain strict data protection standards.
          </p>
          <p>
            Please review our comprehensive{" "}
            <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
              Privacy Policy
            </a>{" "}
            to understand how we collect, use, and protect your personal information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">7. Intellectual Property</h2>
          <p className="mb-4">
            All content on our website, including text, graphics, logos, and software, is the property 
            of xTechs Renewables and is protected by Australian and international copyright laws.
          </p>
          <p>
            You may not reproduce, distribute, or use our intellectual property without written permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">8. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to update these Terms of Service at any time. Changes will be effective 
            immediately upon posting on our website.
          </p>
          <p>
            Continued use of our services after changes are posted constitutes acceptance of the updated terms. 
            We recommend reviewing these terms periodically.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">9. Governing Law</h2>
          <p>
            These Terms are governed by the laws of Victoria, Australia. Any disputes will be subject to 
            the exclusive jurisdiction of the courts of Victoria.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">10. Contact Information</h2>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <p className="mb-4">
              For questions about these Terms of Service or our services, please contact us:
            </p>
            <div className="space-y-2">
              <p><strong>Email:</strong> inquiries@xtechsrenewables.com.au</p>
              <p><strong>Phone:</strong> 1300 983 247</p>
              <p><strong>Address:</strong> 2 Corporate Ave, Rowville VIC 3178</p>
              <p><strong>Business Hours:</strong> Monday - Friday, 8:00 AM - 6:00 PM</p>
            </div>
          </div>
        </section>

        {/* Footer copyright removed to avoid duplication; handled by global site footer */}
      </div>
    </main>
  );
}
