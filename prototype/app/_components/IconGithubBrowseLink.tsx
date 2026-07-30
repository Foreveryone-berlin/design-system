const GITHUB_REPO_TREE_ROOT =
  "https://github.com/Foreveryone-berlin/design-system/tree/main/prototype/public";

export default function IconGithubBrowseLink({
  folder = "",
  path = "",
}: {
  /** Path segment after `prototype/public/icons/` (empty for the icons root). */
  folder?: string;
  /** Full path segment after `prototype/public/` when linking outside `icons/`. */
  path?: string;
}) {
  const resolvedPath = path || (folder ? `icons/${folder}` : "icons");
  const href = `${GITHUB_REPO_TREE_ROOT}/${resolvedPath}`;

  return (
    <p className="ds-icon-set-action">
      <a href={href} target="_blank" rel="noopener noreferrer">
        Browse this icon set on GitHub
      </a>
    </p>
  );
}
