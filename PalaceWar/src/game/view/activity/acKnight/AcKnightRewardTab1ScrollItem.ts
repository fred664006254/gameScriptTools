class AcKnightRewardTab1ScrollItem extends ScrollListItem {
	private _itemData:any= null;
    private _aid:string = null;
    private _code:string = null;
	public constructor() {
		super();
    }
    
    private get vo():AcKnightVo{
        return <AcKnightVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.KnightCfg{
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

		this.width = 530;
		let itemBg = BaseBitmap.create("public_popupscrollitembg");
		itemBg.x = this.width/2 - itemBg.width/2;
		this.addChild(itemBg);

		let titleBg:BaseBitmap = BaseBitmap.create("ac_skinoflibai_chargeitem_red");
		titleBg.x = itemBg.x;
		titleBg.y = itemBg.y+ 5;
		this.addChild(titleBg);

		let titleTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKnightRechargeItemInfo", this.getTypeCode()) , [String(this._itemData.needGem)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.setPosition(titleBg.x + 15, titleBg.y + titleBg.height / 2 - titleTF.height / 2)
		this.addChild(titleTF);

		let rewards = this._itemData.getReward;
		if (this._itemData.specialGift) {
			rewards = "1057_0_" + this._itemData.specialGift + "_" + this.getTypeCode() + "|" + rewards;
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
		let currChargeGem = this.vo.getChargeNum();
		let progressStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeDetailRechargeItemNum", this.getTypeCode()), [String(currChargeGem), String(data.needGem)]);
		progress.setPercentage(currChargeGem / data.needGem, progressStr, TextFieldConst.COLOR_WHITE);

		this.height = itemBg.height;

		if (this.vo.isGetRecharge(String(data.id))) {
			let reviceBM = BaseBitmap.create("collectflag");
			reviceBM.anchorOffsetX = reviceBM.width / 2;
			reviceBM.anchorOffsetY = reviceBM.height / 2;
			reviceBM.setScale(0.7);
			reviceBM.setPosition(itemBg.x + itemBg.width - reviceBM.width * 0.7 / 2 - 10, this.y + this.height - reviceBM.height * 0.7 / 2);
			this.addChild(reviceBM);
			titleBg.setRes("ac_skinoflibai_chargeitem_green");
		}
		else {
			if (currChargeGem >= data.needGem) {
				titleBg.setRes("ac_skinoflibai_chargeitem_green");
				let reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", () => {
					if ((!this.vo.isStart)) {
						App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
						return;
					}
					NetManager.request(NetRequestConst.REQUEST_KNIGHT_GETRINFORWD, { activeId: this.vo.aidAndCode, rkey: Number(data.id) });
				}, this);
				reviceBtn.setPosition(itemBg.x + itemBg.width - reviceBtn.width - 15, itemBg.y + itemBg.height - reviceBtn.height - 15);
				this.addChild(reviceBtn);
				if (!this.vo.isStart){
					reviceBtn.setGray(true);
				}
			}
			else {
				let chargeBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, "taskGoBtn", () => {
					if (!this.vo.isInActivity()) {
						App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
						return;
					}
					if (this.vo.checkIsInEndShowTime()) {
						App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
						return;
					}					
					ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
				}, this);
				chargeBtn.setPosition(itemBg.x + itemBg.width - chargeBtn.width - 15, itemBg.y + itemBg.height - chargeBtn.height - 15);
				this.addChild(chargeBtn);
				if (!this.vo.isInActivity()) {
					chargeBtn.setGray(true);
				}
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