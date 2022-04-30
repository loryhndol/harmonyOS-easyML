import fileio from '@ohos.fileio';
import prompt from '@system.prompt';
import router from '@system.router';
import {kv_get,kv_put} from '../../utils/utils.js';
import {cat} from '../../utils/cat.js';
import {mountain} from '../../utils/mountain.js';
import {evaluate_cmap} from '../../js-colormaps.js';

// abilityType: 0-Ability; 1-Internal Ability
const ABILITY_TYPE_EXTERNAL = 0;
const ABILITY_TYPE_INTERNAL = 1;
// syncOption(Optional, default sync): 0-Sync; 1-Async
const ACTION_SYNC = 0;
const ACTION_ASYNC = 1;
const ACTION_MESSAGE_CODE_PLUS = 1001;

export default {
    plus:async function(){
        var actionData = {};
        actionData.firstNum = 1024;
        actionData.secondNum = 2048;

        var action = {};
        action.bundleName = 'com.example.myapplication';
        action.abilityName = 'com.example.myapplication.ComputeServiceAbility';
        action.messageCode = ACTION_MESSAGE_CODE_PLUS;
        action.data = actionData;
        action.abilityType = ABILITY_TYPE_EXTERNAL;
        action.syncOption = ACTION_SYNC;

        var result = await FeatureAbility.callAbility(action);
        var ret = JSON.parse(result);
        if (ret.code == 0) {
            console.info('plus result is:' + JSON.stringify(ret.abilityResult));
        } else {
            console.error('plus error code:' + JSON.stringify(ret.code));
        }
    },

    data: {
        title: 'World',
        rows: 418,
        cols: 627
    },
    onShow() {
        let padding = 20;
        let scaling = (400 - padding * 4) / this.cols;
//        console.info(JSON.stringify(image_data));
        this.draw_pic(cat);
//        this.loadImage();
//        this.plus();
    },
    draw_pic(img){
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
                ctx.fillStyle= fillColor;
                ctx.fillRect(20+j*cell_size, 80+i*cell_size, cell_size,cell_size);
            }
        }
    },
    launchNext(){
        router.push({
            uri:'pages/image_processing/image_processing'
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
            x: 270, y: 500
        });
    },
}
