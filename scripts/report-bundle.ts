#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

async function generateBundleReport() {
  console.log('Generating bundle analysis report...');
  
  try {
    // Build with analyzer
    execSync('npm run build:analyze', { stdio: 'inherit' });
    
    // The analyzer should generate a report in the build output
    const reportPath = path.join(process.cwd(), 'reports', 'bundle.html');
    const buildReportPath = path.join(process.cwd(), '.next', 'analyze', 'client.html');
    
    if (fs.existsSync(buildReportPath)) {
      fs.mkdirSync(path.dirname(reportPath), { recursive: true });
      fs.copyFileSync(buildReportPath, reportPath);
      console.log(`Bundle report saved to: ${reportPath}`);
    } else {
      console.log('Bundle analyzer report not found. Make sure to configure bundle analyzer.');
    }
    
  } catch (error) {
    console.error('Failed to generate bundle report:', error);
  }
}

if (require.main === module) {
  generateBundleReport().catch(console.error);
}

export { generateBundleReport };
