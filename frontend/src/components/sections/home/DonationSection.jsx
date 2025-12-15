import React from "react";
import { Heart, Star } from "lucide-react";
import qrCodeImage from "../../../assets/QR.webp";

export default function DonationSection() {
  // You can pass your QR code image as a prop, or use a default placeholder
  const qrImage =
    qrCodeImage ||
    "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https://sharadaeducationaltrust.org";

  return (
    <div id="donation" className="w-full px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-yellow-600 rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left side - QR Code */}
            <div className="p-8 md:p-12 flex items-center justify-center">
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <img
                  src={qrImage}
                  alt="Donation QR Code"
                  className="w-full h-auto max-w-md"
                />
              </div>
            </div>

            {/* Right side - Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center text-white">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-7 h-7 fill-current" />
                  <span className="font-semibold text-xl">Donate now</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-white">
                  Together Let's Change The World
                </h2>

                <div className="space-y-2 text-md">
                  <p className="italic leading-relaxed">
                    "Donating for an Educational cause is an extremely noble act
                    since the impact lasts a lifetime".
                  </p>
                  <p className="font-medium">
                    Please scan the QR code to donate generously.
                  </p>
                </div>
              </div>

              {/* Bullet Points */}
              <div className="space-y-1 mb-3">
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 fill-current flex-shrink-0 mt-1" />
                  <p className="leading-relaxed">
                    <span className="font-semibold">
                      Sharada Educational Trust
                    </span>{" "}
                    is registered as a Public Charitable Trust.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 fill-current flex-shrink-0 mt-1" />
                  <p className="leading-relaxed">
                    The Trust is registered for undertaking CSR activities.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 fill-current flex-shrink-0 mt-1" />
                  <p className="leading-relaxed">
                    Donations are eligible for exemption u/s 80G of Income Tax
                    Act 1961.
                  </p>
                </div>
              </div>

              {/* Note Section */}
              <div className="border-t border-white/30 pt-3">
                <p className="font-bold text-xl mb-3">Note:</p>
                <p className="leading-relaxed">
                  UPI Id:{" "}
                  <span className="font-bold">
                    sharadaeducationaltrust.ibz@icici
                  </span>{" "}
                  to transfer funds directly.
                </p>
                <p className="leading-relaxed mt-2">
                  Once the bank transfer is completed, please send an email to{" "}
                  <span className="font-semibold">info@sharadatrust.org</span>{" "}
                  or WhatsApp us on{" "}
                  <span className="font-semibold">+91 9019911804</span> sharing
                  the following details: Full Name, PAN and Address.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
