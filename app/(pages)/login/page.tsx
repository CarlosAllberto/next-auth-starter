'use client'

import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'

export default function Login() {
	const isValidEmail = (email: string) => {
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
		return emailRegex.test(email)
	}

	const router = useRouter()

	const inputChange = (e: any) => {
		let { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const [formData, setFormData] = useState({
		email: '',
		password: '',
		role: '',
	})

	const { email, password, role } = formData

	const handleSubmit = async (e: any) => {
		e.preventDefault()

		if (!isValidEmail(email)) {
			return toast.error('Email is invalid')
		}

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
					onClick={() => setFormData({ ...formData, role: 'user' })}
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
					onClick={() => setFormData({ ...formData, role: 'admin' })}
				>
					Selecionar
				</button>
			</div>
		</div>
	)

	const screenLogin = (
		<form
			className="border border-zinc-800 rounded-3xl p-16 bg-zinc-900 flex flex-col gap-4"
			onSubmit={handleSubmit}
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
					onChange={inputChange}
					value={email}
				/>
			</div>
			<div>
				<input
					type="password"
					placeholder="Sua senha"
					className="bg-zinc-900 border border-zinc-800 p-2 rounded-md text-white"
					name="password"
					onChange={inputChange}
					value={password}
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
				{/* <Image
					src="/google.png"
					alt="google"
					width={40}
					height={40}
					className="cursor-pointer rounded-full"
					onClick={() => signIn('google', { callbackUrl: '/' })}
				/>
				<Image
					src="/facebook.png"
					alt="facebook"
					width={40}
					height={40}
					className="cursor-pointer rounded-full"
					onClick={() => signIn('facebook', { callbackUrl: '/' })}
				/> */}
				<Image
					src="/github.png"
					alt="github"
					width={40}
					height={40}
					className="cursor-pointer rounded-full"
					onClick={() => signIn('github', { callbackUrl: '/' })}
				/>
			</div>
			<div className="flex justify-center mt-6">
				<a href="/register" className="text-white/50 text-center">
					Não tenho uma conta ainda
				</a>
			</div>
			<Toaster position="top-right" />
		</form>
	)

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			{role ? screenLogin : screenRole}
		</main>
	)
}
