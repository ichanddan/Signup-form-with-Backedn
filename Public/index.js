document.addEventListener("DOMContentLoaded", () => {
  // Get the form, file input, and preview image elements
  const form = document.querySelector("form");
  const fileInput = document.querySelector("#userPhoto");
  const photoPreview = document.querySelector("#photoPreview");

  // Attach a change event listener to the file input
  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();

      // Load the file and set it as the src of the preview image
      reader.onload = (event) => {
        photoPreview.src = event.target.result;
        photoPreview.style.display = "block"; // Show the preview
      };

      reader.readAsDataURL(file); // Read the file as a Data URL
    } else {
      // Hide the preview if no file is selected
      photoPreview.style.display = "none";
      photoPreview.src = "";
    }
  });

  // Attach a submit event listener to the form
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get the submit button
    const button = form.querySelector("button");
    button.disabled = true;
    button.textContent = "Submitting...";

    const formData = new FormData();

    // Append form field values to FormData
    const fullName = document.querySelector('input[name="fullname"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    if (!fullName || !email || !password) {
      window.alert("All fields are required.");
      button.disabled = false;
      button.textContent = "Sign Up";
      return;
    }

    if (fileInput.files.length > 0) {
      formData.append("userPhoto", fileInput.files[0]);
    }
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);

    fetch("http://localhost:3000/post-data", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Server error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data?.message)
        window.alert(data?.message);
        form.reset();
        photoPreview.style.display = "none"; // Hide the preview
        photoPreview.src = "";
        button.disabled = false;
        button.textContent = "Sign Up";
      })
      .catch((error) => {
        console.error("Error:", error);
        window.alert("An error occurred. Please try again.");
        button.disabled = false;
        button.textContent = "Sign Up";
      });
  });
});
