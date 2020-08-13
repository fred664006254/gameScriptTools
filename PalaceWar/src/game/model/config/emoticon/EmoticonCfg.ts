namespace Config
{   
	export namespace EmoticonCfg 
	{  
        export let emoticonList:Object={};
        export let emoticonTypeArr:number[] = [];

        export function formatData(data:any):void{
            for (let key in data){
                let emoticonItem:EmoticonCfgItem = new EmoticonCfgItem();
                emoticonItem.initData(data[key]);
                emoticonItem.id = String(key);
                emoticonItem.sortId = Number(key);
                if(!emoticonList.hasOwnProperty(String(key)))
                {
                    emoticonList[String(key)]= emoticonItem;
                }
                let groupId = data[key].group;
                let isFind = false;
                for (let k in this.emoticonTypeArr){
                    if (groupId == this.emoticonTypeArr[k]){
                        isFind = true;
                        break;
                    }
                }
                if (!isFind){
                    this.emoticonTypeArr.push(groupId);
                }
            }
            this.emoticonTypeArr.sort((a, b) => { return a - b});
        }

        export function getEmoticonCfgById(id:string):EmoticonCfgItem{
            return this.emoticonList[id];
        }
    }


    export class EmoticonCfgItem extends BaseItemCfg{
        public group:number = 0;
        public unlock:number = 0;
        public exchange:string = null;
        public id:string = null;
        public need:number = 0;
        public sortId:number = 0;
        public status:number = 0;
        public frame:number = 0;
    }
} 