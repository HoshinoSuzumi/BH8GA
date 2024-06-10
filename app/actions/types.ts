import { Insertable, Selectable, Updateable } from 'kysely'
import { GaCardDesigns } from 'kysely-codegen'

export type CardDesign = Selectable<GaCardDesigns>
export type NewCardDesign = Insertable<GaCardDesigns>
export type CardDesignUpdate = Updateable<GaCardDesigns>
