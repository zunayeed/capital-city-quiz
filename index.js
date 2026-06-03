// ============================================================
// IMPORTS & SETUP
// ============================================================

// 2. Import Express framework to create the web server and handle routing
import express from "express";

// 3. Import body-parser middleware to parse incoming HTML form data (req.body)
import bodyParser from "body-parser";

// 4. Import the 'pg' (node-postgres) library to connect and query PostgreSQL
import pg from "pg";

// 1. Load environment variables instantly
// Reads the .env file and injects all key=value pairs into process.env
// Must be imported early so process.env.DB_PASSWORD is available before pg.Client is created
import 'dotenv/config'; 

// ============================================================
// EXPRESS APP INITIALIZATION
// ============================================================

// Initialize Express application instance
// 'app' is the central object used to define routes, middleware, and start the server
const app = express();

// Define the port number the server will listen on
// All incoming HTTP requests to http://localhost:3000 will be handled by this app
const port = 3000;

// ============================================================
// DATABASE CLIENT CONFIGURATION
// ============================================================

// Create a new PostgreSQL client instance with connection credentials
// pg.Client represents a single persistent connection to the database
const db = new pg.Client({
  user: "postgres",         // PostgreSQL username
  host: "localhost",        // DB is running locally on this machine
  database: "world",        // The specific database to connect to (contains the 'capitals' table)
  password: process.env.DB_PASSWORD,  // Password is securely loaded from .env file (never hardcoded)
  port: 5432,               // Default PostgreSQL port
});

// ============================================================
// DATABASE CONNECTION & INITIAL DATA FETCH
// ============================================================

// Open the connection to the PostgreSQL server
// This must be called before any queries can be executed
db.connect()

// Immediately query the 'capitals' table to load all country-capital pairs into memory
// This runs once at server startup to populate the quiz array from the database
db.query("SELECT * FROM capitals", (err, res) => {
  // If the query fails, log the full error stack for debugging
  // The quiz array will remain as the hardcoded fallback data below
if(err) {
console.error("Error executing query", err.stack);
}else {
  // If successful, overwrite the quiz array with live data from the database
  // res.rows is an array of row objects: [{ country: "...", capital: "..." }, ...]
quiz = res.rows;
}
// Close the database connection after the initial data fetch is complete
// Since all quiz data is now in memory, no further DB queries are needed
db.end();
});

// ============================================================
// QUIZ DATA (FALLBACK / INITIAL PLACEHOLDER)
// ============================================================

// Quiz data: an array of country-capital pairs used as question bank
// Note: "New York" is listed as the US capital here, but the actual capital is Washington D.C.
// This array acts as a fallback if the DB query fails, and gets overwritten on success
let quiz = [
  { country: "France", capital: "Paris" },
  { country: "United Kingdom", capital: "London" },
  { country: "United States of America", capital: "New York" },
];

// ============================================================
// SESSION STATE VARIABLES
// ============================================================

// Tracks the number of correct answers in the current session
// Resets to 0 every time the user visits the home page (GET /)
let totalCorrect = 0;

// ============================================================
// MIDDLEWARE CONFIGURATION
// ============================================================

// Middleware
// Parse URL-encoded form data submitted via HTML forms (e.g., req.body.answer)
// 'extended: true' allows parsing of nested objects in form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS, images, client-side JS) from the "public" directory
// Any file in /public is accessible directly via its filename in the browser
app.use(express.static("public"));

// ============================================================
// SHARED STATE — CURRENT QUESTION
// ============================================================

// Holds the currently active question object { country, capital }
// Shared across requests since this is a single-user, single-session app
// Updated by nextQuestion() before every render
let currentQuestion = {};

// ============================================================
// ROUTES
// ============================================================

// GET home page
// Resets the score, picks a new random question, and renders the quiz UI
app.get("/", async (req, res) => {
  totalCorrect = 0; // Reset score on every new session (fresh page load)
  await nextQuestion(); // Pick the first random question
  console.log(currentQuestion); // Debug: log the selected question to the console
  res.render("index.ejs", { question: currentQuestion }); // Render view with the current question
});

// POST a new post
// Handles answer submission: validates the answer, updates the score,
// advances to the next question, and re-renders the page with feedback
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim(); // Get the user's answer and remove leading/trailing whitespace
  let isCorrect = false; // Default assumption: the answer is wrong

  // Case-insensitive comparison between user's answer and the correct capital
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++; // Increment correct answer counter
    console.log(totalCorrect); // Debug: log updated score
    isCorrect = true; // Mark this submission as correct
  }

  // Advance to the next random question before re-rendering
  nextQuestion();

  // Re-render the quiz page with:
  // - the new question
  // - whether the previous answer was correct (for feedback display)
  // - the updated total score
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

// ============================================================
// HELPER FUNCTION — NEXT QUESTION
// ============================================================

// Selects a random country-capital pair from the quiz array
// and sets it as the currentQuestion for the next render cycle
async function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)]; // Pick a random index

  currentQuestion = randomCountry; // Update the shared currentQuestion state
}

// ============================================================
// SERVER STARTUP
// ============================================================

// Start the Express server and log the local URL for easy access
// The server begins accepting incoming HTTP requests on the defined port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});