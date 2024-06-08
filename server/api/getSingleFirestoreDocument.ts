
import { serverside_db } from '../utils/firebaseServer'




export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const collection = query.collection as string
    const id = query.id as string
  if (!collection || !id) {
    return createError({ statusCode: 400, message: 'Collection and ID must be specified' })
  }

  try {
    const docRef = serverside_db.collection(collection).doc(id)
      const docSnap = await docRef.get()
      if (docSnap.exists) {
      return { data: docSnap.data() }
    } else {
      return createError({ statusCode: 404, message: 'Document not found' })
    }
  } catch (error:any) {
    return createError({ statusCode: 500, message: error.message })
  }
})
