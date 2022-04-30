import router from '@system.router';
import {cat} from '../../../utils/cat.js';
import {evaluate_cmap} from '../../../js-colormaps.js';


export default {
    data: {
        title: 'World',
        rows: 418,
        cols: 627
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
        console.info('width:' + this.table_width);
        console.info('height:' + this.table_height);


        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                let rgb_array = evaluate_cmap(img[i][j], 'viridis', false);
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
            router.push ({
                uri:'pages/image_processing/histogram/histogram', // 指定要跳转的页面
            })
        }
        if (e.value == "Item 2") {
            router.push ({
                uri:'pages/image_processing/linear_transform/linear_transform', // 指定要跳转的页面
            })
        }
        if (e.value == "Item 3") {
            router.push ({
                uri:'pages/image_processing/convolution/convolution', // 指定要跳转的页面
            })
        }

    },
    onTextClick() {
        this.$element("apiMenu").show({
            x: 270, y: 330
        });
    },
}
