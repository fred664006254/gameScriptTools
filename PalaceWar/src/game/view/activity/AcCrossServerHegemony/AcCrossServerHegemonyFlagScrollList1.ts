class AcCrossServerHegemonyFlagScrollList1 extends ScrollListItem
{
	// private _itemData:Config.CommonTaskItemCfg= null;
	private _itemData:any;
	private _itemParam:{aid:string,code:string,uiCode:string,specialIconId:string,requestEvent:string} = null;
	private _countText:BaseTextField = null;
	private _reviceBtn:BaseButton = null;
	private _goBtn:BaseButton = null;
    private _reviceBM:BaseBitmap = null;
    private _titleBg:BaseBitmap = null;
	public constructor() 
	{
		super();
	}
	private get cfg():any
	{
		return Config.AcCfg.getCfgByActivityIdAndCode(this._itemParam.aid, this._itemParam.code);
	}
	private get aid(): string {
		return this._itemParam.aid;
	}
	private get code(): string {
		return this._itemParam.code;
	}
	protected get uiCode(): string {
		return this._itemParam.uiCode;
	}
	protected get specialIconId(): string {
		return this._itemParam.specialIconId;
	}
	protected get requestEvent():string {
		return this._itemParam.requestEvent;
	}

	/**
	 * 初始化itemview
	 */
	public initItem(index:number,data:any,itemParam:any):void
	{
		this.width = 620;
		// this.height = 170;
		this._itemData = data;
		this._itemParam = itemParam;

		
		let bg = BaseBitmap.create("public_scrollitembg"); //public_9_bg14
		bg.width = this.width - 20;
		bg.x = this.width/2 - bg.width/2;
        // bg.height = 220;
		this.addChild(bg);

		let titleBg = BaseLoadBitmap.create("countrywarrewardview_itembg");
		titleBg.width = 600;
		titleBg.height = 35;
		titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 10);
		this.addChild(titleBg);

		let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyRechargeGiftName"+data.id+"-"+this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.setPosition(titleBg.x + titleBg.width/2 - titleTF.width/2, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
		this.addChild(titleTF);

		let itemTopLine: BaseBitmap = BaseBitmap.create("public_line3");
		itemTopLine.width += (titleTF.width + 40);
		itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2, titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
        this.addChild(itemTopLine);

		let reward = data.getReward;
		let rewardArr =  GameData.formatRewardItem(reward);
        let itemicon = null;
        let baseWidth = 108;
        let spaceX = 8;
		let scale = 0.8;

		// rewardArr = rewardArr.concat(rewardArr).concat(rewardArr).concat(rewardArr).concat(rewardArr).concat(rewardArr).concat(rewardArr);
		let rewardBg = BaseBitmap.create("public_scrolllistbg");
		rewardBg.width = bg.width - 20;
		rewardBg.x = bg.x + bg.width/2 - rewardBg.width/2;
		rewardBg.y = titleBg.y + titleBg.height + 5;
		this.addChild(rewardBg);

		// let rewardContainer = new BaseDisplayObjectContainer();
		// rewardContainer.width = 380;
		// rewardContainer.setPosition(startX,startY);
		// this.addChild(rewardContainer);

		// let rewardStx = (rewardContainer.width - (rewardArr.length * (baseWidth*scale) + (rewardArr.length + 1)*spaceX))/2;
		//new
		let stX = (rewardBg.width - (6 * (baseWidth * scale + spaceX) - spaceX)) /2 + rewardBg.x;
		let rowNum = Math.ceil(rewardArr.length / 6);
		// let endX = 0;
		// let len = rewardArr.length % 6;
		// let lastIndex = (rowNum-1) * 6;
		// if (rewardArr.length < 6){
		// 	stX = (rewardBg.width - (rewardArr.length * (baseWidth * scale + spaceX) - spaceX)) /2 + rewardBg.x;
		// }
		// else{
		// 	if (len > 0){
		// 		endX = (rewardBg.width - (len * (baseWidth * scale + spaceX) - spaceX)) /2 + rewardBg.x;
		// 	}
		// }
		rewardBg.height = rowNum * (baseWidth * scale + 10) + 10;

        for(let i = 0; i < rewardArr.length; i++)
        {
			itemicon = GameData.getItemIcon(rewardArr[i],true,true);
			itemicon.setScale(scale);
			// if (len > 0 && rowNum > 1 && lastIndex == i){
			// 	itemicon.x = endX + (itemicon.width * scale + spaceX) * (i%6);
			// }
			// else{
			// 	itemicon.x = stX + (itemicon.width * scale + spaceX)*(i % 6);
			// }
			itemicon.x = stX + (itemicon.width * scale + spaceX)*(i % 6);
            itemicon.y = rewardBg.y + 10 + Math.floor(i / 6) * (itemicon.height * scale + 10);
           	this.addChild(itemicon);
		}

		let vo = <AcCrossServerHegemonyVo>Api.acVoApi.getActivityVoByAidAndCode(this._itemParam.aid, this._itemParam.code);

		//锁
		let lock = BaseBitmap.create("accshegemony_alliancecharge_lock");
		lock.setPosition(bg.x + bg.width/2 - lock.width/2, bg.y + 15);
		this.addChild(lock);
		
		//板子
		let blackBg = BaseBitmap.create("accshegemony_alliancecharge_infobg");
		blackBg.setPosition(bg.x + bg.width/2 - blackBg.width/2, rewardBg.y + rewardBg.height + 10);
		this.addChild(blackBg);

		bg.height = blackBg.y + blackBg.height;

		//帮会充值
		let allianceRecharge = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyTotalRecharge", [""+vo.getAllianceTotalRecharge(), ""+data.totalValue]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		allianceRecharge.setPosition(blackBg.x + 20, blackBg.y + 20);
		this.addChild(allianceRecharge);

		//个人充值
		let personalRecharge = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyPersonalRecharge", [""+vo.getAlliancePersonalRecharge(), ""+data.individualValue]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		personalRecharge.setPosition(allianceRecharge.x, allianceRecharge.y + allianceRecharge.height + 10);
		this.addChild(personalRecharge);

		if (vo.getAllianceTotalRecharge() >= data.totalValue){
			lock.visible = false;
			allianceRecharge.visible = false;
			personalRecharge.y = blackBg.y + blackBg.height/2 - personalRecharge.height/2;
			if (vo.getAlliancePersonalRecharge() >= data.individualValue){
				// blackBg.visible = false;
				personalRecharge.setColor(TextFieldConst.COLOR_WARN_GREEN);
			}
		}
		else{
			if (vo.getAlliancePersonalRecharge() >= data.individualValue){
				personalRecharge.setColor(TextFieldConst.COLOR_WARN_GREEN);
			}
		}

		if (vo.isGetAllianceChargeRewardById(data.id)) {
			let reviceBM = BaseBitmap.create("collectflag");
			reviceBM.anchorOffsetX = reviceBM.width / 2;
			reviceBM.anchorOffsetY = reviceBM.height / 2;
			reviceBM.setScale(0.7);
			reviceBM.setPosition(bg.x + bg.width -  reviceBM.width * 0.7 / 2 - 10, bg.y + bg.height - reviceBM.height * 0.7 / 2);
			this.addChild(reviceBM);
		}
		else {
			if (vo.getAlliancePersonalRecharge() >= data.individualValue && vo.getAllianceTotalRecharge() >= data.totalValue) {
				let reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", () => {
					if ((!vo.isStart)) {
						App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
						return;
					}
                    NetManager.request(NetRequestConst.REQUEST_ACHEGEMONY_GETALLIANCECHARGERDW, { activeId: vo.aidAndCode, rkey: data.id}); 
				}, this,null,null,null,TextFieldConst.COLOR_BLACK);
				reviceBtn.setPosition(bg.x + bg.width - reviceBtn.width - 10, bg.y + bg.height - reviceBtn.height - 15);
				this.addChild(reviceBtn);
			}
			else {
				let chargeBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, "taskGoBtn", () => {
					if (!vo.isInMatchActicityTime()) {
						App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
						return;
					}
					ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
				}, this,null,null,null,TextFieldConst.COLOR_BLACK);
				chargeBtn.setPosition(bg.x + bg.width - chargeBtn.width - 10, bg.y + bg.height - chargeBtn.height - 15);
				this.addChild(chargeBtn);
				if (!vo.isInMatchActicityTime()) {
					chargeBtn.setGray(true);
				}
			}
		}
	}
	
	public getSpaceY():number
	{
		return 5;
	}
	
	public dispose():void
	{
		this._itemData = null;
		this._itemParam = null;
		this._countText = null;
		this._reviceBtn = null;
		this._goBtn = null;
		this._reviceBM = null;

		super.dispose();
	}
}