/**
 * author : qianjun
 * date : 2018.4.14
 * desc : 劳动活动 任务itemrender
 */
class AcLaborDayTab3Item  extends ScrollListItem
{
 
	private _data=null; 
	private _goBtn2:BaseButton = null;
	private _goBtn3:BaseButton =null; 
	private _needTxt:BaseTextField =null;
	private _collectflag:BaseBitmap =null; 

	private _curIdx:number=0;

	public constructor() 
	{
		super();
	}

	private get cfg() : Config.AcCfg.LaborDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcLaborDayVo{
        return <AcLaborDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_LABORDAY;
    }

    private get code() : string{
        return this._code;
    }
	
	private _code : string = '';
	protected initItem(index:number,data:any,itemparam:any)
    {	
        let view = this;
        view._code = itemparam;
		view.width = 510;
		view.height = 170 + 10;
		this._data = data;
		this._curIdx = Number(data.taskId);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_LABORTASK),this.eventCollectHandlerCallBack,this);
		//App.MessageHelper.addEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this);  
		
		let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg14");  
		wordsBg.width  = view.width;
		wordsBg.height = 170; 
		this.addChild(wordsBg); 

		let bottom2:BaseBitmap = BaseBitmap.create("activity_charge_red");  
		// bottom2.width =170;
		this.addChild(bottom2);  

	 
		let taskTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		
		if(data.questType==1)
		{
			taskTxt.text =LanguageManager.getlocal("acSpringceleBrationLand1",[data.value+""]);
		}
		else if(data.questType==2)
		{
			taskTxt.text =LanguageManager.getlocal("acSpringceleBrationquestType2",[data.value+""]);
		}
		else
		{
			taskTxt.text =LanguageManager.getlocal("acSpringceleBrationquestType"+data.questType,[data.value+""]); 
		}
		
		taskTxt.width=bottom2.width;
		taskTxt.x = bottom2.x+20;
		taskTxt.y = bottom2.y+10; 
		this.addChild(taskTxt); 

		
		let str = `1005_0_${this.cfg.task[this._curIdx].shuipiaoGet}_${view._code}|` + data.getReward;
		let iconList: BaseDisplayObjectContainer[] = GameData.getRewardItemIcons(str,true);
		if (iconList&&iconList.length>0) {
			
			//额外赠送ICON
			let startX: number = 20;
			let startY: number = 65;
			let l: number = iconList.length;
			var _icon :BaseDisplayObjectContainer;
			for (let i: number = 0; i < l; i++) {
				let icon: BaseDisplayObjectContainer = iconList[i]; 
				icon.setScale(0.8);
				icon.setPosition(startX + i * (icon.width*icon.scaleX + 12), startY);
				this.addChild(icon); 
			}
		}
		//领取
		this._goBtn3 =  ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"taskGoBtn",this.collectHandler,this);
		this._goBtn3.x = 330;
		this._goBtn3.y = 80;  
		this.addChild(this._goBtn3); 

		//前往
		this._goBtn2 =  ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED,"taskGoBtn",this.collectHandler,this);
		this._goBtn2.x = 330;
		this._goBtn2.y = 80;
		this._goBtn2.visible =false;
		this.addChild(this._goBtn2);


		//当前进度（0／1）
		let needTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_BROWN);
		needTxt.text =LanguageManager.getlocal("springcelebrationNeedStr",[1+"",data.value+""]);
		needTxt.width= this._goBtn3.width;
		needTxt.x = this._goBtn3.x;
		needTxt.y = this._goBtn3.y-30;
		needTxt.textAlign = "center";
		this._needTxt =needTxt;
		this.addChild(needTxt); 

		if(data.questType==1)
		{	
			needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr",[1+"",data.value+""]); 
		}

		let collectflag = BaseBitmap.create("collectflag");
		collectflag.x = 355;
		collectflag.y = 50;
		collectflag.scaleX=0.7; 
		collectflag.scaleY=0.7;
		collectflag.visible =false;
		this.addChild(collectflag);  
		this._collectflag = collectflag;

		this.update();
	} 

	private collectHandler(evt:egret.TouchEvent):void
	{
		let vo = this.vo; 
		if(!vo)
		{
			return;
		}
		var  taskNum = vo.getTask(this._data.questType);
		// if(vo.isStart==false)
		// {
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
		// 	return;
		// }   
		if(this.vo.et < GameData.serverTime){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
		if(taskNum >= this._data.value)
		{	
			this.vo.lastidx = this._curIdx;
    		this.vo.lastpos = this._needTxt.localToGlobal(this._needTxt.width, 20);
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY_LABORTASK,{
				"activeId":this.acTivityId, 
				"taskId":""+this._data.key
			});
		} 
		else
		{	
			if(this._data.questType==2)
			{
				ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1);
				return; 
			}

			if(!this._data.openType)
			{
				return; 
			}

			let openType = this._data.openType;
			let viewName = App.StringUtil.firstCharToUper(openType) ;
			if(openType == "")
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
				if (egret.getDefinitionByName(viewName + "View"))
				{
					ViewController.getInstance().openView(viewName+ "View"); 
					
				}else if (egret.getDefinitionByName(viewName + "PopupView")) //可以跳转
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
			}  
		}   
	}

	protected eventCollectHandlerCallBack(event:egret.Event)
    {
		let rData = event.data.data.data;
		if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if (this.vo.lastidx != this._curIdx)
        {
            return;
        }
        this.vo.lastidx = null;
        this.update();
		let rewards = rData.rewards;
		let str = `1005_0_${this.cfg.task[this._curIdx].shuipiaoGet}_${this._code}|` + rewards;
        let rewardList =  GameData.formatRewardItem(str);
        let pos = this.vo.lastpos;
		App.CommonUtil.playRewardFlyAction(rewardList,pos);
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LABOR_FRESH_LIST);
    }

	public update():void
	{	
		let vo = this.vo; 
		if(!vo)
		{
			return;
		}	

		if(this._needTxt)
		{
			var taskNum = vo.getTask(this._data.questType);
			if(taskNum >= this._data.value)
			{
				this._needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr",[taskNum+"",this._data.value+""]); 
			}
			else
			{
				this._needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr2",[taskNum+"",this._data.value+""]); 
			}
		}
		

		if(this._goBtn3)
		{
			if(taskNum >= this._data.value)
			{	
				if(vo.isGetTaskReward(this._data.key))
				{
					this._goBtn3.visible = false;
					this._needTxt.visible = false;  
					this._collectflag.visible= true;
					this._goBtn2.visible=false;
				}
				else
				{	
					this._goBtn2.visible=false;
					this._goBtn3.visible =true;
					this._goBtn3.setText("realnamedes6");
					App.DisplayUtil.changeToNormal(this._goBtn3); 
				}
			}
			else
			{	
				if(this._data.questType==1)
				{	
					this._goBtn3.visible = true;
					this._goBtn3.setText("realnamedes6");
					this._goBtn3.setEnable(false);
				}
				else
				{
					// App.DisplayUtil.changeToNormal(this._goBtn2); 
					this._goBtn3.visible =false;
					this._goBtn2.visible=true; 
					// if(vo.isExchange()==true)
					// { 
					// 	App.DisplayUtil.changeToGray(this._goBtn2);
					// 	this._goBtn2.touchEnabled =false; 
					// }
				}
			} 
		}
		if(this._goBtn2){
			if(!vo.isInActivity()){
				this._goBtn2.setEnable(false);
			}
		}
	} 
   

	public getSpaceY():number
	{
		return 10;
	}
	
	public dispose():void
    {
		this._goBtn3 =null;
		this._collectflag=null;
		this._data =null; 
		this._goBtn2 = null;
		this._needTxt =null;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_LABORTASK),this.eventCollectHandlerCallBack,this);
		//App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this); 		
		super.dispose();
	}
}