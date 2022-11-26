<template>

    <footer class="page">
        <aside class="l"></aside>

        <div class="bg-white footer-container">
            <div class="bg-orage display-flex dang-ky-ban-tin">
                <div>
                    <i class="far fa-envelope"></i>  ĐĂNG KÝ NHẬN BẢN TIN
                </div>
                <form class="display-flex bg-white radius">
                    <input type="email" placeholder="Nhập địa chỉ email của bạn">
                    <button class="radius">Đăng ký</button>
                </form>
            </div>

            <div class="display-flex space-between footer">

                <div class="footer-info">
                    <p class="can_deu">
                    <h2>Công ty cổ phần sách Bookworm</h2>
                    </p>
                    <p class="can_deu">Địa chỉ: Khu 2 Đại học Cần Thơ, đường 3/2, Ninh Kiều, Cần Thơ</p>
                    <p class="can_deu">Bookworm.com nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ trợ đặt mua
                        và nhận hàng trực tiếp tại văn phòng cũng như tất cả Hệ Thống Bookworm trên toàn quốc.</p>
                    <div>
                        <a href=""><img id="logo-bo-cong-thuong" src="/img/footer/logo-bo-cong-thuong-da-thong-bao1.png"
                                alt=""></a>
                    </div>
                    <div class="footer-info-social">
                        <a href="#"><i class="fa-brands fa-facebook"></i></a>
                        <a href="#"><i class="fa-brands fa-instagram"></i></a>
                        <a href="#"><i class="fa-brands fa-youtube"></i></a>
                        <a href="#"><i class="fa-brands fa-twitter"></i></a>
                        <a href="#"><i class="fa-brands fa-pinterest"></i></a>
                    </div>
                    <div class="footer-info-app">
                        <a href="#"><img src="/img/footer/android-app.png" alt=""></a>
                        <a href="#"><img src="/img/footer/appstore1-app.png" alt=""></a>
                    </div>
                </div>
                <div>
                    <div class="flex-grow-1 display-flex space-between footer-polocy">
                        <div>
                            <h2>DỊCH VỤ</h2>
                            <p><a href="#">Điều khoản sử dụng</a></p>
                            <p><a href="#">Chính sách bảo mật</a></p>
                            <p><a href="#">Giới thiệu về chúng tôi</a></p>
                            <p><a href="#">Hệ thống trung tâm - nhà sách</a></p>
                        </div>
                        <div>
                            <h2>HỖ TRỢ</h2>
                            <p><a href="#">Chính sách đổi - trả - hoàn tiền</a></p>
                            <p><a href="#">Chính sách khách sỉ</a></p>
                            <p><a href="#">Phương thức vận chuyển</a></p>
                            <p><a href="#">Phương thức thanh toán và xuất HĐ</a></p>
                        </div>
                        <div>
                            <h2>TÀI KHOẢN CỦA TÔI</h2>
                            <p><a href="#">Đăng nhập/Tạo mới tài khoản</a></p>
                            <p><a href="#">Thay đổi địa chỉ khách hàng</a></p>
                            <p><a href="#">Chi tiết tài khoản</a></p>
                            <p><a href="#">Lịch sử mua hàng</a></p>
                        </div>
                    </div>

                    <div class="container-footer-contact">
                        <h2>LIÊN HỆ</h2>
                        <div class="display-flex footer-contact space-between">
                            <div><i class="fa-solid fa-location-dot"></i><span> Khu 2 DHCT 3/2 Ninh Kieu Can Tho</span>
                            </div>
                            <div><i class="fa-solid fa-envelope"></i><span> cskh@gmail.com</span></div>
                            <div><i class="fa-solid fa-phone"></i><span> 1900 0000</span></div>
                        </div>
                        <br />
                        <p> &copy; Được thiết kế bởi Trần Văn Sáng B2003855</p>
                    </div>

                </div>
            </div>
        </div>
        <aside class="r"></aside>
    </footer>
</template>

<style scoped>
.footer-container{
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    overflow: hidden;
}

.dang-ky-ban-tin {
    align-items: center;
    height: 4rem;
    padding-left: 20rem;
}

.dang-ky-ban-tin div, .fa-envelope{
    font-size: 1.6rem;
    margin-right: 0.5rem;
}

form{
    height: 2.6rem;
    margin-right: 20rem;
    border: 1px solid rgb(231, 232, 233);
    padding: 0.2rem;
}

form input{
    border: none;
    min-width: 18rem;
}

form input:focus {
  outline: none;
}

form button{
    font-size: 1.1rem;
    width: 7rem;
    border: none;
    background-color: #0d6efd;
    color: white;
}

.footer {
    padding-left: 2.5rem;
    padding-bottom: 2.5rem;
    margin-top: 1.5rem;
}

.footer-info {
    max-width: 400px;
    border-right: 1px solid #ccc;
    margin-right: 1rem;
    padding-right: 0.5rem;
}

.footer-info div {
    text-align: left;
    margin-bottom: 3px;
}

.footer-info-social {
    justify-content: space-between;
}

#logo-bo-cong-thuong {
    width: 100px;
    margin-bottom: 1rem;
}

.footer-info-social>a {
    margin: 0px 2px;
}

.footer-info-social i {
    display: inline-block;
    font-size: 30px;
    color: rgb(92, 88, 88);
    width: calc(60%/5);
}

.footer-info-app img {
    width: 100px;
    margin: 10px 10px 0;
    margin-left: 0;
}

.footer-polocy {
    width: 900px;
    padding: 16px;
}

.footer-polocy>p {
    font-size: 15px;
}

.footer-polocy a:hover {
    color: rgb(236, 189, 103);
    margin-left: 5px;
    text-decoration: dashed;
}

.container-footer-contact {
    padding-left: 1rem;
}

.footer-contact>div {
    width: calc(100%/3);
}
</style>