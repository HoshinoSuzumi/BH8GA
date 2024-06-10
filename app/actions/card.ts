'use server'

import { createKysely } from '@vercel/postgres-kysely'
import { DB } from 'kysely-codegen'
import { CardDesign, CardDesignUpdate, NewCardDesign } from '@/app/actions/types'

const db = createKysely<DB>()

export const newCardDesign = async (design: NewCardDesign) => {
  return await db.insertInto('ga_card_designs').values(design).execute()
}

export const fetchCardDesigns = async () => {
  return await db.selectFrom('ga_card_designs').selectAll().orderBy('no', 'asc').execute()
}

export const updateCardDesign = async (id: CardDesign['id'], design: CardDesignUpdate) => {
  console.log('updateCardDesign', id, design)
  return await db.updateTable('ga_card_designs').set(design).where('id', '=', id).execute()
}

export const changeCardDesignStatus = async (id: CardDesign['id'], status: CardDesign['status']) => {
  return await db.updateTable('ga_card_designs').set({ status }).where('id', '=', id).execute()
}

export const deleteCardDesign = async (id: CardDesign['id']) => {
  return await db.deleteFrom('ga_card_designs').where('id', '=', id).execute()
}
