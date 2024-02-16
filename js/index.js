document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#github-form') 
    const searchForm = form.querySelector('#search')
    form.addEventListener('submit', submitChangeHandler)
    // searchForm.addEventListener('change', changeEventHandler)
})
function submitChangeHandler(event){
    event.preventDefault()
    const changeValue = event.target.querySelector('#search').value
    fetchForNames(changeValue)
    event.target.reset()
}

function fetchForNames(userNameInput){
    fetch(`https://api.github.com/search/users?q=${userNameInput}`,{
        headers:{
            Accept: "application/vnd.github.v3+json"
        }
    })
    .then(resp => resp.json())
    .then(users => iterateUsers(users))
}
//Global Variables
const selectingUlForRepos= document.querySelector("#repos-list")
const selectingUlForUser = document.querySelector("#user-list")

function iterateUsers(names){
    
    selectingUlForUser.innerHTML = '';
    const itemsForUsers = names.items
    for(let itemForUser of itemsForUsers){
        const login = itemForUser.login
        const liForUser = document.createElement('li')
        liForUser.textContent = login
        liForUser.addEventListener('click', fetchRepoList)
        selectingUlForUser.appendChild(liForUser)
    }
}
function fetchRepoList(event){
    const userName = event.target.textContent
    selectingUlForRepos.innerHTML = ''
    fetch(`https://api.github.com/users/${userName}/repos`,{
        headers:{
            Accept: "application/vnd.github.v3+json"
        }
    })
    .then(resp => resp.json())
    .then(repos => iterateRepos(repos, userName))
}
function iterateRepos(repos, userName){
    
    const itemsForRepos = repos
    const newh2 = document.createElement('h2')
    newh2.textContent = `List of reposotiories of ${userName}:`
    selectingUlForRepos.append(newh2)
    for(let itemForRepo of itemsForRepos){
        const repo = itemForRepo.html_url
        const liForRepo = document.createElement('li')
        liForRepo.textContent = repo
        selectingUlForRepos.appendChild(liForRepo)
    }
}