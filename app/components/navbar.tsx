"use client";

import { useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const links = ["Properties", "About", "Journal"];

export default function Page() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleScroll = (
        e: React.MouseEvent<HTMLAnchorElement>,
        targetId: string
    ) => {
        e.preventDefault();
        setMenuOpen(false);

        gsap.to(window, {
            duration: 0.5,
            scrollTo: {
                y: `#${targetId}`,
                offsetY: 30,
            },
            ease: "expo.inOut",
            overwrite: "auto",
        });
    };

    return (
        <header className="absolute inset-x-0 top-0 z-50 w-full">
            <nav className="relative flex w-full items-center justify-between px-5 py-4 sm:px-8">
                {/* Logo */}
                <a href="/" className="shrink-0">
                    <Image
                        src="/images/agency-logo.png"
                        width={200}
                        height={200}
                        alt="North & Pine"
                        priority
                        className="h-auto w-32 sm:w-40 md:w-48"
                    />
                </a>

                {/* Desktop links */}
                <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 font-(--font-heading) min-[900px]:flex">
                    {links.map((item) => (
                        <li key={item}>
                            <a
                                href={`#${item.toLowerCase()}`}
                                onClick={(e) =>
                                    handleScroll(e, item.toLowerCase())
                                }
                                className="nav-link relative inline-block py-2 text-white"
                            >
                                {item}
                                <span className="nav-underline absolute bottom-0 left-0 h-px w-full bg-white" />
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Desktop CTA */}
                <a
                    href="#contact"
                    onClick={(e) => handleScroll(e, "contact")}
                    className="hidden shrink-0 p-2 font-(--font-heading) text-white underline decoration-1 underline-offset-4 transition-all duration-300 hover:underline-offset-8 min-[900px]:block"
                >
                    Let's talk ↗
                </a>

                {/* Mobile hamburger */}
                <button
                    type="button"
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    className="ml-auto shrink-0 p-2 text-2xl leading-none text-white min-[900px]:hidden"
                >
                    {menuOpen ? "✕" : "☰"}
                </button>
            </nav>

            {/* Mobile dropdown */}
            {menuOpen && (
                <div className="bg-black/35 px-6 py-6 min-[900px]:hidden">
                    <ul className="flex flex-col gap-4 font-(--font-heading)">
                        {links.map((item) => (
                            <li key={item}>
                                <a
                                    href={`#${item.toLowerCase()}`}
                                    onClick={(e) =>
                                        handleScroll(e, item.toLowerCase())
                                    }
                                    className="block py-2 text-white"
                                >
                                    {item}
                                </a>
                                <div className="border-b border-white/30" />
                            </li>
                        ))}
                    </ul>

                    <a
                        href="#contact"
                        onClick={(e) => handleScroll(e, "contact")}
                        className="mt-5 inline-block text-white underline underline-offset-4"
                    >
                        Let's talk ↗
                    </a>
                </div>
            )}

            {/* Divider */}
            <div
                className={`mx-5 border-b border-white/30 sm:mx-10 ${
                    menuOpen ? "hidden min-[900px]:block" : ""
                }`}
            />
        </header>
    );
}