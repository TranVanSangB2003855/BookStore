
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import AuthService from "../services/auth.service"
import CardService from "../services/card.service"
import { useUserStore } from "../stores/UserStore";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    setup() {
        const userStore = useUserStore();
        const card = useUserStore().card;
        return {
            userStore,
            card
        }
    },

    data() {
        const dataSignInFormSchema = yup.object().shape({
            password: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Mật khẩu phải ít nhất 8 ký tự."),
            phone: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
        });
        const dataSignUpFormSchema = yup.object().shape({
            full_name: yup
                .string()
                .required("Họ và tên phải có giá trị.")
                .min(13, "Họ và tên phải ít nhất 13 ký tự.")
                .max(50, "Họ và tên có nhiều nhất 50 ký tự."),
            password: yup
                .string()
                .required("Mật khẩu phải có giá trị.")
                .min(8, "Mật khẩu phải ít nhất 8 ký tự."),
            phone: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
            address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
        });
        return {
            searchText: "",
            dataSignIn: {
                phone: "",
                password: "",
            },
            dataSignUp: {
                phone: "",
                password: "",
                full_name: "",
                address: "",
            },
            dataSignInFormSchema,
            dataSignUpFormSchema
        };
    },

    watch: {
        user(newV, oldV) {
            console.log("user:Watch")
            this.xuLyNutDangNhap();
        },
    },

    methods: {
        async verifyToken() {
            console.log("verifyToken")
            try {
                let user = await AuthService.verifyToken();
                if (user) {
                    this.userStore.setUserInfo(user);
                    const x = this.userStore.addDataCardFromMongoDB();
                }
            }
            catch (error) {
                console.log(error)
                // alert(((error.response.data.message && error.response.data)) || error.message || error.toString());
            }
        },
        xuLyNutDangNhap() {
            console.log("xuLyNutDangNhap")
            let modaldangnhap = document.getElementById("Modaldangnhap");
            let btn = document.getElementById("open-form-dangnhap1");
            if (btn) {

                btn.onclick = function () {
                    alert("Mo trang dang nhap")
                    modaldangnhap.style.display = "block";
                }
            }
        },
        setup_dangNhap_DangKy() {
            console.log("setup_dangNhap_DangKy")
            this.userStore.setInfoCard()
            // const a = this.userStore.getDataCard
            // console.log(a)
            //Đăng nhập
            //modal
            //dang ky
            var modaldangky = document.getElementById("Modaldangky");
            var btndangky2 = document.getElementById("open-form-dangky2");
            var spandangky = document.getElementById("closemodaldangky");
            //dang nhap
            var modaldangnhap = document.getElementById("Modaldangnhap");
            // var btndangnhap1 = document.getElementById("open-form-dangnhap1");
            var btndangnhap2 = document.getElementById("open-form-dangnhap2");
            var spandangnhap = document.getElementById("closemodaldangnhap");
            this.xuLyNutDangNhap()

            btndangky2.onclick = function () {
                modaldangky.style.display = "block";
                modaldangnhap.style.display = "none";
            }
            spandangky.onclick = function () {
                modaldangky.style.display = "none";
            }
            btndangnhap2.onclick = function () {
                modaldangnhap.style.display = "block";
                modaldangky.style.display = "none";
            }
            spandangnhap.onclick = function () {
                modaldangnhap.style.display = "none";
            }

            window.onclick = function (event) {
                if (event.target == modaldangky) {
                    modaldangky.style.display = "none";
                }
                if (event.target == modaldangnhap) {
                    modaldangnhap.style.display = "none";
                }
            }

            // }
        },
        async signIn() {
            console.log("signIn")
            try {
                this.userStore.setUserInfo(await AuthService.signIn(this.dataSignIn))
                if (typeof (localStorage) !== 'undefined') {
                    window.localStorage.setItem('first-login', 1);
                }
                this.userStore.addDataCardFromMongoDB()
                alert("Đăng nhập thành công");
                document.getElementById("Modaldangnhap").style.display = "none";
                document.getElementById("Modaldangky").style.display = "none";
                this.dataSignIn = {
                    phone: "",
                    password: "",
                },
                    console.log(this.userStore.user)
            } catch (error) {
                alert(((error.response.message && error.response.data)) || error.message || error.toString());
                // && error.response.data) || error.message || error.toString());
            }
        },
        async signUp() {
            console.log("signUp")
            try {
                const meg = await AuthService.signUp(this.dataSignUp);
                document.getElementById("Modaldangky").style.display = "none";
                document.getElementById("Modaldangnhap").style.display = "block";
                this.dataSignUp = {
                    phone: "",
                    password: "",
                    full_name: "",
                    address: "",
                };
                if (meg) alert(meg.data.message);
            } catch (err) {
                console.log(err);
            }
        },
        search() {
            if (this.$router.name !== 'book.list') {
                this.$router.push({ name: 'book.list', query: { search: this.searchText } })
            } else {
                // this.$router.replace({ name: 'book.list', query: { search: this.searchText } })
                this.$router.$forceUpdate();
            }
            this.searchText = ""
        }
    },
    mounted() {

        this.setup_dangNhap_DangKy()
        this.verifyToken();
    },
}
</script>

