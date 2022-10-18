var isUrlValid = false;
var request = new XMLHttpRequest();

function validateUrl(event) {
  const url = event.target.value;
  const pattern = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  const errorMessage = document.getElementById('errorMessage');
  const urlInput = document.getElementById('urlInput');
  const minifiedUrlParent = document.getElementById('minifiedUrlParent');
  minifiedUrlParent.style.display = 'none';
  if(url == '' || url == null) {
    errorMessage.innerHTML = 'Whoops! It looks like you forgot to add the url';
    isUrlValid = false;
    return;
  }
  if(!pattern.test(url)) {
    errorMessage.innerHTML = 'Please provide a valid url address.';
    urlInput.classList.add('invalid');
    isUrlValid = false;
  }
  else {
    errorMessage.innerHTML = '';
    urlInput.classList.remove('invalid');
    isUrlValid = true;
  }
}

function shortenUrl() {
  event.preventDefault();
  const minifiedUrl = document.getElementById('minifiedUrl');
  const urlInput = document.getElementById('urlInput');
  const minifiedUrlParent = document.getElementById('minifiedUrlParent');
  axios.post('https://mini7fy.herokuapp.com/api/url/shorten', {longUrl: urlInput.value})
  .then(response => {
    if(isUrlValid) {
      minifiedUrl.innerHTML = response.data.shortUrl;
      minifiedUrl.setAttribute("href", response.data.shortUrl);
      minifiedUrlParent.style.display = 'block';
    }
  })
  .catch(error => console.error(error));
  
}

function copyUrl(id) {
  navigator.clipboard.writeText(document.getElementById(id).href);
  document.getElementById("copied").style.display = "inline";
  document.getElementById("copiedIcon").style.display = "inline";
  document.getElementById("copyLink").style.display = "none";
  setTimeout( function() {
      document.getElementById("copied").style.display = "none";
      document.getElementById("copiedIcon").style.display = "none";
      document.getElementById("copyLink").style.display = "inline";
  }, 1000)
}

var isLoggedIn = false;

function login(event) {
  isLoggedIn = true;
  toggleUserPopup(true);
}

function toggleUserPopup(isChange = false) {
  const userPopup = document.getElementById('userPopup');
  if(!isChange) userPopup.classList.toggle('d-none');
  const isOpen = !userPopup.classList.value.includes('d-none');
  if(!isLoggedIn) {
    document.getElementById('userIcon').classList.remove(isOpen ? 'fa-regular' : 'fa-solid');
    document.getElementById('userIcon').classList.add(isOpen ? 'fa-solid' : 'fa-regular');
  }
  else {
    document.getElementById('loginPopup').classList.add('d-none');
    document.getElementById('settings').classList.remove('d-none');
    document.getElementById('userIcon').classList.add('d-none');
    document.getElementById('settingsPopup').classList.remove('d-none');
    setTimeout(function() {
      document.getElementById('settingsIcon').classList.toggle('rotate');  
    }, 0);
  }
  document.querySelector(':root').style.setProperty('--popup-open', isOpen ? 'block' : 'none');
}