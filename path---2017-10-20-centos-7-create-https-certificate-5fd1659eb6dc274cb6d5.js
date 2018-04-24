webpackJsonp([87171799169522],{843:function(e,t){e.exports={data:{post:{id:"/Users/thanhchungbui/Desktop/thanhchungbtcblog/content/posts/2017-10-20-centos7-create-https-certificate/index.md absPath of file >>> MarkdownRemark",html:'<p>流れ</p>\n<blockquote>\n<ul>\n<li>\n<ol>\n<li>CSRを作成する</li>\n</ol>\n</li>\n<li>\n<ol start="2">\n<li>証明書発行</li>\n</ol>\n</li>\n<li>\n<ol start="3">\n<li>サーバー設定</li>\n</ol>\n</li>\n</ul>\n</blockquote>\n<h2>1. CSRを作成する</h2>\n<p>CSR(<code class="language-text">Certificate Signing Request</code>)は証明書申し込み書と呼べばいいのかな？\nCSRはCA(Certificate authority)へ送信され、証明書を要求する為の申請情報を持つものです。</p>\n<p>下記の情報は特に重要となります。</p>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">Common Name (eg, your name or your server&#39;s hostname)\ndomain name or server&#39;s public IP address</code></pre>\n      </div>\n<h3>1.1. Server Private Key(<code class="language-text">機密鍵</code>)発行</h3>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">openssl genrsa -out /path/to/.key 2048</code></pre>\n      </div>\n<h3>1.2. CSR Key発行 (Certificate Signing Request)</h3>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">openssl req -new -key /path/to/.key -out /path/to/.csr</code></pre>\n      </div>\n<h3>1.3. Private Keyからpassphraseを排除</h3>\n<p><code class="language-text">Passphrase</code>を有効にしてしまうとサーバー起動する毎回聞かれますので無効にするのをお勧めします。\n例えば、サーバー自動再起動したとき<code class="language-text">passphrase</code>を入力しないとサイトはアクセスできないとか。</p>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">cp server.key server.key.org\nopenssl rsa -in server.key.org -out server.key</code></pre>\n      </div>\n<h2>2. 証明書発行(SSL認証取得)</h2>\n<p>実際はCAから取得するが、テスト時自己署名証明書(<code class="language-text">self-signed certificate</code>)を作成することが多いです。</p>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt</code></pre>\n      </div>\n<p>1と2はまとめで下記のコマンドでまとめて実行も可能です。</p>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/apache-selfsigned.key -out /etc/ssl/certs/apache-selfsigned.crt\nreq: X509によりCSR作成\n-x509: self-signed認証発行する指示\n-nodes: passphraseを使用しない\n-days 365: 有効期限　（１年）\n-newkey rsa:2048 keyと認証書同時に発行。rsa key with 2048 bits long\n-keyout: private keyの作成場所\n-out: 認証書の置く場所</code></pre>\n      </div>\n<h2>3. サーバー設定</h2>\n<p>ここは<code class="language-text">Apache</code>を例として記載します。</p>\n<h3>3.1. 設定ファイル修正</h3>\n<p><code class="language-text">vim /etc/httpd/conf.d/ssl.conf</code></p>\n<p>下記の内容で修正</p>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">SSLProtocol\n-All +TLSv1 +TLSv1.1 +TLSv1.2\n\n# 証明書指定\nSSLCertificateFile\npath/to/.crt\n\n# 鍵ファイル指定\nSSLCertificateKeyFile\n/path/to/.key</code></pre>\n      </div>\n<h3>3.2. firewall 設定</h3>\n<p>ファイヤーウォールを有効したら<code class="language-text">https</code>を許可させないといけません。</p>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">firewall-cmd --add-service=https --permanent\nfirewall-cmd --reload</code></pre>\n      </div>',fields:{slug:"/2017-10-20-centos7-create-https-certificate/",prefix:""},frontmatter:{title:"Centos7上HTTPSサーバーを作ってみる",subTitle:"自己署名証明書でHTTPSサーバーを構築してみます。",cover:null}},author:{id:"/Users/thanhchungbui/Desktop/thanhchungbtcblog/content/parts/author.md absPath of file >>> MarkdownRemark",html:"<p>My name is <strong>Thanh Chung</strong>, a Web Developer. I love reactjs and javascript stacks but it’s really hard. English is not my first language but this blog is aimed to improve my writing skill.</p>"},footnote:{id:"/Users/thanhchungbui/Desktop/thanhchungbtcblog/content/parts/footnote.md absPath of file >>> MarkdownRemark",html:'<ul>\n<li>this blog is forked from   <a href="https://github.com/greglobinski/gatsby-starter-personal-blog">gatsby-starter-personal-blog-starter-kit</a></li>\n<li>built by <a href="https://www.greglobinski.com">greg lobinski</a></li>\n<li>with <a href="https://www.gatsbyjs.org/">Gatsby</a> &#x26; <a href="https://reactjs.org">React</a></li>\n</ul>'},site:{siteMetadata:{facebook:{appId:"238555440035867"}}}},pathContext:{slug:"/2017-10-20-centos7-create-https-certificate/"}}}});
//# sourceMappingURL=path---2017-10-20-centos-7-create-https-certificate-5fd1659eb6dc274cb6d5.js.map