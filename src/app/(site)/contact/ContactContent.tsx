"use client";

import type { MouseEvent } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import Container from "@/components/layout/Container";
import Card from "@/components/ui/Card";
import Section from "@/components/layout/Section";
import { buttonClasses } from "@/components/ui/Button";
import { openModal } from "@/components/modals/GlobalModalHost";
import { inputClasses, linkClasses } from "@/components/uiClasses";

import { siteContent } from "@/lib/content";
import { CONTACT_EMAIL_ADDRESS } from "@/lib/emailCompose";
import { easeOutExpo } from "@/lib/motion";
import { siteConfig } from "@/lib/siteConfig";

const DEFAULT_SUBJECT = "Partnership Inquiry";
const CLEAR_FORM_DELAY_AFTER_TOAST_CLOSE_MS = 1500;

function buildGmailToOnlyUrl() {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: CONTACT_EMAIL_ADDRESS,
  });

  return `https://mail.google.com/mail/?${params.toString()}`;
}

function buildGmailDraftUrl({
  subject,
  body,
}: {
  subject: string;
  body: string;
}) {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: CONTACT_EMAIL_ADDRESS,
    su: subject,
    body,
  });

  return `https://mail.google.com/mail/?${params.toString()}`;
}

function buildEmailBody({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  return `Hi Successors,

I’m reaching out regarding: ${message}

Name: ${name}
Contact: ${email}

Thanks, ${name}.`;
}

function buildDraftText({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return `To: ${CONTACT_EMAIL_ADDRESS}
Subject: ${subject}

${buildEmailBody({ name, email, message })}`;
}

export default function ContactContent() {
  const { contactPage } = siteContent;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(DEFAULT_SUBJECT);
  const [message, setMessage] = useState("");
  const formClearControls = useAnimationControls();
  const clearFormTimerRef = useRef<number | null>(null);
  const pendingClearFromContactRef = useRef(false);
  const composeToOnlyUrl = buildGmailToOnlyUrl();

  const runFormClearAnimation = useCallback(async () => {
    await formClearControls.start({
      opacity: 0.85,
      y: 2,
      transition: { duration: 0.18, ease: easeOutExpo },
    });

    setName("");
    setEmail("");
    setMessage("");
    setSubject(DEFAULT_SUBJECT);

    await formClearControls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.22, ease: easeOutExpo },
    });
  }, [formClearControls]);

  const clearScheduledFormClear = useCallback(() => {
    if (clearFormTimerRef.current !== null) {
      window.clearTimeout(clearFormTimerRef.current);
      clearFormTimerRef.current = null;
    }
  }, []);

  const scheduleFormClearAfterToastClose = useCallback(() => {
    if (!pendingClearFromContactRef.current) {
      return;
    }

    pendingClearFromContactRef.current = false;
    clearScheduledFormClear();
    clearFormTimerRef.current = window.setTimeout(() => {
      void runFormClearAnimation();
      clearFormTimerRef.current = null;
    }, CLEAR_FORM_DELAY_AFTER_TOAST_CLOSE_MS);
  }, [clearScheduledFormClear, runFormClearAnimation]);

  useEffect(
    () => () => {
      clearScheduledFormClear();
    },
    [clearScheduledFormClear],
  );

  const handleOpenDraft = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const draftText = buildDraftText({
      name,
      email,
      subject,
      message,
    });
    const composeBody = buildEmailBody({ name, email, message });
    const composeUrl = buildGmailDraftUrl({ subject, body: composeBody });
    pendingClearFromContactRef.current = true;

    void openModal("copyToast", {
      message: "The draft has been copied to your clipboard!",
      copyText: draftText,
      pendingUrl: composeUrl,
      onCloseComplete: scheduleFormClearAfterToastClose,
    });
  };

  const handleEmailClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    pendingClearFromContactRef.current = false;

    void openModal("copyToast", {
      message: "The email has been copied to your clipboard!",
      copyText: CONTACT_EMAIL_ADDRESS,
      pendingUrl: composeToOnlyUrl,
    });
  };

  return (
    <Section
      atmoId="contact-main"
      title={contactPage.title}
      subtitle={contactPage.subtitle}
    >
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1.15fr,0.85fr]">
          <Card className="card-pad-roomy hover-info-v1">
            <p className="type-subtitle mb-6">{contactPage.intro}</p>
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={formClearControls}
            >
              <form className="space-y-4" noValidate>
                <label className="block text-sm">
                  <span className="mb-2 block font-medium muted-copy">
                    Name
                  </span>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="field-input"
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                  />
                </label>

                <label className="block text-sm">
                  <span className="mb-2 block font-medium muted-copy">
                    Email
                  </span>
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="field-input"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="name@company.com"
                  />
                </label>

                <label className="block text-sm">
                  <span className="mb-2 block font-medium muted-copy">
                    Subject
                  </span>
                  <input
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    className="field-input"
                    type="text"
                    name="subject"
                    placeholder="Partnership Inquiry"
                  />
                </label>

                <label className="block text-sm">
                  <span className="mb-2 block font-medium muted-copy">
                    Message
                  </span>
                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className={inputClasses("min-h-36")}
                    name="message"
                    placeholder="Share your goals, campaign timeline, and collaboration details."
                  />
                </label>

                <button
                  type="button"
                  onClick={handleOpenDraft}
                  className={buttonClasses({ variant: "primary", size: "lg" })}
                >
                  Open Email Draft
                </button>
              </form>
            </motion.div>
          </Card>

          <Card className="card-pad-roomy hover-info-v1">
            <h2 className="font-heading text-2xl">Direct Contact</h2>
            <p className="mt-3 text-sm muted-copy">
              Email:{" "}
              <a
                href={composeToOnlyUrl}
                onClick={handleEmailClick}
                className={linkClasses({ variant: "inline" })}
              >
                {siteConfig.contactEmail}
              </a>
            </p>
            <p className="mt-2 text-sm muted-copy">
              Location: {siteConfig.locationText}
            </p>

            <div className="mt-8">
              <h3 className="font-heading text-lg">Social</h3>
              <p className="mt-2 text-sm muted-copy">
                {contactPage.socialPrompt}
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                {siteConfig.socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className={linkClasses({
                        variant: "inline",
                        className:
                          "inline-flex items-center gap-2 rounded-lg px-2 py-1",
                      })}
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
