import { eventTrigger } from "@trigger.dev/sdk";
import { client } from "@/trigger";
import { createClient } from "@supabase/supabase-js";
import { NinjaBot } from "@/lib/ninjaBot";
import { TokenOwnedOptions } from "@/types/database";
import { Supabase } from "@trigger.dev/supabase";
import { Database } from "@/types/supabase";

const supabase = new Supabase<Database>({
  id: "supabase",
  supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
});

client.defineJob({
  id: "bot-job",
  name: "Run when a user starts a bot transaction",
  version: "1.0.0",

  trigger: eventTrigger({
    name: "ninja.event",
    // schema
  }),
  // integrations: { slack },
  run: async (payload, io) => {
    let result: any;
    const response = await io.runTask(
      "bot-task",
      async () => {
        result = await new NinjaBot(
          payload.data.pk,
          payload.data.address,
          // payload.network,
          "GOERLI"
        ).snipe(payload.data.amount, payload.data.slippage);
      },
      { name: "Bot Task" }
    );

    await io.runTask("update db", async () => {
      // const user = (await supabase.auth.getUser()).data.user;

      const options: TokenOwnedOptions = {
        contract_address: result.token,
        token_name: result.name,
        amount_received: result.amountReceived,
        amount_bought: result.amountBought,
        chain: result.chain,
      };

      const { data, error } = await supabase.runTask(
        "update-tokens-owned",
        async (db) => {
          const user = await db.auth.getUser();
          return db
            .from("tokensOwned")
            .insert(options)
            .eq("user_id", user.data.user?.id);
        }
      );

      console.log(error, data);
    });

    // io.logger.log(result);
    return response;
  },
});
