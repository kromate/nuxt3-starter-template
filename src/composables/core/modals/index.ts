import { useModal } from '../modal'

// ==================== AUTH ===============================
import Logout from '@/components/modals/auth/logout.vue'
import 





type AuthTypes = 'Logout'


const AuthModals = { Logout } as Record<AuthTypes, any>



export const modal = useModal()
const authModal = modal.register('Auth', AuthModals)
const coreModal = modal.register('Core', CoreModals)




export const useAuthModal = () => authModal
export const useCoreModal = () => coreModal




