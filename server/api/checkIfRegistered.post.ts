import { init } from '@instantdb/admin'
import { schema } from '~~/instant.schema'

export default defineEventHandler<
  { body: ApiRequest },
  Promise<ApiResponse>
>(async (event): Promise<ApiResponse> => {
  const db = init({
    appId: useRuntimeConfig(event).public.instantAppId,
    adminToken: useRuntimeConfig(event).instantAppAdminToken,
    schema,
  })

  const { email } = await readBody(event)
  const user = await db.auth.getUser({ email })
  
  return { isRegistered: !!user }
})
