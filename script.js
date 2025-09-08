// ============================================
// 1. THEME TOGGLE FUNCTIONALITY
// ============================================
/**
 * Handles dark/light mode toggle
 * Demonstrates: Event listeners, DOM manipulation, localStorage
 */
function initializeThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle")
  const themeIcon = document.getElementById("theme-icon")
  const body = document.body

  // Check for saved theme preference or default to light mode
  const savedTheme = localStorage.getItem("theme") || "light"

  // Apply saved theme
  if (savedTheme === "dark") {
    body.classList.add("dark-mode")
    themeIcon.textContent = "☀️"
  }

  // Theme toggle event listener
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode")

    if (body.classList.contains("dark-mode")) {
      themeIcon.textContent = "☀️"
      localStorage.setItem("theme", "dark")
      updateWelcomeMessage("Dark mode activated! 🌙")
    } else {
      themeIcon.textContent = "🌙"
      localStorage.setItem("theme", "light")
      updateWelcomeMessage("Light mode activated! ☀️")
    }
  })
}

// ============================================
// 2. DYNAMIC WELCOME MESSAGE
// ============================================
/**
 * Updates the welcome message dynamically
 * Demonstrates: DOM text manipulation, animations
 */
function updateWelcomeMessage(message) {
  const welcomeElement = document.getElementById("welcome-message")

  // Fade out current message
  welcomeElement.style.opacity = "0"

  setTimeout(() => {
    welcomeElement.textContent = message
    welcomeElement.style.opacity = "1"

    // Reset to default message after 3 seconds
    setTimeout(() => {
      welcomeElement.style.opacity = "0"
      setTimeout(() => {
        welcomeElement.textContent = "Welcome! Explore the interactive features below."
        welcomeElement.style.opacity = "1"
      }, 300)
    }, 3000)
  }, 300)
}

// ============================================
// 3. INTERACTIVE COUNTER
// ============================================
/**
 * Counter functionality with multiple event listeners
 * Demonstrates: Event handling, state management, conditional logic
 */
function initializeCounter() {
  let count = 0
  const counterDisplay = document.getElementById("counter-display")
  const increaseBtn = document.getElementById("increase-btn")
  const decreaseBtn = document.getElementById("decrease-btn")
  const resetBtn = document.getElementById("reset-btn")
  const counterMessage = document.getElementById("counter-message")

  // Update counter display and show messages
  function updateCounter() {
    counterDisplay.textContent = count

    // Show different messages based on count value
    let message = ""
    let messageClass = ""

    if (count === 0) {
      message = "Starting fresh!"
      messageClass = "success"
    } else if (count > 0 && count <= 5) {
      message = "Keep going!"
      messageClass = "success"
    } else if (count > 5) {
      message = "Wow, you're on fire!"
      messageClass = "success"
    } else if (count < 0 && count >= -5) {
      message = "Going negative..."
      messageClass = "warning"
    } else {
      message = "Deep in the negatives!"
      messageClass = "warning"
    }

    showMessage(counterMessage, message, messageClass)
  }

  // Event listeners for counter buttons
  increaseBtn.addEventListener("click", () => {
    count++
    updateCounter()

    // Add visual feedback
    increaseBtn.style.transform = "scale(0.95)"
    setTimeout(() => {
      increaseBtn.style.transform = "scale(1)"
    }, 100)
  })

  decreaseBtn.addEventListener("click", () => {
    count--
    updateCounter()

    // Add visual feedback
    decreaseBtn.style.transform = "scale(0.95)"
    setTimeout(() => {
      decreaseBtn.style.transform = "scale(1)"
    }, 100)
  })

  resetBtn.addEventListener("click", () => {
    count = 0
    updateCounter()

    // Add visual feedback
    resetBtn.style.transform = "scale(0.95)"
    setTimeout(() => {
      resetBtn.style.transform = "scale(1)"
    }, 100)
  })

  // Initialize counter display
  updateCounter()
}

// ============================================
// 4. COLLAPSIBLE FAQ SECTION
// ============================================
/**
 * FAQ accordion functionality
 * Demonstrates: Event delegation, CSS class manipulation, animations
 */
function initializeFAQ() {
  const faqContainer = document.querySelector(".faq-container")

  // Use event delegation to handle all FAQ clicks
  faqContainer.addEventListener("click", (event) => {
    const questionBtn = event.target.closest(".faq-question")

    if (questionBtn) {
      const faqItem = questionBtn.parentElement
      const targetId = questionBtn.getAttribute("data-target")
      const answer = document.getElementById(targetId)
      const icon = questionBtn.querySelector(".faq-icon")

      // Close all other FAQ items
      const allFaqItems = document.querySelectorAll(".faq-item")
      allFaqItems.forEach((item) => {
        if (item !== faqItem) {
          item.classList.remove("active")
          const otherAnswer = item.querySelector(".faq-answer")
          const otherIcon = item.querySelector(".faq-icon")
          otherAnswer.classList.remove("active")
          otherIcon.textContent = "+"
        }
      })

      // Toggle current FAQ item
      faqItem.classList.toggle("active")
      answer.classList.toggle("active")

      if (faqItem.classList.contains("active")) {
        icon.textContent = "−"
      } else {
        icon.textContent = "+"
      }
    }
  })
}

