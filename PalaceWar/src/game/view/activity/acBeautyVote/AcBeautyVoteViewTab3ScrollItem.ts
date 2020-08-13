/**
  * 花魁活动this--积分兑换tem
  * @author 张朝阳
  * date 2019/4/23
  * @class AcBeautyVoteViewTab3ScrollItem
  */
class AcBeautyVoteViewTab3ScrollItem extends ScrollListItem {
	// private _data: any = null;
	// private _curIdx: number = 0;
	// private _limitTxt: BaseTextField = null;
	// private _lastReqIdx: number = null;
	// private _buyBtn: BaseButton = null;
	public constructor() {
		super();
	}

	// private get cfg(): Config.AcCfg.WorldCupCfg {
	// 	return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_ACWORLDCUP, this._code);
	// }

	// private get vo(): AcWorldCupVo {
	// 	return <AcWorldCupVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACWORLDCUP, this._code);
	// }

	// private get acTivityId(): string {
	// 	return `${AcConst.AID_ACWORLDCUP}-${this._code}`;
	// }

	// private _code: string = '';
	protected initItem(index: number, data: any, itemparam: any) {

		// 		costScore: 1000
		// discount: 0.5
		// goods: "11_4002_1"
		// hashCode: (...)
		// id: 1
		// limit: 1

		let cfg = <Config.AcCfg.BeautyVoteCfg>Config.AcCfg.getCfgByActivityIdAndCode(itemparam.aid, itemparam.code);
		let vo = <AcBeautyVoteVo>Api.acVoApi.getActivityVoByAidAndCode(itemparam.aid, itemparam.code);

		this.width = 610;
		this.height = 140;


		let rewardsArr: Array<RewardItemVo> = GameData.formatRewardItem(data.goods);

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

		let btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "nothing", () => {
			if (data.limit && (data.limit - vo.getBuyLimit(data.id) <= 0)) {
				App.CommonUtil.showTip(LanguageManager.getlocal("acBeautyVoteViewTab3NotFullNumTip-" + itemparam.code));
				return;
			}
			if (data.costScore > vo.getShopScoreValue()) {
				App.CommonUtil.showTip(LanguageManager.getlocal("acBeautyVoteViewTab3NotFullScoreTip-" + itemparam.code));
				return;
			}
			NetManager.request(NetRequestConst.REQUEST_BEAUTYVOTE_SHOPBUY, { activeId: vo.aidAndCode, buyId: data.id, num: 1 });
		}, this)
		let str = String(data.costScore);
		btn.setText(str, false);
		btn.addTextIcon("acbeautyvoteview_scoreflag-" + itemparam.code);
		this.setLayoutPosition(LayoutConst.rightverticalCenter, btn, this, [22, 0]);
		this.addChild(btn);
		if (data.costScore > vo.getShopScoreValue() || (data.limit && (data.limit - vo.getBuyLimit(data.id)) <= 0)) {
			btn.setGray(true);
		}
		else {
			btn.setGray(false);
		}

		//折扣
		if (data.discount) {
			let tag = BaseBitmap.create('shopview_corner');
			this.setLayoutPosition(LayoutConst.lefttop, tag, this);
			this.addChild(tag);

			let tagTxt = ComponentManager.getTextField(LanguageManager.getlocal('discountTitle', [(data.discount * 10).toString()]), 18, TextFieldConst.COLOR_WARN_YELLOW);
			tagTxt.rotation = -45;
			this.setLayoutPosition(LayoutConst.lefttop, tagTxt, icon, [-18, 11]);
			this.addChild(tagTxt);


			let itemicon = BaseBitmap.create("acbeautyvoteview_scoreflag-" + itemparam.code);//
			let oldTxt = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab3OldProce-" + itemparam.code), 18, TextFieldConst.COLOR_BLACK);
			let priceTxt = ComponentManager.getTextField(String(Math.round(data.costScore / data.discount)), 18, TextFieldConst.COLOR_BLACK);
			let desc = (btn.width - (oldTxt.textWidth + 40 + priceTxt.textWidth)) / 2;

			this.setLayoutPosition(LayoutConst.lefttop, oldTxt, btn, [desc, 0 - oldTxt.textHeight - 8]);
			this.addChild(oldTxt);

			this.setLayoutPosition(LayoutConst.leftverticalCenter, itemicon, oldTxt, [oldTxt.textWidth, 0]);
			this.addChild(itemicon);

			this.setLayoutPosition(LayoutConst.lefttop, priceTxt, oldTxt, [100 * 0.4 + oldTxt.textWidth, 0]);
			this.addChild(priceTxt);

			let line = BaseBitmap.create('shopview_line');
			this.setLayoutPosition(LayoutConst.leftverticalCenter, line, oldTxt, [(line.width - (oldTxt.textWidth + 40 + priceTxt.textWidth)) / 2, 0]);
			this.addChild(line);
		}

		//限购
		if (data.limit) {
			// let curNum = data.limit - this.vo.getBuyLimitnum(data.sortId + 1);
			let limitTxt = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab3Limit-" + itemparam.code, [String(data.limit - vo.getBuyLimit(data.id))]), 20, TextFieldConst.COLOR_BLACK);
			this.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, btn, [0, btn.height + 5]);
			this.addChild(limitTxt);
			// if (curNum <= 0) {
			// 	btn.setEnable(false);
			// }
		}
		// //this.update();
	}



	public dispose(): void {
		super.dispose();
	}
}