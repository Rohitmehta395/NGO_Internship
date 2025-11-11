import TestimonialHero from "../components/sections/TestimonialHero";
import VideoTestimonials from "../components/sections/VideoTestimonial";
import MediaTestimonial from "../components/sections/MediaTestimonial";
import ScreenshotCarousel from "../components/sections/ScreenshotCaraousel";    

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