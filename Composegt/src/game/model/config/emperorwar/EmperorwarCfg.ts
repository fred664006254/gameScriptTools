namespace Config {

	export namespace EmperorwarCfg
	{	
        /**
		 * 称帝战开启条件1：服务器大于30天
		 */
		export let condition1:number;
        /**
		 * 称帝战开启条件2：名望>1000的人数达到 X 人 
		 */
		export let condition2:number;
        /**
		 * 称帝战开启条件3：只会在每周五开启称帝战
		 */
		export let condition3:number;
        /**
		 * 称帝战第二次以及后续开启间隔  14天，每两周开启一次
		 */
		export let secondTime:number;
        /**
		 * 竞拍开启时间:周五22点
		 */
		export let auctionTime:number;
        /**
		 * 助威开启时间：周六21点
		 */
		export let cheerTime:number;
        /**
		 * 战斗开启时间：周日21点
		 */
		export let battleTime:number;
        /**
		 * 每场战斗持续时间  单位：秒
		 */
		export let battlelastTime:number;
        /**
		 * 报名条件：名望大于等于1000
		 */
		export let limit:number;
        /**
		 * 报名最低限制：1000人望币
		 */
		export let enterMin:number;
        /**
		 * 助威的等级限制  官职达到X，才能助威
		 */
		export let cheerLv:number;
        /**
		 * 助威消耗 元宝  超过最大值取最大值
		 */
        export let cheerCost:number[];
        /**
		 * 每次助威获得X人气
		 */
		export let cheerEffect:number;
        /**
		 * 助威后，人气高的一方获得先手，以及攻击加成 X%
		 */
		export let cheerAddAtk:number;
        

		export let rankRewardList:Object;     
        export let cheerRewardList:Object;  

        export function formatData(data:any):void
		{
            condition1 = data.condition1;
            condition2 = data.condition2;
            condition3 = data.condition3;
            secondTime = data.secondTime;
            auctionTime = data.auctionTime;
            cheerTime = data.cheerTime;
            battleTime = data.battleTime;

			battlelastTime = data.battlelastTime;
			limit = data.limit;
 			enterMin = data.enterMin;
			cheerLv = data.cheerLv;
			cheerCost = data.cheerCost;
			cheerEffect = data.cheerEffect;
			cheerAddAtk = data.cheerAddAtk;

			for(var key in data.feast)
			{
				let itemCfg:EmperorwarRankRewardItemCfg;
				if(!rankRewardList.hasOwnProperty(String(key)))
				{
					rankRewardList[String(key)]=new EmperorwarRankRewardItemCfg();
				}
				itemCfg=rankRewardList[String(key)];
				itemCfg.initData(data.feast[key]);
				itemCfg.id=String(key);
			}

			for(var key in data.goToFeast)
			{
				let itemCfg:EmperorwarCheerRewardItemCfg;
				if(!cheerRewardList.hasOwnProperty(String(key)))
				{
					cheerRewardList[String(key)]=new EmperorwarCheerRewardItemCfg();
				}
				itemCfg=cheerRewardList[String(key)];
				itemCfg.initData(data.goToFeast[key]);
				itemCfg.id=String(key);
			}
		}

        
    }

    class EmperorwarRankRewardItemCfg extends BaseItemCfg
	{
		public id:string;
		/**
		 * 排名上限
		 */
		public rank:number;
		/**
		 * 返还人望币的比例
		 */
		public return:number;
		/**
		 * 达到进度的奖励
		 */
		public getReward:string;

	}

    class EmperorwarCheerRewardItemCfg extends BaseItemCfg
	{
		public id:string;
		/**
		 * 助威对象获胜X场
		 */
		public winNum:number;
		/**
		 * 助威奖励
		 */
		public getReward:string;

	}

}