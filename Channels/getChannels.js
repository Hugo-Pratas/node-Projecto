const express = require("express");
const router = express.Router();
const {query} = require("../Services/Query_db")
const ExcelJS = require("exceljs");

router.get('/', async function (req, res) {
     channels = await query("SELECT * FROM CANAL");
     res.send(channels);
});

router.get('/excel', async function (req, res) {
     tabela= await query('SELECT * FROM CANAL')
     const workbook = new ExcelJS.Workbook();
     const worksheet = workbook.addWorksheet('Canais');
     worksheet.addRow(['id', 'slug', 'name', 'descrição', 'logo', 'banner']);
     tabela.forEach(rowData => {
          worksheet.addRow(Object.values(rowData));
     });
     excel= workbook.xlsx.writeBuffer('canais_data.xlsx')
         .then(function(file) {
              res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
              res.setHeader('Content-Disposition', 'attachment; filename=canaisdata.xlsx');
              res.send(file)
         });
});


router.get('/:id_channel', async function (req, res) {
     channel = await query("SELECT * FROM CANAL WHERE id = ?", [req.params.id_channel]);
     res.send(channel);
});

module.exports = router;