import PostHeader from '../../shared/components/PostHeader';
import type { PostContent } from '../../types/schema';

type MediaImage = {
  src: string;
  alt: string;
  caption?: string;
};

const fallbackImagesByCategory: Record<string, MediaImage[]> = {
  beverages: [
    {
      src: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=1400&q=80',
      alt: 'Barista pouring latte art at Draco Coffee',
      caption: 'Signature pours emerging from the Draco brew bar.',
    },
    {
      src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80',
      alt: 'Array of specialty drinks on a marble table',
      caption: 'Seasonal beverages showcased for weekend brunchers.',
    },
  ],
  'local guide': [
    {
      src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
      alt: 'Sunset over Denpasar coastline',
      caption: 'Denpasar evenings set the tone for a cafe crawl finale.',
    },
    {
      src: 'https://images.unsplash.com/photo-1466218106285-1d71d0c3b839?auto=format&fit=crop&w=1400&q=80',
      alt: 'Bali street scene with locals',
      caption: 'Neighborhood routes reveal the pulse of Bali’s coffee culture.',
    },
  ],
  sustainability: [
    {
      src: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80',
      alt: 'Hand releasing coffee grounds for compost',
      caption: 'Spent espresso grounds headed for Draco’s compost partners.',
    },
    {
      src: 'https://images.unsplash.com/photo-1520077034460-1d21f39bc78c?auto=format&fit=crop&w=1400&q=80',
      alt: 'Reusable jars on a cafe counter',
      caption: 'Refill jars lined up for loyalty guests.',
    },
  ],
  community: [
    {
      src: 'https://images.unsplash.com/photo-1506784881475-0e408bbca849?auto=format&fit=crop&w=1400&q=80',
      alt: 'Creative workshop at a cafe',
      caption: 'Weekend maker sessions energize Draco’s mezzanine studio.',
    },
    {
      src: 'https://images.unsplash.com/photo-1515162305281-7a8c5cf1f960?auto=format&fit=crop&w=1400&q=80',
      alt: 'Live music performance in an intimate venue',
      caption: 'Thursday listening lounge performances spotlight local artists.',
    },
  ],
  default: [
    {
      src: 'https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=1400&q=80',
      alt: 'Top view of a café table with notebooks and coffee',
      caption: 'Every Draco story starts with a notebook and a pour-over.',
    },
    {
      src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80',
      alt: 'Modern cafe interior bathed in natural light',
      caption: 'Morning light inside Draco Coffee & Eatery, Denpasar.',
    },
  ],
};

function normalizeCategoryKey(category: string | null | undefined) {
  return category?.trim().toLowerCase() ?? 'default';
}

function getSupportingImages(post: PostContent): MediaImage[] {
  const key = normalizeCategoryKey(post.category);
  return fallbackImagesByCategory[key] ?? fallbackImagesByCategory.default;
}

function hasHtmlTags(content: string) {
  return /<\/?[a-z][\s\S]*>/i.test(content);
}

