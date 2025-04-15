import { NextResponse, NextRequest } from 'next/server'
import prisma from '@lib/prisma'

export const GET = async (req: NextRequest, { params }: { params: { email: string } }) => {
	let { email } = params

	await prisma.$connect()

	try {
		let data = await prisma.user.findUnique({ where: { email } })
		return NextResponse.json(data)
	} catch (err) {
		return new NextResponse(String(err), {
			status: 500,
		})
	}
}
