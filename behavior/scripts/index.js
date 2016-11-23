'use strict'

exports.handle = function handle(client) {
  const handleGreeting = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('greeting')
      client.done()
    }
  })

  client.runFlow({
    classifications: {
      // Add a greeting handler with a reference to the greeting stream
      greeting: 'greeting'
    },
    streams: {
      // Add a Stream for greetings and assign it a Step
      greeting: handleGreeting,
      main: 'onboarding',
      onboarding: [sayHello],
      end: [untrained]
    }
  })
}