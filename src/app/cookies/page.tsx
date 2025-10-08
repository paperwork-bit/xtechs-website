export default function Page() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="prose dark:prose-invert max-w-none">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            <em>Last updated: {new Date().toLocaleDateString('en-AU')}</em>
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3 text-blue-900 dark:text-blue-100">Cookie Transparency</h2>
          <p className="text-blue-800 dark:text-blue-200">
            This Cookie Policy explains how xTechs Renewables Pty Ltd (ABN 30 673 983 572) uses cookies and similar 
            technologies on our website. We are committed to transparency and giving you control over your privacy.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">1. What Are Cookies?</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">1.1 Definition</h3>
              <p className="mb-4">
                Cookies are small text files stored on your device when you visit our website. They contain information 
                that is transferred to your device's hard drive and help us provide you with a better experience.
              </p>
              <p>
                Cookies allow websites to recognize your device and remember information about your visit, such as your 
                preferences and settings.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">1.2 Types of Cookies</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li><strong>Session Cookies:</strong> Temporary cookies deleted when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> Remain on your device for a set period or until deleted</li>
                <li><strong>First-party Cookies:</strong> Set directly by our website</li>
                <li><strong>Third-party Cookies:</strong> Set by external services we use</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">2. How We Use Cookies</h2>
          
          <div className="space-y-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 font-bold text-sm">✓</span>
                </div>
                <h3 className="text-xl font-semibold">Necessary Cookies</h3>
                <span className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 px-2 py-1 rounded text-xs font-medium">Always Active</span>
              </div>
              <p className="mb-4">
                These cookies are essential for the website to function properly and cannot be disabled. They enable core 
                functionality such as security, network management, and accessibility.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">What they do:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Remember your cookie consent preferences</li>
                    <li>Maintain security and prevent fraud</li>
                    <li>Enable basic website functionality</li>
                    <li>Remember your login status</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Examples:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Authentication cookies</li>
                    <li>Security tokens</li>
                    <li>Load balancing cookies</li>
                    <li>User interface preferences</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">📊</span>
                </div>
                <h3 className="text-xl font-semibold">Analytics Cookies</h3>
                <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 px-2 py-1 rounded text-xs font-medium">Optional</span>
              </div>
              <p className="mb-4">
                These cookies help us understand how visitors interact with our website by collecting and reporting 
                information anonymously. This helps us improve our website performance and user experience.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">What they do:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Track page views and user journeys</li>
                    <li>Measure website performance</li>
                    <li>Identify popular content and features</li>
                    <li>Monitor loading times and errors</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Services we use:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Google Analytics 4</li>
                    <li>Website performance monitoring</li>
                    <li>User behavior analysis</li>
                    <li>A/B testing platforms</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400 font-bold text-sm">🎯</span>
                </div>
                <h3 className="text-xl font-semibold">Marketing Cookies</h3>
                <span className="bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 px-2 py-1 rounded text-xs font-medium">Optional</span>
              </div>
              <p className="mb-4">
                These cookies are used to deliver relevant advertisements and track the effectiveness of our marketing 
                campaigns. They may also be used to limit the number of times you see an advertisement.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">What they do:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Show relevant solar energy content</li>
                    <li>Track campaign effectiveness</li>
                    <li>Enable remarketing campaigns</li>
                    <li>Personalize user experience</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Services we use:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Google Ads</li>
                    <li>Facebook Pixel</li>
                    <li>LinkedIn Insight Tag</li>
                    <li>Email marketing platforms</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">3. Managing Your Cookie Preferences</h2>
          
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 text-green-900 dark:text-green-100">Cookie Consent Banner</h3>
            <p className="text-green-800 dark:text-green-200 mb-4">
              When you first visit our website, you'll see a cookie consent banner that allows you to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-green-800 dark:text-green-200">
              <li><strong>Accept All:</strong> Allow all cookies for the best experience</li>
              <li><strong>Reject Non-essential:</strong> Only allow necessary cookies</li>
              <li><strong>Preferences:</strong> Choose specific cookie categories</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">3.1 Browser Settings</h3>
              <p className="mb-4">You can control cookies through your browser settings:</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies</li>
                <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">3.2 Update Preferences</h3>
              <p className="mb-4">You can change your cookie preferences at any time:</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Click the cookie settings link in our footer</li>
                <li>Use the cookie preferences modal</li>
                <li>Clear your browser cookies and revisit</li>
                <li>Contact us to update your preferences</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">4. Third-Party Services</h2>
          
          <p className="mb-6">
            We use trusted third-party services that may set their own cookies. Here's how they use your information:
          </p>

          <div className="space-y-4">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Google Analytics</h3>
              <p className="text-sm mb-2">
                Helps us understand website usage and improve performance. Data is anonymized and aggregated.
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                <strong>Privacy Policy:</strong> 
                <a href="https://policies.google.com/privacy" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                  Google Privacy Policy
                </a>
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Google Ads</h3>
              <p className="text-sm mb-2">
                Enables us to show relevant solar energy advertisements and measure campaign effectiveness.
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                <strong>Privacy Policy:</strong> 
                <a href="https://policies.google.com/privacy" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                  Google Privacy Policy
                </a>
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Social Media Platforms</h3>
              <p className="text-sm mb-2">
                Enable social sharing features and may track your activity across our website and their platforms.
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                <strong>Platforms:</strong> Facebook, LinkedIn, Instagram, YouTube
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">5. Data Retention</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">5.1 Cookie Lifespan</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Analytics Cookies:</strong> Up to 2 years</li>
                <li><strong>Marketing Cookies:</strong> Up to 1 year</li>
                <li><strong>Preference Cookies:</strong> Up to 1 year</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">5.2 Data Processing</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Personal data is anonymized where possible</li>
                <li>Aggregated data is used for analytics</li>
                <li>Individual tracking is limited and controlled</li>
                <li>Data is deleted according to retention policies</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">6. Your Rights</h2>
          
          <p className="mb-4">Under Australian privacy law and international standards, you have the right to:</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">6.1 Control & Consent</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Give or withdraw consent for non-essential cookies</li>
                <li>Access information about cookies we use</li>
                <li>Request deletion of cookie data</li>
                <li>Object to cookie processing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">6.2 Transparency & Choice</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Clear information about cookie purposes</li>
                <li>Easy ways to manage preferences</li>
                <li>Regular updates on cookie practices</li>
                <li>Complaint mechanisms for violations</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">7. Changes to This Policy</h2>
          
          <p className="mb-4">
            We may update this Cookie Policy from time to time to reflect changes in our practices, technology, 
            or legal requirements. When we make changes:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>We will update the "Last updated" date at the top of this policy</li>
            <li>Significant changes will be communicated via our website</li>
            <li>You may need to review and update your cookie preferences</li>
            <li>Continued use of our website constitutes acceptance of changes</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">8. Contact Us</h2>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <p className="mb-4">
              If you have questions about our use of cookies, want to update your preferences, or need assistance 
              with cookie-related issues, please contact us:
            </p>
            <div className="space-y-2">
              <p><strong>Email:</strong> inquiries@xtechsrenewables.com.au</p>
              <p><strong>Phone:</strong> 1300 983 247</p>
              <p><strong>Address:</strong> 2 Corporate Ave, Rowville VIC 3178</p>
              <p><strong>Business Hours:</strong> Monday - Friday, 8:00 AM - 6:00 PM</p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm">
                For more information about our privacy practices, please review our{" "}
                <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Privacy Policy
                </a>.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
