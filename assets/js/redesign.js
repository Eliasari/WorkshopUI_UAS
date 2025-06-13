// Debug logging
// console.log("Redesign.js loaded")

// // Import Three.js
// const THREE = window.THREE

// // Wait for the DOM to be fully loaded
// document.addEventListener("DOMContentLoaded", () => {
//   console.log("DOM loaded, initializing redesign studio...")

//   // Check if Three.js is loaded
//   if (typeof THREE === "undefined") {
//     console.error("Three.js not loaded!")
//     document.getElementById("model-viewer").innerHTML =
//       '<div class="flex items-center justify-center h-full bg-gray-100 rounded-lg"><p class="text-red-500">Error: Three.js library not loaded</p></div>'
//     return
//   }

//   // Initialize the 3D viewer
//   initializeViewer()

//   // Initialize UI controls
//   initializeControls()

//   // Set up sample data
//   setupSampleData()
// })

// // Global variables
// let scene, camera, renderer, controls
// let tshirtModel, hoodieModel, jacketModel
// let currentModel = null
// let currentModelType = "tshirt"
// let currentColor = "#FFFFFF"
// let currentPattern = "none"
// let currentMaterial = "cotton"
// let currentAccessories = []

// // Initialize the 3D viewer
// function initializeViewer() {
//   const container = document.getElementById("model-viewer")
//   if (!container) {
//     console.error("Model viewer container not found!")
//     return
//   }

//   // Get loading container
//   const loadingContainer = document.getElementById("loading-container")

//   // Set up scene
//   scene = new THREE.Scene()
//   scene.background = new THREE.Color(0xf8f8f8)

//   // Set up camera
//   const width = container.clientWidth
//   const height = container.clientHeight || 400 // Fallback height
//   camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
//   camera.position.set(0, 0, 5)

//   // Set up renderer
//   renderer = new THREE.WebGLRenderer({ antialias: true })
//   renderer.setSize(width, height)
//   renderer.setPixelRatio(window.devicePixelRatio)
//   renderer.shadowMap.enabled = true
//   renderer.shadowMap.type = THREE.PCFSoftShadowMap
//   container.appendChild(renderer.domElement)

//   // Set up lights
//   const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
//   scene.add(ambientLight)

//   const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
//   directionalLight.position.set(2, 2, 5)
//   directionalLight.castShadow = true
//   directionalLight.shadow.mapSize.width = 1024
//   directionalLight.shadow.mapSize.height = 1024
//   scene.add(directionalLight)

//   const backLight = new THREE.DirectionalLight(0xffffff, 0.4)
//   backLight.position.set(-2, 2, -5)
//   scene.add(backLight)

//   // Set up controls
//   if (typeof THREE.OrbitControls !== "undefined") {
//     controls = new THREE.OrbitControls(camera, renderer.domElement)
//     controls.enableDamping = true
//     controls.dampingFactor = 0.1
//     controls.enableZoom = true
//     controls.minDistance = 3
//     controls.maxDistance = 10
//   } else {
//     console.warn("OrbitControls not available")
//   }

//   // Create models - using synchronous approach to avoid loading issues
//   try {
//     createModels()

//     // Show initial model
//     showModel(currentModelType)

//     // Start animation loop
//     animate()

//     // Hide loading indicator
//     if (loadingContainer) {
//       loadingContainer.style.display = "none"
//     }
//   } catch (error) {
//     console.error("Error creating models:", error)
//     if (loadingContainer) {
//       loadingContainer.style.display = "none"
//     }
//     container.innerHTML = `
//       <div class="flex items-center justify-center h-full bg-gray-100 rounded-lg">
//         <p class="text-red-500">Error loading 3D models: ${error.message}</p>
//       </div>
//     `
//   }

//   // Handle window resize
//   window.addEventListener("resize", () => {
//     const width = container.clientWidth
//     const height = container.clientHeight || 400
//     camera.aspect = width / height
//     camera.updateProjectionMatrix()
//     renderer.setSize(width, height)
//   })
// }

// // Create all clothing models - now synchronous
// function createModels() {
//   // Create base material
//   const material = new THREE.MeshStandardMaterial({
//     color: new THREE.Color(currentColor),
//     side: THREE.DoubleSide,
//     roughness: 0.7,
//     metalness: 0.1,
//   })

//   // Create T-shirt model
//   tshirtModel = new THREE.Group()
//   createTshirtModel(tshirtModel, material.clone())
//   tshirtModel.visible = false
//   scene.add(tshirtModel)

//   // Create hoodie model
//   hoodieModel = new THREE.Group()
//   createHoodieModel(hoodieModel, material.clone())
//   hoodieModel.visible = false
//   scene.add(hoodieModel)

//   // Create jacket model
//   jacketModel = new THREE.Group()
//   createJacketModel(jacketModel, material.clone())
//   jacketModel.visible = false
//   scene.add(jacketModel)
// }

// // Create T-shirt model with organic, realistic geometry
// function createTshirtModel(group, material) {
//   // Create more organic body shape using custom geometry
//   const bodyGeometry = createImprovedTshirtGeometry()
//   const body = new THREE.Mesh(bodyGeometry, material)
//   body.castShadow = true
//   body.receiveShadow = true
//   group.add(body)

//   // Create collar
//   const collarGeometry = createCollarGeometry()
//   const collar = new THREE.Mesh(collarGeometry, material)
//   collar.position.set(0, 1.8, 0)
//   collar.castShadow = true
//   collar.receiveShadow = true
//   group.add(collar)

//   // Create sleeves with better positioning
//   const leftSleeveGeometry = createSleeveGeometry(true)
//   const leftSleeve = new THREE.Mesh(leftSleeveGeometry, material)
//   // Adjust position to connect with the body
//   leftSleeve.position.set(-0.85, 1.3, 0)
//   leftSleeve.rotation.z = Math.PI / 12 // Slight rotation for better fit
//   leftSleeve.castShadow = true
//   leftSleeve.receiveShadow = true
//   group.add(leftSleeve)

//   const rightSleeveGeometry = createSleeveGeometry(false)
//   const rightSleeve = new THREE.Mesh(rightSleeveGeometry, material)
//   // Adjust position to connect with the body
//   rightSleeve.position.set(0.85, 1.3, 0)
//   rightSleeve.rotation.z = -Math.PI / 12 // Slight rotation for better fit
//   rightSleeve.castShadow = true
//   rightSleeve.receiveShadow = true
//   group.add(rightSleeve)

//   // Store reference to material for later updates
//   group.userData.material = material
// }

// // Improved T-shirt geometry
// function createImprovedTshirtGeometry() {
//   try {
//     // Create a shape for the front of the T-shirt
//     const shape = new THREE.Shape()

//     // Define the T-shirt silhouette with smoother curves and wider shoulders
//     shape.moveTo(0, -1.5) // Bottom center
//     shape.bezierCurveTo(-0.2, -1.5, -0.8, -1.4, -1.0, -0.8) // Bottom left curve
//     shape.bezierCurveTo(-1.1, -0.4, -1.1, 0.2, -1.0, 0.8) // Left side up

//     // Wider shoulder area for better sleeve connection
//     shape.bezierCurveTo(-0.95, 1.1, -0.9, 1.3, -0.85, 1.4) // Left shoulder approach
//     shape.bezierCurveTo(-0.8, 1.5, -0.7, 1.6, -0.5, 1.7) // Left shoulder

//     shape.bezierCurveTo(-0.4, 1.75, -0.3, 1.8, -0.2, 1.8) // Left neck
//     shape.lineTo(0.2, 1.8) // Neck bottom
//     shape.bezierCurveTo(0.3, 1.8, 0.4, 1.75, 0.5, 1.7) // Right neck

//     // Wider shoulder area for better sleeve connection
//     shape.bezierCurveTo(0.7, 1.6, 0.8, 1.5, 0.85, 1.4) // Right shoulder
//     shape.bezierCurveTo(0.9, 1.3, 0.95, 1.1, 1.0, 0.8) // Right shoulder approach

//     shape.bezierCurveTo(1.1, 0.2, 1.1, -0.4, 1.0, -0.8) // Right side down
//     shape.bezierCurveTo(0.8, -1.4, 0.2, -1.5, 0, -1.5) // Bottom right curve

//     // Extrude the shape to create a 3D T-shirt body
//     const extrudeSettings = {
//       steps: 2,
//       depth: 0.4,
//       bevelEnabled: true,
//       bevelThickness: 0.05,
//       bevelSize: 0.05,
//       bevelOffset: 0,
//       bevelSegments: 3,
//     }

//     const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

//     // Add natural wrinkles and folds to the T-shirt
//     addClothingDetails(geometry, 0.02, 10)

//     return geometry
//   } catch (error) {
//     console.error("Error creating T-shirt geometry:", error)
//     // Fallback to simple geometry if there's an error
//     return new THREE.BoxGeometry(2, 3, 0.2)
//   }
// }

// // Create collar geometry
// function createCollarGeometry() {
//   try {
//     const shape = new THREE.Shape()

//     // Create a U-shaped collar
//     shape.moveTo(-0.25, 0)
//     shape.bezierCurveTo(-0.25, -0.05, -0.2, -0.15, -0.15, -0.2)
//     shape.bezierCurveTo(-0.1, -0.25, 0, -0.3, 0, -0.3)
//     shape.bezierCurveTo(0, -0.3, 0.1, -0.25, 0.15, -0.2)
//     shape.bezierCurveTo(0.2, -0.15, 0.25, -0.05, 0.25, 0)
//     shape.bezierCurveTo(0.25, 0.05, 0.2, 0.05, 0.15, 0.05)
//     shape.lineTo(-0.15, 0.05)
//     shape.bezierCurveTo(-0.2, 0.05, -0.25, 0.05, -0.25, 0)

//     const extrudeSettings = {
//       steps: 1,
//       depth: 0.1,
//       bevelEnabled: true,
//       bevelThickness: 0.02,
//       bevelSize: 0.02,
//       bevelOffset: 0,
//       bevelSegments: 2,
//     }

//     return new THREE.ExtrudeGeometry(shape, extrudeSettings)
//   } catch (error) {
//     console.error("Error creating collar geometry:", error)
//     // Fallback to simple geometry if there's an error
//     return new THREE.TorusGeometry(0.3, 0.1, 16, 32, Math.PI)
//   }
// }

// // Create sleeve geometry
// function createSleeveGeometry(isLeft) {
//   try {
//     // Create a path for the sleeve that connects better to the body
//     const path = new THREE.CatmullRomCurve3([
//       // Start point inside the body for better connection
//       new THREE.Vector3(isLeft ? -0.1 : 0.1, 0, 0),
//       new THREE.Vector3(isLeft ? -0.3 : 0.3, -0.05, 0.05),
//       new THREE.Vector3(isLeft ? -0.5 : 0.5, -0.2, 0),
//       new THREE.Vector3(isLeft ? -0.7 : 0.7, -0.3, -0.05),
//     ])

//     // Create a custom shape for the sleeve cross-section
//     const sleeveShape = new THREE.Shape()
//     const radius = 0.25
//     const segments = 8

//     // Create an oval shape for better arm fit
//     for (let i = 0; i < segments; i++) {
//       const angle = (i / segments) * Math.PI * 2
//       const x = Math.cos(angle) * radius
//       const y = Math.sin(angle) * (radius * 0.8) // Slightly oval

//       if (i === 0) {
//         sleeveShape.moveTo(x, y)
//       } else {
//         sleeveShape.lineTo(x, y)
//       }
//     }
//     sleeveShape.closePath()

//     // Create an extrusion along the path
//     const extrudeSettings = {
//       steps: 20,
//       bevelEnabled: false,
//       extrudePath: path,
//     }

//     const geometry = new THREE.ExtrudeGeometry(sleeveShape, extrudeSettings)

//     // Add natural wrinkles to the sleeve
//     addClothingDetails(geometry, 0.01, 15)

//     return geometry
//   } catch (error) {
//     console.error("Error creating sleeve geometry:", error)
//     // Fallback to simple geometry if there's an error
//     const sleeveGeometry = new THREE.CylinderGeometry(0.3, 0.25, 0.8, 16)
//     sleeveGeometry.rotateX(Math.PI / 2)
//     return sleeveGeometry
//   }
// }

// // Improved hoodie geometry
// function createImprovedHoodieGeometry() {
//   try {
//     // Create a shape for the front of the hoodie
//     const shape = new THREE.Shape()

//     // Define the hoodie silhouette with smoother curves
//     shape.moveTo(0, -1.7) // Bottom center
//     shape.bezierCurveTo(-0.2, -1.7, -0.9, -1.6, -1.1, -1.0) // Bottom left curve
//     shape.bezierCurveTo(-1.2, -0.5, -1.2, 0.2, -1.1, 0.9) // Left side up
//     shape.bezierCurveTo(-1.0, 1.3, -0.8, 1.6, -0.6, 1.8) // Left shoulder
//     shape.bezierCurveTo(-0.5, 1.85, -0.4, 1.9, -0.3, 1.9) // Left neck
//     shape.lineTo(0.3, 1.9) // Neck bottom
//     shape.bezierCurveTo(0.4, 1.9, 0.5, 1.85, 0.6, 1.8) // Right neck
//     shape.bezierCurveTo(0.8, 1.6, 1.0, 1.3, 1.1, 0.9) // Right shoulder
//     shape.bezierCurveTo(1.2, 0.2, 1.2, -0.5, 1.1, -1.0) // Right side down
//     shape.bezierCurveTo(0.9, -1.6, 0.2, -1.7, 0, -1.7) // Bottom right curve

//     // Extrude the shape to create a 3D hoodie body
//     const extrudeSettings = {
//       steps: 2,
//       depth: 0.5,
//       bevelEnabled: true,
//       bevelThickness: 0.08,
//       bevelSize: 0.08,
//       bevelOffset: 0,
//       bevelSegments: 3,
//     }

//     const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

//     // Add natural wrinkles and folds to the hoodie
//     addClothingDetails(geometry, 0.03, 8)

//     return geometry
//   } catch (error) {
//     console.error("Error creating hoodie geometry:", error)
//     // Fallback to simple geometry if there's an error
//     return new THREE.BoxGeometry(2.2, 3.2, 0.3)
//   }
// }

// // Create hood geometry
// function createHoodGeometry() {
//   try {
//     // Create a half-sphere for the hood
//     const geometry = new THREE.SphereGeometry(0.6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2)

//     // Modify the geometry to create a more realistic hood shape
//     const positions = geometry.attributes.position

//     for (let i = 0; i < positions.count; i++) {
//       const x = positions.getX(i)
//       const y = positions.getY(i)
//       const z = positions.getZ(i)

//       // Elongate the hood slightly
//       positions.setZ(i, z * 1.2)

//       // Add some natural folds
//       const fold = Math.sin(x * 10) * Math.sin(z * 8) * 0.02
//       positions.setY(i, y + fold)
//     }

//     geometry.computeVertexNormals()
//     return geometry
//   } catch (error) {
//     console.error("Error creating hood geometry:", error)
//     // Fallback to simple geometry if there's an error
//     return new THREE.SphereGeometry(0.6, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2)
//   }
// }

// // Create hoodie model
// function createHoodieModel(group, material) {
//   // Create hoodie body
//   const bodyGeometry = createImprovedHoodieGeometry()
//   const body = new THREE.Mesh(bodyGeometry, material)
//   body.castShadow = true
//   body.receiveShadow = true
//   group.add(body)

//   // Create hood
//   const hoodGeometry = createHoodGeometry()
//   const hood = new THREE.Mesh(hoodGeometry, material)
//   hood.position.set(0, 1.9, -0.3)
//   hood.castShadow = true
//   hood.receiveShadow = true
//   group.add(hood)

//   // Create sleeves with better positioning
//   const leftSleeveGeometry = createHoodieSleeveGeometry(true)
//   const leftSleeve = new THREE.Mesh(leftSleeveGeometry, material)
//   // Adjust position to connect with the body
//   leftSleeve.position.set(-0.9, 1.25, 0)
//   leftSleeve.rotation.z = Math.PI / 12 // Slight rotation for better fit
//   leftSleeve.castShadow = true
//   leftSleeve.receiveShadow = true
//   group.add(leftSleeve)

//   const rightSleeveGeometry = createHoodieSleeveGeometry(false)
//   const rightSleeve = new THREE.Mesh(rightSleeveGeometry, material)
//   // Adjust position to connect with the body
//   rightSleeve.position.set(0.9, 1.25, 0)
//   rightSleeve.rotation.z = -Math.PI / 12 // Slight rotation for better fit
//   rightSleeve.castShadow = true
//   group.add(rightSleeve)

