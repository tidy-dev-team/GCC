# 🚀 Quick Start Guide

## Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
This will watch your SCSS files and automatically compile them to CSS.

### 3. Open Your Files
- **Main Template**: `index.html` - Your main template with existing content
- **Design System Demo**: `design-system-demo.html` - Showcase of all design system features
- **Compiled CSS**: `css/main.css` - Automatically generated from SCSS

## 📁 File Structure
```
Template_01/
├── scss/                    # Your SCSS source files
│   ├── _variables.scss     # Design tokens (colors, typography, spacing)
│   ├── _mixins.scss        # Reusable mixins and functions
│   ├── _utilities.scss     # Utility classes (like Tailwind)
│   ├── _components.scss    # Component-specific styles
│   └── main.scss          # Main file (imports everything)
├── css/                    # Compiled CSS (auto-generated)
├── index.html             # Main template
├── design-system-demo.html # Design system showcase
└── package.json           # Dependencies and scripts
```

## 🎨 Available Commands

```bash
# Development (watch mode)
npm run dev

# Build for production (compressed)
npm run build

# Build with expanded formatting (for debugging)
npm run build:expanded

# Watch with expanded formatting
npm run watch
```

## 🔧 How to Use

### 1. Edit SCSS Files
Make changes to any `.scss` file in the `scss/` directory. The CSS will automatically recompile.

### 2. Use Design System Variables
```scss
.my-component {
  color: map-get($colors, primary, 600);
  padding: map-get($spacing, 6);
  font-size: map-get($font-sizes, xl);
}
```

### 3. Use Mixins
```scss
.my-button {
  @include button-variant(primary);
  @include hover-lift;
}
```

### 4. Use Utility Classes
```html
<div class="bg-primary-500 text-white p-6 rounded-lg shadow-md">
  This uses utility classes for styling
</div>
```

## 🎯 Key Features

- **Design Tokens**: Consistent colors, typography, spacing, and breakpoints
- **Mixins**: Reusable patterns for buttons, cards, forms, and more
- **Utility Classes**: Tailwind-like utilities for rapid development
- **Responsive Design**: Mobile-first approach with breakpoint mixins
- **Auto-compilation**: CSS updates automatically when you save SCSS files

## 🚨 Troubleshooting

### CSS Not Updating?
- Make sure `npm run dev` is running
- Check the terminal for compilation errors
- Verify file paths in your SCSS imports

### Import Errors?
- Ensure `_variables.scss` is imported first
- Check that all partial files start with `_`
- Verify file names match exactly

### Want to Debug?
```bash
npm run build:expanded
```
This generates readable CSS with proper formatting.

## 📚 Next Steps

1. **Explore the Demo**: Open `design-system-demo.html` to see all features
2. **Customize Variables**: Edit `scss/_variables.scss` to match your brand
3. **Add Components**: Create new components in `scss/_components.scss`
4. **Build Your Own**: Use the mixins and utilities to create your design system

---

**Happy coding! 🎉**
