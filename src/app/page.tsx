import AddChallengeForm from "@/components/addChallengeForm";
import { db } from "@/db/db";
import { redirect, useParams } from "next/navigation";

export default async function Home() {
  const challenge = await db?.query.challenge.findFirst({
    with: { props: true },
  });
  return (
    <>
      {challenge ? (
        redirect(`/challenge/${challenge.id}`)
      ) : (
        // <ChallengePage challenge={challenge[0]} />
        <main className=" min-h-screen  flex flex-col justify-center items-center ">
          <h1 className="text-3xl font-bold">Create your challenge !</h1>
          <section className="my-10">
            <AddChallengeForm />
          </section>
        </main>
      )}
    </>
  );
}
