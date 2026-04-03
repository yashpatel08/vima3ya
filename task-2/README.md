# 🚀 Task 2 — 3D Model Viewer with Optimized Loading

## 📌 Overview

This project is a **3D Model Viewer** built using **Three.js** that loads and renders a `.glb` model efficiently with a focus on:

* ⚡ Optimized loading
* 🧠 Memory management
* 📦 Reduced bundle size via lazy loading
* 🗜️ Draco-compressed assets

---

## 🎯 Features

* ✅ Loads `.glb` model using `GLTFLoader`
* ✅ Uses `DRACOLoader` for compressed models
* ✅ Lazy loads Three.js (reduces initial load time)
* ✅ Displays loading indicator with progress
* ✅ Logs model load time in milliseconds
* ✅ Proper cleanup using `dispose()` to prevent memory leaks
* ✅ Responsive full-screen 3D viewer

---

## 🛠️ Tech Stack

* React (Vite)
* Three.js
* GLTFLoader + DRACOLoader
* Tailwind CSS

---

## 📁 Project Structure

```
task-2/
│
├── public/
│   ├── model.glb
│   └── model-compressed.glb
│
├── src/
│   ├── App.tsx
│   ├── ModelViewer.tsx
│   ├── buildSceneGLB.ts
│   ├── main.tsx
│   └── index.css
│
├── NOTES.md
└── README.md
```

---

## ⚙️ Setup & Run

### 1. Install dependencies

```
npm install
```

### 2. Run development server

```
npm run dev
```

### 3. Open in browser

```
http://localhost:5173
```

---

## 📦 Model Optimization (Draco Compression)

To compress the model:

```
npx gltf-pipeline -i public/model.glb -o public/model-compressed.glb --draco.compressMeshes
```

---

## ⏱️ Performance Logging

Model load time is measured using:

```js
const start = performance.now();
```

After loading:

```js
console.log(`Model loaded in ${(performance.now() - start).toFixed(2)}ms`);
```

---

## 🧠 Key Concepts Used

### 1. Lazy Loading Three.js

```js
const THREE = await import('three');
```

* Prevents blocking initial render
* Improves page load performance

---

### 2. Draco Compression

* Reduces file size significantly
* Faster network transfer
* Better performance on slow connections

---

### 3. Memory Management

* `dispose()` is used to clean up WebGL resources
* Prevents GPU memory leaks

---

### 4. Loading UX

* Progress indicator shown while model loads
* Improves user experience

---

## 📄 Notes

Detailed explanation available in:

```
NOTES.md
```

---

## ✅ Requirements Checklist

* ✔️ GLB model rendered in browser
* ✔️ Draco compression applied
* ✔️ GLTFLoader + DRACOLoader used
* ✔️ Loading indicator implemented
* ✔️ Load time logged
* ✔️ Three.js lazy loaded
* ✔️ Memory cleanup handled

---

## 🎉 Conclusion

This project demonstrates how to build a performant 3D viewer by combining:

* Efficient asset compression
* Lazy loading strategies
* Proper GPU memory management

---

## 👨‍💻 Author

Yash