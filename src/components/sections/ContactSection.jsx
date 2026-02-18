import React, { useEffect, useMemo, useRef, useState } from "react";
import SectionHeading from "../ui/SectionHeading";
import { usePortfolioData } from "../../hooks/usePortfolioData";
import { sendEmail } from "../sendEmail";

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function ContactSection() {
  const { data } = usePortfolioData();
  const contact = data.contact;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [honeypot, setHoneypot] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [submitToast, setSubmitToast] = useState(null);
  const toastTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const showToast = (type, message) => {
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }

    setSubmitToast({ type, message });
    toastTimeoutRef.current = window.setTimeout(() => {
      setSubmitToast(null);
      toastTimeoutRef.current = null;
    }, 3500);
  };

  const socialIcons = useMemo(
    () => ({
      GitHub: (
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      ),
      LinkedIn: (
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      ),
      X: (
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      ),
      YouTube: (
        <path d="M23.498 6.186a2.958 2.958 0 00-2.08-2.09C19.588 3.5 12 3.5 12 3.5s-7.588 0-9.418.596a2.958 2.958 0 00-2.08 2.09C0 8.03 0 12 0 12s0 3.97.502 5.814a2.958 2.958 0 002.08 2.09C4.412 20.5 12 20.5 12 20.5s7.588 0 9.418-.596a2.958 2.958 0 002.08-2.09C24 15.97 24 12 24 12s0-3.97-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      ),
      WhatsApp: (
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      ),
    }),
    [],
  );

  const validate = () => {
    const next = {};

    if (!formData.fullName.trim()) next.fullName = "Full name is required";
    else if (formData.fullName.trim().length < 2)
      next.fullName = "Name must be at least 2 characters";

    if (!formData.email.trim()) next.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      next.email = "Please enter a valid email address";

    if (!formData.message.trim()) next.message = "Message is required";
    else if (formData.message.trim().length < 10)
      next.message = "Message must be at least 10 characters";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
    if (submitToast) setSubmitToast(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (honeypot) return;

    const ok = validate();
    if (!ok) return;

    setIsSending(true);
    try {
      const sent = await sendEmail(
        formData.fullName,
        formData.email,
        formData.message,
        honeypot,
      );

      if (sent) {
        setFormData({ fullName: "", email: "", message: "" });
        setErrors({});
        showToast(
          "success",
          "Message sent successfully! I’ll get back to you shortly.",
        );
      } else {
        showToast(
          "error",
          "Couldn’t send the message right now. Please try again in a moment.",
        );
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-white/20 px-3 py-14 backdrop-blur-sm dark:bg-gray-900/20 sm:px-4 sm:py-16 md:py-18 lg:px-8 lg:py-20"
      aria-label="Contact section"
    >
      <div className="container relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          title="Let's Work Together"
          subtitle="Have a project in mind? Let's create something amazing together"
          className="mb-8 sm:mb-10"
        />

        <div className="grid gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="order-2 lg:order-1">
            <div className="glass-panel flex h-full flex-col p-4 sm:p-6">
              <div className="flex-1">
                <div className="mb-8">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md dark:bg-gray-800">
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-primary-500" />
                    </span>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 sm:text-sm">
                      Available for Work
                    </span>
                  </div>

                  <h3 className="mb-3 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-2xl font-bold text-transparent dark:from-primary-400 dark:to-secondary-400 sm:text-3xl">
                    Let&apos;s Connect
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 sm:text-base">
                    Ready to bring your ideas to life. Let&apos;s discuss how we
                    can work together.
                  </p>
                </div>

                <div className="space-y-4">
                  <a
                    href={`mailto:${contact.email}`}
                    className="group relative block overflow-hidden rounded-xl bg-white p-2 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-700/50 sm:p-4"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-0 transition-opacity group-hover:opacity-10" />
                    <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg sm:h-14 sm:w-14">
                        <svg
                          className="h-6 w-6 sm:h-7 sm:w-7"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-sm">
                          Email Me
                        </h4>
                        <p className="break-all text-sm font-medium text-gray-900 dark:text-white sm:truncate sm:text-base">
                          {contact.email}
                        </p>
                      </div>
                    </div>
                  </a>

                  <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        contact.location,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block overflow-hidden rounded-xl bg-white p-2 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-700/50 sm:p-4"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-500 to-pink-500 opacity-0 transition-opacity group-hover:opacity-10" />
                      <div className="relative">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-secondary-500 to-pink-500 text-white">
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 0 1 6 0z"
                            />
                          </svg>
                        </div>
                        <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-sm">
                          Location
                        </h4>
                        <p className="text-xs text-gray-700 dark:text-gray-300 sm:text-sm">
                          {contact.location}
                        </p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Remote work available
                        </p>
                      </div>
                    </a>

                    <div className="rounded-xl bg-white p-2 shadow-md dark:bg-gray-700/50 sm:p-4">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent-500 to-teal-500 text-white">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-sm">
                        Response
                      </h4>
                      <p className="text-xs text-gray-700 dark:text-gray-300 sm:text-sm">
                        {contact.responseTime}
                      </p>
                    </div>

                    <a
                      className="group relative block overflow-hidden rounded-xl bg-white p-2 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-700/50 sm:p-4"
                      href={`tel:${contact.phone}`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-600 opacity-0 transition-opacity group-hover:opacity-10" />
                      <div className="relative">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-secondary-600 text-white">
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 10h18M7 15h1m4 0h1m-6 4h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"
                            />
                          </svg>
                        </div>
                        <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-sm">
                          Phone
                        </h4>
                        <span className="text-xs font-medium text-gray-900 dark:text-white sm:text-sm">
                          {contact.phone}
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700 sm:mt-8 sm:pt-6">
                <h4 className="mb-3 text-xs font-semibold text-gray-700 dark:text-gray-300 sm:mb-4 sm:text-sm">
                  Follow me on social media
                </h4>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {contact.socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-700 shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-gray-900 hover:text-white hover:shadow-lg dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 sm:h-11 sm:w-11"
                      aria-label={social.name}
                    >
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {socialIcons[social.name] || null}
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="glass-panel p-4 sm:p-6 lg:p-8">
              <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                Send Message
              </h3>

              <form
                name="portfolio-contact"
                method="POST"
                action="/"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <input
                  type="hidden"
                  name="form-name"
                  value="portfolio-contact"
                />
                <label className="sr-only" htmlFor="bot-field">
                  Website
                </label>
                <input
                  id="bot-field"
                  name="bot-field"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />
                <div>
                  <label
                    className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="fullName"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    placeholder="Your name"
                  />
                  {errors.fullName ? (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.fullName}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label
                    className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    placeholder="you@example.com"
                  />
                  {errors.email ? (
                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                  ) : null}
                </div>

                <div>
                  <label
                    className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    placeholder="Type your message here..."
                  />
                  {errors.message ? (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 px-5 py-3 font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSending ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    "Send"
                  )}
                </button>

                {submitToast ? (
                  <div
                    className={`rounded-xl border px-4 py-3 text-sm font-medium ${
                      submitToast.type === "success"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-900/30 dark:text-emerald-300"
                        : "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/40 dark:bg-rose-900/30 dark:text-rose-300"
                    }`}
                    role="status"
                    aria-live="polite"
                  >
                    {submitToast.message}
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
