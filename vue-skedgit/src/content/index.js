// console.log('content-script!')

const iframeSrc = 'https://skedgit-develop.herokuapp.com/beta'
// const iframeSrc = 'https://skedgit-develop.herokuapp.com/iframe'
// const iframeSrc = 'https://login.skedgitnow.com/users/sign_in'
const containerElemId = 'skedgit-ext-container'
const iframeElemId = 'skedgit-ext-iframe'

function httpGetAsync (url, cb) {
  let xmlHttp = new XMLHttpRequest()
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      cb(xmlHttp)
    }
  }
  xmlHttp.open('GET', url, true) // true for asynchronous
  xmlHttp.send(null)
}

function toggleVisibility (container, iframe) {
  let isHidden = container.style.display === 'none' || container.style.display === ''

  if (isHidden) {
    container.style.display = 'block'
    document.body.style.overflow = 'hidden'
    setTimeout(function () {
      iframe.style.transform = 'translate(0px, 0px)'
    }, 0)
  } else {
    iframe.style.transform = 'translate(100%, -100%)'
    document.body.style.overflow = 'visible'
    setTimeout(function () {
      container.style.display = 'none'
    }, 300)
  }
}

// capture messages sent to DOM via content.js
chrome.runtime.onMessage.addListener(
  function (msg, sender, sendResponse) {
    // console.info(msg, sender, sendResponse)

    // load iframe
    if (msg['loadIframe']) {
      // 'GET' iframe src and the response data
      httpGetAsync(iframeSrc, function (response) {
        // let responseHeaders = response.getAllResponseHeaders()
        let xFrameOpts = response.getResponseHeader('X-Frame-Options')
        if (xFrameOpts === 'SAMEORIGIN') {
          sendResponse({confirmation: 'Cannot load iframe'})
          alert('Cannot load Skedgit Extension')
        } else {
          let containerElem = document.getElementById(containerElemId)

          if (containerElem) {
            toggleVisibility(containerElem, document.getElementById(iframeElemId))
          } else {
            let container = document.createElement('div')
            container.id = containerElemId
            container.style.cssText = 'top: 0; right: 0; bottom: 0; left: 0; display: none; position: absolute; z-index: 2147483647;'

            let iframe = document.createElement('iframe')
            iframe.id = iframeElemId
            iframe.style.cssText = 'height: 100vh; width: 100vw; border: 0; position: fixed; transform: translate(100%, -100%); transition: transform 0.3s ease-in-out, width 0.3s ease-in-out, box-shadow 0.3s ease-in-out !important;'
            iframe.src = iframeSrc

            container.appendChild(iframe)
            document.body.appendChild(container)

            iframe.onload = function () {
              setTimeout(function () {
                toggleVisibility(container, iframe)
              }, 300)
            }
          }

          sendResponse()
        }
      })
    }
    sendResponse({confirmation: 'received message'})
  }
)
