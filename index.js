var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');
const { validationResult } = require("express-validator");

//start mysql connection
var connection = mysql.createConnection({
  host     : 'localhost', 
  port     : 8889,
  user     : 'bagus', //mysql database user name
  password : 'jakarta1908', //mysql database password
  database : 'deliverystore' //mysql database name
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected with mysql database...')
})
//end mysql connection

//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration

//create app server
var server = app.listen(3001,  "127.0.0.1", function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});
//rest api to get all order
app.get('/api/order/store', function (req, res) {
   connection.query('select * from orders', function (error, results, fields) {
    try {
        
      res.send({
          statusCode: 200,
          statusMessage: 'Ok',
          message: 'Successfully retrieved all the orders.',
          data: results,
      });
    } catch (error) {
      res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
    }
  })
});
//rest api to get a single order data

app.get('/api/order/store/:id', function (req, res) {
  const id  = req.params.id;
   connection.query('select * from orders where id_customer=?', [id], function (error, results, fields) {
    try {
      res.send({
          statusCode: 200,
          statusMessage: 'Ok',
          message: 'Successfully retrieved the orders ID.',
          data: results,
          
      });
    } catch (error) {
      res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
    }
	});
});


//rest api to get a add order data
app.post('/api/order/store', function (req, res) {
   var params  = req.body;
   console.log(params);
   connection.query('INSERT INTO orders SET ?', params, function (error, results, fields) {
    try {
      res.send({
          statusCode: 200,
          statusMessage: 'Ok',
          message: 'Successfully retrieved all the orders.',
          data: params,
      });
    } catch (error) {
      res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
    }
	});
});


//rest api to get a update order data
app.put('/api/order/store', function (req, res) {
   connection.query('UPDATE `orders` SET `alamat_pengirim`=?,`alamat_penerima`=?,`jenis_pengiriman`=?,`berat_barang`=?, `harga_ongkir`=?, `matauang`=? where `id_customer`=?', [req.body.alamat_pengirim,req.body.alamat_penerima, req.body.Country, req.body.jenis_pengiriman, req.body.berat_barang, req.body.harga_ongkir, req.body.matauang], function (error, results, fields) {
    try {
      res.send({
          statusCode: 200,
          statusMessage: 'Ok',
          message: 'Successfully retrieved the orders ID.',
          data: results,
          
      });
    } catch (error) {
      res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
    }
	});
});


//rest api to get a delete order data
app.delete('/api/order/store', function (req, res) {
   console.log(req.body);
   connection.query('DELETE FROM `orders` WHERE `id_customer`=?', [req.body.id_customer], function (error, results, fields) {
	  try {
      res.send({
          statusCode: 200,
          statusMessage: 'Ok',
          message: 'Successfully retrieved the orders ID.',
          data: results,
          
      });
    } catch (error) {
      res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
    }
	});
});


//rest api to get a add schedule data
app.post('/api/schedule/store', function (req, res) {
  var params  = req.body;
  console.log(params);
  connection.query('INSERT INTO shipment SET ?', params, function (error, results, fields) {
    try {
      res.send({
          statusCode: 200,
          statusMessage: 'Ok',
          message: 'Successfully retrieved the orders ID.',
          data: params,
          
      });
    } catch (error) {
      res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
    }
 });
});

//rest api to get a add shipment data
app.post('/api/shipment/store', function (req, res) {
  var params  = req.body;
  console.log(params);
  connection.query('INSERT INTO shipment SET ?', params, function (error, results, fields) {
    try {
      res.send({
          statusCode: 200,
          statusMessage: 'Ok',
          message: 'Successfully retrieved the orders ID.',
          data: params,
          
      });
    } catch (error) {
      res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
    }
 });
});

//rest api to get a single shipment data
app.get('/api/shipment/store/:id', function (req, res) {
  var params  = req.params.id;
  connection.query('select * from shipment where nomer_resi=?', [req.params.id], function (error, results, fields) {
    try {
      res.send({
          statusCode: 200,
          statusMessage: 'Ok',
          message: 'Successfully retrieved the orders ID.',
          data: results,
          
      });
    } catch (error) {
      res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
    }
 });
});

//rest api to get a shipment order data
app.put('/api/shipment/store', function (req, res) {
  var params  = req.body;
  connection.query('UPDATE `shipment` SET `id_order`=?,`jadwal_pengiriman`=?,`status_pengiriman`=?, `estimasi_pengiriman`=?, `lokasi_barang`=? where `nomer_resi`=?', [ req.body.id_order,req.body.jadwal_pengiriman, req.body.status_pengiriman, req.body.estimasi_pengiriman, req.body.lokasi_barang, req.body.nomer_resi], function (error, results, fields) {
    try {
      res.send({
          statusCode: 200,
          statusMessage: 'Ok',
          message: 'Successfully retrieved the orders ID.',
          data: params,
          
      });
    } catch (error) {
      res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
    }
 });
});

//rest api to get a confirm data
app.put('/api/confrim/store', function (req, res) {
  var params  = req.body;
  connection.query('UPDATE `shipment` SET `id_order`=?,`jadwal_pengiriman`=?,`status_pengiriman`=?, `estimasi_pengiriman`=?, `lokasi_barang`=?, `konfirmasi_pengiriman`=? where `nomer_resi`=?', [ req.body.id_order,req.body.jadwal_pengiriman, req.body.status_pengiriman, req.body.estimasi_pengiriman, req.body.lokasi_barang, req.body.konfirmasi_pengiriman, req.body.nomer_resi], function (error, results, fields) {
    try {
      res.send({
          statusCode: 200,
          statusMessage: 'Ok',
          message: 'Successfully retrieved the orders ID.',
          data: params,
          
      });
    } catch (error) {
      res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
    }
 });
});