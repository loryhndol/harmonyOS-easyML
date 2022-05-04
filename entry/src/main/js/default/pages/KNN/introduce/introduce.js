//导入router模块，页面路由router根据页面的uri来找到目标页面，从而实现跳转
import router from '@system.router';

export default {
    data: {
        title: "knn分类",
        introduce: "K最邻近（KNN，K-NearestNeighbor）分类算法是数据挖掘分类技术中最简单的方法之一。" +
        "所谓K最近邻，就是K个最近的邻居的意思，说的是每个样本都可以用它最接近的K个邻近值来代表。"+
        "近邻算法就是将数据集合中每一个记录进行分类的方法"
    },
    launch() {
        router.push ({
            uri:'pages/KNN/knn/knn', // 指定要跳转的页面
        })
    }
}
