/**
 * 元旦那个啥奖励
 */
class AcTreasureRewardView extends CommonView
{
    
    public constructor() {
		super();
	}
     
	public initView():void
	{ 
		let bottom:BaseBitmap = BaseBitmap.create("arena_bottom");
		bottom.y = GameConfig.stageHeigth - this.container.y - bottom.height;
		this.addChildToContainer(bottom); 

		let treasureDesTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		var zoneStr = App.DateUtil.formatSvrHourByLocalTimeZone(0).hour; 
		treasureDesTxt.text =LanguageManager.getlocal("treasureDes",[zoneStr+""]);
		treasureDesTxt.width=bottom.width; 
		treasureDesTxt.textAlign = TextFieldConst.ALIGH_CENTER;
		this.addChildToContainer(treasureDesTxt); 
		treasureDesTxt.y= bottom.y+40;
		// this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,treasureDesTxt,bottom);

        let bottomBg = BaseBitmap.create("servant_bottombg");
		bottomBg.width = GameConfig.stageWidth;
		bottomBg.height = GameConfig.stageHeigth - 75-50;
		bottomBg.y = GameConfig.stageHeigth - bottomBg.height - this.getTitleButtomY()-50;
		this.addChildToContainer(bottomBg);
 

        let bottomBg2 = BaseBitmap.create("public_9_bg32");
        bottomBg2.height = bottomBg.height - 110;
        bottomBg2.width = bottomBg.width - 40;
        bottomBg2.x = bottomBg.x+20;
        bottomBg2.y = bottomBg.y + 85;
		this.addChildToContainer(bottomBg2); 
   		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASUREHUNTGETTASKREWARDS),this.useCallback,this);  

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_TREASURE_LIST,this.checkRedPoint,this);

		// this.tabbarGroup.addRedPoint(1);//.y =this.tabbarGroup.y+50;
		this.checkRedPoint();

    }

	private checkRedPoint():void
	{	 
		if(this.vo.rechargeHot()&&this.vo.isInActy()==true)
		{
			this.tabbarGroup.addRedPoint(0);
		}
		else
		{
			this.tabbarGroup.removeRedPoint(0);
		} 
		
		if(this.vo.taskRedHot()&&this.vo.isInActy()==true)
		{
			this.tabbarGroup.addRedPoint(1);
		}
		else
		{
			this.tabbarGroup.removeRedPoint(1);
		}
	}

	private get vo():AcTreasureHuntVo
	{
		 let springCelebrateVo = <AcTreasureHuntVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code); 
		 return  springCelebrateVo;
	} 
	public useCallback(event:egret.Event):void
	{
		if(event.data.ret)
		{  
			let rewards:string ="";
			if(!event.data.data.data.rewards&&TreasureTaskScrollItem.TASKID!=null)
			{
				rewards =  TreasureTaskScrollItem.TASKID;  
			}
			else
			{
				rewards = event.data.data.data.rewards;
			}
			rewards = this.vo.tmpReward;
			App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(rewards));
			this.checkRedPoint();
		} 
	}


    protected getTabbarTextArr():Array<string>
	{
		return ["acTreasureRewardViewTab1",
                "acTreasureRewardViewTab2",
		];
	}  
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([ 
			"activity_charge_red",
			 "progress7","progress7_bg",
			 "servant_bottombg",
			 "arena_bottom",
         ]);
	}  
	public dispose():void
	{ 

		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_TREASURE_LIST,this.checkRedPoint,this);

		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASUREHUNTGETTASKREWARDS),this.useCallback,this);  
        super.dispose();
    }
}