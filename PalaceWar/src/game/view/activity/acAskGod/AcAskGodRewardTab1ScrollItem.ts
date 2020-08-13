class AcAskGodRewardTab1ScrollItem extends ScrollListItem {
	private _itemData:any= null;
    private _aid:string = null;
    private _code:string = null;
	public constructor() {
		super();
    }
    
    private get vo():AcSkySoundVo{
        return <AcSkySoundVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.SkySoundCfg{
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
		itemBg.height = 140;
		itemBg.x = this.width/2 - itemBg.width/2;
		this.addChild(itemBg);

		let rewards = this._itemData.item;
		if (this._itemData.costSpecial8) {
			rewards = "1064_0_" + this._itemData.costSpecial8 + "_" + this.getTypeCode() + "|" + rewards;
		}		
		if (this._itemData.costSpecial4) {
			rewards = "1063_0_" + this._itemData.costSpecial4 + "_" + this.getTypeCode() + "|" + rewards;
		}
		if (this._itemData.costSpecial2) {
			rewards = "1062_0_" + this._itemData.costSpecial2 + "_" + this.getTypeCode() + "|" + rewards;
		}
		let rewardIconList = GameData.getRewardItemIcons(rewards, true);
		let scale = 0.7;
		let spaceX = 20;
        
		for (let i = 0; i < rewardIconList.length; i++) 
		{
            let rewardDB = rewardIconList[i];
			rewardDB.setScale(scale);
			rewardDB.setPosition(17+i*(rewardDB.width*rewardDB.scaleX+spaceX), itemBg.height/2-rewardDB.height*rewardDB.scaleY/2);
			this.addChild(rewardDB);

			if(i == rewardIconList.length-2)
			{
				let arrow:BaseBitmap = BaseBitmap.create(`dechuanchangearrow-1`);
				arrow.setPosition(rewardDB.x+rewardDB.width*rewardDB.scaleX-3,itemBg.height/2-arrow.height/2);
				this.addChild(arrow);
			}else if(i == rewardIconList.length-1)
			{
				rewardDB.x = 17+i*(rewardDB.width*rewardDB.scaleX+spaceX) + 5;
			}else
			{
				let add:BaseBitmap = BaseBitmap.create(`public_itemadd`);
				add.setPosition(rewardDB.x+rewardDB.width*rewardDB.scaleX,itemBg.height/2-add.height/2);
				this.addChild(add);				
			}
		}
        
		this.height = itemBg.height + this.getSpaceY();

		let state = this.vo.canGetExchange(String(this._itemData.id));
		let reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "acSkySoundExchangeBtnTxt", () => {
			if ((!this.vo.isStart)) {
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
				return;
			}
			let st = this.vo.canGetExchange(String(this._itemData.id));
			if(st == 1)
			{
				NetManager.request(NetRequestConst.REQUEST_ACSKYSOUND_EXCHANGE, { activeId: this.vo.aidAndCode, shopId: Number(data.id) });
			}else
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("acSkySoundExchangeNoTxt"));
			}
		}, this);
		reviceBtn.scaleX = 0.95;
		reviceBtn.setPosition(itemBg.x+itemBg.width-reviceBtn.width*reviceBtn.scaleX-5, itemBg.y+itemBg.height/2-reviceBtn.height/2);
		this.addChild(reviceBtn);
		if(state == 2)
		{
			reviceBtn.setEnable(false);
		}

		if(this._itemData.limit)
		{
			let lefttimes = this._itemData.limit - this.vo.getExchangeTimes(String(data.id));
			lefttimes = lefttimes > 0 ? lefttimes : 0;
			let txt = ComponentManager.getTextField(LanguageManager.getlocal("acSkySoundExchangeDescTxt",[String(lefttimes)]), 18,TextFieldConst.COLOR_BROWN);
			txt.width = reviceBtn.width*reviceBtn.scaleX;
			txt.textAlign = egret.HorizontalAlign.CENTER;
			txt.x = reviceBtn.x;
			txt.y = reviceBtn.y - txt.height;
			this.addChild(txt);
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