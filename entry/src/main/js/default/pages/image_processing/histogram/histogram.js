import router from '@system.router';
import {cat} from '../../../utils/cat.js';
import {evaluate_cmap} from '../../../js-colormaps.js';


export default {
    data: {
        lineData: [
            {
                strokeColor: '#0081ff',
                fillColor: '#cce5ff',
                data: [],
                gradient: true,
            }
        ],
        lineOps: {
            xAxis: {
                min: 0,
                max: 255,
                display: false,
            },
            yAxis: {
                min: 0,
                max: 100,
                display: false,
            },
            series: {
                lineStyle: {
                    width: "2px",
                    smooth: true,
                },
                headPoint: {
                    shape: "circle",
                    size: 10,
                    strokeWidth: 2,
                    fillColor: '#ffffff',
                    strokeColor: '#007aff',
                    display: true,
                },
                loop: {
                    margin: 2,
                    gradient: true,
                }
            }
        },
    },
    onShow(){
      this.addData();
    },
    addData() {
        let ret = this.calHistogram(cat);
        this.$refs.linechart.append({
            serial: 0,
            data: ret
        })
    },
    calHistogram(img) {
        let ret = Array(256).fill(0);
        const m = img.length;
        const n = img[0].length;
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                let No = parseInt(img[i][j] * 255);
                ret[No] += 1;
            }
        }
        let max_val = 0;
        ret.forEach(element => {
            max_val = Math.max(max_val, element);
        });

        this.lineOps.yAxis.max = max_val;
        return ret;

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
}
