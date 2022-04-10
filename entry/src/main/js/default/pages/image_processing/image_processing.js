import fileio from '@ohos.fileio';
import prompt from '@system.prompt';
import router from '@system.router';
import {kv_get,kv_put} from '../../utils/utils.js';

// abilityType: 0-Ability; 1-Internal Ability
const ABILITY_TYPE_EXTERNAL = 0;
const ABILITY_TYPE_INTERNAL = 1;
// syncOption(Optional, default sync): 0-Sync; 1-Async
const ACTION_SYNC = 0;
const ACTION_ASYNC = 1;
const ACTION_MESSAGE_CODE_PLUS = 1001;

export default {
    plus:async function(){
        var actionData = {};
        actionData.firstNum = 1024;
        actionData.secondNum = 2048;

        var action = {};
        action.bundleName = 'com.example.myapplication';
        action.abilityName = 'com.example.myapplication.ComputeServiceAbility';
        action.messageCode = ACTION_MESSAGE_CODE_PLUS;
        action.data = actionData;
        action.abilityType = ABILITY_TYPE_EXTERNAL;
        action.syncOption = ACTION_SYNC;

        var result = await FeatureAbility.callAbility(action);
        var ret = JSON.parse(result);
        if (ret.code == 0) {
            console.info('plus result is:' + JSON.stringify(ret.abilityResult));
        } else {
            console.error('plus error code:' + JSON.stringify(ret.code));
        }
    },

    data: {
        title: 'World',
        rows: 418,
        cols: 627
    },
    onShow() {
        let padding = 20;
        let scaling = (400 - padding * 4) / this.cols;
        console.info(scaling);
        this.loadImage();
        this.plus();
    },
    launch() {
        router.back();
    },
    onMenuSelected(e) {
        prompt.showToast({
            message: e.value
        })
        if (e.value == "Item 1") {
            this.launch()
        }
    },
    loadImage(){
        fileio.readText('common/json/imageData.json')
            .then(function(str) {
                // 读取文件成功，do something
                console.info(str)
            }).catch(function(e){
                console.info(e.message);
        });
    }
}
