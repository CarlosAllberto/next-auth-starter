'use client'

import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import { loginAction } from './actions'
import { useFormState } from 'react-dom'

export default function Login() {
	const router = useRouter()

	const [state, formAction] = useFormState<any>(loginAction, {})

	useEffect(() => {
		const login = async ({email, password}: any) => {
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
				className="border border-zinc-800 rounded-3xl p-16 bg-zinc-900 flex flex-col gap-4"
				action={formAction}
			>
				<div>
					<h1 className="text-center text-white font-semibold text-4xl">Login</h1>
				</div>
				<div>
					<input
						type="email"
						placeholder="Seu E-mail"
						className="bg-zinc-900 border border-zinc-800 p-2 rounded-md text-white"
						name="email"
					/>
				</div>
				<div>
					<input
						type="password"
						placeholder="Sua senha"
						className="bg-zinc-900 border border-zinc-800 p-2 rounded-md text-white"
						name="password"
					/>
				</div>
				<div className="flex justify-end">
					<a href="/forget" className="text-white/50 text-center">
						Esqueci a senha
					</a>
				</div>
				<div>
					<button className="bg-white ps-5 pe-5 pt-2 pb-2 rounded-md w-full">Login</button>
				</div>
				<div>
					<p className="text-white text-center">ou</p>
				</div>
				<div className="flex justify-center gap-4">
					<Image
						src="/google.png"
						alt="google"
						width={40}
						height={40}
						className="cursor-pointer rounded-full opacity-5"
						// onClick={() => signIn('google', { callbackUrl: '/' })}
					/>
					<Image
						src="/facebook.png"
						alt="facebook"
						width={40}
						height={40}
						className="cursor-pointer rounded-full opacity-5"
						// onClick={() => signIn('facebook', { callbackUrl: '/' })}
					/>
					<Image
						src="/github.png"
						alt="github"
						width={40}
						height={40}
						className="cursor-pointer rounded-full opacity-5"
						// onClick={() => signIn('github', { callbackUrl: '/' })}
					/>
				</div>
				<div className="flex justify-center mt-6">
					<a href="/register" className="text-white/50 text-center">
						Não tenho uma conta ainda
					</a>
				</div>
				<Toaster position="top-right" />
			</form>
		</main>
	)
}
