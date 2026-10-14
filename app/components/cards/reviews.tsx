import StarRating from "../ui/stars";
import { Testimonial } from "@/app/lib/data/testimonials";

interface ReviewCardProps {
    testimonial: Testimonial;
}

export default function ReviewCard({ testimonial }: ReviewCardProps) {
    return (
        <article
            data-review-card
            className="my-2 flex min-h-80 w-full flex-col justify-between rounded-2xl bg-secondary p-7 md:p-9 lg:min-h-155"
        >

            <div className="flex items-center justify-between">
                <StarRating rating={testimonial.rating} />
                <span className="text-xs uppercase tracking-widest opacity-50">
                    Client Review
                </span>
            </div>

            <div className="my-12">
                <h3 className="font-heading text-3xl leading-[1.3] md:text-4xl">
                    "{testimonial.review}"
                </h3>
            </div>

            <div className="flex items-center gap-4 border-t border-black/10 pt-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-green-800 text-white font-semibold">
                    {testimonial.initials}
                </div>

                <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm opacity-50">
                        {testimonial.location}
                    </p>
                </div>
            </div>

        </article>
    );
}