import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Empty from '../components/Empty';
import { Backend } from '../adapters';

export default function Notifications() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function load() {
      const list = await Backend.listNotifications?.();
      setItems(list || []);
    }
    load();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 pt-20">
        <h2 className="mb-4 text-xl font-semibold">Notifiche</h2>
        {items.length === 0 ? (
          <Empty title="Nessuna notifica" />
        ) : (
          <ul className="space-y-3 pb-10">
            {items.map((n) => (
              <li key={n.id} className="card text-sm text-gray-700">
                {n.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
