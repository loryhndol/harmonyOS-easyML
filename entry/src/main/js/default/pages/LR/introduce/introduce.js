//导入router模块，页面路由router根据页面的uri来找到目标页面，从而实现跳转
import router from '@system.router';

export default {
    data: {
        title: "线性回归",
        introduce: "线性回归是利用数理统计中回归分析,来确定两种或两种以上变量间相互依赖的定量关系的一种统计分析方法" +
        "表达形式为 y = wx+e,e为服从均值为0的正态分布的误差值"
    },
    launch() {
        router.push ({
            uri:'pages/LR/linear_regression/linear_regression', // 指定要跳转的页面
        })
    }
}
