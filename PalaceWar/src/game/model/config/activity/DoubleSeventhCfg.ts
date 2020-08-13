namespace Config
{
	export namespace AcCfg
	{
        export class DoubleSeventhCfg 
		{
	    	/**
			 * --活动期间累计充值奖励 
             *  --needGem：所需额度：单位（元宝）
                --getReward：奖励
			 */
			public recharge:Object={};
            public exchange:any = {};

            /**
             * 兑换商店
             */
            public shop:Object = {};

            //商店兑换
            public getShopArr():any[]{
                let arr = [];

                for(let i in this.shop){

                    let unit = this.shop[i];
                    if (unit.getReward == "6_1740_1")
					{
						if (Api.switchVoApi.checkOpenServantLevel450())
						{
							 arr.push(unit);
						}
					}
					else
					{
						 arr.push(unit);
					}
                   
                }
                return arr;
            }
            
            public formatData(data:any):void
            {
                for(var key in data.recharge)
                {
                    let itemCfg:SevenRechargeItemCfg;
                    if(!this.recharge.hasOwnProperty((Number(key) + 1).toString()))
                    {
                        this.recharge[Number(key) + 1] = new SevenRechargeItemCfg();
                    }
                    itemCfg = this.recharge[Number(key) + 1];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id = Number(key) + 1;
                }

                this.exchange = data.exchange;
                for(var key in data.shop)
				{
					let itemCfg:SevenShopCfg;
					let id = Number(key) + 1;
					if(!this.shop[id])
					{   
						this.shop[id]=new SevenShopCfg();
					}
					itemCfg=this.shop[id];
					itemCfg.initData(data.shop[key]);
					itemCfg.id=id;
				}
            }  
            
            public getSkin(code):string{
                let skinid = '';
                switch(Number(code)){
                    case 1:
                        skinid = `1091`;
                        break;
                    case 2:
                        skinid = `2131`;
                        break;
                    case 3:
                        skinid = `3032`
                        break;
                    case 4:
                        skinid = `10332`
                        break;
                }
                return skinid;
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
                    "1":{"nextId":"2", "descId":5, "bgId":6,"personPic":"wife_skin_3032","nameId":"wifeName_303","clickContinue":true,"resEndId":"213"},
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

            private AVGDialog_code4 = {
                buildId1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":null, "descId":2, "bgId":6,"personPic":"skin_full_10332","nameId":"servant_name1033","clickContinue":true,"resEndId":"213"},
                },
                buildId2 : {
                    "1":{"nextId":"2", "descId":3, "bgId":6,"personPic":"skin_full_10332","nameId":"servant_name1033","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":null, "descId":4, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                },
                buildId3 : {
                    "1":{"nextId":"2", "descId":5, "bgId":6,"personPic":"skin_full_10332","nameId":"servant_name1033","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":null, "descId":6, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    },
                buildId4 : {
                    "1":{"nextId":"2", "descId":7, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":null, "descId":8, "bgId":6,"personPic":"skin_full_10332","nameId":"servant_name1033","clickContinue":true,"resEndId":"213"},
                },
                buildId5 : {
                    "1":{"nextId":"2", "descId":9, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":null, "descId":10, "bgId":6,"personPic":"skin_full_10332","nameId":"servant_name1033","clickContinue":true,"resEndId":"213"},
                },
                buildId6 : {
                    "1":{"nextId":"2", "descId":11, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":null, "descId":12, "bgId":6,"personPic":"skin_full_10332","nameId":"servant_name1033","clickContinue":true,"resEndId":"213"},
                },
                buildId7 : {
                    "1":{"nextId":"2", "descId":13, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":null, "descId":14, "bgId":6,"personPic":"skin_full_10332","nameId":"servant_name1033","clickContinue":true,"resEndId":"213"},
                   
                },
                buildId8 : {
                    "1":{"nextId":"2", "descId":15, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":"3", "descId":16, "bgId":6,"personPic":"skin_full_10332","nameId":"servant_name1033","clickContinue":true,"resEndId":"213"},
                    "3":{"nextId":"4", "descId":17, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    "4":{"nextId":null, "descId":18, "bgId":6,"personPic":"skin_full_10332","nameId":"servant_name1033","clickContinue":true,"resEndId":"213"},
                },
            };

            private AVGDialog_code5 = {
                buildId1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":null, "descId":2, "bgId":6,"personPic":"servant_full_1030","nameId":"servant_name1030","clickContinue":true,"resEndId":"213"},
                },
                buildId2 : {
                    "1":{"nextId":"2", "descId":3, "bgId":6,"personPic":"servant_full_1029","nameId":"servant_name1029","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":null, "descId":4, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                },
                buildId3 : {
                    "1":{"nextId":"2", "descId":5, "bgId":6,"personPic":"wife_full_208","nameId":"wifeName_208","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":null, "descId":6, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    },
                buildId4 : {
                    "1":{"nextId":"2", "descId":7, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":null, "descId":8, "bgId":6,"personPic":"searchnpc_full81","nameId":"searchPersonName71","clickContinue":true,"resEndId":"213"},
                },
                buildId5 : {
                    "1":{"nextId":"2", "descId":9, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":null, "descId":10, "bgId":6,"personPic":"wife_full_102","nameId":"wifeName_102","clickContinue":true,"resEndId":"213"},
                },
                buildId6 : {
                    "1":{"nextId":"2", "descId":11, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":null, "descId":12, "bgId":6,"personPic":"searchnpc_full71","nameId":"searchPersonName81","clickContinue":true,"resEndId":"213"},
                },
                buildId7 : {
                    "1":{"nextId":"2", "descId":13, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":null, "descId":14, "bgId":6,"personPic":"searchnpc_full41","nameId":"searchPersonName41","clickContinue":true,"resEndId":"213"},
                   
                },
                buildId8 : {
                    "1":{"nextId":"2", "descId":15, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    "2":{"nextId":"3", "descId":16, "bgId":6,"personPic":"wife_full_302","nameId":"wifeName_302","clickContinue":true,"resEndId":"213"},
                    "3":{"nextId":"4", "descId":17, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"213"},
                    "4":{"nextId":null, "descId":18, "bgId":6,"personPic":"wife_full_302","nameId":"wifeName_302","clickContinue":true,"resEndId":"213"},
                },
            };
    
            public getDialogByBuildId(id, code):any{
                if (String(code) === "1") {
                    return this.AVGDialog[`buildId${id}`];
                } else {
                    return this["AVGDialog_code" + code][`buildId${id}`];
                }
            }

            public getExchangeSceneId():string
            {   
                if (!this.exchange || !this.exchange.getReward)
                {
                    return null;
                }
                let scenestr:string = this.exchange.getReward;
                return scenestr.split("_")[1];
            }

            public getExchangeNeedItemId():string
            {   
                if (!this.exchange || !this.exchange.needPart)
                {
                    return null;
                }
                let scenestr:string = this.exchange.needPart;
                return scenestr.split("_")[1];
            }

            public getExchangeNeedItemNum():number
            {   
                if (!this.exchange || !this.exchange.needPart)
                {
                    return null;
                }
                let scenestr:string = this.exchange.needPart;
                let numstr:string = scenestr.split("_")[2]
                return Number(numstr);
            }
        }

        class SevenRechargeItemCfg extends BaseItemCfg
        {
            public id:Number;
            /**
             * 所需额度：单位（元宝）
             */
            public needGem:number;
            /**
             * 奖励
             */
            public getReward:string;
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.getReward,true,false);
            }
        }

        export class SevenShopCfg extends BaseItemCfg
		{
			public id: number;
			/**
			 * 获得奖励
			 */
			public getReward:string;
			/**
			 * 需要碎片数量
			 */
			public needPart:number;
			/**
			 * 限购
			 */
			public limit:number;

			public get rewardIcons():BaseDisplayObjectContainer
            {
				return GameData.getRewardItemIcons(this.getReward,true,false)[0];
            }
		}
	}
}