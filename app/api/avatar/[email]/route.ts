import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import prisma from '@lib/prisma'
import { fileTypeFromBuffer } from 'file-type'
import { v4 as uuidv4 } from 'uuid'
import { Jimp } from 'jimp'

export const PUT = async (req: NextRequest, { params }: any) => {
	let { email } = await params
	const data = await req.formData()
	const dataFile = data.get('file')

	try {
		const bytes = await dataFile.arrayBuffer()
		const buffer = Buffer.from(bytes)

		const type = await fileTypeFromBuffer(buffer)
		if (!type && !type?.mime.startsWith('image/')) {
			return new NextResponse('Arquivo não suportado', { status: 400 })
		}

		const ext = type.ext
		const filename = `${new Date().getTime()}-${uuidv4()}.${ext}`
		
		const photo = await Jimp.read(buffer)
		photo.resize({w: 300, h: 300})
		photo.write(`./public/avatar/${filename}`)

		await prisma.$connect()

		try {
			await prisma.user.update({
				where: { email },
				data: { image: filename },
			})
			return NextResponse.json({ message: 'updated', image: filename }, { status: 200 })
		} catch (err: any) {
			console.log(err)
			return new NextResponse(err, {
				status: 500,
			})
		}
	} catch (err: any) {
		console.error('Error:', err)
		return new NextResponse(err, { status: 500 })
	}
}

export const DELETE = async (req: NextRequest, { params }: any) => {
	let { email } = await params

	try {
		try {
			await prisma.user.update({
				where: { email },
				data: { image: null },
			})
			return NextResponse.json('update', { status: 200 })
		} catch (err: any) {
			console.log(err)
			return new NextResponse(err, {
				status: 500,
			})
		}
	} catch (err: any) {
		console.error('Error:', err)
		return new NextResponse(err, { status: 500 })
	}
}