// TypeScript file
class AcEnjoyNightRewardViewTab1 extends AcCommonViewTab
{

    private _scrollList:ScrollList = null; 
    public constructor() 
	{
		super();
		this.initView();
	}

    private get cfg() : Config.AcCfg.EnjoyNightCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcEnjoyNightVo{
        return <AcEnjoyNightVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}

	private get uiCode():string{
		let baseview : any = ViewController.getInstance().getView('AcEnjoyNightView');
		let code = baseview.getUiCode();
		return code;
	}

	private get uicode():string{

		return this.uiCode;
	}

    protected initView():void
    {	
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTGETRECHARGERWD),this.useCallback,this);  
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.restList, this);


        let bottomBg2 = BaseBitmap.create("public_9_bg32");
        bottomBg2.height = GameConfig.stageHeigth - 169;
        bottomBg2.width = GameConfig.stageWidth - 32;
        bottomBg2.x = GameConfig.stageWidth/2 - bottomBg2.width/2;
        bottomBg2.y = 10;
		this.addChild(bottomBg2);

        let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomBg2.height-10);

		var newArr = this.getArr();
        let scrollList = ComponentManager.getScrollList(EnjoyNightRewardScrollItem,newArr,rect,{aid:this.aid,code:this.code,uicode:this.uicode});
		scrollList.x =20; 
		scrollList.y =5+bottomBg2.y; 
        this.addChild(scrollList); 
		this._scrollList =scrollList;
    }

    private restList():void
	{
		var newarr = this.getArr(); 
		this._scrollList.refreshData(newarr,{aid:this.aid,code:this.code,uicode:this.uicode});
	}

	private getArr():Array<any>
	{

        let keys = Object.keys(this.cfg.recharge); 
		let arr =[];
		let arr2 =[];
		for(var i in keys)
		{
            var currRe = this.cfg.recharge[keys[i]]; 
			var  myRechargeNum=this.vo.getRechargeNum();
			if(this.vo.getRechargeFlag(currRe.id)==false && myRechargeNum>=currRe.needGem)
			{
				arr.push(currRe);
			}else
			{
				arr2.push(currRe);
			}
		}  
		var newarr = [];
		newarr = arr2.concat(arr); 
		return newarr;
	}

    public useCallback(event:egret.Event):void
	{
		if(event.data.ret)
		{  
			let rewards:string ="";
			rewards = this.vo.tmpReward;
			App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(rewards));
		} 
	}

    public dispose():void
	{ 

		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTGETRECHARGERWD),this.useCallback,this);  
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.restList, this);

        this._scrollList = null;

        super.dispose();
    }

}