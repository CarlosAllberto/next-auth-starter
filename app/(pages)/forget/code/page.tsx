'use client'

import toast, { Toaster } from 'react-hot-toast'
import { useFormState } from 'react-dom'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { verifyCodeAction } from './actions'

export default function Code() {
	const router = useRouter()
	const [state, formAction] = useFormState<any>(verifyCodeAction, {})

	const nextInput = (e: any) => {
		let { name, value } = e.target
		let index = Number(name.split('-')[1]) + 1
		if (value != '') document.querySelector(`#code-${index}`).focus()
	}

	useEffect(() => {
		if (state.ok) {
			router.push(`/forget/new-password/${state.token}`)
		}
		if (state.error) toast.error(state.error)
	}, [state])

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<div className="border border-zinc-800 rounded-3xl p-16 bg-zinc-900 flex flex-col gap-4 w-[500px]">
				<div>
					<h1 className="text-center text-white font-semibold text-3xl mb-5">
						Código de verificação
					</h1>
					<p className="text-white/50">
						Digite o código de verificação enviado para o seu email: tes*****@gmail.com.
					</p>
				</div>
				<form action={formAction}>
					<div className='mb-5'>
						<div className="flex gap-2 justify-center items-center">
							<input
								type="text"
								placeholder="0"
								id="code-1"
								className="bg-zinc-900 border border-zinc-800 w-[70px] rounded-md text-white text-center aspect-square placeholder:text-center"
								name="code-1"
								pattern="\d*"
								maxLength={1}
								onChange={nextInput}
							/>
							<div className="w-[10px] h-[1px] bg-zinc-800" />
							<input
								type="text"
								placeholder="0"
								id="code-2"
								className="bg-zinc-900 border border-zinc-800 w-[70px] rounded-md text-white text-center aspect-square placeholder:text-center"
								name="code-2"
								pattern="\d*"
								maxLength={1}
								onChange={nextInput}
							/>
							<div className="w-[10px] h-[1px] bg-zinc-800" />
							<input
								type="text"
								placeholder="0"
								id="code-3"
								className="bg-zinc-900 border border-zinc-800 w-[70px] rounded-md text-white text-center aspect-square placeholder:text-center"
								name="code-3"
								pattern="\d*"
								maxLength={1}
								onChange={nextInput}
							/>
							<div className="w-[10px] h-[1px] bg-zinc-800" />
							<input
								type="text"
								placeholder="0"
								id="code-4"
								className="bg-zinc-900 border border-zinc-800 w-[70px] rounded-md text-white text-center aspect-square placeholder:text-center"
								name="code-4"
								pattern="\d*"
								maxLength={1}
							/>
						</div>
					</div>
					<div>
						<button className="bg-white ps-5 pe-5 pt-2 pb-2 rounded-md w-full">Avançar</button>
					</div>
				</form>
				<Toaster position="top-right" />
			</div>
		</main>
	)
}
