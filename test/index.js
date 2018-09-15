'use strict';

// Imports dependencies and set up http server
const
express = require('express'),
bodyParser = require('body-parser'),
request = require('request'),
app = express().use(bodyParser.json());
let PAGE_ACCESS_TOKEN = "EAAXX1ZAUONq4BAKoDa7cvCAtkN1Ld4oJoZAXenxzuzFPqPZCHnQaMETPSvL2dEwXPHRXAiXoJxpxGf9OAnHz4GZCZBZBUZBHKRb3gAL2xIl4lZCuVpoXt6ZCZAPBr54yG9ZAGgoQnMTdepjP7THHrmNmkbHVnjTv9UoGWOVUJltMGkHdvAW7hYUFdVV";

// Sets server port and logs message on success
app.listen(process.env.PORT || 1212, () => console.log('webhook is listening'));

// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {  

  let body = req.body;
  
  if (body.object === 'page') {

    body.entry.forEach(function(entry) {

      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      let sender_psid = webhook_event.sender.id;

      startTyping(sender_psid);

      if (webhook_event.message) {
        if(webhook_event.message.quick_reply){
          handleQuick_reply(sender_psid, webhook_event.message.quick_reply);
        }else{
          handleMessage(sender_psid, webhook_event.message);
        }
      }else if (webhook_event.postback) {
        if(webhook_event.postback.payload === 'initial handshake'){
          handlePostback_handshake(sender_psid, webhook_event.postback);
        }else{
          handlePostback(sender_psid, webhook_event.message.quick_reply);
        }
      }

    });
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
  
});

app.get('/webhook', (req, res) => {

    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = "fb_bot_bank"

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

      // Checks the mode and token sent is correct
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {

        // Responds with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);

      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);      
      }
    }
  });



app.get('/sendpush', (req, res) => {  
      // let response_payload;
      
      // response_payload = {
      //   "text": 'Congratulations David !! 🙌. \n\nYou have been successfully onboarded. \n\nWelcome to the blue famly.🖐 \n\nStanbic Bank .... #MovingForward #StanbicSocial'
      // }

      // callSendAPI('1994382743908199', response_payload); 


  let response_payload;

  response_payload = {
    "text": 'Congratulations David !! 🙌'
  }

  callSendAPI("1994382743908199",response_payload).then(function(results){

    console.log('msg_id get_started :: ' + results.recipient_id);

    if(results.recipient_id){


      response_payload = {                 
        "text": "You have been successfully onboarded."
      }

      callSendAPI("1994382743908199", response_payload).then(function(results){

        response_payload = {                 
          "text": "Please check your phone for your account details."
        }

        callSendAPI("1994382743908199", response_payload).then(function(results){
          response_payload = {                 
            "text": "Stanbic Bank Moving Forward 👉.  #StanbicSocial"
          }

          callSendAPI("1994382743908199", response_payload).then(function(results){
            console.log('msg_id language select :: ' + results.recipient_id);
          });
        });

      });

    }

});

});