//   // Create pocket
//   const pocketGeometry = createPocketGeometry()
//   const pocket = new THREE.Mesh(pocketGeometry, material)
//   pocket.position.set(0, 0.3, 0.4)
//   pocket.castShadow = true
//   pocket.receiveShadow = true
//   group.add(pocket)

//   // Create drawstrings
//   const stringMaterial = new THREE.MeshStandardMaterial({
//     color: 0x888888,
//     roughness: 0.8,
//     metalness: 0.1,
//   })

//   const leftStringGeometry = createDrawstringGeometry()
//   const leftString = new THREE.Mesh(leftStringGeometry, stringMaterial)
//   leftString.position.set(-0.15, 1.5, 0.25)
//   leftString.castShadow = true
//   group.add(leftString)

//   const rightStringGeometry = createDrawstringGeometry()
//   const rightString = new THREE.Mesh(rightStringGeometry, stringMaterial)
//   rightString.position.set(0.15, 1.5, 0.25)
//   rightString.castShadow = true
//   group.add(rightString)

//   // Store reference to material for later updates
//   group.userData.material = material
// }

// // Create hoodie sleeve geometry
// function createHoodieSleeveGeometry(isLeft) {
//   try {
//     // Create a path for the sleeve that connects better to the body
//     const path = new THREE.CatmullRomCurve3([
//       // Start point inside the body for better connection
//       new THREE.Vector3(isLeft ? -0.1 : 0.1, 0, 0),
//       new THREE.Vector3(isLeft ? -0.3 : 0.3, -0.1, 0.05),
//       new THREE.Vector3(isLeft ? -0.5 : 0.5, -0.3, 0),
//       new THREE.Vector3(isLeft ? -0.7 : 0.7, -0.6, -0.05),
//       new THREE.Vector3(isLeft ? -0.75 : 0.75, -0.8, -0.1),
//     ])

//     // Create a custom shape for the sleeve cross-section
//     const sleeveShape = new THREE.Shape()
//     const radius = 0.3
//     const segments = 8

//     // Create an oval shape for better arm fit
//     for (let i = 0; i < segments; i++) {
//       const angle = (i / segments) * Math.PI * 2
//       const x = Math.cos(angle) * radius
//       const y = Math.sin(angle) * (radius * 0.8) // Slightly oval

//       if (i === 0) {
//         sleeveShape.moveTo(x, y)
//       } else {
//         sleeveShape.lineTo(x, y)
//       }
//     }
//     sleeveShape.closePath()

//     // Create an extrusion along the path
//     const extrudeSettings = {
//       steps: 20,
//       bevelEnabled: false,
//       extrudePath: path,
//     }

//     const geometry = new THREE.ExtrudeGeometry(sleeveShape, extrudeSettings)

//     // Add natural wrinkles to the sleeve
//     addClothingDetails(geometry, 0.02, 12)

//     return geometry
//   } catch (error) {
//     console.error("Error creating hoodie sleeve geometry:", error)
//     // Fallback to simple geometry if there's an error
//     const sleeveGeometry = new THREE.CylinderGeometry(0.35, 0.3, 1, 16)
//     sleeveGeometry.rotateX(Math.PI / 2)
//     return sleeveGeometry
//   }
// }

// // Create pocket geometry
// function createPocketGeometry() {
//   try {
//     const shape = new THREE.Shape()

//     // Create a rounded pocket shape
//     shape.moveTo(-0.5, 0.3)
//     shape.bezierCurveTo(-0.5, 0.3, -0.6, 0.1, -0.6, -0.1)
//     shape.bezierCurveTo(-0.6, -0.2, -0.5, -0.3, -0.4, -0.35)
//     shape.bezierCurveTo(-0.3, -0.38, -0.1, -0.4, 0, -0.4)
//     shape.bezierCurveTo(0.1, -0.4, 0.3, -0.38, 0.4, -0.35)
//     shape.bezierCurveTo(0.5, -0.3, 0.6, -0.2, 0.6, -0.1)
//     shape.bezierCurveTo(0.6, 0.1, 0.5, 0.3, 0.5, 0.3)
//     shape.lineTo(-0.5, 0.3)

//     const extrudeSettings = {
//       steps: 1,
//       depth: 0.1,
//       bevelEnabled: true,
//       bevelThickness: 0.02,
//       bevelSize: 0.02,
//       bevelOffset: 0,
//       bevelSegments: 2,
//     }

//     return new THREE.ExtrudeGeometry(shape, extrudeSettings)
//   } catch (error) {
//     console.error("Error creating pocket geometry:", error)
//     // Fallback to simple geometry if there's an error
//     return new THREE.BoxGeometry(1.2, 0.8, 0.1)
//   }
// }

// // Create drawstring geometry
// function createDrawstringGeometry() {
//   try {
//     const path = new THREE.CatmullRomCurve3([
//       new THREE.Vector3(0, 0.2, 0),
//       new THREE.Vector3(0.05, 0.1, 0.05),
//       new THREE.Vector3(0, 0, 0.1),
//       new THREE.Vector3(-0.05, -0.1, 0.05),
//       new THREE.Vector3(0, -0.2, 0),
//     ])

//     return new THREE.TubeGeometry(
//       path,
//       20, // tubularSegments
//       0.02, // radius
//       8, // radialSegments
//       false, // closed
//     )
//   } catch (error) {
//     console.error("Error creating drawstring geometry:", error)
//     // Fallback to simple geometry if there's an error
//     return new THREE.CylinderGeometry(0.02, 0.02, 0.4, 8)
//   }
// }

// // Improved jacket geometry
// function createImprovedJacketGeometry() {
//   try {
//     // Create a shape for the front of the jacket
//     const shape = new THREE.Shape()

//     // Define the jacket silhouette with smoother curves
//     shape.moveTo(0, -1.8) // Bottom center
//     shape.bezierCurveTo(-0.2, -1.8, -1.0, -1.7, -1.2, -1.1) // Bottom left curve
//     shape.bezierCurveTo(-1.3, -0.6, -1.3, 0.2, -1.2, 1.0) // Left side up
//     shape.bezierCurveTo(-1.1, 1.4, -0.9, 1.7, -0.7, 1.9) // Left shoulder
//     shape.bezierCurveTo(-0.6, 1.95, -0.5, 2.0, -0.4, 2.0) // Left neck
//     shape.lineTo(0.4, 2.0) // Neck bottom
//     shape.bezierCurveTo(0.5, 2.0, 0.6, 1.95, 0.7, 1.9) // Right neck
//     shape.bezierCurveTo(0.9, 1.7, 1.1, 1.4, 1.2, 1.0) // Right shoulder
//     shape.bezierCurveTo(1.3, 0.2, 1.3, -0.6, 1.2, -1.1) // Right side down
//     shape.bezierCurveTo(1.0, -1.7, 0.2, -1.8, 0, -1.8) // Bottom right curve

//     // Extrude the shape to create a 3D jacket body
//     const extrudeSettings = {
//       steps: 2,
//       depth: 0.6,
//       bevelEnabled: true,
//       bevelThickness: 0.1,
//       bevelSize: 0.1,
//       bevelOffset: 0,
//       bevelSegments: 3,
//     }

//     const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

//     // Add natural wrinkles and folds to the jacket
//     addClothingDetails(geometry, 0.02, 6)

//     return geometry
//   } catch (error) {
//     console.error("Error creating jacket geometry:", error)
//     // Fallback to simple geometry if there's an error
//     return new THREE.BoxGeometry(2.3, 3.3, 0.4)
//   }
// }

// // Create jacket collar geometry
// function createJacketCollarGeometry() {
//   try {
//     const shape = new THREE.Shape()

//     // Create a V-shaped collar
//     shape.moveTo(-0.4, 0.3)
//     shape.lineTo(-0.2, -0.3)
//     shape.lineTo(0, -0.4)
//     shape.lineTo(0.2, -0.3)
//     shape.lineTo(0.4, 0.3)
//     shape.bezierCurveTo(0.4, 0.35, 0.35, 0.4, 0.3, 0.4)
//     shape.lineTo(-0.3, 0.4)
//     shape.bezierCurveTo(-0.35, 0.4, -0.4, 0.35, -0.4, 0.3)

//     const extrudeSettings = {
//       steps: 1,
//       depth: 0.15,
//       bevelEnabled: true,
//       bevelThickness: 0.03,
//       bevelSize: 0.03,
//       bevelOffset: 0,
//       bevelSegments: 2,
//     }

//     return new THREE.ExtrudeGeometry(shape, extrudeSettings)
//   } catch (error) {
//     console.error("Error creating jacket collar geometry:", error)
//     // Fallback to simple geometry if there's an error
//     return new THREE.BoxGeometry(1.5, 0.5, 0.2)
//   }
// }

// // Create jacket model
// function createJacketModel(group, material) {
//   // Create jacket body
//   const bodyGeometry = createImprovedJacketGeometry()
//   const body = new THREE.Mesh(bodyGeometry, material)
//   body.castShadow = true
//   body.receiveShadow = true
//   group.add(body)

//   // Create collar
//   const collarGeometry = createJacketCollarGeometry()
//   const collar = new THREE.Mesh(collarGeometry, material)
//   collar.position.set(0, 1.7, 0)
//   collar.castShadow = true
//   collar.receiveShadow = true
//   group.add(collar)

//   // Create sleeves with better positioning
//   const leftSleeveGeometry = createJacketSleeveGeometry(true)
//   const leftSleeve = new THREE.Mesh(leftSleeveGeometry, material)
//   // Adjust position to connect with the body
//   leftSleeve.position.set(-0.9, 1.2, 0)
//   leftSleeve.rotation.z = Math.PI / 12 // Slight rotation for better fit
//   leftSleeve.castShadow = true
//   leftSleeve.receiveShadow = true
//   group.add(leftSleeve)

//   const rightSleeveGeometry = createJacketSleeveGeometry(false)
//   const rightSleeve = new THREE.Mesh(rightSleeveGeometry, material)
//   // Adjust position to connect with the body
//   rightSleeve.position.set(0.9, 1.2, 0)
//   rightSleeve.rotation.z = -Math.PI / 12 // Slight rotation for better fit
//   rightSleeve.castShadow = true
//   group.add(rightSleeve)

//   // Create buttons
//   const buttonMaterial = new THREE.MeshStandardMaterial({
//     color: 0x333333,
//     roughness: 0.3,
//     metalness: 0.7,
//   })

//   for (let i = 0; i < 4; i++) {
//     const buttonGeometry = new THREE.CylinderGeometry(0.06, 0.06, 0.03, 16)
//     const button = new THREE.Mesh(buttonGeometry, buttonMaterial)
//     button.rotation.x = Math.PI / 2
//     button.position.set(0.15, 1.2 - i * 0.4, 0.46)
//     button.castShadow = true
//     group.add(button)
//   }

//   // Store reference to material for later updates
//   group.userData.material = material
// }

// // Create jacket sleeve geometry
// function createJacketSleeveGeometry(isLeft) {
//   try {
//     // Create a path for the sleeve that connects better to the body
//     const path = new THREE.CatmullRomCurve3([
//       // Start point inside the body for better connection
//       new THREE.Vector3(isLeft ? -0.1 : 0.1, 0, 0),
//       new THREE.Vector3(isLeft ? -0.3 : 0.3, -0.15, 0.05),
//       new THREE.Vector3(isLeft ? -0.5 : 0.5, -0.4, 0),
//       new THREE.Vector3(isLeft ? -0.7 : 0.7, -0.7, -0.05),
//       new THREE.Vector3(isLeft ? -0.8 : 0.8, -0.9, -0.1),
//     ])

//     // Create a custom shape for the sleeve cross-section
//     const sleeveShape = new THREE.Shape()
//     const radius = 0.32
//     const segments = 8

//     // Create an oval shape for better arm fit
//     for (let i = 0; i < segments; i++) {
//       const angle = (i / segments) * Math.PI * 2
//       const x = Math.cos(angle) * radius
//       const y = Math.sin(angle) * (radius * 0.8) // Slightly oval

//       if (i === 0) {
//         sleeveShape.moveTo(x, y)
//       } else {
//         sleeveShape.lineTo(x, y)
//       }
//     }
//     sleeveShape.closePath()

//     // Create an extrusion along the path
//     const extrudeSettings = {
//       steps: 20,
//       bevelEnabled: false,
//       extrudePath: path,
//     }

//     const geometry = new THREE.ExtrudeGeometry(sleeveShape, extrudeSettings)

//     // Add natural wrinkles to the sleeve
//     addClothingDetails(geometry, 0.015, 10)

//     return geometry
//   } catch (error) {
//     console.error("Error creating jacket sleeve geometry:", error)
//     // Fallback to simple geometry if there's an error
//     const sleeveGeometry = new THREE.CylinderGeometry(0.4, 0.35, 1.2, 16)
//     sleeveGeometry.rotateX(Math.PI / 2)
//     return sleeveGeometry
//   }
// }

// // Add clothing details like wrinkles and folds - with error handling
// function addClothingDetails(geometry, intensity, frequency) {
//   try {
//     if (!geometry || !geometry.attributes || !geometry.attributes.position) {
//       console.warn("Invalid geometry for clothing details")
//       return
//     }

//     const positions = geometry.attributes.position

//     for (let i = 0; i < positions.count; i++) {
//       const x = positions.getX(i)
//       const y = positions.getY(i)
//       const z = positions.getZ(i)

//       // Add subtle random displacement for fabric texture
//       const noise = (Math.random() - 0.5) * intensity * 0.5

//       // Add wave patterns for natural folds
//       const waveX = Math.sin(x * frequency) * intensity * 0.3
//       const waveY = Math.sin(y * frequency) * intensity * 0.3

//       // Apply the displacement
//       positions.setZ(i, z + noise + waveX + waveY)
//     }

//     geometry.computeVertexNormals()
//   } catch (error) {
//     console.error("Error adding clothing details:", error)
//     // Just continue without adding details if there's an error
//   }
// }

// // Show the selected model type
// function showModel(modelType) {
//   // Hide all models first
//   if (tshirtModel) tshirtModel.visible = false
//   if (hoodieModel) hoodieModel.visible = false
//   if (jacketModel) jacketModel.visible = false

//   // Show selected model
//   switch (modelType) {
//     case "tshirt":
//       tshirtModel.visible = true
//       currentModel = tshirtModel
//       break
//     case "hoodie":
//       hoodieModel.visible = true
//       currentModel = hoodieModel
//       break
//     case "jacket":
//       jacketModel.visible = true
//       currentModel = jacketModel
//       break
//   }

//   // Update current model type
//   currentModelType = modelType

//   // Reset camera position
//   camera.position.set(0, 0, 5)
//   if (controls) controls.update()

//   // Update material properties
//   updateMaterialProperties()
// }

// // Enhanced material properties with fabric-like textures
// function updateMaterialProperties() {
//   if (!currentModel || !currentModel.userData.material) return

//   const material = currentModel.userData.material

//   // Update color
//   material.color.set(currentColor)

//   // Create fabric normal map for more realistic surface
//   if (!material.normalMap) {
//     try {
//       material.normalMap = createFabricNormalMap()
//       material.normalScale = new THREE.Vector2(0.3, 0.3)
//     } catch (error) {
//       console.error("Error creating normal map:", error)
//       // Continue without normal map if there's an error
//     }
//   }

//   // Update roughness and metalness based on material type
//   switch (currentMaterial) {
//     case "cotton":
//       material.roughness = 0.85
//       material.metalness = 0.0
//       if (material.normalScale) material.normalScale.set(0.4, 0.4)
//       break
//     case "linen":
//       material.roughness = 0.9
//       material.metalness = 0.0
//       if (material.normalScale) material.normalScale.set(0.6, 0.6)
//       break
//     case "denim":
//       material.roughness = 0.75
//       material.metalness = 0.05
//       if (material.normalScale) material.normalScale.set(0.5, 0.5)
//       break
//     case "silk":
//       material.roughness = 0.3
//       material.metalness = 0.1
//       if (material.normalScale) material.normalScale.set(0.2, 0.2)
//       break
//   }

//   // Apply pattern
//   try {
//     applyPattern(material)
//   } catch (error) {
//     console.error("Error applying pattern:", error)
//     // Continue without pattern if there's an error
//   }

//   material.needsUpdate = true
// }

// // Create fabric normal map for realistic surface texture
// function createFabricNormalMap() {
//   const canvas = document.createElement("canvas")
//   canvas.width = 256
//   canvas.height = 256

