namespace Config
{
	/**
	 * 红颜配置
	 */
	export namespace WifebaseCfg 
	{
		/**
		 * 红颜功能解锁等级
		 */
		export let unlockLv:number;

		/**
		 * 每点精力恢复所需时间 单位：秒
		 */
		export let needTime:number;

		/**
		 * 恢复精力的道具ID
		 */
		export let needItem:string;

		/**
		 * 解锁一键传唤所需Vip等级
		 */
		export let needVip:number;

		/**
		 * 红颜技能等级上限
		 */
		export let wifeSkillMax:number;

		//红颜技能等级上限
		export let artistrySkill_1_Max:number;

		//红颜技能等级上限
		export let artistrySkill_2_Max:number;
		/**
		 * 红颜赏赐 item:所需道具 glamour：增加魅力值 intimacy：增加亲密度
		 */
		export let wifeGift:any[];
		
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				WifebaseCfg[key]=data[key];
			}
			// wifeSkillMax = 10;
		}
	}
}