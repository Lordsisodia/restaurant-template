const CODE_PLACEHOLDER_PREFIX = '@@CODEPH_';

export function htmlEscape(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttribute(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function applyInlineFormatting(text: string) {
  let placeholderIndex = 0;
  const codeLookup: Record<string, string> = {};

  const escaped = htmlEscape(text);

  const protectedCode = escaped.replace(/`([^`]+)`/g, (_, code) => {
    const key = `${CODE_PLACEHOLDER_PREFIX}${placeholderIndex}@@`;
    placeholderIndex += 1;
    codeLookup[key] = `<code>${code}</code>`;
    return key;
  });

  const withLinks = protectedCode.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    (_, label, url) => `<a href="${escapeAttribute(url)}" target="_blank" rel="noreferrer noopener">${label}</a>`,
  );

  const withStrong = withLinks
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.+?)__/g, '<strong>$1</strong>');

  const withEmphasis = withStrong
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/_(.+?)_/g, '<em>$1</em>');

  const restored = Object.entries(codeLookup).reduce(
    (acc, [key, value]) => acc.replace(new RegExp(key, 'g'), value),
    withEmphasis,
  );

  return restored;
}

export function convertPlainTextToHtml(content: string) {
  const normalized = content.replace(/\r\n/g, '\n').trim();
  if (!normalized) return '';

  const lines = normalized.split('\n');
  const blocks: string[] = [];

  let paragraphBuffer: string[] = [];
  let listBuffer: { type: 'ul' | 'ol'; items: string[] } | null = null;
  let inCode = false;
  let codeLanguage = '';
  let codeLines: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length === 0) return;
    const paragraph = applyInlineFormatting(paragraphBuffer.join(' '));
    blocks.push(`<p>${paragraph}</p>`);
    paragraphBuffer = [];
  };

  const flushList = () => {
    if (!listBuffer) return;
    const items = listBuffer.items.map((item) => `<li>${applyInlineFormatting(item)}</li>`).join('');
    blocks.push(`<${listBuffer.type}>${items}</${listBuffer.type}>`);
    listBuffer = null;
  };

  const flushCode = () => {
    if (codeLines.length === 0) return;
    const languageAttr = codeLanguage ? ` class="language-${escapeAttribute(codeLanguage)}"` : '';
    const code = htmlEscape(codeLines.join('\n'));
    blocks.push(`<pre><code${languageAttr}>${code}</code></pre>`);
    codeLines = [];
    codeLanguage = '';
  };

  for (let i = 0; i < lines.length; i += 1) {
    const rawLine = lines[i] ?? '';
    const trimmed = rawLine.trim();

    if (trimmed.startsWith('```')) {
      if (inCode) {
        flushCode();
        inCode = false;
      } else {
        flushParagraph();
        flushList();
        inCode = true;
        codeLanguage = trimmed.slice(3).trim();
        codeLines = [];
      }
      continue;
    }

    if (inCode) {
      codeLines.push(rawLine);
      continue;
    }

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      flushParagraph();
      flushList();
      blocks.push('<hr />');
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      const hashes = headingMatch[1].length;
      const mappedLevel = hashes === 1 ? 'h2' : hashes === 2 ? 'h3' : 'h4';
      const headingText = applyInlineFormatting(headingMatch[2]);
      blocks.push(`<${mappedLevel}>${headingText}</${mappedLevel}>`);
      continue;
    }

    if (/^>\s?/.test(trimmed)) {
      flushParagraph();
      flushList();
      const quoteLines: string[] = [];
      let j = i;
      while (j < lines.length) {
        const candidate = lines[j]?.trim();
        if (!candidate || !candidate.startsWith('>')) break;
        quoteLines.push(candidate.replace(/^>\s?/, ''));
        j += 1;
      }
      const quote = applyInlineFormatting(quoteLines.join(' '));
      blocks.push(`<blockquote><p>${quote}</p></blockquote>`);
      i = j - 1;
      continue;
    }

    const orderedMatch = trimmed.match(/^(\d+)[.)]\s+(.*)$/);
    if (orderedMatch) {
      flushParagraph();
      if (!listBuffer || listBuffer.type !== 'ol') {
        flushList();
        listBuffer = { type: 'ol', items: [] };
      }
      listBuffer.items.push(orderedMatch[2].trim());
      continue;
    }

    const unorderedMatch = trimmed.match(/^[-*+]\s+(.*)$/);
    if (unorderedMatch) {
      flushParagraph();
      if (!listBuffer || listBuffer.type !== 'ul') {
        flushList();
        listBuffer = { type: 'ul', items: [] };
      }
      listBuffer.items.push(unorderedMatch[1].trim());
      continue;
    }

    paragraphBuffer.push(trimmed);
  }

  flushParagraph();
  flushList();
  if (inCode) {
    flushCode();
  }

  return blocks.join('');
}
