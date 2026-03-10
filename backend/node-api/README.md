# Finance Tracker Backend (Node.js API)

## Prerequisites
- Node.js installed
- MySQL Server installed and running

## Setup
1. Create a database named `finance_tracker` in MySQL.
2. Run the SQL script in `db.sql` to create the tables.
3. Configure your MySQL credentials in the `.env` file.
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the server:
   ```bash
   node server.js
   ```

## API Endpoints

### Auth
- `POST /api/auth/register` - Create a new user
- `POST /api/auth/login` - Login and get JWT token

### Transactions (Requires JWT)
- `GET /api/transactions` - Get all transactions (supports `month`, `type`, `search` query params)
- `POST /api/transactions` - Add a new transaction
- `PUT /api/transactions/:id` - Update a transaction
- `DELETE /api/transactions/:id` - Delete a transaction
- `GET /api/transactions/stats` - Get dashboard stats (Total income, expense, balance, and categorization)

### Reports (Requires JWT)
- `GET /api/reports/excel` - Download transactions as Excel
- `GET /api/reports/pdf` - Download transactions as PDF
