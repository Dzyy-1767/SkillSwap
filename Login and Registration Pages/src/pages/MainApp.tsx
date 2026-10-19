import { useState } from 'react'
import HomeTab from '../components/HomeTab'
import SearchTab from '../components/SearchTab'
import SessionsTab from '../components/SessionsTab'
import ProfileTab from '../components/ProfileTab'
import CreditsTab from '../components/CreditsTab'

interface Props {
  onLogout: () => void
}

const tabs = [
  { id: 'home',     label: 'Beranda', Icon: HomeIcon },
  { id: 'search',   label: 'Cari',    Icon: SearchIcon },
  { id: 'sessions', label: 'Sesi',    Icon: CalendarIcon },
  { id: 'credits',  label: 'Kredit',  Icon: StarIcon },
  { id: 'profile',  label: 'Profil',  Icon: UserIcon },
]

export default function MainApp({ onLogout }: Props) {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="main-app">
      {/* Scrollable content area */}
      <div className="main-content">
        {activeTab === 'home'     && <HomeTab />}
        {activeTab === 'search'   && <SearchTab />}
        {activeTab === 'sessions' && <SessionsTab />}
        {activeTab === 'credits'  && <CreditsTab />}
        {activeTab === 'profile'  && <ProfileTab onLogout={onLogout} />}
      </div>

      {/* Bottom Tab Bar */}
      <nav className="tab-nav">
        {tabs.map(({ id, label, Icon }) => {
          const active = activeTab === id
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`tab-btn ${active ? 'tab-btn-active' : ''}`}
            >
              <div className={`tab-icon-wrap ${active ? 'tab-icon-active' : ''}`}>
                <Icon active={active} />
              </div>
              <span className={`tab-label ${active ? 'tab-label-active' : ''}`}>{label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? '#6C3DE8' : 'none'} stroke={active ? '#6C3DE8' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )
}
function SearchIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#6C3DE8' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  )
}
function CalendarIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#6C3DE8' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  )
}
function StarIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? '#6C3DE8' : 'none'} stroke={active ? '#6C3DE8' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  )
}
function UserIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#6C3DE8' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  )
}
