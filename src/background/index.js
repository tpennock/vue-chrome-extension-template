// chrome.browserAction.setBadgeText({text: 'ON'})

// onInstalled
chrome.runtime.onInstalled.addListener(function () {
  // localStorage is persisted, so it's a good place to keep state that you
  // console.log('Installed.')
})

// onBrowserAction -> click
chrome.browserAction.onClicked.addListener(function () {
  // send message command to load iframe
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        loadIframe: {}
      },
      null,
      function (response) {
        console.log(response.confirmation)
      })
  })
})

// onSuspend
chrome.runtime.onSuspend.addListener(function () {
  // chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
  // After the unload event listener runs, the page will unload, so any
  // asynchronous callbacks will not fire.
  // })

  // send message command to unload iframe
  chrome.tabs.sendMessage(
    null,
    {
      loadIframe: {}
    },
    null,
    function (response) {
      console.log(response.confirmation)
    }
  )
})
