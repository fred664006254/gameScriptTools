namespace Config
{
	/**
	 * --联盟基础信息配置
	 */
	export namespace AlliancebaseCfg 
	{
		/**
		 * 联盟功能解锁所需官职
		 */
		export let unlock:number;

		/**
		 * 创建军团需要元宝
		 */
		export let createNeedGem:number;

		/**
		 * 修改军团名称需要元宝
		 */
		export let renameNeedGem:number;

		/**
		 * 军团名称不能超过X个字符
		 */
		export let nameLimit:number;

		/**
		 * 退出军团后，再加入军团需要的时间 单位（秒）
		 */
		export let rejoinNeedTime:number;

		/**
		 * 个人申请上限
		 */
		export let personMaxApply:number;
		/**
		 * 帮主转让的二次确认时间 单位（秒）
		 */
		export let transfertime:number;
		/**
		 * 军团最大申请人数
		 */
		export let maxApplyPersonNum:number;
		/**
		 * 离开帮会扣除贡献比例
		 */
		export let reduceContribution:number;
		/**
		 *--联盟建设
			--needGem  消耗元宝
			--needItem  消耗道具
			--exp  联盟增加经验
			--asset  联盟增加财富
			--contribution  个人获得贡献
		 */
		export let contributeList:Object;
		/**
		 *  --联盟商店
			--needContribution  兑换所需贡献
			--needAllianceLv  兑换所需联盟等级
			--content  物品内容
		 */
		export let allianceShop:any;
		
		/** 帮会每日最多踢出人数 */
		export let fireNum:number;
		/** 新号注册7天内，不受这个限制  单位：秒 */
		export let freeTime:number;
		/** 新号注册7天后，才入帮成员，48小时不让退帮 单位：秒 */
		export let quitNeedTime:number;
		/**开启精英BOSS所需帮会等级 */
		export let eliteNeedLv:number; 
		/**帮会公告编辑字数限制 */
		export let numofWords:number;

		export function formatData(data:any):void
		{
			for(var key in data)
			{
				AlliancebaseCfg[key]=data[key];
			}
		}
	}
}