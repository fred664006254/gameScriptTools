/**
 * 修身
 * author yanyuling
 * date 2018/04/18
 * @class PracticeVoApi
 */
class PracticeVoApi extends BaseVoApi
{
	private practiceVo:PracticeVo;
	public _batchNum:number = 0;
	public constructor() 
	{
		super();
	}

	public getLevel()
	{
		return this.practiceVo.level;
	}

	public geAttrValues()
	{
		return this.practiceVo.attr;
	}

	public geAbilityValues()
	{
		return this.practiceVo.ability;
	}
	public geExp()
	{
		return this.practiceVo.exp;
	}

	public getProgressValue()
	{
		let upgradeNeed = GameConfig.config.practicebaseCfg.upgradeNeed;
		let baseV = 0;
		if(this.practiceVo.level >= upgradeNeed.length)
		{
			baseV = upgradeNeed[upgradeNeed.length-1];
		}else{
			baseV = upgradeNeed[this.practiceVo.level-1];
		}
		
		return {v1:this.practiceVo.exp , v2: baseV};
	}
	
	public getPower()
	{
		let attr = this.practiceVo.attr;
		return attr[1] + attr[2] + attr[3] + attr[0];
	}
	public getPracticeTaskInfo(taskId:string)
	{
		return this.practiceVo.task[taskId];
	}

	public getStorageInfo()
	{
		return this.practiceVo.storage;
	}
	public isCollectEnable()
	{
		let num = this.getCurStorageValue();
		if(num > 0)
		{
			return true;
		}
		return false;
	}
	public getPracticeTaskAccumulation(taskvo:PracticeTaskVo)
	{
		let cfg:Config.PracticeItemCfg = Config.PracticeCfg.getPracticeListById(taskvo.id);
		let curV = 0;
		let nextV = 0;
		let conditionV = 0;
		let conditionNeed = 0;
		let isComp = false;
		let keys = Object.keys(cfg.conditionList);
		let keyLen = keys.length
		if(keyLen == taskvo.stage)
		if(taskvo.stage == keyLen && taskvo.f == 2)
		{
			isComp = true;
		}
		for (let index = 0; index < keyLen; index++) {
			let key = keys[index];
			let numKey = Number(key)
			if(numKey <= taskvo.stage)// && taskvo.f <= 1)
			{
				let tmpCon = cfg.conditionList[key];
				curV += tmpCon.effect;
				if( numKey == taskvo.stage && taskvo.f < 2)
				{
					curV -= tmpCon.effect;
				}
				nextV += tmpCon.effect;
				conditionNeed = tmpCon.needNum;
			}
		}

		let curCon = cfg.conditionList[String(taskvo.stage)];
		let conditionType = curCon.conditionType;
		// 1：门客等级  2：门客爵位  3：红颜亲密度  4：红颜魅力值
		let servant:ServantInfoVo = undefined;
		let wife:WifeInfoVo = undefined;
		if (cfg.servantId){
			servant =Api.servantVoApi.getServantObj(cfg.servantId);
		}
		if (cfg.wifeId){
			wife = Api.wifeVoApi.getWifeInfoVoById(cfg.wifeId);
		}
		conditionV = this._getTaskVoStageV(taskvo);
		
		/**
		 * 当前阶段资质值
		 * 下阶段资质值
		 * 进度条当前值
		 * 进度条当前阶段最大值
		 * 是否已领取最后一阶段
		 */
		return {
			curV:curV,
			nextV:nextV,
			conditionV:conditionV,
			conditionNeed:conditionNeed,
			isComp:isComp,
		}
	}

	public _getTaskVoStageV(taskvo:PracticeTaskVo)
	{
		let cfg:Config.PracticeItemCfg = Config.PracticeCfg.getPracticeListById(taskvo.id);
		let curCon = cfg.conditionList[String(taskvo.stage)];
		let conditionType = curCon.conditionType;
		// 1：门客等级  2：门客爵位  3：红颜亲密度  4：红颜魅力值
		let servant:ServantInfoVo = undefined;
		let wife:WifeInfoVo = undefined;
		if (cfg.servantId){
			servant =Api.servantVoApi.getServantObj(cfg.servantId);
		}
		if (cfg.wifeId){
			wife = Api.wifeVoApi.getWifeInfoVoById(cfg.wifeId);
		}

		let conditionV = 0;
		if(servant)
		{
			if(taskvo.stage == 1)
			{
				conditionV = 1;
			}else{
				switch (conditionType) 
				{
				case 1:
					conditionV = servant.level;
					break;
				case 2:
					conditionV = servant.clv;
					break;
				}
			}
		}

		if(wife)
		{
			if(taskvo.stage == 1)
			{
				conditionV = 1;
			}else{
				switch (conditionType) 
				{
					case 3:
						conditionV = wife.intimacy;
						break;
					case 4:
						conditionV = wife.glamour;
						break;
				}
			}
		}

		return conditionV;
	}
	public isPracticeOPen()
	{
		return Api.switchVoApi.isPracticeOPen();
	}
	public isPlayerPracticeEnable()
	{	
		let isEn = false;
		if (!this.isPracticeOPen())
		{
			return isEn;
		}
		let unlockLv = GameConfig.config.practicebaseCfg.unlockLv;
		if(Api.switchVoApi.isPracticeOPen() && Api.playerVoApi.getPlayerLevel() >= unlockLv )
		{
			isEn = true;
		}
		
		return isEn;
	}

	public showPracticeGet(num:number=0)
	{
		// if( this.isPlayerPracticeEnable() && num > 0){
		// 	ViewController.getInstance().openView(ViewConst.POPUP.PRACTICEGETPOPUPVIEW,{pnum:num});
		// }
	}

