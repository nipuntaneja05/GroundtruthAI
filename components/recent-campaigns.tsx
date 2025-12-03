"use client"

import { useState } from "react"
import { ChevronRight, Check, Clock } from "lucide-react"

interface Campaign {
  id: number
  name: string
  images: string[]
  status: "Completed" | "Draft"
  variants: number
  timestamp: string
}

export default function RecentCampaigns() {
  const [campaigns] = useState<Campaign[]>([
    {
      id: 1,
      name: "Coffee Bliss Winter Launch",
      images: ["/coffee-ad-1.jpg", "/coffee-ad-2.jpg", "/coffee-ad-3.jpg"],
      status: "Completed",
      variants: 8,
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      name: "Summer Sneaker Collection",
      images: ["/sneaker-ad-1.jpg", "/sneaker-ad-2.jpg", "/sneaker-ad-3.jpg"],
      status: "Completed",
      variants: 12,
      timestamp: "1 day ago",
    },
    {
      id: 3,
      name: "Tech Gadget Launch",
      images: ["/tech-ad-1.jpg", "/tech-ad-2.jpg", "/tech-ad-3.jpg"],
      status: "Draft",
      variants: 4,
      timestamp: "3 days ago",
    },
    {
      id: 4,
      name: "Luxury Watch Campaign",
      images: ["/watch-ad-1.jpg", "/watch-ad-2.jpg", "/watch-ad-3.jpg"],
      status: "Completed",
      variants: 6,
      timestamp: "1 week ago",
    },
  ])

  return (
    <div className="glass rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-slate-100">Recent Campaigns</h2>
        <a href="#" className="text-teal-400 hover:text-teal-300 text-sm font-semibold flex items-center gap-1">
          View All <ChevronRight className="w-4 h-4" />
        </a>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="overflow-x-auto pb-4 -mx-6 md:-mx-8 px-6 md:px-8">
        <div className="flex gap-4 min-w-min">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="flex-shrink-0 w-80 p-4 rounded-xl glass-light hover:scale-105 hover:shadow-xl hover:shadow-teal-500/10 transition-all cursor-pointer"
            >
              {/* Images Strip */}
              <div className="flex gap-2 mb-4">
                {campaign.images.map((img, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800 flex-shrink-0"
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {campaign.variants > 3 && (
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-teal-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-teal-300">+{campaign.variants - 3}</span>
                  </div>
                )}
              </div>

              {/* Campaign Info */}
              <h3 className="text-sm font-semibold text-slate-100 mb-2">{campaign.name}</h3>

              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <span>{campaign.variants} variants</span>
                <span>{campaign.timestamp}</span>
              </div>

              {/* Status Pill */}
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold ${
                  campaign.status === "Completed" ? "bg-teal-500/20 text-teal-300" : "bg-amber-500/20 text-amber-300"
                }`}
              >
                {campaign.status === "Completed" ? <Check className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                {campaign.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
