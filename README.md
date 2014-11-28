Tổng quan ngắn gọn về API 2D Canvas (Canvas 2D API). 

Các phương thức bối cảnh 2D của Canvas:

Phương thức	Mô tả

drawImage()	Vẽ tất cả hoặc một phần của một hình ảnh tại một vị trí cụ thể trong một canvas. Cũng có thể vẽ một canvas khác hoặc một khung hình từ một phần tử video.

save()	Lưu các thuộc tính bối cảnh vào một ngăn xếp.

restore()	Lấy các thuộc tính bối cảnh ra khỏi ngăn xếp và áp dụng chúng vào bối cảnh đó.

strokeRect()	Vẽ một hình chữ nhật rỗng.

fillRect()	Vẽ một hình chữ nhật đặc (được tô kín).

translate()	Chuyển dịch hệ tọa độ. Đây là một phương thức mạnh, có ích trong nhiều tình huống khác nhau.

Hàm drawRunner() chuyển ba đối số cho phương thức drawImage(): một hình ảnh và các tọa độ trái và tọa độ đỉnh để vẽ hình ảnh trong canvas ở đó. Tọa độ trái là một hằng số, trong khi tọa độ đỉnh được xác định bởi bậc thềm có nhân vật đang chạy ở trên đó.
Việc vẽ background theo cách tương tự .

Hàm drawBackground() vẽ background tại tọa độ (0,0) trong canvas.

Hình ảnh động trong HTML5
Về cơ bản, việc thực hiện hình ảnh động rất đơn giản: Bạn vẽ nhiều lần một chuỗi các hình ảnh để làm cho nó xuất hiện như thể các đối tượng đang hoạt động theo một cách nào đó. Điều đó có nghĩa là bạn phải thực hiện một vòng lặp để vẽ một hình ảnh theo định kỳ.

Theo truyền thống, các vòng lặp hình ảnh động đã được thực hiện trong JavaScript bằng setTimeout() hoặc bằng setInterval():

Thực hiện các hình ảnh động bằng setInterval()

<code>
setInterval( function (e) { // Don't do this for time-critical animations
   animate();               // A function that draws the current animation frame
}, 1000 / 60);              // Approximately 60 frames/second (fps)
</code>

Không bao giờ sử dụng setTimeout() hay setInterval() cho các hình ảnh động hạn chế thời gian.
setInterval chắc chắn sẽ tạo ra một hình ảnh động bằng cách liên tục gọi một hàm animate() để vẽ khung hình của hình ảnh động tiếp theo; tuy nhiên, bạn có thể không hài lòng với các kết quả đó, vì setInterval() và setTimeout() không biết gì về hình ảnh động. (Lưu ý: Bạn phải thực hiện hàm animate(); nó không phải là một phần của API Canvas).

Thiết lập khoảng thời gian 1000/60 mili giây, tương đương với khoảng 60 khung hình mỗi giây. Con số đó là ước tính tốt nhất về một tốc độ khung hình tối ưu và có thể nó không phải là một tốc độ rất tốt; tuy nhiên, vì setInterval() và setTimeout() không biết bất cứ điều gì về hình ảnh động, nên phải quy định tốc độ khung hình. Sẽ là tốt hơn nếu thay vào đó trình duyệt quy định tốc độ khung hình, vì chắc chắn nó biết tốt hơn  khi nào cần vẽ khung hình ảnh động tiếp theo.

Có một nhược điểm thậm chí còn nghiêm trọng hơn với việc sử dụng setTimeout và setInterval(). Mặc dù bạn chuyển cho các phương thức đó những khoảng thời gian tính bằng mili giây, nhưng các phương thức đó không làm chính xác đến milli giây. Trong thực tế, theo đặc tả của HTML, các phương thức này có thể kéo dài thoải mái thêm khoảng thời gian mà bạn quy định — vì nỗ lực để bảo tồn tài nguyên.
Để tránh những nhược điểm này, bạn không nên sử dụng setTimeout() và setInterval() cho các hình ảnh động hạn chế thời gian; thay vào đó, bạn nên sử dụng phương thức requestAnimationFrame().
requestAnimationFrame()

