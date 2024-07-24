(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{8613:function(t,e,r){Promise.resolve().then(r.bind(r,4144))},4144:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return d}});var n=r(7437),a=r(2265),c=r(7813);r(5840);class s{constructor(t,e,r,n,a,c){this.id=t,this.label=e,this.duration=n-r,this.start=r,this.end=n,this.x=a,this.y=c}}class o{constructor(t,e,r){this.source=t,this.target=e,this.probability=r}}function i(t){let{states:e,links:r,width:s=800,height:o=400,setSeek:i,isRunning:u}=t,l=(0,a.useRef)(null),d=(0,a.useRef)(e[0]),h=(t,e,r,n)=>{let a=Math.atan2(n-e,r-t);return"M".concat(t," ").concat(e," Q").concat((t+r)/2+-50*Math.cos(a+Math.PI/2)," ").concat((e+n)/2+-50*Math.sin(a+Math.PI/2),", ").concat(r," ").concat(n)},p=(t,e)=>{let r=e>o/2?100:-100;return"M".concat(t," ").concat(e," C").concat(t+r," ").concat(e+r,", ").concat(t-r," ").concat(e+r,", ").concat(t," ").concat(e)},f=t=>{let n=r.filter(e=>e.source===t.id),a=Math.random(),c=0;for(let t=0;t<n.length;t++)if(a<(c+=n[t].probability))return e.find(e=>e.id===n[t].target);return t},k=(0,a.useRef)(null),x=()=>{var t;k.current&&clearTimeout(k.current);let r=null!==(t=f(d.current))&&void 0!==t?t:e[3];c.Ys("#node_".concat(d.current.id)).classed("current-node",!1),c.Ys("#node_".concat(r.id)).classed("current-node",!0),d.current=r,i(d.current.start),k.current=setTimeout(x,1e3*d.current.duration)};return(0,a.useEffect)(()=>{let t=c.Ys(l.current).attr("width",s).attr("height",o);t.append("defs").append("marker").attr("id","arrowhead").attr("viewBox","-0 -5 10 10").attr("refX",13).attr("refY",0).attr("orient","auto").attr("markerWidth",13).attr("markerHeight",13).attr("xoverflow","visible").append("svg:path").attr("d","M 0,-5 L 6,0 L 0,5").attr("fill","#999").style("stroke","none"),t.append("g").attr("class","edges").selectAll("path").data(r).enter().append("path").attr("class","edge").attr("marker-end","url(#arrowhead)").attr("d",t=>{let r=e.find(e=>e.id===t.source),n=e.find(e=>e.id===t.target);return r&&n?r.x===n.x&&r.y===n.y?p(r.x,r.y):h(r.x,r.y,n.x,n.y):""}),t.append("g").attr("class","edge-labels").selectAll("text").data(r).enter().append("text").attr("x",t=>{let r=e.find(e=>e.id===t.source),n=e.find(e=>e.id===t.target);return r&&n?(r.x+n.x)/2:0}).attr("y",t=>{let r=e.find(e=>e.id===t.source),n=e.find(e=>e.id===t.target);return r&&n?(r.y+n.y)/2:0}).text(t=>t.probability),t.append("g").attr("class","nodes").selectAll("circle").data(e).enter().append("circle").attr("id",t=>"node_".concat(t.id)).attr("class","node").attr("r",20).attr("cx",t=>t.x).attr("cy",t=>t.y).on("click",(t,e)=>{k.current&&clearTimeout(k.current),c.Ys("#node_".concat(d.current.id)).classed("current-node",!1),d.current=e,c.Ys("#node_".concat(d.current.id)).classed("current-node",!0),i(d.current.start),k.current=setTimeout(x,1e3*d.current.duration)}),t.append("g").attr("class","labels").selectAll("text").data(e).enter().append("text").attr("class","label").attr("x",t=>t.x).attr("y",t=>t.y).text(t=>t.label),c.Ys("#node_shi").classed("current-node",!0),k.current=setTimeout(x,1e3*d.current.duration)},[]),(0,a.useEffect)(()=>{u?setTimeout(x,1e3*d.current.duration):k.current&&clearTimeout(k.current)},[u]),(0,n.jsx)("svg",{ref:l})}var u=r(565);function l(){return(0,n.jsxs)("footer",{children:[(0,n.jsx)("a",{href:"https://github.com/nyraa/shikanoko-markov-chain",target:"_blank",children:"GitHub"}),(0,n.jsx)("br",{}),"Inspired by ",(0,n.jsx)("a",{href:"https://youtu.be/Xkq13ZthmA0",target:"_blank",children:"【マルコフ連鎖】Shikanoko but it's a Markov chain"})]})}function d(){let t=[new s("shi","し",.91,1,400,200),new s("ka","か",1,1.16,550,100),new s("no","の",1.16,1.33,700,200),new s("ko","こ",1.33,1.5,550,300),new s("ta","た",2.46,2.66,250,300),new s("n","ん",2.66,2.87,100,200),new s("empty","",3.08,3.5,250,100)],e=[new o("shi","ka",.5),new o("ka","no",1),new o("no","ko",1),new o("ko","no",.5),new o("ko","ko",.25),new o("ko","shi",.25),new o("shi","ta",.5),new o("ta","n",1),new o("n","ta",.5),new o("n","empty",.5),new o("empty","empty",.5),new o("empty","shi",.5)],r=(0,a.useRef)(null),[c,d]=(0,a.useState)(!1);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("h1",{children:"Shikanoko but it's a Markov chain"}),(0,n.jsx)(u.Z,{ref:r,videoId:"ZZvIVRQ4E7I",opts:{height:"360",width:"640",playerVars:{autoplay:0,controls:0}},onPlay:()=>{d(!0)},onPause:()=>{d(!1)},className:"player"}),(0,n.jsx)(i,{states:t,links:e,setSeek:t=>{r.current&&r.current.internalPlayer.seekTo(t)},isRunning:c}),(0,n.jsx)(l,{})]})}},5840:function(){}},function(t){t.O(0,[764,135,971,23,744],function(){return t(t.s=8613)}),_N_E=t.O()}]);