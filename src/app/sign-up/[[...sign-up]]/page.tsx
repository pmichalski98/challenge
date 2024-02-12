"use client"

import {SignUp} from "@clerk/nextjs"

function Page() {
   return (
      <main className="mt-44 flex items-center justify-center">
         <SignUp />
      </main>
   )
}

export default Page
