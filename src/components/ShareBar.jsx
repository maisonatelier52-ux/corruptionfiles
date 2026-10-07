"use client";

import { useEffect, useRef, useState } from "react";
import { Share2, Link2, Check, Facebook, MessageCircle } from "lucide-react";

/**
 * Share buttons for an article. Works without JavaScript for X, Facebook and
 * WhatsApp (plain links). "Share" (phones/tablets) and "Copy link" need JS.
 */

const btn =
  "inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition-colors hover:border-gray-900 hover:bg-gray-900 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2196f3]";

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={15}
      height={15}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

export default function ShareBar({ url, title }) {
  const [canShare, setCanShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && !!navigator.share);
    return () => clearTimeout(timer.current);
  }, []);

  const enc = encodeURIComponent;
  const links = [
    {
      key: "x",
      label: "Share on X",
      href: `https://x.com/intent/post?text=${enc(title)}&url=${enc(url)}`,
      icon: <XIcon />,
    },
    {
      key: "facebook",
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
      icon: <Facebook size={16} aria-hidden="true" />,
    },
    {
      key: "whatsapp",
      label: "Share on WhatsApp",
      href: `https://wa.me/?text=${enc(`${title} ${url}`)}`,
      icon: <MessageCircle size={16} aria-hidden="true" />,
    },
  ];

  async function nativeShare() {
    try {
      await navigator.share({ title, url });
    } catch {
      /* person closed the share sheet */
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const el = document.createElement("textarea");
      el.value = url;
      el.setAttribute("readonly", "");
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      try {
        document.execCommand("copy");
      } catch {
        /* nothing else to try */
      }
      document.body.removeChild(el);
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      role="group"
      aria-label="Share this article"
      className="flex items-center gap-2"
    >
      {canShare && (
        <button
          type="button"
          onClick={nativeShare}
          className={btn}
          aria-label="Share this article"
          title="Share"
        >
          <Share2 size={16} aria-hidden="true" />
        </button>
      )}
      {links.map((l) => (
        <a
          key={l.key}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className={btn}
          aria-label={l.label}
          title={l.label}
        >
          {l.icon}
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        className={btn}
        aria-label="Copy link"
        title={copied ? "Link copied" : "Copy link"}
      >
        {copied ? (
          <Check size={16} aria-hidden="true" />
        ) : (
          <Link2 size={16} aria-hidden="true" />
        )}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}
