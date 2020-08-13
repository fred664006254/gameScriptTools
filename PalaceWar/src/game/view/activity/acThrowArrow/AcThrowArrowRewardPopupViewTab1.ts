class AcThrowArrowRewardPopupViewTab1 extends AcCommonViewTab
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
        let view = this;
		view.height = 620;
		view.width = 545;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_THROWARROWGETRECHARGERWD),this.rewardCallBack,this);

        let Bg = BaseBitmap.create("public_9_bg4");
		Bg.width = 530;
		Bg.height = 660;
        Bg.x = 25;
        Bg.y = 55;
        view.addChild(Bg);


        let list = this.vo.getSortRechargeCfg();
		list.sort((a, b) => { return a.sortId - b.sortId });
 		let tmpRect =  new egret.Rectangle(0,0,520,view.height+30);
		let scrollList = ComponentManager.getScrollList(AcThrowArrowRechargeScrollItem,list,tmpRect,{ aid: this.aid, code: this.code });
        view._scrollList = scrollList;     
		view.setLayoutPosition(LayoutConst.lefttop, scrollList, view, [30,60]);
        view.addChild(scrollList); 
        scrollList.bounces = false;
        
    }

    private rewardCallBack(evt : egret.Event):void{
		let view = this;
		let rData = evt.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
		let rewards = rData.rewards;
		// let cfg = view.cfg.recharge[view.vo.lastidx];
        let str = `1006_0_${rData.specialGift}_${this.getUiCode()}|` + rewards;
		let rewardList =  GameData.formatRewardItem(str);
		// let pos = this.vo.lastpos;
		App.CommonUtil.playRewardFlyAction(rewardList);//pos
		// this.vo.lastidx = null;
	}


    private update():void{
		let view = this;
		if(!view.vo){
			return;
		}
		let list = this.vo.getSortRechargeCfg();
		list.sort((a, b) => { return a.sortId - b.sortId });
		view._scrollList.refreshData(list,{ aid: this.param.data.aid, code: this.param.data.code });
	}

    public dispose():void
	{	
		let view = this;
		this._scrollList =null;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeNetMessage(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_THROWARROWGETRECHARGERWD),this.rewardCallBack,this);
		super.dispose();
	}
}