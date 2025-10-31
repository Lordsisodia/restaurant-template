import { describe, expect, it } from 'vitest';

import { convertPlainTextToHtml } from '../templates/primary/PostPrimary';

describe('convertPlainTextToHtml', () => {
  it('creates heading hierarchy from markdown syntax', () => {
    const input = [
      '# Welcome to Draco',
      '',
      'We are excited to share stories from our roast lab.',
      '',
      '## Tasting Notes',
      'Bright citrus, caramel, and cocoa on the finish.',
      '',
      '### Brew Tips',
      'Use filtered water at 94°C for best extraction.',
    ].join('\n');

    const html = convertPlainTextToHtml(input);

    expect(html).toContain('<h2>Welcome to Draco</h2>');
    expect(html).toContain('<p>We are excited to share stories from our roast lab.</p>');
    expect(html).toContain('<h3>Tasting Notes</h3>');
    expect(html).toContain('<h4>Brew Tips</h4>');
  });

  it('supports lists, emphasis, and inline code', () => {
    const input = [
      'Highlights:',
      '- **Origin:** Guatemala',
      '- _Process:_ Washed',
      '- Use `18g` of coffee for a double shot',
    ].join('\n');

    const html = convertPlainTextToHtml(input);

    expect(html).toContain('<p>Highlights:</p>');
    expect(html).toContain('<ul>');
    expect(html).toContain('<strong>Origin:</strong> Guatemala');
    expect(html).toContain('<em>Process:</em> Washed');
    expect(html).toContain('<code>18g</code>');
  });

  it('handles blockquotes, ordered lists, and code fences', () => {
    const input = [
      '> Hospitality is our guiding light.',
      '',
      '1. Warm greeting',
      '2. Offer water',
      '3. Present seasonal recommendation',
      '',
      '```js',
      "console.log('Welcome to Draco');",
      '```',
      '',
      '---',
      '',
      'Thanks for reading!',
    ].join('\n');

    const html = convertPlainTextToHtml(input);

    expect(html).toContain('<blockquote><p>Hospitality is our guiding light.</p></blockquote>');
    expect(html).toContain('<ol>');
    expect(html).toContain('<li>Warm greeting</li>');
    expect(html).toContain('<pre><code class="language-js">console.log(&#39;Welcome to Draco&#39;);</code></pre>');
    expect(html).toContain('<hr />');
    expect(html).toContain('<p>Thanks for reading!</p>');
  });
});
