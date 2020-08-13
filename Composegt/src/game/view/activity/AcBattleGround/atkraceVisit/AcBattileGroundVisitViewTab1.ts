/**
 * 防守消息
 */
class AcBattileGroundVisitViewTab1 extends PopupViewTab
{

	public defenseList=[];
	public _scrollList: ScrollList=null;

	private noDataTxt:BaseTextField =null;
	public static AtkaceType:number =0;
    public constructor(data?) 
	{
		super();
		this.param = data;
		this.initView();
	}

	private get cfg() : Config.AcCfg.BattleGroundCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcBattleGroundVo{
        return <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

    private get acTivityId() : string{
        return `${this.param.data.aid}-${this.code}`;
    }
	
	public initView():void
	{
	
		let bg= BaseBitmap.create("public_tc_bg01");
		bg.width=540;
		bg.height=600;
		// bg.x =40;
		// bg.y =55;// GameConfig.stageHeigth - bg.height-240;
		bg.x =GameConfig.stageWidth/2 - bg.width/2 -5;
		bg.y =75;
		this.addChild(bg);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ENERMY), this.freshlist, this);
		NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ENERMY, {
			activeId : this.acTivityId
		});
		AcBattileGroundVisitViewTab1.AtkaceType = 0;
	// public useCallback(data:any):void
	// {
	// 	if(data.data.ret)
	// 	{
	// 		if(data.data.data.data.atkrace.dinfo&&data.data.data.data.atkrace.dinfo.length>=1)
	// 		{
	// 			this.defenseList=data.data.data.data.atkrace.dinfo;
	// 			if(AtkraceVisitViewTab1.AtkaceType ==0)
	// 			{
	// 				this.showList();
	// 			}
	// 		}
	// 		else 
	// 		{
	// 			//没有数据消息
	// 			if(this.noDataTxt==null)
	// 			{
	// 				this.noDataTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_WHITE);
	// 				this.noDataTxt.text =LanguageManager.getlocal("atkracedes1");
	// 				this.noDataTxt.x = 220;//rankImg.x+60
	// 				if(PlatformManager.checkIsEnLang()){
	// 					this.noDataTxt.x = 570 / 2 - this.noDataTxt.width / 2;
	// 				}
	// 				this.noDataTxt.y = 300;//rankImg.y+10;
	// 			}
	// 			this.addChild(this.noDataTxt);
	// 		}	
	// 	}
	}

   public showList(): void 
   {
	
	   if(this._scrollList==null)
	   {
		    let rect = egret.Rectangle.create();
			rect.setTo(0, 0, 520, 580);
			this._scrollList = ComponentManager.getScrollList(AcBattileGroundVisitTab1Item, this.defenseList, rect);
			this.addChild(this._scrollList);
			// this._scrollList.setPosition(50, 65);
			this._scrollList.setPosition(GameConfig.stageWidth/2 - this._scrollList.width/2 -5 , 85); 
	   }
	}

	public freshlist(evt : egret.Event):void{
		if(evt.data.data.data && evt.data.data.data.dinfo){
			if(AcBattileGroundVisitViewTab1.AtkaceType ==0){
				if (this._scrollList){
					this._scrollList.dispose();
					this._scrollList = null;
				}
				let dinfo = evt.data.data.data.dinfo;
				if(dinfo && dinfo.length>=1)
				{
					this.defenseList = dinfo;
					this.showList();

				}
				else 
				{
					//没有数据消息
					if(this.noDataTxt==null)
					{
						this.noDataTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_WHITE);
						this.noDataTxt.text =LanguageManager.getlocal("atkracedes1");
						this.noDataTxt.x = 220;//rankImg.x+60
						if(PlatformManager.checkIsEnLang()){
							this.noDataTxt.x = 570 / 2 - this.noDataTxt.width / 2;
						}
						this.noDataTxt.y = 300;//rankImg.y+10;
					}
					this.addChild(this.noDataTxt);
				}	
			}
		}
		// NetManager.request(NetRequestConst.REQUEST_ATKRACE_GETMODEL, {});
		// App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_GETMODEL), this.useCallback, this);
	}

    public dispose():void
	{

		this.noDataTxt  =null;
		this.defenseList =[];
		this._scrollList=null;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ENERMY), this.freshlist, this);
   		//App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_GETMODEL), this.useCallback, this);
		AcBattileGroundVisitViewTab1.AtkaceType =0;
		super.dispose();
   }
}