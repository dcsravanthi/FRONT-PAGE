// uncomment line below to register offline cache service worker
// navigator.serviceWorker.register('../serviceworker.js');
const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);
function GetSelectedItem()
{
    var e = document.getElementById("s1").value;
  }

var request = new XMLHttpRequest();
request.open('GET', 'https://api.exchangeratesapi.io/latest?base=USD', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {

    const card1 = document.getElementById('base');
    const p = document.createElement('h3')
    p.textContent = data.base;
    p.setAttribute('align', 'center');
    card1.appendChild(p);
    for (let [key, value] of Object.entries(data.rates)) {
      console.log(`key=${key} value=${value}`)

      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = key;

      const p = document.createElement('p');
      p.textContent = value;
      p.setAttribute('align', 'center');

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);

    }
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
  });

if (typeof fin !== 'undefined') {
  init();
} else {
  document.querySelector('#of-version').innerText =
    'The fin API is not available - you are probably running in a browser.';
}

//once the DOM has loaded and the OpenFin API is ready
async function init() {
  //get a reference to the current Application.
  const app = await fin.Application.getCurrent();
  const win = await fin.Window.getCurrent();

  const ofVersion = document.querySelector('#of-version');
  ofVersion.innerText = await fin.System.getVersion();

  //Only launch new windows from the main window.
  if (win.identity.name === app.identity.uuid) {
    //subscribing to the run-requested events will allow us to react to secondary launches, clicking on the icon once the Application is running for example.
    //for this app we will  launch a child window the first the user clicks on the desktop.
    app.once('run-requested', async () => {
      await fin.Window.create({
        name: 'childWindow',
        url: location.href,
        defaultWidth: 320,
        defaultHeight: 320,
        autoShow: true
      });
    });
  }
}
}
