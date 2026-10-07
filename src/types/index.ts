// ─── Screen & Navigation ─────────────────────────────────────────────────────

export type Screen =
  // AUTH
  | 'splash'
  | 'login'
  | 'register'
  // ONBOARDING
  | 'profile-setup'
  // MAIN (nav tabs)
  | 'home'
  | 'discover'
  | 'swap'
  | 'chat-list'
  | 'profile'
  // DETAIL
  | 'user-profile'
  | 'skill-detail'
  | 'swap-request'
  | 'chat'

export type NavTab = 'home' | 'discover' | 'swap' | 'chat' | 'profile'

export const NAV_TO_SCREEN: Record<NavTab, Screen> = {
  home:     'home',
  discover: 'discover',
  swap:     'swap',
  chat:     'chat-list',
  profile:  'profile',
}

// ─── Domain Models ────────────────────────────────────────────────────────────

export interface Student {
  id: string
  name: string
  program: string
  university: string
  year: string
  bio: string
  match: number
  canTeach: string[]
  wantsToLearn: string[]
  rating: number
  swapsDone: number
  responseTime: string
  online?: boolean
}

export interface Message {
  id: string
  from: 'me' | 'them'
  text: string
  time: string
  read: boolean
}

export interface ChatThread {
  id: string
  partner: Student
  messages: Message[]
  lastMessage: string
  lastTime: string
  unread: number
}

export interface SwapRequest {
  id: string
  student: Student
  status: 'pending' | 'accepted' | 'declined'
  direction: 'sent' | 'received'
  teachSkill: string
  learnSkill: string
  message?: string
  date?: string
  time?: string
  format?: 'video' | 'text' | 'inperson'
  createdAt: string
}

export interface Skill {
  id: string
  name: string
  category: string
  icon: string
  description: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  teachersCount: number
  seekersCount: number
  relatedSkills: string[]
}

// ─── Navigation Params ────────────────────────────────────────────────────────

export interface NavParams {
  student?: Student
  skill?: Skill
}
