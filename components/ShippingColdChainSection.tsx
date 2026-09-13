"use client";

import React from "react";
import { Snowflake } from "lucide-react";

export default function ShippingColdChainSection() {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-white text-gray-900 border-t border-gray-100">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start gap-6">
        <div className="shrink-0 w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
          <Snowflake className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-michroma uppercase font-bold tracking-wider mb-4">
            Shipping, Cold Chain and Storage
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Orders placed before the daily cut-off ship the same business day. Each vial travels as lyophilised
            powder inside an insulated container with coolant, on the carrier service chosen for transit time
            rather than cost.
            <br />
            <br />
            On arrival, move unopened vials to −20°C storage, sealed, dry and away from light until you are ready
            to reconstitute. Record the batch number in your laboratory notebook at intake — it links the material
            on your bench to the Certificate of Analysis on file.
          </p>
        </div>
      </div>
    </section>
  );
}
