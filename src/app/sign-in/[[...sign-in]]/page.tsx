"use client"

import {SignIn} from "@clerk/nextjs"

function Page() {
   return (
      <main className="mt-44 flex items-center justify-center">
         <SignIn />
      </main>
   )
}

export default Page
