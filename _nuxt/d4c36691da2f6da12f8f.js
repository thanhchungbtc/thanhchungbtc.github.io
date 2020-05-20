(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{342:function(e,n){const t={render:function(){this.$createElement;return this._self._c,this._m(0)},staticRenderFns:[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"frontmatter-markdown"},[t("h2",[e._v("流れ")]),e._v(" "),t("ul",[t("li",[t("ol",[t("li",[e._v("CSRを作成する")])])]),e._v(" "),t("li",[t("ol",{attrs:{start:"2"}},[t("li",[e._v("証明書発行")])])]),e._v(" "),t("li",[t("ol",{attrs:{start:"3"}},[t("li",[e._v("サーバー設定")])])])]),e._v(" "),t("h3",[e._v("1. CSRを作成する")]),e._v(" "),t("p",[e._v("CSR (Certificate Signing Request)は証明書発行依頼書と呼ばれ、CA(Certificate authority)へ提出するもの。\n作成時に以下の情報が重要出そうだ。")]),e._v(" "),t("ul",[t("li",[e._v("Common Name (eg, your name or your server's hostname)")]),e._v(" "),t("li",[e._v("Domain name or server's public IP address")])]),e._v(" "),t("h4",[e._v("1.1. Private Key(機密鍵)発行")]),e._v(" "),t("pre",{staticClass:"language-sh"},[t("code",{pre:!0,attrs:{class:"language-sh"}},[e._v("openssl genrsa -out /path/to/.key 2048\n")])]),e._v(" "),t("h4",[e._v("1.2. CSR発行 (Certificate Signing Request)")]),e._v(" "),t("pre",{staticClass:"language-shell"},[t("code",{pre:!0,attrs:{class:"language-shell"}},[e._v("openssl req -new -key /path/to/.key -out /path/to/.csr\n")])]),e._v(" "),t("h4",[e._v("1.3. Private Keyからpassphraseを排除（無効）")]),e._v(" "),t("p",[t("code",{pre:!0},[e._v("Passphrase")]),e._v("を有効にしていると、サーバー再起動した際、"),t("code",{pre:!0},[e._v("Private Key")]),e._v("を認証する為、"),t("code",{pre:!0},[e._v("Passphrase")]),e._v("が求められるので、入力完了するまで、\b"),t("code",{pre:!0},[e._v("Website")]),e._v("をアクセスできないことがある。")]),e._v(" "),t("pre",{staticClass:"language-sh"},[t("code",{pre:!0,attrs:{class:"language-sh"}},[e._v("cp server.key server.key.org\nopenssl rsa -in server.key.org -out server.key\n")])]),e._v(" "),t("h3",[e._v("2. 証明書取得")]),e._v(" "),t("p",[e._v("実際はCAに発行してもらうが、テスト時は自己署名証明書を使用する。\nこのテストのようの証明書は"),t("code",{pre:!0},[e._v("self-signed certificate")]),e._v("と呼ばれる。")]),e._v(" "),t("pre",{staticClass:"language-sh"},[t("code",{pre:!0,attrs:{class:"language-sh"}},[e._v("openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt\n")])]),e._v(" "),t("p",[t("strong",[e._v("👉"),t("code",{pre:!0},[e._v("self-signed certificate")]),e._v("を使用する場合、以下のコマンドでCSR発行せずに、直接証明書を生成することができる")])]),e._v(" "),t("pre",{staticClass:"language-sh"},[t("code",{pre:!0,attrs:{class:"language-sh"}},[e._v("sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/apache-selfsigned.key -out /etc/ssl/certs/apache-selfsigned.crt\n")])]),e._v(" "),t("ul",[t("li",[e._v("req: X509によりCSR作成")]),e._v(" "),t("li",[e._v("x509: "),t("code",{pre:!0},[e._v("self-signed")]),e._v("認証発行する指示")]),e._v(" "),t("li",[e._v("nodes: "),t("code",{pre:!0},[e._v("passphrase")]),e._v("を使用しない")]),e._v(" "),t("li",[e._v("days 365: 有効期限（１年）")]),e._v(" "),t("li",[e._v("newkey rsa:2048長ビットのkeyと証明書同時に発行。(rsa key with 2048 bits long)")]),e._v(" "),t("li",[e._v("keyout: private keyの作成場所")]),e._v(" "),t("li",[e._v("out: 証明書の置く場所")])]),e._v(" "),t("h3",[e._v("3. サーバー設定")]),e._v(" "),t("h4",[e._v("3.1. 設定ファイル修正")]),e._v(" "),t("p",[t("strong",[e._v("/etc/httpd/conf.d/ssl.conf")])]),e._v(" "),t("pre",{staticClass:"language-sh"},[t("code",{pre:!0,attrs:{class:"language-sh"}},[e._v("# プロトコル\nSSLProtocol -All +TLSv1 +TLSv1.1 +TLSv1.2\n\n# 証明書指\nSSLCertificateFile path/to/.crt\n\n# 鍵ファイル指定\nSSLCertificateKeyFile /path/to/.key\n")])]),e._v(" "),t("h4",[e._v("3.2. firewall 設定")]),e._v(" "),t("p",[t("code",{pre:!0},[e._v("https")]),e._v("アクセスを許可する")]),e._v(" "),t("pre",{staticClass:"language-sh"},[t("code",{pre:!0,attrs:{class:"language-sh"}},[e._v("firewall-cmd --add-service=https --permanent\nfirewall-cmd --reload\n")])])])}]};e.exports={attributes:{title:"Linuxにサーバーを構築してみる",description:"LinuxにApache上の自己証明HTTPSサーバー構築したメモです。",thumbnail:"posts/https.jpg",date:"2017-11-02T13:29:47.000Z",tags:["linux","apache","https"]},html:'<h2>流れ</h2>\n<ul>\n<li>\n<ol>\n<li>CSRを作成する</li>\n</ol>\n</li>\n<li>\n<ol start="2">\n<li>証明書発行</li>\n</ol>\n</li>\n<li>\n<ol start="3">\n<li>サーバー設定</li>\n</ol>\n</li>\n</ul>\n<h3>1. CSRを作成する</h3>\n<p>CSR (Certificate Signing Request)は証明書発行依頼書と呼ばれ、CA(Certificate authority)へ提出するもの。\n作成時に以下の情報が重要出そうだ。</p>\n<ul>\n<li>Common Name (eg, your name or your server\'s hostname)</li>\n<li>Domain name or server\'s public IP address</li>\n</ul>\n<h4>1.1. Private Key(機密鍵)発行</h4>\n<pre class="language-sh"><code class="language-sh">openssl genrsa -out /path/to/.key 2048\n</code></pre>\n<h4>1.2. CSR発行 (Certificate Signing Request)</h4>\n<pre class="language-shell"><code class="language-shell">openssl req -new -key /path/to/.key -out /path/to/.csr\n</code></pre>\n<h4>1.3. Private Keyからpassphraseを排除（無効）</h4>\n<p><code>Passphrase</code>を有効にしていると、サーバー再起動した際、<code>Private Key</code>を認証する為、<code>Passphrase</code>が求められるので、入力完了するまで、\b<code>Website</code>をアクセスできないことがある。</p>\n<pre class="language-sh"><code class="language-sh">cp server.key server.key.org\nopenssl rsa -in server.key.org -out server.key\n</code></pre>\n<h3>2. 証明書取得</h3>\n<p>実際はCAに発行してもらうが、テスト時は自己署名証明書を使用する。\nこのテストのようの証明書は<code>self-signed certificate</code>と呼ばれる。</p>\n<pre class="language-sh"><code class="language-sh">openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt\n</code></pre>\n<p><strong>👉<code>self-signed certificate</code>を使用する場合、以下のコマンドでCSR発行せずに、直接証明書を生成することができる</strong></p>\n<pre class="language-sh"><code class="language-sh">sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/apache-selfsigned.key -out /etc/ssl/certs/apache-selfsigned.crt\n</code></pre>\n<ul>\n<li>req: X509によりCSR作成</li>\n<li>x509: <code>self-signed</code>認証発行する指示</li>\n<li>nodes: <code>passphrase</code>を使用しない</li>\n<li>days 365: 有効期限（１年）</li>\n<li>newkey rsa:2048長ビットのkeyと証明書同時に発行。(rsa key with 2048 bits long)</li>\n<li>keyout: private keyの作成場所</li>\n<li>out: 証明書の置く場所</li>\n</ul>\n<h3>3. サーバー設定</h3>\n<h4>3.1. 設定ファイル修正</h4>\n<p><strong>/etc/httpd/conf.d/ssl.conf</strong></p>\n<pre class="language-sh"><code class="language-sh"># プロトコル\nSSLProtocol -All +TLSv1 +TLSv1.1 +TLSv1.2\n\n# 証明書指\nSSLCertificateFile path/to/.crt\n\n# 鍵ファイル指定\nSSLCertificateKeyFile /path/to/.key\n</code></pre>\n<h4>3.2. firewall 設定</h4>\n<p><code>https</code>アクセスを許可する</p>\n<pre class="language-sh"><code class="language-sh">firewall-cmd --add-service=https --permanent\nfirewall-cmd --reload\n</code></pre>\n',meta:{resourcePath:"/Volumes/Data/github.com/thanhchungbtc/myblog/content/centos-apache-https-server/index.md"},vue:{component:{data:function(){return{templateRender:null}},render:function(e){return this.templateRender?this.templateRender():e("div","Rendering")},created:function(){this.templateRender=t.render,this.$options.staticRenderFns=t.staticRenderFns}}}}}}]);