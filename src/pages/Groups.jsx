import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Empty from '../components/Empty';
import { Backend } from '../adapters';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/Toast';

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  async function refresh() {
    setGroups(await Backend.listGroups());
  }
  useEffect(() => {
    refresh();
  }, []);

  function openCreate() {
    if (!user) return navigate('/auth');
    setCreateOpen(true);
  }

  async function submit(e) {
    e.preventDefault();
    try {
      await Backend.addGroup({ name, description });
      toast.add('Gruppo creato');
      setName('');
      setDescription('');
      setCreateOpen(false);
      refresh();
    } catch (err) {
      toast.add('Errore');
    }
  }

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 pt-20">
        <div className="mb-4 flex justify-between">
          <h2 className="text-xl font-semibold">Gruppi</h2>
          <Button onClick={openCreate}>Crea gruppo</Button>
        </div>
        {groups.length === 0 ? (
          <Empty title="Nessun gruppo" />
        ) : (
          <div className="space-y-3 pb-10">
            {groups.map((g) => (
              <div key={g.id} className="card">
                <h3 className="font-semibold">{g.name}</h3>
                <p className="text-sm text-gray-600">{g.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Nuovo gruppo">
        <form className="space-y-3" onSubmit={submit}>
          <input
            className="input"
            placeholder="Nome del gruppo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            className="input"
            placeholder="Descrizione"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setCreateOpen(false)}>
              Annulla
            </Button>
            <Button type="submit">Crea</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
