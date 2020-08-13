namespace Config
{
	export namespace AcCfg
	{
		export class SingleDayCfg 
		{
            /**活动结束后的展示期*/
            public extraTime:number;
			/**
			 * 双十一红包雨每天开始时间(s)
			 */
			public startTime:number;
			/**
			 * 双十一红包雨每天结束时间(s)  注：21点时会开启最后一场红包雨，22点结束
			 */
			public endTime:number;

			/**
			 *红包雨开启间隔(s)
			 */
            public luckyPacketCD:number;

            /**
			 *红包雨抢购时间(s)
			 */
            public luckyPacketPurchase:number;
            

			/**
			 * 一场红包雨期间可抢代金券上限
			 */
			public couponLimit:number;

			/**
			 * --玩家一天可抢红包上限
			 */
            public pocketLimit:number;
            
            /**
			 * --代金券最多抵扣:折扣后商品价格 * deductionLimit
			 */
            public deductionLimit:number;

			/**
			 * --活动期间累计充值奖励 
             *      --needGem：所需额度：单位（元宝）
                    --getReward：奖励
			 */
			public recharge:Object={};

			/**
			 *  --活动期间累计消费元宝奖励(产红包)
                    --needGem：所需额度：单位（元宝）
                    --getReward：奖励
			 */
			public useGem:Object={};
			/**
			 * --服装店道具列表(皮肤和称号),展示金额为price * rebate
                --itemID：道具
                --price：原价格
                --rebate：折扣
                --limit：限购数量
			 */
            public skinList:Object={};

            /**
             * --活动期间排行榜上榜限制：消费10000元宝可以上榜
            */
            public rankNeed : number;
            /**
			 *   --活动期间累计消费元宝排行奖励(产皮肤)
                    --rank：排名
                    --getReward：奖励
			 */
            public gemRank:Object={};
            /**
			 *--奇珍异宝,展示金额为price * rebate
                --itemID：道具
                --price：原价价格
                --rebate：折扣
                --limit：限购数量
			 */
            public itemsList:Object={};

            /**
             * 代金券配置
            */
            public coupon:Object={};

            
            public formatData(data:any):void{
                this.extraTime = data.extraTime;
                this.startTime = data.startTime;
                this.endTime = data.endTime;
                this.luckyPacketCD = data.luckyPacketCD;
                this.rankNeed = data.rankNeed;
                this.luckyPacketPurchase = data.luckyPacketPurchase;
                this.couponLimit = data.couponLimit;
                this.pocketLimit = data.pocketLimit;
                this.deductionLimit = data.deductionLimit;
        
                for(var key in data.coupon){
                    let itemCfg:SDCouponItemCfg;
                    if(!this.coupon.hasOwnProperty(String(key))){
                        this.coupon[String(key)]=new SDCouponItemCfg();
                    }
                    itemCfg=this.coupon[String(key)];
                    itemCfg.initData(data.coupon[key]);
                    itemCfg.id=Number(key);
                }

                for(var key in data.recharge){
                    let itemCfg:SDRechargeItemCfg;
                    if(!this.recharge.hasOwnProperty(String(key)))
                    {
                        this.recharge[String(key)]=new SDRechargeItemCfg();
                    }
                    itemCfg=this.recharge[String(key)];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id=Number(key);
                }

                for(var key in data.useGem){
                    let itemCfg:SDUseGemItemCfg;
                    if(!this.useGem.hasOwnProperty(String(key)))
                    {
                        this.useGem[String(key)]=new SDUseGemItemCfg();
                    }
                    itemCfg=this.useGem[String(key)];
                    itemCfg.initData(data.useGem[key]);
                    itemCfg.id=Number(key);
                }

                for(var key in data.gemRank){
                    let itemCfg:SDGemRankItemCfg;
                    if(!this.gemRank.hasOwnProperty(String(key)))
                    {
                        this.gemRank[String(key)]=new SDGemRankItemCfg();
                    }
                    itemCfg=this.gemRank[String(key)];
                    itemCfg.initData(data.gemRank[key]);
                    itemCfg.id=Number(key);
                }

                for(var key in data.skinList){
                    let tmpdata = data.skinList[key];
                    let rvo = GameData.formatRewardItem(tmpdata.itemID)[0];
                    //过滤没有开启的皮肤
                    if(rvo.type == 16 && !Config.WifeskinCfg.isSkinOPend("" + rvo.id)){
                        continue;
                    }
                    if(rvo.type == 11 && !Config.TitleCfg.isTitleOPend("" + rvo.id)){
                        continue;
                    }
                    let itemCfg:SDSkinListItemCfg;
                    if(!this.skinList.hasOwnProperty(String(key)))
                    {
                        this.skinList[String(key)]=new SDSkinListItemCfg();
                    }
                    itemCfg=this.skinList[String(key)];
                    itemCfg.initData(data.skinList[key]);
                    itemCfg.id=Number(key);
                }

                for(var key in data.itemsList){
                    let itemCfg:SDItemsListItemCfg;
                    if(!this.itemsList.hasOwnProperty(String(key)))
                    {
                        this.itemsList[String(key)]=new SDItemsListItemCfg();
                    }
                    itemCfg=this.itemsList[String(key)];
                    itemCfg.initData(data.itemsList[key]);
                    itemCfg.id=Number(key);
                }
            }

            public AVGDialog = {
                1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":"wife_skin_1091","nameId":"wifeName_109","clickContinue":true,"param":[]},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"wife_skin_1091","nameId":"wifeName_109","clickContinue":true,"param":[`${this.startTime/3600}:00`, `${this.endTime/3600}:00`]},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":"wife_skin_1091","nameId":"wifeName_109","clickContinue":true,"param":[`${this.startTime/3600}:00`, `${this.endTime/3600}:00`]},
                },
                2 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":"servant_full_1001","nameId":"servant_name1001","clickContinue":true,"param":[]},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"servant_full_1001","nameId":"servant_name1001","clickContinue":true,"param":[`${this.startTime/3600}:00`, `${this.endTime/3600}:00`]},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":"servant_full_1001","nameId":"servant_name1001","clickContinue":true,"param":[`${this.startTime/3600}:00`, `${this.endTime/3600}:00`]},
                },
            }
        }


        class SDCouponItemCfg extends BaseItemCfg{
            public id:number;
            /**
             * 面额
             */
            public value:number;
            /**
             * 权重
             */
            public weight:number;
        }

        export class SDRechargeItemCfg extends BaseItemCfg{
            public id:number;
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

        export class SDUseGemItemCfg extends BaseItemCfg{
            public id:number;
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

        class SDGemRankItemCfg extends BaseItemCfg{
            public id:number;
            /**
             * 排名上限
             */
            public rank:number[];
            /**
             * 达到进度的奖励
             */
            public getReward:string;
            public get minRank():number
            {
                return this.rank[0];
            }
            public get maxRank():number
            {
                return this.rank[1];
            }
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.getReward,true,true);
            }
        }

        class SDSkinListItemCfg extends BaseItemCfg {
            public id:number;
            /**
             * 限购次数 
             */
            public limit:number;
            /*
            道具原价
            */
            public price:number;
            /*
            折扣
            */
            public rebate:number;
            /**
             * 内容和数量
             */
            public itemID:string;
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.itemID,true,false);
            }
        }
        
        export class SDItemsListItemCfg extends BaseItemCfg
        {
            public id:number;
            /**
             * 限购次数 
             */
            public limit:number;
            /*
            道具原价
            */
            public price:number;
            /*
            折扣
            */
            public rebate:number;
            /**
             * 内容和数量
             */
            public itemID:string;
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.itemID,true,false);
            }
        }
	}
}