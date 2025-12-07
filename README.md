# 💰 Smart Expense Splitter

A simple web app to split bills and settle expenses with friends.

## Features

- Add expenses and track who paid
- Automatically split bills among participants
- See who owes whom (minimized transactions)
- Responsive design for mobile and desktop

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Styling:** Custom CSS

## Installation

1. **Backend:**
   ```bash
   cd backend
   npm install
   node server.js
   ```

2. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Open `http://localhost:5173`

## API Endpoints

- `POST /api/expenses` - Add expense
- `GET /api/expenses` - Get all expenses
- `GET /api/settlements` - Get who owes whom
- `DELETE /api/expenses/:id` - Delete expense

## Usage

1. Add an expense with description, amount, payer, and participants
2. View all expenses and settlements
3. Delete expenses as needed

---
Made with ❤️ for splitting bills easily!