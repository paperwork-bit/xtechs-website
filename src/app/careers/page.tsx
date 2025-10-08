export default function Page() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="prose dark:prose-invert max-w-none">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Be part of Australia's renewable energy revolution
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3 text-blue-900 dark:text-blue-100">Why Work With Us?</h2>
          <p className="text-blue-800 dark:text-blue-200">
            At xTechs Renewables, we're building the future of clean energy. Join our team of passionate professionals 
            who are making sustainable energy accessible across Victoria.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Current Opportunities</h2>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-2 text-yellow-900 dark:text-yellow-100">We're Growing!</h3>
            <p className="text-yellow-800 dark:text-yellow-200">
              We're always looking for talented individuals to join our team. While we don't have specific positions 
              listed at the moment, we encourage you to reach out with your resume and tell us how you'd like to 
              contribute to the renewable energy sector.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Technical Roles</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Solar Installation Technicians</li>
                <li>Electrical Engineers</li>
                <li>System Designers</li>
                <li>Quality Assurance Specialists</li>
                <li>Project Managers</li>
              </ul>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Business Roles</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Sales Representatives</li>
                <li>Customer Success Managers</li>
                <li>Marketing Specialists</li>
                <li>Administrative Support</li>
                <li>Business Development</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">What We Offer</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 dark:text-green-400 text-2xl">🌱</span>
              </div>
              <h3 className="font-semibold mb-2">Purpose-Driven Work</h3>
              <p className="text-sm">Help build a sustainable future for Australia</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 dark:text-blue-400 text-2xl">📚</span>
              </div>
              <h3 className="font-semibold mb-2">Professional Development</h3>
              <p className="text-sm">Continuous learning and skill development opportunities</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 dark:text-purple-400 text-2xl">🤝</span>
              </div>
              <h3 className="font-semibold mb-2">Collaborative Environment</h3>
              <p className="text-sm">Work with passionate professionals in a supportive team</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">How to Apply</h2>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <p className="mb-4">
              Ready to join our team? We'd love to hear from you! Send us your resume and a brief cover letter 
              explaining why you're interested in working with xTechs Renewables.
            </p>
            <div className="space-y-2">
              <p><strong>Email:</strong> careers@xtechsrenewables.com.au</p>
              <p><strong>Subject:</strong> Career Application - [Your Name]</p>
              <p><strong>Include:</strong> Resume, cover letter, and any relevant certifications</p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm">
                <strong>Note:</strong> We review all applications and will contact suitable candidates for interviews. 
                Due to the high volume of applications, we may not be able to respond to all submissions immediately.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Equal Opportunity Employer</h2>
          
          <p className="mb-4">
            xTechs Renewables is committed to creating an inclusive and diverse workplace. We welcome applications 
            from people of all backgrounds, cultures, and experiences. We believe that diversity strengthens our team 
            and helps us better serve our customers across Victoria.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Our Commitment</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Equal opportunity employment</li>
                <li>Inclusive hiring practices</li>
                <li>Supportive work environment</li>
                <li>Professional development for all</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What We Value</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Passion for renewable energy</li>
                <li>Commitment to quality</li>
                <li>Team collaboration</li>
                <li>Continuous improvement</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Contact Us</h2>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <p className="mb-4">
              Have questions about working with us? We'd be happy to chat about opportunities at xTechs Renewables.
            </p>
            <div className="space-y-2">
              <p><strong>Email:</strong> careers@xtechsrenewables.com.au</p>
              <p><strong>Phone:</strong> 1300 983 247</p>
              <p><strong>Address:</strong> 2 Corporate Ave, Rowville VIC 3178</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