//   const ctx = canvas.getContext("2d")
//   const imageData = ctx.createImageData(256, 256)

//   for (let i = 0; i < imageData.data.length; i += 4) {
//     const x = (i / 4) % 256
//     const y = Math.floor(i / 4 / 256)

//     // Create fabric weave pattern
//     const weaveX = Math.sin(x * 0.5) * 0.5 + 0.5
//     const weaveY = Math.sin(y * 0.5) * 0.5 + 0.5
//     const weave = (weaveX + weaveY) * 0.5

//     // Add some noise for fabric texture
//     const noise = Math.random() * 0.3
//     const value = Math.floor((weave + noise) * 255)

//     imageData.data[i] = value // R
//     imageData.data[i + 1] = value // G
//     imageData.data[i + 2] = 255 // B (normal Z)
//     imageData.data[i + 3] = 255 // A
//   }

//   ctx.putImageData(imageData, 0, 0)

//   const texture = new THREE.CanvasTexture(canvas)
//   texture.wrapS = THREE.RepeatWrapping
//   texture.wrapT = THREE.RepeatWrapping
//   texture.repeat.set(4, 4)

//   return texture
// }

// // Apply pattern to material
// function applyPattern(material) {
//   // Remove existing texture if any
//   if (material.map) {
//     material.map.dispose()
//     material.map = null
//   }

//   // Apply new pattern
//   switch (currentPattern) {
//     case "stripes":
//       material.map = createStripesTexture()
//       break
//     case "dots":
//       material.map = createDotsTexture()
//       break
//     case "floral":
//       material.map = createFloralTexture()
//       break
//     case "none":
//     default:
//       // No pattern
//       break
//   }

//   if (material.map) {
//     material.map.needsUpdate = true
//   }

//   material.needsUpdate = true
// }

// // Create stripes texture
// function createStripesTexture() {
//   const canvas = document.createElement("canvas")
//   canvas.width = 512
//   canvas.height = 512

//   const ctx = canvas.getContext("2d")

//   // Fill background with base color
//   ctx.fillStyle = currentColor
//   ctx.fillRect(0, 0, 512, 512)

//   // Draw stripes with a darker shade
//   const darkerColor = adjustColor(currentColor, -30)
//   ctx.fillStyle = darkerColor

//   for (let y = 0; y < 512; y += 40) {
//     ctx.fillRect(0, y, 512, 20)
//   }

//   const texture = new THREE.CanvasTexture(canvas)
//   texture.wrapS = THREE.RepeatWrapping
//   texture.wrapT = THREE.RepeatWrapping
//   texture.repeat.set(2, 2)

//   return texture
// }

// // Create dots texture
// function createDotsTexture() {
//   const canvas = document.createElement("canvas")
//   canvas.width = 512
//   canvas.height = 512

//   const ctx = canvas.getContext("2d")

//   // Fill background with base color
//   ctx.fillStyle = currentColor
//   ctx.fillRect(0, 0, 512, 512)

//   // Draw dots with a darker shade
//   const darkerColor = adjustColor(currentColor, -30)
//   ctx.fillStyle = darkerColor

//   const dotSize = 15
//   const spacing = 60

//   for (let x = spacing / 2; x < 512; x += spacing) {
//     for (let y = spacing / 2; y < 512; y += spacing) {
//       ctx.beginPath()
//       ctx.arc(x, y, dotSize, 0, Math.PI * 2)
//       ctx.fill()
//     }
//   }

//   const texture = new THREE.CanvasTexture(canvas)
//   texture.wrapS = THREE.RepeatWrapping
//   texture.wrapT = THREE.RepeatWrapping
//   texture.repeat.set(2, 2)

//   return texture
// }

// // Create floral texture
// function createFloralTexture() {
//   const canvas = document.createElement("canvas")
//   canvas.width = 512
//   canvas.height = 512

//   const ctx = canvas.getContext("2d")

//   // Fill background with base color
//   ctx.fillStyle = currentColor
//   ctx.fillRect(0, 0, 512, 512)

//   // Draw simple flower patterns
//   const accentColor1 = adjustColor(currentColor, 40)
//   const accentColor2 = adjustColor(currentColor, -40)

//   // Draw flowers in a grid
//   for (let x = 64; x < 512; x += 128) {
//     for (let y = 64; y < 512; y += 128) {
//       drawFlower(ctx, x, y, 30, accentColor1, accentColor2)
//     }
//   }

//   // Draw smaller flowers in between
//   for (let x = 128; x < 512; x += 128) {
//     for (let y = 128; y < 512; y += 128) {
//       drawFlower(ctx, x, y, 20, accentColor2, accentColor1)
//     }
//   }

//   const texture = new THREE.CanvasTexture(canvas)
//   texture.wrapS = THREE.RepeatWrapping
//   texture.wrapT = THREE.RepeatWrapping
//   texture.repeat.set(2, 2)

//   return texture
// }

// // Draw a simple flower
// function drawFlower(ctx, x, y, size, petalColor, centerColor) {
//   const petalCount = 5

//   // Draw petals
//   ctx.fillStyle = petalColor
//   for (let i = 0; i < petalCount; i++) {
//     const angle = (i / petalCount) * Math.PI * 2
//     const x1 = x + Math.cos(angle) * size
//     const y1 = y + Math.sin(angle) * size

//     ctx.beginPath()
//     ctx.arc(x1, y1, size / 2, 0, Math.PI * 2)
//     ctx.fill()
//   }

//   // Draw center
//   ctx.fillStyle = centerColor
//   ctx.beginPath()
//   ctx.arc(x, y, size / 3, 0, Math.PI * 2)
//   ctx.fill()
// }

// // Adjust color brightness
// function adjustColor(color, amount) {
//   try {
//     const hex = color.replace("#", "")

//     let r = Number.parseInt(hex.substring(0, 2), 16)
//     let g = Number.parseInt(hex.substring(2, 4), 16)
//     let b = Number.parseInt(hex.substring(4, 6), 16)

//     r = Math.max(0, Math.min(255, r + amount))
//     g = Math.max(0, Math.min(255, g + amount))
//     b = Math.max(0, Math.min(255, b + amount))

//     return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
//   } catch (error) {
//     console.error("Error adjusting color:", error)
//     return color // Return original color if there's an error
//   }
// }

// // Animation loop
// function animate() {
//   requestAnimationFrame(animate)

//   if (controls) controls.update()

//   renderer.render(scene, camera)
// }

// // Initialize UI controls
// function initializeControls() {
//   // Item selection
//   document.querySelectorAll(".item-option").forEach((option) => {
//     option.addEventListener("click", function () {
//       // Remove active class from all options
//       document.querySelectorAll(".item-option").forEach((opt) => opt.classList.remove("active"))

//       // Add active class to clicked option
//       this.classList.add("active")

//       // Show the selected model
//       const modelType = this.getAttribute("data-item")
//       showModel(modelType)
//     })
//   })

//   // Color selection
//   document.querySelectorAll(".color-option").forEach((option) => {
//     option.addEventListener("click", function () {
//       // Remove active class from all options
//       document.querySelectorAll(".color-option").forEach((opt) => opt.classList.remove("active"))

//       // Add active class to clicked option
//       this.classList.add("active")

//       // Update current color
//       currentColor = this.getAttribute("data-color")

//       // Update material
//       updateMaterialProperties()
//     })
//   })

//   // Pattern selection
//   document.querySelectorAll(".pattern-option").forEach((option) => {
//     option.addEventListener("click", function () {
//       // Remove active class from all options
//       document.querySelectorAll(".pattern-option").forEach((opt) => opt.classList.remove("active"))

//       // Add active class to clicked option
//       this.classList.add("active")

//       // Update current pattern
//       currentPattern = this.getAttribute("data-pattern")

//       // Update material
//       updateMaterialProperties()
//     })
//   })

//   // Material selection
//   document.querySelectorAll(".material-option").forEach((option) => {
//     option.addEventListener("click", function () {
//       // Remove active class from all options
//       document.querySelectorAll(".material-option").forEach((opt) => opt.classList.remove("active"))

//       // Add active class to clicked option
//       this.classList.add("active")

//       // Update current material
//       currentMaterial = this.getAttribute("data-material")

//       // Update material
//       updateMaterialProperties()
//     })
//   })

//   // Accessory toggles
//   document.querySelectorAll(".accessory-toggle").forEach((toggle) => {
//     toggle.addEventListener("change", function () {
//       const accessory = this.parentElement.parentElement.getAttribute("data-accessory")

//       if (this.checked) {
//         // Add accessory
//         if (!currentAccessories.includes(accessory)) {
//           currentAccessories.push(accessory)
//           addAccessory(accessory)
//         }
//       } else {
//         // Remove accessory
//         const index = currentAccessories.indexOf(accessory)
//         if (index > -1) {
//           currentAccessories.splice(index, 1)
//           removeAccessory(accessory)
//         }
//       }
//     })
//   })

//   // Model controls
//   document.getElementById("rotate-left")?.addEventListener("click", () => {
//     if (currentModel) {
//       currentModel.rotation.y -= Math.PI / 8
//     }
//   })

//   document.getElementById("rotate-right")?.addEventListener("click", () => {
//     if (currentModel) {
//       currentModel.rotation.y += Math.PI / 8
//     }
//   })

//   document.getElementById("zoom-in")?.addEventListener("click", () => {
//     camera.position.z = Math.max(3, camera.position.z - 0.5)
//   })

//   document.getElementById("zoom-out")?.addEventListener("click", () => {
//     camera.position.z = Math.min(10, camera.position.z + 0.5)
//   })

//   document.getElementById("reset-view")?.addEventListener("click", () => {
//     if (currentModel) {
//       currentModel.rotation.set(0, 0, 0)
//       camera.position.set(0, 0, 5)
//       if (controls) controls.update()
//     }
//   })

//   // Action buttons
//   document.getElementById("save-design")?.addEventListener("click", saveDesign)
//   document.getElementById("share-design")?.addEventListener("click", shareDesign)
//   document.getElementById("add-to-cart")?.addEventListener("click", addToCart)

//   // Edit and delete buttons for saved designs
//   document.querySelectorAll(".edit-btn").forEach((btn) => {
//     btn.addEventListener("click", function () {
//       const designId = this.closest(".saved-design").getAttribute("data-id") || "saved-design-1"
//       loadSavedDesign(designId)
//     })
//   })

//   document.querySelectorAll(".delete-btn").forEach((btn) => {
//     btn.addEventListener("click", function () {
//       const designId = this.closest(".saved-design").getAttribute("data-id") || "saved-design-1"
//       deleteSavedDesign(designId)
//     })
//   })

//   // Try buttons for recommended designs
//   document.querySelectorAll(".try-btn").forEach((btn, index) => {
//     btn.addEventListener("click", function () {
//       const recommendedId =
//         this.closest(".recommended-item").getAttribute("data-id") || ["eco-friendly", "urban-style", "vintage"][index]
//       tryRecommendedDesign(recommendedId)
//     })
//   })
// }

// // Add accessory to the current model
// function addAccessory(accessory) {
//   if (!currentModel) return

//   try {
//     const material = currentModel.userData.material.clone()

//     switch (accessory) {
//       case "pocket":
//         // Only add pocket if it doesn't already exist
//         if (currentModel.getObjectByName("custom-pocket")) return

//         // Create pocket
//         const pocketGeometry = createPocketGeometry()
//         const pocket = new THREE.Mesh(pocketGeometry, material)
//         pocket.position.set(0, 0.2, 0.4)
//         pocket.name = "custom-pocket"
//         currentModel.add(pocket)
//         break

//       case "buttons":
//         // Only add buttons if they don't already exist
//         if (currentModel.getObjectByName("custom-button-0")) return

//         // Create buttons
//         const buttonMaterial = new THREE.MeshStandardMaterial({
//           color: 0x333333,
//           roughness: 0.3,
//           metalness: 0.7,
//         })

//         for (let i = -1; i <= 1; i += 0.5) {
//           const buttonGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.05, 16)
//           const button = new THREE.Mesh(buttonGeometry, buttonMaterial)
//           button.rotation.x = Math.PI / 2
//           button.position.set(0, i, 0.5)
//           button.name = `custom-button-${i}`
//           currentModel.add(button)
//         }
//         break

//       case "hood":
//         // Only add hood if it doesn't already exist and we're not already on a hoodie
//         if (currentModelType === "hoodie" || currentModel.getObjectByName("custom-hood")) return

//         // Create hood
//         const hoodGeometry = createHoodGeometry()
//         const hood = new THREE.Mesh(hoodGeometry, material)
//         hood.rotation.x = Math.PI
//         hood.position.set(0, 2.1, -0.3)
//         hood.name = "custom-hood"
//         currentModel.add(hood)

//         // Add hood opening
//         const hoodOpeningGeometry = new THREE.TorusGeometry(0.5, 0.08, 16, 32, Math.PI)
//         const hoodOpening = new THREE.Mesh(hoodOpeningGeometry, material)
//         hoodOpening.position.set(0, 2.0, -0.3)
//         hoodOpening.rotation.x = Math.PI / 2
//         hoodOpening.name = "custom-hood-opening"
//         currentModel.add(hoodOpening)

//         // Add strings
//         const stringGeometry = createDrawstringGeometry()
//         const stringMaterial = new THREE.MeshStandardMaterial({
//           color: 0x888888,
//           roughness: 0.8,
//           metalness: 0.1,
//         })

//         const leftString = new THREE.Mesh(stringGeometry, stringMaterial)
//         leftString.position.set(-0.15, 1.5, 0.25)
//         leftString.name = "custom-left-string"
//         currentModel.add(leftString)

//         const rightString = new THREE.Mesh(stringGeometry, stringMaterial)
//         rightString.position.set(0.15, 1.5, 0.25)
//         rightString.name = "custom-right-string"
//         currentModel.add(rightString)
//         break
//     }
//   } catch (error) {
//     console.error("Error adding accessory:", error)
//     // Continue without adding accessory if there's an error
//   }
// }

// // Remove accessory from the current model
// function removeAccessory(accessory) {
//   if (!currentModel) return

//   try {
//     switch (accessory) {
//       case "pocket":
//         const pocket = currentModel.getObjectByName("custom-pocket")
//         if (pocket) currentModel.remove(pocket)
//         break

//       case "buttons":
//         for (let i = -1; i <= 1; i += 0.5) {
//           const button = currentModel.getObjectByName(`custom-button-${i}`)
//           if (button) currentModel.remove(button)
//         }
//         break

//       case "hood":
//         const hood = currentModel.getObjectByName("custom-hood")
//         if (hood) currentModel.remove(hood)

//         const hoodOpening = currentModel.getObjectByName("custom-hood-opening")
//         if (hoodOpening) currentModel.remove(hoodOpening)

//         const leftString = currentModel.getObjectByName("custom-left-string")
//         if (leftString) currentModel.remove(leftString)

//         const rightString = currentModel.getObjectByName("custom-right-string")
//         if (rightString) currentModel.remove(rightString)
//         break
//     }
//   } catch (error) {
//     console.error("Error removing accessory:", error)
//     // Continue without removing accessory if there's an error
//   }
// }

// // Save the current design
// function saveDesign() {
//   try {
//     // Create a new saved design element
//     const savedDesignsGrid = document.querySelector(".grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3")
//     if (!savedDesignsGrid) return

//     const designId = `design-${Date.now()}`

//     // Create a new design card
//     const designCard = document.createElement("div")
//     designCard.className = "saved-design bg-white rounded-lg shadow-md overflow-hidden"
//     designCard.setAttribute("data-id", designId)

//     // In a real app, we would capture a screenshot of the 3D model
//     // For demo purposes, we'll use a placeholder image based on the model type
//     let imageSrc = "assets/images/custwhite.jpg"
//     if (currentModelType === "hoodie") imageSrc = "assets/images/bluhoodie.jpeg"
//     if (currentModelType === "jacket") imageSrc = "assets/images/floral.jpeg"

//     designCard.innerHTML = `
//       <img src="${imageSrc}" alt="Saved Design" class="w-full h-48 object-cover">
//       <div class="p-4">
//         <h3 class="font-bold mb-1">Custom ${currentModelType.charAt(0).toUpperCase() + currentModelType.slice(1)}</h3>
//         <p class="text-sm text-gray-500 mb-4">Created on: ${new Date().toLocaleDateString()}</p>
//         <div class="flex space-x-2">
//           <button class="edit-btn px-4 py-2 bg-rewear-text text-white rounded-md hover:bg-gray-800 transition-colors">
//             Edit
//           </button>
//           <button class="delete-btn px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
//             Delete
//           </button>
//         </div>
//       </div>
//     `

