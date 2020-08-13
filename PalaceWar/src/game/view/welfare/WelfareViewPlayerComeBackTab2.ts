//我被召回
class WelfareViewPlayerComeBackTab2 extends CommonViewTab{
	private _inputTextField : BaseTextField = null;
	private _inputText: BaseDisplayObjectContainer = null;
	private _collect : BaseBitmap = null;
	private _collectBtn : BaseButton = null;
	private _timeTxt : BaseTextField = null;
	private _bg : BaseBitmap = null;
	private _group: BaseDisplayObjectContainer = null;
	
	public constructor(param?) {
		super();
		this.param = param;
		this.initView();
	}

	private get api(){
		return Api.newrebackVoApi;
	}

	private get cfg(){
		return Config.PlayercomebackCfg;
	}

	protected initView():void{
		let view = this;
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_REBACK_BIND, view.rewardCallback, view);

		let juzhou = BaseBitmap.create(`newinvitelistbg1`);
		view.addChild(juzhou);
		juzhou.height = GameConfig.stageHeigth - 89 - 66 - 168;
		juzhou.width = 490;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,juzhou,view,[0,0],true);
		view._bg = juzhou;

		let group = new BaseDisplayObjectContainer();
		view._group = group;
	
		let kuang = BaseBitmap.create(`newinvitelistbgkuang`);
		view.addChild(kuang);
		kuang.width = juzhou.width + 10;
		kuang.height = juzhou.height + 10;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,kuang,juzhou);
		
		let timecdTxt = ComponentManager.getTextField(`a`, 22, TextFieldConst.COLOR_BLACK);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,timecdTxt,juzhou, [0,25]);
		group.addChild(timecdTxt);
		view._timeTxt = timecdTxt;

		let myCode = view.api.getBindCode();
		let inputTxt = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL,440,40,"public_9_bg5",'',TextFieldConst.COLOR_LIGHT_YELLOW);
		group.addChild(inputTxt);
		view._inputText = inputTxt;
		view._inputTextField = <BaseTextField>inputTxt.getChildByName("textField");
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,inputTxt,timecdTxt, [0,timecdTxt.height+15]);
		//绑定
		let rewardBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, `sysConfirm`, ()=>{
			if(rewardBtn.getIsGray()){
				App.CommonUtil.showTip(LanguageManager.getlocal(`playercomebackcodetip12`));
				return;
			}
			if(Api.playerVoApi.getPlayerPower() < Config.PlayercomebackCfg.needPower){
				App.CommonUtil.showTip(LanguageManager.getlocal(`playercomebackcodetip14`, [App.StringUtil.changeIntToText(Config.PlayercomebackCfg.needPower)]));
				return;
			}
			if(view._inputTextField.text != ``){
				NetManager.request(NetRequestConst.REQUEST_REBACK_BIND,{
					bindCode:view._inputTextField.text,
				});
			}
			else{
				App.CommonUtil.showTip(LanguageManager.getlocal(`playercomebackcodetip1`));
			}
		}, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, rewardBtn, inputTxt, [0,inputTxt.height+15]);
		group.addChild(rewardBtn);
		view._collectBtn = rewardBtn;
		if(Api.playerVoApi.getPlayerPower() < Config.PlayercomebackCfg.needPower){
			rewardBtn.setGray(true);
		}

		if(view.api.getIsBindWithUid()){
			inputTxt.visible = rewardBtn.visible = timecdTxt.visible = false;
			let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`playercomebackcodetip4`, [view.api.getBindUid().toString()]), 20, TextFieldConst.COLOR_BLACK);
			group.addChild(tipTxt);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,tipTxt,inputTxt,);

			if(view.api.isSendApply() || view.api.isMyFriend(Api.newrebackVoApi.getBindUid())){
				let sendTxt = ComponentManager.getTextField(LanguageManager.getlocal(view.api.isSendApply() ? `newinvitecodetip5` : 'newinvitecodetip11'), 20, TextFieldConst.COLOR_BLACK);
				group.addChild(sendTxt);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,sendTxt,tipTxt, [0,tipTxt.textHeight+15]);
			}
			else{
				let sendBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, `newinvitecodetip6`, ()=>{
						if(Api.playerVoApi.getPlayerLevel() < GameConfig.config.friendCfg.needLv){
							App.CommonUtil.showTip(LanguageManager.getlocal(`dailyTask_friendTip`));
							return;
						}
						NetManager.request(NetRequestConst.REQUEST_FRIEND_APPLY,{fuid:Api.newrebackVoApi.getBindUid()});
						sendBtn.visible = false;
						App.CommonUtil.showTip(LanguageManager.getlocal(`newinvitecodetip5`));
						let sendTxt = ComponentManager.getTextField(LanguageManager.getlocal(`newinvitecodetip5`), 20, TextFieldConst.COLOR_BLACK);
						group.addChild(sendTxt);
						App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,sendTxt,tipTxt, [0,tipTxt.textHeight+15]);
					
				}, view);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, sendBtn, inputTxt, [0,inputTxt.height+15]);
				group.addChild(sendBtn);
				if(Api.playerVoApi.getPlayerLevel() < GameConfig.config.friendCfg.needLv){
					sendBtn.setGray(true);
				}
			}
		}

		let limitday = 7;
		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`playercomebackcodetip2`,[Api.playerVoApi.getPlayerOfficeByLevel(Config.PlayerreturnCfg.playerStatusneed), Config.PlayerreturnCfg.timeGap[0].toString(), App.StringUtil.changeIntToText(Config.PlayercomebackCfg.needPower), limitday.toString()]), 20, 0x635346);
		group.addChild(tipTxt);
		tipTxt.width = 400;
		tipTxt.lineSpacing = 5;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,tipTxt,rewardBtn, [0,rewardBtn.height+25]);
		tipTxt.x = 25;

		let tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(`playercomebackcodetip3`), 20, 0x3e1f0f);
		group.addChild(tipTxt2);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,tipTxt2,rewardBtn,[0,rewardBtn.height + 25 + tipTxt.height+40]);

		//奖励
		let rewardBg = BaseBitmap.create("public_9_bg96");
		rewardBg.width = 450;
		rewardBg.height = 115;
		rewardBg.x = juzhou.x +20;
		rewardBg.y = tipTxt2.y + tipTxt2.height + 7;
		group.addChild(rewardBg);

		let str = Config.PlayercomebackCfg.backReward;
        let contentList = GameData.formatRewardItem(str);
        let reward = ""
		let scroStartY = rewardBg.y + 13;
        let tmpX = rewardBg.x + 10;
		let deltaS = 0.74;
        for (let index = 0; index < contentList.length; index++) {
			let tmpData = contentList[index];
			let iconItem = GameData.getItemIcon(tmpData,true,true);
			iconItem.setScale(deltaS);
			iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width*deltaS+7);
			
            if (tmpX > (rewardBg.x+ rewardBg.width))
            {
                tmpX = rewardBg.x + 13
                scroStartY += iconItem.height*deltaS + 7;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width*deltaS+7);
            }
			group.addChild(iconItem);
		}
        scroStartY += 93;
		rewardBg.height = scroStartY - rewardBg.y + 2;

		let tmpVo = Api.newrebackVoApi;
		let collectFlag = BaseBitmap.create("collectflag")
		collectFlag.anchorOffsetX = collectFlag.width/2;
		collectFlag.anchorOffsetY = collectFlag.height/2;
		collectFlag.setScale(0.7);
		collectFlag.x = rewardBg.x + (rewardBg.width - collectFlag.width)/2 + collectFlag.anchorOffsetX;
		collectFlag.y = rewardBg.y + rewardBg.height + 15 + collectFlag.anchorOffsetY;
		group.addChild(collectFlag);
		collectFlag.visible = tmpVo.isGetInviteBind();
		view._collect = collectFlag;

		let scrollview = ComponentManager.getScrollView(group, new egret.Rectangle(0,0,juzhou.width,juzhou.height-10));
		view.addChild(scrollview);
		scrollview.horizontalScrollPolicy = `off`;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,scrollview,juzhou,[0,0]);
		TickManager.addTick(view.tick, view);
		view.tick();
	}

	private rewardCallback(evt : egret.Event):void{		
		let view = this;
		let group = view._group;
		if(evt.data.ret){
			let rData = evt.data.data.data;
			//绑定成功
			if(rData.bindFlag == 1){
				let rewards = rData.rewards;
				let rewardList =  GameData.formatRewardItem(rewards);
				// App.CommonUtil.playRewardFlyAction(rewardList,  view._collectBtn.localToGlobal(view._collectBtn.width/2 + 50,20));
				ViewController.getInstance().openView(ViewConst.POPUP.ACDESTROYSAMESHOWREWARDVIEW,{
					rewards : rewards, 
				});

				view._collect.visible = false;
				view._collect.setScale(1.3);
				view._collect.visible = true;
				egret.Tween.get(view._collect).to({scaleX:0.7,scaleY:0.7},300);

				if(view.api.getIsBindWithUid()){
					view._inputText.visible = view._collectBtn.visible = view._timeTxt.visible = false;
					let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`playercomebackcodetip4`, [view.api.getBindUid().toString()]), 20, TextFieldConst.COLOR_BLACK);
					group.addChild(tipTxt);
					App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,tipTxt,view._inputText);
		
					if(view.api.isSendApply() || view.api.isMyFriend(Api.newrebackVoApi.getBindUid())){
						let sendTxt = ComponentManager.getTextField(LanguageManager.getlocal(view.api.isSendApply() ? `newinvitecodetip5` : 'newinvitecodetip11'), 20, TextFieldConst.COLOR_BLACK);
						group.addChild(sendTxt);
						App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,sendTxt,tipTxt, [0,tipTxt.textHeight+15]);
					}
					else{
						let sendBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, `newinvitecodetip6`, ()=>{
							if(Api.playerVoApi.getPlayerLevel() < GameConfig.config.friendCfg.needLv){
								App.CommonUtil.showTip(LanguageManager.getlocal(`dailyTask_friendTip`));
								return;
							}
							NetManager.request(NetRequestConst.REQUEST_FRIEND_APPLY,{fuid:Api.newrebackVoApi.getBindUid()});
							sendBtn.visible = false;
							App.CommonUtil.showTip(LanguageManager.getlocal(`newinvitecodetip5`));
							let sendTxt = ComponentManager.getTextField(LanguageManager.getlocal(`newinvitecodetip5`), 20, TextFieldConst.COLOR_BLACK);
							group.addChild(sendTxt);
							App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,sendTxt,tipTxt, [0,tipTxt.textHeight+15]);
						
						}, view);
						App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, sendBtn, view._inputText, [0,view._inputText.height+15]);
						group.addChild(sendBtn);
						if(Api.playerVoApi.getPlayerLevel() < GameConfig.config.friendCfg.needLv){
							sendBtn.setGray(true);
						}
					}
				}
		
			}
			else{
				App.CommonUtil.showTip(LanguageManager.getlocal(`playercomebackbindtip${rData.bindCode}`));
			}
        }
	}

	private tick():void{
		let view = this;
		let time = view.api.getLimitCD();
		if(time > 0 && view.api.isInReturnTime()){
			view._timeTxt.text = LanguageManager.getlocal(`playercomebackcodetip11`, [App.DateUtil.getFormatBySecond(time, 17)]);
			view._collectBtn.setGray(false);
		}
		else{
			view._timeTxt.text = LanguageManager.getlocal(`playercomebackcodetip12`);
			view._collectBtn.setGray(true);
		}
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,view._timeTxt,view._bg, [0,25]);
	}

	public dispose():void{
		let view = this;
		TickManager.removeTick(view.tick, view);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_REBACK_BIND, view.rewardCallback, view);
		view._inputTextField = null;
		view._inputText = null;
		view._collect = null;
		view._collectBtn = null;
		view._timeTxt = null;
		view._bg = null;
		view._group.dispose();
		view._group = null;
		super.dispose();
	}

}