const htmlNodes = window.document.all;
let bodyNode;

for (var i = 0; i < htmlNodes.length; i ++) {
  const element = htmlNodes[i];
  if (element.nodeName === "BODY") {
    body = element;
    break;
  }
}

const innerHTML = body.innerHTML;
const urlRegex = /(lbry:\/\/)(@*[a-zA-Z0-9-]*)(#[a-zA-Z0-9]*)*/gm;

const newInnerHTML = innerHTML.replace(urlRegex, function(str) {

  const [match, proto, name, claimId] = arguments;

  if (claimId) {
    href += claimId
  }

  return `<a href="${match}">${str}</a>`;

});

body.innerHTML = newInnerHTML
