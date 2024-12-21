document.addEventListener("DOMContentLoaded", () => {
  // Get the form element
  const form = document.querySelector("form");
  const button = form.querySelector("button"); // Get the submit button

  // Attach a submit event listener to the form
  form.addEventListener("submit", (event) => {
    // Prevent the form from submitting to the server
    event.preventDefault();

    // Show loader
    button.disabled = true;
    button.textContent = "Submitting...";

    // Create a FormData object to hold the form data
    const formData = new FormData();

    // Append form field values to FormData
    const fileInput = document.querySelector('input[name="userPhoto"]');
    const fullName = document.querySelector('input[name="fullname"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    if (!fullName || !email || !password) {
      window.alert("All fields are required.");
      button.disabled = false;
      button.textContent = "Sign Up";
      return;
    }

    // Add file to FormData if it exists
    if (fileInput.files.length > 0) {
      formData.append("userPhoto", fileInput.files[0]);
    }
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);

    // Send data to the server using fetch
    fetch("http://localhost:3000/post-data", {
      method: "POST",
      body: formData, // Pass FormData object directly
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Server error");
        }
        return response.json();
      })
      .then((data) => {
        window.alert(data?.message);

        // Clear the form fields
        form.reset();

        // Reset the button
        button.disabled = false;
        button.textContent = "Sign Up";
      })
      .catch((error) => {
        console.error("Error:", error);
        window.alert("An error occurred. Please try again.");

        // Reset the button
        button.disabled = false;
        button.textContent = "Sign Up";
      });
  });
});
