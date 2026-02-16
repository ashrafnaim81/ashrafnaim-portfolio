#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✅${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}❌${colors.reset} ${msg}`),
  step: (msg) => console.log(`\n${colors.cyan}${colors.bright}${msg}${colors.reset}`),
};

function runCommand(command, options = {}) {
  try {
    execSync(command, { stdio: 'inherit', ...options });
    return true;
  } catch (error) {
    return false;
  }
}

async function main() {
  console.log(`
${colors.bright}${colors.cyan}
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║           🚀 Portfolio Template Setup                     ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
${colors.reset}
`);

  // Step 1: Check Node.js version
  log.step('Step 1/6: Checking Node.js version...');
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

  if (majorVersion < 18) {
    log.error(`Node.js 18 or higher is required. You have ${nodeVersion}`);
    log.info('Please upgrade Node.js: https://nodejs.org/');
    process.exit(1);
  }
  log.success(`Node.js ${nodeVersion} detected`);

  // Step 2: Install dependencies
  log.step('Step 2/6: Installing dependencies...');
  log.info('This may take a few minutes...');

  if (!runCommand('npm install --legacy-peer-deps')) {
    log.error('Failed to install dependencies');
    process.exit(1);
  }
  log.success('Dependencies installed');

  // Step 3: Create .env.local from .env.example
  log.step('Step 3/6: Setting up environment...');

  const envExamplePath = path.join(process.cwd(), '.env.example');
  const envLocalPath = path.join(process.cwd(), '.env.local');

  if (!fs.existsSync(envExamplePath)) {
    log.error('.env.example not found!');
    process.exit(1);
  }

  if (fs.existsSync(envLocalPath)) {
    log.warning('.env.local already exists, skipping...');
  } else {
    fs.copyFileSync(envExamplePath, envLocalPath);
    log.success('.env.local created from .env.example');
  }

  // Step 4: Generate Prisma client
  log.step('Step 4/6: Generating database client...');

  if (!runCommand('npx prisma generate')) {
    log.error('Failed to generate Prisma client');
    process.exit(1);
  }
  log.success('Prisma client generated');

  // Step 5: Create database and push schema
  log.step('Step 5/6: Creating database...');

  // Remove old database if exists for fresh setup
  const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');
  if (fs.existsSync(dbPath)) {
    log.info('Removing existing database for fresh setup...');
    fs.unlinkSync(dbPath);
    // Also remove journal file if exists
    const journalPath = dbPath + '-journal';
    if (fs.existsSync(journalPath)) {
      fs.unlinkSync(journalPath);
    }
  }

  if (!runCommand('npx prisma db push')) {
    log.error('Failed to create database');
    process.exit(1);
  }
  log.success('Database created (SQLite)');

  // Step 6: Seed demo data
  log.step('Step 6/6: Adding demo content...');

  if (!runCommand('npx prisma db seed')) {
    log.error('Failed to seed database');
    process.exit(1);
  }
  log.success('Demo content added');

  // Done!
  console.log(`
${colors.green}${colors.bright}
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║           ✅ Setup Complete!                              ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
${colors.reset}

${colors.bright}Next steps:${colors.reset}

  1. Start the development server:
     ${colors.cyan}npm run dev${colors.reset}

  2. Open in browser:
     ${colors.cyan}http://localhost:3000${colors.reset}        - Website
     ${colors.cyan}http://localhost:3000/admin${colors.reset}  - Admin Panel

  3. Login to Admin:
     ${colors.yellow}Email:    admin@example.com${colors.reset}
     ${colors.yellow}Password: Admin@123${colors.reset}

${colors.bright}Customization:${colors.reset}

  - Edit content via Admin Panel
  - Update ${colors.cyan}.env.local${colors.reset} for your settings
  - Modify ${colors.cyan}prisma/seed.ts${colors.reset} for default data

${colors.bright}Documentation:${colors.reset}

  - README.md - Full documentation
  - DEPLOYMENT.md - Deployment guide

Happy coding! 🎉
`);
}

main().catch((error) => {
  log.error('Setup failed:');
  console.error(error);
  process.exit(1);
});
