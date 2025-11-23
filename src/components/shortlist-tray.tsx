"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, ShoppingCart, GitCompare } from "lucide-react";

interface Package {
  id: number;
  tier: string;
  kwDC: number;
  panels: string;
  inverter: string;
  battery: string | null;
  price: string;
  estAnnualYield: string;
  billReduction: string;
}

export function ShortlistTray() {
  const [shortlist, setShortlist] = useState<Package[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Load shortlist from localStorage
    const saved = localStorage.getItem('xtechs-shortlist');
    if (saved) {
      setShortlist(JSON.parse(saved));
    }
  }, []);

  const removeFromShortlist = (id: number) => {
    const updated = shortlist.filter(pkg => pkg.id !== id);
    setShortlist(updated);
    localStorage.setItem('xtechs-shortlist', JSON.stringify(updated));
  };

  const clearShortlist = () => {
    setShortlist([]);
    localStorage.removeItem('xtechs-shortlist');
  };

  if (!isMounted || shortlist.length === 0) {
    return null;
  }

  return (
    <>
      {/* Floating Shortlist Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <Button 
          onClick={() => setIsOpen(true)}
          className="rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          My Shortlist ({shortlist.length})
        </Button>
      </div>

      {/* Shortlist Tray Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center p-4">
          <div className="bg-white rounded-t-lg w-full max-w-4xl max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">My Shortlist</h2>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </Button>
                  {shortlist.length > 1 && (
                    <Button size="sm">
                      <GitCompare className="h-4 w-4 mr-2" />
                      Compare ({Math.min(shortlist.length, 4)})
                    </Button>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {shortlist.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Your shortlist is empty</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {shortlist.map((pkg) => (
                    <Card key={pkg.id} className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 z-10"
                        onClick={() => removeFromShortlist(pkg.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      
                      <CardHeader className="pb-2">
                        <Badge variant={pkg.tier === "Premium" ? "default" : pkg.tier === "Mid-range" ? "secondary" : "outline"}>
                          {pkg.tier}
                        </Badge>
                        <CardTitle className="text-lg">{pkg.kwDC}kW System</CardTitle>
                        <CardDescription>{pkg.price}</CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Annual Yield:</span>
                          <p className="text-gray-600">{pkg.estAnnualYield}</p>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Bill Reduction:</span>
                          <p className="text-gray-600">{pkg.billReduction}</p>
                        </div>
                        <div className="pt-2">
                          <Button size="sm" className="w-full">
                            Request Quote
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
            
            {shortlist.length > 0 && (
              <div className="p-6 border-t bg-gray-50">
                <div className="flex items-center justify-between">
                  <Button variant="outline" onClick={clearShortlist}>
                    Clear All
                  </Button>
                  <Button>
                    Get Quotes for All
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
