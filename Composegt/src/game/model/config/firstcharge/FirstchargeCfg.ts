namespace Config
{
	export namespace FirstchargeCfg {
		/**
		 * 4倍门客id
		 */
		let servantId: number;
		/**6倍门客ID */
		let servantId_2: number;
		var needRecharge:Array<string> =[];
		var extraClient:number;
		var extraClient_2:number;
		/**
		 * 奖励物品信息
		 */
		let rewardStr:string;
		let rewardStr_2:string;
		export function formatData(data: any): void 
		{
			if(data.needRecharge)
			{
				this.needRecharge = data.needRecharge;
			}
			if(data.rewards_2)
			{
				if (data.rewards_2.getServant) {
					servantId_2 = Number(data.rewards_2.getServant);
				}

				if(data.rewards_2.r)
				{
					rewardStr_2 = data.rewards_2.r;
				}
				if(data.extraClient_2)
				{
					this.extraClient_2 = data.extraClient_2;	
				}
			}
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
			if(Api.switchVoApi.checkOpenFirstCharge6Times()){
				return GameData.formatRewardItem(rewardStr_2);
			} else {
				return GameData.formatRewardItem(rewardStr);
			}
			
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

			if(Api.switchVoApi.checkOpenFirstCharge6Times()){
				return this.extraClient_2;	
			} else {
			
				return this.extraClient;	

			}
			
		} 

		/**4倍奖励门客ID */
		export function getRewServantD4(): number {
			return servantId;
		}

		/**6倍奖励门客ID */
		export function getRewServantD6(): number {
			return servantId_2;
		}
		
	}
}