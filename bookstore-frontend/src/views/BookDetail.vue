<script lang="js">
import ProductCarousel from "../components/ProductCarousel.vue";
import bootstrap from "bootstrap/dist/js/bootstrap";
import { useUserStore } from "../stores/UserStore";
import BookService from "../services/book.service";
export default {
    components: {
        ProductCarousel
    },
    setup(){
        const userStore = useUserStore();
        return{
            userStore
        }
    },
    props: {
        id: { type: String, required: true },
    },
    watch: {
        id() {
            this.getABook();
        }
    },
    data() {
        return {
            book: {},
            suggestBooks: [],
            message: "",
            numberProduct: 1,
        };
    },
    methods: {
        async retrieveSuggestBooks() {
            console.log("retrieveSuggestBooks")
            try {
                this.books = await BookService.getData(this.$route.fullPath.slice(9));
                // console.log(this.$route.query);
            } catch (error) {
                console.log(error);
            }
        },
        async getABook() {
            console.log("getABook")

            try {
                this.book = await BookService.get(this.id);
                console.log(this.book.category[0], this.book._id)
                this.suggestBooks = await BookService.getDataSuggest(this.book.category[0], this.book._id);
                console.log(this.suggestBooks)
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        formatter(par) {
            console.log("formatter")
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(par);
        },
        openCity(evt, cityName) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].classList.toggle("active");
            }
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].classList.toggle("active");
            }
            document.getElementById(cityName).style.display = "block";
            // console.log(evt)
            // evt.classList.add("active")
        },
        showNotify() {
            console.log("showNotify")
            const toastLiveExample = document.getElementById('liveToast')
            const toast = new bootstrap.Toast(toastLiveExample);

            toast.show();
        },
        addToCart() {
            console.log("addToCart-BookDetail",{
                book_id: this.book._id,
                quantity: this.numberProduct,
                price: this.book.price,
                title: this.book.title,
                image: this.book.image[0]
            })

            this.userStore.addToCart({
                book_id: this.book._id,
                quantity: parseInt(this.numberProduct),
                price: this.book.price,
                title: this.book.title,
                image: this.book.image[0]
            })
            this.showNotify();
        }
    },
    created() {
        this.getABook();
        this.message = "";
    },
}
</script>