//     // Add event listeners
//     designCard.querySelector(".edit-btn").addEventListener("click", () => {
//       loadSavedDesign(designId)
//     })

//     designCard.querySelector(".delete-btn").addEventListener("click", () => {
//       deleteSavedDesign(designId)
//     })

//     // Add to the grid
//     savedDesignsGrid.prepend(designCard)

//     // Show success message
//     alert("Design saved successfully!")
//   } catch (error) {
//     console.error("Error saving design:", error)
//     alert("Error saving design. Please try again.")
//   }
// }

// // Share the current design
// function shareDesign() {
//   // In a real app, this would generate a shareable link
//   alert("Share functionality would be implemented here. This would generate a unique URL to share your design.")
// }

// // Add the current design to cart
// function addToCart() {
//   // In a real app, this would add the design to the shopping cart
//   alert("Design added to cart!")
// }

// // Load a saved design
// function loadSavedDesign(designId) {
//   try {
//     // In a real app, this would load from a database
//     // For demo purposes, we'll set some predefined values

//     // Set model type based on design ID
//     if (designId === "saved-design-1") {
//       currentModelType = "tshirt"
//       currentColor = "#FFFFFF"
//       currentPattern = "none"
//       currentMaterial = "cotton"
//       currentAccessories = ["pocket"]
//     } else if (designId === "saved-design-2") {
//       currentModelType = "hoodie"
//       currentColor = "#3357FF"
//       currentPattern = "stripes"
//       currentMaterial = "cotton"
//       currentAccessories = []
//     } else if (designId === "saved-design-3") {
//       currentModelType = "jacket"
//       currentColor = "#F3F3A6"
//       currentPattern = "floral"
//       currentMaterial = "linen"
//       currentAccessories = ["buttons"]
//     } else {
//       // For dynamically created designs
//       currentModelType = "tshirt"
//       currentColor = "#3357FF"
//       currentPattern = "dots"
//       currentMaterial = "cotton"
//       currentAccessories = ["pocket"]
//     }

//     // Show the model
//     showModel(currentModelType)

//     // Update UI
//     updateUI()

//     // Clear existing accessories
//     if (currentModel) {
//       removeAccessory("pocket")
//       removeAccessory("buttons")
//       removeAccessory("hood")
//     }

//     // Add new accessories
//     currentAccessories.forEach((accessory) => {
//       addAccessory(accessory)

//       // Update checkbox
//       const toggle = document.querySelector(`.accessory-option[data-accessory="${accessory}"] .accessory-toggle`)
//       if (toggle) toggle.checked = true
//     })

//     alert(`Design ${designId} loaded!`)
//   } catch (error) {
//     console.error("Error loading design:", error)
//     alert("Error loading design. Please try again.")
//   }
// }

// // Delete a saved design
// function deleteSavedDesign(designId) {
//   try {
//     // In a real app, this would delete from a database
//     // For now, we'll just remove the element from the DOM
//     const designElement = document.querySelector(`.saved-design[data-id="${designId}"]`)
//     if (designElement) {
//       designElement.remove()
//       alert(`Design ${designId} deleted!`)
//     }
//   } catch (error) {
//     console.error("Error deleting design:", error)
//     alert("Error deleting design. Please try again.")
//   }
// }

// // Try a recommended design
// function tryRecommendedDesign(recommendedId) {
//   try {
//     // Set properties based on recommendation
//     switch (recommendedId) {
//       case "eco-friendly":
//         currentModelType = "tshirt"
//         currentColor = "#33FF57"
//         currentPattern = "none"
//         currentMaterial = "cotton"
//         currentAccessories = []
//         break

//       case "urban-style":
//         currentModelType = "hoodie"
//         currentColor = "#000000"
//         currentPattern = "dots"
//         currentMaterial = "cotton"
//         currentAccessories = ["pocket"]
//         break

//       case "vintage":
//         currentModelType = "jacket"
//         currentColor = "#F3F3A6"
//         currentPattern = "floral"
//         currentMaterial = "linen"
//         currentAccessories = ["buttons"]
//         break
//     }

//     // Show the model
//     showModel(currentModelType)

//     // Update UI
//     updateUI()

//     // Clear existing accessories
//     if (currentModel) {
//       removeAccessory("pocket")
//       removeAccessory("buttons")
//       removeAccessory("hood")
//     }

//     // Add new accessories
//     currentAccessories.forEach((accessory) => {
//       addAccessory(accessory)

//       // Update checkbox
//       const toggle = document.querySelector(`.accessory-option[data-accessory="${accessory}"] .accessory-toggle`)
//       if (toggle) toggle.checked = true
//     })

//     alert(`Recommended design "${recommendedId}" applied!`)
//   } catch (error) {
//     console.error("Error applying recommended design:", error)
//     alert("Error applying recommended design. Please try again.")
//   }
// }

// // Update UI to match current settings
// function updateUI() {
//   try {
//     // Update item selection
//     document.querySelectorAll(".item-option").forEach((option) => {
//       option.classList.remove("active")
//       if (option.getAttribute("data-item") === currentModelType) {
//         option.classList.add("active")
//       }
//     })

//     // Update color selection
//     document.querySelectorAll(".color-option").forEach((option) => {
//       option.classList.remove("active")
//       if (option.getAttribute("data-color") === currentColor) {
//         option.classList.add("active")
//       }
//     })

//     // Update pattern selection
//     document.querySelectorAll(".pattern-option").forEach((option) => {
//       option.classList.remove("active")
//       if (option.getAttribute("data-pattern") === currentPattern) {
//         option.classList.add("active")
//       }
//     })

//     // Update material selection
//     document.querySelectorAll(".material-option").forEach((option) => {
//       option.classList.remove("active")
//       if (option.getAttribute("data-material") === currentMaterial) {
//         option.classList.add("active")
//       }
//     })

//     // Update accessory toggles
//     document.querySelectorAll(".accessory-toggle").forEach((toggle) => {
//       const accessory = toggle.parentElement.parentElement.getAttribute("data-accessory")
//       toggle.checked = currentAccessories.includes(accessory)
//     })
//   } catch (error) {
//     console.error("Error updating UI:", error)
//     // Continue without updating UI if there's an error
//   }
// }

// // Set up sample data
// function setupSampleData() {
//   try {
//     // Set data attributes for saved designs
//     document.querySelectorAll(".saved-design").forEach((design, index) => {
//       design.setAttribute("data-id", `saved-design-${index + 1}`)
//     })

//     // Set data attributes for recommended designs
//     const recommendedItems = document.querySelectorAll(".recommended-item")
//     if (recommendedItems.length >= 1) recommendedItems[0].setAttribute("data-id", "eco-friendly")
//     if (recommendedItems.length >= 2) recommendedItems[1].setAttribute("data-id", "urban-style")
//     if (recommendedItems.length >= 3) recommendedItems[2].setAttribute("data-id", "vintage")
//   } catch (error) {
//     console.error("Error setting up sample data:", error)
//     // Continue without setting up sample data if there's an error
//   }
// }

// baruuuuuuuuuuu
// // Debug logging
// console.log("Redesign.js loaded")

// Debug logging
console.log("Redesign.js loaded")

// Import Three.js
const THREE = window.THREE

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing redesign studio...")

  // Check if Three.js is loaded
  if (typeof THREE === "undefined") {
    console.error("Three.js not loaded!")
    hideLoadingIndicator()
    document.getElementById("model-viewer").innerHTML =
      '<div class="flex items-center justify-center h-full bg-gray-100 rounded-lg"><p class="text-red-500">Error: Three.js library not loaded</p></div>'
    return
  }

  // Initialize the 3D viewer
  initializeViewer()

  // Initialize UI controls
  initializeControls()

  // Set up sample data
  setupSampleData()
})

// Helper function to hide loading indicator
function hideLoadingIndicator() {
  const loadingContainer = document.getElementById("loading-container")
  if (loadingContainer) {
    loadingContainer.style.display = "none"
  }
}

// Global variables
let scene, camera, renderer, controls
let tshirtModel, hoodieModel, jacketModel
let currentModel = null
let currentModelType = "tshirt"
let currentColor = "#FFFFFF"
let currentPattern = "none"
let currentMaterial = "cotton"
let currentAccessories = []

// Initialize the 3D viewer
function initializeViewer() {
  const container = document.getElementById("model-viewer")
  if (!container) {
    console.error("Model viewer container not found!")
    hideLoadingIndicator()
    return
  }

  // Get loading container
  const loadingContainer = document.getElementById("loading-container")

  // Set up scene
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf8f8f8)

  // Set up camera
  const width = container.clientWidth || 800
  const height = container.clientHeight || 400 // Fallback height
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
  camera.position.set(0, 0, 5)

  // Set up renderer
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limit pixel ratio for performance
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  container.appendChild(renderer.domElement)

  // Set up lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(2, 2, 5)
  directionalLight.castShadow = true
  directionalLight.shadow.mapSize.width = 1024
  directionalLight.shadow.mapSize.height = 1024
  scene.add(directionalLight)

  const backLight = new THREE.DirectionalLight(0xffffff, 0.4)
  backLight.position.set(-2, 2, -5)
  scene.add(backLight)

  // Add fill light for better fabric rendering
  const fillLight = new THREE.PointLight(0xffffee, 0.5, 10)
  fillLight.position.set(0, 1, 4)
  scene.add(fillLight)

  // Set up controls
  if (typeof THREE.OrbitControls !== "undefined") {
    controls = new THREE.OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.1
    controls.enableZoom = true
    controls.minDistance = 3
    controls.maxDistance = 10
  } else {
    console.warn("OrbitControls not available")
  }

  // Create models - using synchronous approach to avoid loading issues
  try {
    createModels()

    // Show initial model
    showModel(currentModelType)

    // Start animation loop
    animate()

    // Hide loading indicator
    if (loadingContainer) {
      loadingContainer.style.display = "none"
    }
  } catch (error) {
    console.error("Error creating models:", error)
    if (loadingContainer) {
      loadingContainer.style.display = "none"
    }
    container.innerHTML = `
      <div class="flex items-center justify-center h-full bg-gray-100 rounded-lg">
        <p class="text-red-500">Error loading 3D models: ${error.message}</p>
      </div>
    `
  }

  // Handle window resize
  window.addEventListener("resize", () => {
    const width = container.clientWidth || 800
    const height = container.clientHeight || 400
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  })
}

// Create all clothing models
function createModels() {
  // Create base material
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(currentColor),
    side: THREE.DoubleSide,
    roughness: 0.7,
    metalness: 0.1,
  })

  // Create T-shirt model
  tshirtModel = new THREE.Group()
  createTshirtModel(tshirtModel, material.clone())
  tshirtModel.visible = false
  scene.add(tshirtModel)

  // Create hoodie model
  hoodieModel = new THREE.Group()
  createHoodieModel(hoodieModel, material.clone())
  hoodieModel.visible = false
  scene.add(hoodieModel)

  // Create jacket model
  jacketModel = new THREE.Group()
  createJacketModel(jacketModel, material.clone())
  jacketModel.visible = false
  scene.add(jacketModel)
}

// Create T-shirt model with organic, realistic geometry
function createTshirtModel(group, material) {
  try {
    // Create more organic body shape using custom geometry
    const bodyGeometry = createOrganicTshirtGeometry()
    const body = new THREE.Mesh(bodyGeometry, material)
    body.castShadow = true
    body.receiveShadow = true
    group.add(body)

    // Create collar
    const collarGeometry = createOrganicCollarGeometry()
    const collar = new THREE.Mesh(collarGeometry, material)
    collar.position.set(0, 1.8, 0)
    collar.castShadow = true
    collar.receiveShadow = true
    group.add(collar)

    // Create sleeves with better positioning and organic shape
    const leftSleeveGeometry = createOrganicSleeveGeometry(true)
    const leftSleeve = new THREE.Mesh(leftSleeveGeometry, material)
    // Adjust position to connect with the body
    leftSleeve.position.set(-0.85, 1.3, 0)
    leftSleeve.rotation.z = Math.PI / 12 // Slight rotation for better fit
    leftSleeve.castShadow = true
    leftSleeve.receiveShadow = true
    group.add(leftSleeve)

    const rightSleeveGeometry = createOrganicSleeveGeometry(false)
    const rightSleeve = new THREE.Mesh(rightSleeveGeometry, material)
    // Adjust position to connect with the body
    rightSleeve.position.set(0.85, 1.3, 0)
    rightSleeve.rotation.z = -Math.PI / 12 // Slight rotation for better fit
    rightSleeve.castShadow = true
    rightSleeve.receiveShadow = true
    group.add(rightSleeve)

    // Add subtle animation to simulate fabric movement
    addSubtleAnimation(body, 0.002)
    addSubtleAnimation(leftSleeve, 0.003)
    addSubtleAnimation(rightSleeve, 0.003)

    // Store reference to material for later updates
    group.userData.material = material
  } catch (error) {
    console.error("Error creating T-shirt model:", error)
    createFallbackTshirtModel(group, material)
  }
}

// Create a more organic T-shirt geometry with natural curves and folds
function createOrganicTshirtGeometry() {
  try {
    // Create a shape for the front of the T-shirt with more natural curves
    const shape = new THREE.Shape()

    // Define the T-shirt silhouette with smoother curves and wider shoulders
    shape.moveTo(0, -1.5) // Bottom center

    // Bottom left curve - more natural draping
    shape.bezierCurveTo(-0.3, -1.5, -0.9, -1.4, -1.0, -0.8)

    // Left side up with subtle curve
    shape.bezierCurveTo(-1.05, -0.4, -1.05, 0.2, -1.0, 0.8)

    // Wider shoulder area for better sleeve connection with natural curve
    shape.bezierCurveTo(-0.95, 1.1, -0.9, 1.3, -0.85, 1.4)
    shape.bezierCurveTo(-0.8, 1.5, -0.7, 1.6, -0.5, 1.7)

    // Left neck with natural curve
    shape.bezierCurveTo(-0.4, 1.75, -0.3, 1.8, -0.2, 1.8)

    // Neck bottom
    shape.lineTo(0.2, 1.8)

    // Right neck with natural curve
    shape.bezierCurveTo(0.3, 1.8, 0.4, 1.75, 0.5, 1.7)

    // Right shoulder with natural curve
    shape.bezierCurveTo(0.7, 1.6, 0.8, 1.5, 0.85, 1.4)
    shape.bezierCurveTo(0.9, 1.3, 0.95, 1.1, 1.0, 0.8)

    // Right side down with subtle curve
    shape.bezierCurveTo(1.05, 0.2, 1.05, -0.4, 1.0, -0.8)

    // Bottom right curve - more natural draping
    shape.bezierCurveTo(0.9, -1.4, 0.3, -1.5, 0, -1.5)

    // Extrude the shape to create a 3D T-shirt body with more depth variation
    const extrudeSettings = {
      steps: 4, // More steps for smoother extrusion
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelOffset: 0,
      bevelSegments: 4, // More segments for smoother bevels
    }

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

    // Modify the geometry to create a more natural, less boxy shape
    const positions = geometry.attributes.position.array
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]
      const z = positions[i + 2]

      // Create natural front-to-back curvature
      const frontCurve = Math.sin(((y + 1.5) / 3) * Math.PI) * 0.1
      positions[i + 2] = z + frontCurve

      // Add subtle waist tapering
      if (y < 0 && y > -1) {
        const waistFactor = Math.sin((y + 0.5) * Math.PI) * 0.05
        positions[i] = x * (1 - waistFactor)
      }

      // Add subtle shoulder shaping
      if (y > 1 && Math.abs(x) > 0.5) {
        const shoulderDrop = (Math.abs(x) - 0.5) * 0.1
        positions[i + 1] = y - shoulderDrop
      }

      // Add natural wrinkles and folds
      const wrinkleIntensity = 0.02
      const wrinkleFrequency = 8

      // More wrinkles at the bottom for natural fabric gathering
      const bottomWrinkles = y < -0.5 ? Math.sin(x * 10) * Math.sin(z * 8) * 0.03 : 0

      // Subtle wrinkles throughout the shirt
      const wrinkleX = Math.sin(y * wrinkleFrequency) * Math.sin(x * wrinkleFrequency) * wrinkleIntensity
      const wrinkleY = Math.sin(x * wrinkleFrequency) * Math.sin(z * wrinkleFrequency) * wrinkleIntensity
      const wrinkleZ = Math.sin((x + y) * wrinkleFrequency) * wrinkleIntensity

      positions[i] += wrinkleX
      positions[i + 1] += wrinkleY + bottomWrinkles
      positions[i + 2] += wrinkleZ
    }

    geometry.computeVertexNormals()
    return geometry
  } catch (error) {
    console.error("Error creating organic T-shirt geometry:", error)
    // Fallback to simple geometry if there's an error
    return new THREE.BoxGeometry(2, 3, 0.2)
  }
}

