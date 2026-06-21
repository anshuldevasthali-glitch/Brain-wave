import {useState} from 'react'

export default function OnboardingModal({open,onClose}:{open:boolean,onClose:()=>void}){
  const [level,setLevel]=useState('University')
  const [deadline,setDeadline]=useState('')

  function save(){
    // For MVP store in localStorage
    localStorage.setItem('brainwave_profile',JSON.stringify({level,deadline}))
    onClose()
  }

  if(!open) return null
  return (
    <div className="card" style={{position:'fixed',left:20,right:20,top:50,maxWidth:800,margin:'0 auto',zIndex:50}}>
      <h2>Welcome to Brainwave</h2>
      <p className="small">Choose your education level so the AI tailors explanations.</p>

      <label className="small">Education Category</label>
      <select className="input" value={level} onChange={e=>setLevel(e.target.value)}>
        <option>K-5</option>
        <option>High School</option>
        <option>University</option>
        <option>PhD/Research</option>
      </select>

      <label className="small" style={{marginTop:12}}>Target deadline (optional)</label>
      <input className="input" type="date" value={deadline} onChange={e=>setDeadline(e.target.value)} />

      <div style={{marginTop:12}}>
        <button className="button" onClick={save}>Save profile</button>
        <button className="button" style={{background:'#334155',marginLeft:8}} onClick={onClose}>Skip</button>
      </div>
    </div>
  )
}
