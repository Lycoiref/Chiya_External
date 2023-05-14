<template>
    <div class="page">
        <div class="sign-card">
            <div class="background-img">
                <img :src="signBackground" alt="签到">
            </div>
            <div class="title">
            </div>
            <div class="content">
                签到成功
                <div class="text-content">
                    <div class="text2">
                        <div class="little-text horizon-text">
                            好感度 + {{ query.random_num }}
                        </div>
                        <div class="little-text horizon-text">
                            上次签到时间：{{ query.checkin_time_last_str }}
                        </div>
                        <div class="little-text horizon-text">
                            当前好感度：{{ query.impression }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import signBackground from './bg2.jpg'


let query: any = ref({
    random_num: 0,
    checkin_time_last_str: '',
    impression: 0,
})
query = useRouter().currentRoute.value.query
console.log(query)
</script>

<style scoped>
.page {
    width: calc(100vw - 64px);
    height: 100vh;
    position: absolute;
    left: 64px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

.sign-card {
    width: 80vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    object-fit: cover;
}

.background-img {
    width: 100%;
    z-index: -1;
    display: flex;
    justify-content: center;
    object-fit: cover;
}

.background-img img {
    width: 100%;
    object-fit: cover;
}

.content {
    position: absolute;
    font-size: 6vw;
    font-weight: 700;
    color: #fff;
}

.little-text {
    font-size: 1vw;
    color: #484bff;
    writing-mode: vertical-lr;
}

.text-content {
    display: flex;
}

.horizon-text {
    writing-mode: horizontal-tb;
}
</style>
