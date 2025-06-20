import React from 'react'
import { Check } from 'lucide-react'

export default function CheckoutProcess() {
  return (
    <div className="flex items-center justify-start gap-x-1.5 mb-8">
      <div className="flex items-center gap-x-1.5">
        <div className="w-7 h-7 rounded-full border-[2.5px] border-custom-blue flex items-center justify-center">
          <Check size={12} strokeWidth={4} className="text-custom-blue" />
        </div>
        <span className="text-custom-blue text-xl">Cart</span>
      </div>
      <div className="h-0.5 w-10 bg-custom-blue rounded-full"></div>
      <div className="flex items-center gap-x-1.5">
        <div className="w-7 h-7 rounded-full border-[2.5px] border-custom-blue flex items-center justify-center">
          <Check size={12} strokeWidth={4} className="text-custom-blue" />
        </div>
        <span className="text-custom-blue text-xl">Checkout</span>
      </div>
      <div className="h-0.5 w-10 bg-text-secondary rounded-full"></div>
      <div className="flex items-center gap-x-1.5">
        <div className="w-7 h-7 rounded-full border-[2.5px] border-text-secondary flex items-center justify-center">
          <Check size={12} strokeWidth={4} className="text-text-secondary" />
        </div>
        <span className="text-text-secondary">Confirmation</span>
      </div>
    </div>
  )
}
