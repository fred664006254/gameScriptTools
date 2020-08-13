class AcNewYearViewTab2 extends CommonViewTab
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
	
	public static isStarBoo:boolean = false;
	public static showBtnStatus:number = 0;// 0-> 当前之前天  1->当前天 2->之后天
	public  btntype:number =0;
	private _lastNum:number=0;
	private _afterNum:number=0;
	private currNewDay:number=0;
	private _curr_acNewYearVo:AcNewYearVo =null;
	private rechargevie_effects:BaseBitmap =null;
	private big_package:BaseBitmap =null; 
	
	public constructor() 
	{
		super();
		this.initView();
	}
	protected initView():void
	{	

		let downTitleLine: BaseBitmap = BaseBitmap.create("acnewyear_middlebg"); 
		if(AcNewYearView.CODE == "10" || AcNewYearView.CODE == "11"){
			downTitleLine.setPosition(6,-299);  
		} else {
			downTitleLine.setPosition(6,-297);  
		}
		
		this.addChild(downTitleLine);
		 
	 	App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_NEWYEAR_ITEM,this.update,this);  
   		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD),this.refreshUIInfo,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_NEWYEAR_LIST,this.restList,this);  

		let curr_acNewYearVo = <AcNewYearVo>Api.acVoApi.getActivityVoByAidAndCode(AcNewYearView.AID);
		this._curr_acNewYearVo = curr_acNewYearVo;
        let taDaynum = curr_acNewYearVo.diffday;  
		if(taDaynum>7)
		{
			taDaynum =7;
		}

		this.currNewDay = taDaynum;
		NewYear2ScrollItem.TADAY = taDaynum;
		this.num= taDaynum-1;
		this.showDayNum();

		let bottomBg = BaseBitmap.create("public_9v_bg04");
		bottomBg.width=625;
		bottomBg.height=GameConfig.stageHeigth-470;
		bottomBg.x=5;
		bottomBg.y=-160;
		bottomBg.visible =false;
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
		this.rechargevie_effects.setPosition(555, -410); 	
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
		let taskTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		taskTxt.text =LanguageManager.getlocal("acNewYeartab2des_"+AcNewYearView.CODE);
		taskTxt.width=450;
		taskTxt.x =30; 
		this.addChild(taskTxt);

		//今日任务进度
		let tadayTaskTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		tadayTaskTxt.text =LanguageManager.getlocal("acNewYeartask_des",["0","0"]);
		tadayTaskTxt.width=400;
		tadayTaskTxt.x =taskTxt.x;
		tadayTaskTxt.y =-454;
		taskTxt.y = tadayTaskTxt.y+tadayTaskTxt.textHeight+5;	  
		this.addChild(tadayTaskTxt);
		this._tadayTaskTxt = tadayTaskTxt;

		let bottomBg = BaseBitmap.create("forpeople_bottom");
		bottomBg.x=500;
		bottomBg.y=-480;
		this.addChild(bottomBg);
		bottomBg.visible =false;

		this.showEff();

		//箱子
		let big_package:BaseBitmap = BaseBitmap.create("acnewyear_big_package");   
		big_package.x=bottomBg.x+5+big_package.width/2;
		big_package.y= -425;//bottomBg.y+big_package.height/2;;
		big_package.scaleX =0.9;
		big_package.scaleY =0.9;
		big_package.anchorOffsetX =big_package.width/2;
		big_package.anchorOffsetY =big_package.height/2; 
		big_package.addTouchTap(this.packageHandler,this);
		this.big_package = big_package;
		this.addChild(big_package);   
  
		//点击查看
		let acnewyear_look:BaseBitmap = BaseBitmap.create("acnewyear_look");   
		acnewyear_look.x= bottomBg.x;//+8;
		acnewyear_look.y= -415;//bottomBg.y+bottomBg.height-acnewyear_look.width/2+10;
		this.addChild(acnewyear_look);

		
		let leftBtn = ComponentManager.getButton("btn_leftpage","",this.eventCollectHandler ,this);        
		leftBtn.x = 60;
		leftBtn.scaleX = leftBtn.scaleY = 0.5;  
		leftBtn.y = -285; 
		leftBtn.addTouchTap(this.onClickHandler,this);
		this._leftBtn =leftBtn;
		this.addChild(leftBtn);


		this.public_dot2 =BaseBitmap.create("public_dot2");
		this.addChild(this.public_dot2);
		this.public_dot2.x = 571;//acnewyear_look.x+acnewyear_look.width-10;  
		this.public_dot2.y = -460;//acnewyear_look.y-75; 
		this.public_dot2.visible = false;

		//前天 文本 
		let lastTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		var num1:number= 0;
		if(this._currDayNum==0)
		{
			this._lastNum = 7;
			this._afterNum =2;
		}

		lastTxt.text =LanguageManager.getlocal("newayearDate"+this._lastNum);
		lastTxt.width=120;
		lastTxt.x=150;
		lastTxt.y=-280; 
		lastTxt.textAlign ="center";
		lastTxt.alpha=0.5;
		this._lastNumTxt = lastTxt;
		this.addChild(lastTxt);

	 
		//今日 文本 
		let tadayNumTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON);
		let num =this._currDayNum+1; 
		tadayNumTxt.text =LanguageManager.getlocal("newayearDate"+num);
		tadayNumTxt.width=120;
		tadayNumTxt.x=250;
		tadayNumTxt.y=lastTxt.y; 
		tadayNumTxt.textAlign ="center";
		this._tadayNumTxt = tadayNumTxt;
		this.addChild(tadayNumTxt);



		let afterTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		let num2=num+=1;
		afterTxt.text =LanguageManager.getlocal("newayearDate"+num2);
		afterTxt.width=120;
		afterTxt.x=350;
		afterTxt.y=tadayNumTxt.y; 
		afterTxt.textAlign ="center";
		afterTxt.alpha=0.5;
		this._afterTxt = afterTxt;
		this.addChild(afterTxt);

		let rightBtn = ComponentManager.getButton("btn_leftpage","",this.eventCollectHandler ,this);      
		rightBtn.x = GameConfig.stageWidth-60; 
		rightBtn.y = leftBtn.y;//15-currY;  
		rightBtn.addTouchTap(this.onClickHandler,this);
		rightBtn.scaleX = -0.5;
	    rightBtn.scaleY =0.5;
		this.addChild(rightBtn);

		this._cfgObj = Config.AcCfg.getCfgByActivityIdAndCode(AcNewYearView.AID,AcNewYearView.CODE);
		var  dailyTask_arr:Array<any>=this._cfgObj.itemListCfg.dailyTask;
 		
		this._dailyTask_arr =[];
		for(let key in dailyTask_arr)
		{	if(Number(key))
			{	
			 	this._dailyTask_arr.push(dailyTask_arr[key])
			}
		}
		 
		let arr =[];
		arr =this.getCurrDayData(this._currDayNum); 
		this._tadayTaskTxt.text = LanguageManager.getlocal("acNewYeartask_des",["0",arr.length+""]);
		
		let tmpRect =null;
		if(AcNewYearView.CODE == "10" || AcNewYearView.CODE == "11"){
			tmpRect =  new egret.Rectangle(0,0,606,this._bottomBg.height-60);
		} else {
			tmpRect =  new egret.Rectangle(0,0,600,this._bottomBg.height-60);
		}
		
		let scrollList = ComponentManager.getScrollList(NewYear2ScrollItem,arr,tmpRect);
		scrollList.y = -230;//this._bottomBg.y+10;
		scrollList.x = GameConfig.stageWidth/2 - scrollList.width/2;
		this._scrollList = scrollList;     
		this.addChild(scrollList);
	
		this.refreshList();
		this.update();
	}
	private refreshUIInfo():void
	{ 
		if(this._curr_acNewYearVo.taskinfo[this.currNewDay+""].dayFlag==2)
		{
			this.public_dot2.visible = false;
			this.removeEff();
		}
	}

	private refreshList():void
	{
		let tmpVo  = <AcNewYearVo>Api.acVoApi.getActivityVoByAidAndCode(AcNewYearView.AID,AcNewYearView.CODE); 
		let arr =[];
		
		if(this._currDayNum < this.currNewDay-1){
			AcNewYearViewTab2.showBtnStatus = 0;
		} else if(this._currDayNum == this.currNewDay-1){
			AcNewYearViewTab2.showBtnStatus = 1;
		} else {
			AcNewYearViewTab2.showBtnStatus = 2;
		}
		if(this._currDayNum==this.currNewDay-1)
		{
			AcNewYearViewTab2.isStarBoo= true;  
			if(tmpVo.taskinfo[this.currNewDay+""].dayFlag==1)
			{
				this.playEff();
				this.btntype=1; 
			} 
		}
		else
		{
			AcNewYearViewTab2.isStarBoo= false; 
			this.removeEff();
		} 
		
		arr =this.getCurrDayData(this._currDayNum);
		this._scrollList.refreshData(arr);
		let num =this._currDayNum+1;  

		this._lastNumTxt.text =LanguageManager.getlocal("newayearDate"+this._lastNum); 
		this._tadayNumTxt.text =LanguageManager.getlocal("newayearDate"+num); 	
		this._tadayTaskTxt.text = LanguageManager.getlocal("acNewYeartask_des",[tmpVo.getTaskLength()+"",arr.length+""]);
		this._afterTxt.text  =LanguageManager.getlocal("newayearDate"+this._afterNum); 
	
	}
	private packageHandler():void
	{
		let tmpVo = <AcNewYearVo>Api.acVoApi.getActivityVoByAidAndCode(AcNewYearView.AID,AcNewYearView.CODE); 
		if(tmpVo.isStart==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		var data:any ={};
		if(this._bigArr.length>1)
		{
			data.reward =this._bigArr[0].reward;
		} 
		data.isShowBtnType =this.btntype;
		ViewController.getInstance().openView(ViewConst.POPUP.ACNEWYEARPOPUPVIEW,data);
	}

	 private onClickHandler(event:egret.TouchEvent,params:any)
    {
		let tmpVo = <AcNewYearVo>Api.acVoApi.getActivityVoByAidAndCode(AcNewYearView.AID,AcNewYearView.CODE); 
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
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_NEWYEAR_REDHOT);
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
		NewYear2ScrollItem.TADAY = this.num+1;
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
		 let tmpVo  = <AcNewYearVo>Api.acVoApi.getActivityVoByAidAndCode(AcNewYearView.AID,AcNewYearView.CODE); 
		 if(tmpVo.getTaskLength())
		 {	
			 var arr =this.getCurrDayData(this._currDayNum);
			 this._tadayTaskTxt.text = LanguageManager.getlocal("acNewYeartask_des",[tmpVo.getTaskLength()+"",arr.length+""]);
			
			 
			if(this._curr_acNewYearVo.taskinfo[this.currNewDay+""].dayFlag==1)
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
				if(PlatformManager.checkHideIconByIP()){
					if(arr[key].openType && arr[key].openType == "recharge" && arr[key].questType !="1002"){
						 
					} else{
						newArr.push(arr[key]); 
					}
				} else {
					newArr.push(arr[key]);  
				}
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
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_NEWYEAR_ITEM,this.update,this);  
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD),this.refreshUIInfo,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_NEWYEAR_LIST,this.restList,this);  

		this._scrollList = null;
		this._newYearInfoVoList = null;
		this._index = 0;
		AcNewYearViewTab2.isStarBoo= false;
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