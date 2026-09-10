import { createClient } from '@/lib/supabase/client';
import { Project, Skill, Experience, Testimonial, Stat } from '@/types';

export const INITIAL_STATS: Stat[] = [
  { id: '1', label: 'Years Experience', value: '5+' },
  { id: '2', label: 'Projects Built', value: '40+' },
  { id: '3', label: 'Happy Clients', value: '25+' },
  { id: '4', label: 'Code Commits', value: '2.5k+' },
];

export const INITIAL_SKILLS: Skill[] = [
  { id: '1', name: 'React / Next.js 14', icon: 'Code', proficiency: 96, category: 'Frontend' },
  { id: '2', name: 'TypeScript', icon: 'FileCode', proficiency: 92, category: 'Languages' },
  { id: '3', name: 'Tailwind CSS', icon: 'Palette', proficiency: 95, category: 'Frontend' },
  { id: '4', name: 'Node.js & Express', icon: 'Server', proficiency: 88, category: 'Backend' },
  { id: '5', name: 'Supabase & PostgreSQL', icon: 'Database', proficiency: 90, category: 'Backend' },
  { id: '6', name: 'Framer Motion', icon: 'Sparkles', proficiency: 92, category: 'Frontend' },
  { id: '7', name: 'GraphQL & REST', icon: 'Globe', proficiency: 86, category: 'Backend' },
  { id: '8', name: 'Docker & CI/CD', icon: 'Box', proficiency: 82, category: 'DevOps' },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Marudhar Export - Global Export & Trading Platform',
    description: 'Corporate global export & trading portal engineered for Durg Singh (Marudhar Export). Features premium catalog navigation, international quotation inquiries, responsive dark/light UI, and lightning-fast SEO optimization.',
    image_url: '/marudhar-export.png',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'SEO Architecture'],
    live_url: 'https://www.marudharexport.com',
    github_url: 'https://github.com',
    category: 'Full Stack',
    featured: true,
  },
  {
    id: '2',
    title: 'Dub - Modern Link Management & Analytics Platform',
    description: 'Modern link management engine with real-time analytics, custom domains, QR code generation, and lightning-fast edge redirects.',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Upstash Redis', 'Prisma'],
    live_url: 'https://dub.co',
    github_url: 'https://github.com/dubinc/dub',
    category: 'Full Stack',
    featured: true,
  },
  {
    id: '3',
    title: 'Cal.com - Enterprise Scheduling Infrastructure',
    description: 'Full-stack appointment booking and scheduling infrastructure with calendar sync, video conferencing routing, and dynamic team availability.',
    image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'tRPC'],
    live_url: 'https://cal.com',
    github_url: 'https://github.com/calcom/cal.com',
    category: 'Full Stack',
    featured: true,
  },
  {
    id: '4',
    title: 'Documenso - Open Source Digital Signing Platform',
    description: 'Secure, cryptographically verifiable document signing and contract workflow platform engineered with Next.js, Prisma, and robust PDF rendering pipelines.',
    image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
    live_url: 'https://documenso.com',
    github_url: 'https://github.com/documenso/documenso',
    category: 'Full Stack',
    featured: true,
  },
  {
    id: '5',
    title: 'Formbricks - Open Source Experience & Survey Suite',
    description: 'Privacy-first user experience management and in-app survey suite with multi-channel distribution, real-time analytics, and webhooks.',
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
    live_url: 'https://formbricks.com',
    github_url: 'https://github.com/formbricks/formbricks',
    category: 'Full Stack',
    featured: true,
  },
];

export const INITIAL_EXPERIENCE: Experience[] = [
  {
    id: '1',
    role: 'Senior Full Stack Engineer',
    company: 'Nexus Tech Labs',
    description: 'Architected enterprise web apps, led frontend migration to Next.js App Router, improved Core Web Vitals performance score from 62 to 98.',
    start_date: '2023',
    end_date: 'Present',
    type: 'work',
  },
  {
    id: '2',
    role: 'Lead Frontend Developer',
    company: 'Aura Design Studio',
    description: 'Built award-winning interactive marketing sites, fluid micro-interactions with Framer Motion, and scalable design systems.',
    start_date: '2021',
    end_date: '2023',
    type: 'work',
  },
  {
    id: '3',
    role: 'Full Stack Developer',
    company: 'Vanguard Digital',
    description: 'Developed REST & GraphQL microservices, PostgreSQL database models, and responsive React web applications.',
    start_date: '2019',
    end_date: '2021',
    type: 'work',
  },
  {
    id: '4',
    role: 'B.S. Computer Science',
    company: 'Tech University',
    description: 'Graduated with Honors. Specialized in Software Engineering, Distributed Systems, and Human-Computer Interaction.',
    start_date: '2015',
    end_date: '2019',
    type: 'education',
  },
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Durg Singh',
    role: 'Founder & Managing Director',
    company: 'Marudhar Export (marudharexport.com)',
    message: 'Ashadullah developed our official website www.marudharexport.com with outstanding design, smooth responsiveness, and great performance. His technical expertise and commitment to quality are exceptional!',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
  },
  {
    id: '2',
    name: 'Sarah Jenkins',
    role: 'VP of Product',
    company: 'Nexus Global',
    message: 'Ashadullah delivered our flagship platform ahead of deadline with unmatched visual excellence and technical precision. The interactive animations wowed our investors!',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    rating: 5,
  },
  {
    id: '3',
    name: 'Marcus Thorne',
    role: 'Founder & CEO',
    company: 'Aetheria AI',
    message: 'Working with Ashadullah transformed our product UX completely. The code quality, speed, and attention to micro-interactions set a new gold standard for our team.',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    rating: 5,
  },
  {
    id: '4',
    name: 'Elena Rostova',
    role: 'Design Director',
    company: 'Aura Studio',
    message: 'Rare developer who combines deep engineering rigor with an impeccable eye for design aesthetics. Highly recommended!',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 5,
  },
];

export async function fetchStats(): Promise<Stat[]> {
  return INITIAL_STATS;
}

export async function fetchSkills(): Promise<Skill[]> {
  return INITIAL_SKILLS;
}

export async function fetchProjects(): Promise<Project[]> {
  return INITIAL_PROJECTS;
}

export async function fetchExperience(): Promise<Experience[]> {
  return INITIAL_EXPERIENCE;
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  return INITIAL_TESTIMONIALS;
}
