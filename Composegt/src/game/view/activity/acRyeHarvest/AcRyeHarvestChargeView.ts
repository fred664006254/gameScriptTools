/**
 * 	母亲节充值活动
 * author 钱竣
 * date 2018/11/27
 */
class AcRyeHarvestChargeView extends PopupView {

    private _scrollList: ScrollList = null;
    private _nodeContainer: BaseDisplayObjectContainer;
    public constructor() {
        super();
    }

    private get cfg() : Config.AcCfg.RyeHarvestCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcRyeHarvestVo{
        return <AcRyeHarvestVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
        return `taskViewTitle`;
    }

    protected getUiCode() : string{
        let code = '';
        switch(Number(this.code)){
            case 2:
                code = '1';
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }

    public initView() {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RYEHARVEST_FRESH_ITEM, this.refreashView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_RYEHARVEST_GETCHARGE, this.christmasTaskRewardHandel, this);
        let view = this;

        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);

        let bg: BaseBitmap = BaseBitmap.create("public_tc_bg01");
        bg.width = 538;
        bg.height = 835;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 10;
        this._nodeContainer.addChild(bg);

        let taskData = this.cfg.task;
        let processCfg = [];
		for(let i in taskData){
			let unit = taskData[i];
			processCfg.push({
				value : unit.value,
				getReward : unit.getReward,
                questType : unit.questType,
                openType : unit.openType,
                id : Number(i) + 1,
                specialGift : unit.specialGift,
				isGet : view.vo.isGetRecharge(Number(i) + 1)
			});
		}
		processCfg.sort(this.sortFunc.bind(this));
        let rect = new egret.Rectangle(0, 0, 518, bg.height - 23);
        this._scrollList = ComponentManager.getScrollList(AcRyeHarvestChargeItem, processCfg, rect, this.code);
        this._scrollList.setPosition(bg.x + bg.width/ 2 - this._scrollList.width / 2, bg.y + 10);
        this.addChildToContainer(this._scrollList)

    }

    private sortFunc(a : any, b : any):number{
		let lqua = a.isGet;
		let lqub = b.isGet;
        // 是否已领取
        if (a.isGet != b.isGet) {
            if (a.isGet) {
                return 1;
            } else {
                return -1;
            }
        }
        // 是否可领取
        let canGetA = this.vo.getChargeNum(a.questType) >= a.value;
        let canGetB = this.vo.getChargeNum(b.questType) >= b.value;
        if (canGetA != canGetB) {
            if (canGetA) {
                return -1;
            } else {
                return 1;
            }
        }
        return a.id - b.id;
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
            let starnum = view.cfg.task[rechargeId].specialGift;
            if(starnum){
                let icon = `ryeharvesticon1-${view.getUiCode()}`;
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
        let taskData = this.cfg.task;
        let processCfg = [];
		for(let i in taskData){
			let unit = taskData[i];
			processCfg.push({
				value : unit.value,
				getReward : unit.getReward,
                questType : unit.questType,
                openType : unit.openType,
                id : Number(i) + 1,
                specialGift : unit.specialGift,
				isGet : view.vo.isGetRecharge(Number(i) + 1)
			});
		}

        processCfg.sort(this.sortFunc.bind(this));
        this._scrollList.refreshData(processCfg, this.code);
    }

    protected getResourceList(): string[] {
        return super.getResourceList().concat([
            `acmidautumnview_titlebg`,`progress3_bg`,`progress3`,
            "activity_db_01","activity_charge_red","progress_type1_yellow","progress_type1_bg"
        ]);
    }

	protected getShowHeight()
	{
        return 935;
	}
    public dispose(): void {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RYEHARVEST_FRESH_ITEM, this.refreashView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_RYEHARVEST_GETCHARGE, this.christmasTaskRewardHandel, this);
        this._scrollList = null;
        super.dispose();
    }

}