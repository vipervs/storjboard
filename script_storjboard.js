function requestInfo() {
    const timeNow = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    const dnode = require('dnode');
    const request = require('request');
    const daemon = dnode.connect(45015);
    daemon.on('remote', function (rpc) {
        rpc.status(function (err, shares) {
            console.log(timeNow + ' - Data from StorjShare recived successfull');
            var sendJsonData =[];
            var len = shares.length;
            for (var i = 0; j=len, i<j; i++){
                var share = shares[i];
                sendJsonData.push({'id': share['id'], 'state':share['state'],
                    'storage':share['config']['storageAllocation'],'meta': share['meta']});
            }
            var dataSend = {data: sendJsonData};
            console.log(timeNow + ' - Sending Data to StorjBoard.pro server');

            request.post({
                 url: "https://storjboard.pro/api/report/",
                 headers: {
                    "Content-Type": "application/json"
                 },
                 body: dataSend,
                 json:true
            }, function(error, response, body){
               try {
                   if (response.body === 'OK') {
                       console.log(timeNow + ' - Data to StorjBoard.pro server sent successfull');
                       console.log(timeNow + ' - Next update will be in 5 min')
                       daemon.end();
                   } else if (response.body === 'BAD') {
                       console.log(timeNow + ' - Fault to send data to StorjBoard.pro check if you and all nodes to you Board');
                       daemon.end();
                   } else {
                       console.log(timeNow + error);
                       console.log(timeNow + body);

                   }
               } catch (err) {
                   console.log(err)
               }

            });
        }
    );
    });
}

console.log('Start first update in 5 min')
setInterval(requestInfo, 300000);
