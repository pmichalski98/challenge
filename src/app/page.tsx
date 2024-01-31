import AddChallengeForm from "@/components/addChallengeForm";

export default function Home() {
  return (
    <main className=" min-h-screen    p-24">
      <h1 className="text-3xl font-bold">Create your challenge !</h1>
      <section className="my-10">
        <AddChallengeForm />
      </section>
    </main>
  );
}
