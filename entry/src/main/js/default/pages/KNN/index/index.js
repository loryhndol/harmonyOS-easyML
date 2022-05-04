
//导入router模块，页面路由router根据页面的uri来找到目标页面，从而实现跳转
import router from '@system.router';

export default {
    data: {
        title: "KNN(K-NearestNeighbor)"
    },
    onInit() {

    },
    launch() {
        router.push ({
            uri:'pages/KNN/introduce/introduce', // 指定要跳转的页面
        })
    }
}