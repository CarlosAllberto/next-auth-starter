import { NextResponse, NextRequest } from 'next/server'
import prisma from '@lib/prisma'

export const PUT = async (req: NextRequest, { params }: { params: { email: string } }) => {
	let { email } = params
	let { name, role, resetPasswordToken, resetPasswordExpires, resetPasswordCode, password } = await req.json()

	await prisma.$connect()

	try {
		await prisma.user.update({
			where: { email },
			data: { name, role, resetPasswordToken, resetPasswordExpires, resetPasswordCode, password },
		})
		return new NextResponse('updated', { status: 200 })
	} catch (err) {
		console.log(err)
		return new NextResponse(String(err), {
			status: 500,
		})
	}
}
