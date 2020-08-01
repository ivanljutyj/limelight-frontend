<template>
    <div class="shop">
        <div class="content">
            <div class="products">
                <div class="product" v-for="product in products" v-if="product.active">
                    <div class="product__title">{{ product.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        async asyncData({ app }) {
            // let { data } = await app.$axios({ url: 'products', baseURL: 'http://localhost:1337' })
            // return { products: data }
        },
        async mounted() {
            console.log(this.products)
        }
    }
</script>

<style lang="scss" scoped>
    .products {
        .product {
            &__title {
            }
        }
    }
</style>