import KNN from 'ml-knn';

export default {
    data: {
        title: 'KNN',
        // 画布信息
        canvas_width: 300,
        canvas_height: 450,
        // 用户输入点坐标
        point_collection: [],
        knn_point:[]
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

        //绘制x轴数字
        while (dx < this.canvas_width) {
            ctx.font = '12pt Arial';
            ctx.fillStyle = '#0e0e0e';
            ctx.fillText(textX, dx, this.canvas_height + 35);
            textX += 50;
            dx += 50;
        }
        //绘制y轴数字
        while (dy > 0) {
            ctx.font = '12pt Arial';
            ctx.fillStyle = '#0e0e0e';
            ctx.fillText(textY, 30 - 25, dy);
            textY += 50;
            dy -= 50;
        }
        ctx.closePath();
        // 进行边框绘制操作
        ctx.stroke();
    },
    knn(){
        console.log('######');
        var train_dataset = [
            [20, 80],
            [40, 60],
            [50, 30],
            [170, 200],
            [165, 190],
            [175, 160],
            [250, 50],
            [270, 70],
            [240, 55],
            [220, 300],
            [230, 350],
            [220, 400]
        ];
        var train_labels = [0, 0, 0, 1, 1, 1,2,2,2,3,3,3];
        const knn_result = new KNN(train_dataset, train_labels, { k: 3 }); // consider 2 nearest neighbors
//        var test_dataset = [
//            [0.9, 0.9, 0.9],
//            [1.1, 1.1, 1.1],
//            [1.1, 1.1, 1.2],
//            [1.2, 1.2, 1.2],
//        ];
        console.log('######');
        var ans = knn_result.predict(this.knn_point);
        console.log(ans);
        let i = 0;
        var color=["#5ad716","#2150d9","#ba16d7","#f5b20a"];
        const el = this.$refs.canvas;
        const ctx = el.getContext('2d');
        ctx.beginPath();
        ctx.strokeStyle = "#ffffff";
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(33,23,this.canvas_width-3,this.canvas_height-3);
        ctx.closePath();
        ctx.stroke();
        console.log('######');
        while (i < this.point_collection.length) {
            console.log("i:"+i);
            ctx.beginPath();
            ctx.lineWidth=1;
            if(ans[i]==0){
                ctx.strokeStyle = color[ans[i]];
                ctx.fillStyle = color[ans[i]];
            }
            if(ans[i]==1){
                ctx.strokeStyle = color[ans[i]];
                ctx.fillStyle = color[ans[i]];
            }
            if(ans[i]==2){
                ctx.strokeStyle =color[ans[i]];
                ctx.fillStyle = color[ans[i]];
            }
            if(ans[i]==3){
                ctx.strokeStyle = color[ans[i]];
                ctx.fillStyle = color[ans[i]];
            }
            ctx.moveTo(this.point_collection[i][0],this.point_collection[i][1]);
            // arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise: boolean): void
            // 绘制弧线路径
            ctx.arc(this.point_collection[i][0],this.point_collection[i][1], 5, 0, 6.28);
            // 对封闭路径进行填充
            ctx.fill();
            ctx.closePath();
            ctx.stroke();
            i=i+1;
        }
        console.log(ans);
    },
    add_point(msg) {
        // 输入点坐标
        let cur_point_x = msg.touches[0].localX;
        let cur_point_y = msg.touches[0].localY;

        // 存储x,y坐标
        this.point_collection.push([cur_point_x, cur_point_y]);
        this.knn_point.push([cur_point_x-30, this.canvas_height+20-cur_point_y]);
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
        ctx.closePath()
        ctx.stroke();
    }
}
