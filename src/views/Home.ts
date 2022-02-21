import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import ApiClient from '@/http/ApiClient'
const { ipcRenderer } = require('electron')

@Options({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  ajaxText:String=''
  fetchAjax () {
    ApiClient.server().get('/api/ajax.php', {})
      .then(res => {
      //   debugger
      //   return res.data
      this.ajaxText=res.data;
      })
  }
  sendPostMessage(){
    ipcRenderer.send('request-worker-channel');
  }
}