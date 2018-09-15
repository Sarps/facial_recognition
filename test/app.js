
const format = require('string-template');
const soap = require('soap');
const {WebhookClient, Payload} = require('dialogflow-fulfillment');
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const request = require('request');

const server = express();
server.use(bodyParser.urlencoded({
  extended: true
}));

var chat_source, sender_id, agent;

server.use(bodyParser.json());

server.post('/webhook', (req, res) => {

  agent = new WebhookClient({ request: req, response: res });


  console.log(req.body);

  chat_source =  req.body.originalDetectIntentRequest.source;

  if(chat_source == 'facebook'){
    let intentMap = new Map();
    intentMap.set('get_started', fb_get_started);
    intentMap.set('language_select', fb_select_lang);
    intentMap.set('new_conversation', fb_welcome);
    intentMap.set('transfer', fb_transfer);
    intentMap.set('account_opening', fb_onboard);
    intentMap.set('airtime_purchase', fb_airtime);
    intentMap.set('end_conversation', fb_end_conversation);
    intentMap.set('get_airtime_recipient', fb_airtime_recipient);
    intentMap.set('get_self_airtime', fb_self_airtime);
    intentMap.set('Default Fallback Intent', fallback);
    agent.handleRequest(intentMap);

  }else if(chat_source == 'twitter'){


  }else if(chat_source == 'skype'){

  }else if(chat_source == 'telegram'){

  }

});


function fb_get_started(agent) { 
  
  var messageData = [{
    "text": "Hello David 😉"
  }, 
  {
    "text" : "My name is Edem. \nI am a Stanbic Bank Digital Assistant and i can help you pay bills, buy airtime, check your account balance, forex rates and many more."
  },
  {              
    "text": "Please select your preferred language",
    "quick_replies":[
    {                                                                              
      "content_type":"text",
      "title":"English",
      "payload":"english_lang",
      "image_url":"https://image.ibb.co/bzG0mo/english.png"
    },{                                                                              
      "content_type":"text",
      "title":"French",
      "payload":"french_lang",
      "image_url":"https://image.ibb.co/bEwcXT/french.png"
    },{                                                                              
      "content_type":"text",
      "title":"Spanish",
      "payload":"spanish_lang",
      "image_url":"https://image.ibb.co/jggBsT/spain.png"
    }]

  }]

  let payload = new Payload(agent.FACEBOOK, messageData)
  agent.add(payload)
}

function fb_welcome(agent){
    var messageData = {                 
        'text': 'Hi David 🤗, glad to hear from you again. How may i help you today ?',
        "quick_replies":[
        {                                                                              
          "content_type":"text",
          "title":"Account Opening",
          "payload":"account_opening"
        },
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
        }]
      }
    let payload = new Payload(agent.FACEBOOK, messageData)
    agent.add(payload)
}

function fb_select_lang(agent){

    var messageData = {                 
        'text': 'Thanks David. How will you want to get started. Kindly type \'Help\' for assistance or \'Bye\' to end our conversation.',
        "quick_replies":[
        {                                                                              
          "content_type":"text",
          "title":"Account Opening",
          "payload":"account_opening"
        },
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
        }]
      }

      let payload = new Payload(agent.FACEBOOK, messageData)
      agent.add(payload)
}

function fb_transfer(agent){

    var messageData = [
        // {'text': 'Awesome David ! 😁. I can help you move money within your various stanbic accounts, transfer money to an already saved beneficiary or further help you transfer money to friends and families in other banks instantly.\n'},
        {'text': 'Awesome David ! 😁. Please select your transfer mode from the options below. 👇 \n'},
        {                 
        'text': '1. To move money within your Stanbic accounts please select the \'Self\' option.\n\n2. To instantly transfer money to other banks please select the \'3rd Party\' option.\n\n3. To exit please select or type \'Cancel\'.',
        "quick_replies":[
        {                                                                              
          "content_type":"text",
          "title":"Self",
          "payload":"self"
        },
        {                                                                              
          "content_type":"text",
          "title":"3rd Party",
          "payload":"third_party"
        },
        {                                                                              
          "content_type":"text",
          "title":"Cancel",
          "payload":"cancel"
        }]
      }]

      let payload = new Payload(agent.FACEBOOK, messageData)
      agent.add(payload)
}

function get_phone_no(agent){
}

function fb_airtime_recipient(agent){
    var messageData = {                 
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
      },{                                                                              
        "content_type":"text",
        "title":"Cancel",
        "payload":"cancel"
      }]
    }

    let payload = new Payload(agent.FACEBOOK, messageData)
    agent.add(payload) 
}

function fb_self_airtime(agent) {
      var messageData = 
      {              
         "attachment":{
          "type":"template",
          "payload":{
            "template_type":"button",
            "text":"",
            "buttons":[
              {
                "type":"web_url",
                "url":"https://b58693d1.ngrok.io/stanbic_social/#/otp",
                "title":"Social activation"
              }
            ]
          }
        }
      }

    let payload = new Payload(agent.FACEBOOK, messageData)
    agent.add(payload)
}

function fb_end_conversation(agent){
    var messageData = {                 
      'text': 'Alright David. I\'ll be available to assist you whenever the need be. Just type \'Hi\' to start a new conversation. Bye for now. 🖐'
    }

    let payload = new Payload(agent.FACEBOOK, messageData)
    agent.add(payload)
}

function fb_airtime(agent){
    var messageData = {                 
        'text': 'Please select your preferred network.',
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

    let payload = new Payload(agent.FACEBOOK, messageData)
    agent.add(payload)
}

function fallback(agent) {
  // agent.add('I didn\'t understand');
  // agent.add('I\'m sorry, can you try again?');

    var messageData = [{
        "text": "Hello David I am Siva, and I can help you pay bills, buy airtime, check your account balance, forex rates and many more. 😀"
      }, 

      {              
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
      }]
      
      }]

    let payload = new Payload(agent.FACEBOOK, messageData)
    agent.add(payload)
}

function fb_onboard(agent){
    var messageData = 
      {              
         "attachment":{
          "type":"template",
          "payload":{
            "template_type":"button",
            "text":"Please click the button below to create an account instantly. 👍",
            "buttons":[
              {
                "type":"web_url",
                "url":"https://face.bacegroup.com/",
                "title":"Social activation"
                //,
                // "messenger_extensions": "true",
              }
            ]
          }
        }
      }

    let payload = new Payload(agent.FACEBOOK, messageData)
    agent.add(payload)
}

server.listen((process.env.PORT || 8000), () => {
  console.log("Server is up and running on port 8000 ...");
});