#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

interface ExportInfo {
  file: string;
  exports: string[];
  imports: string[];
}

async function findDeadExports() {
  const srcDir = path.join(process.cwd(), 'src');
  const files = await glob('**/*.{ts,tsx}', { cwd: srcDir });
  
  const exportMap = new Map<string, ExportInfo>();
  const importMap = new Map<string, Set<string>>();
  
  // Parse all files to find exports and imports
  for (const file of files) {
    const fullPath = path.join(srcDir, file);
    const content = fs.readFileSync(fullPath, 'utf-8');
    
    const exports = extractExports(content);
    const imports = extractImports(content);
    
    exportMap.set(file, {
      file,
      exports,
      imports,
    });
    
    // Track imports
    for (const imp of imports) {
      if (!importMap.has(imp)) {
        importMap.set(imp, new Set());
      }
      importMap.get(imp)!.add(file);
    }
  }
  
  // Find unused exports
  const unusedExports: Array<{ file: string; export: string }> = [];
  
  for (const [file, info] of exportMap) {
    for (const exp of info.exports) {
      const isUsed = Array.from(importMap.values()).some(imports => 
        imports.has(file) && info.imports.some(imp => imp.includes(exp))
      );
      
      if (!isUsed) {
        unusedExports.push({ file, export: exp });
      }
    }
  }
  
  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    totalFiles: files.length,
    totalExports: Array.from(exportMap.values()).reduce((sum, info) => sum + info.exports.length, 0),
    unusedExports: unusedExports.length,
    unusedExportsList: unusedExports,
  };
  
  const reportPath = path.join(process.cwd(), 'reports', 'dead-exports.json');
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`Found ${unusedExports.length} unused exports`);
  console.log(`Report saved to: ${reportPath}`);
  
  if (unusedExports.length > 0) {
    console.log('\nUnused exports:');
    unusedExports.forEach(({ file, export: exp }) => {
      console.log(`  ${file}: ${exp}`);
    });
  }
}

function extractExports(content: string): string[] {
  const exports: string[] = [];
  
  // Named exports
  const namedExportRegex = /export\s+(?:const|let|var|function|class|interface|type)\s+(\w+)/g;
  let match;
  while ((match = namedExportRegex.exec(content)) !== null) {
    exports.push(match[1]);
  }
  
  // Export statements
  const exportStatementRegex = /export\s*{\s*([^}]+)\s*}/g;
  while ((match = exportStatementRegex.exec(content)) !== null) {
    const exportList = match[1].split(',').map(exp => exp.trim().split(' as ')[0]);
    exports.push(...exportList);
  }
  
  // Default exports
  const defaultExportRegex = /export\s+default\s+(\w+)/g;
  while ((match = defaultExportRegex.exec(content)) !== null) {
    exports.push(match[1]);
  }
  
  return exports;
}

function extractImports(content: string): string[] {
  const imports: string[] = [];
  
  // Import statements
  const importRegex = /import\s+(?:{[^}]+}|\w+|\*\s+as\s+\w+)\s+from\s+['"]([^'"]+)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }
  
  // Dynamic imports
  const dynamicImportRegex = /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
  while ((match = dynamicImportRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }
  
  return imports;
}

if (require.main === module) {
  findDeadExports().catch(console.error);
}

export { findDeadExports };
