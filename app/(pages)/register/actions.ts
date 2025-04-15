'use server'

export async function registerAction(prevState: unknown, data: FormData) {
	const isValidEmail = (email: string) => {
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
		return emailRegex.test(email)
	}

	let name: string = data.get('name') as string
	let email: string = data.get('email') as string
	let password: string = data.get('password') as string
	let confirmPassword: string = data.get('confirm-password') as string
	let terms: string = data.get('terms') as string

	if (!name || name.length < 8) {
		return { error: 'Name is invalid' }
	}

	if (!isValidEmail(email)) {
		return { error: 'Email is invalid' }
	}

	if (!password || password.length < 8) {
		return { error: 'Password is invalid' }
	}

	if (confirmPassword !== password) {
		return { error: 'Passwords are not equal' }
	}

	if (!terms) {
		return { error: 'It is not possible to proceed without accepting the terms' }
	}

	try {
		const res = await fetch('http://localhost:3000/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		})
		if (res.status === 200) {
			return { ok: 'OK' }
		}
		if (res.status === 400) {
			return { error: 'The email already in use' }
		}
	} catch (error) {
		console.log(error)
		return { error: 'Error, try again' }
	}
}
