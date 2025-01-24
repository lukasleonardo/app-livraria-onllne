"use client"

import { useState } from "react"

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try{
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })
            if (response.ok) {
                setMessage('Password reset email sent successfully')
            }else{
                setMessage('Error sending password reset email')
            }
        }catch(error){
            console.log('Error:'+error)
            setMessage('Error processing your request, please try again')
        }
    }

    return(
        <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Reset Password
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
    )
}