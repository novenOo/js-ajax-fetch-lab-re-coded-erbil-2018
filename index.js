function getIssues() {
  fetch('https://api.github.com/repos/dalmaboros/javascript-fetch-lab/issues')
  .then(res => res.json())
  .then(json => showIssues(json))
}

function showIssues(json) {
  const issues = "<ul>" + json.map(issue =>{
    return `
    <li><p><strong>Title: ${issue.title}</strong><br>
    Status: ${issue.state}<br>
    Context: ${issue.body}</p></li>`
  }).join(" ")+ "</ul>";
  document,getElementById("issues").innerHTML = issues;
}

function createIssue() {
  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;
  const post = {title: title, body: body}
  fetch('https://api.github.com/repos/dalmaboros/javascript-fetch-lab/issues',{
    method: 'post',
    headers:{
      Authorization:`token ${getToken()}`
    },
    body: JSON.stringify(post)
  }).then(res => getIssues());
}

function showResults(json) {
   const template = `<h2>Repo Forked!</h2><a href="${json.html_url}>${json.html_url}</a>"`
   document.getElementById("results").innerHTML = template;
}

function forkRepo() {
  const repo = 'learn-co-curriculum/javascript-fetch-lab';
  //use fetch to fork it!
  fetch(`https://api.github.com/repos/${repo}/forks`,{
  	method:'post',
  	headers:{
  		Authorization:`token ${getToken()}`
  	}
  }).then(res =>res.json())
    .then(json => showResults(json))
}

function getToken() {
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
  return ''
}
