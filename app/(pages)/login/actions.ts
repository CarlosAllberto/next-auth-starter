'use server'

export async function loginAction(prevState: any, data: FormData) {
	const isValidEmail = (email: string) => {
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
		return emailRegex.test(email)
	}

	let email: string = data.get('email') as string
	let password: string = data.get('password') as string

	if (!isValidEmail(email)) {
		return { error: 'Email is invalid' }
	}

	if (!password || password.length < 8) {
		return { error: 'Password is invalid' }
	}

  return { data: { email, password } }
}
