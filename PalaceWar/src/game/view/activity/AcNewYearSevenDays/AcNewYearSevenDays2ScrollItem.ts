/**
 * 攀升item
 */
class AcNewYearSevenDays2ScrollItem  extends ScrollListItem
{
	private _goBtn:BaseButton;
	private _data=null;
	private _gobtnTypeNum:number = 0;
	private _tadayPackageTxt:BaseTextField =null;
	private _goBtn2:BaseButton =null;
	private _collectflag:BaseBitmap =null;
	private _goBtn3:BaseButton =null;
	public static TADAY:number =0;
	private public_dot:BaseBitmap =null;
	private _code:string ="";
	private _tmpVo : AcNewYearSevenDaysVo = null;
	private _progress:ProgressBar=null;
 
	public constructor() 
	{
		super();
	}
	/**
     * 使用的code 仅仅使用资源，cn
     */
	public get nowCode():string
    {
        return this._code;
	}
	
	protected initItem(index:number,data:any,itemParam?:any)
    {	
		this._data = data;
		this.width = 627;
		this._code = itemParam;
	 	let tmpVo = <AcNewYearSevenDaysVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACNEWYEAR7DAYS,this._code); 
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_NEWYEAR_ITEM,this.update,this);  
		this._tmpVo = tmpVo;
		let isspecial = data.questType=="1003";

		let wordsBg:BaseBitmap = BaseBitmap.create(isspecial ? "acnewyear7dayspecialbg-1" : `newsingledaytab2bottombg-1`);
		if (this.nowCode == "2"){
			wordsBg = BaseBitmap.create(isspecial ? "acnewyear7dayspecialbg-"+this.nowCode : `acnewyear7days_taskitembg-`+this.nowCode);
			wordsBg.x = this.width/2 - wordsBg.width/2;
		}
		this.addChild(wordsBg); 
		if(isspecial){
			let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acNewYear7daysbuy7gift-${this.nowCode}`),20,TextFieldConst.COLOR_LIGHT_YELLOW);
			this.addChild(tipTxt); 
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, wordsBg, [0,15]);
			//礼包背景
			let packageBgImg = ResourceManager.hasRes("acnewyear7days_bigboxbg-"+this._code) ? "acnewyear7days_bigboxbg-"+this._code : "progress6_bg";
			let small_package_bg:BaseBitmap = BaseBitmap.create(packageBgImg);   
			this.addChild(small_package_bg); 
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, small_package_bg, wordsBg, [40,65]);
			
			//箱子
			let big_package:BaseBitmap = BaseBitmap.create("acnewyear_box");   
			big_package.scaleX =0.9;
			big_package.scaleY =0.9;
			big_package.addTouchTap(this.onPackageHandler,this);
			this.addChild(big_package);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, big_package, small_package_bg, [0,10]);
			if (this._code == "2"){
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, big_package, small_package_bg, [-5,10]);
			}

			//礼包名字 
			let dayNum = AcNewYearSevenDays2ScrollItem.TADAY;
			let str1 = LanguageManager.getlocal(`acNewYear7days7chargegift-${this.nowCode}`);//LanguageManager.getlocal("acNewYear7daysPackageName"+dayNum+"-"+this.nowCode);
			let tadayPackageTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_WARN_RED);
			tadayPackageTxt.text = str1;
			this._tadayPackageTxt = tadayPackageTxt;
			this.addChild(tadayPackageTxt);
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tadayPackageTxt, small_package_bg, [small_package_bg.width + 13, 8]);

			//购买后
			let buyTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_BROWN);
			buyTxt.text =  LanguageManager.getlocal(`acNewYearSevenDays-${this.nowCode}_taskDesc`+data.questType,[data.value]);//LanguageManager.getlocal(`acNewYear7daysbuyDes-${this.nowCode}`);
			this.addChild(buyTxt);
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, buyTxt, tadayPackageTxt, [0, tadayPackageTxt.textHeight+20]);
			
			let num1=0;
			//进度
			this._progress = ComponentManager.getProgressBar("progress3","progress3_bg",420);
			this.addChild(this._progress);
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, this._progress, wordsBg, [183,30]);
			this._progress.setText(`${num1}/${data.value}`);
			this._progress.setPercentage(num1/data.value);

			let goBtnImg = ButtonConst.BTN_SMALL_YELLOW;
			if (this._code == "2"){
				goBtnImg = ButtonConst.BTN2_SMALL_YELLOW;
				App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, this._progress, wordsBg, [178,30]);
			}

			//	购买按钮
			this._goBtn =  ComponentManager.getButton(goBtnImg,"taskGoBtn",this.collectHandler,this);
			App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, this._goBtn, wordsBg, [40, 95]);
			this.addChild(this._goBtn);
			let gobtnTypeNum =0;
			if(AcNewYearSevenDaysViewTab2.dayStatus==0)
			{
				gobtnTypeNum= tmpVo.getIdflag(data.questType); 
			}
			if(gobtnTypeNum)
			{
				if(gobtnTypeNum>0)
				{	
					this._goBtn.setText("taskCollect");
				} 
			}
			if(AcNewYearSevenDaysViewTab2.dayStatus)
			{
				App.DisplayUtil.changeToGray(this._goBtn);  
			}
			else
			{
				App.DisplayUtil.changeToNormal(this._goBtn);
			}
			if(this._goBtn&& GameData.serverTime>tmpVo.et-86400)
			{
				App.DisplayUtil.changeToGray(this._goBtn);
			}
			
			//中国结
			let chineseknot:BaseBitmap = BaseBitmap.create("acnewyear7daysicon-"+this.nowCode);   
			this.addChild(chineseknot);

			//中国结数量
			let buyNumTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_BROWN);
			buyNumTxt.text ="+"+data.getScore; 
			this.addChild(buyNumTxt);

			let tmpx = (this._goBtn.width - chineseknot.width - buyNumTxt.width)/2;
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, chineseknot, this._goBtn, [tmpx, -chineseknot.height-3]);
			//App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, chineseknot, buyTxt, [0, buyTxt.textHeight+15]);
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, buyNumTxt, chineseknot, [chineseknot.width, 0]);
			if (this._code == "2"){
				App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, chineseknot, this._goBtn, [tmpx - 3, -chineseknot.height + 2]);
				App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, buyNumTxt, chineseknot, [chineseknot.width, 3]);
			}
			
			//  0不可领 1未领取 2已领取 

			let collectflag = BaseBitmap.create("collectflag");
			collectflag.scaleX=0.7;
			collectflag.scaleY=0.7;
			this.addChild(collectflag); 
			this._collectflag = collectflag;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, collectflag, this._goBtn);
			this._goBtn.visible = true;

			this.public_dot =BaseBitmap.create("public_dot2");
			this.addChild(this.public_dot);
			this.public_dot.x =this._goBtn.x+this._goBtn.width-20;
			this.public_dot.y =this._goBtn.y-3;
			this.public_dot.visible =false;
		}
		else{
			//任务红色底
			let bottom2BgName = ResourceManager.hasRes("acnewyear7days_taskItemtitlebg-"+this.nowCode) ? "acnewyear7days_taskItemtitlebg-"+this.nowCode : "acmidautumnview_titlebg";
			let bottom2:BaseBitmap = BaseBitmap.create(bottom2BgName);  
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bottom2, wordsBg, [0,5]);
			this.addChild(bottom2); 
			
			let taskline = BaseBitmap.create(`public_line3`);
			this.addChild(taskline);
			//任务
			let taskTxt = ComponentManager.getTextField("",22,TextFieldConst.COLOR_LIGHT_YELLOW);
			let num=index+1;
			let num1=0;
			if(AcNewYearSevenDaysViewTab2.dayStatus==0)
			{
				if(this._tmpVo.taskinfo && this._tmpVo.taskinfo.info&&this._tmpVo.taskinfo.info[data.questType])
				{	 
					num1=this._tmpVo.taskinfo.info[data.questType].v;
				}
			}
			taskTxt.text = LanguageManager.getlocal(`acNewYearViewTask${num}`);
			this.addChild(taskTxt);

			taskline.width = taskTxt.textWidth + 280;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, taskline, bottom2);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, taskTxt, taskline);

			let str = data.reward;
			let rewardArr =  GameData.formatRewardItem(str);
			let row = Math.ceil(rewardArr.length / 5);//行数
			
			let rewardBg = BaseBitmap.create("public_9_managebg");
			rewardBg.width = 420;
			rewardBg.height = row * 108 * 0.8 + (row - 1) * 5 + 10;
			this.addChild(rewardBg);
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rewardBg, wordsBg, [25,58]);
	
			let scroStartY = 5;
			let len = Math.min(5, rewardArr.length)
			let tmpX = (rewardBg.width - len * 108 * 0.8 - (len - 1) * 7) / 2;
			for (var index = 0; index < rewardArr.length; index++) {
				let iconItem = GameData.getItemIcon(rewardArr[index],true);
				iconItem.setScale(0.8);
				iconItem.x = rewardBg.x + tmpX;
				iconItem.y = rewardBg.y + scroStartY;
				tmpX += (iconItem.width * iconItem.scaleX +7);
				if (tmpX > rewardBg.width-8)
				{
					tmpX = (rewardBg.width - len * 108 * 0.8 - (len - 1) * 7) / 2;
					scroStartY += (iconItem.height * iconItem.scaleX) + 10;
					iconItem.x = tmpX;
					iconItem.y = scroStartY;
					tmpX += (iconItem.width  * iconItem.scaleX +7);
				}
				
				this.addChild(iconItem);
			}
			scroStartY += (88 + 5 + 80);
			wordsBg.height = scroStartY;
			this.height = wordsBg.height;

			let goBtn2Img = ButtonConst.BTN_SMALL_RED;
			let goBtn3Img = ButtonConst.BTN_SMALL_YELLOW;
			if (this._code == "2"){
				goBtn2Img = ButtonConst.BTN2_SMALL_RED;
				goBtn3Img = ButtonConst.BTN2_SMALL_YELLOW;
			}
			//前往
			if (this._data.questType == "1004"){
				this._goBtn2 =  ComponentManager.getButton(goBtn3Img,"taskCollect",this.collectHandler,this);
			}
			else{
				this._goBtn2 =  ComponentManager.getButton(goBtn2Img,"taskGoBtn",this.collectHandler,this);
			}
			// this._goBtn2 =  ComponentManager.getButton(goBtn2Img,"taskGoBtn",this.collectHandler,this);
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, this._goBtn2, rewardBg, [rewardBg.width+25,-5]);
			this.addChild(this._goBtn2);
			
			//领取
			this._goBtn3 =  ComponentManager.getButton(goBtn3Img,"taskCollect",this.collectHandler,this);
			this._goBtn3.visible=false;
			this.addChild(this._goBtn3);
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, this._goBtn3, rewardBg, [rewardBg.width+25,-5]);
			if (this._code == "2"){
				App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, this._goBtn2, rewardBg, [rewardBg.width+20,-5]);
				App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, this._goBtn3, rewardBg, [rewardBg.width+20,-5]);
			}

			this.public_dot =BaseBitmap.create("public_dot2");
			this.addChild(this.public_dot);
			this.public_dot.x =this._goBtn3.x+this._goBtn3.width-20;
			this.public_dot.y =this._goBtn3.y-3;
			this.public_dot.visible =false;
			//中国结
			let chineseknot:BaseBitmap = BaseBitmap.create("acnewyear7daysicon-"+this.nowCode);   
			this.addChild(chineseknot);

			//中国结数量
			let buyNumTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_BROWN);
			buyNumTxt.text ="+"+data.getScore; 
			this.addChild(buyNumTxt);

			let tmpx = (this._goBtn2.width - chineseknot.width - buyNumTxt.width)/2;
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, chineseknot, this._goBtn2, [tmpx, -chineseknot.height-3]);
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, buyNumTxt, chineseknot, [chineseknot.width, 0]);
			if (this._code == "2"){
				App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, chineseknot, this._goBtn2, [tmpx - 3, -chineseknot.height + 2]);
				App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, buyNumTxt, chineseknot, [chineseknot.width, 3]);
			}

			//	已领取 
			let collectflag = BaseBitmap.create("collectflag");
			collectflag.scaleX=0.7;
			collectflag.scaleY=0.7;
			this.addChild(collectflag);
			collectflag.visible =false;
			collectflag.touchEnabled =false;
			this._collectflag =collectflag;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, collectflag, this._goBtn2);

			//任务：1／10
			let tadayTaskTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_BROWN);
			this.addChild(tadayTaskTxt);

			//进度条
			this._progress = ComponentManager.getProgressBar("progress3","progress3_bg",560);
			this.addChild(this._progress);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this._progress, wordsBg, [0,20]);
			this._progress.setText(`${num1}/${data.value}`);
			this._progress.setPercentage(num1/data.value);

			tadayTaskTxt.text =  LanguageManager.getlocal(`acNewYearSevenDays-${this.nowCode}_taskDesc`+data.questType,[data.value]);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tadayTaskTxt, this._progress, [0,-tadayTaskTxt.height -5]);

			if(	AcNewYearSevenDaysViewTab2.dayStatus)
			{
				App.DisplayUtil.changeToGray(this._goBtn2);
			}
			else
			{
				App.DisplayUtil.changeToNormal(this._goBtn2);
			} 
		}
		this.update();
	}
	 
	private onPackageHandler(evt:egret.TouchEvent):void
	{
		let tmpVo = <AcNewYearSevenDaysVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACNEWYEAR7DAYS,this._code); 
		if(tmpVo.isStart==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return
		}
		var data:any ={};
		data.reward =this._data.reward;
		data.isShowBtnType = 2; 
		data.code = this._code;
		ViewController.getInstance().openView(ViewConst.POPUP.ACNEWYEARSEVENDAYSPOPUPVIEW,data);
	}
 
	private collectHandler(evt:egret.TouchEvent):void
	{
		    let tmpVo = <AcNewYearSevenDaysVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACNEWYEAR7DAYS,this._code); 
			if(!tmpVo || GameData.serverTime>(tmpVo.et-86400))
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
				//App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_NEWYEAR_LIST);
				return;
			}
			if(tmpVo.isStart==false)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
				return
			}
			if(AcNewYearSevenDaysViewTab2.dayStatus)
			{
				let str = LanguageManager.getlocal("acWeiZhengTip6-1");
				if(AcNewYearSevenDaysViewTab2.dayStatus==-1)
				{
					str=LanguageManager.getlocal("acDechuanshidaitip11-1");
				}
				 App.CommonUtil.showTip(str);
				return;
			}

			let dayNum = AcNewYearSevenDays2ScrollItem.TADAY;
			let diffday = this._tmpVo.diffday;
			if(dayNum != diffday){
				App.CommonUtil.showTip(LanguageManager.getlocal(`acDechuanshidaitip11-1`));
				return
			}

			if(this._gobtnTypeNum>0&&this._gobtnTypeNum==1)
			{
				App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD),this.refreshUIInfo,this);
			 	NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD,{"activeId":AcConst.AID_ACNEWYEAR7DAYS+"-"+this._code,"questType":this._data.questType+"","ftype":1});
				return;
			}

			if (tmpVo.checkIsInEndShowTime() && AcNewYearSevenDaysViewTab2.dayStatus == 0){
				App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
				return;
			}

			let openType = this._data.openType;
			if(openType){
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
						if(openType=="palace")
						{
							Api.palaceVoApi.openMainView();
						}
					}
				} 
			}
			else{

			}
	}

	private refreshUIInfo(evt:egret.Event):void
	{	
		if(evt.data.ret)
		{	
			this.update();  
		}
	}

	public update():void{	
		// 0不可领 1未领取 2已领取
		let dayNum = AcNewYearSevenDays2ScrollItem.TADAY;
		let diffday = this._tmpVo.diffday;
		if(dayNum != diffday){
			let gobtnTypeNum = 0;
			if(this._data&&this._data.questType)
			{
				gobtnTypeNum = this._tmpVo.getIdflagByDay(this._data.questType, dayNum); 
				this._gobtnTypeNum =gobtnTypeNum;
			}
			if(gobtnTypeNum == 2){
				if(this._collectflag)
				{
					this._collectflag.visible=true;
				}
				if(this._goBtn){
					this._goBtn.visible =false;  
				}
				if(this._goBtn2)
				{
					this._goBtn2.visible =false;  
				}
				if(this._goBtn3)
				{
					this._goBtn3.visible=false;
				}
				this.public_dot.visible =false;
			}
			else{
				if(this._goBtn){
					this._goBtn.visible = true;  
					App.DisplayUtil.changeToGray(this._goBtn);  
				}
				if(this._goBtn2)
				{
					this._goBtn2.visible =true;  
					App.DisplayUtil.changeToGray(this._goBtn2);  
				}
				if(this._collectflag)
				{
					this._collectflag.visible=false;
				}
				if(this._goBtn3)
				{
					this._goBtn3.visible=false;
				}
				this.public_dot.visible =false;
			}
			if(this._tmpVo.taskHistory && this._tmpVo.taskHistory[dayNum] && this._tmpVo.taskHistory[dayNum].info &&this._tmpVo.taskHistory[dayNum].info[this._data.questType]){
				let num1 =0;	 
				if(this._tmpVo.taskHistory[dayNum].info[this._data.questType].v){	
					num1=this._tmpVo.taskHistory[dayNum].info[this._data.questType].v;
					//this._tadayTaskTxt.text =  LanguageManager.getlocal("taskDesc"+this._data.questType,[this._data.value]);
					this._progress.setText(`${num1}/${this._data.value}`);
					this._progress.setPercentage(num1/this._data.value);
					if(num1 >= this._data.value){
						if(this._goBtn){
							this._goBtn.setText("taskCollect");
						}
						if(this._goBtn3)
						{
							this._goBtn3.visible = !this._collectflag.visible;
						}
						if(this._goBtn2)
						{
							this._goBtn2.visible=false;
						}
					}
					//App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this._tadayTaskTxt, this._progress, [0,-this._tadayTaskTxt.height -5]);
				}
			}
			if(this._goBtn2)
			{
				// this._goBtn2.touchEnabled =false;
				App.DisplayUtil.changeToGray(this._goBtn2);  
			}
			
			if(this._goBtn)
			{
				App.DisplayUtil.changeToGray(this._goBtn);
			}  

			if(this._goBtn3)
			{
				App.DisplayUtil.changeToGray(this._goBtn3);
			}  
		}
		else{
			if(this._data&&this._data.questType)
			{
				var gobtnTypeNum = this._tmpVo.getIdflag(this._data.questType); 
				this._gobtnTypeNum =gobtnTypeNum;
			}
		
			if(gobtnTypeNum)
			{
				if(gobtnTypeNum==2)
				{	
					if(	this._collectflag)
					{
						this._collectflag.visible=true;
					}
					if(this._goBtn){
						this._goBtn.visible =false;  
					}
					if(this._goBtn2)
					{
						this._goBtn2.visible =false;
					}
					if(this._goBtn3)
					{
					   this._goBtn3.visible=false;
					}
					this.public_dot.visible =false;
					if(this._collectflag)
					{
						this._collectflag.visible=true;
					}
				}
				else if(gobtnTypeNum==1)
				{	
					if(this._goBtn3)
					{
						this._goBtn3.visible=true;
					}
					this.public_dot.visible =true;
					if(this._goBtn){
						this._goBtn.setText("taskCollect");
						this._goBtn.visible =true;  
					}
				
					if(this._goBtn2)
					{
						this._goBtn2.visible =false; 
					}
					if(this._collectflag)
					{
						this._collectflag.visible=false;
					}
				}  
			}
			else
			{
				if(this._collectflag)
				{
					this._collectflag.visible=false;
				}
				if(this._goBtn){
					this._goBtn.visible =true;  
				}
				if(this._goBtn2)
				{
					this._goBtn2.visible =true;  
				}
				if(this._collectflag)
				{
				  this._collectflag.visible=false;
				}
				if(this._goBtn3)
				{
					this._goBtn3.visible=false;	
				}
				this.public_dot.visible =false;
			
			}
	
			if(this._tmpVo.taskinfo && this._tmpVo.taskinfo.info&&this._tmpVo.taskinfo.info[this._data.questType]){
				let num1 =0;	 
				if(this._tmpVo.taskinfo && this._tmpVo.taskinfo.info[this._data.questType]&&this._tmpVo.taskinfo.info[this._data.questType].v){	
					num1=this._tmpVo.taskinfo.info[this._data.questType].v;
					// this._tadayTaskTxt.text =  LanguageManager.getlocal("taskDesc"+this._data.questType,[this._data.value]);
					this._progress.setText(`${num1}/${this._data.value}`);
					this._progress.setPercentage(num1/this._data.value);
					//App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this._tadayTaskTxt, this._progress, [0,-this._tadayTaskTxt.height -5]);
				}
			}
			
		}

		if(!this._data.openType){
			if (this._data.questType != "1004"){
				if(this._goBtn){
					App.DisplayUtil.changeToNormal(this._goBtn);
				}

				if(this._goBtn2){
					App.DisplayUtil.changeToNormal(this._goBtn2);
				}

				if(this._goBtn3){
					App.DisplayUtil.changeToNormal(this._goBtn3);
				}
			}
		}
		if(GameData.serverTime>(this._tmpVo.et-86400))
		{	
			if(this._goBtn2)
			{
				// this._goBtn2.touchEnabled =false;
				App.DisplayUtil.changeToGray(this._goBtn2);  
			}

			if(this._goBtn3)
			{
				// this._goBtn2.touchEnabled =false;
				App.DisplayUtil.changeToGray(this._goBtn3);  
			}
			
			if(this._goBtn)
			{
				App.DisplayUtil.changeToGray(this._goBtn);
			}  
			if(this.public_dot){
				this.public_dot.visible = false;
			}
		}
	} 

	private confirmCallbackHandler()
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYNEWYEARGIFT),this.useCallback,this);
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_BUYNEWYEARGIFT,{"activeId":AcConst.AID_ACNEWYEAR7DAYS+"-"+this._code});
	}

	private useCallback(event:egret.Event):void
	{
		if(event.data.ret)
		{
			this._goBtn.visible=false;
			let collectflag = BaseBitmap.create("collectflag");
			collectflag.scaleX=0.7;
			collectflag.scaleY=0.7;
			this.addChild(collectflag); 
			this._goBtn.visible = false;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, collectflag, this._goBtn);
			App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(event.data.data.data.rewards));
		} 
	}

	public getSpaceY():number
	{
		return 0;
	}
	
	public dispose():void
    {
		this._goBtn3 =null;
		this._goBtn2=null;
		this._goBtn =null; 
		this._collectflag =null;
		this._code =null;
		this._progress = null;
		// NewYear2ScrollItem.TADAY =0;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_NEWYEAR_ITEM,this.update,this);  
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYNEWYEARGIFT),this.useCallback,this);
	 	App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD),this.refreshUIInfo,this);
		super.dispose();
	}
}