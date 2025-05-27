<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body>

  <h1>📚 Book Review API</h1>
  <p>A RESTful API built with Node.js, Express, MongoDB, and JWT for a Book Review platform. Authenticated users can add books and submit one review per book. Public users can view books, reviews, and search by title, author, or genre.</p>

  <div class="section">
    <h2>🚀 Tech Stack</h2>
    <ul>
      <li><b>Backend:</b> Node.js, Express.js</li>
      <li><b>Database:</b> MongoDB (Mongoose)</li>
      <li><b>Authentication:</b> JWT</li>
      <li><b>Security:</b> Helmet, CORS</li>
      <li><b>Validation:</b> Mongoose validation</li>
      <li><b>Tools:</b> Postman, dotenv</li>
    </ul>
  </div>

  <div class="section">
    <h2>🧑‍💻 Features</h2>
    <h3>🔐 Authentication</h3>
    <ul>
      <li><code>POST /api/auth/signup</code> — Register new user</li>
      <li><code>POST /api/auth/login</code> — Login and receive JWT token</li>
    </ul>
    <h3>📚 Books</h3>
    <ul>
      <li><code>POST /api/books</code> — Add a new book <span class="badge">auth</span></li>
      <li><code>GET /api/books</code> — Get all books (pagination + filters)</li>
      <li><code>GET /api/books/:id</code> — Get book by ID (includes reviews and avg rating)</li>
      <li><code>GET /api/books/search?query=...</code> — Search books</li>
    </ul>
    <h3>✍️ Reviews</h3>
    <ul>
      <li><code>POST /api/books/:id/reviews</code> — Submit review <span class="badge">auth</span></li>
      <li><code>PUT /api/reviews/:id</code> — Update review <span class="badge">auth</span></li>
      <li><code>DELETE /api/reviews/:id</code> — Delete review <span class="badge">auth</span></li>
      <li><code>GET /api/reviews/book/:id</code> — Paginated reviews for a book</li>
    </ul>
  </div>

  <div class="section">
    <h2>🛠️ Setup Instructions</h2>
    <ol>
      <li>Clone repo: <code>git clone https://github.com/your-username/book-review-api.git</code></li>
      <li>Navigate: <code>cd book-review-api</code></li>
      <li>Install dependencies: <code>npm install</code></li>
      <li>Create a <code>.env</code> file:
        <pre><code>PORT=5000
MONGO_URI=mongodb://localhost:27017/book-review-db
JWT_SECRET=your_jwt_secret</code></pre>
      </li>
      <li>Run the server: <code>npm run dev</code></li>
    </ol>
  </div>

  <div class="section">
    <h2>📬 Example API Requests</h2>
    <h3>🔐 Register</h3>
    <pre><code>POST /api/auth/signup
{
  "username": "arun123",
  "password": "password123"
}</code></pre>
    <h3>🔐 Login</h3>
    <pre><code>POST /api/auth/login
{
  "username": "arun123",
  "password": "password123"
}</code></pre>
    <h3>📚 Add Book</h3>
    <pre><code>POST /api/books
Authorization: Bearer <token>
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "genre": "Self-help"
}</code></pre>
    <h3>🔍 Search Books</h3>
    <pre><code>GET /api/books/search?query=arun</code></pre>
  </div>

  <div class="section">
    <h2>🧠 Design Decisions</h2>
    <ul>
      <li>Each user can review a book only once.</li>
      <li>Reviews are referenced and populated in books.</li>
      <li>Search is partial + case-insensitive.</li>
      <li>Pagination used for listing books & reviews.</li>
    </ul>
  </div>

  <div class="section">
    <h2>📂 Database Schema</h2>
    <h3>📘 Book</h3>
    <pre><code>{
  title: String,
  author: String,
  genre: String,
  reviews: [ObjectId]
}</code></pre>
    <h3>✍️ Review</h3>
    <pre><code>{
  book: ObjectId,
  user: ObjectId,
  rating: Number,
  comment: String
}</code></pre>
    <h3>👤 User</h3>
    <pre><code>{
  username: String,
  password: String
}</code></pre>
  </div>

  <div class="section">
    <h2>✅ Author</h2>
    <p><b>Arun Yadav</b><br/>B.Tech Final Year, MMMUT</p>
    <p>Feel free to fork this repo and contribute! 🚀</p>
  </div>

</body>
</html>
