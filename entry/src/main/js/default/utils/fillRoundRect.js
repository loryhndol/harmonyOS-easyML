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
export function fillRoundRect(cxt, x, y, width, height, radius, /*optional*/
                       fillColor) {
    //圆的直径必然要小于矩形的宽高
    if (2 * radius > width || 2 * radius > height) {
        return false;
    }

    cxt.save();
    cxt.translate(x, y);
    //绘制圆角矩形的各个边
    drawRoundRectPath(cxt, width, height, radius);
    cxt.fillStyle = fillColor || "#B2BEBF"; //若是给定了值就用给定的值否则给予默认值
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
function strokeRoundRect(cxt, x, y, width, height, radius, /*optional*/
                         lineWidth, /*optional*/
                         strokeColor) {
    //圆的直径必然要小于矩形的宽高
    if (2 * radius > width || 2 * radius > height) {
        return false;
    }

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