// Create a more organic collar geometry
function createOrganicCollarGeometry() {
  try {
    const shape = new THREE.Shape()

    // Create a more natural U-shaped collar
    shape.moveTo(-0.25, 0)
    shape.bezierCurveTo(-0.25, -0.05, -0.2, -0.15, -0.15, -0.2)
    shape.bezierCurveTo(-0.1, -0.25, -0.05, -0.28, 0, -0.3)
    shape.bezierCurveTo(0.05, -0.28, 0.1, -0.25, 0.15, -0.2)
    shape.bezierCurveTo(0.2, -0.15, 0.25, -0.05, 0.25, 0)
    shape.bezierCurveTo(0.25, 0.05, 0.2, 0.05, 0.15, 0.05)
    shape.lineTo(-0.15, 0.05)
    shape.bezierCurveTo(-0.2, 0.05, -0.25, 0.05, -0.25, 0)

    const extrudeSettings = {
      steps: 2,
      depth: 0.12,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 3,
    }

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

    // Add subtle variations to make it more natural
    const positions = geometry.attributes.position.array
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]
      const z = positions[i + 2]

      // Add subtle ripples to the collar edge
      const edgeRipple = Math.sin(x * 20) * 0.005

      // Apply subtle deformations
      positions[i + 1] += edgeRipple
      positions[i + 2] += Math.sin(x * 10) * 0.005
    }

    geometry.computeVertexNormals()
    return geometry
  } catch (error) {
    console.error("Error creating organic collar geometry:", error)
    // Fallback to simple geometry if there's an error
    return new THREE.TorusGeometry(0.3, 0.1, 16, 32, Math.PI)
  }
}

// Create organic sleeve geometry
function createOrganicSleeveGeometry(isLeft) {
  try {
    // Create a more natural path for the sleeve that connects better to the body
    const path = new THREE.CatmullRomCurve3([
      // Start point inside the body for better connection
      new THREE.Vector3(isLeft ? -0.1 : 0.1, 0, 0),
      new THREE.Vector3(isLeft ? -0.3 : 0.3, -0.05, 0.05),
      new THREE.Vector3(isLeft ? -0.5 : 0.5, -0.15, 0.02),
      new THREE.Vector3(isLeft ? -0.7 : 0.7, -0.3, -0.03),
    ])

    // Create a custom shape for the sleeve cross-section - more oval for natural arm fit
    const sleeveShape = new THREE.Shape()
    const segments = 12

    // Create an oval shape for better arm fit
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      // More oval shape (0.7 ratio) for natural arm fit
      const x = Math.cos(angle) * 0.25
      const y = Math.sin(angle) * (0.25 * 0.7)

      if (i === 0) {
        sleeveShape.moveTo(x, y)
      } else {
        sleeveShape.lineTo(x, y)
      }
    }
    sleeveShape.closePath()

    // Create an extrusion along the path with more segments for smoother result
    const extrudeSettings = {
      steps: 24,
      bevelEnabled: false,
      extrudePath: path,
    }

    const geometry = new THREE.ExtrudeGeometry(sleeveShape, extrudeSettings)

    // Add natural wrinkles and folds to the sleeve
    const positions = geometry.attributes.position.array
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]
      const z = positions[i + 2]

      // Calculate distance along the sleeve
      const distanceAlongSleeve = Math.sqrt(x * x + y * y + z * z)

      // Add more wrinkles near the shoulder connection
      const shoulderWrinkles = Math.sin(distanceAlongSleeve * 15) * 0.01

      // Add subtle ripples throughout
      const rippleX = Math.sin(y * 20 + x * 15) * 0.005
      const rippleY = Math.sin(x * 20 + z * 15) * 0.005
      const rippleZ = Math.sin(y * 20 + z * 15) * 0.005

      positions[i] += rippleX + shoulderWrinkles
      positions[i + 1] += rippleY
      positions[i + 2] += rippleZ
    }

    geometry.computeVertexNormals()
    return geometry
  } catch (error) {
    console.error("Error creating organic sleeve geometry:", error)
    // Fallback to simple geometry if there's an error
    const sleeveGeometry = new THREE.CylinderGeometry(0.3, 0.25, 0.8, 16)
    sleeveGeometry.rotateX(Math.PI / 2)
    return sleeveGeometry
  }
}

// Create hoodie model with organic shapes
function createHoodieModel(group, material) {
  try {
    // Create hoodie body with organic shape
    const bodyGeometry = createOrganicHoodieGeometry()
    const body = new THREE.Mesh(bodyGeometry, material)
    body.castShadow = true
    body.receiveShadow = true
    group.add(body)

    // Create hood with organic shape
    const hoodGeometry = createOrganicHoodGeometry()
    const hood = new THREE.Mesh(hoodGeometry, material)
    hood.position.set(0, 1.9, -0.3)
    hood.rotation.x = Math.PI
    hood.castShadow = true
    hood.receiveShadow = true
    group.add(hood)

    // Create sleeves with better positioning and organic shape
    const leftSleeveGeometry = createOrganicHoodieSleeveGeometry(true)
    const leftSleeve = new THREE.Mesh(leftSleeveGeometry, material)
    // Adjust position to connect with the body
    leftSleeve.position.set(-0.9, 1.25, 0)
    leftSleeve.rotation.z = Math.PI / 12 // Slight rotation for better fit
    leftSleeve.castShadow = true
    leftSleeve.receiveShadow = true
    group.add(leftSleeve)

    const rightSleeveGeometry = createOrganicHoodieSleeveGeometry(false)
    const rightSleeve = new THREE.Mesh(rightSleeveGeometry, material)
    // Adjust position to connect with the body
    rightSleeve.position.set(0.9, 1.25, 0)
    rightSleeve.rotation.z = -Math.PI / 12 // Slight rotation for better fit
    rightSleeve.castShadow = true
    rightSleeve.receiveShadow = true
    group.add(rightSleeve)

    // Create pocket with organic shape
    const pocketGeometry = createOrganicPocketGeometry()
    const pocket = new THREE.Mesh(pocketGeometry, material)
    pocket.position.set(0, 0.3, 0.4)
    pocket.castShadow = true
    pocket.receiveShadow = true
    group.add(pocket)

    // Create drawstrings
    const stringMaterial = new THREE.MeshStandardMaterial({
      color: 0x888888,
      roughness: 0.8,
      metalness: 0.1,
    })

    const leftStringGeometry = createOrganicDrawstringGeometry()
    const leftString = new THREE.Mesh(leftStringGeometry, stringMaterial)
    leftString.position.set(-0.15, 1.5, 0.25)
    leftString.castShadow = true
    group.add(leftString)

    const rightStringGeometry = createOrganicDrawstringGeometry()
    const rightString = new THREE.Mesh(rightStringGeometry, stringMaterial)
    rightString.position.set(0.15, 1.5, 0.25)
    rightString.castShadow = true
    group.add(rightString)

    // Add subtle animation to simulate fabric movement
    addSubtleAnimation(body, 0.002)
    addSubtleAnimation(leftSleeve, 0.003)
    addSubtleAnimation(rightSleeve, 0.003)
    addSubtleAnimation(hood, 0.001)
    addSubtleAnimation(pocket, 0.001)

    // Store reference to material for later updates
    group.userData.material = material
  } catch (error) {
    console.error("Error creating hoodie model:", error)
    createFallbackHoodieModel(group, material)
  }
}

// Create organic hoodie geometry
function createOrganicHoodieGeometry() {
  try {
    // Create a shape for the front of the hoodie with more natural curves
    const shape = new THREE.Shape()

    // Define the hoodie silhouette with smoother curves
    shape.moveTo(0, -1.7) // Bottom center

    // Bottom left curve with natural draping
    shape.bezierCurveTo(-0.3, -1.7, -0.9, -1.6, -1.1, -1.0)

    // Left side up with subtle curve
    shape.bezierCurveTo(-1.15, -0.5, -1.15, 0.2, -1.1, 0.9)

    // Left shoulder with natural curve
    shape.bezierCurveTo(-1.05, 1.3, -0.9, 1.6, -0.6, 1.8)

    // Left neck with natural curve
    shape.bezierCurveTo(-0.5, 1.85, -0.4, 1.9, -0.3, 1.9)

    // Neck bottom
    shape.lineTo(0.3, 1.9)

    // Right neck with natural curve
    shape.bezierCurveTo(0.4, 1.9, 0.5, 1.85, 0.6, 1.8)

    // Right shoulder with natural curve
    shape.bezierCurveTo(0.9, 1.6, 1.05, 1.3, 1.1, 0.9)

    // Right side down with subtle curve
    shape.bezierCurveTo(1.15, 0.2, 1.15, -0.5, 1.1, -1.0)

    // Bottom right curve with natural draping
    shape.bezierCurveTo(0.9, -1.6, 0.3, -1.7, 0, -1.7)

    // Extrude the shape to create a 3D hoodie body with more depth variation
    const extrudeSettings = {
      steps: 4, // More steps for smoother extrusion
      depth: 0.5,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.08,
      bevelOffset: 0,
      bevelSegments: 4, // More segments for smoother bevels
    }

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

    // Modify the geometry to create a more natural, less boxy shape
    const positions = geometry.attributes.position.array
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]
      const z = positions[i + 2]

      // Create natural front-to-back curvature
      const frontCurve = Math.sin(((y + 1.7) / 3.4) * Math.PI) * 0.15
      positions[i + 2] = z + frontCurve

      // Add subtle waist tapering
      if (y < 0 && y > -1.2) {
        const waistFactor = Math.sin((y + 0.6) * Math.PI) * 0.04
        positions[i] = x * (1 - waistFactor)
      }

      // Add subtle shoulder shaping
      if (y > 1.2 && Math.abs(x) > 0.6) {
        const shoulderDrop = (Math.abs(x) - 0.6) * 0.12
        positions[i + 1] = y - shoulderDrop
      }

      // Add natural wrinkles and folds
      const wrinkleIntensity = 0.025
      const wrinkleFrequency = 6

      // More wrinkles at the bottom for natural fabric gathering
      const bottomWrinkles = y < -0.8 ? Math.sin(x * 8) * Math.sin(z * 6) * 0.04 : 0

      // Subtle wrinkles throughout the hoodie
      const wrinkleX = Math.sin(y * wrinkleFrequency) * Math.sin(x * wrinkleFrequency) * wrinkleIntensity
      const wrinkleY = Math.sin(x * wrinkleFrequency) * Math.sin(z * wrinkleFrequency) * wrinkleIntensity
      const wrinkleZ = Math.sin((x + y) * wrinkleFrequency) * wrinkleIntensity

      positions[i] += wrinkleX
      positions[i + 1] += wrinkleY + bottomWrinkles
      positions[i + 2] += wrinkleZ
    }

    geometry.computeVertexNormals()
    return geometry
  } catch (error) {
    console.error("Error creating organic hoodie geometry:", error)
    // Fallback to simple geometry if there's an error
    return new THREE.BoxGeometry(2.2, 3.2, 0.3)
  }
}

// Create organic hood geometry
function createOrganicHoodGeometry() {
  try {
    // Create a half-sphere for the hood with more segments for smoother shape
    const geometry = new THREE.SphereGeometry(0.6, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2)

    // Modify the geometry to create a more realistic hood shape
    const positions = geometry.attributes.position.array
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]
      const z = positions[i + 2]

      // Elongate the hood slightly and make it more oval
      positions[i] = x * 1.1
      positions[i + 2] = z * 1.3

      // Create a more natural hood shape by adding subtle deformations
      const deformationX = Math.sin(x * 10) * Math.sin(z * 8) * 0.02
      const deformationY = Math.sin(z * 12) * Math.sin(x * 10) * 0.02
      const deformationZ = Math.sin(x * 8) * Math.sin(y * 10) * 0.02

      positions[i] += deformationX
      positions[i + 1] += deformationY
      positions[i + 2] += deformationZ

      // Add more natural draping at the edges
      if (y < 0.1) {
        const edgeDrape = Math.pow(1 - y, 2) * 0.05
        positions[i + 1] -= edgeDrape
      }
    }

    geometry.computeVertexNormals()
    return geometry
  } catch (error) {
    console.error("Error creating organic hood geometry:", error)
    // Fallback to simple geometry if there's an error
    return new THREE.SphereGeometry(0.6, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2)
  }
}

// Create organic hoodie sleeve geometry
function createOrganicHoodieSleeveGeometry(isLeft) {
  try {
    // Create a more natural path for the sleeve that connects better to the body
    const path = new THREE.CatmullRomCurve3([
      // Start point inside the body for better connection
      new THREE.Vector3(isLeft ? -0.1 : 0.1, 0, 0),
      new THREE.Vector3(isLeft ? -0.3 : 0.3, -0.1, 0.05),
      new THREE.Vector3(isLeft ? -0.5 : 0.5, -0.3, 0.02),
      new THREE.Vector3(isLeft ? -0.7 : 0.7, -0.5, -0.03),
      new THREE.Vector3(isLeft ? -0.75 : 0.75, -0.7, -0.08),
    ])

    // Create a custom shape for the sleeve cross-section - more oval for natural arm fit
    const sleeveShape = new THREE.Shape()
    const segments = 12

    // Create an oval shape for better arm fit
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      // More oval shape (0.75 ratio) for natural arm fit
      const x = Math.cos(angle) * 0.3
      const y = Math.sin(angle) * (0.3 * 0.75)

      if (i === 0) {
        sleeveShape.moveTo(x, y)
      } else {
        sleeveShape.lineTo(x, y)
      }
    }
    sleeveShape.closePath()

    // Create an extrusion along the path with more segments for smoother result
    const extrudeSettings = {
      steps: 24,
      bevelEnabled: false,
      extrudePath: path,
    }

    const geometry = new THREE.ExtrudeGeometry(sleeveShape, extrudeSettings)

    // Add natural wrinkles and folds to the sleeve
    const positions = geometry.attributes.position.array
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]
      const z = positions[i + 2]

      // Calculate distance along the sleeve
      const distanceAlongSleeve = Math.sqrt(x * x + y * y + z * z)

      // Add more wrinkles near the shoulder connection and cuff
      const shoulderWrinkles = Math.sin(distanceAlongSleeve * 12) * 0.015

      // Add subtle ripples throughout
      const rippleX = Math.sin(y * 15 + x * 12) * 0.008
      const rippleY = Math.sin(x * 15 + z * 12) * 0.008
      const rippleZ = Math.sin(y * 15 + z * 12) * 0.008

      positions[i] += rippleX + shoulderWrinkles
      positions[i + 1] += rippleY
      positions[i + 2] += rippleZ

      // Add subtle tapering at the cuff
      if (distanceAlongSleeve > 0.6) {
        const cuffTaper = (distanceAlongSleeve - 0.6) * 0.1
        positions[i] *= 1 - cuffTaper
        positions[i + 1] *= 1 - cuffTaper
      }
    }

    geometry.computeVertexNormals()
    return geometry
  } catch (error) {
    console.error("Error creating organic hoodie sleeve geometry:", error)
    // Fallback to simple geometry if there's an error
    const sleeveGeometry = new THREE.CylinderGeometry(0.35, 0.3, 1, 16)
    sleeveGeometry.rotateX(Math.PI / 2)
    return sleeveGeometry
  }
}

