import activation from '../../mltoolkit/activation/activation.js'
import ability_featureAbility from '@ohos.ability.featureAbility';
import router from '@system.router';
var context = ability_featureAbility.getContext();

import {kv_put, kv_get, writeText} from './utils.js';

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
    launch(){
        router.push({
            uri:'pages/LR/LR',
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
