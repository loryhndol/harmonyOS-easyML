import router from '@system.router';
import prompt from '@system.prompt';
import {evaluate_cmap} from '../../js-colormaps.js';
import {fillRoundRect} from '../../utils/fillRoundRect.js';

export default {
    data: {
        title: '线性回归',
        //table_data就是我们要制作的表格数据
        table_data: [
            [1, 1, 2, 3, 5, 6, 7, 8, 9, 10],
            [1, 3, 2, 4, 5, 7, 5, 4, 2, 2],
            [3, 1, 4, 2, 5, 10, 4, 2, 3, 1],
            [2, 3, 1, 4, 5, 2, 1, 1, 1, 1],
            [5, 4, 1, 2, 1, 4, 2, 4, 3.2, 7],
            [0.1, 0.3, 2, 4, 5, 7, 5, 4, 3, 2],
            [3, 1, 4, 2, 5, 1, 4, 2, 3, 1],
            [2, 3, 1, 4, 5, 1, 2, 3, 1, 1],
            [5, 4, 3, 2, 1, 4, 2, 4, 3, 7],
            [3, 2, 5, 2, 0, 4, 2, 4, 3, 1]
        ],
        table_height: 0,
        table_width: 0,
        value: 0,
        startValue: 0,
        currentValue: 0,
        endValue: 0,
    },

    launch() {
        router.back();
    },
    onMenuSelected(e) {
        prompt.showToast({
            message: e.value
        })
        if (e.value == "Item 1") {
            this.launch()
        }
    },
    onTextClick() {
        this.$element("apiMenu").show({
            x: 270, y: 320
        });
    },
    onShow(){
        const el = this.$refs.canvas1;
        const ctx = el.getContext('2d');
        this.table_height = this.table_data.length;
        this.table_width = this.table_data[0].length;
        let cell_size = 24;
        let table_padding_x = (400 - 50 * 2 - (cell_size + 2) * this.table_width) / 2; // container的padding考虑在内
        let table_padding_y = (400 - 10 * 2 - (cell_size + 2) * this.table_height) / 2;


        for (let i = 0; i < this.table_data.length; i++) { // col
            let innerArrayLength = this.table_data[i].length;
            for (let j = 0; j < innerArrayLength; j++) { // row
                fillRoundRect(ctx, table_padding_x + j * (cell_size + 2), table_padding_y + i * (cell_size + 2), cell_size, cell_size, 4);
            }
        }
    },


    handleClick() {
        const el = this.$refs.canvas1;
        const ctx = el.getContext('2d');
        this.table_height = this.table_data.length;
        this.table_width = this.table_data[0].length;
        let cell_size = 24;
        console.info('width:' + this.table_width);
        console.info('height:' + this.table_height);
        let table_padding_x = (400 - 50 * 2 - (cell_size + 2) * this.table_width) / 2; // container的padding考虑在内
        let table_padding_y = (400 - 10 * 2 - (cell_size + 2) * this.table_height) / 2;

        let min_val = this.table_data[0][0];
        let max_val = this.table_data[0][0];

        // normalize
        for (let i = 0; i < this.table_data.length; i++) { // col
            let innerArrayLength = this.table_data[i].length;
            for (let j = 0; j < innerArrayLength; j++) { // row
                min_val = Math.min(this.table_data[j][i], min_val);
                max_val = Math.max(this.table_data[j][i], max_val);
            }
        }


        for (let i = 0; i < this.table_data.length; i++) { // col
            let innerArrayLength = this.table_data[i].length;
            for (let j = 0; j < innerArrayLength; j++) { // row
                let normalized_data = (this.table_data[j][i] - min_val) / (max_val - min_val);
                let rgb_array = evaluate_cmap(normalized_data, 'viridis', false);
                //                ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
                //                ctx.fillRect(20+i*21, 20+j*21, 20, 20);
                let fillColor = 'rgb(' + rgb_array[0] + ',' + rgb_array[1] + ',' + rgb_array[2] + ')';
                fillRoundRect(ctx, table_padding_x + j * (cell_size + 2), table_padding_y + i * (cell_size + 2), cell_size, cell_size, 4, fillColor);
            }
        }

    },
    setvalue(e) {
        if (e.mode == "start") {
            this.value = e.value;
            this.startValue = e.value;
        } else if (e.mode == "move") {
            this.value = e.value;
            this.currentValue = e.value;
        } else if (e.mode == "end") {
            this.value = e.value;
            this.endValue = e.value;
        }
    }
}
