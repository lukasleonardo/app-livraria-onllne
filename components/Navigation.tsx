'use client'
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import CartDropdown from "./CartDropdown";

export function Navigation(){
    const {data:session}=useSession()
    return (
      <nav className="themed-bg shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-primary">
            My Bookstore
          </Link>
          <div className="flex items-center space-x-4">
            <CartDropdown/>
            <DarkModeToggle />
            {session ? (
              <>
                <span className="text-foreground">Welcome, {session.user?.name}</span>
                <button
                  onClick={() => signOut()}
                  className="themed-button px-4 py-2 rounded">
                
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="themed-button px-4 py-2 rounded">
              Login
            </Link>
            )}
          </div>
        </div>
      </nav>
    )
}