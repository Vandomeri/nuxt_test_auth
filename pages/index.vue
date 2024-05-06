<template>
   
    <div v-if="status === 'authenticated'">
        <button @click="logOut()">LOOUT</button>
    </div>
    <div v-else>
        <button @click="login()">LOdGIN</button>
    </div>
</template>

<script setup>
const { status, data, signIn, signOut } = useAuth()

async function login(){
    await signIn()
}

async function logOut(){
    await signOut()
}

</script>