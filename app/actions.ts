'use server'

/*================================================*
  Atualiza o perfil do usuário
 *================================================*/
export async function _updateProfile(prevState: any, data: FormData) {
	let email: any = data.get('email')
	let name: any = data.get('name')
	let role: any = data.get('role')

	try {
		const res = await fetch(`http://localhost:3000/api/update/${email}`, {
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
			return { ok: 'OK' }
		}
		return { error: 'Error, try again' }
	} catch (error) {
		return { error: 'Error, try again' }
	}
}

/*================================================*
  Deleta a conta do usuário
 *================================================*/
export async function _deleteAccount(email: any) {
	try {
		const res = await fetch(`http://localhost:3000/api/delete/${email}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (res.status === 200) {
			return { ok: 'OK' }
		}
	} catch (error) {
		return { error: 'Error, try again' }
	}
}

/*================================================*
  Carrega os dados do usuário
 *================================================*/
export async function getProfile(email: any) {
	try {
		const res = await fetch(`http://localhost:3000/api/get/${email}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (res.status === 200) {
			let data = await res.json()
			return { data: data }
		}
	} catch (error) {
		return { error: 'Error, try again' }
	}
}