// Handles messages events
function handleMessage(sender_psid, received_message) {

  let response_payload;

  if (received_message.text) {    

    if(received_message.text.toLowerCase() == 'hi'){
        response_payload = {
          'text': 'Hi David 🤗, glad to hear from you again. How may i help you today ?',
          "quick_replies":[
          {
            "content_type":"text",
            "title":"Check Balance",
            "payload":"balance"
          }, {
            "content_type":"text",
            "title":"Airtime Topup",
            "payload":"airtime"
          },{
            "content_type":"text",
            "title":"Bill Payment",
            "payload":"bills"
          },{
            "content_type":"text",
            "title":"Check Rates",
            "payload":"rates"
          },{
            "content_type":"text",
            "title":"Send Money",
            "payload":"transfer"
          },{
            "content_type":"text",
            "title":"Beneficiaries",
            "payload":"beneficiaries"
          }]
        }
    }else if(received_message.text.toLowerCase() == 'cancel'){
      response_payload = {
        "text": 'Alright David. I\'ll be available to assist you whenever the need be. Just type \'Hi\'. Bye for now. 🖐'
      }
    }else if(received_message.text == '10'){
      response_payload = {
          "attachment": {
          "type": "template",
          "payload": {
            "template_type": "list",
            "top_element_style": "compact",
            "elements": [
              {
                "title": "90***874***43",
                "subtitle": "Balance : GHS 1,682.93",
                "image_url": "https://image.ibb.co/kcixdd/ICONSS_45.png",
                "buttons": [
                  {
                    "title": "Purchase airtime",
                    "type": "web_url",
                    "url": "https://b7d7270c.ngrok.io/stanbicBot/#/otp",
                    "messenger_extensions": true,
                    "webview_height_ratio": "tall"
                  }
                ]
              },{
                "title": "70***923***74",
                "subtitle": "Balance : GHS 634.00",
                "image_url": "https://image.ibb.co/fVZQWy/ICONSS_44.png",
                "buttons": [
                  {
                    "title": "Purchase airtime",
                    "type": "web_url",
                    "url": "https://b7d7270c.ngrok.io/stanbicBot/#/otp",
                    "messenger_extensions": true,
                    "webview_height_ratio": "tall"
                  }
                ]        
              }
            ]  
          }
        }
      }
    }else if(received_message.text == '0260516997'){
      response_payload = {
          "attachment": {
          "type": "template",
          "payload": {
            "template_type": "list",
            "top_element_style": "compact",
            "elements": [
              {
                "title": "90***874***43",
                "subtitle": "Balance : GHS 1,682.93",
                "image_url": "https://image.ibb.co/kcixdd/ICONSS_45.png",
                "buttons": [
                  {
                    "title": "Purchase airtime",
                    "type": "web_url",
                    "url": "https://b7d7270c.ngrok.io/stanbicBot/#/otp",
                    "messenger_extensions": true,
                    "webview_height_ratio": "tall"
                  }
                ]
              },{
                "title": "70***923***74",
                "subtitle": "Balance : GHS 634.00",
                "image_url": "https://image.ibb.co/fVZQWy/ICONSS_44.png",
                "buttons": [
                  {
                    "title": "Purchase airtime",
                    "type": "web_url",
                    "url": "https://b7d7270c.ngrok.io/stanbicBot/#/otp",
                    "messenger_extensions": true,
                    "webview_height_ratio": "tall"
                  }
                ]        
              }
            ]  
          }
        }
      }
    }else if(received_message.text.toLowerCase() == 'airtime'){
      response_payload = {                 
        'text': 'Please select your preferred network.' ,
        "quick_replies":[
        {
          "content_type":"text",
          "title":"Airtel Tigo",
          "payload":"airteltigo"
        },{
          "content_type":"text",
          "title":"Glo",
          "payload":"glo"
        },{
          "content_type":"text",
          "title":"MTN",
          "payload":"mtn"
        },{
          "content_type":"text",
          "title":"Vodafone",
          "payload":"vodafone"
        }]
      } 
    }else if(received_message.text.toLowerCase() == 'transfer'){
        response_payload = {                 
        'text': 'Great 👏 . Please specify your transfer type.',
        "quick_replies":[
        {                                                                              
          "content_type":"text",
          "title":"Self",
          "payload":"transfer_self"
        },{
          "content_type":"text",
          "title":"Beneficiary",
          "payload":"transfer_beneficiary"
        },{
          "content_type":"text",
          "title":"Quick Send",
          "payload":"transfer_quick"
        }]
      } 
    }else if(received_message.text.toLowerCase() == 'beneficiary'){
      response_payload = {            
        'text': 'What action would you want to perform ? 🤔',
        "quick_replies":[
        {                                                                              
          "content_type":"text",
          "title":"Add Beneficiary",
          "payload":"add_beneficiary"
        },{
          "content_type":"text",
          "title":"Edit Beneficiary",
          "payload":"edit_beneficiary"
        },{
          "content_type":"text",
          "title":"View Beneficiaries",
          "payload":"view_beneficiaries"
        }]
      }
    }
  }
    // Sends the response message
    callSendAPI(sender_psid, response_payload); 
    stopTyping(sender_psid);
  }


