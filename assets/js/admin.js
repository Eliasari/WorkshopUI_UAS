/**
 * Rewear.co Admin Panel JavaScript
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize tooltips
  initTooltips()

  // Initialize dropdown menus
  initDropdowns()

  // Add event listeners for form validation
  initFormValidation()

  // Initialize data tables if they exist
  if (typeof initDataTables === "function") {
    initDataTables()
  }

  // Add animation to dashboard cards
  const cards = document.querySelectorAll(".bg-white.overflow-hidden.shadow.rounded-lg")
  cards.forEach((card) => {
    card.classList.add("dashboard-card")
  })

  // Admin specific JavaScript
  // Form validation
  const validateForm = (formId) => {
    const form = document.getElementById(formId)
    if (!form) return

    form.addEventListener("submit", (e) => {
      let valid = true
      const inputs = form.querySelectorAll("input[required], select[required], textarea[required]")

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          valid = false
          input.classList.add("border-red-500")

          // Add error message if it doesn't exist
          let errorMessage = input.nextElementSibling
          if (!errorMessage || !errorMessage.classList.contains("error-message")) {
            errorMessage = document.createElement("p")
            errorMessage.className = "text-red-500 text-xs mt-1 error-message"
            errorMessage.innerText = "This field is required"
            input.parentNode.insertBefore(errorMessage, input.nextSibling)
          }
        } else {
          input.classList.remove("border-red-500")

          // Remove error message if it exists
          const errorMessage = input.nextElementSibling
          if (errorMessage && errorMessage.classList.contains("error-message")) {
            errorMessage.remove()
          }

          // Email validation
          if (input.type === "email" && !validateEmail(input.value)) {
            valid = false
            input.classList.add("border-red-500")

            let errorMessage = input.nextElementSibling
            if (!errorMessage || !errorMessage.classList.contains("error-message")) {
              errorMessage = document.createElement("p")
              errorMessage.className = "text-red-500 text-xs mt-1 error-message"
              errorMessage.innerText = "Please enter a valid email address"
              input.parentNode.insertBefore(errorMessage, input.nextSibling)
            }
          }
        }
      })

      if (!valid) {
        e.preventDefault()
      }
    })

    // Clear error state on input
    form.querySelectorAll("input, select, textarea").forEach((input) => {
      input.addEventListener("input", function () {
        this.classList.remove("border-red-500")

        const errorMessage = this.nextElementSibling
        if (errorMessage && errorMessage.classList.contains("error-message")) {
          errorMessage.remove()
        }
      })
    })
  }

  // Helper function to validate email
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  // Password strength check
  const checkPasswordStrength = (password) => {
    let strength = 0

    if (password.length >= 8) strength += 1
    if (password.match(/[a-z]+/)) strength += 1
    if (password.match(/[A-Z]+/)) strength += 1
    if (password.match(/[0-9]+/)) strength += 1
    if (password.match(/[!@#$%^&*(),.?":{}|<>]+/)) strength += 1

    return strength
  }

  // Init password strength meter
  const initPasswordStrengthMeter = () => {
    const passwordInput = document.getElementById("password")
    if (!passwordInput) return

    const strengthMeter = document.createElement("div")
    strengthMeter.className = "mt-2"

    const strengthBar = document.createElement("div")
    strengthBar.className = "h-1.5 w-full bg-gray-200 rounded-full overflow-hidden"

    const strengthIndicator = document.createElement("div")
    strengthIndicator.className = "h-full bg-gray-400 rounded-full"
    strengthIndicator.style.width = "0%"

    const strengthText = document.createElement("p")
    strengthText.className = "text-xs text-gray-500 mt-1"
    strengthText.innerText = "Password strength: Too weak"

    strengthBar.appendChild(strengthIndicator)
    strengthMeter.appendChild(strengthBar)
    strengthMeter.appendChild(strengthText)

    passwordInput.parentNode.appendChild(strengthMeter)

    passwordInput.addEventListener("input", function () {
      const strength = checkPasswordStrength(this.value)

      let width = "0%"
      let color = "bg-gray-400"
      let text = "Too weak"

      if (strength === 1) {
        width = "20%"
        color = "bg-red-500"
        text = "Weak"
      } else if (strength === 2) {
        width = "40%"
        color = "bg-orange-500"
        text = "Fair"
      } else if (strength === 3) {
        width = "60%"
        color = "bg-yellow-500"
        text = "Good"
      } else if (strength === 4) {
        width = "80%"
        color = "bg-blue-500"
        text = "Strong"
      } else if (strength === 5) {
        width = "100%"
        color = "bg-green-500"
        text = "Very strong"
      }

      strengthIndicator.className = `h-full ${color} rounded-full`
      strengthIndicator.style.width = width
      strengthText.innerText = `Password strength: ${text}`
    })
  }

  // Initialize features
  validateForm("loginForm")
  validateForm("registerForm")
  initPasswordStrengthMeter()
})

/**
 * Initialize tooltips
 */
