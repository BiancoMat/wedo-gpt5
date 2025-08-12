import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Tabs from '../components/Tabs';
import Empty from '../components/Empty';
import { Backend } from '../adapters';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../components/Toast';

export default function Board() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [tab, setTab] = useState('Tutti');
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', tags: '', type: 'request' });
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  async function refresh() {
    setLoading(true);
    const all = await Backend.listFavors();
    setItems(all);
    setLoading(false);
  }
  useEffect(() => {
    refresh();
  }, []);

  function filtered() {
    let res = items;
    if (tab === 'Aperti') res = res.filter((f) => f.status === 'open');
    if (tab === 'Completati') res = res.filter((f) => f.status === 'completed');
    if (q) {
      const s = q.toLowerCase();
      res = res.filter(
        (i) =>
          i.title?.toLowerCase().includes(s) ||
          i.description?.toLowerCase().includes(s) ||
          (i.tags || []).join(' ').toLowerCase().includes(s)
      );
    }
    return res;
  }

  function openCreate() {
    if (!user) return navigate('/auth');
    setCreateOpen(true);
  }

  async function submitCreate(e) {
    e.preventDefault();
    if (!form.title || !form.description) {
      toast.add('Titolo e descrizione obbligatori');
      return;
    }
    try {
      await Backend.addFavor({
        title: form.title,
        description: form.description,
        tags: form.tags
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        ownerId: user.uid,
        type: form.type,
        status: 'open',
      });
      setForm({ title: '', description: '', tags: '', type: 'request' });
      setCreateOpen(false);
      toast.add('Favor creato');
      refresh();
    } catch (err) {
      toast.add('Errore creazione');
    }
  }

  async function complete(favor) {
    if (!user) return navigate('/auth');
    try {
      await Backend.completeFavor(favor.id, user.uid, favor.ownerId);
      const giverBal = await Backend.getUserCredits(user.uid);
      await Backend.setUserCredits(user.uid, giverBal + 1);
      const recBal = await Backend.getUserCredits(favor.ownerId);
      await Backend.setUserCredits(favor.ownerId, recBal - 1);
      toast.add('Favor completato');
      refresh();
    } catch (err) {
      toast.add('Errore completamento');
    }
  }

  const tabs = ['Tutti', 'Aperti', 'Completati'];

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 pt-20">
        <div className="mb-4 flex items-center gap-2">
          <input
            className="input"
            placeholder="Cerca..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Button onClick={openCreate}>Crea favore</Button>
        </div>
        <Tabs tabs={tabs} current={tab} onChange={setTab} />
        {loading ? (
          <div className="py-10 text-center text-gray-500">Caricamento...</div>
        ) : filtered().length === 0 ? (
          <Empty title="Nessun favore" />
        ) : (
          <div className="space-y-3 pb-10">
            {filtered().map((f) => (
              <div key={f.id} className="card">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{f.title}</h3>
                    <p className="text-sm text-gray-600">{f.description}</p>
                    {f.tags?.length > 0 && (
                      <div className="mt-1 text-xs text-gray-500">
                        #{f.tags.join(' #')}
                      </div>
                    )}
                  </div>
                  {f.status === 'open' && (
                    <Button onClick={() => complete(f)}>Completa</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Nuovo favore">
        <form className="space-y-3" onSubmit={submitCreate}>
          <input
            className="input"
            placeholder="Titolo"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <textarea
            className="input"
            placeholder="Descrizione"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <input
            className="input"
            placeholder="Tag separati da virgola"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />
          <div className="flex items-center gap-2">
            <label className="text-sm">Richiesta</label>
            <input
              type="radio"
              name="type"
              checked={form.type === 'request'}
              onChange={() => setForm({ ...form, type: 'request' })}
            />
            <label className="ml-4 text-sm">Offerta</label>
            <input
              type="radio"
              name="type"
              checked={form.type === 'offer'}
              onChange={() => setForm({ ...form, type: 'offer' })}
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="secondary" onClick={() => setCreateOpen(false)}>
              Annulla
            </Button>
            <Button type="submit">Pubblica</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
