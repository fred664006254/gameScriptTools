/**
 * 征伐系统api
 * author dky
 * date 2017/12/27
 * @class ConquestVoApi
 */

class ConquestVoApi extends BaseVoApi
{
	private conquestVo:ConquestVo;

	public constructor() {
		super();
	}

	public getConquestVo():ConquestVo
	{
		return this.conquestVo;
	}
	public isShowNpc():boolean
	{
		let boo:boolean =false;
		var unlock:number =80*41;
		if(Api.challengeVoApi.getCurChannelId()>unlock)
		{
			boo=true;
		}
		else
		{
			boo=false;
		}
		return  boo
	}
	public getLockedString():string
	{
		var unlock  =80;
		return LanguageManager.getlocal("prisonUnlockDesc",[unlock+""]);
	}
	public dispose():void
	{
		this.conquestVo = null;
		super.dispose();
	}

	// --[[
	// A方，武力A，兵力A
	// B方，武力B，兵力B
	// 如果 兵A - 兵B * （武B +1000）/（ 武A+1000） >=0
	// 则 兵B=0
	//     兵A = 兵A - 兵B * （武B+1000） /（武A+1000）   (向上取整)
	// 否则：
	//     兵A=0
	//     兵B=兵B - 兵A * （武A+1000） / （武B+1000）  (向上取整)

	// 双方兵力都是0的时候 敌方兵力变为1 本场战斗失败
	// ]]
	public getBattleResult(atk1:number,soldier1,atk2:number,soldier2):any
	{
	//atk1 武力A 兵力A atk2 武力B 兵力B
		let finaSold1 = Math.ceil(soldier1-soldier2 * (atk2+1000)/(atk1+1000))
		let finaSold2 = Math.ceil(soldier2-soldier1 * (atk1+1000)/(atk2+1000))
		let costNum = soldier2 * (atk2+1000)/(atk1+1000);
		let success = false
		if (finaSold1>0 )
		{
			finaSold2 = 0
			success = true
		}
			
		else if(finaSold1==0&&finaSold2==0)
		{
			finaSold1 = 0
			finaSold2 = 1
		}
			
		else
		{
			finaSold1 = 0
		}

		let battleReport = {
			success : success,
			left1 : finaSold1,
			left2 : finaSold2,
			cost : costNum
		}
		return battleReport

	}
	//计算可以打多少关
	public getAttNum(startIndex:number):number
	{
		let num = 0;
		let soldierNum = Api.playerVoApi.getSoldier();
		for (var index = startIndex; index <= 200; index++) {
			let cfg = Config.ConquestCfg.getConquestCfgById(index + "");
			// egret.log("index" + index)
			if(!cfg)
			{
				break;
			}
			let battleReport = this.getBattleResult(Api.playerVoApi.getRealAtk(),soldierNum,cfg.soldierMid/10,cfg.soldierMid);
			if(battleReport.success){
				num ++;
			}
			soldierNum = soldierNum - battleReport.cost;
		}
		return num;
	}

	//计算消耗多少兵力
	public getAttCostNum(startIndex:number,carNum:number):number
	{
		let costNum = 0;
		let soldierNum = Api.playerVoApi.getSoldier();
		for (var index = startIndex; index < startIndex + carNum; index++) {

			let cfg = Config.ConquestCfg.getConquestCfgById(index + "");
			if(!cfg){
				break;
			}
			let battleReport = this.getBattleResult(Api.playerVoApi.getRealAtk(),soldierNum,cfg.soldierMid/10,cfg.soldierMid);
			if(battleReport.success){
				costNum = costNum + battleReport.cost;
			}
			soldierNum = soldierNum - battleReport.cost;
			
		}
		return costNum;
	}

	public getAttCostNum2(startIndex:number,carNum:number):number
	{
		let costNum = 0;
		let soldierNum = Api.playerVoApi.getSoldier();
		for (var index = startIndex; index < startIndex + carNum; index++) {

			let cfg = Config.ConquestCfg.getConquestCfgById(index + "");
			if(!cfg){
				break;
			}
			let battleReport = this.getBattleResult(Api.playerVoApi.getRealAtk(),soldierNum,cfg.soldierMid/10,cfg.soldierMid);
			costNum = costNum + battleReport.cost;
			
		}
		return costNum;
	}
	
	public getDecreePolicyAddAttrInfo()
	{
		return Api.promoteVoApi.getDecreePolicyAddAttrInfo("conquest",6);
	}

	public getCid():number
	{
		let cid = 1;
		if (this.conquestVo && this.conquestVo.info && this.conquestVo.info.cid)
		{
			cid = this.conquestVo.info.cid;
		}

		return cid;
	}
}