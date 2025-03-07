
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() * 16 | 0,
          v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}

class Commit {
  constructor(id, message, prevCommit) {
    this.id = id;
    this.message = message;
    this.prevCommit = prevCommit;
  }
}

class Git {
  constructor(name) {
    this.name = name;
    this.HEAD = null;
  }
  
  commit(message){
    const newCommit = new Commit(generateUUID(), message, this.HEAD)
    this.HEAD = newCommit;
    return newCommit;
  }
  
  log(){
    const history = []
    
    let start = this.HEAD
    
    while(start){
      history.push(`id: ${start.id} - ${start.message}`)
      start = start.prevCommit
    }
    
    return history
  }
}

const repo = new Git("ejemplo"); // git init

repo.commit("hotfix") // git commit -m "hotfix"
repo.commit("correcting") // git commit -m "hotfix"
repo.commit("moneyyyy") // git commit -m "hotfix"

console.log(repo.log())
