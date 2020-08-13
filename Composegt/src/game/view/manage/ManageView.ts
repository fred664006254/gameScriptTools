/**
 * author 陈可
 * date 2017/9/25
 * @class ManageView
 */
class ManageView extends CommonView
{
	private _manageItemList:ManageItem[]=[];
	private _soldierNumText:BaseTextField;
	private _goldNumText:BaseTextField;
	private _foodNumText:BaseTextField;
	private _practiceNumText:BaseTextField;
	private _isFirstRequest:boolean=true;
	private isRefreshing:boolean=false;
	public static flyEndPoint:egret.Point[]=[];
	private _clickHand:BaseBitmap;
	public static _taskHand:BaseBitmap;
	private _onekeyManage_btn:BaseButton;
	private  _luckBoo:boolean =false;
	private _luckysArr:Array<number> = [];
	private posCfg={};
	public static ONEKEY_BOO:boolean=false;
	public _num1:number=0;
	public _num2:number=0;
	public _num3:number=0;
	public _num4:number=0;
	private _manageSoldierNums:Array<number> =[];
	private _isCfgInit:boolean=false;
	private _manage_trader_icon:BaseButton;
	public constructor()
	{
		super();
	}

	protected getRequestData():{requestType:string,requestData:any}
	{
		return {requestType:NetRequestConst.REQUEST_MANAGE_GETAUTOANDFINANCE,requestData:{}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		if(data.data)
		{
			if(data.data.cmd==NetRequestConst.REQUEST_MANAGE_GETAUTOANDFINANCE)
			{
				this.isRefreshing=false;
				if(data.data.data&&data.data.data.autoRes)
				{
					Api.manageVoApi.formatAutoRes(data.data.data.autoRes);
				}
				else
				{
					Api.manageVoApi.resetAutoRes();
				}
				if(this._isFirstRequest&&Api.switchVoApi.checkAutoResManage())
				{
					Api.manageVoApi.checkAndShowAutoReward("1");
				}
				if(this.isLoaded)
				{
					this.refresh();
				}
			}
		}
		if(this._isFirstRequest)
		{
			this._isFirstRequest=false;
		}
	} 

	private initCfg():void
	{
		if(this._isCfgInit==false)
		{
			let curCfg=Config.SceneCfg.getSceneCfgBySceneName("manageScene");
			this._isCfgInit=true;
			if(curCfg)
			{
				if(curCfg.posCfg)
				{
					this.posCfg=curCfg.posCfg;
				}
			}
		}
	}
	protected refreshStorageCollect(event?:egret.Event):void
	{
        let ret = event.data.data.ret
        if (ret == 0 )
        {
            if(this._practiceNumText)
			{
				this._practiceNumText.text = "" + Api.practiceVoApi.geExp();
			}
        }        
       
    }
	protected initView():void
	{
		Api.mainTaskVoApi.checkShowGuide();
		this.initCfg();
		ManageView.ONEKEY_BOO =false;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND,this.showHand,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_DEALFINANCE),this.refreshBtn,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_ADDFINANCE),this.refreshBtn,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_COLLECT),this.refreshStorageCollect,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_REFRESH_COUNT,this.refresh,this);
		SoundManager.playEffect("effect_manage");
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_BUYFINANCE),this.refreshTraderRed,this);

		Api.rookieVoApi.checkNextStep();
		this.container.setPosition(this.container.x,this.getTitleButtomY());
		let bg:BaseLoadBitmap=BaseLoadBitmap.create("managebg");
		bg.height = 1136;
		bg.setPosition(0,GameConfig.stageHeigth-bg.height-30);
		this.addChildAt(bg,this.getChildIndex(this.container));
		let upresBg:BaseBitmap=BaseBitmap.create("manage_hengdi");
		// upresBg.width = 640
		// upresBg.height = 70;
		this.addChildToContainer(upresBg);
		/**
		 * 阅历建筑
		 */
		let list:ManageItemVo[]=Api.manageVoApi.getManageItemsVo();
		// let l=list.length;
		let maxV = list.length;
		if(Api.practiceVoApi.isPlayerPracticeEnable())
		{
			let fbuilding = BaseBitmap.create("manage_buildingpractice");
			let bpos = this.posCfg["practice"];
			fbuilding.setPosition(bg.x+bpos.x,bg.y+bpos.y);
			this.addChildAt(fbuilding,this.getChildIndex(bg)+1);
			if(Api.practiceVoApi.isPracticeBuildingUnlock())
			{
				maxV = 4;
			}
		}
		
		for(var i:number=0;i<maxV;i++)
		{
			this.getResIcons(i,this.container,upresBg);
		}
		let lastY:number=upresBg.y+upresBg.height+10+20;
		if(Number(Config.ManageCfg.getCrit[0])*Config.ManageCfg.getCrit[1]>0)
		{
			let param1:string=Config.ManageCfg.getCrit[0]*100+"%";
			let paramsStr:string[]=[param1,Config.ManageCfg.getCrit[1].toString()];
			let boomText:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("manageViewDesc1",paramsStr),TextFieldConst.FONTSIZE_CONTENT_SMALL);
			boomText.setPosition(10,upresBg.y+upresBg.height+10);
			this.addChildToContainer(boomText);
			lastY=boomText.y+boomText.height;
		}

		let container:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();


		let buttomY:number=0;
		container.setPosition(0,lastY+5);
		let firManItem:ManageItem =undefined;
		for(var i:number=0;i<maxV;i++)
		{
			let item:ManageItem=new ManageItem(i);
			// item.setPosition(0,i*(item.height+5));
			item.setPosition(this.posCfg[item.getType()].x,this.posCfg[item.getType()].y-container.y-this.container.y+bg.y);
			item.bindCallback(this.updateResNum,this,[i]);
			if(i == 0)
			{
				firManItem = item;
			}
			if(i == maxV-1)
			{
				container.addChildAt(item,container.getChildIndex(firManItem) )
			}else{
				container.addChild(item);
			}
			
			buttomY=item.y+item.height;
			this._manageItemList.push(item);

			//主线任务引导
			if(i!= 3 && !Api.rookieVoApi.isInGuiding && Api.mainTaskVoApi.getCurMainTaskId() == (i+1).toString() && !Api.mainTaskVoApi.isCurTaskReach()){
				ManageView._taskHand = BaseBitmap.create("guide_hand");
				// clickHand.skewY = 180;
				ManageView._taskHand.x = item.x + 100;
				ManageView._taskHand.y = item.y + 70;
				container.addChild(ManageView._taskHand);
				if(i == 0)
				{
					ManageView._taskHand.x = item.x + 170;
					ManageView._taskHand.y = item.y + 70;
				}else if(i == 1)
				{
					ManageView._taskHand.x = item.x + 230;
					ManageView._taskHand.y = item.y + 70;
				}else if(i == 2)
				{
					ManageView._taskHand.x = item.x + 30;
					ManageView._taskHand.y = item.y + 70;
				}

				egret.Tween.get(ManageView._taskHand,{loop:true})
					.to({y:ManageView._taskHand.y +35,scaleX:1.3,scaleY:1.3}, 500)
					.to({y:ManageView._taskHand.y ,scaleX:1.0,scaleY:1.0}, 500)
			}
		}
		this.addChildToContainer(container);
		

		let bottom:BaseBitmap = BaseBitmap.create("arena_bottom");
		bottom.height = 100
		bottom.y = GameConfig.stageHeigth - this.container.y - bottom.height;
		this.addChildToContainer(bottom);

		if(Api.switchVoApi.checkAutoResManage())
		{
			let rechBg:BaseBitmap=BaseBitmap.create("public_9v_bg02");
			this.addChildToContainer(rechBg);
			let reachText:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("manageReachUnlockDesc",[egret.toColorString(TextFieldConst.COLOR_QUALITY_ORANGE),LanguageManager.getlocal("vipDesc")+Config.ManageCfg.needVip,egret.toColorString(TextFieldConst.COLOR_WARN_GREEN2),LanguageManager.getlocal("officialTitle"+Config.ManageCfg.needLv)]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			reachText.setPosition(20,GameConfig.stageHeigth-this.container.y-reachText.height-30);
			this.addChildToContainer(reachText);
			rechBg.width=GameConfig.stageWidth-20;
			rechBg.height=reachText.height+20;
			rechBg.setPosition(reachText.x-10,reachText.y-10);
			if(Api.manageVoApi.checkAutoRes()==false)
			{
				let rechargebtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"sysRecharge",()=>{
					ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
				},this);
				rechargebtn.setPosition(container.width-rechargebtn.width-70,reachText.y+(reachText.height-rechargebtn.height)/2);
				this.addChildToContainer(rechargebtn);
				reachText.width=rechargebtn.x-reachText.x*2;
				rechBg.width=reachText.width+20;
				if(Api.switchVoApi.checkClosePay()||PlatformManager.checkHideIconByIP())
				{
					rechargebtn.visible=false;
				}
			}
		}

		////聊天按钮相关
		let tiptxtbg = BaseBitmap.create(ResourceManager.getRes("mainui_chatbg"));
		tiptxtbg.width = GameConfig.stageWidth;
		tiptxtbg.height = 40;
		tiptxtbg.x=GameConfig.stageWidth/2 -tiptxtbg.width/2 ;
		tiptxtbg.y= GameConfig.stageHeigth-200;
		this.addChildToContainer(tiptxtbg);
		
		let tiptxt:BaseTextField =ComponentManager.getTextField("0",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		tiptxt.text = LanguageManager.getlocal("manage_tiptxt");
		tiptxt.setPosition(GameConfig.stageWidth/2 - tiptxt.width/2,tiptxtbg.y + tiptxtbg.height/2 - tiptxt.height/2);
		this.addChildToContainer(tiptxt);
		

		//是否解锁一键经营
		if(Api.playerVoApi.getPlayerLevel()>= Config.ManageCfg.autoNeedLv)
		{
			let onekeyManage_btn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"onekeymanageBtn",this.onekeyManageHandler,this);
			onekeyManage_btn.setPosition(GameConfig.stageWidth/2-onekeyManage_btn.width/2,GameConfig.stageHeigth-140);
			this._onekeyManage_btn =onekeyManage_btn;
			this.addChildToContainer(onekeyManage_btn);
		}
		else
		{
			let manageDesTex:BaseTextField =ComponentManager.getTextField("0",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
			manageDesTex.text = LanguageManager.getlocal("manageDes");
			this.addChildToContainer(manageDesTex);
			manageDesTex.setPosition(GameConfig.stageWidth/2 - manageDesTex.width/2,GameConfig.stageHeigth-120);
		}
		this.refreshBtn();

		if(Api.switchVoApi.checkOpenManageTrader()){
			let manage_trader_icon =  ComponentManager.getButton("manage_trader_icon","",this.tradeHandler,this);
			manage_trader_icon.x = GameConfig.stageWidth - manage_trader_icon.width/2 - 60;
			manage_trader_icon.y = GameConfig.stageHeigth - manage_trader_icon.height - 10 - this.container.y;
			this._manage_trader_icon = manage_trader_icon;
			this.addChildToContainer(manage_trader_icon);

			let manage_trader_word =  BaseBitmap.create("manage_trader_word");
			manage_trader_word.x = manage_trader_icon.x + manage_trader_icon.width/2 - manage_trader_word.width/2;
			manage_trader_word.y = manage_trader_icon.y + manage_trader_icon.height - manage_trader_word.height;
			this.addChildToContainer(manage_trader_word);

			if(Api.manageVoApi.isShowTraderRed()){
				App.CommonUtil.addIconToBDOC(this._manage_trader_icon);
			}else{
				App.CommonUtil.removeIconFromBDOC(this._manage_trader_icon);
			}
		}
		// "manage_trader_icon",
        //     "",
	}

	protected tradeHandler()
	{
		if( (PlatformManager.checkIsWxCfg()) &&  Api.playerVoApi.getPlayerVipLevel() < 4){
            App.CommonUtil.showTip(LanguageManager.getlocal("bookroom_strenthen_vip4Tip"));
            return;
        }
		ViewController.getInstance().openView(ViewConst.POPUP.MANAGETRADEPOPUPVIEW,{});
	}

	private refreshBtn():void
	{
		
		let manageNum =Api.manageVoApi.isOnekeyManage();
		if(this._onekeyManage_btn)
		{
			if(manageNum==0)
			{
				App.DisplayUtil.changeToNormal(this._onekeyManage_btn);

			}else
			{
				App.DisplayUtil.changeToGray(this._onekeyManage_btn);
			}
		}

	}
	private onekeyManageHandler():void
	{
		let manageNum =Api.manageVoApi.isOnekeyManage();
		if(manageNum==0)
		{	
		
			App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_BATCHDEALFINANCE),this.refreshHandler,this);
			NetManager.request(NetRequestConst.REQUEST_MANAGE_BATCHDEALFINANCE,{});
		}
		else if(manageNum==1)
		{
			if(Api.manageVoApi.getReapSoldier()<1)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("manageNoEnoughFoodMsg"));
				return;
			}
		}
		else
		{	
			App.CommonUtil.showTip(LanguageManager.getlocal("manageDes2"));
		} 
	}

	public refreshHandler(event?:egret.Event):void
	{	
		if(event.data.data.data)
		{
			ManageView.ONEKEY_BOO =true;
			let data = event.data.data.data;
			let resName:string;
			let params:any[]=[];
		 
			if(data.luckys&& data.luckys[0])
			{
				this._luckBoo =true;
				this._luckysArr =data.luckys;
			} 
			else
			{
				this._luckBoo =false;
			}

			if(data.type1Num>0)
			{
				resName="public_icon2";
				let index =0;

				this._num1=data.type1Num;
				this.playManageAnimation(data.type1Num,resName,index);
			}
			 if(data.type2Num>0)
			{
				this._num2=data.type2Num;
				resName="public_icon3";
				let index =1;
				this.playManageAnimation(data.type2Num,resName,index);
			}
			 if(data.type3Num>0)
			{
				this._num3=data.type3Num;
				this._manageSoldierNums = data.manageSoldierNums;
				resName="public_icon4";
				let index =2;
				var currNum =(Api.manageVoApi.getReapSoldier().toString());
				
				this.playManageAnimation(data.type3Num,resName,index);
				 
			
			}

			 if(data.type4Num>0)
			{
				this._num4=data.type4Num;
				// this._manageSoldierNums = data.manageSoldierNums;
				resName="public_icon12";
				let index =3;
				Api.practiceVoApi.setBatchNum(this._num4);
				// var currNum =(Api.manageVoApi.getReapSoldier().toString());
				
				this.playManageAnimation(data.type4Num,resName,index);
				 
			
			}
			this.refresh();
		}
	}
	private playManageAnimation(num,resName:string='',index:number=0):void
	{
		let _point= this._manageItemList[index].getManageBtnPoint();
		App.CommonUtil.showCollectEffect(resName,_point,ManageView.flyEndPoint[index],function()
		{	
			if(index==0)
			{
				this.updateResNum(index,num,this._luckBoo,true);
			}
			else
			{
				this.updateResNum(index,num,this._luckBoo,false);
			}
		},this);
	}

	private playLucky():void
	{
		let boomPic:BaseBitmap = BaseBitmap.create("manage_boomtext");
		boomPic.anchorOffsetX=boomPic.width/2;
		boomPic.anchorOffsetY=boomPic.height/2;
		let picX = 500;
		let picY = 250;
		boomPic.setPosition(picX,picY);
		LayerManager.msgLayer.addChild(boomPic);
		egret.Tween.get(boomPic).to({scaleX:1.1,scaleY:1.1},50).to({scaleX:1,scaleY:1},70).to({y:picY-50,alpha:0.7},600).call(function(boomPic:BaseTextField){
			boomPic.dispose();
		}.bind(this,boomPic),this);
		App.CommonUtil.showGodbless("manage");
	}

	private getResIcons(index:number,container:egret.DisplayObjectContainer,positionObj:egret.DisplayObject):void
	{
		let resbgPath = "public_hb_bg01";
		let diffX = 200;
		if(Api.practiceVoApi.isPlayerPracticeEnable())
		{
			resbgPath = "public_hb_bg01";
			diffX = 160;
		}
		let resBg:BaseBitmap=BaseBitmap.create(resbgPath);
		resBg.width = 180
		resBg.setPosition(20+index*diffX,positionObj.y+(positionObj.height-resBg.height)/2);
		container.addChild(resBg);
		let resName:string;
		let resNum:string;
		let type:string;
		if(index==0)
		{
			resName="public_icon2";
			resNum=Api.playerVoApi.getPlayerGoldStr();
			type="gold"
		}
		else if(index==1)
		{
			resName="public_icon3";
			resNum=Api.playerVoApi.getFoodStr();
			type="food";
		}
		else if(index==2)
		{
			resName="public_icon4";
			resNum=Api.playerVoApi.getSoldierStr();
			type="soldier";
		}
		else if(index==3)
		{
			resName="public_icon12";
			resNum= Api.practiceVoApi.geExp() + "";
			type="practice";
		}
		let resIcon:BaseBitmap=BaseBitmap.create(resName);
		resIcon.setPosition(resBg.x,resBg.y+(resBg.height-resIcon.height)/2-3);
		container.addChild(resIcon);
		let resNumText:BaseTextField=ComponentManager.getTextField(resNum.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		resNumText.setPosition(resIcon.x+resIcon.width + 10,resBg.y+(resBg.height-resNumText.height)/2);
		container.addChild(resNumText);
		this["_"+type+"NumText"]=resNumText;
		if(ManageView.flyEndPoint.length<1)
		{
			egret.callLater(function(){
				ManageView.flyEndPoint.push(resBg.localToGlobal(0,0));
			},this);
		}
	}

	private updateResNum(index?:number,num?:number,isBoom?:boolean,isOnekeyBoo?:boolean):void
	{
		 
		if(!this._foodNumText)
		{
			return;
		}
		if(!isNaN(index))
		{
			let type = "practice";
			if(index!= 3)
			{
				let list = Api.manageVoApi.getManageItemsVo();
			 	type=list[index].type;
			}
			let refreshText:BaseTextField=this["_"+type+"NumText"];
			if(refreshText)
			{
				let resName:string;
				if(index==0)
				{
					resName="itemicon2";
				}
				else if(index==1)
				{
					resName="itemicon3";
				}
				else if(index==2)
				{
					resName="itemicon4";
				}
				else if(index==3)
				{
					resName="public_icon12";
				}
				let lastValue:number=Number(refreshText.text);
				if(type=="practice")
				{
					refreshText.text= "" + Api.practiceVoApi.geExp();
				}
				else if(type=="gold")
				{
					refreshText.text=Api.playerVoApi.getPlayerGoldStr().toString();
				}
				else if(type=="soldier")
				{
					refreshText.text=Api.playerVoApi.getSoldierStr();
				}
				else
				{
					refreshText.text=Api.playerVoApi["get"+App.StringUtil.firstCharToUper(type)]().toString();
				}
				let offValue:number=0;
				if(!isNaN(num))
				{
					offValue=num;
				}
				else
				{
					offValue=Number(refreshText.text)-lastValue;
				}

				if(isBoom){
					offValue = Math.floor(offValue/Config.DailyluckCfg.getManageTimes());
					if(isOnekeyBoo)
					{
						if(this._luckysArr.length>=1)
						{
							let num =0;
							let ths =this;
							let timerNum:number =egret.setInterval(()=> 
							{
								num+=1;
								this.playLucky();
								if(num>=this._luckysArr.length)
								{
									egret.clearInterval(timerNum);
								}
									
							} ,ths, 1500,1);
						}
					}
				}
				let showValue:string=Number(offValue)>0?"+"+offValue:String(offValue);
				let actions = new Array<any>();
				if(isBoom&&index==0){
					actions=[];
					let showValue =Api.manageVoApi.getReapGold().toString();
					 
					if(this._luckysArr&&this._luckysArr.length>=1)
					{
						for(var index =0; index<this._luckysArr.length;index++)
						{
							for(var j:number=0;j<this._luckysArr[index];j++)
							{
								actions.push({icon:resName,tipMessage:showValue});
							}
						}
						//加上原有非暴击应该飘浮的次数
						for(var i:number=0;i<this._num1;i++)
						{
							actions.push({icon:resName,tipMessage:showValue});
						}
					}
					else if(isBoom)
					{	
						actions=[];
						let showValue =Api.manageVoApi.getReapGold().toString();
						//单独暴击
						for(var j:number=0;j<10;j++)
						{ 	
							actions.push({icon:resName,tipMessage:showValue});
						}
					}
				}
				else
				{	
					actions=[];
					// showValue 飘多少次
					if(ManageView.ONEKEY_BOO==true)
					{	var currNum:string="";
						if(index==0)
						{
							currNum =(Api.manageVoApi.getReapGold().toString());
							for(var j:number=0;j<this._num1;j++)
							{
								actions.push({icon:resName,tipMessage:currNum});
							}
						}
						if(index==1)
						{
							currNum =(Api.manageVoApi.getReapFood().toString());
							for(var j:number=0;j<this._num2;j++)
							{
								actions.push({icon:resName,tipMessage:currNum});
							}
						}
						else if(index==2)
						{	
							//_manageSoldierNums //每次士兵次数
							for(var j:number=0;j<this._num3;j++)
							{
								if(this._manageSoldierNums[j])
								{
									currNum =this._manageSoldierNums[j].toString();
								} 
								actions.push({icon:resName,tipMessage:currNum});
							} 
						}
						else if(index==3)
						{	
							currNum ="" + num;
							actions.push({icon:resName,tipMessage:currNum});
						}
					}
					//经营
					else
					{
						actions.push({icon:resName,tipMessage:showValue});
					}
				}
				
				App.CommonUtil.playRewardFlyAction(actions,refreshText.localToGlobal(0 + 30,0) ,600);
			}
		}
		else
		{
			this._goldNumText.text=Api.playerVoApi.getPlayerGoldStr().toString();
			this._soldierNumText.text=Api.playerVoApi.getSoldierStr().toString();
		}
		this._foodNumText.text=Api.playerVoApi.getFoodStr().toString();
		if(this._practiceNumText)
		{
			this._practiceNumText.text=Api.practiceVoApi.geExp().toString();
		}
		
	}

	private refresh():void
	{
		this.updateResNum();
		let l:number=this._manageItemList.length;
		for(var i:number=0;i<l;i++)
		{
			this._manageItemList[i].refresh();
		}

		let manageNum =Api.manageVoApi.isOnekeyManage();

		if(this._onekeyManage_btn)
		{
			 this.refreshBtn();
		}
		
	}

	private tick():void
	{
		let l:number=this._manageItemList.length;
		for(var i:number=0;i<l;i++)
		{
			let tmpResult:boolean=this._manageItemList[i].tick();
			if(tmpResult&&this.isRefreshing==false)
			{
				this.isRefreshing=true;
				let reqData=this.getRequestData();
				this.request(reqData.requestType,reqData.requestType);
			}
		}
	}


	public hide():void
	{
		if(Api.rookieVoApi.isInGuiding){
			// Api.rookieVoApi.checkWaitingGuide();
			Api.rookieVoApi.checkNextStep();
		}
		
		super.hide();
	}
	private showHand()
	{
		this._clickHand = BaseBitmap.create("guide_hand");
		this._clickHand.skewY = 180;
		this._clickHand.x = 620;
		this._clickHand.y = 50;
		this.addChild(this._clickHand);

		egret.Tween.get(this._clickHand,{loop:true})
				.to({scaleX: 0.9,scaleY:0.9}, 500)
				.to({scaleX: 1,scaleY:1}, 500)
	}

	 protected refreshTraderRed(event:egret.Event)
	{
		let ret = event.data.data.ret;
		if(ret == 0 && this._manage_trader_icon){
            if(Api.manageVoApi.isShowTraderRed()){
				App.CommonUtil.addIconToBDOC(this._manage_trader_icon);
			}else{
				App.CommonUtil.removeIconFromBDOC(this._manage_trader_icon);
			}

			this._goldNumText.text=Api.playerVoApi.getPlayerGoldStr();
			this._soldierNumText.text=Api.playerVoApi.getSoldierStr();
			this._foodNumText.text=Api.playerVoApi.getFoodStr();
        }
    }

	protected getResourceList():string[]
	{
		return super.getResourceList().concat( [

			"guide_hand",
			// "manage_foodname","manage_goldname","manage_namebg","manage_soldiername","manage_boomtext","btn_manage_normal","btn_manage_red",
			"arena_bottom",
			"guide_hand",
			// "manage_recoverytxt","manage_managetxt","manage_waittime",
			// "manage_buildingpractice","manage_practicename",
			// "manage_practice_collect","manage_practice_full",
			"activity_dazhe_01",
			// ,"manage_hengdi","manage_dix",
			"manage_trader_icon",
            "manage_trader_word",
			"manage_boomtext",
		]);
	}
	public dispose():void
	{
		Api.mainTaskVoApi.hideGuide();
		if(this._clickHand){
			egret.Tween.removeTweens(this._clickHand);
			this._clickHand = null;
		}	
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND,this.showHand,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_BATCHDEALFINANCE),this.refreshHandler,this);

		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_DEALFINANCE),this.refreshBtn,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_ADDFINANCE),this.refreshBtn,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_COLLECT),this.refreshStorageCollect,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_BUYFINANCE),this.refreshTraderRed,this);

		this._soldierNumText=null;
		this._goldNumText=null;
		this._foodNumText=null;
		this._practiceNumText = null;
		this._isFirstRequest=true;
		this.isRefreshing=false;
		this._manageItemList.length=0;
		this._onekeyManage_btn = null;
		this._luckBoo =false;
		this._luckysArr=[];
		this._num3 =0;
		this._num2 =0;
		this._num1 =0; 
		this._manageSoldierNums =[];
		ManageView._taskHand = null;
		this._clickHand = null;
		this._isCfgInit=false;
		this._manage_trader_icon = null;

		super.dispose();
	}
	
}

