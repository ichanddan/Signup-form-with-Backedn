document.addEventListener("DOMContentLoaded", () => {
    // Get the form element
    const form = document.querySelector("form");
  
    // Attach a submit event listener to the form
    form.addEventListener("submit", (event) => {
      // Prevent the form from submitting to the server
      event.preventDefault();
  
      // Get the values of the input fields
      const fullName = document.querySelector('input[name="fullname"]').value;
      const email = document.querySelector('input[name="email"]').value;
      const password = document.querySelector('input[name="password"]').value;
  
      // Basic form validation
      if (!fullName || !email || !password) {
        window.alert("All fields are required.");
        return;
      }
  
      console.log(fullName, email, password);
  
      // Send data to the server using fetch
      fetch("http://localhost:3000/post-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, password }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Server error");
          }
          return response.json();
        })
        .then((data) => {
          window.alert("Success");
        })
        .catch((error) => {
          console.error("Error:", error);
          window.alert("An error occurred. Please try again.");
        });
    });
  });
  