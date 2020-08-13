/**
 * 财运奖励
 * author 钱竣
 */
class AcLuckyDrawRewardPopupView extends PopupView {

	private _scrollList: ScrollList = null;
	public constructor() {
		super();
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
	
	private get aid():string{
		return this.param.data.aid;
	}
	
	private get code():string{
		return this.param.data.code;
	}

	public initView(): void {
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_LUCKYDRAW_FRESH_ITEM, this.refreashView, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_LUCKYDRAWGETACHIRWD, this.weathRewardHandle, this);
		let view = this;
		let id = this.param.data.id;
	
		let bg = BaseBitmap.create("public_9_probiginnerbg");
		bg.width = 530;
		bg.height = 720;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
		this.addChildToContainer(bg);

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
		this._scrollList.setPosition(bg.x + 3, bg.y + 5);
		this.addChildToContainer(this._scrollList);
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
	
	protected getTitleStr(): string {
		return `acLuckyDrawLuckyReward-${this.code}`
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat(["progress3_bg", "progress3"
		]);
	}
	public dispose(): void {
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LUCKYDRAW_FRESH_ITEM, this.refreashView, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_LUCKYDRAWGETACHIRWD, this.weathRewardHandle, this);
		this._scrollList = null;
		super.dispose();
	}
}