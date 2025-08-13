const fs = require('fs');
const path = require('path');

console.log('🔍 Checking build requirements...\n');

// Check if public/index.html exists
const publicIndexPath = path.join(__dirname, 'public', 'index.html');
if (fs.existsSync(publicIndexPath)) {
  console.log('✅ public/index.html exists');
  console.log('   Size:', fs.statSync(publicIndexPath).size, 'bytes');
} else {
  console.log('❌ public/index.html NOT FOUND');
}

// Check if src/index.js exists
const srcIndexPath = path.join(__dirname, 'src', 'index.js');
if (fs.existsSync(srcIndexPath)) {
  console.log('✅ src/index.js exists');
} else {
  console.log('❌ src/index.js NOT FOUND');
}

// Check if package.json exists
const packagePath = path.join(__dirname, 'package.json');
if (fs.existsSync(packagePath)) {
  console.log('✅ package.json exists');
} else {
  console.log('❌ package.json NOT FOUND');
}

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  console.log('✅ node_modules exists');
} else {
  console.log('❌ node_modules NOT FOUND');
}

console.log('\n📁 Current directory contents:');
const files = fs.readdirSync(__dirname);
files.forEach(file => {
  const stats = fs.statSync(file);
  const type = stats.isDirectory() ? '📁' : '📄';
  console.log(`   ${type} ${file}`);
});

console.log('\n📁 Public directory contents:');
const publicDir = path.join(__dirname, 'public');
if (fs.existsSync(publicDir)) {
  const publicFiles = fs.readdirSync(publicDir);
  publicFiles.forEach(file => {
    const stats = fs.statSync(path.join(publicDir, file));
    const type = stats.isDirectory() ? '📁' : '📄';
    console.log(`   ${type} ${file}`);
  });
} else {
  console.log('   ❌ Public directory not found');
}

console.log('\n🚀 Build verification complete!');
