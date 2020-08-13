namespace Config 
{
	export namespace AcCfg 
	{
		export class FindSameCfg 
		{
			/** 每次开启活跃度 */
			public livenessNeed: number;
			/** 每次开启次数 */
			public playtime: number;
			/** 地图最大长度 */
			public maxY: number;
			/** 地图最大宽度 */
			public maxX: number;
			/** 玩家无操作提示时间间隔，单位秒 */
			public tipsTime: number;

            private rechargeList:any[] = [];
            private achievementList:any[] = [];
            public show1:number;
            public show2:number;
			public poolRewards:string;
            private taskList:any[] = [];
            public cost:number;			

			public formatData(data: any): void 
			{
				for (var key in data) 
				{
					if (data.hasOwnProperty(key)) 
					{
						this[key] = data[key];						
					}
                    if (key == "recharge")
					{
                        this.rechargeList = [];
                        for (let i = 0; i < data[key].length; i++ )
						{
                            let itemCfg = new FindSameRecharageItem();
                            itemCfg.initData(data[key][i]);
                            itemCfg.id = String(i+1);
                            this.rechargeList.push(itemCfg);
                        }
                    }
					else if (key == "achievement")
					{
                        this.achievementList = [];
                        for (let i = 0; i < data[key].length; i++ )
						{
                            let itemCfg = new FindSameAchievementItem();
                            itemCfg.initData(data[key][i]);
                            itemCfg.id = String(i+1);
                            this.achievementList.push(itemCfg);
                        }
                    }
                    else if (key == "pumpkinPool")
					{
                        let str = "";
                        for (let k in data[key])
						{
                            str += data[key][k][0] + "|";
                        }
                        this.poolRewards = str.substring(0, str.length - 1);
                    }
                    else if (key == "chessTask")
                    {
                        this.taskList = [];
                        let count = 1;
                        for (let i = 0; i < data[key].length; i++ )
                        {
                            for(let item in data[key][i])
                            {
                                let itemCfg = new FindSameTaskItem();
                                itemCfg.initData(data[key][i][item]);
                                itemCfg.id = String(count);
                                itemCfg.fid = String(i+1);
                                itemCfg.sid = item;
                                this.taskList.push(itemCfg);
                                count++;
                            }
                        }
                    }                    								
				}
			}
			/** 网格数宽度 */
			public get GRID_WIDTH() 
			{
				return this.maxX + 2;
			}
			/** 网格数高度 */
			public get GRID_HEIGHT() 
			{
				return this.maxY + 2;
			}
            //开始剧情
            public startDialog_1 = {
                1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personBone":"servant_full2_10492","personPic":'skin_full_10492',"nameId":"servant_name1049","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personBone":"wife_full3_2162","personPic":'wife_skin_2162',"nameId":"wifeName_216","clickContinue":true},
                    "3":{"nextId":"4", "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "4":{"nextId":null, "descId":4, "bgId":6,"personBone":"servant_full2_10492","personPic":"skin_full_10492","nameId":"servant_name1049","clickContinue":true},
                }
            };
            public startDialog_2 = {
                1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personBone":"servant_full2_10492","personPic":'skin_full_10492',"nameId":"servant_name1049","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personBone":"wife_full3_2162","personPic":'wife_skin_2162',"nameId":"wifeName_216","clickContinue":true},
                    "3":{"nextId":"4", "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "4":{"nextId":null, "descId":4, "bgId":6,"personBone":"servant_full2_10492","personPic":"skin_full_10492","nameId":"servant_name1049","clickContinue":true},
                }
            };
			private AVGDialog = {
				"1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "linkgame_npc", "nameId": "Linkgame_npc_name", "clickContinue": true, "resEndId": "109" },
				"2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "linkgame_npc", "nameId": "Linkgame_npc_name", "clickContinue": true, "resEndId": "109" },
				"3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "109" },
			};            
			public getDialogByBuildId(): any 
			{
				return this.AVGDialog;
			}
            public getRechargeList(){
                return this.rechargeList;
            }
            public getAchievementList(){
                return this.achievementList;
            }
            public getPoolRewards():string{
                return this.poolRewards;
            }	
            public getTaskList():any{
                return this.taskList;
            }            			
		}

        /**累充item */
        export class FindSameRecharageItem extends BaseItemCfg{
            /**充值id */
            public id:string = null;
            /**充值金额 */
            public needGem:number = 0;
            /**充值奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }
        /**进度奖励item */
        export class FindSameAchievementItem extends BaseItemCfg{
            /**id */
            public id:string = null;
            /**所需分数 */
            public needNum:number = 0;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }
        /**活动任务item */
        export class FindSameTaskItem extends BaseItemCfg{
            /**id */
            public id:string = null;
            /**任务类型*/
            public questType:number = 0;
            /**跳转类型 */
            public openType:string = null;
            /**进度 */
            public value:number = 0;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
            public fid:string;
            public sid:string;
        }        		
	}
}