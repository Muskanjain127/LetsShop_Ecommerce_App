import React from 'react';

const ReturnPolicy = () => {
  return (
    <div className="max-w-[900px] mx-auto p-10 bg-zinc-900 rounded-2xl border border-white/5 leading-relaxed text-zinc-400">
      <h2 className="text-white mb-5 border-b border-white/10 pb-4">
        Return & Refund Policy
      </h2>

      <p className="mb-5">
        At LetsShop, we proudly stand behind the quality of our merchandise. If for any reason you are completely disastified with your purchase, you may securely initiate a return within 30 days of receiving your order.
      </p>

      <h4 className="text-brand mt-6 mb-2.5">1. Eligibility for Returns</h4>
      <p className="mb-4">
        To be eligible for a return, the item must be completely unused, housed in the same absolute condition that it was received, and maintained within its original factory packaging. Receipts or proof of purchase mappings are strictly required.
      </p>

      <h4 className="text-brand mt-6 mb-2.5">2. Refund Processing</h4>
      <p className="mb-4">
        Once your return is physically received and internally inspected, an immediate email protocol will fire notifying you of the approval status. Approved refunds will cleanly propagate to your original designated Razorpay gateway endpoint within 5-7 business working days naturally.
      </p>

      <h4 className="text-brand mt-6 mb-2.5">3. Exempted Output Goods</h4>
      <p className="mb-4">
        Certain explicit categories such as perishable items, custom software, digital media, or physically tampered items are heavily restricted and do not qualify for any standard refund sequence.
      </p>

      <h4 className="text-brand mt-6 mb-2.5">4. Shipping Transit Costs</h4>
      <p>
        You will actively remain strictly responsible for covering your own outbound logistical shipping rates associated with returning the item. Restocking fees may conditionally apply.
      </p>
    </div>
  );
};

export default ReturnPolicy;
