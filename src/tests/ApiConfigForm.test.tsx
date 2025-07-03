import { describe, it, expect } from 'vitest';
import { LLMProvider } from '../types';

describe('API Configuration', () => {
  it('should support multiple LLM providers', () => {
    // Verify that we have the expected LLM providers
    expect(Object.values(LLMProvider)).toContain('openai');
    expect(Object.values(LLMProvider)).toContain('anthropic');
    expect(Object.values(LLMProvider)).toContain('google');
  });
});