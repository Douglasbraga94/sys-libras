(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{K6T5:function(e,t,n){"use strict";n.r(t),n.d(t,"DashboardModule",function(){return h});var i=n("tR1z"),o=n("aceb"),r=n("ofXK"),s=n("tyNb"),a=n("XNiG"),l=n("1G5W"),b=n("fXoL"),c=n("on2l");const u=[{path:"",component:(()=>{class e{constructor(e,t,n,i){this.menuService=e,this.sidebarservice=t,this.usuarioService=n,this.router=i,this.destroy$=new a.a}ngOndestroy(){this.destroy$.next(),this.destroy$.complete()}ngOnInit(){this.criaMenu(),this.menuService.onItemClick().pipe(Object(l.a)(this.destroy$)).subscribe(e=>{"Sair"==e.item.title&&this.logout()})}criaMenu(){this.itens=[{title:"Dashboard",icon:"bar-chart-outline",link:"home"},{title:"Regionais",icon:"home",link:"regional"},{title:"Int\xe9rpretes",icon:"people",link:"interpretes"},{title:"Sair",icon:"person-remove-outline",link:""}]}toogle(){this.sidebarservice.toggle(!0,"menu-main")}logout(){this.usuarioService.signOut().then(e=>{e.error||(localStorage.removeItem("@sys-libras:user"),this.router.navigate(["/login"]))})}}return e.\u0275fac=function(t){return new(t||e)(b.Rb(o.p),b.Rb(o.s),b.Rb(c.a),b.Rb(s.c))},e.\u0275cmp=b.Lb({type:e,selectors:[["app-dashboard"]],decls:15,vars:1,consts:[[1,"btn","btn-lg",3,"click"],[1,"fa","fa-bars"],[2,"text-align","left","padding-left","45vw"],["src","/assets/images/ccb_top.png",2,"height","15%","width","15%"],[2,"padding-left","130px"],[1,"btn","btn-lg"],[1,"fa","fa-cog"],["tag","menu-main","state","expanded"],["src","/assets/images/libras2.png",1,"rounded","img-fluid"],["tag","menu",3,"items"]],template:function(e,t){1&e&&(b.Xb(0,"nb-layout"),b.Xb(1,"nb-layout-header"),b.Xb(2,"button",0),b.ec("click",function(){return t.toogle()}),b.Sb(3,"i",1),b.Wb(),b.Xb(4,"div",2),b.Sb(5,"img",3),b.Wb(),b.Xb(6,"div",4),b.Xb(7,"button",5),b.Sb(8,"i",6),b.Wb(),b.Wb(),b.Wb(),b.Xb(9,"nb-sidebar",7),b.Sb(10,"img",8),b.Sb(11,"nb-menu",9),b.Wb(),b.Xb(12,"nb-layout-column"),b.Sb(13,"router-outlet"),b.Wb(),b.Wb(),b.Dc(14,">\n")),2&e&&(b.Fb(11),b.mc("items",t.itens))},directives:[o.k,o.l,o.q,o.n,o.j,s.h],styles:[".sidebar-toogle[_ngcontent-%COMP%]{text-decoration:none;color:nb-theme(text-hint-color)}.sidebar-toogle[_ngcontent-%COMP%]   nb-icon[_ngcontent-%COMP%]{font-size:1.75rem}"]}),e})(),children:[{path:"interpretes",loadChildren:()=>Promise.all([n.e(1),n.e(6)]).then(n.bind(null,"Oltv")).then(e=>e.InterpretesModule)},{path:"regional",loadChildren:()=>Promise.all([n.e(1),n.e(7)]).then(n.bind(null,"CBnO")).then(e=>e.RegionalModule)}]}];let d=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=b.Pb({type:e}),e.\u0275inj=b.Ob({imports:[[s.g.forChild(u)],s.g]}),e})(),h=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=b.Pb({type:e}),e.\u0275inj=b.Ob({imports:[[r.c,d,o.m,o.r.forRoot(),o.o.forRoot(),i.a,o.i,o.a]]}),e})()}}]);