import { LocalAdapter } from './local'
import { FirebaseAdapter } from './firebase'

const mode = import.meta.env.VITE_BACKEND ?? 'local'; // 'local' or 'firebase'
export const Backend = mode === 'firebase' ? FirebaseAdapter : LocalAdapter;
