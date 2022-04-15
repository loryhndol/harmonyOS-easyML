const { Matrix } = require('ml-matrix');

export default {
    data: {
        title: '主成分分析',
        canvas_width: 400,
        canvas_height: 400,
        axisColor: ["red", "red", "yellow", "yellow", "green", "green"],
        axis: [[-100, 0, 0], [100, 0, 0], [0, -100, 0], [0, 100, 0], [0, 0, -100], [0, 0, 100]], // 左手坐标系
        three_dimensional: [[40, 40, 40], [10, -30, 60], [-40, -10, 30], [70, 10, -50], [40, 60, 10], [-30, 90, 10]],

        visual: {
            x: 0,
            y: 0,
            z: 200
        },
        theta: 0,
        phi: 0,
        data_proj: [[0, 0, 0]],
    },
    transformCoordinatePoint(x, y, z) {
        return {
            x: (x - this.visual.x) * this.visual.z / (this.visual.z - z) + 300 / 2,
            y: (y - this.visual.y) * this.visual.z / (-this.visual.z + z) + 400 / 2
        }
    },
    onShow() {
        let point;
        const el = this.$refs.canvas;
        const ctx = el.getContext('2d', true);
        ctx.clearRect(0, 0, this.canvas_width, this.canvas_height);
        const itoa = {
            0: 'x', 2: 'y', 4: 'z'
        };
        //绘制三个坐标轴
        for (var i = 0;i < this.axis.length; i += 2) {
            ctx.beginPath();
            ctx.strokeStyle = this.axisColor[i];
            ctx.lineWidth = 3;
            point = this.transformCoordinatePoint(...this.axis[i]);
            ctx.moveTo(point.x, point.y);
            point = this.transformCoordinatePoint(...this.axis[i+1]);
            ctx.font = '30px sans-serif';
            ctx.fillText(itoa[i], point.x, point.y);
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
            ctx.closePath();
        }



        if (this.intersection_points !== undefined) {
            // 绘制交点
            ctx.beginPath();
            ctx.fillStyle = "#80d4d4d4";
            ctx.strokeStyle = "#b8b8b8"
            ctx.lineWidth = 1
            for (let i = 0;i < this.intersection_points.length; i++) {
                point = this.transformCoordinatePoint(...this.intersection_points[i]);
                ctx.moveTo(point.x, point.y)
                ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI)
                ctx.fill()
            }
            ctx.closePath()
            ctx.stroke()

            // 绘制平面，为了保证展示的完整性，因此遍历所有可能的顶点序列绘图
            this.intersection_points.sort(this.ascend_x);
            ctx.beginPath();
            let init_point = this.transformCoordinatePoint(...this.intersection_points[0]);
            ctx.moveTo(init_point.x, init_point.y);
            for (let i = 1;i < this.intersection_points.length; i++) {
                point = this.transformCoordinatePoint(...this.intersection_points[i]);
                ctx.lineTo(point.x, point.y)
            }
            ctx.fill();
            ctx.closePath()
            ctx.stroke()

            this.intersection_points.sort(this.ascend_y);
            ctx.beginPath();
            init_point = this.transformCoordinatePoint(...this.intersection_points[0]);
            ctx.moveTo(init_point.x, init_point.y);
            for (let i = 1;i < this.intersection_points.length; i++) {
                point = this.transformCoordinatePoint(...this.intersection_points[i]);
                ctx.lineTo(point.x, point.y)
            }
            ctx.fill();
            ctx.closePath()
            ctx.stroke()

            this.intersection_points.sort(this.ascend_z);
            ctx.beginPath();
            init_point = this.transformCoordinatePoint(...this.intersection_points[0]);
            ctx.moveTo(init_point.x, init_point.y);
            for (let i = 1;i < this.intersection_points.length; i++) {
                point = this.transformCoordinatePoint(...this.intersection_points[i]);
                ctx.lineTo(point.x, point.y)
            }
            ctx.fill();
            ctx.closePath()
            ctx.stroke()
        }

        if (this.data_proj_3d !== undefined) {
            ctx.beginPath();
            ctx.fillStyle = "#ff6161"
            ctx.strokeStyle = "red"
            ctx.lineWidth = 1
            for (let i = 0;i < this.data_proj_3d.length; i++) {
                point = this.transformCoordinatePoint(...this.data_proj_3d[i]);
                ctx.moveTo(point.x, point.y)
                ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI)
                ctx.fill()
            }
            ctx.closePath()
            ctx.stroke()
        }

        //绘制三维数据点
        ctx.beginPath()
        ctx.fillStyle = "#6868ff"
        ctx.strokeStyle = "blue"
        ctx.lineWidth = 1
        for (let i = 0;i < this.three_dimensional.length; i++) {
            point = this.transformCoordinatePoint(...this.three_dimensional[i])
            ctx.moveTo(point.x, point.y)
            ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI)
            ctx.fill()
        }
        ctx.closePath()
        ctx.stroke();

    },
    rotate() {
        var center = {
            x: 0,
            y: 0,
            z: 0
        }

        let theta_real = this.theta * Math.PI / 360;
        let phi_real = this.phi * Math.PI / 180;

        // 旋转角的正余弦值
        let ct = Math.cos(theta_real);
        let st = Math.sin(theta_real);
        let cp = Math.cos(-phi_real);
        let sp = Math.sin(-phi_real);

        let rotate_transform = (obj) => {
            obj.forEach(element => {
                // 旋转后的值
                let x = element[0] - center.x;
                let y = element[1] - center.y;
                let z = element[2] - center.z;
                element[0] = ct * x - st * cp * y + st * sp * z + center.x;
                element[1] = st * x + ct * cp * y - ct * sp * z + center.y;
                element[2] = sp * y + cp * z + center.z;
            });
        }

        rotate_transform(this.axis);
        rotate_transform(this.three_dimensional);
        rotate_transform(this.data_proj_3d);
        rotate_transform(this.intersection_points);

    },
    test() {
        const { PCA } = require('ml-pca');
        // dataset is a two-dimensional array where rows represent the samples and columns the features
        const pca = new PCA(this.three_dimensional);

        console.log(pca.getExplainedVariance());
        const ei = pca.getEigenvalues();
        let ev = pca.getEigenvectors();

        console.info('eigenValue: ' + ei);
        console.info('eigenVectors: ');
        console.info(ev.toJSON());

        let best_ev = [ev.to2DArray()[0], ev.to2DArray()[1]];
        let ev_basis = new Matrix(best_ev);
        let data_raw = new Matrix(this.three_dimensional);
        const data_proj_matrix = data_raw.mmul(ev_basis.transpose()); // 原始点在两个主方向基向量组成的坐标系下的新坐标
        this.data_proj = data_proj_matrix.to2DArray();

        console.info('projectVectors: ');
        console.info(JSON.stringify(this.data_proj));

        let tmp = [];
        for (let i = 0; i < this.data_proj.length; i++) {
            let tmp_3d = [];
            let x_prime = this.data_proj[i][0];
            let y_prime = this.data_proj[i][1];
            console.info('new x:' + x_prime + ' new y:' + y_prime);
            let new_x_worlds = ev_basis.data[0][0] * x_prime + ev_basis.data[1][0] * y_prime;
            let new_y_worlds = ev_basis.data[0][1] * x_prime + ev_basis.data[1][1] * y_prime;
            let new_z_worlds = ev_basis.data[0][2] * x_prime + ev_basis.data[1][2] * y_prime;
            tmp_3d.push(new_x_worlds, new_y_worlds, new_z_worlds);
            tmp.push(tmp_3d);
        }
        this.data_proj_3d = tmp;
        console.info(JSON.stringify(this.data_proj_3d));

        this.get_panel(); // 前三个数据点确定平面

        this.onShow()
    },
    get_panel() {

        let p1 = this.data_proj_3d[0];
        let p2 = this.data_proj_3d[1];
        let p3 = this.data_proj_3d[2];
        let a = (p2[1] - p1[1]) * (p3[2] - p1[2]) - (p2[2] - p1[2]) * (p3[1] - p1[1]);
        let b = (p2[2] - p1[2]) * (p3[0] - p1[0]) - (p2[0] - p1[0]) * (p3[2] - p1[2]);
        let c = (p2[0] - p1[0]) * (p3[1] - p1[1]) - (p2[1] - p1[1]) * (p3[0] - p1[0]);
        let d = 0 - (a * p1[0] + b * p1[1] + c * p1[2]);
        let panel = {
            'a': a, 'b': b, 'c': c, 'd': d
        };
        console.info(JSON.stringify(panel));

        // 平面跟十二条边求交点
        let intersection = [];
        let x_dir, y_dir, z_dir;
        // x向
        x_dir = [-100, 100];
        z_dir = [-100, 100];
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                let x_tmp = x_dir[i];
                let z_tmp = z_dir[j];
                let y_tmp = -(panel.a*x_tmp+panel.c*z_tmp+d) / panel.b;
                if (-100 <= y_tmp && y_tmp <= 100){
                    intersection.push([x_tmp,y_tmp,z_tmp]);
                }

            }
        }
        // y向
        z_dir = [-100, 100];
        y_dir = [-100, 100];
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                let z_tmp = z_dir[i];
                let y_tmp = y_dir[j];
                let x_tmp = -(panel.b*y_tmp+panel.c*z_tmp+d) / panel.a;
                if(-100 <= x_tmp && x_tmp <= 100){
                    intersection.push([x_tmp, y_tmp,z_tmp]);
                }


            }
        }

        // z向
        x_dir = [-100, 100];
        y_dir = [-100, 100];
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                let x_tmp = x_dir[i];
                let y_tmp = y_dir[j];
                let z_tmp = -(panel.a*x_tmp+panel.b*y_tmp+d) / panel.c;
                if(-100 <= z_tmp && z_tmp <= 100){
                    intersection.push([x_tmp,y_tmp,z_tmp]);
                }

            }
        }

        this.intersection_points = intersection;
    },
    set_theta(e) {
        if (e.mode == "start") {
            this.theta = e.value;
        } else if (e.mode == "move") {
            this.theta = e.value;
            console.info(this.phi);
        } else if (e.mode == "end") {
            this.theta -= e.value; //撤销操作
        }
        this.rotate();
        this.onShow();
    },
    set_phi(e) {
        if (e.mode == "start") {
            this.phi = e.value;
        } else if (e.mode == "move") {
            this.phi = e.value;
            console.info(this.phi);
        } else if (e.mode == "end") {
            this.phi -= e.value; // 撤销操作
        }
        this.rotate();
        this.onShow();
    },
    ascend_x(x,y){
        return x[0] - y[0];  //按照数组的第1个值升序排列
    },
    ascend_y(x,y){
        return x[1]-y[1];
    },
    ascend_z(x,y){
        return x[2]-y[2];
    }
}
