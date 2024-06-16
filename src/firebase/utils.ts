export const firebaseErrorMessage = (err: any) => {
    if (err.customData._tokenResponse) {
        return err.customData._tokenResponse.error.message
    } else {
        return err.code
    }
}
