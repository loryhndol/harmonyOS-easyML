import router from '@system.router';
export default {
    data: {
        paragraphFirst: '  PCA(Principal Component Analysis)，即主成分分析方法，是一种使用最广泛的数据降维算法。PCA的主要思想是将n维特征映射到k维上，这k维是全新的正交特征也被称为主成分，是在原有n维特征的基础上重新构造出来的k维特征。PCA的工作就是从原始的空间中顺序地找一组相互正交的坐标轴，新的坐标轴的选择与数据本身是密切相关的。',
    },
    launch_random() {
        router.push ({
            uri: 'pages/PCA/pca_random/pca_random',
        });
    },
    launch_manual() {
        router.push ({
            uri: 'pages/PCA/pca_manual/pca_manual',
        });
    },
    launch_click() {
        router.push ({
            uri: 'pages/PCA/pca_click/pca_click',
        });
    },
}