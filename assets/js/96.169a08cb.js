(window.webpackJsonp=window.webpackJsonp||[]).push([[96],{476:function(s,t,a){"use strict";a.r(t);var e=a(8),n=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"node-docker-de-shi-yong-fang-fa"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#node-docker-de-shi-yong-fang-fa"}},[s._v("#")]),s._v(" Node Docker 的使用方法")]),s._v(" "),a("h2",{attrs:{id:"node-docker-guan-fang-jiao-xue"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#node-docker-guan-fang-jiao-xue"}},[s._v("#")]),s._v(" Node Docker 官方教學")]),s._v(" "),a("p",[a("a",{attrs:{href:"https://hub.docker.com/_/node/",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://hub.docker.com/_/node/"),a("OutboundLink")],1)]),s._v(" "),a("h3",{attrs:{id:"docker-compose-fang-fa"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#docker-compose-fang-fa"}},[s._v("#")]),s._v(" docker-compose 方法")]),s._v(" "),a("ul",[a("li",[s._v("於專案目錄建立一個 "),a("code",[s._v("docker-compose.yml")])])]),s._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("version")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"2"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("services")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("node")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"node:8"')]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("environment")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" NODE_ENV=production\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("volumes")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" ./"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("/usr/src/app\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("expose")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"3000"')]),s._v("\n")])])]),a("ul",[a("li",[s._v("使用以下指令使用虛擬機")])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# start")]),s._v("\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" up -d\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# stop")]),s._v("\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" down\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# list status")]),s._v("\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ps")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# show logs")]),s._v("\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" logs\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# enter terminal")]),s._v("\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("exec")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("node")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("bash")]),s._v("\n")])])]),a("h4",{attrs:{id:"da-pei-express-4-shi-yong"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#da-pei-express-4-shi-yong"}},[s._v("#")]),s._v(" 搭配 express 4 使用")]),s._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("version")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"2"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("services")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("node")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"node:latest"')]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("environment")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" DEBUG=app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("*\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("volumes")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" ./"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("/usr/src/app\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("expose")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"3000"')]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("ports")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"3000:3000"')]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("init")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean important"}},[s._v("true")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("command")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" bash "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v('c "cd /usr/src/app '),a("span",{pre:!0,attrs:{class:"token important"}},[s._v("&&")]),s._v(' npm start"\n')])])]),a("h3",{attrs:{id:"shi-yong-dockerfile-zhi-ling"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#shi-yong-dockerfile-zhi-ling"}},[s._v("#")]),s._v(" 使用 Dockerfile + 指令")]),s._v(" "),a("ul",[a("li",[s._v("撰寫 "),a("code",[s._v("Dockerfile")])])]),s._v(" "),a("div",{staticClass:"language-docker extra-class"},[a("pre",{pre:!0,attrs:{class:"language-docker"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# specify the node base image with your desired version node:<version>")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token instruction"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FROM")]),s._v(" node:6")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# replace this with your application's default port")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token instruction"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("EXPOSE")]),s._v(" 3000")]),s._v("\n")])])]),a("ul",[a("li",[s._v("使用以下指令來 build 和執行")])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# build")]),s._v("\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" build -t my-nodejs-app "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# run")]),s._v("\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" run -it --rm --name my-running-app my-nodejs-app "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("bash")]),s._v(" -c "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"cd /usr/src/app && npm start"')]),s._v("\n")])])]),a("h3",{attrs:{id:"best-practices-zui-jia-zuo-fa"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#best-practices-zui-jia-zuo-fa"}},[s._v("#")]),s._v(" Best Practices 最佳做法")]),s._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md"),a("OutboundLink")],1)]),s._v(" "),a("h3",{attrs:{id:"docker-bench-security"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#docker-bench-security"}},[s._v("#")]),s._v(" docker-bench-security")]),s._v(" "),a("p",[s._v("Docker Bench for Security 是一個用來檢查在正式環境中，部署容器的幾十個常見最佳做法的腳本。")]),s._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/docker/docker-bench-security",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://github.com/docker/docker-bench-security"),a("OutboundLink")],1)])])}),[],!1,null,null,null);t.default=n.exports}}]);