const WEDDING_CONFIG = {
    couple: {
        bride: {
            name: "Sumithra",
            role: "The Bride",
            image: "images/bride.jpg",
            bio: "A beautiful soul with grace and warmth. Her smile and kind heart won over everyone."
        },
        groom: {
            name: "Vittal",
            role: "The Groom",
            image: "images/groom.jpg",
            bio: "A dedicated and caring person with strong values and a loving heart."
        }
    },
    quote: {
        text: "What therefore God has joined together, let no man separate",
        reference: "Mark 10:9"
    },
    weddingDate: "2026-03-30T17:00:00",
    hashtag: "#VittalSumithraWedding",
    theme: {
        primaryColor: "#005bb5",
        accentColor: "#4da6ff",
        darkColor: "#002244",
        lightPink: "#f0f8ff"
    },
    events: [
        {
            title: "Wedding Ceremony",
            tag: "VIVAH CEREMONY",
            subtitle: "Shubh Vivah",
            icon: "🪔",
            details: [
                {
                    icon: "fas fa-calendar-alt",
                    label: "DATE",
                    value: "Monday, March 30, 2026",

                },
                {
                    icon: "fas fa-clock",
                    label: "MUHURAT",
                    value: "11:12 AM - 12:30 PM",
                    tag: "✨ SHUBH MUHURAT"
                },
                {
                    icon: "fas fa-map-marker-alt",
                    label: "VENUE",
                    value: "Shri Mahaganapati Mahamaya Temple",
                    subValue: "Shirali, Karnataka, India"
                }
            ],
            mapsUrl: "https://share.google/g6m8pYSHudee2GUR7"
        },
        {
            title: "Wedding Reception",
            tag: "Reception",
            subtitle: "Swagat Samaroh",
            icon: "🌸",
            details: [
                {
                    icon: "fas fa-calendar-alt",
                    label: "DATE",
                    value: "Saturday, April 4, 2026",

                },
                {
                    icon: "fas fa-clock",
                    label: "TIME",
                    value: "7:00 PM – 11:00 PM",
                    subValue: "Dinner & Celebrations"
                },
                {
                    icon: "fas fa-map-marker-alt",
                    label: "VENUE",
                    value: "Dwarakanath Bhavan",
                    subValue: "Bengaluru, Karnataka, India"
                }
            ],
            mapsUrl: "https://maps.app.goo.gl/qwR41z5xMzLYM3cKA"
        }
    ],
    gallery: [
        { src: "images/gallery/bride-real.jpg", caption: "Sumithra", category: "family" },
        { src: "images/gallery/groom-real.jpg", caption: "Vittal", category: "family" },
        { src: "images/first-meet.jpg", caption: "First Meeting", category: "engagement" }
    ],
    contact: {
        label: "Nagaraj",
        phone: "7090878288",
        display: "+91 7090878288"
    }
};
