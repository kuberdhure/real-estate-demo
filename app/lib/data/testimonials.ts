export interface Testimonial {
    id: number;
    name: string;
    initials: string;
    location: string;
    rating: number;
    review: string;
    role?: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Kuber Dhure",
        initials: "KD",
        location: "California, USA",
        rating: 4.5,
        review:
            "North & Pine brought clarity to a complicated sale. Their calm guidance and attention to detail made all the difference.",
    },
    {
        id: 2,
        name: "Olivia Bennett",
        initials: "OB",
        location: "New York, USA",
        rating: 5,
        review:
            "An exceptional experience from beginning to end. The team understood exactly what we were looking for and made the entire process effortless.",
    },
    {
        id: 3,
        name: "James Anderson",
        initials: "JA",
        location: "London, UK",
        rating: 4.5,
        review:
            "Professional, thoughtful, and incredibly attentive. Their understanding of the market helped us make a confident decision.",
    },
];

export default testimonials;