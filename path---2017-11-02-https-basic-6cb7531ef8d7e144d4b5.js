webpackJsonp([90544300776276],{845:function(t,e){t.exports={data:{post:{id:"/Users/thanhchungbui/Desktop/thanhchungbtcblog/content/posts/2017-11-02-https-basic/index.md absPath of file >>> MarkdownRemark",html:'<p><img src="https://i.stack.imgur.com/WRNrD.png" alt="Https basic">\n↑の図の分析</p>\n<ol>\n<li>ブラウザは<code class="language-text">https://payment.com</code>に接続を成立する。</li>\n<li><code class="language-text">https://payment.com</code>のサーバーはブラウザに証明書を送る。この証明書は\n公開鍵\nアクセス中<code class="language-text">https://payment.com</code>が識別できるその他の情報</li>\n<li>ブラウザは<code class="language-text">https://payment.com</code>の証明書は有効であるものを確認する。</li>\n<li>ステップ３を通ったら、ブラウザは新しい鍵（Kと呼ばれる）を生成し、<code class="language-text">https://payment.com</code>の公開鍵を使って暗号化してから<code class="language-text">https://payment.com</code>に送信する</li>\n<li><code class="language-text">https://payment.com</code>は機密鍵で<code class="language-text">K</code>を複合化する</li>\n<li>ここからブラウザと<code class="language-text">https://payment.com</code>は<code class="language-text">K</code>でデータ通信をする。<code class="language-text">K</code>はブラウザと<code class="language-text">https://payment.com</code>しか知らないと保証される。</li>\n</ol>\n<h2>どうやってブラウザは証明書が有効であるか確認できるの？</h2>\n<p>証明書は下記の情報を持っている</p>\n<blockquote>\n<ul>\n<li>ドメイン</li>\n<li>所有者</li>\n<li>承認日</li>\n<li>有効期限</li>\n<li>公開鍵</li>\n</ul>\n</blockquote>',fields:{slug:"/2017-11-02-https-basic/",prefix:""},frontmatter:{title:"HTTPS基本編",subTitle:null,cover:null}},author:{id:"/Users/thanhchungbui/Desktop/thanhchungbtcblog/content/parts/author.md absPath of file >>> MarkdownRemark",html:"<p>My name is <strong>Thanh Chung</strong>, a Web Developer. I love reactjs and javascript stacks but it’s really hard. English is not my first language but this blog is aimed to improve my writing skill.</p>"},footnote:{id:"/Users/thanhchungbui/Desktop/thanhchungbtcblog/content/parts/footnote.md absPath of file >>> MarkdownRemark",html:'<ul>\n<li>this blog is forked from   <a href="https://github.com/greglobinski/gatsby-starter-personal-blog">gatsby-starter-personal-blog-starter-kit</a></li>\n<li>built by <a href="https://www.greglobinski.com">greg lobinski</a></li>\n<li>with <a href="https://www.gatsbyjs.org/">Gatsby</a> &#x26; <a href="https://reactjs.org">React</a></li>\n</ul>'},site:{siteMetadata:{facebook:{appId:"238555440035867"}}}},pathContext:{slug:"/2017-11-02-https-basic/"}}}});
//# sourceMappingURL=path---2017-11-02-https-basic-6cb7531ef8d7e144d4b5.js.map