// Handles messaging_postbacks events
function handlePostback_handshake(sender_psid, received_postback) {

  let response_payload;

  response_payload = {
    "text": 'Hello David I am Siva, and I can help you pay bills, buy airtime, check your account balance, forex rates and many more. 😀'
  }

  callSendAPI(sender_psid,response_payload).then(function(results){

    console.log('msg_id get_started :: ' + results.recipient_id);

    if(results.recipient_id){


      response_payload = {                 
        "text": "Please select your preferred language",
        "quick_replies":[
        {                                                                              
          "content_type":"text",
          "title":"English",
          "payload":"english",
          "image_url":"https://image.ibb.co/bzG0mo/english.png"
        },{                                                                              
          "content_type":"text",
          "title":"French",
          "payload":"french",
          "image_url":"https://image.ibb.co/bEwcXT/french.png"
        },{                                                                              
          "content_type":"text",
          "title":"Spanish",
          "payload":"spanish",
          "image_url":"https://image.ibb.co/jggBsT/spain.png"
        }                                             
        ]                                                                                

      }

      callSendAPI(sender_psid, response_payload).then(function(results){

        console.log('msg_id language select :: ' + results.recipient_id);

      });

    }

  });
}

// Handles messaging_postbacks events
function handleQuick_reply(sender_psid, received_quick_reply) {

  let response_payload;

  if(received_quick_reply.payload == 'english'){
    response_payload = {                 
        'text': 'Thanks David. What will you want to begin with ? Kindly type \'Help\' for assistance.',
        "quick_replies":[
        {                                                                              
          "content_type":"text",
          "title":"Check Balance",
          "payload":"balance"
        }, {                                                                              
          "content_type":"text",
          "title":"Airtime Topup",
          "payload":"airtime"
        },{                                                
          "content_type":"text",
          "title":"Bill Payment",
          "payload":"bills"
        },{                                                                              
          "content_type":"text",
          "title":"Check Rates",
          "payload":"rates"
        },{                                                                              
          "content_type":"text",
          "title":"Send Money",
          "payload":"transfer"
        },{
          "content_type":"text",
          "title":"Beneficiaries",
          "payload":"beneficiaries"
        }]
      }
       
  }else if(received_quick_reply.payload == 'french'){
      response_payload = {                 
        'text': 'Merci David. Qu\'est-ce qui va vouloir commencer? Veuillez taper \'Aidez-moi\' à l\'aide.',
        "quick_replies":[
        {                                                                              
          "content_type":"text",
          "title":"Check Balance",
          "payload":"balance"
        }, {                                                                              
          "content_type":"text",
          "title":"Airtime Topup",
          "payload":"airtime"
        },{                                                                              
          "content_type":"text",
          "title":"Bill Payment",
          "payload":"bills"
        },{                                                                              
          "content_type":"text",
          "title":"Check Rates",
          "payload":"rates"
        },{                                                                              
          "content_type":"text",
          "title":"Send Money",
          "payload":"transfer"
        },{
            "content_type":"text",
            "title":"Beneficiaries",
            "payload":"beneficiaries"
        }]
      }
  }else if(received_quick_reply.payload == 'spanish'){
      response_payload = {                 
        'text': 'Gracias David. Con qué querrás comenzar? Amable tipo \'ayuda\' para asistencia.',
        "quick_replies":[
        {                                                                              
          "content_type":"text",
          "title":"Check Balance",
          "payload":"balance"
        }, {                                                                              
          "content_type":"text",
          "title":"Airtime Topup",
          "payload":"airtime"
        },{                                                                              
          "content_type":"text",
          "title":"Bill Payment",
          "payload":"bills"
        },{                                                                              
          "content_type":"text",
          "title":"Check Rates",
          "payload":"rates"
        },{                                                                              
          "content_type":"text",
          "title":"Send Money",
          "payload":"transfer"
        },{
          "content_type":"text",
          "title":"Beneficiaries",
          "payload":"beneficiaries"
        }]
      }    
  }else if(received_quick_reply.payload == 'balance'){
    //check if user has profile call is_user_id_available... if user has already onboarded send link to webview.
    //all onbaording links will have a session id attached to it.. after onboarding has been completed. session id will be expired and not accesible.

      response_payload = {                 
        'text': 'Sorry David 😟, looks like you haven\'t yet onboarded on stanbic social. I will need a few details to complete your onboarding. click yes to continue.' ,
        "quick_replies":[
        {                                                                              
          "content_type":"text",
          "title":"Yes",
          "payload":"yes_onboard"
        },{                                                                              
          "content_type":"text",
          "title":"Cancel",
          "payload":"cancel"
        },]
      }  
  }else if(received_quick_reply.payload == 'airtime'){
      response_payload = {                 
        'text': 'Please select your preferred network.' ,
        "quick_replies":[
        {
          "content_type":"text",
          "title":"Airtel Tigo",
          "payload":"airteltigo"
        },{
          "content_type":"text",
          "title":"Glo",
          "payload":"glo"
        },{
          "content_type":"text",
          "title":"MTN",
          "payload":"mtn"
        },{
          "content_type":"text",
          "title":"Vodafone",
          "payload":"vodafone"
        }]
      } 
  }else if(received_quick_reply.payload == 'airteltigo' ) {
    response_payload = {                 
      'text': 'Please select recipient of airtime purchase',
      "quick_replies":[
      {                                                                              
        "content_type":"text",
        "title":"Self",
        "payload":"airtime_self"
      }, {                                                                              
        "content_type":"text",
        "title":"Other",
        "payload":"airtime_other"
      }]
    }
  }else if(received_quick_reply.payload == 'glo'){
    response_payload = {                 
      'text': 'Please select recipient of airtime purchase',
      "quick_replies":[
      {                                                                              
        "content_type":"text",
        "title":"Self",
        "payload":"airtime_self"
      }, {                                                                              
        "content_type":"text",
        "title":"Other",
        "payload":"airtime_other"
      }]
    }
  }else if(received_quick_reply.payload == 'mtn'){
    response_payload = {                 
      'text': 'Please select recipient of airtime purchase',
      "quick_replies":[
      {                                                                              
        "content_type":"text",
        "title":"Self",
        "payload":"airtime_self"
      }, {                                                                              
        "content_type":"text",
        "title":"Other",
        "payload":"airtime_other"
      }]
    }
  }else if(received_quick_reply.payload ==  'vodafone'){
    response_payload = {                 
      'text': 'Please select recipient of airtime purchase',
      "quick_replies":[
      {                                                                              
        "content_type":"text",
        "title":"Self",
        "payload":"airtime_self"
      }, {                                                                              
        "content_type":"text",
        "title":"Other",
        "payload":"airtime_other"
      }]
    }    
  }else if(received_quick_reply.payload == 'airtime_self'){
    response_payload = {
      "text": 'Thank\'s David. Please enter airtime purchase amount. 😁'
    }
  }else if(received_quick_reply.payload == 'airtime_other'){
    response_payload = {
      "text": 'Please enter recipient phone number.'
    }
  }else if(received_quick_reply.payload == 'yes_onboard'){
    response_payload = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"Please click the button below to login with your Stanbic account. 👍",
        "buttons":[
          {
            "type":"web_url",
            "url":"https://face-staging.bacegroup.com",
            "title":"Social activation",
            "messenger_extensions": "true",
            "webview_height_ratio": "tall",
          }
        ]
      }
    }
    }
  }else if(received_quick_reply.payload == 'transfer'){
        response_payload = {                 
        'text': 'Great 👏 . Please specify your transfer type.',
        "quick_replies":[
        {                                                                              
          "content_type":"text",
          "title":"Self",
          "payload":"transfer_self"
        },{
          "content_type":"text",
          "title":"Beneficiary",
          "payload":"transfer_beneficiary"
        },{
          "content_type":"text",
          "title":"Quick Send",
          "payload":"transfer_quick"
        }]
      } 
  }else if(received_quick_reply.payload == 'rates'){
      response_payload = {
        "text": 'Please specify the base and foreign currency. for instance ... 1 Ghana cedi to Dollar'
      }

  }else if(received_quick_reply.payload == 'beneficiaries'){
      response_payload = {            
        'text': 'What action would you want to perform ? 🤔',
        "quick_replies":[
        {                                                                              
          "content_type":"text",
          "title":"Add Beneficiary",
          "payload":"add_beneficiary"
        },{
          "content_type":"text",
          "title":"Edit Beneficiary",
          "payload":"edit_beneficiary"
        },{
          "content_type":"text",
          "title":"View Beneficiaries",
          "payload":"view_beneficiaries"
        }]
      }
  }else if(received_quick_reply.payload == 'cancel'){
    response_payload = {
      "text": 'Alright David. I\'ll be available to assist you whenever the need be. Just type \'Hi\'. Bye for now. 🖐'
    }
  }

    callSendAPI(sender_psid,response_payload).then(function(results){

    console.log('msg_id quick_reply :: ' + results.recipient_id);
      stopTyping(sender_psid);
  });
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {

  let response_payload;

  if(received_postback.payload == 'english'){
    response_payload = {
      "text": 'Great. Please select how i may help  👍. '
    }
  }else if(received_postback.payload == 'french'){
    response_payload = {
      "text": 'Génial ! 👍.  Veuillez cliquer sur le bouton ci-dessous et fournir les détails de votre compte pour compléter votre intégration.'
    }
  }else if(received_postback.payload == 'spanish'){
    response_payload = {
      "text": 'Estupendo ! 👍.  Haga clic en el botón a continuación y proporcione los detalles de su cuenta para completar su incorporación.'
    }
  }

  callSendAPI(sender_psid,response_payload).then(function(results){

    console.log('msg_id get_started :: ' + results.recipient_id);

  });
}