function escapeAttribute(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function applyInlineFormatting(text: string) {
  const placeholderPrefix = '@@CODEPH_';
  let placeholderIndex = 0;
  const codeLookup: Record<string, string> = {};

  const escaped = htmlEscape(text);

  const protectedCode = escaped.replace(/`([^`]+)`/g, (_, code) => {
    const key = `${placeholderPrefix}${placeholderIndex}@@`;
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

function ensureHtmlContent(content: string | null | undefined) {
  if (!content) return null;
  return hasHtmlTags(content) ? content : convertPlainTextToHtml(content);
}

function stripHtml(html: string) {
  return html.replace(/<\/?[^>]+(>|$)/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractLeadAndBody(html: string | null | undefined) {
  if (!html) {
    return { lead: null, body: '' };
  }
  const match = html.match(/<p>([\s\S]*?)<\/p>/i);
  if (!match) return { lead: null, body: html };
  const leadHtml = match[0];
  const leadText = stripHtml(match[1]);
  const body = html.replace(leadHtml, '');
  return { lead: leadText, body };
}

function htmlEscape(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function injectMediaBlocks(html: string, images: MediaImage[]) {
  if (!html || images.length === 0) return { html, used: 0 };
  const segments = html.split(/(?=<h2\b)/i);
  if (segments.length <= 1) return { html, used: 0 };

  let used = 0;
  const processed = segments.map((segment, index) => {
    if (index === 0) return segment;
    const image = images[used];
    if (!image) return segment;
    used += 1;
    const figure = `
      <figure class="my-12 overflow-hidden rounded-3xl border border-white/10 bg-[#09090e] shadow-2xl">
        <img
          src="${htmlEscape(image.src)}"
          alt="${htmlEscape(image.alt)}"
          loading="lazy"
          class="h-[260px] w-full object-cover sm:h-[320px]"
        />
        ${
          image.caption
            ? `<figcaption class="px-6 py-4 text-sm text-white/60">${htmlEscape(image.caption)}</figcaption>`
            : ''
        }
      </figure>
    `;

    return figure + segment;
  });

  return { html: processed.join(''), used };
}

function extractKeyPoints(html: string | null | undefined, limit = 3) {
  if (!html) return [];
  const matches = Array.from(html.matchAll(/<li>([\s\S]*?)<\/li>/gi));
  if (matches.length === 0) return [];
  return matches.slice(0, limit).map((match) => stripHtml(match[1]));
}

export default function PostPrimary(post: PostContent) {
  const supportingImages = getSupportingImages(post);
  const normalizedContent = ensureHtmlContent(post.content);
  const { lead, body } = extractLeadAndBody(normalizedContent);
  const { html: richHtml, used: usedImages } = injectMediaBlocks(body, supportingImages);
  const remainingImages = supportingImages.slice(usedImages);
  const keyPoints = extractKeyPoints(normalizedContent);
  const wordCount = stripHtml(normalizedContent ?? '').split(' ').filter(Boolean).length;
  const estimatedMinutes = post.readTimeMinutes ?? Math.max(3, Math.round(wordCount / 180));

  return (
    <article className="relative isolate bg-[#050505] text-white">
      <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-white/[0.05] via-transparent to-transparent" />
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-4 py-16 lg:grid-cols-[minmax(0,2.6fr)_minmax(0,1fr)] lg:px-8">
        <div>
          <PostHeader post={post} />

          {lead ? (
            <p className="mb-10 text-xl leading-relaxed text-white/80 sm:text-2xl sm:leading-relaxed">
              {lead}
            </p>
          ) : null}

          {post.content ? (
            <div
              className="prose prose-lg prose-invert max-w-none text-white/80 prose-headings:font-semibold prose-headings:text-white prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-3xl prose-h2:tracking-tight prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-2xl prose-h4:mt-8 prose-h4:mb-3 prose-h4:text-xl prose-p:mb-6 prose-p:leading-8 prose-strong:text-white prose-em:text-white/80 prose-ul:my-6 prose-ul:list-disc prose-ul:ml-6 prose-ol:my-6 prose-ol:list-decimal prose-ol:ml-6 prose-li:leading-relaxed prose-li:marker:text-amber-300 prose-a:text-amber-300 prose-a:no-underline hover:prose-a:text-amber-200 prose-code:rounded prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-pre:bg-[#0f0f15] prose-pre:border prose-pre:border-white/10 prose-pre:text-sm prose-pre:text-white prose-img:rounded-3xl prose-img:border prose-img:border-white/10 prose-img:shadow-xl prose-figcaption:text-sm prose-figcaption:text-white/60 prose-blockquote:border-l-4 prose-blockquote:border-amber-400/60 prose-blockquote:pl-6 prose-blockquote:text-white/70 prose-hr:my-12 prose-hr:border-white/20"
              dangerouslySetInnerHTML={{ __html: richHtml || body }}
            />
          ) : (
            <p className="mt-6 text-base text-white/70">Content coming soon.</p>
          )}

          {remainingImages.length > 0 ? (
            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {remainingImages.map((image, index) => (
                <figure
                  key={`${image.src}-${index}`}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-[#09090e] shadow-2xl"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="h-60 w-full object-cover"
                  />
                  {image.caption ? (
                    <figcaption className="px-6 py-4 text-sm text-white/60">{image.caption}</figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          ) : null}

          <footer className="mt-16 border-t border-white/15 pt-8">
            <div className="flex flex-col gap-4 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
              <a
                href={post.backLinkHref ?? '/blog'}
                className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white"
              >
                {post.backLinkLabel ?? '← Back to blog'}
              </a>
              <div className="flex flex-wrap items-center gap-4 text-white/40">
                <span>Share buttons coming soon</span>
                <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:inline-block" />
                <span>{wordCount.toLocaleString()} words</span>
              </div>
            </div>
          </footer>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-white/10 bg-[#09090e] p-6 shadow-xl">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">Story Stats</h3>
            <dl className="mt-4 space-y-3 text-sm text-white/70">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                <dt>Category</dt>
                <dd className="font-medium text-white">{post.category ?? 'Stories'}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                <dt>Published</dt>
                <dd className="font-medium text-white">
                  {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                <dt>Read time</dt>
                <dd className="font-medium text-white">{estimatedMinutes} min</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt>Words</dt>
                <dd className="font-medium text-white">{wordCount.toLocaleString()}</dd>
              </div>
            </dl>
          </div>

          {keyPoints.length > 0 ? (
            <div className="rounded-3xl border border-white/10 bg-[#0b0b10] p-6 shadow-xl">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">Highlights</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                {keyPoints.map((point, idx) => (
                  <li key={`${point}-${idx}`} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-amber-400" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {post.excerpt ? (
            <div className="rounded-3xl border border-amber-500/30 bg-amber-500/10 p-6 text-sm text-amber-50 shadow-xl shadow-amber-500/10">
              <p className="font-semibold uppercase tracking-[0.3em] text-amber-200/80">In a sentence</p>
              <p className="mt-3 leading-relaxed text-amber-50/90">{post.excerpt}</p>
            </div>
          ) : null}
        </aside>
      </div>
    </article>
  );
}
