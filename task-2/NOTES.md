# 3D Model Viewer — Notes

## 1. File Size Optimization

Original GLB: 139KB  
Compressed GLB (Draco): 21KB  

Reduction: ~77%

Draco compression significantly reduces mesh size by encoding geometry efficiently.  
This results in:
- Faster network transfer
- Reduced bandwidth usage
- Improved loading performance, especially on slow connections

---

## 2. Why Lazy Loading Three.js Matters

Three.js is a large library (~600KB+).

If loaded normally:
- It blocks initial page rendering
- Increases bundle size
- Slows down First Contentful Paint (FCP)

Using dynamic import:

```js
const THREE = await import('three');