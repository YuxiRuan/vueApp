let Nav=Vue.component('Navs',{
    template:`<ul class="nav">
              <router-link tag="li" to="/" exact>首页</router-link>
        <router-link tag="li" :to="item.url" v-for="item in menuData" key="">
            <span>{{item.title}}</span>
        </router-link>
         <router-link to="/login" v-if="!islogin">登录</router-link>
       <span v-if="islogin" class="info" @click="show">
       {{name}}
            <span  class="logout" v-show="isshow" @click="logout">退出</span>
       </span>
</ul>`,
    data(){
        return{
            menuData:[
                {title:'公司简介',url:'/Info'},
                {title:'文档',url:'/Doc'},
            ],
            islogin:false,
            name:"",
            isshow:false
        }
    },
    created(){
        this.name=this.get("login","name");
        this.islogin=this.get("login","name");
    },
    methods:{
        show(){
            this.isshow=!this.isshow
        },
        logout(){
            this.del("login");
            router.push("/")
        }
    }
})
let index=Vue.component('index',{
    template:`<div>
    <img src="img/1.jpg" alt="" class="banner" width="320">
</div>`
})
let Info=Vue.component('Info',{
    template:`
    <div class="list">
        <ul class="mui-table-view">
    <li class="mui-table-view-cell mui-media">
      <router-link to="/Info/1">
            <div class="mui-media-body">
                幸福
                <p class='mui-ellipsis'>能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
            </div>
      </router-link>
    </li>
</ul>
    </div>`,
    beforeRouteEnter(to,from,next){
        next();
    },
    beforeRouteLeave(to,from,next){
        next();
    }
})
let Doc=Vue.component('Doc',{
    template:`<div class="doc">
    <router-view class="left"  name="left"></router-view>
    <router-view class="right" name="right"></router-view>
</div>`,
    beforeRouteEnter(to,from,next){

        next(function(vm){
            if(!vm.get("login","name")){
                router.push("/login");
            }
        })
    }
})
let List=Vue.component('List',{
    template:`
        <div>
          <transition mode="out-in" name="fade">
        <router-view></router-view>
         </transition>
</div>
    `
})
let leftC=Vue.component('leftC',{
    template:`<ul>
        <li>
        <router-link to="#one" tag="div" exact>1111</router-link>
         <router-link to="#two" tag="div">2222</router-link>
         <router-link to="#three" tag="div">3333</router-link>

        </li>
</ul>`,
    watch: {
        $route() {
            let hash = this.$route.hash.slice(1)
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }
            new TWEEN.Tween({ num:document.querySelector('.right').scrollTop })
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({num:document.querySelector('#'+hash).offsetTop  }, 500)
                .onUpdate(function () {
                    document.querySelector('.right').scrollTop=this.num.toFixed(0)
                })
                .start()
            animate()
        }
    }
})
let rightC=Vue.component('rightC',{
    template:`<div>
            <div id="one">
                 11212<br>
                 11212<br>
                 11212<br>
                 11212<br>
            </div>
            <div id="two">
                 11212<br>
                 11212<br>
                 11212<br>
                 11212<br>
            </div>
            <div id="three">
                 11212<br>
                 11212<br>
                 11212<br>
                 11212<br>
            </div>
 
</div>`
})

let detail=Vue.component('detail',{
    template:`<div>
           <h1>{{data[$route.params.id-1].title}}</h1>
    </div>`,
    data(){
        return{
            data:[
            {title:'标题',con:'5555'}
        ]
        }
    }
})
let Login=Vue.component("Login",{
    template:`
<div class="login">
<header class="mui-bar mui-bar-nav">
     <a class="mui-icon mui-icon-undo" @click="back"></a>
			<h1 class="mui-title">登录</h1>
</header>
<div class="mui-content">
			<form id='login-form' class="mui-input-group">
				<div class="mui-input-row">
					<label>账号</label>
					<input id='name' type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
				</div>
			</form>
			<div class="mui-content-padded">
				<button id='login' class="mui-btn mui-btn-block mui-btn-primary" @click="submit">登录</button>
			</div>
			<div class="mui-content-padded oauth-area">
			</div>
		</div></div>`,
    methods:{
        back(){
            router.push("/");
        },
        submit(){
            var obj={"name":document.querySelector("#name").value}
            this.save("login",obj);
            router.push("/doc")
        }
    }
})
