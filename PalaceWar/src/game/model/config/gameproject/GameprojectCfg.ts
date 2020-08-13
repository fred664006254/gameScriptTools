namespace Config
{
	export namespace GameprojectCfg 
	{
		 
		export let rewardArr:Array<number>=[2,3,7];
		/**
		 * 签到2天额外奖励红颜
		 */
		export let sign2DayReward:string;
		export let sign2Day:number = 2;
		/**
		 * 签到3天额外奖励红颜
		 */
		export let sign3DayReward:string;
		export let sign3Day:number = 3;
		/**
		 * 签到7天额外奖励红颜
		 */
		export let sign7DayReward:string;
		export let sign7Day:number = 7;
		/**
		 * 签到第30天额外奖励
		 */
		export let sign30DayReward:string;
		export let sign30Day:number = 30;
		/**
		 * 签到第100天额外奖励
		 */
		export let sign100DayReward:string;
		export let sign100Day:number = 100;
		/**
		 * 签到第365天额外奖励
		 */
		export let sign365DayReward:string;
		export let sign365Day:number = 365;

		/**
		 * 签到第600天额外奖励
		 */
		export let sign600DayReward:string;
		export let sign600Day:number = 600;

		/**
		 * 签到第700天额外奖励
		 */
		export let sign700DayReward:string;
		export let sign700Day:number = 700;

		/**
		 * 签到第800天额外奖励
		 */
		export let sign800DayReward:string;
		export let sign800Day:number = 800;

		/**
		 * 签到第900天额外奖励
		 */
		export let sign900DayReward:string;
		export let sign900Day:number = 900;

		/**
		 * 关卡、副本恢复门客出战次数所需道具
		 */
		export let needItem:string;

		/**
		 * 3K手机绑定的奖励
		 */
		export let reward3K:string;

		/** 
		 * 3K手机绑定持续时间 单位：天
		 */
		export let reward3KlastTime:number;

		/**
		 * 玩吧发送桌面奖励
		 */
		export let rewardWB1:string;

		/**
		 * 玩吧每日分享奖励
		 */
		export let rewardWB2:string;

		/**
		 * 实名认证
		 */
		export let rewardID3K:string;

		/**
		 * 疯狂游乐场关注奖励
		 */
		export let rewardFKYLC1:string;

		/**
		 * 疯狂游乐场分享奖励(每日)
		 */
		export let rewardFKYLC2:any;
		/**
		 * 疯狂、爱微游实名验证奖励
		 */
		export let rewardFKYLC3:any;

		/**
		 * 下载微端奖励
		 */
		export let rewardGT:any;
		/**
		 * 玩吧下载微端奖励
		 */
		export let rewardWB4:any;
		/**
		 * 玩吧cover奖励
		 */
		export let rewardWB5:any;
		/**
		 * 玩吧回归礼包
		 */
		export let rewardWB6:any;
		/**
		 * 港台绑定奖励
		 */
		export let rewardGT1:any;

		/**
		 * 国内绑定奖励
		 */
		export let rewardGT_cn:string;

		/**
		 * 实名认证
		 */
		export let rewardRealName:any;
		
		export let shareShowZJ:string;
		/**
		 * 新版全平台统一分享奖励
		 */
		export let rewardAll1:any[];
		/**
		 * 新版分享 第一次获得红颜
		 */
		export let rewardALL2:any;
		/**
		 * 新版分享 第一次获得子嗣
		 */
		export let rewardAll3:any;
		/**
		 * 新版分享 升级不同官频不同的分享奖励
		 */
		export let rewardAll4:any[];
		/**
		 * 统一分享的次数限制
		 */
		export let rewardAllNum:number;
		/**
		 * 打折循环时间
		 */
		export let cycle:any[];
		/**
		 * 玩吧企鹅电竞奖励
		 */
		export let rewardWB7:any;

		/**
		 * 道具合成特殊不红点提示道具
		 */
		export let itemId:string[];

		/**
		 * 我要变强-门客-关闭红点所需官品
		 */
		export let closeRedDot:number;
		/**
		 * 我要变强-门客-关闭功能所需官品
		 */
		export let closeFunction:number;
		/**
		 * 邮件自动删除天数
		 */
		export let deleteEmail:number;
		/** 
		 * 关卡士兵消耗提示
		 */
		export let challengeRatio1:number;
		export let challengeRatio2:number;
		export let challengeRatio3:number;
		export let challengeRatio4:number;
		
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				this[key]=data[key];
			}
		}

		/**
		 * 检测道具合成不显示红点的道具
		 */
		export function checkComposeNotShowRedPointById(id:string|number):boolean
		{
			if(GameprojectCfg.itemId&&GameprojectCfg.itemId.length)
			{
				return GameprojectCfg.itemId.indexOf(String(id))>-1;
			} 
			return false;
		}
	}
}