class ManageItem extends BaseDisplayObjectContainer
{
	private _manageItemVo:ManageItemVo;
	private _leftTimeText:BaseTextField;
	private _leftNumText:BaseTextField;
	private _curText:BaseTextField;
	private _willText:BaseTextField;
	private _needText:BaseTextField;
	private _manageBtn:BaseButton;
	// private _recoveryBtn:BaseButton;
	private _index:number;
	private _bindCallback:Function;
	private _bindCallbackThisObj:any;
	private _bindCallbackParams:any[];
	// private _needCheckClickList:egret.DisplayObject[]=[];
	private _npc:BaseBitmap;
	private _manageStatusBmp:BaseBitmap;
	private _waitTimeBg:BaseBitmap;
	private _btnContainer:BaseDisplayObjectContainer;
	private _btnRedBtn:BaseButton;
	
	public constructor(index:number)
	{
		super();
		this.init(index);
	}

	public bindCallback(callback:Function,callbackThisObj:any,callbackParams?:any[]):void
	{
		this._bindCallback=callback;
		this._bindCallbackThisObj=callbackThisObj;
		this._bindCallbackParams=callbackParams;
	}

	public init(index:number):void
	{
		this.addTouch(this.onNPCTouchHandler,this,null,true);
		this._index=index;
		/**
		 * 修身
		 */
		if(this._index == 3)
		{
			// App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_COLLECT),this.refresh,this);
		}else{
			App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_DEALFINANCE),this.refresh,this);
			let msgEventType:string=NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_ADDFINANCE);
			App.MessageHelper.addEventListener(msgEventType,this.refresh,this);
		}
		if(!this._manageItemVo )
		{
			if(this._index < 3){
				this._manageItemVo=Api.manageVoApi.getManageItemsVo()[index];
			}else
			{
				this._manageItemVo = new ManageItemVo();
				this._manageItemVo.type = "practice";
				this._manageItemVo.num = Api.practiceVoApi.getStorageInfo().num;
				// this._manageItemVo.maxNum = 0;
			}
		}

		let leftX:number=40;
		let bg:BaseBitmap = BaseLoadBitmap.create("managenpc"+this._manageItemVo.type);
		// bg.width=628;
		bg.setScale(4);
		bg.alpha=0;
		bg.addTouchTap
		this.addChild(bg);
		this._npc=bg;

		let txtBg:BaseBitmap=BaseBitmap.create("manage_dix");

		txtBg.setPosition(80,200);
		if(index==1)
		{
			txtBg.setPosition(140,120);
		}
		if(index==2)
		{
			txtBg.setPosition(10,120);
		}
		if(index==3)
		{
			txtBg.setPosition(20,100);
		}
		

		this.addChild(txtBg);

		let nameBg:BaseBitmap=BaseBitmap.create("activity_dazhe_01");
		if(PlatformManager.checkIsTextHorizontal()){
			// if(index != 2){
			// 	txtBg.y = txtBg.y +35;
			// }
			
			nameBg.setPosition(txtBg.x + 5,txtBg.y-29);
			
			// nameBg.setPosition(txtBg.x + txtBg.width / 2 - nameBg.width/2,txtBg.y-35);
		} else {

			nameBg.setPosition(txtBg.x-5,txtBg.y-2);
		}

		
		this.addChild(nameBg);

		
		let nameUrl:string="manage_"+this._manageItemVo.type+"name";
		let namePic:BaseBitmap=BaseBitmap.create(nameUrl);
		if(PlatformManager.checkIsTextHorizontal()){
			namePic.setPosition(nameBg.x+(nameBg.width-namePic.width)/2 ,nameBg.y+(nameBg.height-namePic.height)/2);

		} else {
			namePic.setPosition(nameBg.x+(nameBg.width-namePic.width)/2,nameBg.y+(nameBg.height-namePic.height)/2-17);

		}
		this.addChild(namePic);

		let textSpaceY:number=10;
		txtBg.height=76;
		let showNumStr:string;
		let txtMaxW:number=0;
		if(index==0)
		{
			showNumStr = App.StringUtil.changeIntToText(Api.playerVoApi.getInte())
		}
		else if(index==1)
		{
			showNumStr = App.StringUtil.changeIntToText(Api.playerVoApi.getPolitics());
		}
		else if(index==2)
		{
			showNumStr = App.StringUtil.changeIntToText(Api.playerVoApi.getCharm());
		}
		else if(index==3)
		{
			showNumStr = "";
		}


		let curText:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("manage"+this._manageItemVo.type+"CurName",[showNumStr]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		
		if(PlatformManager.checkIsTextHorizontal()){
			curText.setPosition(txtBg.x + 15,txtBg.y+textSpaceY+5);
		} else {
			curText.setPosition(txtBg.x+nameBg.width,txtBg.y+textSpaceY+5);
		}
		
		this.addChild(curText);
		if(curText.width>txtMaxW)
		{
			txtMaxW=curText.width;
		}

		this._curText=curText;

		let willStr:string;
		let willParams:string[]=[];
		if(index==0)
		{
			willParams.push(App.StringUtil.changeIntToText(Api.manageVoApi.getReapGold()));
			willStr=LanguageManager.getlocal("manageWillGetRes",willParams);
		}
		else if(index==1)
		{
			willParams.push(App.StringUtil.changeIntToText(Api.manageVoApi.getReapFood()));
			willStr=LanguageManager.getlocal("manageWillGetRes",willParams);
		}
		else if(index==2)
		{
			willParams.push(App.StringUtil.changeIntToText(Api.manageVoApi.getReapSoldier()));
			willStr=LanguageManager.getlocal("manageWillGetSoldier",willParams);
		}else if(index==3)
		{
			// willParams.push(Api.manageVoApi.getReapSoldier().toString());
			// willStr=LanguageManager.getlocal("manageWillGetSoldier",willParams);
			willParams.push("");
			willStr = ""+ Api.practiceVoApi.getRealSpd();
		}

		let willText:BaseTextField=ComponentManager.getTextField(willStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN2);
		willText.setPosition(curText.x,curText.y+curText.height+textSpaceY);
		this.addChild(willText);
		this._willText=willText;
		if(willText.width>txtMaxW)
		{
			txtMaxW=willText.width;
		}

		if(index==2)
		{
			let needText:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("manageCostFood",[App.StringUtil.changeIntToText(Api.manageVoApi.getNeedFood())]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_RED2);
			needText.setPosition(curText.x,willText.y+willText.height+textSpaceY);
			this.addChild(needText);
			this._needText=needText;
			if(needText.width>txtMaxW)
			{
				txtMaxW=needText.width;
			}
			txtBg.height=105;
		}

		/**
		 * 修身的特殊处理
		 */
		if(index==3)
		{
			willText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
			willText.x = curText.x + curText.width/2 - willText.width/2;
		}
		if(PlatformManager.checkIsTextHorizontal())
		{
			txtBg.width=txtMaxW+30;
		} else {
			txtBg.width=txtMaxW+nameBg.width+15;
		}
		


		let btn:BaseButton=ComponentManager.getButton("btn_manage_normal","",()=>{},this,[index]);
		// btn.setPosition(txtBg.x+(txtBg.width-btn.width)/2,-btn.height+30);
		// this.addChild(btn);
		this._manageBtn=btn;
		let btnContainer:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
		btnContainer.addChild(btn);
		btn.setPosition(-btn.width/2,-btn.height);
		btnContainer.setPosition(txtBg.x+txtBg.width/2,30);

		if(this._index == 0)
		{

			btnContainer.x = txtBg.x+txtBg.width/2 + 10;
			btnContainer.y = 100;
		}
		if(this._index == 1)
		{
			btnContainer.x = txtBg.x+txtBg.width/2 + 10;
		}
		else if(this._index == 2)
		{
			if(PlatformManager.checkIsTextHorizontal()){
				btnContainer.x = txtBg.x+txtBg.width/2 - 40;
			} else {
				btnContainer.x = txtBg.x+txtBg.width/2 - 50;
			}
			
		}
		else if(this._index == 3)
		{
			btnContainer.y = 50;
		}
		this.addChild(btnContainer);
		this._btnContainer=btnContainer;
		
		let waitBg:BaseBitmap=BaseBitmap.create("manage_waittime");
		waitBg.setPosition(btnContainer.x-btn.width/2-30,btn.y+btn.height+20);
		if(this._index == 0)
		{
			waitBg.y = waitBg.y + 80;
		}
		if(this._index == 2){
			waitBg.x = waitBg.x + 20;
		}
		this.addChild(waitBg);
		this._waitTimeBg=waitBg;

		this._leftTimeText=ComponentManager.getTextField(this._manageItemVo.num+"/"+this._manageItemVo.maxNum,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
		this._leftTimeText.setPosition(waitBg.x+53,waitBg.y+(waitBg.height-this._leftTimeText.height)/2+1);
		// this._leftTimeText.bindData=txtBg.x+txtBg.width/2;
		this.addChild(this._leftTimeText);

		this.setManageStatus();

		this.tick();
	}

	private setManageStatus():void
	{
		if(this._index == 3)
		{
			this._waitTimeBg.visible = false;
			this._leftTimeText.visible = false;
			if(this._btnContainer&&this._btnContainer.name!="add")
			{
				egret.Tween.removeTweens(this._btnContainer);
				this._btnContainer.name="add";
				this._btnContainer.setScale(1);
				this._btnContainer.rotation=0;
				egret.Tween.get(this._btnContainer,{loop:true}).to({rotation:10},100).to({rotation:-8},200).to({rotation:5},130).to({rotation:-3},80).to({rotation:0},30).wait(500);
			}
			let statusResName = "manage_practice_collect";
			if(Api.practiceVoApi.isStoregeFull())
			{
				statusResName = "manage_practice_full";
			}
			if(!this._manageStatusBmp)
			{
				this._manageStatusBmp=BaseBitmap.create(statusResName);
				this._manageStatusBmp.x = this._manageBtn.width/2 - this._manageStatusBmp.width/2-2;
				this._manageStatusBmp.y = this._manageBtn.height/2 - this._manageStatusBmp.height/2-5;
				this._manageBtn.addChild(this._manageStatusBmp);
			}
			return;
		}
		let statusResName:string;
		if(this._manageItemVo.num>0)
		{
			if(this._btnContainer&&this._btnContainer.name!="add")
			{
				egret.Tween.removeTweens(this._btnContainer);
				this._btnContainer.name="add";
				this._btnContainer.setScale(1);
				this._btnContainer.rotation=0;
				egret.Tween.get(this._btnContainer,{loop:true}).to({rotation:10},100).to({rotation:-8},200).to({rotation:5},130).to({rotation:-3},80).to({rotation:0},30).wait(500);
			}
			statusResName="manage_managetxt";
			if(this._waitTimeBg)
			{
				this._waitTimeBg.visible=false;
				this._leftTimeText.visible=false;
			}
			if(this._btnRedBtn)
			{
				this._btnRedBtn.visible=false;
			}
		}
		else
		{
			if(ManageView._taskHand){
				ManageView._taskHand.visible = false;
			}
			if(this._btnContainer&&this._btnContainer.name!="scale")
			{
				egret.Tween.removeTweens(this._btnContainer);
				this._btnContainer.name="scale";
				this._btnContainer.setScale(1);
				this._btnContainer.rotation=0;
				egret.Tween.get(this._btnContainer,{loop:true}).to({scaleX:1.05,scaleY:1.05},500).to({scaleX:0.95,scaleY:0.95},1000).to({scaleX:1,scaleY:1},300);
			}
			if(this._waitTimeBg)
			{
				this._waitTimeBg.visible=true;
				this._leftTimeText.visible=true;
			}
			statusResName="manage_recoverytxt";
			if(!this._btnRedBtn)
			{
				this._btnRedBtn=ComponentManager.getButton("btn_manage_red","",()=>{},this);
				this._manageBtn.addChildAt(this._btnRedBtn,1);
			}
			else
			{
				this._btnRedBtn.visible=true;
			}
		}
		if(!this._manageStatusBmp)
		{
			this._manageStatusBmp=BaseBitmap.create(statusResName);
			this._manageBtn.addChild(this._manageStatusBmp);
		}
		else
		{
			this._manageStatusBmp.texture=ResourceManager.getRes(statusResName);
		}
		if(this._manageItemVo.num>0)
		{
			this._manageStatusBmp.setPosition((this._manageBtn.width-this._manageStatusBmp.width)/2+2,45);
		}
		else
		{
			this._manageStatusBmp.setPosition((this._manageBtn.width-this._manageStatusBmp.width)/2+2,30);
		}
		if(!this._leftNumText)
		{
			this._leftNumText=ComponentManager.getTextField(this._manageItemVo.num+"/"+this._manageItemVo.maxNum,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN2);
			this._manageBtn.addChild(this._leftNumText);
		}
		else
		{
			this._leftNumText.text=this._manageItemVo.num+"/"+this._manageItemVo.maxNum;
		}
		this._leftNumText.setPosition((this._manageBtn.width-this._leftNumText.width)/2+2,this._manageStatusBmp.y-this._leftNumText.height+2);
		this._leftNumText.visible=this._manageItemVo.num>0;
	}

	private onNPCTouchHandler(e:egret.TouchEvent):void
	{
		if(e.type!=egret.TouchEvent.TOUCH_BEGIN&&e.type!=egret.TouchEvent.TOUCH_CANCEL&&e.type!=egret.TouchEvent.TOUCH_END)
		{
			return;
		}
		if(e.type==egret.TouchEvent.TOUCH_BEGIN)
		{
			this._npc.alpha=0.3;
		}
		else if(e.type==egret.TouchEvent.TOUCH_CANCEL)
		{
			this._npc.alpha=0;
		}
		if(e.type==egret.TouchEvent.TOUCH_END)
		{
			this._npc.alpha=0;
			this.manageHandler(this._index);
		}
	}

	public getManageBtnPoint():egret.Point
	{
		let _point =new egret.Point();
		if(this._manageBtn){
			_point = this._manageBtn.localToGlobal(this._manageBtn.width/2,this._manageBtn.height/2);
		}
		return _point
	}
	
	public tick():boolean
	{
		if( this._index == 3)
		{
			if(this._manageBtn)
			{
				this._manageBtn.visible = Api.practiceVoApi.isCollectEnable();
			}
			if(this._manageStatusBmp)
			{
				let statusResName = "manage_practice_collect";
				if(Api.practiceVoApi.isStoregeFull())
				{
					statusResName = "manage_practice_full";
				}
				this._manageStatusBmp.texture = ResourceManager.getRes(statusResName);
			}
			return false;
		}
		if(this._manageItemVo.need_time>0 )
		{
			if(this._manageItemVo.num<1)
			{
				let leftTimt:number=Math.max(0,this._manageItemVo.need_time+this._manageItemVo.st-GameData.serverTime);
				if(leftTimt>=0)
				{
					this._leftTimeText.text = App.DateUtil.getFormatBySecond(leftTimt);
					// this._leftTimeText.x=this._leftTimeText.bindData-this._leftTimeText.width/2
				}
			}
			if(GameData.serverTime-this._manageItemVo.need_time-this._manageItemVo.st>=0)
			{
				let result:boolean=false;
				//请求刷新
				if(this._manageItemVo.num>=this._manageItemVo.maxNum)
				{
					if(Api.manageVoApi.checkAutoRes())
					{
						result=true;
					}
					else
					{
						result=false;
					}
				}
				else
				{
					result=true;
				}
				return result;
			}
		}
		return false;
	}

	public refresh(event?:egret.Event):void
	{
		if(event )
		{
			if(event.type==NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_DEALFINANCE)&&ManageItem._selectIndex==this._index)
			{
				
				Api.rookieVoApi.checkNextStep();
				let resName:string;
				let picX = 500;
				let picY = 0;
				if(this._index==0)
				{
					resName="public_icon2";
					picY = 350;
				}
				else if(this._index==1)
				{
					resName="public_icon3";
					picY = 580;
				}
				else if(this._index==2)
				{
					resName="public_icon4";
					picY = 820;
				}
				let eData:any=event.data?event.data.data:null;
				if(eData&&eData.data)
				{
					eData=eData.data;
				}
				let params:any[]=[]
				if(this._bindCallbackParams)
				{
					params=params.concat(this._bindCallbackParams);
					if(eData)
					{
						params.push(eData.typeNum);
					}
				}
				if(eData&&eData.lucky)
				{
					params.push(true);
					// let boomTxt:BaseTextField=ComponentManager.getTextField("+"+eData.typeNum,TextFieldConst.FONTSIZE_TITLE_BIG,TextFieldConst.COLOR_QUALITY_GREEN);
					// boomTxt.anchorOffsetX=boomTxt.width/2;
					// boomTxt.anchorOffsetY=boomTxt.height/2;
					// boomTxt.setPosition(GameConfig.stageWidth/2,GameConfig.stageHeigth/2)
					let boomPic:BaseBitmap = BaseBitmap.create("manage_boomtext");
					boomPic.anchorOffsetX=boomPic.width/2;
					boomPic.anchorOffsetY=boomPic.height/2;


					boomPic.setPosition(picX,picY)

					LayerManager.msgLayer.addChild(boomPic);
					egret.Tween.get(boomPic).to({scaleX:1.1,scaleY:1.1},50).to({scaleX:1,scaleY:1},70).to({y:picY-50,alpha:0.7},600).call(function(boomPic:BaseTextField){
						boomPic.dispose();
					}.bind(this,boomPic),this);

					App.CommonUtil.showGodbless("manage");
				}

				App.CommonUtil.showCollectEffect(resName,this._manageBtn.localToGlobal(this._manageBtn.width/2,this._manageBtn.height/2),ManageView.flyEndPoint[this._index],this._bindCallback,this._bindCallbackThisObj,params);
			}
			else if(event.type==NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_ADDFINANCE))
			{
				//使用征收令
			}

		}
		let {ret}=event?event.data:{ret:true};
		let eventType:string=event?event.type:null;
		if(ret ) //&& this._index != 3
		{
			if(eventType!=NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_DEALFINANCE))
			{
				let resNum:number= 0;
				if(this._index < 3)
				{
					resNum = Api.manageVoApi["getAuto"+App.StringUtil.firstCharToUper(Api.manageVoApi.getManageItemsVo()[this._index].type)]();
				}else{
					resNum = Api.practiceVoApi.getBatchNum();
					egret.log("resNum >>>>>> " + resNum);
					Api.practiceVoApi.setBatchNum(0);
				}
				
				if(resNum>0)
				{
					let resName:string;
					if(this._index==0)
					{
						resName="public_icon2";
					}
					else if(this._index==1)
					{
						resName="public_icon3";
					}
					else if(this._index==2)
					{
						resName="public_icon4";
					}
					else if(this._index==3)
					{
						resName="public_icon12";
					}
					let params:any[]=[]
					if(this._bindCallbackParams)
					{
						params=params.concat(this._bindCallbackParams);
					}
					params.push(resNum);
					App.CommonUtil.showCollectEffect(resName,this._manageBtn.localToGlobal(this._manageBtn.width/2,this._manageBtn.height/2),ManageView.flyEndPoint[this._index],this._bindCallback,this._bindCallbackThisObj,params);
				}
			}
			if(this._index == 3)
			{
				return;
			}	
			if(this._manageItemVo.num>0)
			{
				this._leftTimeText.text=this._manageItemVo.num+"/"+this._manageItemVo.maxNum;
				// this._leftTimeText.x=this._leftTimeText.bindData-this._leftTimeText.width/2
			}
			else
			{
				let leftTimt:number=Math.max(0,this._manageItemVo.need_time+this._manageItemVo.st-GameData.serverTime);
				this._leftTimeText.text=App.DateUtil.getFormatBySecond(leftTimt);
				// this._leftTimeText.x=this._leftTimeText.bindData-this._leftTimeText.width/2
			}
	
			let showNumStr:string="";
			if(this._index==0)
			{
				showNumStr = App.StringUtil.changeIntToText(Api.playerVoApi.getInte());
			}
			else if(this._index==1)
			{
				showNumStr = App.StringUtil.changeIntToText(Api.playerVoApi.getPolitics());
			}
			else if(this._index==2)
			{
				showNumStr = App.StringUtil.changeIntToText(Api.playerVoApi.getCharm());
			}
			// else if(this._index==3)
			// {
			// 	showNumStr = "100";
			// }
			this._curText.text = LanguageManager.getlocal("manage"+this._manageItemVo.type+"CurName",[showNumStr]);

			let willStr:string;
			let willParams:string[]=[];
			if(this._index==0)
			{
				willParams.push(App.StringUtil.changeIntToText(Api.manageVoApi.getReapGold()));
				willStr=LanguageManager.getlocal("manageWillGetRes",willParams);
			}
			else if(this._index==1)
			{
				willParams.push(App.StringUtil.changeIntToText(Api.manageVoApi.getReapFood()));
				willStr=LanguageManager.getlocal("manageWillGetRes",willParams);
			}
			else if(this._index==2)
			{
				willParams.push(App.StringUtil.changeIntToText(Api.manageVoApi.getReapSoldier()));
				willStr=LanguageManager.getlocal("manageWillGetSoldier",willParams);
			}
			// else if(this._index==3)
			// {
			// 	willParams.push(Api.manageVoApi.getReapSoldier().toString());
			// 	willStr=LanguageManager.getlocal("manageWillGetPractice",willParams);
			// }
			this._willText.text = willStr;

			if(this._needText)
			{
				let realNeedNum:number=Math.min(Api.manageVoApi.getNeedFood(),Api.playerVoApi.getFood());
				this._needText.text=LanguageManager.getlocal("manageCostFood",[App.StringUtil.changeIntToText(realNeedNum)]);
			}
			this.setManageStatus();
		}
	}
	
	private recoveryHandler(index:number):void
	{
		let itemId:string=Api.manageVoApi.getNeedItem();
		let hasNum:number=Api.itemVoApi.getItemNumInfoVoById(Number(itemId));
		if(hasNum>0)
		{
			
		
			
			if(hasNum < 5)
			{
				// NetManager.request(NetRequestConst.REQUEST_MANAGE_ADDFINANCE,{type:this._index+1,num:1});

				let extrashare = Api.otherInfoVoApi.getOtherInfo().info.extrashare;
				if(extrashare && extrashare.finance != 1 && Api.switchVoApi.checkOpenShareFinanceAndRecover()){
					
					ViewController.getInstance().openView(ViewConst.POPUP.SHARERECOVERPOPUPVIEW,{type:"a",index:this._index,itemId:itemId,hasNum:hasNum,callback:null,target:this});
				} else {
					NetManager.request(NetRequestConst.REQUEST_MANAGE_ADDFINANCE,{type:this._index+1,num:1});
				}


				// if(!Api.switchVoApi.checkOpenShareFinanceAndRecover()){
				// 	 NetManager.request(NetRequestConst.REQUEST_MANAGE_ADDFINANCE,{type:this._index+1,num:1});
				// } else {
				// 	let extrashare = Api.otherInfoVoApi.getOtherInfo().info.extrashare;
				// 	if(extrashare && extrashare.finance != 1){
				// 		ViewController.getInstance().openView(ViewConst.POPUP.SHARERECOVERPOPUPVIEW,{type:"a",index:this._index,itemId:itemId,hasNum:hasNum,callback:null,handler:this});
				// 	}
				// }
			}	
			else{
				let maxNum = this._manageItemVo.maxNum;
				
				let extrashare = Api.otherInfoVoApi.getOtherInfo().info.extrashare;
				if(extrashare && extrashare.finance != 1 && Api.switchVoApi.checkOpenShareFinanceAndRecover()){
					ViewController.getInstance().openView(ViewConst.POPUP.SHARERECOVERPOPUPVIEW,{type:"a",index:this._index,itemId:itemId,hasNum:hasNum,maxNum:maxNum,callback:this.usePropHandler,target:this});


				} else {
					ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSEPOPUPVIEW,{itemId:itemId,hasNum:hasNum,callback:this.usePropHandler,handler:this});
				}

				// if(!Api.switchVoApi.checkOpenShareFinanceAndRecover()){
				// 	ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSEPOPUPVIEW,{itemId:itemId,hasNum:hasNum,callback:this.usePropHandler,handler:this});
				// } else {
				// 	let extrashare = Api.otherInfoVoApi.getOtherInfo().info.extrashare;
				// 	if(extrashare && extrashare.finance != 1){
				// 		ViewController.getInstance().openView(ViewConst.POPUP.SHARERECOVERPOPUPVIEW,{type:"a",index:this._index,itemId:itemId,hasNum:hasNum,maxNum:maxNum,callback:this.usePropHandler,handler:this});
				// 	}
				// }
			}
		}
		else
		{
			// App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));

			let extrashare = Api.otherInfoVoApi.getOtherInfo().info.extrashare;
			if(extrashare && extrashare.finance != 1 && Api.switchVoApi.checkOpenShareFinanceAndRecover()){
				ViewController.getInstance().openView(ViewConst.POPUP.SHARERECOVERPOPUPVIEW,{type:"a",index:this._index,itemId:itemId,hasNum:hasNum,callback:null,target:this});

			} else {
				ViewController.getInstance().openView(ViewConst.POPUP.ITEMJUMPPOPUPVIEW,{itemId:itemId,callback:null,handler:this});
			}

			// if(!Api.switchVoApi.checkOpenShareFinanceAndRecover()){
			// 	ViewController.getInstance().openView(ViewConst.POPUP.ITEMJUMPPOPUPVIEW,{itemId:itemId,callback:null,handler:this});
			// } else {
			// 	let extrashare = Api.otherInfoVoApi.getOtherInfo().info.extrashare;
			// 	if(extrashare && extrashare.finance != 1){
			// 		ViewController.getInstance().openView(ViewConst.POPUP.SHARERECOVERPOPUPVIEW,{type:"a",index:this._index,itemId:itemId,hasNum:hasNum,callback:null,handler:this});
			// 	}
			// }
		}
	}

	private usePropHandler(num:number):void
	{
		NetManager.request(NetRequestConst.REQUEST_MANAGE_ADDFINANCE,{type:this._index+1,num:num});
	}

	private static _selectIndex:number=-1;
	private manageHandler(index:number):void
	{
		if(this._index == 3)
		{
			ViewController.getInstance().openView(ViewConst.POPUP.PRACTICESTORAGEPOPIPVIEW);

			/**
			 * 修身
			 */
			// if(Api.practiceVoApi.isCollectEnable())
			// {
				// NetManager.request(NetRequestConst.REQUEST_REQUEST_COLLECT,{});
			// }
			return
		}
		if(this._manageItemVo.num<1)
		{
			this.recoveryHandler(index);
		}
		else
		{
			if(index==2)
			{
				if(Api.manageVoApi.getReapSoldier()<1)
				{
					App.CommonUtil.showTip(LanguageManager.getlocal("manageNoEnoughFoodMsg"));
					return;
				}
			}
			ManageItem._selectIndex=index;
			ManageView.ONEKEY_BOO =false;
			NetManager.request(NetRequestConst.REQUEST_MANAGE_DEALFINANCE,{type:index+1});
			PlatformManager.analytics37Point("custom_active","housekeeping",1);
		}
	
	}

	public getType():string
	{
		if(this._manageItemVo)
		{
			return this._manageItemVo.type;
		}
		return null;
	}



	public dispose():void
	{
		this._manageItemVo=null;
		this._leftTimeText=null;
		this._curText=null;
		this._willText=null;
		this._needText=null;
		this._manageBtn=null;
		this._index=NaN;
		this._bindCallback=null;
		this._bindCallbackThisObj=null;
		this._bindCallbackParams=null;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_REFRESH_COUNT,this.refresh,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_DEALFINANCE),this.refresh,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_ADDFINANCE),this.refresh,this);
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_COLLECT),this.refresh,this);

		ManageView.ONEKEY_BOO =false;
		this._manageStatusBmp=null;
		this._leftNumText=null;
		this._npc=null;
		this._waitTimeBg=null;
		this._btnContainer=null;
		this._btnRedBtn=null;
		super.dispose();
	}
}