/**
 * 红颜对战
 * author jiangly
 * date 2018/08/13
 * @class WifebattleVoApi
 */
class WifebattleVoApi extends BaseVoApi
{
	public wifebattleVo:WifebattleVo;
	public constructor() 
	{
		super();
	}
	public formatData(data:any)
	{

		if(this.wifebattleVo == null)
		{
			this.wifebattleVo = new WifebattleVo();
		}

	
		this.wifebattleVo.initData(data)
		super.formatData(data)
	}
	public getShopItemByNum(id:string|number):number
	{
		return (this.wifebattleVo&&this.wifebattleVo.info.shop[id])? this.wifebattleVo.info.shop[id] : 0;
	}
  	public getShopItemNeedScore(id:number|string):number
	{
		let cfg:Config.WifebattleShopItemCfg=Config.WifebattleCfg.getShopItemById(id);
		let needScore:number = cfg.costScore;//cfg.getNeedScoreByNum(Api.dailybossVoApi.getShopItemByNum(id));
		return needScore;
	}           
	public checkNpcMessage():boolean
	{
		let flag = false;
		if(!this.isShowNpc()){
			return flag;
		}
		if(this.wifebattleVo.checkHaveSearchCount() && this.wifebattleVo.checkCanCDSearch()){
			flag = true;
		}
		if(this.wifebattleVo.checkHaveEnemy()){
			flag = true;
		}
		let statusNum = Api.wifestatusVoApi.getStatusWifeNum();
		let itemHaveNum = Api.itemVoApi.getItemNumInfoVoById(Config.WifebattleCfg.costItem);
		let curLv = this.wifebattleVo.info.ylinfo?this.wifebattleVo.info.ylinfo.lv:0;
		let dataList = Config.WifebattleCfg.getWifeStudyCfgList();
		for(let i in dataList){
			let needStatusNum = dataList[i].unlock;
			let itemNeedNum = dataList[i].costNum;
			if(statusNum >= needStatusNum && itemHaveNum >= itemNeedNum && (Number(i) + 1) > curLv){
				flag = true;
				break;
			}
		}
		return flag;
	}
	public getScore():number
	{
		return this.wifebattleVo?this.wifebattleVo.rewardnum:0;
	}
	public isShowNpc():boolean
	{
		// return true;

		return Api.switchVoApi.checkOpenWifeBattle() && this.checkCanJoin();
	}
	//检测是否有红颜获得位分
	public checkCanJoin():boolean
	{
		let wifestatusVoObj:Object = Api.wifestatusVoApi.getWifestatusVo().info;
		let unlockCount = Config.WifebattleCfg.unlock_wifeStar;
		let curCount = 0;
		for(let key in wifestatusVoObj)
		{
			for (var index = 0; index < wifestatusVoObj[key].length; index++) {
				curCount ++;
				if(curCount >= unlockCount){
					return true;
				}	
			}
		}
		return false;
	}

	public isBaseWifeBattleOpen():boolean
	{
			if(Api.playerVoApi.getPlayerLevel() >= 3)
			{
				let b = false;
				if (Api.unlocklist2VoApi.checkShowOpenFunc())
				{
					if (Api.unlocklist2VoApi.checkIsCanShowFunc("wifebattle"))
					{
						b = true;
					}
				}
				else
				{
					b = true;
				}
				if(b && Api.wifebattleVoApi.checkCanJoin())
				{
					return true;
				}
				else
				{
					return false;
				}
			}
			return false;		
	}

	public getLockedString():string
	{
		let returnStr = "";
		if(Api.switchVoApi.checkOpenWifeBattle() == false)
		{
			returnStr = LanguageManager.getlocal("sysWaitOpen");
		}
		else{
            returnStr = LanguageManager.getlocal("wifeBattleUpLockDesc", [Config.WifebattleCfg.unlock_wifeStar.toString()]);//LanguageManager.getlocal("reachLvelUnlockDesc",[Api.playerVoApi.getPlayerOfficeByLevel(Config.DinnerCfg.getNeedLv())]);
		}
		return returnStr
	}

	public dispose():void
	{
		super.dispose();
	}
}