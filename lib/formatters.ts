const camperFormLabels: Record<string, string> = {
  alcove: "Alcove",
  integrated: "Integrated",
  panel_van: "Panel Van",
  semi_integrated: "Semi Integrated",
};

export function formatCamperForm(form: string): string {
  return camperFormLabels[form] ?? form.replaceAll("_", " ");
}
