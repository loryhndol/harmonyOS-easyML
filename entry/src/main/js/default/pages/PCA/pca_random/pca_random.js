import router from '@system.router';
export default {
    data: {
        paragraphFirst: '  我们随机生成m*n维数据，第一维代表样本的个数，第二维代表每个样本的维数。',
        m: 5,
        n: 3,
        after: 2,
    },
    change_x(e) {
        this.m = e.value;
    },
    change_y(e) {
        this.n = e.value;
    },
    change_after(e) {
        this.after = e.value;
    },
    launch() {
        const d_after = this.after;
        if(this.after>=this.n){
            console.warn("降维后的维数应小于原数据维数");
        }
        else{
            router.push ({
                uri: 'pages/pca_out_rand/pca_out_rand',
                params: {
                    data1: rnd(this.m, this.n),
                    after: d_after,
                },
            });
        }

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
