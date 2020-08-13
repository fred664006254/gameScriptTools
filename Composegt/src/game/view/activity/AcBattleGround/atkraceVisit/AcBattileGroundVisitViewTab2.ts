/**
 * 仇人
 */
class AcBattileGroundVisitViewTab2 extends PopupViewTab
{

    public einList=[];
	public _scrollList: ScrollList=null;
	public  _bg:BaseBitmap=null;

	public constructor(data?) 
	{
		super();
		this.param = data;
		this.initView();
	
	}
	
	protected initView():void
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_BATTLEGROUND_BATTLEEND,this.sendList,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ENERMY), this.freshlist, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_REVENGE), this.challengeCallback, this);

		this._bg= BaseBitmap.create("public_tc_bg01");
		this._bg.width=540;
		this._bg.height=600;
		// this._bg.x =40;
		// this._bg.y =55;
		this._bg.x =GameConfig.stageWidth/2 - this._bg.width/2 -5;
		this._bg.y =75;
		this.addChild(this._bg);
		AcBattileGroundVisitViewTab1.AtkaceType = 1;
		//this.freshlist();
		NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ENERMY, {
			activeId : this.acTivityId
		});
		
	}

	private challengeCallback(evt : egret.Event):void{	 
		let view = this;
		if(evt.data.ret < 0){
			App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acBattleGroundTip3")));
            view.sendList();
        }
		//NetManager.request(NetRequestConst.REQUEST_ATKRACE_GETMODEL, {});
	}
    private getDefaultCn(cnName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(LanguageManager.checkHasKey(cnName+"-"+this.code)){
            return cnName + "-" + this.code;
        } else {
            return cnName + "-" + defaultCode;
        }
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
	
	private sendList():void{
		NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ENERMY,{
			activeId : this.acTivityId
		});
	}

	private freshlist(evt : egret.Event):void{
		if(evt.data.data.data){
			let einfo = evt.data.data.data.einfo;
			if(einfo){
				if (this._scrollList){
					this._scrollList.dispose();
					this._scrollList = null;
				}
				
				this.einList=einfo;
				if(this.einList.length>0)
				{
						AcBattileGroundVisitViewTab1.AtkaceType=1;
						if(AcBattileGroundVisitViewTab1.AtkaceType ==1)
						{
							this.showList();
						}
				}
				else
				{
					this.shownoDataTxt();
				}
			}
		}
	}

	// public useCallback(data:any):void
	// {	

	// 	if (this._scrollList)
	// 	{
	// 		this._scrollList.dispose();
	// 		this._scrollList = null;
	// 	}

	// 	if(data.data.ret)
	// 	{
	// 		if(data.data.data.data.atkrace.einfo)
	// 		{
	// 			this.einList=data.data.data.data.atkrace.einfo;
			
	// 			if(this.einList.length>0)
	// 			{
	// 					AcBattileGroundVisitViewTab1.AtkaceType=1;
	// 					if(AcBattileGroundVisitViewTab1.AtkaceType ==1)
	// 					{
	// 						this.showList();
	// 					}
	// 			}
	// 			else
	// 			{
	// 				this.shownoDataTxt();
	// 			}
	// 		}
			
	// 	}
	// 	else 
	// 	{	
	// 		this.shownoDataTxt();
	// 	}	
	// }

	private shownoDataTxt():void
	{
		//没有仇人消息
		let noDataTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_WHITE);
		noDataTxt.text =LanguageManager.getlocal("atkracedes2");
		noDataTxt.x =  220;//rankImg.x+60
		if(PlatformManager.checkIsEnLang()){
			noDataTxt.x = 570 / 2 - noDataTxt.width / 2;
		}
		noDataTxt.y = 300;//rankImg.y+10;
		this.addChild(noDataTxt);
	}

    public showList():void
    {
		let rect = egret.Rectangle.create();
		rect.setTo(0, 0, 520, 580);
		this._scrollList = ComponentManager.getScrollList(AcBattileGroundVisitTab2Item, this.einList, rect, this.code);
		this.addChild(this._scrollList);
		// this._scrollList.setPosition(50, 65);
		this._scrollList.setPosition(GameConfig.stageWidth/2 - this._scrollList.width/2 -5 , 85); 
    }

    public dispose():void
	{
		this.einList=[];
		this._bg=null;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_BATTLEGROUND_BATTLEEND,this.sendList,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ENERMY), this.freshlist, this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_REVENGE), this.challengeCallback, this);
		// App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESET_ATKRACE,this.battleCallback,this);
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_GETMODEL), this.useCallback, this);
		super.dispose();
		AcBattileGroundVisitViewTab1.AtkaceType=1;
		
   	}

}