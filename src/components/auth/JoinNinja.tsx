"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
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
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function AuthForm() {
  const router = useRouter();

  const supabase = createClientComponentClient<Database>({
    supabaseUrl: NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });

  useEffect(() => {
    const getSession = async () => {
      const session = await supabase.auth.getSession();

      if (session.data.session) {
        toast.success("Successfully signed in");
        router.push("/dashboard");
      }
    };

    getSession();
  }, [router, supabase.auth]);

  // Sign in with a third-party provider
  const logIn = async (provider: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
    });

    if (error) {
      toast.error("Error during authentication, try again!");
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