Trong đặc tả Kiểm soát định thời gian cho hình ảnh động dựa trên kịch bản lệnh (xem phần Tài nguyên), W3C định nghĩa một phương thức dựa trên đối tượng window có tên là requestAnimationFrame(). Không giống như setTimeout() hay setInterval(), phương thức requestAnimationFrame() đặc biệt được dành cho việc thực hiện hình ảnh động. Do đó, nó không bị một nhược điểm nào liên quan đến setTimeout() và setInterval(). Nó cũng dễ sử dụng:

Thực hiện hình ảnh động bằng requestAnimationFrame()

<code>
function animate(time) {           // Animation loop
   draw(time);                     // A function that draws the current animation frame
   requestAnimationFrame(animate); // Keep the animation going
};
</code>

requestAnimationFrame(animate);    // Start the animation
Bạn chuyển cho phương thức requestAnimationFrame() một tài liệu tham khảo đến một hàm gọi lại và khi trình duyệt đã sẵn sàng vẽ khung hình ảnh động tiếp theo, nó gọi hàm gọi lại này. Để duy trì hình ảnh động, hàm gọi lại cũng gọi phương thức requestAnimationFrame().

Như bạn có thể thấy, trình duyệt chuyển một tham số time tới hàm gọi lại của bạn. Bạn có thể tự hỏi rằng chính xác tham số time có nghĩa là gì. Đó có phải là thời điểm hiện tại không? Có phải là thời điểm mà lúc đó trình duyệt sẽ vẽ khung hình ảnh động tiếp theo không?

Thật đáng ngạc nhiên, không có định nghĩa nào về tham số time đó. Điều duy nhất mà bạn có thể tin chắc là đối với bất kỳ trình duyệt đã cho nào, tham số time luôn luôn chỉ biểu diễn thời gian mà thôi; do đó, bạn có thể sử dụng nó để tính toán thời gian trôi qua giữa các khung hình, như tôi minh họa trong Tính toán tốc độ hình ảnh động theo số khung hình mỗi giây (fps).

Một polyfill của requestAnimationFrame()
Trên nhiều phương diện, HTML5 là một thiên đường viễn tưởng của lập trình viên. Thoát khỏi các API độc quyền, các nhà phát triển sử dụng HTML5 để thực hiện các ứng dụng chạy trên nhiều nền tảng trong các trình duyệt phổ biến. Các đặc tả tiến bộ nhanh chóng, liên tục kết hợp với công nghệ mới và tinh chỉnh chức năng hiện có.

Các Polyfill:
Trong quá khứ, hầu hết các phần mềm nhiều nền tảng đã được thực hiện với mẫu thức chung nhỏ nhất. Các Polyfill thay đổi hoàn toàn khái niệm đó bằng cách cho phép bạn truy cập vào các tính năng nâng cao nếu chúng có sẵn và quay lại với bản thực hiện kém khả năng hơn khi cần.
Tuy nhiên, công nghệ mới thường đi vào đặc tả kỹ thuật theo cách của mình, thông qua các chức năng đặc trưng của trình duyệt hiện có. Các nhà cung cấp trình duyệt thường thêm phần tiền tố vào các chức năng như vậy để nó không can nhiễu với bản thực hiện của trình duyệt khác; ví dụ; phương thức requestAnimationFrame(), ban đầu đã được Mozilla thực hiện như mozRequestAnimationFrame(). Sau đó, WebKit đã thực hiện nó với tên là hàm webkitRequestAnimationFrame(). Cuối cùng, W3C đã tiêu chuẩn hóa nó thành requestAnimationFrame().
Các bản triển khai thực hiện có thêm tiền tố chỉ nhà cung cấp và sự hỗ trợ khác nhau cho việc thực hiện các tiêu chuẩn làm cho chức năng mới khó sử dụng, do đó, cộng đồng HTML5 đã phát minh ra một thứ được gọi là một polyfill. Các polyfill xác định mức hỗ trợ của trình duyệt cho một tính năng cụ thể và cung cấp cho bạn quyền truy cập trực tiếp nếu trình duyệt thực hiện nó hoặc một bản thực hiện tạm thời để bắt chước chức năng tiêu chuẩn đến mức tốt nhất có thể được.
Các polyfill sử dụng đơn giản, nhưng có thể phức tạp khi triển khai thực hiện. Việc thực hiện một polyfill dành cho requestAnimationFrame():

