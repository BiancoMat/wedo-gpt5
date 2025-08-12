import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { Backend } from '../adapters';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') await Backend.signIn(email, password);
      else await Backend.signUp(email, password);
      navigate('/board');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-md px-4 pt-20">
        <h2 className="mb-4 text-xl font-semibold">
          {mode === 'login' ? 'Entra' : 'Registrati'}
        </h2>
        <form className="space-y-3" onSubmit={submit}>
          <input
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <input
            className="input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-sm text-red-600">{error}</div>}
          <Button className="w-full" disabled={loading}>
            {loading ? '...' : mode === 'login' ? 'Entra' : 'Crea account'}
          </Button>
          <div className="text-center text-sm">
            {mode === 'login' ? (
              <span>
                Nuovo?{' '}
                <button
                  className="link"
                  type="button"
                  onClick={() => setMode('signup')}
                >
                  Registrati
                </button>
              </span>
            ) : (
              <span>
                Hai già un account?{' '}
                <button
                  className="link"
                  type="button"
                  onClick={() => setMode('login')}
                >
                  Accedi
                </button>
              </span>
            )}
          </div>
        </form>
        <p className="mt-3 text-xs text-gray-500">
          Backend: <b>{import.meta.env.VITE_BACKEND ?? 'local'}</b>
        </p>
      </div>
    </div>
  );
}
