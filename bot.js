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

controller.hears(['([0-9]*)d([0-9]+)'], [
  'direct_message',
  'direct_mention',
  'mention',
  'ambient'
], (bot, message) => {
  var a = message.match[1];
  if(a < 1) { a = 1; }
  var b = message.match[2];
  var Dice = roll.roll(a+'d'+b);
  bot.reply(message,a+'d'+b +' > ' + Dice.result );
});
