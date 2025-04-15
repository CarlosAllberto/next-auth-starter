import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '@lib/prisma'

export const POST = async (req: NextRequest) => {
	const { name, email, password } = await req.json()

	await prisma.$connect()

	const hashedPassword = await bcrypt.hash(password, 5)
	try {
		let existingUser = await prisma.user.findUnique({ where: { email } })

		if (existingUser) {
			return new NextResponse('Email is already in use', { status: 400 })
		}
		await prisma.user.create({ data: { name, email, password: hashedPassword, provider: 'credentials' } })
		return new NextResponse('user is registered', { status: 200 })
	} catch (err: any) {
		return new NextResponse(err, { status: 500 })
	}
}
