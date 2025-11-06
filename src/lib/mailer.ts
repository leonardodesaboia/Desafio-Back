import nodemailer from "nodemailer";

export function createTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } =
    process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      "Configure SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS no .env"
    );
  }
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: String(SMTP_SECURE).toLowerCase() === "true", // true p/ 465
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}
