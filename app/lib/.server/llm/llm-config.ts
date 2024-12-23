import { env } from 'node:process';

export function getModelProvider(cloudflareEnv: Env) {
  return env.MODEL_PROVIDER || cloudflareEnv.MODEL_PROVIDER;
}

export function getAPIKey(cloudflareEnv: Env) {
  /**
   * The `cloudflareEnv` is only used when deployed or when previewing locally.
   * In development the environment variables are available through `env`.
   */
  const provider = getModelProvider(cloudflareEnv)
  if (provider === 'openai') {
    return env.OEPNAI_API_KEY || cloudflareEnv.OEPNAI_API_KEY;
  }
  return env.ANTHROPIC_API_KEY || cloudflareEnv.ANTHROPIC_API_KEY;
}

export function getModelName(cloudflareEnv: Env) {
  const provider = getModelProvider(cloudflareEnv)
  if (provider === 'openai') {
    return env.OPENAI_MODEL_NAME || cloudflareEnv.OPENAI_MODEL_NAME;
  }
  return env.ANTHROPIC_MODEL_NAME || cloudflareEnv.ANTHROPIC_MODEL_NAME
}

export function getBaseUrl(cloudflareEnv: Env) {
  return env.OPENAI_URL || cloudflareEnv.OPENAI_URL;
}