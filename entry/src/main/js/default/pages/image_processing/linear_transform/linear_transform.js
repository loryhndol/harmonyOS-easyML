import router from '@system.router';
import {cat} from '../../../utils/cat.js';
import {evaluate_cmap} from '../../../js-colormaps.js';


export default {
    data: {
        title: 'World',
        bias: 0,
        weight: 1.0,
    },
    onShow() {
        this.draw_pic(cat);
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

        let cell_size = 4; // 图像长边像素数最好为256，此时cell_size=1


        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                let t = img[i][j] + this.bias;
                t = t * this.weight;
                let rgb_array = evaluate_cmap(Math.max(0,Math.min(t,1.0)), 'viridis', false);
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
    set_bias(e) {
        if (e.mode == "start") {
            this.bias = this.toDecimal(e.value / 800);
        } else if (e.mode == "move") {
            this.bias = this.toDecimal(e.value / 800);
        } else if (e.mode == "end") {
            this.bias = this.toDecimal(e.value / 800);
        }
        this.onShow();
    },
    set_weight(e) {
        if (e.mode == "start") {
            this.weight = this.toDecimal(e.value / 30);
        } else if (e.mode == "move") {
            this.weight = this.toDecimal(e.value / 30);
        } else if (e.mode == "end") {
            this.weight = this.toDecimal(e.value / 30);
        }
        this.onShow();
    },
    toDecimal(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return;
        }
        f = Math.round(x * 1000) / 1000;
        return f;
    },
}
