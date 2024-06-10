'use server'

import { createKysely } from '@vercel/postgres-kysely'
import { DB, GaCardDesigns } from 'kysely-codegen'

const db = createKysely<DB>()

export const fetchCardDesigns = async () => {
  return await db.selectFrom('ga_card_designs').selectAll().execute()
}
