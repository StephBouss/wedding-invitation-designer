/**
 * Google Apps Script Web App — reçoit les RSVP du site et les ajoute
 * à la feuille "RSVP" du classeur.
 *
 * Installation (repartir d'un Google Sheet TOUT NEUF) :
 * 1. Créer un nouveau Google Sheet, renommer l'onglet du bas en "RSVP".
 * 2. Dans ce Sheet, menu Extensions > Apps Script (important : depuis CE Sheet,
 *    pas depuis script.google.com directement — sinon le script n'est pas
 *    rattaché et SpreadsheetApp.getActiveSpreadsheet() ne trouvera rien).
 * 3. Coller ce fichier dans Code.gs (remplacer tout le contenu par défaut), Ctrl+S.
 * 4. Menu Projet (icône engrenage) > Propriétés du script > Ajouter une propriété
 *    RSVP_SECRET avec une valeur secrète de ton choix.
 * 5. Déployer > Nouveau déploiement > type "Application Web".
 *    - Exécuter en tant que : Moi
 *    - Qui a accès : Tout le monde
 *    - Vérifier que le champ Version est bien sur "Nouvelle version"
 * 6. Copier l'URL /exec fournie dans GOOGLE_SHEETS_WEBAPP_URL (.env du site).
 * 7. Mettre la même valeur que RSVP_SECRET dans GOOGLE_SHEETS_WEBAPP_SECRET (.env du site).
 */

const SHEET_NAME = "Reservation";

function doPost(e) {
  const props = PropertiesService.getScriptProperties();
  const expectedSecret = props.getProperty("RSVP_SECRET");

  let payload;
  try {
    payload = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonResponse({ ok: false, error: "Corps de requête invalide." });
  }

  if (!expectedSecret || payload.secret !== expectedSecret) {
    return jsonResponse({ ok: false, error: "Non autorisé." });
  }

  const nom = String(payload.nom || "").trim();
  const whatsapp = String(payload.whatsapp || "").trim();
  if (nom.length < 2 || whatsapp.length < 6) {
    return jsonResponse({ ok: false, error: "Champs requis manquants." });
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) {
    return jsonResponse({ ok: false, error: `Feuille "${SHEET_NAME}" introuvable.` });
  }

  sheet.appendRow([
    new Date().toISOString(),
    nom,
    whatsapp,
    String(payload.arriveeGabon || ""),
    String(payload.arriveePortGentil || ""),
  ]);

  return jsonResponse({ ok: true });
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
