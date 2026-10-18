// J.P.F Solutions - personaliza estos datos antes de publicar.
const CONFIG = {
  // Reemplaza con el número real de WhatsApp: código país + número, sin +, espacios ni guiones.
  whatsappNumber: "573138494570",
  businessName: "J.P.F Solutions"
};

document.getElementById("year").textContent = new Date().getFullYear();

// Menú móvil
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => mainNav.classList.toggle("open"));
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => mainNav.classList.remove("open")));

// Selección rápida de paquete/servicio desde tarjetas y tabla.
document.querySelectorAll("[data-package]").forEach(link => {
  link.addEventListener("click", () => {
    const option = link.dataset.package;
    const need = document.getElementById("need");
    const map = {
      "PC al día": "Paquete PC al día",
      "Full mantenimiento": "Paquete Full mantenimiento",
      "Escudo digital": "Paquete Escudo digital"
    };
    need.value = map[option] || "";
  });
});
document.querySelectorAll("[data-service]").forEach(button => {
  button.addEventListener("click", () => {
    document.getElementById("need").value = button.dataset.service === "Diagnóstico en taller / remoto" ? "Diagnóstico técnico" :
      button.dataset.service === "Mantenimiento preventivo de escritorio" || button.dataset.service === "Mantenimiento preventivo de portátil" ? "Mantenimiento preventivo" :
      button.dataset.service === "Eliminación de virus y malware" ? "Virus o malware" :
      button.dataset.service === "Instalación de software / controladores" ? "Instalación de software" :
      button.dataset.service === "Instalación de RAM o SSD" ? "Actualización de hardware" :
      button.dataset.service === "Soporte técnico a domicilio" ? "Soporte a domicilio" : "Mantenimiento correctivo";
    document.getElementById("contacto").scrollIntoView({behavior:"smooth"});
  });
});

// Formulario: no almacena información; prepara un mensaje en WhatsApp.
document.getElementById("quoteForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = String(form.get("name") || "").trim();
  const device = String(form.get("device") || "");
  const need = String(form.get("need") || "");
  const details = String(form.get("details") || "").trim();
  const message = `Hola, ${CONFIG.businessName}. Soy ${name}.\nEquipo: ${device}.\nServicio: ${need}.\nDescripción: ${details || "Aún no tengo más detalles"}.\nQuisiera conocer disponibilidad y cotización.`;
  if (CONFIG.whatsappNumber === "573000000000") {
    alert("Antes de publicar, abre script.js y cambia CONFIG.whatsappNumber por el WhatsApp real de J.P.F Solutions (57 + número, sin espacios). Por ahora se mostrará el mensaje para que puedas copiarlo.");
    window.prompt("Copia este mensaje y envíalo por WhatsApp:", message);
    return;
  }
  window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});

// Chatbot local: respuestas automáticas sencillas, sin IA ni servidor.
const chatLauncher = document.getElementById("chatLauncher");
const chatWidget = document.getElementById("chatWidget");
const chatClose = document.getElementById("chatClose");
const chatMessages = document.getElementById("chatMessages");
const chatQuick = document.getElementById("chatQuick");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");

function toggleChat(open) {
  chatWidget.classList.toggle("open", open);
  chatWidget.setAttribute("aria-hidden", String(!open));
  if (open) setTimeout(() => chatInput.focus(), 100);
}
chatLauncher.addEventListener("click", () => toggleChat(!chatWidget.classList.contains("open")));
chatClose.addEventListener("click", () => toggleChat(false));

function addMessage(text, type) {
  const node = document.createElement("div");
  node.className = type === "user" ? "user-message" : "bot-message";
  node.textContent = text;
  chatMessages.appendChild(node);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function botReply(raw) {
  const msg = raw.toLowerCase();
  if (msg.includes("precio") || msg.includes("cuánto") || msg.includes("cuanto") || msg.includes("vale") || msg.includes("costo")) {
    return "Tarifas de referencia:\n• Diagnóstico: desde $20.000\n• Preventivo escritorio: desde $80.000\n• Preventivo portátil: desde $100.000\n• Correctivo: desde $90.000\n• Virus/malware: $60.000\n• Soporte a domicilio: desde $40.000\nEl valor final depende del equipo, la zona y la falla. Puedes usar el formulario para pedir cotización.";
  }
  if (msg.includes("lento") || msg.includes("demora") || msg.includes("lenta") || msg.includes("calienta")) {
    return "Puede ser acumulación de polvo, poco espacio, programas de inicio o un problema de hardware. Recomiendo diagnóstico y mantenimiento preventivo. No instales programas de limpieza desconocidos ni borres archivos del sistema.";
  }
  if (msg.includes("virus") || msg.includes("malware") || msg.includes("publicidad")) {
    return "Desconecta el equipo de redes si sospechas actividad extraña, evita ingresar contraseñas y no pagues ventanas emergentes. El servicio de revisión y limpieza de amenazas parte de $60.000 COP; depende de la complejidad.";
  }
  if (msg.includes("mantenimiento") || msg.includes("limpieza") || msg.includes("preventivo")) {
    return "El preventivo parte de $80.000 para escritorio y $100.000 para portátil. El paquete Full mantenimiento está en promoción a $139.900. La apertura de portátiles depende del diseño y se confirma antes de empezar.";
  }
  if (msg.includes("domicilio") || msg.includes("casa") || msg.includes("visita")) {
    return "El soporte a domicilio parte de $40.000 COP por desplazamiento, según localidad y disponibilidad. La tarifa se confirma antes de agendar.";
  }
  if (msg.includes("garantía") || msg.includes("garantia")) {
    return "La garantía debe quedar por escrito y aplica según el trabajo realizado. El plazo y las exclusiones se informan en la orden de servicio antes de autorizar.";
  }
  if (msg.includes("datos") || msg.includes("archivo") || msg.includes("fotos")) {
    return "Tus archivos son importantes. No compartas contraseñas por chat. No se deben copiar, borrar ni revisar archivos personales sin autorización. Si se requiere formatear, solicita primero una copia de seguridad.";
  }
  if (msg.includes("hola") || msg.includes("buenas") || msg.includes("buenos")) {
    return "¡Hola! 💻 Puedo orientarte con precios, mantenimiento, virus o soporte a domicilio. Cuéntame qué está pasando con el equipo.";
  }
  return "Puedo orientarte sobre mantenimiento preventivo/correctivo, virus, actualizaciones de hardware, software y soporte a domicilio. Para una cotización precisa, describe el tipo de equipo y la falla, o usa el formulario de contacto.";
}
function sendChat(raw) {
  const text = raw.trim();
  if (!text) return;
  addMessage(text, "user");
  chatInput.value = "";
  chatQuick.style.display = "none";
  setTimeout(() => addMessage(botReply(text), "bot"), 250);
}
chatQuick.querySelectorAll("button").forEach(button => button.addEventListener("click", () => sendChat(button.dataset.chat)));
chatForm.addEventListener("submit", event => {
  event.preventDefault();
  sendChat(chatInput.value);
});
