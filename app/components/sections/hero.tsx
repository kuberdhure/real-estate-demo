"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

export default function Page() {
    const heroRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const eyebrowRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: {
                    ease: "power3.out",
                },
                delay: 0.2,
            });

            // Subtle background zoom-out
            tl.fromTo(
                imageRef.current,
                { scale: 1.12 },
                { scale: 1, duration: 2, ease: "power2.out" },
                0
            );

            // Reveal heading
            tl.fromTo(
                headingRef.current,
                { y: 70, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.1 },
                0.3
            );

            // Small supporting text reveal
            tl.fromTo(
                eyebrowRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7 },
                0.7
            );

            // CTA buttons enter after the heading
            tl.fromTo(
                ctaRef.current,
                { y: 35, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
                0.9
            );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={heroRef}
            className="relative h-screen w-full overflow-hidden"
        >
            {/* Background image */}
            <div ref={imageRef} className="absolute inset-0">
                <Image
                    src="/images/hero.png"
                    alt="A beautiful home"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
            </div>

            {/* Dark overlay */}
            <div className="absolute inset-0 z-10 bg-black/30" />

            {/* Hero content */}
            <div className="relative z-20 flex min-h-screen flex-col justify-center px-6 pt-24 text-brand sm:px-8">
                <h1
                    ref={headingRef}
                    className="font-heading text-5xl leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl"
                >
                    Find a place
                    <br />
                    that feels like
                    <span className="pl-8 italic font-heading text-5xl leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl">
                        {" "}home.
                    </span>
                </h1>

                <p
                    ref={eyebrowRef}
                    className="mt-5 max-w-md text-sm leading-6 text-brand/80 sm:text-base"
                >
                    Thoughtfully finding places you'll love to call home.
                </p>

                <div
                    ref={ctaRef}
                    className="mt-5 flex flex-wrap items-center gap-6 sm:gap-8"
                >
                    {/* Primary CTA */}
                    <button className="self-start bg-brand px-5 py-3 text-black transition-colors duration-300 hover:bg-green-700 hover:text-white">
                        Explore Homes
                    </button>

                    {/* Secondary CTA */}
                    <a
                        href="#contact"
                        className="group inline-flex flex-col gap-1 text-brand"
                    >
                        <span className="text-sm font-light text-brand/75">
                            Have a question?
                        </span>

                        <span className="inline-flex items-center gap-1 text-lg font-light">
                            Let's talk
                            <span className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                                <ArrowUpRight className="size-4 lg:size-6"/>
                            </span>
                        </span>

                        <span className="h-px w-full origin-left bg-brand transition-transform duration-300 group-hover:scale-x-75" />
                    </a>
                </div>
            </div>
        </div>
    );
}