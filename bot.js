var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]);
  if (request.text && request.sender_type == "user") {
    if (Math.random() < 0.005) {
      this.res.writeHead(200);
      postMessage("fuck you");
      this.res.end();
    }
    if (Math.random() < 0.01) {
      this.res.writeHead(200);
      postMessage("you are beautiful");
      this.res.end();
    }
    var request_text = request.text.toLowerCase();
    if (/^\/cool guy$/.test(request_text)) {
      this.res.writeHead(200);
      postMessage(cool_guy());
      this.res.end();
    } else if (/^\/choose$/.test(request_text)) {
      this.res.writeHead(200);
      postMessage(choosePerson());
      this.res.end();
    } else if (/^\/8ball$/.test(request_text)) {
      this.res.writeHead(200);
      postMessage(eightball());
      this.res.end();
    // } else if (/tryna start/.test(request_text)) {
    //   this.res.writeHead(200);
    //   postMessage(tryna_start());
    //   this.res.end();
    } else if (/robert wang/.test(request_text)) {
      this.res.writeHead(200);
      postMessage("you talkin to me?");
      this.res.end();
    } else if (/^\/help$/.test(request_text)) {
      this.res.writeHead(200);
      postMessage(help());
      this.res.end();
    }
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function cool_guy() {
  if (Math.random() < 0.01) {
    return "fuck you";
  } else {
    return cool();
  }
}

function help() {
  return "commands available are /cool guy and /choose";
}

function tryna_start() {
  if (Math.random() < 0.75) {
    return "is that kwang tryna start again?";
  } else {
    return "who tryna start rn";
  }
}

function eightball() {
  var options = ["It is certain", " It is decidedly so", "Without a doubt", "Yes definitely", "You may rely on it", "As I see it, yes", "Most likely", "Outlook good", "Yes", "Signs point to yes", "Reply hazy try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again", "Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"];
  options.append("You should ask " + choosePerson());
  var index = Math.floor(Math.random() * options.length);
  return options[index];
}

function choosePerson() {
  var people = ["cory", "franklin", "peter", "kyle", "rich", "bernard", "michael", "kwang", "ept", "joe"];
  var index = Math.floor(Math.random() * people.length);
  return people[index];
}

function postMessage(message) {
  var options, body, botReq;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : message
  };

  console.log('sending ' + message + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
