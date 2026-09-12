import Link from "next/link";

/** Shared Unsplash attribution for every surface that shows stock photography. */
export default function PhotoCredit() {
  return (
    <p className="ds-photo-credit">
      Photos via{" "}
      <a
        href="https://unsplash.com/?utm_source=foreveryone_design_system&utm_medium=referral"
        target="_blank"
        rel="noopener noreferrer"
      >
        Unsplash
      </a>
      . Full credits on the{" "}
      <Link href="/credits#photography">Credits</Link> page.
    </p>
  );
}
