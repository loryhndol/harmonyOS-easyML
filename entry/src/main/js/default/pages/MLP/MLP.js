// @ts-nocheck
export default {
    data: {
        title: 'World'
    },
    onInit(){
        this.fnn();
    },
    fnn(){
        const FeedforwardNeuralNetwork = require('ml-fnn');
        var FNN = new FeedforwardNeuralNetwork({hiddenLayers:[10,10,10,10],iterations:100});
        var trainingSet = [[0, 0], [0, 1], [1, 0], [1, 1]];
        var predictions = [[1], [0], [1], [0]];

        FNN.train(trainingSet, predictions);
        //        console.log(FNN.toJSON().layers[0].W.data)
        for (var item in FNN.toJSON().layers[0].W.data) {
            var property = "属性：" + item + "数值：" + FNN.toJSON().layers[0].W.data[item] + "\n";
            console.info(property)
        }
        for (var item in FNN.toJSON().layers[0].d) {
            var property = "属性：" + item + "数值：" + FNN.toJSON().layers[0].d[item] + "\n";
            console.info(property)
        }
        var dataset = [[0, 0], [0, 1], [1, 0], [1, 1]];
        var ans = FNN.predict(dataset);
        console.info(ans);
    }
}
