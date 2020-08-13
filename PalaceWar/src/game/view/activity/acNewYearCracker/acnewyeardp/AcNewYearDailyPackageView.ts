/**
 * 每日礼包
 */
class AcNewYearDailyPackageView extends AcCommonView
{
    private _nodeContainer:BaseDisplayObjectContainer; 
	// private _activityTimerText: BaseTextField = null;
    private _activityDesText1: BaseTextField = null; 
    private _activityDesText2: BaseTextField = null; 
    private _chineseknot:BaseBitmap =null; 
	private gemTF:BaseTextField = null;
    
    private lastType:number=0; 
    private _topBg:BaseBitmap =null;
    private _topBg2:BaseBitmap =null;
 
    public static topBgHeight:number=0; 
    private curr_acNewYearVo:AcNewYearCrackerVo =null;
    private public_dot:BaseBitmap =null; 
    private _aid:string  =null;
    private _code:string =null;
    private _bottomBg:BaseBitmap =null;
    private _scrollList:ScrollList;
	private _newYearInfoVoList:Array<any>;
	private _index:number = 0;
	 
	private _cfgObj=null;
	private _dailyTask_arr:Array<any> =[];
 
	private _currDayNum:number=0;
	private _leftBtn:BaseButton =null;
	private  num=0;
	private _tadayNumTxt:BaseTextField =null; 
	private _tadayPackageTxt:BaseTextField =null;  

	
	
	public _bigArr:Array<any> =[];
	private _tadayTaskTxt:BaseTextField =null
	private _lastNumTxt:BaseTextField =null;
	private _afterTxt:BaseTextField =null;
	
	public static isStarBoo:boolean =false;
	public  btntype:number =0;
	private _lastNum:number=0;
	private _afterNum:number=0;
	private currNewDay:number=0; 
	// private rechargevie_effects =null;
	private big_package:BaseBitmap =null;  

    private task1Arr:any =[];
    private _progress:ProgressBar=null;
	private _buttonArr:Array<any>=null;

