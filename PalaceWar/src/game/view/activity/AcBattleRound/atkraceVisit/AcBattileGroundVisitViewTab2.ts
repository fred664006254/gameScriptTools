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

		this._bg= BaseBitmap.create("public_9_probiginnerbg");
		this._bg.width=516;
		this._bg.height=618;
		this._bg.x =25;
		this._bg.y =55;
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
			App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleGroundTip3-${view.getUiCode()}`));
            view.sendList();
        }
		//NetManager.request(NetRequestConst.REQUEST_ATKRACE_GETMODEL, {});
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

	  protected getUiCode() : string{
        let code = ``;
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }
	
	private sendList():void{
		NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ENERMY,{
			activeId : this.acTivityId
		});
	}

	private freshlist(evt : egret.Event):void{

		if (evt.data.ret == false)
        {
            return;
        }

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
		rect.setTo(0, 0, 640, 610);
		this._scrollList = ComponentManager.getScrollList(AcBattileGroundVisitTab2Item, this.einList, rect, this.code);
		this.addChild(this._scrollList);
		this._scrollList.setPosition(-35, 60);
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