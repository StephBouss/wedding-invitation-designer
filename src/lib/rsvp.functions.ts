import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SPREADSHEET_ID = "141semwVaiZfj0-frUQY64RF0cJE7H3v45AbME6mhEIs";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";

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
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const sheetsKey = process.env["GOOGLE_SHEETS_API_KEY"];
    if (!lovableKey || !sheetsKey) {
      throw new Error("Connexion Google Sheets indisponible.");
    }

    const url = `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}/values/RSVP!A:E:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": sheetsKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [
          [
            new Date().toISOString(),
            data.nom,
            data.whatsapp,
            data.arriveeGabon,
            data.arriveePortGentil,
          ],
        ],
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Google Sheets append failed [${response.status}]: ${errorBody}`);
      throw new Error(`Enregistrement impossible [${response.status}]: ${errorBody}`);
    }

    return { ok: true as const };
  });
