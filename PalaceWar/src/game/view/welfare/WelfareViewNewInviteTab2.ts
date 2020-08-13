//接受邀请
class WelfareViewNewInviteTab2 extends CommonViewTab{
	private _inputTextField : BaseTextField = null;
	private _inputText: BaseDisplayObjectContainer = null;
	private _collect : BaseBitmap = null;
	private _collectBtn : BaseButton = null;
	
	public constructor(param?) {
		super();
		this.param = param;
		this.initView();
	}

	private get api(){
		return Api.newinviteVoApi;
	}

	private get cfg(){
		return Config.Invitefriend2Cfg;
	}

	protected initView():void{
		let view = this;
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_NEWINVITE_BIND, view.rewardCallback, view);

		let juzhou = BaseBitmap.create(`newinvitelistbg1`);
		view.addChild(juzhou);
		juzhou.height = GameConfig.stageHeigth - 89 - 66 - 168;
		juzhou.width = 490;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,juzhou,view,[0,0],true);

		let kuang = BaseBitmap.create(`newinvitelistbgkuang`);
		view.addChild(kuang);
		kuang.width = juzhou.width + 10;
		kuang.height = juzhou.height + 10;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,kuang,juzhou);
		
		let myCode = view.api.getBindCode();
		let inputTxt = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL,440,40,"public_9_bg5",'',TextFieldConst.COLOR_LIGHT_YELLOW);
		view.addChild(inputTxt);
		view._inputText = inputTxt;
		view._inputTextField = <BaseTextField>inputTxt.getChildByName("textField");
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,inputTxt,juzhou, [0,33]);
		//绑定
		let rewardBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, `sysConfirm`, ()=>{
			if(view._inputTextField.text != ``){
				NetManager.request(NetRequestConst.REQUEST_NEWINVITE_BIND,{
					bindCode:view._inputTextField.text,
				});
			}
			else{
				App.CommonUtil.showTip(LanguageManager.getlocal(`newinvitecodetip1`));
			}
		}, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, rewardBtn, inputTxt, [0,inputTxt.height+15]);
		view.addChild(rewardBtn);
		view._collectBtn = rewardBtn;

		if(view.api.getIsBindWithUid()){
			inputTxt.visible = rewardBtn.visible = false;
			let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`newinvitecodetip4`, [view.api.getBindUid().toString()]), 20, TextFieldConst.COLOR_BLACK);
			view.addChild(tipTxt);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,tipTxt,inputTxt,);

			if(view.api.isSendApply() || view.api.isMyFriend(Api.newinviteVoApi.getBindUid())){
				let sendTxt = ComponentManager.getTextField(LanguageManager.getlocal(view.api.isSendApply() ? `newinvitecodetip5` : 'newinvitecodetip11'), 20, TextFieldConst.COLOR_BLACK);
				view.addChild(sendTxt);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,sendTxt,tipTxt, [0,tipTxt.textHeight+15]);
			}
			else{
				let sendBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, `newinvitecodetip6`, ()=>{
						if(Api.playerVoApi.getPlayerLevel() < GameConfig.config.friendCfg.needLv){
							App.CommonUtil.showTip(LanguageManager.getlocal(`dailyTask_friendTip`));
							return;
						}
						NetManager.request(NetRequestConst.REQUEST_FRIEND_APPLY,{fuid:Api.newinviteVoApi.getBindUid()});
						sendBtn.visible = false;
						App.CommonUtil.showTip(LanguageManager.getlocal(`newinvitecodetip5`));
						let sendTxt = ComponentManager.getTextField(LanguageManager.getlocal(`newinvitecodetip5`), 20, TextFieldConst.COLOR_BLACK);
						view.addChild(sendTxt);
						App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,sendTxt,tipTxt, [0,tipTxt.textHeight+15]);
					
				}, view);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, sendBtn, inputTxt, [0,inputTxt.height+15]);
				view.addChild(sendBtn);
				if(Api.playerVoApi.getPlayerLevel() < GameConfig.config.friendCfg.needLv){
					sendBtn.setGray(true);
				}
			}
		}

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`newinvitecodetip2`), 20, 0x635346);
		view.addChild(tipTxt);
		tipTxt.lineSpacing = 5;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,tipTxt,rewardBtn, [0,rewardBtn.height+25]);
		tipTxt.x = 25;

		let tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(`newinvitecodetip3`), 20, 0x3e1f0f);
		view.addChild(tipTxt2);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,tipTxt2,rewardBtn, [0,rewardBtn.height+155]);

		//奖励
		let rewardBg = BaseBitmap.create("public_9_bg96");
		rewardBg.width = 450;
		rewardBg.height = 115;
		rewardBg.x = juzhou.x +20;
		rewardBg.y = tipTxt2.y + tipTxt2.height + 7;
		view.addChild(rewardBg);

		let str = Config.Invitefriend2Cfg.bindReward;
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
			view.addChild(iconItem);
		}
        scroStartY += 93;
		rewardBg.height = scroStartY - rewardBg.y + 2;

		let tmpVo = Api.newinviteVoApi;
		let collectFlag = BaseBitmap.create("collectflag")
		collectFlag.anchorOffsetX = collectFlag.width/2;
		collectFlag.anchorOffsetY = collectFlag.height/2;
		collectFlag.setScale(0.7);
		collectFlag.x = rewardBg.x + (rewardBg.width - collectFlag.width)/2 + collectFlag.anchorOffsetX;
		collectFlag.y = rewardBg.y + rewardBg.height + 15 + collectFlag.anchorOffsetY;
		view.addChild(collectFlag);
		collectFlag.visible = tmpVo.isGetInviteBind();
		view._collect = collectFlag;
	}

	private rewardCallback(evt : egret.Event):void{		
		let view = this;
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
					view._inputText.visible = view._collectBtn.visible = false;
					let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`newinvitecodetip4`, [view.api.getBindUid().toString()]), 20, TextFieldConst.COLOR_BLACK);
					view.addChild(tipTxt);
					App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,tipTxt,view._inputText);
		
					if(view.api.isSendApply() || view.api.isMyFriend(Api.newinviteVoApi.getBindUid())){
						let sendTxt = ComponentManager.getTextField(LanguageManager.getlocal(view.api.isSendApply() ? `newinvitecodetip5` : 'newinvitecodetip11'), 20, TextFieldConst.COLOR_BLACK);
						view.addChild(sendTxt);
						App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,sendTxt,tipTxt, [0,tipTxt.textHeight+15]);
					}
					else{
						let sendBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, `newinvitecodetip6`, ()=>{
							if(Api.playerVoApi.getPlayerLevel() < GameConfig.config.friendCfg.needLv){
								App.CommonUtil.showTip(LanguageManager.getlocal(`dailyTask_friendTip`));
								return;
							}
							NetManager.request(NetRequestConst.REQUEST_FRIEND_APPLY,{fuid:Api.newinviteVoApi.getBindUid()});
							sendBtn.visible = false;
							App.CommonUtil.showTip(LanguageManager.getlocal(`newinvitecodetip5`));
							let sendTxt = ComponentManager.getTextField(LanguageManager.getlocal(`newinvitecodetip5`), 20, TextFieldConst.COLOR_BLACK);
							view.addChild(sendTxt);
							App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,sendTxt,tipTxt, [0,tipTxt.textHeight+15]);
						
						}, view);
						App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, sendBtn, view._inputText, [0,view._inputText.height+15]);
						view.addChild(sendBtn);
						if(Api.playerVoApi.getPlayerLevel() < GameConfig.config.friendCfg.needLv){
							sendBtn.setGray(true);
						}
					}
				}
		
			}
			else{
				App.CommonUtil.showTip(LanguageManager.getlocal(`newinvitebindtip${rData.bindCode}`));
			}
        }
	}

	public dispose():void{
		let view = this;
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_NEWINVITE_BIND, view.rewardCallback, view);
		view._inputTextField = null;
		view._collect = null;
		view._collectBtn = null;
		view._inputText = null;
		super.dispose();
	}

}