<template>
    <div class="page">
        <aside class="bg-orage l"></aside>
        <img src="/1980Books1263x60.jpg" alt="" class="article">
        <aside class="bg-orage r"></aside>
    </div>
    <header class="radius">
        <div class="page">
            <aside class="bg-white l"></aside>
            <div class="article">
                <nav class="toolbar">
                    <router-link class="logo" :to="{ name: 'homepage' }">
                        <img src="/favicon.ico" alt="">

                    </router-link>
                    <router-link class="trangchu" :to="{ name: 'homepage' }">
                        Trang chủ

                    </router-link>
                    <router-link class="gioithieu" :to="{ name: 'about-us' }">
                        Giới thiệu

                    </router-link>
                    <router-link class="sanpham" :to="{ name: 'book.list' }">
                        Sản Phẩm

                    </router-link>

                    <div class="timkiem">
                        <form @submit.prevent="search()">
                            <input class="radius" v-model="searchText" type="text"
                                placeholder="    Nhập sản phẩm cần tìm . . . ">
                            <button type="submit" class="btn_timkiem"><i class="fas fa-search"></i></button>
                        </form>
                    </div>

                    <router-link class="right-page donhang" :to="{ name: 'card' }">
                        <i class="fa-solid fa-cart-shopping f-icon"></i>
                        Giỏ Hàng
                    </router-link>
                    <router-link class="right-page taikhoan"
                        :to="{ name: 'user.profile', params: { id: this.userStore.user.id } }"
                        v-if="this.userStore.user">
                        <div class="icon-user">
                            <i class="fa-solid fa-user f-icon"></i>
                        </div>
                        {{ this.userStore.user.full_name }}
                    </router-link>
                    <a href="#" class="right-page taikhoan" id="open-form-dangnhap1" v-else>
                        <div class="icon-user">
                            <i class="fa-solid fa-user f-icon"></i>
                        </div>
                        Tài Khoản
                    </a>
                </nav>
            </div>
            <aside class="bg-white r"></aside>
        </div>
        <div id="Modaldangnhap" class="modal">
            <div class="my-modal-content">
                <div class="modal-header">
                    <h3 class="auth-form-heading">Đăng nhập</h3>
                    <span class="close" id="closemodaldangnhap"><i class="fa-solid fa-xmark"></i></span>
                </div>
                <div class="auth-form cach bg-white">
                    <Form @submit="signIn" :validation-schema="dataSignInFormSchema">

                        <div class="form-group">
                            <label for="phone">Điện thoại</label>
                            <Field name="phone" type="tel" class="form-control" v-model="dataSignIn.phone" />
                            <ErrorMessage name="phone" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="password">Mật Khẩu</label>
                            <Field name="password" type="password" class="form-control" v-model="dataSignIn.password" />
                            <ErrorMessage name="password" class="error-feedback" />
                        </div>
                        <div class="auth-form-aside cach bg-white">
                            <p class="auth-form-polocy-text bg-white">
                                Bằng việc đăng ký bạn đã đồng ý với chúng tôi về
                                <a href="" class="auth-form-polocy-link bg-white">Điều khoản dịch vụ</a> và
                                <a href="" class="auth-form-polocy-link bg-white">Chính sách bảo mật</a>
                            </p>
                        </div>
                        <div class="auth-form-submit bg-white form-group">
                            <button type="submit" class="auth-form-btn-submit cach">Đăng nhập</button>
                        </div>
                    </Form>
                </div>
                <div class="modal-footer">
                    <span>Bạn chưa có tài khoản? Hãy chọn </span>
                    <button id="open-form-dangky2" class="auth-form-btn-submit">Đăng ký</button>

                </div>
            </div>
        </div>
        <div id="Modaldangky" class="modal">
            <div class="my-modal-content">
                <div class="modal-header">
                    <h3 class="auth-form-heading">Đăng ký thông tin tài khoản</h3>
                    <span class="close" id="closemodaldangky"><i class="fa-solid fa-xmark"></i></span>
                </div>
                <div class="auth-form cach">
                    <Form @submit="signUp" :validation-schema="dataSignUpFormSchema">
                        <div class="form-group">
                            <label for="full_name">Họ và tên</label>
                            <Field name="full_name" type="text" class="form-control" v-model="dataSignUp.full_name" />
                            <ErrorMessage name="full_name" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="phone">Điện thoại</label>
                            <Field name="phone" type="tel" class="form-control" v-model="dataSignUp.phone" />
                            <ErrorMessage name="phone" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="address">Địa chỉ</label>
                            <Field name="address" type="text" class="form-control" v-model="dataSignUp.address" />
                            <ErrorMessage name="address" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="password">Mật Khẩu</label>
                            <Field name="password" type="password" class="form-control" v-model="dataSignUp.password" />
                            <ErrorMessage name="password" class="error-feedback" />
                        </div>
                        <div class="auth-form-submit bg-white form-group">
                            <button type="submit" class="auth-form-btn-submit cach">ĐĂNG KÝ</button>
                        </div>
                    </Form>
                </div>
                <div class="modal-footer">
                    <span>Đã có tài khoản</span>
                    <button id="open-form-dangnhap2" class="auth-form-btn-submit">Đăng nhập</button>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
