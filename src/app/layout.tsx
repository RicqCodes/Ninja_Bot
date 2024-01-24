import type { Metadata, Viewport } from "next";
import { Inter, Space_Mono, Raleway } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import Header from "@/components/header";
import { WalletProvider } from "@/hooks/useWallet";
import { SesssionProvider } from "@/hooks/useSession";
import { UserProvider } from "@/hooks/useProfile";
import { TriggerProvider } from "@trigger.dev/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const space_mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-raleway",
  display: "swap",
});

const APP_NAME = "Ninja Bot";
const APP_DEFAULT_TITLE = "Ninja Bot";
const APP_TITLE_TEMPLATE = "%s - Ninja Bot";
const APP_DESCRIPTION =
  "A snipping Bot built for EVM chains with wallet system";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    startupImage: "/icons/192x192.png",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#161719",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // const user = session?.user.

  return (
    <html
      lang="en"
      className={`${inter.variable} ${space_mono.variable} ${raleway.variable}`}
    >
      <body
        suppressHydrationWarning={true}
        className={"max-w-[1440px] flex flex-col m-auto relative"}
      >
        <TriggerProvider
          publicApiKey={process.env.NEXT_PUBLIC_TRIGGER_PUBLIC_API_KEY ?? ""}
          apiUrl={process.env.NEXT_PUBLIC_TRIGGER_API_URL}
        >
          <SesssionProvider>
            <UserProvider>
              <WalletProvider>
                {session && <Header session={session} />}
                {children}
              </WalletProvider>
            </UserProvider>
          </SesssionProvider>
        </TriggerProvider>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  );
}