// Create organic pocket geometry
function createOrganicPocketGeometry() {
  try {
    const shape = new THREE.Shape()

    // Create a more natural rounded pocket shape
    shape.moveTo(-0.5, 0.3)
    shape.bezierCurveTo(-0.5, 0.3, -0.6, 0.1, -0.6, -0.1)
    shape.bezierCurveTo(-0.6, -0.2, -0.5, -0.3, -0.4, -0.35)
    shape.bezierCurveTo(-0.3, -0.38, -0.1, -0.4, 0, -0.4)
    shape.bezierCurveTo(0.1, -0.4, 0.3, -0.38, 0.4, -0.35)
    shape.bezierCurveTo(0.5, -0.3, 0.6, -0.2, 0.6, -0.1)
    shape.bezierCurveTo(0.6, 0.1, 0.5, 0.3, 0.5, 0.3)
    shape.lineTo(-0.5, 0.3)

    const extrudeSettings = {
      steps: 2,
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 3,
    }

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

    // Add subtle variations to make it more natural
    const positions = geometry.attributes.position.array
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]
      const z = positions[i + 2]

      // Add subtle ripples to simulate fabric texture
      const rippleX = Math.sin(y * 20 + x * 15) * 0.005
      const rippleY = Math.sin(x * 20 + z * 15) * 0.005
      const rippleZ = Math.sin(y * 20 + z * 15) * 0.005

      positions[i] += rippleX
      positions[i + 1] += rippleY
      positions[i + 2] += rippleZ

      // Add subtle bulge in the middle to make it look less flat
      const distFromCenter = Math.sqrt(x * x + y * y)
      const bulge = Math.max(0, 0.1 - distFromCenter) * 0.05
      positions[i + 2] += bulge
    }

    geometry.computeVertexNormals()
    return geometry
  } catch (error) {
    console.error("Error creating organic pocket geometry:", error)
    // Fallback to simple geometry if there's an error
    return new THREE.BoxGeometry(1.2, 0.8, 0.1)
  }
}

// Create organic drawstring geometry
function createOrganicDrawstringGeometry() {
  try {
    // Create a more natural, slightly curved path for the drawstring
    const path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.2, 0),
      new THREE.Vector3(0.05, 0.1, 0.05),
      new THREE.Vector3(0.02, 0, 0.1),
      new THREE.Vector3(-0.03, -0.1, 0.05),
      new THREE.Vector3(-0.01, -0.2, 0),
    ])

    // Create tube with more segments for smoother result
    return new THREE.TubeGeometry(
      path,
      24, // tubularSegments
      0.02, // radius
      8, // radialSegments
      false, // closed
    )
  } catch (error) {
    console.error("Error creating organic drawstring geometry:", error)
    // Fallback to simple geometry if there's an error
    return new THREE.CylinderGeometry(0.02, 0.02, 0.4, 8)
  }
}

// Create jacket model with organic shapes
function createJacketModel(group, material) {
  try {
    // Create jacket body with organic shape
    const bodyGeometry = createOrganicJacketGeometry()
    const body = new THREE.Mesh(bodyGeometry, material)
    body.castShadow = true
    body.receiveShadow = true
    group.add(body)

    // Create collar with organic shape
    const collarGeometry = createOrganicJacketCollarGeometry()
    const collar = new THREE.Mesh(collarGeometry, material)
    collar.position.set(0, 1.7, 0)
    collar.castShadow = true
    collar.receiveShadow = true
    group.add(collar)

    // Create sleeves with better positioning and organic shape
    const leftSleeveGeometry = createOrganicJacketSleeveGeometry(true)
    const leftSleeve = new THREE.Mesh(leftSleeveGeometry, material)
    // Adjust position to connect with the body
    leftSleeve.position.set(-0.9, 1.2, 0)
    leftSleeve.rotation.z = Math.PI / 12 // Slight rotation for better fit
    leftSleeve.castShadow = true
    leftSleeve.receiveShadow = true
    group.add(leftSleeve)

    const rightSleeveGeometry = createOrganicJacketSleeveGeometry(false)
    const rightSleeve = new THREE.Mesh(rightSleeveGeometry, material)
    // Adjust position to connect with the body
    rightSleeve.position.set(0.9, 1.2, 0)
    rightSleeve.rotation.z = -Math.PI / 12 // Slight rotation for better fit
    rightSleeve.castShadow = true
    rightSleeve.receiveShadow = true
    group.add(rightSleeve)

    // Create buttons
    const buttonMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.3,
      metalness: 0.7,
    })

    for (let i = 0; i < 4; i++) {
      const buttonGeometry = new THREE.CylinderGeometry(0.06, 0.06, 0.03, 16)
      const button = new THREE.Mesh(buttonGeometry, buttonMaterial)
      button.rotation.x = Math.PI / 2
      button.position.set(0.15, 1.2 - i * 0.4, 0.46)
      button.castShadow = true
      group.add(button)
    }

    // Add subtle animation to simulate fabric movement
    addSubtleAnimation(body, 0.0015)
    addSubtleAnimation(leftSleeve, 0.0025)
    addSubtleAnimation(rightSleeve, 0.0025)
    addSubtleAnimation(collar, 0.001)

    // Store reference to material for later updates
    group.userData.material = material
  } catch (error) {
    console.error("Error creating jacket model:", error)
    createFallbackJacketModel(group, material)
  }
}

// Create organic jacket geometry
function createOrganicJacketGeometry() {
  try {
    // Create a shape for the front of the jacket with more natural curves
    const shape = new THREE.Shape()

    // Define the jacket silhouette with smoother curves
    shape.moveTo(0, -1.8) // Bottom center

    // Bottom left curve with natural draping
    shape.bezierCurveTo(-0.3, -1.8, -1.0, -1.7, -1.2, -1.1)

    // Left side up with subtle curve
    shape.bezierCurveTo(-1.25, -0.6, -1.25, 0.2, -1.2, 1.0)

    // Left shoulder with natural curve
    shape.bezierCurveTo(-1.15, 1.4, -1.0, 1.7, -0.7, 1.9)

    // Left neck with natural curve
    shape.bezierCurveTo(-0.6, 1.95, -0.5, 2.0, -0.4, 2.0)

    // Neck bottom
    shape.lineTo(0.4, 2.0)

    // Right neck with natural curve
    shape.bezierCurveTo(0.5, 2.0, 0.6, 1.95, 0.7, 1.9)

    // Right shoulder with natural curve
    shape.bezierCurveTo(1.0, 1.7, 1.15, 1.4, 1.2, 1.0)

    // Right side down with subtle curve
    shape.bezierCurveTo(1.25, 0.2, 1.25, -0.6, 1.2, -1.1)

    // Bottom right curve with natural draping
    shape.bezierCurveTo(1.0, -1.7, 0.3, -1.8, 0, -1.8)

    // Extrude the shape to create a 3D jacket body with more depth variation
    const extrudeSettings = {
      steps: 4, // More steps for smoother extrusion
      depth: 0.6,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelOffset: 0,
      bevelSegments: 4, // More segments for smoother bevels
    }

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

    // Modify the geometry to create a more natural, less boxy shape
    const positions = geometry.attributes.position.array
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]
      const z = positions[i + 2]

      // Create natural front-to-back curvature
      const frontCurve = Math.sin(((y + 1.8) / 3.8) * Math.PI) * 0.2
      positions[i + 2] = z + frontCurve

      // Create front opening
      if (Math.abs(x) < 0.15) {
        const openingFactor = 1 - Math.abs(x) / 0.15
        positions[i + 2] += 0.08 * openingFactor
      }

      // Add subtle waist tapering
      if (y < 0 && y > -1.2) {
        const waistFactor = Math.sin((y + 0.6) * Math.PI) * 0.03
        positions[i] = x * (1 - waistFactor)
      }

      // Add subtle shoulder shaping
      if (y > 1.2 && Math.abs(x) > 0.6) {
        const shoulderDrop = (Math.abs(x) - 0.6) * 0.15
        positions[i + 1] = y - shoulderDrop
      }

      // Add natural wrinkles and folds
      const wrinkleIntensity = 0.02
      const wrinkleFrequency = 5

      // More wrinkles at the bottom for natural fabric gathering
      const bottomWrinkles = y < -1.0 ? Math.sin(x * 8) * Math.sin(z * 6) * 0.04 : 0

      // Subtle wrinkles throughout the jacket
      const wrinkleX = Math.sin(y * wrinkleFrequency) * Math.sin(x * wrinkleFrequency) * wrinkleIntensity
      const wrinkleY = Math.sin(x * wrinkleFrequency) * Math.sin(z * wrinkleFrequency) * wrinkleIntensity
      const wrinkleZ = Math.sin((x + y) * wrinkleFrequency) * wrinkleIntensity

      positions[i] += wrinkleX
      positions[i + 1] += wrinkleY + bottomWrinkles
      positions[i + 2] += wrinkleZ
    }

    geometry.computeVertexNormals()
    return geometry
  } catch (error) {
    console.error("Error creating organic jacket geometry:", error)
    // Fallback to simple geometry if there's an error
    return new THREE.BoxGeometry(2.3, 3.3, 0.4)
  }
}

// Create organic jacket collar geometry
function createOrganicJacketCollarGeometry() {
  try {
    const shape = new THREE.Shape()

    // Create a more natural V-shaped collar
    shape.moveTo(-0.4, 0.3)
    shape.bezierCurveTo(-0.4, 0.2, -0.3, 0, -0.2, -0.3)
    shape.bezierCurveTo(-0.15, -0.35, -0.05, -0.4, 0, -0.4)
    shape.bezierCurveTo(0.05, -0.4, 0.15, -0.35, 0.2, -0.3)
    shape.bezierCurveTo(0.3, 0, 0.4, 0.2, 0.4, 0.3)
    shape.bezierCurveTo(0.4, 0.35, 0.35, 0.4, 0.3, 0.4)
    shape.lineTo(-0.3, 0.4)
    shape.bezierCurveTo(-0.35, 0.4, -0.4, 0.35, -0.4, 0.3)

    const extrudeSettings = {
      steps: 2,
      depth: 0.15,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelOffset: 0,
      bevelSegments: 3,
    }

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

    // Add subtle variations to make it more natural
    const positions = geometry.attributes.position.array
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]
      const z = positions[i + 2]

      // Add subtle ripples to the collar edge
      const edgeRipple = Math.sin(x * 15) * Math.sin(y * 12) * 0.008

      // Apply subtle deformations
      positions[i] += edgeRipple
      positions[i + 1] += Math.sin(x * 12) * 0.006
      positions[i + 2] += Math.sin(y * 15) * 0.006

      // Add subtle fold along the collar
      if (y < 0) {
        const fold = Math.sin(y * 10) * 0.01
        positions[i + 2] += fold
      }
    }

    geometry.computeVertexNormals()
    return geometry
  } catch (error) {
    console.error("Error creating organic jacket collar geometry:", error)
    // Fallback to simple geometry if there's an error
    return new THREE.BoxGeometry(1.5, 0.5, 0.2)
  }
}

// Create organic jacket sleeve geometry
function createOrganicJacketSleeveGeometry(isLeft) {
  try {
    // Create a more natural path for the sleeve that connects better to the body
    const path = new THREE.CatmullRomCurve3([
      // Start point inside the body for better connection
      new THREE.Vector3(isLeft ? -0.1 : 0.1, 0, 0),
      new THREE.Vector3(isLeft ? -0.3 : 0.3, -0.15, 0.05),
      new THREE.Vector3(isLeft ? -0.5 : 0.5, -0.35, 0.02),
      new THREE.Vector3(isLeft ? -0.7 : 0.7, -0.6, -0.03),
      new THREE.Vector3(isLeft ? -0.8 : 0.8, -0.8, -0.08),
    ])

    // Create a custom shape for the sleeve cross-section - more oval for natural arm fit
    const sleeveShape = new THREE.Shape()
    const segments = 12

    // Create an oval shape for better arm fit
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      // More oval shape (0.8 ratio) for natural arm fit
      const x = Math.cos(angle) * 0.32
      const y = Math.sin(angle) * (0.32 * 0.8)

      if (i === 0) {
        sleeveShape.moveTo(x, y)
      } else {
        sleeveShape.lineTo(x, y)
      }
    }
    sleeveShape.closePath()

    // Create an extrusion along the path with more segments for smoother result
    const extrudeSettings = {
      steps: 24,
      bevelEnabled: false,
      extrudePath: path,
    }

    const geometry = new THREE.ExtrudeGeometry(sleeveShape, extrudeSettings)

    // Add natural wrinkles and folds to the sleeve
    const positions = geometry.attributes.position.array
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]
      const z = positions[i + 2]

      // Calculate distance along the sleeve
      const distanceAlongSleeve = Math.sqrt(x * x + y * y + z * z)

      // Add more wrinkles near the shoulder connection and cuff
      const shoulderWrinkles = Math.sin(distanceAlongSleeve * 10) * 0.015

      // Add subtle ripples throughout
      const rippleX = Math.sin(y * 12 + x * 10) * 0.01
      const rippleY = Math.sin(x * 12 + z * 10) * 0.01
      const rippleZ = Math.sin(y * 12 + z * 10) * 0.01

      positions[i] += rippleX + shoulderWrinkles
      positions[i + 1] += rippleY
      positions[i + 2] += rippleZ

      // Add subtle elbow bend
      if (distanceAlongSleeve > 0.4 && distanceAlongSleeve < 0.7) {
        const elbowBend = Math.sin(((distanceAlongSleeve - 0.4) * Math.PI) / 0.3) * 0.05
        positions[i + 2] += elbowBend
      }

      // Add subtle cuff detail
      if (distanceAlongSleeve > 0.75) {
        const cuffDetail = Math.sin(((distanceAlongSleeve - 0.75) * Math.PI) / 0.25) * 0.02
        positions[i] *= 1 + cuffDetail * 0.05
      }
    }

    geometry.computeVertexNormals()
    return geometry
  } catch (error) {
    console.error("Error creating organic jacket sleeve geometry:", error)
    // Fallback to simple geometry if there's an error
    const sleeveGeometry = new THREE.CylinderGeometry(0.4, 0.35, 1.2, 16)
    sleeveGeometry.rotateX(Math.PI / 2)
    return sleeveGeometry
  }
}

// Add subtle animation to simulate fabric movement
function addSubtleAnimation(mesh, intensity) {
  if (!mesh || !mesh.geometry || !mesh.geometry.attributes || !mesh.geometry.attributes.position) {
    return
  }

  // Store original positions for animation
  const originalPositions = mesh.geometry.attributes.position.array.slice()
  mesh.userData.originalPositions = originalPositions
  mesh.userData.animationIntensity = intensity || 0.002
  mesh.userData.animationPhase = Math.random() * Math.PI * 2 // Random starting phase
}

// Create fallback T-shirt model if the organic one fails
function createFallbackTshirtModel(group, material) {
  // Create simple body
  const bodyGeometry = new THREE.BoxGeometry(1.8, 2.2, 0.4)
  const body = new THREE.Mesh(bodyGeometry, material)
  body.castShadow = true
  body.receiveShadow = true
  group.add(body)

  // Create simple collar
  const collarGeometry = new THREE.TorusGeometry(0.3, 0.1, 16, 32, Math.PI)
  const collar = new THREE.Mesh(collarGeometry, material)
  collar.position.set(0, 1.1, 0)
  collar.rotation.x = Math.PI / 2
  collar.castShadow = true
  collar.receiveShadow = true
  group.add(collar)

  // Create simple sleeves
  const leftSleeveGeometry = new THREE.CylinderGeometry(0.25, 0.2, 0.5, 16)
  leftSleeveGeometry.rotateZ(Math.PI / 2)
  const leftSleeve = new THREE.Mesh(leftSleeveGeometry, material)
  leftSleeve.position.set(-0.9, 0.7, 0)
  leftSleeve.castShadow = true
  leftSleeve.receiveShadow = true
  group.add(leftSleeve)

  const rightSleeveGeometry = new THREE.CylinderGeometry(0.25, 0.2, 0.5, 16)
  rightSleeveGeometry.rotateZ(-Math.PI / 2)
  const rightSleeve = new THREE.Mesh(rightSleeveGeometry, material)
  rightSleeve.position.set(0.9, 0.7, 0)
  rightSleeve.castShadow = true
  rightSleeve.receiveShadow = true
  group.add(rightSleeve)

  // Store reference to material for later updates
  group.userData.material = material
}

// Create fallback hoodie model if the organic one fails
function createFallbackHoodieModel(group, material) {
  // Create simple body
  const bodyGeometry = new THREE.BoxGeometry(2.0, 2.4, 0.5)
  const body = new THREE.Mesh(bodyGeometry, material)
  body.castShadow = true
  body.receiveShadow = true
  group.add(body)

  // Create simple hood
  const hoodGeometry = new THREE.SphereGeometry(0.6, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2)
  const hood = new THREE.Mesh(hoodGeometry, material)
  hood.rotation.x = Math.PI
  hood.position.set(0, 1.3, -0.3)
  hood.castShadow = true
  hood.receiveShadow = true
  group.add(hood)

  // Create simple sleeves
  const leftSleeveGeometry = new THREE.CylinderGeometry(0.3, 0.25, 0.8, 16)
  leftSleeveGeometry.rotateZ(Math.PI / 2)
  const leftSleeve = new THREE.Mesh(leftSleeveGeometry, material)
  leftSleeve.position.set(-1.0, 0.7, 0)
  leftSleeve.castShadow = true
  leftSleeve.receiveShadow = true
  group.add(leftSleeve)

  const rightSleeveGeometry = new THREE.CylinderGeometry(0.3, 0.25, 0.8, 16)
  rightSleeveGeometry.rotateZ(-Math.PI / 2)
  const rightSleeve = new THREE.Mesh(rightSleeveGeometry, material)
  rightSleeve.position.set(1.0, 0.7, 0)
  rightSleeve.castShadow = true
  rightSleeve.receiveShadow = true
  group.add(rightSleeve)

  // Create simple pocket
  const pocketGeometry = new THREE.BoxGeometry(1.2, 0.8, 0.1)
  const pocket = new THREE.Mesh(pocketGeometry, material)
  pocket.position.set(0, -0.3, 0.3)
  pocket.castShadow = true
  pocket.receiveShadow = true
  group.add(pocket)

  // Store reference to material for later updates
  group.userData.material = material
}

