'use server'
import { cookies } from 'next/headers'

export async function verifyCodeAction(prevState:unknown, data: FormData) {
	let code1: string = data.get('code-1') as string
	let code2: string = data.get('code-2') as string
	let code3: string = data.get('code-3') as string
	let code4: string = data.get('code-4') as string
	const email: string = (cookies()).get('email')?.value as string

  let resetPasswordCode = `${code1}${code2}${code3}${code4}`

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
				if (data.provider === 'credentials' && data.resetPasswordCode === resetPasswordCode) {
					let currentDate = new Date()
					let currentDateTime = new Date(currentDate.getTime())
					let resetPasswordExpires = new Date(data.resetPasswordExpires)

					if (resetPasswordExpires > currentDateTime) {
						return { ok: 'OK', token: data.resetPasswordToken }
					}

					return { error: 'Token expired time' }
				}
				return { error: `you create account with ${data.provider}` }
			}
			return { error: 'Email not found in database.' }
		}
	} catch (error) {
		return { error: 'Error, try again' }
	}
}