	private _goBtn2:BaseButton =null;
	private _collectflag:BaseBitmap =null;
	private _goBtn3:BaseButton =null;
	private _task1Txt:BaseTextField =null;
	private _packageredHot:BaseBitmap =null;
	private _redhotArr:Array<any> =[];
	private _envelopeghuan =null; 
	private gotoDay:number =0;
	private _bottomBg2:BaseBitmap =null;
	public static CURR_DAY:number=0;
    public xArr:Array<any> =[];
	public yArr:Array<any> =[];
    public constructor() {
		super();
	}
    /**
     * 使用的code 仅仅使用资源，cn
     */
   	public get nowCode():string
    { 
		return this.param.data.code; 
    }
	public initView():void
	{

	
    	App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GETRACKERTASKREWARDS),this.refreshUIInfo,this);
			 
        this._aid = this.param.data.aid;
        this._code = this.param.data.code;
		this._redhotArr =[];
		this.xArr =[];
		this.yArr =[];
		

        let curr_acNewYearVo = <AcNewYearCrackerVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid,this._code); 
        this.curr_acNewYearVo =curr_acNewYearVo;  
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer); 

		let taDaynum = curr_acNewYearVo.diffday;  
		AcNewYearDailyPackageView.CURR_DAY  =  taDaynum;
		if(taDaynum>7)
		{
			taDaynum =7;
		} 

		this.currNewDay = taDaynum; 
		this.num = taDaynum-1;   
		this.gotoDay = taDaynum;
		

        let topBg:BaseBitmap = BaseBitmap.create("newyeardpbg-"+this.nowCode);
        topBg.width =640; 
        topBg.height =233;   
        this.addChild(topBg);
        topBg.y = -15;
		this._nodeContainer.addChild(topBg);  

		//新春
		var index:number=1; 
		let currDay = curr_acNewYearVo.getCurDay();
		this._buttonArr = [];
		var envelopeghuan=null;
		for( index=1; index<8; index++)
		{	 
			let btncfg:any =  index;
			let leftBtn1 = ComponentManager.getButton(`accrackerenvelop${index}-${this._code}`,"",this.buClick ,this,[index]);        
			leftBtn1.x = index*110-60;
			leftBtn1.y=-4; 
			leftBtn1.setScale(0.9);
			leftBtn1.name = index+"";  
		
			if(index>currDay)
			{
				leftBtn1.setBtnBitMap("newyeardp_pig_"+this._code); 
			}

			if(index>=4)
			{	
				let num =index-4;
				leftBtn1.x =num*105+10;
				leftBtn1.y=103-10; 
			} 
	   
			if(index==currDay)
			{
				leftBtn1.setBtnBitMap("accrackertaskenvelopdown"+index+"-"+this._code);

				envelopeghuan = ComponentManager.getCustomMovieClip(`envelopeghuan${1}-`,10,50);
				envelopeghuan.blendMode = egret.BlendMode.ADD;;
				envelopeghuan.width = 104;
				envelopeghuan.height = 115;
				envelopeghuan.playWithTime(-1);
				envelopeghuan.name = 'ghuaneffect';
				envelopeghuan.x= leftBtn1.x-5;
				envelopeghuan.y= leftBtn1.y-18;  
				this._envelopeghuan = envelopeghuan; 
			   
			} 
			this.xArr.push(leftBtn1.x-5);
			this.yArr.push(leftBtn1.y-18); 
			this._nodeContainer.addChild(leftBtn1);  

			//红点
			let redhot:BaseBitmap = BaseBitmap.create("public_dot2");   
			redhot.x =leftBtn1.x+60;
			redhot.y =leftBtn1.y+10;
			redhot.visible = false; 
			this._nodeContainer.addChild(redhot); 
			this._redhotArr.push(redhot);

			let titlefontBg = BaseBitmap.create("accrackerbuildnamebg-"+this._code); 
			titlefontBg.x = leftBtn1.x;
			titlefontBg.y = leftBtn1.y+leftBtn1.height-titlefontBg.height/2-20;
			this._nodeContainer.addChild(titlefontBg);  

			//  top 初几
			let firstNumTxt = ComponentManager.getTextField(LanguageManager.getlocal("acnewdailyfirst-"+index),TextFieldConst.FONTSIZE_ACTIVITY_COMMON); 
			firstNumTxt.x= titlefontBg.x+titlefontBg.width/2 -firstNumTxt.width/2;
			firstNumTxt.y= titlefontBg.y+2; 
			this._nodeContainer.addChild(firstNumTxt);  
			this._buttonArr.push(leftBtn1);
		} 
		this._nodeContainer.addChild(envelopeghuan);  
		// this._nodeContainer.setChildIndex(envelopeghuan,10);	


		//功能文字描述
		let fontDesBg = BaseBitmap.create("newyearfontbg");
		fontDesBg.width = 366;
		fontDesBg.x =20; 
		fontDesBg.y = topBg.height-fontDesBg.height-23;//+topBg.height-fontDesBg.height;
		this._nodeContainer.addChild(fontDesBg);  

		let fontDesTxt = ComponentManager.getTextField(LanguageManager.getlocal("acnewyearDailyDes"),TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_QUALITY_ORANGE); 
		// fontDesTxt.x= fontDesBg.x+fontDesBg.width/2 -fontDesTxt.width/2;
		// fontDesTxt.y= fontDesBg.y+fontDesBg.height/2-fontDesBg.height/2; 
		this._nodeContainer.addChild(fontDesTxt);  
		this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,fontDesTxt,fontDesBg);

			 

        //最底部背景
        let bottomBg = BaseBitmap.create("public_9_bg22");
        bottomBg.width = 640;
        bottomBg.height = GameConfig.stageHeigth - topBg.height - topBg.y-this.container.y+10;
        bottomBg.x = 0; 
        bottomBg.y = topBg.height + topBg.y-4; 
        this._bottomBg = bottomBg;
		this._nodeContainer.addChild(bottomBg); 


		//按钮拉伸条
		let newdpbg = BaseBitmap.create("newdpbg");
		newdpbg.width=640; 
		newdpbg.x=0;
		newdpbg.y=bottomBg.y+61;  
        this._nodeContainer.addChild(newdpbg); 
		
        let bottomBg2 = BaseBitmap.create("newyearewardbg");
		bottomBg2.width=600;
		bottomBg2.height=210;
		bottomBg2.x= 20;
		bottomBg2.y=newdpbg.y+55; 
		this._bottomBg2 =bottomBg2;
        this._nodeContainer.addChild(bottomBg2); 

		let line = BaseBitmap.create("public_line1");
		line.x = 50;
		line.y = bottomBg2.y+bottomBg2.height+11;
	  	this._nodeContainer.addChild(line); 

        let bottomBg3 = BaseBitmap.create("public_9_bg43");
		bottomBg3.width=600;
		bottomBg3.height= bottomBg.height-bottomBg2.height-168;
		bottomBg3.x = 20;
		bottomBg3.y = bottomBg2.y+bottomBg2.height+25; 
        this._nodeContainer.addChild(bottomBg3);  

        this._cfgObj = Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_NEWYEARCRACKER,this._code);
		var  dailyTask_arr:Array<any>=this._cfgObj.dailyTask; 
	    this._dailyTask_arr =[];
		for(let key in dailyTask_arr)
		{ 
            this._dailyTask_arr.push(dailyTask_arr[key]);
		}
        	
		let leftBtn = ComponentManager.getButton("btn_leftpage","",null ,this);        
		leftBtn.x =  60;
		leftBtn.y = bottomBg.y+28; 
		leftBtn.addTouchTap(this.onClickHandler,this);
        leftBtn.setScale(0.78);
		this._leftBtn =leftBtn;
        this._nodeContainer.addChild(leftBtn); 


		//任务底
        let fontBg = BaseBitmap.create("newyearredbg");
		fontBg.x =bottomBg.width/2-fontBg.width/2; 
		fontBg.y =topBg.y+topBg.height+30;
		this._nodeContainer.addChild(fontBg);  

		//今日 文本 
		let tadayNumTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON);
		let num = this.curr_acNewYearVo.getCurDay();
		this._currDayNum = num;

		tadayNumTxt.text = LanguageManager.getlocal("acnewyeartitledes"+num+"-"+this._code);
		this._tadayNumTxt = tadayNumTxt;
		tadayNumTxt.x=fontBg.x-10;
		tadayNumTxt.y=fontBg.y+3; 
		this._nodeContainer.addChild(tadayNumTxt); 
		this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,tadayNumTxt,fontBg); 

        let rightBtn = ComponentManager.getButton("btn_leftpage","",null ,this);      
        rightBtn.setScale(-0.78);
		rightBtn.x = GameConfig.stageWidth-60;
        rightBtn.y =bottomBg.y+5+rightBtn.height+10;
		rightBtn.addTouchTap(this.onClickHandler,this);
	    this._nodeContainer.addChild(rightBtn);  
		  
        let arr =[];
		arr = this.getCurrDayData(this._currDayNum-1); 
	 	
		var data:any ={};
		data.currDay = this._currDayNum;
		data.code = this.param.data.code;

        let tmpRect =  new egret.Rectangle(0,0,591,bottomBg3.height-18);
		let scrollList = ComponentManager.getScrollList(DailyPackageScrollItem,arr,tmpRect,data);
		scrollList.y =bottomBg3.y+6;
		scrollList.x = 23;
		this._scrollList = scrollList;     
		this._nodeContainer.addChild(scrollList); 

		let paBg = BaseBitmap.create("forpeople_bottom");
		paBg.x = 520;
		paBg.y = 210;
		this.addChild(paBg);  

        //大箱子
		let big_package:BaseBitmap = BaseBitmap.create("newyeardp1_"+this._code);   
		big_package.x= 570;  
		big_package.y= 260;
		big_package.scaleX =0.9;
		big_package.scaleY =0.9;
		big_package.anchorOffsetX =big_package.width/2;
		big_package.anchorOffsetY =big_package.height/2; 
		big_package.addTouchTap(this.packageHandler,this);
		this.big_package = big_package;
		this.addChild(big_package);   

		//大箱子红点
		let packageredHot:BaseBitmap = BaseBitmap.create("public_dot2");   
		packageredHot.x=big_package.x+20;
		packageredHot.y= big_package.y-40;
		packageredHot.visible =false;
		this._packageredHot =packageredHot;
		this.addChild(packageredHot); 

		//点击查看
		let acnewyear_look:BaseBitmap = BaseBitmap.create("newyeardpfont_"+this._code);   
		acnewyear_look.x=paBg.x+8;
		acnewyear_look.y=paBg.y+paBg.height-acnewyear_look.width/2+10;
		if(PlatformManager.checkIsEnLang())
		{
			acnewyear_look.x = big_package.x - acnewyear_look.width / 2;
		}
		this.addChild(acnewyear_look);

		this.showDayNum();
		this.drawTask1();
		this.testingBigboxState();  
		//检测top红点
		this.checktopkRed();
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_NEWYEARCRACKER,this.freshList,this);  
	
    }

	private checktopkRed():void
	{ 
		for(var i:number =1; i<=this._redhotArr.length; i++)
		{
			var boo =this.curr_acNewYearVo.dayRed(i);
			this._redhotArr[i-1].visible = boo;  
		} 	 
	}

	private buClick(index:any):void
	{ 
		let currDay = this.curr_acNewYearVo.getCurDay();
		for(var i:number =1; i<=this._buttonArr.length;i++)
		{
			this._buttonArr[i-1].setBtnBitMap(`accrackerenvelop${i}-${this._code}`);  
			if(i>currDay)
			{
				this._buttonArr[i-1].setBtnBitMap("newyeardp_pig_"+this._code)
			}
		}  

		if(index <= currDay)
		{ 
			this._buttonArr[index-1].setBtnBitMap("accrackertaskenvelopdown"+index+"-"+this._code); 
			this.num =  index-1; 
			this.showDayNum();
			this.freshList();   
		}
		else
		{ 
			this.num =  index-1; 
			this.showDayNum();
			this.freshList();  
		} 
	}

	private restonClick(index:number):void
	{
		let currDay = this.curr_acNewYearVo.getCurDay();
		for(var i:number =1; i<=this._buttonArr.length;i++)
		{
			this._buttonArr[i-1].setBtnBitMap(`accrackerenvelop${i}-${this._code}`);  
			if(i>currDay)
			{
				this._buttonArr[i-1].setBtnBitMap("newyeardp_pig_"+this._code)
			}
		}  

		if(index <= currDay)
		{ 
			this._buttonArr[index-1].setBtnBitMap("accrackertaskenvelopdown"+index+"-"+this._code); 
			this.num =  index-1; 
			this.showDayNum(); 
		}
		 
	}
    private packageHandler():void
	{
		let tmpVo = <AcNewYearCrackerVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_NEWYEARCRACKER,this._code); 
		if(tmpVo.isStart==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		var data:any ={}; 
		data.reward = this._cfgObj.bigPrize;
		data.isShowBtnType = this.btntype;
		data.code =this._code;
		ViewController.getInstance().openView(ViewConst.POPUP.ACNEWYEARDAILYPOPUPVIEW,data);
	}

    private onClickHandler(event:egret.TouchEvent,params:any)
    {
		 
		let tmpVo = <AcNewYearVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_NEWYEARCRACKER,this._code); 
		if(tmpVo.isStart==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
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
		this.freshList(); 
		this.refreshTopbutton();
	} 

	private refreshTopbutton():void
	{
		let index = this._currDayNum;
		let currDay = this.curr_acNewYearVo.getCurDay();
		for(var i:number =1; i<=this._buttonArr.length;i++)
		{
			this._buttonArr[i-1].setBtnBitMap(`accrackerenvelop${i}-${this._code}`);  
			if(i>currDay)
			{
				this._buttonArr[i-1].setBtnBitMap("newyeardp_pig_"+this._code)
			}
		}   
		var currIndex=index+1;
		if(currIndex<=currDay)
		{
			this._buttonArr[index].setBtnBitMap("accrackertaskenvelopdown"+currIndex+"-"+this._code);
		} 
	}

	private refreshUIInfo(event):void
	{
		if(event.data.ret)
		{ 
			App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(event.data.data.data.rewards));
			
			// let taDaynum = this.curr_acNewYearVo.diffday;  
			// this.updateButton(taDaynum);
		}
	} 



	private drawTask1():void
	{ 
		 
		let small_package_bg:BaseBitmap = BaseBitmap.create("progress6_bg");   
		this._nodeContainer.addChild(small_package_bg); 
		small_package_bg.x = 39;//this._bottomBg2.x+20;
		small_package_bg.y = 365+30; //this._bottomBg2.y+this._bottomBg2.height/2-small_package_bg.height/2;
		
		//箱子
		let big_package:BaseBitmap = BaseBitmap.create("acnewyear_box");   
		big_package.x= small_package_bg.x+20; 
		big_package.y= small_package_bg.y+12; 
		big_package.scaleX =0.9;
		big_package.scaleY =0.9;
		big_package.addTouchTap(this.onPackageHandler,this);
		this._nodeContainer.addChild(big_package);


		// 完成七天什么
		let buyTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		buyTxt.text = LanguageManager.getlocal("acnewyearacdes");
		buyTxt.x = 40;// wordsBg.x+210;
		buyTxt.y = this._bottomBg2.y+10;
		this._nodeContainer.addChild(buyTxt);
		buyTxt.x = this._bottomBg2.x+this._bottomBg2.width/2-buyTxt.width/2;

		//礼包名字 
		let dayNum = this.curr_acNewYearVo.getCurDay();
		var str1 = LanguageManager.getlocal("acnewyeardpboxdes"+dayNum+"-"+this._code);
		this._tadayPackageTxt = ComponentManager.getTextField("",26,TextFieldConst.COLOR_WARN_RED);
		this._tadayPackageTxt.text =str1;
		this._tadayPackageTxt.x = 190;
		this._tadayPackageTxt.y = this._bottomBg2.y+68;  
		this._nodeContainer.addChild(this._tadayPackageTxt);

		var currTaskObj = this._bigArr[0]; 
		//任务1 
		let v = this.curr_acNewYearVo.getTaskV(currTaskObj.questType,this.currNewDay);
		let task1Txt = ComponentManager.getTextField(LanguageManager.getlocal("acNewYearDailyquestType"+currTaskObj.questType,[currTaskObj.value]),TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_BROWN);
		task1Txt.x = this._tadayPackageTxt.x;
		task1Txt.y = this._tadayPackageTxt.y+this._tadayPackageTxt.height+25-8;  
		this._nodeContainer.addChild(task1Txt);
		this._task1Txt = task1Txt;  

		var itemIcon = BaseBitmap.create("crackericon2-"+this._code); 
		itemIcon.x = 470;  
		itemIcon.y = 340+30; 
		this._nodeContainer.addChild(itemIcon);

		//道具—＋300
		this.gemTF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_WARN_GREEN2);
		this.gemTF.text = "+"+currTaskObj.specialReward;
		this.gemTF.x = itemIcon.x + itemIcon.width-10+5; //+ 5;
		this.gemTF.y = itemIcon.y+20-5;
		this._nodeContainer.addChild(this.gemTF);  
		
		//前往
		this._goBtn2 =  ComponentManager.getButton(ButtonConst.BTN_SMALL_RED,"taskGoBtn",this.collectHandler,this);
		this._goBtn2.x = 460;
		this._goBtn2.y = 495+30;
		this.addChild(this._goBtn2);
		
		//领取
		this._goBtn3 =  ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskCollect",this.collectHandler,this);
		this._goBtn3.x = this._goBtn2.x;
		this._goBtn3.y = this._goBtn2.y;
		this._goBtn3 .visible=false;
		this.addChild(this._goBtn3); 

		//任务进度条
		let progress = ComponentManager.getProgressBar("progress5","progress3_bg",410); 
		this._nodeContainer.addChild(progress);
		this._progress = progress; 
		this._progress.setPercentage(v/currTaskObj.value,LanguageManager.getlocal("acCarnivalProgressText",[v+"",currTaskObj.value+""]));
		progress.x =182;
		progress.y =455+30;  

		this.public_dot = BaseBitmap.create("public_dot2");
	 	this.public_dot.x =this._goBtn2.x+this._goBtn2.width-this.public_dot.width;///2-//this.public_dot.width/2;
		this.public_dot.y =this._goBtn2.y;
		this.public_dot.visible = false;
		this.addChild(this.public_dot); 
		  
		
		//	已领取 
		let collectflag = BaseBitmap.create("collectflag");
		collectflag.x = 470;
		collectflag.y = 485+30;
		collectflag.scaleX=0.6;
		collectflag.scaleY=0.6;
		this.addChild(collectflag);
		collectflag.visible =false;
		collectflag.touchEnabled =false;
		this._collectflag =collectflag;

		this.updateButton(dayNum);
		
	}

	private collectHandler(evt:egret.TouchEvent):void
	{
		let tmpVo = <AcNewYearCrackerVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_NEWYEARCRACKER,this._code); 
		if(tmpVo.isStart==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}     

		// var boo = tmpVo.dayRed(this.gotoDay)
		// if(this.gotoDay>tmpVo.getCurDay()&&boo==false)
		// {
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("acnewNoOpenDes"));
		// 	return;
		// }

		// if(this.gotoDay<tmpVo.getCurDay()&&boo==false)
		// {
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("acnewEndDes"));
		// 	return;
		// }  
		
		var currTaskObj = this._bigArr[0]; 
		let v = this.curr_acNewYearVo.getTaskV(currTaskObj.questType,this.gotoDay);
		let isget = this.curr_acNewYearVo.getIdflag(currTaskObj.questType,this.gotoDay);
		if(isget!=2&&v<currTaskObj.value)
		{	
			if(this.gotoDay>tmpVo.getCurDay())
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("acnewNoOpenDes"));
				return;
			}

			if(this.gotoDay<tmpVo.getCurDay() || tmpVo.checkIsInEndShowTime())
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("acnewEndDes"));
				return;
			} 

			if(currTaskObj.openType=="recharge")
			{
				ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
			}
		}
		else
		{
			if(isget==1)
			{
				App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GETRACKERTASKREWARDS),this.refreshUIInfo,this);
			 	NetManager.request(NetRequestConst.REQUST_ACTIVITY_GETRACKERTASKREWARDS,{"activeId":AcConst.AID_NEWYEARCRACKER+"-"+this._code,"questType":currTaskObj.questType+"","ftype":1,"diffday":this.gotoDay});
			}
			else
			{		
				if(this.gotoDay>tmpVo.getCurDay())
				{
					App.CommonUtil.showTip(LanguageManager.getlocal("acnewNoOpenDes"));
					return;
				}

				if(this.gotoDay<tmpVo.getCurDay() || tmpVo.checkIsInEndShowTime())
				{
					App.CommonUtil.showTip(LanguageManager.getlocal("acnewEndDes"));
					return;
				} 
				ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
			} 
		}  
	}
	
	private onPackageHandler(evt:egret.TouchEvent):void
	{
		let tmpVo = <AcNewYearVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_NEWYEARCRACKER,this._code); 
		if(tmpVo.isStart==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return
		}
		var currTaskObj = this._bigArr[0]; 
		var data:any ={};
		data.reward =currTaskObj.getReward; 
		data.isShowBtnType = 2; 
		data.code = this._code;
 		ViewController.getInstance().openView(ViewConst.POPUP.ACNEWYEARDAILYPOPUPVIEW,data);	 
	} 
	
	//充值任务 刷新
	private refreshdarwTask1():void
	{
		if(this._bigArr.length>=1)
		{
			var currTaskObj = this._bigArr[0]; 
			let v = this.curr_acNewYearVo.getTaskV(currTaskObj.questType,this.gotoDay);
			this._task1Txt.text  =	LanguageManager.getlocal("acNewYearDailyquestType"+currTaskObj.questType,[currTaskObj.value])
			this.gemTF.text ="+"+currTaskObj.specialReward;
			this._progress.setPercentage(v/currTaskObj.value,LanguageManager.getlocal("acCarnivalProgressText",[v+"",currTaskObj.value+""]));
			
			this._tadayNumTxt.text = LanguageManager.getlocal("acnewyeartitledes"+this.gotoDay+"-"+this._code); 	 
			this._tadayPackageTxt.text = LanguageManager.getlocal("acnewyeardpboxdes"+this.gotoDay+"-"+this._code);
		}   
	}

    private getCurrDayData(num:number=0):Array<any>
    {
		let arr =[];
		arr =this._dailyTask_arr[num];
		let newArr:Array<any> =[];
		this._bigArr =[];
		for(let key in arr)
		{	 
			if(arr[key].questType!="1003")
			{
				newArr.push(arr[key]);  
			}
			else
			{	 
				this._bigArr.push(arr[key]);
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

	///刷新数据数据
	private freshList():void
	{ 	 
		let tmpVo  = <AcNewYearCrackerVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_NEWYEARCRACKER,this._code);
		if(AcNewYearDailyPackageView.CURR_DAY!=tmpVo.getCurDay())
		{
			AcNewYearDailyPackageView.CURR_DAY = tmpVo.getCurDay();
			this.num+=1;    
			this.showDayNum();  
			if(this._envelopeghuan)
			{
				 this._envelopeghuan.x =this.xArr[this._currDayNum];
				 this._envelopeghuan.y =this.yArr[this._currDayNum];
			}
			this.restonClick(tmpVo.getCurDay());
			
		}


		let arr =[];  
		let newDay  = this.gotoDay;
		arr = this.getCurrDayData(this._currDayNum); 
		var data:any ={}; 
		data.currDay = newDay;
		data.code = this.param.data.code; 
		this._scrollList.refreshData(arr,data);   
		

		this.updateButton(newDay);   
		this.refreshdarwTask1(); 
		this.testingBigboxState(); 
		this.checktopkRed();
		this.refreshTopbutton();
	}

	//大大大宝箱红点状态
	private testingBigboxState():void
	{	
		let boo =this.curr_acNewYearVo.bigPrize;
		this._packageredHot.visible =false; 
		if(boo==false&&this.curr_acNewYearVo.bigBoxType==true)//或者条件达到
		{
			if(this.big_package)
			{
				this.big_package.setRes("newyeardp2_"+this._code);
				this._packageredHot.visible =true;
				this.btntype = 1;
				egret.Tween.get(this.big_package,{loop:true}).to({rotation:10},50).to({rotation:-10},100).to({rotation:10},100).to({rotation:0},50).wait(500);
			} 
		}
		else if(boo==true)
		{
			if(this.big_package)
			{ 
				this.big_package.setRes("newyeardp3_"+this._code);
				this.big_package.rotation= 0;
				this.btntype = 3;
				egret.Tween.removeTweens(this.big_package);
			} 
		}else
		{
			this.btntype = 2;
		}  
	}

    // private refreshList():void
	// {
	// 	let num = 0;
	// 	num = this._currDayNum+1;
	//  	let arr =[];  
	// 	arr = this.getCurrDayData(this._currDayNum); 
	// 	var data:any ={}; 
	// 	data.currDay = num;
	// 	data.code = this.param.data.code; 
	// 	this._scrollList.refreshData(arr,data); 

	// 	this._tadayNumTxt.text = LanguageManager.getlocal("acnewyeartitledes"+num+"-"+this._code); 	 
	// 	this._tadayPackageTxt.text = LanguageManager.getlocal("acnewyeardpboxdes"+num+"-"+this._code);
		 
	 
	// 	this.refreshdarwTask1();
	// 	this.updateButton(num);
	// }

	public updateButton(day:number):void
	{		
		if(this._goBtn2)
		{ 
			App.DisplayUtil.changeToNormal(this._goBtn2);
		} 
		if(this._goBtn3)
		{ 
			App.DisplayUtil.changeToNormal(this._goBtn3);
		}    
		if(this._collectflag)
		{ 
			App.DisplayUtil.changeToNormal(this._collectflag);
		}     

		this._collectflag.visible = false;
		this._goBtn3.visible=false;
		this._goBtn2.visible=false;

		var currTaskObj = this._bigArr[0];   
		this.public_dot.visible =false; 
		// 0不可领 1未领取 2已领取 
		var gobtnTypeNum = this.curr_acNewYearVo.getIdflag(currTaskObj.questType,day);  
		if(gobtnTypeNum==2)
		{	
			if(	this._collectflag)
			{
				this._collectflag.visible=true;
			}
			if(this._goBtn2)
			{
				this._goBtn2.visible =false;
			}

			if(this._goBtn3)
			{
				this._goBtn3.visible=false;
				this.public_dot.visible =false;
			}

			if(day!=this.curr_acNewYearVo.getCurDay())
			{
				App.DisplayUtil.changeToGray(this._collectflag); 
			}
		}
		else if(gobtnTypeNum==1)
		{	
			if(this._goBtn3)
			{
				this._goBtn3.visible=true;
				this.public_dot.visible =true; 
			}  
			if(this._goBtn2)
			{
				this._goBtn2.visible =false; 
			}
		} 
		else
		{
			this._collectflag.visible=false; 
			this._goBtn2.visible =true;  
		} 

		//不是当天 并且不是可以领取状态的时候置灰
		if(day!=this.curr_acNewYearVo.getCurDay()&&gobtnTypeNum!=1 || this.curr_acNewYearVo.checkIsInEndShowTime())
		{
			if(this._goBtn2)
			{ 
				App.DisplayUtil.changeToGray(this._goBtn2);
			} 
			if(this._goBtn3)
			{ 
				App.DisplayUtil.changeToGray(this._goBtn3);
			}    
		}
		else 
		{	
			if(this._goBtn2)
			{ 
				App.DisplayUtil.changeToNormal(this._goBtn2);
			} 
			if(this._goBtn3)
			{ 
				App.DisplayUtil.changeToNormal(this._goBtn3);
			}    
		} 


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
		this._currDayNum = this.num; 
		this.gotoDay = this.num+1; 
	}

    private  acEnd():void
	{
		if(this.curr_acNewYearVo.isStart==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
	}
	protected getTitleStr():string
	{
		return "acNewYearDailyPackageViewTitle-"+this.param.data.code;
	}  

    private goToRechargeHandler():void
    {
         ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    } 

	protected getRuleInfo() : string
	{
        return `acNewYearCrackerRule-` + this._code;
    } 

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"newyearewardbg",
			"newyearfontbg",
			"forpeople_bottom",
            "acnewyear_big_package", 
            "acnewyear_bottom", 
            "acnewyear_bottom2", 
            "acnewyear_bottom3", 
            "acnewyear_chineseknot_" + this.nowCode, 
            "acnewyear_box",  
            "acnewyear_chineseknot2_" + this.nowCode,  
            "acnewyear_look", 
            "acnewyear_small_package", 
            "newyeardpbg-" + this.nowCode, 
            "acnewyear_topbg2_" + this.nowCode,  
            "common_9_bg",  
			"progress5",
            "progress3",
            "progress3_bg",
            "servant_bottombg",
            "progress6_bg",
            "newyearredbg", 
            "common_titlebg",
			'newyeardpfont_'+this.nowCode,
            "newyeardp1_"+this.nowCode,
            "newyeardp2_"+this.nowCode,
            "newyeardp3_"+this.nowCode,
			"accrackerenvelop1-"+this.nowCode,
			"accrackerenvelop2-"+this.nowCode,
			"accrackerenvelop3-"+this.nowCode, 
			"accrackerenvelop4-"+this.nowCode,
			"accrackerenvelop5-"+this.nowCode,
			"accrackerenvelop6-"+this.nowCode,
			"accrackerenvelop7-"+this.nowCode,
			"accrackertaskenvelopdown1-"+this.nowCode,
			"accrackertaskenvelopdown2-"+this.nowCode,
			"accrackertaskenvelopdown3-"+this.nowCode,
			"accrackertaskenvelopdown4-"+this.nowCode,
			"accrackertaskenvelopdown5-"+this.nowCode,
			"accrackertaskenvelopdown6-"+this.nowCode,
			"accrackertaskenvelopdown7-"+this.nowCode, 
			"newyeardp_pig_"+this.nowCode,
			"newdpbg",
            
         ]);
	} 
	public dispose():void
	{

		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_NEWYEARCRACKER,this.freshList,this);  
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GETRACKERTASKREWARDS),this.refreshUIInfo,this);
		 
        this._nodeContainer = null; 
        this.lastType =0; 
        this._activityDesText1 =null;
        this._activityDesText2 =null;
        this._chineseknot =null;
        this._topBg =null;
        this._topBg2 =null;
		this.public_dot =null;
		this._tadayPackageTxt = null;
		this._currDayNum =0;
		this._redhotArr =  null;
		this._buttonArr =null; 
		this.gotoDay =0;
		AcNewYearDailyPackageView.CURR_DAY=0;
		this.xArr=null;
		this.yArr=null;
		
        super.dispose();
    }
}