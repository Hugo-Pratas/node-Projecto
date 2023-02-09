const mysql = require("mysql");
require("dotenv").config();
const ExcelJS = require("exceljs");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

function query(sql, bindings) {
    return new Promise(function (resolve, reject) {
        connection.query(sql, bindings, function (err, resultados) {
            if (err) {
                reject(err);
            } else {
                resolve(resultados);
            }
        })
    });
}

async function execute() {
    const workbook = new ExcelJS.Workbook();
    const tabelas = await query(`SELECT TABLE_NAME FROM information_schema.tables WHERE table_schema = '${process.env.DB_DATABASE}'`);

    for (let tabela of tabelas) {
        const worksheet = workbook.addWorksheet(tabela.TABLE_NAME);
        const colunas = await query("SELECT COLUMN_NAME, COLUMN_TYPE, EXTRA FROM information_schema.columns WHERE table_schema = ? AND TABLE_NAME = ?", [process.env.DB_DATABASE, tabela.TABLE_NAME]);
        worksheet.columns = colunas.map(coluna => {
            return {header: coluna.COLUMN_NAME, key: coluna.COLUMN_NAME};
        });
        const dados = await query("SELECT * FROM " + tabela.TABLE_NAME);
        dados.forEach(d => worksheet.addRow(d));
    }
    await workbook.xlsx.writeFile(process.env.DB_DATABASE + '.xlsx');
    connection.end();
}


execute();
