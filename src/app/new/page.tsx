import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function createTodo(data: FormData) {
  "use server";

  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title.length === 0) {
    return new Error("Invalid Title");
  }

  await prisma.todo.create({ data: { title, complete: false } });
  redirect("/");
}

export default function Page() {
  return (
    <>
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl">New</h1>
      </header>
      <form action={createTodo} className="flex flex-col gap-2">
        <input
          type="text"
          name="title"
          className="
            rounded
            border
            border-slate-300
            bg-transparent
            px-2
            py-1
            outline-none
            focus-within:border-slate-100
          "
        />
        <div className="flex justify-end gap-1">
          <Link
            href=".."
            className="
              rounded
              border
              border-slate-300
              px-2
              py-1
              text-slate-300
              outline-none
              focus-within:bg-slate-700
              hover:bg-slate-700
            "
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="
              rounded
              border
              border-slate-300
              px-2
              py-1
              text-slate-300
              outline-none
              focus-within:bg-slate-700
              hover:bg-slate-700
            "
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}
