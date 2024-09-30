'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { registerAction } from './actions'
import toast, { Toaster } from 'react-hot-toast'
import { useFormState } from 'react-dom'

const initialState = { email: null }

export default function Register() {
	const router = useRouter()

	const [role, setRole] = useState('')
	const [state, formAction] = useFormState<any>(registerAction, initialState)

	useEffect(() => {
		if (state.ok) router.replace('/')
		if (state.error) toast.error(state.error)
	}, [state])

	const screenRole = (
		<div className="flex justify-center gap-4">
			<div className="border border-zinc-800 rounded-3xl p-16 bg-zinc-900 flex flex-col gap-4 w-4/12">
				<h3 className="text-center text-white font-semibold text-3xl">User</h3>
				<p className="text-white/60">
					Mussum Ipsum, cacilds vidis litro abertis. Per aumento de cachacis, eu reclamis. A ordem
					dos tratores não altera o pão duris. Tá deprimidis, eu conheço uma cachacis que pode
					alegrar sua vidis. Quem num gosta di mim que vai caçá sua turmis!
				</p>
				<button
					className="bg-white ps-5 pe-5 pt-2 pb-2 rounded-md w-full mt-4"
					onClick={() => setRole('user')}
				>
					Selecionar
				</button>
			</div>
			<div className="border border-zinc-800 rounded-3xl p-16 bg-zinc-900 flex flex-col gap-4 w-4/12">
				<h3 className="text-center text-white font-semibold text-3xl">Admin</h3>
				<p className="text-white/60">
					Mussum Ipsum, cacilds vidis litro abertis. Per aumento de cachacis, eu reclamis. A ordem
					dos tratores não altera o pão duris. Tá deprimidis, eu conheço uma cachacis que pode
					alegrar sua vidis. Quem num gosta di mim que vai caçá sua turmis!
				</p>
				<button
					className="bg-white ps-5 pe-5 pt-2 pb-2 rounded-md w-full mt-4"
					onClick={() => setRole('admin')}
				>
					Selecionar
				</button>
			</div>
		</div>
	)

	const screenRegister = (
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
			<div>
				<input
					type="text"
					name="role"
					value={role}
					className="hidden"
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
	)

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			{role ? screenRegister : screenRole}
		</main>
	)
}
