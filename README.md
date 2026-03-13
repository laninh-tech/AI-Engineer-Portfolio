# AI-Engineer-Portfolio

Personal portfolio website showcasing AI Engineering and Data Science projects, with bilingual UI (VI/EN), categorized project browsing, and a CV-grounded chatbot.

## Demo

- Repository: https://github.com/laninh-tech/AI-Engineer-Portfolio
- Local: http://localhost:3001

## Repository Metadata

- Description: Personal portfolio website showcasing AI Engineering, Data Science, and end-to-end intelligent systems.
- Topics: ai-engineering, data-science, machine-learning, portfolio

## Preview

![Portfolio Overview](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

## Tech Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- Motion
- Lucide React
- Express API server
- Google Gemini API (`@google/genai`)
- `pdf-parse` (mini-RAG CV context)

## Features

- 4/6 hero layout balance with vertical centered alignment
- Horizontal categorized project scroller with hidden scrollbar
- Responsive UI across desktop and mobile
- Bilingual translation support (Vietnamese/English)
- Contact actions with verified external links (GitHub, LinkedIn)
- CV-grounded chatbot with local fallback mode when API key is missing

## Run Locally

1. Clone repository

```bash
git clone https://github.com/laninh-tech/AI-Engineer-Portfolio.git
cd AI-Engineer-Portfolio
```

2. Install dependencies

```bash
npm install
```

3. Configure environment file

```env
GEMINI_API_KEY=your_gemini_api_key
```

4. Start development server

```bash
npm run dev
```

5. Build for production

```bash
npm run build
```

## Project Structure

```text
public/
  CV_LaQuangNinh.pdf
  assets/images/portrait.jpg
src/
  components/      # UI modules (chat, contact, layout, projects, ui)
  data/            # Static data and project metadata
  locales/         # Translation dictionaries
  styles/          # Shared spacing/layout styles
  App.tsx
  main.tsx
  index.css
server.ts          # API routes: health, contact, chat
cvKnowledge.ts     # CV parsing + retrieval logic
cvProfileData.ts   # Fallback profile facts
```

## Scripts

- `npm run dev`: run local app server
- `npm run lint`: run TypeScript checks
- `npm run build`: create production build

## Notes

- Keep real keys in `.env.local`, never commit secrets.
- If CV text extraction is sparse, chatbot automatically uses fallback profile data.
