'use server'
import { randomBytes } from 'crypto'
import { cookies } from 'next/headers'

export async function forgetAction(prevState: any, data: FormData) {
	const isValidEmail = (email: string) => {
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
		return emailRegex.test(email)
	}

	let email: any = data.get('email')

	if (!isValidEmail(email)) {
		return { error: 'Email is invalid' }
	}

	try {
		const res = await fetch(`http://localhost:3000/api/get/${email}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (res.status === 200) {
			let data = await res.json()
			if (data) {
				if (data.provider === 'credentials') {
					const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
					cookies().set(
						'email', email, {
							httpOnly: true,
							secure: true, 	
							expires: expires,
							sameSite: 'lax',
							path: '/',
						}
					)

					let resetPasswordToken = randomBytes(20).toString('hex')
					let codes = []

					for(let i = 0; i < 4; i++) {
						let numero = Math.floor(Math.random() * 10)
						codes.push(numero)
					}
					
					let resetPasswordCode = codes.join("")

					let currentDate = new Date()
					let resetPasswordExpires = new Date(currentDate.getTime() + 60 * 60 * 1000)

					const res = await fetch(`http://localhost:3000/api/update/${email}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							resetPasswordToken,
							resetPasswordCode,
							resetPasswordExpires
						}),
					})
					if (res.status === 200) {
						return { ok: 'OK', code: resetPasswordCode }
					}
				}
				return { error: `you create account with ${data.provider}` }
			}
			return { error: 'Email not found in database.' }
		}
	} catch (error) {
		return { error: 'Error, try again' }
	}
}
