import { Link } from 'react-router-dom'
import { Backend } from '../adapters'
import { useAuth } from '../hooks/useAuth'
import { useEffect, useState } from 'react'

export default function Navbar(){
  const { user } = useAuth()
  const [credits,setCredits]=useState(0)
  useEffect(()=>{
    (async()=>{ if(user){ setCredits(await Backend.getUserCredits(user.uid)) }})()
  },[user])
  return (
    <div className="bg-white border-b">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="font-semibold">WeDo</Link>
        <Link to="/board" className="link">Bacheca</Link>
        <Link to="/groups" className="link">Gruppi</Link>
        <Link to="/notifications" className="link">Notifiche</Link>
        <div className="ml-auto flex items-center gap-3">
          {user ? <>
            <span className="text-sm">Crediti: <b>{credits}</b></span>
            <button className="btn" onClick={()=>Backend.signOut()}>Esci</button>
          </> : <Link className="btn" to="/auth">Entra</Link>}
        </div>
      </div>
    </div>
  )
}
