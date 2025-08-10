import Navbar from '../components/Navbar'

export default function Notifications(){
  return (
    <div>
      <Navbar/>
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold mb-3">Notifiche</h2>
        <div className="card text-sm text-gray-600">Le notifiche in modalità demo sono salvate localmente (si generano quando completi un favore). In Firebase, collegale a una collection dedicata o a Cloud Functions.</div>
      </div>
    </div>
  )
}
