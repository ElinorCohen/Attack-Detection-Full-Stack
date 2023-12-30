function isNoSQLInjection(input) {
  const nosqlInjectionPattern =
    /(?:\$|\b)(gt|gte|lt|lte|eq|ne|in|nin|or|and|not)\b/i;
  return nosqlInjectionPattern.test(input);
}

function isCSRFAttack(input) {
  const csrfPattern =
    /<[^>]+(?:href|src)\s*=\s*["']?([^"'>]+)["']?(?:[^>]*?)>/g;
  return csrfPattern.test(input);
}

function isXSSAttack(input) {
  const xssPattern =
    /<script\b[^>]*>(.*?)<\/script>|<img\b[^>]*\bonerror\s*=\s*['"]?([^'"\s]*)/i;
  return xssPattern.test(input);
}

module.exports = { isCSRFAttack, isNoSQLInjection, isXSSAttack };