	public isPracticeBuildingUnlock()
	{
		let isEn = false;
		if (!this.isPracticeOPen())
		{
			return isEn;
		}
		let unlockLv = GameConfig.config.practicebaseCfg.unlockLv;
		if(Api.playerVoApi.getPlayerLevel() >= unlockLv )
		{
			isEn = true;
		}
		
		return isEn;
	}
	public getbuyNum()
	{
		return this.practiceVo.info.buynum;
	}

	public getspd()
	{
		return this.practiceVo.spd;
	}

	public getRealSpd()
	{
		let spAdd = this.getspdAdd();
		let basecfg = GameConfig.config.practicebaseCfg;
		let speed = basecfg.level[Api.playerVoApi.getPlayerLevel()-1] *(1+spAdd);
		return speed;
	}
	public getspdAdd()
	{
		let basecfg = GameConfig.config.practicebaseCfg;
		let add = 0;
		if(Api.shopVoApi.ifBuyMonthCard())
		{
			add += basecfg.monthCard;
		}
		if(Api.shopVoApi.ifBuyYearCard())
		{
			add += basecfg.yearCard;
		}
		add += basecfg.vip[Api.playerVoApi.getPlayerVipLevel()];
		return add;

	}
	public getStorageRealLimit()
	{
		let basecfg = GameConfig.config.practicebaseCfg;
		let slv = Api.practiceVoApi.getStorageLv();
        slv = slv? slv : 0;
        //等级容量
        let curLimit = basecfg.storeLimit[Api.playerVoApi.getPlayerLevel()-1];
        //加成容量
        let addLimitRate = basecfg.storeAdd  * 100 * slv
        let totalLimit = Number((curLimit*(1+ basecfg.storeAdd * slv)).toFixed(0));
		return totalLimit;
	}
	public isStoregeFull()
	{
		let curLimit = this.getStorageRealLimit();
		let floorMin = this.getCurStorageValue();
		if( floorMin  >= curLimit)
		{
			return true;
		}
		return false;
	}
	public getCurStorageValue()
	{
		let st = this.practiceVo.storage.st;
		let deltaT = GameConfig.config.practicebaseCfg.time;
		let spd = this.getspd();
		let floorMin = Math.floor((GameData.serverTime - st)/deltaT)*spd;
		let curLimit = this.getStorageRealLimit();
		return Math.min(floorMin,curLimit);
	}
	public isPracticeLvupEnable()
	{
		let lv = this.practiceVo.level;
		let maxLv = GameConfig.config.practicebaseCfg.maxLv;
		if(lv == maxLv)
		{
			return false;
		}
		let lvneed = GameConfig.config.practicebaseCfg.upgradeNeed[lv-1] ;
		if(this.practiceVo.exp >= lvneed)
		{
			return true;
		}
		return false;
	}
	public practiceAttrRedList()
	{
		let attr = this.practiceVo.attr;
		let task = this.practiceVo.task;
		// let showList = [0,0,0,0];
		// let showList = {"1":0,"2":0,"3":0,"4":0};
		let showList = {};
		for (var key in this.practiceVo.task) {
			let taskvo:PracticeTaskVo = this.practiceVo.task[key]
			let cfg:Config.PracticeItemCfg = Config.PracticeCfg.getPracticeListById(taskvo.id);
			if(!cfg)
			{
				continue;
			}
			if(cfg.servantId && Config.ServantCfg.checkIsLockedByGM(cfg.servantId ))
			{
				continue;
			}

			if(cfg.wifeId && Config.WifeCfg.checkIsLockedByGM(cfg.wifeId ))
			{
				continue;
			}

			if(cfg && cfg.conditionList)
			{
				let con = cfg.conditionList[String(taskvo.stage)]
				// let conditionType = con.conditionType;
				let tType = cfg.type;
				if(!showList[tType])
				{
					if(this._getTaskVoStageV(taskvo) >= con.needNum && taskvo.f < 2)
					{
						showList[tType] = 1;
						// showList[tType-1] == 1;
					}
				}
			}
		}
		return showList;
	}

	public isTaskLvEnable(taskId:string)
	{
		let taskvo:PracticeTaskVo = this.getPracticeTaskInfo(taskId);
		let cfg:Config.PracticeItemCfg = Config.PracticeCfg.getPracticeListById(taskId);
		let con = cfg.conditionList[String(taskvo.stage)]
		if(this._getTaskVoStageV(taskvo) >= con.needNum && taskvo.f < 2)
		{
			return true;
		}
		return false;
	}
	public isShowRedForPBottom()
	{
		if(!this.isPlayerPracticeEnable())
		{
			return false;
		}
		if(this.isPracticeLvupEnable())
		{
			return true;
		}
		let  shL = this.practiceAttrRedList();
		for (var key in shL) {
			if (shL[key] > 0) {
				return true;
			}
		}
		return false;
	}

	public getStorageLv()
	{
		return this.practiceVo.storage.level;
	}

	public isPracticeUnlock()
	{
		let unlockLv = GameConfig.config.practicebaseCfg.unlockLv;
		if(Api.switchVoApi.isPracticeOPen() && Api.playerVoApi.getPlayerLevel() >= unlockLv )
		{
			return true;
		}
		return false;
	}

	public getUnlockStr()
	{
		let unlockLv = GameConfig.config.practicebaseCfg.unlockLv;
		let str = LanguageManager.getlocal("officialTitle"+unlockLv);
		return LanguageManager.getlocal("practice_unlockTip",[str]);
	}

	public getBatchNum()
	{
		return this._batchNum;
	}

	public setBatchNum(num:number = 0)
	{
		this._batchNum = num;
	}
}