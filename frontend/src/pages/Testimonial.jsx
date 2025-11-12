import TestimonialHero from "../components/sections/testimonials/TestimonialHero";
import VideoTestimonials from "../components/sections/testimonials/VideoTestimonial";
import MediaTestimonial from "../components/sections/testimonials/MediaTestimonial";
import ScreenshotCarousel from "../components/sections/testimonials/ScreenshotCaraousel";    

const Testimonial = () => {
  return (
    <>
    <TestimonialHero />
    <MediaTestimonial />
    <VideoTestimonials />
    <ScreenshotCarousel />
    </>
  )
}               

export default Testimonial;