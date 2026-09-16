import type { Metadata } from "next";
import "./landing.css";
import Link from "next/link";
import localFont from "next/font/local";
import { DemoNotice } from "@/components/demo-notice";

const geist = localFont({
  src: "../public/fonts/geist-latin.woff2",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "FastReply - Instagram comment-to-DM automation",
  description:
    "Turn Instagram keyword comments into automatic private replies. Connect your Meta app, launch campaigns, and automate customer engagement.",
};

function ReplyPreview() {
  return (
    <figure
      className="or-preview"
      aria-label="Example campaign: a GUIDE comment triggers a private reply with a guide link"
    >
      <div className="or-preview-top">
        <span className="or-wordmark">
          FastReply<span aria-hidden="true">↗</span>
        </span>
        <span className="or-mono">Campaign preview</span>
      </div>
      <div className="or-preview-body">
        <div className="or-preview-heading">
          <span className="or-avatar">S</span>
          <div>
            <strong>Sunday studio</strong>
            <span>@sunday.studio · Instagram</span>
          </div>
          <span className="or-active">Active</span>
        </div>
        <div className="or-post">
          <span className="or-mono">Campaign: New drop</span>
          <p>
            Comment GUIDE below
            <br />and I’ll send you the link.
          </p>
          <span>Keyword: GUIDE</span>
          <div className="or-post-lines" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="or-comment">
          <span className="or-avatar or-avatar-small">M</span>
          <div>
            <strong>maya.creates</strong>
            <p>GUIDE! need this 😍</p>
          </div>
        </div>
        <div className="or-match">
          <span aria-hidden="true">↓</span>
          <span>
            Keyword <code>GUIDE</code> matched
          </span>
          <span className="or-match-line" />
          <span>Private reply</span>
        </div>
        <div className="or-message">
          <span className="or-mono">Sunday studio → Maya</span>
          <p>Hey Maya! Here’s the link 👇</p>
          <span className="or-message-link">
            Shop the new drop <span aria-hidden="true">↗</span>
          </span>
        </div>
        <div className="or-delivered">
          <span aria-hidden="true">✓</span> Sent through the official Instagram
          API
        </div>
      </div>
      <figcaption>
        Example content. Your keywords, your message, your links.
      </figcaption>
    </figure>
  );
}

const steps = [
  [
    "Connect your account",
    "Connect your Instagram Business or Creator account with official Meta Graph API permissions.",
  ],
  [
    "Set up a campaign",
    "Pick a post or reel, add keywords, and write the private reply. Add a public reply or tracked link buttons if you need them.",
  ],
  [
    "FastReply handles the rest",
    "Incoming events trigger your campaigns. A background worker queues, rate-limits, and logs each send, with retries and comment reconciliation.",
  ],
];
const features = [
  [
    "Custom reply messages",
    "Write your own messages, personalize with a username, and use up to two tracked link buttons.",
  ],
  [
    "Multiple triggers",
    "Trigger campaigns from post comments, incoming DMs, and text replies to Stories.",
  ],
  [
    "Inbox",
    "Read conversations and reply from FastReply, within Instagram’s messaging window.",
  ],
  [
    "Delivery logs",
    "See sent, skipped, and failed messages, with reasons. Follow tracked link clicks back to a campaign.",
  ],
];

export default async function Home() {
  return (
    <div id="top" className={`or-landing ${geist.className}`}>
      <a className="or-skip" href="#main">
        Skip to content
      </a>
      <DemoNotice variant="banner" />
      <header className="or-header">
        <div className="or-container or-nav">
          <a className="or-wordmark" href="#top" aria-label="FastReply home">
            FastReply
          </a>
          <nav aria-label="Main navigation">
            <a href="#how">How it works</a>
            <a href="#features">Features</a>
          </nav>
          <div className="or-nav-cta">
            <a className="or-nav-signin" href="/login">
              Sign in
            </a>
            <a className="or-button or-button-small" href="/signup">
              Get started <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </header>
      <main id="main">
        <section className="or-container or-hero">
          <div className="or-hero-copy">
            <h1>
              Turn Instagram comments
              <br />
              into private replies.
            </h1>
            <p className="or-lead">
              Someone comments a keyword on your post or reel, FastReply sends
              them a DM automatically. Built for scale, security, and reliability.
            </p>
            <div className="or-actions">
              <a className="or-button or-button-primary" href="/signup">
                Get started <span aria-hidden="true">↗</span>
              </a>
              <a className="or-text-link" href="#how">
                See how it works <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="or-hero-note">
              Self-hosted. Secure. Your infrastructure.
            </p>
          </div>
          <ReplyPreview />
        </section>
        <div className="or-container or-principles">
          <span>Official Instagram API</span>
          <span>No password sharing</span>
          <span>Your campaigns, in your database</span>
        </div>
        <div className="or-container">
          <div className="or-sheet">
            <section id="how" className="or-section or-how">
              <div>
                <h2>How it works</h2>
                <p>
                  Send a product link, share a resource, or deliver your latest
                  guide. You decide what starts the conversation and what
                  happens next.
                </p>
              </div>
              <ol className="or-steps">
                {steps.map(([title, description], index) => (
                  <li key={title}>
                    <span className="or-step-number">0{index + 1}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
            <section id="features" className="or-section">
              <div className="or-section-intro">
                <h2>Features</h2>
              </div>
              <div className="or-feature-grid">
                {features.map(([title, description]) => (
                  <article key={title}>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </article>
                ))}
              </div>
            </section>
            <section className="or-technical">
              <div>
                <h2>
                  Robust architecture.
                  <br />A system built for scale.
                </h2>
                <p>
                  FastReply manages campaigns, keyword matching, queues,
                  retries, logs, and live inbox with official Meta Graph API compliance.
                </p>
              </div>
              <div className="or-runtime">
                <div>
                  <span className="or-mono">Web app</span>
                  <strong>Next.js + React</strong>
                  <span>Dashboard & incoming events</span>
                </div>
                <div>
                  <span className="or-mono">Background worker</span>
                  <strong>Node.js + BullMQ</strong>
                  <span>Queued delivery & reconciliation</span>
                </div>
                <div>
                  <span className="or-mono">Your data</span>
                  <strong>PostgreSQL + Redis</strong>
                  <span>Campaigns, accounts, logs & queue</span>
                </div>
              </div>
            </section>
            <section className="or-section or-faq">
              <div>
                <h2>FAQ</h2>
              </div>
              <div>
                <details>
                  <summary>How does FastReply work?</summary>
                  <p>
                    FastReply uses official Meta webhooks to listen for keyword comments on your posts and automatically triggers a direct message response through the Instagram Graph API.
                  </p>
                </details>
                <details>
                  <summary>Which Instagram accounts can I connect?</summary>
                  <p>
                    Instagram Business and Creator accounts. Personal accounts
                    are not supported by Meta's Graph API.
                  </p>
                </details>
                <details>
                  <summary>Is it safe for my Instagram account?</summary>
                  <p>
                    Yes. Because FastReply uses official Meta Graph API endpoints rather than browser automation or scraping, your account stays fully compliant with Meta policies.
                  </p>
                </details>
              </div>
            </section>
          </div>
        </div>
        <section className="or-container or-closing">
          <h2>
            Set up your first campaign
          </h2>
          <p>Connect Instagram, create a campaign, and automate your replies.</p>
          <div className="or-actions">
            <a className="or-button or-button-primary" href="/login">
              Launch FastReply <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>
      <footer className="or-footer">
        <div className="or-container">
          <div className="or-footer-top">
            <div>
              <Link href="/" className="or-wordmark">
                FastReply
              </Link>
              <p>Automated Instagram comment-to-DM platform.</p>
            </div>
            <nav aria-label="Footer navigation">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/data-deletion">Data deletion</Link>
            </nav>
          </div>
          <div className="or-footer-bottom">
            <span>© {new Date().getFullYear()} FastReply. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
