
"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PropertyCard from "../cards/prop-card";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const context = gsap.context(() => {
            const media = gsap.matchMedia();

            media.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.from("[data-header-reveal]", {
                    y: 24,
                    autoAlpha: 0,
                    duration: 0.75,
                    stagger: 0.12,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: "[data-section-header]",
                        start: "top 85%",
                    },
                });

                const cards = gsap.utils.toArray<HTMLElement>("[data-property-card]");

                gsap.set(cards, { y: 32, autoAlpha: 0 });

                const cardTriggers = ScrollTrigger.batch(cards, {
                    start: "top 85%",
                    once: true,
                    onEnter: (visibleCards) => {
                        gsap.to(visibleCards, {
                            y: 0,
                            autoAlpha: 1,
                            duration: 0.8,
                            stagger: 0.18,
                            ease: "power3.out",
                        });
                    },
                });

                return () => cardTriggers.forEach((trigger) => trigger.kill());
            });

            return () => media.revert();
        }, section);

        return () => context.revert();
    }, []);

    return (
        <div id="properties" ref={sectionRef} className="pt-20 px-4 w-full h-auto bg-secondary sm:px-8">
            <div data-section-header className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
                <div className="flex flex-col gap-4 sm:p-2">
                    <div className="flex items-center gap-4">
                        <span className="h-px w-4 lg:h-0.5 lg:w-9 bg-amber-100" />
                        <p data-header-reveal className="text-[8px] uppercase tracking-[0.2em] text-amber-100 font-body">
                            Curated for you
                        </p>

                    </div>
                    <div>
                        <h3 data-header-reveal className="font-heading text-brand text-4xl leading-tight sm:text-6xl lg:text-7xl">Homes worth discovering</h3>
                    </div>
                </div>
                <div data-header-reveal className="flex items-center justify-start gap-1 text-xs whitespace-nowrap sm:justify-center sm:text-sm lg:text-lg">
                    <a className="underline underline-offset-6" href="#">
                        View All Properties
                    </a>
                    <ArrowUpRight className="size-4 sm:size-5 lg:size-[25px]" />
                </div>
            </div>
            {/* Cards */}
            <div data-property-grid className="grid grid-cols-1  gap-2 px-0 py-5  md:grid-cols-2 md:gap-10 md:p-10 lg:gap-8">

                {/* Left */}
                <div>
                    <PropertyCard
                        image="/images/properties/villa-1.jpg"
                        title="The Glass House"
                        location="Palm Springs, California"
                        price="$4.8M"
                        details="4 beds · 5 baths · 4,120 sq ft"
                        featured
                    />
                </div>

                {/* Right */}
                <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
                    <PropertyCard
                        image="/images/properties/villa-2.jpg"
                        title="Casa Serena"
                        location="Malibu, California"
                        price="$6.2M"
                        details="3 beds · 4 baths · Oceanfront"
                    />

                    <PropertyCard
                        image="/images/properties/villa-3.jpg"
                        title="Oak & Light"
                        location="Beverly Hills, California"
                        price="$2.9M"
                        details="4 beds · 3.5 baths · 3,680 sq ft"
                    />
                </div>

            </div>
        </div>
    );
}