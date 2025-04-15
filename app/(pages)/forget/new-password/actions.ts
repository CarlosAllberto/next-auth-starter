'use server'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'

export async function verifyTokenAction(token:string) {
	const email: string = (cookies()).get('email')?.value as string

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
				if (data.resetPasswordToken === token) {
					let currentDate = new Date()
					let currentDateTime = new Date(currentDate.getTime())
					let resetPasswordExpires = new Date(data.resetPasswordExpires)

					if (resetPasswordExpires > currentDateTime) {
						return { ok: 'OK', token: data.resetPasswordToken }
					}

					return { error: 'Token expired time' }
				}
				return { error: `Token error` }
			}
			return { error: 'Email not found in database.' }
		}
	} catch (error) {
		return { error: 'Error, try again' }
	}
}

export async function updatePassword(prevState:any, data: FormData) {
	const email: string = (cookies()).get('email')?.value as string

	let password: string = data.get('password') as string
  let confirmPassword: string = data.get('confirm-password') as string

	if (!password || password.length < 8) {
		return { error: `Password is invalid` }
	}

	if (confirmPassword !== password) {
		return { error: `Passwords are not equal` }
	}

	const hashedPassword = await bcrypt.hash(password, 5)

  try {
		const res = await fetch(`http://localhost:3000/api/update/${email}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				password: hashedPassword,
			}),
		})
		if (res.status === 200) {
			return { ok: 'OK' }
		}
		return { error: 'Error, try again' }
	} catch (error) {
		return { error: 'Error, try again' }
	}
}