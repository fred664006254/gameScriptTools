/**
 * 携美同游进度奖励
 * author yangchengguo
 * date 2019.9.5
 * @class  AcTravelWithBeautyAchieveRewardPopupView
 */
class  AcTravelWithBeautyAchieveRewardPopupView extends PopupView {
	private _scrollList: ScrollList = null;
	private _storyId:string = null;

	public constructor() {
		super();
	}
	public initView(): void {
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_TRAVELWITHBEAUTY_REWARD, this.getAchievementCallback, this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACTRAVELWITHBEAUTY_PLAYSTORY, this.getPlayStoryId, this);
		let aid = this.param.data.aid;
		let code = this.param.data.code;
		let id = this.param.data.id;
		let vo = < AcTravelWithBeautyVo>Api.acVoApi.getActivityVoByAidAndCode(aid, code);
		
		let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 530;
		bg.height = 720;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
		this.addChildToContainer(bg);

		let processCfg = vo.getSortAchievementCfg();
		// processCfg.sort((a, b) => { return a.sortId - b.sortId });
		let rect = new egret.Rectangle(0, 0, 520, 710);
		this._scrollList = ComponentManager.getScrollList(AcTravelWithBeautyAchieveRewardScrollItem, processCfg, rect, { id: id, code: code, aid: aid });
		this._scrollList.setPosition(bg.x + 3, bg.y + 5);
		// this._scrollList.bounces = false;
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
			if (this.getTypeCode() == "3" && this._storyId && Number(this._storyId) > 5){
				this.showReward(rData);
			}
			else{
				let view = this;
				let dKey = "rewardDialog_"+view.getTypeCode();
				ViewController.getInstance().openView(ViewConst.POPUP.ACYIYIBUSHEAVGVIEW,{
					aid : view.param.data.aid,
					code : view.getTypeCode(),
					AVGDialog : view.cfg[dKey],
					visitId : view._storyId,
					talkKey: "acTravelWithBeautyRewardTalk_",
					bgName: "actravelwithbeauty_bg-"+ view.getTypeCode(),
					callBack : ()=>{
						view.showReward(rData);
					},
					obj:view
				});
			}
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
		let vo = <AcTravelWithBeautyVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
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
		let vo = <AcTravelWithBeautyVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
		let data = vo.getSortAchievementCfg();
		this._scrollList.refreshData(data, {code: this.param.data.code, aid: this.param.data.aid });
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

	private get cfg():Config.AcCfg.TravelWithBeautyCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
	}

	protected getTitleStr(): string {
		let code = this.param.data.code;
		if (this.param.data.code == "2"){
			code = "1";
		}
		else if (this.param.data.code == "4"){
			code = "3";
		}
		return "acTravelWithBeautyAchieveTitle-" + code;
	}

	protected getResourceList(): string[] {
		return super.getResourceList().concat(["progress3_bg", "progress3"
		]);
	}

	public dispose(): void {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_TRAVELWITHBEAUTY_REWARD, this.getAchievementCallback, this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACTRAVELWITHBEAUTY_PLAYSTORY, this.getPlayStoryId, this);

		this._scrollList = null;
		this._storyId = null;
		super.dispose();
	}
}