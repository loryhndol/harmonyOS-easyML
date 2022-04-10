import ability_featureAbility from '@ohos.ability.featureAbility';
import router from '@system.router';
var context = ability_featureAbility.getContext();

async function a(){
}

export default {
    data: {
        title: "",
        bar:"",
        result:"",
        my_text:"",
        my_cache:"",
        my_disk:"",
        text:"Hello world",
        modeFlag:"half"

    },
    onInit() {
        this.title="world"

    },
    readDir(){
        context.getCacheDir()
            .then((data) => {
                this.my_cache = data;
                console.info('Cache directory obtained. Data: ' + data);
            }).catch((error) => {
            console.error('Failed to obtain the cache directory. Cause:' + error.message);
        })

        context.getFilesDir()
            .then((data) => {
                this.my_disk = data;
                console.info('File directory obtained. Data:' + data);
            }).catch((error) => {
            console.error('Failed to obtain the file directory. Cause: ' + error.message);
        })
    },
    launchLR(){
        router.push({
            uri:'pages/LR/LR'
        })
    },
    launchPCA(){
        router.push({
            uri:'pages/PCA/input_pca/input_pca'
        })
    },
    launchMLP(){
        router.push({
            uri:'pages/MLP/MLP'
        })
    },
    launchImageProcessing(){
        router.push({
            uri:'pages/image_processing/image_processing'
        })
    },
    showPanel(){
        this.$element('simplepanel').show();
    },
    closePanel(){
        this.$element('simplepanel').close();
    },
    changeMode(e){
        this.modeFlag = e.mode;
    },


}
