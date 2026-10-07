import type { Student, ChatThread, SwapRequest, Skill } from '../types'

// ─── Students ─────────────────────────────────────────────────────────────────

export const STUDENTS: Student[] = [
  {
    id: 's1', name: 'Azizi Adhira', program: 'Informatics',
    university: 'Universitas Gadjah Mada', year: 'Year 3',
    bio: 'Passionate backend engineer who loves building scalable APIs. Looking to grow my design thinking skills.',
    match: 92, canTeach: ['Node.js', 'Backend', 'PostgreSQL'], wantsToLearn: ['UI/UX', 'Figma'],
    rating: 4.9, swapsDone: 14, responseTime: '< 1 hr', online: true,
  },
  {
    id: 's2', name: 'Reza Pratama', program: 'Computer Science',
    university: 'Institut Teknologi Bandung', year: 'Year 4',
    bio: 'Data science enthusiast and Python nerd. I can teach data analysis & machine learning concepts.',
    match: 87, canTeach: ['Python', 'Data Science', 'ML Basics'], wantsToLearn: ['Figma', 'Product Design'],
    rating: 4.7, swapsDone: 9, responseTime: '~2 hrs',
  },
  {
    id: 's3', name: 'Laila Nusantara', program: 'Digital Business',
    university: 'Universitas Indonesia', year: 'Year 2',
    bio: 'Marketing & business student exploring the tech world. I can teach growth hacking and brand strategy!',
    match: 79, canTeach: ['Marketing', 'Business Strategy', 'Copywriting'], wantsToLearn: ['HTML', 'CSS', 'React'],
    rating: 4.8, swapsDone: 6, responseTime: '~4 hrs', online: true,
  },
  {
    id: 's4', name: 'Bima Santoso', program: 'Software Engineering',
    university: 'Univ. Brawijaya', year: 'Year 3',
    bio: 'Frontend enthusiast building cool web experiences with React. Photography is my creative escape!',
    match: 74, canTeach: ['React', 'TypeScript', 'CSS Animation'], wantsToLearn: ['Photography', 'Video Editing'],
    rating: 4.6, swapsDone: 11, responseTime: '< 3 hrs',
  },
  {
    id: 's5', name: 'Nadia Kusuma', program: 'Visual Communication',
    university: 'Universitas Trisakti', year: 'Year 4',
    bio: 'Designer with a love for branding and illustration. Helping students level up their visual game.',
    match: 88, canTeach: ['Illustration', 'Brand Design', 'Adobe XD'], wantsToLearn: ['JavaScript', 'Webflow'],
    rating: 4.9, swapsDone: 18, responseTime: '< 1 hr', online: true,
  },
  {
    id: 's6', name: 'Dimas Firdaus', program: 'Statistics',
    university: 'IPB University', year: 'Year 3',
    bio: 'Statistics and R language expert. Can help with data visualization and research methodology.',
    match: 71, canTeach: ['R Language', 'Statistics', 'Data Viz'], wantsToLearn: ['SQL', 'Python'],
    rating: 4.5, swapsDone: 7, responseTime: '~6 hrs',
  },
]

// ─── Chat Threads ─────────────────────────────────────────────────────────────

export const CHAT_THREADS: ChatThread[] = [
  {
    id: 'c1', partner: STUDENTS[0],
    lastMessage: 'Deal! Looking forward to it 🙌', lastTime: '10:38 AM', unread: 0,
    messages: [
      { id: 'm1', from: 'them', text: 'Hey! I saw your swap request, sounds great! 😊', time: '10:32 AM', read: true },
      { id: 'm2', from: 'me', text: 'Awesome! I can teach you Figma basics on Saturday?', time: '10:35 AM', read: true },
      { id: 'm3', from: 'them', text: "Perfect! And I'll walk you through Node.js REST APIs after that 🔥", time: '10:36 AM', read: true },
      { id: 'm4', from: 'me', text: 'Deal! Looking forward to it 🙌', time: '10:38 AM', read: true },
    ],
  },
  {
    id: 'c2', partner: STUDENTS[2],
    lastMessage: "Let's do it! I need CSS help too 😅", lastTime: 'Yesterday', unread: 1,
    messages: [
      { id: 'm1', from: 'them', text: 'Hi Sinta! Are you still looking to learn HTML?', time: 'Yesterday', read: true },
      { id: 'm2', from: 'me', text: 'Yes! Would love to do a swap 💜', time: 'Yesterday', read: true },
      { id: 'm3', from: 'them', text: "Let's do it! I need CSS help too 😅", time: 'Yesterday', read: false },
    ],
  },
  {
    id: 'c3', partner: STUDENTS[4],
    lastMessage: 'That was such a great session! Thank you!', lastTime: '2 days ago', unread: 0,
    messages: [
      { id: 'm1', from: 'them', text: 'Hi! Ready for our Illustration session?', time: '2 days ago', read: true },
      { id: 'm2', from: 'me', text: 'Yes! Super excited 🎨', time: '2 days ago', read: true },
      { id: 'm3', from: 'me', text: 'That was such a great session! Thank you!', time: '2 days ago', read: true },
    ],
  },
]

