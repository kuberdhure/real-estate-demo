import Image from "next/image";
import Link from "next/link";

const exploreLinks = [
  { label: "Properties", href: "#properties" },
  { label: "Our story", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
];

const visitLinks = [
  { label: "821 Abbot Kinney Blvd", href: "#" },
  { label: "Venice, CA 90291", href: "#" },
];

const followLinks = [
  { label: "Instagram", href: "#" },
  { label: "Pinterest", href: "#" },
];

export default function Footer() {
  return (
    <footer className="font-body w-full bg-[#022f2a] px-6 pb-8 pt-12 text-[#edf4f0] md:px-10 lg:px-[5.2%] lg:pb-10 lg:pt-16">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-10 pb-10 lg:grid-cols-[1.1fr_1.2fr] lg:items-end lg:gap-10 lg:pb-14">
          <div className="flex items-center gap-4 pt-2">
            <Image
              src="/images/agency-logo.png"
              alt="North & Pine logo"
              width={100}
              height={100}
              className="h-11 w-11 object-contain md:h-12 md:w-12"
            />

            <div className="font-heading text-4xl leading-none tracking-[-0.06em] text-[#edf4f0] sm:text-5xl lg:text-[3.6rem]">
              North &amp; Pine
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:justify-items-start">
            <div>
              <p className="mb-6 text-[11px] uppercase tracking-[0.28em] text-[#edf4f0]/70">
                Explore
              </p>
              <ul className="space-y-4 text-base text-[#edf4f0] sm:text-lg">
                {exploreLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition-opacity hover:opacity-70">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-6 text-[11px] uppercase tracking-[0.28em] text-[#edf4f0]/70">
                Visit
              </p>
              <ul className="space-y-4 text-base text-[#edf4f0] sm:text-lg">
                {visitLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition-opacity hover:opacity-70">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-6 text-[11px] uppercase tracking-[0.28em] text-[#edf4f0]/70">
                Follow
              </p>
              <ul className="space-y-4 text-base text-[#edf4f0] sm:text-lg">
                {followLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition-opacity hover:opacity-70">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-[#edf4f0]/30" />

        <div className="flex flex-col justify-between gap-2 py-5 text-[11px] uppercase tracking-[0.2em] text-[#edf4f0]/80 lg:flex-row">
          <p>© 2025 North &amp; Pine Realty</p>
          <p className="text-left sm:text-right">Equal housing opportunity</p>
        </div>
      </div>
    </footer>
  );
}
