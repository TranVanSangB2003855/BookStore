<template>
    <div class="qc cach radius">
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="/img/quangcao/qc1.jpg" class="d-block w-100">
                </div>
                <div class="carousel-item">
                    <img src="/img/quangcao/qc2.jpg" class="d-block w-100">
                </div>
                <div class="carousel-item">
                    <img src="/img/quangcao/qc3.jpg" class="d-block w-100">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>

        <img class="h1" src="/img/quangcao/qc4.jpg" alt="">
        <img class="h2" src="/img/quangcao/qc5.jpg" alt="">
    </div>

    <div class="box bg-white radius cach">
        <h2 class="bg-white"><i class="fas fa-th-list"></i> Danh mục sản phẩm</h2>

        <router-link :to="{
            name: 'book.list',
            query: { category: 'Sách Thiếu Nhi' }
        }">
            <div class="bg-white thieunhi"><img src="/img/sanpham/thieu-nhi.png" alt="">Thiếu nhi</div>
        </router-link>

        <router-link :to="{
            name: 'book.list',
            query: { category: 'Sách Giáo Khoa - Tham Khảo' }
        }">
            <div class="bg-white giaokhoa"><img src="/img/sanpham/sach-giao-khoa.png" alt="">Sách giáo khoa</div>
        </router-link>

        <router-link :to="{
            name: 'book.list',
            query: { category: 'Sách Kĩ Năng' }
        }">
            <div class="bg-white kinang"><img src="/img/sanpham/tam-ly-ky-nang.png" alt="">Kỹ năng</div>
        </router-link>
    </div>

    <ProductCarousel v-if="this.books.sachGiaoKhoa" :loaiSach="this.books.sachGiaoKhoa" id="1" />
    <ProductCarousel v-if="this.books.sachThieuNhi" :loaiSach="this.books.sachThieuNhi" id="2" />
    <ProductCarousel v-if="this.books.sachKyNang" :loaiSach="this.books.sachKyNang" id="3" />
</template>

<script>
import ProductCarousel from "../components/ProductCarousel.vue";
import BookService from "../services/book.service";
export default {
    components: {
        ProductCarousel
    },
    data() {
        return {
            books: {},
            category: [],
        }
    },
    methods: {
        async retrieveBooks() {
            console.log("retrieveBooks")
            try {
                this.books = await BookService.getDataHome();
            } catch (error) {
                console.log(error);
            }
        },
        test(payload) {
            console.log("test",payload)
        }
    },
    mounted() {
        this.retrieveBooks();
    }
}
</script>

<style scoped>
.qc>img {
    width: 100%;
}

i.fas {
    margin-right: 1rem;
}

.fa-th-list::before {
    font-size: 1.8rem;
    color: #da6156;
}

.qc {
    display: grid;
    grid-template: "slide h1" auto "slide h2" auto / 67% 32%;
}

.slide {
    grid-area: slide;
}

.h1 {
    margin-left: 14px;
    grid-area: h1;
}

.h2 {
    margin-left: 14px;
    grid-area: h2;
}

.giaokhoa a:hover,
.kynang a:hover,
.thieunhi a:hover,
.vanhoc a:hover,
.nuocngoai a:hover,
.vpp a:hover,
.kinhte a:hover {
    color: red;
    font-weight: bold;
}






/* danh mục sách */

.box {
    padding-top: 13px;
    padding-bottom: 20px;
}

.box h2 {
    padding-bottom: 13px;
    padding-left: 20px;
    margin-bottom: 20px;
    border-bottom: 2.6px solid rgb(231, 232, 233);
    font-size: 1.8rem;
}

.box div {
    width: calc(80%/7);
    display: inline-block;
    margin-left: 10px;
    padding-left: 20px;
    margin-right: 10px;
    justify-items: center;
}

.box div img {
    display: block;
    width: 100px;
    margin: auto;
}

.box div a {
    display: block;
    text-align: center;
    font-size: 16px;
    text-decoration: none;
    color: black;
}

.box p {
    font-size: 24px;
    padding-right: 20px;
}
</style>