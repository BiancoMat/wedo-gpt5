const LS_KEY = 'wedo_demo_state_v1';
function load() {
  const raw = localStorage.getItem(LS_KEY);
  if (raw) return JSON.parse(raw);
  const initial = {
    users: {},
    currentUser: null,
    credits: {},
    favors: [
      { id: 'f1', title: 'Aiuto con spesa', description: 'Ritiro pacco in centro', tags:['spesa'], status:'open', ownerId:'u1', createdAt: Date.now() },
      { id: 'f2', title: 'Lezione di chitarra', description: '30 min base', tags:['musica'], status:'open', ownerId:'u2', createdAt: Date.now() },
    ],
    groups: [{ id:'g1', name:'Quartiere Centro', description:'Favori in zona centro' }],
    notifications: []
  };
  localStorage.setItem(LS_KEY, JSON.stringify(initial));
  return initial;
}
function save(s){ localStorage.setItem(LS_KEY, JSON.stringify(s)); }

let state = load();

export const LocalAdapter = {
  name: 'local',
  init: () => {},
  onAuthStateChanged: (cb) => { cb(state.currentUser); return () => {}; },
  signIn: async (email, password) => {
    const id = Object.keys(state.users).find(uid => state.users[uid].email === email);
    if (!id) throw new Error('Utente non trovato.');
    state.currentUser = { uid: id, email };
    save(state);
    return { user: state.currentUser };
  },
  signUp: async (email, password) => {
    const uid = 'u' + Math.random().toString(36).slice(2,8);
    state.users[uid] = { email };
    state.credits[uid] = 1;
    state.currentUser = { uid, email };
    save(state);
    return { user: state.currentUser };
  },
  signOut: async () => { state.currentUser = null; save(state); },
  getUserCredits: async (uid) => state.credits[uid] ?? 0,
  setUserCredits: async (uid, balance) => { state.credits[uid] = balance; save(state); },
  listFavors: async () => state.favors,
  addFavor: async (favor) => { const id='f'+Math.random().toString(36).slice(2,8); state.favors.unshift({id, ...favor, createdAt: Date.now(), status:'open'}); save(state); return id; },
  completeFavor: async (favorId, giverId, receiverId) => {
    const f = state.favors.find(x=>x.id===favorId); if(!f) return;
    f.status='completed'; f.completedAt=Date.now(); f.giverId=giverId; f.receiverId=receiverId;
    state.credits[giverId]=(state.credits[giverId]??0)+1;
    state.credits[receiverId]=(state.credits[receiverId]??0)-1;
    state.notifications.unshift({ id:'n'+Date.now(), text:`Favor completato: ${f.title}`, t:Date.now() })
    save(state);
  },
  listGroups: async () => state.groups,
  addGroup: async (group) => { const id='g'+Math.random().toString(36).slice(2,8); state.groups.unshift({id, ...group}); save(state); return id; },
};
