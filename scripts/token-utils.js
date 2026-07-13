const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const TOKENS_DIR = path.join(ROOT_DIR, "tokens");
const INDEX_PATH = path.join(TOKENS_DIR, "index.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function isPlainObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function deepMerge(target, source) {
  const result = { ...target };
  for (const [key, value] of Object.entries(source)) {
    if (isPlainObject(value) && isPlainObject(result[key])) {
      result[key] = deepMerge(result[key], value);
    } else {
      result[key] = value;
    }
  }
  return result;
}

function loadAllTokens() {
  const index = readJson(INDEX_PATH);
  const imports = index.imports || [];
  if (!Array.isArray(imports) || imports.length === 0) {
    throw new Error("tokens/index.json must define a non-empty imports array.");
  }

  let merged = {};
  for (const relativePath of imports) {
    const fullPath = path.resolve(TOKENS_DIR, relativePath);
    const json = readJson(fullPath);
    merged = deepMerge(merged, json);
  }
  return merged;
}

function parseReference(value) {
  if (typeof value !== "string") return null;
  const match = value.trim().match(/^\{([^}]+)\}$/);
  return match ? match[1] : null;
}

function getTokenNode(tokens, tokenPath) {
  const segments = tokenPath.split(".");
  let current = tokens;
  for (const segment of segments) {
    if (current === null || typeof current !== "object" || !(segment in current)) {
      throw new Error(`Missing token path: ${tokenPath}`);
    }
    current = current[segment];
  }

  if (!current || typeof current !== "object" || !("$value" in current)) {
    throw new Error(`Invalid token leaf at path: ${tokenPath}`);
  }
  return current;
}

function resolveTokenValue(tokens, tokenPath, cache = new Map(), chain = []) {
  if (cache.has(tokenPath)) return cache.get(tokenPath);
  if (chain.includes(tokenPath)) {
    throw new Error(`Circular token reference: ${[...chain, tokenPath].join(" -> ")}`);
  }

  const node = getTokenNode(tokens, tokenPath);
  const refPath = parseReference(node.$value);
  if (!refPath) {
    cache.set(tokenPath, node.$value);
    return node.$value;
  }

  const resolved = resolveTokenValue(tokens, refPath, cache, [...chain, tokenPath]);
  cache.set(tokenPath, resolved);
  return resolved;
}

module.exports = {
  loadAllTokens,
  resolveTokenValue,
};
