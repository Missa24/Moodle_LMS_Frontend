import { CategoryShowcase } from "@/features/Home/Components/Categoria/category-showcase";
import { CommunityScrollStory } from "@/features/Home/Components/Gallery/community-scroll-story";
import { FAQ } from "@/features/Home/Components/Faq/faq";
import { FeaturedCourses } from "@/features/Home/Components/CardsCourses/featured-courses";
import { FeaturesStickyScroll } from "@/features/Home/Components/Platform/features-sticky-scroll";
import { GoalsScrollSection } from "@/features/Home/Components/Gallery/goals-scroll-section";
import { InteractiveCta } from "@/features/Home/Components/Cta/interactive-cta";
import { InternationalCommunity } from "@/features/Home/Components/Community/international-community";
import { TestimonialShowcase } from "@/features/Home/Components/Testimonios/testimonial-showcase";
import { Background } from "@/features/Home/ui/background";
import { PromoRibbon } from "@/features/Home/Components/Promo/PromoRibbon";
import { Hero } from "@/features/Home/Components/Hero/Hero";
import { SEO } from "@/components/common/SEO";

export default function Home() {
    return (
        <>
            <SEO
                title="Formación profesional en estética"
                description="Elite Academy ofrece formación profesional en cosmetología, cosmiatría, dermatocosmiatría, maquillaje profesional y estética."
                url="/"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "EducationalOrganization",
                    name: "Elite Academy",
                    url: "https://moodle-lms-frontend-eight.vercel.app",
                    address: {
                        "@type": "PostalAddress",
                        addressLocality: "La Paz",
                        addressCountry: "BO",
                    },
                }}
            />

            <Background>
                <Hero />
                <PromoRibbon />
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
        </>
    );
}   