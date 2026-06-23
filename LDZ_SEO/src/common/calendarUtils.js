const DOMAIN = "https://www.australia.lithium-downstream-summit.com";

function formatDateToYYYYMMDD(dateStr) {
  if (!dateStr) return null;
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    return parsed.toISOString().split("T")[0].replace(/-/g, "");
  }
  return null;
}

function generateUID() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uid = "";
  for (let i = 0; i < 21; i++) {
    uid += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return uid;
}

export function generateIcsContent(eventDetails) {
  const name = eventDetails?.eventName || "Event";
  const location = (eventDetails?.eventLocation || eventDetails?.eventShortLocation || "")
    .replace(/,/g, "\\,");

  const dtstart =
    formatDateToYYYYMMDD(eventDetails?.eventDate) ||
    new Date().toISOString().split("T")[0].replace(/-/g, "");

  const dtstamp =
    new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "PRODID:adamgibbons/ics",
    "METHOD:PUBLISH",
    "X-PUBLISHED-TTL:PT1H",
    "BEGIN:VEVENT",
    `UID:${generateUID()}`,
    `SUMMARY:${name}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;VALUE=DATE:${dtstart}`,
    `DESCRIPTION:Please follow ${DOMAIN} for more information.`,
    location ? `LOCATION:${location}` : null,
    "DURATION:PT24H1440M",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
}

export function downloadIcsFile(eventDetails) {
  const content = generateIcsContent(eventDetails);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = (eventDetails?.eventName || "event") + ".ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
