const { PCA } = require('ml-pca');
const { Matrix } = require('ml-matrix');
export default {
    data : {
        paragraphFirst: '  我们用热力图展示降维结果，上面是原始数据，下面是降维后的结果。',
        color: ["#ffffd9", "#edf8b1", "#daf8b1", "#b6e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58", "#330858"],
    },
    onShow() {
        const el = this.$refs.canvas;
        const ctx = el.getContext('2d');
        const m = this.data1.length;
        const n = this.data1[0].length;
        const d_after = this.after;



        const a = 300/(n+2);
        var before_pca = new Matrix(this.data1); //矩阵化
        var max = this.data1[0][0];
        var min = this.data1[0][0];
        for (var i = 0; i < m; i++) {
            for (var j = 0; j < n; j++) {
                max = Math.max(max, this.data1[i][j]);
                min = Math.min(min, this.data1[i][j]);
            }
        }
        var temp = Matrix.ones(m,n);
        temp = temp.mul(min); //构建最小矩阵
        var before_pca_scale = Matrix.sub(before_pca, temp); //减去最小值
        before_pca_scale.div(max-min); // 除以最值的差
        for (var i = 0; i < m; i++) {
            for(var j = 0; j < n; j++){
                ctx.fillStyle = this.color[parseInt(10*before_pca_scale.data[i][j])];
                ctx.fillRect(a+a*j,25+a*i,a,a);
            }
        }
        const pca = new PCA(this.data1);
        var newPoints = Array(d_after);
        const evec = pca.getEigenvectors();

        for(var i =0; i<d_after; i++)
        {
            newPoints[i] = evec.data[i];
        }
        var eigenvec = new Matrix(newPoints);

        var after_pca = before_pca.mmul(eigenvec.transpose())

        max = after_pca.data[0][0];
        min = after_pca.data[0][0];
        for (var i = 0; i < m; i++) {
            for (var j = 0; j < d_after; j++) {
                max = Math.max(max, after_pca.data[i][j]);
                min = Math.min(min, after_pca.data[i][j]);
            }
        }
        var ones = Array(m);
        var one = Array(d_after);
        for(var i=0;i<m;i++){
            for(var j=0;j<d_after;j++){
                one[j] = 1;
            }
            ones[i] = one;
        }
        var temp1 = new Matrix(ones);
        temp1 = temp1.mul(min); //构建最小矩阵
        var after_pca_scale = Matrix.sub(after_pca, temp1); //减去最小值
        after_pca_scale.div(max-min); // 除以最值的差
        for (var i = 0; i < m; i++) {
            for(var j = 0; j < d_after; j++){
                ctx.fillStyle = this.color[parseInt(10*after_pca_scale.data[i][j])];
                ctx.fillRect(a+a*j,m*a+50+a*i,a,a);
            }
        }
    },
}
