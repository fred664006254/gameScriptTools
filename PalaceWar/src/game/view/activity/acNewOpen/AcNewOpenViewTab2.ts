class AcNewOpenViewTab2 extends AcCommonViewTab
{
    //滑动列表
	private _scrollList:ScrollList = null; 
	private _taskArr =null;
	public constructor() 
	{
		super();
		this.initView();
	}

	private get cfg() : Config.AcCfg.NewOpenCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcNewOpenVo{
        return <AcNewOpenVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

	protected initView():void
	{
		let view = this;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_NEWOPENRINFOREWARDS),this.rewardCallBack,this);
	
		let vo = this.vo;
		let taskArr = this.vo.getRechangeArr();
		
		let tmpRect =  new egret.Rectangle(0,0,GameConfig.stageWidth,GameConfig.stageHeigth-383);
		let scrollList = ComponentManager.getScrollList(AcNewOpenRechargeItem,taskArr,tmpRect,view.code);
        view._scrollList = scrollList;     
		view.y=8;
		view.addChild(scrollList); 
		scrollList.bounces = false;
	}

	private update() :void{
		if(!this.vo){
			return;
		}
		let taskArr = this.vo.getRechangeArr(); 
		this._scrollList.refreshData(taskArr,this.code);
		this.vo.lastpos = null;
	}

	private rewardCallBack(evt : egret.Event):void{
		let view = this;
		let rData = evt.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
		let rewards = rData.rewards;
		let cfg = view.cfg.recharge[view.vo.lastidx];
        let str = `1053_0_${cfg.specialGift}_${this.getUiCode()}|` + rewards;
		let rewardList =  GameData.formatRewardItem(str);
		let pos = this.vo.lastpos;
		App.CommonUtil.playRewardFlyAction(rewardList,pos);
		this.vo.lastidx = null;
		
	}

	public dispose():void
	{	
		let view = this;
		this._scrollList =null;
		this._taskArr =null;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_NEWOPENRINFOREWARDS),this.rewardCallBack,this);
		super.dispose();
	}
}