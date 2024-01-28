"use client";

import React from "react";
import { ProfileForm } from "@/components/settingsForm";
import Button from "@/components/ui/Button";
import { supabase } from "@/lib/supabseClient";
import { useRouter } from "next/navigation";

const Settings = ({ data }: { data: any }) => {
  const router = useRouter();

  const logOut = async () => {
    supabase.auth.signOut({ scope: "local" });
    router.refresh();
  };
  return (
    <div className="w-full flex flex-col gap-6">
      <header className="w-full flex gap-6 items-center justify-between fixed top-0 left-0 backdrop-blur-lg bg-accent_bg px-6 pt-2 h-20 z-10">
        <h1 className="text-2xl text-white font-bold">Settings</h1>
      </header>
      <div className="w-full flex flex-col gap-6">
        <div className="w-full mt-20 p-6 flex flex-col gap-6 border-dotted border-4 border-accent_111 rounded-lg">
          <h1 className="text-xl font-extrabold text-accent_555">
            Update Profile
          </h1>
          <ProfileForm settingsData={data} />
        </div>
        <div className="w-full mb-20 p-6 flex flex-col gap-6 border-dotted border-4 border-accent_111 rounded-lg">
          <div className="flex flex-col gap-6">
            {/* <Button
              variant="outline"
              className="w-full p-8 text-base border-success"
            >
              Export Wallet
            </Button> */}
            <Button
              variant="outline"
              className="w-full p-8 text-base border-error"
              onClick={logOut}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
