/**
 * 三国进度奖励
 * author ycg
 * date 2020.1.14
 * @class  AcThreekingdomsRechargeAchievePopupView
 */
class  AcThreekingdomsRechargeAchievePopupView extends PopupView {
	private _scrollList: ScrollList = null;
	private _storyId:string = null;

	public constructor() {
		super();
	}
	public initView(): void {
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMSRECHARGE_REWARDS, this.getAchievementCallback, this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		// App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACTRAVELWITHBEAUTY_PLAYSTORY, this.getPlayStoryId, this);
		let aid = this.param.data.aid;
		let code = this.param.data.code;
		let id = this.param.data.id;
		let vo = <AcThreekingdomsRechargeVo>Api.acVoApi.getActivityVoByAidAndCode(aid, code);
		
		let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 530;
		bg.height = 720;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
		this.addChildToContainer(bg);

		let processCfg = vo.getSortAchievementCfg();
		let rect = new egret.Rectangle(0, 0, 520, 710);
		this._scrollList = ComponentManager.getScrollList(AcThreekingdomsRechargeAchieveScrollItem, processCfg, rect, { id: id, code: code, aid: aid });
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
	private getAchievementCallback(event: egret.Event) {
		if (event.data.ret) {
			let rData = event.data.data.data;
			this.showReward(rData);
		}
	}

	private getPlayStoryId(data:egret.Event):void{
		if (data.data && data.data.id){
			this._storyId = data.data.id;
		}
	}

	private showReward(rData:any){
		let rewards = rData.rewards;
		let replacerewards = rData.replacerewards;
		let rewardVo = GameData.formatRewardItem(rewards);
		App.CommonUtil.playRewardFlyAction(rewardVo);
		let vo = <AcThreekingdomsRechargeVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
		let data = vo.getSortAchievementCfg();
		this._scrollList.refreshData(data, { id: null, code: this.param.data.code, aid: this.param.data.aid });
		if (replacerewards) {
			ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
		}
	}

	private refreshView():void{
		if (!this._scrollList){
			return;
		}
		let vo = <AcThreekingdomsRechargeVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
		let data = vo.getSortAchievementCfg();
		this._scrollList.refreshData(data, {code: this.param.data.code, aid: this.param.data.aid });
	}

	private getTypeCode():string{
		let code = this.param.data.code;
		if (code == "2"){
			return "1";
		}
		else if (code == "4"){
            return "3";
        }
        else if (code == "6"){
            return "5";
        }
        else if (code == "8"){
            return "7";
        }
        else if (code == "10"){
            return "9";
        }
		return code;
	}

	private get cfg():Config.AcCfg.ThreekingdomsRechargeCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
	}

	protected getTitleStr(): string {
		return "acThreekingdomsRechargeKillRewardTitle-" + this.getTypeCode();
	}

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"progress3_bg", "progress3"
		]);
	}

	public dispose(): void {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_TRAVELWITHBEAUTY_REWARD, this.getAchievementCallback, this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		// App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACTRAVELWITHBEAUTY_PLAYSTORY, this.getPlayStoryId, this);

		this._scrollList = null;
		this._storyId = null;
		super.dispose();
	}
}