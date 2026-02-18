/** @format */

const encode = (data) =>
  Object.keys(data)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(data[key] ?? "")}`,
    )
    .join("&");

/**
 * Sends contact form messages via Netlify Forms.
 * Works on deployed Netlify site (no SMTP credentials required in frontend).
 */
export const sendEmail = async (name, userEmail, message, botField = "") => {
  try {
    const response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: encode({
        "form-name": "portfolio-contact",
        fullName: name,
        email: userEmail,
        message,
        "bot-field": botField,
      }),
    });

    if (!response.ok) throw new Error("Failed to submit contact form");
    return true;
  } catch {
    return false;
  }
};
