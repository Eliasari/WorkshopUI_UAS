// User management functionality
document.addEventListener("DOMContentLoaded", () => {
  // Sample user data
  const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Aktif", date: "12/01/2023" },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Customer",
      status: "Aktif",
      date: "15/02/2023",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.j@example.com",
      role: "Tailor",
      status: "Tidak Aktif",
      date: "03/03/2023",
    },
    {
      id: 4,
      name: "Emily Wilson",
      email: "emily.w@example.com",
      role: "Customer",
      status: "Aktif",
      date: "22/03/2023",
    },
    {
      id: 5,
      name: "Michael Brown",
      email: "michael.b@example.com",
      role: "Customer",
      status: "Aktif",
      date: "05/04/2023",
    },
  ]

  // Search functionality
  const searchUser = document.getElementById("searchUser")
  if (searchUser) {
    searchUser.addEventListener("input", () => {
      filterUsers()
    })
  }

  // Role filter
  const roleFilter = document.getElementById("roleFilter")
  if (roleFilter) {
    roleFilter.addEventListener("change", () => {
      filterUsers()
    })
  }

  // Status filter
  const statusFilter = document.getElementById("statusFilter")
  if (statusFilter) {
    statusFilter.addEventListener("change", () => {
      filterUsers()
    })
  }

  // Filter users based on search and filters
  function filterUsers() {
    const searchTerm = searchUser.value.toLowerCase()
    const roleValue = roleFilter.value
    const statusValue = statusFilter.value

    // Filter logic would go here in a real application
    console.log(`Filtering with search: ${searchTerm}, role: ${roleValue}, status: ${statusValue}`)

    // This would update the table with filtered results
  }

  // Handle user form submission
  const userForm = document.getElementById("userForm")
  if (userForm) {
    userForm.addEventListener("input", (e) => {
      if (e.target.id === "userName") {
        updateUserInitials(e.target.value)
      }
    })
  }

  // Update user initials in the avatar
  function updateUserInitials(name) {
    const userInitials = document.getElementById("userInitials")
    if (userInitials && name) {
      const nameParts = name.split(" ")
      if (nameParts.length > 1) {
        userInitials.textContent = (nameParts[0][0] + nameParts[1][0]).toUpperCase()
      } else if (nameParts.length === 1 && nameParts[0].length > 0) {
        userInitials.textContent = nameParts[0][0].toUpperCase()
      } else {
        userInitials.textContent = "AD"
      }
    }
  }

  // Tab functionality for user categories
  function changeActiveTab(event, tabID) {
    // This would be implemented to switch between different user categories
    console.log(`Changing to tab: ${tabID}`)
  }

  // Make the function available globally
  window.changeActiveTab = changeActiveTab
})
