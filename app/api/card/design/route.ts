import { NextRequest, NextResponse } from 'next/server'
import { fetchCardDesigns } from '@/app/actions/card'
import { auth } from '@/auth'

export const GET = auth(async function GET(
  req: NextRequest & { auth?: any },
) {
  const designs = await fetchCardDesigns()
  return NextResponse.json(designs)
})