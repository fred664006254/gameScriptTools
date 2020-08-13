/**
 * 	母亲节充值活动
 * author 钱竣
 * date 2018/11/27
 */
class AcMotherDayChargeView extends CommonView {

    private _scrollList: ScrollList = null;
    public constructor() {
        super();
    }

    private get cfg() : Config.AcCfg.MotherDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcMotherDayVo{
        return <AcMotherDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
    
    protected getTitleStr():string{
        return `acRechargeViewTitle`;
    }
    protected getUiCode(): string {
        let code = '';
        switch (Number(this.code)) {
            case 2:
            case 5:
            case 6:
                code = '1';
                break;
            case 4:
                code = '3';
                break;
            case 7:
            case 8:
                code = '7';
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }

    public initView() {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MOTHERDAY_FRESH_ITEM, this.refreashView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MOTHERDAY_GETCHARGE, this.christmasTaskRewardHandel, this);
        let view = this;
        let bg = BaseBitmap.create("public_9_bg22");
        bg.width = 640;
        bg.height = GameConfig.stageHeigth - 89;
        bg.setPosition(0, -15);
        this.addChildToContainer(bg);

        let bg2 = BaseBitmap.create("public_9_bg43");
        bg2.width = 612;
        bg2.height = bg.height - 30;
        bg2.setPosition(bg.x + bg.width / 2 - bg2.width / 2, bg.y + 15);
        this.addChildToContainer(bg2);

        let taskData = this.cfg.recharge;
        let processCfg = [];
		for(let i in taskData){
			let unit = taskData[i];
			processCfg.push({
				needGem : unit.needGem,
				getReward : unit.getReward,
                id : Number(i) + 1,
                specialGift : unit.specialGift,
				isGet : view.vo.isGetRecharge(Number(i) + 1)
			});
		}
		processCfg.sort(this.sortFunc);
        let rect = new egret.Rectangle(0, 0, 600, bg2.height - 10);
        this._scrollList = ComponentManager.getScrollList(AcMotherDayChargeItem, processCfg, rect, this.code);
        this._scrollList.setPosition(bg2.x + bg2.width/ 2 - this._scrollList.width / 2, bg2.y);
        this.addChildToContainer(this._scrollList)

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
                let icon = `motherdayicon1-${view.getUiCode()}`;
                let starItem: { icon: string, tipMessage: string, type: number } = { icon: icon, tipMessage: "+" + String(starnum), type: 0 };
                list.push(starItem);
            }

            let reward = event.data.data.data.rewards;
            let rewardVo = GameData.formatRewardItem(reward);
            for (let key in rewardVo) {
                let item: { icon: string, tipMessage: string, type: number } = { icon: rewardVo[key].icon, tipMessage: rewardVo[key].tipMessage, type: rewardVo[key].type };
                list.push(item);
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
                id : Number(i) + 1,
                specialGift : unit.specialGift,
                isGet : view.vo.isGetRecharge(Number(i) + 1)
            });
        }
        processCfg.sort(this.sortFunc);

        this._scrollList.refreshData(processCfg, this.code);
    }

    protected getResourceList(): string[] {
        return super.getResourceList().concat([
            `acmidautumnview_titlebg`,`progress3_bg`,`progress3`
        ]);
    }

    public dispose(): void {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MOTHERDAY_FRESH_ITEM, this.refreashView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MOTHERDAY_GETCHARGE, this.christmasTaskRewardHandel, this);
        this._scrollList = null;
        super.dispose();
    }

}