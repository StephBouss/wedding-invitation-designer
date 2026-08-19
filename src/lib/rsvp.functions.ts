import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const rsvpSchema = z.object({
  nom: z.string().trim().min(2, "Nom trop court").max(120),
  whatsapp: z
    .string()
    .trim()
    .min(6, "Numéro invalide")
    .max(30)
    .regex(/^[0-9+\s().-]+$/, "Numéro invalide"),
  arriveeGabon: z.string().trim().max(20).optional().default(""),
  arriveePortGentil: z.string().trim().max(20).optional().default(""),
});

export const submitRsvp = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => rsvpSchema.parse(data))
  .handler(async ({ data }) => {
    const webAppUrl = process.env["GOOGLE_SHEETS_WEBAPP_URL"];
    const secret = process.env["GOOGLE_SHEETS_WEBAPP_SECRET"];
    if (!webAppUrl || !secret) {
      throw new Error("Connexion Google Sheets indisponible.");
    }

    const response = await fetch(webAppUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, ...data }),
      redirect: "follow",
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Google Sheets webapp call failed [${response.status}]: ${errorBody}`);
      throw new Error("Enregistrement impossible pour le moment.");
    }

    const result = (await response.json()) as { ok: boolean; error?: string };
    if (!result.ok) {
      console.error(`Google Sheets webapp rejected: ${result.error}`);
      throw new Error("Enregistrement impossible pour le moment.");
    }

    return { ok: true as const };
  });
