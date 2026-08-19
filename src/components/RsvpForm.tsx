import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { submitRsvp } from "@/lib/rsvp.functions";

type Fields = {
  nom: string;
  whatsapp: string;
  arriveeGabon: string;
  arriveePortGentil: string;
};

const empty: Fields = { nom: "", whatsapp: "", arriveeGabon: "", arriveePortGentil: "" };

export function RsvpForm() {
  const send = useServerFn(submitRsvp);
  const [values, setValues] = useState<Fields>(empty);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (values.nom.trim().length < 2) {
      toast.error("Merci d'indiquer vos noms et prénoms.");
      return;
    }
    if (values.whatsapp.trim().length < 6) {
      toast.error("Merci d'indiquer un numéro WhatsApp valide.");
      return;
    }
    setLoading(true);
    try {
      await send({ data: values });
      setDone(true);
      setValues(empty);
      toast.success("Merci ! Votre présence est enregistrée.");
    } catch (error) {
      console.error(error);
      toast.error("Envoi impossible pour le moment. Merci de réessayer.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-sm border border-gold-deep/40 bg-background px-4 py-3 font-serif text-base text-foreground outline-none transition-colors focus:border-primary";

  if (done) {
    return (
      <div className="mt-8 rounded-sm border border-gold-deep/50 bg-card px-6 py-10 text-center">
        <p className="font-script text-3xl text-primary">Merci !</p>
        <p className="mt-3 font-serif text-lg text-muted-foreground">
          Votre confirmation a bien été enregistrée. Au plaisir de vous accueillir.
        </p>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="mt-6 font-serif text-sm tracking-[0.15em] uppercase text-gold-deep hover:underline"
        >
          Envoyer une autre réponse
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid grid-cols-1 gap-5 text-left sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor="rsvp-nom" className="font-serif text-sm tracking-wide text-gold-deep">
          Noms et prénoms
        </label>
        <input
          id="rsvp-nom"
          name="nom"
          required
          maxLength={120}
          value={values.nom}
          onChange={set("nom")}
          className={inputClass}
          placeholder="Votre nom complet"
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="rsvp-whatsapp" className="font-serif text-sm tracking-wide text-gold-deep">
          Numéro WhatsApp de préférence
        </label>
        <input
          id="rsvp-whatsapp"
          name="whatsapp"
          type="tel"
          required
          maxLength={30}
          value={values.whatsapp}
          onChange={set("whatsapp")}
          className={inputClass}
          placeholder="+241 00 00 00 00"
        />
      </div>

      <div>
        <label htmlFor="rsvp-gabon" className="font-serif text-sm tracking-wide text-gold-deep">
          Arrivée au Gabon
        </label>
        <input
          id="rsvp-gabon"
          name="arriveeGabon"
          type="date"
          value={values.arriveeGabon}
          onChange={set("arriveeGabon")}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="rsvp-pg" className="font-serif text-sm tracking-wide text-gold-deep">
          Arrivée sur Port-Gentil
        </label>
        <input
          id="rsvp-pg"
          name="arriveePortGentil"
          type="date"
          value={values.arriveePortGentil}
          onChange={set("arriveePortGentil")}
          className={inputClass}
        />
      </div>

      <div className="sm:col-span-2 text-center">
        <button
          type="submit"
          disabled={loading}
          className="mt-2 inline-flex items-center justify-center rounded-sm bg-primary px-8 py-3 font-serif text-base tracking-[0.15em] uppercase text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 disabled:opacity-60"
        >
          {loading ? "Envoi en cours..." : "Confirmer ma présence"}
        </button>
      </div>
    </form>
  );
}
