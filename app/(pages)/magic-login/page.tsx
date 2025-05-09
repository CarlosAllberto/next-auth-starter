'use client'

import { signIn } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import { loginAction } from './actions'
import { useFormState } from 'react-dom'

export default function Login() {
	const router = useRouter()

	const [state, formAction] = useFormState(loginAction, { error: '', data: undefined })

	useEffect(() => {
		const login = async ({ email, password }: { email: string; password: string }) => {
			let result = await signIn('credentials', {
				email,
				password,
				redirect: false,
			})

			if (result?.error) {
				return toast.error('E-mail ou senha invalidos')
			}

			router.replace('/')
		}

		if (state.data) login({ email: state.data.email, password: state.data.password })
		if (state.error) toast.error(state.error)
	}, [state])

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<form
				className="border border-zinc-800 rounded-3xl p-16 bg-zinc-900 flex flex-col gap-4 min-w-[450px]"
				action={formAction}
			>
				<div>
					<h1 className="text-center text-white font-semibold text-4xl">Login</h1>
				</div>
        <div>
          <p className='text-white/50 text-center'>Você recebera uma mensagem na sua caixa de emails contento o link para realizar o login</p>
        </div>
				<div>
					<input
						type="email"
						placeholder="Seu E-mail"
						className="bg-zinc-900 border border-zinc-800 p-2 rounded-md text-white w-full"
						name="email"
					/>
				</div>
				<div>
					<button className="bg-white ps-5 pe-5 pt-2 pb-2 rounded-md w-full">Enviar</button>
				</div>
				<div className="flex justify-center mt-6">
					<a href="/register" className="text-white/50 text-center underline">
						Não tenho uma conta ainda
					</a>
				</div>
				<Toaster position="top-right" />
			</form>
		</main>
	)
}
