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
	private _code:string ="";

 
	public constructor() 
	{
		super();
	}
	/**
     * 使用的code 仅仅使用资源，cn
     */
	public get nowCode():string
    {
        if(this._code == "6")
        {
            return "4";
        }
        else
        {
            return this._code;
        }
    }
	protected initItem(index:number,data:any,itemParam?:any)
    {	
		this._data = data;
		this._code = itemParam;
	 	let tmpVo = <AcNewYearVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACNEWYEAR,this._code); 
		this._tmpVo =  tmpVo;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_NEWYEAR_ITEM,this.update,this);  
      
		//英文 泰文版本
		if (PlatformManager.checkIsTextHorizontal()){

			// getTaskLength
			let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg14");  
			wordsBg.width = 600;
			wordsBg.height = 152; 
			this.addChild(wordsBg); 


			let titleBg = BaseBitmap.create("common_titlebg");
			this.addChild(titleBg);

			//中国结
			var chineseknot:BaseBitmap = BaseBitmap.create("acnewyear_chineseknot2_"+this.nowCode);   
			this.addChild(chineseknot);

			//中国结数量
			let buyNumTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_BROWN);
			buyNumTxt.text ="+"+data.getScore; 
			this.addChild(buyNumTxt);

			
			if(data.questType=="1002")
			{
				wordsBg.height = 170;
				//礼包背景
				let small_package_bg:BaseBitmap = BaseBitmap.create("progress6_bg");   
				this.addChild(small_package_bg); 
				small_package_bg.x=60;
				small_package_bg.y=50;
				
				//箱子
				let big_package:BaseBitmap = BaseBitmap.create("acnewyear_box");   
				big_package.x=80;
				big_package.y=58;
				big_package.scaleX =0.9;
				big_package.scaleY =0.9;
				big_package.addTouchTap(this.onPackageHandler,this);
				this.addChild(big_package);



				//购买后
				let buyTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_BROWN);
				buyTxt.text =LanguageManager.getlocal("acNewYearViewbuyDes");
				buyTxt.x =200;
				buyTxt.y =90;
				this.addChild(buyTxt);

				chineseknot.x = buyTxt.x + buyTxt.width;
				chineseknot.y = 75;  
			
				buyNumTxt.x = chineseknot.x + chineseknot.width;
				buyNumTxt.y = 90;

				let temW:number=38;
				var gemIcon = BaseLoadBitmap.create("itemicon1");
				gemIcon.scaleX =0.4;
				gemIcon.scaleY =0.4;
				gemIcon.x = 450;
				gemIcon.y = 35;
				this.addChild(gemIcon);

				this.gemTF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BROWN);
				this.gemTF.text =data.value;
				this.gemTF.x = gemIcon.x + temW + 5;
				this.gemTF.y = gemIcon.y + 20 - this.gemTF.height/2;
				
				this.addChild(this.gemTF);  


				//礼包名字 
				let dayNum = NewYear2ScrollItem.TADAY;
				var str1 = LanguageManager.getlocal("acNewYearPackageName"+dayNum+"_"+this.nowCode);
				let tadayPackageTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
				tadayPackageTxt.text =str1;
				tadayPackageTxt.x = titleBg.x + 20;
				tadayPackageTxt.y = titleBg.y + titleBg.height/2 - tadayPackageTxt.height/2; 
				this._tadayPackageTxt = tadayPackageTxt;
				this.addChild(tadayPackageTxt);

				titleBg.width = tadayPackageTxt.width + 60 > titleBg.width?tadayPackageTxt.width + 60:titleBg.width;

				//  0不可领 1未领取 2已领取 
				var gobtnTypeNum =0;
				if(AcNewYearViewTab2.dayStatus==0)
				{
					gobtnTypeNum= tmpVo.getIdflag(data.questType); 
					if(gobtnTypeNum==2)
					{	
						let collectflag = BaseBitmap.create("collectflag");
						collectflag.x = 435;
						collectflag.y = 50;
						collectflag.scaleX=0.7;
						collectflag.scaleY=0.7;
						this.addChild(collectflag); 
						this.gemTF.visible =false;
						gemIcon.visible =false;
						return
					}
				}
				
				//	购买按钮
				this._goBtn =  ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"acPunishBuyItemBuy",this.buyHandler,this);
				this._goBtn.x = 420;
				this._goBtn.y = 80;
				this.addChild(this._goBtn);
				if(gobtnTypeNum)
				{
					if(gobtnTypeNum>0)
					{	
						this._goBtn.setText("atkrace_buy_already");
					} 
				}
				if(AcNewYearViewTab2.dayStatus)
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
			//非礼包状态
			else
			{	
				//中国节
				chineseknot.x=450;
				chineseknot.y=10;  

				buyNumTxt.x =495;
				buyNumTxt.y =22;

				//	已领取 
				let collectflag = BaseBitmap.create("collectflag");
				collectflag.x = 435;
				collectflag.y = 50;
				collectflag.scaleX=0.7;
				collectflag.scaleY=0.7;
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
				if(AcNewYearViewTab2.dayStatus==0)
				{
					if(this._tmpVo.taskinfo.info&&this._tmpVo.taskinfo.info[data.questType])
					{	 
						num1=this._tmpVo.taskinfo.info[data.questType].v;
					}
				}
				
			
				tadayTaskTxt.text =LanguageManager.getlocal("acNewYearquestType"+data.questType,[num1+"",data.value]);
				tadayTaskTxt.x = titleBg.x + 20;
				tadayTaskTxt.y = titleBg.y + titleBg.height/2 - tadayTaskTxt.height/2;
				this._tadayTaskTxt =tadayTaskTxt;
				this.addChild(tadayTaskTxt);

				titleBg.width = tadayTaskTxt.width + 60 > titleBg.width?tadayTaskTxt.width + 60:titleBg.width;
				//可获得
				let needNumTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_BROWN);
				needNumTxt.text =LanguageManager.getlocal("acNewYearViewneedNum");
				needNumTxt.x =60;
				needNumTxt.y = 85;
				this.addChild(needNumTxt);

				let iconList: BaseDisplayObjectContainer[] = GameData.getRewardItemIcons(data.reward,true);
				if (iconList&&iconList.length>0) {
					
					//额外赠送ICON
					let startX: number = 150;
					let startY: number = 55;
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

				//前往
				this._goBtn2 =  ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED,"taskGoBtn",this.collectHandler,this);
				this._goBtn2.x = 420;
				this._goBtn2.y = 60;
				this.addChild(this._goBtn2);
				
				//领取
				this._goBtn3 =  ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"taskCollect",this.collectHandler,this);
				this._goBtn3.x = 420;
				this._goBtn3.y = 60;
				this._goBtn3 .visible=false;
				this.addChild(this._goBtn3);

				// this.public_dot =BaseBitmap.create("public_dot2");
				// this.addChild(this.public_dot);
				// this.public_dot.x =this._goBtn3.x+this._goBtn3.width-20;
				// this.public_dot.y =this._goBtn3.y-3;
				// this.public_dot.visible =false;


				if(	AcNewYearViewTab2.dayStatus)
				{
					App.DisplayUtil.changeToGray(this._goBtn2);
				}
				else
				{
					App.DisplayUtil.changeToNormal(this._goBtn2);
				} 

				if(AcNewYearViewTab2.dayStatus==0)
				{
					this.update();
				}
			}
 

		} else {

			// getTaskLength
			let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg14");  
			wordsBg.width = 600;
			wordsBg.height = 152; 
			this.addChild(wordsBg); 

			//任务红色底
			let bottom2:BaseBitmap = BaseBitmap.create("acnewyear_bottom2");  
			this.addChild(bottom2);  

			//任务
			let taskTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			let num=index+1;
			taskTxt.text =LanguageManager.getlocal("acNewYearViewTask"+num);
			taskTxt.width=30;
			taskTxt.x =10;
			taskTxt.y = 30;
			taskTxt.lineSpacing =5;
			this.addChild(taskTxt);

			//中国结
			var chineseknot:BaseBitmap = BaseBitmap.create("acnewyear_chineseknot2_"+this.nowCode);   
			this.addChild(chineseknot);

			//中国结数量
			let buyNumTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_BROWN);
			buyNumTxt.text ="+"+data.getScore; 
			this.addChild(buyNumTxt);

			
			if(data.questType=="1002")
			{
				//礼包背景
				let small_package_bg:BaseBitmap = BaseBitmap.create("progress6_bg");   
				this.addChild(small_package_bg); 
				small_package_bg.x=60;
				small_package_bg.y=20;
				
				//箱子
				let big_package:BaseBitmap = BaseBitmap.create("acnewyear_box");   
				big_package.x=80;
				big_package.y=28;
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
				this.gemTF.text =data.value;
				this.gemTF.x = gemIcon.x + temW + 5;
				this.gemTF.y = gemIcon.y + 20 - this.gemTF.height/2;
				
				this.addChild(this.gemTF);  


				//礼包名字 
				let dayNum = NewYear2ScrollItem.TADAY;
				var str1 = LanguageManager.getlocal("acNewYearPackageName"+dayNum+"_"+this.nowCode);
				let tadayPackageTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_BROWN);
				tadayPackageTxt.text =str1;
				tadayPackageTxt.x = 210;
				tadayPackageTxt.y = 20; 
				this._tadayPackageTxt = tadayPackageTxt;
				this.addChild(tadayPackageTxt);

				//  0不可领 1未领取 2已领取 
				var gobtnTypeNum =0;
				if(AcNewYearViewTab2.dayStatus==0)
				{
					gobtnTypeNum= tmpVo.getIdflag(data.questType); 
					if(gobtnTypeNum==2)
					{	
						let collectflag = BaseBitmap.create("collectflag");
						collectflag.x = 435;
						collectflag.y = 50;
						collectflag.scaleX=0.7;
						collectflag.scaleY=0.7;
						this.addChild(collectflag); 
						this.gemTF.visible =false;
						gemIcon.visible =false;
						return
					}
				}
				
				//	购买按钮
				this._goBtn =  ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"acPunishBuyItemBuy",this.buyHandler,this);
				this._goBtn.x = 420;
				this._goBtn.y = 80;
				this.addChild(this._goBtn);
				if(gobtnTypeNum)
				{
					if(gobtnTypeNum>0)
					{	
						this._goBtn.setText("atkrace_buy_already");
					} 
				}
				if(AcNewYearViewTab2.dayStatus)
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
			//非礼包状态
			else
			{	
				//中国节
				chineseknot.x=450;
				chineseknot.y=0;  

				buyNumTxt.x =495;
				buyNumTxt.y =12;

				//	已领取 
				let collectflag = BaseBitmap.create("collectflag");
				collectflag.x = 435;
				collectflag.y = 50;
				collectflag.scaleX=0.7;
				collectflag.scaleY=0.7;
				this.addChild(collectflag);
				collectflag.visible =false;
				collectflag.touchEnabled =false;
				this._collectflag =collectflag;
				
				let line = BaseBitmap.create("public_line1");
				line.x = 50;
				line.y = 44;
				this.addChild(line);
				
				//任务：1／10
				let tadayTaskTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_BROWN);
				var num1=0;
				if(AcNewYearViewTab2.dayStatus==0)
				{
					if(this._tmpVo.taskinfo.info&&this._tmpVo.taskinfo.info[data.questType])
					{	 
						num1=this._tmpVo.taskinfo.info[data.questType].v;
					}
				}
				
			
				tadayTaskTxt.text =LanguageManager.getlocal("acNewYearquestType"+data.questType,[num1+"",data.value]);
				tadayTaskTxt.x = 60;
				tadayTaskTxt.y = 20;
				this._tadayTaskTxt =tadayTaskTxt;
				this.addChild(tadayTaskTxt);

				//可获得
				let needNumTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_BROWN);
				needNumTxt.text =LanguageManager.getlocal("acNewYearViewneedNum");
				needNumTxt.x =60;
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

				//前往
				this._goBtn2 =  ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED,"taskGoBtn",this.collectHandler,this);
				this._goBtn2.x = 420;
				this._goBtn2.y = 60;
				this.addChild(this._goBtn2);
				
				//领取
				this._goBtn3 =  ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"taskCollect",this.collectHandler,this);
				this._goBtn3.x = 420;
				this._goBtn3.y = 60;
				this._goBtn3 .visible=false;
				this.addChild(this._goBtn3);


				// this.public_dot =BaseBitmap.create("public_dot2");
				// this.addChild(this.public_dot);
				// this.public_dot.x =this._goBtn3.x+this._goBtn3.width-20;
				// this.public_dot.y =this._goBtn3.y-3;
				// this.public_dot.visible =false;


				if(	AcNewYearViewTab2.dayStatus)
				{
					App.DisplayUtil.changeToGray(this._goBtn2);
				}
				else
				{
					App.DisplayUtil.changeToNormal(this._goBtn2);
				} 

				if(AcNewYearViewTab2.dayStatus==0)
				{
					this.update();
				}
			}	



		}


		
 
	}
	 
	private onPackageHandler(evt:egret.TouchEvent):void
	{
		let tmpVo = <AcNewYearVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACNEWYEAR,this._code); 
		if(tmpVo.isStart==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return
		}
		var data:any ={};
		data.reward =this._data.reward;
		data.isShowBtnType = 2; 
		data.code = this._code;
 		ViewController.getInstance().openView(ViewConst.POPUP.ACNEWYEARPOPUPVIEW,data);	 
	}
 
	private collectHandler(evt:egret.TouchEvent):void
	{
		    let tmpVo = <AcNewYearVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACNEWYEAR,this._code); 
			if(tmpVo.isStart==false)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
				return
			}
			
			if(AcNewYearViewTab2.dayStatus)
			{
				let str = LanguageManager.getlocal("acNewYearisOpen");
				if(AcNewYearViewTab2.dayStatus==-1)
				{
					str=LanguageManager.getlocal("date_error");
				}
				 App.CommonUtil.showTip(str);
				return;
			}

			if(this._gobtnTypeNum>0&&this._gobtnTypeNum==1)
			{
				App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD),this.refreshUIInfo,this);
			 	NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD,{"activeId":AcConst.AID_ACNEWYEAR+"-"+this._code,"questType":this._data.questType+"","ftype":1});
				return;
			}

			if (tmpVo.checkIsInEndShowTime() && AcNewYearViewTab2.dayStatus == 0){
				App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
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
				if(openType == "palace")
				{	
					ViewController.getInstance().openView(ViewConst.COMMON.PALACENEWVIEW);
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
				if(this._goBtn2)
				{
					this._goBtn2.visible =false;
				}
				if(this._goBtn3)
				{
				   this._goBtn3.visible=false;
				//    this.public_dot.visible =false;
				}
			}
			else if(gobtnTypeNum==1)
			{	
				if(this._goBtn3)
				{
					this._goBtn3.visible=true;
					// this.public_dot.visible =true;
					App.CommonUtil.addIconToBDOC(this._goBtn3);
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
				// this.public_dot.visible =false;
			}
		
		}


	  if(this._data.questType!="1002")
   	  {	
		if(this._tmpVo.taskinfo.info&&this._tmpVo.taskinfo.info[this._data.questType])
		var num1 =0;
		{	 
			if(this._tmpVo.taskinfo.info[this._data.questType]&&this._tmpVo.taskinfo.info[this._data.questType].v)
			{	
				num1=this._tmpVo.taskinfo.info[this._data.questType].v;
				this._tadayTaskTxt.text =  LanguageManager.getlocal("acNewYearquestType"+this._data.questType,[num1+"",this._data.value]);
				} 
			}
		}
		
		if(GameData.serverTime>this._tmpVo.et-86400 )
		{	
			if(this._goBtn2)
			{
				// this._goBtn2.touchEnabled =false;
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
	 	let tmpVo = <AcNewYearVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACNEWYEAR,this._code); 
		let tmpCfg = <Config.AcCfg.NewYearCfg> Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_ACNEWYEAR, this._code);
		if(tmpVo.isStart==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		if(AcNewYearViewTab2.dayStatus)
		{
			let str =LanguageManager.getlocal("acNewYearUnopenedDes");
			if(AcNewYearViewTab2.dayStatus==-1)
			{
				str=LanguageManager.getlocal("date_error");
			}
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
			let costNum:number = this._data.value;
			let itemName:string = LanguageManager.getlocal("acNewYearPackageName"+ NewYear2ScrollItem.TADAY+"_"+this.nowCode)
			if(Api.switchVoApi.checkOpenNewYearActiveTwoConfirm()&&costNum>=tmpCfg.maxGem)
			{
				let message:string = LanguageManager.getlocal("shopBuyUseGem2",[costNum.toString(),itemName]);
				let playerGem = Api.playerVoApi.getPlayerGem();
					ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,{
						confirmCallback:this.confirmCallbackHandler,
						handler:this,
						icon:"itemicon1",
						iconBg: "itembg_1",
						num:playerGem,
						msg:message,
						id: 1,
						useNum:costNum
					});

			}
			else
			{
				App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYNEWYEARGIFT),this.useCallback,this);
				NetManager.request(NetRequestConst.REQUEST_ACTIVITY_BUYNEWYEARGIFT,{"activeId":AcConst.AID_ACNEWYEAR+"-"+this._code});
	
			}
		}
		
	}
	private confirmCallbackHandler()
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYNEWYEARGIFT),this.useCallback,this);
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_BUYNEWYEARGIFT,{"activeId":AcConst.AID_ACNEWYEAR+"-"+this._code});
	}

	private useCallback(event:egret.Event):void
	{
		if(event.data.ret)
		{
			this._goBtn.visible=false;
			let collectflag = BaseBitmap.create("collectflag");
			collectflag.x = 435;
			collectflag.y = 50;
			collectflag.scaleX=0.7;
			collectflag.scaleY=0.7;
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
		this._code =null;
		// NewYear2ScrollItem.TADAY =0;
		
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_NEWYEAR_ITEM,this.update,this);  
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYNEWYEARGIFT),this.useCallback,this);
	 	App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD),this.refreshUIInfo,this);
		super.dispose();
	}
}