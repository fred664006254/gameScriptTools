// TypeScript file

class AcEnjoyNightAchievementPopupView extends PopupView {

	private _scrollList: ScrollList = null;
	public constructor() {
		super();
	}

    private get vo():AcEnjoyNightVo
	{
		 let springCelebrateVo = <AcEnjoyNightVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code); 
		 return  springCelebrateVo;
	} 

    private get cfg() : Config.AcCfg.EnjoyNightCfg
    {
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
	}

	public initView(): void {
		App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTACHIEVEMENT, this.weathRewardHandle, this);
		let aid = this.param.data.aid;
		let code = this.param.data.code;
		let id = this.param.data.id;
		let vo = this.vo;
		let cfg = this.cfg;
		let bg = BaseBitmap.create("public_9_probiginnerbg");
		bg.width = 530;
		bg.height = 720;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
		this.addChildToContainer(bg);

		var newarr = this.getArr(); 
		let rect = new egret.Rectangle(0, 0, 520, 710);
		this._scrollList = ComponentManager.getScrollList(AcEnjoyNightAchievementScrollItem, newarr, rect, { id: id, code: code, aid: aid });
		this._scrollList.setPosition(bg.x + 3, bg.y + 5);
		this._scrollList.bounces = false;
		this.addChildToContainer(this._scrollList);
		if (id) {
			for (let i = 0; i < newarr.length; i++) {
				if (newarr[i].id == id) {
					this._scrollList.setScrollTopByIndex(i, 1000);
					break;
				}
			}
		}


	}
	/**刷新item */
	private weathRewardHandle(event: egret.Event) {
		if (event.data.ret) {
			let rewards = event.data.data.data.rewards;
			let replacerewards = event.data.data.data.replacerewards;
			let rewardVo = GameData.formatRewardItem(rewards);
			App.CommonUtil.playRewardFlyAction(rewardVo);
			let vo = this.vo;
			var newarr = this.getArr(); 
			this._scrollList.refreshData(newarr, { id: null, code: this.param.data.code,uicode: this.param.data.uicode, aid: this.param.data.aid })
			if (replacerewards) {
				ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
			}

		}
	}

    private getArr():Array<any>
	{

        let keys = Object.keys(this.cfg.achievement); 
		let arr =[];
		let arr2 =[];
		for(var i in keys)
		{
            var currRe = this.cfg.achievement[keys[i]]; 
			var  myRechargeNum=this.vo.getRechargeNum();
			if(this.vo.checkAchievementFlag(currRe.id)==true && myRechargeNum>=currRe.needNum)
			{
				arr.push(currRe);
			}else
			{
				arr2.push(currRe);
			}
		}  
		var newarr = [];
		newarr = arr2.concat(arr); 
		return newarr;
	}


	protected getTitleStr(): string {
		return "acEnjoyNightAchievementPopupViewTitle-" + this.param.data.uicode;
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat(["progress3_bg", "progress3"
		]);
	}
	public dispose(): void {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTACHIEVEMENT, this.weathRewardHandle, this);
		this._scrollList = null;
		super.dispose();
	}
}