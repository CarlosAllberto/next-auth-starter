import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@lib/prisma'
import bcrypt from 'bcryptjs'

const handler = NextAuth({
	providers: [
		/*================================================*
			Método de login usando provedores: Google, Facebook e Github
		 *================================================*/
		GitHubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID!,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
		}),

		/*================================================*
			Método de login usando formulário
		 *================================================*/
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},

			async authorize(credentials) {
				await prisma.$connect()
				try {
					let user = await prisma.user.findUnique({ where: { email: credentials?.email } })

					if (user) {
						let isPasswordCorrect = await bcrypt.compare(credentials?.password!, user.password!)
						if (isPasswordCorrect) {
							return user
						}
					}
				} catch (err) {
					throw new Error(String(err))
				}
			},
		}),
	],
	callbacks: {
		/*================================================*
			Registra o usuário no banco de dados caso faça login usando providers pela primeira vez
		 *================================================*/
		async signIn({ user, account }: any) {
			if (account?.provider == 'credentials') {
				return true
			}

			await prisma.$connect()

			try {
				let existingUser = await prisma.user.findUnique({ where: { email: user.email! } })
				if (existingUser) {
					return false
				}

				await prisma.user.create({ data: { email: user.email, provider: account?.provider } })
			} catch (err) {
				console.log('Error saving user', err)
			}
		},
		jwt({ token, trigger, session, account }: any) {
			if (account) token.provider = account?.provider

			/*================================================*
				Atualiza as informações do usuário na sessão quando faz um PUT no banco de dados
			 *================================================*/
			if (trigger === 'update' && session?.name) token.name = session.name
			return token
		},
		async session({ session, token }: any) {
			/*================================================*
				Retorna se o usuário fez login usando formulário ou providers
			 *================================================*/
			session.user.provider = token.provider
			return session
		},
	},
})

export { handler as GET, handler as POST }
