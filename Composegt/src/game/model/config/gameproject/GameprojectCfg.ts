namespace Config
{
	export namespace GameprojectCfg 
	{
		 
		export let rewardArr:Array<number>=[2,3,7];
		/**
		 * 签到2天额外奖励红颜
		 */
		export let sign2DayReward:string;
		/**
		 * 签到3天额外奖励红颜
		 */
		export let sign3DayReward:string;
		/**
		 * 签到7天额外奖励红颜
		 */
		export let sign7DayReward:string;
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
		 * 港台绑定奖励
		 */
		export let rewardGT1:any;
		
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
		/**版本一：夺帝战
		 * 每提升1权势提升x皇权值； 皇权值=权势增长值 * x * （1+皇权加成）
		 */
		export let cost:number;
		/**版本一：夺帝战
		 * 加成系数1；皇权加成 = 人望值/（人望值 * 加成系数1 + 加成系数2）+ 加成系数3
		 * 3
		 */
		export let prestigeRate1:number;
		/**版本一：夺帝战
		 * 加成系数2；皇权加成 = 人望值/（人望值 * 加成系数1 + 加成系数2）+ 加成系数3
		 * 3000
		 */
		export let prestigeRate2:number;
		/**版本一：夺帝战
		 * 加成系数1；皇权加成 = 人望值/（人望值 * 加成系数1 + 加成系数2）+ 加成系数3
		 * 0.02
		 */
		export let prestigeRate3:number;

		/**
		 * 实名认证
		 */
		export let rewardRealName:any;
		/**
		 * QQ会员_H5_传盛奖励
		 */
		export let rewardwbqq:any;
		/**
		 * 日本twitter每日分享奖励
		 */
		export let shareRewardtwJP:any;

		export let 	challengeRatio1:number = 0.2;
		export let challengeRatio2:number = 0.4;
		export let challengeRatio3:number = 0.6;
		export let challengeRatio4:number = 1;
		/**
		 * 微信分享到群的分享奖励
		 */
		export let rewardShareGroupNum:number;
		export let rewardShareGroup:any[];
		export let miaoshaChallengeTime:number;


		export function formatData(data:any):void
		{
			for(var key in data)
			{
				this[key]=data[key];
			}
		}
	}
}