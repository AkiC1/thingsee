var https = require('https');
var crypto = require('crypto');
var moment = require('moment');

// Event Hubs parameters
var namespace = 'thingsee';
var hubname ='akinodee_hsend';
var devicename = 'device-01';

//https://thingsee.servicebus.windows.net/akinodee_hsend

// Payload to send
var payload = '{\"Temperature\":\"37.0\",\"Humidity\":\"0.4\"}';

// Shared access key (from Event Hub configuration)
var key_name = 'Data';
var key = 'ZFe88zqovbai6x3GkbF1pWOe8MUoAgGK+JLg754t9As=';

// Full Event Hub publisher URI
var uri = 'https://' + namespace + '.servicebus.windows.net' + '/' + hubname + '/publishers/' + devicename + '/messages';

// Create a SAS token
// See http://msdn.microsoft.com/library/azure/dn170477.aspx

function create_sas_token(uri, key_name, key)
{
    // Token expires in one hour
    var expiry = moment().add(1, 'hours').unix();

    var string_to_sign = encodeURIComponent(uri) + '\n' + expiry;
    var hmac = crypto.createHmac('sha256', key);
    hmac.update(string_to_sign);
    var signature = hmac.digest('base64');
    var token = 'SharedAccessSignature sr=' + encodeURIComponent(uri) + '&sig=' + encodeURIComponent(signature) + '&se=' + expiry + '&skn=' + key_name;

    return token;
}

var my_sas = create_sas_token(my_uri, my_key_name, my_key)

console.log(my_sas);

// Send the request to the Event Hub

var options = {
  hostname: namespace + '.servicebus.windows.net',
  port: 443,
  path: '/' + hubname + '/publishers/' + devicename + '/messages',
  method: 'POST',
  headers: {
    'Authorization': my_sas,
    'Content-Length': payload.length,
    'Content-Type': 'application/atom+xml;type=entry;charset=utf-8'
  }
};

var req = https.request(options, function(res) {
  console.log("statusCode: ", res.statusCode);
  console.log("headers: ", res.headers);

  res.on('data', function(d) {
    process.stdout.write(d);
  });
});

req.on('error', function(e) {
  console.error(e);
});

req.write(payload);
req.end();

