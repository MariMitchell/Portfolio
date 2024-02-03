
const Alexa = require('ask-sdk-core');
const facts = require('./pricing');
const parkingOptions = {
    'albertsons stadium': ['east commuter', 'east reserve'],
    'student union building' : ['lincoln avenue garage', 'central reserve', 'east reserve'],
    'albertsons library' : ['central reserve', 'hourly parking at plaza west', 'hourly parking at plaza east'],
    'college of business and economics' : ['brady street garage', 'west reserve'],
    'morrison center' : ['west reserve']
};
const parking = require('../WebPage/model/ParkingData');
const express = require('express');
const{ ExpressAdapter } = require('ask-sdk-express-adapter');
const port = 3000 //Default port to http server
const mysql = require('mysql2');
const { response } = require('express');
const connection = mysql.createConnection({
    host: "bsu-gimm260-fall-2021.cwtgn0g8zxfm.us-west-2.rds.amazonaws.com",
    user: "HarrisonGroom",
    password: "UKxtrZLYaEJInUoYMkls4Shvca9S7J5qeA3",
    database: 'HarrisonGroom'
});
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome to GIMM Garage! Do you need help finding parking or information on prices/fees?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const parkingpriceIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'parkingpriceIntent';
    },
    async handle(handlerInput) {
       //const speakOutput = 'Hello World!';
        let speakOutput = facts[Math.floor(Math.random() * facts.length)];
        const insertSql = `INSERT INTO SmartParking(intentName) VALUES('parkingpriceIntent')`
        
        connection.query(insertSql, (error) =>{
            if(error){
                speakOutput = 'Something wrong happened with the server.'
                
            }
            
        })
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
        
    }
};

const GimmParkingIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'parkinglocationintent';
    },
    async handle(handlerInput) {
        let speakOutput = 'Changed for testing';
        const lot = Alexa.getSlotValue(handlerInput.requestEnvelope, 'building');
        const sentLot = parkingOptions[lot][Math.floor(Math.random() * parkingOptions[lot].length)];
        const insertSql = `INSERT INTO SmartParking(intentName) VALUES('GimmParkingIntent')`
        
        connection.query(insertSql, (error) =>{
            if(error){
                speakOutput = 'Something wrong happened with the server.'
                
            }
            
        })

        return handlerInput.responseBuilder
            .speak('You should park at ' + sentLot)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const CheapestParkingIntentHandler = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CheapestParkingIntent';
    },

    async handle(handlerInput) {
        let speakOutput = 'It looks like parking is free at Lincoln Garage today. You should check for a parking spot there first.';
        const insertSql = `INSERT INTO SmartParking(intentName) VALUES('CheapestParkingIntent')`
        
        connection.query(insertSql, (error) =>{
            if(error){
                speakOutput = 'Something wrong happened with the server.'
                
            }
            
        })
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const RecordParkingIntentHandler = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RecordParkingIntent';
    },

    async handle(handlerInput) {
        const spot = Alexa.getSlotValue(handlerInput.requestEnvelope, 'ParkingSpot');
        const insertSql = `INSERT INTO SmartParking(intentName) VALUES('RecordParkingIntent')`
        let speakOutput = 'Got it. I have recorded your parking spot as ' + spot;
        
        connection.query(insertSql, (error) =>{
            if(error){
                speakOutput = 'Something wrong happened with the server.'
                
            }
            
        })
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'What can I help you with today? You can ask me to find parking, access pricing, or access on campus events.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye! Happy Parking!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
const skill = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        parkingpriceIntentHandler,
        GimmParkingIntentHandler,
        CheapestParkingIntentHandler,
        RecordParkingIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .create();

    const adapter = new ExpressAdapter(skill, false, false);
    const app = express();
    app.use(express.static('../WebPage'));

    app.get('/', (request, response) => {
        response.sendFile('index.html', {root: '../WebPage/'});
    });
    app.get('/ParkingData/', async (request, response) =>{
        let result = {};
        try{
            results = await parking.getAllData(request.query);
        }catch (error){
            console.log(error);

            return response
                .status(500)
                .json({message: 'bad thing happened'});
        }
        response
        .json ({data: results});
    });



    app.post('/', adapter.getRequestHandlers());
    app.listen(3000);