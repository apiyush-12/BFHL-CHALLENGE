# BFHL Challenge Backend

This is the backend for the SRM Full Stack Engineering Challenge.

## Requirements
- Node.js

## Setup

1. Open a terminal in the `backend` folder.
2. Run `npm install` to install dependencies.
3. Start the server with `npm start` (or `npm run dev` for nodemon).

## API Endpoints

### POST /bfhl
Processes a list of hierarchical edges.

**Request Body:**
```json
{
  "data": ["A->B", "A->C", "B->D"]
}
```

**Response:**
```json
{
  "user_id": "piyush_kumar_12",
  "email_id": "pk6990@srmist.edu.in",
  "college_roll_number": "RA2311029010030",
  "hierarchies": [...],
  "invalid_entries": [...],
  "duplicate_edges": [...],
  "summary": {...}
}
```
