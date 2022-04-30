import ability_featureAbility from '@ohos.ability.featureAbility';
import dataStorage from '@ohos.data.storage';

import file from '@system.file';

const test = "123";

export function number(){
    return test;
}

export async function kv_put(){
    var context = ability_featureAbility.getContext()
    var path = await context.getFilesDir()
    let storage = dataStorage.getStorage(path + '/mystore', function(err,storage){
        if(err){
            console.info("Get the storage failed, path: " + path + '/mystore')
            return;
        }
        storage.put('startup','hello_world')
        storage.flushSync()
        console.info('write to database success')
    })

}

export async function kv_get(){
    var context = ability_featureAbility.getContext()
    var path = await context.getFilesDir()
    var value;
    dataStorage.getStorage(path + '/mystore', function(err,storage){
        if(err){
            console.info("Get the storage failed, path: " + path + '/mystore')
            return;
        }
        value = storage.getSync('startup', 'default')
        console.info("The value of startup is " + value)
    })
}

export function writeText() {
        file.writeText({
            uri: 'internal://app/test.txt',
            text: 'Text that just for test.',
            success: function() {
                console.info('call writeText success.');
            },
            fail: function(data, code) {
                console.error('call fail callback fail, code: ' + code + ', data: ' + data);
            },
        });
}





