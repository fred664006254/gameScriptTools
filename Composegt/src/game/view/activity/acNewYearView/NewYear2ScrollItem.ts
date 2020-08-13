/**
 * 攀升item
 */
class NewYear2ScrollItem  extends ScrollListItem
{
	private _goBtn:BaseButton;
	private _data=null;
	private gemTF:BaseTextField = null;
	private _gobtnTypeNum:number = 0;
	private _tmpVo:AcNewYearVo =null;
	private _tadayTaskTxt:BaseTextField =null;
	private _tadayPackageTxt:BaseTextField =null;
	private _goBtn2:BaseButton =null;
	private _collectflag:BaseBitmap =null;
	private _goBtn3:BaseButton =null;
	public static TADAY:number =0;
	private public_dot:BaseBitmap =null;

 
	public constructor() 
	{
		super();
	}
	protected initItem(index:number,data:any)
    {	
		
		this.height =160;
		this._data = data;
	 	let tmpVo = <AcNewYearVo>Api.acVoApi.getActivityVoByAidAndCode(AcNewYearView.AID,AcNewYearView.CODE); 
		this._tmpVo =  tmpVo;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_NEWYEAR_ITEM,this.update,this);  
      
		// getTaskLength
		let wordsBg:BaseBitmap = null;
		if(AcNewYearView.CODE == "10" || AcNewYearView.CODE == "11"){
			if(data.questType=="1002"){
				wordsBg = BaseBitmap.create("acnewyear_itembg");  
				wordsBg.width = 606;
				wordsBg.height = 200; 
				this.height = 208;
			} else {
				wordsBg = BaseBitmap.create("activity_db_01");  
				wordsBg.width = 606;
				wordsBg.height = 152; 
			}

		} else {
			wordsBg = BaseBitmap.create("activity_db_01");  
			wordsBg.width = 600;
			wordsBg.height = 152; 
		}
		
		this.addChild(wordsBg); 

		//任务红色底
		let bottom2:BaseBitmap = BaseBitmap.create("activity_charge_red");  
		this.addChild(bottom2);  
		bottom2.x = -1;




		// //任务
		// let taskTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		// let num=index+1;
		// taskTxt.text =LanguageManager.getlocal("acNewYearViewTask"+num);
		// taskTxt.width=30;
		// taskTxt.x =10;
		// taskTxt.y = 30;
		// taskTxt.lineSpacing =5;
		// this.addChild(taskTxt);

		var chineseknot:BaseBitmap = null;
		if(AcNewYearView.CODE == "10" || AcNewYearView.CODE == "11"){
			chineseknot = BaseBitmap.create("acnewyear_chineseknot2_10");   
		} else {
			chineseknot = BaseBitmap.create("acnewyear_chineseknot2_"+AcNewYearView.CODE);   
		}
		//中国结
		// var chineseknot:BaseBitmap = BaseBitmap.create("acnewyear_chineseknot2_"+AcNewYearView.CODE);   
		this.addChild(chineseknot);

