class AcCourierViewTab2 extends AcCommonViewTab
{
	//滑动列表
	private _scrollList:ScrollList;
	private _newYearInfoVoList:Array<any>;
	private _index:number = 0;
	 
	private _bottomBg:BaseBitmap =null; 
	private _cfgObj=null;
	private _dailyTask_arr:Array<any> =[];
 
	private _currDayNum:number=0;
	private _leftBtn:BaseButton =null;
	private  num=0;
	private _tadayNumTxt:BaseTextField =null;
	private  public_dot2:BaseBitmap =null; 
	
	public _bigArr:Array<any> =[];
	private _tadayTaskTxt:BaseTextField =null
	private _lastNumTxt:BaseTextField =null;
	private _afterTxt:BaseTextField =null;
	
	public static isStarBoo:boolean =false;
	public  btntype:number =0;
	private _lastNum:number=0;
	private _afterNum:number=0;
	private currNewDay:number=0;
	private _curr_AcCourierVo:AcCourierVo =null;
	private rechargevie_effects:BaseBitmap =null;
	private big_package:BaseBitmap =null; 
	
	public constructor(param?) 
	{
		super();
		this.param = param;
		egret.callLater(this.initView,this);
	}

	 /**
     * 使用的code 仅仅使用资源，cn
     */
   	public get nowCode():string
    {
        if(this.code == "6")
        {
            return "4";
        }
        else
        {
            return this.code;
        }
    }
	protected initView():void
	{
		 
	 	App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_COURIER_ITEM,this.update,this);  
   		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCOURIERREWARD),this.refreshUIInfo,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_COURIER_LIST,this.restList,this);  

		let curr_AcCourierVo = <AcCourierVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_COURIER,this.code);
		this._curr_AcCourierVo = curr_AcCourierVo;
        let taDaynum = curr_AcCourierVo.diffday;  
		if(taDaynum>7)
		{
			taDaynum =7;
		}

		this.currNewDay = taDaynum;
		Courier2ScrollItem.TADAY = taDaynum;
		this.num= taDaynum-1;
		this.showDayNum();

		let bottomBg = BaseBitmap.create("public_9_bg43");
		bottomBg.width=625;
		bottomBg.height=GameConfig.stageHeigth-470;
		bottomBg.x=5;
		bottomBg.y=-160;
		this._bottomBg= bottomBg;
		this.addChild(bottomBg);

		this.showBtn();  
	}

	private showEff():void
	{
		this.rechargevie_effects = BaseBitmap.create("rechargevie_effects");
		this.addChild(this.rechargevie_effects);
		this.rechargevie_effects.anchorOffsetX =this.rechargevie_effects.width/2;
		this.rechargevie_effects.anchorOffsetY =this.rechargevie_effects.height/2;
		this.rechargevie_effects.setPosition(555, -370); 	
		this.rechargevie_effects.visible =false;
	}

	private restList():void
	{
		this.refreshList();
	}

	private removeEff():void
	{
		if(this.rechargevie_effects)
		{
			egret.Tween.removeTweens(this.rechargevie_effects);
			this.rechargevie_effects.visible = false;
		}

		if(this.big_package)
		{ 
			this.big_package.rotation= 0;
			egret.Tween.removeTweens(this.big_package);
		}
		this.public_dot2.visible = false; 
	}
	
	private showBtn():void
	{
		let currY = 235;
		
		//描述
		let taskTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_WHITE);
		taskTxt.text =LanguageManager.getlocal("acCouriertab2des_"+this.nowCode);
		taskTxt.width=400;
		taskTxt.x =40;
		taskTxt.lineSpacing = 5;
		if(PlatformManager.checkIsEnLang()){
			taskTxt.y = -415;	
		} else {
			taskTxt.y = -400;	
		}
		  
		this.addChild(taskTxt);

		//今日任务进度
		let tadayTaskTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_WARN_GREEN);
		tadayTaskTxt.text =LanguageManager.getlocal("acNewYeartask_des_" + this.nowCode,["0","0"]);
		tadayTaskTxt.width=400;
		tadayTaskTxt.x = this.nowCode == '5' ? 105 : taskTxt.x;
		tadayTaskTxt.lineSpacing = 5;
		if(PlatformManager.checkIsEnLang()){
			tadayTaskTxt.y =taskTxt.y+75;
		} else {
			tadayTaskTxt.y = this.nowCode == '5' ? -335 : (taskTxt.y+60);
		}
		
		this.addChild(tadayTaskTxt);
		this._tadayTaskTxt = tadayTaskTxt;

		let bottomBg = BaseBitmap.create("forpeople_bottom");
		bottomBg.x=500;
		bottomBg.y=-420;
		this.addChild(bottomBg);

		this.showEff();

		//箱子
		let big_package:BaseBitmap = BaseBitmap.create("acnewyear_big_package");   
		big_package.x=bottomBg.x+5+big_package.width/2;
		big_package.y=bottomBg.y+big_package.height/2;;
		big_package.scaleX =0.9;
		big_package.scaleY =0.9;
		big_package.anchorOffsetX =big_package.width/2;
		big_package.anchorOffsetY =big_package.height/2; 
		big_package.addTouchTap(this.packageHandler,this);
		this.big_package = big_package;
		this.addChild(big_package);   
  
		//点击查看
		let acnewyear_look:BaseBitmap = BaseBitmap.create("acnewyear_look");   
		acnewyear_look.x=bottomBg.x+8;
		acnewyear_look.y=bottomBg.y+bottomBg.height-acnewyear_look.width/2+10;
		this.addChild(acnewyear_look);

		
		let leftBtn = ComponentManager.getButton("btn_leftpage","",this.eventCollectHandler ,this);        
		leftBtn.x = 60;
		leftBtn.y = 15-currY; 
		leftBtn.addTouchTap(this.onClickHandler,this);
		this._leftBtn =leftBtn;
		this.addChild(leftBtn);

	


		this.public_dot2 =BaseBitmap.create("public_dot2");
		this.addChild(this.public_dot2);
		this.public_dot2.x =acnewyear_look.x+acnewyear_look.width-20;  
		this.public_dot2.y =acnewyear_look.y-50; 
		this.public_dot2.visible = false;

		//前天 文本 
		let lastTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		var num1:number= 0;
		if(this._currDayNum==0)
		{
			this._lastNum = 7;
			this._afterNum =2;
		}

		lastTxt.text =LanguageManager.getlocal("newayearDate"+this._lastNum);
		lastTxt.width=120;
		lastTxt.x=150;
		lastTxt.y=-200; 
		lastTxt.textAlign ="center";
		lastTxt.alpha=0.5;
		this._lastNumTxt = lastTxt;
		this.addChild(lastTxt);

	 
		//今日 文本 
		let tadayNumTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_BROWN);
		let num =this._currDayNum+1; 
		tadayNumTxt.text =LanguageManager.getlocal("newayearDate"+num);
		tadayNumTxt.width=120;
		tadayNumTxt.x=250;
		tadayNumTxt.y=-200; 
		tadayNumTxt.textAlign ="center";
		this._tadayNumTxt = tadayNumTxt;
		this.addChild(tadayNumTxt);



		let afterTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		let num2=num+=1;
		afterTxt.text =LanguageManager.getlocal("newayearDate"+num2);
		afterTxt.width=120;
		afterTxt.x=350;
		afterTxt.y=-200; 
		afterTxt.textAlign ="center";
		afterTxt.alpha=0.5;
		this._afterTxt = afterTxt;
		this.addChild(afterTxt);



		let rightBtn = ComponentManager.getButton("btn_leftpage","",this.eventCollectHandler ,this);      
		rightBtn.scaleX =-1;  
		rightBtn.x = GameConfig.stageWidth-60;
		rightBtn.y = 15-currY; 
		rightBtn.addTouchTap(this.onClickHandler,this);
		this.addChild(rightBtn);

		this._cfgObj = Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_COURIER,this.code);
		var  dailyTask_arr:Array<any>=this._cfgObj.itemListCfg.stageDailyTask;
 		
		this._dailyTask_arr =[];
		for(let key in dailyTask_arr)
		{	if(Number(key))
			{	
			 	this._dailyTask_arr.push(dailyTask_arr[key])
			}
		}
		 
		let arr =[];
		arr =this.getCurrDayData(this._currDayNum); 
		this._tadayTaskTxt.text = LanguageManager.getlocal("acNewYeartask_des_" + this.nowCode,["0",arr.length+""]);

		let tmpRect =  new egret.Rectangle(0,0,GameConfig.stageWidth,this._bottomBg.height-20);
		let scrollList = ComponentManager.getScrollList(Courier2ScrollItem,arr,tmpRect,this.code);
		scrollList.y =this._bottomBg.y+10;
		scrollList.x = 15;
		this._scrollList = scrollList;     
		this.addChild(scrollList);
	
		this.refreshList();
		this.update();
	}
	private refreshUIInfo():void
	{ 
		if(this._curr_AcCourierVo.taskinfo.dayFlag==2)
		{
			this.public_dot2.visible = false;
			this.removeEff();
		}
	}

	private refreshList():void
	{
		let tmpVo  = <AcCourierVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_COURIER,this.code); 
		let arr =[];
		
		if(this._currDayNum==this.currNewDay-1)
		{
			AcCourierViewTab2.isStarBoo= true;  
			if(tmpVo.taskinfo.dayFlag==1)
			{
				this.playEff();
				this.btntype=1; 
			} 
		}
		else
		{
			AcCourierViewTab2.isStarBoo= false; 
			this.removeEff();
		} 
		
		arr =this.getCurrDayData(this._currDayNum);
		this._scrollList.refreshData(arr,this.code);
		let num =this._currDayNum+1;  

		this._lastNumTxt.text =LanguageManager.getlocal("newayearDate"+this._lastNum); 
		this._tadayNumTxt.text =LanguageManager.getlocal("newayearDate"+num); 	
		this._tadayTaskTxt.text = LanguageManager.getlocal("acNewYeartask_des_" + this.nowCode,[tmpVo.getTaskLength()+"",arr.length+""]);
		this._afterTxt.text  =LanguageManager.getlocal("newayearDate"+this._afterNum); 
	
	}
	private packageHandler():void
	{
		let tmpVo = <AcCourierVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_COURIER,this.code); 
		if(tmpVo.isStart==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		var data:any ={};
		if(this._bigArr.length>1)
		{
			data.reward =this._bigArr[0].getReward;
		} 
		data.isShowBtnType =this.btntype;
		data.code =this.code;
		ViewController.getInstance().openView(ViewConst.POPUP.ACCOURIERPOPUPVIEW,data);
	}

	 private onClickHandler(event:egret.TouchEvent,params:any)
    {
		let tmpVo = <AcCourierVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_COURIER,this.code); 
		if(tmpVo.isStart==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return
		}
		if(event.currentTarget ==this._leftBtn)
		{
		  	this.num-=1;
		}
		else
		{
			this.num+=1; 
		}
		this.showDayNum();
		this.refreshList(); 
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_COURIER_REDHOT);
	} 
 
	private showDayNum():void
	{
		if(this.num<0)
		{
			this.num=7+this.num;
		}
		if(this.num>6)
		{
			this.num=7-this.num;
		}
		this._currDayNum =this.num;
		this._lastNum =this.num;

		this._afterNum =this.num+2; 
		if(this.num==0)
		{
			this._lastNum =7;
			this._afterNum =2;
		}
		if(this._afterNum>7)
		{
			this._afterNum=1;
		} 
		Courier2ScrollItem.TADAY = this.num+1;
	}

	private showHotRed():void
	{
		this.playEff(); 
	}

	private playEff():void
	{
		if(this.rechargevie_effects)
		{
			this.rechargevie_effects.visible =true;
			egret.Tween.get(this.rechargevie_effects,{loop:true}).to({rotation:	this.rechargevie_effects.rotation+360},10000);
		} 

		if(this.big_package)
		{
			egret.Tween.get(this.big_package,{loop:true}).to({rotation:10},50).to({rotation:-10},100).to({rotation:10},100).to({rotation:0},50).wait(500);
		}	 

		this.public_dot2.visible = true; 
	}

	private update():void
	{
		 let tmpVo  = <AcCourierVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_COURIER,this.code); 
		 if(tmpVo.getTaskLength())
		 {	
			 var arr =this.getCurrDayData(this._currDayNum);
			 this._tadayTaskTxt.text = LanguageManager.getlocal("acNewYeartask_des_" + this.nowCode,[tmpVo.getTaskLength()+"",arr.length+""]);
			
			 
			if(this._curr_AcCourierVo.taskinfo.dayFlag==1)
			{
				this.showHotRed();
				this.btntype=1; 
			}  
			else 
			{	
				this.btntype=0; 
			}
		 }

		 if(tmpVo.diffday!= this.currNewDay)
		 {
			  this.currNewDay = tmpVo.diffday;
			  if(tmpVo.diffday>7)
			  {
				  this.currNewDay=7; 
			  }
			  else 
			  {
				this.num+=1;   
			  } 
			  this.showDayNum();
			  this.refreshList(); 
		 }	
	}
	private eventCollectHandler():void{

	}
 
	private getCurrDayData(num:number=0):Array<any>
	{
		let arr =[];
		arr =this._dailyTask_arr[num];
		let newArr:Array<any> =[];
		for(let key in arr)
		{	 
			if(arr[key].sortId)
			{
				newArr.push({
					day : num + 1,
					getReward: arr[key].getReward,
					getScore: arr[key].getScore,
					openType: arr[key].openType,
					questType: arr[key].questType,
					sortId: arr[key].sortId,
					value: arr[key].value
				});  
			}
			else
			{	 
				this._bigArr.push(arr[key])
			} 
		} 

		newArr.sort(function(a: any,b: any):number
        {
            if(a.sortId > b.sortId) return 1;
            else if(a.sortId == b.sortId) return 0;
            return -1;
        });
		return newArr;
	}
	
	// 页签类型
	protected getSheepType():number
	{
		return 2;
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_COURIER_ITEM,this.update,this);  
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCOURIERREWARD),this.refreshUIInfo,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_COURIER_LIST,this.restList,this);  

		this._scrollList = null;
		this._newYearInfoVoList = null;
		this._index = 0;
		AcCourierViewTab2.isStarBoo= false;
		this.btntype =0;
		this._lastNum=0;
		this._afterNum =0;
		this._tadayTaskTxt=null;
		this._lastNumTxt =null;
		this._afterTxt= null; 
		this.currNewDay =0;
		
		super.dispose();
	}
}