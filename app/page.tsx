'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import toast, { Toaster } from 'react-hot-toast'

export default function Home() {
	const router = useRouter()
	const { data: session, update, status } = useSession()
	const [formData, setFormData]: any = useState({
		name: '',
		role: '',
	})
	const [image, setImage] = useState<any>()

	useEffect(() => {
		let get = async () => {
			try {
				const res = await fetch(`/api/get/${session?.user?.email}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				})
				if (res.status === 200) {
					let data = await res.json()
					setFormData(data)
				}
			} catch (error) {
				toast.error('Error, try again')
			}
		}

		if (status === 'authenticated') get()
	}, [status])

	const credentialsUser = formData.provider === 'credentials'

	const inputChange = (e: any) => {
		let { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const roleChange = (e: any) => {
		let { name, value } = e.target
		if (value === 'admin') {
			let resp = prompt('quanto é 1000 - 7?')
			if (resp != '993') {
				alert('Você ainda é muito fraco para ser admin')
				return setFormData({ ...formData, [name]: 'user' })
			}
		} else if (value === 'user') {
			alert('Você não pode ser rebaixado para user')
			return setFormData({ ...formData, [name]: 'admin' })
		}

		setFormData({ ...formData, [name]: 'admin' })
	}

	const ImageChange = (e: any) => {
		if (!e.target.files || e.target.files.length === 0) return setImage(undefined)
		setImage(URL.createObjectURL(e.target.files[0]))
		let input: any = document.querySelector('#image')
		input.value = null
	}

	const saveImage = () => console.log(image)

	const deleteAccount = async () => {
		let email = session?.user?.email
		let confirm = window.prompt(`Para excluir a conta digite \"${email}\". Isso é irreversivel`)
		if (confirm == email) {
			try {
				const res = await fetch(`/api/delete/${email}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
				})
				if (res.status === 200) {
					toast.success('Conta deletada')
					router.push('/login')
				}
			} catch (error) {
				toast.error('Error, try again')
				console.log(error)
			}
		} else {
			toast('Configuração abortada')
		}
	}

	const updatePerfil = async () => {
		if (image) saveImage()

		try {
			let name = formData.name
			let role = formData.role

			const res = await fetch(`/api/update/${session?.user?.email}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					role,
				}),
			})
			if (res.status === 200) {
				update({ name: name })
				toast.success('Pefil atualizado')
			}
		} catch (error) {
			toast.error('Error, try again')
		}
	}

	const formCredentials = (
		<>
			<div>
				<div className="flex justify-center">
					<label htmlFor="image">
						<Image
							src={image || session?.user?.image || '/avatar.svg'}
							alt="avatar"
							width={80}
							height={80}
							className="rounded-full object-cover cursor-pointer aspect-square"
						/>
					</label>
					<input type="file" name="image" id="image" className="hidden" onChange={ImageChange} />
				</div>
				{image ? (
					<div className="flex justify-center">
						<button
							className="bg-zinc-800 text-white py-2 px-4 rounded-lg mt-5"
							onClick={() => setImage('')}
						>
							Remover Imagem
						</button>
					</div>
				) : null}
			</div>
			<div>
				<select
					name="role"
					id="role"
					value={formData.role}
					onChange={roleChange}
					className="bg-zinc-800 p-1 rounded-full text-zinc-500"
				>
					<option value="user">user</option>
					<option value="admin">admin</option>
				</select>
			</div>
			<h1 className="text-center text-white font-normal text-2xl">
				Bem vindo <span className="font-semibold">{session?.user?.name}</span>
			</h1>
			<div>
				<input
					type="text"
					placeholder="Seu Nome"
					id="name"
					name="name"
					value={formData.name}
					onChange={inputChange}
					className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded-md text-white"
				/>
			</div>
			<div>
				<button
					className="bg-white ps-5 pe-5 pt-2 pb-2 rounded-md w-full"
					onClick={() => updatePerfil()}
				>
					Salvar Alterações
				</button>
			</div>
			<div className="flex justify-end gap-2 mt-10">
				<button
					className="border border-gray-500 text-gray-500 ps-5 pe-5 pt-2 pb-2 rounded-md w-[60%]"
					onClick={() => deleteAccount()}
				>
					Deletar Conta
				</button>
				<button
					className="border border-red-500 text-red-500 ps-5 pe-5 pt-2 pb-2 rounded-md w-[40%]"
					onClick={() => signOut()}
				>
					Sair
				</button>
				<Toaster position="top-right" />
			</div>
		</>
	)

	const formProvider = (
		<>
			<div className="flex justify-center">
				<Image
					src={session?.user?.image || '/avatar.svg'}
					alt="avatar"
					width={80}
					height={80}
					className="rounded-full object-cover cursor-pointer aspect-square"
				/>
			</div>
			<div>
				<select
					name="role"
					id="role"
					value={formData.role}
					onChange={roleChange}
					className="bg-zinc-800 p-1 rounded-full text-zinc-500"
				>
					<option value="user">user</option>
					<option value="admin">admin</option>
				</select>
			</div>
			<h1 className="text-center text-white font-normal text-2xl">
				Bem vindo <span className="font-semibold">{session?.user?.name}</span>
			</h1>
			<div className="flex justify-end gap-2">
				<button
					className="border border-red-500 text-red-500 ps-5 pe-5 pt-2 pb-2 rounded-md"
					onClick={() => signOut()}
				>
					Logout
				</button>
				<Toaster position="top-right" />
			</div>
		</>
	)

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<div className="border border-zinc-800 rounded-3xl p-16 bg-zinc-900 flex flex-col gap-4">
				{credentialsUser ? formCredentials : formProvider}
			</div>
		</main>
	)
}
