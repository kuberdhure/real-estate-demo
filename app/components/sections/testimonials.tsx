"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReviewCard from "../cards/reviews";
import testimonials from "@/app/lib/data/testimonials";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const context = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLElement>("[data-review-card]");

            gsap.set(cards, {
                y: 48,
                autoAlpha: 0,
                scale: 0.98,
            });

            gsap.to(cards, {
                y: 0,
                autoAlpha: 1,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.15,
                scrollTrigger: {
                    trigger: section,
                    start: "top 10%",
                    end: "40% 30%",        // fixed scroll distance in px, or "bottom 10%"
                    scrub: 0.4,    
                    // markers:true      // less lag
                },
            });
        }, section);

        return () => context.revert();
    }, []);

    return (
        <div id="testimonials" className="w-full bg-brand">

            <div ref={sectionRef} className="h-max w-full">
                <div className="flex w-full flex-col items-start justify-between gap-6 px-8 pt-15 sm:flex-row sm:items-end">
                    <div className="flex w-full flex-col gap-4 sm:p-2">
                        <div className="flex items-center gap-4">
                            <span className="h-px w-4 bg-yellow-600 lg:h-0.5 lg:w-9" />
                            <p className="text-[12px] uppercase tracking-[0.2em] text-yellow-600 font-body">
                                Kind Words
                            </p>
                        </div>

                        <div>
                            <h3 className="font-heading text-4xl leading-tight text-secondary sm:text-6xl lg:text-7xl">
                                Stories from people who found <br /> their home
                            </h3>
                        </div>

                        <div className="flex flex-col justify-center gap-2 lg:flex-row">
                            {testimonials.map((testimonial) => (
                                <ReviewCard
                                    key={testimonial.id}
                                    testimonial={testimonial}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}