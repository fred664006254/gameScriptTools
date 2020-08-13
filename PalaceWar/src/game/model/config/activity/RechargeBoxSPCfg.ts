namespace Config
{
	export namespace AcCfg
	{
		export class RechargeBoxSPCfg 
		{
			private rechargeBoxItemMap = {};
			private rechargeBoxItemMap2 = {};

            /**
             * 初始化数据
             */
			public formatData(data:any):void
			{
				
				for(let key in data.boxList)
				{
					let itemCfg:RechargeBoxSPItemCfg = new RechargeBoxSPItemCfg();
					itemCfg.initData(data.boxList[key]);
					itemCfg.id = Number(key)+1;
					this.rechargeBoxItemMap2[key] = itemCfg;

					if(!this.rechargeBoxItemMap.hasOwnProperty(itemCfg.needGem))
					{
						this.rechargeBoxItemMap[itemCfg.needGem] = itemCfg;	
					}
					this.rechargeBoxItemMap[itemCfg.needGem].addChild(itemCfg);
					
				}
            }
            public getDialogById(id, code):any{
                
                let ccode = null;
                if(this["AVGDialog_code" + code]) {
                    ccode = code;
                } else {
                    ccode = 1;
                }
                // if(id=="first"){
                //     return this["AVGDialog_code" + ccode]["first"];
                // } else {
                //     return this["AVGDialog_code" + ccode][`id${id}`];
                // }
                return this["AVGDialog_code1"]["first"];
                
            }
            private AVGDialog_code1 = {
                first:{
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":"wife_full_2020","nameId":"wifeName_2020","clickContinue":true,"resEndId":"2020"},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"2020"},
                    "3":{"nextId":"4", "descId":3, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"2020"},
					"4":{"nextId":"5", "descId":4, "bgId":6,"personPic":"wife_full_2020","nameId":"wifeName_2020","clickContinue":true,"resEndId":"2020"},
					"5":{"nextId":"6", "descId":5, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"2020"},
					"6":{"nextId":null, "descId":6, "bgId":6,"personPic":"wife_full_2020","nameId":"wifeName_2020","clickContinue":true,"resEndId":"2020"},
                },


            };

			public getBoxListBaseData():RechargeBoxSPItemCfg[]
			{
				let arr:RechargeBoxSPItemCfg[] = [];
				for(let key in this.rechargeBoxItemMap){
					arr.push(this.rechargeBoxItemMap[key]);
				}
				return arr;
			}
			/**
			 * 获取当前的boxList cfg
			 */
			public getBoxListData():RechargeBoxSPItemCfg[]
			{
				let arr:RechargeBoxSPItemCfg[] = [];
				for(let key in this.rechargeBoxItemMap){
					arr.push(this.rechargeBoxItemMap[key]);
				}

				arr.sort((a:RechargeBoxSPItemCfg,b:RechargeBoxSPItemCfg)=>{
					return b.id - a.id;
				});
				let maxIndex = 0;
				let maxCost = 0;
				for(let i = 0;i < arr.length;i++){
					let thirdPayGem = arr[i].thirdPayGem;
					if(thirdPayGem   ){
						if(thirdPayGem > maxCost){
							maxCost = thirdPayGem;
							maxIndex = i;
						}
					}else{
						let rechargecfg =  Config.RechargeCfg.getRechargeItemCfgByKey(arr[i].needGem);
						if(rechargecfg.cost > maxCost){
							maxCost = rechargecfg.cost;
							maxIndex = i;
						}
					}
				}
				if(maxIndex != 1 && arr.length >2){
					let tmp = arr[1];
					arr[1] = arr[maxIndex];
					arr[maxIndex] = tmp;

				}
				
				return arr;
			}
			//根据id得到数据
			public getBoxDataById(id:string)
			{
				return this.rechargeBoxItemMap2[id];
			}

			/**
			 * 根据充值档位取当前的cfg
			 */
			public getBoxData(gears:string):RechargeBoxSPItemCfg
			{

				for(let key in this.rechargeBoxItemMap)
				{
					let boxData:RechargeBoxSPItemCfg = this.rechargeBoxItemMap[key];
					if(boxData.needGem == gears){
						return boxData;
					}
				}
				return null;
			}

			/**
			 * 获取红颜头像框数据
			 */
			public getShowWifeData():any[]{
				let boxData = this.rechargeBoxItemMap2;
				let dataArr = [];
				for (let i in boxData){
					let rewards = boxData[i].getReward;
					let reward = rewards.split("|")[0];
					if (reward){
						let strArr = reward.split("_");
						let data:any = {};
						if (strArr[0] == "10"){
							data = {idType:reward, sortId:2, needGem:boxData[i].needGem};
							dataArr.push(data);
						} 
						else if (strArr[0] == "11" && strArr[1] == "4033"){
							data = {idType:reward, sortId:3, needGem:boxData[i].needGem};
							dataArr.push(data);
						}
						else if (strArr[0] == "8"){
							data = {idType:reward, sortId:1, needGem:boxData[i].needGem};
							dataArr.push(data);
						}
					}
				}
				dataArr.sort((a, b)=>{
					return a.sortId - b.sortId;
				});
				return dataArr;
			}

		}
		export class RechargeBoxSPItemCfg extends BaseItemCfg
		{
            /**充值档位ID */
			public id:number;
            /**
             * 充值次数条件
             */
            public rechargeTimeLimit:number;
			/**
			 * 背景颜色（0是黄色，1是红色）
			 */
			public backGround:number;
			/**
			 * 所需充值档位
			 */
			public needGem:string;
            /**
			 * 可获得奖励次数
			 */
			public limit:number = 0;
			/**
			 * 解锁id
			 */
			public unlockID:number = 0;
			/**
			 * 固定道具奖励
			 */
			public getReward:string;

			public gemDrop:[string,number][] = [];

			public childList:RechargeBoxSPItemCfg[] = [];
			public thirdPayGem:number = undefined;
			public VND:number = undefined;
			public addChild(child:RechargeBoxSPItemCfg)
			{
				if(child != null){
					if(this.childList.length > 0){
						this.limit += child.limit;
					}
					this.childList.push(child);
				}
			}
		}
	}
}