'use strict';

const Botkit = require('botkit');

const controller = Botkit.slackbot({
  debug: false
});

controller.spawn({
  token: process.env.BOTKIT_SLACK_TOKEN
}).startRTM();

var Roll = require('roll'),
roll = new Roll();

controller.hears('.*', ['direct_message', 'direct_mention', 'mention'], (bot, message) => {
  var input = message.match[0];
  var valid = roll.validate(input);

  if (!valid) {
    bot.reply(message, `${input} is not a valid input string for node-roll!`);
  } else {
    var dice = roll.roll(input);
    bot.reply(message, `${input} > ${dice.result}`);
  }
});
