const GITHUB_ICONS_ROOT =
  "https://github.com/Foreveryone-berlin/design-system/tree/main/prototype/public/icons";

export default function IconGithubBrowseLink({
  folder = "",
}: {
  /** Path segment after `prototype/public/icons/` (empty for the icons root). */
  folder?: string;
}) {
  const href = folder ? `${GITHUB_ICONS_ROOT}/${folder}` : GITHUB_ICONS_ROOT;

  return (
    <p className="ds-icon-set-action">
      <a href={href} target="_blank" rel="noopener noreferrer">
        Browse this icon set on GitHub
      </a>
    </p>
  );
}
