namespace Config
{
	export namespace TradeCfg 
	{
		let tradeList:Object={};
		let maxTradeIdx:number = 0;
		export function formatData(data:any):void
		{
			maxTradeIdx = 0;
			for(var key in data)
			{
				let itemCfg:TradeItemCfg;
				if(!tradeList.hasOwnProperty(String(key)))
				{
					tradeList[String(key)]=new TradeItemCfg();
				}
				itemCfg=tradeList[String(key)];
				itemCfg.initData(data[key]);
				itemCfg.tradeId=String(key);
				maxTradeIdx ++ ;
			}
		}
		export function getTradeCfgById(tradeId:string)
		{
			return tradeList[tradeId];
		}
		export function getMaxTradeIndex()
		{
			return maxTradeIdx;
		}
	}
	export class TradeItemCfg extends BaseItemCfg
	{
		/**
		 * 贸易id
		 */
		public tradeId:string;
		public tradeInte:number;//  关卡智力  消耗银两公式：int(银两B*（智力B+1000）/（智力A+1000）)
      	public tradeGold:number;//    关卡银两
      	public score:number;//    每关增加讨伐分数
     	public reward1Ratio:number;//    奖励一获得的几率
      	public reward1:{string,number}[];//    从掉落列表中随机一个
      	public reward2Ratio:number;//    奖励二获得的几率
      	public reward2:{string,number}[];//    从掉落列表中随机一个
      	public reward3Ratio:number;//    奖励三获得的几率
      	public reward3:{string,number}[];//    从掉落列表中随机一个
      	public reward4Ratio:number;//    奖励四获得的几率
      	public reward4:{string,number}[];//    从掉落列表中随机一个
      	public reward5Ratio:number;//    奖励五获得的几率
      	public reward5:{string,number}[];//    从掉落列表中随机一个
      	public reward6Ratio:number;//    奖励六获得的几率
      	public reward6:{string,number}[];//    从掉落列表中随机一个

		public get tradeName() :string{
			return LanguageManager.getlocal("tradeName"+ this.tradeId);
		}
	}

}