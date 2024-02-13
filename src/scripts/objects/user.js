const user = {
    avatarUrl: '',
    name:'',
    bio:'',
    userName:'',
    followers:'',
    following:'',
    repositories: [],
    events: [],
    setInfo(gitHubUser){
        this.avatarUrl = gitHubUser.avatar_url
        this.name = gitHubUser.name
        this.bio = gitHubUser.bio
        this.userName = gitHubUser.login
        this.followers = gitHubUser.followers
        this.following = gitHubUser.following
    },
    setRepositories(repositories){
        this.repositories = repositories
    },
    setEvents(events){
        const eventTypes = ['CreateEvent', 'PushEvent']
        const filteredEvents = events.filter(event => eventTypes.includes(event.type))
        this.events = filteredEvents
        filteredEvents.forEach(event => {
            if (event.type === 'CreateEvent') {
              return event.payload.description;
            } else if (event.type === 'PushEvent') {
              return event.payload.commits.map(commit => commit.message);
            }
          });
          
    }

}

export { user }