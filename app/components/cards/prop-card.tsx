"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PropertyCardProps {
    image: string;
    title: string;
    location: string;
    price: string;
    details: string;
    featured?: boolean;
}

export default function PropertyCard({
    image,
    title,
    location,
    price,
    details,
    featured = false,
}: PropertyCardProps) {
    const cardRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        const image = imageRef.current;
        const button = buttonRef.current;

        if (!card || !image || !button) return;

        const ctx = gsap.context(() => {
            // Hover animation
            const hoverIn = () => {
                gsap.to(image, {
                    scale: 1.06,
                    duration: 0.8,
                    ease: "power2.out",
                });

                gsap.to(button, {
                    rotation: 45,
                    duration: 0.4,
                    ease: "power2.out",
                });
            };

            const hoverOut = () => {
                gsap.to(image, {
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.out",
                });

                gsap.to(button, {
                    rotation: 0,
                    duration: 0.4,
                    ease: "power2.out",
                });
            };

            card.addEventListener("mouseenter", hoverIn);
            card.addEventListener("mouseleave", hoverOut);

            return () => {
                card.removeEventListener("mouseenter", hoverIn);
                card.removeEventListener("mouseleave", hoverOut);
            };
        }, card);

        return () => ctx.revert();
    }, []);

    return (
        <article ref={cardRef} data-property-card className="group my-2 min-w-0">
            <div
                className={`relative w-full overflow-hidden ${
                    featured ? "aspect-[4/4.5]" : "aspect-[4/2.3]"
                }`}
            >
                <div ref={imageRef} className="absolute inset-0">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                    />
                </div>

                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent" />

                <div className="absolute bottom-6 left-4 right-16">
                    <h3 className="font-serif text-base leading-tight text-white sm:text-xl lg:text-4xl">
                        {title}
                    </h3>

                    <p className="mt-1 text-xs text-white/70 sm:mt-2 lg:text-lg">
                        {location}
                    </p>

                    <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        {/* <p className="text-sm text-white">{price}</p> */}
                        <p className="min-w-0 text-xs text-white/70">
                            {details}
                        </p>
                    </div>
                </div>

                <button
                    ref={buttonRef}
                    className="absolute bottom-6 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black"
                    aria-label={`View ${title}`}
                >
                    <ArrowUpRight className="size-4 lg:size-5" />
                </button>
            </div>
        </article>
    );
}