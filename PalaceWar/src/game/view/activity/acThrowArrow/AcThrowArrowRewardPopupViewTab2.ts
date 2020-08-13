class AcThrowArrowRewardPopupViewTab2 extends AcCommonViewTab
{
    //滑动列表
	private _scrollList:ScrollList = null; 
    public constructor() 
	{
		super();
		this.initView();
	}

    private get cfg() : Config.AcCfg.ThrowArrowCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcThrowArrowVo{
        return <AcThrowArrowVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    protected initView():void
    {   
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_THROWARROWGETACHIEVEMENTRWD, this.weathRewardHandle, this);

        let view = this;
		view.height = 620;
		view.width = 545;


        let Bg = BaseBitmap.create("public_9_bg4");
		Bg.width = 530;
		Bg.height = 660;
        Bg.x = 25;
        Bg.y = 55;
        view.addChild(Bg);

        let id = 0;
		if (this.vo.showRewardId)
		{
			id = this.vo.showRewardId;
			this.vo.showRewardId = 0;
		}

        let processCfg = this.vo.getSortAchievementCfg();

		let rect = new egret.Rectangle(0, 0,520,view.height+30);
		this._scrollList = ComponentManager.getScrollList(AcThrowArrowAchievementScrollItem, processCfg, rect, { id: id, code: this.code, aid: this.aid });
		this._scrollList.bounces = false;
		view.setLayoutPosition(LayoutConst.lefttop, this._scrollList, view, [29,60]);
        view.addChild(this._scrollList); 

        
		if (id) {
			for (let i = 0; i < processCfg.length; i++) {
				if (processCfg[i].id == id) {
					this._scrollList.setScrollTopByIndex(i, 1000);
					break;
				}
			}
		}
    }

    private weathRewardHandle(event: egret.Event) {
		if (event.data.ret) {
			let rewards = event.data.data.data.rewards;
			let replacerewards = event.data.data.data.replacerewards;
			let rewardVo = GameData.formatRewardItem(rewards);
			App.CommonUtil.playRewardFlyAction(rewardVo);
			let vo = <AcThrowArrowVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
			let processCfg = vo.getSortAchievementCfg();
			
			this._scrollList.refreshData(processCfg, { id: null, code: this.code, aid: this.aid })
			if (replacerewards) {
				ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
			}

		}
	}

    public dispose():void
	{	
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_THROWARROWGETACHIEVEMENTRWD, this.weathRewardHandle, this);
		this._scrollList = null;

		super.dispose();
	}
}