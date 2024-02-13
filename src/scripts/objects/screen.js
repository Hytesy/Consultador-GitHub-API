const screen = {
    userProfile:  document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML = `<div class="info">
                                                    <img src="${user.avatarUrl}" alt="Foto do perfil do usúario">
                                                    <div class="data">
                                                        <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                                        <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                                                        <div class="followData">
                                                            <p><span class="follows">${user.followers}</span><br>Seguidores</p>
                                                            <p><span class="follows">${user.following}</span><br>Seguindo</p>
                                                        </div>
                                                    </div>
                                                </div>`  
                                                
        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `
        <li>
            <a href="${repo.html_url}" target="_blank">${repo.name}
            <br>
                <ul class="status">
                    <li><i class="fa-solid fa-code-fork" style="color: #FF1744"></i> ${repo.forks_count}</li> 
                    <li><i class="fa-solid fa-star" style="color: #FFEB3B"></i> ${repo.stargazers_count}</li> 
                    <li><i class="fa-regular fa-eye" style="color:#7C4DFF"></i> ${repo.watchers_count}</li> 
                    <li><i class="fa-solid fa-code" style="color:#00E676"></i> ${repo.language}</li> 
                </ul>
             </a>
         </li>`)

        if(user.repositories.length > 0){
           this.userProfile.innerHTML += `<div class="repositories section">
                                            <h2>Repositórios</h2>
                                            <ul>${repositoriesItens}</ul>
                                        </div>` 
        }
        let eventsItens = '';

        user.events.forEach(event => {
          if (event.type === 'CreateEvent') {
            const createEventMessage = event.payload.description;
            eventsItens += `<li><p><span class="nameEvents">${event.repo.name}</span> - ${createEventMessage ?? 'Evento sem descrição'}</p></li>`;
          } else if (event.type === 'PushEvent') {
            const commitMessages = event.payload.commits.map(commit => commit.message).join(', ');
            eventsItens += `<li><p><span class="nameEvents">${event.repo.name}</span> - ${commitMessages ?? 'Evento sem descrição'}</p></li>`;
          }
        });
        
        if (user.events.length > 0) {
          this.userProfile.innerHTML += `<div class="events">
              <h2>Eventos</h2>
              <ul>${eventsItens}</ul>
          </div>`;
        }
    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }