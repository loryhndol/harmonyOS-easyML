import router from '@system.router';
export default {
    data: {
        paragraphFirst: '随机生成m*n维数据，第一维代表样本的个数，第二维代表每个样本的维数。',
        m: '7',
        n: '5',
        after: '3',
        jumpSign: true,
    },
    change_x(e) {
        this.m = e.value;  //e.value
    },
    change_y(e) {
        this.n = e.value;
    },
    change_after(e) {
        this.after = e.value;
    },
    launch() {
        if (this.after === '1' && this.n !== '2') this.jumpSign = false;
        console.info('sign: ' + this.jumpSign);

        router.push ({
            uri: 'pages/PCA/pca_out_rand/pca_out_rand',
            params: {
                data1: rnd(this.m, this.n),
                after: this.after,
                jumpSign:this.jumpSign,
            },
        });
    }
}

function rnd(m,n){
    const max_num = 100;
    const min_num = -100;
    const data = new Array(m);
    for (var index = 0; index < m; index++) {
        data[index] = new Array(n);
    }
    for (var i = 0;i < m;i++){
        for (var j=0;j < n;j++){
            data[i][j] = Math.round(Math.random()*(max_num-min_num+1)+min_num);
        }
    }
    return data;
}
