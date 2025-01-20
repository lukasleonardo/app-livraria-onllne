'use client'
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function Navigation(){
    const {data:session}=useSession()
    return(
        <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          My Bookstore
        </Link>
        <div>
          {session ? (
            <>
              <span className="text-white mr-4">Welcome, {session.user?.name}</span>
              <button
                onClick={() => signOut()}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
    )
}