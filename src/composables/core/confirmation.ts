import { useCoreModal } from './modals'

const confirmationState = {
	description: ref(''),
    title: ref(''),
    type: ref('Alert'),
    call_function: ref(() => { }),
    loading: ref(false)

}

interface AlertTypes {
	type: 'Alert' | 'ERROR' | 'SUCCESS'
	desc: string
    title: string
    call_function: () => void
    loading: Ref<boolean>
}

export const useConfirmationModal = () => {
    const { openConfirmation, closeConfirmation } = useCoreModal()
    const openAlert = ({ type, desc, call_function, title, loading }: AlertTypes) => {
		confirmationState.type.value = type
        confirmationState.description.value = desc
        confirmationState.title.value = title
        confirmationState.call_function.value = call_function
        confirmationState.loading = loading

        openConfirmation()
	}
	const closeAlert = () => {
        confirmationState.description.value = ''
        confirmationState.title.value = ''
        confirmationState.call_function.value = () => { }
        closeConfirmation()
	}

	return { ...confirmationState, openAlert, closeAlert }
}

