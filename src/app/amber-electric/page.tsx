import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Zap, DollarSign, TrendingUp, Clock, Shield, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AmberElectricPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-brand-primary text-white">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-gradient-brand-secondary text-white hover:opacity-90 border-2 border-brand-secondary-light">
              🤝 xTechs & Amber Electric Partnership
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-brand-secondary-light">xTechs</span> + <span className="text-brand-secondary-light">Amber Electric</span> = 
              <br className="md:hidden" /> Maximum Solar ROI
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Get premium residential & commercial solar systems from <strong>xTechs</strong> and maximize earnings with <strong>Amber Electric's</strong> 
              wholesale pricing. Perfect for homes and businesses looking to maximize their solar investment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-brand-secondary hover:bg-brand-secondary/90 text-black font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <Link href="https://app.amber.com.au/signup/?couponCode=XTECHSRENEWAB" target="_blank">
                  Start Earning More Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-brand-primary hover:bg-gray-100 font-semibold border-2 border-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <Link href="/contact">
                  Book Site Inspection
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Section */}
      <div className="bg-gradient-to-r from-brand-secondary-light/10 to-brand-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              The Perfect Partnership: <span className="text-brand-secondary">xTechs</span> + <span className="text-brand-primary">Amber Electric</span>
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              When Australia's leading residential & commercial solar specialist teams up with the smartest energy retailer, 
              you get unbeatable value and maximum returns for your home or business.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-brand-secondary">
                <h3 className="text-xl font-bold mb-3 text-brand-secondary">🏠 xTechs Solar Systems</h3>
                <ul className="text-left text-gray-700 space-y-2">
                  <li>• Premium residential & commercial solar</li>
                  <li>• Advanced battery storage solutions</li>
                  <li>• Industry-leading reliability & warranties</li>
                  <li>• Professional installation & ongoing support</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-brand-primary">
                <h3 className="text-xl font-bold mb-3 text-brand-primary">⚡ Amber Electric</h3>
                <ul className="text-left text-gray-700 space-y-2">
                  <li>• Wholesale energy pricing</li>
                  <li>• Smart automation & optimization</li>
                  <li>• Up to $19/kWh earnings</li>
                  <li>• No lock-in contracts</li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-brand-secondary text-white rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">🎯 Combined Benefits for Homes & Businesses</h3>
              <p className="text-lg">
                Get the best residential & commercial solar system AND the best energy rates. Our partnership ensures 
                homeowners and businesses maximize both their upfront investment and their ongoing returns.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Benefits Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Partnership?</h2>
            <p className="text-xl text-gray-600">
              Get the best of both worlds: premium xTechs solar systems + Amber's wholesale energy pricing
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Earn Up to $19/kWh</h3>
              <p className="text-gray-600">
                During price spikes, export your solar energy for massive returns. Real customers earn $58-$166 in single events.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Automation</h3>
              <p className="text-gray-600">
                SmartShift automatically optimizes your battery charging and discharging to maximize your earnings.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">No Lock-in Contracts</h3>
              <p className="text-gray-600">
                Switch anytime with no penalties. We win when you win - simple subscription fee, no hidden margins.
              </p>
            </Card>
          </div>
        </div>
      </div>


      {/* How It Works */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Amber Works</h2>
            <p className="text-xl text-gray-600">
              Simple automation that maximizes your solar and battery ROI
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold">Daytime Charging</h3>
              </div>
              <p className="text-gray-600">
                Your battery charges when wholesale prices are low and renewables are abundant - maximizing your solar generation value.
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">Evening Earnings</h3>
              </div>
              <p className="text-gray-600">
                Your battery discharges during peak demand when wholesale prices spike - earning you premium rates up to $19/kWh.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Q1 2024-25 Results */}
      <div className="bg-brand-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Amazing Q1 2024-25 Results</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-4xl font-bold text-brand-secondary-light mb-2">74%</div>
                <p className="text-white/80">of customers had negative bills</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-brand-secondary-light mb-2">$1,283</div>
                <p className="text-white/80">Median NSW customer earnings</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-brand-secondary-light mb-2">$3,000+</div>
                <p className="text-white/80">Top 5% customer earnings</p>
              </div>
            </div>

            <div className="bg-brand-primary-light/20 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">State-by-State Earnings (Q1 2024-25)</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-secondary-light">NSW</div>
                  <div className="text-lg">$1,283 avg</div>
                  <div className="text-sm text-white/70">$2,395 top 10%</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-secondary-light">QLD</div>
                  <div className="text-lg">$537 avg</div>
                  <div className="text-sm text-white/70">$1,194 top 10%</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-secondary-light">SA</div>
                  <div className="text-lg">$515 avg</div>
                  <div className="text-sm text-white/70">$1,085 top 10%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Amber vs Traditional Retailers</h2>
            <p className="text-xl text-gray-600">
              See why Amber is the smart choice for solar and battery owners
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Feature</th>
                    <th className="px-6 py-4 text-center font-semibold text-green-600">Amber SmartShift</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-600">Other Retailer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4">Variable wholesale feed-in rates up to $19/kWh</td>
                    <td className="px-6 py-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4">Keep 100% of your energy's value</td>
                    <td className="px-6 py-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">Continuous battery optimization</td>
                    <td className="px-6 py-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4">Automation or manual control options</td>
                    <td className="px-6 py-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">Optimized for your benefit, not theirs</td>
                    <td className="px-6 py-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4">No restrictions on solar system size</td>
                    <td className="px-6 py-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">No lock-in contract</td>
                    <td className="px-6 py-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-brand-mixed text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join the <span className="text-brand-secondary-light">xTechs</span> + <span className="text-brand-secondary-light">Amber</span> Partnership?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Get premium residential & commercial solar systems from xTechs AND maximize your earnings with Amber Electric's wholesale pricing. 
              Perfect for homeowners and businesses looking to maximize their solar investment!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-brand-secondary hover:bg-brand-secondary/90 text-black font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <Link href="https://app.amber.com.au/signup/?couponCode=XTECHSRENEWAB" target="_blank">
                  Get xTechs Customer Benefits
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-brand-primary hover:bg-gray-100 font-semibold border-2 border-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <Link href="/contact">
                  Get xTechs Solar Quote
                </Link>
              </Button>
            </div>
            <div className="mt-8 bg-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">🎁 Exclusive Partnership Benefits</h3>
              <p className="text-sm text-white/80">
                • Use coupon code <strong>XTECHSRENEWAB</strong> for special pricing<br/>
                • Priority support from both xTechs and Amber teams<br/>
                • Seamless integration between your solar system and energy optimization
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">About Our Partnership</h3>
              <p className="text-gray-600 mb-4">
                xTechs and Amber Electric have formed a strategic partnership to provide homeowners and businesses with the best 
                residential & commercial solar systems and energy optimization. While we work together to maximize your benefits, each company 
                operates independently within their expertise.
              </p>
              <p className="text-sm text-gray-500">
                <strong>Disclaimer:</strong> Amber Electric is a separate energy retailer. xTechs provides solar systems and installation services. 
                Earnings depend on market conditions and system performance. Past performance doesn't guarantee future results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
