/**
  * 月夜仙缘 商店
  * author yangchengguo
  * date 2019.8.20
  * @class AcSweetGiftRewardTab3ScrollItem
  */
 class AcFindSameRewardTab3ScrollItem extends ScrollListItem {
	private _itemData:any= null;
	private _aidAndCode: {"aid":string; "code":string} = null;
	public constructor() {
		super();
	}
	/**
	 * 初始化itemview
	 */
	public initItem(index: number, data: any, itemParam: any): void {

		this._itemData = data;
		this._aidAndCode = itemParam;
		let vo = <AcSweetGiftVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);

		this.width = 172;
		this.height = 287;

		let itembg = BaseLoadBitmap.create("acmotherdayview_common_itembluebg");
		if (index < 3) {
			itembg.setload("ac_sweetgift_exchange_bg-1");
		}
		itembg.width = this.width;
		itembg.height = this.height;
		this.addChild(itembg);

		let itemRewardVo = GameData.formatRewardItem(this._itemData.getReward)[0];
		let itemName = ComponentManager.getTextField(itemRewardVo.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, itemRewardVo.nameColor);
		itemName.setPosition(itembg.x + itembg.width / 2 - itemName.width / 2, itembg.y + 42 - itemName.height / 2);
		this.addChild(itemName);

		let itemContainer = GameData.getItemIcon(itemRewardVo, true, false);
		itemContainer.setPosition(itembg.x + itembg.width / 2 - itemContainer.width / 2, itembg.y + 58);
		this.addChild(itemContainer);

		if (this._itemData.discount) {
			let tag = BaseBitmap.create('shopview_corner');
			tag.setPosition(itemContainer.x, itemContainer.y);
			this.addChild(tag);

			let tagTxt = ComponentManager.getTextField(LanguageManager.getlocal('sweetgiftShopDiscount-' + this._aidAndCode.code, [String(this._itemData.discount * 10)]), 18, TextFieldConst.COLOR_WARN_YELLOW);
			let tagnum = 10 - this._itemData.discount * 10;
			if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp()) {
				tagTxt.text = LanguageManager.getlocal('sweetgiftShopDiscount-' + this._aidAndCode.code, [(tagnum * 10).toString()]);
			}
			tagTxt.width = 70;
			tagTxt.height = 20;
			tagTxt.textAlign = egret.HorizontalAlign.CENTER;
			tagTxt.anchorOffsetX = tagTxt.width / 2;
			tagTxt.anchorOffsetY = tagTxt.height / 2;
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tagTxt, tag, [-tagTxt.anchorOffsetX + 24, -tagTxt.anchorOffsetY + 22]);
			tagTxt.rotation = -45;
			this.addChild(tagTxt);
		}

		let limitNum = this._itemData.limit - vo.getShopValue(this._itemData.id);
		if (limitNum < 0){
			limitNum = 0;
		}
		let limitTF = ComponentManager.getTextField(LanguageManager.getlocal("sweetgiftExchangeNum", [String(limitNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
		limitTF.setPosition(itembg.x + itembg.width / 2 - limitTF.width / 2, itembg.y + 190 - limitTF.height - 2);
        this.addChild(limitTF);
        
		let needIconScale = 0.35;
		let needIcon = BaseLoadBitmap.create("itemicon1");
		needIcon.width = 100;
		needIcon.height = 100;
		needIcon.setScale(needIconScale);
		this.addChild(needIcon);

		let needTF = ComponentManager.getTextField(String(this._itemData.needGem), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		this.addChild(needTF);

		let offestWidth = itembg.width - needIcon.width * needIconScale - needTF.width;
		needIcon.setPosition(itembg.x + offestWidth / 2, itembg.y + 202 - needIcon.height / 2 * needIconScale);
		needTF.setPosition(needIcon.x + needIcon.width * needIconScale, needIcon.y + needIcon.height / 2 * needIconScale - needTF.height / 2);

		let shopBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "sweetgiftExchangeBtnName", () => {
			if (!vo.isInActivity()) {
				App.CommonUtil.showTip(LanguageManager.getlocal("sweetgiftShopNotBuy"));
				return;
			}
			
            if (Api.playerVoApi.getPlayerGem() < this._itemData.needGem) {
                App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
                return;
			}
			
			//判断是否有后羿
			let reward:string = "";
			if (data.getReward){
				let rewardArr = data.getReward.split("_");
				if (rewardArr && rewardArr.length > 0){
					reward = rewardArr[1];
				}
			}
			if (reward && reward == "1052"){
				//弹提示框
				let servantData = Config.ServantCfg.getServantItemById(reward);
				let itemVo =  GameData.formatRewardItem(servantData.exchange)[0];
				let msgStr = LanguageManager.getlocal("sweetgiftShopTipMsg-"+this._aidAndCode.code, [servantData.name, itemVo.name, String(itemVo.num)]);
				if (Api.servantVoApi.getServantObj(reward) != null){
					ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
						title:"sweetgiftShopTipTitle-"+this._aidAndCode.code,
						msg:msgStr,
						callback:() =>{
							NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETSHOP, { activeId: vo.aidAndCode, shopId: Number(data.id)});
						},
						handler:this,
						needCancel:true,
						});
				}
				else{
					NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETSHOP, { activeId: vo.aidAndCode, shopId: Number(data.id)});
				}
			}
			else{
				NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETSHOP, { activeId: vo.aidAndCode, shopId: Number(data.id)});
			}	
		}, this);
		shopBtn.setPosition(itembg.x + itembg.width / 2 - shopBtn.width / 2, itembg.y + itembg.height - 23 - shopBtn.height);
		this.addChild(shopBtn)
		if (limitNum <= 0) {
			shopBtn.setEnable(false);
		}
	}
	public getSpaceY(): number {
		return 5;
	}

	public dispose(): void {
		this._itemData = null;
		super.dispose();
	}
}