import React, { useCallback, useState } from "react";
import Button from "./ui/Button";

import { shortAddress } from "@/lib/utils";
import { useWallet } from "@/hooks/useWallet";
import { defaultChains, supportedWallet } from "@/lib/networks";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/Input";

const formSchema = z.object({
  token: z.string().min(1, {
    message: "token must be at least 2 characters.",
  }),
  amount: z.number().gt(0, {
    message: "amount must be greater than 0",
  }),
  address: z
    .string()
    .length(42, {
      message: "Provided addresss is not a valid address",
    })
    .startsWith("0x", {
      message: "Provided addresss is not a valid address",
    }),
});

const Withdrawal: React.FC = () => {
  const { wallet } = useWallet();
  const [selectedChain, setSelectedChain] = useState<number | null>(1);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      token: "1",
      amount: 1,
      address: "",
    },
  });

  const handleChainSelected = (chainId: number) => {
    setSelectedChain(chainId);
    // Perform additional actions if needed
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      <div className="w-full p-6 flex justify-between pt-[2.8rem]">
        <h2 className="text-2xl font-bold w-full text-center">Withdrawal</h2>
      </div>
      <div className="flex gap-4 p-6 flex-col justify-center">
        <div className="flex flex-col w-full items-center gap-12">
          <div className="w-full flex gap-4 items-center justify-center flex-wrap">
            {defaultChains.map((chain) => (
              <div
                key={chain.chain_id}
                className={`w-[60px] h-[60px] rounded-full flex items-center justify-center bg-accent_444 ${
                  selectedChain === chain.chain_id
                    ? "border-2 border-primary"
                    : ""
                }`}
                onClick={() => handleChainSelected(chain.chain_id)}
              >
                <Image
                  src={chain.logo}
                  alt={`supported blockchain logo - ${chain.blockchain_name}`}
                  height={40}
                  width={0}
                  className="w-[40px] h-[40px]"
                />
              </div>
            ))}
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4 text-accent_fff"
            >
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-raleway text-base">
                      Token
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          onClick={(e) => e.stopPropagation}
                          className="w-full p-8 bg-accent_111"
                        >
                          <SelectValue
                            onClick={(e) => e.stopPropagation}
                            placeholder="token"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        onClick={(e) => e.stopPropagation}
                        className="text-accent_fff"
                      >
                        <SelectItem value="1">ETH</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        className="p-8 bg-accent_111"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Example: 0x"
                          {...field}
                          className="p-8 bg-accent_111"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                variant="accent"
                className="w-full p-8 text-base"
                type="button"
              >
                Send
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Withdrawal;
