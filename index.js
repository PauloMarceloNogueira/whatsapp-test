const venom = require('venom-bot');
const axios = require("axios");

venom
  .create()
  .then((client) => start(client));

function saveMessage(body) {
  axios.post('https://energetic-stack-kz4mi.cloud.serverless.com/messages', {
    id: body.id,
    messageId: body.id,
    body: body.body,
    type: body.type,
    nofifyName: body.nofifyName,
    isBusiness: body.sender.isBusiness,
    isGround: body.chat.isGroup,
    phoneNumber: body.sender.pushname,
    isGiver: true
  })
}


function getCharities() {
  return axios.get('https://energetic-stack-kz4mi.cloud.serverless.com/charities')
  .then(function (response) {
    console.log(response);
    return response;
  })
  .catch(function (error) {
    console.log(error);
  });
}

async function test(client) {
  let list = [];
  getCharities().then(data => {
    data.data?.charities?.items.forEach(charitie => {
      list.push({
        title: charitie.value?.name,
        description: "Mogi das Cruzes"
      });
    });
    const listA = [
      {
        title: "Mogi das Cruzes",
        rows: list
      }
    ];
    client.sendListMenu('5511999732158@c.us', 'Instituições de caridade', 'subTitle', 'Clique no botão abaixo e veja as instituições de caridade mais próximas de você', 'VER TUDO', listA)
    .then((result) => {
      console.log('Result: ', result); //return object success
    })
    .catch((erro) => {
      console.error('Error when sending: ', erro); //return object error
    });
  });
  
}


function start(client) {
	client.onStateChange((status) => {
		console.log(`Status changed to ${status}`);
		if ('UNPAIRED'.includes(status)) console.log("Logout");
	})
  client.onMessage((message) => {
    // test(client);
    saveMessage(message);
    if (message.body === "Quero doar") {
      test(client);
    }
  });

  client.on
}

