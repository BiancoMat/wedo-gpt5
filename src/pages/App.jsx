import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 pt-20">
        <section className="py-12 text-center">
          <h1 className="mb-2 text-3xl font-bold">Scambia favori usando crediti</h1>
          <p className="mb-6 text-gray-600">
            Crea richieste, proponi aiuti e costruisci reputazione.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link to="/board">
              <Button>Vai alla Bacheca</Button>
            </Link>
            <Link to="/auth">
              <Button variant="secondary">Accedi/Registrati</Button>
            </Link>
          </div>
        </section>
        <section className="py-8">
          <h2 className="mb-4 text-center text-xl font-semibold">Come funziona</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <p className="font-medium">1. Pubblica</p>
              <p className="text-sm text-gray-600">
                Crea una richiesta o offerta di favore.
              </p>
            </div>
            <div className="text-center">
              <p className="font-medium">2. Scambia</p>
              <p className="text-sm text-gray-600">
                Accetta un favore e aiutati con la community.
              </p>
            </div>
            <div className="text-center">
              <p className="font-medium">3. Guadagna</p>
              <p className="text-sm text-gray-600">
                Completa e ricevi crediti per i prossimi favori.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
