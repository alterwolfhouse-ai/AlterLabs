/* AlterLabs — the only configurable values on the site.
   No secrets here: the form endpoint is a public Apps Script web-app URL. */
window.ALTERLABS_CONFIG = {
  /* Google Apps Script /exec URL that appends a row to the "AlterLabs Leads"
     sheet. Empty = submissions queue in localStorage, retry on every page load,
     and the WhatsApp fallback carries the lead in the meantime. */
  FORM_ENDPOINT: "",

  /* WhatsApp click-to-chat number, digits only, country code first. */
  WHATSAPP: "916206108923"
};
