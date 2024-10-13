const fs = require('fs');
const colors = require('colors');
const PDFDocument = require('pdfkit');
const path = require('path');

const crearArchivo = async (base = 5, hasta = 10, limite = 10, listar = false) => {
    try {
        let salida = '';
        let consola = '';

        for (let i = base; i <= hasta; i++) {
            let tabla = '';
            const tituloTabla = `Tabla del ${i}`;

            tabla += `\n${tituloTabla}\n` + colors.gray('-'.repeat(40)) + '\n';
            consola += colors.bgMagenta.white.bold(`\n Tabla del ${i} \n`);
            consola += colors.gray('-'.repeat(40)) + '\n';

            for (let j = 1; j <= limite; j++) {
                const linea = `${i} ${'x'.blue} ${j} ${'='.green} ${i * j}\n`;
                tabla += linea;
                consola += linea;
            }

            tabla += colors.gray('-'.repeat(40)) + '\n\n';
            consola += colors.gray('-'.repeat(40)) + '\n';
            salida += tabla;
        }

        if (listar) {
            console.log(colors.cyan.bold('='.repeat(50)));
            console.log(colors.yellow.bold(`📋 TABLAS DEL ${base} AL ${hasta}`));
            console.log(colors.cyan.bold('='.repeat(50)));
            console.log(consola);
        }

        const folderPath = path.join(__dirname, '..', 'salida');
        const filePath = path.join(folderPath, `tabla-${base}-al-${hasta}.pdf`);
        const doc = new PDFDocument();

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        doc.pipe(fs.createWriteStream(filePath));

        doc.fontSize(20).text(`Tablas del ${base} al ${hasta}`, { align: 'center' });
        doc.moveDown();

        for (let i = base; i <= hasta; i++) {
            doc.fontSize(16).text(`Tabla del ${i}`, { align: 'center' });
            doc.moveDown();

            for (let j = 1; j <= limite; j++) {
                doc.fontSize(12).text(`${i} x ${j} = ${i * j}`, { align: 'center' });
            }

            doc.moveDown(2);
        }

        doc.end();

        return `tabla-${base}-al-${hasta}.pdf`;
    } catch (err) {
        throw new Error(`Error al crear archivo: ${err.message}`);
    }
};

module.exports = { crearArchivo };
