<template>
    <div class="page">
        <div class="sign-card">
            <div class="title">
            </div>
            <div class="content">
                大吉
                <div class="text-content">
                    <div class="text1">
                        <div class="little-text">
                            诸事皆宜
                        </div>
                        <div class="little-text">
                            利东南
                        </div>
                    </div>
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
    width: 30vw;
    height: 40vw;
    display: flex;
    align-items: center;
    flex-direction: column;
    /* border: 1px solid #484bff; */
    background-image: url(./bg1.jpg);
    background-size: 100% 100%;
}

.content {
    font-size: 6vw;
    font-weight: 700;
    color: #f00;
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
