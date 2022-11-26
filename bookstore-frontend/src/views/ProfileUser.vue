<script>
import { useUserStore } from "../stores/UserStore";
import bootstrap from "bootstrap/dist/js/bootstrap";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import OrderService from "../services/order.service";
import BookService from "../services/book.service";
import AuthorService from "../services/author.service";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        const userStore = useUserStore();
        const orders = useUserStore().user.orders.reverse();
        const bookFormSchema = yup.object().shape({
            title: yup
                .string()
                .required("Tên sách phải có giá trị.")
                .min(8, "Tên sách phải có ít nhất 3 ký tự."),
            price: yup
                .number()
                .required("Phải nhập giá trị của sách"),
            image: yup
                .string()
                .required("Nhập vào đường dẫn hình ảnh."),
            publishing_house: yup
                .string()
                .required("Nhập vào tên nhà xuất bản"),
            publishing_year: yup
                .number()
                .required("Nhập vào năm xuất bản"),
            supplier: yup
                .string()
                .required("Nhập vào tên nhà cung cấp"),
            num_pages: yup
                .number()
                .required("Nhập vào số trang sách"),
        });
        const changePasswordFormSchema = yup.object().shape({
            passwordOld: yup
                .string()
                .required("Mật khẩu phải có giá trị.")
                .min(8, "Mật khẩu phải ít nhất 8 ký tự."),
            passwordNew: yup
                .string()
                .required("Mật khẩu phải có giá trị.")
                .min(8, "Mật khẩu phải ít nhất 8 ký tự."),
            passwordNewConfrim: yup.string()
                .oneOf([yup.ref('passwordNew'), null], 'Passwords must match')
        });
        const updateInfoFormSchema = yup.object().shape({
            full_name: yup
                .string()
                .required("Họ và tên phải có giá trị.")
                .min(2, "Họ và tên phải ít nhất 13 ký tự.")
                .max(50, "Họ và tên có nhiều nhất 50 ký tự."),
            address: yup.string().required("Địa chỉ là bắt buộc.").max(100, "Địa chỉ tối đa 100 ký tự."),
        });
        const authorFormSchema = yup.object().shape({
            full_name: yup
                .string()
                .required("Họ và tên phải có giá trị.")
                .min(2, "Họ và tên phải ít nhất 13 ký tự.")
                .max(50, "Họ và tên có nhiều nhất 50 ký tự."),
            year: yup
                .number()
                .required("Nhập vào năm sinh tác giả."),
        });
        return {
            userStore,
            orders,
            updateInfoFormSchema,
            bookFormSchema,
            changePasswordFormSchema,
            authorFormSchema,
            dataUpdate: {
                full_name: userStore.user.full_name,
                address: userStore.user.address,
            },
            dataPassword: {
                passwordOld: "",
                passwordNew: "",
                passwordNewConfrim: ""
            },
            books: [],
            index: 0,
            dataBook: null,
            dataAuthor: null,
            dataAllAuthors: null,
        }
    },
    methods: {
        async retrieveBooks() {
            try {
                console.log("quanlysanpham")
                this.books = await BookService.getAll();
                console.log("retrieveBooks", this.userStore.card)
                // console.log(this.$route.query);
            } catch (error) {
                console.log(error);
            }
        },
        showNotify() {
            console.log("showNotify")
            const toastLiveExample = document.getElementById('liveToast')
            const toast = new bootstrap.Toast(toastLiveExample);

            toast.show();
        },
        openCity(evt, cityName) {
            var i, tabcontent, tablinks;
            if (cityName === 'quanlysanpham') this.retrieveBooks();
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            // for (i = 0; i < tabcontent.length; i++) {
            //     tabcontent[i].classList.remove("active");
            // }
            // tablinks = document.getElementsByClassName("tablinks");
            // for (i = 0; i < tablinks.length; i++) {
            //     tablinks[i].classList.remove("active");
            // }
            document.getElementById(cityName).style.display = "block";
            // console.log(evt)
            // evt.classList.add("active")
        },
        updateInfoUser() {
            this.userStore.updateInfoUser(this.dataUpdate);
            this.showNotify()
        },
        changePassword() {
            this.userStore.changePassword(this.dataPassword);
            this.showNotify()
        },
        signOut() {
            if (confirm("Bạn muốn đăng xuất ?")) {

                this.$router.push({ name: "homepage" })
                this.userStore.signOut();
            }
        },
        toggleDetailOrder(query) {
            let detailOrder = document.querySelector(query);
            if (detailOrder.style.display === 'none') {
                detailOrder.style.display = 'block'
            } else {
                detailOrder.style.display = 'none'
            }
        },
        async confirmOrder(index) {
            this.orders[index].status = true;
            console.log(this.orders[index]._id)
            await OrderService.confirmOrder(this.orders[index]._id, this.orders[index])
        },
        async openModelUpdateBook(id, index) {
            try {
                this.dataBook = await BookService.get(id);
                this.dataAllAuthors = await AuthorService.getAll();
                this.index = index;
                document.getElementById('Modalupdatebook').style.display = 'block';
            } catch (error) {
                console.log(error);

            }
        },
        async updateBook() {
            try {
                const t = await BookService.update(this.dataBook._id, this.dataBook)
                this.books[this.index].title = this.dataBook.title;
                this.books[this.index].price = this.dataBook.price;

                console.log("update thanh cong")
                this.dataBook = null;
                document.getElementById('Modalupdatebook').style.display = 'none';
            } catch (error) {
                console.log(error)
            }
        },
        async openModelAddBook() {
            this.dataBook = {
                title: "",
                author: "",
                image: [
                    ""
                ],
                category: [
                    ""
                ],
                desc: "",
                price: 50000,
                publishing_house: "",
                publishing_year: 2022,
                supplier: "",
                num_pages: 10
            }
            if (!this.dataAllAuthors)
                this.dataAllAuthors = await AuthorService.getAll();
            // this.dataBook = { }
            // this.dataBook.image = [" "];
            // this.dataBook.category = [" "];
            document.getElementById('Modaladdbook').style.display = 'block';
        },
        async addBook() {
            try {
                const t = await BookService.create(this.dataBook)
                this.retrieveBooks();
                console.log("Tạo mới thanh cong")
                this.dataBook = null;
                document.getElementById('Modaladdbook').style.display = 'none';
            } catch (error) {
                console.log(error)
            }
        },
        async deleteBook(id, index) {
            try {
                if (confirm('Bạn có chắc chắn muốn xoá sách: "' + this.books[index].title + '" không?')) {
                    const t = await BookService.delete(id)
                    this.retrieveBooks();

                    console.log("xoá thanh cong")

                }
            } catch (error) {
                console.log(error)
            }
        },
        async openModelAddAuthor() {
            this.dataAuthor = {
                full_name: "",
                year: 1990
            }
            document.getElementById('Modaladdauthor').style.display = 'block';
        },
        async addAuthor() {
            try {
                const t = await AuthorService.create(this.dataAuthor)
                this.dataAllAuthors = await AuthorService.getAll();
                console.log("Tạo mới thanh cong")
                this.dataAuthor = null;
                document.getElementById('Modaladdauthor').style.display = 'none';
            } catch (error) {
                console.log(error)
            }
        },
        closeModalUpdateBook() {
            document.getElementById('Modalupdatebook').style.display = 'none';
        },
        closeModalAddBook() {
            document.getElementById('Modaladdbook').style.display = 'none';
        },
        closeModalAddAuthor() {
            document.getElementById('Modaladdauthor').style.display = 'none';
        }
    }
}
</script>

