const currentUrl = window.location.href;

// exclude_matches wasn't working for me so I'm just doing it here
const excludedSites = ['youtube.com'];
const currentSiteBlackListed = excludedSites.some(blackListedUrl => currentUrl.includes(blackListedUrl));

function addLinks() {
  const htmlNodes = window.document.all;
  let body;
  for (var i = 0; i < htmlNodes.length; i ++) {
    const element = htmlNodes[i];
    if (element.nodeName === "BODY") {
      body = element;
      break;
    }
  }

  const urlRegex = /(lbry:\/\/)(@*[a-zA-Z0-9-]*)(#[a-zA-Z0-9]*)*/igm;
  const innerHTML = body.innerHTML;

  const newInnerHTML = innerHTML.replace(urlRegex, function(str) {
    return `<a href="${str}">${str}</a>`;
  });

  body.innerHTML = newInnerHTML;

}

if (!currentSiteBlackListed) {
  addLinks();
}
