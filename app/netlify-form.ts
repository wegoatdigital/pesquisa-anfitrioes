import {cleanAnswers, FORM_VERSION} from './questions.ts';
import type {Answers} from './questions.ts';

export const FORM_NAME = 'pesquisa-anfitrioes-joinville';
export const META_FIELDS = ['response_id', 'form_version', 'submitted_at', 'consent', 'website'];

export function encodeSubmission(answers: Answers, id: string, consent: boolean, website: string) {
  const data = new URLSearchParams({
    'form-name': FORM_NAME,
    response_id: id,
    form_version: FORM_VERSION,
    submitted_at: new Date().toISOString(),
    consent: consent ? 'Sim' : 'Não',
    website,
  });
  for (const [name, value] of Object.entries(cleanAnswers(answers))) {
    data.set(name, Array.isArray(value) ? value.join(' | ') : value);
  }
  return data.toString();
}
