<script>
import AuthorService from "../services/author.service";
export default {
    data() {
        return {
            author: [],
            books: [],
            category: "",
        }
    },
    watch: {
        // category(newV, oldV){
        //     if(newV.length === 3)
        //         this.category = "all";
        // }
    },
    computed: {
        // category(){
        //     return this.$route.query.category;
        // },
        numPageCurrent() {
            return this.$route.hash ? this.$route.hash : "";
        },
        showPageCurrent() {
            if (this.numPageCurrent) {
                return parseInt(this.numPageCurrent.substr(5));
            }
            else {
                this.$route.hash = "#page1";
                return 1;
            }
        },
        numPageOfBooks() {
            let tempt = [];
            const numPages = this.books.length;
            for (let i = 0; i < numPages; i++) {
                tempt.push(i + 1);
            }
            return tempt;
        },

    },
    methods: {
        async retrieveBooks() {
            try {
                this.author = await AuthorService.getAnAuthor(this.$route.query.id);
                this.books = this.author.books;
                console.log(this.books);
            } catch (error) {
                console.log(error);
            }
        },
        formatter(par) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(par);
        },
        goDetailItem(id) {
            this.$router.push({ name: "book.detail", params: { id: id } });
        },
        async filterBooks() {
            await this.$router.push({ name: 'book.list', query: { category: this.category } })
            this.books = await BookService.getData(this.$route.fullPath.slice(9));
        }
    },
    mounted() {
        this.retrieveBooks();
    }
}
</script>

<template>
    <div class="container-fluid">
        <div class="box bg-white tieude radius">
            <h3 class="bg-white"> NHỮNG CUỐN SÁCH CỦA TÁC GIẢ <span class="name-author">{{this.author.full_name}}</span></h3>
        </div>
        <div class="row row-cols-1 row-cols-md-4">
            <div class="col mb-4" v-for="(book, index) in books" :key="index">
                <div class="thumb-wrapper" @click="goDetailItem(book._id)">
                    <div class="img-box">
                        <img :src="book.image[0]" class="img-fluid">
                    </div>
                    <div class="thumb-content">
                        <h4 :title="book.title">{{ book.title }}</h4>
                        <p class="item-price">{{ formatter(book.price) }}</p>
                        <a href="#" class="btn btn-primary">Add to Cart</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

.name-author{
    text-transform: uppercase;
    color: #16c79a;
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: 0.02rem;
}

.tieude{
    margin-bottom: 10px;
}

.pagination {
    float: right;
    padding-right: 20px;
}

.pagination .page-link {
    padding: 0.2rem 0.5rem;
    font-size: 1.2rem;
    line-height: 1.25;
}

.container-fluid {
    margin-top: 20px;
    margin-bottom: 20px;
}

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

.container {
    background-color: #f4f4f4;
    width: 100%;
    padding-right: 20px;
}

button.btn.btn-hide {
    height: inherit;
    background-color: #ff935d;
    color: #fff;
    font-size: 0.82rem;
    padding-left: 40px;
    padding-right: 40px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px
}

.btn:focus {
    box-shadow: none
}

.box-label .btn {
    background-color: #fff;
    padding: 0;
    font-size: 0.8rem
}

.btn-red {
    background-color: #e00000ce
}

.btn-orange {
    background-color: #ffa500
}

.btn-pink {
    background-color: #e0009dce
}

.btn-green {
    background-color: #00811c
}

.btn-blue {
    background-color: #026bc2
}

.btn-brown {
    background-color: #994a00
}


#filterbar {
    width: 100%;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 15px;
    float: left
}

#filterbar input[type="radio"] {
    visibility: hidden
}

#filterbar input[type='radio']:checked {
    background-color: #16c79a;
    border: none
}

#filterbar .btn.btn-success {
    background-color: #ddd;
    color: #333;
    border: none;
    width: 115px
}

#filterbar .btn.btn-success:hover {
    background-color: #aff1e1;
    color: #444
}

