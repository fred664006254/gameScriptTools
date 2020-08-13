
class StrengthenScrollItem extends ScrollListItem {
 
	private cfgArr:Array<any> =  [
		// ["challenge","manage","affair"],
		["challenge"],
		["search","wife"],
		["servant","bookroom","studyatk"]];
		// wife红颜
		// search//寻访
		// servant//门客
		// bookroom//太学
		// affair//公务
		// studyatk//演武场
		// challenge//关卡 
	private _collectBtnArr:Array<BaseButton> =[];
	private _redHot:BaseBitmap =null;
	private _redHotArr:Array<BaseBitmap> =[];


	public constructor() 
	{
		super();
	}

	protected initItem(index:number,data: any) 
	{	        

		this._collectBtnArr =[];
		this.width = 517;
		this.height = 241; 
		let bg:BaseBitmap =BaseLoadBitmap.create("strengthen_"+data);
		this.addChild(bg);
		var self = this;
		
		for(let i:number =0;i < this.cfgArr[index].length;i++)
		{	
			let str =this.cfgArr[index][i];
			let buttonName = LanguageManager.getlocal(""+this.cfgArr[index][i]);
			

			var collectBtn ;
			if(PlatformManager.checkIsViSp())
			{
				collectBtn= ComponentManager.getButton("strengthen_button","",self.eventCollectHandler,self,null,null,TextFieldConst.FONTSIZE_CONTENT_SMALL);        
			}else{
				collectBtn= ComponentManager.getButton("strengthen_button","",self.eventCollectHandler,self);        
			}
			
			this.addChild(collectBtn); 
			collectBtn.x = 390;
			collectBtn.y = 	bg.y+50*i+80; 
			collectBtn.setText(buttonName,false);
			collectBtn.setColor(TextFieldConst.COLOR_BROWN);
			collectBtn.name = this.cfgArr[index][i];
			collectBtn.addTouchTap(this.touchCollectHandler,this); 

			let redHot:BaseBitmap = BaseBitmap.create("public_dot2");
			this.addChild(redHot);
			this._redHot = redHot;
			this._redHot.x = collectBtn.x+collectBtn.width-18;
			this._redHot.y =collectBtn.y -10; 
			this._redHot.visible =false; 
			this._redHotArr.push(this._redHot);
			this._collectBtnArr.push(collectBtn); 
			
		}    
		this.refreshButtonType();
	}
	private refreshButtonType():void
	{
		for(let i:number =0;i < this._collectBtnArr.length;i++)
		{
			if(this._collectBtnArr[i]&&this._collectBtnArr[i].name)
			{
				let openType = this._collectBtnArr[i].name;
				if(openType=="servant")
				{
					if([openType+"VoApi"]&&Api[openType+"VoApi"].checkRedPoint())
					{   
						this._redHotArr[i].visible =true;
					}
				} 
				else if(openType=="affair")
				{
					if (Api.manageVoApi.getCurAffairNums() > 0)
					{
						this._redHotArr[i].visible =true;
					} 
				}
				else if(openType=="bookroom")  //太学 门客不需要解锁
				{
					if(Api[openType+"VoApi"]&&Api[openType+"VoApi"].checkNpcMessage())
					{
						this._redHotArr[i].visible =true;
					}
				}
				else if(Api[openType+"VoApi"]&&Api[openType+"VoApi"].isShowNpc)
				{
					let isShowNpc:boolean=Api[openType+"VoApi"].isShowNpc(); 
					if(isShowNpc&&Api[openType+"VoApi"]&&Api[openType+"VoApi"].checkNpcMessage())
					{
					 
						this._redHotArr[i].visible =true;
						// App.CommonUtil.addIconToBDOC(this._collectBtnArr[i])
					}
					else 
					{
						this._redHotArr[i].visible =false; 
						// App.CommonUtil.removeIconFromBDOC(this._collectBtnArr[i])
					}
				}  
			}
		}
	}

	public touchCollectHandler(event:egret.TouchEvent):void
	{   
		let openType = event.currentTarget.name;
		let viewName = App.StringUtil.firstCharToUper(openType) ;
		if(openType == "level" || openType == "arrival" || openType == "")
		{ 
			PlayerBottomUI.getInstance().show();
		} 
		else
		{
			if(Api[openType+"VoApi"]&&Api[openType+"VoApi"].isShowNpc)
			{
				let isShowNpc:boolean=Api[openType+"VoApi"].isShowNpc();
				if(!isShowNpc)
				{
					let lockedStr:string=Api[openType+"VoApi"].getLockedString?Api[openType+"VoApi"].getLockedString() : LanguageManager.getlocal("dailyTask_" + openType +"Tip");
					App.CommonUtil.showTip(lockedStr ? lockedStr : LanguageManager.getlocal("sysWaitOpen") );
					return;
				} 
			}
			if(openType == "alliance")
			{
				Api.allianceVoApi.openMainView();
				return;
			}
			
			if(openType == "studyatk")
			{
				Api.studyatkVoApi.openMainView();
				return;
			}
			if (egret.getDefinitionByName(viewName + "View"))
			{
				ViewController.getInstance().openView(viewName+ "View"); 
				
			}else if (egret.getDefinitionByName(viewName + "PopupView"))
			{
				ViewController.getInstance().openView(viewName + "PopupView");
			}
			else
			{
				if(openType=="recharge")
				{
					ViewController.getInstance().openView(viewName+"Vip"+ "View");
				}
			}
			ViewController.getInstance().hideView(ViewConst.POPUP.STRENGTHENPOPUPVIEW);
		}  
	}
	public eventCollectHandler(event:egret.TouchEvent):void
	{   
	 
	}

    public dispose(): void 
	{
		this._collectBtnArr =[];
		this._redHotArr =[];
    }
}