import { getRepositories } from './services/repositories.js';
import { getUser } from './services/user.js'
import { getEvents } from './services/events.js';
import { user } from './objects/user.js'
import { screen } from './objects/screen.js';

let search = document.getElementById('input-search')

document.getElementById('btn-search').addEventListener('click', () => {  
    if(validateEmptyInput(search)) return
    getUserData(search.value)
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key =  e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if(isEnterKeyPressed){
        if(validateEmptyInput(search)) return
        getUserData(userName)
    }
   
})

function validateEmptyInput(userName){
    if(userName.value.length === 0){
        alert('Preencha o campo com o nome do usuário do GitHub')
        return true
    }
}

async function getUserData(userName) {

    const userResponse = await getUser(userName)

    if(userResponse.message === "Not Found"){
        screen.renderNotFound();
        return
    }
    const repositoriesResponse = await getRepositories(userName)
    const eventsResponse = await getEvents(userName)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(eventsResponse)

    screen.renderUser(user)
    getEvents(userName)
    console.log(repositoriesResponse);
};
