class AcNewYearSevenDaysViewTab2 extends AcCommonViewTab
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
	private _rightBtn:BaseButton =null;
	private  num=0;
	private  public_dot2:BaseBitmap =null; 
	
	public _bigArr:Array<any> =[];
	private _tadayTaskTxt:BaseTextField =null
	// -1往前点 0当天 1往后点
	public static dayStatus:number=-1;
	public  btntype:number =0;
	private currNewDay:number=0;
	private rechargevie_effects:BaseBitmap =null;
	private big_package:BaseBitmap =null; 
	private _tabgroup : TabBarGroup = null;
	
	public constructor(data?) 
	{
        super();
        this.param = data;
		this.initView();
	}

	private get cfg() : Config.AcCfg.NewYearSevenDaysCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcNewYearSevenDaysVo{
        return <AcNewYearSevenDaysVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }
	 /**
     * 使用的code 仅仅使用资源，cn
     */
   	public get nowCode():string
    {
		let code = '';
        switch(Number(this.code)){
            default:
                code = this.code;
                break;
        }
        return code;
    }
	protected initView():void
	{
		this.width = GameConfig.stageWidth;
	 	App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_NEWYEAR_ITEM,this.update,this);  
   		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD),this.refreshUIInfo,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_NEWYEAR_LIST,this.restList,this);  
		
		let topdescbg = BaseBitmap.create(`newsingledaytab2bg-1`);
		topdescbg.height = AcNewYearSevenDaysView.topBgHeight;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topdescbg, this, [0,-2], true);
		this.addChild(topdescbg);

        let taDaynum = this.vo.diffday;  
		if(taDaynum>7)
		{
			taDaynum =7;
		}
		if(taDaynum<1)
		{
			taDaynum =1;
		}

		this.currNewDay = taDaynum;
		AcNewYearSevenDays2ScrollItem.TADAY = taDaynum;
		this.num= taDaynum-1;
		this.showDayNum();

		let bottomBg = BaseBitmap.create("public_9_bg43");
		bottomBg.width=620;
		bottomBg.height=AcNewYearSevenDaysView.topBgHeight;
		bottomBg.x=10;
		bottomBg.y=10;
		this._bottomBg= bottomBg;

		if (this.code == "2"){
			let bg = BaseBitmap.create("acnewyear7days_bg-"+this.code);
			bg.width = 620;
			bg.height = bottomBg.height - 28;
			bg.x = 10;
			bg.y = 10;
			this.addChild(bg);
		}

		this.showBtn();  
	}

	private showEff():void
	{
		this.rechargevie_effects = BaseBitmap.create("rechargevie_effects");
		this.addChild(this.rechargevie_effects);
		this.rechargevie_effects.anchorOffsetX =this.rechargevie_effects.width/2;
		this.rechargevie_effects.anchorOffsetY =this.rechargevie_effects.height/2;
		this.rechargevie_effects.setPosition(555, -120); 	
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
		let currY = 30;
		
		//描述
		let taskTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
		taskTxt.textAlign = egret.HorizontalAlign.LEFT;
		taskTxt.text =LanguageManager.getlocal("acNewYear7daystab2des-"+this.nowCode);
		taskTxt.x =40;
		taskTxt.lineSpacing = 10;
		taskTxt.y = -120-taskTxt.height;
		  
		this.addChild(taskTxt);

		//今日任务进度
		let tadayTaskTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_WARN_RED2);
		tadayTaskTxt.text =LanguageManager.getlocal("acNewYeartask_des_" + this.nowCode,["0","0"]);
		tadayTaskTxt.lineSpacing = 5;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tadayTaskTxt, taskTxt, [0,taskTxt.height+10]);
		
		this.addChild(tadayTaskTxt);
		this._tadayTaskTxt = tadayTaskTxt;

		let bottomBg = BaseBitmap.create("forpeople_bottom");
		bottomBg.x=500;
		bottomBg.y=-170;
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

		let tabBarTextArr = [];
		for(let i = 1; i <= 7; ++ i){
			tabBarTextArr.push(`newayearDate${i}`);
		}

		let tabbarH = 117;
		if (this.code == "2"){
			tabbarH = 130;
		}
		let tabbarGroup = ComponentManager.getTabBarGroup(`acnewyear7daystab-${this.nowCode}`,tabBarTextArr,this.clickTab,this,null,'',0,false,535,tabbarH);
		this.addChild(tabbarGroup);
		tabbarGroup.width = 535;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tabbarGroup, this, [0,5], true);
		for(let i = 1; i <= 7; ++ i){
			let tabbtn : BaseButton = tabbarGroup.getTabBar(i - 1);
			tabbtn.x = (i - 1) * 105;
			tabbtn.setTextSize(20);
			tabbtn.setText(`<font color=${TextFieldConst.COLOR_LIGHT_YELLOW}>${LanguageManager.getlocal(`newayearDate${i}`)}</font>`, false);
			tabbtn.setTextOffY(15);
			if (this.code == "2"){
				tabbtn.setTextOffY(53);
			}
		}
		this._tabgroup = tabbarGroup;

		this.public_dot2 =BaseBitmap.create("public_dot2");
		this.addChild(this.public_dot2);
		this.public_dot2.x =acnewyear_look.x+acnewyear_look.width-10;  
		this.public_dot2.y =acnewyear_look.y-75; 
		this.public_dot2.visible = false;
		
		if (this.code == "1"){
			let leftBtn = ComponentManager.getButton("btn_leftpage","",this.eventCollectHandler ,this);        
			leftBtn.x = 8;
			leftBtn.y = currY; 
			leftBtn.addTouchTap(this.onClickHandler,this);
			this._leftBtn =leftBtn;
			this.addChild(leftBtn);

			let rightBtn = ComponentManager.getButton("btn_leftpage","",this.eventCollectHandler ,this);      
			rightBtn.scaleX =-1;  
			rightBtn.x = GameConfig.stageWidth-10;
			rightBtn.y = currY ; 
			this._rightBtn = rightBtn;
			rightBtn.addTouchTap(this.onClickHandler,this);
			this.addChild(rightBtn);
		}
		else if (this.code == "2"){
			let leftBtn = ComponentManager.getButton("acnewyear7days_rightbtn-"+this.code,"",this.eventCollectHandler ,this);      
			leftBtn.scaleX = -1;  
			leftBtn.x = 6 + leftBtn.width;
			leftBtn.y = currY; 
			leftBtn.addTouchTap(this.onClickHandler,this);
			this._leftBtn =leftBtn;
			this.addChild(leftBtn);

			let rightBtn = ComponentManager.getButton("acnewyear7days_rightbtn-"+this.code,"",this.eventCollectHandler ,this);      
			rightBtn.x = GameConfig.stageWidth - 6 - rightBtn.width;
			rightBtn.y = currY ; 
			this._rightBtn = rightBtn;
			rightBtn.addTouchTap(this.onClickHandler,this);
			this.addChild(rightBtn);
		}

		this._cfgObj = Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_ACNEWYEAR7DAYS,this.code);
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
		this._tadayTaskTxt.text = LanguageManager.getlocal("acNewYeartask_des_" + this.nowCode,["0",arr.length+""]);

		let tmpRect =  new egret.Rectangle(0,0,627,this._bottomBg.height-125);
		if (this.code == "2"){
			tmpRect =  new egret.Rectangle(0,0,627,this._bottomBg.height-125 - 25);
		}
		let scrollList = ComponentManager.getScrollList(AcNewYearSevenDays2ScrollItem,arr,tmpRect,this.code);
		scrollList.y = 120;
		scrollList.x = 5;
		if (this.code == "2"){
			scrollList.y = 145;
		}
		this._scrollList = scrollList;     
		this.addChild(scrollList);
	
		this._tabgroup.selectedIndex = this.num;
		this.clickTab({index : this.num});
		this.update();
	}
	private refreshUIInfo():void
	{ 
		if(this.vo.taskinfo.dayFlag==2)
		{
			this.public_dot2.visible = false;
			this.removeEff();
		}
	}

	private refreshList():void
	{
		let tmpVo  = <AcNewYearSevenDaysVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACNEWYEAR7DAYS,this.code); 
		let arr =[];
		
		if(this._currDayNum==this.currNewDay-1)
		{
			AcNewYearSevenDaysViewTab2.dayStatus= 0;  
		}
		else
		{
			if(this._currDayNum<this.currNewDay-1)
			{
				//往前点
				AcNewYearSevenDaysViewTab2.dayStatus= -1; 
			}
			else
			{
				//往后点
				AcNewYearSevenDaysViewTab2.dayStatus= 1; 
			}
		} 

		if(tmpVo.taskinfo && tmpVo.taskinfo.dayFlag==1)
		{
			this.playEff();
			this.btntype=1; 
		} 
		else{
			this.removeEff();
		}
		
		arr =this.getCurrDayData(this._currDayNum);
		this._scrollList.refreshData(arr,this.code);
		let num =this._currDayNum+1;  
		this._tadayTaskTxt.text = LanguageManager.getlocal("acNewYeartask_des_" + this.nowCode,[tmpVo.getTaskLength()+"",arr.length+""]);
	
	}
	private packageHandler():void
	{
		let tmpVo = <AcNewYearSevenDaysVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACNEWYEAR7DAYS,this.code); 
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
		data.code =this.code;
		data.day = this.currNewDay;
		ViewController.getInstance().openView(ViewConst.POPUP.ACNEWYEARSEVENDAYSPOPUPVIEW,data);
	}

	 private onClickHandler(event:egret.TouchEvent,params:any)
    {
		let tmpVo = <AcNewYearSevenDaysVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACNEWYEAR7DAYS,this.code); 
		if(tmpVo.isStart==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return
		}
		if(event.currentTarget ==this._leftBtn)
		{
		  	this.num = Math.max(0,this.num - 1);
		}
		else
		{
			this.num = Math.min(6,this.num + 1);
		}
		this._tabgroup.selectedIndex = this.num;
		this.clickTab({index : this.num}); 

		this.refreshList(); 
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_NEWYEAR_REDHOT);
	} 
 
	private showDayNum():void
	{
		this._currDayNum =this.num;
		AcNewYearSevenDays2ScrollItem.TADAY = this.num+1;
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

	private refreshRedPoint():void{
		//红点
		let scrollleft = this._tabgroup.getTarBarScrollLeft();
		let showleft = false;
		let showright = false;
		for(let i = 1; i < 8; ++ i){
			let index = i - 1;
			if(this.vo.getDayTaskRed(i) && i == this.vo.diffday){
				this._tabgroup.addRedPoint(index);
				this._tabgroup.setRedPos(index,66,15);
				
				if((index * 105 + 90) < scrollleft){
					showleft = true;
				}
				if((index * 105) > (scrollleft + 535)){
					showright = true;
				}
			}
			else{
				this._tabgroup.removeRedPoint(index);
			}
		}
		
		if(showleft){
			App.CommonUtil.addIconToBDOC(this._leftBtn)
		}
		else{
			App.CommonUtil.removeIconFromBDOC(this._leftBtn)
		}

		if(showright){
			App.CommonUtil.addIconToBDOC(this._rightBtn)
		}
		else{
			App.CommonUtil.removeIconFromBDOC(this._rightBtn)
		}
	}

	private update():void
	{
		let tmpVo  = <AcNewYearSevenDaysVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACNEWYEAR7DAYS,this.code); 
		if(tmpVo.getTaskLength())
		{	
			var arr =this.getCurrDayData(this._currDayNum);
			this._tadayTaskTxt.text = LanguageManager.getlocal("acNewYeartask_des_" + this.nowCode,[tmpVo.getTaskLength()+"",arr.length+""]);
		
			
		if(this.vo.taskinfo && this.vo.taskinfo.dayFlag==1)
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
			this._tabgroup.selectedIndex = this.currNewDay - 1;
			this.clickTab({index : this.currNewDay - 1});
		}	
		this._leftBtn.visible = this.num > 0;
		this._rightBtn.visible = this.num < 6;
		this.refreshRedPoint();
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
				newArr.push(arr[key]);  
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

	private clickTab(data : any):void{
		let view = this;
		App.LogUtil.log("index: " + data.index);
		let index = Number(data.index);
		this.num = index;
		if((this._tabgroup.getTarBarScrollLeft() + 420) < (105 * index) || (this._tabgroup.getTarBarScrollLeft()) > (105 * index)){
			this._tabgroup.setTarBarScrollLeft(105 * index);
		}
		this._leftBtn.visible = this.num > 0;
		this._rightBtn.visible = this.num < 6;
		this.showDayNum();
		this.refreshList(); 
		this.refreshRedPoint();
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_NEWYEAR_ITEM,this.update,this);  
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD),this.refreshUIInfo,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_NEWYEAR_LIST,this.restList,this);  

		this._scrollList=null;
		this._newYearInfoVoList=[];
		this._index = 0;
		
		this._bottomBg =null; 
		this._cfgObj=null;
		this._dailyTask_arr =[];
	
		this._currDayNum=0;
		this._leftBtn =null;
		this._rightBtn =null;
		this.num=0;
		this.public_dot2 =null; 
		
		this._bigArr=[];
		this._tadayTaskTxt =null
		// -1往前点 0当天 1往后点
		AcNewYearSevenDaysViewTab2.dayStatus=-1;
		this.btntype =0;
		this.currNewDay=0;
		this.rechargevie_effects =null;
		this.big_package =null; 
		this._tabgroup = null;
		super.dispose();
	}
}