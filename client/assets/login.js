const app = new Vue({
  el: "#app",
  data: {
    login: {
      username: "",
      password:""
    },
    register :{
      username : "",
      password:""
    },
    addlist: {
      kegiatan: "",
      deskripsi: new Date(),
      status: false,
    },
    showlist: [],
    selected:[]
  },
  methods: {
    getLogout () {
      localStorage.removeItem("token")
      window.location.href = "index.html"
    },
    getLogin () {
      // console.log(this.username);
      var self = this.login
      // console.log(self);
      axios.post(`http://localhost:3000/login`,{
        username : self.username,
        password : self.password
      })
      .then(response=>{
        console.log(response.data.username);
        // if(response.data.token == )
        if(response.data.username === self.username){
          localStorage.setItem("token", response.data.token)
          window.location.href = 'todos.html'
        }
      })
      .catch(err=>{
        console.log(err);
      })
    },
    getRegister () {
      var self = this.register
      axios.post(`http://localhost:3000/register`,{
        username : self.username,
        password : self.password
      })
      .then(response=>{
        console.log(response)
      })
      .catch(err=>{
        console.log(err);
      })
    },
    validate () {

    },
    getlist () {
      var self = this
      // console.log(config);
      axios.get(`http://localhost:3000/todos`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response=>{
        console.log(response.data);
        self.showlist = response.data
      })
      .catch(err=>{
        console.log(err);
      })
    },
    doAdd () {
      var self = this
      axios.post(`http://localhost:3000/todos/`, {
        kegiatan: self.addlist.kegiatan,
        deskripsi: self.addlist.deskripsi
      },{
        headers :{
          token : localStorage.getItem('token')
        }
      })
      .then(response=>{
        console.log(response.data);
        self.showlist.push(response.data)
      })
    },
    doRemove (_id, idx) {
      var self = this
      axios.delete(`http://localhost:3000/todos/${_id}`,{
        headers :{
          token : localStorage.getItem('token')
        }
      })
      .then(response=>{
        self.showlist.splice(idx, 1)
      })
      .catch(err=>{
        console.log(err);
      })
    },
    doEdit (_id, index) {
      // if (this.selected=="done") {
      let status = ''
      if (this.showlist[index].status=='done') {
        status = 'pending'
      } else {
        status = 'done'
      }

        var self = this
        axios.put(`http://localhost:3000/todos/${_id}`, {
          status: status
        }, {
          headers :{
            token : localStorage.getItem('token')
          }
        })
        .then(response=>{
          console.log(response);
          this.showlist[index].status = status
        })
        .catch(err=>{
          console.log(err);
        })
      }
    // }
  },
  mounted () {
    if (localStorage.getItem('token') == null && window.location.pathname == 'todos.html') {
      this.getLogin()
    } else {
      this.getlist()
    }
  }
})
