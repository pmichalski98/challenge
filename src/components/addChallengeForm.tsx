"use client";

import React, { FormEvent, useCallback, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
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
  function handleSubmit(e: FormEvent) {}

  console.log(form.watch());
  return (
    <>
      <Form {...form}>
        <FormField
          name="duration"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {" "}
                How many days you want this challenge to last?
              </FormLabel>
              <FormControl className="w-fit">
                <Input type="number" placeholder="90" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ul>
          {fields.map((field) => (
            <li key={field.id}>{field.property}</li>
          ))}
        </ul>
      </Form>
      <div>
        <label className="text-xl">Create resolutions:</label>
        <div className="flex items-center gap-2 w-fit">
          <Input
            type="text"
            value={prop}
            placeholder="Stop smoking"
            onChange={(event) => setProp(event.currentTarget.value)}
          />
          <button onClick={addProperty}>
            <Plus />
          </button>
        </div>
      </div>
    </>
  );
}

export default AddChallengeForm;
