import { NextRequest, NextResponse } from 'next/server'
import {
  changeCardDesignStatus,
  deleteCardDesign,
  fetchCardDesigns,
  newCardDesign,
  updateCardDesign,
} from '@/app/actions/card'
import { auth } from '@/auth'

export const GET = auth(async function GET(
  req: NextRequest & { auth?: any },
) {
  const designs = await fetchCardDesigns()
  return NextResponse.json(designs)
})

export const POST = auth(async function POST(
  req: NextRequest & { auth?: any },
) {
  if (!req.auth) {
    return NextResponse.json(null, { status: 401 })
  }
  const card = await req.json()
  await newCardDesign(card)
  return NextResponse.json(null, { status: 201 })
})

export const PUT = auth(async function PUT(
  req: NextRequest & { auth?: any },
) {
  if (!req.auth) {
    return NextResponse.json(null, { status: 401 })
  }
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id')
  if (!id) {
    return NextResponse.json(null, { status: 400 })
  }
  const card = await req.json()
  await updateCardDesign(id, card)
  return NextResponse.json(null, { status: 201 })
})

export const PATCH = auth(async function PATCH(
  req: NextRequest & { auth?: any },
) {
  if (!req.auth) {
    return NextResponse.json(null, { status: 401 })
  }
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id')
  const status = searchParams.get('status')
  if (!id || !status) {
    return NextResponse.json(null, { status: 400 })
  }
  await changeCardDesignStatus(id, status)
  return NextResponse.json(null, { status: 200 })
})

export const DELETE = auth(async function DELETE(
  req: NextRequest & { auth?: any },
) {
  if (!req.auth) {
    return NextResponse.json(null, { status: 401 })
  }
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id')
  if (!id) {
    return NextResponse.json(null, { status: 400 })
  }
  await deleteCardDesign(id)
  return NextResponse.json(null, { status: 200 })
})
