namespace Config{
    export namespace BattleskinCfg{
        let skinCfg:{[key:string]:BattleSkinCfgItem} = {}
        let skinKeys:Array<string> = []
        export function formatData(data: any){
            let skinList = data.skinList;
            for(let key in skinList){
                if(skinList.hasOwnProperty(key)){

                    let item = new BattleSkinCfgItem();
                    item.initData(skinList[key]);
                    skinCfg[key]=item;
                    skinKeys.push(key);    
                }
            }
        }

        export function getSkinInfoByID(id:string):BattleSkinCfgItem{
            return skinCfg[id];
        }

        export function getSkinInfo(){
            return skinCfg;
        }

        export function getIsDefaultSkin(id:string):boolean{
            if(skinCfg[id].getType == 1&&String(Api.LineVoApi.getUseSkinID()) == id){
                return false;
            }else{
                return true;
            }
            
        }

        export function getSkinIDs(){
            return skinKeys;
        }
    }

    export class BattleSkinCfgItem extends BaseItemCfg {
        /**皮肤列表上的排序 */
        public sortId = 0;
        /**获得方式 */
        public getType = 0;
        /**需要的奖杯数 */
        public needScore = 0;
        /**需要的钻石数 */
        public costGem = 0;
    }
}