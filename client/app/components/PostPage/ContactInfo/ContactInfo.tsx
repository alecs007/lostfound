import React, { useState } from "react";
import Image from "next/image";
import styles from "./ContactInfo.module.scss";

interface ContactInfoProps {
  isOpen: boolean;
  onClose: () => void;
  email?: string;
  phone?: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
  isOpen,
  onClose,
  email,
  phone,
}) => {
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [captchaError, setCaptchaError] = useState("");

  // Simple math captcha for demonstration
  const [captchaQuestion, setCaptchaQuestion] = useState(() => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    return { a, b, answer: a + b };
  });
  const [captchaInput, setCaptchaInput] = useState("");

  const handleCaptchaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCaptchaLoading(true);
    setCaptchaError("");

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (parseInt(captchaInput) === captchaQuestion.answer) {
      setCaptchaVerified(true);
    } else {
      setCaptchaError("Răspuns incorect. Încearcă din nou.");
      // Generate new captcha
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      setCaptchaQuestion({ a, b, answer: a + b });
      setCaptchaInput("");
    }

    setCaptchaLoading(false);
  };

  const handleClose = () => {
    setCaptchaVerified(false);
    setCaptchaInput("");
    setCaptchaError("");
    onClose();
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You can add a toast notification here
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Informații de contact</h2>
          <button className={styles.closeButton} onClick={handleClose}>
            <Image src="/icons/close.svg" alt="Close" width={24} height={24} />
          </button>
        </div>

        <div className={styles.content}>
          {!captchaVerified ? (
            <div className={styles.captchaSection}>
              <p className={styles.description}>
                Pentru a preveni spam-ul, te rugăm să completezi captcha-ul de
                mai jos:
              </p>

              <form
                onSubmit={handleCaptchaSubmit}
                className={styles.captchaForm}
              >
                <div className={styles.captchaQuestion}>
                  <span>
                    Cât face {captchaQuestion.a} + {captchaQuestion.b} ?
                  </span>
                </div>

                <input
                  type="number"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  placeholder="Introdu răspunsul"
                  className={styles.captchaInput}
                  required
                />

                {captchaError && <p className={styles.error}>{captchaError}</p>}

                <button
                  type="submit"
                  disabled={captchaLoading}
                  className={styles.verifyButton}
                >
                  {captchaLoading ? "Verifică..." : "Verifică"}
                </button>
              </form>
            </div>
          ) : (
            <div className={styles.contactSection}>
              <div className={styles.successMessage}>
                <Image
                  src="/icons/check.svg"
                  alt="Success"
                  width={24}
                  height={24}
                />
                <p>Captcha verificat cu succes!</p>
              </div>

              <div className={styles.contactInfo}>
                {email && (
                  <div className={styles.contactItem}>
                    <div className={styles.contactLabel}>
                      <Image
                        src="/icons/email.svg"
                        alt="Email"
                        width={20}
                        height={20}
                      />
                      <span>Email:</span>
                    </div>
                    <div className={styles.contactValue}>
                      <span>{email}</span>
                      <button
                        onClick={() => copyToClipboard(email)}
                        className={styles.copyButton}
                        title="Copiază email"
                      >
                        <Image
                          src="/icons/copy.svg"
                          alt="Copy"
                          width={16}
                          height={16}
                        />
                      </button>
                    </div>
                  </div>
                )}

                {phone && (
                  <div className={styles.contactItem}>
                    <div className={styles.contactLabel}>
                      <Image
                        src="/icons/phone.svg"
                        alt="Phone"
                        width={20}
                        height={20}
                      />
                      <span>Telefon:</span>
                    </div>
                    <div className={styles.contactValue}>
                      <span>{phone}</span>
                      <button
                        onClick={() => copyToClipboard(phone)}
                        className={styles.copyButton}
                        title="Copiază telefon"
                      >
                        <Image
                          src="/icons/copy.svg"
                          alt="Copy"
                          width={16}
                          height={16}
                        />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.note}>
                <p>
                  <strong>Notă:</strong> Te rugăm să folosești aceste informații
                  responsabil și să contactezi persoana doar în legătură cu
                  această postare.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
