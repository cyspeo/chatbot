/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
           \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
            \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


This is a sample Console bot built with Botkit.

This bot demonstrates many of the core features of Botkit:

* Receive messages based on "spoken" patterns
* Reply to messages
* Use the conversation system to ask questions
* Use the built in storage system to store and retrieve information
  for a user.

# RUN THE BOT:

  Run your bot from the command line:

    node console_bot.js

# USE THE BOT:

  Say: "Hello"

  The bot will reply "Hello!"

  Say: "who are you?"

  The bot will tell you its name, where it is running, and for how long.

  Say: "Call me <nickname>"

  Tell the bot your nickname. Now you are friends.

  Say: "who am I?"

  The bot will tell you your nickname, if it knows one for you.

  Say: "shutdown"

  The bot will ask if you are sure, and then shut itself down.

  Make sure to invite your bot into other channels using /invite @<my bot>!

# EXTEND THE BOT:

  Botkit has many features for building cool and useful bots!

  Read all about it here:

    -> http://howdy.ai/botkit

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

var Botkit = require('botkit');
var os = require('os');
var Q = require('q');

var controller = Botkit.consolebot({
    debug: false,
});

var bot = controller.spawn();
var Datastore = require('nedb')

db = {};
db.intents = new Datastore({ filename: './db/intents.db', autoload: true });
db.entities = new Datastore({ filename: './db/entities.db', autoload: true });
db.dialogs = new Datastore({ filename: './db/dialogs.db', autoload: true });


let intents = [];

var searchIntent = function (message) {
    db.intents.find({})
}


var searchDialog = function(intent) {
    var deferred = Q.defer();
    db.dialogs.find({condition:intent}, function (err, docs) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(docs)
        }
    });
    return deferred.promise;
}
/**
 * REcherche une intent.
 * TODO gérer le mode asynchrone.
 * @param {*} message 
 */
var checkIntent = function (message, cb) {
    result = [];
    db.intents.find({}, function (err, docs) {


        docs.forEach((doc, index, array) => {
            console.log('doc=' + JSON.stringify(doc))
            doc.examples.forEach((example, ind, arr) => {
                //console.log('example=' + example);
                if (example == message) {
                    var resultIntent = {
                        'intent': doc.intent,
                        'exact': true,
                        'nbWordsMatch': 0
                    }
                    result.push(resultIntent);
                } else {
                    //console.log("message:" + JSON.stringify(message));
                    var mots = message.split(" ");
                    nbMot = 0;
                    //Pour chaque mot du message regarder s'il est présent dans l'exemple
                    doc.examples.forEach((example, ind, arr) => {
                        mots.forEach((mot, indMot, arrayMots) => {
                            //console.log("example:"+JSON.stringify(example)+ 'mot='+mot);   
                            if (example.indexOf(mot) > 0) {
                                nbMot++
                            }
                        });
                    });
                    if (nbMot > 0) {
                        var resultIntent = {
                            'intent': doc.intent,
                            'exact': false,
                            'nbWordsMatch': nbMot
                        }
                        result.push(resultIntent);
                        nbMot = 0;
                    }
                }
            });
        });

        // extract intent
        let finalIntent = null;
        finalIntent = result.filter((intent, ind, array) => exact = true);
        if (!finalIntent && result.length > 0) {
            finalIntent = Math.max.apply(Math, result.map(function (o) { return o.nbWordsMatch; }))
        }
        //console.log('checkIntent =' + JSON.stringify(finalIntent + '.'));
        if (finalIntent != null && finalIntent.length > 0) {
            //console.log("finalIntent " + JSON.stringify(finalIntent));
            return cb(finalIntent[0].intent);
        } else {
            cb();
            return
        }
    });
}

controller.hears([''], 'message_received', function (bot, message) {
    checkIntent(message.text, function (intent) {


        //console.log('intent after check=' + intent);
        if (intent == null || intent.length == 0) {
            bot.startConversation(message, function (err, convo) {
                if (!err) {
                    convo.say('I do not anderstand.');
                    convo.ask('What is the intent ?`', function (response, convo) {
                        let examples = [];
                        examples.push(message.text);
                        let intent = {
                            'intent': response.text,
                            'examples': examples
                        }
                        //intents.push(intent);
                        db.intents.insert(intent, function (err, newDocs) {

                        })
                        convo.say('Cool i have learn a new intent!');
                        convo.next();
                    });
                }
            });
        } else {
            //console.log("intent trouve" + JSON.stringify(intent))
            bot.reply(message, 'Ok i anderstand this intent : ' + intent);
            //TODO Si l'intent n'a pas été trouve avec une correspondance exact on peut enregistrer le message comme example pour cette intention
            searchDialog(intent).then(function (docs) {
                if (docs.length == 0) {
                    bot.reply(message, 'no dialog found ');
                }
            })
            //TODO Si l'action de l'intention necessite des paramètres il faut entamer un dialog
            // - pour cela il faut associer une action à l'intention
            // - pour chaque paramètre de l'action nécessaire il faut vérifier s'il sont dans le message initiale  ou ouvrir un dialog pour les demander
            // - exemple : prendre un rendez vous. Il faut le jour, l'heure, avec qui.
            // - exemple : lister les rendez a venir. Il ne faut aucun paramètre
            // *** Faut il associer un verbe à chaque intention? ex : ajouter, supprimer, lister, rechercher, voir... ***

            //findDialog(intent);
        }
    });
});

