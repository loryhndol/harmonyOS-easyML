import router from '@system.router';
import prompt from '@system.prompt';

//圆角矩形绘制方法参考：https://www.cnblogs.com/pengfei25/p/11005206.html
/**该方法用来绘制一个有填充色的圆角矩形
     *@param cxt:canvas的上下文环境
     *@param x:左上角x轴坐标
     *@param y:左上角y轴坐标
     *@param width:矩形的宽度
     *@param height:矩形的高度
     *@param radius:圆的半径
     *@param fillColor:填充颜色
     **/
function fillRoundRect(cxt, x, y, width, height, radius, /*optional*/ fillColor) {
    //圆的直径必然要小于矩形的宽高
    if (2 * radius > width || 2 * radius > height) { return false; }

    cxt.save();
    cxt.translate(x, y);
    //绘制圆角矩形的各个边
    drawRoundRectPath(cxt, width, height, radius);
    cxt.fillStyle = fillColor || "#000"; //若是给定了值就用给定的值否则给予默认值
    cxt.fill();
    cxt.restore();
}


/**该方法用来绘制圆角矩形
     *@param cxt:canvas的上下文环境
     *@param x:左上角x轴坐标
     *@param y:左上角y轴坐标
     *@param width:矩形的宽度
     *@param height:矩形的高度
     *@param radius:圆的半径
     *@param lineWidth:线条粗细
     *@param strokeColor:线条颜色
     **/
function strokeRoundRect(cxt, x, y, width, height, radius, /*optional*/ lineWidth, /*optional*/ strokeColor) {
    //圆的直径必然要小于矩形的宽高
    if (2 * radius > width || 2 * radius > height) { return false; }

    cxt.save();
    cxt.translate(x, y);
    //绘制圆角矩形的各个边
    drawRoundRectPath(cxt, width, height, radius);
    cxt.lineWidth = lineWidth || 2; //若是给定了值就用给定的值否则给予默认值2
    cxt.strokeStyle = strokeColor || "#000";
    cxt.stroke();
    cxt.restore();
}

function drawRoundRectPath(cxt, width, height, radius) {
    cxt.beginPath(0);
    //从右下角顺时针绘制，弧度从0到1/2PI
    cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2);

    //矩形下边线
    cxt.lineTo(radius, height);

    //左下角圆弧，弧度从1/2PI到PI
    cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);

    //矩形左边线
    cxt.lineTo(0, radius);

    //左上角圆弧，弧度从PI到3/2PI
    cxt.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2);

    //上边线
    cxt.lineTo(width - radius, 0);

    //右上角圆弧
    cxt.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2);

    //右边线
    cxt.lineTo(width, height - radius);
    cxt.closePath();
}


export default {
    data: {
        title: 'World',
        //table_data就是我们要制作的表格数据
        table_data:[
            [1,2,3,4,5,6,7,8,9,10],
            [1,3,2,4,5,7,5,4,3,2],
            [3,1,4,2,5,10,4,2,3,1],
            [2,3,1,4,5,1,1,1,1,1],
            [5,4,3,2,1,4,2,4,3,7],
            [0.1,0.3,2,4,5,7,5,4,3,2],
            [3,1,4,2,5,1,4,2,3,1],
            [2,3,1,4,5,1,3,3,1,1],
            [5,4,3,2,1,4,2,4,3,7],
            [3,4,5,2,0,4,2,4,3,1]
        ],
        table_height:0,
        table_width:0
    },
    onInit() {

    },

    launch(){
        router.back();
    },
    onMenuSelected(e) {
        prompt.showToast({
            message: e.value
        })
        if(e.value=="Item 1"){
            this.launch()
        }
    },
    onTextClick() {
        this.$element("apiMenu").show({x:280,y:120});
    },

    handleClick() {
        const el = this.$refs.canvas1;
        const ctx = el.getContext('2d');
        this.table_height = this.table_data.length;
        this.table_width = this.table_data[0].length;
        for (let i = 0; i < this.table_data.length; i++) { // col
            var innerArrayLength = this.table_data[i].length;
            for (let j = 0; j < innerArrayLength; j++) { // row
                console.info(this.table_data[i][j]);
                var r = this.table_data[j][i]*30;
                var g = this.table_data[j][i]*10;
                var b = 40;
//                ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
//                ctx.fillRect(20+i*21, 20+j*21, 20, 20);
                let fillColor = 'rgb(' + r + ',' + g + ',' + b + ')';
                fillRoundRect(ctx, 20+j*21, 20+i*21, 20, 20, 2, fillColor);
            }
        }


        //绘制并填充一个圆角矩形
//        fillRoundRect(ctx, 120, 10, 10, 10, 3, 'rgb(0,255,0)');

    },

}
