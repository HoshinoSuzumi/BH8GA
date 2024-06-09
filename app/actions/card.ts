'use server'

import { createKysely } from '@vercel/postgres-kysely'
import { DB } from 'kysely-codegen'

export const fetchCardDesigns = async () => {
  const db = createKysely<DB>()
  return await db.selectFrom('ga_card_designs').selectAll().execute()
}
