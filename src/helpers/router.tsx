import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import { Account, Home, Contact, Leaderboard, Lobby, Onboarding, PlayerCreate, SignInPage, SignUpPage, Support } from "../routes";

// TODO add Metadata import and route later when implemented

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/account",
        element: <Account />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/leaderboard",
        element: <Leaderboard />
      },
      {
        path: "/lobby",
        element: <Lobby />
      },
      {
        path: "/onboarding",
        element: <Onboarding />
      },
      {
        path: "/playercreate",
        element: <PlayerCreate />
      },
      {
        path: "/sign-in/*",
        element: <SignInPage />
      },
      {
        path: "/sign-up/*",
        element: <SignUpPage />
      },
      {
        path: "/support",
        element: <Support />
      },
    ]
  },

]);