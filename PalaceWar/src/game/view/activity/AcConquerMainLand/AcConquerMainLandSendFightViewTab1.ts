/*
author : qinajun
*/
class AcConquerMainLandSendFightViewTab1 extends CommonViewTab{
	private _totalNumTxt : BaseTextField = null;
	private _totalBg : BaseBitmap = null;
	private _armyicon : BaseBitmap = null;
	private _tipTxt : BaseTextField = null;
	private _fightList : ScrollList = null;
	private _haveTxt : BaseTextField = null;
	private _costIcon : BaseLoadBitmap = null;
	private _costTxt : BaseTextField = null;
	private _costButton : BaseButton = null;
	private _servantList : ScrollList = null;
	private _mask : BaseBitmap = null;
	private _flag : BaseBitmap = null;
	private _servantSelect : any = {};
	private _army = 1;
	private _allSelectbtn : BaseButton = null;
	private _tipBg : BaseBitmap = null;
	private _collectbtn : BaseButton = null;
	
	public constructor(data){
		super();
		this.param = data;
		this.initView();
	}

	private get cfg() : Config.AcCfg.ConquerMainLandCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcConquerMainLandVo{
        return <AcConquerMainLandVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	private get acTivityId() : string{
        return `${this.param.data.aid}-${this.code}`;
	}
	
	private get uiCode():string{
		let baseview : any = ViewController.getInstance().getView('AcConquerMainLandSendFightView');
		let code = baseview.getUiCode();
		return code;
	}
	
	protected initView():void
	{	
		let view = this;
		let army = view._army;
		let baseview : any = ViewController.getInstance().getView('AcConquerMainLandSendFightView');
		view.height = baseview.tabHeight;
		view.width = baseview.tabWidth;
		let code = view.uiCode;
		let level = view.param.data.level;
        let num = view.param.data.num;
        let pos = view.param.data.pos;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAINLAND_SERVANT_CHANGE,view.checkBuzhen,view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_CANCELSERVANT),this.cancelCallBack,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_SELECTSERVANT),this.sendCallBack,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_USEITEM),this.useItemCallback,this);
		// App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        let Bg = BaseBitmap.create("public_9_bg11");
		Bg.width = view.width;  
		Bg.height = view.height;
		view.addChild(Bg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, Bg, view);

		let topBg = BaseBitmap.create(`mlservantbg-${code}`);
		if(!this.vo.checkIsJJL)
		{
			topBg.height = 361;
		}
		view.addChild(topBg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, Bg);

		let kuangbg = BaseBitmap.create(`public_9_bg67`);
		kuangbg.width = topBg.width;
		kuangbg.height = topBg.height;
		view.addChild(topBg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, kuangbg, topBg);

		let scoreTxtBg = BaseBitmap.create("countrywarrewardview_itembg");
		view.addChild(scoreTxtBg);
		view._totalBg = scoreTxtBg;

		let armyicon = BaseBitmap.create(`mainlandarmyicon${army}-${code}`);
		armyicon.setScale(0.45);
		view.addChild(armyicon);
		view._armyicon = armyicon;

		let totalnum = view.getTotalNum();
		let scoreTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandArmyScore-${code}`, [LanguageManager.getlocal(`acmainlandarmy${army}-${code}`), App.StringUtil.changeIntToText(totalnum)]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
		view.addChild(scoreTxt);
		view._totalNumTxt = scoreTxt;

		scoreTxtBg.width = scoreTxt.textWidth + 80;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scoreTxtBg, Bg, [0,15]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, armyicon, scoreTxtBg, [-25,0]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scoreTxt, scoreTxtBg);

		if(!this.vo.checkIsJJL)
		{
			let tipBg = BaseBitmap.create(`alliance_taskwotdbg1`);
			let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandArmyEffect-${code}`, [LanguageManager.getlocal(`acmainlandarmy${army}-${code}`), App.StringUtil.changeIntToText(view.vo.getAddpower(view._army))]), 20, TextFieldConst.COLOR_LIGHT_YELLOW)
			view.addChild(tipBg);
			view._tipBg = tipBg;
			
			tipBg.width = tipTxt.width + 100;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipBg, scoreTxtBg, [0,scoreTxtBg.height + 7]);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, tipBg);
			view.addChild(tipTxt);
			view._tipTxt = tipTxt;
		}

		let listbg = BaseBitmap.create(`mlservantlistbg-${code}`);
		listbg.width = 589;
		listbg.height = 250;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, scoreTxtBg, [0,scoreTxtBg.height + 15]);
		view.addChild(listbg);
		if(!view.vo.checkIsJJL)
		{
			listbg.y += 30;
		}

		let servantObj = [];
		if(view.vo.isArmySend(army)){
			servantObj = view.vo.getArmyServant(army);
		}
		else{
			servantObj = view.vo.getLastTeamInfo(army);
		}
		view._servantSelect = {};
		let tmp = [];
		for(let i in servantObj){
			view._servantSelect[servantObj[i].data.servantId] = 1;
		}
		for(let i = 0; i < 10; ++ i){
			if(servantObj[i]){
				tmp.push(servantObj[i]);
			}
			else{
				tmp.push({
					empty : true
				});
			}
		}
		let tmpRect =  new egret.Rectangle(0,0,listbg.width - 15,listbg.height - 30);
		let scrollList = ComponentManager.getScrollList(AcConquerMainLandSearvantItem, tmp, tmpRect, view.code);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [5, 15]);
		view.addChild(scrollList); 
		scrollList.bounces = false;
		scrollList.verticalScrollPolicy = 'off';
		view._fightList = scrollList;

		let bottomBg = BaseBitmap.create(`arena_bottom`);
        bottomBg.height = 120;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
		view.addChild(bottomBg);

		let obj = Api.servantVoApi.getServantInfoList();
		let arr = [];
		for(let i in obj){
			let attend = view.vo.getServantAttend(obj[i].servantId);
			arr.push({
				army : army,
				data : obj[i],
				isAttend : attend > 0 && attend != army
			});
		}
		arr.sort((a,b)=>{
			if(a.isAttend && b.isAttend){
				return b.data.total - a.data.total;
			}
			else if(a.isAttend){
				return 1;
			}
			else if(b.isAttend){
				return -1;
			}
			else{
				return b.data.total - a.data.total;
			}
		});
		//一键上阵
		let allSelectbtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, `acConquerMainLandAllselect-${code}`, ()=>{
			//
			let flag = true;
			for(let i in arr){
				let attend = view.vo.getServantAttend(arr[i].data.servantId);
				if(attend == 0){
					flag = false;
					break;
				}
			}
			if(flag){
				App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip15-${code}`));
                return;
			}
			if(!view.vo.isArmySend(army)){
				view._servantSelect = {};
				let count = 0;
				for(let i = 0; i < arr.length; ++ i){
					let attend = view.vo.getServantAttend(arr[i].data.servantId);
					if(attend == 0){
						view._servantSelect[arr[i].data.servantId] = 1;
						++ count;
						if(count == view.cfg.teamInfo.main){
							break;
						}
					}	
				}
				view.freshServant();
			}
		}, view);
		if(this.vo.checkIsJJL)
		{
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, allSelectbtn, bottomBg, [90,15]);
		}else
		{
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, allSelectbtn, bottomBg, [25,15]);
		}
		view.addChild(allSelectbtn);
		allSelectbtn.setEnable(!view.vo.isArmySend(army));
		view._allSelectbtn = allSelectbtn;

		//募兵
		let collectbtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, `acConquerMainLandCollect-${code}`, ()=>{
			//
			if(view.vo.getItemNum() == 0){
				App.CommonUtil.showTip(LanguageManager.getlocal('itemNumNotEnough'));
				return;
			}
			ViewController.getInstance().openView(ViewConst.POPUP.ACCONQUERMAINLANDITEMUSEPOPUPVIEW,{
				aid:this.aid,
				code:this.code,
				army : this._army
			});
		}, view);
		if(!this.vo.checkIsJJL)
		{
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, collectbtn, bottomBg, [0,15]);
			view.addChild(collectbtn);
			collectbtn.setGray(view.vo.getItemNum() == 0);
			view._collectbtn = collectbtn;

			let icon = BaseBitmap.create(`mainlangdicon2-${code}`);
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, collectbtn, [30,-icon.height+4]);
			view.addChild(icon);

			let itemHaveTxt = ComponentManager.getTextField(`1/${view.vo.getItemNum()}`, 20, TextFieldConst.COLOR_LIGHT_YELLOW)
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, itemHaveTxt, icon, [icon.width + 3,0]);
			view.addChild(itemHaveTxt);
			view._haveTxt = itemHaveTxt;
		}

		//出战
		let fightbtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, view.vo.isArmySend(army) ? `allianceWarUseServantBtn2` : `acConquerMainLandFight-${code}`, ()=>{
			//
			if(view.vo.isArmySend(army)){
				let info = view.vo.getArmyInfo(army);
				let level = info.citylevel;
				let num = info.cityNum;
				let pos = info.cityIdx;
				//撤回
				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					msg : LanguageManager.getlocal(this.vo.getThisCn("acConquerMainLandTip21"), [LanguageManager.getlocal(`acmainlandarmy${view._army}-${view.uiCode}`),  view.vo.getCityName(`${level}_${num}_${pos}`)]),
					title : `itemUseConstPopupViewTitle`,
					touchMaskClose : true,
					callback : ()=>{
						if(!view.vo.isInActivity()){
							App.CommonUtil.showTip(LanguageManager.getlocal('acBattlePassTimeEnd'));
							return;
						}	
						if(view.vo.getCurPeriod() == 3){
							App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip25-${code}`));
							//关闭到预热
							App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MAINLAND_CLOSE);
							return;
						}	
						//发撤回消息
						NetManager.request(NetRequestConst.REQUEST_MAINLAND_CANCELSERVANT,{
                            activeId : view.acTivityId, 
                            teamnum : army
                        });
					},
					handle : view,
					needClose : 1,
					needCancel : true,
				});
			}
			else{
				if(Object.keys(view._servantSelect).length == 0){
					App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip16-${code}`));
					return;
				}
				let enermyinfo = view.param.data.data;
				let totalnum = view.getTotalNum();
				if(enermyinfo.isNpc && enermyinfo.score > totalnum){
					App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip17-${code}`));
					return;
				}
				if(Number(Api.playerVoApi.getPlayerID()) == Number(view.param.data.uid)){
					App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip33-${code}`));
					return;
				}
				if(Api.playerVoApi.getPlayerGem() >= Number(view._costTxt.text)){
					if(Object.keys(view._servantSelect).length < view.cfg.teamInfo.main){
						view.servantnumConfirm();
					}
					else{
						if(Number(view._costTxt.text) == 0){
							//出战
							let tmp = [];
							let serlist = [];
							for(let i in view._servantSelect){
								let obj : ServantInfoVo = Api.servantVoApi.getServantObj(i);
								serlist.push({
									id : obj.servantId,
									total : obj.total
								});
							}
							serlist.sort((a,b)=>{
								return a.total - b.total;
							});

							for(let i in serlist){
								tmp.push(serlist[i].id);
							}

							NetManager.request(NetRequestConst.REQUEST_MAINLAND_SELECTSERVANT,{
								activeId : view.acTivityId, 
								sids : tmp,
								teamnum : view._army,
								mainland : level,
								building : num,
								segment : pos, 
								fuid : view.param.data.uid
							});
						}
						else{
							view.costConfirm();
						}
						
					}
				}
				else{
					ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
						msg : LanguageManager.getlocal(`acConquerMainLandTip19-${code}`, [view._costTxt.text]),
						title : `itemUseConstPopupViewTitle`,
						touchMaskClose : true,
						callback : ()=>{
							if(!view.vo.isInActivity()){
								App.CommonUtil.showTip(LanguageManager.getlocal('acBattlePassTimeEnd'));
								return;
							}		
							//充值
							ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
						},
						handle : view,
						needClose : 1,
						needCancel : true,
						confirmTxt : `gotocharge`
					});
				}
			}
		}, view);
		if(this.vo.checkIsJJL)
		{
			App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, fightbtn, bottomBg, [90,15]);
		}else
		{
			App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, fightbtn, bottomBg, [25,15]);
		}
		view.addChild(fightbtn);
		view._costButton = fightbtn;

		let icon2 = BaseLoadBitmap.create(`itemicon1`);
		icon2.width = icon2.height = 33;
		view.addChild(icon2);
		view._costIcon = icon2;

		let costTxt = ComponentManager.getTextField(``, 20, TextFieldConst.COLOR_LIGHT_YELLOW)
		view.addChild(costTxt);
		view._costTxt = costTxt;

		view.checkCost();
		 
		//选择门客
		let tmpRect2 =  new egret.Rectangle(0,0,600,bottomBg.y - kuangbg.y - kuangbg.height - 10);
		let servantlist = ComponentManager.getScrollList(AcConquerMainLandSearvantSelectItem, arr, tmpRect2, view.code);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, servantlist, kuangbg, [5,kuangbg.height + 10]);
		view.addChild(servantlist); 
		servantlist.bounces = false;
		view._servantList = servantlist;

		let mask = BaseBitmap.create(`mlservantmask-${code}`);
		mask.width = listbg.width;
		mask.height = listbg.height
		view.addChild(mask);
		view._mask = mask;
		view.setLayoutPosition(LayoutConst.horizontalCentertop, mask, listbg);

		let flag = BaseBitmap.create(`mlservantinfight-${code}`);
        view.addChild(flag);
		view._flag= flag;
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, flag, mask);

		mask.visible = flag.visible = view.vo.isArmySend(army);
		view.update();
		// let tmpRect =  new egret.Rectangle(0,0,listbg.width - 10,listbg.height - 10);
		// let scrollList = ComponentManager.getScrollList(AcConquerMainLandTimebuffItem, view.cfg.timeAndBuff, tmpRect, view.code);
		// view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [0, 5]);
        // view.addChild(scrollList); 
        // scrollList.bounces = false;
	}

	//消耗元宝提示
	private costConfirm():void{
		let view = this;
		let istip = view.vo.isTip(1);
		let code = view.uiCode;
		let level = view.param.data.level;
		let num = view.param.data.num;
		let pos = view.param.data.pos;

		//出战
		let tmp = [];
		let serlist = [];
		for(let i in view._servantSelect){
			let obj : ServantInfoVo = Api.servantVoApi.getServantObj(i);
			serlist.push({
				id : obj.servantId,
				total : obj.total
			});
		}
		serlist.sort((a,b)=>{
			return a.total - b.total;
		});

		for(let i in serlist){
			tmp.push(serlist[i].id);
		}

		if(istip){
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				msg : LanguageManager.getlocal(`acConquerMainLandTip18-${code}`, [view._costTxt.text]),
				title : `itemUseConstPopupViewTitle`,
				touchMaskClose : true,
				callback : ()=>{
					if(!view.vo.isInActivity()){
						App.CommonUtil.showTip(LanguageManager.getlocal('acBattlePassTimeEnd'));
						App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MAINLAND_CLOSE);
						return;
					}		
					if(view.vo.getCurPeriod() == 3){
						App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip25-${code}`));
						//关闭到预热
						App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MAINLAND_CLOSE);
						return;
					}
					//出战
					NetManager.request(NetRequestConst.REQUEST_MAINLAND_SELECTSERVANT,{
						activeId : view.acTivityId, 
						sids : tmp,
						teamnum : view._army,
						mainland : level,
						building : num,
						segment : pos, 
						fuid : view.param.data.uid
					});
				},
				handle : view,
				needClose : 1,
				needCancel : true,
				needCheck : true,
				checkcallback : ()=>{
					//发送提示消息
					NetManager.request(NetRequestConst.REQUEST_MAINLAND_DONOTICE,{
						activeId : view.acTivityId, 
						noticetype : 1
					});	
				},
				height : 180
			}); 	
		}
		else{
			//出战
			NetManager.request(NetRequestConst.REQUEST_MAINLAND_SELECTSERVANT,{
				activeId : view.acTivityId, 
				sids : tmp,
				teamnum : view._army,
				mainland : level,
				building : num,
				segment : pos, 
				fuid : view.param.data.uid
			});
		}
	}
	
	//门客数提示
	private servantnumConfirm():void{
		let view = this;
		let code = view.uiCode;
		let istip2 = view.vo.isTip(2);
		if(istip2){
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				msg : LanguageManager.getlocal(`acConquerMainLandTip20-${code}`),
				title : `itemUseConstPopupViewTitle`,
				touchMaskClose : true,
				callback : ()=>{
					if(!view.vo.isInActivity()){
						App.CommonUtil.showTip(LanguageManager.getlocal('acBattlePassTimeEnd'));
						return;
					}
					if(Number(view._costTxt.text) == 0){
						//出战
						let code = view.uiCode;
						let level = view.param.data.level;
						let num = view.param.data.num;
						let pos = view.param.data.pos;
						//出战
						let tmp = [];
						let serlist = [];
						for(let i in view._servantSelect){
							let obj : ServantInfoVo = Api.servantVoApi.getServantObj(i);
							serlist.push({
								id : obj.servantId,
								total : obj.total
							});
						}
						serlist.sort((a,b)=>{
							return a.total - b.total;
						});

						for(let i in serlist){
							tmp.push(serlist[i].id);
						}
						//出战
						NetManager.request(NetRequestConst.REQUEST_MAINLAND_SELECTSERVANT,{
							activeId : view.acTivityId, 
							sids : tmp,
							teamnum : view._army,
							mainland : level,
							building : num,
							segment : pos, 
							fuid : view.param.data.uid
						});
					}
					else{
						view.costConfirm();
					}
				},
				handle : view,
				needClose : 1,
				needCancel : true,
				needCheck : true,
				height : 200,
				checkcallback : ()=>{
					//发送提示消息
					NetManager.request(NetRequestConst.REQUEST_MAINLAND_DONOTICE,{
						activeId : view.acTivityId, 
						noticetype : 2
					});	
				},
			}); 
		}
		else{
			view.costConfirm();	
		}
	}

	private checkBuzhen(event:egret.Event):void{
        let data = event.data;
        let view = this;
        if(!data || view.vo.isArmySend(view._army)){
            return;
		}
		let type = data.type;
		if(type == `add`){
			if(Object.keys(view._servantSelect).length == 10){
				return;
			}
			view._servantSelect[data.servantId] = 1;
		}
		else if(type == `delete`){
			delete view._servantSelect[data.servantId];
		}
		view.freshServant();
	}

	private freshServant():void{
		let view = this;
		let arr = [];
		let list : any = view._servantList;

		for(let i in view._servantSelect){
			let obj = Api.servantVoApi.getServantObj(i);
			arr.push({
				army : view._army,
				data : obj
			});
		}
		arr.sort((a,b)=>{
			return b.data.total - a.data.total;
		});
		if(arr.length < 10){
			for(let i = arr.length; i < 10; ++ i){
				arr.push({
					empty : true
				});
			}
		}
		view._fightList.refreshData(arr, view.code);

		for(let i in list._scrollListItemArr){
			let unit = <AcConquerMainLandSearvantSelectItem>list._scrollListItemArr[i];
			if(view._servantSelect[unit._servantInfoVo.servantId]){
				unit.checkSelect(1);
			}
			else{
				unit.checkSelect(2);
			}
		} 
		// view._totalNumTxt.text = LanguageManager.getlocal(`acConquerMainLandArmyScore-${view.uiCode}`, [LanguageManager.getlocal(`acmainlandarmy${view._army}-${view.uiCode}`), App.StringUtil.changeIntToText(num)]);
		view.update();
	}

	private getTotalNum():number{
		let view = this;
		let num = 0;
		for(let i in view._servantSelect){
			let obj = Api.servantVoApi.getServantObj(i);
			num += (view.vo.getAddpower(view._army) + obj.total);
		}
		return num;
	}
	
	public refreshWhenSwitchBack():void{
		let view = this;
		let servantObj = [];
		if(view.vo.isArmySend(view._army)){
			servantObj = view.vo.getArmyServant(view._army);
		}
		else{
			servantObj = view.vo.getLastTeamInfo(view._army);
		}
		let tmp = [];
		for(let i = 0; i < 10; ++ i){
			if(servantObj[i]){
				tmp.push(servantObj[i]);
			}
			else{
				tmp.push({
					empty : true
				});
			}
		}
		view._fightList.refreshData(tmp, view.code);
		view._servantSelect = {};
		for(let i in servantObj){
			view._servantSelect[servantObj[i].data.servantId] = 1;
		}
		view.freshServant();
	}


	private update():void{
		let view = this;
		let code = view.uiCode;
		let army = view._army;
		let info = view.vo.getArmyInfo(army);
		let addPower = 0;
		let totalnum = 0;
		if(view.vo.isArmySend(army)){
			addPower = info.addPower;
			totalnum = info.totalnum;
		}
		else{
			addPower = view.vo.getAddpower(view._army);
			totalnum = view.getTotalNum();
		}
		if(!this.vo.checkIsJJL)
		{
			//募兵加成
			view._tipTxt.text = LanguageManager.getlocal(`acConquerMainLandArmyEffect-${code}`, [LanguageManager.getlocal(`acmainlandarmy${army}-${code}`), App.StringUtil.changeIntToText(addPower)]);
			view._tipBg.width = view._tipTxt.textWidth + 100;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, view._tipBg, view, [0]);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._tipTxt, view._tipBg);
		}
		//总兵力
		view._totalNumTxt.text = LanguageManager.getlocal(`acConquerMainLandArmyScore-${code}`, [LanguageManager.getlocal(`acmainlandarmy${army}-${code}`), App.StringUtil.changeIntToText(totalnum)]);
		view._totalBg.width = view._totalNumTxt.textWidth + 80;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, view._totalBg, view, [0]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._armyicon, view._totalBg, [-25,0]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._totalNumTxt, view._totalBg);
		
		if(!this.vo.checkIsJJL)
		{
			//募兵道具
			view._haveTxt.text = `1/${view.vo.getItemNum()}`;
			if(view.vo.getpublicRedhot2()){
				App.CommonUtil.addIconToBDOC(view._collectbtn);
			}
			else{
				App.CommonUtil.removeIconFromBDOC(view._collectbtn);
			}
		}
		//开战消耗
		view.checkCost();
		//出战情况
		view._mask.visible = view._flag.visible = view.vo.isArmySend(army);
		view._costButton.setText(view._mask.visible ? `allianceWarUseServantBtn2` : `acConquerMainLandFight-${code}`);
		//免费次数
		let list : any = view._servantList;
		for(let i in list._scrollListItemArr){
			let unit = <AcConquerMainLandSearvantSelectItem>list._scrollListItemArr[i];
			if(view._servantSelect[unit._servantInfoVo.servantId]){
				unit.refreshData();
				unit.checkSelect(1);
			}
			else{
				unit.checkSelect(2);
			}
		} 
		//兵力刷新
		list = view._fightList;
		for(let i in list._scrollListItemArr){
			let unit = <AcConquerMainLandSearvantItem>list._scrollListItemArr[i];
			unit.refresh();
		}
	}

	//出战花费
	private checkCost():void{
		let view = this;
		let code = view.uiCode;
		let num = 0;
		for(let i in view._servantSelect){
			let tmp = view.vo.getServantCost(i);
			num += tmp.cost;
		}
		view._costTxt.text = `${num}`;
		let tmpx = (view._costButton.width - view._costIcon.width - 3 - view._costTxt.textWidth) / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view._costIcon, view._costButton, [tmpx, -view._costIcon.height]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._costTxt, view._costIcon, [view._costIcon.width + 3,0]);
		view._costIcon.visible = view._costTxt.visible = !view.vo.isArmySend(view._army);
	}

	private sendCallBack(evt : egret.Event):void{
		let view = this;
		if(!view.param){
			return;
		}
        let data = evt.data.data.data;
        let level = view.param.data.level;
        let num = view.param.data.num;
        let pos = view.param.data.pos;
        let code = view.uiCode;
		let enermyinfo = view.param.data.data;
		let baseview : any = ViewController.getInstance().getView('AcConquerMainLandSendFightView');
		if(evt.data.ret && data){
			//7 占领了npc，4打败玩家成功占领，8失败
			switch(data.conquerStat){
				case 3:
					//关闭到预热
					App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MAINLAND_CLOSE);
					return;
				case 7:
				case 9:
				case 10:
					baseview.hide();
					return;
			}
			let info = view.param.data.info;
			//刷新界面
			let wardata = {
				info : {
					team : data.fightteam.mteam,
					titleId : Api.playerVoApi.getTitleInfo(),
					zid : Api.mergeServerVoApi.getTrueZid(),
					name :  Api.playerVoApi.getPlayerName(),
				},
				tinfo : {
					team : data.fightteam.fteam,
					titleId : info.titleid,
					zid : info.zid,
					name : info.name,
				},
			}
			ViewController.getInstance().openView(ViewConst.COMMON.ACCONQUERMAINLANDWARSHOWVIEW,{
				aid : this.aid,
				code : this.code,
				wardata : wardata,
				result : data.conquerStat == 8 ? `fail` : `win`,
				callback : ()=>{
					baseview.hide();
				},
				callobj : view,
				cityName : view.vo.getCityName(`${level}_${num}`),
				cityName2 : view.vo.getCityName(`${level}_${num}_${pos}`),
				info : view.param.data.info,
			});
		}
	}

	private useItemCallback(evt : egret.Event):void{
		let view = this;
		let code = view.uiCode;
		if(evt.data.data.data.allteam)
		{
			this.vo.setMyTeamInfo(evt.data.data.data.allteam);
		}
		if(evt.data.ret && evt.data.data){
			App.CommonUtil.showTip(LanguageManager.getlocal(`recoverLeftSuccess`));
			view.update();
		}
	}

	private cancelCallBack(evt : egret.Event):void{
		let view = this;
		let code = view.uiCode;
		if(evt.data.ret && evt.data.data.data){
			if(evt.data.data.data.teamnum != view._army){
				return;
			}
			switch(evt.data.data.data.conquerStat){
				case 6:
				case 9:
					App.CommonUtil.showTip(LanguageManager.getlocal(`allianceWarCancelServantTip`));
					view._servantSelect = {};
					view.vo.clearArmyInfo(view._army);
					view.freshServant();
					view._allSelectbtn.setEnable(!view.vo.isArmySend(view._army));
					break;
			}
		}
	}

	public dispose():void{	
		let view = this;
		view._totalNumTxt = null;
		view._tipTxt = null;
		view._fightList = null;
		view._haveTxt = null;
		view._costIcon = null;
		view._costTxt = null;
		view._costButton = null;
		view._servantList = null;
		view._mask = null;
		view._flag = null;
		view._servantSelect = {};
		view._totalBg = null;
		view._armyicon = null;
		view._allSelectbtn = null;
		view._tipBg = null;
		view._collectbtn = null;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAINLAND_SERVANT_CHANGE,view.checkBuzhen,view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_CANCELSERVANT),this.cancelCallBack,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_SELECTSERVANT),this.sendCallBack,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_USEITEM),this.useItemCallback,this);		// App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ARENACHARGE),this.rewardCallBack,this);
		super.dispose();
	}
}