// ============================================
// 5. FORM VALIDATION SYSTEM
// ============================================
/**
 * Comprehensive form validation with real-time feedback
 * Demonstrates: Form handling, regular expressions, custom validation
 */
function initializeFormValidation() {
  const form = document.getElementById("registration-form")
  const formSuccess = document.getElementById("form-success")

  // Validation rules
  const validationRules = {
    username: {
      required: true,
      minLength: 3,
      maxLength: 20,
      pattern: /^[a-zA-Z0-9_]+$/,
      message: "Username must be 3-20 characters, letters, numbers, and underscores only",
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
    password: {
      required: true,
      minLength: 8,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      message: "Password must be 8+ characters with uppercase, lowercase, number, and special character",
    },
    age: {
      required: false,
      min: 13,
      max: 120,
      message: "Age must be between 13 and 120",
    },
    terms: {
      required: true,
      message: "You must agree to the terms and conditions",
    },
  }

  // Real-time validation for each field
  Object.keys(validationRules).forEach((fieldName) => {
    const field = document.getElementById(fieldName)
    if (field) {
      // Validate on blur (when user leaves the field)
      field.addEventListener("blur", () => validateField(fieldName))

      // Special handling for password field
      if (fieldName === "password") {
        field.addEventListener("input", () => {
          validateField(fieldName)
          checkPasswordStrength(field.value)
          // Also validate confirm password if it has a value
          const confirmPassword = document.getElementById("confirm-password")
          if (confirmPassword.value) {
            validatePasswordMatch()
          }
        })
      }

      // Special handling for confirm password
      if (fieldName === "confirm-password") {
        field.addEventListener("input", validatePasswordMatch)
      }
    }
  })

  // Form submission handler
  form.addEventListener("submit", (event) => {
    event.preventDefault()

    let isValid = true

    // Validate all fields
    Object.keys(validationRules).forEach((fieldName) => {
      if (!validateField(fieldName)) {
        isValid = false
      }
    })

    // Validate password match
    if (!validatePasswordMatch()) {
      isValid = false
    }

    if (isValid) {
      // Show success message
      form.style.display = "none"
      formSuccess.style.display = "block"

      // Update user dashboard
      updateUserDashboard()

      // Scroll to success message
      formSuccess.scrollIntoView({ behavior: "smooth" })

      updateWelcomeMessage("Registration completed successfully!")
    } else {
      updateWelcomeMessage("Please fix the errors in the form.")
    }
  })

  /**
   * Validates individual form fields
   */
  function validateField(fieldName) {
    const field = document.getElementById(fieldName)
    const errorElement = document.getElementById(`${fieldName}-error`)
    const rules = validationRules[fieldName]

    if (!field || !rules) return true

    let isValid = true
    let errorMessage = ""

    const value = field.type === "checkbox" ? field.checked : field.value.trim()

    // Required field validation
    if (rules.required && (!value || value === "")) {
      isValid = false
      errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`
    }

    // Length validation
    if (isValid && value && rules.minLength && value.length < rules.minLength) {
      isValid = false
      errorMessage = rules.message
    }

    if (isValid && value && rules.maxLength && value.length > rules.maxLength) {
      isValid = false
      errorMessage = rules.message
    }

    // Pattern validation
    if (isValid && value && rules.pattern && !rules.pattern.test(value)) {
      isValid = false
      errorMessage = rules.message
    }

    // Number range validation
    if (isValid && value && rules.min && Number.parseInt(value) < rules.min) {
      isValid = false
      errorMessage = rules.message
    }

    if (isValid && value && rules.max && Number.parseInt(value) > rules.max) {
      isValid = false
      errorMessage = rules.message
    }

    // Update field appearance and error message
    if (isValid) {
      field.classList.remove("error")
      field.classList.add("success")
      hideError(errorElement)
    } else {
      field.classList.remove("success")
      field.classList.add("error")
      showError(errorElement, errorMessage)
    }

    return isValid
  }

  /**
   * Validates password confirmation match
   */
  function validatePasswordMatch() {
    const password = document.getElementById("password")
    const confirmPassword = document.getElementById("confirm-password")
    const errorElement = document.getElementById("confirm-password-error")

    if (!password.value || !confirmPassword.value) {
      return true // Don't validate if either field is empty
    }

    const isValid = password.value === confirmPassword.value

    if (isValid) {
      confirmPassword.classList.remove("error")
      confirmPassword.classList.add("success")
      hideError(errorElement)
    } else {
      confirmPassword.classList.remove("success")
      confirmPassword.classList.add("error")
      showError(errorElement, "Passwords do not match")
    }

    return isValid
  }

  /**
   * Checks and displays password strength
   */
  function checkPasswordStrength(password) {
    const strengthElement = document.getElementById("password-strength")

    if (!password) {
      strengthElement.textContent = ""
      return
    }

    let strength = 0
    const feedback = []

    // Length check
    if (password.length >= 8) strength++
    else feedback.push("at least 8 characters")

    // Lowercase check
    if (/[a-z]/.test(password)) strength++
    else feedback.push("lowercase letter")

    // Uppercase check
    if (/[A-Z]/.test(password)) strength++
    else feedback.push("uppercase letter")

    // Number check
    if (/\d/.test(password)) strength++
    else feedback.push("number")

    // Special character check
    if (/[@$!%*?&]/.test(password)) strength++
    else feedback.push("special character")

    // Display strength
    if (strength < 3) {
      strengthElement.textContent = `Weak - Missing: ${feedback.join(", ")}`
      strengthElement.className = "password-strength weak"
    } else if (strength < 5) {
      strengthElement.textContent = `Medium - Missing: ${feedback.join(", ")}`
      strengthElement.className = "password-strength medium"
    } else {
      strengthElement.textContent = "Strong password! ✓"
      strengthElement.className = "password-strength strong"
    }
  }

  /**
   * Shows error message with animation
   */
  function showError(errorElement, message) {
    errorElement.textContent = message
    errorElement.classList.add("show")
  }

  /**
   * Hides error message
   */
  function hideError(errorElement) {
    errorElement.classList.remove("show")
    setTimeout(() => {
      errorElement.textContent = ""
    }, 200)
  }
}

// ============================================
// 6. USER DASHBOARD UPDATE
// ============================================
/**
 * Updates the user dashboard with form data
 * Demonstrates: Data collection, dynamic content generation
 */
function updateUserDashboard() {
  const dashboard = document.getElementById("user-dashboard")
  const form = document.getElementById("registration-form")
  const formData = new FormData(form)

  // Collect form data
  const userData = {
    username: formData.get("username"),
    email: formData.get("email"),
    age: formData.get("age"),
    contact: formData.get("contact"),
  }

  // Generate dashboard content
  const dashboardHTML = `
        <div class="dashboard-content">
            <div class="dashboard-item">
                <h4>Username</h4>
                <p>${userData.username}</p>
            </div>
            <div class="dashboard-item">
                <h4>Email</h4>
                <p>${userData.email}</p>
            </div>
            <div class="dashboard-item">
                <h4>Age</h4>
                <p>${userData.age || "Not specified"}</p>
            </div>
            <div class="dashboard-item">
                <h4>Preferred Contact</h4>
                <p>${userData.contact === "email" ? "Email" : "Phone"}</p>
            </div>
        </div>
    `

  dashboard.innerHTML = dashboardHTML
}

// ============================================
// 7. UTILITY FUNCTIONS
// ============================================
/**
 * Shows a message with animation
 */
function showMessage(element, message, type = "success") {
  element.textContent = message
  element.className = `message ${type} show`

  // Hide message after 3 seconds
  setTimeout(() => {
    element.classList.remove("show")
  }, 3000)
}

/**
 * Adds smooth scroll behavior to internal links
 */
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// ============================================
// 8. INITIALIZATION
// ============================================
/**
 * Initialize all interactive features when DOM is loaded
 */
document.addEventListener("DOMContentLoaded", () => {
  console.log("Interactive JavaScript Demo - Initializing...")

  // Initialize all interactive features
  initializeThemeToggle()
  initializeCounter()
  initializeFAQ()
  initializeFormValidation()
  initializeSmoothScroll()

  console.log("All interactive features initialized successfully!")

  // Add a welcome animation
  setTimeout(() => {
    updateWelcomeMessage("All systems ready! Start exploring! ")
  }, 1000)
})

// ============================================
// 9. KEYBOARD ACCESSIBILITY
// ============================================
/**
 * Enhanced keyboard navigation support
 */
document.addEventListener("keydown", (event) => {
  // ESC key to close any open FAQ items
  if (event.key === "Escape") {
    const activeFaqItems = document.querySelectorAll(".faq-item.active")
    activeFaqItems.forEach((item) => {
      item.classList.remove("active")
      const answer = item.querySelector(".faq-answer")
      const icon = item.querySelector(".faq-icon")
      answer.classList.remove("active")
      icon.textContent = "+"
    })
  }

  // Enter key on FAQ questions
  if (event.key === "Enter" && event.target.classList.contains("faq-question")) {
    event.target.click()
  }
})