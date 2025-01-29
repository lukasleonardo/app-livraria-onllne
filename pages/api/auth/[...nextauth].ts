import NextAuth,{ NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
/// <reference path="../types/next-auth.d.ts" />


const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('password123', 10),
    oauth: true
  },
]

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        
        const user = users.find(user => user.email === credentials.email)
        
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          try{
            await fetch(`${process.env.NEXTAUTH_URL}/api/email/login-confirmation`, {
              method: 'POST',
              body: JSON.stringify({email: user.email})
            })
          }catch(error){
            console.error("Error sending login confirmation email:", error)
          }




          return { id: user.id.toString(), 
            name: user.name, 
            email: user.email, 
            oauth: user.oauth }
        }
        
        return null
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  }, cookies:{
    sessionToken: {
      name: 'sessionToken',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  }
}

export default NextAuth(authOptions)

