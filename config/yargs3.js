const argv = require('yargs')
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'Base para la tabla de multiplicar',
    })
    .option('h', {
        alias: 'hasta',
        type: 'number',
        demandOption: true,
        describe: 'Número máximo de tabla a generar',
    })
    .option('l', {
        alias: 'listar',
        type: 'boolean',
        default: false,
        describe: 'Muestra las tablas en consola',
    })
    .option('limite', {
        alias: 'lim',
        type: 'number',
        default: 10,
        describe: 'Límite de multiplicaciones por tabla',
    })
    .check((argv) => {
        if (isNaN(argv.b) || isNaN(argv.h) || isNaN(argv.limite)) {
            throw new Error('❌ Los valores de base, hasta y límite deben ser números');
        }
        return true;
    })
    .argv;

module.exports = argv;
