// Monta a pasta dist/ com o site e, se existir, o relatório de cobertura dos testes.
const fs = require('fs');
const path = require('path');

const raiz = path.join(__dirname, '..');
const dist = path.join(raiz, 'dist');

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

fs.cpSync(path.join(raiz, 'public'), dist, { recursive: true });
fs.copyFileSync(path.join(raiz, 'src', 'conversor.js'), path.join(dist, 'conversor.js'));

const cobertura = path.join(raiz, 'coverage', 'lcov-report');
if (fs.existsSync(cobertura)) {
  fs.cpSync(cobertura, path.join(dist, 'cobertura'), { recursive: true });
  console.log('Relatório de cobertura incluído em dist/cobertura');
} else {
  console.log('Aviso: relatório de cobertura não encontrado (rode "npm test" antes do build)');
}

console.log('Site gerado em dist/');