		//中国结数量
		let buyNumTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_BROWN);
		buyNumTxt.text ="+"+data.getScore; 
		this.addChild(buyNumTxt);

		 
		if(data.questType=="1002")
		{


			if(AcNewYearView.CODE == "10" || AcNewYearView.CODE == "11"){
				bottom2.visible = false;
				//礼包背景
				let small_package_bg:BaseBitmap = BaseBitmap.create("progress6_bg");   
				this.addChild(small_package_bg); 
				small_package_bg.x=40;
				small_package_bg.y=40;
				let cloud = BaseBitmap.create("acnewyear_cloud");
				cloud.x = small_package_bg.x + small_package_bg.width - cloud.width -7;
				cloud.y = small_package_bg.y + small_package_bg.height - cloud.height -7;
				this.addChild(cloud);
				//箱子
				let big_package:BaseBitmap = BaseBitmap.create("acnewyear_box");   
				big_package.x=60;
				big_package.y=50;
				big_package.scaleX =0.9;
				big_package.scaleY =0.9;
				big_package.addTouchTap(this.onPackageHandler,this);
				this.addChild(big_package);

 

				//购买后
				let buyTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_BROWN);
				buyTxt.text =LanguageManager.getlocal("acNewYearViewbuyDes");
				buyTxt.x =220;
				buyTxt.y =120;
				this.addChild(buyTxt);

				chineseknot.x=buyTxt.x + buyTxt.width;
				chineseknot.y=buyTxt.y + buyTxt.height / 2 - chineseknot.height/2; 
			
				buyNumTxt.x = chineseknot.x + buyNumTxt.width;
				buyNumTxt.y = chineseknot.y + chineseknot.height/2 - buyNumTxt.height/2;

				let temW:number=38;
				var gemIcon = BaseLoadBitmap.create("itemicon1");
				gemIcon.scaleX =0.4;
				gemIcon.scaleY =0.4;
				gemIcon.x = 450;
				gemIcon.y = 35;
				this.addChild(gemIcon);

				this.gemTF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BROWN);
				this.gemTF.x = gemIcon.x + temW + 5;
				this.gemTF.y = gemIcon.y+5;
				this.gemTF.text =data.value;
				this.addChild(this.gemTF);  


				//礼包名字 
				let dayNum = NewYear2ScrollItem.TADAY;
			

				var str1 = LanguageManager.getlocal("acNewYearPackageName"+dayNum+"_10");
				let tadayPackageTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_BROWN);
				tadayPackageTxt.text =str1;
				tadayPackageTxt.x = 220;
				tadayPackageTxt.y = 60; 
				this._tadayPackageTxt = tadayPackageTxt;
				this.addChild(tadayPackageTxt);

				//  0不可领 1未领取 2已领取 
				var gobtnTypeNum =0;
				if(AcNewYearViewTab2.isStarBoo || AcNewYearViewTab2.showBtnStatus != 2)
				{
					gobtnTypeNum= tmpVo.getIdflag(data.questType,NewYear2ScrollItem.TADAY); 
					if(gobtnTypeNum==2)
					{	
						let collectflag = BaseBitmap.create("collectflag");
						collectflag.x = 450;
						collectflag.y = 60; 
						this.addChild(collectflag); 
						this.gemTF.visible =false;
						gemIcon.visible =false;
						return
					}
				}
				
				//	购买按钮
				this._goBtn =  ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"acPunishBuyItemBuy",this.buyHandler,this);
				this._goBtn.x = 440;
				this._goBtn.y = 80;
				this.addChild(this._goBtn);
				if(gobtnTypeNum)
				{
					if(gobtnTypeNum>0)
					{	
						this._goBtn.setText("atkrace_buy_already");
					} 
				}
				if(AcNewYearViewTab2.isStarBoo==false && AcNewYearViewTab2.showBtnStatus == 2)
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
					this._goBtn.touchEnabled =false;
				}


			} else {
				//礼包背景
				let small_package_bg:BaseBitmap = BaseBitmap.create("progress6_bg");   
				this.addChild(small_package_bg); 
				small_package_bg.x=60;
				small_package_bg.y=32;
				
				//箱子
				let big_package:BaseBitmap = BaseBitmap.create("acnewyear_box");   
				big_package.x=80;
				big_package.y=42;
				big_package.scaleX =0.9;
				big_package.scaleY =0.9;
				big_package.addTouchTap(this.onPackageHandler,this);
				this.addChild(big_package);

				chineseknot.x=280;
				chineseknot.y=65;  

				//购买后
				let buyTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_BROWN);
				buyTxt.text =LanguageManager.getlocal("acNewYearViewbuyDes");
				buyTxt.x =210;
				buyTxt.y =80;
				this.addChild(buyTxt);

			
				buyNumTxt.x =330;
				buyNumTxt.y =80;

				let temW:number=38;
				var gemIcon = BaseLoadBitmap.create("itemicon1");
				gemIcon.scaleX =0.4;
				gemIcon.scaleY =0.4;
				gemIcon.x = 450;
				gemIcon.y = 35;
				this.addChild(gemIcon);

				this.gemTF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BROWN);
				this.gemTF.x = gemIcon.x + temW + 5;
				this.gemTF.y = gemIcon.y+5;
				this.gemTF.text =data.value;
				this.addChild(this.gemTF);  


				//礼包名字 
				let dayNum = NewYear2ScrollItem.TADAY;
				var str1 = LanguageManager.getlocal("acNewYearPackageName"+dayNum+"_"+AcNewYearView.CODE);
				let tadayPackageTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
				tadayPackageTxt.text =str1;
				tadayPackageTxt.x = 10;
				tadayPackageTxt.y = 5; 
				this._tadayPackageTxt = tadayPackageTxt;
				this.addChild(tadayPackageTxt);

				//  0不可领 1未领取 2已领取 
				var gobtnTypeNum =0;
				if(AcNewYearViewTab2.isStarBoo || AcNewYearViewTab2.showBtnStatus != 2)
				{
					gobtnTypeNum= tmpVo.getIdflag(data.questType,NewYear2ScrollItem.TADAY); 
					if(gobtnTypeNum==2)
					{	
						let collectflag = BaseBitmap.create("collectflag");
						collectflag.x = 450;
						collectflag.y = 60; 
						this.addChild(collectflag); 
						this.gemTF.visible =false;
						gemIcon.visible =false;
						return
					}
				}
				
				//	购买按钮
				this._goBtn =  ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"acPunishBuyItemBuy",this.buyHandler,this);
				this._goBtn.x = 440;
				this._goBtn.y = 80;
				this.addChild(this._goBtn);
				if(gobtnTypeNum)
				{
					if(gobtnTypeNum>0)
					{	
						this._goBtn.setText("atkrace_buy_already");
					} 
				}
				if(AcNewYearViewTab2.isStarBoo==false && AcNewYearViewTab2.showBtnStatus == 2)
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
					this._goBtn.touchEnabled =false;
				}
			}

		}
		//非礼包状态
		else
		{	

			//中国节
			chineseknot.x=450;
			chineseknot.y=0;  

			buyNumTxt.x =495;
			buyNumTxt.y =12;

			if(AcNewYearView.CODE == "10" || AcNewYearView.CODE == "11"){
				chineseknot.x=450;
				chineseknot.y=7;  

				buyNumTxt.x = chineseknot.x + chineseknot.width;
				buyNumTxt.y = chineseknot.y + chineseknot.height/2 - buyNumTxt.height/2;
			}

			//	已领取 
			let collectflag = BaseBitmap.create("collectflag");
			collectflag.x = 450;
			collectflag.y = 50;
			// collectflag.scaleX=0.7;
			// collectflag.scaleY=0.7;
			this.addChild(collectflag);
			collectflag.visible =false;
			collectflag.touchEnabled =false;
			this._collectflag =collectflag;
			
			// let line = BaseBitmap.create("public_line1");
			// line.x = 50;
			// line.y = 44;
			// this.addChild(line);
			 
			//任务：1／10
			let tadayTaskTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			var num1=0;
			if(AcNewYearViewTab2.isStarBoo || AcNewYearViewTab2.showBtnStatus !=2)
			{
				if(this._tmpVo.taskinfo[NewYear2ScrollItem.TADAY+""] && this._tmpVo.taskinfo[NewYear2ScrollItem.TADAY+""].info&&this._tmpVo.taskinfo[NewYear2ScrollItem.TADAY+""].info[data.questType])
				{	 
					num1=this._tmpVo.taskinfo[NewYear2ScrollItem.TADAY+""].info[data.questType].v;
				}
			}

			
		
			tadayTaskTxt.text =LanguageManager.getlocal("acNewYearquestType"+data.questType,[num1+"",data.value]);
			tadayTaskTxt.x = 10;
			tadayTaskTxt.y = 5;
			this._tadayTaskTxt =tadayTaskTxt;
			this.addChild(tadayTaskTxt);
			bottom2.width = tadayTaskTxt.textWidth+35;

			//可获得
			let needNumTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_BROWN);
			needNumTxt.text =LanguageManager.getlocal("acNewYearViewneedNum");
			needNumTxt.x =50;
			needNumTxt.y = 80;
			this.addChild(needNumTxt);

			let iconList: BaseDisplayObjectContainer[] = GameData.getRewardItemIcons(data.reward,true);
			if (iconList&&iconList.length>0) {
				
				//额外赠送ICON
				let startX: number = 150;
				let startY: number = 50;
				let l: number = iconList.length;
				var _icon :BaseDisplayObjectContainer;
				for (let i: number = 0; i < l; i++) {
					let icon: BaseDisplayObjectContainer = iconList[i];
					icon.scaleX =0.78;
					icon.scaleY =0.78;
					icon.setPosition(startX + i * (icon.width*icon.scaleX + 12), startY);
					this.addChild(icon); 
				}
			}


			//每日登陆
			if(this._data.questType=="1"){
				//前往
				this._goBtn2 =  ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskCollect",null,this);
				this._goBtn2.x = 440;
				this._goBtn2.y = 60;
				this._goBtn2.setEnable(false);
				this.addChild(this._goBtn2);
			} else {
				//前往
				this._goBtn2 =  ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE,"taskGoBtn",this.collectHandler,this);
				this._goBtn2.x = 440;
				this._goBtn2.y = 60;
				this.addChild(this._goBtn2);
			}


			
			//领取
			this._goBtn3 =  ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskCollect",this.collectHandler,this);
			this._goBtn3.x = 440;
			this._goBtn3.y = 60;
			this._goBtn3 .visible=false;
			this.addChild(this._goBtn3);

			this.public_dot =BaseBitmap.create("public_dot2");
			this.addChild(this.public_dot);
			this.public_dot.x =this._goBtn3.x+this._goBtn3.width-20;
			this.public_dot.y =this._goBtn3.y-3;
			this.public_dot.visible =false;

			if(	AcNewYearViewTab2.isStarBoo==false)
			{
			 	App.DisplayUtil.changeToGray(this._goBtn2);
			}
			else
			{
				App.DisplayUtil.changeToNormal(this._goBtn2);
			} 

			if(AcNewYearViewTab2.isStarBoo || AcNewYearViewTab2.showBtnStatus != 2)
			{
				this.update();
			}
		}
 
	}
	 
	private onPackageHandler(evt:egret.TouchEvent):void
	{
		let tmpVo = <AcNewYearVo>Api.acVoApi.getActivityVoByAidAndCode(AcNewYearView.AID,AcNewYearView.CODE); 
		if(tmpVo.isStart==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return
		}
		var data:any ={};
		data.reward =this._data.reward;
		data.isShowBtnType = 2; 
 		ViewController.getInstance().openView(ViewConst.POPUP.ACNEWYEARPOPUPVIEW,data);	 
	}
 
	private collectHandler(evt:egret.TouchEvent):void
	{
		    let tmpVo = <AcNewYearVo>Api.acVoApi.getActivityVoByAidAndCode(AcNewYearView.AID,AcNewYearView.CODE); 
			if(tmpVo.isStart==false)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
				return
			}
			
			if(AcNewYearViewTab2.isStarBoo==false && AcNewYearViewTab2.showBtnStatus == 2)
			{
				let str = LanguageManager.getlocal("acNewYearisOpen");
				 App.CommonUtil.showTip(str);
				return;
			}

			if(this._gobtnTypeNum>0&&this._gobtnTypeNum==1)
			{
				App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD),this.refreshUIInfo,this);
			 	NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD,{"activeId":AcNewYearView.AID+"-"+AcNewYearView.CODE,"questType":this._data.questType+"","choseday":NewYear2ScrollItem.TADAY,"ftype":1});
				return;
			}
			
			if(GameData.serverTime>tmpVo.et-86400)
			{
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_NEWYEAR_LIST);
				return;
			}

            let openType = this._data.openType;
            let viewName = App.StringUtil.firstCharToUper(openType) ;
            if(openType == "level" || openType == "arrival" || openType == "")
            {
                // ViewController.getInstance().openView(ViewConst.COMMON.PROMOTIONVIEW);
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
				}
            } 
	}

	private refreshUIInfo(evt:egret.Event):void
	{	
		if(evt.data.ret==true)
		{	
			this.update();  
		}
	}
	public update():void
	{	
		// 0不可领 1未领取 2已领取
		if(this._data&&this._data.questType)
		{
			var gobtnTypeNum = this._tmpVo.getIdflag(this._data.questType,NewYear2ScrollItem.TADAY); 
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
				if(this._goBtn2)
				{
					this._goBtn2.visible =false;
				}
				if(this._goBtn3)
				{
				   this._goBtn3.visible=false;
				   this.public_dot.visible =false;
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
		}
		else
		{
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
				this.public_dot.visible=false;
			}
		
		}


	  if(this._data.questType!="1002")
   	  {	
		if(this._tmpVo.taskinfo[NewYear2ScrollItem.TADAY+""].info&&this._tmpVo.taskinfo[NewYear2ScrollItem.TADAY+""].info[this._data.questType])
		var num1 =0;
		{	 
			if(this._tmpVo.taskinfo[NewYear2ScrollItem.TADAY+""].info[this._data.questType]&&this._tmpVo.taskinfo[NewYear2ScrollItem.TADAY+""].info[this._data.questType].v)
			{	
				num1=this._tmpVo.taskinfo[NewYear2ScrollItem.TADAY+""].info[this._data.questType].v;
				this._tadayTaskTxt.text =  LanguageManager.getlocal("acNewYearquestType"+this._data.questType,[num1+"",this._data.value]);
				} 
			}
		}
		
		if(GameData.serverTime>this._tmpVo.et-86400)
		{	
			if(this._goBtn2)
			{
				this._goBtn2.touchEnabled =false;
				App.DisplayUtil.changeToGray(this._goBtn2);  
			}
			
			if(this._goBtn)
			{
				this._goBtn.touchEnabled =false
				App.DisplayUtil.changeToGray(this._goBtn);
			}  
		}
	} 
	 
	private buyHandler(param:any):void
	{	 
	 	let tmpVo = <AcNewYearVo>Api.acVoApi.getActivityVoByAidAndCode(AcNewYearView.AID,AcNewYearView.CODE); 
		if(tmpVo.isStart==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		if(AcNewYearViewTab2.isStarBoo==false  && AcNewYearViewTab2.showBtnStatus == 2)
		{
			let str =LanguageManager.getlocal("acNewYearUnopenedDes");
			App.CommonUtil.showTip(str);
			return;
		}
 
		//任务 1 礼包购买
		if(this._data.value>Api.playerVoApi.getPlayerGem())	 
		{ 
			App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
			return; 
		}
		else
		{
			App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYNEWYEARGIFT),this.useCallback,this);
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY_BUYNEWYEARGIFT,{"activeId":AcNewYearView.AID+"-"+AcNewYearView.CODE,"choseday":NewYear2ScrollItem.TADAY});
		}
		
	}

	private useCallback(event:egret.Event):void
	{
		if(event.data.ret)
		{
			this._goBtn.visible=false;
			let collectflag = BaseBitmap.create("collectflag");
			collectflag.x = 450;
			collectflag.y = 60; 
			this.addChild(collectflag); 
			
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
		this._tadayTaskTxt =null;
		this._collectflag =null;
		// NewYear2ScrollItem.TADAY =0;
		
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_NEWYEAR_ITEM,this.update,this);  
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYNEWYEARGIFT),this.useCallback,this);
	 	App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD),this.refreshUIInfo,this);
		super.dispose();
	}
}