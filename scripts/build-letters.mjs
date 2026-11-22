import { readdir, readFile, writeFile } from 'node:fs/promises';
import MarkdownIt from 'markdown-it';

const source = new URL('../cartas/', import.meta.url);
const output = new URL('../js/letters-catalog.js', import.meta.url);
const entries = await readdir(source, { withFileTypes: true });
const decoder = new TextDecoder('utf-8', { fatal: true });
const markdown = new MarkdownIt({ html: false, breaks: true });
const renderImage = markdown.renderer.rules.image;

// Las imágenes de cada carta se escriben con rutas relativas a cartas/.
markdown.renderer.rules.image = (tokens, index, options, env, renderer) => {
    const token = tokens[index];
    const src = token.attrGet('src');
    if (/^(?:\.\/)?imagenes\//.test(src)) {
        token.attrSet('src', `cartas/${src.replace(/^\.\//, '')}`);
    }
    return renderImage(tokens, index, options, env, renderer);
};

const files = entries
    .filter(entry => entry.isFile() && /^\d{3}\.md$/.test(entry.name))
    .map(entry => entry.name)
    .filter(name => name >= '001.md' && name <= '365.md')
    .sort()
    .reverse();

const letters = await Promise.all(files.map(async name => {
    const bytes = await readFile(new URL(name, source));
    let body;
    try {
        body = decoder.decode(bytes);
    } catch (error) {
        throw new Error(`cartas/${name} debe guardarse en UTF-8.`, { cause: error });
    }

    const env = {};
    const tokens = markdown.parse(body, env);
    const plainText = token => markdown.renderer.renderInlineAsText(token.children, markdown.options, env);
    const dateIndex = tokens.findIndex(token => token.level === 0 && token.type === 'heading_open' && token.tag === 'h3');
    let date = '';
    if (dateIndex >= 0) {
        const [, dateToken] = tokens.splice(dateIndex, 3);
        date = plainText(dateToken).trim();
    }
    const titleToken = tokens[0]?.tag === 'h1' ? tokens[1] : null;
    const title = titleToken ? plainText(titleToken) : '';
    const preview = tokens
        .filter(token => token !== titleToken)
        .filter(token => token.type === 'inline')
        .map(plainText)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
    return { number: name.slice(0, 3), title, date, preview, html: markdown.renderer.render(tokens, markdown.options, env) };
}));

await writeFile(output, `window.lettersCatalog = ${JSON.stringify(letters)};\n`, 'utf8');
console.log(`Catálogo generado con ${letters.length} carta(s).`);
