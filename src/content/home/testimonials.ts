/**
 * Testimonials Section Content
 * Client testimonials and logos for the homepage
 */

export interface Testimonial {
  id: number;
  heroQuote: string;
  reviewText: string;
  name: string;
  role: string;
  company: string;
  photoUrl?: string;
  initials?: string;
}

export interface ClientLogo {
  id: number;
  name: string;
  label?: string;
}

export const testimonialsContent = {
  eyebrow: "Client Voices / Highlight",
  autoRotateMs: 6500,
  logoMarqueeDuration: 36,
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    heroQuote: "Shipping with Wodh felt like unlocking a new studio inside our team.",
    reviewText:
      "We expected a vendor; we got a partner. Wodh handled performance, polish, and iteration speed without ever losing the original creative intent. Every milestone came back sharper than the last. Their calm production rhythm made a hard launch feel smooth.",
    name: "Julia Meyer",
    role: "Senior Producer",
    company: "Bright Arcade Studios",
    initials: "JM",
  },
  {
    id: 2,
    heroQuote: "They understood our XR vision in the first call — then shipped beyond it.",
    reviewText:
      "Wodh didn't just build our experience; they protected it. Scope stayed clean, deadlines stayed real, and quality never dipped. We felt like we were co-building with an in-house team instead of outsourcing. The final delivery was sharper than our internal benchmark.",
    name: "Omar Al Nahyan",
    role: "Director of Digital Experiences",
    company: "Mirage City Developments",
    initials: "ON",
  },
  {
    id: 3,
    heroQuote: "Minimal back-and-forth. Maximum clarity, speed, and craft.",
    reviewText:
      "Their communication is unusually calm and structured for a creative studio. We moved from prototype to production with almost no friction. Strong taste, strong engineering, and the right amount of challenge to our assumptions.",
    name: "Elena Rossi",
    role: "Head of XR Innovation",
    company: "Nordic Vision Lab",
    initials: "ER",
  },
  {
    id: 4,
    heroQuote: "The team kept latency low and the magic high.",
    reviewText:
      "We've worked with many teams, but Wodh balanced design, performance, and iteration pace in a rare way. Our stakeholders noticed immediately, and players felt the difference in the first session.",
    name: "Hannah Clarke",
    role: "Experience Director",
    company: "Museum Timewarp",
    initials: "HC",
  },
];

export const clientLogos: ClientLogo[] = [
  { id: 1, name: "TraceAR", label: "City XR" },
  { id: 2, name: "Bright Arcade", label: "Game Studio" },
  { id: 3, name: "Museum Timewarp", label: "Cultural XR" },
  { id: 4, name: "Neo Retail Lab", label: "Retail Innovation" },
  { id: 5, name: "Skyline EDU", label: "Learning XR" },
  { id: 6, name: "XR Sandbox", label: "R&D" },
];
