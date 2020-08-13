class AcNewOpenViewTab3 extends AcCommonViewTab
{   
    private _scrollList:ScrollList = null; 
    private _numTxt : BaseTextField = null;
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
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.updateText, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_NEWOPENSHOPBUY),this.updateText,this);
	
        let numbg = BaseBitmap.create(`public_9_resbg`);
		let rectd = new egret.Rectangle(0,0,40,40);
        let icon = BaseBitmap.create(App.CommonUtil.getResByCode("acnewopen_specialitem2",this.uiType));
        let numTxt = ComponentManager.getTextField(String(this.vo.getSpecialNum()), 20);
        numbg.setPosition(245, 10);
		this.addChild(numbg);

        icon.setPosition(numbg.x-3, numbg.y+numbg.height/2-icon.height/2);
		view.addChild(icon);
        
        numTxt.setPosition(icon.x+icon.width+10,icon.y+icon.height/2-numTxt.height/2+2);
		view.addChild(numTxt);
		view._numTxt = numTxt;

		let vo = this.vo;
		let taskArr = this.vo.getShopArr();
		
		let tmpRect =  new egret.Rectangle(0,0,GameConfig.stageWidth,GameConfig.stageHeigth-383-68);
		let scrollList = ComponentManager.getScrollList(AcNewOpenShopItem,taskArr,tmpRect,view.code);
        view._scrollList = scrollList;     
		view._scrollList.y=60;
		view.addChild(scrollList); 
		scrollList.bounces = false;
    }

    private update() :void{
		if(!this.vo){
			return;
		}
		let taskArr = this.vo.getShopArr(); 
		this._scrollList.refreshData(taskArr,this.code);
        this.vo.lastpos = null;
        
	}

	private updateText():void
	{
		this._numTxt.text = String(this.vo.getSpecialNum());
	}

	private rewardCallBack(evt : egret.Event):void{
		let view = this;
		let rData = evt.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
		let rewards = rData.rewards;
		let rewardList =  GameData.formatRewardItem(rewards);
		let pos = this.vo.lastpos;
		App.CommonUtil.playRewardFlyAction(rewardList,pos);
		this.vo.lastidx = null;
		
	}

    public dispose():void
	{	
		let view = this;
		this._scrollList =null;
        this._numTxt = null;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.updateText, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_NEWOPENSHOPBUY),this.updateText,this);
		super.dispose();
	}
}