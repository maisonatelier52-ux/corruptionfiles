"use client";

import { useEffect, useRef } from "react";

/**
 * Sticky wrapper for the sidebar column (desktop / `lg` and up only).
 *
 * How the sticky range works:
 *  - It starts where the news listing starts (the <aside> sits in the same row
 *    as the article feed, i.e. below the category banner / author description).
 *  - It ends at the footer: the pages let the <aside> stretch down to just
 *    above the footer, and a sticky element can never leave its parent, so the
 *    column is pushed up by the footer when it arrives.
 *
 * Why this is a client component:
 *  - If the column is taller than the viewport, plain `sticky top-X` would cut
 *    off its bottom part and the visitor could never reach it. In that case
 *    `top` goes negative, so the column scrolls until its bottom edge is
 *    visible and then sticks there.
 *
 * Requirement (handled in SiteSidebar): the parent <aside> must be as tall as
 * the whole row (no `self-start`), because a sticky element can only travel
 * inside its parent.
 */

const GAP = 16; // px of space kept between the column and the viewport edge

export default function StickyColumn({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      // Space available for the column inside the viewport.
      const room = window.innerHeight - GAP * 2;
      const overflow = el.offsetHeight - room;

      // Taller than the viewport? Pin the bottom edge instead of the top.
      el.style.top = `${overflow > 0 ? GAP - overflow : GAP}px`;
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    // `lg:top-4` (= GAP) is only the server-render fallback; the effect above
    // replaces it with the measured value right after hydration.
    // `lg:[&>:last-child]:mb-0` drops the trailing section margin so the column
    // ends flush with its last chip (same result in every browser).
    <div
      ref={ref}
      className="lg:sticky lg:top-4 lg:z-10 lg:[&>:last-child]:mb-0"
    >
      {children}
    </div>
  );
}
