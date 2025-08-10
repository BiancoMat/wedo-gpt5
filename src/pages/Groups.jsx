import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Backend } from '../adapters'

export default function Groups(){
  const [groups,setGroups]=useState([])
  const [name,setName]=useState('')
  const [description,setDescription]=useState('')

  async function refresh(){ setGroups(await Backend.listGroups()) }
  useEffect(()=>{ refresh() },[])

  async function add(e){
    e.preventDefault()
    await Backend.addGroup({ name, description })
    setName(''); setDescription(''); refresh()
  }

  return (
    <div>
      <Navbar/>
      <div className="max-w-4xl mx-auto px-4 py-6 grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">Gruppi</h2>
          <div className="space-y-3">
            {groups.map(g=>(
              <div key={g.id} className="card">
                <h3 className="font-semibold">{g.name}</h3>
                <p className="text-sm text-gray-600">{g.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <form className="card space-y-2" onSubmit={add}>
            <h3 className="font-semibold">Crea gruppo</h3>
            <input className="input" placeholder="Nome del gruppo" value={name} onChange={e=>setName(e.target.value)} />
            <textarea className="input" placeholder="Descrizione" value={description} onChange={e=>setDescription(e.target.value)} />
            <button className="btn w-full">Crea</button>
          </form>
        </div>
      </div>
    </div>
  )
}
