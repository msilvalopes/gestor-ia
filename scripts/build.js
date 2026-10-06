const fs = require('fs');
const path = require('path');

// Criar diretório de build
const buildDir = path.join(__dirname, '../build');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// Copiar arquivos necessários para build
const filesToCopy = [
  'server.js',
  'package.json',
  'middleware/',
  'models/',
  'routes/',
  'swagger.js',
  'docs/',
  'API-USAGE.md',
  'coverage-config.md',
  'logs/README.md'
];

filesToCopy.forEach(file => {
  const src = path.join(__dirname, '../', file);
  const dest = path.join(buildDir, file);
  
  if (fs.existsSync(src)) {
    if (fs.lstatSync(src).isDirectory()) {
      // Se for diretório, criar e copiar conteúdo
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      const items = fs.readdirSync(src);
      items.forEach(item => {
        const itemSrc = path.join(src, item);
        const itemDest = path.join(dest, item);
        fs.copyFileSync(itemSrc, itemDest);
      });
    } else {
      // Se for arquivo, copiar diretamente
      fs.copyFileSync(src, dest);
    }
  }
});

console.log('Build criado com sucesso em ./build');