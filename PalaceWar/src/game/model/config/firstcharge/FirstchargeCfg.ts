namespace Config
{
	export namespace FirstchargeCfg {
		/**
		 * 门客id
		 */
		let servantId:number;
		var needRecharge:Array<string> =[];
		var extraClient:number;
		/**
		 * 奖励物品信息
		 */
		let rewardStr:string;
		export function formatData(data: any): void 
		{
			if(data.rewards)
			{
				if(data.rewards.getServant)
				{
					servantId = Number(data.rewards.getServant);
				}
				if(data.rewards.r)
				{
					rewardStr = data.rewards.r;
				}
				if(data.needRecharge)
				{
					this.needRecharge = data.needRecharge;
				}
				if(data.extraClient)
				{
					this.extraClient = data.extraClient;
				}
			}
		}
		/**
		 * 获取首冲奖励数组
		 */
		export function getRewardItemVoList():Array<RewardItemVo>
		{
			return GameData.formatRewardItem(rewardStr);
		}

		/**
		 * 获取4倍的
		 */
		export function getneedRecharge(str:string=null):boolean
		{	
			if(this.needRecharge.indexOf(str)!=-1)
			{
				return true;
			}
			else
			{
				return false;
			} 
		}

		export function getextraClient(str:string=null):boolean
		{	
			if(this.needRecharge[str])
			{
				return true;
			}
			else
			{
				return false;
			} 
		}

		export function getextra():number
		{
			return this.extraClient;	
		} 
		
	}
}