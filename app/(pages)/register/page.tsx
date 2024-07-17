'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'

export default function Register() {
	const [role, setRole] = useState('')
	const router = useRouter()

	const isValidEmail = (email: string) => {
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
		return emailRegex.test(email)
	}
	const handleSubmit = async (e: any) => {
		e.preventDefault()
		const name = e.target[0].value
		const email = e.target[1].value
		const password = e.target[2].value
		const confirmPassword = e.target[3].value
		const terms = e.target[4].checked

		if (!name || name.length < 8) {
			toast.error('Name is invalid')
			return
		}

		if (!isValidEmail(email)) {
			toast.error('Email is invalid')
			return
		}

		if (!password || password.length < 8) {
			toast.error('Password is invalid')
			return
		}

		if (confirmPassword !== password) {
			toast.error('Passwords are not equal')
			return
		}

		if (!terms) {
			toast.error('It is not possible to proceed without accepting the terms')
			return
		}

		try {
			const res = await fetch('/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					email,
					password,
				}),
			})
			if (res.status === 400) {
				toast.error('The email already in use')
			}
			if (res.status === 200) {
				router.push('/login')
			}
		} catch (error) {
			toast.error('Error, try again')
			console.log(error)
		}
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
			onSubmit={handleSubmit}
		>
			<div>
				<h1 className="text-center text-white font-semibold text-4xl">Login</h1>
			</div>
			<div>
				<input
					type="text"
					placeholder="Seu Nome"
					id="name"
					name="name"
					value="Carlos Alberto"
					className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded-md text-white"
				/>
			</div>
			<div>
				<input
					type="email"
					placeholder="Seu E-mail"
					id="email"
					name="email"
					value="teste@gmail.com"
					className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded-md text-white"
				/>
			</div>
			<div>
				<input
					type="password"
					placeholder="Sua senha"
					id="password"
					name="password"
					value="12345678"
					className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded-md text-white"
				/>
			</div>
			<div>
				<input
					type="password"
					placeholder="Confirme sua senha"
					id="confirm-password"
					name="confirm-password"
					value="12345678"
					className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded-md text-white"
					/>
			</div>
			<div className="flex items-center">
				<input
					type="checkbox"
					id="remember-me"
					name="remember-me"
					checked
					className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
				/>
				<label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-white">
					Accept our terms and privacy policy
				</label>
			</div>
			<div>
				<button className="bg-white ps-5 pe-5 pt-2 pb-2 rounded-md w-full">Register</button>
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
