/**
 * 携美同游充值奖励
 * author yangchengguo
 * date 2019.11.4
 * @class  AcTravelWithBeautyRechargePopupView
 */
class  AcTravelWithBeautyRechargePopupView extends PopupView {
	private _scrollList: ScrollList = null;

	public constructor() {
		super();
	}

	public initView(): void {
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_TRAVELWITHBEAUTY_RECHARGE, this.getRechargeCallback, this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		let aid = this.param.data.aid;
		let code = this.param.data.code;
		let id = this.param.data.id;
		let vo = < AcTravelWithBeautyVo>Api.acVoApi.getActivityVoByAidAndCode(aid, code);
		
		let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 530;
		bg.height = 720;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
		this.addChildToContainer(bg);

		let processCfg = vo.getSortRechargeCfg();
		let rect = new egret.Rectangle(0, 0, 520, 710);
		this._scrollList = ComponentManager.getScrollList(AcTravelWithBeautyRechargeScrollItem, processCfg, rect, { id: id, code: code, aid: aid });
		this._scrollList.setPosition(bg.x + 3, bg.y + 5);
		this.addChildToContainer(this._scrollList);
		if (id) {
			for (let i = 0; i < processCfg.length; i++) {
				if (processCfg[i].id == id) {
					this._scrollList.setScrollTopByIndex(i, 1000);
					break;
				}
			}
		}
    }
    
	/**刷新item */
	private getRechargeCallback(event: egret.Event) {
		if (!event.data.ret){
			return;
		}
		let rData = event.data.data.data;
		if (rData) {
			let rewards = rData.rewards;
			let replacerewards = event.data.data.data.replacerewards;
			if (rData.specialGift) {
				rewards = "1033_0_" + rData.specialGift + "_" + this.getTypeCode() + "|" + rewards;
			}
			let rewardVo = GameData.formatRewardItem(rewards);
			App.CommonUtil.playRewardFlyAction(rewardVo);
			let vo = <AcTravelWithBeautyVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
			let data = vo.getSortRechargeCfg();
			this._scrollList.refreshData(data, { id: null, code: this.param.data.code, aid: this.param.data.aid })
			if (replacerewards) {
				ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
			}
		}
	}

	private refreshView():void{
		if (!this._scrollList){
			return;
		}
		let vo = <AcTravelWithBeautyVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
		let data = vo.getSortRechargeCfg();
		this._scrollList.refreshData(data, { id: null, code: this.param.data.code, aid: this.param.data.aid })
	}

	protected getTitleStr(): string {
		let code = this.param.data.code;
		if (this.param.data.code == "2"){
			code = "1";
		}
		else if (this.param.data.code == "4"){
			code = "3";
		}
		return "acTravelWithBeautyRechargeTitle-" + code;
	}

	private getTypeCode():string{
		if (this.param.data.code == "2"){
			return "1";
		}
		else if (this.param.data.code == "4"){
			return "3";
		}
		return this.param.data.code;
	}

	protected getResourceList(): string[] {
		return super.getResourceList().concat(["progress3_bg", "progress5",
		"accarnivalview_tab_red", "accarnivalview_tab_green",
		]);
	}

	public dispose(): void {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_TRAVELWITHBEAUTY_RECHARGE, this.getRechargeCallback, this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		this._scrollList = null;
		super.dispose();
	}
}