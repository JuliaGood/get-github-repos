const form = document.querySelector(".form");
const username = document.getElementById("username");
const submitBtn = document.getElementById("submit");
const listRepos = document.getElementById('list-repos');
const error = document.getElementById('error');

submitBtn.addEventListener("click", function(e) {
  e.preventDefault();
  const userInput = username.value;
  if ( userInput.length > 0) {
    getRepos(userInput);
  } else {
    listRepos.innerHTML = '';
    error.innerHTML = '';
    showError("Please, enter a username!");
  }
});

const getRepos = (userinput) => {
  listRepos.innerHTML = '';
  error.innerHTML = '';
  fetch(`https://api.github.com/users/${userinput}/repos`)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("No user found!");
      }
      return resp.json()
    })
    .then((data) => {
      if(data.length > 0) {
        console.log("data", data);
        createListRepos(data);
      } else {
      showError("No repositories found!");
      }
    })
    .catch((err) => {
      showError(err.message);
    })
}

const createListRepos = (repos) => {
  repos.forEach((repo) => { 
    const item = document.createElement('li');
    const link = document.createElement('a');
    const itemText = document.createTextNode(repo.name);
    link.appendChild(itemText);
    link.href = repo.html_url;
    link.target = "_blank";
    item.appendChild(link);
    listRepos.appendChild(item);
  });
}

const showError = (message) => {
  const pText = document.createTextNode(message);
  error.innerHTML = '';
  error.appendChild(pText);
}
