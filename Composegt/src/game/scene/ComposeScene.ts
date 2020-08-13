class ComposeScene extends BaseScene
{
	// private _sceneLayer:BaseDisplayObjectContainer;
	private _dataList:{[key:string]:ComposemapItemVo};
	private _isBeginning:boolean = false;
	private _startPos:egret.Point=null;
	private _startStagePos:egret.Point=null;
	private _startLocalPos:egret.Point=null;
	private _selectRenId:string=null;
	private _isMoved:boolean=false;
	// private _unlockGroupList:string[]=[];
	private _dailyDelCount:number=-1;
	private _findedPos:{[key:string]:number}={};
	private _tmpNotFind:{x:number,y:number}=null;
	private _enterPos = "10000";
	private _clickHand:BaseBitmap=null;;
	private _cellBgLayer:BaseDisplayObjectContainer=null;
	private _lastSortT:number=-1;
	// private _isBatchMoving:boolean=false;
	public constructor()
	{
		super();
	}

	protected init():void
	{
		super.init();
		this.initAllCompose();
		this.initTouch();
		this.initEvents();
		this.initPanel();
		App.FrameUtil.startCheck();
	}

	private initEvents():void
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_COMPOSE_ITEM_MOVE,this.itemMoveHandler,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT,this.guideMsg,this);
		// App.MessageHelper.addEventListener(MessageConst.MESSAGE_COMPOSE_UNLOCK_CELL,this.unlockNextGroup,this);
		// App.MessageHelper.addEventListener(MessageConst.MESSAGE_COMPOSE_SHOWUNLOCK,this.showUnlockHand,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_COMPOSE_HIDEUNLOCK,this.hideUnlockHand,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_COMPOSE_ADDPERSON,this.addPerson,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_UNLOCK_MAPGROUP,this.refrestRenNumTxt,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_LEVY_ADD_GOODS,this.tipMapGold,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MAP_MVPOS,this.moveEndhandler,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MAP_LVUP,this.lvupHandler,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MAP_LVUPBATCH,this.lvupHandler,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MAP_BUYPERSON,this.buyPerson,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MAP_DELPERSON,this.delHandler,this);
	}
	private removeEvents():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_COMPOSE_ITEM_MOVE,this.itemMoveHandler,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT,this.guideMsg,this);
		// App.MessageHelper.removeEventListener(MessageConst.MESSAGE_COMPOSE_UNLOCK_CELL,this.unlockNextGroup,this);
		// App.MessageHelper.removeEventListener(MessageConst.MESSAGE_COMPOSE_SHOWUNLOCK,this.showUnlockHand,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_COMPOSE_HIDEUNLOCK,this.hideUnlockHand,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_COMPOSE_ADDPERSON,this.addPerson,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_UNLOCK_MAPGROUP,this.refrestRenNumTxt,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LEVY_ADD_GOODS,this.tipMapGold,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MAP_MVPOS,this.moveEndhandler,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MAP_LVUP,this.lvupHandler,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MAP_LVUPBATCH,this.lvupHandler,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MAP_BUYPERSON,this.buyPerson,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MAP_DELPERSON,this.delHandler,this);
	}

	private refrestRenNumTxt():void
	{
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_REN_NUM);
	}

	private initPanel()
	{
		if(Api.rookieVoApi.isInGuiding)
		{
			return;
		}

		if(	GameData.announcementData&&GameData.announcementData.length>0)
		{	if(Api.rookieVoApi.isInGuiding)
			{
				return
			}
			else
			{
				 ViewController.getInstance().openView(ViewConst.COMMON.GAMEANNOUNCEMENtVIEW,GameData.announcementData);	
			}
		}

		if (GameData.wbrewards&&GameData.wbrewards.length>0)
		{	
			ViewController.getInstance().openView(ViewConst.POPUP.GETGIFTPOPUPVIEW,{rewards:GameData.wbrewards});
			
		}

		PlatformManager.checkDownloadApp();
		//玩吧兑换积分礼包
		// alert(PlatformManager.getGiftId());
		if(PlatformManager.getGiftId() == "501" || PlatformManager.getGiftId() == "502" )
		{
			if(GameData.wbrewardsFlag)
			{
				// PlatformManager.giftExchange(this.exchangeCallback,this);
				// this.exchangeCallback("0",{ret:"0"});
				
			}
			else{
				ViewController.getInstance().openView(ViewConst.POPUP.BUYGIFTPOPUPVIEW,{rewards:GameData.wbrewards,code:"2003"});
			}

		}
		// 实名认证 
		// if (GameData.idcardSwitch==true && GameData.idcardNormal == 1 && (GameData.idcardType == RealnameConst.USERTYPE_0 || GameData.idcardType == RealnameConst.USERTYPE_1))
		if (Api.switchVoApi.checkOpenRealnamerewards() && Api.otherInfoVoApi.getRealnameRewards() == null&&GameData.idcardType == RealnameConst.USERTYPE_0)
		{	
			ViewController.getInstance().openView(ViewConst.POPUP.REALNAMEREWARDSPOPUPVIEW,{showAcPop:1});
		}
		else
		{
			// 此处有坑
			// 新官上任的每日首次弹出
			if (Api.switchVoApi.checkOpenLoginWeek() && !Api.otherInfoVoApi.getLoginWeekTimeout() && !Api.otherInfoVoApi.getLoginWeekFirstPopup()) {
				ViewController.getInstance().openView(ViewConst.COMMON.LOGINWEEKVIEW,true);	
			}
			if(Api.switchVoApi.checkSignUp() && Api.switchVoApi.checkOpenShowSignUp() && Api.otherInfoVoApi.isSignShowRedDot && Api.otherInfoVoApi.getArrivalNewInfo().count<7)
			{
				ViewController.getInstance().openView(ViewConst.POPUP.SIGNUPVIEW,true);	
				return;
			}
			//限时红颜 和 首充的强弹
			if(Api.switchVoApi.checkOpenShowPopupWin())
			{

				if(Api.switchVoApi.checkClosePay()||PlatformManager.checkHideIconByIP())
				{
					return;
				}

				if(GameData.checkTimeLimitWife() || GameData.checkTimeLimitWifeFb())
				{
					//越南fb 红颜强弹出
					if(GameData.checkTimeLimitWifeFb())
					{
						ViewController.getInstance().openView(ViewConst.POPUP.TIMELIMITWIFEFBVIEW);
					} else {
						ViewController.getInstance().openView(ViewConst.POPUP.TIMELIMITWIFEVIEW);
					}	
				}
				else
				{
					if(Api.shopVoApi.getPayFlag()!=2 && Api.servantVoApi.getServantObj("1033") == null)
					{
						ViewController.getInstance().openView(ViewConst.POPUP.FIRSTRECHARGEVIEW);

						

					}
				}
			}
			//打开气泡开关
			if(Api.switchVoApi.checkOpenFirstChargeBubble()){
				if(Api.shopVoApi.getPayFlag()!=2 && Api.servantVoApi.getServantObj("1033") == null)
				{
					GameData.leftBubble.isFirstChargeBubble = true;
					// App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_LEFTBUBBLE,"firstChargeBubble");
					
				}
			}

		}
	
	}
	protected getResourceList():string[]
	{
		return [];
	}

	// protected tick():void
	// {
	// 	this._timeIdx++;
	// 	if(this._timeIdx%this._goldTipTime==0)
	// 	{
	// 		this.tipMapGold();
	// 	}
	// }

	private tipMapGold(e:egret.Event):void
	{
		if(this._dataList)
		{
			let arr:ComposeItem[]=[];
			let count=0;
			for(let key in this._dataList)
			{
				if(this._dataList.hasOwnProperty(key))
				{
					if(this._isBeginning&&this._selectRenId&&key==this._selectRenId)
					{
						continue;
					}
					let data=this._dataList[key];
					if(data&&data.lv)
					{
						let item=<ComposeItem>this._sceneLayer.getChildByName(key);
						if(item)
						{
							if(item instanceof ComposeItem)
							{
								if(Math.random()>0.5)
								{
									item.showGoldTip();
									count++;
								}
								else
								{
									arr.push(item);
								}
							}
						}
						else
						{
							// this.resetAllCellByData();
							return;
						}
					}
				}
			}
			while(count<10)
			{
				let l=arr.length;
				if(l>0)
				{
					let idx=Math.floor(Math.random()*l);
					let item =arr.splice(idx,1)[0];
					item&&item.showGoldTip();
					count++;
				}
				if(arr.length<1)
				{
					break;
				}
			}
		}
	}

	private resetAllCellByData():void
	{
		let isAdd:boolean=false;
		for(let key in this._dataList)
		{
			if(this._dataList.hasOwnProperty(key))
			{
				let vo = this._dataList[key];
				let item = this.getItemById(key);
				if(vo.lv&&!item)
				{
					this.addOnePerson(vo);
					isAdd=true;
				}
				if(item&&!vo.lv)
				{
					item.dispose();
					item=null;
				}
				if(item)
				{
					item.update();
				}
			}
		}
		if(isAdd)
		{
			this.sortZ();
		}
	}

	protected refreshAfterShow(isfromShow:boolean = false):void
	{
		super.refreshAfterShow(isfromShow);
		// let l=this._unlockGroupList?this._unlockGroupList.length:0;
		// if(l>0)
		// {
		// 	console.log("start unlock refreshAfterShopw");
		// 	this.checkGroupInScreen(this._unlockGroupList[0],this.unlockMap,this,true);
		// }
	}

	// private unlockNextGroup(e:egret.Event):void
	// {
	// 	let nextGroup=Api.composemapVoApi.getNextUnlockGroup();
	// 	if(nextGroup)
	// 	{
	// 		console.log("start unlock unlockNextGroup");
	// 		// this._unlockGroupList.push(nextGroup);
	// 		this.pushUnlockGroup(nextGroup);
	// 		this.checkGroupInScreen(nextGroup,this.unlockMap,this,true);
	// 	}
	// }

	// private pushUnlockGroup(group:string|string[]):void
	// {
	// 	if(typeof group =="string")
	// 	{
	// 		this._unlockGroupList.push(group);
	// 		let cfg=Config.MapinfoCfg.getStartPosCfgByGroup(group);
	// 		if(cfg)
	// 		{
	// 			Api.composemapVoApi.setunlockingStatusById(cfg.id);
	// 		}
	// 	}
	// 	else if(group instanceof Array)
	// 	{
	// 		this._unlockGroupList=this._unlockGroupList.concat(group);
	// 		for(let i=0;i<group.length;i++)
	// 		{
	// 			let cfg=Config.MapinfoCfg.getStartPosCfgByGroup(group[i]);
	// 			if(cfg)
	// 			{
	// 				Api.composemapVoApi.setunlockingStatusById(cfg.id);
	// 			}
	// 		}
	// 	}
	// }

	// private unlockMap():void
	// {
	// 	let l=this._unlockGroupList?this._unlockGroupList.length:0;
	// 	if(l>0)
	// 	{
	// 		for(let i=0;i<l;i++)
	// 		{
	// 			let group=this._unlockGroupList[i];
	// 			let cfg = Config.MapinfoCfg.getStartPosCfgByGroup(group);
	// 			let build=<ComposeBuild>this._sceneLayer.getChildByName(cfg.id);
	// 			// if(this._dataList[cfg.id])
	// 			// {
	// 			// 	this.addCellBg(this._dataList[cfg.id]);
	// 			// }

	// 			if(build&&(build instanceof ComposeBuild))
	// 			{
	// 				Api.rookieVoApi.waitingPosY = build.localToGlobal(0,0).y-100;
	// 				Api.rookieVoApi.waitingPosX = build.localToGlobal(0,0).x-80;
	// 				if(i==0)
	// 				{
	// 					if(group==Api.composemapVoApi.getNextUnlockGroup())
	// 					{
	// 						if(build)
	// 						{
	// 							build.setAttackStatus();
	// 						}
	// 					}
	// 					else
	// 					{
	// 						build.setUnlockStatus(()=>{
	// 							let buildGroupArr=Config.MapinfoCfg.groupIdArr;
	// 							let l=buildGroupArr.length;
	// 							for(let i=0;i<l;i++)
	// 							{
	// 								let group=buildGroupArr[i];
	// 								let cfg=Config.MapinfoCfg.getStartPosCfgByGroup(group);
	// 								let build=<ComposeBuild>this._sceneLayer.getChildByName(cfg.id);
	// 								if(group==Api.composemapVoApi.getNextUnlockGroup())
	// 								{
	// 									this.checkGroupInScreen(group,()=>{
	// 										if(!build)
	// 										{
	// 											build=this.createBuild(group);
	// 										}
	// 										build.setAttackStatus();
	// 									},this,true);
	// 									break;
	// 								}
	// 							}
	// 						},this);
	// 					}
	// 				}
	// 				else
	// 				{
	// 					if(group==Api.composemapVoApi.getNextUnlockGroup())
	// 					{
	// 						if(build)
	// 						{
	// 							build.setAttackStatus();
	// 						}
	// 					}else{
	// 						if(build)
	// 						{
	// 							build.setUnlockStatus(null,null);
	// 						}
	// 					}

	// 				}
	// 			}
	// 			else
	// 			{
	// 				if(i==0)
	// 				{
	// 					build=this.createBuild(group);
	// 					Api.rookieVoApi.waitingPosY = build.localToGlobal(0,0).y-100;
	// 					Api.rookieVoApi.waitingPosX = build.localToGlobal(0,0).x-80;
	// 				}
					
	// 			}
	// 		}
	// 		this._unlockGroupList.length=0;
	// 	}
	// }

	protected setLayerPosition():void
	{
	}

	private startCheckMoveMap():void
	{
		this.addEventListener(egret.Event.ENTER_FRAME,this.fastCheckMoveMap,this)
	}
	
	private stopCheckMoveMap():void
	{
		this.removeEventListener(egret.Event.ENTER_FRAME,this.fastCheckMoveMap,this)
	}

	// private unlockCell(e:egret.Event):void
	// {
	// 	let unlockGroup=e.data;
	// 	if(unlockGroup)
	// 	{
	// 		// this._unlockGroupList=this._unlockGroupList.concat(unlockGroup);
	// 		this.pushUnlockGroup(unlockGroup);
	// 	}
	// }

	private delHandler(e:egret.Event):void
	{
		let rData=e.data;
		if(rData.ret)
		{
			let data=rData.data;
			if(data.data.rewards)
			{
				let rewardList = GameData.formatRewardItem(data.data.rewards);
		        App.CommonUtil.playRewardFlyAction(rewardList);
			}
			let delId=ComposeStatus.delId;
			if(delId)
			{
				let item=this.getItemById(delId);
				item&&item.delete();
			}
			this.refrestRenNumTxt();
		}
		else
		{
			console.log("delete fail");
		}
	}

	//指向未解锁地块(废弃，此后指关卡入口)
	private showUnlockHand()
	{
		let nextGroup=Api.composemapVoApi.getNextUnlockGroup();
		if(!nextGroup)
		{
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MAINUI_CHALLENGE);
			return;
		}
		let startCfg=Config.MapinfoCfg.getStartPosCfgByGroup(nextGroup);
		let centerCfg=Config.MapinfoCfg.getCfgByGroup(nextGroup)[0];
		this.moveToPos(centerCfg.id,null,null);
		if(this._clickHand)
		{	
			return;
		}
		let {pixX,pixY}=ComposeStatus.getPixPosByCellPos(startCfg.x,startCfg.y);
		this._clickHand = BaseBitmap.create("guide_hand");
		this._clickHand.setScale(0.6);
		this._clickHand.x = pixX;
		this._clickHand.y = pixY - 30;
		this._sceneLayer.addChild(this._clickHand);
		egret.Tween.get(this._clickHand,{loop:true})
				.to({scaleX: 0.7,scaleY:0.7}, 500)
				.to({scaleX: 0.6,scaleY:0.6}, 500)
	}
	private hideUnlockHand()
	{
		if(this._clickHand)
		{
			egret.Tween.removeTweens(this._clickHand);
			this._sceneLayer.removeChild(this._clickHand);
			this._clickHand = null;
		}
		
	}

	private checkGroupInScreen(group:string,callback:Function,thisObj:any,mustCenter?:boolean):boolean
	{
		let startCfg=Config.MapinfoCfg.getStartPosCfgByGroup(group);
		let {pixX,pixY}=ComposeStatus.getPixPosByCellPos(startCfg.x,startCfg.y);
		let offX=50;
		let cellLeftX=pixX-ComposeStatus.cellCfg.w+offX;
		let cellRightX=pixX+ComposeStatus.cellCfg.w-offX;
		let cellTopY=pixY;
		let cellButtomY=pixY+ComposeStatus.cellCfg.h*2;
		let screenLeftX=0-this._sceneLayer.x;
		let screenTopY=0-this._sceneLayer.y;
		let screenRightX=screenLeftX+GameConfig.stageWidth;
		let screenButtomY=screenTopY+GameConfig.stageHeigth;

		
		if(mustCenter||cellLeftX<screenLeftX||cellRightX>screenRightX||cellTopY<screenTopY||cellButtomY>screenButtomY)
		{
			let centerCfg=Config.MapinfoCfg.getCfgByGroup(group)[0];
			this.moveToPos(centerCfg.id,callback,thisObj);
		}
		else
		{
			if(callback)
			{
				callback.apply(thisObj);
			}
		}
		return true;
	}

	private fastCheckMoveMap():void
	{
		if(Api.rookieVoApi.isGuiding)
		{
			//引导不能拖动地图
			return;
		}
		let {x,y}=ComposeStatus.curSelectPos;
		let cellSize=ComposeStatus.cellCfg;
		let id=Config.MapinfoCfg.getIdByPos(x,y);
		let cell=this.getItemById(id);
		if(cell)
		{
			let rightButtom=Api.composemapVoApi.getRightButtomPos();
			let rightButtomPix = ComposeStatus.getRightButtomPixByPos(rightButtom.x,rightButtom.y);
			let showW=Math.max(Math.min(ComposeStatus.mapSize.w,rightButtomPix.pixX),GameConfig.stageWidth);
			let showH=Math.max(Math.min(ComposeStatus.mapSize.h,rightButtomPix.pixY+273),GameConfig.stageHeigth);
			let cellLeftX=cell.x-cellSize.w/2;
			let cellRightX=cell.x+cellSize.w/2;
			let cellTopY=cell.y+ComposeStatus.cellBgSize.h*0.5-cell.height-100;
			let cellButtomY=cell.y+cellSize.h*0.5;
			let screenLeftX=0-this._sceneLayer.x;
			let screenTopY=0-this._sceneLayer.y;
			let screenRightX=screenLeftX+GameConfig.stageWidth;
			let screenButtomY=screenTopY+GameConfig.stageHeigth;
			let diffX:number=0;
			let diffY:number=0;
			// console.log(cellLeftX,screenLeftX);
			let speed=10;
			if(cellLeftX<screenLeftX)
			{
				//地图往右移动
				diffX=Math.max(0,Math.min(speed,screenLeftX));
				this._sceneLayer.x+=diffX;
				// console.log("地图右移",diffX,diffY);
			}
			else if(cellRightX>screenRightX)
			{
				//地图往左移动
				diffX=-Math.max(0,Math.min(speed,showW-screenRightX));
				this._sceneLayer.x+=diffX;
				// console.log("地图左移",diffX,diffY);
			}
			if(cellTopY<screenTopY)
			{
				//地图向下移动
				diffY=Math.max(0,Math.min(speed,screenTopY));
				this._sceneLayer.y+=diffY;
				// console.log("地图下移",diffX,diffY);
			}
			else if(cellButtomY>screenButtomY)
			{
				//地图向上移动
				diffY=-Math.max(0,Math.min(speed,showH-screenButtomY));
				this._sceneLayer.y+=diffY;
				// console.log("地图上移",diffX,diffY);
			}
			if(diffX||diffY)
			{
				cell.moveByDiffPos(-diffX,-diffY);
				// cell.moveByDrag(-diffX,-diffY);
			}
		}
	}

	private setOtherLayerEnabled(enabled:boolean):void
	{
		if(LayerManager.uiLayer.touchChildren==!enabled)
		{
			LayerManager.uiLayer.touchChildren=!!enabled;
		}
		// if(ComposeStatus.status==ComposeEnums.ITEM)
		// {
		// 	let nextGroup=Api.composemapVoApi.getNextUnlockGroup();
		// 	if(nextGroup)
		// 	{
		// 		let cfg=Config.MapinfoCfg.getStartPosCfgByGroup(nextGroup);
		// 		let item=<ComposeBuild>this._sceneLayer.getChildByName(cfg.id);
		// 		if(item)
		// 		{
		// 			item.touchChildren=enabled;
		// 		}
		// 	}

		// }
	}

	private _moveCallbackData:{callback:Function,thisObj:any}=null;

	/**
	 * 移动地图到指定位置
	 * @param id 地块ID
	 * @param daily 移动延迟时间
	 */
	private moveToPos(id:string,callback:Function,thisObj:any,daily:number=300):void
	{
		egret.Tween.removeTweens(this._sceneLayer);
		let pos = Config.MapinfoCfg.getPosById(id);
		let {pixX,pixY}=ComposeStatus.getPixPosByCellPos(pos.x,pos.y);
		let posScreenCenterX:number=GameConfig.stageWidth/2-pixX;
		let posScreenCenterY:number=GameConfig.stageHeigth/2-pixY;
		let {x,y}=this.checkBound(posScreenCenterX,posScreenCenterY);

		let group=Config.MapinfoCfg.getCfgByPos(pos.x,pos.y).group;

		// let nextGroup=Api.composemapVoApi.getNextUnlockGroup();					
		let cfg = Config.MapinfoCfg.getGroupData(group)
						
		// x = Math.max(x,(cfg.px-4)*(ComposeStatus.cellCfg.w+ComposeStatus.cellCfg.spaceX))
		// y = Math.max(y,(cfg.py-4)*(ComposeStatus.cellCfg.h+ComposeStatus.cellCfg.spaceY)-(1136-GameConfig.stageHeigth))

		if(this._moveCallbackData)
		{
			this._moveCallbackData.callback.apply(this._moveCallbackData.thisObj);
		}
		if(callback)
		{
			this._moveCallbackData={callback:callback,thisObj:thisObj};
		}
		else
		{
			this._moveCallbackData=null;
		}
		
		if(this._sceneLayer.x!=x||this._sceneLayer.y!=y)
		{
			if(daily)
			{
				this.touchChildren=false;
				egret.Tween.get(this._sceneLayer).to({x:x,y:y},daily).call(()=>{
					this.touchChildren=true;
					egret.Tween.removeTweens(this._sceneLayer);
					if(this._moveCallbackData)
					{
						this._moveCallbackData.callback.apply(this._moveCallbackData.thisObj);
					}
					this._moveCallbackData=null;
				},this);
			}
			else
			{
				this._sceneLayer.setPosition(x,y);
				if(this._moveCallbackData)
				{
					this._moveCallbackData.callback.apply(this._moveCallbackData.thisObj);
				}
				this._moveCallbackData=null;
			}
		}
		else
		{
			if(this._moveCallbackData)
			{
				this._moveCallbackData.callback.apply(this._moveCallbackData.thisObj);
			}
			this._moveCallbackData=null;
		}
	}

	private checkBound(x:number,y:number):{x:number,y:number}
	{
		// let leftTop=Api.composemapVoApi.getLeftTopPos();
		let rightButtom=Api.composemapVoApi.getRightButtomPos();
		// let LeftTopPix = ComposeStatus.getLeftTopPixByPos(leftTop.x,leftTop.y);
		let rightButtomPix = ComposeStatus.getRightButtomPixByPos(rightButtom.x,rightButtom.y);
		let showW=Math.max(Math.min(ComposeStatus.mapSize.w,rightButtomPix.pixX),GameConfig.stageWidth);
		let showH=Math.max(Math.min(ComposeStatus.mapSize.h,rightButtomPix.pixY+273),GameConfig.stageHeigth);
		x=Math.max(Math.min(0,x),GameConfig.stageWidth-showW);
		y=Math.max(Math.min(0,y),GameConfig.stageHeigth-showH);
		return {x:x,y:y};
	}

	private initTouch():void
	{
		this._sceneLayer.addTouch(this.sceneTouchHandler,this);
	}

	private setSelected(id:string):void
	{
		let item=this.getItemById(id);
		if(item)
		{
			item.setSelected();
		}
	}

	private clearSelected():void
	{
		let container=ComposeSelect.getInstant();
		if(container&&container.parent)
		{
			let item=<ComposeItem>container.parent;
			item.removeSelected();
		}
	}

	private startDailyDel():void
	{
		// if(Api.rookieVoApi.isGuiding)
		// {
		// 	//引导不能删除小人
		// 	return;
		// }
		//屏蔽删除小人
		if(this)
		{
			return ;
		}
		
		let container=ComposeSelect.getInstant();
		if(container.parent&&container.isDelStatus())
		{
			return;
		}
		if(this._dailyDelCount==-1)
		{
			this._dailyDelCount=egret.setTimeout(this.showWaitDelPs,this,500);
		}
	}

	private stopDailyDel():void
	{
		if(this._dailyDelCount!=-1)
		{
			egret.clearTimeout(this._dailyDelCount);
			this._dailyDelCount=-1;
		}
		else
		{
			this.hideWaitDelPs();
		}
	}

	private showWaitDelPs():void
	{
		this.stopDailyDel();
		let container=ComposeSelect.getInstant();
		if(container.parent)
		{
			container.showDelPs();
		}
	}

	private hideWaitDelPs():void
	{
		let container=ComposeSelect.getInstant();
		if(container.parent)
		{
			container.hideDelPs();
		}
	}

	private showAllSameLvCell():void
	{
		if(this._selectRenId)
		{
			let selectData=this._dataList[this._selectRenId];
			for(let id in this._dataList)
			{
				if(this._dataList.hasOwnProperty(id))
				{
					// if(id==selectData.id)
					// {
					// 	continue;
					// }
					let data=this._dataList[id];
					if(data&&selectData.lv==data.lv)
					{
						let item=this.getItemById(id);
						if(item)
						{
							item.showCell();
						}
					}
				}
			}
		}
	}

	private hideAllSameLvCell():void
	{
		if(this._selectRenId)
		{
			let selectData=this._dataList[this._selectRenId];
			for(let id in this._dataList)
			{
				if(this._dataList.hasOwnProperty(id))
				{
					if(id==selectData.id)
					{
						continue;
					}
					let data=this._dataList[id];
					if(data&&selectData.lv==data.lv)
					{
						let item=this.getItemById(id);
						if(item)
						{
							item.hideCell();
						}
					}
				}
			}
		}
	}
	
	private sceneTouchHandler(e:egret.TouchEvent):void
	{
		// if(ComposeStatus.isComposeing)
		// {
		// 	return;
		// }
		if(e.target!=this._sceneLayer)
		{
			return;
		}
		switch(e.type)
		{
			case egret.TouchEvent.TOUCH_BEGIN:
				if(this._isBeginning==false)
				{
					this._isBeginning=true;
					this._isMoved=false;
					if(!this._startPos)
					{
						this._startPos=egret.Point.create(this._sceneLayer.x,this._sceneLayer.y);
					}
					else
					{
						this._startPos.setTo(this._sceneLayer.x,this._sceneLayer.y);
					}
					if(!this._startStagePos)
					{
						this._startStagePos=egret.Point.create(e.stageX,e.stageY);
					}
					else
					{
						this._startStagePos.setTo(e.stageX,e.stageY);
					}
					if(!this._startLocalPos)
					{
						this._startLocalPos=egret.Point.create(e.localX,e.localY);
					}
					else
					{
						this._startLocalPos.setTo(e.localX,e.localY);
					}
					this._selectRenId=null;
					if(!ComposeStatus.isBatchMoving)
					{
						let ofp = this._sceneLayer.localToGlobal(0,0);
						let keys=Object.keys(this._dataList);
						keys.sort((a,b)=>{
							return Number(b)-Number(a);
						});
						for(let tk in keys)
						{
							if(keys.hasOwnProperty(tk))
							{
								let key=keys[tk]
								let vo=this._dataList[key];
								if(vo&&vo.lv)
								{
									let item=this.getItemById(key);
									if(item)
									{
										let aaa = item.getChildByName("touchcell")||item;
										if(aaa.hitTestPoint(e.localX+ofp.x,e.localY+GameData.layerPosY+ofp.y,false))
										{
											// console.log("hitest"+key);
											if(Api.composemapVoApi.checkAndStopCount())
											{
												this._isBeginning=true;
												App.CommonUtil.showTip(LanguageManager.getlocal("composeFastOpera"));
												break;
											}
											else
											{
												this._selectRenId=key;
												item.setSelected();
												this.startDailyDel();
												break;
											}
										}
									}
								}
							}
						}
					}
					if(!this._selectRenId)
					{
						this.clearSelected();
						/** 以下为点击建筑逻辑 */
						// let buildGroupArr=Config.MapinfoCfg.buildIdArr;
						// let l=buildGroupArr.length;
						// for(let i=0;i<l;i++)
						// {
						// 	let group=buildGroupArr[i];
						// 	let cfg=Config.MapinfoCfg.getStartPosCfgByGroup(group);
						// 	let item=<ComposeBuild>this._sceneLayer.getChildByName(cfg.id);
						// 	if(item&&item.hitTestPoint(e.localX+ofp.x,e.localY+GameData.layerPosY+ofp.y,true))
						// 	{
						// 		if(item.isUnlocked())
						// 		{
						// 			Api.composemapVoApi.openFunction(group);
						// 			break;
						// 		}
						// 	}
						// }
						/** 以上为点击建筑逻辑 */
					}
				}
				break;
			case egret.TouchEvent.TOUCH_MOVE:
				if(this._isBeginning)
				{
					this.setOtherLayerEnabled(false);
					if(ComposeStatus.status==ComposeEnums.ITEM)
					{
						this.stopDailyDel();
						let x=e.localX-this._startLocalPos.x;
						let y=e.localY-this._startLocalPos.y;
						let item=this.getItemById(this._selectRenId);
						
						if(!this._isMoved)
						{
							item&&item.setMaxZindex();
							this.showAllSameLvCell();
						}
						item&&item.moveByDrag(x,y);
						this.startCheckMoveMap();
						
						
					}
					else
					{
						if(Api.rookieVoApi.isGuiding)
						{
							//引导不能拖动地图
							return;
						}
						if(ComposeStatus.status==ComposeEnums.NONE)
						{
							ComposeStatus.status=ComposeEnums.SCENE;
						}
						  
						let x=e.stageX-this._startStagePos.x+this._startPos.x;
						let y=e.stageY-this._startStagePos.y+this._startPos.y;
						let xyData = this.checkBound(x,y);
						x=xyData.x;
						y=xyData.y;
						this._sceneLayer.setPosition(x,y);
						
					}
					this._isMoved=true;
				}
				break;
			case egret.TouchEvent.TOUCH_CANCEL:
				if(this._isBeginning)
				{
					this.setOtherLayerEnabled(true);
					if(ComposeStatus.status==ComposeEnums.ITEM)
					{
						this.hideAllSameLvCell();
						this.stopDailyDel();
						let item=this.getItemById(this._selectRenId);
						if(item)
						{
							item.showForCompose();
							this.resetStatus();
							item.removeSelected();
							item.resetPos();
							item.checkAutoMove();
						}
						ComposeStatus.curSelectPos={x:-1,y:-1};
					}
					this.clearMoveStatus();
					this._isBeginning=false;
					this._isMoved=false;
					this.stopCheckMoveMap();
				}
				break;
			case egret.TouchEvent.TOUCH_END:
				if(this._isBeginning)
				{
					this.setOtherLayerEnabled(true);
					this.stopCheckMoveMap();
					let targetL=Object.keys(ComposeStatus.targetList).length;
					let {x,y} = ComposeStatus.curStopPos;
					let fpos=ComposeStatus.curSelectPos;
					let param={fpos:Config.MapinfoCfg.getIdByPos(fpos.x,fpos.y),tpos:Config.MapinfoCfg.getIdByPos(x,y)}
					if(ComposeStatus.status==ComposeEnums.ITEM)
					{
						this.stopDailyDel();
					}
					if(this._isMoved)
					{
						if(ComposeStatus.status==ComposeEnums.ITEM)
						{
							this.hideAllSameLvCell();
							let item=this.getItemById(this._selectRenId);
							item&&item.removeSelected(false,false);
							item&&item.showForCompose();
							if(targetL<1)
							{
								//移动
								let isMoveEd=(x!=-1&&y!=-1);
								if(isMoveEd&&Api.composemapVoApi.checkCanPos())
								{
									// let{pixX,pixY} = ComposeStatus.getPixPosByCellPos(x,y);
									// this.setPosition(pixX,pixY);
									NetManager.request(NetRequestConst.REQUEST_MAP_MVPOS,param);
								}
								else
								{
									//移动到不可放位置
									if(item)
									{
										this.resetStatus();
										item.resetPos();
										item.checkAutoMove();
									}
								}
							}
							else
							{
								let selectData=Api.composemapVoApi.getCellDataById(this._selectRenId);
								if(Api.composemapVoApi.checkCanCompose(selectData.lv)==false)
								{
									this.resetStopStatus();
									if(Api.composemapVoApi.checkMaxCfgLv(selectData.lv)==false)
									{
										Api.composemapVoApi.showCannotComposeView();
									}
									else
									{
										App.CommonUtil.showTip(LanguageManager.getlocal("composeMaxLvDesc"));
									}
									this.composeFail();
								}
								else
								{
									if(targetL>1)
									{
										NetManager.request(NetRequestConst.REQUEST_MAP_LVUPBATCH,param);
									}
									else
									{
										NetManager.request(NetRequestConst.REQUEST_MAP_LVUP,param);
									}
								}
								
							}
							if(item)
							{
								item.clearMoveStatus();
							}
						}
					}
					this.clearMoveStatus();
					this._isBeginning=false;
					this._isMoved=false;
				}
				break;
			default:
				break;
		}
	}

	private clearMoveStatus():void 
	{
		// if(ComposeStatus.status==ComposeEnums.SCENE)
		// {
			ComposeStatus.status=ComposeEnums.NONE;
		// }
		// this._targetList={};
	}

	//服务器没返回数据之前前端修改数据，如果已经返回就不能用了
	private moveData(oid:string,nid:string):void
	{
		if(oid&&oid!=nid)
		{
			Api.composemapVoApi.move(oid,nid);
			let item = this.getItemById(oid);
			if(item)
			{
				item.update();
			}
		}
	}

	private moveAndReset():void
	{
		let fPos=ComposeStatus.curSelectPos;
		let tPos=ComposeStatus.curStopPos;
		if(fPos.x!=-1&&fPos.y!=-1&&tPos.x!=-1&&tPos.y!=-1)
		{
			let fid=Config.MapinfoCfg.getIdByPos(fPos.x,fPos.y);
			let tid=Config.MapinfoCfg.getIdByPos(tPos.x,tPos.y);
			Api.composemapVoApi.move(fid,tid);
			let item = this.getItemById(fid);
			let titem=this.getItemById(tid);
			if(item)
			{
				item.updatePos();
			}
			if(titem)
			{
				titem.updatePos();
			}
		}
		this.resetStatus();
	}

	private resetStatus():void
	{
		ComposeStatus.resetStatus();
		this.hideComposeItems();
		ComposeStatus.targetList={};
		ComposeStatus.curStopPos={x:-1,y:-1};
	}

	//收到引导的消息
	private guideMsg(event:egret.Event)
	{
		let guideCfg = event.data.guideCfg;
		App.LogUtil.show("guideCfg"+guideCfg);
		//画面移动到中间 引导删除
		// if(guideCfg&&guideCfg.otherId == "delperson_1")
		// {
		// 	this.moveToPos(this._enterPos,null,null);
		// }
		
		
	}

	private getItemById(id:string):ComposeItem
	{
		let item=<ComposeItem>this._sceneLayer.getChildByName(id);
		if(item instanceof ComposeItem)
		{}
		else
		{
			item=null;
		}
		return item;
	}

	private moveEndhandler(e:egret.Event):void 
	{
		let data=e.data;
		if(data.ret)
		{
			this.moveAndReset();
			this.sortZ();
		}
		else
		{
			
			let item=this.getItemById(this._selectRenId);
			if(item)
			{
				item.resetPos();
			}
			this.resetStatus();
			this.resetAllCellByData();
		}
	}

	private lvupHandler(e:egret.Event):void
	{
		this.resetStopStatus();
		let data=e.data;
		if(data.ret)
		{
			this.composeEffect(data);
		}
		else
		{
			if(data.data.ret==-3)
			{
				Api.composemapVoApi.showCannotComposeView();
				this.resetAllCellByData();
			}
			else
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("composeFailCodeTip",[""+data.data.ret]));
			}
			this.composeFail();
		}
		this.refrestRenNumTxt();
	}

	private resetStopStatus():void
	{
		let stopPos=ComposeStatus.curStopPos;
		let stopId=Config.MapinfoCfg.getIdByPos(stopPos.x,stopPos.y);
		let stopChild=this.getItemById(stopId);
		if(stopChild)
		{
			stopChild.recoveryBmp();
		}
	}

	private composeFail():void
	{
		let keys=Object.keys(ComposeStatus.targetList);
		let l=keys.length;
		if(l>0)
		{
			let {x,y}=ComposeStatus.curSelectPos;
			let id=Config.MapinfoCfg.getIdByPos(x,y);
			let chid = this.getItemById(id);
			if(keys.length==1)
			{
			}
			else
			{
				
			}
			if(chid)
			{
				chid.resetPos();
				chid.checkAutoMove();
			}
			this.resetStatus();
		}
	}

	private composeEffect(data:{ret:boolean,data:any}):void
	{
		let keys=Object.keys(ComposeStatus.targetList);
		if(keys.length>0)
		{
			let rewards=data.data.data.unlockPersonLv?"":data.data.data.rewards;
			let idx=0;
			let {x,y}=ComposeStatus.curSelectPos;
			let stopPos=ComposeStatus.curStopPos;
			let id = Config.MapinfoCfg.getIdByPos(x,y);
			let stopId=id;
			let chid = this.getItemById(id);
			if(keys.length==1)
			{
				if(chid)
				{
					chid.dispose();
					this.deleteData(id);
				}
				this.lvup(stopPos.x,stopPos.y,false,rewards);
				// if(rewards)
				// {
				// 	let rewardList = GameData.formatRewardItem(rewards);
				// 	App.CommonUtil.playRewardFlyAction(rewardList);
				// }
				this.resetStatus();
			}
			else
			{
				ComposeStatus.isBatchMoving=true;
				// if(chid)
				// {
				// 	chid.dispose();
				// 	this.deleteData(id);
				// }
				ComposeStatus.targetList[id]={x:x,y:y,lv:ComposeStatus.targetList[keys[0]].lv};
				keys=Object.keys(ComposeStatus.targetList);
				let l=keys.length;
				let disArr:string[]=keys.concat();
				disArr.sort((a,b)=>{
					let aPos=Config.MapinfoCfg.getPosById(a);
					let bPos=Config.MapinfoCfg.getPosById(b);
					let aX=aPos.x;
					let aY=aPos.y;
					let bX=bPos.x;
					let bY=bPos.y;
					let adis=App.MathUtil.distance(aX,aY,stopPos.x,stopPos.y);
					let bdis=App.MathUtil.distance(bX,bY,stopPos.x,stopPos.y);
					return (adis==bdis?Number(a)-Number(b):adis-bdis);
					
				});
				
				for(let i=0;i<l;i++)
				{
					let {x,y}=ComposeStatus.targetList[keys[i]];
					if(x==ComposeStatus.curStopPos.x&&y==ComposeStatus.curStopPos.y)
					{
						continue;
					}
					let id=Config.MapinfoCfg.getIdByPos(x,y);
					let chid = this.getItemById(id);
					if(chid)
					{
						let curStopId = Config.MapinfoCfg.getIdByPos(stopPos.x,stopPos.y);
						let curStopItem=this.getItemById(curStopId)
						chid.move(curStopItem.x,curStopItem.y,()=>{
							idx++;
							if(rewards&&id==stopId)
							{
								let rewardList = GameData.formatRewardItem(rewards);
								let p=chid.localToGlobal(0,0);
								p.y-=80;
								App.CommonUtil.playRewardFlyAction(rewardList,p);
							}
							if(idx==keys.length-1)
							{
								let disL=disArr.length;
								let noCompose:boolean=false;
								if(disL%2==1)
								{
									noCompose=true;
								}
								let needRemoveIdx=Math.floor(disL/2);
								let logPos=disArr[needRemoveIdx];
								for(let idx:number=0;idx<disL;idx++)
								{
									let txy = Config.MapinfoCfg.getPosById(disArr[idx]);
									let tx=txy.x;
									let ty=txy.y;
									if(idx<needRemoveIdx)
									{
										this.lvup(tx,ty,true,rewards);
									}
									else
									{
										let item=this.getItemById(disArr[idx]);
										if(noCompose&&idx==needRemoveIdx)
										{
											item&&item.updateShow(true);
										}
										else
										{
											if(item)
											{
												item.dispose();
											}
											this.deleteData(disArr[idx]);
										}
									}
								}
								ComposeStatus.isBatchMoving=false;
								this.resetStatus();
							}
						},this);
					}
					else
					{
						idx++;
					}
					
				}
			}
		}
		else
		{
			this.resetStatus();
		}
	}
	private deleteData(id:string):void 
	{
		Api.composemapVoApi.removeData(id);
	}
	private lvup(x:number,y:number,isBatch:boolean,rewards?:string):void 
	{
		let id = Config.MapinfoCfg.getIdByPos(x,y);
		let item=this.getItemById(id);
		if(item)
		{
			item.updateShow(isBatch,rewards);
		}
	}

	private buyPerson(e:egret.Event):void
	{
		let data=e.data;
		// if(data.ret)
		// {
		// 	this.addPerson();
		// }
		// else
		// {
			let delList=Api.composemapVoApi.getNeedDelPersonList();
			if(delList&&delList.length>0)
			{
				for(let key in delList)
				{
					if(delList.hasOwnProperty(key))
					{
						let id=delList[key];
						let item = this.getItemById(id);
						if(item)
						{
							item.dispose();
						}
					}
				}
				Api.composemapVoApi.delClientPerson();
			}
			let isShowTip:boolean=data.ret?(data.data&&data.data.data&&data.data.data.hasOwnProperty("allsucess")&&(!data.data.data.allsucess)):true;
			if(isShowTip)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("composeBuyFail"));
			}
			if((!data.ret)&&data.data&&data.data.data&&data.data.data.bpcode)
			{
				switch(data.data.data.bpcode)
				{
					case -2:
					case -3:
						this.resetAllCellByData();
						break;
				}
			}
			// else
			// {
			// 	if(data.data.ret==-3)
			// 	{
			// 		App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_levelupTip3"));
			// 	}
			// }
		// }
	}

	private addPerson(e?:egret.Event):void
	{
		SoundManager.playEffect("effect_employ");
		ComposeStatus.buyNum++;
		let personIdList=Api.composemapVoApi.getAddPresonList();
		let isAdd:boolean=false;
		for(let key in personIdList)
		{
			if(personIdList.hasOwnProperty(key))
			{
				let personData = Api.composemapVoApi.getCellDataById(personIdList[key]);
				this.addOnePerson(personData,true);
				let group=Config.MapinfoCfg.getCfgByPos(personData.x,personData.y).group;
				this.checkGroupInScreen(group,null,null,true);
				isAdd=true;
			}
		}
		Api.composemapVoApi.clearAddPersonList();
		this.refrestRenNumTxt();
		if(isAdd)
		{
			this.sortZ();
		}
	}

	private addOnePerson(data:ComposemapItemVo,effect?:boolean):void
	{
		
		if(data&&data.lv)
		{
			let composecell = new ComposeItem(data);
			composecell.show(this._sceneLayer,effect);
			// this._sceneLayer.addChild(composecell);
		}
	}
	// private addCellBg(data:ComposemapItemVo):void
	// {
	// 	let composebg = new ComposeBg(data);
	// 	this._cellBgLayer.addChild(composebg);
	// 	egret.callLater(()=>{
	// 		this._cellBgLayer&&(this._cellBgLayer.cacheAsBitmap=true);
	// 	},this);
	// }

	// 合成相关逻辑
	private initAllCompose():void
	{	
		this.posCfg = {
			"servant":1,
			"challengeTen":1,
			"levy":1,
			"city":1,
			"oneClickBuy":1
		}
		this._cellBgLayer=new BaseDisplayObjectContainer();
		this._sceneLayer.addChild(this._cellBgLayer);
		//离线收益弹窗
		if(!Api.rookieVoApi.isInGuiding && GameData.autoRes){
			if(GameData.leavetime >= 600){
				let resAdd = 0;
				for (let i = 0; i < GameData.autoRes.length; i++) {
					resAdd += GameData.autoRes[i];
				}
				if(resAdd > 0){
					ViewController.getInstance().openView(ViewConst.COMPOSE.LEVYAUTORESPOPUPVIEW);
				}
			}
		}

		this._dataList=Api.composemapVoApi.getAllCellData();

		let groupIdArr=Config.MapinfoCfg.groupIdArr;
		let gl=groupIdArr.length;
		for(let i=0;i<gl;i++)
		{
			let group=String(groupIdArr[i]);
			let cfg=Config.MapinfoCfg.getCfgByGroup(group);
			if(cfg)
			{
				if(this._dataList[cfg[0].id])
				{
					for(let key in cfg)
					{
						if(cfg.hasOwnProperty(key))
						{
							let id=cfg[key].id;
							let ida=this._dataList[id];
							// this.addCellBg(ida);
							this.addOnePerson(ida);
							
						}
					}
				}
				else
				{
					// let rect=egret.Rectangle.create();
					// rect.setTo(0,0,368,201);
					// let bm=BaseLoadBitmap.create("composechallenge1",rect);
					// let nextGroup=Api.composemapVoApi.getNextUnlockGroup();
					// if(nextGroup == group&&Api.composemapVoApi.checkOpenUnlockGroup())
					// {
					// 	this.createBuild(group);
					// }
					
				}
			}
		}

		// for(let key in this._dataList)
		// {
		// 	let ida=this._dataList[key];
		// 	this.addOnePerson(ida);
		// }
		this.sortZ();
		// this.initTestLine();
		// this.initTestPos();
		Api.composemapVoApi.clearAddPersonList();
		this.moveToPos(this._enterPos,null,null);
	}

	// private createBuild(group:string):ComposeBuild
	// {
	// 	let bm=new ComposeBuild(group);
	// 	let startCfg=Config.MapinfoCfg.getStartPosCfgByGroup(group);
	// 	let {pixX,pixY} = ComposeStatus.getPixPosByCellPos(startCfg.x,startCfg.y);
	// 	bm.setPosition(pixX,pixY);
	// 	this._sceneLayer.addChild(bm);
	// 	bm.name=startCfg.id;
	// 	return bm;
	// }

	private sortZ():void
	{
		let keys =Object.keys(this._dataList);
		// let keys=Config.MapinfoCfg.idArr.concat();
		keys.sort((a,b)=>{
			let itema = this.getItemById(a);
			let itemb = this.getItemById(b);
			let numA=itema?itema.y:99999;
			let numB=itemb?itemb.y:99999;
			return numA-numB;
			// return Number(b)-Number(a);
		});


		let l = keys.length;
		for (let i = 0; i < l; i++) {
			const id = keys[i];
			let item = this.getItemById(id);
			item&&this._sceneLayer.setChildIndex(item,this._sceneLayer.numChildren);
		}

	}

	// private initTestPos():void
	// {
	// 	let list=Config.MapinfoCfg.mapList;
	// 	for(let id in list)
	// 	{
	// 		if(list.hasOwnProperty(id)&&!Api.composemapVoApi.getCellDataById(id))
	// 		{
	// 			let cfg=list[id];
	// 			let x=ComposeStatus.startX + cfg.x*(ComposeStatus.cellCfg.w);
	// 			let y=ComposeStatus.startY + cfg.y*(ComposeStatus.cellCfg.h);

	// 			let leftX=x-ComposeStatus.cellCfg.w/2;
	// 			let rightX=x+ComposeStatus.cellCfg.w/2;
	// 			if(leftX>=0&&rightX<=ComposeStatus.mapSize.w)
	// 			{
	// 				let t=ComponentManager.getTextField(cfg.x+","+cfg.y,14,Api.composemapVoApi.getCellDataById(id)?0x0f0f0f:0xff0000);
	// 				t.setPosition(x-t.width/2,y+20);
	// 				this._sceneLayer.addChild(t);
	// 			}
	// 		}
	// 	}
	// }

	// private initTestLine():void
	// {
	// 	let w=18;
	// 	let h=16;
	// 	let line=new BaseShape();
	// 	line.graphics.beginFill(0);
	// 	line.graphics.lineStyle(1,0);
	// 	let idx=this._sceneLayer.getChildIndex(this._sceneLayer);
	// 	this._sceneLayer.addChildAt(line,idx);

	// 	for(let j=0;j<h;j++)
	// 	{
			
	// 		let tmpw=0;
	// 		let tmph=j;
	// 		let {pixX,pixY} = ComposeStatus.getLeftTopPixByPos(tmpw,tmph);
	// 		let tx=pixX;
	// 		let ty=pixY;
	// 		// while(tx<0)
	// 		// {
	// 		// 	tmpw++;
	// 		// 	let {pixX,pixY} = ComposeStatus.getLeftTopPixByPos(tmpw,tmph);
	// 		// 	tx=pixX;
	// 		// 	ty=pixY;
	// 		// }
	// 		line.graphics.moveTo(tx,ty);
			
	// 		tmpw=w;
	// 		tmph=j;
	// 		let dataPos = ComposeStatus.getLeftTopPixByPos(tmpw,tmph);
	// 		tx=dataPos.pixX;
	// 		ty=dataPos.pixY;
	// 		// while(tx>ComposeStatus.mapSize.w)
	// 		// {
	// 		// 	tmpw--;
	// 		// 	let dataPos = ComposeStatus.getLeftTopPixByPos(tmpw,tmph);
	// 		// 	tx=dataPos.pixX;
	// 		// 	ty=dataPos.pixY;
	// 		// }
	// 		line.graphics.lineTo(tx,ty);
	// 	}

	// 	for(let i=0;i<w;i++)
	// 	{
	// 		let tmpw=i;
	// 		let tmph=0;
	// 		let dataPos = ComposeStatus.getLeftTopPixByPos(tmpw,tmph);
	// 		let tx=dataPos.pixX;
	// 		let ty=dataPos.pixY;

	// 		// while(tx>ComposeStatus.mapSize.w)
	// 		// {
	// 		// 	tmph++;
	// 		// 	let dataPos = ComposeStatus.getLeftTopPixByPos(tmpw,tmph);
	// 		// 	tx=dataPos.pixX;
	// 		// 	ty=dataPos.pixY;
	// 		// }

	// 		line.graphics.moveTo(tx,ty);

	// 		tmpw=i;
	// 		tmph=h;
	// 		dataPos = ComposeStatus.getLeftTopPixByPos(tmpw,tmph);
	// 		tx=dataPos.pixX;
	// 		ty=dataPos.pixY;

	// 		// while(tx<0)
	// 		// {
	// 		// 	tmph--;
	// 		// 	dataPos = ComposeStatus.getLeftTopPixByPos(tmpw,tmph);
	// 		// 	tx=dataPos.pixX;
	// 		// 	ty=dataPos.pixY;
	// 		// }
	// 		line.graphics.lineTo(tx,ty);
	// 	}
	// 	line.graphics.endFill();
	// }



	protected isNpcNameMove():boolean
	{
		return false;
	}

	private itemMoveHandler(e:egret.Event):void
	{
		let pixX:number=e.data.pixX;
		let pixY:number=e.data.pixY;
		let x:number=e.data.x;
		let y:number=e.data.y;
		this.findComposeItem(pixX,pixY,x,y);
	}

	protected initNPC():void
	{
		
	}

	private getCellPosByPixPos(pixX:number,pixY:number):{x:number,y:number}
	{
		let stagePos=this._sceneLayer.localToGlobal(pixX,pixY);
		let selectPos=ComposeStatus.curSelectPos;
		let oldId=Config.MapinfoCfg.getIdByPos(selectPos.x,selectPos.y);
		let oldData=Api.composemapVoApi.getCellDataById(oldId);
		for(let key in this._dataList)
		{
			if(this._dataList.hasOwnProperty(key))
			{
				let vo = this._dataList[key];
				if(vo.id!=oldId&&vo.lv==oldData.lv)
				{
					let item = this.getItemById(key);
					if(vo.lv&&item)
					{
						if(item.checkHit(stagePos.x,stagePos.y))
						{
							return {x:vo.x,y:vo.y};
						}
					}
				}
			}
		}
		return {x:-1,y:-1};
	}


	private findComposeItem(pixX:number,pixY:number,oldX:number,oldY:number):void
	{
		let oldId=Config.MapinfoCfg.getIdByPos(oldX,oldY);
		let oldData=Api.composemapVoApi.getCellDataById(oldId);
		let lastStop={x:ComposeStatus.curStopPos.x,y:ComposeStatus.curStopPos.y};
		let {x,y}=this.getCellPosByPixPos(pixX,pixY);
		// let {x,y}=ComposeStatus.getCellPosByPixPos(pixX,pixY);
		// console.log(x,y,lastStop.x,lastStop.y);
		// if(Config.MapinfoCfg.checkCanPos(x,y))
		// {
			ComposeStatus.curStopPos.x=x;
			ComposeStatus.curStopPos.y=y;
		// }
		// else
		// {
		// 	ComposeStatus.curStopPos.x=-1;
		// 	ComposeStatus.curStopPos.y=-1;
		// }
		let notFind:boolean=false;
		notFind=(x==oldX && y==oldY);
		let id=Config.MapinfoCfg.getIdByPos(x,y);
		let newData=Api.composemapVoApi.getCellDataById(id);
		let selectItem=this.getItemById(oldId);
		let nitem=this.getItemById(id);
		// console.log("id---"+id)
		if(selectItem)
		{
			selectItem.setCellStatus(!!newData);
		}
		if(!notFind)
		{
			if((!oldData)||(!newData)||(oldData.lv!=newData.lv))
			{
				notFind=true;
			}
		}

		let sameChange:boolean=(lastStop.x!=x||lastStop.y!=y);

		let setStatus=(showSelectCompose?:boolean)=>
		{
			if(lastStop.x!=x||lastStop.y!=y)
			{
				let lastId=Config.MapinfoCfg.getIdByPos(lastStop.x,lastStop.y);
				let lastItem=this.getItemById(lastId);
				if(lastItem)
				{
					lastItem.recoveryBmp();
					if(showSelectCompose)
					{
						if(selectItem)
						{
							egret.Tween.removeTweens(selectItem);
							selectItem.showForCompose();
						}
					}
				}
			}
		}
		if(notFind)
		{
			this.hideComposeItems();
			ComposeStatus.targetList={};
			// console.log("nofind");
			setStatus(true);
			return;
		}
		if(ComposeStatus.targetList[id])
		{
			if(sameChange)
			{
				this.showComposeItems();
				setStatus(true);
				if(nitem)
				{
					nitem.showNextLvBmp();
					if(selectItem)
					{
						selectItem.hideForCompose();
					}
				}
			}
			return;
		}
		// ComposeStatus.targetList={};
		this.hideComposeItems();
		ComposeStatus.targetList={};
		this._tmpNotFind={x:oldX,y:oldY};
		this.findAllSameLv(oldX,oldY,x,y);
		// this.findOne(oldX,oldY,x,y);
		this._tmpNotFind=null;
		this._findedPos={};
		this.showComposeItems();
		if(nitem)
		{
			nitem.showNextLvBmp();
			if(selectItem)
			{
				selectItem.hideForCompose();
			}
			setStatus();
		}
		// console.log(ComposeStatus.curStopPos);
	}

	private findNearly(x:number,y:number):void
	{
		this.findOne(x,y,x-1,y);
		this.findOne(x,y,x,y-1);
		this.findOne(x,y,x+1,y);
		this.findOne(x,y,x,y+1);
	}

	private findOne(x:number,y:number,nx:number,ny:number): void
	{
		let nid=Config.MapinfoCfg.getIdByPos(nx,ny);
		let oid=Config.MapinfoCfg.getIdByPos(x,y);
		let ida=Api.composemapVoApi.getCellDataById(nid);
		let oida=Api.composemapVoApi.getCellDataById(oid);
		let continueFind:boolean=true;
		if(this._tmpNotFind&&this._tmpNotFind.x==nx&&this._tmpNotFind.y==ny)
		{
			continueFind=false;
		}
		let idaId=ida&&Config.MapinfoCfg.getIdByPos(ida.x,ida.y);
		if(ida&&oida&&ida.lv==oida.lv&&continueFind&&!this._findedPos[idaId])
		{
			ComposeStatus.targetList[idaId]=ida;
			this._findedPos[idaId]=1;
			if(Api.composemapVoApi.checkCanBath())
			{
				this.findNearly(ida.x,ida.y);
			}
			// console.log("find",ida.x,ida.y);
		}
	}

	private findAllSameLv(x:number,y:number,nx:number,ny:number):void
	{
		let nid=Config.MapinfoCfg.getIdByPos(nx,ny);
		let oid=Config.MapinfoCfg.getIdByPos(x,y);
		let ida=Api.composemapVoApi.getCellDataById(nid);
		let oida=Api.composemapVoApi.getCellDataById(oid);
		let continueFind:boolean=true;
		if(this._tmpNotFind&&this._tmpNotFind.x==nx&&this._tmpNotFind.y==ny)
		{
			continueFind=false;
		}
		let idaId=ida&&Config.MapinfoCfg.getIdByPos(ida.x,ida.y);
		if(ida&&oida&&ida.lv==oida.lv&&continueFind)
		{
			// this._findedPos[idaId]=1;
			if(Api.composemapVoApi.checkCanBath())
			{
				// this.findNearly(ida.x,ida.y);
				let lvList=Api.composemapVoApi.getLvList(ida.lv);
				let lvl=lvList.length;
				for(let i=0;i<lvl;i++)
				{
					let tid=lvList[i];
					if(tid==oid)
					{
						continue;
					}
					ComposeStatus.targetList[tid]=Api.composemapVoApi.getCellDataById(tid);
					this._findedPos[tid]=1;
				}
			}
			else
			{
				ComposeStatus.targetList[idaId]=ida;
				this._findedPos[idaId]=1;
			}
		}
	}

	private showComposeItems():void
	{
		for(let key in ComposeStatus.targetList)
		{
			let item=this.getItemById(key);
			if(item)
			{
				item.showComposeStatus();
			}
		}
	}
	private hideComposeItems():void
	{
		for(let key in ComposeStatus.targetList)
		{
			let item=this.getItemById(key);
			if(item)
			{
				item.hideComposeStatus();
			}
		}
		// ComposeStatus.targetList={};
	}

	private fastTick(t:number):void
	{
		if(this.isInit())
		{
			if(this._lastSortT<0||t-this._lastSortT>200)
			{
				this.sortZ();
				this._lastSortT=t;
			}
		}
	}

	public dispose():void
	{
		this.stopCheckMoveMap();
		this.removeEvents();
		GameData.announcementData = null
		// this._sceneLayer=null;
		// this._unlockGroupList.length=0;
		this._dataList={};
		this._isBeginning=false;
		this._startPos=null;
		this._startStagePos=null;
		this._startLocalPos=null;
		this._selectRenId=null;
		this._isMoved=false;
		// this._unlockGroupList=[];
		this._dailyDelCount=-1;
		this._findedPos={};
		this._tmpNotFind=null;
		this._clickHand = null;
		this._cellBgLayer=null;
		this._moveCallbackData=null;
		this._lastSortT=-1;
		ComposeStatus.clear();
		if(ComposeSelect.hasInstant())
		{
			ComposeSelect.getInstant().dispose();
		}
		super.dispose();
	}
}



enum ComposeEnums
{
	NONE,SCENE,ITEM,PINCH
}



