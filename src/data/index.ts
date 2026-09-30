export const EVENT_DATA = {
  edition: "14th Edition",
  eyebrow: "THE REFINED CHAPTER",
  title: "ARCHINET SUMMIT 2027",
  date: "20 FEBRUARY 2027",
  targetDateISO: "2027-02-20T09:00:00+05:30",
  venue: "THE ST. REGIS, MUMBAI",
  accessType: "BY INVITATION ONLY",
  introStatement: "THE ARCHINET SUMMIT 2027 IS SET TO BRING MORE VISIONARIES TOGETHER FROM AROUND THE WORLD TO EXPLORE THE LATEST TRENDS AND ADVANCEMENTS IN DESIGN AND WILL CREATE A PLACE OF HARMONY AND CREATIVITY.",
  ctaPrimary: "REQUEST AN INVITATION",
  ctaSecondary: "EXHIBIT WITH US",
};

export interface Edition {
  id: string;
  number: string;
  city: string;
  venue: string;
  date: string;
  year: string;
  image?: string;
  video: string;
  highlights: string;
}

export const EDITIONS_DATA: Edition[] = [
  {
    id: "edition-9",
    number: "9TH EDITION",
    city: "MUMBAI",
    venue: "The St. Regis",
    date: "12 Oct 2024",
    year: "2024",
    video: "/assets/event%20videos/9th%20Edition%20Mumbai.mp4",
    highlights: "High-Density Urban Living & Structural Innovation"
  },
  {
    id: "edition-10",
    number: "10TH EDITION",
    city: "BENGALURU",
    venue: "The Leela Palace",
    date: "18 Apr 2025",
    year: "2025",
    video: "/assets/event%20videos/10th%20Edition%20Bengaluru.mp4",
    highlights: "Tech-Infused Workspaces & Next-Gen Spatial Systems"
  },
  {
    id: "edition-11",
    number: "11TH EDITION",
    city: "HYDERABAD",
    venue: "ITC Kohinoor",
    date: "22 Jul 2025",
    year: "2025",
    video: "/assets/event%20videos/11th%20Edition%20Hyderabad.mp4",
    highlights: "Biophilic Hospitality Interiors & Modern Structural Glass"
  },
  {
    id: "edition-12",
    number: "12TH EDITION",
    city: "PUNE",
    venue: "JW Marriott",
    date: "14 Nov 2025",
    year: "2025",
    video: "/assets/event%20videos/12th%20Edition%20Pune.mp4",
    highlights: "Sustainable Masterplanning & Contemporary Facades"
  },
  {
    id: "edition-13",
    number: "13TH EDITION",
    city: "MUMBAI",
    venue: "Jio World Centre",
    date: "15 Mar 2026",
    year: "2026",
    video: "/assets/event%20videos/13th%20Edition%20Mumbai.mp4",
    highlights: "Coastal Modernism & Sustainable Luxury Planning"
  }
];

export interface Leader {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
}

