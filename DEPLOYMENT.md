# Deployment Guide for numdisplay

This document provides step-by-step instructions for deploying the NumDisplay package to NPM.

## Prerequisites

1. **NPM Account**: Ensure you have an NPM account. If not, create one at [npmjs.com](https://www.npmjs.com)
2. **NPM CLI**: Make sure you're logged in to NPM in your terminal: `npm login`
3. **Package Name**: The package is currently configured as `numdisplay`. If you want to publish under a different name, update the `name` field in `package.json`.
4. **GitHub Repository**: The package is linked to the GitHub repository at [github.com/abdulhaseeb13mar/NumDisplay](https://github.com/abdulhaseeb13mar/NumDisplay).

## Pre-Publishing Checklist

Before publishing, ensure the following:

### 1. Check Package Build

```bash
npm run build
```

This should create a `dist/` folder with the compiled files.

### 2. Run Type Checking

```bash
npm run type-check
```

This ensures all TypeScript types are correct.

### 3. Run Linting

```bash
npm run lint
```

Fix any linting errors before proceeding.

### 4. Test the Package Locally

You can test the package locally before publishing:

```bash
# Create a symlink to test locally
npm link

# In another project directory
npm link numdisplay
```

### 5. Update Version (if needed)

If this isn't the first release, update the version in `package.json`:

```bash
npm version patch   # for bug fixes
npm version minor   # for new features
npm version major   # for breaking changes
```

## Publishing Steps

### 1. Clean Build

```bash
# Remove any existing build artifacts
rm -rf dist/
npm run build
```

### 2. Check Package Contents

```bash
# See what files will be included in the published package
npm pack --dry-run
```

### 3. Login to NPM

```bash
npm login
```

### 4. Publish the Package

```bash
# For regular packages
npm publish
```

## Post-Publishing

### 1. Verify Publication

Check that your package is available at:

- `https://www.npmjs.com/package/numdisplay`

### 2. Test Installation

In a new project, test installing your package:

```bash
npm install numdisplay
```

### 3. Update Documentation

Make sure your README.md is up to date with:

- Installation instructions
- Usage examples
- API documentation

## Package Information

- **Name**: `numdisplay`
- **Current Version**: `1.0.0`
- **Main Export**: `dist/index.js`
- **Module Export**: `dist/index.esm.js`
- **Types**: `dist/index.d.ts`

## Dependencies

### Peer Dependencies (Required by consumers)

- `react` >= 16.8.0
- `react-dom` >= 16.8.0

### Runtime Dependencies (Bundled)

- `@radix-ui/react-tooltip`
- `clsx`
- `tailwind-merge`

## Troubleshooting

### Common Issues

1. **403 Forbidden Error**: You don't have permission to publish to this package name

   - Solution: Change the package name in `package.json` or request access

2. **Package already exists**: The version already exists on NPM

   - Solution: Increment the version number in `package.json`

3. **Build Errors**: TypeScript or build errors

   - Solution: Run `npm run type-check` and `npm run build` to identify issues

4. **Missing Files**: Some files aren't included in the published package
   - Solution: Check the `files` array in `package.json` and `.npmignore`

### Getting Help

If you encounter issues:

1. Check the NPM documentation: https://docs.npmjs.com/
2. Verify your package.json configuration
3. Ensure all dependencies are properly installed

## Maintenance

### Regular Updates

- Keep dependencies updated
- Monitor for security vulnerabilities
- Respond to user issues and feature requests

### Versioning Strategy

Follow [Semantic Versioning](https://semver.org/):

- **Patch** (1.0.1): Bug fixes
- **Minor** (1.1.0): New features (backwards compatible)
- **Major** (2.0.0): Breaking changes

## Next Steps

After successful publication:

1. Add the package to your project's documentation
2. Consider creating examples or demos
3. Set up automated testing and CI/CD if needed
4. Monitor download statistics and user feedback
