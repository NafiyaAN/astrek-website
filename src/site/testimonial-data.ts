export type Testimonial = {
  id: string;
  name: string;
  role: string;
  location?: string;
  quote: string;
  /** Optional real portrait. When absent, the UI renders initials instead of
   *  a product photo: a device shot next to a named quote reads as fake. */
  photo?: string;
  storyImage: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "ramesh",
    name: "Ramesh N.",
    role: "Stroke Survivor",
    location: "Kochi, India",
    quote:
      "I thought I may never walk again. With Unik Exo, I took my first steps, and it changed everything.",
    storyImage: "/images/clinical-pilot.webp",
  },
  {
    id: "ananya",
    name: "Dr. Ananya Menon",
    role: "Rehabilitation Specialist",
    location: "Bengaluru, India",
    quote:
      "Unik Exo brings together thoughtful engineering and a clear understanding of what gait rehabilitation actually needs on the clinic floor.",
    storyImage: "/images/clinical-pilot.webp",
  },
  {
    id: "partner",
    name: "Clinical Partner",
    role: "Rehabilitation & Mobility",
    location: "Kerala, India",
    quote:
      "What stood out to us was the team's willingness to listen, test, and improve. The product feels built around the person using it.",
    storyImage: "/images/astrek-lab.webp",
  },
  {
    id: "therapy",
    name: "Therapy Lead",
    role: "Gait Rehabilitation",
    location: "Kannur, India",
    quote:
      "The first time a patient stood without our hands under their arms, the room went quiet. That is the moment this work is for.",
    storyImage: "/images/motion-capture-gait.png",
  },
];
