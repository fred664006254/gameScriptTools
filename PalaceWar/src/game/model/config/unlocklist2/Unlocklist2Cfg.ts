namespace Config
{
    /**功能解锁 弹特效 */
	export namespace Unlocklist2Cfg 
	{
	    let unlockList: Object = {};	
		export function formatData(data: any): void 
		{
			for (var key in data) 
			{
				if (!unlockList.hasOwnProperty(String(key))) 
				{
					unlockList[String(key)] = new Unlocklist2ItemCfg();
				}
				let itemCfg = unlockList[String(key)];
				itemCfg.initData(data[key]);
				itemCfg.id = key;
        	}
        }

        //功能解锁列表
        export function getUnLockCfgList():Unlocklist2ItemCfg[]{
            let arr:Unlocklist2ItemCfg[] = [];
            for (let key in unlockList){
                arr.push(unlockList[key]);
            }
            return arr;
        }

        //需要展示解锁弹窗列表
        export function getUnlockCfgListByShow(isNeedShow:boolean):Unlocklist2ItemCfg[]{
            let arr:Unlocklist2ItemCfg[] = [];
            for (let key in unlockList){
                if (isNeedShow){
                    if (unlockList[key].unlockOpen){
                        arr.push(unlockList[key]);
                    }
                }
                else{
                    if (unlockList[key].unlockOpen == 0){
                        arr.push(unlockList[key]);
                    }
                }
            }
            return arr;
        }

        /**府内 府外展示列表 1: 府内  2:府外  0:功能内部 */
        export function getNeedShowCfgListByType(type:number):Unlocklist2ItemCfg[]{
            let arr:Unlocklist2ItemCfg[] = [];
            let list = this.getUnLockCfgList();
            for (let i=0; i < list.length; i++){
                if (list[i].position == type){
                    arr.push(list[i]);
                }
            }
            return arr;
        }

        export function getUnlockCfgByName(name:string):Unlocklist2ItemCfg{
            if (!name){
                return null;
            }
            let list = this.getUnLockCfgList();
            for (let i=0; i < list.length; i++){
                if (list[i].gameName == name){
                    return list[i];
                }
            }
            return null;
        }

	    // export function getUnlockItemCfgList():Array<Unlocklist2ItemCfg>
		// {
		// 	let arr:Array<Unlocklist2ItemCfg> = new Array();
		// 	for(let key in unlockList)
		// 	{
		// 		if(unlockList[key].gameName)
		// 		{ 
		// 			let functionName:string = "checkOpen"+App.StringUtil.firstCharToUper(unlockList[key].gameName);
		// 			if(Api.switchVoApi[functionName])
		// 			{
		// 				if(Api.switchVoApi[functionName]())
		// 				{
		// 					arr.push(unlockList[key]);
		// 				}
		// 			}
		// 			else
		// 			{
		// 				arr.push(unlockList[key]);
		// 			}
		// 		} 
		// 	}
			
		// 	arr.sort(function(a: any,b: any):number
		// 	{
		// 		if(a.sortId > b.sortId) return 1;
		// 		else if(a.sortId == b.sortId) return 0;
		// 		return -1;
		// 	});
		// 	return arr; 
		// } 
	  
        export class Unlocklist2ItemCfg extends BaseItemCfg {
            public id:string;
            public gameName:string = null; 
            public unlockOpen:number;
            public position:number;
        }
    }	
}