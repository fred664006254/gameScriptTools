class AcWeaponHousePopupViewTab3ScrollItem extends ScrollListItem {
	private _itemData:any= null;
    private _aid:string = null;
    private _code:string = null;
	private _needTxt:BaseTextField =null;
	private _goBtn3:BaseButton =null; 
	private _collectflag:BaseBitmap =null; 
	public constructor() {
		super();
    }
    
    private get vo():AcWeaponHouseVo{
        return <AcWeaponHouseVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.WeaponHouseCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get code():string{
        return this._code;
    }

    private get aid():string{
        return this._aid;
    }

    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }

	/**
	 * 初始化itemview
	 */
	public initItem(index: number, data: any, itemParam: any): void {
		this._itemData = data;
        this._aid = itemParam.aid;
        this._code = itemParam.code;
		let code = this.getTypeCode();
		this.width = 530;
		let itemBg = BaseBitmap.create("public_popupscrollitembg");
		itemBg.x = this.width/2 - itemBg.width/2;
		this.addChild(itemBg);

		let titleBg:BaseBitmap = BaseBitmap.create("shopview_itemtitle");
		titleBg.x = itemBg.x;
		titleBg.y = itemBg.y+ 5;
		this.addChild(titleBg);

		let rewards = this._itemData.getReward;
		if (this._itemData.special) {
			rewards = "1058_0_" + this._itemData.special + "_" + this.getTypeCode() + "|" + rewards;
		}

		let rewardIconList = GameData.getRewardItemIcons(rewards, true, true);
		let scale = 0.8;
		let itemHeight = 108;
		let itemWidth = 108;
		let spaceX = 10;
        let spaceY = 10;
        let stX = itemBg.x + (itemBg.width - (itemWidth * scale + spaceX) * 5 + spaceX)/2;
        let stY = itemBg.y + 70;
        let offHeight = 95;
        
        let rewardBg = BaseBitmap.create("public_scrolllistbg");
		rewardBg.width = itemBg.width - 20;
		rewardBg.x = itemBg.x + itemBg.width/2 - rewardBg.width/2;
		rewardBg.y = stY - 10;
        this.addChild(rewardBg);
        
		for (let i = 0; i < rewardIconList.length; i++) {
            let rewardDB = rewardIconList[i];
			rewardDB.setScale(scale);
			rewardDB.setPosition(stX + ((rewardDB.width * scale + spaceX) * (i % 5)), stY + ((rewardDB.height * scale + spaceY) * Math.floor(i / 5)));
			this.addChild(rewardDB);
		}

		rewardBg.height = (rewardIconList.length % 5 == 0 ? rewardIconList.length / 5 : Math.ceil(rewardIconList.length / 5)) * (itemHeight * scale + spaceY) - spaceY + 20;

		let bgHeight = (rewardIconList.length % 5 == 0 ? rewardIconList.length / 5 : Math.ceil(rewardIconList.length / 5)) * (itemHeight * scale + spaceY) - spaceY + stY + offHeight;
		if (bgHeight > itemBg.height){
			itemBg.height = bgHeight;
        }
        
		//进度条
		let progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 330);
		progress.setPosition(itemBg.x + 15, itemBg.y + itemBg.height - progress.height - 25);
		this.addChild(progress);
		let currChargeGem = this.vo.getOneTask(this._itemData.id1);
		let value:any;
		let title:string;
		if(data.needNum)
		{
			value = [String(this._itemData.needNum)];
			let progressStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeProcessNum", this.getTypeCode()), [String(currChargeGem), String(data.needNum)]);
			title = "acWeaponHouse_oneNeedNum_title";
			progress.setPercentage(currChargeGem / data.needNum, progressStr, TextFieldConst.COLOR_WHITE);

		}else{
			title = "acWeaponHouse_rewardone_title";
			let progressStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeProcessNum", this.getTypeCode()), [String(currChargeGem), String(data.value2)]);
			value = [String(this._itemData.value1),String(this._itemData.value2)];
			progress.setPercentage(currChargeGem / data.value2, progressStr, TextFieldConst.COLOR_WHITE);
		}
		let titleTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(title, this.getTypeCode()) , value), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.setPosition(titleBg.x + 15, titleBg.y + titleBg.height / 2 - titleTF.height / 2)
		this.addChild(titleTF);
		titleBg.width = 280;
		if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsRuLang()){
            titleBg.width = titleTF.width + 50;
        }

		this.height = itemBg.height;

		//领取
		this._goBtn3 =  ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW,"taskCollect",this.collectHandler,this);
		this._goBtn3.setPosition(itemBg.x + itemBg.width - this._goBtn3.width - 15, itemBg.y + itemBg.height - this._goBtn3.height - 15);
		this.addChild(this._goBtn3); 

		let taskbg = BaseBitmap.create("destroysametaskbg"); 
		taskbg.x = itemBg.width - taskbg.width - 3;
		taskbg.y = 2;
		this.addChild(taskbg);  

		let tasks = this.cfg.scheduleAll[this._itemData.type-1]
		let tasknum = Object.keys(this.cfg.scheduleOne[this._itemData.id1]).length;
		let taskTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`AcDestroySameTip6`, this.code, code), [this._itemData.id2, `${tasknum}`]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, taskTxt2, taskbg, [0,4]);
		this.addChild(taskTxt2); 

		//当前进度（0／1）
		let needTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		needTxt.width= this._goBtn3.width;
		needTxt.x = this._goBtn3.x;
		needTxt.y = this._goBtn3.y-25;
		needTxt.textAlign = "center";
		this._needTxt =needTxt;
		this.addChild(needTxt); 

		let collectflag = BaseBitmap.create("collectflag");
		collectflag.anchorOffsetX = collectflag.width / 2;
		collectflag.anchorOffsetY = collectflag.height / 2;
		collectflag.setScale(0.7);
		collectflag.setPosition(itemBg.x + itemBg.width - collectflag.width * 0.7 / 2 - 10, this.y + this.height - collectflag.height * 0.7 / 2);
		this.addChild(collectflag);  
		collectflag.visible = false;
		this._collectflag = collectflag;

		this.update();
	}

	private collectHandler(evt:egret.TouchEvent):void
	{
		let vo = this.vo; 
		if(!vo)
		{
			return;
		}
		let taskNum = vo.getOneTask(this._itemData.id1);
		if ((!this.vo.isStart)) {
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		if (!this.vo.isInAct()) {
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}			
		if(this.vo.et < GameData.serverTime){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
		if(this._itemData.needNum)
		{
			if(taskNum >= this._itemData.needNum)
			{	
				NetManager.request(NetRequestConst.REQUEST_WEAPONHOUSE_GETSCHEDULEONE, { activeId: this.vo.aidAndCode, rkey: Number(this._itemData.id1)});
			} 

		}else{
			if(taskNum >= this._itemData.value2)
			{	
				NetManager.request(NetRequestConst.REQUEST_WEAPONHOUSE_GETSCHEDULEONE, { activeId: this.vo.aidAndCode, rkey: Number(this._itemData.id1)});
			} 
		}
	}
	public update():void
	{	
		let vo = this.vo; 
		if(!vo)
		{
			return;
		}	
		let taskNum = vo.getOneTask(this._itemData.id1);		
		if(this._goBtn3)
		{
			if(taskNum >= this._itemData.needNum||taskNum >= this._itemData.value2)
			{
				if(vo.isGeOnetTaskReward(this._itemData.id1,Number(this._itemData.id2)))
				{
					this._goBtn3.visible =true;
					this._goBtn3.setText("realnamedes6");
					App.DisplayUtil.changeToNormal(this._goBtn3); 
				}
				else
				{	
					this._goBtn3.visible = false;
					this._needTxt.visible = false;  
					this._collectflag.visible= true;
				}
			}
			else
			{	
				this._goBtn3.setEnable(false);
			} 
		}
		
	} 
	
	public getSpaceY():number {
		return 5;
	}

	public dispose():void {
		this._itemData = null;
		this._aid = null;
		this._code = null;
		super.dispose();
	}
}