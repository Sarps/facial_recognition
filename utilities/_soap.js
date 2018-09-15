const soap = require('soap');

soap.createClient(url, function(err, g_client) {
    if(!g_client) {
      return console.log(err);
    }

    var url = './GetFXRate.xml';
    global.client = g_client;
    //client.setEndpoint('https://196.8.204.73/citwebservice/ChatBotGetFXRate')
    client.setSecurity(new soap.ClientSSLSecurityPFX(
        './citmobile.stanbicbank.com.gh-Jeff.pfx',
        'Fr33W!lly',
        { rejectUnauthorized: false }
    ));
    let intents = new Map();
    intents.set('currency.convert', getFXRate);
    /*intents.set('account.balance.check', fallback);
    intents.set('account.spending.check', fallback);
    intents.set('transfer.money', fallback);*/
    agent.handleRequest(intents);
    
});