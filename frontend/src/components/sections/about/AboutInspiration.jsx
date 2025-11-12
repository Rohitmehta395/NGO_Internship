import SmtSharadaKamath from "../../../assets/SmtSharadaKamath.webp";

export default function AboutInspiration() {
  return (
    <div className="bg-white min-h-screen p-8 md:p-12 lg:p-16">
      <div className="max-w-7xl mx-auto bg-gray-100 rounded-3xl p-8 md:p-12 lg:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Portrait */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Orange border frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl transform -rotate-2"></div>

              {/* Main portrait container */}
              <div className="relative bg-gradient-to-b from-gray-600 to-gray-800 rounded-2xl p-4 shadow-2xl">
                {/* Inner frame */}
                <div className="bg-gradient-to-b from-gray-500 to-gray-700 p-3 rounded-lg">
                  {/* Portrait image */}
                  <div className="aspect-[3/4] rounded overflow-hidden">
                    <img
                      src={SmtSharadaKamath}
                      alt="Smt Sharada Kamath"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className="w-6 h-6 text-orange-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                <h2 className="text-orange-500 text-lg md:text-xl font-semibold">
                  Our Inspiration
                </h2>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                About Late Smt Sharada Kamath
              </h1>
            </div>

            {/* First paragraph */}
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              <span className="text-orange-500 font-semibold">
                Smt Sharadabai Kamath
              </span>{" "}
              was born in a small town called Mulki, located about 26 kms north
              of Mangaluru, in the year 1915. She lost her husband early in her
              life and faced all kinds of challenges while bringing up her
              children. However, this did not deter her from helping the
              under-privileged, who approached her for help and support.
            </p>

            {/* Second paragraph */}
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              Though studied upto Class 3, she encouraged her children to
              continue their education. She had mastered the art of narrating
              stories from Ramayana, Mahabharata and Puranas to convey relevant
              social messages to her audience. She had acquired knowledge of
              various medicinal herbs and used this to good effect while
              treating her patients. Her residence was like a hospice or
              "dharmashala" to the poor and needy, who required a roof above
              their head.
            </p>

            {/* Third paragraph */}
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              The Trust formed in the memory of Late Smt Sharada Kamath by her
              grand children, on the occasion of her 25th Death Anniversary
              (Punyatithi), shall support Education related causes, especially
              in the rural areas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
