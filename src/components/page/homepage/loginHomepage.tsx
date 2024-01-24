import Image from "next/image";
import AuthForm from "../../auth/JoinNinja";
import HomeSVG from "@/images/main-logo-white-transparent.svg";

export default function Home() {
  return (
    <div className="w-full flex h-full justify-between lg:max-w-[64rem] item-center justify-center m-auto">
      <div className="w-full h-full">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col items-center">
            <Image
              src={HomeSVG}
              alt="Home entry svg image"
              className="lg:w-[36.4rem] lg:h-[36.4rem]"
            />
            <p className="font-mono mt-[-4rem] text-sm text-accent_fff">
              Ninja Bot is a configurable snipping bot for EVM chains! The bot
              is designed to help you make quick and efficient trades in the
              market. With its advanced snipping capabilities, you can stay
              ahead of the competition and maximize your profits.
            </p>
          </div>
          <div className="w-full">
            <AuthForm />
          </div>
        </div>
      </div>
    </div>
  );
}
