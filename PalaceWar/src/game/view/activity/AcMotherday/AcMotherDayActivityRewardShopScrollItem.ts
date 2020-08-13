/**
  * 商店item
  * author 张朝阳
  * date 2019/7/16
  * @class AcMotherDayActivityRewardShopScrollItem
  */
class AcMotherDayActivityRewardShopScrollItem extends ScrollListItem {
	private _itemData: Config.AcCfg.MotherDayShopItemCfg = null;
	private _aidAndCode: { "aid": string; "code": string } = null;
	public constructor() {
		super();
	}
	private isSceneCode(code : string):boolean{
		let arr = [3,4,7,8];
		return arr.indexOf(Number(code)) > -1;
	}
	/**
	 * 初始化itemview
	 */
	public initItem(index: number, data: any, itemParam: any): void {

		this._itemData = data;
		this._aidAndCode = itemParam;
		let vo = <AcMotherDayVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);

		this.width = 172;
		this.height = 287

		let itembg = BaseLoadBitmap.create("acmotherdayview_common_itembluebg");
		if (index == 0) {
			itembg.setload("acmotherdayview_common_itemredbg");
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

			let tagTxt = ComponentManager.getTextField(LanguageManager.getlocal('acMotherDayActivityRewardShopScrollItemDiscount-' + (this.isSceneCode(this._aidAndCode.code) ? `3`:this._aidAndCode.code), [(this._itemData.discount * 10).toString()]), 18, TextFieldConst.COLOR_WARN_YELLOW);
			let tagnum = 10 - this._itemData.discount * 10;
			if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp()) {
				tagTxt.text = LanguageManager.getlocal('acMotherDayActivityRewardShopScrollItemDiscount-' + (this.isSceneCode(this._aidAndCode.code) ? `3`:this._aidAndCode.code), [(tagnum * 10).toString()]);
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
		let limitTF = ComponentManager.getTextField(LanguageManager.getlocal("acMotherDayActivityRewardShopScrollItemLimit-" + (this.isSceneCode(this._aidAndCode.code) ? `3`:this._aidAndCode.code), [String(limitNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
		limitTF.setPosition(itembg.x + itembg.width / 2 - limitTF.width / 2, itembg.y + 190 - limitTF.height - 2);
		this.addChild(limitTF);

		let needPartVo = GameData.formatRewardItem(this._itemData.needPart)[0];

		let needIconScale = 0.35;
		let needIcon = BaseLoadBitmap.create("itemicon" + needPartVo.id);
		needIcon.width = 100;
		needIcon.height = 100;
		needIcon.setScale(needIconScale);
		this.addChild(needIcon);

		let needTF = ComponentManager.getTextField(String(needPartVo.num), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		this.addChild(needTF);

		let offestWidth = itembg.width - needIcon.width * needIconScale - needTF.width;
		needIcon.setPosition(itembg.x + offestWidth / 2, itembg.y + 202 - needIcon.height / 2 * needIconScale);
		needTF.setPosition(needIcon.x + needIcon.width * needIconScale, needIcon.y + needIcon.height / 2 * needIconScale - needTF.height / 2);

		let shopBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acMotherDayActivityRewardShopScrollItemshop-" + (this.isSceneCode(this._aidAndCode.code) ? `3`:this._aidAndCode.code), () => {
			if ((!vo.isStart)) {
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
				return;
			}
			if (needPartVo.type == 1) {
				if (Api.playerVoApi.getPlayerGem() < needPartVo.num) {
					App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
					return;
				}
			}
			else {
				if (Api.itemVoApi.getItemNumInfoVoById(needPartVo.id) < needPartVo.num) {
					App.CommonUtil.showTip(LanguageManager.getlocal("acMotherDayActivityRewardShopScrollItemNotEnoughItem-" + (this.isSceneCode(this._aidAndCode.code) ? `3`:this._aidAndCode.code)));
					return;
				}
			}
			NetManager.request(NetRequestConst.REQUEST_MOTHERDAY_BUYMOTHERDAYSHOP, { activeId: vo.aidAndCode, shopId: Number(data.id) });
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