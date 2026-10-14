"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
    rating: number;
    maxStars?: number;
}

export default function StarRating({
    rating,
    maxStars = 5,
}: StarRatingProps) {
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: maxStars }).map((_, index) => {
                const fill = Math.min(
                    Math.max(rating - index, 0),
                    1
                );

                return (
                    <div key={index} className="relative">
                        {/* Empty star */}
                        <Star
                            size={20}
                            className="text-[#d7c8b1]"
                            strokeWidth={0.5}
                        />

                        {/* Filled portion */}
                        <div
                            className="absolute inset-0 overflow-hidden"
                            style={{ width: `${fill * 100}%` }}
                        >
                            <Star
                                size={20}
                                className="fill-[#d7c8b1] text-[#d7c8b1]"
                                strokeWidth={1.5}
                            />
                        </div>
                    </div>
                );
            })}

            {/* <span className="ml-2 text-sm font-medium">
                {rating.toFixed(1)}
            </span> */}
        </div>
    );
}