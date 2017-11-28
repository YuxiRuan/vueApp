const router = new VueRouter({
    linkActiveClass:'class',
    routes:[
        {path:'/',component:index},
        {path:'/Info',component:List,
            children:[
                {path:'',component:Info},
                {path:'/Info/:id',component:detail},
        ]},
        {path:'/Doc',component:Doc,
            children:[
                {path:'',components:{
                    left:leftC,right:rightC
                }}
            ]
        },
        {path:"*", redirect:"/"},
        {path:"/login", component:Login}
    ]
})