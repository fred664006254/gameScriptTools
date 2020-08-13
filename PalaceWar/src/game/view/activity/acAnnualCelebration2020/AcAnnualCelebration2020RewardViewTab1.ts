// TypeScript file
class AcAnnualCelebration2020RewardViewTab1 extends AcCommonViewTab
{

    private _scrollList:ScrollList = null; 
    public constructor() 
	{
		super();
		this.initView();
	}

    private get cfg() : Config.AcCfg.AnnualCelebration2020Cfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcAnnualCelebration2020Vo{
        return <AcAnnualCelebration2020Vo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}

	private get uiCode():string{
		let baseview : any = ViewController.getInstance().getView('AcAnnualCelebration2020View');
		let code = baseview.getUiCode();
		return code;
	}

	private get uicode():string{

		return this.uiCode;
	}

    protected initView():void
    {	
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_ANNUALCELEBRATION2020CIRCLE),this.useCallback,this);  
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.restList, this);


        let bottomBg2 = BaseBitmap.create("public_9_bg32");
        bottomBg2.height = GameConfig.stageHeigth - 169;
        bottomBg2.width = GameConfig.stageWidth - 32;
        bottomBg2.x = GameConfig.stageWidth/2 - bottomBg2.width/2;
        bottomBg2.y = 10;
		// this.addChild(bottomBg2);

        let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomBg2.height-10);

		var newArr = this.getArr();
        let scrollList = ComponentManager.getScrollList(AcAnnualCelebration2020RewardScrollItem,newArr,rect,{aid:this.aid,code:this.code,uicode:this.uicode});
		scrollList.x =5; 
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

        let keys = Object.keys(this.cfg.achievement); 
		let arr =[];
		let arr2 =[];
		let maxcircle = this.cfg.getMaxCircle();
		for(var i in keys)
		{
            var currRe = this.cfg.achievement[keys[i]]; 
			var  myRechargeNum=this.vo.getCircleNum();
			if(this.vo.getCircleFlag(currRe.id)==false && myRechargeNum>=currRe.needNum)
			{	
				if (currRe.id >= maxcircle)
				{	
					let taskId = this.vo.getMaxGetIndex();
					if (myRechargeNum>=taskId && this.vo.getCircleFlag(taskId))
					{
						arr2.push(currRe);
					}
					else
					{
						arr.push(currRe);
					}
				}
				else
				{
					arr.push(currRe);
				}

				
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
			this.restList();
		} 
	}

    public dispose():void
	{ 

		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_ANNUALCELEBRATION2020CIRCLE),this.useCallback,this);  
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.restList, this);

        this._scrollList = null;

        super.dispose();
    }

}