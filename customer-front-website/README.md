# The Wild Oasis - Customer Front Website

![Next.js CI/CD Pipeline](https://github.com/[your-github-username]/[your-repo-name]/actions/workflows/main.yml/badge.svg)

A modern, responsive customer-facing website for The Wild Oasis hotel, built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## 🚀 Technologies

- **Next.js 15**: Server components, App Router, built-in optimization
- **React 19**: Latest React features
- **TypeScript**: Type safety throughout the codebase
- **Tailwind CSS**: Utility-first CSS framework
- **Supabase**: Backend as a service for data storage and retrieval
- **Jest & React Testing Library**: Comprehensive test suite
- **Storybook**: Component documentation and UI development

## 🛠️ Development Setup

### Prerequisites

- Node.js (v19+)
- npm (v9+)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/[your-github-username]/[your-repo-name].git
   cd customer-front-website
   ```

2. Install dependencies
   ```bash
   npm install --legacy-peer-deps
   ```
   > Note: The `--legacy-peer-deps` flag is required due to React 19 compatibility with some packages.

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your Supabase credentials.

4. Start the development server
   ```bash
   npm run dev
   ```
   
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🧪 Testing

We use Jest and React Testing Library for testing. All test files are co-located with their components or in `__tests__` directories.

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📚 Storybook

We use Storybook to develop and document UI components in isolation.

```bash
# Start Storybook development server
npm run storybook

# Build Storybook for static deployment
npm run build-storybook
```

## 🔄 CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment. The workflow includes:

1. **Linting & Testing**: Checks code quality and runs unit tests
2. **Build Verification**: Ensures the application builds successfully
3. **Storybook Build**: Builds Storybook to validate component documentation

All these checks must pass before code can be merged into the main branch.

### Workflow File

The workflow configuration is defined in `.github/workflows/main.yml`.

## 📁 Project Structure

```
customer-front-website/
├── .github/               # GitHub configuration files
├── .vscode/               # VS Code configuration
├── app/                   # Next.js application code
│   ├── _components/       # Shared UI components
│   ├── _libs/             # Utility libraries
│   ├── _styles/           # Global styles
│   ├── _types/            # TypeScript type definitions
│   ├── about/             # About page
│   ├── account/           # User account pages
│   ├── cabins/            # Cabin listing and detail pages
│   └── ...                # Other route-based pages
├── public/                # Static assets
├── .env.local             # Environment variables (git-ignored)
├── jest.config.ts         # Jest configuration
├── jest.setup.tsx         # Jest setup file
├── next.config.ts         # Next.js configuration
├── package.json           # Project dependencies
├── postcss.config.mjs     # PostCSS configuration
├── README.md              # Project documentation
└── tsconfig.json          # TypeScript configuration
```

## 🚢 Deployment

The application is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in the Vercel dashboard
3. Deploy

## 🤝 Contributing

1. Create a new branch from `main`
2. Make your changes
3. Add or update tests as needed
4. Push your branch and create a pull request
5. Wait for the CI checks to pass
6. Request review from a team member

All pull requests must pass the CI checks and receive approval before being merged.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
