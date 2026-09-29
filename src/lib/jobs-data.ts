
export interface JobDetails {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'Internship';
  salary: string;
  postedAt: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  about: string;
}

export const jobsData: JobDetails[] = [
  {
    id: "1",
    title: "Senior Software Engineer",
    company: "ABC Technologies Pvt. Ltd.",
    location: "Bangalore",
    type: "Full-time",
    salary: "₹18,00,000 - ₹25,00,000",
    postedAt: "2 days ago",
    experience: "5-8 years",
    description: "We are looking for an experienced Senior Software Engineer to join our innovative team in Bangalore. You will be responsible for designing, developing, and maintaining scalable software solutions that power our enterprise applications.",
    responsibilities: [
      "Design and implement high-quality software solutions using modern technologies",
      "Lead code reviews and mentor junior developers",
      "Collaborate with product managers to define technical requirements",
      "Optimize application performance and ensure scalability",
      "Participate in architectural decisions and technical planning",
      "Write clean, maintainable, and well-documented code"
    ],
    requirements: [
      "Bachelor's/Master's degree in Computer Science or related field",
      "5+ years of experience in software development",
      "Strong proficiency in Java, Python, or Node.js",
      "Experience with cloud platforms (AWS/Azure/GCP)",
      "Knowledge of microservices architecture and RESTful APIs",
      "Excellent problem-solving and communication skills"
    ],
    benefits: [
      "Competitive salary with annual bonuses",
      "Health insurance for employee and family",
      "Flexible work arrangements",
      "Learning and development allowance",
      "Stock options and ESOP benefits",
      "Gym membership and wellness programs"
    ],
    about: "ABC Technologies Pvt. Ltd. is a leading technology company providing innovative digital solutions and services to clients across multiple industries."
  },
  {
    id: "2",
    title: "Data Scientist",
    company: "XYZ Solutions India",
    location: "Hyderabad",
    type: "Full-time",
    salary: "₹22,00,000 - ₹30,00,000",
    postedAt: "1 week ago",
    experience: "3-6 years",
    description: "Join Flipkart's Data Science team in Hyderabad to build machine learning models that power personalization, recommendation engines, and business intelligence across India's largest e-commerce platform.",
    responsibilities: [
      "Build and deploy machine learning models at scale",
      "Analyze large datasets to extract actionable insights",
      "Develop recommendation algorithms and personalization systems",
      "Create data pipelines and ETL processes",
      "Present findings to stakeholders and drive data-driven decisions",
      "Collaborate with engineering teams to productionize models"
    ],
    requirements: [
      "Master's/PhD in Statistics, Mathematics, or Computer Science",
      "3+ years of experience in data science or machine learning",
      "Proficiency in Python, R, and SQL",
      "Experience with TensorFlow, PyTorch, or similar frameworks",
      "Strong understanding of statistical modeling and ML algorithms",
      "Experience with big data technologies (Spark, Hadoop)"
    ],
    benefits: [
      "Industry-leading compensation package",
      "Comprehensive health and life insurance",
      "Relocation assistance",
      "Employee discount on Flipkart purchases",
      "Continuous learning opportunities",
      "Modern office with recreational facilities"
    ],
    about: "XYZ Solutions India is a prominent data-driven company specializing in analytics, machine learning, and business intelligence solutions."
  },
  {
    id: "3",
    title: "Product Manager",
    company: "PQR Fintech Services",
    location: "Gurugram",
    type: "Full-time",
    salary: "₹20,00,000 - ₹28,00,000",
    postedAt: "3 days ago",
    experience: "4-7 years",
    description: "Paytm is seeking an experienced Product Manager to drive the strategy and execution of our fintech products from our Gurugram headquarters. You will own the product roadmap and work closely with engineering, design, and business teams.",
    responsibilities: [
      "Define product vision and strategy aligned with business goals",
      "Create detailed product requirements and user stories",
      "Prioritize features based on user feedback and market analysis",
      "Work with UX team to create intuitive user experiences",
      "Monitor product metrics and optimize for growth",
      "Coordinate with cross-functional teams for successful launches"
    ],
    requirements: [
      "Bachelor's degree in Engineering/Business; MBA preferred",
      "4+ years of product management experience",
      "Experience in fintech or payments industry preferred",
      "Strong analytical and problem-solving abilities",
      "Excellent communication and stakeholder management skills",
      "Understanding of agile methodologies"
    ],
    benefits: [
      "Attractive salary with performance bonuses",
      "Health insurance and wellness benefits",
      "Stock options in a growing fintech company",
      "Flexible working hours",
      "Annual learning budget",
      "Team outings and company events"
    ],
    about: "PQR Fintech Services is a fast-growing financial technology company offering innovative payment and banking solutions across India."
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "MNO IT Solutions",
    location: "Pune",
    type: "Full-time",
    salary: "₹15,00,000 - ₹22,00,000",
    postedAt: "5 days ago",
    experience: "3-5 years",
    description: "Tech Mahindra is hiring a skilled DevOps Engineer to join our Pune development center. You will be responsible for building and maintaining CI/CD pipelines, managing cloud infrastructure, and ensuring high availability of our services.",
    responsibilities: [
      "Design and maintain CI/CD pipelines using Jenkins, GitLab CI, or similar",
      "Manage and optimize cloud infrastructure on AWS/Azure",
      "Implement infrastructure as code using Terraform or CloudFormation",
      "Monitor system performance and implement alerting solutions",
      "Automate deployment processes and reduce manual intervention",
      "Ensure security best practices in DevOps workflows"
    ],
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of DevOps or SRE experience",
      "Strong knowledge of Linux/Unix administration",
      "Experience with containerization (Docker, Kubernetes)",
      "Proficiency in scripting (Bash, Python)",
      "AWS/Azure certification preferred"
    ],
    benefits: [
      "Competitive compensation package",
      "Comprehensive medical coverage",
      "Work from home flexibility",
      "Certification reimbursement",
      "Employee assistance program",
      "Career growth opportunities"
    ],
    about: "MNO IT Solutions is a trusted provider of IT consulting, digital transformation, and business re-engineering services."
  },
  {
    id: "5",
    title: "UI/UX Designer",
    company: "RST Digital Agency",
    location: "Delhi",
    type: "Full-time",
    salary: "₹12,00,000 - ₹18,00,000",
    postedAt: "4 days ago",
    experience: "2-5 years",
    description: "Zomato is looking for a creative UI/UX Designer to join our Delhi design team. You will craft beautiful and intuitive user experiences for millions of food lovers across our mobile and web platforms.",
    responsibilities: [
      "Create user-centered designs through research and wireframing",
      "Design intuitive interfaces for mobile and web applications",
      "Develop and maintain design systems and component libraries",
      "Conduct user research and usability testing",
      "Collaborate with product and engineering teams",
      "Create prototypes and high-fidelity mockups"
    ],
    requirements: [
      "Bachelor's degree in Design or related field",
      "2+ years of UI/UX design experience",
      "Proficiency in Figma, Sketch, or Adobe XD",
      "Strong portfolio demonstrating design process",
      "Understanding of mobile-first design principles",
      "Knowledge of design systems and accessibility standards"
    ],
    benefits: [
      "Creative and collaborative work environment",
      "Health and wellness benefits",
      "Free meals and Zomato Pro membership",
      "Flexible work policy",
      "Design tools and software provided",
      "Learning and conference budget"
    ],
    about: "RST Digital Agency is a creative technology company specializing in user experience design and digital product development."
  }
];

export function getJobById(id: string): JobDetails | undefined {
  return jobsData.find(job => job.id === id);
}

export function getAllJobs(): JobDetails[] {
  return jobsData;
}
