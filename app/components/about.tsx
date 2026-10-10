"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Page() {
    const sectionRef = useRef<HTMLElement>(null);
    const yearsRef = useRef<HTMLHeadingElement>(null);
    const homesRef = useRef<HTMLHeadingElement>(null);
    const referralsRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                },
            });

            // Heading reveal
            tl.from(".about-heading", {
                y: 45,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",
            })

                // Description and CTA
                .from(
                    ".about-copy",
                    {
                        y: 25,
                        opacity: 0,
                        duration: 0.7,
                        ease: "power2.out",
                    },
                    "-=0.5"
                )

                // Vertical divider
                .from(
                    ".about-divider",
                    {
                        scaleY: 0,
                        duration: 0.7,
                        ease: "power2.out",
                        transformOrigin: "top",
                    },
                    "-=0.5"
                )

                // Horizontal divider
                .from(
                    ".metrics-divider",
                    {
                        scaleX: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        transformOrigin: "left",
                    },
                    "-=0.3"
                )

                // Metrics reveal in sequence
                .from(
                    ".metric",
                    {
                        y: 25,
                        opacity: 0,
                        duration: 0.6,
                        stagger: 0.15,
                        ease: "power2.out",
                    },
                    "-=0.3"
                );
            const counters = [
                { ref: yearsRef, end: 16, suffix: "+" },
                { ref: homesRef, end: 480, suffix: "+" },
                { ref: referralsRef, end: 96, suffix: "%" },
            ];

            counters.forEach(({ ref, end, suffix }) => {
                if (!ref.current) return;

                const counter = { value: 0 };

                gsap.to(counter, {
                    value: end,
                    duration: 2,
                    ease: "power2.out",
                    snap: { value: 1 },
                    scrollTrigger: {
                        trigger: ref.current,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                    onUpdate: () => {
                        if (ref.current) {
                            ref.current.textContent =
                                `${Math.round(counter.value)}${suffix}`;
                        }
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="flex min-h-screen w-full flex-col justify-center bg-brand px-5 py-16 sm:px-8 md:px-8 md:py-20"
        >
            {/* Heading + description */}
            <div className="grid grid-cols-1 gap-8 pb-8 md:grid-cols-[1fr_1px_0.6fr] md:gap-10 md:pb-10">

                {/* Heading */}
                <div>
                    <h2 className="about-heading font-heading text-4xl italic leading-[1.05] text-black sm:text-5xl md:text-6xl lg:text-7xl">
                        Real estate is personal.
                        <br />
                        We believe the experience
                        <br />
                        should be, too.
                    </h2>
                </div>

                {/* Vertical divider */}
                <div className="about-divider h-px w-full bg-green-700 md:h-full md:w-px" />

                {/* Description + CTA */}
                <div className="about-copy flex flex-col items-start justify-center">
                    <p className="max-w-md font-body text-sm leading-7 text-black sm:text-base">
                        We're a boutique agency built around genuine relationships,
                        local expertise, and the belief that finding home should
                        feel exciting—not overwhelming.
                    </p>

                    <button className="mt-5 border border-black px-6 py-3 text-sm text-black transition-colors duration-300 hover:bg-green-700 hover:text-white sm:px-8 sm:py-4 sm:text-base">
                        Meet our team ↗
                    </button>
                </div>
            </div>

            {/* Horizontal divider */}
            <div className="metrics-divider mt-8 px-1 sm:mt-12 sm:px-2 md:mt-16 md:px-2">
                <div className="w-full border-t border-black/30" />
            </div>

            {/* Metrics */}
            <div className="mt-8 grid grid-cols-1 justify-items-center gap-8 px-1 text-center sm:grid-cols-3 sm:justify-items-stretch sm:text-left sm:gap-5 sm:px-2 md:mt-10 md:gap-8">

                <div className="metric">
                    <h4 ref={yearsRef} className="font-heading text-5xl leading-none text-black sm:text-5xl md:text-6xl lg:text-7xl">
                        16+
                    </h4>
                    <p className="mt-2 font-body text-sm text-gray-600 sm:text-xs md:text-sm lg:text-base">
                        Years of local expertise
                    </p>
                </div>

                <div className="metric">
                    <h4 ref={homesRef} className="font-heading text-5xl leading-none text-black sm:text-5xl md:text-6xl lg:text-7xl">
                        480+
                    </h4>
                    <p className="mt-2 font-body text-sm text-gray-600 sm:text-xs md:text-sm lg:text-base">
                        Homes thoughtfully matched
                    </p>
                </div>

                <div className="metric">
                    <h4 ref={referralsRef} className="font-heading text-5xl leading-none text-black sm:text-5xl md:text-6xl lg:text-7xl">
                        96%
                    </h4>
                    <p className="mt-2 font-body text-sm text-gray-600 sm:text-xs md:text-sm lg:text-base">
                        Business from referrals
                    </p>
                </div>

            </div>
        </section>
    );
}