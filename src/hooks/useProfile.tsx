"use client";
import { supabase } from "@/lib/supabseClient";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSession } from "./useSession";
import { toast } from "react-toastify";
import { Database } from "@/types/supabase";
import { getUserProfile } from "@/lib/database_actions/profile";
import { ProfileOptions } from "@/types/database";

// Create a context for the profile details
const ProfileContext = createContext<{
  profile: {
    id: string;
    full_name: any;
    username: any;
    email: any;
    wallet_address: any;
    avatar_url: any;
    is_onboarded: any;
  };
}>({
  profile: {
    id: "",
    avatar_url: "",
    full_name: "",
    username: "",
    email: "",
    wallet_address: "",
    is_onboarded: undefined,
  },
});

// Custom hook to access the profile details from context
export const useProfileContext = () => useContext(ProfileContext);

// ProfileProvider component to provide the profile details through context
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [profile, setProfile] = useState<{
    id: any;
    full_name: any;
    username: any;
    email: any;
    wallet_address: any;
    avatar_url: any;
    is_onboarded: any;
  }>();
  const { session } = useSession();

  const getProfile = useCallback(async () => {
    try {
      const options: ProfileOptions = {
        selectedColumns: [
          "id",
          "full_name",
          "username",
          "email",
          "wallet_address",
          "avatar_url",
          "is_onboarded",
        ],
      };
      const { data, error, status } = await getUserProfile(
        session?.user.id!,
        options
      );

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setProfile(data as any);
      }
    } catch (error) {
      // toast.error("Error loading user data!");
    }
  }, [session?.user]);

  useEffect(() => {
    session?.user?.id && getProfile();
  }, [getProfile, session?.user?.id]);

  return (
    <ProfileContext.Provider
      value={{
        profile: profile || {
          id: "",
          full_name: "",
          username: "",
          email: "",
          wallet_address: "",
          avatar_url: "",
          is_onboarded: undefined,
        },
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