#filterbar .btn-success:not(:disabled):not(.disabled).active,
#filterbar .btn-success:not(:disabled):not(.disabled):active {
    background-color: #16c79a;
    color: #fff
}

label {
    cursor: pointer
}

.tick {
    display: block;
    position: relative;
    padding-left: 23px;
    cursor: pointer;
    font-size: 0.9rem;
    margin: 0
}

.tick input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0
}

.check {
    position: absolute;
    top: 1px;
    left: 0;
    height: 18px;
    width: 18px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 3px
}

.tick:hover input~.check {
    background-color: #f3f3f3
}

.tick input:checked~.check {
    background-color: #ffffff
}

.check:after {
    content: "";
    position: absolute;
    display: none
}

.tick input:checked~.check:after {
    display: block;
    transform: rotate(45deg) scale(1)
}

.tick .check:after {
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid rgb(0, 0, 0);
    border-width: 0 3px 3px 0;
    transform: rotate(45deg) scale(2)
}

.box {
    padding: 10px
}

.box-label {
    color: #11698e;
    font-size: 0.9rem;
    font-weight: 800
}

#inner-box,
#inner-box2 {
    height: 150px;
    overflow-y: scroll
}

#inner-box2 {
    height: 132px
}

#inner-box::-webkit-scrollbar,
#inner-box2::-webkit-scrollbar {
    width: 6px
}

#inner-box::-webkit-scrollbar-track,
#inner-box2::-webkit-scrollbar-track {
    background-color: #ddd;
    border-radius: 2px
}

#inner-box::-webkit-scrollbar-thumb,
#inner-box2::-webkit-scrollbar-thumb {
    background-color: #333;
    border-radius: 2px
}

#size input[type="checkbox"] {
    visibility: hidden
}

#size input[type='checkbox']:checked {
    background-color: #16c79a;
    border: none
}

#size .btn.btn-success {
    background-color: #ddd;
    color: #333;
    border: none;
    width: 40px;
    font-size: 0.8rem;
    border-radius: 0
}

#size .btn.btn-success:hover {
    background-color: #aff1e1;
    color: #444
}

#size .btn-success:not(:disabled):not(.disabled).active,
#size .btn-success:not(:disabled):not(.disabled):active {
    background-color: #16c79a;
    color: #fff
}

#size label {
    margin: 10px;
    margin-left: 0px
}

.middle {
    position: relative;
    width: 100%;
    margin-top: 25px
}


input[type=range] {
    position: absolute;
    pointer-events: none;
    z-index: 2;
    height: 10px;
    width: 90%;
    opacity: 0
}

input[type=range]::-webkit-slider-thumb {
    pointer-events: all;
    width: 30px;
    height: 30px;
    border-radius: 0;
    border: 0 none;
    background-color: red;
}

.thumb-wrapper {
    padding: 25px 15px;
    background: #fff;
    border-radius: 6px;
    text-align: center;
    position: relative;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    width: 95%;
}

.thumb-wrapper .img-box {
    height: 190px;
    margin-bottom: 20px;
    width: 100%;
    position: relative;
}

.thumb-wrapper img {
    max-width: 100%;
    max-height: 100%;
    display: inline-block;
    position: absolute;
    bottom: 0;
    margin: 0 auto;
    left: 0;
    right: 0;
}

.thumb-wrapper h4 {
    font-size: 18px;
}

.thumb-wrapper h4,
.thumb-wrapper p,
.thumb-wrapper ul {
    margin-bottom: 5px;
}

.thumb-wrapper .thumb-content h4 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    text-align: justify;

}

.thumb-wrapper .thumb-content .btn {
    color: #7ac400;
    font-size: 11px;
    text-transform: uppercase;
    font-weight: bold;
    background: none;
    border: 1px solid #7ac400;
    padding: 6px 14px;
    margin-top: 5px;
    line-height: 16px;
    border-radius: 20px;
}

.thumb-wrapper .thumb-content .btn:hover,
.thumb-wrapper .thumb-content .btn:focus {
    color: #fff;
    background: #7ac400;
    box-shadow: none;
}
</style>