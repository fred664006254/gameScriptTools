/**
 * 充值奖励item
 * author ycg
 * date 2020.3.24
 */
class AcChaoTingViewTabScrollItem2 extends ScrollListItem{
    private _itemData:any= null;
    private _aid:string = null;
    private _code:string = null;
    
    public constructor(){
        super();
    }

    public initItem(index:number, data:any, param:any):void{
        this._itemData = data;
        this._aid = param.aid;
        this._code = param.code;
        let vo = <AcChaoTingVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);

		this.width = 640;
		let bgImg = ResourceManager.hasRes("acchaoting_itembg-"+this.getTypeCode()) ? "acchaoting_itembg-"+this.getTypeCode() : "acchaoting_itembg-1";
		let bg = BaseBitmap.create(bgImg);
		bg.x = this.width/2 - bg.width/2;
		this.addChild(bg);

		let topBgImg = ResourceManager.hasRes("acchaoting_itemtitlebg-"+this.getTypeCode()) ? "acchaoting_itemtitlebg-"+this.getTypeCode() : "acchaoting_itemtitlebg-1";
		let topBg:BaseBitmap = BaseBitmap.create(topBgImg);
		topBg.y = 0;
		topBg.x = this.width/2 - topBg.width/2;
		bg.y = topBg.y + 13;
		this.addChild(topBg);

		let topName = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingRechargeGiftName"+data.id+"-"+this.getTypeCode()), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		topName.setPosition(topBg.x + topBg.width/2 - topName.width/2, topBg.y + 17);
		this.addChild(topName);

		let titleBg:BaseBitmap = BaseBitmap.create("public_textbrownbg");
		titleBg.setPosition(bg.x + bg.width/2 - titleBg.width/2, bg.y + 45);
		this.addChild(titleBg);

		let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingRechargeInfo", [String(data.needGem)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.setPosition(titleBg.x + titleBg.width/2 - titleTF.width/2, titleBg.y + titleBg.height / 2 - titleTF.height / 2)
		this.addChild(titleTF);

		let rewardVoList = GameData.formatRewardItem(data.getReward);
		let scale = 0.95;
		let itemHeight = 108;
		let itemWidth = 108;
		let spaceX = 14;
		let spaceY = 12;
		for (let i = 0; i < rewardVoList.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
			rewardDB.setScale(scale);
			rewardDB.setPosition(bg.x + 21 + ((rewardDB.width * scale + spaceX) * (i % 5)), titleBg.y + titleBg.height + 15 + ((rewardDB.height * scale + spaceY) * Math.floor(i / 5)));
			this.addChild(rewardDB);
		}
		let rHeight = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.ceil(rewardVoList.length / 5)) * (itemHeight * scale + spaceY) - spaceY;

		let bgH = titleBg.y + titleBg.height + 15 + rHeight + 70;
		if (bgH > bg.height){
			bg.height = bgH;
		}

		//进度条
		let progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 420);
		progress.setPosition(bg.x + 15, bg.y + bg.height - progress.height - 25);
		this.addChild(progress);
		let currChargeGem = vo.getRechargeNum();
		let progressStr = LanguageManager.getlocal("acChaotingRechargeProNum", [String(currChargeGem), String(data.needGem)]);
		progress.setPercentage(currChargeGem / data.needGem, progressStr, TextFieldConst.COLOR_WHITE);

		if (vo.isGetRechargeById(data.id)) {
			let reviceBM = BaseBitmap.create("collectflag");
			reviceBM.anchorOffsetX = reviceBM.width / 2;
			reviceBM.anchorOffsetY = reviceBM.height / 2;
			reviceBM.setScale(0.7);
			reviceBM.setPosition(bg.x + bg.width - reviceBM.width * 0.7 / 2 - 10, bg.y + bg.height - reviceBM.height * 0.7 / 2);
			this.addChild(reviceBM);
		}
		else {
			if (vo.getRechargeNum() >= data.needGem) {
				let reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", () => {
					if ((!vo.isStart)) {
						vo.showAcEndTip();
						return;
					}
					NetManager.request(NetRequestConst.REQUEST_ACCHAOTING_GETRECHARGE, { activeId: vo.aidAndCode, rkey: data.id});
				}, this);
				reviceBtn.setPosition(bg.x + bg.width - reviceBtn.width - 15, bg.y + bg.height - reviceBtn.height - 15);
				this.addChild(reviceBtn);
				reviceBtn.setColor(TextFieldConst.COLOR_BLACK);
			}
			else {
				let chargeBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, "taskGoBtn", () => {
					if (!vo.isInActivity()) {
						vo.showAcEndTip();
						return;
					}
					ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
				}, this);
				chargeBtn.setPosition(bg.x + bg.width - chargeBtn.width - 15, bg.y + bg.height - chargeBtn.height - 15);
				this.addChild(chargeBtn);
				chargeBtn.setColor(TextFieldConst.COLOR_BLACK);
				if (!vo.isInActivity()) {
					chargeBtn.setGray(true);
				}
			}
		}
    }

    public getTypeCode():string{
        return this._code;
    }

    public getSpaceY():number{
        return 5;
    }

    public dispose():void{
        this._itemData = null;
        this._aid = null;
        this._code = null;

        super.dispose();
    }
}