const fs = require('fs')
// npm install fs => https://www.npmjs.com/package/fs needed to read the JSON file

const Discord = require('discord.js');
// npm install discord.js => https://www.npmjs.com/package/discord.js needed to send webhooks

const data = fs.readFileSync('webhooks.json');
// getting raw data from the JSON file
var json = JSON.parse(data)
// parsing the raw data as JSON

var webhooks = json['webhooks']
// getting the list with the webhooks objects inside

for (let webhook of webhooks){
    var id = webhook.webhook.split('/')[5]
    var token = webhook.webhook.split('/')[6]
    var color = webhook.color
    var footer_text = webhook.footer_text
    var footer_image = webhook.footer_image
    // add other fields if needed
    
    const webhookClient = new Discord.WebhookClient(id, token);
    // setting up the actual webhook
    
    const embed = new Discord.MessageEmbed()
    // creating the webhook Embed
    
    .setTitle('Your webhook title')
    .setURL('Your webhook title URL')
    .setDescription('Your webhook description')
    .setColor(webhook.color)
    .setFooter(webhook.footer_text, webhook.footer_image)
    .setAuthor(webhook.author_name, webhook.author_image, webhook.author_url)
    // adding info to the embed
    
    webhookClient.send({embeds: [embed]});
    // sending webhooks
}
