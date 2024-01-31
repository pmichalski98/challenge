"use client";

import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DotIcon, Plus } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  duration: z.number().min(1),
  properties: z.array(
    z.object({
      property: z.string(),
    }),
  ),
});

type FormSchema = z.infer<typeof formSchema>;

function AddChallengeForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
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

  function handleSubmit(e: FormEvent) {}

  return (
    <>
      <div>
        <Form {...form}>
          <FormField
            name="duration"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  How many days you want this challenge to last?
                </FormLabel>
                <FormControl className="w-fit">
                  <Input type="number" placeholder="90" {...field} />
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
              <button onClick={addProperty}>
                <Plus />
              </button>
            </div>
          </div>
          <Button className="mt-6">Create challenge !</Button>
        </Form>
      </div>
      <section className="space-y-4 my-10">
        <h2 className="text-xl font-medium">Resolutions for your challenge:</h2>
        <ul>
          {fields.map((field) => (
            <li
              key={field.id}
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <DotIcon />
              {field.property}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default AddChallengeForm;
