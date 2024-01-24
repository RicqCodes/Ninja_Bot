"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "./ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/Input";

import * as z from "zod";
import { useProfileContext } from "@/hooks/useProfile";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  slippage: z.string().min(1, {
    message: "Slippage must be at least 5%.",
  }),
  blockchainNetwork: z.string().min(2, {
    message: "Blockchain Network must be at least 2 characters.",
  }),
  gasPriceToUse: z.number().lte(300000, {
    message: "Gas Price must be at least 1.",
  }),
  swapVersion: z.string().min(1, {
    message: "Swap Version must be greater than version 1.",
  }),
});

export function ProfileForm({ settingsData }: { settingsData: any }) {
  const { profile } = useProfileContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      username: profile.username || "",
      email: profile.email || "",
      slippage: settingsData?.slippage.toString(),
      blockchainNetwork: settingsData?.default_chain,
      gasPriceToUse: settingsData?.gas_price_to_use,
      swapVersion: settingsData?.swap_version.toString(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 text-accent_fff"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="e.g: Ricqcodes"
                  defaultValue={field.value}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="example@email.com"
                  {...field}
                  disabled={!!field.value}
                  defaultValue={field.value}
                />
              </FormControl>
              <FormDescription>This is your email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center gap-6">
          <FormField
            control={form.control}
            name="slippage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slippage</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Slippage" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full text-accent_fff bg-accent_bg">
                    <SelectItem value="5">5%</SelectItem>
                    <SelectItem value="6">6%</SelectItem>
                    <SelectItem value="7">7%</SelectItem>
                    <SelectItem value="8">8%</SelectItem>
                    <SelectItem value="9">9%</SelectItem>
                    <SelectItem value="10">10%</SelectItem>
                    <SelectItem value="11">11%</SelectItem>
                    <SelectItem value="12">12%</SelectItem>
                    <SelectItem value="13">13%</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gasPriceToUse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gas Price</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    type="text"
                    placeholder="Example: 300000"
                    {...field}
                    defaultValue={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between items-center gap-6 flex-wrap">
          <FormField
            control={form.control}
            name="blockchainNetwork"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Blockchain Network</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Network" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full text-accent_fff bg-accent_bg">
                    <SelectItem value="ethereum">Ethereum</SelectItem>
                    <SelectItem value="bsc">Binance Smart Chain</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="swapVersion"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Swap Version</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="e.g: v2" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="text-accent_fff bg-accent_bg">
                    <SelectItem value="2">v2</SelectItem>
                    <SelectItem value="3">v3</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button variant="accent" className="w-full p-6 text-base" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
