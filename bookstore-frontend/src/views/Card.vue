<template>
    <div id="bg-white" class="bg-white article cach radius">
        <div id="flex-donhang">
            <div id="chitiet">
                <h1>GIỎ HÀNG</h1>
                <table id="details-order">
                    <thead>
                        <tr>
                            <td> <b>Hình SP</b> </td>
                            <td><b>Tên SP</b></td>
                            <td><b>Số Lượng</b></td>
                            <td><b>Giá</b></td>
                            <td><b>Thành Tiền</b></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody id="details-order-body">
                        <tr v-for="(book, index) in books">
                            <td>
                                <router-link :to="{ name: 'book.detail', params: { id: book.book_id } }">
                                    <img :src="book.image" class="round-figure">
                                </router-link>
                            </td>
                            <td style="text-align: left;">
                                <router-link style="color: #000;"
                                    :to="{ name: 'book.detail', params: { id: book.book_id } }">
                                    {{ book.title }}
                                </router-link>
                            </td>
                            <td>
                                <div class="quantity-product">
                                    <div class="quantity-product-form"
                                        @click="book.quantity > 1 ? book.quantity-- : ''">
                                        <button><i class="fa-solid fa-minus"></i></button>
                                    </div>
                                    <input type="text" id="quantity" v-model="book.quantity">
                                    <div class="quantity-product-form" @click="book.quantity++">
                                        <button><i class="fa-solid fa-plus"></i></button>
                                    </div>
                                </div>
                            </td>
                            <td>{{ formatter(book.price) }}</td>
                            <td>{{ formatter(book.quantity * book.price) }}</td>
                            <td><i @click="removeCart(book.book_id)" class="fa-solid fa-trash-can"></i></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="hoadon" class="radius">
                <h1 class="radius bg-white">HÓA ĐƠN</h1>
                <table>

                    <tbody id="details-order-foot">
                        <tr class="">
                            <td class="">Tổng giá trị tạm tính: </td>
                            <td class="" id="totalprice" colspan="6">{{ formatter(userStore.totalPriceComputer) }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr id="sm-donhang" class="">
                            <td colspan="2"><input @click="cardToOrder()" class="radius" type="submit"
                                    value="Xác Nhận Đơn Hàng"></td>
                        </tr>
                        <tr>
                            <td colspan="2">Phải đăng nhập tài khoản trước khi Đặt hàng !</td>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </div>

    </div>
</template>

<script>
import { useUserStore } from "../stores/UserStore";
export default {
    setup() {
        const books = useUserStore().card.products;
        const card = useUserStore().card;
        const userStore = useUserStore()
        return {
            books,
            card,
            userStore
        }
    },
    data() {
        // let quantityList = [];
        // books.forEach(book => {
        //     quantityList.push(book.quantity);
        // })
        return {

        }
    },
    watch: {
        books(newV, oldV) {
            console.log(this.card)
            this.card.totalPriceComputer()
        }
    },
    computed: {
        // updateQuantity() {
        //     let totalPrice = 0;
        //     this.books.forEach((book) => {
        //         totalPrice += book.price * book.quantity;
        //     })
        //     this.card.totalPrice = totalPrice;
        //     return 1;
        // }
    },
    watch: {
        // books() {
        //     console.log("change....")
        //     return useUserStore().card.products;
        // }

    },
    methods: {
        cardToOrder() {
            if(!this.userStore.user){
                document.getElementById("Modaldangnhap").style.display = "block";
            } else{

                const products = JSON.stringify(this.userStore.card.products);
                const totalPrice = JSON.stringify(this.userStore.card.totalPrice) ;
                const address = JSON.stringify(this.userStore.user.address) ;
                this.userStore.order = {
                    products: JSON.parse(products) ,
                    totalPrice:JSON.parse(totalPrice) ,
                    address:JSON.parse(address) 
                };
                // this.userStore.order.status = false;
                this.$router.push({ name: "order" });
            }
        },
        goDetailItem(id) {
            this.$router.push({ name: "book.detail", params: { id: id } });
        },
        // updateQuantity(index) {
        //     console.log("updateQuantity")
        //     this.card.totalPrice += (this.quantityList[index] - this.books[index].quantity) * this.books.price;
        //     this.books[index].quantity = this.quantityList[index]
        // },
        showCart() {
            // this.books = [];
            // this.totalCost = 0;
            // for (let i = 0; i < localStorage.length; i++) {
            //     let book = {};
            //     book.id = window.localStorage.key(i);
            //     const value = JSON.parse(window.localStorage.getItem(book.id));
            //     book.image = value.image;
            //     book.title = value.title;
            //     book.price = parseInt(value.price);
            //     book.quantity = parseInt(value.quantity);
            //     book.cost = book.price * book.quantity;
            //     this.totalCost += book.cost;
            //     this.books.push(book);
            // }
            // console.log(this.books)
        },
        removeCart(id) {
            useUserStore().removeCart(id);
        },

        formatter(par) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(par);
        },

    },
    mounted() {
        this.showCart();
    },
    create() {

    }
}
</script>

<style scoped>
/* Don Hang */


.quantity-product {
    display: flex;
    padding: 0 10px 0 15px;
}

.quantity-product label {
    margin-right: 10px;
}

#quantity {
    margin-left: 1px;
    margin-right: 1px;
    width: 30px;
    text-align: center;
}

#details-order {
    text-align: center;
}

#details-order td,
#details-order tr {
    border-bottom: 1px solid rgb(231, 232, 233);
    font-size: 18px;
    width: fit-content;
}

#totalprice,
#discount,
#tax,
#totalcost {
    text-align: right;
}

#flex-donhang {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

#chitiet {
    width: 72%;
    border-radius: 10px;
    padding: 20px 0;
}

#chitiet,
#chitiet *,
#hoadon,
#hoadon *,
#details-order,
#details-order * {
    background-color: white;
}

#chitiet table {
    width: 100%;
    border: 0.5px solid rgb(231, 232, 233);
}

#details-order,
#chitiet h1,
#hoadon h1,
#sm-donhang input {
    text-align: center;
    border-radius: 10px;
}

.round-figure {
    max-width: 130px;
    margin: 10px;
}

#hoadon {
    width: 25%;
    padding: 20px 0;
}

#hoadon table {
    margin: auto;
    width: 85%;
}

#hoadon table tr,
#hoadon table td {
    text-align: left;
    line-height: 2.5;
    border-bottom: 1px solid rgb(231, 232, 233);
    font-size: 18px;
    font-weight: 600;
}

#sm-donhang input {
    font-weight: bold;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    color: rgb(231, 232, 233);
    font-size: 18px;
    background-color: #0d6efd;
}
</style>