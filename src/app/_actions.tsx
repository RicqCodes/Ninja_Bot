"use server";

import { client } from "@/trigger";

export const startBot = async (data: any) => {
  const event = await client.sendEvent({
    name: "ninja.event",
    payload: {
      data,
    },
  });
  return event;
};
