"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";

export default function ContactCTA() {
    const [interest, setInterest] = useState("");

    return (
        <section id="contact" className="w-full bg-[#F4F0E7] px-6 py-24 md:px-12 lg:px-[5.4%] lg:py-28">

            <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-24">

                {/* LEFT CONTENT */}
                <div className="flex flex-col">

                    {/* Eyebrow */}
                    <div className="mb-10 flex items-center gap-4">
                        <span className="h-px w-9 bg-[#183B32]" />
                        <p className="font-body text-[11px] uppercase tracking-[0.22em] text-[#183B32]">
                            Start a conversation
                        </p>
                    </div>

                    {/* Heading */}
                    <h2 className="max-w-[650px] font-heading text-5xl leading-[1.05] tracking-[-0.04em] text-[#183B32] sm:text-6xl lg:text-[5.5rem]">
                        Your next chapter starts{" "}
                        <span className="italic">here.</span>
                    </h2>

                    {/* Description */}
                    <p className="mt-10 max-w-[520px] font-body text-base leading-[2] text-[#777C77] sm:text-lg">
                        Buying, selling, or simply curious? Tell us what's
                        on your mind. We'll be in touch within one business day.
                    </p>

                    {/* Contact details */}
                    <div className="mt-12 flex flex-col gap-3">
                        <a
                            href="mailto:hello@northandpine.com"
                            className="w-fit font-heading text-xl text-[#183B32] transition-opacity hover:opacity-60 sm:text-2xl"
                        >
                            hello@northandpine.com
                        </a>

                        <a
                            href="tel:+13105550148"
                            className="w-fit font-heading text-xl text-[#183B32] transition-opacity hover:opacity-60 sm:text-2xl"
                        >
                            +1 310 555 0148
                        </a>
                    </div>

                </div>

                {/* RIGHT FORM */}
                <form
                    className="flex flex-col gap-9 lg:pt-14"
                    onSubmit={(e) => {
                        e.preventDefault();
                        // Connect your form submission API here.
                    }}
                >

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">

                        <div className="flex flex-col gap-4">
                            <label
                                htmlFor="name"
                                className="font-body text-[10px] uppercase tracking-[0.16em] text-[#183B32]"
                            >
                                Your name
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Jane Smith"
                                required
                                className="w-full border-0 border-b border-[#B9B9AE] bg-transparent pb-4 font-body text-base text-[#183B32] outline-none placeholder:text-[#92968F] transition-colors focus:border-[#183B32]"
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <label
                                htmlFor="email"
                                className="font-body text-[10px] uppercase tracking-[0.16em] text-[#183B32]"
                            >
                                Email address
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="jane@email.com"
                                required
                                className="w-full border-0 border-b border-[#B9B9AE] bg-transparent pb-4 font-body text-base text-[#183B32] outline-none placeholder:text-[#92968F] transition-colors focus:border-[#183B32]"
                            />
                        </div>

                    </div>

                    {/* Interest dropdown */}
                    <div className="flex flex-col gap-4">
                        <label
                            htmlFor="interest"
                            className="font-body text-[10px] uppercase tracking-[0.16em] text-[#183B32]"
                        >
                            I'm interested in
                        </label>

                        <div className="relative">
                            <select
                                id="interest"
                                name="interest"
                                value={interest}
                                onChange={(e) => setInterest(e.target.value)}
                                required
                                className="w-full appearance-none border-0 border-b border-[#B9B9AE] bg-transparent pb-4 pr-10 font-body text-base text-[#183B32] outline-none transition-colors focus:border-[#183B32]"
                            >
                                <option value="" disabled>
                                    Select one
                                </option>
                                <option value="Buying a property">Buying a property</option>
                                <option value="Selling a property">Selling a property</option>
                                <option value="Property valuation">Property valuation</option>
                                <option value="Investment">Investment</option>
                                <option value="General inquiry">General inquiry</option>
                            </select>

                            <ChevronDown
                                size={18}
                                className="pointer-events-none absolute right-1 top-0 text-[#183B32]"
                            />
                        </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-4">
                        <label
                            htmlFor="message"
                            className="font-body text-[10px] uppercase tracking-[0.16em] text-[#183B32]"
                        >
                            Tell us a little more
                        </label>

                        <textarea
                            id="message"
                            name="message"
                            rows={3}
                            placeholder="What would make your next move feel just right?"
                            required
                            className="w-full resize-y border-0 border-b border-[#B9B9AE] bg-transparent pb-4 font-body text-base text-[#183B32] outline-none placeholder:text-[#92968F] transition-colors focus:border-[#183B32]"
                        />
                    </div>

                    {/* Submit */}
                    <div className="pt-1">
                        <button
                            type="submit"
                            className="group flex min-w-[210px] items-center justify-between gap-8 bg-[#183B32] px-7 py-5 font-body text-sm text-white transition-colors duration-300 hover:bg-[#285447]"
                        >
                            <span>Send inquiry</span>

                            <ArrowUpRight
                                size={19}
                                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </button>
                    </div>

                </form>

            </div>
        </section>
    );
}