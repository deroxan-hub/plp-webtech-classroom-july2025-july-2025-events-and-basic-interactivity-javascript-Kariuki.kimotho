// =======================
// 1. Dark/Light Mode Toggle
// =======================
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// =======================
// 2. MV Background Toggle
// =======================
const mvToggle = document.getElementById("mvToggle");
const videoBg = document.getElementById("videoBg");
const overlay = document.getElementById("overlay");

mvToggle.addEventListener("click", () => {
  videoBg.classList.toggle("hidden");
  overlay.classList.toggle("hidden");

  if (videoBg.classList.contains("hidden")) {
    mvToggle.textContent = "🎥 Show MV Background";
  } else {
    mvToggle.textContent = "🎥 Hide MV Background";
  }
});

// =======================
// 3. Counter Functionality
// =======================
let counter = 0;
const counterValue = document.getElementById("counterValue");
document.getElementById("increaseBtn").addEventListener("click", () => {
  counter++;
  counterValue.textContent = counter;
});
document.getElementById("resetBtn").addEventListener("click", () => {
  counter = 0;
  counterValue.textContent = counter;
});

// =======================
// 4. FAQ Toggle (Collapsible with Smooth Animation + Icon Rotation)
// =======================
const faqButtons = document.querySelectorAll(".faq-question");

faqButtons.forEach(button => {
  button.addEventListener("click", () => {
    const wrapper = button.nextElementSibling;
    const icon = button.querySelector(".icon");

    if (wrapper.style.maxHeight && wrapper.style.maxHeight !== "0px") {
      // Close
      wrapper.style.maxHeight = "0px";
      icon.textContent = "+"; // back to plus
      icon.classList.remove("rotate-45");
    } else {
      // Optional: close all others first
      document.querySelectorAll(".faq-answer-wrapper").forEach(w => w.style.maxHeight = "0px");
      document.querySelectorAll(".faq-question .icon").forEach(i => {
        i.textContent = "+";
        i.classList.remove("rotate-45");
      });

      // Open selected
      wrapper.style.maxHeight = wrapper.scrollHeight + "px";
      icon.textContent = "✖"; // change to close
      icon.classList.add("rotate-45"); // rotate smoothly
    }
  });
});


// =======================
// 5. Live Character Counter
// =======================
const nameInput = document.getElementById("name");
const charCount = document.getElementById("charCount");

nameInput.addEventListener("input", () => {
  charCount.textContent = `${nameInput.value.length}/20`;

  if (nameInput.value.length >= 15) {
    charCount.style.color = "#e60000";
  } else {
    charCount.style.color = "#aaa";
  }
});

// =======================
// 6. Signup Form Validation
// =======================
const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;

  // Name validation
  const name = nameInput.value.trim();
  if (name.length < 2) {
    document.getElementById("nameError").textContent = "Name must be at least 2 characters.";
    isValid = false;
  } else {
    document.getElementById("nameError").textContent = "";
  }

  // Email validation
  const email = document.getElementById("email").value.trim();
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    document.getElementById("emailError").textContent = "Enter a valid email.";
    isValid = false;
  } else {
    document.getElementById("emailError").textContent = "";
  }

  // Password validation
  const password = document.getElementById("password").value;
  if (password.length < 6) {
    document.getElementById("passwordError").textContent = "Password must be at least 6 characters.";
    isValid = false;
  } else {
    document.getElementById("passwordError").textContent = "";
  }

  // Confirm password validation
  const confirmPassword = document.getElementById("confirmPassword").value;
  if (password !== confirmPassword) {
    document.getElementById("confirmPasswordError").textContent = "Passwords do not match.";
    isValid = false;
  } else {
    document.getElementById("confirmPasswordError").textContent = "";
  }

  // Final feedback
  const formMessage = document.getElementById("formMessage");
  if (isValid) {
    formMessage.textContent = "✅ Welcome to STAY! You're now part of Stray Kids fandom!";
    formMessage.style.color = "limegreen";
    signupForm.reset();
    charCount.textContent = "0/20"; // reset counter
  } else {
    formMessage.textContent = "❌ Please fix the errors above.";
    formMessage.style.color = "red";
  }
});


// =======================
// 7. Contact Form Handling with Feedback
// =======================
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formStatus.textContent = "✅ Message sent successfully!";
        formStatus.className = "text-green-600 font-medium mt-3";
        contactForm.reset();
      } else {
        formStatus.textContent = "❌ Oops! Something went wrong. Please try again.";
        formStatus.className = "text-red-600 font-medium mt-3";
      }
    } catch (error) {
      formStatus.textContent = "❌ Network error. Please check your connection.";
      formStatus.className = "text-red-600 font-medium mt-3";
    }
  });
}


