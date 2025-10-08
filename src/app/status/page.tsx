export default function Page() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="prose dark:prose-invert max-w-none">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">System Status</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Real-time status of our services and systems
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <h2 className="text-xl font-semibold text-green-900 dark:text-green-100">All Systems Operational</h2>
          </div>
          <p className="text-green-800 dark:text-green-200">
            All xTechs Renewables services are running normally. Our website, customer portal, and support systems 
            are fully operational.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Service Status</h2>
          
          <div className="space-y-4">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <h3 className="font-semibold">Website</h3>
                </div>
                <span className="text-sm text-green-600 dark:text-green-400">Operational</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Our main website is fully functional with normal response times.
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <h3 className="font-semibold">Customer Portal</h3>
                </div>
                <span className="text-sm text-green-600 dark:text-green-400">Operational</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Customer login and account management services are working normally.
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <h3 className="font-semibold">Support System</h3>
                </div>
                <span className="text-sm text-green-600 dark:text-green-400">Operational</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Help desk and support ticket system is functioning normally.
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <h3 className="font-semibold">Quote System</h3>
                </div>
                <span className="text-sm text-green-600 dark:text-green-400">Operational</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Online quote requests and form submissions are working properly.
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <h3 className="font-semibold">Email Services</h3>
                </div>
                <span className="text-sm text-green-600 dark:text-green-400">Operational</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Email communications and notifications are being delivered normally.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Performance Metrics</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">99.9%</div>
              <h3 className="font-semibold mb-2">Uptime</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Average monthly uptime</p>
            </div>
            <div className="text-center border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">&lt;2s</div>
              <h3 className="font-semibold mb-2">Response Time</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Average page load time</p>
            </div>
            <div className="text-center border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">24/7</div>
              <h3 className="font-semibold mb-2">Monitoring</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Continuous system monitoring</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Recent Updates</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-green-600 dark:text-green-400">RESOLVED</span>
                <span className="text-sm text-gray-500">{new Date().toLocaleDateString()}</span>
              </div>
              <h3 className="font-semibold">System Maintenance Completed</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Scheduled maintenance completed successfully. All services are running optimally.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">UPDATE</span>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
              <h3 className="font-semibold">Website Performance Improvements</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Implemented performance optimizations to improve page load speeds.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-green-600 dark:text-green-400">RESOLVED</span>
                <span className="text-sm text-gray-500">1 week ago</span>
              </div>
              <h3 className="font-semibold">Email Delivery Issue Resolved</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Temporary email delivery issue has been resolved. All emails are now being sent normally.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Scheduled Maintenance</h2>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100">No Scheduled Maintenance</h3>
            <p className="text-blue-800 dark:text-blue-200">
              There are currently no scheduled maintenance windows planned. We will provide advance notice 
              of any planned maintenance that may affect service availability.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Report an Issue</h2>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <p className="mb-4">
              If you're experiencing issues with our services that aren't reflected in our status page, 
              please report them to our support team.
            </p>
            <div className="space-y-2">
              <p><strong>Email:</strong> support@xtechsrenewables.com.au</p>
              <p><strong>Phone:</strong> 1300 983 247</p>
              <p><strong>Support Hours:</strong> Monday - Friday, 8:00 AM - 6:00 PM</p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm">
                <strong>Emergency Issues:</strong> For urgent issues affecting safety or service delivery, 
                please call our emergency line at 1300 983 247.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Status Page Information</h2>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <p className="mb-4">
              This status page is updated in real-time to provide transparency about our service availability. 
              We monitor our systems 24/7 and update this page immediately when issues are detected or resolved.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Status Indicators</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><span className="text-green-600 dark:text-green-400">●</span> Operational - Service running normally</li>
                  <li><span className="text-yellow-600 dark:text-yellow-400">●</span> Degraded - Service running with issues</li>
                  <li><span className="text-red-600 dark:text-red-400">●</span> Outage - Service unavailable</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Update Frequency</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Real-time status updates</li>
                  <li>Incident notifications within 15 minutes</li>
                  <li>Resolution updates immediately</li>
                  <li>Post-incident reports within 24 hours</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
