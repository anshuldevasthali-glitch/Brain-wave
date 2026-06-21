import {useEffect, useState} from 'react'

export default function Study(){
  const [text,setText]=useState('')
  const [education,setEducation]=useState('University')
  const [explanation,setExplanation]=useState<string | null>(null)
  const [quiz,setQuiz]=useState<any>(null)
  const [loading,setLoading]=useState(false)

  async function handleExplain(){
    setExplanation(null);setLoading(true)
    const res=await fetch('/api/explain',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text,education})})
    const data=await res.json()
    setExplanation(data.explanation)
    setLoading(false)
  }

  async function handleQuiz(){
    setQuiz(null);setLoading(true)
    const res=await fetch('/api/quiz',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text,education})})
    const data=await res.json()
    setQuiz(data.quiz)
    setLoading(false)
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Study Session</h1>
      </header>

      <div className="card">
        <label className="small">Education level</label>
        <select className="input" value={education} onChange={e=>setEducation(e.target.value)}>
          <option>K-5</option>
          <option>High School</option>
          <option>University</option>
          <option>PhD/Research</option>
        </select>

        <label className="small" style={{marginTop:12}}>Paste text or notes (for MVP)</label>
        <textarea className="input" rows={8} value={text} onChange={e=>setText(e.target.value)} />

        <div style={{marginTop:12}}>
          <button className="button" onClick={handleExplain} disabled={loading}>Explain Deeply</button>
          <button className="button" style={{marginLeft:8,background:'#10b981'}} onClick={handleQuiz} disabled={loading}>Generate Quiz</button>
        </div>
      </div>

      {loading && <div className="card">Processing…</div>}

      {explanation && (
        <div className="card">
          <h3>Explanation</h3>
          <div dangerouslySetInnerHTML={{__html: explanation}} />
        </div>
      )}

      {quiz && (
        <div className="card">
          <h3>Quiz</h3>
          <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(quiz,null,2)}</pre>
        </div>
      )}
    </div>
  )
}
