"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ArrowUp, ArrowUpRight , X , Menu } from "lucide-react";

gsap.registerPlugin(ScrollToPlugin);

const links = ["Properties", "About", "Journal"];

export default function Page() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const headerRef = useRef<HTMLElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    // Initial navbar entrance
    useEffect(() => {
        const ctx = gsap.context(() => {
            const nav = navRef.current;

            if (!nav) return;

            const items = nav.querySelectorAll("[data-nav-item]");

            gsap.set(nav, { opacity: 1 });

            const tl = gsap.timeline({
                defaults: { ease: "power3.out" },
            });

            tl.from(nav, {
                y: -25,
                duration: 0.8,
            }).from(
                items,
                {
                    y: -12,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.6,
                    clearProps: "all",
                },
                "-=0.45"
            );
        }, headerRef);

        return () => ctx.revert();
    }, []);

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Navbar scroll animation

    // Smooth symmetrical navbar resize
    useEffect(() => {
        if (!navRef.current) return;

        const nav = navRef.current;

        const animateNavbar = () => {
            const isMobile = window.innerWidth < 900;

            gsap.killTweensOf(nav);

            // Mobile: never shrink the navbar
            if (isMobile) {
                nav.style.removeProperty("width");
                nav.style.removeProperty("padding-left");
                nav.style.removeProperty("padding-right");

                gsap.to(nav, {
                    borderRadius: scrolled ? "999px" : "0px",

                    paddingTop: scrolled ? 12 : 16,
                    paddingBottom: scrolled ? 12 : 16,

                    boxShadow: scrolled
                        ? "0px 8px 40px rgba(0,0,0,0.25)"
                        : "0px 0px 0px rgba(0,0,0,0)",

                    duration: 1.1,
                    ease: "power3.inOut",
                    overwrite: "auto",
                });
                return;
            }

            // Desktop: calculate natural content width
            const currentWidth = nav.getBoundingClientRect().width;

            const previousWidth = nav.style.width;
            const previousPaddingLeft = nav.style.paddingLeft;
            const previousPaddingRight = nav.style.paddingRight;

            nav.style.width = "max-content";
            nav.style.paddingLeft = "28px";
            nav.style.paddingRight = "28px";

            const collapsedWidth = nav.getBoundingClientRect().width;

            // Restore current width
            nav.style.width = `${currentWidth}px`;
            nav.style.paddingLeft = previousPaddingLeft;
            nav.style.paddingRight = previousPaddingRight;

            gsap.to(nav, {
                width: scrolled
                    ? collapsedWidth
                    : "100%",

                borderRadius: scrolled ? "999px" : "0px",

                paddingTop: scrolled ? 6 : 8,
                paddingBottom: scrolled ? 6 : 8,
                paddingLeft: scrolled ? 28 : 32,
                paddingRight: scrolled ? 28 : 32,

                borderColor: scrolled
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(255, 255, 255, 0)",

                backdropFilter: scrolled
                    ? "blur(10px) saturate(200%)"
                    : "blur(0px)",

                boxShadow: scrolled
                    ? "0px 8px 40px rgba(0,0,0,0.25)"
                    : "0px 0px 0px rgba(0,0,0,0)",

                duration: 1.1,
                ease: "power3.inOut",
                overwrite: "auto",
            });
        };

        animateNavbar();

        window.addEventListener("resize", animateNavbar);

        return () => {
            window.removeEventListener("resize", animateNavbar);
            gsap.killTweensOf(nav);
        };
    }, [scrolled]);


    // Mobile dropdown animation
    useEffect(() => {
        const menu = mobileMenuRef.current;

        if (!menu) return;

        const mobileLinks = menu.querySelectorAll("[data-mobile-link]");

        if (menuOpen) {
            gsap.set(menu, {
                visibility: "visible",
            });

            gsap.killTweensOf(menu);

            const tl = gsap.timeline();

            tl.to(menu, {
                height: "auto",
                opacity: 1,
                duration: 0.4,
                ease: "power3.out",
            }).fromTo(
                mobileLinks,
                {
                    y: 12,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.08,
                    duration: 0.35,
                    ease: "power2.out",
                },
                "-=0.15"
            );
        } else {
            gsap.killTweensOf(menu);

            gsap.to(menu, {
                height: 0,
                opacity: 0,
                duration: 0.3,
                ease: "power2.inOut",
                onComplete: () => {
                    gsap.set(menu, {
                        visibility: "hidden",
                    });
                },
            });
        }
    }, [menuOpen]);

    // Smooth anchor scrolling
    const handleScroll = (
        e: React.MouseEvent<HTMLAnchorElement>,
        targetId: string
    ) => {
        e.preventDefault();
        setMenuOpen(false);

        gsap.to(window, {
            duration: 0.8,
            scrollTo: {
                y: `#${targetId}`,
                offsetY: 30,
            },
            ease: "expo.inOut",
            overwrite: "auto",
        });
    };

    return (
        <header
            ref={headerRef}
            className="fixed inset-x-0 top-10 z-50 w-full sm:px-6"
        >
            <nav
                ref={navRef}
                className={`
            mx-3 flex w-[calc(100%-1.5rem)] max-w-[1400px]
            sm:mx-auto sm:w-full
            items-center justify-between gap-4
            rounded-2xl px-5 sm:px-8
            min-[900px]:grid min-[900px]:grid-cols-[1fr_auto_1fr]
            transition-colors duration-300

            ${scrolled
                        ? "border border-white/20 bg-black/30  shadow-lg backdrop-blur-xl sm:mt-4"
                        : "border border-transparent bg-transparent"
                    }
        `}
            >
                {/* Logo */}
                <a
                    href="/"
                    className="shrink-0 justify-self-start"
                    data-nav-item
                >
                    <Image
                        src="/images/agency-logo.png"
                        width={100}
                        height={100}
                        alt="North & Pine"
                        priority
                        className="h-auto w-24 sm:w-40 md:w-48 min-[900px]:w-36"
                    />
                </a>

                {/* Desktop Navigation */}
                <ul
                    className="hidden items-center justify-self-center gap-8
                        font-(--font-heading) min-[900px]:flex"
                >
                    {links.map((item) => (
                        <li key={item} data-nav-item>
                            <a
                                href={`#${item.toLowerCase()}`}
                                onClick={(e) =>
                                    handleScroll(e, item.toLowerCase())
                                }
                                className="nav-link relative inline-block
                                    py-2 text-white"
                            >
                                {item}

                                <span
                                    className="nav-underline absolute bottom-0
                                        left-0 h-px w-full origin-left
                                        scale-x-0 bg-white transition-transform
                                        duration-300 hover:scale-x-100"
                                />
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Desktop CTA */}
                <a
                    href="#contact"
                    onClick={(e) => handleScroll(e, "contact")}
                    data-nav-item
                    className="hidden justify-self-end shrink-0 p-2
                        font-(--font-heading) text-white
                        min-[900px]:mr-4
                        underline decoration-1 underline-offset-4
                        transition-all duration-300
                        hover:underline-offset-8
                        min-[900px]:flex   min-[900px]:items-center gap-2"
                >
                    Contact us
                    <ArrowUpRight className="size-4 " />
                </a>

                {/* Mobile Hamburger */}
                <button
                    type="button"
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    className="col-start-3 ml-auto shrink-0 p-2
                        text-2xl leading-none text-white
                        min-[900px]:hidden"
                >
                    {menuOpen ? <X size={15}/> : <Menu size={15}/>}
                </button>
            </nav>

            {/* Mobile Dropdown */}
            <div
                ref={mobileMenuRef}
                aria-hidden={!menuOpen}
                className="invisible absolute right-3 top-full mt-2
        w-[min(18rem,calc(100vw-1.5rem))]
        h-0 overflow-hidden rounded-2xl
        border border-white/10 bg-neutral-900/70
        px-6 opacity-0 backdrop-blur-2xl
        min-[900px]:hidden"
            >
                <ul className="flex flex-col gap-4 py-6 font-(--font-heading)">
                    {links.map((item) => (
                        <li key={item}>
                            <a
                                data-mobile-link
                                href={`#${item.toLowerCase()}`}
                                onClick={(e) =>
                                    handleScroll(e, item.toLowerCase())
                                }
                                className="block py-2 text-white"
                            >
                                {item}
                            </a>

                            <div className="border-b border-white/20" />
                        </li>
                    ))}

                    {/* Mobile CTA */}
                    <li>
                        <a
                            href="#contact"
                            onClick={(e) => handleScroll(e, "contact")}
                            data-mobile-link
                            className="py-3 text-white underline
                                decoration-1 underline-offset-4 flex items-center gap-2 mr-4"
                        >
                            Let's talk
                            <ArrowUpRight className="size-4 " />
                        </a>
                    </li>
                </ul>
            </div>

            {/* Divider */}
            {!scrolled && (
                <div className="-mt-2 mx-5 border-b border-white/30 sm:mx-10" />
            )}
        </header>
    );
}
