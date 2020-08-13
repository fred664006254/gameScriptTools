
class AcLuckyDrawPopupViewTab2 extends AcCommonViewTab
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
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LUCKYDRAW_FRESH_ITEM, this.refreashView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_LUCKYDRAWGETRECHARERWD, this.christmasTaskRewardHandel, this);
        let view = this;
        
        let taskData = this.cfg.recharge;
        let processCfg = [];
		for(let i in taskData){
			let unit = taskData[i];
			processCfg.push({
				needGem : unit.needGem,
				getReward : unit.getReward,
                id : Number(i),
                specialGift : unit.specialGift,
				isGet : view.vo.isGetRecharge(Number(i))
			});
		}
		processCfg.sort(this.sortFunc);
        let rect = new egret.Rectangle(0, 0, 520, 710);
        this._scrollList = ComponentManager.getScrollList(AcLuckyDrawChargetem, processCfg, rect, this.code);
        this._scrollList.setPosition(28, 62);
        this.addChild(this._scrollList)
    }

    private sortFunc(a : any, b : any):number{
		let lqua = a.isGet;
		let lqub = b.isGet;
		if((lqua && lqub) || !(lqua || lqub)){
			return a.needGem - b.needGem
		}
		else if(lqua){
			return 1;
		}
		else if(lqub){
			return -1;
		}
    }
    
    /**
     * 领奖回调
     */
    private christmasTaskRewardHandel(event: egret.Event) {
        let view = this;
        if (event.data.ret){
            // taskId
            let list: { icon: string, tipMessage: string, type: number }[] = [];
            let rechargeId = view.vo.selIdx;
            let starnum = view.cfg.recharge[rechargeId].specialGift;
            if(starnum){
                let icon = `luckdrawluckyicon1-${view.getUiCode()}`;
                let starItem: { icon: string, tipMessage: string, type: number } = { icon: icon, tipMessage: "+" + String(starnum), type: 0 };
                list.push(starItem);
            }

            let reward = event.data.data.data.rewards;
            let rewardVo = GameData.formatRewardItem(reward);
            for (let key in rewardVo) {
                let item: { icon: string, tipMessage: string, type: number } = { icon: rewardVo[key].icon, tipMessage: rewardVo[key].tipMessage, type: rewardVo[key].type };
                list.push(item);
            }
            let replacerewards = event.data.data.data.replacerewards;
            if (replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
            }

            App.CommonUtil.playRewardFlyAction(list);
        }
    }

    private refreashView() {
        let view = this;
        let taskData = this.cfg.recharge;
        let processCfg = [];
        for(let i in taskData){
            let unit = taskData[i];
            processCfg.push({
                needGem : unit.needGem,
                getReward : unit.getReward,
                id : Number(i),
                specialGift : unit.specialGift,
                isGet : view.vo.isGetRecharge(Number(i))
            });
        }
        processCfg.sort(this.sortFunc);

        this._scrollList.refreshData(processCfg, this.code);
    }
    protected getUiCode(): string {
		if (this.param.data.code == "3") {
			return "1";
		}
        else if(this.param.data.code == "4")
        {
            return "2";
        }
        return this.param.data.code;
	}


    public dispose(): void {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LUCKYDRAW_FRESH_ITEM, this.refreashView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_LUCKYDRAWGETRECHARERWD, this.christmasTaskRewardHandel, this);
        this._scrollList = null;
        super.dispose();
    }
}