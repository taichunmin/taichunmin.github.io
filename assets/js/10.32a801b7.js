(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{195:function(t,e,s){},375:function(t,e,s){"use strict";s(195)},390:function(t,e,s){"use strict";s.r(e);var a=s(185),r=s.n(a);const c={LEGENDARY:0,EPIC:1,RARE:2,FREE:3,COMMON:4};var i={data:()=>({i:{deckstrings:"",cardCol:2,deckNo:1},db:null,ready:!1}),async mounted(){try{let t=JSON.parse(localStorage.getItem("WNNvKyd"));t&&this.$set(this,"i",{...this.i,...t})}catch(t){}this.$watch("i",(t,e)=>{localStorage.setItem("WNNvKyd",JSON.stringify(this.i))},{deep:!0}),this.db=await this.getHearthstoneDB(),this.ready=!0},watch:{deckName(t,e){t!==e&&(document.title=`${_.padStart(this.i.deckNo,2,"0")} ${t}`)}},computed:{deckstrings(){const t=_.split(this.i.deckstrings,"\n");return _.map(t,t=>{const[e,...s]=_.split(t," ");return{deck:e,name:s.join(" ")}})},deckNo(){return _.inRange(this.i.deckNo-1,this.deckstrings.length+1)?this.i.deckNo:1},deckstring(){return _.get(this,["deckstrings",this.deckNo-1,"deck"])},deckName(){return _.get(this,["deckstrings",this.deckNo-1,"name"])},deck(){return this.deckDecode(this.deckstring)},hero(){return _.hasIn(this,"deck.heroes.0")?_.get(this,["db",this.deck.heroes[0]]):null},cards(){return _.hasIn(this,"deck.cards")?_.sortBy(_.map(this.deck.cards,([t,e])=>({...this.db[t],num:e})),["cost","name"]):null},format(){return _.hasIn(this,"deck.format")?["","開放","標準"][this.deck.format]:null}},methods:{async getHearthstoneDB(){const t=await r.a.get("https://api.hearthstonejson.com/v1/latest/zhTW/cards.collectible.json"),e=_.map(_.get(t,"data",[]),t=>({..._.pick(t,["id","dbfId","name","cost"]),rarity:_.get(c,t.rarity,5)}));return _.mapKeys(e,t=>t.dbfId)},deckDecode(t){let e=function(t){for(var e,s,a,r=atob(t),c=[],i=r.length,n=0;n<i;){e=0,a=0;do{if(n>=i)throw new RangeError("無法解碼varint");a|=(127&(s=r.charCodeAt(n++)))<<e,e+=7}while(s>=128);c.push(a)}return c}(t),s=3,a=e[2],r=new Array(e[s++]);for(let t=0;t<r.length;t++)r[t]=e[s++];let c=[];for(let t=1;t<=3;t++)for(var i=0,n=e[s++];i<n;i++)c.push([e[s++],1===t||2===t?t:e[s++]]);return{format:a,heroes:r,cards:c}},copy(){const t=this.$refs.forcopy;console.log(t),t.select(),t.setSelectionRange(0,99999),document.execCommand("copy")}}},n=(s(375),s(8)),o=Object(n.a)(i,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.ready?s("div",{staticClass:"container"},[s("h1",{staticClass:"my-3 text-center"},[t._v("爐石讀取牌組代碼")]),s("div",{staticClass:"form-group"},t._l(3,(function(e){return s("div",{key:e,staticClass:"form-check form-check-inline"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.i.cardCol,expression:"i.cardCol"}],staticClass:"form-check-input",attrs:{type:"radio",name:"card-col",id:"card-col-"+e},domProps:{value:e,checked:t._q(t.i.cardCol,e)},on:{change:function(s){return t.$set(t.i,"cardCol",e)}}}),s("label",{staticClass:"form-check-label",attrs:{for:"card-col-"+e}},[t._v("顯示成 "+t._s(e)+" 列")])])})),0),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"deck-name"}},[t._v("牌組代碼 (每行一個牌組，代碼在前，名稱在後，以空格分隔)")]),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.i.deckstrings,expression:"i.deckstrings"}],staticClass:"text-monospace deckstrings form-control",domProps:{value:t.i.deckstrings},on:{input:function(e){e.target.composing||t.$set(t.i,"deckstrings",e.target.value)}}})]),s("div",{staticClass:"btn-group",attrs:{role:"group"}},t._l(t.deckstrings.length,(function(e){return s("button",{key:e,staticClass:"btn btn-outline-primary",class:{active:e===t.i.deckNo},attrs:{type:"button"},on:{click:function(s){t.i.deckNo=e}}},[t._v(t._s(e))])})),0),s("div",{staticClass:"row my-2",style:{"max-width":227*t.i.cardCol+30+"px",position:"relative"}},[s("div",{staticClass:"col-12"},t._l(t._.chunk(t.cards,Math.ceil(t.cards.length/t.i.cardCol)),(function(e){return s("div",{staticClass:"card-col"},t._l(e,(function(e){return s("div",{key:e.dbfId+"-"+e.num,staticClass:"card-tile",style:{"background-image":"linear-gradient(to left, rgba(0,0,0,0) 30%, rgba(0,0,0,1.0) 80%), url('https://art.hearthstonejson.com/v1/tiles/"+e.id+".jpg')"}},[s("div",{staticClass:"gem",class:"gem-"+e.rarity},[t._v(t._s(e.cost))]),s("div",{staticClass:"name"},[t._v(t._s(e.name))]),e.num>1?s("div",{staticClass:"count"},[t._v(t._s(e.num))]):t._e(),0===e.rarity?s("div",{staticClass:"count"},[t._v("★")]):t._e()])})),0)})),0),s("div",{staticClass:"col-12"},[s("div",{staticClass:"deck-name"},[t._v(t._s(t.deckName))])]),s("div",{staticClass:"screenshots"})]),s("textarea",{ref:"forcopy",staticClass:"form-control my-3",attrs:{readonly:""},domProps:{value:t.deckName+"\n"+t.deckstring},on:{click:t.copy}})]):t._e()}),[],!1,null,"43d7a127",null);e.default=o.exports}}]);