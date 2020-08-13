// TypeScript file

class AcAnnualCelebration2020TaskScrollItem  extends ScrollListItem
{
 
	private _data:Config.AcCfg.AC2020TaskItemCfg=null;
	private _needTxt:BaseTextField =null;
	private _goBtn3:BaseButton =null;
	private taskId:number = 0;

	private itemData =null;
	private tempStr="";
	/**
    * 充值进度条
    */
    private _progress: ProgressBar = null;
	public constructor() 
	{
		super();
	}
	protected initItem(index:number,data:any,itemData:any)
    {	

		this._data = data;
		this.itemData  = itemData;
		this.taskId = data.id; 
		
		let wordsBg:BaseBitmap = BaseBitmap.create("newsingledaytab2bottombg-1");  
		// wordsBg.width = 600;
		
		this.addChild(wordsBg); 


		let posx = 15;
		let bottom2:BaseBitmap = BaseBitmap.create("activity_charge_red");  
		bottom2.y = 10;
		bottom2.x = 2+posx;
		this.addChild(bottom2);   


		let taskbg = BaseBitmap.create("destroysametaskbg"); 
		taskbg.x = wordsBg.width - taskbg.width - 3-posx;
		taskbg.y = 2;
		this.addChild(taskbg);  

		let tasks = this.cfg.task[this._data.type-1]
		let tasknum = Object.keys(tasks).length;
		if (data.type == 3)//登录
		{
			if (tasknum > this.vo.getAcContinueDays())
			{
				tasknum = this.vo.getAcContinueDays();
			}
		}
		let taskTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(`AcDestroySameTip6-1`, [String(this._data.id), `${tasknum}`]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, taskTxt2, taskbg, [0,4]);
		this.addChild(taskTxt2); 

		

		let rewarStr = "";//data.getReward; 
		if(data.specialGift1)
		{
			let newrewarStr = "1037_0_"+data.specialGift1+"_"+this.itemData.uicode; //+''+"|"+rewarStr;
			rewarStr =newrewarStr;
		}
		if(data.specialGift2)
		{
			let newrewarStr = "1038_0_"+data.specialGift2+"_"+this.itemData.uicode;
			if (rewarStr)
			{
				newrewarStr = newrewarStr+"|"+rewarStr;
			}
			rewarStr =newrewarStr;
		}
		this.tempStr = rewarStr;
		let rewardArr =  GameData.formatRewardItem(rewarStr);
		wordsBg.height = 250 + Math.floor((rewardArr.length-1)/5)*122; 

        for (var index = 0; index < rewardArr.length; index++) {
            let iconItem = GameData.getItemIcon(rewardArr[index],true); 
			iconItem.setPosition(12+posx + (index%5)*117, 65+Math.floor(index/5)*122);
            this.addChild(iconItem);
        }

		this._progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 422);
        this._progress.setPosition(wordsBg.x+posx + 15, wordsBg.y + wordsBg.height - this._progress.height - 25);
        this.addChild(this._progress);

		 
		//领取
		this._goBtn3 =  ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskCollect",this.collectHandler,this);
		this._goBtn3.x = 455+posx;
		this._goBtn3.y = this._progress.y+this._progress.height/2-this._goBtn3.height/2;  
		this.addChild(this._goBtn3); 
 
		//当前充值进度（0／1）
		let needTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		needTxt.width=bottom2.width;
		needTxt.x = bottom2.x+15;
		needTxt.y = bottom2.y+10;   
		this._needTxt =needTxt;
		this.addChild(needTxt);

		if(this._data.type==1)
		{
			this._needTxt.text =LanguageManager.getlocal("acWorshipChargePopupViewItemTitle-1",[this._data.value+""]);
		}
		else if(this._data.type==2)
		{
			this._needTxt.text =LanguageManager.getlocal("acMidAutumnTaksTitleType2",[this._data.value+""]);
		}
		else
		{
			this._needTxt.text =LanguageManager.getlocal("acSpringceleBrationquestType"+this._data.questType,[this._data.value+""]); 
		}


		this.update();  

	} 

	private refreshProgress() {
		var myRechargeNum = this.vo.getTaskNum(this.taskId,this._data.type);
        let percent = myRechargeNum / this._data.value;
		if (this._data.type == 1)
		{
			 this._progress.setText(LanguageManager.getlocal("acCarnivalProgressText", [myRechargeNum+"", String(this._data.value)]));
		}
		else
		{
			this._progress.setText(LanguageManager.getlocal("AcMazeViewTaskPlan", [myRechargeNum+"", String(this._data.value)]));
		}
       
        this._progress.setPercentage(percent);
    }

	private collectHandler(evt:egret.TouchEvent):void
	{ 
	   if(this.vo.isStart==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		
		if(this._data.value<=this.vo.getTaskNum(this.taskId,this._data.type))
		{   
			this.vo.tmpReward = this.tempStr;
			let pox = [this._data.type,this.taskId];
			NetManager.request(NetRequestConst.REQUST_ACTIVITY_ANNUALCELEBRATION2020GETTASK,{"activeId":this.itemData.aid+"-"+this.itemData.uicode,"pos":pox});
		}
		else
		{ 	
			if(!this.vo.isInActy())
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
				return;
			}
			// ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);

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

	public update():void
	{	
		if(!this.vo)
		{
			return;
		}  
		
		this.refreshProgress();
		var myRechargeNum = this.vo.getTaskNum(this.taskId,this._data.type);
		if(this.vo&&this.vo.getTaskFlag(this.taskId,this._data.type)==false)
		{
			if(this._goBtn3.visible==true)
			{
				this._goBtn3.visible=false;	 
				let collectflag = BaseBitmap.create("collectflag");
				collectflag.x = this._goBtn3.x;
				collectflag.y = this._goBtn3.y-30;
				collectflag.scaleX=0.7; 
				collectflag.scaleY=0.7;
				this.addChild(collectflag); 
			}
		}
		else
		{	
			this._goBtn3.setBtnBitMap(ButtonConst.BTN_SMALL_YELLOW);
			if(myRechargeNum>=this._data.value)
			{
				this._goBtn3.setText("taskCollect");
			}
			else
			{	
				if (this._data.type == 1)
				{
					this._goBtn3.setText("vipshopbtn");  
					this._goBtn3.setBtnBitMap(ButtonConst.BTN_SMALL_RED);
				}
				else if (this._data.type == 3)
				{
					App.DisplayUtil.changeToGray(this._goBtn3);
				}
				else
				{
					this._goBtn3.setText("taskGoBtn");  
					this._goBtn3.setBtnBitMap(ButtonConst.BTN_SMALL_RED);
				}


				
				if(!this.vo.isInActy())
				{
					App.DisplayUtil.changeToGray(this._goBtn3);  
				}
			}	
		}
	}

	private get vo():AcAnnualCelebration2020Vo
	{
		 let springCelebrateVo = <AcAnnualCelebration2020Vo>Api.acVoApi.getActivityVoByAidAndCode(this.itemData.aid,this.itemData.code); 
		 return  springCelebrateVo;
	} 

	private get cfg() : Config.AcCfg.AnnualCelebration2020Cfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.itemData.aid, this.itemData.code);
	}

	public getSpaceY():number
	{
		return 10;
	}
	
	public dispose():void
    {	
		this._progress = null;
		this._data =null;
		this._needTxt =null;
		this._goBtn3 =null;
		this.taskId =null;
		this.tempStr='';


		super.dispose();
	}
}