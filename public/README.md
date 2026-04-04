# How to Add Your Profile Picture

## Quick Steps:

1. **Save your photo** in the `public` folder as `profile.jpg`

2. **Open** `src/App.jsx`

3. **Replace the placeholder** in TWO places:

### Hero Section (around line 90):
Replace:
```jsx
<div className="profile-placeholder">
  <span>MM</span>
</div>
```
With:
```jsx
<img src="/profile.jpg" alt="Meghana Manchala" className="profile-image" />
```

### About Section (around line 110):
Replace:
```jsx
<div className="profile-placeholder about-placeholder">
  <span>MM</span>
</div>
```
With:
```jsx
<img src="/profile.jpg" alt="Meghana Manchala" className="about-image" />
```

4. **Save** the file and the image will appear automatically!

## Alternative: Use the image from your message
If you want to use the photo you shared, save it as `profile.jpg` in the `public` folder.

