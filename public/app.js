// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC9CjEBnI0wWSzvPsyD9IorHYbtHxZOH1s",
  authDomain: "movie-search-app-7d6db.firebaseapp.com",
  projectId: "movie-search-app-7d6db",
  storageBucket: "movie-search-app-7d6db.firebasestorage.app",
  messagingSenderId: "490617744748",
  appId: "1:490617744748:web:384d4ccdc66fc0582f1749",
  measurementId: "G-7GF6HFZ744"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const authSection = document.getElementById('auth-section');
const appSection = document.getElementById('app');
const logoutBtn = document.getElementById('logout-btn');
const authMessage = document.getElementById('auth-message');

// Signup function
function signup() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  if (!email || !password) {
    authMessage.innerText = 'Please enter email and password.';
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      authMessage.innerText = 'Signup successful! You can now log in.';
    })
    .catch(e => {
      authMessage.innerText = e.message;
    });
}

// Login function
function login() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  if (!email || !password) {
    authMessage.innerText = 'Please enter email and password.';
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      authMessage.innerText = '';
    })
    .catch(e => {
      authMessage.innerText = e.message;
    });
}

// Logout function
function logout() {
  auth.signOut().then(() => {
    authMessage.innerText = 'Logged out.';
  });
}

// Check auth state on page load
auth.onAuthStateChanged(user => {
  if (user) {
    authSection.style.display = 'none';
    appSection.style.display = 'block';
    logoutBtn.style.display = 'inline';
  } else {
    authSection.style.display = 'block';
    appSection.style.display = 'none';
    logoutBtn.style.display = 'none';
  }
});

// Search movie function
async function searchMovie() {
  const title = document.getElementById('search').value.trim();
  if (!title) {
    alert('Enter a movie title');
    return;
  }

  try {
    const res = await fetch(`/api/movies?title=${encodeURIComponent(title)}`);
    const data = await res.json();

    if (data.Response === "False") {
      document.getElementById('movie-details').innerHTML = `<p>Movie not found.</p>`;
      return;
    }

    document.getElementById('movie-details').innerHTML = `
      <div class="movie">
        <h3>${data.Title} (${data.Year})</h3>
        <p><strong>Genre:</strong> ${data.Genre}</p>
        <p><strong>Cast:</strong> ${data.Actors}</p>
        <p><strong>Plot:</strong> ${data.Plot}</p>
        <p><strong>Rating:</strong> ${data.imdbRating}</p>
      </div>
    `;
  } catch (error) {
    document.getElementById('movie-details').innerHTML = `<p>Error fetching movie data.</p>`;
  }
}
