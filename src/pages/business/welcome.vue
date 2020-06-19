<template>
    <div class="welcome">
        <img src="../../assets/images/welcome.gif" alt="" id="img">
    </div>
</template>
<script>

export default {
    data() {
        return {

        }
    },
    mounted() {
        setTimeout(this.timeout, 5000);
    },
    methods: {
        timeout() {
            this.$router.push('/');
        }
    }
}
</script>>
<style lang="scss" scoped>

    .welcome {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        img {
            vertical-align: middle;
            width: 100%;
        }
    }
    
</style>