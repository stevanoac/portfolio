# Hardware images

Store transparent product images for the hardware page in this folder. Use lowercase names with hyphens, such as `main-computer.png` or `keyboard-name.webp`.

Recommended:

- PNG or WebP with transparency
- 1200 × 900 px canvas (4:3)
- Object centered with comfortable transparent padding
- Keep individual files under 1 MB when possible

To display an image, replace the `.image-placeholder` block in the matching card with:

```html
<img
  class="hardware-image"
  src="images/main-computer.png"
  alt="Main Computer"
/>
```
