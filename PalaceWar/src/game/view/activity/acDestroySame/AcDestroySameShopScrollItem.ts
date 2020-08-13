/**
  * 商店item
  * author 张朝阳
  * date 2019/7/16
  * @class AcMotherDayActivityRewardShopScrollItem
  */
class AcDestroySameShopScrollItem extends ScrollListItem {
	private _itemData: Config.AcCfg.DSShopItemCfg = null;
	private _aidAndCode: { "aid": string; "code": string } = null;
	public constructor() {
		super();
	}
	/**
	 * 初始化itemview
	 */
	public initItem(index: number, data: any, itemParam: any): void {

		this._itemData = data;
		this._aidAndCode = itemParam;
		let vo = <AcDestroySameVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);

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

		let limitNum = this._itemData.limit - vo.getShopValue(this._itemData.id);
		let limitTF = ComponentManager.getTextField(LanguageManager.getlocal("acMotherDayActivityRewardShopScrollItemLimit-3", [String(limitNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
		limitTF.setPosition(itembg.x + itembg.width / 2 - limitTF.width / 2, itembg.y + 190 - limitTF.height - 2);
		this.addChild(limitTF);

		let needPartVo = GameData.formatRewardItem(this._itemData.cost)[0];

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

		let shopBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acMotherDayActivityRewardShopScrollItemshop-3", () => {
			if ((!vo.isStart)) {
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
				return;
			}
			let limitNum = this._itemData.limit - vo.getShopValue(this._itemData.id);
			if(limitNum <= 0){
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishShopTip1"));
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
					App.CommonUtil.showTip(LanguageManager.getlocal("acMotherDayActivityRewardShopScrollItemNotEnoughItem-3"));
					return;
				}
			}
			vo.lastpos = shopBtn.localToGlobal(shopBtn.width/2 + 50,20);
			NetManager.request(NetRequestConst.REQUEST_DESTROYSAME_SHOPBUY, {
				activeId: vo.aidAndCode, 
				rkey: Number(data.id) 
			});
		}, this);
		shopBtn.setPosition(itembg.x + itembg.width / 2 - shopBtn.width / 2, itembg.y + itembg.height - 23 - shopBtn.height);
		this.addChild(shopBtn);


		if (limitNum <= 0) {
			shopBtn.setGray(true);
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