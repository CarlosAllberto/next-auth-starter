'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { registerAction } from './actions'
import toast, { Toaster } from 'react-hot-toast'
import { useFormState } from 'react-dom'

const initialState = { email: null }

export default function Register() {
	const router = useRouter()

	const [state, formAction] = useFormState<any>(registerAction, initialState)

	useEffect(() => {
		if (state.ok) router.replace('/')
		if (state.error) toast.error(state.error)
	}, [state])

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<form
				className="border border-zinc-800 rounded-3xl p-16 bg-zinc-900 flex flex-col gap-4"
				action={formAction}
			>
				<div>
					<h1 className="text-center text-white font-semibold text-4xl">Registrar</h1>
				</div>
				<div>
					<input
						type="text"
						placeholder="Seu Nome"
						id="name"
						name="name"
						className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded-md text-white"
					/>
				</div>
				<div>
					<input
						type="email"
						placeholder="Seu E-mail"
						id="email"
						name="email"
						className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded-md text-white"
					/>
				</div>
				<div>
					<input
						type="password"
						placeholder="Sua senha"
						id="password"
						name="password"
						className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded-md text-white"
					/>
				</div>
				<div>
					<input
						type="password"
						placeholder="Confirme sua senha"
						id="confirm-password"
						name="confirm-password"
						className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded-md text-white"
						/>
				</div>
				<div className="flex items-center">
					<input
						type="checkbox"
						id="terms"
						name="terms"
						className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
					/>
					<label htmlFor="terms" className="ml-3 block text-sm leading-6 text-white">
						Accept our terms and privacy policy
					</label>
				</div>
				<div>
					<button className="bg-white ps-5 pe-5 pt-2 pb-2 rounded-md w-full">Registrar</button>
				</div>
				<Toaster position="top-right" />
			</form>
		</main>
	)
}
