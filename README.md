# Exam Ques Scroller (MERN)

A reel-style exam practice app for **CBSE 10th and 12th** with subject filters, no timer, 4-option MCQs, and social interactions (like, dislike, comment, share).

## Tech Stack
- **MongoDB** + **Mongoose**
- **Express.js** + **Node.js**
- **React (Vite)**
- **Open Trivia DB (external API)** for large question datasets

## Features
- Choose exam board: `CBSE 10th` / `CBSE 12th`
- Pick a subject before starting
- Pull a large question set from external API (`10-50` questions)
- Reels-like question navigation (next/previous)
- 4 options with correct answer feedback after selection
- Social actions: likes, dislikes, comments, share count
- No time limit

## Project Structure
```
server/
client/
```

## Setup
### 1) Server
```bash
cd server
npm install
cp .env.example .env
npm run dev
```

### 2) Client
```bash
cd client
npm install
npm run dev
```

Client runs on `http://localhost:5173`, server on `http://localhost:5000`.

## Environment
Create `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/exam-reels
```

Create optional `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints
- `GET /api/questions/meta`
- `GET /api/questions?board=CBSE%2010th&subject=Mathematics&source=external&amount=30`
- `POST /api/interactions/:questionId/react` with `{ "type": "like" | "dislike" | "share" }`
- `POST /api/interactions/:questionId/comment` with `{ "text": "..." }`

## Notes
- External dataset is currently fetched from [Open Trivia DB](https://opentdb.com/).
- If external API is unavailable, backend falls back to local sample/Mongo data.

## Seed Sample Questions
```bash
cd server
npm run seed
```