Polyfill của requestNextAnimationFrame()
// Reprinted from Core HTML5 Canvas

window.requestNextAnimationFrame =
   (function () {
      var originalWebkitRequestAnimationFrame = undefined,
          wrapper = undefined,
          callback = undefined,
          geckoVersion = 0,
          userAgent = navigator.userAgent,
          index = 0,
          self = this;

      // Workaround for Chrome 10 bug where Chrome
      // does not pass the time to the animation function
      
      if (window.webkitRequestAnimationFrame) {
         // Define the wrapper

         wrapper = function (time) {
           if (time === undefined) {
              time = +new Date();
           }
           self.callback(time);
         };

         // Make the switch
          
         originalWebkitRequestAnimationFrame = window.webkitRequestAnimationFrame;    

         window.webkitRequestAnimationFrame = function (callback, element) {
            self.callback = callback;

            // Browser calls the wrapper and wrapper calls the callback
            
            originalWebkitRequestAnimationFrame(wrapper, element);
         }
      }

      // Workaround for Gecko 2.0, which has a bug in
      // mozRequestAnimationFrame() that restricts animations
      // to 30-40 fps.

      if (window.mozRequestAnimationFrame) {
         // Check the Gecko version. Gecko is used by browsers
         // other than Firefox. Gecko 2.0 corresponds to
         // Firefox 4.0.
         
         index = userAgent.indexOf('rv:');

         if (userAgent.indexOf('Gecko') != -1) {
            geckoVersion = userAgent.substr(index + 3, 3);

            if (geckoVersion === '2.0') {
               // Forces the return statement to fall through
               // to the setTimeout() function.

               window.mozRequestAnimationFrame = undefined;
            }
         }
      }
      
      return window.requestAnimationFrame   ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         window.oRequestAnimationFrame      ||
         window.msRequestAnimationFrame     ||

         function (callback, element) {
            var start,
                finish;


            window.setTimeout( function () {
               start = +new Date();
               callback(start);
               finish = +new Date();

               self.timeout = 1000 / 60 - (finish - start);

            }, self.timeout);
         };
      }
   )
();

Polyfill: Định nghĩa

Từ polyfill là một từ ghép của hai từ polymorphism (đa hình) và backfill. Giống như đa hình, các polyfill chọn mã thích hợp trong thời gian chạy và chúng lấp lại chức năng còn thiếu.
Polyfill được thực hiện trong Liệt kê 6 gắn một hàm có tên là requestNextAnimationFrame() vào đối tượng window. Việc đưa Next vào tên hàm là để phân biệt nó với hàm requestAnimationFrame() cơ bản.
Hàm mà polyfill gán cho requestNextAnimationFrame() hoặc là requestAnimationFrame() nếu trình duyệt hỗ trợ nó hoặc là bản thực hiện có tên tiền tố chỉ nhà cung cấp. Nếu trình duyệt không hỗ trợ cả hai thứ đó, hàm này sẽ là một bản thực hiện tạm thời, sử dụng setTimeout() để bắt chước requestAnimationFrame() một cách tốt nhất có thể.
Gần như tất cả tính phức tạp của polyfill đều liên quan đến việc giải quyết hai lỗi và tạo thành mã trước câu lệnh return. Lỗi đầu tiên liên quan đến Chrome 10, đó là nó chuyển một giá trị undefined (không xác định) cho tham số time. Lỗi thứ hai liên quan đến Firefox 4.0, đó là nó hạn chế tốc độ khung hình ở 35-40 khung hình mỗi giây.
Mặc dù bản thực hiện polyfill của requestNextAnimationFrame() là thú vị, nhưng không cần thiết phải hiểu nó; thay vào đó, tất cả mọi thứ mà bạn cần biết là cách sử dụng nó.

Tham khảo: http://www.ibm.com/developerworks/library/.
