import { CategoryShowcase } from "@/features/Home/Components/Categoria/category-showcase";
import { CommunityScrollStory } from "@/features/Home/Components/community-scroll-story";
import { FAQ } from "@/features/Home/Components/faq";
import { FeaturedCourses } from "@/features/Home/Components/featured-courses";
import { FeaturesStickyScroll } from "@/features/Home/Components/features-sticky-scroll";
import { GoalsScrollSection } from "@/features/Home/Components/goals-scroll-section";
import { Hero } from "@/features/Home/Components/Hero";
import { InteractiveCta } from "@/features/Home/Components/interactive-cta";
import { InternationalCommunity } from "@/features/Home/Components/international-community";
import { TestimonialShowcase } from "@/features/Home/Components/Testimonios/testimonial-showcase";
import { Background } from "@/features/Home/ui/background";

export default function Home() {
    return (
        <Background>
            <Hero />

            <FeaturedCourses />

            <InternationalCommunity />

            <TestimonialShowcase />

            <FeaturesStickyScroll />

            <CategoryShowcase />

            <CommunityScrollStory />

            <GoalsScrollSection />

            <InteractiveCta />

            <FAQ />
        </Background>
    );
}