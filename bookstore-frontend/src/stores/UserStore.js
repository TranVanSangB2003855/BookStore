import { defineStore, acceptHMRUpdate } from "pinia";
import CardService from "../services/card.service";
import AuthService from "../services/auth.service";

export const useUserStore = defineStore("UserStore",{
    state: () => {
        return{
            user: null,
            card: {
                products: [],
                totalPrice: 0
            },
            order: {
                products: [],
                totalPrice: 0
            },
        }
    },
    getters: {
        totalPriceComputer(){
            console.log("totalPriceComputer")
            let total = 0; 
                this.card.products.forEach(p => {
                    total += p.quantity * p.price;
                })
            this.card.totalPrice = total;
            const b = this.watchCard;
            if(total){
                window.localStorage.setItem('card-info', JSON.stringify(this.card));
            }
            return total;
        },
        totalPriceOrderComputer(){
            console.log("totalPriceOrderComputer")
            let totalX = 0; 
                this.order.products.forEach(p => {
                    totalX += p.quantity * p.price;
                })
            this.order.totalPrice = totalX;
            // const b = this.watchOrder;
            return totalX;
        },
        checkLogin(state) {
            console.log("totalPriceComputer")
            if (state.user !== null) return true;
            return false;
        },
        getUserInfo(state) {
            console.log("getUserInfo")
            if (state.user !== null) {
                return state.user;
            }
            return '';
        },
        infoCard(state) {
            console.log("infoCard")
            if (state.card.totalPrice === 0) return "";
            return state.card;
        },
        infoUser(state) {
            console.log("infoUser")
            if (state.user === null) return "";
            return state.user;
        },
        
        watchCard(state) {
            console.log("watchCard")
            const a = state.card + 1;
            try {
                console.log("chay ne....")
                if (state.user) {
                    let newCard = {
                        products: [],
                        user: state.user.id,
                        totalPrice: state.card.totalPrice
                    };
                    state.card.products.forEach((product) => {
                        newCard.products.push({
                            book_id: product.book_id,
                            quantity: product.quantity,
                            price: product.price
                        })
                    })
                    console.log(CardService.updateCart(state.user.card._id, JSON.stringify(newCard)));
                }
            }
            catch (e) {
                alert((e.response.data.message));
            }
            return state.card
        },
        addDataCardFromMongoDB(state) {
            console.log("addDataCardFromMongoDB")
            let a = state.user;
            const b = JSON.parse(window.localStorage.getItem('first-login'));
            if (state.user !== null && b === 1) {
                if (typeof (localStorage) !== 'undefined') {
                    window.localStorage.setItem('first-login', 0);
                }
                console.log(state.user.card.products)
                state.user.card.products.forEach((productDB) => {
                    let daCo = false;
                    state.card.products.forEach((product) => {
                        if (product.book_id === productDB.book_id) {
                            product.quantity += productDB.quantity;
                            daCo = true;
                        }
                    })
                    if (!daCo) {
                        state.card.products.push({
                            book_id: productDB.book_id,
                            quantity: productDB.quantity,
                            price: productDB.price,
                            title: productDB.title,
                            image: productDB.image
                        })
                    }
                })
                state.card.totalPrice += state.user.card.totalPrice;
                window.localStorage.setItem('card-info', JSON.stringify(this.card));
            }
            return state.card;
        },
    },
    actions: {
        addOrder() {
            console.log("addOrder")
            try {
                console.log("chay ne....")
                if (this.user.order) {
                    let newOrder = {
                        products: [],
                        user: this.user.id,
                        totalPrice: this.order.totalPrice
                    };
                    this.order.products.forEach((product) => {
                        newOrder.products.push({
                            book_id: product.book_id,
                            quantity: product.quantity,
                            price: product.price
                        })
                    })
                    console.log(OrderService.updateCart(this.user.order._id, newOrder));
                }
            }
            catch (e) {
                alert((e.response.data.message));
            }
        },
        async signOut(){
            await AuthService.signOut();
            window.localStorage.removeItem('card-info')
            window.localStorage.removeItem('first-login')
            this.user = null;
            this.card = {
                products: [],
                totalPrice: 0
            }
            location.reload();
        },
        updateInfoUser(data){
            console.log(AuthService.updateInfoUser(this.user.id,data));
            this.user.full_name = data.full_name;
            this.user.address = data.address;
        },
        changePassword(data){
            console.log(AuthService.changePassword(this.user.id,data))
        },
        setInfoCard() {
            console.log("setInfoCard")
            if (typeof (localStorage) !== 'undefined') {
                if (typeof localStorage['card-info'] !== 'undefined') {
                    this.card = JSON.parse(window.localStorage.getItem('card-info'))
                }
            }
            else {
                alert('Trình duyệt của bạn không hỗ trợ localStorage. Hãy nâng cấp trình duyệt để sử dụng!');
            }
        },
        setUserInfo(userInfo) {
            console.log("setUserInfo")
            // if (this.user === null) this.user = null;
            // if(userInfo)
                this.user = userInfo;
            this.setInfoCard();
        },
        addToCart(book) {
            console.log("addToCart")
            if (this.card.totalPrice === 0) {
                this.card.products.push(book)
            }
            else {
                let tempt = this.card.products.filter((product) => {
                    return product.book_id === book.book_id;
                })
                if (tempt.length === 0) {
                this.card.products.push(book)
                }
                else {
                    this.card.products.forEach((product, index) => {
                        if (product.book_id === book.book_id) {
                            product.quantity = parseInt(product.quantity)
                            book.quantity = parseInt(book.quantity)
                            product.quantity += book.quantity;
                        }
                    })
                }
            }
            this.card.totalPrice += book.quantity * book.price;
            if (typeof (localStorage) !== 'undefined') {
                window.localStorage.setItem('card-info', JSON.stringify(this.card));
            }
            else {
                alert('Trình duyệt của bạn không hỗ trợ localStorage. Hãy nâng cấp trình duyệt để sử dụng!');
            }
        },
        removeCart(id) {
            console.log("removeCart")
            let p;
            this.card.products.forEach((product, index) => {
                if (product.book_id === id) {
                    p = index;
                    this.card.totalPrice -= parseInt(product.price) * parseInt(product.quantity);
                }
            })
            this.card.products.splice(p, 1);
            let a = this.watchCard;
            window.localStorage.setItem('card-info', JSON.stringify(this.card));
        },
        removeOrder(id) {
            console.log("removeOrder")
            let p;
            this.order.products.forEach((product, index) => {
                if (product.book_id === id) {
                    p = index;
                    this.order.totalPrice -= parseInt(product.price) * parseInt(product.quantity);
                }
            })
            this.order.products.splice(p, 1);
        }
    }
})

// if (import.meta.hot) {
//     import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
// }