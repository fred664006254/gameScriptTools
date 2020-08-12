namespace Config{
    export namespace SignCfg{
        let signCfg:{[key:string]:SiginCfgItem} = {};
        let signKeys:Array<string> = [];
        let signLoopKeys:Array<string> = [];
        export function formatData(data: any){
            let signList = data.signReward;
            for(let key in signList){
                if(signList.hasOwnProperty(key)){

                    let item = new SiginCfgItem();
                    item.initData(signList[key]);
                    signCfg[key]=item;
                    if(Number(key)<=7){
                        signKeys.push(key);   
                    }else{
                        signLoopKeys.push(key);
                    }
                     
                }
            }
            signKeys.splice(6,1);
            signLoopKeys.splice(6,1);
        }

        export function getSignInfoByID(id:string):string{
            return signCfg[id].getReward;
        }

        export function getSkinInfo(){
            return signCfg;
        }

        // export function getIsDefaultSkin(id:string):boolean{
        //     if(signCfg[id].getType == 1&&String(Api.LineVoApi.getUseSkinID()) == id){
        //         return false;
        //     }else{
        //         return true;
        //     }
            
        // }

        export function getSgnIDs(){
            return signKeys;
        }
        export function getSgnLoopIDs(){
            return signLoopKeys;
        }
    }

    export class SiginCfgItem extends BaseItemCfg {
        /**是否循环 */
        public isLoop = "";
        /**获得的宝箱ID */
        public getReward = "";
    }
}