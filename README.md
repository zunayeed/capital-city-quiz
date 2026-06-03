# 🌍 Capital City Quiz

A full-stack geography quiz web app where you're shown a country name and must correctly type its capital city. Built with Node.js, Express, PostgreSQL, and EJS — with animated feedback, live score tracking, and a game-over screen.

---

## 📸 Preview

> A white quiz card floats over a background image. The country name is displayed, you type the capital, hit **SUBMIT**, and get instant ✔ / ✖ animated feedback. One wrong answer ends the game and shows your final score.

---

## 🚀 Features

- 🎲 **Random questions** drawn from a PostgreSQL database of world capitals
- ✅ **Animated feedback** — green checkmark on correct, red cross on wrong
- 🏆 **Live score tracking** — score increments with every correct answer
- 💥 **Game over on first wrong answer** — displays final score with a Restart button
- 🔒 **Secure credentials** — database password stored in `.env`, never hardcoded
- 📱 **Responsive layout** — centered card UI scales across screen sizes

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Runtime    | Node.js                              |
| Framework  | Express.js                           |
| Templating | EJS (Embedded JavaScript)            |
| Database   | PostgreSQL (`pg` / node-postgres)    |
| Styling    | Plain CSS with Flexbox + animations  |
| Security   | dotenv (`process.env` for secrets)   |

---

## 📁 Project Structure

```
capital-city-quiz/
├── public/
│   ├── images/
│   │   └── background.jpg       # Full-page background image
│   └── styles/
│       └── main.css             # All styling and keyframe animations
├── views/
│   └── index.ejs                # Main quiz page template
├── .env                         # Secret credentials (not committed to Git)
├── .gitignore                   # Excludes node_modules, .env, etc.
├── index.js                     # Express server, routes, DB connection
└── package.json                 # Project metadata and dependencies
```

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18+
- [PostgreSQL](https://www.postgresql.org/) v14+

---

## 🗄️ Database Setup

1. Open your PostgreSQL shell (`psql`) and run:

```sql
CREATE DATABASE world;

\c world

CREATE TABLE capitals (
  id SERIAL PRIMARY KEY,
  country VARCHAR(255) NOT NULL,
  capital VARCHAR(255) NOT NULL
);

INSERT INTO capitals (country, capital) VALUES
  ('France', 'Paris'),
  ('United Kingdom', 'London'),
  ('Germany', 'Berlin'),
  ('Japan', 'Tokyo'),
  ('Australia', 'Canberra');
  -- Add more rows as needed
```

---

## 🔧 Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/your-username/capital-city-quiz.git
cd capital-city-quiz
```

2. **Install dependencies**
```bash
npm install
```

3. **Create your `.env` file** in the project root:
```
DB_PASSWORD=your_postgres_password_here
```

4. **Start the server**
```bash
node index.js
```

5. **Open the app** in your browser:
```
http://localhost:3000
```

---

## 🔐 Environment Variables

| Variable      | Description                        |
|---------------|------------------------------------|
| `DB_PASSWORD` | PostgreSQL password for the `postgres` user |



---

## 🎮 How to Play

1. A **country name** appears on the card
2. Type the **capital city** in the input field
3. Click **SUBMIT** (or press Enter)
4. ✔ Correct → score increases, next country appears
5. ✖ Wrong → game over, final score displayed
6. Click **Restart** to play again from score 0

---

## 🐛 Known Issues / Limitations

- The DB connection uses `pg.Client` (single connection) with `db.end()` after the initial fetch — suitable for a learning project; upgrade to `pg.Pool` for production use
- The server must finish the initial DB query before it's ready to handle requests — currently managed by starting `app.listen()` inside the query callback
- No user authentication — score is session-based and resets on page refresh

---

## 🌱 Possible Improvements

- [ ] Replace `pg.Client` with `pg.Pool` for robust connection management
- [ ] Add a high score leaderboard persisted in the database
- [ ] Add difficulty levels (hint system, multiple choice mode)
- [ ] Add a timer per question
- [ ] Mobile touch optimization
- [ ] Add more countries to the database

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

