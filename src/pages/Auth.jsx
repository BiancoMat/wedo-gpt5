import { useState } from 'react'
import Navbar from '../components/Navbar'
import { Backend } from '../adapters'

export default function Auth(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [mode,setMode]=useState('login')
  const [error,setError]=useState('')

  async function submit(e){
    e.preventDefault()
    setError('')
    try {
      if(mode==='login') await Backend.signIn(email,password)
      else await Backend.signUp(email,password)
    } catch(err){
      setError(err.message)
    }
  }

  return (
    <div>
      <Navbar/>
      <div className="max-w-md mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4">{mode==='login'?'Entra':'Registrati'}</h2>
        <form className="card space-y-3" onSubmit={submit}>
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button className="btn w-full">{mode==='login'?'Entra':'Crea account'}</button>
          <div className="text-sm text-center">
            {mode==='login' ? <span>Nuovo? <button className="link" type="button" onClick={()=>setMode('signup')}>Registrati</button></span>
            : <span>Hai già un account? <button className="link" type="button" onClick={()=>setMode('login')}>Accedi</button></span>}
          </div>
        </form>
        <p className="text-xs text-gray-500 mt-3">Backend: <b>{import.meta.env.VITE_BACKEND ?? 'local'}</b></p>
      </div>
    </div>
  )
}
