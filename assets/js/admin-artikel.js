/**
 * Rewear.co Admin Panel - Article Management JavaScript
 */

// Declare Quill variable
const Quill = window.Quill

// Declare showNotification function
function showNotification(message, type) {
  console.log(`Notification (${type}): ${message}`)
}

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Quill editor if it exists
  if (document.getElementById("editor")) {
    const quill = new Quill("#editor", {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ color: [] }, { background: [] }],
          ["link", "image"],
          ["clean"],
        ],
      },
      placeholder: "Tulis konten artikel di sini...",
    })
    window.quill = quill // Assign to window for global access
  }

  // Article filtering and sorting
  const setupArticleFilters = () => {
    const categoryFilter = document.getElementById("category-filter")
    const statusFilter = document.getElementById("status-filter")
    const sortBy = document.getElementById("sort-by")
    const searchField = document.getElementById("search-field")

    if (categoryFilter && statusFilter) {
      const filterArticles = () => {
        const category = categoryFilter.value.toLowerCase()
        const status = statusFilter.value.toLowerCase()
        const rows = document.querySelectorAll("tbody tr")

        rows.forEach((row) => {
          let showRow = true

          if (category) {
            const rowCategory = row.querySelector('td[data-column="category"] span').textContent.trim().toLowerCase()
            if (!rowCategory.includes(category)) {
              showRow = false
            }
          }

          if (status) {
            const rowStatus = row.querySelector('td[data-column="status"] span').textContent.trim().toLowerCase()
            if (rowStatus !== status) {
              showRow = false
            }
          }

          row.style.display = showRow ? "" : "none"
        })
      }

      categoryFilter.addEventListener("change", filterArticles)
      statusFilter.addEventListener("change", filterArticles)
    }

    if (sortBy) {
      sortBy.addEventListener("change", function () {
        const value = this.value
        const tbody = document.querySelector("tbody")
        const rows = Array.from(tbody.querySelectorAll("tr"))

        rows.sort((a, b) => {
          if (value === "newest" || value === "oldest") {
            const dateA = new Date(a.querySelector('td[data-column="date"]').textContent.trim())
            const dateB = new Date(b.querySelector('td[data-column="date"]').textContent.trim())

            return value === "newest" ? dateB - dateA : dateA - dateB
          } else if (value === "title-asc" || value === "title-desc") {
            const titleA = a.querySelector('td[data-column="title"] .text-sm.font-medium').textContent.trim()
            const titleB = b.querySelector('td[data-column="title"] .text-sm.font-medium').textContent.trim()

            return value === "title-asc" ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA)
          } else if (value === "views") {
            const viewsA = Number.parseInt(
              a.querySelector('td[data-column="views"]').textContent.trim().replace(/,/g, ""),
            )
            const viewsB = Number.parseInt(
              b.querySelector('td[data-column="views"]').textContent.trim().replace(/,/g, ""),
            )

            return viewsB - viewsA
          }

          return 0
        })

        // Clear table
        while (tbody.firstChild) {
          tbody.removeChild(tbody.firstChild)
        }

        // Add sorted rows
        rows.forEach((row) => {
          tbody.appendChild(row)
        })
      })
    }

    if (searchField) {
      searchField.addEventListener("input", function () {
        const searchTerm = this.value.toLowerCase()
        const rows = document.querySelectorAll("tbody tr")

        rows.forEach((row) => {
          const title = row.querySelector('td[data-column="title"] .text-sm.font-medium').textContent.toLowerCase()
          const excerpt = row.querySelector('td[data-column="title"] .text-sm.text-gray-500').textContent.toLowerCase()
          const author = row.querySelector('td[data-column="author"]').textContent.toLowerCase()

          if (title.includes(searchTerm) || excerpt.includes(searchTerm) || author.includes(searchTerm)) {
            row.style.display = ""
          } else {
            row.style.display = "none"
          }
        })
      })
    }
  }

  // Article modal handling
  const setupArticleModal = () => {
    const addArticleButton = document.getElementById("add-article-button")
    const editArticleButtons = document.querySelectorAll(".edit-article-button")
    const articleModal = document.getElementById("article-modal")
    const modalBackdrop = document.getElementById("modal-backdrop")
    const cancelArticleButton = document.getElementById("cancel-article-button")
    const saveArticleButton = document.getElementById("save-article-button")
    const articleForm = document.getElementById("article-form")
    const articleIdInput = document.getElementById("article-id")
    const modalTitle = document.getElementById("modal-title")

    if (addArticleButton && articleModal) {
      addArticleButton.addEventListener("click", () => {
        // Reset form
        articleForm.reset()
        articleIdInput.value = ""
        if (window.quill) {
          window.quill.root.innerHTML = ""
        }
        document.getElementById("thumbnail-image").src = "../assets/image/placeholder.jpg"
        modalTitle.textContent = "Tambah Artikel Baru"

        // Show modal
        articleModal.classList.remove("hidden")
      })
    }

    editArticleButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const articleId = this.getAttribute("data-id")
        articleIdInput.value = articleId
        modalTitle.textContent = "Edit Artikel"

        // In a real application, you would fetch the article data from the server
        // For this demo, we'll just populate with dummy data based on the article ID
        populateArticleForm(articleId)

        // Show modal
        articleModal.classList.remove("hidden")
      })
    })

    if (cancelArticleButton) {
      cancelArticleButton.addEventListener("click", () => {
        articleModal.classList.add("hidden")
      })
    }

    if (modalBackdrop) {
      modalBackdrop.addEventListener("click", () => {
        articleModal.classList.add("hidden")
      })
    }

    if (saveArticleButton) {
      saveArticleButton.addEventListener("click", () => {
        // Get content from Quill editor if it exists
        if (window.quill) {
          const content = window.quill.root.innerHTML
          document.getElementById("article-content").value = content
        }

        // Validate form
        if (validateArticleForm()) {
          // In a real application, you would submit the form data to the server
          // For this demo, we'll just show a success message and close the modal
          showNotification("Artikel berhasil disimpan", "success")
          articleModal.classList.add("hidden")
        }
      })
    }
  }

  // Delete modal handling
  const setupDeleteModal = () => {
    const deleteArticleButtons = document.querySelectorAll(".delete-article-button")
    const deleteModal = document.getElementById("delete-modal")
    const deleteModalBackdrop = document.getElementById("delete-modal-backdrop")
    const cancelDeleteButton = document.getElementById("cancel-delete-button")
    const confirmDeleteButton = document.getElementById("confirm-delete-button")
    let articleToDelete = null

    deleteArticleButtons.forEach((button) => {
      button.addEventListener("click", function () {
        articleToDelete = this.getAttribute("data-id")
        deleteModal.classList.remove("hidden")
      })
    })

    if (cancelDeleteButton) {
      cancelDeleteButton.addEventListener("click", () => {
        deleteModal.classList.add("hidden")
        articleToDelete = null
      })
    }

    if (deleteModalBackdrop) {
      deleteModalBackdrop.addEventListener("click", () => {
        deleteModal.classList.add("hidden")
        articleToDelete = null
      })
    }

    if (confirmDeleteButton) {
      confirmDeleteButton.addEventListener("click", () => {
        // In a real application, you would send a request to delete the article
        // For this demo, we'll just show a success message and close the modal
        showNotification("Artikel berhasil dihapus", "success")
        deleteModal.classList.add("hidden")

        // You might want to remove the row from the table
        if (articleToDelete) {
          const row = document.querySelector(`.delete-article-button[data-id="${articleToDelete}"]`).closest("tr")
          if (row) {
            row.remove()
          }
        }

        articleToDelete = null
      })
    }
  }

  // Thumbnail upload handling
  const setupThumbnailUpload = () => {
    const uploadThumbnailButton = document.getElementById("upload-thumbnail")
    const thumbnailUploadInput = document.getElementById("thumbnail-upload")
    const thumbnailImage = document.getElementById("thumbnail-image")

    if (uploadThumbnailButton && thumbnailUploadInput) {
      uploadThumbnailButton.addEventListener("click", () => {
        thumbnailUploadInput.click()
      })

      thumbnailUploadInput.addEventListener("change", function () {
        const file = this.files[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = (e) => {
            thumbnailImage.src = e.target.result
          }
          reader.readAsDataURL(file)
        }
      })
    }
  }

  // Helper functions
  function populateArticleForm(articleId) {
    // In a real application, you would fetch this data from the server
    const articleData = {
      1: {
        title: "Tips Merawat Pakaian Agar Tahan Lama",
        category: "tips",
        author: "Admin Rewear",
        status: "published",
        excerpt: "Panduan lengkap cara merawat pakaian agar lebih awet dan tahan lama...",
        tags: "pakaian, perawatan, tips",
        thumbnail: "../assets/image/edukasi1.jpg",
        content:
          "<h2>Tips Merawat Pakaian Agar Tahan Lama</h2><p>Pakaian adalah investasi yang perlu dirawat dengan baik agar tahan lama. Berikut adalah beberapa tips untuk merawat pakaian Anda:</p><ol><li>Cuci pakaian sesuai dengan petunjuk pada label</li><li>Gunakan deterjen yang sesuai dengan jenis kain</li><li>Jangan mencampur pakaian berwarna dengan pakaian putih</li><li>Keringkan pakaian dengan benar</li></ol>",
      },
      2: {
        title: "Sustainable Fashion: Tren Masa Depan",
        category: "sustainability",
        author: "Dian Sastro",
        status: "published",
        excerpt: "Bagaimana sustainable fashion menjadi tren yang semakin populer di kalangan milenial...",
        tags: "sustainable, fashion, trend",
        thumbnail: "../assets/image/edukasi2.jpg",
        content:
          "<h2>Sustainable Fashion: Tren Masa Depan</h2><p>Sustainable fashion atau mode berkelanjutan adalah gerakan yang semakin populer di kalangan milenial dan Gen Z. Ini bukan sekadar tren, tetapi gaya hidup yang mendukung lingkungan.</p>",
      },
    }

    const article = articleData[articleId]
    if (article) {
      document.getElementById("article-title").value = article.title
      document.getElementById("article-category").value = article.category
      document.getElementById("article-author").value = article.author
      document.getElementById("article-status").value = article.status
      document.getElementById("article-excerpt").value = article.excerpt
      document.getElementById("article-tags").value = article.tags
      document.getElementById("thumbnail-image").src = article.thumbnail

      if (window.quill) {
        window.quill.root.innerHTML = article.content
      }
    }
  }

  function validateArticleForm() {
    const articleForm = document.getElementById("article-form")
    const requiredFields = articleForm.querySelectorAll("[required]")
    let isValid = true

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false
        field.classList.add("border-red-500")
      } else {
        field.classList.remove("border-red-500")
      }
    })

    if (window.quill && !window.quill.root.innerHTML.trim()) {
      isValid = false
      document.querySelector(".ql-container").classList.add("border-red-500")
    } else if (window.quill) {
      document.querySelector(".ql-container").classList.remove("border-red-500")
    }

    if (!isValid) {
      showNotification("Harap isi semua field yang wajib diisi", "error")
    }

    return isValid
  }

  // Initialize all components
  setupArticleFilters()
  setupArticleModal()
  setupDeleteModal()
  setupThumbnailUpload()
})
