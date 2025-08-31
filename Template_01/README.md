# Template 01 - CSS Compiler & Design System

This template includes a modern CSS workflow with Sass/SCSS compilation, a comprehensive design system, and utility classes.

## 🚀 Features

- **Sass/SCSS Compiler** - Modern CSS preprocessing with variables, mixins, and functions
- **Design System** - Consistent colors, typography, spacing, and component patterns
- **Utility Classes** - Tailwind-like utility classes generated from design tokens
- **Responsive Design** - Mobile-first responsive utilities and breakpoints
- **Component Library** - Reusable component styles using design system tokens

## 📁 File Structure

```
Template_01/
├── scss/
│   ├── _variables.scss      # Design system variables (colors, typography, spacing)
│   ├── _mixins.scss         # Reusable mixins and functions
│   ├── _utilities.scss      # Utility classes (spacing, colors, layout)
│   ├── _components.scss     # Component-specific styles
│   └── main.scss           # Main SCSS file (imports all others)
├── css/                     # Compiled CSS output (generated)
├── index.html              # HTML template
├── package.json            # Node.js dependencies and scripts
└── README.md               # This file
```

## 🛠️ Setup & Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   This will watch your SCSS files and compile them to CSS in real-time.

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🎨 Design System

### Colors
- **Primary**: Blue color palette (50-950)
- **Neutral**: Gray color palette (50-950)
- **Semantic**: Success, Warning, Error, Info

### Typography
- **Font Families**: Inter (sans), Georgia (serif), JetBrains Mono (mono)
- **Font Sizes**: xs (12px) to 9xl (128px)
- **Font Weights**: Thin (100) to Black (900)
- **Line Heights**: None (1) to Loose (2)

### Spacing
- **Scale**: 0 to 96 (4px to 384px)
- **Responsive**: Mobile-first breakpoints (sm, md, lg, xl, 2xl)

### Breakpoints
- **xs**: 0px
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **xxl**: 1536px

## 🔧 Available Mixins

### Layout Mixins
```scss
@include container($max-width);
@include flex-center;
@include flex-between;
@include grid($columns, $gap);
```

### Typography Mixins
```scss
@include heading($level);        // h1-h6
@include text-style($size, $weight, $line-height);
@include body-text($size, $weight);
```

### Spacing Mixins
```scss
@include padding($top, $right, $bottom, $left);
@include margin($top, $right, $bottom, $left);
@include spacing($property, $size);
```

### Color Mixins
```scss
@include color($color-name, $shade);
@include bg-color($color-name, $shade);
@include border-color($color-name, $shade);
```

### Responsive Mixins
```scss
@include respond-to($breakpoint);
@include respond-below($breakpoint);
```

### Component Mixins
```scss
@include button-variant($variant);  // primary, secondary, outline
@include card;
@include card-hover;
@include input-base;
```

## 🎯 Utility Classes

### Spacing
```css
.m-4          /* margin: 1rem */
.p-6          /* padding: 1.5rem */
.mx-auto      /* margin-left: auto; margin-right: auto */
.py-8         /* padding-top: 2rem; padding-bottom: 2rem */
```

### Typography
```css
.text-2xl     /* font-size: 1.5rem */
.font-bold    /* font-weight: 700 */
.text-center  /* text-align: center */
.leading-relaxed /* line-height: 1.625 */
```

### Colors
```css
.text-primary-600    /* color: #2563eb */
.bg-neutral-100      /* background-color: #f5f5f5 */
.border-primary-500  /* border-color: #3b82f6 */
```

### Layout
```css
.flex               /* display: flex */
.grid-cols-2        /* grid-template-columns: repeat(2, 1fr) */
.items-center       /* align-items: center */
.justify-between    /* justify-content: space-between */
```

### Responsive
```css
.md:grid-cols-3     /* grid-template-columns: repeat(3, 1fr) on md+ */
.lg:hidden          /* display: none on lg+ */
.sm:text-lg         /* font-size: 1.125rem on sm+ */
.xxl:container      /* container max-width on xxl+ */
```

## 📱 Responsive Design

The design system is mobile-first. Use responsive utilities to build adaptive layouts:

```scss
// Mobile-first approach
.container {
  @include padding(4);  // Default: 16px
  
  @include respond-to(md) {
    @include padding(8);  // 32px on medium screens and up
  }
  
  @include respond-to(lg) {
    @include padding(12); // 48px on large screens and up
  }
}
```

## 🎨 Custom Components

### Buttons
```scss
.btn-custom {
  @include button-variant(primary);
  @include hover-lift;
}
```

### Cards
```scss
.card-custom {
  @include card-hover;
  @include padding(8);
}
```

### Forms
```scss
.input-custom {
  @include input-base;
  @include margin(0, 0, 4, 0);
}
```

## 🚀 NPM Scripts

- `npm run dev` - Watch mode for development
- `npm run build` - Build for production (compressed)
- `npm run build:expanded` - Build with expanded formatting
- `npm run watch` - Watch mode with expanded formatting

## 🔄 Workflow

1. **Edit SCSS files** in the `scss/` directory
2. **Watch for changes** with `npm run dev`
3. **CSS automatically compiles** to the `css/` directory
4. **HTML references** the compiled `style.css`

## 📚 Best Practices

1. **Use Design Tokens**: Always use variables from `_variables.scss`
2. **Leverage Mixins**: Use mixins for common patterns
3. **Mobile-First**: Start with mobile styles, enhance for larger screens
4. **Consistent Naming**: Follow the established naming conventions
5. **Component-Based**: Organize styles by component, not by property

## 🎨 Customization

### Adding New Colors
```scss
// In _variables.scss
$colors: (
  // ... existing colors
  accent: (
    50: #fef7ee,
    100: #fdedd6,
    // ... more shades
  )
);
```

### Adding New Breakpoints
```scss
// In _variables.scss
$breakpoints: (
  // ... existing breakpoints
  '3xl': 1920px
);
```

### Adding New Components
```scss
// In _components.scss
.custom-component {
  @include padding(6);
  @include bg-color(neutral, 100);
  @include border-radius(lg);
}
```

## 🐛 Troubleshooting

### Common Issues

1. **CSS not updating**: Make sure the Sass compiler is running
2. **Import errors**: Check file paths in `main.scss`
3. **Variables not found**: Ensure `_variables.scss` is imported first

### Debug Mode

For debugging, use expanded formatting:
```bash
npm run build:expanded
```

This will generate readable CSS with proper formatting and comments.

## 📖 Resources

- [Sass Documentation](https://sass-lang.com/documentation)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

---

Happy coding! 🎉
