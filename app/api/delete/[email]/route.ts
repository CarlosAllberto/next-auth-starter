import { NextResponse } from 'next/server' 
import prisma from '@lib/prisma'

export const DELETE = async (req: any, { params }: { params: { email: string } }) => {
	let { email } = params

	await prisma.$connect()

	try {
		await prisma.user.delete({ where: {email} })
		return new NextResponse('deleted', { status: 200 })
	} catch (err: any) {
		return new NextResponse(err, {
			status: 500,
		}) 
	}
}
