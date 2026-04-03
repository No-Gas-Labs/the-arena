# Get API Keys - Step by Step

**Complete this before running `./deploy.sh`**

Copy each key to a text file as you collect them.

---

## 1. Gemini API Key (Google)

1. Go to: https://ai.google.dev
2. Click "Get API Key"
3. Click "Create API key in new project"
4. Copy the key
5. **Save as**: `GEMINI_API_KEY`

---

## 2. OpenAI API Key

1. Go to: https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy the key (you won't see it again!)
4. **Save as**: `OPENAI_API_KEY`

---

## 3. Anthropic API Key (Claude)

1. Go to: https://console.anthropic.com/keys
2. Click "Create Key"
3. Give it a name (e.g., "THE ARENA")
4. Copy the key
5. **Save as**: `ANTHROPIC_API_KEY`

---

## 4. xAI API Key (Grok)

1. Go to: https://x.ai
2. Click "Request API Access"
3. Wait for approval (usually instant)
4. Go to API dashboard
5. Generate API key
6. Copy the key
7. **Save as**: `XAI_API_KEY`

---

## 5. Twitter Bearer Token

1. Go to: https://developer.twitter.com/en/portal/dashboard
2. Click "Create Project"
3. Name it "THE ARENA"
4. Select use case: "Analyzing Tweets"
5. Go to "Keys and tokens"
6. Under "Bearer Token", click "Regenerate"
7. Copy the token
8. **Save as**: `TWITTER_BEARER_TOKEN`

---

## 6. Substack API Key

1. Go to: https://substack.com/api
2. Click "Generate API Key"
3. Copy the key
4. **Save as**: `SUBSTACK_API_KEY`

---

## 7. SendGrid API Key

1. Go to: https://sendgrid.com
2. Sign up or log in
3. Go to Settings → API Keys
4. Click "Create API Key"
5. Give it a name (e.g., "THE ARENA")
6. Copy the key
7. **Save as**: `SENDGRID_API_KEY`

---

## Checklist

- [ ] GEMINI_API_KEY
- [ ] OPENAI_API_KEY
- [ ] ANTHROPIC_API_KEY
- [ ] XAI_API_KEY
- [ ] TWITTER_BEARER_TOKEN
- [ ] SUBSTACK_API_KEY
- [ ] SENDGRID_API_KEY

---

## Save Your Keys

Create a file called `api-keys.txt`:

```
GEMINI_API_KEY=your-key-here
OPENAI_API_KEY=your-key-here
ANTHROPIC_API_KEY=your-key-here
XAI_API_KEY=your-key-here
TWITTER_BEARER_TOKEN=your-token-here
SUBSTACK_API_KEY=your-key-here
SENDGRID_API_KEY=your-key-here
```

**Keep this file safe and never share it!**

---

## When Running Deploy Script

When the script asks for each key, copy and paste from your `api-keys.txt` file.

---

**Once you have all 7 keys, run: `./deploy.sh`**
