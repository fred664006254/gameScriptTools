namespace Config
{
	export namespace AcCfg
	{
		export class BirdBridgeCfg 
        {
             /**展示时间 */
            public extraTime:number = 0;
            //每次行动消耗道具
            public needItem:string = null;
             /**每日免费次数 */
            public freeTime:number = 0;

            public basePool:any[] = null;


            /**许愿奖励  */
            public wish: BirdBridgeWishItem[] = [];
            /**  活动期间的累计充值奖励  */
            public teaRecharge: BirdBridgeRechargeItem[] = [];
            /** 个人进度奖励  */
            public achievementOne: BirdBridgeAchievementOneItem[] = [];
            /**  全服进度奖励  */
            public achievementAll: BirdBridgeAchievementAllItem[] = [];


            public formatData(data: any): void {
                for (var key in data) {
                    if (key == "wish") {
                        this.wish = []
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new BirdBridgeWishItem();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = i + 1;

                            let rewardVo = GameData.formatRewardItem(itemcfg.getReward)[0];
                            let itemCfg = Config.ItemCfg.getItemCfgById(rewardVo.id);

                            let rewardVo2 = null;
                            if (itemCfg && itemCfg.getRewards)
                            {
                                rewardVo2 = GameData.formatRewardItem(itemCfg.getRewards)[0];;
                            }
                            
                            if (rewardVo.type==6 && itemCfg && itemCfg.servantSkinID)
                            {
                                if (!Api.switchVoApi.checkIsServantSkinState(String(itemCfg.servantSkinID)))
                                {
                                    continue;
                                }
                            }

                            if (rewardVo.type==8 && Config.ServantCfg.checkIsLockedByGM(String(rewardVo.id)))
                            {
                                 continue;
                            }

                            if (rewardVo2 && rewardVo2.type==8 && Config.ServantCfg.checkIsLockedByGM(String(rewardVo2.id)))
                            {
                                 continue;
                            }

                            if (rewardVo.type==10 && Config.WifeCfg.checkIsLockedByGM(String(rewardVo.id)))
                            {
                                 continue;
                            }

                            if (rewardVo2 && rewardVo2.type==10 && Config.WifeCfg.checkIsLockedByGM(String(rewardVo2.id)))
                            {
                                 continue;
                            }
                            
                             if (rewardVo.type==16 && !Config.WifeskinCfg.isSkinOPend(String(rewardVo.id)))
                            {
                                 continue;
                            }

                            if (rewardVo2 && rewardVo2.type==16 && !Config.WifeskinCfg.isSkinOPend(String(rewardVo2.id)))
                            {
                                 continue;
                            }

                             if (rewardVo.type==11 && !Config.TitleCfg.isTitleOPend(String(rewardVo.id)))
                            {
                                 continue;
                            }

                            this.wish.push(itemcfg);
                        }
                    }
                    else if (key == "teaRecharge") {
                        this.teaRecharge = []
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new BirdBridgeRechargeItem();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = i + 1;
                            this.teaRecharge.push(itemcfg);
                        }
                    }
                    else if (key == "achievementOne") {
                        this.achievementOne = []
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new BirdBridgeAchievementOneItem();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = i + 1;
                            this.achievementOne.push(itemcfg);
                        }
                    }
                    else if (key == "achievementAll") {
                        this.achievementAll = []
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new BirdBridgeAchievementAllItem();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = i + 1;
                            this.achievementAll.push(itemcfg);
                        }
                    }
                    else
                    {
                        this[`${key}`] = data[key];
                    }
                }
            }
            public getWishCfg(idx):Config.AcCfg.BirdBridgeWishItem
            {   
                for (let i=0; i<this.wish.length; i++)
                {
                    let onecfg= this.wish[i];
                    if (onecfg.id == idx)
                    {
                        return onecfg;
                    }
                }
                return null;
            }

            public getPoolRewards():string{
                let str = "";
                for (let k in this.basePool){
                    str += this.basePool[k][0] + "|";
                }
                str = str.substring(0, str.length - 1);
                return str;
            }
        }


        export class BirdBridgeWishItem extends BaseItemCfg
        {
            public id:number;
            public limitTime:number;
			public needTime:number;
            public showTag:number;
			public getReward:string; 
            public sortId:number = 0;
        }
        export class BirdBridgeRechargeItem extends BaseItemCfg
		{
            public id:number = null;
            public needGem:number = 0;
            public getReward:string;
            public sortId:number = 0;
        }	
         export class BirdBridgeAchievementOneItem extends BaseItemCfg
		{
            public id:number = null;
            public needNum:number = 0;
            public getReward:string;
            public sortId:number = 0;
        }
         export class BirdBridgeAchievementAllItem extends BaseItemCfg
		{
            public id:number = null;
            public needNum1:number = 0;
            public needNum2:number = 0;
            public getReward:string;
            public sortId:number = 0;
        }
    }
}