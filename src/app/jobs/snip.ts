import { eventTrigger } from "@trigger.dev/sdk";
import { client } from "@/trigger";
import { createClient } from "@supabase/supabase-js";
import { NinjaBot } from "@/lib/ninjaBot";
import { TokenOwnedOptions } from "@/types/database";
import { Supabase, SupabaseManagement } from "@trigger.dev/supabase";
import { Database } from "@/types/supabase";
import { Chain } from "@/lib/interfaces/chainTypes";

const supabase = new Supabase<Database>({
  id: "supabase",
  supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
});

// Use OAuth to authenticate with Supabase Management API
const supabaseManagement = new SupabaseManagement({
  id: "supabase-management",
});

client.defineJob({
  id: "bot-job",
  name: "Run when a user starts a bot transaction",
  version: "1.0.0",

  trigger: eventTrigger({
    name: "ninja.event",
    // schema
  }),
  integrations: {
    supabase,
  },
  run: async (payload, io) => {
    let result:
      | {
          token: string;
          amountBought: string;
          amountReceived: string;
          decimal: any;
          name: any;
          chain: Chain;
          version: string;
        }
      | undefined;
    let user_id = payload.id;
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

    await io.supabase.runTask("update db", async (db) => {
      if (result !== undefined) {
        const options: TokenOwnedOptions = {
          user_id: user_id,
          contract_address: result.token,
          token_name: result.name,
          amount_received: result.amountReceived,
          amount_bought: result.amountBought!,
          chain: +result.chain,
        };
        const { data, error } = await db.from("tokens_owned").insert(options);
        console.log(data, "data after inserting");

        if (error) throw error;
        return data;
      } else {
        throw Error("Error buying token, try again");
      }
    });
  },
});
