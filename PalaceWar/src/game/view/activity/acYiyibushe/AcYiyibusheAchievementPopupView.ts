/**
 * 女优活动3 活动预览
 * author ycg
 * date 2019.10.14
 * @class AcYiyibusheAchievementPopupView
 */
class AcYiyibusheAchievementPopupView extends PopupView{
    public _scrollList:ScrollList = null;
	public _storyId:string = null;
    public constructor(){
        super();
    }

    public initView():void{
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_YIYIBUSHE_GETREWARD, this.getAchievementCallback, this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACYIYIBUSHE_PLAYSTORY, this.playStory, this);
		let aid = this.param.data.aid;
		let code = this.param.data.code;
		let id = this.param.data.id;
		let vo = <AcYiyibusheVo>Api.acVoApi.getActivityVoByAidAndCode(aid, code);
		
		let bg = BaseBitmap.create("public_9_probiginnerbg");
		bg.width = 550;
		bg.height = 750;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
		this.addChildToContainer(bg);

		let processCfg = vo.getSortAchievementCfg();
		processCfg.sort((a, b) => { return a.sortId - b.sortId });
		let rect = new egret.Rectangle(0, 0, 540, 740);
		this._scrollList = ComponentManager.getScrollList(AcYiyibusheAchievementScrollItem, processCfg, rect, { id: id, code: code, aid: aid });
		this._scrollList.setPosition(bg.x + 5, bg.y + 5);
		this._scrollList.bounces = true;
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
	
	private playStory(data:any):void{
		if (data.data && data.data.id){
			this._storyId = data.data.id;
		}
	}

    /**刷新item */
	private getAchievementCallback(event: egret.Event) {
		if (event && event.data && event.data.ret){
			let rData = event.data.data.data;
			if (rData) {
				let view = this;
				ViewController.getInstance().openView(ViewConst.POPUP.ACYIYIBUSHEAVGVIEW,{
					aid : view.param.data.aid,
					code : view.param.data.code,
					AVGDialog : view.cfg.AVGDialog,
					visitId : view._storyId,
					talkKey: "acYiyibusheTalk_",
					bgName: "acyiyibushe_bg-"+ view.param.data.code,
					callBack : ()=>{
						view.showReward(rData);
					},
					obj : view
				});
			}
			
			// let rewards = rData.rewards;
			// let replacerewards = rData.replacerewards;
			// let rewardVo = GameData.formatRewardItem(rewards);
			// App.CommonUtil.playRewardFlyAction(rewardVo);

			// let vo = <AcYiyibusheVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
			// let data = vo.getSortAchievementCfg();
			// data.sort((a, b) => { return a.sortId - b.sortId });
			// this._scrollList.refreshData(data, { id: null, code: this.param.data.code, aid: this.param.data.aid })
			// if (replacerewards) {
			// 	ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
			// }
		}
	}

	private showReward(rData:any):void{
		let rewards = rData.rewards;
		let replacerewards = rData.replacerewards;
		let view = this;
		ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rewards,"isPlayAni":true, "callback":()=>{
			let vo = <AcYiyibusheVo>Api.acVoApi.getActivityVoByAidAndCode(view.param.data.aid, view.param.data.code);
			let data = vo.getSortAchievementCfg();
			data.sort((a, b) => { return a.sortId - b.sortId });
			view._scrollList.refreshData(data, { id: null, code: view.param.data.code, aid: view.param.data.aid })
		}, "handler":view});

		if (replacerewards) {
			ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
		}
	}

	private get cfg():Config.AcCfg.YiyibusheCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

	protected getTitleStr(): string {
		return "acYiyibusheAchieveRewardTitle";
    }

	protected getResourceList(): string[] {
		return super.getResourceList().concat(["progress3_bg", "progress3"
		]);
	}

	protected getShowWidth():number{
		return 600;
	}
    
    public dispose():void{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_YIYIBUSHE_GETREWARD, this.getAchievementCallback, this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACYIYIBUSHE_PLAYSTORY, this.playStory, this);
		this._scrollList = null;
		this._storyId = null;
        super.dispose();
    }
}