function initTooltips() {
  const tooltips = document.querySelectorAll("[data-tooltip]")
  tooltips.forEach((tooltip) => {
    const tooltipText = tooltip.getAttribute("data-tooltip")
    const tooltipElement = document.createElement("span")
    tooltipElement.classList.add("tooltip-text")
    tooltipElement.textContent = tooltipText
    tooltip.classList.add("tooltip")
    tooltip.appendChild(tooltipElement)
  })
}

/**
 * Initialize dropdown menus
 */
function initDropdowns() {
  const dropdownButtons = document.querySelectorAll("[data-dropdown-toggle]")

  dropdownButtons.forEach((button) => {
    const targetId = button.getAttribute("data-dropdown-toggle")
    const target = document.getElementById(targetId)

    if (target) {
      button.addEventListener("click", (e) => {
        e.stopPropagation()
        target.classList.toggle("hidden")
      })
    }
  })

  // Close dropdowns when clicking outside
  document.addEventListener("click", () => {
    const openDropdowns = document.querySelectorAll("[data-dropdown]:not(.hidden)")
    openDropdowns.forEach((dropdown) => {
      dropdown.classList.add("hidden")
    })
  })
}

/**
 * Initialize form validation
 */
function initFormValidation() {
  const forms = document.querySelectorAll("form")

  forms.forEach((form) => {
    const requiredInputs = form.querySelectorAll("[required]")

    form.addEventListener("submit", (e) => {
      let isValid = true

      requiredInputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false
          highlightInvalidInput(input)
        } else {
          removeInvalidHighlight(input)
        }

        // Email validation
        if (input.type === "email" && input.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(input.value.trim())) {
            isValid = false
            highlightInvalidInput(input, "Please enter a valid email address")
          }
        }

        // Password validation
        if (input.id === "password" && input.value.trim()) {
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          if (!passwordRegex.test(input.value)) {
            isValid = false
            highlightInvalidInput(
              input,
              "Password must be at least 8 characters with uppercase, lowercase, number and special character",
            )
          }
        }

        // Confirm password validation
        if (input.id === "confirmPassword" && input.value.trim()) {
          const password = document.getElementById("password")
          if (password && input.value !== password.value) {
            isValid = false
            highlightInvalidInput(input, "Passwords do not match")
          }
        }
      })

      if (!isValid) {
        e.preventDefault()
      }
    })
  })
}

/**
 * Highlight invalid input
 * @param {HTMLElement} input - The input element
 * @param {string} message - Optional error message
 */
function highlightInvalidInput(input, message) {
  input.classList.add("border-red-500")
  input.classList.add("focus:ring-red-500")
  input.classList.add("focus:border-red-500")

  // Remove any existing error message
  const existingError = input.parentNode.querySelector(".error-message")
  if (existingError) {
    existingError.remove()
  }

  // Add error message if provided
  if (message) {
    const errorElement = document.createElement("p")
    errorElement.classList.add("error-message", "text-red-500", "text-xs", "mt-1")
    errorElement.textContent = message
    input.parentNode.appendChild(errorElement)
  }
}

/**
 * Remove invalid highlight from input
 * @param {HTMLElement} input - The input element
 */
function removeInvalidHighlight(input) {
  input.classList.remove("border-red-500")
  input.classList.remove("focus:ring-red-500")
  input.classList.remove("focus:border-red-500")

  // Remove any existing error message
  const existingError = input.parentNode.querySelector(".error-message")
  if (existingError) {
    existingError.remove()
  }
}

/**
 * Format currency
 * @param {number} amount - The amount to format
 * @param {string} currency - The currency code (default: 'IDR')
 * @returns {string} - Formatted currency string
 */
