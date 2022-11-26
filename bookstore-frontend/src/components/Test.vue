<script>
export default {
    props: {
        thieuNhiBooks: {type: Array, required: true},
        category: {type: String, required: true},
        id: {type: String, required: true}
    },
}

</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <h2> SÁCH {{category}} </h2>
                <div :id="'myCarousel'+id" class="carousel slide" data-ride="carousel" data-interval="0">
                    <ol class="carousel-indicators">
                        <li data-ta:rget="'#myCarousel'+id" data-slide-to="0" class="active"></li>
                        <li data-ta:rget="'#myCarousel'+id" data-slide-to="1"></li>
                        <li data-ta:rget="'#myCarousel'+id" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner" v-if="thieuNhiBooks[0][0]">
                        <div class="item carousel-item" v-for="(items, id) in thieuNhiBooks" :key="id" :class="{ active: id === 0 }">
                            <div class="row">
                                <div class="col-md-3" v-for="i in items" :key="i">
                                    <div class="thumb-wrapper"> 
                                        <div class="img-box">
                                            <img :src="i.image[0]"
                                                class="img-fluid">
                                        </div>
                                        <div class="thumb-content">
                                            <h4 :title="i.title">{{ i.title }}</h4>
                                            <p class="item-price">{{i.price}} đ</p> 
                                            <a href="#" class="btn btn-primary">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a class="carousel-control-prev left" :href="'#myCarousel'+id" role="button" data-slide="prev">
                        <i class="fa fa-chevron-left" aria-hidden="true"></i>
                    </a>
                    <a class="carousel-control-next right" :href="'#myCarousel'+id" role="button" data-slide="next">
                        <i class="fa fa-chevron-right" aria-hidden="true"></i>
                    </a>

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.fa-chevron-left {
    background-color: #78bf00;
    padding: 18px;
    margin-right: 10px;
    width: 48px;
    position: absolute;
    color: white;
    left: 0;
}

.fa-chevron-right {
    background-color: #7ac400;
    width: 48px;
    padding: 18px;
    margin-right: 10px;
    color: white;
    position: absolute;
    right: 0;
}

body {
    background: #e2eaef;
    font-family: "Open Sans", sans-serif;
}

h2 {
    color: #000;
    font-size: 26px;
    font-weight: 400;
    text-align: center;
    text-transform: uppercase;
    position: relative;
    margin: 30px 0 60px;
}

h2::after {
    content: "";
    width: 100px;
    position: absolute;
    margin: 0 auto;
    height: 4px;
    border-radius: 1px;
    background: #7ac400;
    left: 0;
    right: 0;
    bottom: -20px;
}

.carousel {
    margin: 50px auto;
    padding: 0 70px;
}

.carousel .item {
    color: #747d89;
    min-height: 360px;
    text-align: center;
    overflow: hidden;
}

.carousel .thumb-wrapper {
    padding: 25px 15px;
    background: #fff;
    border-radius: 6px;
    text-align: center;
    position: relative;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
}

.carousel .item .img-box {
    height: 190px;
    margin-bottom: 20px;
    width: 100%;
    position: relative;
}

.carousel .item img {
    max-width: 100%;
    max-height: 100%;
    display: inline-block;
    position: absolute;
    bottom: 0;
    margin: 0 auto;
    left: 0;
    right: 0;
}

.carousel .item h4 {
    font-size: 18px;
}

.carousel .item h4,
.carousel .item p,
.carousel .item ul {
    margin-bottom: 5px;
}

.carousel .thumb-content h4{
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    text-align: justify;

}

.carousel .thumb-content .btn {
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

.carousel .thumb-content .btn:hover,
.carousel .thumb-content .btn:focus {
    color: #fff;
    background: #7ac400;
    box-shadow: none;
}

.carousel .thumb-content .btn i {
    font-size: 14px;
    font-weight: bold;
    margin-left: 5px;
}

.carousel .carousel-control {
    height: 44px;
    width: 40px;
    background: #7ac400;
    margin: auto 0;
    border-radius: 4px;
    opacity: 0.8;
}

.carousel .carousel-control:hover {
    background: #78bf00;
    opacity: 1;
}

.carousel .carousel-control i {
    font-size: 36px;
    position: absolute;
    top: 50%;
    display: inline-block;
    margin: -19px 0 0 0;
    z-index: 5;
    left: 0;
    right: 0;
    color: #fff;
    text-shadow: none;
    font-weight: bold;
}

.carousel .item-price {
    font-size: 18px;
    margin-top: 15px;
    color: red;
    font-weight: 500;
    /* padding: 2px 0; */
}

.carousel .carousel-control.left i {
    margin-left: -2px;
}

.carousel .carousel-control.right i {
    margin-right: -4px;
}

.carousel .carousel-indicators {
    bottom: -50px;
}

.carousel-indicators li,
.carousel-indicators li.active {
    width: 10px;
    height: 10px;
    margin: 4px;
    border-radius: 50%;
    border: none;
}

.carousel-indicators li {
    background: rgba(0, 0, 0, 0.2);
}

.carousel-indicators li.active {
    background: rgba(0, 0, 0, 0.6);
}

.carousel .wish-icon {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 99;
    cursor: pointer;
    font-size: 16px;
    color: #abb0b8;
}

.carousel .wish-icon .fa-heart {
    color: #ff6161;
}

.star-rating li {
    padding: 0;
}

.star-rating i {
    font-size: 14px;
    color: #ffc000;
}
</style>