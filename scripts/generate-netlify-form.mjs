import {writeFileSync} from 'node:fs';
import {groups} from '../app/questions.ts';
import {FORM_NAME, META_FIELDS} from '../app/netlify-form.ts';

const names = [...META_FIELDS, ...groups.flat().map(q => q.id)];
if (new Set(names).size !== names.length) throw new Error('Campos duplicados no formulário.');
if (names.some(name => !/^[a-z_]+$/.test(name))) throw new Error('Nome de campo inválido.');
const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Registro da pesquisa</title></head>
<body>
<!-- Definição estática para detecção no deploy. Inclui TODOS os campos condicionais. -->
<form name="${FORM_NAME}" method="POST" data-netlify="true" netlify-honeypot="website" hidden>
<input type="hidden" name="form-name" value="${FORM_NAME}">
${names.map(name => `<input type="text" name="${name}">`).join('\n')}
</form>
<p><a href="/">Acessar a pesquisa</a></p>
</body></html>\n`;
writeFileSync(new URL('../public/netlify-forms.html', import.meta.url), html);
console.log(`Netlify Forms: ${names.length} campos registrados.`);
