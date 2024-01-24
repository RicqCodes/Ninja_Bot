"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

import {
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SUPABASE_URL,
  redirectUrl,
} from "@/lib/config";
import Button from "../ui/Button";
import { Provider } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>({
    supabaseUrl: NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });

  // Sign in with a third-party provider
  const logIn = async (provider: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: redirectUrl,
      },
    });

    if (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <Button
        variant="outline"
        className="py-6"
        onClick={() => logIn("google")}
      >
        <FcGoogle className="text-4xl pr-2" /> Sign in with Google
      </Button>
      <Button variant="accent" className="py-6" onClick={() => logIn("github")}>
        <BsGithub className="text-3xl pr-2" /> Sign in with Github
      </Button>
    </div>
  );
}
