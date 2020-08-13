/**
  * 花魁活动view--充值奖励
  * @author 张朝阳
  * date 2019/4/23
  * @class AcBeautyVoteViewTab2
  */
class AcBeautyVoteViewTab2 extends AcCommonViewTab {

	private _scrollList: ScrollList = null;
	public constructor() {
		super();
		egret.callLater(this.initView, this);
	}
	public initView() {
		App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.refreshView, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_BEAUTYVOTE_GETRECHARGERWD, this.rechargeRewardHandle, this);

		let cfg = <Config.AcCfg.BeautyVoteCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcBeautyVoteVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);

		let bg = BaseBitmap.create("public_9_bg32");
		bg.width = 620;
		bg.height = GameConfig.stageHeigth - this.getViewTitleButtomY() - 34;
		bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, -213 + 15);
		this.addChild(bg); //785 570

		let list = vo.getSortRechargeCfg();
		list.sort((a, b) => { return a.sortId - b.sortId });
		let rect = new egret.Rectangle(0, 0, bg.width - 10, bg.height - 10 - 60);
		this._scrollList = ComponentManager.getScrollList(AcBeautyVoteViewTab2ScrollItem, list, rect, { aid: this.aid, code: this.code });
		this._scrollList.setPosition(bg.x + 5, bg.y + 5);
		this._scrollList.bounces = false;
		this.addChild(this._scrollList);

		let rechargeDesc = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab2TipDesc-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		rechargeDesc.setPosition(this._scrollList.x + this._scrollList.width / 2 - rechargeDesc.width / 2, this._scrollList.y + this._scrollList.height + 30 - rechargeDesc.height / 2);
		this.addChild(rechargeDesc)

	}

	private refreshView() {
		let vo = <AcBeautyVoteVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let list = vo.getSortRechargeCfg();
		list.sort((a, b) => { return a.sortId - b.sortId });
		this._scrollList.refreshData(list, { aid: this.aid, code: this.code });
	}

	private rechargeRewardHandle(event: egret.Event) {
		if (event.data.ret) {
			let specialGift = event.data.data.data.specialGift;
			let rewards = "1008_0_" + specialGift + "_" + this.code + "|" + event.data.data.data.rewards;
			let rewardVo = GameData.formatRewardItem(rewards);
			App.CommonUtil.playRewardFlyAction(rewardVo);
			this.refreshView();

		}
	}




	public dispose() {
		App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.refreshView, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_BEAUTYVOTE_GETRECHARGERWD, this.rechargeRewardHandle, this);
		this._scrollList = null;
		super.dispose();
	}

}