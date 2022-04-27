const { PCA } = require('ml-pca');
const { Matrix } = require('ml-matrix');
import {evaluate_cmap} from '../../../js-colormaps.js';
import {fillRoundRect} from '../../../utils/fillRoundRect.js';
import router from '@system.router';

export default {
    data: {
        paragraphFirst: '',
        color: ["#ffffd9", "#edf8b1", "#daf8b1", "#b6e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58", "#330858"],
    },
    onShow() {
        const el = this.$refs.canvas;
        const ctx = el.getContext('2d');
        let obj = this.$refs.canvas.getBoundingClientRect();

        let width = obj.width;
        let height = obj.height;

        const m = this.data1.length;
        const n = this.data1[0].length;
        console.info(this.jumpSign === false);
        const d_after = this.after;
        this.after_height = d_after.length;
        this.after_width = d_after[0].length;

        this.table_height = this.data1.length;
        this.table_width = this.data1[0].length;

        let cell_size = (Math.min(width, height) - 5 * 2) / (this.table_height * 2) + 1;
        console.info('width:' + this.table_width);
        console.info('height:' + this.table_height);
        let table_padding_x = (width - 50 * 2 - (cell_size + 2) * this.table_width) / 2; // container的padding考虑在内
        let table_padding_y_upper = 20
        let table_padding_y_lower = 200;

        this.before_pca = new Matrix(this.data1); //矩阵化
        console.info(this.data1);
        var max_val = this.before_pca.max()
        var min_val = this.before_pca.min();

        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                let normalized_data = (this.before_pca.data[i][j] - min_val) / (max_val - min_val);
                console.info(normalized_data);
                let rgb_array = evaluate_cmap(normalized_data, 'viridis', false);
                let fillColor = 'rgb(' + rgb_array[0] + ',' + rgb_array[1] + ',' + rgb_array[2] + ')';
                fillRoundRect(ctx, table_padding_x + j * (cell_size + 2), table_padding_y_upper + i * (cell_size + 2), cell_size, cell_size, 4, fillColor);
            }
        }

        const pca = new PCA(this.data1);
        const newPoints = Array(d_after);
        const evec = pca.getEigenvectors();
        for (let i = 0; i < d_after; i++) {
            newPoints[i] = evec.data[i];
        }
        var eigenvec = new Matrix(newPoints);
        this.after_pca = this.before_pca.mmul(eigenvec.transpose())
        max_val = this.after_pca.max();
        min_val = this.after_pca.min();

        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                let normalized_data = (this.after_pca.data[i][j] - min_val) / (max_val - min_val);
                let rgb_array = evaluate_cmap(normalized_data, 'viridis', false);
                let fillColor = 'rgb(' + rgb_array[0] + ',' + rgb_array[1] + ',' + rgb_array[2] + ')';
                fillRoundRect(ctx, table_padding_x + j * (cell_size + 2), table_padding_y_lower + i * (cell_size + 2), cell_size, cell_size, 4, fillColor);
            }
        }


    },
    handleClick() {
        if (this.after === '2') {
            router.push({
                uri: 'pages/PCA/pca_3d/pca_3d',
                params: {
                    before_pca: this.before_pca.to2DArray(),
                    after_pca: this.after_pca.to2DArray()
                }
            });
        } else if (this.n === '2' && this.after === '1') {
            router.push({
                uri: 'pages/PCA/pca_2d/pca_2d',
                params:{
                    before_pca: this.before_pca.to2DArray(),
                    after_pca: this.after_pca.to2DArray()
                }
            });
        }


    }
}
