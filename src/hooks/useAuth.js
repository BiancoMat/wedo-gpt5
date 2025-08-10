import { useEffect, useState } from 'react'
import { Backend } from '../adapters'

export function useAuth(){
  const [user,setUser]=useState(null)
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    Backend.init?.()
    const unsub = Backend.onAuthStateChanged(u=>{ setUser(u); setLoading(false) })
    return ()=>unsub?.()
  },[])
  return { user, loading }
}
