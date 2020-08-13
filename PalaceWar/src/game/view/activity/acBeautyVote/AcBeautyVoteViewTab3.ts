/**
  * 花魁活动view--积分兑换
  * @author 张朝阳
  * date 2019/4/23
  * @class AcBeautyVoteViewTab3
  */
class AcBeautyVoteViewTab3 extends AcCommonViewTab {

	private _scrollList: ScrollList = null;
	private _scoreTF: BaseTextField = null;

	public constructor() {
		super();
		egret.callLater(this.initView, this);
	}
	public initView() {
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_BEAUTYVOTE_SHOPBUY, this.shopBuyHandle, this);

		let cfg = <Config.AcCfg.BeautyVoteCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcBeautyVoteVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);

		let myScoreTitle = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab3MyScoreTitle-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		myScoreTitle.setPosition(240, -213 + 15);
		this.addChild(myScoreTitle);

		let scoreBM = BaseBitmap.create("acbeautyvoteview_scoreflag-" + this.code);
		scoreBM.setPosition(myScoreTitle.x + myScoreTitle.width + 5, myScoreTitle.y + myScoreTitle.height / 2 - scoreBM.height / 2);
		this.addChild(scoreBM);

		this._scoreTF = ComponentManager.getTextField(String(vo.getShopScoreValue()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		this._scoreTF.setPosition(scoreBM.x + scoreBM.width + 10, scoreBM.y + scoreBM.height / 2 - this._scoreTF.height / 2);
		this.addChild(this._scoreTF)

		let bg = BaseBitmap.create("public_9_bg32");
		bg.width = 620;
		bg.height = GameConfig.stageHeigth - this.getViewTitleButtomY() - 34 - myScoreTitle.height - 10;
		bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, myScoreTitle.y + myScoreTitle.height + 7);
		this.addChild(bg);

		let rect = new egret.Rectangle(0, 0, bg.width - 10, bg.height - 10 - 60);
		this._scrollList = ComponentManager.getScrollList(AcBeautyVoteViewTab3ScrollItem, cfg.beautyVoteScoreMarketItemCfgList, rect, { aid: this.aid, code: this.code });
		this._scrollList.setPosition(bg.x + 5, bg.y + 5);
		this._scrollList.bounces = false;
		this.addChild(this._scrollList);


		let scoreDesc = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab3TipDesc-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		scoreDesc.textAlign = egret.HorizontalAlign.CENTER;
		scoreDesc.setPosition(this._scrollList.x + this._scrollList.width / 2 - scoreDesc.width / 2, this._scrollList.y + this._scrollList.height + 30 - scoreDesc.height / 2 + 3);
		this.addChild(scoreDesc)

	}

	private refreshView() {
		let cfg = <Config.AcCfg.BeautyVoteCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcBeautyVoteVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		this._scoreTF.text = String(vo.getShopScoreValue());
		this._scrollList.refreshData(cfg.beautyVoteScoreMarketItemCfgList, { aid: this.aid, code: this.code });
	}

	private shopBuyHandle(event: egret.Event) {
		if (event.data.ret) {
			let rewards = event.data.data.data.rewards;
			let rewardVo = GameData.formatRewardItem(rewards);
			App.CommonUtil.playRewardFlyAction(rewardVo);
		}
	}


	public dispose() {
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_BEAUTYVOTE_SHOPBUY, this.shopBuyHandle, this);
		this._scrollList = null;
		super.dispose();
	}

}