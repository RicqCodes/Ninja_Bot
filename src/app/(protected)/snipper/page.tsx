import Snipper from "@/components/page/snipper";
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
    .select(`slippage, default_chain_id, gas_price_to_use, swap_version`)
    .eq("user_id", session?.user?.id!)
    .single();

  return (
    <div className="flex flex-col p-6 h-full">
      <div className="flex w-full h-full">
        <Snipper botConfig={data} />
      </div>
    </div>
  );
};

export default page;
