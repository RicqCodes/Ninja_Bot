"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { client } from "@/trigger";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { FaInfoCircle } from "react-icons/fa";
import { RiLoader2Line } from "react-icons/ri";
import { GiCheckMark } from "react-icons/gi";
import { useEventRunDetails } from "@trigger.dev/react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  chains,
  chains_id,
  defaultChains,
  supportedWallet,
} from "@/lib/networks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetcher } from "@/lib/fetcher";
import { useWallet } from "@/hooks/useWallet";
import Button from "@/components/ui/Button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecentActivities from "@/components/recentActivities";
import { Status } from "@/components/status";
import { startBot } from "@/app/_actions";
import { toast } from "react-toastify";
import StatusIndicator from "@/components/StatusIndicator";
import { useProfileContext } from "@/hooks/useProfile";
import { AnimatePresence, motion } from "framer-motion";

const defaultChainsId = Object.values(chains).map((chain) =>
  chain.chain_id.toString()
);

const formSchema = z.object({
  slippage: z.number().gte(5, {
    message: "slippage cannot be less than 5%",
  }),
  amount: z.string(),
  blockchain: z.enum(defaultChainsId as [string, ...string[]]),
  gas_price: z.number().gte(300_000),
  address: z
    .string()
    .length(42, {
      message: "Provided contract addresss is not a valid address",
    })
    .startsWith("0x", {
      message: "Provided contract addresss is not a valid address",
    }),
});

const Snipper = ({ botConfig }: { botConfig: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [defaultTab, setDefaultTab] = useState("instance");
  const [balance, setBalance] = useState<string | null>(null);
  const [eventId, setEventId] = useState<string | undefined>(undefined);
  const { wallet, pk } = useWallet();
  const {
    profile: { id },
  } = useProfileContext();
  const runDetails = useEventRunDetails(eventId);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      slippage: botConfig?.slippage || 7,
      amount: "0",
      blockchain: botConfig?.default_chain_id.toString() || "5",
      gas_price: botConfig?.gas_price_to_use || 300_000,
      address: "",
    },
  });

  const watchBlockchain = form.watch("blockchain");

  useEffect(() => {
    const getBalance = async () => {
      setBalance(null);
      const balance = await new fetcher().getSingleBalance(
        wallet,
        // chains_id[Number(watchBlockchain)]
        "goerli"
      );

      console.log(balance, "current balance");
      setBalance(balance!);
    };
    getBalance();
  }, [wallet, watchBlockchain]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    toast.info(
      "Started Bot... wait while we confirm liquidity and send transaction"
    );
    values = { ...{ ...values, pk, id } };
    const event = await startBot(values);
    setEventId(event.id);
  };
  // console.log(runDetails);
  // console.log(runDetails.data?.status, "status");

  useEffect(() => {
    runDetails.data?.status === "STARTED" && setIsLoading(false);
    runDetails.data?.status === "SUCCESS" && form.reset();
    runDetails.data?.status === "SUCCESS" && setDefaultTab("past-instances");
    runDetails.data?.status === "SUCCESS" && setEventId(undefined);
  }, [form, runDetails.data?.status]);
  // console.log(runDetails);
  return (
    <div className="w-full flex flex-col gap-6">
      <header className="w-full flex gap-6 items-center justify-between fixed top-0 left-0 backdrop-blur-lg bg-accent_bg px-6 pt-2 h-20 z-10">
        <h1 className="text-2xl text-white font-bold">Snipper</h1>
      </header>
      <div className="w-full flex flex-col gap-28 mb-20">
        <div className="w-full flex flex-col mt-28 gap-8">
          <Alert>
            <FaInfoCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="font-sans">Heads up!</AlertTitle>
            <AlertDescription className="font-sans opacity-75">
              Go to settings to change your preferred config, most are not
              editable here.
            </AlertDescription>
          </Alert>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4 text-accent_fff flex flex-col gap-12"
            >
              <div className="w-full flex gap-4 flex-wrap">
                <FormField
                  control={form.control}
                  name="blockchain"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[8rem] rounded-full text-sm font-raleway">
                            <SelectValue placeholder="Network" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="p-2 text-accent_fff bg-accent_111">
                          {defaultChains.map((chain, id) => (
                            <SelectItem
                              key={id}
                              value={chain.chain_id.toString()}
                            >
                              {chain.blockchain_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gas_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="300_000"
                          {...field}
                          disabled={!!field.value}
                          className="w-[6rem] p-2 bg-transparent rounded-full text-sm font-raleway"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slippage"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Example: 5%"
                          {...(({ value, ...rest }) => rest)(field)}
                          value={`${field.value}%`}
                          disabled={!!field.value}
                          className="w-[6rem] p-2 bg-transparent rounded-full text-sm font-raleway"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full flex flex-col gap-6">
                <div className="w-full">
                  <div className="flex flex-col gap-6">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contract Address</FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="off"
                              className="w-full p-6 placeholder:text-sm placeholder:font-sans text-xs"
                              type="text"
                              placeholder="Example: 0x"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <div className="w-full flex justify-between items-center">
                            <FormLabel>Amount</FormLabel>
                            <div className="flex gap-2 font-base text-sm opacity-75">
                              {balance === null ? (
                                <Skeleton className="w-12 h-4 rounded-md bg-accent_555" />
                              ) : (
                                `Bal: ${
                                  balance === "undefined"
                                    ? "0.000"
                                    : Number(balance).toFixed(3)
                                } ${
                                  supportedWallet[Number(watchBlockchain)]
                                    ?.symbol
                                }`
                              )}
                            </div>
                          </div>
                          <FormControl>
                            <Input
                              autoComplete="off"
                              className="w-full p-6 placeholder:text-sm placeholder:font-sans text-xs"
                              type="number"
                              placeholder="Example: 1 ETH"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  variant="accent"
                  className="w-full p-8 text-base"
                  disabled={
                    balance === null || Number(balance!) === 0 || isLoading
                  }
                >
                  {isLoading ? (
                    <RiLoader2Line className="animate-spin text-3xl" />
                  ) : (
                    "Start Bot"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-accent_111">
            <TabsTrigger
              value="instance"
              className="data-[state=active]:bg-primary"
            >
              Cur Instance
            </TabsTrigger>
            <TabsTrigger
              value="past-instances"
              className="data-[state=active]:bg-primary"
            >
              Instances
            </TabsTrigger>
            <TabsTrigger
              value="activities"
              className="data-[state=active]:bg-primary"
            >
              Past Activities
            </TabsTrigger>
          </TabsList>
          <TabsContent value="instance">
            {!isLoading && (
              <div className="w-full flex flex-col gap-2 mt-6">
                <AnimatePresence>
                  {eventId && (
                    <motion.div
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                    >
                      <StatusIndicator
                        runDetails={runDetails}
                        text="Starting Up"
                        index={0}
                        startingStatus=""
                        endingStatus="RUNNING"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {runDetails.data?.tasks[0]?.status === "RUNNING" &&
                    !!eventId && (
                      <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                      >
                        <StatusIndicator
                          runDetails={runDetails}
                          text="Checking for liquidity and sending Transaction"
                          index={0}
                          startingStatus="RUNNING"
                          endingStatus="COMPLETED"
                        />
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>
            )}
            {!eventId && (
              <div className="w-full font-raleway text-center mt-20">
                😢 No Bot event running, start an event
              </div>
            )}
          </TabsContent>
          <TabsContent value="past-instances">
            <Status />
          </TabsContent>
          <TabsContent value="activities">
            <RecentActivities />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Snipper;
