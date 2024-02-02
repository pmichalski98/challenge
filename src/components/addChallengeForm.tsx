"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { createChallenge } from "@/app/_actions";

export const formSchema = z.object({
  duration: z.number().min(1),
  properties: z.array(
    z.object({
      property: z.string(),
    }),
  ),
});

export type FormSchema = z.infer<typeof formSchema>;

function AddChallengeForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      duration: 30,
    },
  });
  const control = form.control;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "properties",
  });
  const [prop, setProp] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const addProperty = useCallback(() => {
    setProp("");
    append({ property: prop }, { shouldFocus: false });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [append, prop]);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addProperty();
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [setProp, prop]);

  async function onSubmit(data: FormSchema) {
    await createChallenge(data);
  }

  return (
    <>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="duration"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    How many days you want this challenge to last?
                  </FormLabel>
                  <FormControl className="w-fit">
                    <Input type="number" placeholder="30" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-6">
              <Label className="">Create resolutions:</Label>
              <div className="flex items-center gap-2 w-fit">
                <Input
                  type="text"
                  value={prop}
                  ref={inputRef}
                  placeholder="Stop smoking"
                  onChange={(event) => setProp(event.currentTarget.value)}
                />
                <button type="button" onClick={addProperty}>
                  <Plus />
                </button>
              </div>
            </div>
            <Button className="mt-6">Create challenge !</Button>
          </form>
        </Form>
      </div>
      <section className="space-y-4 my-10">
        <h2 className="text-xl font-medium">Resolutions for your challenge:</h2>
        <ul>
          {fields.map((field, index) => (
            <li
              key={field.id}
              className="flex  items-center gap-2 rtl:space-x-reverse"
            >
              <button onClick={() => remove(index)}>
                <Trash2 size={16} />
              </button>
              {field.property}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default AddChallengeForm;
