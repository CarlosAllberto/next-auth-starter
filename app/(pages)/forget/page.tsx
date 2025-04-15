'use client'

import toast, { Toaster } from 'react-hot-toast'
import { forgetAction } from './actions'
import { useFormState } from 'react-dom'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Forget() {
	const router = useRouter()
	const [state, formAction] = useFormState(forgetAction, { error: '', ok: undefined })

	useEffect(() => {
		if (state?.ok) {
			alert(`code: ${state.code}`)
			router.push('/forget/code')
		}
		if (state?.error) toast.error(state.error)
	}, [state])

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<form
				className="border border-zinc-800 rounded-3xl p-16 bg-zinc-900 flex flex-col gap-4 w-[500px]"
				action={formAction}
			>
				<div>
					<h1 className="text-center text-white font-semibold text-4xl mb-5">Esqueci a senha</h1>
					<p className="text-white/50">
						Enviaremos uma mensagem para o seu E-mail contendo o link para redefinir sua senha.
					</p>
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
				<Toaster position="top-right" />
			</form>
		</main>
	)
}
