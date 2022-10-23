---
title: "Https Basic Memo"
date: 2017-10-20T23:08:38+09:00
thumbnail: ./thumbnail.png
tags: ["https"]
categories: ['programing']

---

![Image](https://i.stack.imgur.com/WRNrD.png)
Source: [Source: StackOverFlow](https://stackoverflow.com/questions/470523/how-does-ssl-really-work)

## 日本語

1. ブラウザは`https://payment.com`に接続を成立する。
2. `https://payment.com`のサーバーはブラウザに証明書を送る。この証明書は公開鍵が含まれる。
3. ブラウザは`https://payment.com`の証明書は有効であるものを確認する。※
4. ステップ３を通過したら、ブラウザは新しい鍵（`K`と呼ばれる）を生成し、`https://payment.com`の公開鍵を使って暗号化してから`https://payment.com`に送信する
5. `https://payment.com`は機密鍵で`K`を複合化する
6. ここからブラウザとサーバは`K`でデータ通信を行う。

## Tiếng Việt.

1. Browser sẽ truy cập 1 trang web https. Ở đây là https://payment.com
2. Server hay Load Balancer (LB) của payment.com sẽ trả về certificate để chứng thực rằng website user đang truy cập là
   website chính thức. Trong certificate là một public key PK, dùng để mã hóa K ở bước 4.
3. Browser sẽ kiểm chứng certificate (bằng cách chạy thuật toán kiểm tra chữ ký). Quá trình này giúp browser xác
   định https://payment.com là thật hay giả.
4. Sau khi kiểm chứng được certificate, browser sẽ tự sinh ra 1 khóa K. Khóa K sẽ được dùng để mã hóa tất cả các liên
   lạc giữa browser và payment.com sau này. Do quá trình mã hóa các gói tin dùng mã đối xứng, khóa K cần được gửi trở
   lại payment.com vì nếu không có K, server (LB) không thể nào giải mã được gói tin.
5. Khóa K được gửi trả lại cho payment.com. Phía payment.com sẽ dùng private key (được bảo vệ) để giải mã gói tin này và
   qua đó có được thông tin về K.
6. payment.com và browser dùng khóa K để mã hóa toàn bộ dữ liệu liên lạc sau này.

Certificate là một khối dữ liệu bao gồm rất nhiều thông tin về payment.com. Các thông tin này bao gồm:

- Tên domain
- Tên công ty sở hữu
- Thời gian certificate được cấp
- Thời hạn certificate
- Public key PK

### Làm thế nào browser kiểm chứng được certificate ở bước 3

Bất cứ người nào đứng giữa browser và payment.com đều có thể làm giả certificate và public key. Bằng cách làm giả
certificate, người đứng giữa có thể giả dạng payment.com. Bằng cách giả public key, người đứng giữa có thể dùng khóa
private của mình để xem thông tin truyển tải giữa 2 bên. Vậy làm thế nào để ngăn chặn cách tấn công này. Cách giải quyết
là: CA (Certificate Authority).

#### CA là gì? Làm gì?

Trong thực tế, để chứng minh một ai đó trình độ đại học, trường đại học nơi người đó học sẽ cấp cho họ một tấm bằng. Do
tấm bằng đó có thể bị làm giả, ta cần một đơn vị chứng minh đó là bằng thật. CA chính là người chứng minh certificate mà
payment.com cung cấp là thật! CA bán dịch vụ chứng thực đó bằng cách ký chứng minh rằng certificate của payment.com là
thật

Certificate chứng thực cho payment.com sẽ được CA ký bằng khóa bí mật của CA. Khóa này chỉ có CA biết và do vậy việc chữ
ký là an toàn. payment.com sẽ gửi cho user certificate đã được ký bởi CA cùng với khóa công khai PK2 của khóa bí mật CA
dùng để ký certificate. Browser sẽ tiến hành kiểm tra certificate này như bình thường dùng khóa công khai PK2 của CA.

Đến đây vấn đề chưa thực sự được giải quyết vì, khóa công khai của CA cũng hoàn toàn có thể bị làm giả và do vậy
certificate hoàn toàn có thể là giả! Giống như thực tế người chứng minh cho tấm bằng đại học cũng có thể bị làm giả. Để
chắc chắn việc này, ta có thể ký chứng thực certificate do CA ký là thật. Cách làm có thể hoàn toàn tương tự là dùng
khóa bí mật nào đó và ký tiếp và đính kèm khóa công khai PK3 với certificate sau khi được ký. Cứ thế ta có một dãy các
certificate và khóa công khai mà certificate sau chứng thực cho certificate trước. Do bản chất đệ quy, ta cần điểm dừng
là một certificate mà ta hoàn toàn tin tưởng. Đến đây ta có khái niệm root certificate.

#### Root certificate

Root certificate là certificate mà ta hoàn toàn tin tưởng. Khi có certificate này, ta có thể tin tưởng những certificate
mà được chứng thực bởi certificate này là hoàn toàn hợp lệ (giống trong thực tế là cơ quan công chứng!). Mỗi OS và
browser có một danh sách các certificate mà OS và browser đó tin tưởng.

Firefox tin tưởng các certificate có danh sách tại: https://wiki.mozilla.org/CA:IncludedCAs
RHEL có danh sách các certificate tin tưởng tại: /etc/pki/tls/certs/

Do root certificate là certificate cuối cùng dùng để chứng thực các certificate trong chuỗi, khóa bí mật của certificate
này cần được bảo vệ nghiêm ngặt. Bất cứ công ty cung cấp dịch vụ CA nào bị tấn công và bị mất khóa bí mật của root
certificate đều rất nguy hiểm, bởi vì hackers có thể dùng khóa đó để ký certificate ở bước cuối cùng. Do browser và OS
tin tưởng certificate này nên tất cả certificate, không nhất thiết do CA bị hack cung cấp, đều có thể bị làm giả. Các CA
do vậy dùng rất nhiều công sức để bảo vệ thật kín đáo khóa bí mật này. Kinh doanh chứng thực CA là kinh doanh về mặt
lòng tin, CA hứa sẽ đảm bảo tốt nhất khóa bí mật của họ và ta trả tiền để họ dùng khóa bí mật của họ ký.

Theo đồn đại của giang hồ, verisign dùng cửa lock dày và các tay súng chuyên nghiệp cùng hệ thống truy cập phức tạp để
bảo vệ khóa bí mật này.

#### Xem certificate chain trong thực tế

Đến đây ta chắc đã hiểu phần nào về cơ chế chứng thực cũng như cách hoạt động của HTTPS. Ta sẽ cùng xem chuỗi
certificate trong thực tế.

Facebook certificate được ký bởi DigiCert High Assurance CA-3. Bản thân CA-3 được chứng thực bởi EV RootCA.

#### Các vấn đề liên quan đến https / certificate

Nguyên tắc hoạt động là như vậy, trong thực tế để duy trì và vận hành một hệ thống https cần tốn khá nhiều công sức.
Dưới đây là một số case-studies mình gặp trong quá trình vận hành một website. Qua một số case-studies này hy vọng bạn
sẽ hiểu tầm quan trọng của mỗi sự kiện và ý nghĩa của nó.

##### Heartbleed

Sự kiện heartbleed là sự kiện đình đám của năm 2014. Heartbleed là lỗi bảo mật nằm trong bộ thư viện OpenSSL, bộ thư
viện chủ đạo xử lý mã hóa trên Linux. Các webserver đều được build sử dụng OpenSSL nếu muốn phục vụ https.

Heartbleed xảy ra khi openssl không kiểm tra độ dài trả về của một chuỗi ký tự và vô tình trả về thông tin nằm sau chuỗi
ký tự này trên bộ nhớ. Vô tình phần bộ nhớ này bao gồm khóa bí mật được dùng để ký certificate ban đầu. Bằng cách hỏi
máy chủ cho xem chìa khóa bí mật này, hacker có thể dùng nó để giải mã khóa mã hóa liên lạc ở bước 5 và do đó đọc được
toàn bộ nội dung của phiên liên lạc.

Heartbleed nguy hiểm bởi việc tấn công này hoàn toàn không để lại dấu vết.

Các công ty cung cấp dịch vụ qua https đã phải xử lý vấn đề này bao gồm các bước sau:

- Nâng cấp phiên bản openssl
- Khởi động lại máy chủ web (apache, nginx)
- Tạo một khóa bí mật mới, certificate mới và yêu cầu CAs ký lại

##### Diginostar

Diginostar là hãng CAs của Hà Lan bị hacker tấn công và lấy được khóa bí mật. Từ đó tất cả các root certificate của
Diginostar đều bị xóa bỏ khỏi browser, do lo sợ hacker sẽ dùng khóa bí mật này làm giả certificate. Điều này dẫn đến sự
phá sản của CA.

Qua đấy mới thấy việc bảo vệ khóa bí mật an toàn là vấn đề sống còn của các CAs.

##### Superfish

Hãng máy tính Lenovo khi bán máy tính đã cài thêm một phần mềm hiển thị quảng cáo đến người dùng. Khi người dùng lướt
net, phần mềm này sẽ tự thêm một quảng cáo nhỏ trên browser. Để có thể thêm quảng cáo vào bất cứ chỗ nào, phần mềm này
tự ý cài một root certificate vào máy lenovo bán đi. Root certificate này lại là một certificate tự ký, bất cứ ai có máy
lenovo đều có thể có được khóa bí mật ký certificate này. Điều này vô tình biến tất cả người dùng máy lenovo thành đối
tượng bị làm giả certificate. Tất cả các liên lạc https đều có thể bị làm giả, do vậy việc làm này đã tạo ra một lỗi bảo
mật rất nghiêm trọng.

Hãng Lenovo sau đó đã phải xin lỗi người dùng và đưa ra phần mềm gỡ bỏ tool này.

http://support.lenovo.com/vn/vi/product_security/superfish_uninstall

##### OS quá cũ

Các root certificate đi kèm với máy chủ không phải có thời hạn mãi mãi mà được làm mới qua mỗi lần release một phiên bản
của OS. Do vậy việc update OS thường xuyên là điều nên làm. Tuy vậy đối với các máy chủ làm việc bận rộn, việc nâng cấp
nhiều khi là điều khó khăn. Từ đây nảy sinh một vấn đề như sau.

Máy chủ thỉnh thoảng hay phải gọi các https thông qua curl, ví dụ gọi twitter api qua https, hay gọi một dịch thanh toán
nào đó qua Https. Giống như browser, curl dùng root certificate đi kèm để chứng thực các certificate phía dịch vụ gửi
về. Tuy vậy khi root certificate hết hạn, việc chứng thực này sẽ thất bại, kéo theo việc app của bạn sẽ không chạy đúng
nữa. Những lúc này việc update root certificate là việc cần phải làm.

### Kết luận

Bài viết trình bày khái quát nguyên tắc hoạt động của https cũng như các vấn đề xoay quanh liên lạc dùng https. Hy vọng
qua bài viết bạn hiểu rõ hơn về https cũng như lý giải được tầm nghiêm trọng của những vấn đề và sự kiện xoay quanh
https.

Bài này chủ yếu tham khảo và dịch lại 1 chút
từ **[Nguồn Kipalog](https://kipalog.com/posts/https-hoat-dong-nhu-the-nao)**
