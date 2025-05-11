'use server'

export async function loginAction(prevState: unknown, data: FormData) {
	const isValidEmail = (email: string) => {
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
		return emailRegex.test(email)
	}

	let email: string = data.get('email') as string

	if (!isValidEmail(email)) {
		return { error: 'Email is invalid' }
	}

  return { data: { email } }
}