// Create fallback jacket model if the organic one fails
function createFallbackJacketModel(group, material) {
  // Create simple body
  const bodyGeometry = new THREE.BoxGeometry(2.2, 2.5, 0.6)
  const body = new THREE.Mesh(bodyGeometry, material)
  body.castShadow = true
  body.receiveShadow = true
  group.add(body)

  // Create simple collar
  const collarGeometry = new THREE.BoxGeometry(1.5, 0.5, 0.2)
  const collar = new THREE.Mesh(collarGeometry, material)
  collar.position.set(0, 1.5, -0.2)
  collar.rotation.x = Math.PI / 6
  collar.castShadow = true
  collar.receiveShadow = true
  group.add(collar)

  // Create simple sleeves
  const leftSleeveGeometry = new THREE.CylinderGeometry(0.35, 0.3, 1.0, 16)
  leftSleeveGeometry.rotateZ(Math.PI / 2)
  const leftSleeve = new THREE.Mesh(leftSleeveGeometry, material)
  leftSleeve.position.set(-1.1, 0.7, 0)
  leftSleeve.castShadow = true
  leftSleeve.receiveShadow = true
  group.add(leftSleeve)

  const rightSleeveGeometry = new THREE.CylinderGeometry(0.35, 0.3, 1.0, 16)
  rightSleeveGeometry.rotateZ(-Math.PI / 2)
  const rightSleeve = new THREE.Mesh(rightSleeveGeometry, material)
  rightSleeve.position.set(1.1, 0.7, 0)
  rightSleeve.castShadow = true
  rightSleeve.receiveShadow = true
  group.add(rightSleeve)

  // Create buttons
  const buttonMaterial = new THREE.MeshStandardMaterial({
    color: 0x333333,
    roughness: 0.3,
    metalness: 0.7,
  })

  for (let i = 0; i < 4; i++) {
    const buttonGeometry = new THREE.CylinderGeometry(0.06, 0.06, 0.03, 16)
    const button = new THREE.Mesh(buttonGeometry, buttonMaterial)
    button.rotation.x = Math.PI / 2
    button.position.set(0, 0.8 - i * 0.5, 0.31)
    button.castShadow = true
    group.add(button)
  }

  // Store reference to material for later updates
  group.userData.material = material
}

// Show the selected model type
function showModel(modelType) {
  try {
    // Hide all models first
    if (tshirtModel) tshirtModel.visible = false
    if (hoodieModel) hoodieModel.visible = false
    if (jacketModel) jacketModel.visible = false

    // Show selected model
    switch (modelType) {
      case "tshirt":
        tshirtModel.visible = true
        currentModel = tshirtModel
        break
      case "hoodie":
        hoodieModel.visible = true
        currentModel = hoodieModel
        break
      case "jacket":
        jacketModel.visible = true
        currentModel = jacketModel
        break
    }

    // Update current model type
    currentModelType = modelType

    // Reset camera position
    camera.position.set(0, 0, 5)
    if (controls) controls.update()

    // Update material properties
    updateMaterialProperties()
  } catch (error) {
    console.error("Error showing model:", error)
    hideLoadingIndicator()
  }
}

// Enhanced material properties with fabric-like textures
function updateMaterialProperties() {
  try {
    if (!currentModel || !currentModel.userData.material) return

    const material = currentModel.userData.material

    // Update color
    material.color.set(currentColor)

    // Create fabric normal map for more realistic surface
    if (!material.normalMap) {
      try {
        material.normalMap = createFabricNormalMap()
        material.normalScale = new THREE.Vector2(0.3, 0.3)
      } catch (error) {
        console.error("Error creating normal map:", error)
        // Continue without normal map if there's an error
      }
    }

    // Update roughness and metalness based on material type
    switch (currentMaterial) {
      case "cotton":
        material.roughness = 0.85
        material.metalness = 0.0
        if (material.normalScale) material.normalScale.set(0.4, 0.4)
        break
      case "linen":
        material.roughness = 0.9
        material.metalness = 0.0
        if (material.normalScale) material.normalScale.set(0.6, 0.6)
        break
      case "denim":
        material.roughness = 0.75
        material.metalness = 0.05
        if (material.normalScale) material.normalScale.set(0.5, 0.5)
        break
      case "silk":
        material.roughness = 0.3
        material.metalness = 0.1
        if (material.normalScale) material.normalScale.set(0.2, 0.2)
        break
    }

    // Apply pattern
    try {
      applyPattern(material)
    } catch (error) {
      console.error("Error applying pattern:", error)
      // Continue without pattern if there's an error
    }

    material.needsUpdate = true
  } catch (error) {
    console.error("Error updating material properties:", error)
  }
}

// Create fabric normal map for realistic surface texture
function createFabricNormalMap() {
  try {
    const canvas = document.createElement("canvas")
    canvas.width = 256
    canvas.height = 256

    const ctx = canvas.getContext("2d")
    if (!ctx) {
      throw new Error("Could not get canvas context")
    }

    const imageData = ctx.createImageData(256, 256)
    const data = imageData.data

    // Create fabric weave pattern based on material type
    for (let y = 0; y < 256; y++) {
      for (let x = 0; x < 256; x++) {
        const index = (y * 256 + x) * 4

        let weaveX = 0
        let weaveY = 0
        let noise = 0

        switch (currentMaterial) {
          case "cotton":
            // Fine weave pattern
            weaveX = Math.sin(x * 0.5) * Math.sin(x * 0.2) * 0.5 + 0.5
            weaveY = Math.sin(y * 0.5) * Math.sin(y * 0.2) * 0.5 + 0.5
            noise = Math.random() * 0.3
            break

          case "silk":
            // Smooth pattern with subtle variations
            weaveX = Math.sin(x * 0.3) * 0.3 + 0.5
            weaveY = Math.sin(y * 0.3) * 0.3 + 0.5
            noise = Math.random() * 0.1
            break

          case "denim":
            // Strong diagonal weave pattern
            weaveX = Math.sin((x + y) * 0.4) * 0.5 + 0.5
            weaveY = Math.sin((x - y) * 0.4) * 0.5 + 0.5
            noise = Math.random() * 0.4
            break

          case "linen":
            // Irregular weave pattern
            weaveX = Math.sin(x * 0.2) * Math.cos(x * 0.1) * 0.5 + 0.5
            weaveY = Math.sin(y * 0.2) * Math.cos(y * 0.1) * 0.5 + 0.5
            noise = Math.random() * 0.35
            break

          default:
            // Default pattern
            weaveX = Math.sin(x * 0.4) * 0.5 + 0.5
            weaveY = Math.sin(y * 0.4) * 0.5 + 0.5
            noise = Math.random() * 0.2
        }

        const weave = (weaveX + weaveY) * 0.5
        const value = Math.floor((weave + noise) * 255)

        data[index] = value // R
        data[index + 1] = value // G
        data[index + 2] = 255 // B (normal Z)
        data[index + 3] = 255 // A
      }
    }

    ctx.putImageData(imageData, 0, 0)

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(4, 4)

    return texture
  } catch (error) {
    console.error("Error creating fabric normal map:", error)
    // Return a basic canvas texture as fallback
    const canvas = document.createElement("canvas")
    canvas.width = 2
    canvas.height = 2
    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.fillStyle = "#8080ff"
      ctx.fillRect(0, 0, 2, 2)
    }
    return new THREE.CanvasTexture(canvas)
  }
}

// Apply pattern to material
function applyPattern(material) {
  try {
    // Remove existing texture if any
    if (material.map) {
      material.map.dispose()
      material.map = null
    }

    // Apply new pattern
    switch (currentPattern) {
      case "stripes":
        material.map = createStripesTexture()
        break
      case "dots":
        material.map = createDotsTexture()
        break
      case "floral":
        material.map = createFloralTexture()
        break
      case "none":
      default:
        // No pattern
        break
    }

    if (material.map) {
      material.map.needsUpdate = true
    }

    material.needsUpdate = true
  } catch (error) {
    console.error("Error applying pattern:", error)
  }
}

// Create stripes texture
function createStripesTexture() {
  try {
    const canvas = document.createElement("canvas")
    canvas.width = 256
    canvas.height = 256

    const ctx = canvas.getContext("2d")
    if (!ctx) {
      throw new Error("Could not get canvas context")
    }

    // Fill background with base color
    ctx.fillStyle = currentColor
    ctx.fillRect(0, 0, 256, 256)

    // Draw stripes with a darker shade
    const darkerColor = adjustColor(currentColor, -30)
    ctx.fillStyle = darkerColor

    // Create more natural stripes with slight variations
    for (let y = 0; y < 256; y += 40) {
      // Vary stripe width slightly
      const stripeHeight = 18 + Math.random() * 4

      // Add slight waviness to stripes
      for (let x = 0; x < 256; x++) {
        const waviness = Math.sin(x * 0.05) * 3
        ctx.fillRect(x, y + waviness, 1, stripeHeight)
      }
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(2, 2)

    return texture
  } catch (error) {
    console.error("Error creating stripes texture:", error)
    return null
  }
}

// Create dots texture
function createDotsTexture() {
  try {
    const canvas = document.createElement("canvas")
    canvas.width = 256
    canvas.height = 256

    const ctx = canvas.getContext("2d")
    if (!ctx) {
      throw new Error("Could not get canvas context")
    }

    // Fill background with base color
    ctx.fillStyle = currentColor
    ctx.fillRect(0, 0, 256, 256)

    // Draw dots with a darker shade
    const darkerColor = adjustColor(currentColor, -30)
    ctx.fillStyle = darkerColor

    const spacing = 60

    // Create more natural dot pattern with slight variations
    for (let x = spacing / 2; x < 256; x += spacing) {
      for (let y = spacing / 2; y < 256; y += spacing) {
        // Vary dot size slightly
        const dotSize = 13 + Math.random() * 4

        // Add slight position variation
        const offsetX = (Math.random() - 0.5) * 6
        const offsetY = (Math.random() - 0.5) * 6

        ctx.beginPath()
        ctx.arc(x + offsetX, y + offsetY, dotSize, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(2, 2)

    return texture
  } catch (error) {
    console.error("Error creating dots texture:", error)
    return null
  }
}

// Create floral texture
function createFloralTexture() {
  try {
    const canvas = document.createElement("canvas")
    canvas.width = 256
    canvas.height = 256

    const ctx = canvas.getContext("2d")
    if (!ctx) {
      throw new Error("Could not get canvas context")
    }

    // Fill background with base color
    ctx.fillStyle = currentColor
    ctx.fillRect(0, 0, 256, 256)

    // Draw simple flower patterns
    const accentColor1 = adjustColor(currentColor, 40)
    const accentColor2 = adjustColor(currentColor, -40)

    // Draw flowers in a grid with slight variations
    for (let x = 64; x < 256; x += 128) {
      for (let y = 64; y < 256; y += 128) {
        // Add slight position variation
        const offsetX = (Math.random() - 0.5) * 20
        const offsetY = (Math.random() - 0.5) * 20

        // Vary flower size slightly
        const flowerSize = 28 + Math.random() * 4

        drawFlower(ctx, x + offsetX, y + offsetY, flowerSize, accentColor1, accentColor2)
      }
    }

    // Draw smaller flowers in between
    for (let x = 128; x < 256; x += 128) {
      for (let y = 128; y < 256; y += 128) {
        // Add slight position variation
        const offsetX = (Math.random() - 0.5) * 20
        const offsetY = (Math.random() - 0.5) * 20

        // Vary flower size slightly
        const flowerSize = 18 + Math.random() * 4

        drawFlower(ctx, x + offsetX, y + offsetY, flowerSize, accentColor2, accentColor1)
      }
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(2, 2)

    return texture
  } catch (error) {
    console.error("Error creating floral texture:", error)
    return null
  }
}

// Draw a more natural flower
function drawFlower(ctx, x, y, size, petalColor, centerColor) {
  try {
    const petalCount = 5 + Math.floor(Math.random() * 2) // 5 or 6 petals

    // Draw petals with slight variations
    ctx.fillStyle = petalColor
    for (let i = 0; i < petalCount; i++) {
      const angle = (i / petalCount) * Math.PI * 2

      // Add slight variation to petal position
      const distance = size * (0.9 + Math.random() * 0.2)
      const x1 = x + Math.cos(angle) * distance
      const y1 = y + Math.sin(angle) * distance

      // Vary petal size slightly
      const petalSize = (size / 2) * (0.9 + Math.random() * 0.2)

      ctx.beginPath()
      ctx.arc(x1, y1, petalSize, 0, Math.PI * 2)
      ctx.fill()
    }

    // Draw center
    ctx.fillStyle = centerColor
    ctx.beginPath()
    ctx.arc(x, y, size / 3, 0, Math.PI * 2)
    ctx.fill()

    // Add detail to center
    const lighterCenter = adjustColor(centerColor, 30)
    ctx.fillStyle = lighterCenter
    ctx.beginPath()
    ctx.arc(x, y, size / 6, 0, Math.PI * 2)
    ctx.fill()
  } catch (error) {
    console.error("Error drawing flower:", error)
  }
}

// Adjust color brightness
function adjustColor(color, amount) {
  try {
    const hex = color.replace("#", "")

    let r = Number.parseInt(hex.substring(0, 2), 16)
    let g = Number.parseInt(hex.substring(2, 4), 16)
    let b = Number.parseInt(hex.substring(4, 6), 16)

    r = Math.max(0, Math.min(255, r + amount))
    g = Math.max(0, Math.min(255, g + amount))
    b = Math.max(0, Math.min(255, b + amount))

    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
  } catch (error) {
    console.error("Error adjusting color:", error)
    return color // Return original color if there's an error
  }
}

// Animation loop with fabric movement simulation
function animate() {
  try {
    requestAnimationFrame(animate)

    if (controls) controls.update()

    // Animate fabric movement for all visible models
    animateFabricMovement(tshirtModel)
    animateFabricMovement(hoodieModel)
    animateFabricMovement(jacketModel)

    renderer.render(scene, camera)
  } catch (error) {
    console.error("Error in animation loop:", error)
  }
}

// Animate fabric movement
function animateFabricMovement(model) {
  if (!model || !model.visible) return

  // Animate all meshes in the model
  model.traverse((child) => {
    if (
      child.isMesh &&
      child.geometry &&
      child.geometry.attributes &&
      child.geometry.attributes.position &&
      child.userData.originalPositions
    ) {
      const positions = child.geometry.attributes.position.array
      const originalPositions = child.userData.originalPositions
      const intensity = child.userData.animationIntensity || 0.002
      const phase = child.userData.animationPhase || 0

      // Update phase for next frame
      child.userData.animationPhase = (phase + 0.01) % (Math.PI * 2)

      for (let i = 0; i < positions.length; i += 3) {
        const x = originalPositions[i]
        const y = originalPositions[i + 1]
        const z = originalPositions[i + 2]

        // Create subtle wave motion based on position and time
        const waveX = Math.sin(y * 2 + phase) * Math.sin(x * 3) * intensity
        const waveY = Math.sin(x * 2 + phase) * Math.sin(z * 3) * intensity
        const waveZ = Math.sin((x + y) * 2 + phase) * intensity

        positions[i] = originalPositions[i] + waveX
        positions[i + 1] = originalPositions[i + 1] + waveY
        positions[i + 2] = originalPositions[i + 2] + waveZ
      }

      child.geometry.attributes.position.needsUpdate = true
    }
  })
}

// Initialize UI controls
function initializeControls() {
  try {
    // Item selection
    document.querySelectorAll(".item-option").forEach((option) => {
      option.addEventListener("click", function () {
        // Remove active class from all options
        document.querySelectorAll(".item-option").forEach((opt) => opt.classList.remove("active"))

        // Add active class to clicked option
        this.classList.add("active")

        // Show the selected model
        const modelType = this.getAttribute("data-item")
        showModel(modelType)
      })
    })

    // Color selection
    document.querySelectorAll(".color-option").forEach((option) => {
      option.addEventListener("click", function () {
        // Remove active class from all options
        document.querySelectorAll(".color-option").forEach((opt) => opt.classList.remove("active"))

        // Add active class to clicked option
        this.classList.add("active")

        // Update current color
        currentColor = this.getAttribute("data-color")

        // Update material
        updateMaterialProperties()
      })
    })

    // Pattern selection
    document.querySelectorAll(".pattern-option").forEach((option) => {
      option.addEventListener("click", function () {
        // Remove active class from all options
        document.querySelectorAll(".pattern-option").forEach((opt) => opt.classList.remove("active"))

        // Add active class to clicked option
        this.classList.add("active")

        // Update current pattern
        currentPattern = this.getAttribute("data-pattern")

        // Update material
        updateMaterialProperties()
      })
    })

    // Material selection
    document.querySelectorAll(".material-option").forEach((option) => {
      option.addEventListener("click", function () {
        // Remove active class from all options
        document.querySelectorAll(".material-option").forEach((opt) => opt.classList.remove("active"))

        // Add active class to clicked option
        this.classList.add("active")

        // Update current material
        currentMaterial = this.getAttribute("data-material")

        // Update material
        updateMaterialProperties()
      })
    })

    // Accessory toggles
    document.querySelectorAll(".accessory-toggle").forEach((toggle) => {
      toggle.addEventListener("change", function () {
        const accessory = this.parentElement.parentElement.getAttribute("data-accessory")

        if (this.checked) {
          // Add accessory
          if (!currentAccessories.includes(accessory)) {
            currentAccessories.push(accessory)
            addAccessory(accessory)
          }
        } else {
          // Remove accessory
          const index = currentAccessories.indexOf(accessory)
          if (index > -1) {
            currentAccessories.splice(index, 1)
            removeAccessory(accessory)
          }
        }
      })
    })

    // Model controls
    document.getElementById("rotate-left")?.addEventListener("click", () => {
      if (currentModel) {
        currentModel.rotation.y -= Math.PI / 8
      }
    })

    document.getElementById("rotate-right")?.addEventListener("click", () => {
      if (currentModel) {
        currentModel.rotation.y += Math.PI / 8
      }
    })

    document.getElementById("zoom-in")?.addEventListener("click", () => {
      camera.position.z = Math.max(3, camera.position.z - 0.5)
    })

    document.getElementById("zoom-out")?.addEventListener("click", () => {
      camera.position.z = Math.min(10, camera.position.z + 0.5)
    })

    document.getElementById("reset-view")?.addEventListener("click", () => {
      if (currentModel) {
        currentModel.rotation.set(0, 0, 0)
        camera.position.set(0, 0, 5)
        if (controls) controls.update()
      }
    })

    // Toggle auto-rotate
    document.getElementById("toggle-rotate")?.addEventListener("click", () => {
      if (controls) {
        controls.autoRotate = !controls.autoRotate
        document.getElementById("toggle-rotate").textContent = controls.autoRotate ? "Stop Rotation" : "Auto Rotate"
      }
    })

    // Action buttons
    document.getElementById("save-design")?.addEventListener("click", saveDesign)
    document.getElementById("share-design")?.addEventListener("click", shareDesign)
    document.getElementById("add-to-cart")?.addEventListener("click", addToCart)

    // Edit and delete buttons for saved designs
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const designId = this.closest(".saved-design").getAttribute("data-id") || "saved-design-1"
        loadSavedDesign(designId)
      })
    })

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const designId = this.closest(".saved-design").getAttribute("data-id") || "saved-design-1"
        deleteSavedDesign(designId)
      })
    })

    // Try buttons for recommended designs
    document.querySelectorAll(".try-btn").forEach((btn, index) => {
      btn.addEventListener("click", function () {
        const recommendedId =
          this.closest(".recommended-item").getAttribute("data-id") || ["eco-friendly", "urban-style", "vintage"][index]
        tryRecommendedDesign(recommendedId)
      })
    })
  } catch (error) {
    console.error("Error initializing controls:", error)
  }
}

