let deferredPrompt;
const addBtn = document.querySelector('.btn');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (event) => {
  console.log("show")
  event.preventDefault();
  deferredPrompt = event;
  addBtn.style.display = 'block';
});

addBtn.addEventListener('click', (c) => {
  addBtn.style.display = 'none';
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
});