namespace Config
{
	export namespace AcCfg
	{
		export class DestroySameCfg 
		{
            /**展示时间 */
            public extraTime:number = 0;
            /** 核心奖励*/
            public coreReward:string = '';
             /**
              *  核心奖励展开-神器ID
              */
            public coreReward1:string = '';
            /**基础消除造成伤害。消除1个 */
            public baseScore:number = 0;
            /**额外消除伤害。每额外消除1个，造成 X 伤害 */
            public bonusScore:number = 0;
            /**
            --全服的击杀奖励
            --bossHp:血量
            --getReward:奖励
             */
            public bossList:Object={};

            /**
			 *  --活动期间的累计充值奖励
				--needGem:所需额度：单位（元宝）
				--specialGift:消除次数
				--getReward:奖励
			 */
            public recharge:Object={};
            /**
             * --活动任务-特殊的限时方式，同类型的要扩展式的，不是分天的！
            --任务描述:备注
            --openType:跳转
            --questType:任务类型  特殊类型：1101：一次性消除【parameter1】个【parameter2】类型的南瓜达到【value】次
            --parameter1:参数1：南瓜个数
            --parameter2:参数2:南瓜类型
            --value:进度
            --getReward:奖励
            */
            public task:Object={};
            public pumpkinPool1:string[]=[];
            public pumpkinPool2:string[]=[];
            public pumpkinPool3:string[]=[];
            public shop:Object={};

            //解析数据
            public formatData(data:any):void
			{
                this.extraTime = data.extraTime;
                this.baseScore = data.baseScore;
                this.bonusScore = data.bonusScore;
                this.pumpkinPool1 = data.pumpkinPool1;
                this.pumpkinPool2 = data.pumpkinPool2;
                this.pumpkinPool3 = data.pumpkinPool3;
                this.coreReward = data.coreReward;
                this.coreReward1 = data.coreReward1;

                for(var key in data.bossList)
                {
                    let itemCfg:DSBossItemCfg;
					let id = Number(key) + 1;
                    if(!this.bossList[id])
                    {
                        this.bossList[id]=new DSBossItemCfg();
                    }
                    itemCfg=this.bossList[id];
                    itemCfg.initData(data.bossList[key]);
                    itemCfg.id=id;
                }

                for(var key in data.recharge)
                {
                    let itemCfg:DSRechargeItemCfg;
					let id = Number(key) + 1;
                    if(!this.recharge[id])
                    {
                        this.recharge[id]=new DSRechargeItemCfg();
                    }
                    itemCfg=this.recharge[id];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id=id;
                }

                this.task = data.task;
                if(data.shop){
                    for(let key in data.shop)
                    {
                        let itemCfg:DSShopItemCfg;
                        let id = Number(key) + 1;
                        if(!this.shop[id])
                        {
                            this.shop[id]=new DSShopItemCfg();
                        }
                        itemCfg=this.shop[id];
                        itemCfg.initData(data.shop[key]);
                        itemCfg.id=id;
                    }
                }

            }


            public getSkin(code):string{
                let skinId = ``;
                // switch(Number(code)){
                //     case 1:
                //         skinId = this.coreReward;//2321`;
                //         break;
                // }
                return this.coreReward;
            }

            public getShopCfgList():DSShopItemCfg[]{
                let arr = [];
                for(let i in this.shop){
                    arr.push(this.shop[i]);
                }
                arr.sort((a,b)=>{
                    return a.sortId - b.sortId;
                });
                return arr;
            }
        }

        export class DSBossItemCfg extends BaseItemCfg
        {
            public id: number;
            /**
             * 血量
             */
            public bossHp:number;
            /**
             * 奖励
             */
            public getReward:string;
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.getReward,true,false);
            }
        }

        export class DSRechargeItemCfg extends BaseItemCfg
        {
            public id:number;
            /**
            * 所需额度：单位（元宝）
            */
            public needGem:number;
            /**
            * 奖励
            */
            public getReward:string;
            /*
            * 消除次数
            */
            public specialGift:number;
            
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.getReward,true,false);
            }
        }


        /**兑换商店 */
        export class DSShopItemCfg extends BaseItemCfg {
            /**id */
            public id: number;
            /**sortId */
            public sortId: number;
            /**奖励 */
            public getReward: string;
            /**限购 */
            public limit: number;
            /**需要道具数量 */
            public cost: string;

        }
    }
}