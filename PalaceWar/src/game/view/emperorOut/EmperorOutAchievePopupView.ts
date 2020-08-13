/**
 * 进度奖励
 * author yangchengguo
 * date 2019.12.12
 * @class EmperorOutAchievePopupView
 */
class EmperorOutAchievePopupView extends PopupView {
	private _scrollList:ScrollList = null;
	private _isAuthor:boolean = false;
	public constructor() {
		super();
	}

	public initView(): void {
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_GETPOPULARRWD, this.freshList, this);
		let bg = BaseBitmap.create("public_9_probiginnerbg");
		bg.width = 530;
		bg.height = 670;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
		this.addChildToContainer(bg);


		let data = Config.EmperoroutingCfg.getAchievement1CfgList();
		let playerId = Api.playerVoApi.getPlayerID();
		if (playerId == this.param.data.uid){
			data = Config.EmperoroutingCfg.getAchievement2CfgList();
			this._isAuthor = true;
		}
		let processCfg = Api.emperorAchieveVoApi.getSortOutAchieveCfg(this.param.data.uid, data);
		let currId = null;
		if (this.param && this.param.data && this.param.data.id){
			currId = this.param.data.id;
		}
		App.LogUtil.log("currId: "+this.param.data.uid);
		let rect = new egret.Rectangle(0, 0, 520, 660);
		this._scrollList = ComponentManager.getScrollList(EmperorOutAchieveScrollItem, processCfg, rect, {id: currId, uid: this.param.data.uid, isAuthor:this._isAuthor});
		this._scrollList.setPosition(bg.x + 3, bg.y + 5);
		// this._scrollList.bounces = false;
		this.addChildToContainer(this._scrollList);
		if (currId) {
			for (let i = 0; i < processCfg.length; i++) {
				if (processCfg[i].id == currId) {
					this._scrollList.setScrollTopByIndex(i, 800);
					break;
				}
			}
		}
	}
	
	private freshList(evt:egret.Event):void{
		if (evt && evt.data && evt.data.ret){
			let rData = evt.data.data.data;
			let rewardVo = GameData.formatRewardItem(rData.rewards);
            App.CommonUtil.playRewardFlyAction(rewardVo);
			if (this._scrollList){
				let data = Config.EmperoroutingCfg.getAchievement1CfgList();
				if (this._isAuthor){
					data = Config.EmperoroutingCfg.getAchievement2CfgList();
				}
				let processCfg = Api.emperorAchieveVoApi.getSortOutAchieveCfg(this.param.data.uid, data);
				this._scrollList.refreshData(processCfg, {id:null, uid: this.param.data.uid, isAuthor:this._isAuthor});
			}
		}
	}

	protected getTitleStr():string {
		return "emperorOutAchieveTitle";
	}

	protected getShowHeight():number{
		return 760;
	}

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"progress3_bg", "progress3", "countrywarrewardview_itembg"

		]);
	}

	public dispose(): void {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_GETPOPULARRWD, this.freshList, this);
		this._scrollList = null;
		this._isAuthor = false;
		super.dispose();
	}
}