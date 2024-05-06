<template>
    <div>

        <div v-for="product in data" :key="product.id">
            <img :src="product.images[0]" alt="">
            <p>{{ product.title }}</p>
            <p>{{ product.description }}</p>
        </div>

    </div>
</template>

<script setup>

const { data: products } = await useFetch('https://dummyjson.com/products/1')
const data = [products.value]
</script>