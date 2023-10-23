const baseUrl = "https://dictionary-server-six.vercel.app";
const signup_btn = document.getElementById("signup-btn");
const loader = document.querySelector(".loader");
const error_msg = document.getElementById("error"); 

signup_btn.addEventListener("click", (event) => {
  event.preventDefault();
  validateForm();
});

// Sending a POST request to the API
function signUp(baseUrl, username, email, password) {
  loader.style.visibility = "visible";

  fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "User registered successfully!") {
        console.log("Successful");
        // Redirect to the login page or perform other actions
        window.location.href = "../routers/login.html";
      }else{
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      loader.style.visibility = "hidden";
    });
}

function validateForm() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Defining a regular expression pattern for a valid email address
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if ( username.trim() == "" || email.trim() === "" || password.trim() === "") {
    alert("All the fields are required");
    return;
  }
  if (!emailPattern.test(email)) {
    alert("Invalid email format");
    return;
  }
  signUp(baseUrl, username, email, password);
}

