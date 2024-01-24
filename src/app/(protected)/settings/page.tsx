import Settings from "@/components/page/settings";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";

const page = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error, status } = await supabase
    .from("settings")
    .select(
      `slippage, default_chain, default_chain_id, gas_price_to_use, swap_version`
    )
    .eq("user_id", session?.user?.id!)
    .single();

  if (error && status !== 406) {
    // throw error;
  }

  return (
    <div>
      <div className="flex flex-col p-6 h-screen">
        <div className="flex w-full h-full">
          <Settings data={data} />
        </div>
      </div>
    </div>
  );
};

export default page;
