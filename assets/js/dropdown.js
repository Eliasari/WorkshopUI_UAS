// Add this JavaScript file to handle dropdown functionality
document.addEventListener("DOMContentLoaded", () => {
  // Get all profile dropdown triggers
  const profileDropdowns = document.querySelectorAll(".group")

  profileDropdowns.forEach((dropdown) => {
    const dropdownMenu = dropdown.querySelector(".group-hover\\:block")

    if (dropdownMenu) {
      // Add a small delay before hiding the dropdown
      let timeoutId

      // Show dropdown on hover
      dropdown.addEventListener("mouseenter", () => {
        clearTimeout(timeoutId)
        dropdownMenu.classList.remove("hidden")
      })

      // Hide dropdown when mouse leaves with a delay
      dropdown.addEventListener("mouseleave", () => {
        timeoutId = setTimeout(() => {
          dropdownMenu.classList.add("hidden")
        }, 300) // 300ms delay before hiding
      })

      // Keep dropdown visible when hovering over it
      dropdownMenu.addEventListener("mouseenter", () => {
        clearTimeout(timeoutId)
      })

      // Hide dropdown when mouse leaves it
      dropdownMenu.addEventListener("mouseleave", () => {
        timeoutId = setTimeout(() => {
          dropdownMenu.classList.add("hidden")
        }, 300)
      })
    }
  })
})
