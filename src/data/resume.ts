export interface Experience {
  company: string;
  role: string;
  period: string;
  bullets: string[];
  technologies: string[];
}

export interface Project {
  name: string;
  subtitle: string;
  date: string;
  description: string;
  technologies: string[];
  github: string;
}

export interface Education {
  school: string;
  degree: string;
  gpa: string;
  graduation: string;
  location: string;
}

export interface ContactInfo {
  name: string;
  fullName: string;
  location: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
}

export const contact: ContactInfo = {
  name: "Alexander Elguezabal",
  fullName: "Alexander Theodore Elguezabal",
  location: "Seattle, Washington",
  phone: "603-425-4017",
  email: "alextelguezabal@gmail.com",
  github: "https://github.com/FrostFire25",
  linkedin: "https://linkedin.com/in/alex-elguezabal/",
};

export const education: Education = {
  school: "Merrimack College",
  degree: "Bachelor of Science in Computer Science",
  gpa: "3.8",
  graduation: "May 2025",
  location: "North Andover, MA",
};

export const experiences: Experience[] = [
  {
    company: "Microsoft",
    role: "Software Engineer",
    period: "Aug 2025 – Present",
    bullets: [
      "Developed for the M365 Compliance Platform, a full-stack application that automates compliance workflows for internal and external regulatory audits.",
      "Worked across organizations at Microsoft to solve the company's largest compliance-related issues.",
      "Utilized React with TypeScript, .NET Core with C# for backend, deployed into Azure through Azure DevOps.",
      "Maintainer for the open-source FluentUI extension project FluentUiEditableDetailsList.",
    ],
    technologies: ["React", "TypeScript", ".NET Core", "C#", "Azure", "Cosmos DB", "Kusto"],
  },
  {
    company: "Microsoft",
    role: "Software Engineer Intern",
    period: "May 2024 – Aug 2024",
    bullets: [
      "Member of the M365 Enterprise Cloud Trusted Platforms team ensuring data integrity, compliance, and governance.",
      "Designed a Data Editor allowing administrators to perform CRUD operations inside a JIT environment.",
      "Contributed features to the open-source project FluentUIEditableDetailsList.",
      "Presented business outcomes and technical design to the organization and leaders.",
    ],
    technologies: ["React", ".NET", "TypeScript", "FluentUI"],
  },
  {
    company: "Oracle",
    role: "Site Reliability Engineer Intern",
    period: "May 2023 – Aug 2023",
    bullets: [
      "Member of Restricted Cloud Operations team: engineered web services and monitoring systems.",
      "Developed for the Data Obfuscation Enterprise Service, which obfuscates PII Data.",
      "Trained for Incident Commander, Communicator, and Scribe roles.",
      "Created IaC additions for cloud deployment tool built on OCI Shepherd using Terraform, Kubernetes.",
    ],
    technologies: ["Terraform", "Kubernetes", "OCI", "Java"],
  },
  {
    company: "Merrimack College",
    role: "Undergraduate Researcher",
    period: "Aug 2022 – May 2023",
    bullets: [
      "Lead developer for a team of three on a mobile app to track the on-campus bus shuttle system.",
      "Developed a service using Java Spring to process bus information stored in MongoDB Cloud.",
      "Designed algorithms for bus routes, stops, and geolocation using Google Directions API.",
    ],
    technologies: ["Java Spring", "MongoDB", "Google Directions API"],
  },
  {
    company: "Visibility Corporation",
    role: "Software Engineer Intern",
    period: "May 2022 – Aug 2022",
    bullets: [
      "Designed and developed multiple web interfaces for a SaaS ERP and Business Analytics product.",
      "Utilized Blazor, Entity Framework Core 6, Fluent UI, and Microsoft SQL Server.",
      "Modernized the UX/UI for a client-facing application deployed to a subset of customers.",
    ],
    technologies: [".NET", "Blazor", "Entity Framework", "SQL Server", "Fluent UI"],
  },
];

export const projects: Project[] = [
  {
    name: "MackYack",
    subtitle: "Onion Network Protocol",
    date: "May 2024",
    description:
      "An anonymous messaging board that prioritizes user privacy using Onion Routing. Utilizes cryptographic algorithms (Diffie-Hellman, SHA3-256, AES/CBC) to create secure communication between nodes within a circuit.",
    technologies: ["Java", "Cryptography", "Networking", "BouncyCastle"],
    github: "https://github.com/Frostfire25/MackYack-Anonymous-Messaging-Board",
  },
  {
    name: "Spotify NLP Analyzer",
    subtitle: "AI Emotions Analysis",
    date: "May 2023",
    description:
      "Analyzes user Spotify listening history to deliver emotional insights. Classifies song lyrics into 25+ emotional categories using a BERT model trained on the GoEmotions dataset.",
    technologies: ["Python", "BERT", "React", "Spotify API", "NLP"],
    github: "https://github.com/Frostfire25/Spotify_NLP_Service",
  },
  {
    name: "Flight Feeder Dashboard",
    subtitle: "Real-Time Flight Tracking",
    date: "Dec 2025",
    description:
      "A real-time flight tracking dashboard that visualizes aircraft data from ADS-B feeds with interactive maps and filtering.",
    technologies: ["Python", "Data Visualization"],
    github: "https://github.com/Frostfire25/Flight-Feeder-Dashboard",
  },
  {
    name: "Cloud SSE Server",
    subtitle: "Searchable Symmetric Encryption",
    date: "May 2023",
    description:
      "A Java client-cloud server model implementing Searchable Symmetric Encryption (SSE), enabling encrypted search over cloud-stored data without exposing plaintext.",
    technologies: ["Java", "Cryptography", "Cloud Computing"],
    github: "https://github.com/Frostfire25/Cloud_Server_With_Searchable_Symmetric_Encryption",
  },
  {
    name: "Computer Club Website",
    subtitle: "Merrimack Computer Club",
    date: "Nov 2023",
    description:
      "Official website for the Merrimack Computer Club, providing information about events, members, and club activities. Built and maintained as club leadership.",
    technologies: ["JavaScript", "Web Development"],
    github: "https://github.com/Merrimack-Computer-Club/Merrimack_Computer_Club_Website",
  },
  {
    name: "Efficient Frontier",
    subtitle: "Investment Portfolio Optimizer",
    date: "Oct 2024",
    description:
      "A Streamlit app that visualizes portfolio performance on the Efficient Frontier. Users input stock tickers, select custom weights via sliders, and see risk-return trade-offs.",
    technologies: ["Python", "Streamlit", "Finance", "Data Science"],
    github: "https://github.com/Merrimack-Computer-Club/merrimack-investment-fund-efficient-frontier",
  },
];

export const skills = [
  { category: "Languages", items: ["TypeScript", "JavaScript", "C#", "Java", "Python", "SQL"] },
  { category: "Frontend", items: ["React", "Blazor", "FluentUI", "Tailwind CSS", "Three.js"] },
  { category: "Backend", items: [".NET Core", "Java Spring", "Node.js"] },
  { category: "Cloud & DevOps", items: ["Azure", "OCI", "Terraform", "Kubernetes", "Azure DevOps"] },
  { category: "Databases", items: ["Cosmos DB", "MongoDB", "SQL Server", "Kusto"] },
  { category: "Tools", items: ["Git", "Docker", "VS Code", "Figma"] },
];
