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
    } else if (/^\/maximus$/.test(request_text)) {
      this.res.writeHead(200);
      postMessage(maximus());
      this.res.end();
    } else if (/^\/wtf$/.test(request_text)) {
      this.res.writeHead(200);
      postMessage(wtf());
      this.res.end();
    } else if (/^\/ruder$/.test(request_text)) {
      this.res.writeHead(200);
      postMessage("cuder");
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
  return "commands available are /cool guy, /8ball and /choose";
}

function tryna_start() {
  if (Math.random() < 0.75) {
    return "is that kwang tryna start again?";
  } else {
    return "who tryna start rn";
  }
}

function eightball() {
  var options = ["It is known", " It is decidedly so", "Without a doubt", "Yes definitely", "You may rely on it", "As I see it, yes", "Most likely", "Outlook good", "Yes", "Signs point to yes", "Reply hazy try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again", "Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful", "I must say no"];
  options.push("You should ask " + choosePerson());
  var index = Math.floor(Math.random() * options.length);
  return options[index];
}

function wtf() {
  return "What the fuck did you just fucking say about me, you little bitch? I’ll have you know I graduated top of my class in the Navy Seals, and I’ve been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I’m the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You’re fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that’s just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little “clever” comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn’t, you didn’t, and now you’re paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You’re fucking dead, kiddo.";
}

function choosePerson() {
  var people = ["cory", "franklin", "peter", "kyle", "rich", "bernard", "michael", "kwang", "ept", "joseph"];
  var index = Math.floor(Math.random() * people.length);
  return people[index];
}

function maximus() {
  return "My name is Maximus Decimus Meridius, commander of the Armies of the North, General of the Felix Legions, loyal servant to the true emperor, Marcus Aurelius. Father to a murdered son, husband to a murdered wife. And I will have my vengeance, in this life or the next.";
}

function jospeh(message, times) {
  //give robert a chance to spell right
  if (Math.random() < 0.02) {
    return message;
  } else {
    var words = message.split(" ");
    var word_index = Math.floor(Math.random() * words.length);
    var random_word = words[word_index];
    var letter_index = Math.floor(Math.random() * random_word.length);
    //don't switch the first or last letter of a word
    if (letter_index == 0 || letter_index >= random_word.length - 2) {
      if (times == 0) {
        return message;
      } else {
        return jospeh(message, times-1);
      }
    } else {
      var a = random_word[letter_index];
      var b = random_word[letter_index+1];
      var garbled_word = random_word.substr(0,letter_index) + b + a + random_word.substr(letter_index+2, random_word.length);
      var new_message = [];
      for (i = 0; i < words.length; i++) {
        if (i == word_index) {
          new_message.push(garbled_word);
        } else {
          new_message.push(words[i]);
        }
      }
      return new_message.join(" ");
    }
  }
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
    "text" : jospeh(message, 5)
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