// Add accessory to the current model
function addAccessory(accessory) {
  try {
    if (!currentModel) return

    const material = currentModel.userData.material.clone()

    switch (accessory) {
      case "pocket":
        // Only add pocket if it doesn't already exist
        if (currentModel.getObjectByName("custom-pocket")) return

        // Create pocket
        const pocketGeometry = createOrganicPocketGeometry()
        const pocket = new THREE.Mesh(pocketGeometry, material)
        pocket.position.set(0, 0.2, 0.4)
        pocket.name = "custom-pocket"
        pocket.castShadow = true
        pocket.receiveShadow = true
        currentModel.add(pocket)

        // Add subtle animation to the pocket
        addSubtleAnimation(pocket, 0.001)
        break

      case "buttons":
        // Only add buttons if they don't already exist
        if (currentModel.getObjectByName("custom-button-0")) return

        // Create buttons
        const buttonMaterial = new THREE.MeshStandardMaterial({
          color: 0x333333,
          roughness: 0.3,
          metalness: 0.7,
        })

        for (let i = -1; i <= 1; i += 0.5) {
          const buttonGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.05, 16)
          const button = new THREE.Mesh(buttonGeometry, buttonMaterial)
          button.rotation.x = Math.PI / 2
          button.position.set(0, i, 0.5)
          button.name = `custom-button-${i}`
          button.castShadow = true
          currentModel.add(button)
        }
        break

      case "hood":
        // Only add hood if it doesn't already exist and we're not already on a hoodie
        if (currentModelType === "hoodie" || currentModel.getObjectByName("custom-hood")) return

        // Create hood
        const hoodGeometry = createOrganicHoodGeometry()
        const hood = new THREE.Mesh(hoodGeometry, material)
        hood.rotation.x = Math.PI
        hood.position.set(0, 2.1, -0.3)
        hood.name = "custom-hood"
        hood.castShadow = true
        hood.receiveShadow = true
        currentModel.add(hood)

        // Add subtle animation to the hood
        addSubtleAnimation(hood, 0.001)

        // Add hood opening
        const hoodOpeningGeometry = new THREE.TorusGeometry(0.5, 0.08, 16, 32, Math.PI)
        const hoodOpening = new THREE.Mesh(hoodOpeningGeometry, material)
        hoodOpening.position.set(0, 2.0, -0.3)
        hoodOpening.rotation.x = Math.PI / 2
        hoodOpening.name = "custom-hood-opening"
        hoodOpening.castShadow = true
        hoodOpening.receiveShadow = true
        currentModel.add(hoodOpening)

        // Add strings
        const stringGeometry = createOrganicDrawstringGeometry()
        const stringMaterial = new THREE.MeshStandardMaterial({
          color: 0x888888,
          roughness: 0.8,
          metalness: 0.1,
        })

        const leftString = new THREE.Mesh(stringGeometry, stringMaterial)
        leftString.position.set(-0.15, 1.5, 0.25)
        leftString.name = "custom-left-string"
        leftString.castShadow = true
        currentModel.add(leftString)

        const rightString = new THREE.Mesh(stringGeometry, stringMaterial)
        rightString.position.set(0.15, 1.5, 0.25)
        rightString.name = "custom-right-string"
        rightString.castShadow = true
        currentModel.add(rightString)
        break
    }
  } catch (error) {
    console.error("Error adding accessory:", error)
    // Continue without adding accessory if there's an error
  }
}

// Remove accessory from the current model
function removeAccessory(accessory) {
  try {
    if (!currentModel) return

    switch (accessory) {
      case "pocket":
        const pocket = currentModel.getObjectByName("custom-pocket")
        if (pocket) currentModel.remove(pocket)
        break

      case "buttons":
        for (let i = -1; i <= 1; i += 0.5) {
          const button = currentModel.getObjectByName(`custom-button-${i}`)
          if (button) currentModel.remove(button)
        }
        break

      case "hood":
        const hood = currentModel.getObjectByName("custom-hood")
        if (hood) currentModel.remove(hood)

        const hoodOpening = currentModel.getObjectByName("custom-hood-opening")
        if (hoodOpening) currentModel.remove(hoodOpening)

        const leftString = currentModel.getObjectByName("custom-left-string")
        if (leftString) currentModel.remove(leftString)

        const rightString = currentModel.getObjectByName("custom-right-string")
        if (rightString) currentModel.remove(rightString)
        break
    }
  } catch (error) {
    console.error("Error removing accessory:", error)
    // Continue without removing accessory if there's an error
  }
}

// Save the current design
function saveDesign() {
  try {
    // Create a new saved design element
    const savedDesignsGrid = document.querySelector(".grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3")
    if (!savedDesignsGrid) return

    const designId = `design-${Date.now()}`

    // Create a new design card
    const designCard = document.createElement("div")
    designCard.className = "saved-design bg-white rounded-lg shadow-md overflow-hidden"
    designCard.setAttribute("data-id", designId)

    // In a real app, we would capture a screenshot of the 3D model
    // For demo purposes, we'll use a placeholder image based on the model type
    let imageSrc = "assets/images/custwhite.jpg"
    if (currentModelType === "hoodie") imageSrc = "assets/images/bluhoodie.jpeg"
    if (currentModelType === "jacket") imageSrc = "assets/images/floral.jpeg"

    designCard.innerHTML = `
      <img src="${imageSrc}" alt="Saved Design" class="w-full h-48 object-cover">
      <div class="p-4">
        <h3 class="font-bold mb-1">Custom ${currentModelType.charAt(0).toUpperCase() + currentModelType.slice(1)}</h3>
        <p class="text-sm text-gray-500 mb-4">Created on: ${new Date().toLocaleDateString()}</p>
        <div class="flex space-x-2">
          <button class="edit-btn px-4 py-2 bg-rewear-text text-white rounded-md hover:bg-gray-800 transition-colors">
            Edit
          </button>
          <button class="delete-btn px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
            Delete
          </button>
        </div>
      </div>
    `

    // Add event listeners
    designCard.querySelector(".edit-btn").addEventListener("click", () => {
      loadSavedDesign(designId)
    })

    designCard.querySelector(".delete-btn").addEventListener("click", () => {
      deleteSavedDesign(designId)
    })

    // Add to the grid
    savedDesignsGrid.prepend(designCard)

    // Show success message
    alert("Design saved successfully!")
  } catch (error) {
    console.error("Error saving design:", error)
    alert("Error saving design. Please try again.")
  }
}

// Share the current design
function shareDesign() {
  // In a real app, this would generate a shareable link
  alert("Share functionality would be implemented here. This would generate a unique URL to share your design.")
}

// Add the current design to cart
function addToCart() {
  // In a real app, this would add the design to the shopping cart
  alert("Design added to cart!")
}

// Load a saved design
function loadSavedDesign(designId) {
  try {
    // In a real app, this would load from a database
    // For demo purposes, we'll set some predefined values

    // Set model type based on design ID
    if (designId === "saved-design-1") {
      currentModelType = "tshirt"
      currentColor = "#FFFFFF"
      currentPattern = "none"
      currentMaterial = "cotton"
      currentAccessories = ["pocket"]
    } else if (designId === "saved-design-2") {
      currentModelType = "hoodie"
      currentColor = "#3357FF"
      currentPattern = "stripes"
      currentMaterial = "cotton"
      currentAccessories = []
    } else if (designId === "saved-design-3") {
      currentModelType = "jacket"
      currentColor = "#F3F3A6"
      currentPattern = "floral"
      currentMaterial = "linen"
      currentAccessories = ["buttons"]
    } else {
      // For dynamically created designs
      currentModelType = "tshirt"
      currentColor = "#3357FF"
      currentPattern = "dots"
      currentMaterial = "cotton"
      currentAccessories = ["pocket"]
    }

    // Show the model
    showModel(currentModelType)

    // Update UI
    updateUI()

    // Clear existing accessories
    if (currentModel) {
      removeAccessory("pocket")
      removeAccessory("buttons")
      removeAccessory("hood")
    }

    // Add new accessories
    currentAccessories.forEach((accessory) => {
      addAccessory(accessory)

      // Update checkbox
      const toggle = document.querySelector(`.accessory-option[data-accessory="${accessory}"] .accessory-toggle`)
      if (toggle) toggle.checked = true
    })

    alert(`Design ${designId} loaded!`)
  } catch (error) {
    console.error("Error loading design:", error)
    alert("Error loading design. Please try again.")
  }
}

// Delete a saved design
function deleteSavedDesign(designId) {
  try {
    // In a real app, this would delete from a database
    // For now, we'll just remove the element from the DOM
    const designElement = document.querySelector(`.saved-design[data-id="${designId}"]`)
    if (designElement) {
      designElement.remove()
      alert(`Design ${designId} deleted!`)
    }
  } catch (error) {
    console.error("Error deleting design:", error)
    alert("Error deleting design. Please try again.")
  }
}

// Try a recommended design
function tryRecommendedDesign(recommendedId) {
  try {
    // Set properties based on recommendation
    switch (recommendedId) {
      case "eco-friendly":
        currentModelType = "tshirt"
        currentColor = "#33FF57"
        currentPattern = "none"
        currentMaterial = "cotton"
        currentAccessories = []
        break

      case "urban-style":
        currentModelType = "hoodie"
        currentColor = "#000000"
        currentPattern = "dots"
        currentMaterial = "cotton"
        currentAccessories = ["pocket"]
        break

      case "vintage":
        currentModelType = "jacket"
        currentColor = "#F3F3A6"
        currentPattern = "floral"
        currentMaterial = "linen"
        currentAccessories = ["buttons"]
        break
    }

    // Show the model
    showModel(currentModelType)

    // Update UI
    updateUI()

    // Clear existing accessories
    if (currentModel) {
      removeAccessory("pocket")
      removeAccessory("buttons")
      removeAccessory("hood")
    }

    // Add new accessories
    currentAccessories.forEach((accessory) => {
      addAccessory(accessory)

      // Update checkbox
      const toggle = document.querySelector(`.accessory-option[data-accessory="${accessory}"] .accessory-toggle`)
      if (toggle) toggle.checked = true
    })

    alert(`Recommended design "${recommendedId}" applied!`)
  } catch (error) {
    console.error("Error applying recommended design:", error)
    alert("Error applying recommended design. Please try again.")
  }
}

// Update UI to match current settings
function updateUI() {
  try {
    // Update item selection
    document.querySelectorAll(".item-option").forEach((option) => {
      option.classList.remove("active")
      if (option.getAttribute("data-item") === currentModelType) {
        option.classList.add("active")
      }
    })

    // Update color selection
    document.querySelectorAll(".color-option").forEach((option) => {
      option.classList.remove("active")
      if (option.getAttribute("data-color") === currentColor) {
        option.classList.add("active")
      }
    })

    // Update pattern selection
    document.querySelectorAll(".pattern-option").forEach((option) => {
      option.classList.remove("active")
      if (option.getAttribute("data-pattern") === currentPattern) {
        option.classList.add("active")
      }
    })

    // Update material selection
    document.querySelectorAll(".material-option").forEach((option) => {
      option.classList.remove("active")
      if (option.getAttribute("data-material") === currentMaterial) {
        option.classList.add("active")
      }
    })

    // Update accessory toggles
    document.querySelectorAll(".accessory-toggle").forEach((toggle) => {
      const accessory = toggle.parentElement.parentElement.getAttribute("data-accessory")
      toggle.checked = currentAccessories.includes(accessory)
    })
  } catch (error) {
    console.error("Error updating UI:", error)
    // Continue without updating UI if there's an error
  }
}

// Set up sample data
function setupSampleData() {
  try {
    // Set data attributes for saved designs
    document.querySelectorAll(".saved-design").forEach((design, index) => {
      design.setAttribute("data-id", `saved-design-${index + 1}`)
    })

    // Set data attributes for recommended designs
    const recommendedItems = document.querySelectorAll(".recommended-item")
    if (recommendedItems.length >= 1) recommendedItems[0].setAttribute("data-id", "eco-friendly")
    if (recommendedItems.length >= 2) recommendedItems[1].setAttribute("data-id", "urban-style")
    if (recommendedItems.length >= 3) recommendedItems[2].setAttribute("data-id", "vintage")
  } catch (error) {
    console.error("Error setting up sample data:", error)
    // Continue without setting up sample data if there's an error
  }
}