.icon-user {
    display: flex;
    justify-content: center;
}

header {
    background-color: #ebe5b3;
}

header>img {
    margin-left: 130px;
    margin-right: 130px;
}

header .toolbar {
    left: 0px;
    background-color: white;
    padding-top: 25px;
    padding-bottom: 25px;
    height: 100px;
}

header .article {
    height: 100px;
}

.toolbar a {
    position: relative;
    vertical-align: middle;
    background-color: white;
    font-size: 20px;
    margin: 10px;
    text-decoration: none;
    text-transform: uppercase;
}

a.logo img {
    width: 50px;
    height: 50px;
    background-color: white;
}


.trangchu:hover,
.gioithieu:hover,
.sanpham:hover,
.taikhoan:hover,
.donhang:hover,
.taikhoan:hover {
    color: rgb(236, 189, 103);
}

.f-icon {
    font-size: 1.2rem;
    background-color: white;
    display: flex;
}

.right-page {
    float: right;
}

.timkiem {
    position: relative;
    left: 0;
    bottom: -3px;
    display: inline-block;
    background-color: white;
    width: 342px;
}

.timkiem input {
    background-color: white;
    width: 300px;
    height: 30px;
    border-color: rgb(148, 147, 147);
}

.timkiem button {
    display: inline-block;
    position: absolute;
    top: -2px;
    left: 300px;
    height: 36px;
    background-color: white;
    border: none;
    width: 10px;
}

.timkiem button i {
    font-size: 24px;
    background-color: white;
}

.timkiem button i:hover {
    color: red;
    cursor: pointer;
}

a.donhang,
a.taikhoan {
    width: fit-content;
    border: 1px solid #000;
    overflow: hidden;
    height: max-content;
    padding: 6px 6px 0px 7px;
    text-align: center;
    width: max-content;
    font-size: 1rem;
    bottom: 10px;
}

a.donhang i {
    transform: translateX(23px);
}

/* Đăng nhập */



.modal {
    display: none;
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
}

.modal form {
    background-color: white;
}


/* Modal Content */

.my-modal-content {
    position: relative;
    background-color: white;
    margin: auto;
    padding: 10px;
    border: 1px solid #888;
    width: fit-content;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s
}

@-webkit-keyframes animatetop {
    from {
        top: -300px;
        opacity: 0
    }

    to {
        top: 0;
        opacity: 1
    }
}

@keyframes animatetop {
    from {
        top: -300px;
        opacity: 0
    }

    to {
        top: 0;
        opacity: 1
    }
}


/* The Close Button */

.close {
    width: fit-content;
}

.close i {
    color: white;
    float: right;
    font-size: 28px;
    font-weight: bold;
    width: 28px;
    height: 28px;
    background-color: rgb(145 209 234);
}

.close i:hover,
.close i:focus {
    text-align: center;
    background-color: rgb(145 209 234);
    color: rgb(214, 140, 71);
    text-decoration: none;
    cursor: pointer;
}

.modal-header {
    padding: 2px 16px;
    background-color: rgb(145 209 234);
    color: black;
}

.auth-form-heading {
    background-color: rgb(145 209 234);
}

.modal-body {
    padding: 2px 16px;
}

.auth-form-input {
    border: 1px solid rgb(175, 174, 174);
}

.modal-footer {
    padding: 2px 16px;
    background-color: white !important;
}

.modal-footer span,
.modal-footer span a {
    color: black;
    font-weight: 400;
    background-color: white !important;
}

#open-form-dangnhap {
    background-color: aliceblue;
    color: rgb(228, 124, 54);
}

.auth-form-btn-submit {
    background-color: rgb(145 209 234);
    border: none;
    border-radius: 10px;
    font-size: 16px;
}
</style>