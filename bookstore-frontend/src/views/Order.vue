<template>
    <div id="bg-white" class="bg-white article cach radius">
        <div id="flex-donhang">
            <div id="chitiet">
                <h1>ĐẶT HÀNG</h1>
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
                            <td><i @click="removeOrder(book.book_id)" class="fa-solid fa-trash-can"></i></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="hoadon" class="radius">
                <h1 class="radius bg-white">HÓA ĐƠN</h1>
                <table>

                    <tbody id="details-order-foot">
                        <tr class="">
                            <td class="">Địa chỉ: </td>
                            <td class="" id="totalprice" colspan="6">
                                <input type="text" v-model="this.order.address">
                            </td>
                        </tr>
                        <tr class="">
                            <td class="">Tổng giá trị:</td>
                            <td class="" id="totalprice" colspan="6">{{ formatter(userStore.totalPriceOrderComputer) }}
                            </td>
                        </tr>
                        <tr class="">
                            <td class="" colspan="2">(Thanh toán bằng tiền mặt và tự thanh toán phí ship khi nhận hàng.)
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr id="sm-donhang" class="">
                            <td colspan="2"><input @click="order()" class="radius" type="submit" value="Đặt Hàng"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>

    </div>
</template>

<script>
import { useUserStore } from "../stores/UserStore";
import OrderService from "../services/order.service";
import AuthService from "../services/auth.service";
export default {
    setup() {
        const books = useUserStore().order.products;
        const order = useUserStore().order;
        const userStore = useUserStore()
        return {
            books,
            order,
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
            console.log(this.order)
            this.order.totalPriceOrderComputer()
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
        async order() {
            var today = new Date();
            var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date + ' ' + time;
            console.log(await OrderService.addOrder({
                address: this.order.address,
                products: this.order.products,
                totalPrice: this.userStore.totalPriceOrderComputer,
                time: dateTime,
                status: false,
                user: this.userStore.user.id
            }));
            alert("Đặt hàng thành công! Xem chi tiết đơn hàng đã đặt trong Tài Khoản -> Lịch sử mua hàng.")
            this.order.products.forEach(p=>{
                this.userStore.removeCart(p.book_id)
            })
            this.userStore.setUserInfo(await AuthService.verifyToken());
            this.$router.push({name: 'card'})
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
            console.log(this.order.address)
            if(!this.order.totalPrice){
                this.$router.push({ name: "card"});
            }
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
        removeOrder(id) {
            useUserStore().removeOrder(id);
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
    width: 90%;
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
    width: 90%;
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