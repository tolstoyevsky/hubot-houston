// Description:
//   Feedback bot
//
// Configuration:
//   SUPPORT_CHANNEL - The channel name to handle users issue requests
//
// Commands:
//   hubot issue - initiate an issue creation
//

module.exports = async function issueBot (robot) {
  const SUPPORT_CHANNEL = process.env.SUPPORT_CHANNEL || 'support'
  const botChannels = await robot.adapter.api.get('channels.list.joined')
  const botGroups = await robot.adapter.api.get('groups.list')
  const chExists = botChannels.channels.filter(item => item.name === SUPPORT_CHANNEL).length
  const grExists = botGroups.groups.filter(item => item.name === SUPPORT_CHANNEL).length
  if (!chExists && !grExists) {
    robot.logger.error(`Hubot is not in the group or channel named '${SUPPORT_CHANNEL}'`)
    return
  }

  const Conversation = require('hubot-conversation')
  const conversation = new Conversation(robot)

  function registerIssue(username, userText) {
    userText = userText.replace('rocketbot', '').trim()
    let messageToHR = `Получено новое сообщение от пользователя @${username}: \n
                  ${userText}`
    robot.messageRoom(SUPPORT_CHANNEL, messageToHR)
  }

  robot.respond(/issue$/i, (msg) => {

    var dialog = conversation.startDialog(msg)

    msg.reply('Пожалуйста, опишите вашу проблему или вопрос в одном сообщении.')
    
    dialog.addChoice(/.+/gsi, function(msg2) {
        let userText = msg2.match[0]
        registerIssue(msg2.message.user.name, userText)
        msg2.reply('Спасибо, я передал ваше сообщение команде техподдержки')
      }
    )
  })
}

