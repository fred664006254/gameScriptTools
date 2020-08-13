class AcLuckyDrawPopupViewTab1 extends AcCommonViewTab
{  
    //滑动列表
	private _scrollList:ScrollList = null; 
    public constructor() 
	{
		super();
		this.initView();
    }
    
	private get cfg() : Config.AcCfg.LuckyDrawCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcLuckyDrawVo{
        return <AcLuckyDrawVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    protected initView():void
	{
        let view = this;
		view.height = 620;
        view.width = 545;
        
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LUCKYDRAW_FRESH_ITEM, this.refreashView, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_LUCKYDRAWGETACHIRWD, this.weathRewardHandle, this);
        let id = this.vo.showId;
        this.vo.showId = null;
        let processCfg = [];
		for(let i in view.cfg.achievement){
			let unit = view.cfg.achievement[i];
			processCfg.push({
				needNum : unit.needNum,
				getReward : unit.getReward,
				id : Number(i),
				isGet : view.vo.isGetJinduAward(Number(i))
			});
		}
		processCfg.sort(this.sortFunc);
		let rect = new egret.Rectangle(0, 0, 520, 710);
		this._scrollList = ComponentManager.getScrollList(AcLuckyDrawRewardItem, processCfg, rect, { id: id, code: view.code, aid: view.aid });
		this._scrollList.setPosition(28, 62);
		this.addChild(this._scrollList);
		if (typeof id != 'undefined') {
			for (let i = 0; i < processCfg.length; i++) {
				if (processCfg[i].id == id) {
					this._scrollList.setScrollTopByIndex(i, 1000);
					break;
				}
			}
		}

    }

    private sortFunc(a : any, b : any):number{
		let lqua = a.isGet;
		let lqub = b.isGet;
		if((lqua && lqub) || !(lqua || lqub)){
			return a.needNum - b.needNum
		}
		else if(lqua){
			return 1;
		}
		else if(lqub){
			return -1;
		}
	}

    /**刷新item */
	private weathRewardHandle(event: egret.Event) {
		let view = this;
		if (event.data.ret) {
			let rewards = event.data.data.data.rewards;
			let replacerewards = event.data.data.data.replacerewards;
			let rewardVo = GameData.formatRewardItem(rewards);
			App.CommonUtil.playRewardFlyAction(rewardVo);
			if (replacerewards) {
				ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
			}

		}
    }
    
	private refreashView() {
        let view = this;
		let processCfg = [];
		for(let i in view.cfg.achievement){
			let unit = view.cfg.achievement[i];
			processCfg.push({
				needNum : unit.needNum,
				getReward : unit.getReward,
				id : Number(i),
				isGet : view.vo.isGetJinduAward(Number(i))
			});
		}
        processCfg.sort(this.sortFunc);

        this._scrollList.refreshData(processCfg, {code: view.code, aid: view.aid});
	}

    public dispose(): void {
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LUCKYDRAW_FRESH_ITEM, this.refreashView, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_LUCKYDRAWGETACHIRWD, this.weathRewardHandle, this);
		this._scrollList = null;
		super.dispose();
	}
}
