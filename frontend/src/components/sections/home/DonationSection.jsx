import React from "react";
import { Heart, Star } from "lucide-react";
import qrCodeImage from "../../../assets/QR.webp";

export default function DonationSection() {
  const qrImage =
    qrCodeImage ||
    "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https://sharadaeducationaltrust.org";

  return (
    <div id="donation" className="w-full px-4 py-6 sm:py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        {/* <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-yellow-600 rounded-3xl shadow-2xl overflow-hidden"> */}
        <div className="rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left side - QR Code */}
            <div className="p-6 sm:p-8 md:p-12 flex items-center justify-center">
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl">
                <img
                  src={qrImage}
                  alt="Donation QR Code"
                  className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md"
                />
              </div>
            </div>

            {/* Right side - Content */}
            <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center text-[#0B0B45] bg-[#FFB76B] ">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
                  <span className="font-semibold text-lg sm:text-xl">
                    Donate now
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold leading-snug sm:leading-tight mb-4 sm:mb-6 text-[#0B0B45]">
                  Together Let's Change The World
                </h2>

                <div className="space-y-2 text-sm sm:text-base text-[#0B0B45]">
                  <p className="italic leading-relaxed">
                    "Donating for an Educational cause is an extremely noble act
                    since the impact lasts a lifetime".
                  </p>
                  <p className="font-medium text-[#0B0B45]">
                    Please scan the QR code to donate generously.
                  </p>
                </div>
              </div>

              {/* Bullet Points */}
              <div className="space-y-2 mb-3 text-[#0B0B45]">
                <div className="flex items-start gap-2 sm:gap-3">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current shrink-0 mt-1" />
                  <p className="leading-relaxed text-sm sm:text-base">
                    <span className="font-semibold">
                      Sharada Educational Trust
                    </span>{" "}
                    is registered as a Public Charitable Trust.
                  </p>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current flex-shrink-0 mt-1" />
                  <p className="leading-relaxed text-sm sm:text-base">
                    The Trust is registered for undertaking CSR activities.
                  </p>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current flex-shrink-0 mt-1" />
                  <p className="leading-relaxed text-sm sm:text-base">
                    Donations are eligible for exemption u/s 80G of Income Tax
                    Act 1961.
                  </p>
                </div>
              </div>

              {/* Note Section */}
              <div className="border-t border-white/30 pt-3 text-[#0B0B45]">
                <p className="font-bold text-lg sm:text-xl mb-2 sm:mb-3">
                  Note:
                </p>
                <p className="leading-relaxed text-sm sm:text-base">
                  UPI Id:{" "}
                  <span className="font-bold">
                    sharadaeducationaltrust.ibz@icici
                  </span>{" "}
                  to transfer funds directly.
                </p>
                <p className="leading-relaxed mt-2 text-sm sm:text-base">
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
