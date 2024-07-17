import User from '@models/User'
import connect from '@utils/db'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import prisma from "@lib/prisma" 

export const POST = async (req: any) => {
	const { name, email, password } = await req.json()

	await prisma.$connect()
	// await connect()

	// const existingUser = await User.findOne({ email })

	// if (existingUser) {
	// 	return new NextResponse('Email is already in use', { status: 400 })
	// }

	const hashedPassword = await bcrypt.hash(password, 5)
	// const newUser = new User({
	// 	name,
	// 	email,
	// 	password: hashedPassword,
	// 	provider: 'credentials',
	// })

	try {
		// await newUser.save()
		// await prisma.user.create({
    //   data: { name, email, password: hashedPassword },
    // })
		let data = await prisma.user.findUnique({
			where: { email }
		})
		console.log(data)
		// await prisma.user.create({
    //   data: { name: 'carlos' },
    // })
		return new NextResponse('user is registered', { status: 200 })
	} catch (err: any) {
		console.log(err)
		return new NextResponse(err, {
			status: 500,
		})
	}
}
