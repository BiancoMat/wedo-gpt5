import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Backend } from '../adapters'
import { useAuth } from '../hooks/useAuth'

export default function Board(){
  const [items,setItems]=useState([])
  const [q,setQ]=useState('')
  const [title,setTitle]=useState('')
  const [description,setDescription]=useState('')
  const [tags,setTags]=useState('')
  const { user } = useAuth()

  async function refresh(){ setItems((await Backend.listFavors()).filter(x=>x.status!=='archived')) }
  useEffect(()=>{ refresh() },[])

  async function addFavor(e){
    e.preventDefault()
    if(!user) return alert('Accedi prima.')
    const favor = {
      title, description, tags: tags.split(',').map(s=>s.trim()).filter(Boolean),
      ownerId: user.uid, status:'open'
    }
    await Backend.addFavor(favor); setTitle(''); setDescription(''); setTags(''); refresh()
  }

  function filtered(){
    const s = q.toLowerCase()
    return items.filter(i => (i.title?.toLowerCase().includes(s) || i.description?.toLowerCase().includes(s) || (i.tags||[]).join(' ').toLowerCase().includes(s)))
  }

  async function complete(favorId){
    if(!user) return alert('Accedi prima.')
    const receiverId = user.uid
    const giverId = prompt('Chi ha fatto il favore? Inserisci UID.', user.uid) || user.uid
    await Backend.completeFavor(favorId, giverId, receiverId)
    const giverBal = await Backend.getUserCredits(giverId); await Backend.setUserCredits(giverId, giverBal+1)
    const recBal = await Backend.getUserCredits(receiverId); await Backend.setUserCredits(receiverId, recBal-1)
    refresh()
  }

  return (
    <div>
      <Navbar/>
      <div className="max-w-5xl mx-auto px-4 py-6 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <input className="input" placeholder="Cerca per titolo, descrizione o tag..." value={q} onChange={e=>setQ(e.target.value)} />
          </div>
          <div className="space-y-3">
            {filtered().map(f=>(
              <div key={f.id} className="card">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{f.title}</h3>
                    <p className="text-sm text-gray-600">{f.description}</p>
                    {f.tags?.length>0 && <div className="mt-1 text-xs text-gray-500">#{f.tags.join(' #')}</div>}
                  </div>
                  {f.status==='open' && <button className="btn" onClick={()=>complete(f.id)}>Completa</button>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <form className="card space-y-2" onSubmit={addFavor}>
            <h3 className="font-semibold">Crea richiesta/proposta</h3>
            <input className="input" placeholder="Titolo" value={title} onChange={e=>setTitle(e.target.value)} />
            <textarea className="input" placeholder="Descrizione" value={description} onChange={e=>setDescription(e.target.value)} />
            <input className="input" placeholder="Tag (separati da virgola)" value={tags} onChange={e=>setTags(e.target.value)} />
            <button className="btn w-full">Pubblica</button>
            <p className="text-xs text-gray-500">Ogni favore completato: +1 credito a chi lo fa, -1 a chi lo riceve.</p>
          </form>
        </div>
      </div>
    </div>
  )
}
