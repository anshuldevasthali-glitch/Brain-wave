import Link from 'next/link'
import {useState} from 'react'
import OnboardingModal from '../components/OnboardingModal'

export default function Home(){
  const [show,onShow]=useState(true)
  return (
    <div className="container">
      <header className="header">
        <h1>Brainwave</h1>
        <nav>
          <Link href="/study"><a className="button">Start Study Session</a></Link>
        </nav>
      </header>

      <section className="card">
        <h2>AI-powered tutor — MVP</h2>
        <p className="small">A minimal working Brainwave app. Complete onboarding to set your education level and deadline, then start a study session to upload material and receive deep explanations and quizzes powered by OpenAI.</p>
        <p className="small">Note: create a .env.local with OPENAI_API_KEY before running.</p>
      </section>

      <OnboardingModal open={show} onClose={()=>onShow(false)} />
    </div>
  )
}
