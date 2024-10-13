const { crearArchivo } = require('./helpers/multiplicar5');
const colors = require('colors');
const argv = require('./config/yargs3');
const fs = require('fs');
const path = require('path');

console.clear();

const title = (text) => colors.bgMagenta.white.bold(` ${text} `);

console.log(colors.cyan.bold('='.repeat(50)));
console.log(title('Bienvenido a la App en Consola de JAIRO'));
console.log(colors.yellow.bold(' Generando Tablas de Multiplicar '));
console.log(colors.cyan.bold('='.repeat(50)));

//console.log(colors.blue(`Parámetros ingresados: ${JSON.stringify(argv)}`));

crearArchivo(argv.b, argv.h, argv.limite, argv.l)
    .then((nombreArchivo) => {
        console.log(colors.green.bold('\n✅ Archivo generado exitosamente:'));
        console.log(colors.bgGreen.black(` ${nombreArchivo} `));
        console.log(colors.cyan.bold('='.repeat(50)));

        const folderPath = path.join(__dirname, 'salida');
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
    })
    .catch((err) => console.error(colors.red(`❌ Error: ${err.message}`)));
