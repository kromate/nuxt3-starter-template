import { useModal } from '../modal'

// ==================== AUTH ===============================
import Logout from '@/components/modals/auth/logout.vue'

// ==================== CORE ===============================

import Confirmation from '@/components/modals/core/Confirmation.vue'



type AuthTypes = 'Logout'
type CoreTypes = 'Confirmation'


const AuthModals = { Logout } as Record<AuthTypes, any>
const CoreModals = { Confirmation } as Record<CoreTypes, any>


export const modal = useModal()
const authModal = modal.register('Auth', AuthModals)
const coreModal = modal.register('Core', CoreModals)




export const useAuthModal = () => authModal
export const useCoreModal = () => coreModal




