import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode, useEffect } from "react";

import { initCookieConsent } from "../site/cookie-consent";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-6"
      style={{ background: "#070809", color: "#f3f5f4" }}
    >
      <div className="max-w-md text-center">
        <p className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color: "#00c4b4" }}>
          Astrek Innovations
        </p>
        <h1 className="mt-4 text-6xl font-semibold tracking-tight">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.58)" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded px-5 py-3 text-sm font-semibold"
            style={{ background: "#00c4b4", color: "#04110f" }}
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div
      className="flex min-h-screen items-center justify-center px-6"
      style={{ background: "#070809", color: "#f3f5f4" }}
    >
      <div className="max-w-md text-center">
        <p className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color: "#00c4b4" }}>
          Astrek Innovations
        </p>
        <h1 className="mt-4 text-xl font-semibold tracking-tight">This page didn't load</h1>
        <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.58)" }}>
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded px-5 py-3 text-sm font-semibold"
            style={{ background: "#00c4b4", color: "#04110f" }}
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded px-5 py-3 text-sm font-medium"
            style={{ border: "1px solid rgba(255,255,255,0.14)", color: "#f3f5f4" }}
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Astrek Innovations | Wearable Robotic Exoskeletons" },
      {
        name: "description",
        content:
          "Astrek Innovations builds wearable robotic exoskeletons that restore lower-limb mobility: robotics, machine learning and motion capture, engineered in Kerala, India.",
      },
      { name: "author", content: "Astrek Innovations" },
      { property: "og:title", content: "Astrek Innovations | Take Your First Steps, Again" },
      {
        property: "og:description",
        content:
          "Wearable robotic exoskeletons for clinically structured gait training and lower-limb rehabilitation.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.astrekinnovations.com/images/hero-exo-product.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://www.astrekinnovations.com/images/hero-exo-product.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Noto+Sans+Arabic:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => initCookieConsent(), []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
