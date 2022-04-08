import router from '@system.router';
export default {
    data: {
        paragraphFirst: '  我们随机生成m*n维数据，第一维代表样本的个数，第二维代表每个样本的维数。',
        m: 7,
        n: 5,
        after: 3,
    },
    change_x(e) {
        this.m = 4;  //e.value
    },
    change_y(e) {
        this.n = 3;
    },
    change_after(e) {
        this.after = 2;
    },
    launch() {
        router.push ({
            uri: 'pages/pca_out_rand/pca_out_rand',
            params: {
                data1: rnd(this.m, this.n),
                after: this.after,
            },
        });
    }
}

function rnd(m,n){
    const data = new Array(m);
    for (var index = 0; index < m; index++) {
        data[index] = new Array(n);
    }
    for (var i = 0;i < m;i++){
        for (var j=0;j < n;j++){
            data[i][j] = Math.round(Math.random()*100);
        }
    }
    return data;
}