export const LEADERS_DATA: Leader[] = [
  {
    id: "leader-1",
    name: "Ar. Ahmed Shaikh",
    role: "Principal Architect",
    company: "Ahmed & Associates",
    image: "/assets/architects/Ar.%20Ahmed%20Shaikh.jpg"
  },
  {
    id: "leader-2",
    name: "Ar. Annkur Khosla",
    role: "Principal Architect",
    company: "Annkur Khosla Design Studio",
    image: "/assets/architects/Ar.%20Annkur%20Khosla.jpg"
  },
  {
    id: "leader-3",
    name: "Ar. Behzad Kharas",
    role: "Chairman & Managing Director",
    company: "BNK Group",
    image: "/assets/architects/Ar.%20Behzad%20Kharas.jpg"
  },
  {
    id: "leader-4",
    name: "Ar. Canna Patel",
    role: "Principal Architect",
    company: "HCP Interior Design",
    image: "/assets/architects/Ar.%20Canna%20Patel.jpg"
  },
  {
    id: "leader-5",
    name: "Ar. Hiren Patel",
    role: "Principal Architect",
    company: "Hiren Patel Architects",
    image: "/assets/architects/Ar.%20Hiren%20Patel.jpg"
  },
  {
    id: "leader-6",
    name: "Ar. Kavita Talib",
    role: "Principal Architect",
    company: "Kavita Talib Architecture",
    image: "/assets/architects/Ar.%20Kavita%20Talib.jpg"
  },
  {
    id: "leader-7",
    name: "Ar. Khozema Chitalwala",
    role: "Principal Architect",
    company: "Design Matrix",
    image: "/assets/architects/Ar.%20Khozema%20Chitalwala.jpg"
  },
  {
    id: "leader-8",
    name: "Ar. Lakshmi Govekar",
    role: "Principal Architect",
    company: "Zuari Design Studio",
    image: "/assets/architects/Ar.%20Lakshmi%20Govekar.jpg"
  },
  {
    id: "leader-9",
    name: "Ar. Manish Dikshit",
    role: "Founding Principal",
    company: "ADesignStudio",
    image: "/assets/architects/Ar.%20Manish%20Dikshit.jpg"
  },
  {
    id: "leader-10",
    name: "Ar. Milind Pai",
    role: "Principal Architect",
    company: "Milind Pai Architects",
    image: "/assets/architects/Ar.%20Milind%20Pai.jpg"
  },
  {
    id: "leader-11",
    name: "Ar. Prashant Sutaria",
    role: "Principal Architect",
    company: "PSA Architects",
    image: "/assets/architects/Ar.%20Prashant%20Sutaria.jpg"
  },
  {
    id: "leader-12",
    name: "Ar. Santha Gour",
    role: "Principal Architect",
    company: "Planet 3 Studios",
    image: "/assets/architects/Ar.%20Santha%20Gour.jpg"
  },
  {
    id: "leader-13",
    name: "Ar. Saurabh Chaterjee",
    role: "Principal Architect",
    company: "Spatial Design Associates",
    image: "/assets/architects/Ar.%20Saurabh%20Chaterjee.jpg"
  },
  {
    id: "leader-14",
    name: "Ar. Seema Puri",
    role: "Principal Architect",
    company: "Seema Puri & Associates",
    image: "/assets/architects/Ar.%20Seema%20Puri.jpg"
  },
  {
    id: "leader-15",
    name: "Ar. Sonali Bhagwati",
    role: "President & Principal",
    company: "DesignPlus Architecture",
    image: "/assets/architects/Ar.%20Sonali%20Bhagwati.jpg"
  },
  {
    id: "leader-16",
    name: "ID. Aakif Habib",
    role: "Lead Interior Designer",
    company: "Atelier Aakif",
    image: "/assets/architects/ID.%20Aakif%20Habib.jpg"
  },
  {
    id: "leader-17",
    name: "ID. Ketan Sheth",
    role: "Managing Director",
    company: "Goldmine Project Consultant",
    image: "/assets/architects/ID.%20Ketan%20Sheth.jpg"
  },
  {
    id: "leader-18",
    name: "ID. Neeraj Shah",
    role: "Principal Interior Designer",
    company: "Neeraj Shah Design",
    image: "/assets/architects/ID.%20Neeraj%20Shah.jpg"
  },
  {
    id: "leader-19",
    name: "ID. Sapana Jain",
    role: "Design Director",
    company: "I-Design Studios",
    image: "/assets/architects/ID.%20Sapana%20Jain.jpg"
  },
  {
    id: "leader-20",
    name: "ID. Soniya Potdarr",
    role: "Lead Interior Designer",
    company: "Studio Poddar",
    image: "/assets/architects/ID.%20Soniya%20Potdarr.jpg"
  }
];

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  rating: number;
  avatar: string;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "test-1",
    quote: "Working with Archinet transformed our network. Their strategic insights improved our operations and boosted our overall efficiency. We saw a 30% increase in meaningful connections within six months!",
    author: "AR. KHOZEMA CHITALWALA",
    title: "PRINCIPAL ARCHITECT",
    company: "DESIGN MATRIX",
    rating: 5,
    avatar: "/assets/architects/Ar.%20Khozema%20Chitalwala.jpg"
  },
  {
    id: "test-2",
    quote: "The curated environment is engineered for absolute focus of conversation and bespoke dialogue at Archinet is simply in the entire industry.",
    author: "ID. SONIA PODDAR",
    title: "LEAD INTERIOR DESIGNER",
    company: "STUDIO PODDAR",
    rating: 5,
    avatar: "/assets/architects/ID.%20Soniya%20Potdarr.jpg"
  },
  {
    id: "test-3",
    quote: "ArchiNet Summit is unequivocally the finest architectural congregation in Asia. The level of dialogue and curated networking is unmatched.",
    author: "AR. SANJAY PURI",
    title: "PRINCIPAL ARCHITECT",
    company: "SANJAY PURI ARCHITECTS",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "test-4",
    quote: "An extraordinary convergence of visionary architects, structural innovators, and top-tier luxury brands under one pristine roof.",
    author: "AR. MANIT RASTOGI",
    title: "FOUNDER PRINCIPAL",
    company: "MORPHOGENESIS",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
  }
];

export const STATISTICS_DATA = [
  { value: "2500+", label: "ARCHITECTS & DESIGNERS" },
  { value: "150+", label: "LEADING BRANDS" },
  { value: "13", label: "COMPLETED EDITIONS" },
  { value: "5", label: "MAJOR CITIES" },
];

export const BRANDS_DATA = [
  "FOSTER + PARTNERS",
  "ZAHA HADID ARCHITECTS",
  "GENSLER",
  "STUDIO LOTUS",
  "MORPHOGENESIS",
  "HAFELE",
  "KOHLER",
  "POLIFORM",
  "MINOTTI",
  "B&B ITALIA",
  "BENTLEY HOME",
  "LUALDI",
  "RIMADESIO",
  "FLOS"
];

export const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop"
];
