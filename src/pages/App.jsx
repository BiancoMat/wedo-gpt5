import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

export default function App(){
  return (
    <div>
      <Navbar/>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-2">Benvenuto su WeDo</h1>
        <p className="text-gray-600 mb-6">Scambia favori usando crediti. Crea richieste, proponi aiuti, costruisci reputazione.</p>
        <div className="flex gap-3">
          <Link to="/board" className="btn">Vai alla Bacheca</Link>
          <Link to="/auth" className="btn">Accedi / Registrati</Link>
        </div>
      </div>
    </div>
  )
}
