
export const modalType = ref()
export const closeModalType = () => {
	modalType.value = null
}

const capitalize = (text: string) => (text[0] ?? '').toUpperCase() + text.slice(1)
const merge = (type: string, key: string) => type + key

function spreadModals<T>(type: string, modals: Record<string, T>) {
    return Object.fromEntries(Object.entries(modals).map(([key, val]) => [merge(type, key), val]))
}
const stack = ref<string[]>([])

export const closeAllExtremes = () => {
    stack.value = []
    modalType.value = null
}

export const useModal = () => {
    const modals = {}

    const open = (id: string) => {
        close(id)
        if (Object.keys(modals).includes(id)) stack.value.push(id)
    }

    const close = (id: string) => {
        const index = stack.value.findIndex((i) => i === id)
        if (index > -1) stack.value.splice(index)
    }
    const toggle = (id: string) => {
        if (stack.value.includes(id)) closeModalType()
        else open(id)
    }

    function register<Key extends string>(type: string, modalObject: Record<Key, any>) {
        Object.assign(modals, spreadModals(type, modalObject))
        const helpers = Object.fromEntries(
            Object.keys(modalObject)
                .map(capitalize)
                .map((key) => [
                    [[`open${key}`], () => open(merge(type, key))],
                    [[`close${key}`], () => close(merge(type, key))],
                    [[`toggle${key}`], () => toggle(merge(type, key))]
                ]).reduce((acc, curr) => acc.concat(curr), [])
        ) as Record<`open${Capitalize<Key>}` | `close${Capitalize<Key>}` | `toggle${Capitalize<Key>}`, () => void>

        const closeAll = () => Object.keys(modalObject).forEach((key) => close(merge(type, key)))
        return { ...helpers, closeAll }
    }

    return { stack, modals, open, close, register, closeAllExtremes }
}
