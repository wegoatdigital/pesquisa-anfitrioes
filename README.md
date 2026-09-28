# Pesquisa de anfitriões de Joinville

Versão preparada para **Netlify Forms**, com publicação a partir do GitHub.
Preserva o visual, as perguntas, as cinco etapas, as validações e as regras condicionais do projeto original.

## Publicar pelo GitHub

1. Este repositório já contém os arquivos do projeto.
2. Acesse sua conta no Netlify.
3. No Netlify, escolha **Add new project → Import an existing project → GitHub**.
4. Autorize o acesso ao repositório e selecione-o. Escolha a branch em que os arquivos foram enviados, normalmente `main`.
5. Confira as configurações: comando `pnpm run build`, diretório de publicação `out`, diretório base em branco. O arquivo `netlify.toml` já define essas opções. Não é preciso cadastrar chaves ou variáveis secretas.
6. Publique. No projeto do Netlify, abra **Forms** e habilite **Enable form detection**, se ainda não estiver habilitado. Depois disso, faça um novo deploy para o Netlify detectar a definição do formulário.
7. Confirme que `pesquisa-anfitrioes-joinville` aparece em **Forms**.
8. Abra o endereço público do Netlify e faça um envio claramente identificado como teste. Confirme seu recebimento em **Forms** (inclusive em Spam, se necessário) e então exclua esse teste.
9. Compartilhe o endereço novo do Netlify. O endereço antigo `chatgpt.site` continua sendo outra publicação.

Cada alteração enviada à branch conectada gera uma nova publicação automaticamente no Netlify.

## Alternativa: publicação manual

A pasta `publicacao-pronta/` contém a versão estática já compilada. Ela pode ser enviada no deploy manual do Netlify, sem instalar dependências. Habilite a detecção de formulários e envie novamente essa pasta se ela não estava habilitada antes do primeiro deploy. Esta opção não configura publicação automática pelo GitHub.

## Consultar respostas

Use **Forms → pesquisa-anfitrioes-joinville** no painel do Netlify. Ali estão as novas respostas e a exportação CSV. Campos de múltipla escolha são enviados em uma única coluna, separados por ` | `. Campos condicionais não aplicáveis não são enviados. O código exibido ao participante fica na coluna `response_id`.

A página `/admin/` apenas orienta a equipe a acessar o Netlify. Não expõe respostas nem credenciais. A página `/preview/` permite revisar as etapas sem registrar envios. Não use a prévia para testar a integração real.

## O que muda nesta versão

- Os envios usam POST codificado para `/netlify-forms.html`, sem banco Cloudflare, API própria ou login ChatGPT.
- A definição HTML estática inclui todos os campos, inclusive os condicionais. É regenerada a cada build a partir das perguntas.
- O campo antispam `website` é um honeypot do Netlify.
- Respostas, consentimento, versão, código e horário de envio só são enviados ao concluir. O rascunho fica temporariamente na aba do navegador.
- Falhas de envio mostram um erro e preservam as respostas para nova tentativa.
- A página de privacidade foi ajustada para o armazenamento no Netlify Forms.

As respostas antigas **não foram migradas**. Elas permanecem no projeto original; exporte-as pelo painel antigo quando necessário. O acompanhamento de abandonos/inícios do sistema antigo não faz parte do Netlify Forms desta versão.

Todos os perfis podem concluir as cinco etapas. Quem já opera responde sobre a experiência real; quem ainda não opera responde sobre planos e expectativas, em campos próprios. Os campos históricos permanecem na definição do Netlify Forms.

## Desenvolvimento

Requer Node.js 22.13 ou superior e pnpm 11.25.0, conforme `package.json`.

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

```sh
pnpm run build
```

O resultado fica em `out/`. A prévia local não recebe respostas: o processamento real do formulário acontece no Netlify, com detecção habilitada. A integração de produção só estará confirmada após um envio aparecer no painel do projeto publicado.

## Referências

- https://docs.netlify.com/manage/forms/setup/
- https://docs.netlify.com/manage/forms/submissions/
