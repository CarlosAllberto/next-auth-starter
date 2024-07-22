import { NextResponse } from 'next/server'
import prisma from '@lib/prisma'

export const GET = async (req: any, { params }: any) => {
	let { email } = await params

	await prisma.$connect()

	try {
		let data = await prisma.user.findUnique({ where: { email } })
		return NextResponse.json(data)
	} catch (err: any) {
		return new NextResponse(err, {
			status: 500,
		})
	}
}
