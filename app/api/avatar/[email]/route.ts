import { NextResponse, NextRequest } from 'next/server'
import prisma from '@lib/prisma'
import { fileTypeFromBuffer } from 'file-type'
import { v4 as uuidv4 } from 'uuid'
import { Jimp } from 'jimp'

export const PUT = async (req: NextRequest, { params }: { params: { email: string } }) => {
	let { email } = params
	const data = await req.formData()
	const dataFile = data.get('file')

	try {
		if (!(dataFile instanceof File)) {
			return new NextResponse('Invalid file', { status: 400 })
		}
		const bytes = await dataFile.arrayBuffer()
		const buffer = Buffer.from(bytes)

		const type = await fileTypeFromBuffer(new Uint8Array(buffer))
		if (!type || !type.mime.startsWith('image/')) {
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
		} catch (err) {
			console.log(err)
			return new NextResponse(String(err), {
				status: 500,
			})
		}
	} catch (err) {
		console.error('Error:', err)
		return new NextResponse(String(err), { status: 500 })
	}
}

export const DELETE = async (req: NextRequest, { params }: { params: { email: string } }) => {
	let { email } = params

	try {
		try {
			await prisma.user.update({
				where: { email },
				data: { image: null },
			})
			return NextResponse.json('update', { status: 200 })
		} catch (err) {
			console.log(err)
			return new NextResponse(String(err), {
				status: 500,
			})
		}
	} catch (err) {
		console.error('Error:', err)
		return new NextResponse(String(err), { status: 500 })
	}
}