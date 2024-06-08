import { getAuth } from 'firebase-admin/auth'
import firebaseServer from '../utils/firebaseServer'

export default defineEventHandler(async (event) => {
    // allow only post request
    if (event.req.method !== 'POST') {
        event.res.statusCode = 405
        event.res.end()
        return
    }

    // connect to firebase
    firebaseServer()
    const { token } = await readBody(event)

    const expiresIn = 60 * 60 * 24 * 5 * 1000

    try {
        const options = {
            maxAge: expiresIn,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        }


        const authCookie = await getAuth().createSessionCookie(token, { expiresIn })

        setCookie(event, 'authCookie', authCookie, options)

        return {
            statusCode: 200,
            message: 'Auth successful'
        }
    } catch (err: any) {
        throw createError({ statusCode: 401, message: err.code })
    }
})