function formatCurrency(amount, currency = "IDR") {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format date
 * @param {string|Date} date - The date to format
 * @returns {string} - Formatted date string
 */
function formatDate(date) {
  const dateObj = new Date(date)
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObj)
}

/**
 * Show notification
 * @param {string} message - The notification message
 * @param {string} type - The notification type (success, error, warning, info)
 * @param {number} duration - Duration in milliseconds
 */
function showNotification(message, type = "info", duration = 3000) {
  const notificationContainer = document.getElementById("notification-container")

  // Create container if it doesn't exist
  if (!notificationContainer) {
    const container = document.createElement("div")
    container.id = "notification-container"
    container.className = "fixed top-4 right-4 z-50 flex flex-col gap-2"
    document.body.appendChild(container)
  }

  // Create notification element
  const notification = document.createElement("div")
  notification.className = "notification p-4 rounded-lg shadow-lg max-w-xs fade-in"

  // Set background color based on type
  switch (type) {
    case "success":
      notification.classList.add("bg-green-100", "text-green-800", "border-l-4", "border-green-500")
      break
    case "error":
      notification.classList.add("bg-red-100", "text-red-800", "border-l-4", "border-red-500")
      break
    case "warning":
      notification.classList.add("bg-yellow-100", "text-yellow-800", "border-l-4", "border-yellow-500")
      break
    default:
      notification.classList.add("bg-blue-100", "text-blue-800", "border-l-4", "border-blue-500")
  }

  notification.textContent = message

  // Add to container
  document.getElementById("notification-container").appendChild(notification)

  // Remove after duration
  setTimeout(() => {
    notification.style.opacity = "0"
    setTimeout(() => {
      notification.remove()
    }, 300)
  }, duration)
}

/**
 * Initialize data tables
 */
function initDataTables() {
  const tables = document.querySelectorAll(".data-table")

  tables.forEach((table) => {
    // Add sorting functionality
    const headers = table.querySelectorAll("th[data-sort]")

    headers.forEach((header) => {
      header.addEventListener("click", () => {
        const column = header.getAttribute("data-sort")
        const direction = header.getAttribute("data-direction") === "asc" ? "desc" : "asc"

        // Update direction attribute
        headers.forEach((h) => h.setAttribute("data-direction", ""))
        header.setAttribute("data-direction", direction)

        // Sort the table
        sortTable(table, column, direction)

        // Update sort indicators
        updateSortIndicators(headers)
      })
    })

    // Add search functionality
    const searchInput = table.parentNode.querySelector(".table-search")
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase()
        const rows = table.querySelectorAll("tbody tr")

        rows.forEach((row) => {
          const text = row.textContent.toLowerCase()
          row.style.display = text.includes(searchTerm) ? "" : "none"
        })
      })
    }
  })
}

/**
 * Sort table
 * @param {HTMLElement} table - The table element
 * @param {string} column - The column to sort by
 * @param {string} direction - The sort direction (asc or desc)
 */
function sortTable(table, column, direction) {
  const tbody = table.querySelector("tbody")
  const rows = Array.from(tbody.querySelectorAll("tr"))

  // Sort rows
  rows.sort((a, b) => {
    const aValue = a.querySelector(`td[data-column="${column}"]`).textContent.trim()
    const bValue = b.querySelector(`td[data-column="${column}"]`).textContent.trim()

    if (direction === "asc") {
      return aValue.localeCompare(bValue)
    } else {
      return bValue.localeCompare(aValue)
    }
  })

  // Clear table
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild)
  }

  // Add sorted rows
  rows.forEach((row) => {
    tbody.appendChild(row)
  })
}

/**
 * Update sort indicators
 * @param {NodeList} headers - The table headers
 */
function updateSortIndicators(headers) {
  headers.forEach((header) => {
    // Remove existing indicators
    const existingIndicator = header.querySelector(".sort-indicator")
    if (existingIndicator) {
      existingIndicator.remove()
    }

    const direction = header.getAttribute("data-direction")
    if (direction) {
      const indicator = document.createElement("span")
      indicator.className = "sort-indicator ml-1"
      indicator.innerHTML = direction === "asc" ? "↑" : "↓"
      header.appendChild(indicator)
    }
  })
}
