'use client'

import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import { verifyTokenAction, updatePassword } from '../actions'

export default function NewPassword({ params }: { params: { token: string } }) {
	const router = useRouter()
	const [state, formAction] = useFormState<any>(updatePassword, {})
	
	useEffect(() => {
		const verifyToken = async () => {
			let state = await verifyTokenAction(params.token)
			if (!state?.ok) {
				toast.error('Token invalid')
				return router.push('/forget')
			}
		}

		verifyToken()
	}, [])

	useEffect(() => {
		if (state.ok) {
			alert('update password success.')
			router.push(`/login`)
		}
		if (state.error) toast.error(state.error)
	}, [state])

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<form
				className="border border-zinc-800 rounded-3xl p-16 bg-zinc-900 flex flex-col gap-4 w-[500px]"
				action={formAction}
			>
				<div>
					<h1 className="text-center text-white font-semibold text-4xl mb-5">Esqueci a senha</h1>
				</div>
				<div>
					<input
						type="password"
						placeholder="Digite sua nova senha"
						id="password"
						name="password"
						className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded-md text-white"
					/>
				</div>
				<div>
					<input
						type="password"
						placeholder="Confirme sua nova senha"
						id="confirm-password"
						name="confirm-password"
						className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded-md text-white"
					/>
				</div>
				<div>
					<button className="bg-white ps-5 pe-5 pt-2 pb-2 rounded-md w-full">Confirmar</button>
				</div>
				<Toaster position="top-right" />
			</form>
		</main>
	)
}
