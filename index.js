
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() * 16 | 0,
          v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}

class Branch {
  constructor(name, commit) {
    this.name = name;
    this.commit = commit;
  }
}

class Commit {
  constructor(id, message, prevCommit) {
    this.id = id;
    this.message = message;
    this.prevCommit = prevCommit;
  }
  
  toString() {
    return `Commit ${this.id} - ${this.message}`
  }
}

class Git {
  constructor(name) {
    this.name = name;
    this.HEAD = new Branch("master", null);
    this.branches = [this.HEAD]; // Could be a dictionary to be more performant
  }
  

  checkout(branchName) {
    // Looking for the branch.
    for(let branch of this.branches) {
      if(branch.name === branchName) {
        console.log("SWITCHING to " + branchName + " from " + this.HEAD.name)
        this.HEAD = branch
        return branch
      }
    }
    
    // Creating if not found
    const newBranch = new Branch(branchName, this.HEAD.commit);
    this.branches.push(newBranch);
    console.log("SWITCHING to " + branchName + " from " + this.HEAD.name)
    this.HEAD = newBranch;
    return newBranch;
  }
  
  commit(message){
    const newCommit = new Commit(generateUUID(), message, this.HEAD.commit)
    this.HEAD.commit = newCommit;
    return newCommit;
  }
  
  log(){
    const history = []
    
    let start = this.HEAD.commit
    
    while(start){
      history.push(start)
      start = start.prevCommit
    }
    
    return history
  }
}

const repo = new Git("ejemplo"); // git init

repo.commit("hotfix") // git commit -m "hotfix"
repo.commit("correcting") // git commit -m "hotfix"
repo.commit("moneyyyy") // git commit -m "hotfix"

// console.log(repo.log())

// repo.checkout("testing")

// repo.commit("Mondongo")

// console.log(repo.log())
