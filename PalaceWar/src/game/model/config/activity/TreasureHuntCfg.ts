namespace Config
{
	export namespace AcCfg
	{
        export class TreasureHuntCfg 
		{
            /**
             * 展示时间 
             * */
            public extraTime = 1;
            /**
             * 地图奖励 
             * */
            public map : Object = {};
            /**
             * 特殊格子奖池 
             * */
            public specialPoint : Object = {};
            /**
			 * --活动期间累计充值奖励 
             *  --needGem：所需额度：单位（元宝）
                --getReward：奖励
			 */
            public recharge:Object={};
            /**
             *财神生效次数
            */
            public wealthGodTimes:number=0;
            /**
             *财神附加奖励
            */
            public wealthGod:any[]=[];
            /**
             *圈数奖励
            */
            public circleReward : Object = {};
            /*
            *每日任务 
            */
            public dailyTask : Object = {};
            

            
            
            public formatData(data:any):void{
                this.extraTime = data.extraTime;
                this.wealthGodTimes = data.wealthGodTimes;
                this.wealthGod = data.wealthGod;
                this.dailyTask = data.dailyTask;

                for(let key in data.map){
                    let itemCfg:TreasureMapItemCfg;
                    let index = Number(key) + 1;
                    if(!this.map.hasOwnProperty(index.toString())){
                        this.map[index] = new TreasureMapItemCfg();
                    }
                    itemCfg = this.map[index];
                    itemCfg.initData(data.map[key]);
                    itemCfg.id = index;
                }

                for(let key in data.specialPoint){
                    let itemCfg:TreasureSpecialItemCfg;
                    let index = Number(key) + 1;
                    if(!this.specialPoint.hasOwnProperty(index.toString())){
                        this.specialPoint[index] = new TreasureSpecialItemCfg();
                    }
                    itemCfg = this.specialPoint[index];
                    itemCfg.arr = data.specialPoint[key];
                    itemCfg.id = index;
                }

                for(let key in data.circleReward){
                    let itemCfg:TreasureCircleItemCfg;
                    let index = Number(key) + 1;
                    if(!this.circleReward.hasOwnProperty(index.toString())){
                        this.circleReward[index] = new TreasureCircleItemCfg();
                    }
                    itemCfg = this.circleReward[index];
                    itemCfg.initData(data.circleReward[key]);
                    itemCfg.id = index;
                } 
            }  
            
            private AVGDialog = {
                buildId1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":"wife_skin_1091","nameId":"wifeName_109","clickContinue":true,"resEndId":"109"},
                    "2":{"nextId":null, "descId":2, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"109"},
                },
                buildId2 : {
                    "1":{"nextId":"2", "descId":3, "bgId":6,"personPic":"wife_skin_1091","nameId":"wifeName_109","clickContinue":true,"resEndId":"109"},
                    "2":{"nextId":"3", "descId":4, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"109"},
                    "3":{"nextId":null, "descId":5, "bgId":6,"personPic":"wife_skin_1091","nameId":"wifeName_109","clickContinue":true,"resEndId":"109"},
                },
                buildId3 : {
                    "1":{"nextId":"2", "descId":6, "bgId":6,"personPic":"wife_skin_1091","nameId":"wifeName_109","clickContinue":true,"resEndId":"109"},
                    "2":{"nextId":"3", "descId":7, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"109"},
                    "3":{"nextId":null, "descId":8, "bgId":6,"personPic":"wife_skin_1091","nameId":"wifeName_109","clickContinue":true,"resEndId":"109"},
                },
                buildId4 : {
                    "1":{"nextId":"2", "descId":9, "bgId":6,"personPic":"wife_skin_1091","nameId":"wifeName_109","clickContinue":true,"resEndId":"109"},
                    "2":{"nextId":null, "descId":10, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"109"},
                },
                buildId5 : {
                    "1":{"nextId":"2", "descId":11, "bgId":6,"personPic":"wife_skin_1091","nameId":"wifeName_109","clickContinue":true,"resEndId":"109"},
                    "2":{"nextId":null, "descId":12, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"109"},
                },
                buildId6 : {
                    "1":{"nextId":"2", "descId":13, "bgId":6,"personPic":"wife_skin_1091","nameId":"wifeName_109","clickContinue":true,"resEndId":"109"},
                    "2":{"nextId":null, "descId":14, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"109"},
                },
                buildId7 : {
                    "1":{"nextId":"2", "descId":15, "bgId":6,"personPic":"wife_skin_1091","nameId":"wifeName_109","clickContinue":true,"resEndId":"109"},
                    "2":{"nextId":null, "descId":16, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"109"},
                },
                buildId8 : {
                    "1":{"nextId":"2", "descId":17, "bgId":6,"personPic":"wife_skin_1091","nameId":"wifeName_109","clickContinue":true,"resEndId":"109"},
                    "2":{"nextId":null, "descId":18, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"109"},
                },
            };
            private AVGDialog_code2 = {
                buildId1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":null, "descId":2, "bgId":6,"personPic":"wife_skin_2131","nameId":"wifeName_213","clickContinue":true,"resEndId":"213"},
                },
                buildId2 : {
                    "1":{"nextId":"2", "descId":3, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":null, "descId":4, "bgId":6,"personPic":"wife_skin_2131","nameId":"wifeName_213","clickContinue":true,"resEndId":"213"},
                },
                buildId3 : {
                    "1":{"nextId":"2", "descId":5, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":"3", "descId":6, "bgId":6,"personPic":"wife_skin_2131","nameId":"wifeName_213","clickContinue":true,"resEndId":"213"},
                    "3":{"nextId":null, "descId":7, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                },
                buildId4 : {
                    "1":{"nextId":"2", "descId":8, "bgId":6,"personPic":"wife_skin_2131","nameId":"wifeName_213","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":null, "descId":9, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                },
                buildId5 : {
                    "1":{"nextId":"2", "descId":10, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":null, "descId":11, "bgId":6,"personPic":"wife_skin_2131","nameId":"wifeName_213","clickContinue":true,"resEndId":"213"},
                },
                buildId6 : {
                    "1":{"nextId":"2", "descId":12, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":null, "descId":13, "bgId":6,"personPic":"wife_skin_2131","nameId":"wifeName_213","clickContinue":true,"resEndId":"213"},
                },
                buildId7 : {
                    "1":{"nextId":"2", "descId":14, "bgId":6,"personPic":"nanguajiangshi","nameId":"acDoubleSeventhMonsterNpc","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":"3", "descId":15, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    "3":{"nextId":null, "descId":16, "bgId":6,"personPic":"wife_skin_2131","nameId":"wifeName_213","clickContinue":true,"resEndId":"213"},
                },
                buildId8 : {
                    "1":{"nextId":"2", "descId":17, "bgId":6,"personPic":"wife_skin_2131","nameId":"wifeName_213","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":"3", "descId":18, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    "3":{"nextId":null, "descId":19, "bgId":6,"personPic":"wife_skin_2131","nameId":"wifeName_213","clickContinue":true,"resEndId":"213"},
                },
            };

              private AVGDialog_code3 = {
                buildId1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":null, "descId":2, "bgId":6,"personPic":"wife_skin_3032","nameId":"wifeName_303","clickContinue":true,"resEndId":"213"},
                },
                buildId2 : {
                    "1":{"nextId":"2", "descId":3, "bgId":6,"personPic":"wife_skin_3032","nameId":"wifeName_303","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":null, "descId":4, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                },
                buildId3 : {
                    "1":{"nextId":"2", "descId":5, "bgId":6,"personPic":"wife_skin_3032","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":null, "descId":6, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    },
                buildId4 : {
                    "1":{"nextId":"2", "descId":7, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":null, "descId":8, "bgId":6,"personPic":"wife_skin_3032","nameId":"wifeName_303","clickContinue":true,"resEndId":"213"},
                },
                buildId5 : {
                    "1":{"nextId":"2", "descId":9, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":null, "descId":10, "bgId":6,"personPic":"wife_skin_3032","nameId":"wifeName_303","clickContinue":true,"resEndId":"213"},
                },
                buildId6 : {
                    "1":{"nextId":"2", "descId":11, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":null, "descId":12, "bgId":6,"personPic":"wife_skin_3032","nameId":"wifeName_303","clickContinue":true,"resEndId":"213"},
                },
                buildId7 : {
                    "1":{"nextId":"2", "descId":13, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":null, "descId":14, "bgId":6,"personPic":"wife_skin_3032","nameId":"wifeName_303","clickContinue":true,"resEndId":"213"},
                   
                },
                buildId8 : {
                    "1":{"nextId":"2", "descId":15, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":"3", "descId":16, "bgId":6,"personPic":"wife_skin_3032","nameId":"wifeName_303","clickContinue":true,"resEndId":"213"},
                    "3":{"nextId":"4", "descId":17, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    "4":{"nextId":null, "descId":18, "bgId":6,"personPic":"wife_skin_3032","nameId":"wifeName_303","clickContinue":true,"resEndId":"213"},
                },
            };
    
            public getDialogByBuildId(id, code):any{
                if (String(code) === "1") {
                    return this.AVGDialog[`buildId${id}`];
                } else {
                    return this["AVGDialog_code" + code][`buildId${id}`];
                }
            }
            //任务或者奖励 2 任务  1奖励
            public  getTaskorReward(showNum:number=0,day:number=1):Array<any>
            {
                let arr =[]; 
                let dailyTask = this.dailyTask[day];
                for(var key in dailyTask)
                {
                    if(dailyTask[key].show==showNum)
                    {   
                        dailyTask[key].name =key;
                        arr.push(dailyTask[key]);  
                    } 
                }  
                arr.sort(function(a: any,b: any):number
                {
                    if(a.sortId > b.sortId) return 1;
                    else if(a.sortId == b.sortId) return 0;
                    return -1;
                }); 
                return  arr;
            }
        }

        class TreasureMapItemCfg extends BaseItemCfg{
            public id:number;
            /*
            *格子ID 
            */
            public pointID:number;
            /*
            *格子类型(1：普通格子；2：财神；3：剧情建筑)
            */
            public pointType:number;
            /*
            *奖励
            */
            public getReward:string;
            /*
            *随机奖池
            */
            public randomPool:any[];
            /*
            *特殊格子对应关系
            */
            public relative:number;
        }

        class TreasureSpecialItemCfg extends BaseItemCfg{
            public id:number;
            public arr:any[];
        }

        export class TreasureCircleItemCfg extends BaseItemCfg{
            public id:number;
            /*
            *圈数 
            */
            public num:number;
            /*
            *奖励
            */
            public getReward:string;
        }
          //任务奖励
          export class TreasureRewardItemCfg extends BaseItemCfg{
            //  questType:任务类型
            // --show:页签控制：前端字段
            // --sortId:排序
            // --value:任务参数
            // --openType:任务跳转
            // --specialReward:特殊奖励:奖励骰子个数
            // --getReward:奖励
            public id:number;
            public questType:number; 
            public show:number; 
            public sortId:number; 
            public value:string; 
            public specialReward:number;
            
        }
        
	}
}