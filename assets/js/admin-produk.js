document.addEventListener("DOMContentLoaded", () => {
  // Mobile sidebar toggle
  const sidebarButton = document.getElementById("sidebarButton")
  const mobileSidebar = document.getElementById("mobileSidebar")
  const sidebarOverlay = document.getElementById("sidebarOverlay")
  const closeMobileSidebar = document.getElementById("closeMobileSidebar")

  if (sidebarButton) {
    sidebarButton.addEventListener("click", () => {
      mobileSidebar.classList.remove("-translate-x-full")
      sidebarOverlay.classList.remove("hidden")
    })
  }

  if (closeMobileSidebar) {
    closeMobileSidebar.addEventListener("click", () => {
      mobileSidebar.classList.add("-translate-x-full")
      sidebarOverlay.classList.add("hidden")
    })
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", () => {
      mobileSidebar.classList.add("-translate-x-full")
      sidebarOverlay.classList.add("hidden")
    })
  }

  // Product Modal
  const addProductButton = document.getElementById("addProductButton")
  const productModal = document.getElementById("productModal")
  const closeProductModal = document.getElementById("closeProductModal")
  const cancelProductButton = document.getElementById("cancelProductButton")
  const productForm = document.getElementById("productForm")
  const modalTitle = document.getElementById("modalTitle")
  const productId = document.getElementById("productId")

  // Delete Modal
  const deleteModal = document.getElementById("deleteModal")
  const cancelDeleteButton = document.getElementById("cancelDeleteButton")
  const confirmDeleteButton = document.getElementById("confirmDeleteButton")
  let productToDelete = null

  // Edit Product Buttons
  const editProductButtons = document.querySelectorAll(".edit-product")

  // Delete Product Buttons
  const deleteProductButtons = document.querySelectorAll(".delete-product")

  // Image Preview
  const productImage = document.getElementById("productImage")
  const previewImage = document.getElementById("previewImage")

  // Open Add Product Modal
  if (addProductButton) {
    addProductButton.addEventListener("click", () => {
      modalTitle.textContent = "Tambah Produk Baru"
      productId.value = ""
      productForm.reset()
      previewImage.src = "../assets/images/cloth-1.png"
      productModal.classList.remove("hidden")
    })
  }

  // Close Product Modal
  if (closeProductModal) {
    closeProductModal.addEventListener("click", () => {
      productModal.classList.add("hidden")
    })
  }

  if (cancelProductButton) {
    cancelProductButton.addEventListener("click", () => {
      productModal.classList.add("hidden")
    })
  }

  // Handle Product Form Submit
  if (productForm) {
    productForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Here you would normally send the form data to the server
      // For demo purposes, we'll just close the modal

      // Show success notification
      showNotification("Produk berhasil disimpan!", "success")

      // Close modal
      productModal.classList.add("hidden")
    })
  }

  // Edit Product
  if (editProductButtons) {
    editProductButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const productId = this.getAttribute("data-id")

        // In a real application, you would fetch the product data from the server
        // For demo purposes, we'll just populate with dummy data

        document.getElementById("productId").value = productId
        document.getElementById("productName").value = "Eco-Friendly T-Shirt"
        document.getElementById("productCategory").value = "tops"
        document.getElementById("productSKU").value = "PRD-001"
        document.getElementById("productDescription").value =
          "A sustainable and eco-friendly t-shirt made from organic cotton."
        document.getElementById("productPrice").value = "199000"
        document.getElementById("productStock").value = "45"
        document.getElementById("productStatus").value = "active"

        modalTitle.textContent = "Edit Produk"
        productModal.classList.remove("hidden")
      })
    })
  }

  // Delete Product
  if (deleteProductButtons) {
    deleteProductButtons.forEach((button) => {
      button.addEventListener("click", function () {
        productToDelete = this.getAttribute("data-id")
        deleteModal.classList.remove("hidden")
      })
    })
  }

  // Cancel Delete
  if (cancelDeleteButton) {
    cancelDeleteButton.addEventListener("click", () => {
      deleteModal.classList.add("hidden")
      productToDelete = null
    })
  }

  // Confirm Delete
  if (confirmDeleteButton) {
    confirmDeleteButton.addEventListener("click", () => {
      // Here you would normally send a delete request to the server
      // For demo purposes, we'll just close the modal

      showNotification("Produk berhasil dihapus!", "success")

      deleteModal.classList.add("hidden")
      productToDelete = null
    })
  }

  // Image Preview
  if (productImage) {
    productImage.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader()

        reader.onload = (e) => {
          previewImage.src = e.target.result
        }

        reader.readAsDataURL(e.target.files[0])
      }
    })
  }

  // Search Products
  const searchProducts = document.getElementById("searchProducts")
  if (searchProducts) {
    searchProducts.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase()
      const tableRows = document.querySelectorAll("tbody tr")

      tableRows.forEach((row) => {
        const productName = row.querySelector("td:nth-child(2) div:first-child").textContent.toLowerCase()
        const productSKU = row.querySelector("td:nth-child(2) div:last-child").textContent.toLowerCase()

        if (productName.includes(searchTerm) || productSKU.includes(searchTerm)) {
          row.style.display = ""
        } else {
          row.style.display = "none"
        }
      })
    })
  }

  // Filter Products
  const categoryFilter = document.getElementById("categoryFilter")
  const statusFilter = document.getElementById("statusFilter")
  const resetFilters = document.getElementById("resetFilters")

  function applyFilters() {
    const category = categoryFilter.value.toLowerCase()
    const status = statusFilter.value.toLowerCase()
    const tableRows = document.querySelectorAll("tbody tr")

    tableRows.forEach((row) => {
      const rowCategory = row.querySelector("td:nth-child(3) div").textContent.toLowerCase()
      const rowStatus = row.querySelector("td:nth-child(6) span").textContent.toLowerCase()

      let showRow = true

      if (category && !rowCategory.includes(category)) {
        showRow = false
      }

      if (status && !rowStatus.includes(status)) {
        showRow = false
      }

      row.style.display = showRow ? "" : "none"
    })
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", applyFilters)
  }

  if (statusFilter) {
    statusFilter.addEventListener("change", applyFilters)
  }

  if (resetFilters) {
    resetFilters.addEventListener("click", () => {
      categoryFilter.value = ""
      statusFilter.value = ""

      const tableRows = document.querySelectorAll("tbody tr")
      tableRows.forEach((row) => {
        row.style.display = ""
      })
    })
  }

  // Notification function
  function showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div")
    notification.className = `fixed top-4 right-4 px-4 py-2 rounded-md text-white z-50 ${type === "success" ? "bg-green-500" : "bg-blue-500"} shadow-lg transition-all duration-500 transform translate-y-0 opacity-100`
    notification.textContent = message

    // Add to DOM
    document.body.appendChild(notification)

    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.replace("translate-y-0", "-translate-y-12")
      notification.classList.replace("opacity-100", "opacity-0")

      setTimeout(() => {
        document.body.removeChild(notification)
      }, 500)
    }, 3000)
  }
})
