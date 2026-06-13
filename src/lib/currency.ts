// IMMO 224 — Conversion USD → GNF (Franc Guinéen)
// Taux indicatif fixe (mis à jour manuellement)
export const USD_TO_GNF = 8600;

/**
 * Formate un montant USD en GNF (Franc Guinéen) selon le taux fixe.
 * Exemple : formatGNF(120) → "1 032 000 GNF"
 */
export function formatGNF(usdAmount: number | null | undefined): string {
  if (usdAmount == null || isNaN(usdAmount)) return "—";
  const gnf = Math.round(usdAmount * USD_TO_GNF);
  // Arrondi au millier le plus proche pour des prix plus lisibles
  const rounded = Math.round(gnf / 1000) * 1000;
  return `${rounded.toLocaleString("fr-FR").replace(/,/g, " ")} GNF`;
}

/**
 * Formate un montant déjà en GNF.
 */
export function formatGNFDirect(gnfAmount: number): string {
  return `${Math.round(gnfAmount).toLocaleString("fr-FR").replace(/,/g, " ")} GNF`;
}
