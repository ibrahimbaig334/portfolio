/**
 * Hardcoded portfolio data (ported from portfolio-v2, filled with your existing content)
 *
 * Edit this file to update text, projects, timeline items, etc.
 */

import profileImage from "../images/man.png";
import resumePdf from "../cv.pdf";

export const portfolioData = {
  hero: {
    availabilityStatus: "Available for Work",
    nameWords: ["IBRAHIM", "BAIG"],
    fullName: "Ibrahim Baig",
    designation: "Full-Stack & AI Engineer | Python Automation, LLMs",
    summary:
      "I build fast, reliable products from backend to frontend, with a strong focus on practical AI integration. At Hashcore, I design scalable NestJS/TypeScript services and modern React experiences, while also delivering Python automation, Telegram bots, and open-source LLM fine-tuning/integration for specialized workflows. I enjoy turning complex ideas into clear, production-ready systems that are easy to maintain.",
    yearsOfExperience: 2,
    projectsCompleted: 7,
    satisfactionRate: 98,
    techStack: [
      "React",
      "Node.js",
      "JavaScript",
      "TypeScript",
      "NestJS",
      "Next.js",
      "Python",
      "Solidity",
      "Tailwind CSS",
    ],
    profileImage,
    resumeLink: resumePdf,
  },

  skills: {
    categories: [
      {
        title: "Frontend",
        colorScheme: "primary",
        gradientFrom: "from-primary-500",
        gradientTo: "to-secondary-500",
        skills: [
          "React",
          "Next.js",
          "Figma",
          "JavaScript",
          "TypeScript",
          "HTML",
          "CSS",
          "Tailwind CSS",
        ],
      },
      {
        title: "Backend & APIs",
        colorScheme: "secondary",
        gradientFrom: "from-secondary-500",
        gradientTo: "to-accent-500",
        skills: [
          "Node.js",
          "Express",
          "NestJS",
          "REST APIs",
          "Authentication",
          "MongoDB",
          "SQL",
        ],
      },
      {
        title: "Blockchain & Automation",
        colorScheme: "accent",
        gradientFrom: "from-accent-500",
        gradientTo: "to-primary-500",
        skills: [
          "Solidity",
          "Smart Contracts",
          "Web3",
          "The Graph",
          "DeFi",
          "Ethers.js",
          "Solana Web3.js",
          "Python Scripting",
          "Python Bots",
          "Automation",
          "Data Processing",
        ],
      },
      {
        title: "AI & LLMs",
        colorScheme: "primary",
        gradientFrom: "from-primary-500",
        gradientTo: "to-accent-500",
        skills: [
          "Open-source LLMs",
          "Fine-tuning (LoRA/PEFT)",
          "Prompt Engineering",
          "Evaluation",
          "Python",
        ],
      },
    ],
  },

  education: [],

  experience: [
    {
      company: "Hashcore",
      location: "Karachi, Pakistan",
      startDate: "Aug 2024",
      currentlyWorking: true,
      careerProgression: [
        {
          title: "Full-Stack Developer",
          startDate: "Aug 2024",
          endDate: "Present",
        },
      ],
      keyAchievements: [
        "Designed and maintained modular NestJS + TypeScript services with a strong focus on reliability, code quality, and long-term maintainability.",
        "Engineered the backend for Pumpkin.fun, optimizing core workflows for performance, security, and operational stability.",
        "Fine-tuned open-source LLMs (LoRA/PEFT) and integrated them into practical internal workflows for automation and assisted content generation.",
      ],
    },
    {
      company: "Freelance",
      location: "Remote",
      startDate: "June 2024",
      currentlyWorking: true,
      careerProgression: [
        {
          title: "Freelance Python Telegram Bot Developer",
          startDate: "June 2024",
          endDate: "Present",
        },
      ],
      keyAchievements: [
        "Built custom Telegram bots in Python for token tracking, posting automation, and migration/status monitoring.",
        "Delivered client-specific bot workflows including scheduling, queue management, and database-backed processing.",
        "Provided ongoing production support with stability improvements, feature enhancements, and deployment updates.",
      ],
    },
  ],

  projects: [
    {
      id: 1,
      slug: "pumpkin-fun",
      title: "Pumpkin.fun",
      description:
        "A high-performance Solana fair-launch platform built for community-driven meme tokens, with a backend optimized for scale, safety, and fast iteration.",
      usedSkills: ["NestJS", "TypeScript", "Node.js", "REST APIs"],
      images: [],
      isFeatured: true,
      link: "https://pumpkin.fun",
    },
    {
      id: 2,
      slug: "pumpkin-analytics-moderation-suite",
      title: "Pumpkin Revenue & Moderation Suite",
      description:
        "A focused toolkit around Pumpkin.fun: (1) earning.pumpkin.fun for launch revenue comparisons (Pumpkin vs Pump.fun), and (2) an admin moderation dashboard for monitoring and handling reported tokens in real time.",
      usedSkills: [
        "React",
        "JavaScript",
        "Analytics",
        "Dashboards",
        "Admin Tools",
      ],
      images: [],
      isFeatured: false,
      link: "https://earning.pumpkin.fun",
    },
    {
      id: 3,
      slug: "pump-chart-bot",
      title: "@pumpchartsbot",
      description:
        "Telegram bot that tracks token activity and posts timely chart and market updates for active communities.",
      usedSkills: ["Python", "Telegram", "APIs", "Automation"],
      images: [],
      isFeatured: false,
      link: "https://t.me/pumpchartsbot",
    },
    {
      id: 4,
      slug: "pump-token-bot",
      title: "@mysterypumpbot",
      description:
        "Telegram bot focused on token workflow automation and rapid status updates (releasing soon).",
      usedSkills: ["Python", "Telegram", "Schedulers", "SQLite"],
      images: [],
      isFeatured: true,
      link: "https://t.me/mysterypumpbot",
    },
    {
      id: 5,
      slug: "pumpfun-migration-check-bot",
      title: "@pumpmigrationsbot",
      description:
        "Telegram bot that monitors and reports pump.fun token migration status for faster decision-making.",
      usedSkills: ["Python", "Telegram", "APIs", "Databases"],
      images: [],
      isFeatured: false,
      link: "https://t.me/pumpmigrationsbot",
    },
    {
      id: 6,
      slug: "telegram-pump-bot",
      title: "@pumppostsbot",
      description:
        "Telegram bot for parsing and publishing pump.fun-related token updates with automated posting workflows.",
      usedSkills: ["Python", "Telegram", "Parsing", "APIs"],
      images: [],
      isFeatured: false,
      link: "https://t.me/pumppostsbot",
    },
  ],

  testimonials: [
    {
      id: 1,
      name: "Happy Client",
      role: "Founder",
      company: "Startup",
      image: "",
      rating: 5,
      testimonial:
        "Ibrahim delivered exactly what we needed: fast execution, clean communication, and production-ready results.",
    },
  ],

  contact: {
    email: "ibaig6990@gmail.com",
    phone: "0333-2723609",
    location: "Karachi, Pakistan",
    responseTime: "Usually within 24 hours",
    socialLinks: [
      {
        name: "GitHub",
        icon: "github",
        url: "https://github.com/ibrahimbaig334",
      },
      {
        name: "LinkedIn",
        icon: "linkedin",
        url: "https://www.linkedin.com/in/ibrahim-baig-727ba5330/",
      },
      { name: "X", icon: "x", url: "https://twitter.com" },
    ],
  },
};

export default portfolioData;
