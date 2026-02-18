import React from "react";
import SectionHeading from "../ui/SectionHeading";
import TestimonialCard from "../ui/TestimonialCard";
import { usePortfolioData } from "../../hooks/usePortfolioData";

export default function TestimonialsSection() {
  const { data } = usePortfolioData();

  const testimonials = [...(data.testimonials || [])].reverse();

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-white/15 py-14 backdrop-blur-sm dark:bg-gray-900/20 sm:py-16 md:py-18 lg:py-20"
    >
      <div className="container relative z-10 mx-auto px-3 sm:px-4 lg:px-8">
        <SectionHeading
          title="What People Say"
          subtitle="Testimonials from clients and colleagues I've worked with"
        />

        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((t, index) => (
            <TestimonialCard key={t.id} testimonial={t} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
