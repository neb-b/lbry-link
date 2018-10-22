const urlRegex = /(lbry:\/\/)(@*[a-zA-Z0-9-]*)(#[a-zA-Z0-9]*)*/igm;

function searchAndInsert(node, x) {
  if (node.nodeName == "#text" && node.nodeValue.match(urlRegex)) {
    // Text with lbry address found
    // Wrap it in a span so we can alter the innerHTML and add a link
    const replacementNode = document.createElement('span');

    replacementNode.innerHTML = node.nodeValue.replace(urlRegex, function(str) {
      return `<a href="${str}">${str}</a>`;
    });

    node.parentNode.insertBefore(replacementNode, node);
    node.parentNode.removeChild(node);
  } else if (node.innerHTML && node.innerHTML.includes('lbry://')) {
    if (node.childNodes) {
      for (var i = 0; i < node.childNodes.length; i++) {
        const currentNode = node.childNodes[i];
        searchAndInsert(node.childNodes[i], true);
      }
    }
  }
}

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

  searchAndInsert(body);
}

setTimeout(() => {
  addLinks();
}, 2000);
