import { NextRequest, NextResponse } from 'next/server'
import { fetchCardDesigns } from '@/app/actions/card'

export async function GET(
  req: NextRequest,
) {
  const designs = await fetchCardDesigns()
  return NextResponse.json(designs)
}