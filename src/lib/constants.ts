export const PORTFOLIO_CONFIG = {
  personal: {
    name: "Bhaswat Gogoi",
    title: "Android Developer",
    email: "xbhaswat@gmail.com",
    phone: "8638704247",
    location: "6th Mile, Ghy-36, Assam",
    linkedin: "https://linkedin.com/in/bhaswatgogoi",
    github: "https://github.com/THORzero9",
    resumeUrl: "/assets/resume.pdf",
  },
  sections: {
    hero: "hero",
    about: "about",
    projects: "projects",
    techStack: "tech-stack",
    contact: "contact",
  },
  phone: {
    model: "Nothing Phone 2a",
    width: 340,
    height: 680,
    screenWidth: 300,
    screenHeight: 620,
    cornerRadius: "2.5rem", // Less rounded than iPhone
  },
} as const;

export const PROJECTS = [
  {
    id: "aura-agentic-app",
    title: "Aura Agentic Android App",
    description: "AI-powered learning platform with personalized content curation and skill assessment. Leverages GCP and Gemini API for intelligent user interaction.",
    techStack: ["Kotlin", "Jetpack Compose", "Python", "FastAPI", "GCP", "Appwrite", "Gemini API"],
    demoVideo: "/assets/videos/aura-demo.mp4",
    githubUrl: "https://github.com/THORzero9/aura-agentic-app",
    liveUrl: "#",
    timeline: "Jun 2025",
  },
  {
    id: "fresh-save",
    title: "Fresh Save",
    description: "Android application using MVVM architecture to help users reduce household food wastage. Features smart inventory tracking and expiry notifications.",
    techStack: ["Kotlin", "Jetpack Compose", "Appwrite", "Koin", "MVVM"],
    demoVideo: "/assets/videos/fresh-save-demo.mp4",
    githubUrl: "https://github.com/THORzero9/Fresh_Save",
    liveUrl: "#",
    timeline: "Mar 2025 - May 2025",
  },
  {
    id: "toolshare-app",
    title: "Toolshare App",
    description: "Peer-to-peer Android app enabling users to share and borrow tools within their local community. Features secure user authentication and real-time communication.",
    techStack: ["Jetpack Compose", "MongoDB", "Node.js", "Express.js", "REST APIs"],
    demoVideo: "/assets/videos/toolshare-demo.mp4",
    githubUrl: "https://github.com/THORzero9/toolshare",
    liveUrl: "#",
    timeline: "Jun 2024 - Sept 2024",
  },
] as const;

export const TECH_STACK = [
  {
    category: "Languages",
    technologies: [
      { name: "Kotlin", icon: "/assets/icons/kotlin.svg" },
      { name: "JavaScript", icon: "/assets/icons/javascript.svg" },
      { name: "Python", icon: "/assets/icons/python.svg" },
      { name: "C++", icon: "/assets/icons/cpp.svg" },
    ],
  },
  {
    category: "Mobile Development",
    technologies: [
      { name: "Jetpack Compose", icon: "/assets/icons/compose.svg" },
      { name: "Android SDK", icon: "/assets/icons/android.svg" },
      { name: "Room Database", icon: "/assets/icons/room.svg" },
      { name: "Retrofit", icon: "/assets/icons/retrofit.svg" },
    ],
  },
  {
    category: "Backend & Cloud",
    technologies: [
      { name: "Node.js", icon: "/assets/icons/nodejs.svg" },
      { name: "Express.js", icon: "/assets/icons/express.svg" },
      { name: "MongoDB", icon: "/assets/icons/mongodb.svg" },
      { name: "Firebase", icon: "/assets/icons/firebase.svg" },
      { name: "Google Cloud", icon: "/assets/icons/gcp.svg" },
      { name: "Appwrite", icon: "/assets/icons/appwrite.svg" },
    ],
  },
  {
    category: "Tools & Technologies",
    technologies: [
      { name: "Android Studio", icon: "/assets/icons/android-studio.svg" },
      { name: "VS Code", icon: "/assets/icons/vscode.svg" },
      { name: "Git/GitHub", icon: "/assets/icons/git.svg" },
      { name: "Postman", icon: "/assets/icons/postman.svg" },
      { name: "REST APIs", icon: "/assets/icons/api.svg" },
      { name: "Koin", icon: "/assets/icons/koin.svg" },
    ],
  },
] as const;

export const ABOUT_ME = {
  summary: "Android Developer with hands-on experience creating full-stack, AI-powered applications using MVVM architecture. Proficient in Kotlin and Jetpack Compose, with a proven track record of architecting and deploying complex projects using GCP and generative AI. Passionate about building innovative, production-ready mobile solutions that solve real-world problems.",
  highlights: [
    "Experience with AI/ML integration using GCP and Gemini API",
    "Developed multiple Android apps using Jetpack Compose and MVVM architecture",
    "Skilled in full-stack development with Node.js, Express.js, and MongoDB",
    "Proficient in modern Android development tools and cloud technologies",
    "Strong background in problem-solving and software architecture",
  ],
  education: {
    degree: "Master of Computer Application",
    institution: "SRM Institute of Science & Technology, KTR",
    location: "Chennai, TN",
    duration: "Aug 2023 - Jun 2025"
  },
  experience: [
    {
      title: "Android Developer Intern",
      company: "CATLA IT & ENGG. CO. PVT. LTD.",
      location: "Ghy, Assam",
      duration: "Jan 2023 - Jun 2023",
      description: "Established the core application architecture using MVVM and Jetpack Compose, delivering a scalable and maintainable foundation for all future feature development."
    },
    {
      title: "IT Intern",
      company: "YOUTH INDIA FOUNDATION",
      location: "Remote",
      duration: "May 2020 - Sep 2020",
      description: "Provided foundational IT support by maintaining a public-facing website and troubleshooting technical issues for live events, contributing to the organization's online presence and operational reliability."
    }
  ]
} as const;
