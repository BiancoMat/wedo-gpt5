import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Backend } from '../adapters';
import { useAuth } from '../hooks/useAuth';
import Button from './Button';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const { user } = useAuth();
  const [credits, setCredits] = useState(0);
  useEffect(() => {
    (async () => {
      if (user) setCredits(await Backend.getUserCredits(user.uid));
    })();
  }, [user]);
  const links = [
    { to: '/board', label: 'Bacheca' },
    { to: '/groups', label: 'Gruppi' },
    { to: '/notifications', label: 'Notifiche' },
  ];
  return (
    <Disclosure as="nav" className="fixed inset-x-0 top-0 z-40 border-b bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <Link to="/" className="font-semibold">
                WeDo
              </Link>
              <div className="hidden gap-4 md:flex">
                {links.map((l) => (
                  <NavLink key={l.to} to={l.to} className="text-sm">
                    {l.label}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {user && (
                <span className="text-sm">
                  Crediti: <b>{credits}</b>
                </span>
              )}
              {user ? (
                <Button variant="secondary" onClick={() => Backend.signOut()}>
                  Esci
                </Button>
              ) : (
                <Link to="/auth">
                  <Button>Accedi</Button>
                </Link>
              )}
              <Disclosure.Button className="md:hidden">
                {open ? (
                  <XMarkIcon className="h-6" />
                ) : (
                  <Bars3Icon className="h-6" />
                )}
              </Disclosure.Button>
            </div>
          </div>
          <Disclosure.Panel className="border-t bg-white md:hidden">
            <div className="space-y-1 px-4 py-2">
              {links.map((l) => (
                <NavLink key={l.to} to={l.to} className="block py-1">
                  {l.label}
                </NavLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
