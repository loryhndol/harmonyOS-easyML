export default {
    data: {
        title: '主成分分析',
        canvas_width: 300,
        canvas_height: 400,
        //        two_dimensional: [[100,170],[-100,90],[13,-30],[31,113],[2,60]],
        two_dimensional: [],
        vector: [1,-2],
        mean_x: 0,
        mean_y: 0,
        //        x_scale: 0,
        //        y_scale: 0
    },
    onShow() {
        const el =this.$refs.canvas;
        const ctx = el.getContext('2d');
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.lineCap = 'round';
        //        ctx.strokeStyle = 'red';
        ctx.moveTo(20, this.canvas_height/2);
        ctx.lineTo(this.canvas_width-20, this.canvas_height/2);
        ctx.moveTo(this.canvas_width/2, 20);
        ctx.lineTo(this.canvas_width/2, this.canvas_height-20);
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "blue";
        ctx.fillStyle = "blue";
        ctx.beginPath();
        for(let i=0;i<this.two_dimensional.length;i++){
            ctx.moveTo(this.canvas_width/2+this.two_dimensional[i][0],this.canvas_height/2-this.two_dimensional[i][1]);
            ctx.arc(this.canvas_width/2+this.two_dimensional[i][0],this.canvas_height/2-this.two_dimensional[i][1],5,0,6.28);
            ctx.fill();
        }
        ctx.stroke();
    },
    drawVector(){
        const { PCA } = require('ml-pca');
        // dataset is a two-dimensional array where rows represent the samples and columns the features
        const pca = new PCA(this.two_dimensional);
        //        const pca = new PCA([[70,-100],[0,0],[-70,90]]);
        //        console.log(pca.getExplainedVariance());
        const ei = pca.getEigenvalues();
        let ev = pca.getEigenvectors();
        //        this.ev = ev;
        //        console.log(ei);
        //        console.log(JSON.parse(JSON.stringify(ev))[0]);
        //        console.log(this.two_dimensional);
        this.vector = JSON.parse(JSON.stringify(ev))[0];
        this.vector1 = JSON.parse(JSON.stringify(ev))[1];

        const el = this.$refs.canvas;
        const ctx = el.getContext('2d');
        ctx.lineWidth = 3;
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.lineCap = 'round';
        let x = this.vector[0];
        let y = this.vector[1];
        let temp = Math.max(200/Math.abs(x),200/Math.abs(y));
        x = x * temp;
        y = y * temp;
        this.mean_x = 0
        this.mean_y = 0;
        for(let i=0;i<this.two_dimensional.length;i++){
            this.mean_x += this.two_dimensional[i][0];
            this.mean_y += this.two_dimensional[i][1];
        }
        this.mean_x /= this.two_dimensional.length;
        this.mean_y /= this.two_dimensional.length;
        ctx.moveTo(x+this.canvas_width/2+this.mean_x, y+this.canvas_height/2+this.mean_y);
        ctx.lineTo(-x+this.canvas_width/2+this.mean_x, -y+this.canvas_height/2+this.mean_y);
        ctx.stroke();

    },
    add_point(msg){
        this.two_dimensional.push([msg.touches[0].localX-this.canvas_width/2,msg.touches[0].localY-this.canvas_height/2]);
        const el =this.$refs.canvas;
        const ctx = el.getContext('2d');
        ctx.lineWidth = 1;
        ctx.strokeStyle = "blue";
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.moveTo(msg.touches[0].localX,msg.touches[0].localY);
        ctx.arc(msg.touches[0].localX,msg.touches[0].localY,5,0,6.28);
        ctx.fill();
        ctx.stroke();
    },
    DivideTwoCellOnce(a = 0,b = 0,c = 0,k = 0,f = 0,s = 0){
        if(a === 0 || b === 0 || c === 0 ||
        k === 0 || f === 0 || s === 0) throw '常量输入不完整'

        //优化小数计算bug
        let maxLength = null;
        Object.keys(arguments).some(item => {
            let lings = arguments[item].toString()
            let lingsL = lings.substring(lings.indexOf('.')+1).length
            maxLength = lingsL > maxLength ? lingsL:maxLength
        })
        a = a*Math.pow(10,maxLength)
        b = b*Math.pow(10,maxLength)
        c = c*Math.pow(10,maxLength)
        k = k*Math.pow(10,maxLength)
        f = f*Math.pow(10,maxLength)
        s = s*Math.pow(10,maxLength)

        let y = (c*k -s*a)/(b*k -a*f)
        let x = (c - b*y)/a
        return {x,y}
    },
    projection(){
        let a = this.vector[1];
        let b = -this.vector[0];
        let c = this.vector[1]*this.mean_x-this.vector[0]*this.mean_y;
        const el =this.$refs.canvas;
        const ctx = el.getContext('2d');
        ctx.strokeStyle = "green";
        ctx.fillStyle = "green";
        ctx.lineCap = 'round';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for(let i=0;i<this.two_dimensional.length;i++){
            let k=this.vector[0];
            let f=this.vector[1];
            let s=this.vector[0]*this.two_dimensional[i][0]+this.vector[1]*this.two_dimensional[i][1];
            let t=this.DivideTwoCellOnce(a,b,c,k,f,s);
            //            console.log(t.x)
            //            console.log(t.y)
            //            ctx.lineWidth = 17;
            ctx.moveTo(this.canvas_width/2+this.two_dimensional[i][0],this.canvas_height/2+this.two_dimensional[i][1])
            //            ctx.lineTo(this.canvas_width/2+t.x,this.canvas_height/2+t.y);
            //            ctx.lineWidth = 1;
            ctx.arc(this.canvas_width/2+t.x,this.canvas_height/2+t.y,5,0,6.28);
            ctx.fill();
            //            ctx.lineTo(this.canvas_width/2+this.two_dimensional[i][0],this.canvas_height/2+this.two_dimensional[i][1])
        }
        ctx.stroke();
        ctx.closePath();
    }
}