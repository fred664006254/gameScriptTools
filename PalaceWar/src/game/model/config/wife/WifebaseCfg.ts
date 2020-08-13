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

		/**
		 * 红颜技能2等级上限：给修身加成的技能
		 */
		export let wifeSkill2Max:number;


		/**
		 * 红颜赏赐 item:所需道具 glamour：增加魅力值 intimacy：增加亲密度
		 */
		export let wifeGift:any[];

		/**
		 * 红颜技能经验转换系数
		 */
		export let skillExchange:number;
		export let talentParam1:number;
		export let talentParam2:number;
		export let talentParam3:number;

		/**
		 * 解锁佳人特技所需亲密度
		 */
		export let exSkillNeed:number;
		/**
		 * 每 X 点亲密度，提升 1 资质
		 */
		export let exSkill:number;
		/**
		 * 佳人特技亲密度的有效上限
		 */
		export let exSkillMax:number;

		
		
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				WifebaseCfg[key]=data[key];
			}
			// wifeSkillMax = 10;
		}

		export function getWifeSkillMax():number
		{	
			if (Api.switchVoApi.checkOpenWifeSkillLv())
			{
				return wifeSkillMax;
			}
			return 200;
		}

		export function getWifeSkill2Max():number
		{	
			return wifeSkill2Max;
		}

	}
}