/**
 * 红颜转生剧情
 * author qianjun
 * date 2018/3/2
 * @class WifeChatAvgView
 */
class WifeChangeSexChatView extends CommonView {

	private _selectGroup : BaseDisplayObjectContainer = null;
	private _dialogGroup : BaseDisplayObjectContainer = null;
	private _dialogScrollview : ScrollView = null;
	private _curId = 1;
	private _startY = 10;
	private _dbbone : BaseLoadDragonBones = null;
	private _tmp = [];
	private _stopTouch = false;
	private _isEnd = false;
	private _init = false;

	public constructor() {
		super();
	}

	protected getTitleStr():string{
		return `wifeskinchat`;
	}

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"wifechatview",`tailor_iconBtn`
		]);
	}

	protected getRuleInfo(): string {
		return "wifechatrule";
    }
    
    public initView(): void {
		let view = this;
		view._init = true;
		//let skinId = (view.param.data.skinId);
		//let skincfg = Config.WifeskinCfg.getWifeCfgById(skinId);
		//let lv = view.param.data.lv;
		//let id = skincfg.levelUp[lv - 1].levelUpUnlock;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFECHAT_SELECT), this.upgradeCallback, this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFECHAT_RESET), this.resetCallback, this);
		
		//let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(skincfg.wifeId);

		//let avgselect = wifeSkinVo.avgSelect(view.param.data.skinId, lv);
		view.getAvgDialog();

		let count = 0;
        let isend = false;
        let curid = 0;
		//let curid = wifeSkinVo.getCuravgId(view.param.data.skinId, lv);

		isend = curid == Object.keys(view._tmp).length;

		view._startY = 10;
		view.width = GameConfig.stageWidth;
		view.height = GameConfig.stageHeigth;

		let desk = BaseBitmap.create(`wifechatdesk`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, desk, view);
		view.addChild(desk);
		
		let bg = BaseBitmap.create(`wifechatbg`);
		bg.height = view.height - view.titleBg.height - desk.height - 70;
		view.addChildToContainer(bg);

		let dialogGroup = new BaseDisplayObjectContainer();
		dialogGroup.width = 540;
		view._dialogGroup = dialogGroup;

		let bgrect = new egret.Rectangle(0,0,dialogGroup.width,bg.height - 30);
		let dialogScrollview = ComponentManager.getScrollView(dialogGroup,bgrect);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, dialogScrollview, bg, [0,15]);
		view.addChildToContainer(dialogScrollview);
		view._dialogScrollview = dialogScrollview;

		if(App.CommonUtil.check_dragon()){
			let dgbone = App.DragonBonesUtil.getLoadDragonBones('servantskinplot', 0, `idle3`);
			dgbone.x = GameConfig.stageWidth / 2;
			dgbone.y = GameConfig.stageHeigth - 207 + 200;
			view.addChild(dgbone);
			view._dbbone = dgbone;
			view._dbbone.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, (event) => {
				if (event.animationName == "idle2" && view._dbbone && (!view._init || event.animationName == "idle3")) {
					view._stopTouch = true;
					egret.Tween.get(view).wait(500).call(()=>{
						view.initNextDialog(true);
						egret.Tween.removeTweens(view);
					}, view);			
				}
				if((event.animationName == "idle1" && (!view._init || event.animationName == "idle3")) && view._dbbone){
					view._stopTouch = true;
					egret.Tween.get(view).wait(500).call(()=>{
						view.initNextDialog(true);
						egret.Tween.removeTweens(view);
					}, view);	
					
				}
				view._init = false;
			}, this);
		}

		let selectgroup = new BaseDisplayObjectContainer();
		selectgroup.width = 273;
		selectgroup.height = 135;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, selectgroup, desk, [0, 30]);
		view.addChild(selectgroup);
		view._selectGroup = selectgroup;

        view.initNextDialog();
		// if(curid > 1){
		// 	let nextId = 1;
		// 	let dialogCfg = this.getAvgDialog();
		// 	while(nextId && nextId <= curid){
		// 		this._curId = nextId;
		// 		view.initNextDialog(false, nextId);
		// 		if(dialogCfg[nextId] && dialogCfg[nextId].choice){
		// 			let selectarr = dialogCfg[nextId].choice;
		// 			let jumparr = dialogCfg[nextId].next;
		// 			nextId = jumparr[wifeSkinVo.getNowAvgSelected(skinId, lv, nextId) - 1];
		// 		}
		// 		else{
		// 			nextId = dialogCfg[nextId].next ? dialogCfg[nextId].next[0] : null;
		// 		}
		// 	}
		// 	if(isend){
		// 		view.initNextDialog(false, 0, true);
		// 	}
		// 	else{
		// 		view.initSelect();
		// 	}
		// 	view._stopTouch = false;
		// }
		// else{
		// 	view.initNextDialog();
		// }
	}

	public hide():void{
		if(this._stopTouch){
			return;
		}
		super.hide();
	}

	//获取数据
	private getAvgDialog():any{
		let view = this;
		view._tmp = [];
		// let skincfg = Config.WifeskinCfg.getWifeCfgById(view.param.data.skinId);
		// let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(skincfg.wifeId);
		// let lv = view.param.data.lv;

		// let id = skincfg.levelUp[lv - 1].levelUpUnlock;
		this._tmp = Config.WifeconversationCfg.getConversatiById(`3021_101`);
		return this._tmp;
	}

	//文本处理
	private initNextDialog(tween : boolean = false, juqingid?, isend?):void{
        let view = this;
        let wifeId = view.param.data.wid;
		let item = new BaseDisplayObjectContainer();
		item.width = 540;
		view._dialogGroup.addChild(item);
		//头像
		if(isend){
			let dialogTxt = ComponentManager.getTextField(LanguageManager.getlocal(`wifeskinchat5`), 22, 0x272727);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, dialogTxt, item, [0,0], true);
			item.addChild(dialogTxt);

			item.y = view._startY;
			view._startY = item.y + item.height + 5;
			view._dialogGroup.height = item.y + item.height;
			view._dialogScrollview.scrollTop = (Math.max(0 , item.y + item.height - view._dialogScrollview.height));
			view.initSelect(true,true);
		}
		else{
			let pic = null;
			let avgid = juqingid ? juqingid : this._curId;
			let dialogCfg = this.getAvgDialog();
			// let skinId = (view.param.data.skinId);
			// let skincfg = Config.WifeskinCfg.getWifeCfgById(skinId);
			// let lv = view.param.data.lv;
            // let id = skincfg.levelUp[lv - 1].levelUpUnlock;
			let text = LanguageManager.getlocal(`wifeskin3021_3021_101_${avgid}`);

			let role = 0;
		
			if(dialogCfg[avgid] && dialogCfg[avgid].role){
				role = dialogCfg[avgid].role;
			}
			let isself = role == 1;
			item.name = `dialog${avgid}`;
			if(role == 1){
				pic = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(),Api.playerVoApi.getPlayerPtitle());
				item.addChild(pic);
			}
			else if(role == 2){
				pic = new BaseDisplayObjectContainer();
				item.addChild(pic);
				
				let iconBg:BaseBitmap = BaseBitmap.create("tailor_iconBtn");
			// nameBg.width = this.width;
				iconBg.name = "bg2";
				iconBg.x = -10;
				iconBg.y = 10;
				pic.addChild(iconBg);
				let iconStr = "";

				let cfg = Api.wifeVoApi.getWifeInfoVoById(wifeId).cfg;
				iconStr = cfg.icon;
				// if(skincfg)
				// {
				// 	iconStr = skincfg.icon
				// }
				// else{
				// 	let cfg = Config.WifeCfg.getWifeCfgById(skincfg.wifeId)
				// 	iconStr = cfg.icon;
				// }
				let icon = BaseLoadBitmap.create(iconStr);
				icon.setScale(0.6);
				icon.x = -15;
				icon.y = 10;
				// icon.mask = egret.Rectangle.create().setTo(0,0,userContainer.width,500);

				var circle:egret.Shape = new egret.Shape();
				circle.graphics.beginFill(0x0000ff);
				circle.graphics.drawCircle(47,36,36);
				circle.graphics.endFill();
				circle.y = 25;
				pic.addChild(circle);
				icon.mask = circle;

				pic.addChild(icon);
			}
			else{
				pic = new BaseDisplayObjectContainer();
			}
			//文字
			let dialogTxt = ComponentManager.getTextField(text, 22, TextFieldConst.COLOR_BLACK);
			dialogTxt.width = Math.min(dialogTxt.textWidth, 355);
			dialogTxt.lineSpacing = 5;

			let txtbg = BaseBitmap.create(`public_chatbg${isself ? 1 : 2}`);
			txtbg.width = dialogTxt.width + 50;
			txtbg.height = dialogTxt.height + 20;
			item.height = Math.max(100, txtbg.height);
			txtbg.anchorOffsetX = txtbg.width / 2;
			txtbg.anchorOffsetY = txtbg.height / 2;
			txtbg.scaleX = isself ? -1 : 1;
			item.addChild(txtbg);
			item.addChild(dialogTxt);

			let flyicon = BaseBitmap.create(`wifechaticon`);
			item.addChild(flyicon);

			App.DisplayUtil.setLayoutPosition(isself ? LayoutConst.rightverticalCenter : LayoutConst.leftverticalCenter, pic, item, [0,0], true);
			App.DisplayUtil.setLayoutPosition(isself ? LayoutConst.rightverticalCenter : LayoutConst.leftverticalCenter, txtbg, pic, [pic.width, 0]);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, dialogTxt, txtbg);
			App.DisplayUtil.setLayoutPosition(isself ? LayoutConst.lefttop : LayoutConst.righttop, flyicon, txtbg, [-flyicon.width/2, -15]);
			
			if(role == 0){
				txtbg.alpha = pic.alpha = flyicon.alpha = 0;
				dialogTxt.width = 500;
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, dialogTxt, item, [0,0], true);
			}
			item.y = view._startY;
			view._startY = item.y + item.height + 5;
			view._dialogGroup.height = item.y + item.height;
			view._dialogScrollview.scrollTop = (Math.max(0 , item.y + item.height - view._dialogScrollview.height));
			if(tween){
				item.alpha = 0;
				egret.Tween.get(item).to({alpha : 1}, 800).call(()=>{
					egret.Tween.removeTweens(item);
					view.initSelect();
				}, view);	
			}
			else{
				//选择
				if(juqingid){

				}
				else{
					view.initSelect(false,true);
				}
			}
		}
	}

	private initSelect(isend : boolean = false, notween : boolean = false):void{
		let view = this;
		// let skinId = (view.param.data.skinId);
		// let skincfg = Config.WifeskinCfg.getWifeCfgById(skinId);
		// let lv = view.param.data.lv;
		let id = `3021_101`;
		let dialogCfg = this.getAvgDialog();
		let group = view._selectGroup;
		group.removeChildren();
		group.alpha = 1;
		// let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(skincfg.wifeId);
		//let avgselect = wifeSkinVo.avgSelect(view.param.data.skinId, lv);
		let avgid = this._curId;
		let role = 0;
		if(dialogCfg[avgid] && dialogCfg[avgid].role){
			role = dialogCfg[avgid].role;
		}
		let isself = role == 1;


		if(isend){
			// let resetcost = Config.WifechatCfg.resetCost;
			// let rewardvo = GameData.formatRewardItem(resetcost)[0];
			// let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `wifeskinchat4`, ()=>{
			// 	if(rewardvo.num >  Api.itemVoApi.getItemNumInfoVoById(rewardvo.id)){
			// 		App.CommonUtil.showTip(LanguageManager.getlocal("acPunishBuyTitle"));
			// 	}
			// 	else{
			// 		ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
			// 			msg : LanguageManager.getlocal(`wifeskinleveluptip5`, [rewardvo.num.toString()]),
			// 			title : `itemUseConstPopupViewTitle`,
			// 			touchMaskClose : true,
			// 			callback : ()=>{
			// 				NetManager.request(NetRequestConst.REQUEST_WIFECHAT_RESET,{
			// 					wifeId : skincfg.wifeId,
			// 					wifeSkinId : skinId,
			// 					wlv : lv,
			// 				});
			// 			},
			// 			handle : view,
			// 			needClose : 1,
            //         	needCancel : true
			// 		}); 
			// 	}
			// }, view);
			// let str1 = ComponentManager.getTextField(LanguageManager.getlocal(`wifeskinlvupcost`), 20); 
			// let icon = BaseLoadBitmap.create(rewardvo.icon); 
			// icon.width = 108;
			// icon.height = 108;
			// icon.setScale(40/108);
			// let str2 = ComponentManager.getTextField(LanguageManager.getlocal(`wifeskinlvupcostnunm`, [rewardvo.num.toString(), Api.itemVoApi.getItemNumInfoVoById(rewardvo.id).toString()]), 20); 
		
			// App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, str1, group, [(group.width - (str1.width + str2.width + icon.width * icon.scaleX))/2, 30], true);
			// App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, str1, [str1.width, 0]);
			// App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, str2, icon, [icon.width * icon.scaleX, 0]);
			// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, group, [0,23], true);
			// group.addChild(str1);
			// group.addChild(icon);
			// group.addChild(str2);
			// group.addChild(btn);
		}
		else{
			if(dialogCfg[avgid] && dialogCfg[avgid].choice){
				group.alpha = 0;
				let selectarr = dialogCfg[avgid].choice;
				let jumparr =dialogCfg[avgid].next;
				if(selectarr.length){
					let starty = (group.height - selectarr.length * 33 - (selectarr.length - 1) * 5) / 2;
					for(let i = 1; i <= selectarr.length; ++ i){
						let bg = BaseBitmap.create(`wifechatwodrsbg`);
	
						let text = LanguageManager.getlocal(`wifeskin3021_3021_101_${avgid}_${i}`);
						// if(wifeSkinVo.isAvgSelected(skinId, lv, avgid, i)){
						// 	text += `<font color=0x21eb39>（${LanguageManager.getlocal(`wifeskinchat3`)}）</font>`;
						// }
						let txt = ComponentManager.getTextField(text, 22, TextFieldConst.COLOR_LIGHT_YELLOW);
						App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, group, [0,starty], true);
						App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt, bg);
						group.addChild(bg);
						group.addChild(txt);
						bg.addTouchTap(()=>{
							if(view._stopTouch){
								return;
							}
							view._stopTouch = true;
							let curid = this._curId;
							this._curId = Number(jumparr[i - 1]);
							group.alpha = 0; 
							// NetManager.request(NetRequestConst.REQUEST_WIFECHAT_SELECT,{
							// 	wifeId : skincfg.wifeId,
							// 	wifeSkinId : skinId,
							// 	wlv : lv,
							// 	num : curid,
							// 	sel : i
							// });
						}, view);
						starty += (bg.height + 5);
					}
				}

				if(notween){
					group.alpha = 1;
					view._stopTouch = false;
				}
				else{
					egret.Tween.get(group).to({alpha : 1}, 400).wait(200).call(()=>{
						egret.Tween.removeTweens(group);
						view._stopTouch = false;
					}, view);
				}
				
				// if(App.CommonUtil.check_dragon() && !notween && !isself){
				// 	group.alpha = view._init ? 1 : 0;
				// 	view._dbbone.playDragonMovie(`idle2`, 1);
				// }
				// else{
				// 	group.alpha = 1;
				// 	view._stopTouch = false;
				// }
			}
			else{
				group.alpha = 0;
				let reward = dialogCfg[avgid].getReward; 
				if(dialogCfg[avgid].next){
					view._isEnd = false;
					let bg = BaseBitmap.create(`wifechatwodrsbg`);
				
					let txt = ComponentManager.getTextField(LanguageManager.getlocal(view._isEnd ? `wifeskinchat2` : `wifeskinchat1`), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
					App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bg, group, [0,0], true);
					App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt, bg);
					group.addChild(bg);
					group.addChild(txt);
					bg.addTouchTap(()=>{
						if(view._stopTouch){
							return;
						}
						view._stopTouch = true;
						if(view._isEnd){
							
						}
						else{
							this._curId = dialogCfg[avgid].next[0];
							if(App.CommonUtil.check_dragon()){
								group.alpha = 0; 
								view._dbbone.playDragonMovie(`idle1`, 1);
							}
							else{
								group.alpha = 1; 
								view.initNextDialog();
								view._stopTouch = false;
							}
						}
					}, view);

					if(notween){
						view._stopTouch = false;
						let nextid = dialogCfg[avgid].next[0];
						let tmprole = 0;
						if(dialogCfg[nextid] && dialogCfg[nextid].role){
							tmprole = dialogCfg[nextid].role;
						}
						if(tmprole != 1){
							this._curId = dialogCfg[avgid].next[0];
							view.initNextDialog(true);
							// if(App.CommonUtil.check_dragon()){
							// 	view._dbbone.playDragonMovie(`idle2`, 1);
							// }
							// else{
							// 	view.initNextDialog(true);
							// }
						}
						else{
							group.alpha = 1;
							view._stopTouch = false;
							// if(App.CommonUtil.check_dragon() && !notween && !isself){
							// 	group.alpha = view._init ? 1 : 0;
							// 	//view._dbbone.playDragonMovie(`idle2`, 1);
							// }
							// else{
							// 	group.alpha = 1;
							// 	view._stopTouch = false;
							// }
						}
					}
					else{
						let nextid = dialogCfg[avgid].next[0];
						let tmprole = 0;
						if(dialogCfg[nextid] && dialogCfg[nextid].role){
							tmprole = dialogCfg[nextid].role;
						}
						if(tmprole != 1){
							this._curId = dialogCfg[avgid].next[0];
							if(App.CommonUtil.check_dragon()){
								view._dbbone.playDragonMovie(`idle2`, 1);
							}
							else{
								view.initNextDialog(true);
							}
						}
						else{
							egret.Tween.get(group).to({alpha : 1}, 400).wait(200).call(()=>{
								egret.Tween.removeTweens(group);
								view._stopTouch = false;
							}, view);
							// if(App.CommonUtil.check_dragon() && !notween && !isself){
							// 	group.alpha = view._init ? 1 : 0;
							// 	//view._dbbone.playDragonMovie(`idle2`, 1);
							// }
							// else{
							// 	group.alpha = 1;
							// 	view._stopTouch = false;
							// }
						}

						
					}
				}
				else{
					view._isEnd = true;
					view.initEnd(reward);
				}
			}
		}
	}

	private initEnd(reward):void{
		let view = this;
		let skinId = (view.param.data.skinId);
		let skincfg = Config.WifeskinCfg.getWifeCfgById(skinId);
		//给奖励
		// reward
		let lv = view.param.data.lv;
		view.initNextDialog(false, 0, true);
		NetManager.request(NetRequestConst.REQUEST_WIFECHAT_SELECT,{
			wifeId : skincfg.wifeId,
			wifeSkinId : skinId,
			wlv : lv,
			num : this._curId,
			sel : 0,
		});
	}

	private upgradeCallback(evt : egret.Event):void{
		let view = this;
		if(!evt.data.ret){
			return;
		}
		if(evt.data.data.data){
			if(view._isEnd){
				//结束剧情
				view._stopTouch = false;
				if(evt.data.data.data.rewards){
					// ViewController.getInstance().openView(ViewConst.POPUP.WIFECHATUNLOCKSUCVIEW, {
					// 	end : true,
					// 	callFunc : ()=>{
					// 		ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, evt.data.data.data.rewards)
					// 	},
					// 	callObj : view
					// });
					ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, evt.data.data.data.rewards);
				}
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFECHAT_END);
				//view.hide();
			}
			else{
				if(App.CommonUtil.check_dragon()){
					view._dbbone.playDragonMovie(`idle1`, 1);
				}
				else{
					view.initNextDialog();
				}
			}
		}
	}

	private resetCallback(evt : egret.Event):void{
		let view = this;
		if(!evt.data.ret){
			return;
		}
		if(evt.data.data.data){
			view._curId = 1;
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFECHAT_END);
			view._dialogGroup.height = 0;
			view._dialogGroup.removeChildren();
			view._selectGroup.removeChildren();
			view._startY = 10;
			view._stopTouch = false;
			view._isEnd = false;
			view.initNextDialog();
		}
	}

	public dispose():void{
		let view = this;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFECHAT_RESET), this.resetCallback, this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFECHAT_SELECT), this.upgradeCallback, this);
		view._dbbone = null;
		view._startY = 10;
		view._selectGroup = null;
		view._dialogGroup = null;
		view._dialogScrollview = null;

		let skinId = (view.param.data.skinId);
		let skincfg = Config.WifeskinCfg.getWifeCfgById(skinId);
		let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(skincfg.wifeId);
		let lv = view.param.data.lv;
		if(view._curId && (wifeSkinVo.getCuravgId(skinId, lv) < view._curId)){
			NetManager.request(NetRequestConst.REQUEST_WIFECHAT_SELECT,{
				wifeId : skincfg.wifeId,
				wifeSkinId : skinId,
				wlv : lv,
				num : view._curId,
				sel : 0
			});
		}
	
		view._curId = 1;
		if(view._dbbone){
			view._dbbone.dispose();
			view._dbbone = null;
		}
		view._stopTouch = false;
		view._isEnd = false;
		super.dispose();
	}
}