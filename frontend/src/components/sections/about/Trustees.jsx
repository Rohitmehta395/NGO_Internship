export default function Trustees({ trustees }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-16 px-4 md:px-8 lg:px-12">
      {/* Orange decorative elements */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-32 md:h-40 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 opacity-80 -z-0"></div>

      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-30 blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-300 rounded-full opacity-20 blur-2xl"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 md:mb-20 text-[#0B0B45]">
          Trustees <span className="font-normal">(Karyakartas)</span>
        </h1>

        {/* Trustees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {trustees.map((trustee, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Image Container */}
              <div className="bg-gray-100 p-4">
                <div className="aspect-[3/4] rounded-lg overflow-hidden">
                  <img
                    src={trustee.image}
                    alt={trustee.name}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
              </div>

              {/* Name Badge */}
              <div className="px-6 py-4">
                <div className="bg-orange-400 rounded-full px-6 py-3 text-center">
                  <h2 className="text-xl md:text-1xl font-bold text-white">
                    {trustee.name}
                  </h2>
                </div>
              </div>

              {/* Know More Link */}
              <div className="px-6 pb-6">
                <a
                  href={trustee.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-xl md:text-sm font-bold text-[#0B0B45] hover:text-orange-400 transition-colors underline"
                >
                  Know More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
