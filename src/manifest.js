module.exports = {
  name: 'Skedgit Extension',
  version: '1.0.0',
  description: 'Collaborative Calendar Management by Skedgit',
  author: 'Skedgit',
  manifest_version: 2,
  icons: {
    '16': 'icons/16.png',
    '48': 'icons/48.png',
    '64': 'icons/64.png',
    '128': 'icons/128.png'
  },
  permissions: [
    '<all_urls>',
    '*://*/*',
    'activeTab',
    'tabs',
    'cookies',
    'background',
    'contextMenus',
    'unlimitedStorage',
    'storage',
    'notifications',
    'identity',
    'identity.email'
  ],
  browser_action: {
    default_title: 'Skedgit',
    default_icon: 'icons/64.png',
    // default_popup: 'pages/popup.html'
  },
  background: {
    persistent: false,
    page: 'pages/background.html'
  },
  devtools_page: 'pages/devtools.html',
  content_scripts: [{
    js: [ 'js/content.js' ],
    run_at: 'document_end',
    matches: ['<all_urls>'],
    all_frames: false
  }],
  content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'"
  // web_accessible_resources: [ 'panel.html', 'js/content.js' ]
}
