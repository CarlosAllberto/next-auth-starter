'use client'

import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'

export default function Login() {
	const router = useRouter()

	const handleSubmit = async (e: any) => {
		e.preventDefault()

		const password = e.target[0].value
		const confirmPassword = e.target[1].value

		if (!password || password.length < 8) {
			toast.error('Password is invalid')
			return
		}

		if (confirmPassword !== password) {
			toast.error('Passwords are not equal')
			return
		}

		toast.success('Senha alterada com sucesso.')

		router.replace('/login')
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<form
				className="border border-zinc-800 rounded-3xl p-16 bg-zinc-900 flex flex-col gap-4 w-4/12"
				onSubmit={handleSubmit}
			>
				<div>
					<h1 className="text-center text-white font-semibold text-4xl mb-5">Esqueci a senha</h1>
					<p className="text-white/50">
						Enviaremos uma mensagem para o seu E-mail contendo o link para redefinir sua senha.
					</p>
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
					<button className="bg-white ps-5 pe-5 pt-2 pb-2 rounded-md w-full">Confirmar</button>
				</div>
				<Toaster position="top-right" />
			</form>
		</main>
	)
}
