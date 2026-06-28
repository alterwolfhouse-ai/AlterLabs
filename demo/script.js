if (window.lucide) {
  window.lucide.createIcons();
}

const typeSelect = document.querySelector("#enquiryType");
const note = document.querySelector("#formNote");
const submit = document.querySelector("#mockSubmit");
const socialButtons = Array.from(document.querySelectorAll(".social-buttons button"));

const typeMap = {
  "Build from scratch": "Build from scratch",
  "Discuss collaboration": "Collaboration project",
  "Buy / sell / rent": "Buy / sell / rent",
  "Renovate or finish": "Renovate / finish",
};

socialButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const next = typeMap[button.textContent.trim()];
    if (next && typeSelect) {
      typeSelect.value = next;
      document.querySelector("#lead")?.scrollIntoView({ behavior: "smooth", block: "start" });
      note.textContent = `${next} selected. This is the lead routing behavior we would connect to WhatsApp and CRM.`;
      note.classList.add("success");
    }
  });
});

submit?.addEventListener("click", () => {
  const selected = typeSelect?.value || "project";
  note.textContent = `Qualified ${selected.toLowerCase()} lead preview generated for CRM and WhatsApp routing.`;
  note.classList.add("success");
});
