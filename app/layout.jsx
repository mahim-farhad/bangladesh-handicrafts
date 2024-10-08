import { poppins, akiraExpanded, robotoCondensed, firaCode } from "@libs/fonts";

import clsx from "clsx";

// import { getServerSession } from "next-auth";

import "@styles/globals.css";

import { getCurrentUser } from "@api/users";

// import { authOptions } from '@api/auth/[...nextauth]/authOptions';

import {
  ThemeProvider,
  SessionProvider,
  TooltipProvider,
} from "@libs/providers";

import { CartProvider } from "@contexts/CartContext";
import { WishtlistProvider } from "@contexts/WishlistContext";
import { SidebarProvider } from "@contexts/SidebarContext";

import Toaster from "@components/ui/toaster";

import Navbar from "@components/navigations/navbar";
import Sidebar from "@components/navigations/sidebar";
import Footer from "@components/navigations/footer";

const APP_NAME = "PWA App";
const APP_DEFAULT_TITLE = "My Awesome PWA App";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Best PWA app in the world!";

export const metadata = {
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
    // startUpImage: [],
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

export const viewport = {
  themeColor: "#FFFFFF",
};

export default async function RootLayout({ children }) {
  // const session = await getServerSession(authOptions);

  const currentUserData = await getCurrentUser();

  const bodyClasses = clsx(
    poppins.variable,
    akiraExpanded.variable,
    robotoCondensed.variable,
    firaCode.variable,
    "antialiased",
    "font-sans text-base leading-normal font-normal",
    "select-none overflow-x-hidden",
    "text-foreground bg-background"
  );

  return (
    <html lang="en">
      <body className={bodyClasses}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
        >
          <SessionProvider>
            <CartProvider>
              <WishtlistProvider>
                <TooltipProvider>
                  <SidebarProvider>
                    <Navbar currentUserData={currentUserData} />

                    <Sidebar currentUserData={currentUserData} />

                    {children}

                    <Footer />
                  </SidebarProvider>
                </TooltipProvider>
              </WishtlistProvider>
            </CartProvider>
          </SessionProvider>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
