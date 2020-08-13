/**
 * 麦田飘香，大宝箱预览
 * author 赵占涛
 */
class AcRyeHarvestBigBoxPopupView  extends PopupView
{
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
        let view = this;

        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);

        let bg: BaseBitmap = BaseBitmap.create("public_tc_bg01");
        bg.width = 538;
        bg.height = 835;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 10;
        this._nodeContainer.addChild(bg);

        let rect = new egret.Rectangle(0, 0, 518, bg.height - 23);
        this._scrollList = ComponentManager.getScrollList(AcRyeHarvestBigBoxItem, this.cfg.bigPrize, rect, this.code);
        this._scrollList.setPosition(bg.x + bg.width/ 2 - this._scrollList.width / 2, bg.y + 10);
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
            let starnum = view.cfg.task[rechargeId].specialGift;
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
        this._scrollList.refreshData(this.cfg.bigPrize, this.code);
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
        this._scrollList = null;
        super.dispose();
    }
}