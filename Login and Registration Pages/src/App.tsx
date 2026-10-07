import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MainApp from './pages/MainApp'

type Screen = 'login' | 'register' | 'app'

export default function App() {
  const [screen, setScreen] = useState<Screen>('login')

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="mobile-frame bg-white relative">
        {screen === 'login' && (
          <LoginPage
            onLogin={() => setScreen('app')}
            onRegister={() => setScreen('register')}
          />
        )}
        {screen === 'register' && (
          <RegisterPage
            onRegister={() => setScreen('app')}
            onLogin={() => setScreen('login')}
          />
        )}
        {screen === 'app' && (
          <MainApp onLogout={() => setScreen('login')} />
        )}
      </div>
    </div>
  )
}
