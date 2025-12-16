# Design Guidelines: PLV Registrar Queueing System

## Design Approach
**Reference-Based Approach**: Drawing inspiration from government service portals and modern ticketing systems (Airbnb's clarity + Linear's clean forms + Apple's institutional trust)

**Core Principle**: Create an institutional yet approachable interface that guides students through bureaucratic processes with clarity and confidence.

## Color & Branding
- **Primary**: PLV institutional blue (preserve existing brand colors from provided image)
- **Accent**: Complementary blue shade for interactive elements
- **Neutrals**: Cool grays for backgrounds and text hierarchy
- **Success**: Green for confirmation states
- **System**: Red for important notices, amber for warnings
- Maintain PLV logo and institutional identity throughout all screens

## Typography
**Font Stack**: 
- Primary: Inter or similar clean sans-serif via Google Fonts
- Headings: 600-700 weight
- Body: 400-500 weight
- Form labels: 500 weight, slightly smaller

**Scale**:
- Page titles: text-3xl to text-4xl
- Section headers: text-xl to text-2xl
- Body text: text-base
- Helper text: text-sm
- Buttons: text-base with medium weight

## Layout System
**Spacing Units**: Tailwind classes p-4, p-6, p-8, gap-4, gap-6, gap-8

**Container Strategy**:
- Mobile-first: Full width with px-4 padding
- Desktop: max-w-4xl centered for forms, max-w-6xl for transaction lists
- Consistent vertical rhythm: py-8 to py-12 between major sections

## Screen-Specific Designs

### 1. Home Screen
- Centered layout with PLV logo prominently displayed
- Institution name and registrar office subtitle
- Large, inviting "See Transactions" or "Get Queue Number" CTA button
- Optional: Quick stats (e.g., "Average wait time: 15 mins")
- Clean, minimal with institutional credibility

### 2. Transaction Categories Screen
- Accordion-style expandable sections for each category
- Category headers with icons (document, pen, user, certificate, graduation cap)
- Each transaction as a clickable card/button within expanded sections
- Search/filter bar at top for quick transaction finding
- Breadcrumb navigation
- Grid layout on desktop (2 columns), stack on mobile

### 3. Dynamic Form Screen
- Progress indicator at top (Step 1 of 3 style)
- Clear section heading with transaction type
- Form fields in logical groups with spacing
- Required field indicators (asterisks)
- Input types: text, select dropdowns, date pickers, file upload placeholders
- Floating labels or clear label positioning
- Inline validation feedback
- "Submit" button prominently styled, disabled until valid
- "Back" button for navigation

**Common Fields Structure**:
- Student Information (name, student number, year level)
- Contact Details (email, phone)
- Transaction-specific fields (dynamic based on selection)
- Document upload area (with file type/size guidance)

### 4. Queue Number Display (Ticket Screen)
**Critical Design**: This should look like a digital ticket
- Large queue number (text-6xl to text-8xl, bold, centered)
- Window/Counter assignment clearly displayed
- Transaction type reference
- Timestamp of queue generation
- Barcode or QR code visual element (decorative)
- Instructions: "Please proceed to Window [X]" or "Please wait, your number will be called"
- Current serving number display (if applicable)
- Print/Save ticket button
- "Request Another Transaction" CTA

## Component Library

### Buttons
- Primary: Solid PLV blue with white text, rounded corners (rounded-lg)
- Secondary: Outlined PLV blue with transparent background
- All buttons: px-6 py-3 with medium font weight
- Hover states: Slight darkening/lightening
- Full-width on mobile, auto-width on desktop where appropriate

### Cards
- White background with subtle shadow (shadow-md)
- Rounded corners (rounded-lg or rounded-xl)
- Padding: p-6 or p-8
- Hover effect: slight shadow increase for interactive cards

### Form Inputs
- Border: 2px solid neutral gray
- Focus: Border changes to PLV blue with subtle glow
- Padding: px-4 py-3
- Rounded: rounded-lg
- Error state: Red border with error message below
- Success state: Green checkmark icon

### Accordion/Expandable Sections
- Header with chevron icon
- Smooth expand/collapse animation
- Border separation between sections
- Subtle background change when expanded

### Icons
Use Heroicons or Font Awesome via CDN:
- Document icons for Academic Records
- Pen/edit for Registration
- User for Student Information
- Certificate for Certifications
- Graduation cap for Graduation
- Plus/ellipsis for Others

## Navigation Pattern
- Top navigation bar with PLV logo (sticky on scroll)
- Breadcrumb trail for deep navigation
- Clear back buttons on form and detail screens
- Home button always accessible

## Responsive Behavior
- Mobile (< 768px): Single column, full-width buttons, stacked forms
- Tablet (768px - 1024px): 2-column grids, optimized spacing
- Desktop (> 1024px): Multi-column layouts, centered containers

## Key Interactions
- Form submission shows loading state on button ("Processing...")
- Successful submission smoothly transitions to queue number screen
- Category expansion is smooth with height animation
- No distracting animations; focus on clarity and function

## Images
**Hero Section**: Not applicable - institutional portal focuses on functionality
**Logo**: PLV institutional logo prominently on home and navigation
**Icons**: Categorical icons throughout for visual hierarchy
**Ticket Design**: Consider decorative elements (patterns, institutional seal watermark) on queue ticket display

This design balances institutional professionalism with modern UX clarity, ensuring students can efficiently navigate bureaucratic processes with confidence.