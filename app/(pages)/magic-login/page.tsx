'use client'

import { signIn } from 'next-auth/react'

export default function Login() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<form className="border border-zinc-800 rounded-3xl p-16 bg-zinc-900 flex flex-col gap-4 max-w-[500px]">
				<div>
					<h1 className="text-center text-white font-semibold text-4xl">Login</h1>
				</div>
				<div>
					<p className="text-white/50 text-center">
						Você recebera uma mensagem na sua caixa de emails contendo o link para realizar o login
					</p>
				</div>
				<div>
					<input
						type="email"
						placeholder="Seu E-mail"
						className="bg-zinc-900 border border-zinc-800 p-2 rounded-md text-white w-full"
						name="email"
						defaultValue="dasilvacarlosalberto344@gmail.com"
					/>
				</div>
				<div>
					<button
						className="bg-white ps-5 pe-5 pt-2 pb-2 rounded-md w-full"
						onClick={() => signIn('email', { callbackUrl: '/' })}
					>
						Enviar
					</button>
				</div>
			</form>
		</main>
	)
}