// ─── Swap Requests ────────────────────────────────────────────────────────────

export const SWAP_REQUESTS: SwapRequest[] = [
  {
    id: 'r1', student: STUDENTS[0], status: 'accepted', direction: 'sent',
    teachSkill: 'UI/UX', learnSkill: 'Node.js', format: 'video',
    date: 'Oct 4, 2026', time: '10:00 AM', createdAt: '3 days ago',
  },
  {
    id: 'r2', student: STUDENTS[4], status: 'accepted', direction: 'sent',
    teachSkill: 'CSS', learnSkill: 'Illustration', format: 'video',
    date: 'Oct 7, 2026', time: '2:00 PM', createdAt: '1 week ago',
  },
  {
    id: 'r3', student: STUDENTS[2], status: 'pending', direction: 'sent',
    teachSkill: 'HTML', learnSkill: 'Marketing',
    message: "Hi Laila! I'd love to learn marketing from you. I can teach you HTML in return!",
    format: 'text', createdAt: '1 day ago',
  },
  {
    id: 'r4', student: STUDENTS[3], status: 'pending', direction: 'received',
    teachSkill: 'Photography', learnSkill: 'Figma',
    message: 'Hey! I want to learn Figma from you. I can teach photography basics!',
    format: 'video', createdAt: '5 hours ago',
  },
]

// ─── Skills ───────────────────────────────────────────────────────────────────

export const SKILLS: Skill[] = [
  {
    id: 'sk1', name: 'UI/UX Design', category: 'Design', icon: '🎨', level: 'Intermediate',
    description: 'Learn user interface and experience design principles, wireframing, prototyping, and usability testing.',
    teachersCount: 8, seekersCount: 24, relatedSkills: ['Figma', 'Adobe XD', 'Prototyping'],
  },
  {
    id: 'sk2', name: 'Node.js', category: 'Programming', icon: '💻', level: 'Intermediate',
    description: 'Build fast, scalable server-side applications with JavaScript using Node.js and its ecosystem.',
    teachersCount: 12, seekersCount: 31, relatedSkills: ['JavaScript', 'Express', 'PostgreSQL'],
  },
  {
    id: 'sk3', name: 'Python', category: 'Programming', icon: '🐍', level: 'Beginner',
    description: 'Master Python for data science, automation, scripting, and machine learning applications.',
    teachersCount: 15, seekersCount: 42, relatedSkills: ['Data Science', 'ML Basics', 'Flask'],
  },
  {
    id: 'sk4', name: 'Figma', category: 'Design', icon: '✏️', level: 'Beginner',
    description: 'Design stunning interfaces with Figma. Learn components, auto-layout, prototyping, and collaboration.',
    teachersCount: 10, seekersCount: 28, relatedSkills: ['UI/UX', 'Prototyping', 'Design Systems'],
  },
  {
    id: 'sk5', name: 'Data Science', category: 'Data', icon: '📊', level: 'Advanced',
    description: 'Analyze data, build models, and extract insights using Python, pandas, and visualization libraries.',
    teachersCount: 6, seekersCount: 19, relatedSkills: ['Python', 'Statistics', 'ML Basics'],
  },
  {
    id: 'sk6', name: 'Marketing', category: 'Business', icon: '📢', level: 'Beginner',
    description: 'Learn digital marketing, growth hacking, content strategy, and brand building techniques.',
    teachersCount: 5, seekersCount: 17, relatedSkills: ['Copywriting', 'SEO', 'Social Media'],
  },
  {
    id: 'sk7', name: 'Photography', category: 'Photography', icon: '📸', level: 'Beginner',
    description: 'Master photography fundamentals: composition, lighting, editing, and storytelling through images.',
    teachersCount: 7, seekersCount: 22, relatedSkills: ['Lightroom', 'Video Editing', 'Composition'],
  },
  {
    id: 'sk8', name: 'React', category: 'Programming', icon: '⚛️', level: 'Intermediate',
    description: 'Build modern, reactive web interfaces with React. Learn hooks, state management, and component architecture.',
    teachersCount: 9, seekersCount: 35, relatedSkills: ['JavaScript', 'TypeScript', 'Node.js'],
  },
]

export const MY_SKILLS = {
  teach: ['UI/UX', 'Figma', 'HTML', 'CSS'],
  learn: ['Backend', 'Node.js', 'Python'],
}

export const CATEGORIES = [
  'Programming', 'Design', 'Data', 'Business',
  'Languages', 'Marketing', 'Photography', 'Music',
]

export const CATEGORY_ICONS: Record<string, string> = {
  Programming: '💻', Design: '🎨', Data: '📊', Business: '💼',
  Languages: '🌍', Marketing: '📢', Photography: '📸', Music: '🎵',
}