<template>
    <!-- <P>This is profile user Page, id: {{id}}</P>
    <div>{{userStore.user}}</div> -->
    <div class="container">
        <div class="toast-container position-fixed bottom-0 end-0 p-3">

            <div id="liveToast" class="toast align-items-center border-1" role="alert" aria-live="assertive"
                aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body notify-success">
                        Thêm vào giỏ hàng thành công !
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                        aria-label="Close"></button>
                </div>
            </div>
        </div>
        <div class="box bg-white radius cach left">
            <div class="tableft">
                <i class="fas fa-user-circle"></i>
                <div class="tab">
                    <button class="tablinks active" @click="openCity($event, 'Paris')">Cập nhật thông tin</button>
                    <button class="tablinks" @click="openCity($event, 'London')">Lịch sử mua hàng</button>
                    <button class="tablinks" @click="openCity($event, 'matkhau')">Đổi mật khẩu</button>
                    <button class="tablinks" v-if="this.userStore.user.roles.length > 1"
                        @click="openCity($event, 'quanlysanpham')">Quản lý sản phẩm</button>
                    <button class="tablinks" @click="signOut()">Đăng Xuất</button>
                </div>
            </div>
        </div>
        <div class="box bg-white radius cach right">
            <div id="Paris" class="tabcontent active" style="display: block;">
                <div class="my-modal-content">

                    <div class="modal-header">
                        <h3 class="auth-form-heading">Cập nhật thông tin</h3>
                    </div>
                    <div class="auth-form cach">
                        <Form @submit="updateInfo" :validation-schema="updateInfoFormSchema">
                            <div class="form-group">
                                <label for="phone">Điện thoại</label>
                                <Field name="phone" type="tel" class="form-control" :value="userStore.user.phone"
                                    disabled />
                                <ErrorMessage name="phone" class="error-feedback" />
                            </div>
                            <div class="form-group">
                                <label for="full_name">Họ và tên</label>
                                <div>

                                    <Field name="full_name" type="text" class="form-control"
                                        v-model="dataUpdate.full_name" />
                                    <ErrorMessage name="full_name" class="error-feedback" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="address">Địa chỉ</label>
                                <div>
                                    <Field name="address" type="text" class="form-control"
                                        v-model="dataUpdate.address" />
                                    <ErrorMessage name="address" class="error-feedback" />

                                </div>
                            </div>
                            <!-- <div class="auth-form-submit bg-white form-group">
                                <button type="submit" class="auth-form-btn-submit cach">CẬP NHẬT</button>
                            </div> -->
                        </Form>
                    </div>
                    <div class="modal-footer">
                        <button id="open-form-dangky2" @click="updateInfoUser()" class="auth-form-btn-submit">Cập
                            nhật</button>
                    </div>
                </div>
            </div>
            <div id="London" class="tabcontent" style="">
                <div v-if="!this.orders[0]">
                    Chưa đặt đơn hàng nào !
                </div>
                <div class="orders" v-else>
                    <div class="order" v-for="(order, index) in orders">
                        <div class="order-tab">
                            <div>
                                <div>Đơn hàng đã được đặt vào ngày {{ order.time }}</div>
                                <div>Tổng giá trị: {{ order.totalPrice }}</div>
                                <div>Địa điểm giao hàng: {{ order.address }}</div>
                            </div>

                            <div>
                                <button v-if="!order.status" @click="confirmOrder(index)">Xác nhận đã nhận hàng</button>
                                <button v-else disabled>Đã nhận hàng</button>
                            </div>
                        </div>
                        <button @click="toggleDetailOrder('#detail-order' + index)">Chi tiết</button>
                        <div class="detail-order" :id='"detail-order" + index' style="display: none;">
                            <div class="row">
                                <div class="col-8">Tên sản phẩm</div>
                                <div class="col-2">Số lượng</div>
                                <div class="col-2">Giá bán</div>
                            </div>
                            <div class="row" v-for="(book) in order.products">
                                <div class="col-8">{{ book.title }}</div>
                                <div class="col-2">{{ book.quantity }}</div>
                                <div class="col-2">{{ book.price }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="matkhau" class="tabcontent">
                <div class="my-modal-content">
                    <div class="modal-header">
                        <h3 class="auth-form-heading">Đổi mật khẩu</h3>
                    </div>
                    <div class="auth-form cach bg-white">
                        <Form @submit="signIn" :validation-schema="changePasswordFormSchema">
                            <div class="form-group">
                                <label for="passwordOld">Mật Khẩu Cũ</label>
                                <div>
                                    <Field name="passwordOld" type="password" class="form-control"
                                        v-model="dataPassword.passwordOld" />
                                    <ErrorMessage name="passwordOld" class="error-feedback" />
                                </div>

                            </div>
                            <div class="form-group">
                                <label for="passwordNew">Mật Khẩu Mới</label>
                                <div>

                                    <Field name="passwordNew" type="password" class="form-control"
                                        v-model="dataPassword.passwordNew" />
                                    <ErrorMessage name="passwordNew" class="error-feedback" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="passwordNewConfrim">Xác Nhận Mật Khẩu Mới</label>
                                <div>

                                    <Field name="passwordNewConfrim" type="password" class="form-control"
                                        v-model="dataPassword.passwordNewConfrim" />
                                    <ErrorMessage name="passwordNewConfrim" class="error-feedback" />
                                </div>
                            </div>
                        </Form>
                    </div>
                    <div class="modal-footer">
                        <button id="open-form-dangky2" @click="changePassword()" class="auth-form-btn-submit">Đổi mật
                            khẩu</button>
                    </div>
                </div>
            </div>
            <div id="quanlysanpham" class="tabcontent" v-if="this.userStore.user.roles.length > 1">
                <div class="btn-addAuthorandBook">
                    <button @click="openModelAddBook()">Thêm Sản Phẩm</button>
                    <button @click="openModelAddAuthor()">Thêm Tác Giả</button>
                </div>
                <div class="products-list">
                    <h4>Danh sách sản phẩm ( Tổng: {{ this.books.length }} sản phẩm )</h4>
                    <div class="products-list-content">

                        <div class="row product-item">
                            <div class="col-9">
                                <b>Tên sản phẩm</b>
                            </div>
                            <div class="col-1">
                                <b>Giá</b>
                            </div>
                            <div class="col-2">
                            </div>
                        </div>
                        <div class="row product-item" v-for="(book, index) in books">

                            <div class="col-9">
                                {{ book.title }}
                            </div>
                            <div class="col-1">
                                {{ book.price }}
                            </div>
                            <div class="col-2">
                                <button><i class="fas fa-edit"
                                        @click="openModelUpdateBook(book._id, index)"></i></button>
                                <button><i class="fas fa-trash-alt" @click="deleteBook(book._id, index)"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="Modalupdatebook" class="modalx" style="display: none;">
        <div class="my-modalx-content">
            <div class="modalx-header">
                <h3 class="authx-form-heading">Cập nhật thông tin sách</h3>
                <span class="closex" id="closemodaldangky" @click="closeModalUpdateBook()"><i
                        class="fa-solid fa-xmark"></i></span>
            </div>
            <div class="authx-form cach">
                <Form @submit="updateBook()" :validation-schema="bookFormSchema" v-if="this.dataBook">
                    <div class="form-group">
                        <label for="title">Tên sách: </label>
                        <div>
                            <Field name="title" type="text" class="form-control" v-model="dataBook.title" />
                            <ErrorMessage name="title" class="error-feedback" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="price">Giá: </label>
                        <div>
                            <Field name="price" type="number" class="form-control" v-model="dataBook.price" />
                            <ErrorMessage name="price" class="error-feedback" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="image">Đường dẫn ảnh: </label>
                        <div>
                            <Field name="image" type="text" class="form-control" v-model="dataBook.image[0]" />
                            <ErrorMessage name="image" class="error-feedback" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="publishing_house">Nhà xuất bản: </label>
                        <div>
                            <Field name="publishing_house" type="text" class="form-control"
                                v-model="dataBook.publishing_house" />
                            <ErrorMessage name="publishing_house" class="error-feedback" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="publishing_year">Năm xuất bản: </label>
                        <div>
                            <Field name="publishing_year" type="number" class="form-control"
                                v-model="dataBook.publishing_year" />
                            <ErrorMessage name="publishing_year" class="error-feedback" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="supplier">Nhà cung cấp: </label>
                        <div>
                            <Field name="supplier" type="text" class="form-control" v-model="dataBook.supplier" />
                            <ErrorMessage name="supplier" class="error-feedback" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="num_pages">Số trang: </label>
                        <div>
                            <Field name="num_pages" type="number" class="form-control" v-model="dataBook.num_pages" />
                            <ErrorMessage name="num_pages" class="error-feedback" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="desc">Mô tả: </label>
                        <textarea rows="4" class="form-control" cols="210" v-model="dataBook.desc"></textarea>
                        <!-- <Field name="num_pages" type="number" class="form-control" v-model="dataBook.num_pages" />
                        <ErrorMessage name="num_pages" class="error-feedback" /> -->
                    </div>
                    <div class="form-group">
                        <label for="category">Thể loại: </label>
                        <select v-model="dataBook.category[0]" name="category" class="form-control" id="category">
                            <option>Sách Giáo Khoa - Tham Khảo</option>
                            <option>Sách Thiếu Nhi</option>
                            <option>Sách Kĩ Năng</option>
                        </select>
                        <!-- <Field name="num_pages" type="number" class="form-control" v-model="dataBook.num_pages" />
                        <ErrorMessage name="num_pages" class="error-feedback" /> -->
                    </div>
                    <div class="form-group">
                        <label for="author">Tác giả: </label>
                        <select v-model="dataBook.author._id" name="author" class="form-control" id="author">
                            <option v-for="author in dataAllAuthors" :value="author._id">{{ author.full_name }}</option>
                        </select>
                    </div>
                    <div class="authx-form-submit bg-white form-group">
                        <button type="submit" class="authx-form-btn-submit cach">CẬP NHẬT</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
    <div id="Modaladdbook" class="modalx" style="display: none;" v-if="this.dataBook">
        <div class="my-modalx-content">
            <div class="modalx-header">
                <h3 class="authx-form-heading">Thêm sách mới</h3>
                <span class="closex" id="closemodaldangky" @click="closeModalAddBook()"><i
                        class="fa-solid fa-xmark"></i></span>
            </div>
            <div class="authx-form cach">
                <Form @submit="addBook()" :validation-schema="bookFormSchema">
                    <div class="form-group">
                        <label for="title">Tên sách: </label>
                        <div>
                            <Field name="title" type="text" class="form-control" v-model="dataBook.title" />
                            <ErrorMessage name="title" class="error-feedback" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="price">Giá: </label>
                        <div>
                            <Field name="price" type="number" class="form-control" v-model="dataBook.price" />
                            <ErrorMessage name="price" class="error-feedback" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="image">Đường dẫn ảnh: </label>
                        <div>
                            <Field name="image" type="text" class="form-control" v-model="dataBook.image[0]" />
                            <ErrorMessage name="image" class="error-feedback" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="publishing_house">Nhà xuất bản: </label>
                        <div>
                            <Field name="publishing_house" type="text" class="form-control"
                                v-model="dataBook.publishing_house" />
                            <ErrorMessage name="publishing_house" class="error-feedback" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="publishing_year">Năm xuất bản: </label>
                        <div>
                            <Field name="publishing_year" type="number" class="form-control"
                                v-model="dataBook.publishing_year" />
                            <ErrorMessage name="publishing_year" class="error-feedback" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="supplier">Nhà cung cấp: </label>
                        <div>
                            <Field name="supplier" type="text" class="form-control" v-model="dataBook.supplier" />
                            <ErrorMessage name="supplier" class="error-feedback" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="num_pages">Số trang: </label>
                        <div>
                            <Field name="num_pages" type="number" class="form-control" v-model="dataBook.num_pages" />
                            <ErrorMessage name="num_pages" class="error-feedback" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="desc">Mô tả: </label>
                        <textarea rows="4" class="form-control" cols="210" v-model="dataBook.desc"></textarea>
                        <!-- <Field name="num_pages" type="number" class="form-control" v-model="dataBook.num_pages" />
                        <ErrorMessage name="num_pages" class="error-feedback" /> -->
                    </div>
                    <div class="form-group">
                        <label for="category">Thể loại: </label>
                        <select v-model="dataBook.category[0]" name="category" class="form-control" id="category">
                            <option>Sách Giáo Khoa - Tham Khảo</option>
                            <option>Sách Thiếu Nhi</option>
                            <option>Sách Kĩ Năng</option>
                        </select>
                        <!-- <Field name="num_pages" type="number" class="form-control" v-model="dataBook.num_pages" />
                        <ErrorMessage name="num_pages" class="error-feedback" /> -->
                    </div>
                    <div class="form-group">
                        <label for="author">Tác giả: </label>
                        <select v-model="dataBook.author" name="author" class="form-control" id="author">
                            <option v-for="author in dataAllAuthors" :value="author._id">{{ author.full_name }}</option>
                        </select>
                    </div>
                    <div class="authx-form-submit bg-white form-group">
                        <button type="submit" class="authx-form-btn-submit cach">Thêm</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
    <div id="Modaladdauthor" class="modalx" style="display: none;" v-if="this.dataAuthor">
        <div class="my-modalx-content">
            <div class="modalx-header">
                <h3 class="authx-form-heading">Thêm tác giả mới</h3>
                <span class="closex" id="closemodaldangky" @click="closeModalAddAuthor()"><i
                        class="fa-solid fa-xmark"></i></span>
            </div>
            <div class="authx-form cach">
                <Form @submit="addAuthor()" :validation-schema="authorFormSchema">
                    <div class="form-group">
                        <label for="full_name">Họ và tên: </label>
                        <div>
                            <Field name="full_name" type="text" class="form-control" v-model="dataAuthor.full_name" />
                            <ErrorMessage name="full_name" class="error-feedback" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="year">Năm sinh: </label>
                        <div>
                            <Field name="year" type="number" class="form-control" v-model="dataAuthor.year" />
                            <ErrorMessage name="year" class="error-feedback" />
                        </div>
                    </div>
                    <div class="authx-form-submit bg-white form-group">
                        <button type="submit" class="authx-form-btn-submit cach">Thêm</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<style scoped>

#London{
    max-height: 683.4px;
    overflow:scroll;
}
.btn-addAuthorandBook {
    position: absolute;
    right: 200px;
    top: 184px;
}

