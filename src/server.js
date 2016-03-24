'use strict';
import express from 'express';

const service = express();

server.set('port', (process.env.PORT || 5000));

service.get('/', function() {
  res.send('Hello World!!!');

});

service.listen(3000, function() {
  console.log('Listening at http://%s:%s', host, port);
});