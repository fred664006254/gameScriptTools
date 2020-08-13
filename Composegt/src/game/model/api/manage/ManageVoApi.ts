class ManageVoApi extends BaseVoApi
{
	/**
	 * 经营资产
	 */
	private manageVo:ManageVo;

	/**
	 * 政务信息
	 */
	private _affairVo:AffairVo;

	/**
	 * 离线收益
	 */
	private _autoResVo:AutoResVo;
	
	public constructor()
	{
		super();
	}

	public formatData(data:any):void
	{
		super.formatData(data);
		if(!this._affairVo)
		{
			this._affairVo=new AffairVo();
		}
		this._affairVo.initData(data);
	}

	public isShowNpc():boolean
	{
		// return Api.playerVoApi.getPlayerLevel()>=Config.WifebaseCfg.unlockLv;
		if(Api.rookieVoApi.isInGuiding && Api.rookieVoApi.guideId <18)
		{
			return false;
		}
		return true;
	}
	
	public formatAutoRes(data:any):void
	{
		if(!this._autoResVo)
		{
			this._autoResVo=new AutoResVo();
		}
		this._autoResVo.initData(data);
	}

	public resetAutoRes():void
	{
		if(this._autoResVo)
		{
			this._autoResVo.reset();
		}
	}

	public checkAutoRes():boolean
	{
		return Api.playerVoApi.getPlayerLevel()>=Config.ManageCfg.needLv||Api.playerVoApi.getPlayerVipLevel()>=Config.ManageCfg.needVip;
	}

	public getAutoGold():number
	{
		return this._autoResVo.gold;
	}

	public getAutoFood():number
	{
		return this._autoResVo.food;
	}

	public getAutoSoldier():number
	{
		return this._autoResVo.soldier;
	}

	/**
	 * 获取经营列表，已排序
	 */
	public getManageItemsVo():ManageItemVo[]
	{
		return this.manageVo.itemsVo;
	}

	/**
	 * 获取经营 是否可以一键经营
	 */
	public isOnekeyManage():number
	{
		if(this.manageVo.itemsVo&&this.manageVo.itemsVo.length>0)
		{
			let l =this.manageVo.itemsVo.length;
			let i =0;
			for(i;i<l;i++)
			{
				if(this.manageVo.itemsVo[i].num>0)
				{
					return 0
				}

				if(this.manageVo.itemsVo[0].num==0&&this.manageVo.itemsVo[1].num==0&&Api.playerVoApi.getFood()<=0)
				{
					return 1
				}
			}
			return 2
		}
		 
	}

	/**
	 * 获取可以获得的粮草
	 */
	public getReapFood():number
	{
		return Math.floor(Api.playerVoApi.getPolitics());
	}

	/**
	 * 获取可以获得的商产
	 */
	public getReapGold():number
	{
		return Math.floor(Api.playerVoApi.getInte());
	}

	/**
	 * 获取可以招募的士兵数量
	 */
	public getReapSoldier():number
	{
		return Math.min(Math.floor(Api.playerVoApi.getCharm()),Api.playerVoApi.getFood()/Config.ManageCfg.needFood);
	}

	/**
	 * 获取需要的粮草数
	 */
	public getNeedFood():number
	{
		return this.getReapSoldier()*Config.ManageCfg.needFood;
	}

	public getManageNeedTime():number
	{
		let allValue:number=Api.playerVoApi.getInte()+Api.playerVoApi.getPolitics()+Api.playerVoApi.getCharm();
		return Config.ManageCfg.getManageNeedTime(allValue);
	}

	public getNeedItem():string
	{
		return String(Config.ManageCfg.needItem);
	}

	/**
	 * 检测是否弹板显示自动经营资源奖励
	 * @param type  "1"挂机  "2"离线
	 */
	public checkAndShowAutoReward(type:string):void
	{
		if(this._autoResVo&&this._autoResVo.notice)
		{
			ViewController.getInstance().openView(ViewConst.POPUP.AUTORESPOPUPVIEW,{type:type});
		}
	}

	public getAffairST()
	{
		return 0;
	}
	public getCurAffairOpt()
	{
		return 0;
	}
	public getCurAffairNums()
	{
		//检测可用的真实次数
		// let num = this._affairVo.num
		// // if (this._affairVo.num >= 0)
		// {
		// 	let deltaT = GameData.serverTime;
		// 	let count = Math.floor((deltaT - this.getAffairST())/ GameConfig.config.affairCfg['needTime'])
		// 	if(count < 0)
		// 	{
		// 		count = 0;
		// 	}
		// 	// let totalNum = Config.LevelCfg.getCfgByLevel(Api.playerVoApi.getPlayerLevel().toString()).affair
		// 	// count += this._affairVo.num;
		// 	// if (count >totalNum)
		// 	// 	count = totalNum;
		// 	num  = count;
		// }
		return 0;
	}
	public setCurAffairNums(num:number)
	{
		// this._affairVo.num = num;
	}

	public checkNpcMessage():boolean
	{
		// if(Api.practiceVoApi.isPracticeBuildingUnlock() && Api.practiceVoApi.isCollectEnable())
		// {
		// 	return true;
		// }
		// let result:boolean=false;
		// let manageList:ManageItemVo[] = Api.manageVoApi.getManageItemsVo();
		// let l:number=manageList.length;
		// for(let i:number=0;i<l;i++)
		// {
		// 	if(manageList[i].needRefresh)
		// 	{
		// 		// result=LanguageManager.getlocal("sceneManageNpcTipMessage");
		// 		result=true;
		// 		break;
		// 	}
		// }
		return false;
	}

	public checkAffairNpcMessage():string
	{
		// let result:string="";
		// if(this.getCurAffairNums()>0)
		// {
		// 	result=LanguageManager.getlocal("sceneAffairNpcTipMessage");
		// }
		return "";
	}

	public getBuyInfo()
	{
		return this.manageVo.buyinfo;
	}

	public isShowTraderRed()
	{
		let buyinfo = this.getBuyInfo();
		for (let key in buyinfo) {
			if( key != "lastday"  && buyinfo[key] ){
				return false;
			}
		}
		return true;
	}
	public dispose():void
	{
		if(this._affairVo)
		{
			this._affairVo.dispose();
			this._affairVo=null;
		}
		super.dispose();
		this.manageVo=null;
	}
}