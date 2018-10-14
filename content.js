const pageContent = window.document.all[0];
const innerHTML = pageContent.innerHTML;
const urlRegex = /(lbry:\/\/)(@*[a-zA-Z0-9-]*)(#[a-zA-Z0-9]*)*/gm;

const newInnerHTML = innerHTML.replace(urlRegex, function(str) {

  const [match, proto, name, claimId] = arguments;

  let href = `https://open.lbry.io/${name}`;
  if (claimId) {
    href += claimId
  }

  return `<a href="${href}">${str}</a>`;

});

pageContent.innerHTML = newInnerHTML
