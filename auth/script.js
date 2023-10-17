const baseUrl = "https://dictionary-server-six.vercel.app";
const signup_btn = document.getElementById("signup-btn");
const loader = document.querySelector(".loader");

signup_btn.addEventListener("click", (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signUp(baseUrl, username, email, password);
});

// Sending a POST request to the API
function signUp(baseUrl, username, email, password) {
  loader.style.display = "block";

  fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      if (data.message === "User registered successfully!") {
        console.log("Successful");
        // Redirect to the login page or perform other actions
        window.location.href = "../routers/login.html";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      loader.style.display = "none";
    });
}

