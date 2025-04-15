import { NextResponse, NextRequest } from 'next/server' 
import prisma from '@lib/prisma'

export const DELETE = async (req: NextRequest, { params }: { params: { email: string } }) => {
	let { email } = params

	await prisma.$connect()

	try {
		await prisma.user.delete({ where: {email} })
		return new NextResponse('deleted', { status: 200 })
	} catch (err) {
		return new NextResponse(String(err), {
			status: 500,
		}) 
	}
}
