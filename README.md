# Marketplace Price Calculator

A compact marketplace selling-price calculator for estimating listing prices, platform deductions, settlement amounts, and flat profit per order.

The calculator currently includes presets for:

- Zomato
- Swiggy
- Amazon
- Flipkart
- Meesho
- Myntra
- Shopsy

Selecting a marketplace updates the calculator heading and applies a starting platform-fee preset. All fee values remain editable because actual charges can vary by seller category, location, and marketplace agreement.

## Features

- Flat profit target instead of a percentage margin
- Restaurant cost and packaging inputs
- Marketplace service and payment fees
- GST on platform fees
- Discounts, wastage, advertising, and optional additional costs
- Calculated listing price and settlement breakdown
- Day and night themes
- Responsive layout with a spreadsheet-style marketplace tab bar
- Help popup with email, WhatsApp, and CodeNirmata links

## Technology

- React
- TypeScript
- Vite
- Vitest
- Lucide React

## Local development

Requirements: Node.js 18 or newer and npm.

```bash
npm install
npm run dev
```

Open the local address printed by Vite, normally `http://localhost:5173`.

## Testing

```bash
npm test
```

## Production build

```bash
npm run build
```

The generated production files are written to `dist/`.

## Deploy to Vercel

### From the Vercel dashboard

1. Push this project to GitHub, GitLab, or Bitbucket.
2. In Vercel, select **Add New Project** and import the repository.
3. Vercel should detect Vite automatically.
4. Deploy the project.

The included `vercel.json` explicitly configures the build command, output directory, and SPA rewrite.

### Using the Vercel CLI

```bash
npx vercel
```

For a production deployment:

```bash
npx vercel --prod
```

No environment variables are currently required.

## Calculation disclaimer

The displayed values are estimates. Marketplace fees and tax treatment can vary. Confirm current rates and contractual terms before relying on a calculated selling price.

