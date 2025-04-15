'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import toast, { Toaster } from 'react-hot-toast'
import { useFormState } from 'react-dom'
import { _updateProfile, _deleteAccount, getProfile } from './actions'
import { GoTrash } from 'react-icons/go'

export default function Home() {
	const router = useRouter()

	const [state, formAction] = useFormState(_updateProfile, { error: '', ok: undefined })

	const { data: session, update, status } = useSession()
	const sessionEmail: string = session?.user?.email as string
	const sessionName: string = session?.user?.name as string
	const sessionImage: string = session?.user?.image as string

	interface iFormData {
		name: string
		role: string
		image: string
		provider: string
	}

	const [formData, setFormData] = useState<iFormData>({
		name: '',
		role: '',
		image: '',
		provider: '',
	})
	let { name, role, image } = formData

	const credentialsUser = formData.provider === 'credentials'

	/*================================================*
		Verifica se o usuário está autenticado
	 *================================================*/
	useEffect(() => {
		if (status === 'authenticated') {
			;(async () => {
				let response = await getProfile(sessionEmail)
				setFormData(response?.data)
			})()
		}
	}, [status])

	/*================================================*
		Verifica se o usuário atualizou o perfil
	 *================================================*/
	useEffect(() => {
		if (state.ok) {
			update({ name: formData.name })
			toast.success('Perfil atualizado')
		}
		if (state.error) toast.error('Erro. tente novamente mais tarde')
	}, [state])

	/*================================================*
		Insere os dados do usuário no formData
	 *================================================*/
	const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	/*================================================*
		Troca a imagem do usuário
	 *================================================*/
	const imageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		let file = e.target.files?.[0]
		if (!file) {
			toast.error('Nenhum arquivo selecionado')
			return
		}

		let dataFile = new FormData()
		dataFile.append('file', file)

		try {
			const res = await fetch(`/api/avatar/${sessionEmail}`, {
				method: 'PUT',
				body: dataFile,
			})
			if (res.status === 200) {
				let data = await res.json()
				setFormData({ ...formData, image: data.image })
				toast.success('Imagem atualizada')
			}
		} catch (error) {
			toast.error('Erro ao atualizar imagem')
			console.log(error)
		}

		const inputImage = document.querySelector<HTMLInputElement>('#image')
		if (inputImage) { inputImage.value = '' }
	}

	const deleteImage = async () => {
		try {
			const res = await fetch(`/api/avatar/${sessionEmail}`, {
				method: 'DELETE',
			})
			if (res.status === 200) {
				setFormData({ ...formData, image: '' })
				toast.success('Imagem deletada')
			}
		} catch (error) {
			toast.error('Erro ao deletar imagem')
			console.log(error)
		}
	}

	/*================================================*
		Trocar o tipo de conta do usuário
	 *================================================*/
	const roleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

	/*================================================*
		Deletar a conta do usuário
	 *================================================*/
	const deleteAccount = async () => {
		let confirm = window.prompt(
			`Para excluir a conta digite \"${sessionEmail}\". Isso é irreversivel`,
		)
		if (confirm == sessionEmail) {
			let response = await _deleteAccount(sessionEmail)
			if (response?.ok) {
				toast.success('Conta apagada')
				return router.push('/login')
			}
			toast.error('Erro. tente novamente mais tarde')
		} else {
			toast('Configuração abortada')
		}
	}

	/*================================================*
		Formulário para quem fez login com credenciais
	 *================================================*/
	const formCredentials = (
		<>
			<form action={formAction} className="flex flex-col gap-3">
				<div>
					<div className="flex justify-center">
						<div className="relative">
							<input
								type="file"
								name="image"
								id="image"
								className="hidden"
								onChange={imageChange}
							/>
							<label htmlFor="image">
								<Image
									src={image ? `/avatar/${image}` : '/avatar-default.svg'}
									alt="avatar"
									width={80}
									height={80}
									className="rounded-full object-cover cursor-pointer aspect-square border border-zinc-800"
								/>
							</label>
							{image && (
								<div className="flex justify-center">
									<button
										type="button"
										className="bg-zinc-800 p-1 aspect-square rounded-lg absolute bottom-[-5px] right-[-5px] border border-red-500 text-red-500"
										onClick={() => deleteImage()}
									>
										<GoTrash size={16} color="red" />
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
				<div>
					<select
						name="role"
						id="role"
						value={role}
						onChange={roleChange}
						className="bg-zinc-800 p-1 rounded-full text-zinc-500"
					>
						<option value="user">user</option>
						<option value="admin">admin</option>
					</select>
				</div>
				<h1 className="text-center text-white font-normal text-2xl">
					Bem vindo <span className="font-semibold">{sessionName}</span>
				</h1>
				<div>
					<input
						type="text"
						placeholder="Seu Nome"
						id="name"
						name="name"
						value={name}
						onChange={inputChange}
						className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded-md text-white"
					/>
				</div>
				<div className="hidden">
					<input type="text" id="email" name="email" value={sessionEmail!} />
				</div>
				<div>
					<button type="submit" className="bg-white ps-5 pe-5 pt-2 pb-2 rounded-md w-full">
						Salvar Alterações
					</button>
				</div>
			</form>
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

	/*================================================*
		Formulário para quem fez login com o provedor (Google, Github, etc) 
	 *================================================*/
	const formProvider = (
		<>
			<form action={formAction} className="flex flex-col gap-3">
				<div className="flex justify-center">
					<Image
						src={`/avatar/${sessionImage}` || sessionImage || '/avatar-default.svg'}
						alt="avatar"
						width={80}
						height={80}
						className="rounded-full object-cover cursor-pointer aspect-square border border-zinc-800"
					/>
				</div>
				<div>
					<select
						name="role"
						id="role"
						value={role}
						onChange={roleChange}
						className="bg-zinc-800 p-1 rounded-full text-zinc-500"
					>
						<option value="user">user</option>
						<option value="admin">admin</option>
					</select>
				</div>
				<h1 className="text-center text-white font-normal text-2xl">
					Bem vindo <span className="font-semibold">{sessionName}</span>
				</h1>
				<div className="hidden">
					<input type="text" id="email" name="email" value={sessionEmail!} />
				</div>
				<div>
					<button type="submit" className="bg-white ps-5 pe-5 pt-2 pb-2 rounded-md w-full">
						Salvar Alterações
					</button>
				</div>
			</form>
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

	/*================================================*
		Renderiza o formulário de acordo com o tipo de login
	 *================================================*/
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<div className="border border-zinc-800 rounded-3xl p-16 bg-zinc-900 flex flex-col gap-4">
				{credentialsUser ? formCredentials : formProvider}
			</div>
		</main>
	)
}
