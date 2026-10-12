import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { AdminStudio } from "../site/AdminStudio";
import "../site/admin.css";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Content Studio | Astrek Innovations" },
      {
        name: "description",
        content:
          "Astrek content studio: edit hero and about copy, manage journal posts, testimonials and incoming enquiries.",
      },
      { property: "og:title", content: "Content Studio | Astrek Innovations" },
      {
        property: "og:description",
        content: "Manage Astrek site content, journal posts, testimonials and enquiries.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  useEffect(() => {
    document.body.classList.add("astrek-admin-body");
    return () => {
      document.body.classList.remove("astrek-admin-body");
    };
  }, []);

  return (
    <div id="astrek-admin">
      <AdminStudio />
    </div>
  );
}
