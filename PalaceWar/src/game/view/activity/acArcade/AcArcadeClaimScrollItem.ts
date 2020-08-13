/**
  * 电玩的任务item
  * author 张朝阳
  * date 2019/6/12
  * @class AcArcadeClaimScrollItem
  */
class AcArcadeClaimScrollItem extends ScrollListItem {
	private _aidAndCode: { "aid": string; "code": string } = null;
	public constructor() {
		super();
	}
	/**
	 * 初始化itemview
	 */
	public initItem(index: number, data: any, itemParam: any): void {

		this._aidAndCode = itemParam;
		let vo = <AcArcadeVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
		this.width = 608;
		this.height = 140;

		let rewardsArr: Array<RewardItemVo> = GameData.formatRewardItem(data.item);

		let rewardInfo = rewardsArr[0];

		let wordsBg: BaseBitmap = BaseBitmap.create("public_9_bg14");
		wordsBg.width = 610;
		wordsBg.height = 140;
		this.addChild(wordsBg);

		let icon = GameData.getItemIcon(rewardInfo, true, true)
		icon.setPosition(wordsBg.x + 22, wordsBg.y + wordsBg.height / 2 - icon.height / 2);
		this.addChild(icon);

		let itemNameBg: BaseBitmap = BaseBitmap.create("public_9_bg15");
		itemNameBg.width = 180;
		itemNameBg.setPosition(icon.x + icon.width + 10, icon.y + 5);
		this.addChild(itemNameBg);

		let itemNameTF: BaseTextField = ComponentManager.getTextField(rewardInfo.name, TextFieldConst.FONTSIZE_TITLE_SMALL, rewardInfo.nameColor);
		this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, itemNameTF, itemNameBg);
		this.addChild(itemNameTF);

		let itemDescTF: BaseTextField = ComponentManager.getTextField(rewardInfo.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		itemDescTF.textAlign = egret.HorizontalAlign.LEFT;
		itemDescTF.width = 200;
		this.setLayoutPosition(LayoutConst.lefttop, itemDescTF, itemNameBg, [0, itemNameBg.height + 2]);
		this.addChild(itemDescTF);

		let buyNum = vo.getShopBuyNumById(data.id);

		let btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "nothing", () => {
			if (data.limit && (data.limit - buyNum <= 0)) {
				App.CommonUtil.showTip(LanguageManager.getlocal("acArcadeClaimViewNotFullNumTip-" + this._aidAndCode.code));
				return;
			}
			if (data.costScore > vo.getScore()) {
				App.CommonUtil.showTip(LanguageManager.getlocal("acArcadeClaimViewNotFullScoreTip-" + this._aidAndCode.code));
				return;
			}
			NetManager.request(NetRequestConst.REQUST_ACTIVITY_ARCADESHOPBUY, { activeId: vo.aidAndCode, rkey: data.id, num: 1 });
		}, this)
		let str = String(data.costScore);
		btn.setText(str, false);
		btn.addTextIcon("acarcadeview_mooncoin-" + this._aidAndCode.code);
		this.setLayoutPosition(LayoutConst.rightverticalCenter, btn, this, [22, 0]);
		this.addChild(btn);


		if (data.costScore > vo.getScore() || (data.limit && (data.limit - buyNum) <= 0)) {
			btn.setGray(true);
		}
		else {
			btn.setGray(false);
		}

		//限购
		if (data.limit) {
			let curNum = data.limit - vo.getShopBuyNumById(data.id);
			let limitTxt = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeClaimViewLimit-" + this._aidAndCode.code, [String(curNum)]), 20, TextFieldConst.COLOR_BLACK);
			this.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, btn, [0, btn.height + 5]);
			this.addChild(limitTxt);
			// if (curNum <= 0) {
			// 	btn.setEnable(false);
			// }
		}
	}
	public getSpaceY(): number {
		return 5;
	}

	public dispose(): void {
		super.dispose();
	}
}