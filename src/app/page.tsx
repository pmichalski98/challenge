import AddChallengeForm from "@/components/addChallengeForm";

export default function Home() {
  return (
    <main className=" min-h-screen  flex flex-col justify-center items-center ">
      <h1 className="text-3xl font-bold">Create your challenge !</h1>
      <section className="my-10">
        <AddChallengeForm />
      </section>
    </main>
  );
}