<template>
    <div class="container-fluid" v-if="book.image">
        <div class="box radius bg-white">
            <div class="row">
                <div class="col-5">
                    <img :src="book.image[0]" class="image" alt="">
                </div>
                <div class="col-7">
                    <div class="row">
                        <h3 class="title">{{ book.title }}</h3>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="row">
                                <span class="key">
                                    Nhà cung cấp:
                                </span>
                                <span class="value">
                                    {{ book.supplier }}
                                </span>

                            </div>
                            <div class="row">
                                <span class="key">
                                    Nhà xuất bản:
                                </span>
                                <span class="value">
                                    {{ book.publishing_house }}
                                </span>

                            </div>
                        </div>
                        <div class="col">
                            <div class="row">
                                <span class="key">
                                    Tác giả:
                                </span>
                                <span class="value">
                                    <router-link :to="{
                                        name: 'author.detail',
                                        query: { id: book.author._id }
                                    }">
                                        {{ book.author.full_name }}
                                    </router-link>
                                </span>

                            </div>
                            <div class="row">
                                <span class="key">
                                    Năm xuất bản:
                                </span>
                                <span class="value">
                                    {{ book.publishing_year }}
                                </span>

                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <p class="price">{{ formatter(book.price) }}</p>

                    </div>
                    <div class="row">
                        <p> Chính sách đổi trả
                            Đổi trả sản phẩm trong 30 ngày</p>
                    </div>
                    <div class="row">
                        <div class="quantity-product">

                            <label for="quantity">Số lượng:</label>
                            <div class="quantity-product-form" @click="numberProduct > 1 ? numberProduct-- : 1">
                                <button><i class="fa-solid fa-minus"></i></button>
                            </div>
                            <input type="text" id="quantity" v-model="numberProduct" min="1">
                            <div class="quantity-product-form" @click="numberProduct++">
                                <button><i class="fa-solid fa-plus"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <button class="addToCart" value="Thêm vào giỏ hàng" @click="addToCart()">
                            <i class="fa-solid fa-cart-shopping f-icon">
                            </i>
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                    <div class="toast-container position-fixed bottom-0 end-0 p-3">

                        <div id="liveToast" class="toast align-items-center border-1" role="alert" aria-live="assertive"
                            aria-atomic="true">
                            <div class="d-flex">
                                <div class="toast-body notify-success">
                                    Thêm vào giỏ hàng thành công !
                                </div>
                                <button type="button" class="btn-close btn-close-white me-2 m-auto"
                                    data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="box radius bg-white">
            <div class="row">
                <div class="col">

                    <div class="tab">
                        <button class="tablinks active" @click="openCity($event, 'Paris')">Thông tin chi tiết</button>
                        <button class="tablinks" @click="openCity($event, 'London')">Mô tả sản phẩm</button>
                    </div>

                    <div id="Paris" class="tabcontent active" style="display: block;">
                        <div>
                            <table class="table table-striped">
                                <tbody>
                                    <tr>
                                        <td>THỂ LOẠI: </td>
                                        <td>{{ book.category[0] }}</td>
                                    </tr>
                                    <tr class="striped">

                                        <td>TÁC GIẢ:</td>
                                        <td>{{ book.author.full_name }}</td>
                                    </tr>
                                    <tr>
                                        <td>NĂM XUẤT BẢN: </td>
                                        <td>{{ book.publishing_year }}</td>
                                    </tr>
                                    <tr class="striped">

                                        <td>SỐ TRANG: </td>
                                        <td>{{ book.num_pages }}</td>
                                    </tr>
                                    <tr>
                                        <td>NHÀ XUẤT BẢN: </td>
                                        <td>{{ book.publishing_house }}</td>
                                    </tr>
                                    <tr class="striped">

                                        <td>NHÀ PHÁT HÀNH: </td>
                                        <td>{{ book.supplier }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div id="London" class="tabcontent" style="min-height: 243px;">
                        <p>{{ book.desc }}</p>
                    </div>
                </div>

            </div>
        </div>

        <ProductCarousel v-if="this.suggestBooks" :loaiSach="this.suggestBooks" title="Có Thể Bạn Cũng Thích" id="1" />

    </div>
</template>


<style scoped>

tr.striped{
    background-color: #7ac400;
}

#liveToast {
    background-color: #7ac400;
    width: max-content;
}

.notify-success{
    color: #fff;
    font-size: 20px;
    padding: 10px;
    word-spacing: normal;
}
.addToCart {
    width: 400px;
    height: 50px;
}

.quantity-product {
    display: flex;
    margin-bottom: 15px;
}

.quantity-product label {
    margin-right: 10px;
}

#quantity {
    margin-left: 1px;
    margin-right: 1px;
    width: 60px;
    text-align: center;
}

.key,
.value {
    width: fit-content;
}

.value {
    padding-left: 0;
    margin-left: 0;
}

.image {
    width: 90%;
    padding-top: 20px;
    padding-bottom: 20px;
}

.price {
    color: red;
    font-weight: 700;
    font-size: 2rem;
}

.title {
    padding: 12px 18px 12px 0;
}

.value {
    font-weight: 600;
}

.container-fluid {
    padding-left: 0;
    padding-right: 0;
}

.box {
    margin: 10px 0;
    overflow: hidden;
    width: 100%;
}

.row p {
    display: block;
}

body {
    font-family: Arial;
}

.tab1 div {
    display: block;
}

/* Style the tab */
.tab {
    overflow: hidden;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
}

/* Style the buttons inside the tab */
.tab button {
    background-color: inherit;
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    transition: 0.3s;
    font-size: 17px;
}

/* Change background color of buttons on hover */
.tab button:hover {
    background-color: #ddd;
}

/* Create an active/current tablink class */
.tab button.active {
    background-color: #ccc;
}

.tabcontent .active {
    display: block;
}

/* Style the tab content */
.tabcontent {
    display: none;
    padding: 6px 12px;
    border: 1px solid #ccc;
    border-top: none;
}
</style>