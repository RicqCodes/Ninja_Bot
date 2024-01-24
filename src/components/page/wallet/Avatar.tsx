"use client";
import { useProfileContext } from "@/hooks/useProfile";
import Image from "next/image";
import React from "react";

const Avatar = () => {
  const { profile } = useProfileContext();
  return profile.avatar_url ? (
    <div className="rounded-full w-[2.8rem] h-[2.8rem]">
      <Image
        src={profile.avatar_url}
        alt="user photo"
        height="280"
        width="280"
        className="rounded-full w-[2.8rem] h-[2.8rem]"
      />
    </div>
  ) : (
    <div className="rounded-full bg-accent_111 w-[2.8rem] h-[2.8rem]" />
  );
};

export default Avatar;
