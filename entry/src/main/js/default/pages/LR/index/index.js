//导入router模块，页面路由router根据页面的uri来找到目标页面，从而实现跳转
import router from '@system.router';

export default {
    data: {
        title: "线性回归(Linear-Regression)"
    },
    onInit() {
//        this.title = this.$t('strings.world');
    },
    launch() {
        router.push ({
            uri:'pages/LR/introduce/introduce', // 指定要跳转的页面
        })
    }
}