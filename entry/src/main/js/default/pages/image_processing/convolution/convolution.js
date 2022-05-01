import router from '@system.router';
import {cat} from '../../../utils/cat.js';
import {evaluate_cmap} from '../../../js-colormaps.js';


export default {
    data: {
        title: 'World',
        res: [],
        conv_kernel: [
            [-0.5, 0, 1],
            [0, -0.1, 0.3],
            [1, 0.3, 0.1],
        ],
        conv_res: []
    },
    ReLU(x){
        return Math.max(0,x);
    },
    onInit() {
        this.reshape(cat);
        this.conv(cat);
    },
    onShow() {
        this.draw_pic(this.conv_res);
    },
    reshape(img) {
        const m = img.length;
        const n = img[0].length;

        let scale_col = n / 32;
        console.info(scale_col);
        for (let i = 0; i < 32; i++) {
            let row = []
            let avg = 0
            for (let j = 0; j < n; j++) {
                avg += img[i][j];
                avg /= scale_col;
                if (j % scale_col === scale_col - 1) {
                    row.push(avg);
                    avg = 0;
                }
            }
            this.res.push(row);
        }
    },
    conv(img) {
        for (let i = 0; i < 28; i++) {
            let row = [];
            let t = 0.0;
            for (let j = 0; j < 28; j++) {
                let kernel_r = 0;
                let kernel_c = 0;
                t=0.0;
                for (let row_index = j; row_index < j + 3; row_index ++) {
                    kernel_c = 0;
                    for (let col = j; col < j + 3; col ++) {
                        t += this.res[row_index][col] * this.conv_kernel[kernel_r][kernel_c];
//                        console.info('row:' + row_index + ', col:' + col + ', val:' + t +',img:'+this.res[row_index][col]);
                        kernel_c++;
                    }
                    kernel_r++;
                }
                row.push(t);
//                console.info(t);
            }
//            console.info(JSON.stringify(row));
            this.conv_res.push(row);
        }
    },
    draw_pic(img) {
        const el = this.$refs.canvas;
        const ctx = el.getContext('2d');
        let obj = this.$refs.canvas.getBoundingClientRect();

        let width = obj.width;
        let height = obj.height;

        const m = img.length;
        const n = img[0].length;

        this.table_height = img.length;
        this.table_width = img[0].length;

        let cell_size = 8; // 图像长边像素数最好为256，此时cell_size=1
        console.info('width:' + this.table_width);
        console.info('height:' + this.table_height);

        let min_val = img[0][0];
        let max_val = img[0][0];

        for(let i = 0; i < m; i++){
            for(let j = 0; j < n; j++){
                min_val = Math.min(min_val, img[i][j]);
                max_val = Math.max(max_val, img[i][j]);
            }
        }


        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                let normalized = (img[i][j] - min_val) / (max_val - min_val);
                let rgb_array = evaluate_cmap(normalized , 'viridis', false);
                let fillColor = 'rgb(' + rgb_array[0] + ',' + rgb_array[1] + ',' + rgb_array[2] + ')';
                ctx.fillStyle = fillColor;
                ctx.fillRect(20 + j * cell_size, 80 + i * cell_size, cell_size, cell_size);
            }
        }
    },
    launchNext() {
        router.push({
            uri: 'pages/image_processing/image_processing'
        })
    },
    onMenuSelected(e) {
        if (e.value == "Item 1") {
            router.push({
                uri: 'pages/image_processing/histogram/histogram', // 指定要跳转的页面
            })
        }
        if (e.value == "Item 2") {
            router.push({
                uri: 'pages/image_processing/linear_transform/linear_transform', // 指定要跳转的页面
            })
        }
        if (e.value == "Item 3") {
            router.push({
                uri: 'pages/image_processing/convolution/convolution', // 指定要跳转的页面
            })
        }

    },
    onTextClick() {
        this.$element("apiMenu").show({
            x: 270, y: 330
        });
    },
}
