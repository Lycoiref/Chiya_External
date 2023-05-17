<template>
    <div class="page">
        <div class="sign-card">
            <div class="background-img">
                <img :src="signBackground" alt="签到" />
            </div>
            <!-- 占位符 -->
            <div class="title"></div>
            <div class="content">
                <!-- 头像框 -->
                <div class="avater-warpper">
                    <div class="user-name">
                        {{ query.user_name ? query.user_name : '月晕' }}
                    </div>
                    <div>
                        <img id="avatar" @load="avatarLoaded = true" :src="query.user_avatar + '&spec=' + query.spec"
                            style="width: 150px; height: 150px; border-radius: 50%" />
                    </div>
                </div>
                <div class="shu">

                </div>
                <!--  info -->
                <div v-if="avatarLoaded" id="avatar-ok" class="text-content">
                    <div class="text-info">
                        <div clas="text-tittle">
                            当前好感度：{{ query.impression ? query.impression[0] : 0 }}
                        </div>
                        <div class="text-tittle">
                            好感度等级 0
                        </div>
                        <div class="text-tittle">
                            上次签到时间：{{ query.checkin_time_last_str ? query.checkin_time_last_str : "未知" }}
                        </div>
                    </div>
                    <div class="text-dayshow">
                        <div class="text-dayshow-big">
                            今日签到
                        </div>
                        <div class="text-tittle">
                            好感度 + {{ query.random_num ? query.random_num : 0 }}
                            <!-- 金币 + {{ query.random_num ? query.random_num : 0 }} -->
                        </div>
                        <!-- 好感度进度条 -->
                        <!-- <div class="progress">
              <div class="progress-bar" style="width: 50%"></div>
            </div> -->
                        <div class="text-tittle">
                            金币 + 114514
                        </div>
                        <div class="text-tittle">
                            连续签到 114514 天
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, onMounted, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import signBackground2 from "./bg2.jpg";
import signBackground3 from "./bg3.jpg";
import signBackground4 from "./bg4.png";

// signBackground中随机选择一个作为背景
const signBackground = [signBackground2, signBackground3, signBackground4][
    Math.floor(Math.random() * 3)
];

const avatarLoaded = ref(false);

// 进度条
const progress = ref(0);
// 显示进度条的功能

let query: any = ref({
    random_num: 0,
    checkin_time_last_str: "",
    impression: 0,
    user_avatar: "",
    user_name: "",
});
query = useRouter().currentRoute.value.query;
console.log(query);
let height = ref(0);
// onBeforeMount (()=>{
//     if (query.user_avatar == 'undefined') {
//         query.user_avatar = ''
//     } else {
//         // 请求图片的base64并在img中显示出来,使用axios
//         axios.get('http://q.qlogo.cn/headimg_dl?dst_uin=3514392356&spec=640').then(res => {
//             console.log(res)
//             query.user_avatar = res.data
//         })
//     }
//     console.log(query.user_avatar)
// })
onMounted(async () => {
    // 获取图片高度
    const img = document.querySelector(".background-img img");
    // console.log(img);

    height.value = img.clientHeight;
});
</script>

<style scoped>
@import "./sign.css";

.page {
    width: calc(100vw - 64px);
    height: 100vh;
    position: absolute;
    left: 64px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    /* scale: 0.3; */
    font-family: "CommonFont";
}

.sign-card {
    width: 80vw;
    height: 40vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    object-fit: cover;
    overflow: hidden;
    position: relative;
}

.background-img {
    position: absolute;
    width: 80vw;
    z-index: -1;
    display: flex;
    justify-content: center;
    object-fit: cover;
    overflow: hidden;
}

.background-img img {
    width: 100%;
    object-fit: cover;
}

.title {
    width: 100%;
    flex: 4;
}

.content {
    width: 100%;
    display: flex;
    flex: 6;
    /* font-weight: 700; */
    color: #000;
    background-color: rgba(255, 255, 255, 0.892);
    display: flex;
    align-items: flex-start;
}

.content .avater-warpper {
    padding: 10px 20px;
    /* background-color: red; */
    width: 18%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    height: 60%;
}

.content .avater-warpper #avatar {
    margin-top: 30px;
}

.content .avater-warpper .user-name {
    font-size: 35px;
    font-weight: 500;
    margin-top: 120px;
}

.shu {
    width: 3px;
    height: 70%;
    background-color: #000;
    opacity: 1;
    margin-left: 100px;
    margin: auto 0;
}

.content .text-content {
    margin: auto 0;
    height: 70%;
    display: flex;
    /* flex: 1; */
    align-items: center;
    justify-content: space-evenly;
    width: 75%;
}

.content .text-content .text-info {
    width: 40%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.content .text-content .text-dayshow {
    width: 40%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.content .text-content .text-info .text-tittle {
    font-size: 20px;
    font-weight: 500;
    margin-top: 20px;
}


.content .text-content .text-dayshow .text-dayshow-big {
    font-size: 40px;
    font-weight: 500;
}

.content .text-content .text-dayshow .text-tittle {
    /* margin-right: 50px; */
    margin-top: 20px;
    /* color: red; */
    margin-left: 50px;

}</style>
