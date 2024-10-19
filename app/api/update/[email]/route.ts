import { NextResponse } from 'next/server'
import prisma from '@lib/prisma'

export const PUT = async (req: any, { params }: any) => {
	let { email } = await params
	let { name, role } = await req.json()

	await prisma.$connect()

	try {
		await prisma.user.update({ where: { email }, data: { name, role } })
		return new NextResponse('updated', { status: 200 })
	} catch (err: any) {
		return new NextResponse(err, {
			status: 500,
		})
	}
}
