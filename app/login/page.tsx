'use client'
import {useEffect, useState} from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function Login(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const router = useRouter()
    const {data: session,status} = useSession()
    const searchParams = useSearchParams()
    const redirect = searchParams?.get("redirect")|| "/"

    useEffect(()=>{
      if(status==="authenticated"){
        router.push(redirect)
      }
    },[status,router,redirect])

    const handleSubmit = async(e: React.FormEvent)=>{
        e.preventDefault()
        const result = await signIn('credentials',{
            redirect:false,
            email,
            password
        })
        if(result?.ok){
            router.push(redirect)
        }else{
            alert('login failed!')
        }

    }

    // useEffect(() => {
    //   setToken(searchParams.get("token"));
    // }, [searchParams]);

    if(status==="loading"){
      return <p>Loading...</p>
    }

    if(status==="authenticated"){
      return null
    }

    return (
      <div className="flex justify-center items-center h-screen themed-bg">
        <form onSubmit={handleSubmit} className="bg-background shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-foreground text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="themed-input shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-foreground text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="themed-input shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="themed-button font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    )
}