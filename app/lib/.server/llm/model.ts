import type { LanguageModelV1 } from '@ai-sdk/provider';
import { createAnthropic } from '@ai-sdk/anthropic';
import {createOpenAI} from '@ai-sdk/openai'
import * as llm_config from '~/lib/.server/llm/llm-config'

export function getAnthropicModel(apiKey: string): LanguageModelV1 {
  const anthropic = createAnthropic({
    apiKey,
  });

  return anthropic('claude-3-5-sonnet-20240620');
}

export function getOpenAiModel(env: Env) {
  const openai = createOpenAI({
    compatibility: 'compatible',
    baseURL: llm_config.getBaseUrl(env),
    apiKey: llm_config.getAPIKey(env),
  });
  return openai(llm_config.getModelName(env));
}

export function getModel(env: Env) {
  const provider = llm_config.getModelProvider(env);
  if (provider === 'openai') {
    return getOpenAiModel(env);
  }
  const apiKey = llm_config.getAPIKey(env);
  return getAnthropicModel(apiKey);
}