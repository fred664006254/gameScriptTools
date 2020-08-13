/**
 * 主线任务api
 * author yanyuling
 * date 2018/01/04
 * @class TradeVoApi
 */
class TradeVoApi extends BaseVoApi
{
	private tradeVo:TradeVo;
	public constructor() 
	{
		super();
	}

	public getCurrentCid()
	{
		return this.tradeVo.cid;
	}

	public getCurrentRewards()
	{
		return this.tradeVo.rewards;
	}

	public getCurrentTradeCfg()
	{
		if(Config.TradeCfg.getMaxTradeIndex()+1 == Number(this.getCurrentCid()))
		{
			return null;
			// return <Config.TradeItemCfg>Config.TradeCfg.getTradeCfgById(String(Config.TradeCfg.getMaxTradeIndex()));
		}
		return <Config.TradeItemCfg>Config.TradeCfg.getTradeCfgById(this.getCurrentCid());
		;
	} 
	public isBatchEnable()
	{
		return this.tradeVo.batchFlag > 0;
	}

	//计算可以打多少关
	public getAttNum(startIndex:number):number
	{
		let num = 0;
		let myGoldNum = Api.playerVoApi.getPlayerGold();
		for (var index = startIndex; index <= 200; index++) 
		{
			let cfg = Config.TradeCfg.getTradeCfgById(index + "");
			if(!cfg)
			{
				break;
			}

			//atk1 智力A 钱A atk2 智力B 钱B
			let battleReport = this.getBattleResult(Api.playerVoApi.getInte(),myGoldNum,cfg.tradeInte,cfg.tradeGold);
			if(battleReport.success)
			{
				num ++;
			}
			myGoldNum = myGoldNum - battleReport.cost;
		}
		return num;
	}
	

	//atk1 智力A 钱A atk2 智力B 钱B
	public getBattleResult(inte1:number,gold1,inte2:number,gold2):any
	{

		// let finaSold1 = Math.ceil(soldier1-soldier2 * (atk2+1000)/(atk1+1000))
		// let finaSold2 = Math.ceil(soldier2-soldier1 * (atk1+1000)/(atk2+1000))
		// let costNum = soldier2 * (atk2+1000)/(atk1+1000);

		let finaSold1 = Math.ceil(gold1-gold2 * (inte2+1000)/(inte1+1000));
		let finaSold2 = Math.ceil(gold2-gold1 * (inte1+1000)/(inte2+1000));
		let costNum = Math.floor(gold2 * (inte2+1000)/(inte1+1000));
		let success = false;
		if (finaSold1>0 )
		{
			finaSold2 = 0;
			success = true;
		}
			
		else if(finaSold1==0&&finaSold2==0)
		{
			finaSold1 = 0;
			finaSold2 = 1;
		}
			
		else
		{
			finaSold1 = 0;
		} 
		let battleReport = {
			success : success,
			left1 : finaSold1,
			left2 : finaSold2,
			cost : costNum
		}
		return battleReport

	}

	//计算消耗多少钱数
	public getAttCostNum(startIndex:number,carNum:number):number
	{
		let costNum = 0;
		let myGoldNum = Api.playerVoApi.getPlayerGold();
		for (var index = startIndex; index < startIndex + carNum; index++) {

			let cfg = Config.TradeCfg.getTradeCfgById(index + "");
			if(!cfg){
				break;
			}
			// 智力A 钱A atk2 智力B 钱B
			let battleReport = this.getBattleResult(Api.playerVoApi.getInte(),myGoldNum,cfg.tradeInte,cfg.tradeGold);
			if(battleReport.success){
				costNum = costNum + battleReport.cost;
			}
			myGoldNum = myGoldNum - battleReport.cost;
			
		}
		return costNum;
	} 
	public getLockedString():string
	{
		return LanguageManager.getlocal("composeUnlockFuncDesc",[GameConfig.config.tradebaseCfg.unlock+""]);
	}

	public isShowNpc():boolean
	{
		if(Api.composemapVoApi.getMaxLv()>=GameConfig.config.tradebaseCfg.unlock)
		{
			return true
		}
		else
		{
			return false
		}
	}
	// public checkNpcMessage():boolean
	// {
	// 	if(Api.playerVoApi.getPlayerLevel()>=GameConfig.config.tradebaseCfg.unlock)
	// 	{
	// 		return true
	// 	}
	// 	else
	// 	{
	// 		return false
	// 	}
	// }
}