.btn-addAuthorandBook button {
    margin-left: 20px;
}

.modalx {
    display: none;
    position: fixed;
    z-index: 1;
    padding-top: 30px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
}

.modalx form {
    background-color: white;
}


/* Modal Content */

.my-modalx-content {
    position: relative;
    background-color: white;
    margin: auto;
    padding: 10px;
    border: 1px solid #888;
    width: 90%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s
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


/* The Close Button */

.closex {
    width: fit-content;
    position: absolute;
    top: 13px;
    right: 14px;
}

.closex i {
    color: white;
    float: right;
    font-size: 28px;
    font-weight: bold;
    width: 28px;
    height: 28px;
    background-color: rgb(145 209 234);
}

.closex i:hover,
.closex i:focus {
    text-align: center;
    background-color: rgb(145 209 234);
    color: rgb(214, 140, 71);
    text-decoration: none;
    cursor: pointer;
}

.modalx-header {
    padding: 2px 16px;
    background-color: rgb(145 209 234);
    color: black;
}

.authx-form-heading {
    background-color: rgb(145 209 234);
}

.modalx-body {
    padding: 2px 16px;
}

.authx-form-input {
    border: 1px solid rgb(175, 174, 174);
}

.modalx-footer {
    padding: 2px 16px;
    background-color: white !important;
}

.modalx-footer span,
.modalx-footer span a {
    color: black;
    font-weight: 400;
    background-color: white !important;
}

#open-form-dangnhap {
    background-color: aliceblue;
    color: rgb(228, 124, 54);
}

