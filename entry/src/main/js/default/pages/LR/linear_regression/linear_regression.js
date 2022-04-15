import SimpleLinearRegression from 'ml-regression-simple-linear';

export default {
    data: {
        model_name: "线性回归",
        linear_result: "",
        // 画布信息
        canvas_width: 300,
        canvas_height: 450,
        // 用户输入点坐标
        point_collection_x: [],
        point_collection_y: []
    },
    onShow() {
        const el = this.$refs.canvas;
        const ctx = el.getContext('2d');

        let dx = 30;
        let dy = this.canvas_height - 20;
        var textX = 0;
        var textY = 50;

        // 创建一个新的绘制路径
        ctx.beginPath();
        ctx.lineWidth = 3;
        // 指定线端点的样式
        ctx.lineCap = 'butt';
        // 设置描边的颜色
        ctx.strokeStyle = '#100f0f';

        //        strokeRect(x: number, y: number, width:number, height: number): void 绘制具有边框的矩形，矩形内部不填充
        ctx.strokeRect(30, 20, this.canvas_width, this.canvas_height);

        //        // 指定绘制的填充色
        ctx.fillStyle = '#c3c4c2';
        // 绘制提示信息
        // fillRect(x: number, y: number, width:number, height: number): void 填充一个矩形
        ctx.fillRect(35,25,100,50);
        // 绘制数据提示信息
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#f80505";
        ctx.fillStyle = "#fc0303";

        ctx.moveTo(40,35);

        // arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise: boolean): void
        // 绘制弧线路径
        ctx.arc(40,35, 5, 0, 6.28);
        // 对封闭路径进行填充
        ctx.fill();
        ctx.stroke();

        ctx.font = '16px sans-serif';
        ctx.fillStyle = "#0e0e0e";
        // fillText(text: string, x: number, y: number): void 绘制填充类文本
        ctx.fillText("原始数据", 60, 40);

        // 创建一个新的绘制路径
        ctx.beginPath();
        ctx.lineWidth = 3;
        // 指定线端点的样式
        ctx.lineCap = 'butt';
        // 设置描边的颜色
        ctx.strokeStyle = '#2669be';

        // moveTo(x: number, y: number): void 路径从当前点移动到指定点。
        ctx.moveTo(35, 60);
        // lineTo(x: number, y: number): void 从当前点到指定点进行路径连接
        ctx.lineTo(50, 60);
        // 进行边框绘制操作
        ctx.stroke();

        ctx.font = '16px sans-serif';
        ctx.fillStyle = "#0e0e0e";
        // fillText(text: string, x: number, y: number): void 绘制填充类文本
        ctx.fillText("拟合直线", 60, 65);



        // 绘制x轴
        //        // moveTo(x: number, y: number): void 路径从当前点移动到指定点。
        //        ctx.moveTo(30, this.canvas_height);
        //        //        // lineTo(x: number, y: number): void 从当前点到指定点进行路径连接
        //        ctx.lineTo(this.canvas_width + 30, this.canvas_height);

        //绘制x轴数字
        while (dx < this.canvas_width) {
            ctx.font = '12pt Arial';
            ctx.fillStyle = '#0e0e0e';
            ctx.fillText(textX, dx, this.canvas_height + 35);
            textX += 50;
            dx += 50;
        }

        // 绘制y轴
        //        ctx.moveTo(30, this.canvas_height);
        //        ctx.lineTo(30, 20);
        //        ctx.font = '12pt Arial';
        //        ctx.fillStyle = '#0e0e0e';

        //绘制数字
        while (dy > 0) {
            ctx.font = '12pt Arial';
            ctx.fillStyle = '#0e0e0e';
            ctx.fillText(textY, 30 - 25, dy);
            textY += 50;
            dy -= 50;
        }
        // 进行边框绘制操作
        ctx.stroke();
    },
    linear_regression() {
        const regression = new SimpleLinearRegression(this.point_collection_x, this.point_collection_y);

        // 直线斜率w
        regression.slope;
        console.log("斜率：" + regression.slope);
        // 直线截距b
        regression.intercept;
        console.log("截距：" + regression.intercept)
        // 直线信息[b,w]
        regression.coefficients;

        // 直线表达式 // 'f(x) = w * x + b'
        regression.toString();

        regression.score(this.point_collection_x, this.point_collection_y);
        // { r: 1, r2: 1, chi2: 0, rmsd: 0 }

        const json = regression.toJSON();
        // { name: 'simpleLinearRegression', slope: 2, intercept: -1 }
        const loaded = SimpleLinearRegression.load(json);

        // 计算直线拟合坐标
        let x1 = Math.min(...this.point_collection_x);
        let y1 = loaded.predict(x1);

        // 转换坐标系
        x1 = x1 + 30;
        y1 = this.canvas_height + 20 - y1;
        console.log("x1：" + x1 + " y1:" + y1);

        let x2 = Math.max(...this.point_collection_x);
        let y2 = loaded.predict(x2);
        // 转换坐标系
        x2 = x2 + 30;
        y2 = this.canvas_height + 20 - y2;
        console.log("x2：" + x2 + " y2:" + y2);

        // 绘制直线
        const el = this.$refs.canvas;
        const ctx = el.getContext('2d');
        // 创建一个新的绘制路径
        ctx.beginPath();
        ctx.lineWidth = 3;
        // 指定线端点的样式
        ctx.lineCap = 'butt';
        // 设置描边的颜色
        ctx.strokeStyle = '#2669be';

        // moveTo(x: number, y: number): void 路径从当前点移动到指定点。
        ctx.moveTo(x1, y1);
        // lineTo(x: number, y: number): void 从当前点到指定点进行路径连接
        ctx.lineTo(x2, y2);
        // 进行边框绘制操作
        ctx.stroke();
    },
    // 添加点的信息
    add_point(msg) {
        // 输入点坐标
        let cur_point_x = msg.touches[0].localX - 30;
        let cur_point_y = this.canvas_height + 20 - msg.touches[0].localY;

        // 存储x,y坐标
        this.point_collection_x.push(cur_point_x);
        this.point_collection_y.push(cur_point_y);
        // 查看点坐标信息
        console.log("x：" + cur_point_x + " y:" + cur_point_y);
        console.log(this.point_collection_x.length);

        // 绘制坐标点
        const el = this.$refs.canvas;
        const ctx = el.getContext('2d');

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#f80505";
        ctx.fillStyle = "#fc0303";

        ctx.moveTo(msg.touches[0].localX, msg.touches[0].localY);

        // arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise: boolean): void
        // 绘制弧线路径
        ctx.arc(msg.touches[0].localX, msg.touches[0].localY, 5, 0, 6.28);
        // 对封闭路径进行填充
        ctx.fill();
        ctx.stroke();
    }
}