//sends typing prompt
function startTyping(sender_psid){
    // Construct the message body
    let request_body = {
      "recipient": {
        "id": sender_psid
      },
      "sender_action":"typing_on"
    }
    // Send the HTTP request to the Messenger Platform
    request({
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": PAGE_ACCESS_TOKEN },
      "method": "POST",
      "json": request_body
    }, (err, res, body) => {
      if (!err) {
        console.log('typing sent!')
      } else {
        console.error("Unable to send message:" + err);
      }
    }); 
}

//sends typing prompt
function stopTyping(sender_psid){
    // Construct the message body
    let request_body = {
      "recipient": {
        "id": sender_psid
      },
      "sender_action":"typing_off"
    }
    // Send the HTTP request to the Messenger Platform
    request({
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": PAGE_ACCESS_TOKEN },
      "method": "POST",
      "json": request_body
    }, (err, res, body) => {
      if (!err) {
        console.log('typing stopped!')
      } else {
        console.error("Unable to send message:" + err);
      }
    }); 
}

//Just added
function getUserInfo(sender_psid){

  request('https://graph.facebook.com/v2.6/'+sender_psid+'?fields=first_name,last_name,profile_pic&access_token='+PAGE_ACCESS_TOKEN, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
  });
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
    var request_body = {
      "recipient": {
        "id": sender_psid
      },
      "message": response
    }

    var headers = {
        'X-Frame-Options': 'ALLOW-FROM https://www.messenger.com/',
        'X-Frame-Options': 'ALLOW-FROM https://www.facebook.com/',
        'X-Frame-Options': 'allow geolocation; microphone; camera'
    }


    var options = {
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": PAGE_ACCESS_TOKEN },
      "headers": headers,
      "method": "POST",
      "json": request_body
    }

    return new Promise(function(resolve, reject) {
      request(options, (err, res, body) => {
        if (err) {
          reject(err);
          console.log(err);
        } else {
          resolve(body);
        }
      }); 
    });
  }