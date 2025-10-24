import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaArrowRight } from "react-icons/fa";
import Button from "../common/Button";
import Card from "../common/Card";
import { ANIMATION_VARIANTS } from "../../utils/constants";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setLoading(false);
    }, 1000);
  };

  const newsletterPosts = [
    {
      id: 1,
      title: "Building Service Building Learning Community 2023",
      excerpt:
        "Discover how our community-based learning initiatives are creating lasting impact...",
      date: "October 15, 2023",
      image: "/api/placeholder/300/200",
      category: "Community Impact",
    },
    {
      id: 2,
      title: "Bridging Service, Building Leadership and Civic Responsibility",
      excerpt:
        "Learn about our leadership development programs and their role in fostering...",
      date: "October 10, 2023",
      image: "/api/placeholder/300/200",
      category: "Leadership",
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Newsletter Signup */}
          <motion.div
            variants={ANIMATION_VARIANTS.fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <FaEnvelope />
                <span>Stay Updated</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Subscribe to Our Newsletter
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                Get the latest updates on our programs, success stories, and
                educational resources delivered straight to your inbox.
              </p>
            </div>

            {!isSubscribed ? (
              <Card className="p-8 bg-gradient-to-br from-primary-50 to-secondary-50 border-0">
                <form onSubmit={handleSubscribe} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="consent"
                      className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="consent" className="text-sm text-gray-600">
                      I agree to receive newsletters and updates about
                      educational programs and events.
                    </label>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={loading}
                    icon={<FaArrowRight />}
                    className="w-full"
                  >
                    Subscribe Now
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    Join 10,000+ educators and students who trust our
                    newsletter. Unsubscribe anytime.
                  </p>
                </div>
              </Card>
            ) : (
              <Card className="p-8 bg-green-50 border-green-200">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-green-600 text-2xl">✓</span>
                  </div>
                  <h3 className="text-xl font-semibold text-green-800">
                    Thank you for subscribing!
                  </h3>
                  <p className="text-green-700">
                    You'll receive our latest updates and educational resources
                    soon.
                  </p>
                </div>
              </Card>
            )}

            {/* Newsletter Benefits */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">What you'll get:</h3>
              <ul className="space-y-2">
                {[
                  "Weekly educational insights and tips",
                  "Early access to new programs and courses",
                  "Success stories from our community",
                  "Exclusive resources and downloadable content",
                  "Updates on scholarship opportunities",
                ].map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Latest Newsletter Posts */}
          <motion.div
            variants={ANIMATION_VARIANTS.fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Read Our Latest Newsletter
              </h3>
              <p className="text-gray-600">
                Catch up on our recent updates and featured stories.
              </p>
            </div>

            <div className="space-y-6">
              {newsletterPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-1/3">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 sm:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-xs font-medium">
                            {post.category}
                          </span>
                          <span className="text-sm text-gray-500">
                            {post.date}
                          </span>
                        </div>

                        <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                          {post.title}
                        </h4>

                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center text-primary-600 text-sm font-medium group-hover:text-primary-700">
                          <span>Read More</span>
                          <FaArrowRight
                            className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                            size={12}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Button variant="outline" className="w-full">
              View All Newsletter Issues
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
