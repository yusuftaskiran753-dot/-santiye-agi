/**
 * Yapay zekâ asistanları, cevap motorları ve arama tarayıcıları. robots.txt'te açıkça izinlidir.
 * `training: true` olanlar model eğitimi için de kullanılabilir; istemezseniz bu satırları robots.ts'ten çıkarın.
 */
export const AI_BOTS: ReadonlyArray<{ agent: string; vendor: string; training: boolean }> = [
  { agent: "GPTBot", vendor: "OpenAI", training: true },
  { agent: "OAI-SearchBot", vendor: "OpenAI (ChatGPT arama)", training: false },
  { agent: "ChatGPT-User", vendor: "OpenAI (kullanıcı isteğiyle)", training: false },
  { agent: "ClaudeBot", vendor: "Anthropic", training: true },
  { agent: "Claude-SearchBot", vendor: "Anthropic (arama)", training: false },
  { agent: "Claude-User", vendor: "Anthropic (kullanıcı isteğiyle)", training: false },
  { agent: "anthropic-ai", vendor: "Anthropic (eski)", training: true },
  { agent: "Google-Extended", vendor: "Google (Gemini eğitimi/grounding)", training: true },
  { agent: "GoogleOther", vendor: "Google", training: false },
  { agent: "PerplexityBot", vendor: "Perplexity", training: false },
  { agent: "Perplexity-User", vendor: "Perplexity (kullanıcı isteğiyle)", training: false },
  { agent: "Applebot", vendor: "Apple (Siri/Spotlight)", training: false },
  { agent: "Applebot-Extended", vendor: "Apple (Apple Intelligence)", training: true },
  { agent: "Amazonbot", vendor: "Amazon (Alexa)", training: false },
  { agent: "Meta-ExternalAgent", vendor: "Meta", training: true },
  { agent: "Meta-ExternalFetcher", vendor: "Meta (kullanıcı isteğiyle)", training: false },
  { agent: "FacebookBot", vendor: "Meta", training: false },
  { agent: "CCBot", vendor: "Common Crawl", training: true },
  { agent: "cohere-ai", vendor: "Cohere", training: true },
  { agent: "DuckAssistBot", vendor: "DuckDuckGo", training: false },
  { agent: "MistralAI-User", vendor: "Mistral (kullanıcı isteğiyle)", training: false },
  { agent: "YouBot", vendor: "You.com", training: false },
];
