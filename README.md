# Investment Portfolio Tracker

A full-stack application for tracking investment portfolios, built with Node.js, Express, MongoDB, and Next.js.

---

## Backend Setup

### Installation

1. Clone the repository.
2. Navigate to the backend directory:
   ```bash
   cd back-end
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory with the following variables:
   ```plaintext
   PORT=8080
   NODE_ENV=development
   MONGODB_URI=mongodb://mongodb:27017/portfolio
   YF_API_KEY=your_yahoo_finance_api_key
   BASE_URL=https://yfapi.net
   TARGET_STAGE=development
   ```
5. Run with Docker:
   ```bash
   npm run docker:dev
   ```

### API Endpoints

1. **Search Instrument**
   - **Endpoint:** `GET /search/:ticker`
   - **Response:**
     ```json
     {
       "symbol": "string",
       "name": "string",
       "bid": "number",
       "ask": "number",
       "currentPrice": "number",
       "changeValue": "number",
       "changePercent": "number"
     }
     ```

2. **Buy Shares**
   - **Endpoint:** `POST /buy`
   - **Request Body:**
     ```json
     {
       "symbol": "string",
       "shares": "number"
     }
     ```
   - **Response:**
     ```json
     {
       "message": "string",
       "transaction": {
         "symbol": "string",
         "shares": "number",
         "price": "number",
         "transactionType": "buy",
         "date": "Date"
       }
     }
     ```

3. **Sell Shares**
   - **Endpoint:** `POST /sell`
   - **Request Body:**
     ```json
     {
       "symbol": "string",
       "shares": "number"
     }
     ```
   - **Response:**
     ```json
     {
       "message": "string",
       "transaction": {
         "symbol": "string",
         "shares": "number",
         "price": "number",
         "transactionType": "sell",
         "date": "Date"
       }
     }
     ```

### Project Structure
   ```plaintext
   back-end/
   ├── controllers/
   ├── models/
   ├── routes/
   ├── services/
   └── app.js
   ```

---

## Frontend Setup

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd front-end
   ```
2. Create a `.env` file:
   ```plaintext
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### Features

1. **Navigation Bar** with three main sections:
   - Home
   - Portfolio
   - Transactions
2. **Stock Search and Trading**
   - Real-time stock data lookup
   - Buy/Sell functionality
   - Transaction history
3. **Portfolio Management**
   - View current holdings
   - Track performance
   - Monitor profit/loss

### Project Structure
   ```plaintext
   front-end/
   ├── app/
   │   ├── components/
   │   │   ├── NavBar.tsx
   │   │   └── TickerSearch.tsx
   │   ├── portfolio/
   │   │   └── page.tsx
   │   ├── transactions/
   │   │   └── page.tsx
   │   ├── layout.tsx
   │   └── page.tsx
   ├── styles/
   │   └── globals.css
   ├── next.config.ts
   └── package.json
   ```
