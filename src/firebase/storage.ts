import { ref as fireRef, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage'
import { storage } from './init'
import { useAlert } from '@/composables/core/notification'

export const uploadFirebasetorage = () => {
    const percentage = ref(0)
    const downloadURL = ref('')
    const loading = ref(false)

    const upload = async (folderName: string, file: Ref<File>) => {
            const storageRef = fireRef(storage, folderName)
        loading.value = true
        const uploadTask = uploadBytesResumable(storageRef, file.value)
        uploadTask.on('state_changed', (snapshot) => {
            percentage.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        }, (error) => {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: error.message })
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
                loading.value = false
                downloadURL.value = URL
            })
        })
    }

    return { percentage, upload, downloadURL, loading }
}

export const deleteStorageFileByURL = () => {
    const loading = ref(false)

    const deleteFile = async (url: string) => {
        const storageRef = fireRef(storage, url)
        try {
            loading.value = true
            await deleteObject(storageRef)
        } catch (e:any) {
            useAlert().openAlert({ type: 'ERROR', msg: e.message })
        }
        loading.value = false
    }

    return { deleteFile, loading }
}