.authx-form-btn-submit {
    background-color: rgb(145 209 234);
    border: none;
    border-radius: 10px;
    font-size: 16px;
}

.products-list {
    width: 100%;
    padding: 20px 10px 10px 10px;
}

.product-item .col-1,
.product-item .col-2 {
    text-align: right;
    line-height: 22px;
}

.products-list-content {
    padding: 15px;
    padding-right: 0px;
    max-height: 600px;
    overflow: scroll;
}

.product-item {
    width: 100%;
    padding-left: 2px;

    border: #7ac400 1px solid;
}

.orders {
    padding: 30px;
}

.order {
    padding: 10px;
    border-bottom: 2px solid #7ac400;
    margin-bottom: 20px;
}

.order-tab {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}


#liveToast {
    background-color: #7ac400;
    width: max-content;
}

.notify-success {
    color: #fff;
    font-size: 20px;
    padding: 10px;
    word-spacing: normal;
}

.form-group {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
}

.modal-footer {
    margin-right: 50px;
}

.form-group div {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.form-group label {
    width: 200px;
}

.my-modal-content {
    padding: 15px;
}

.auth-form {
    padding: 10px 50px 10px 40px;
}

.container {
    display: flex;
    flex-direction: row;
    justify-content: space-between
}


.tableft {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;
}

.tab {
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
}

.tabcontent {
    display: none;
}

.tablinks {
    padding: 3px 20px;
    margin-bottom: 5px;
}

.left {
    width: 28%;
    /* padding: 20px; */
}

.right {
    width: 71%;
}

.fa-user-circle {
    font-size: 125px;
}
</style>