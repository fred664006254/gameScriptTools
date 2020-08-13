class DesktopPopupView extends PopupView
{
	private _handContainer:BaseDisplayObjectContainer;
	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		let bg:BaseBitmap=BaseBitmap.create("public_9_bg4");
		bg.width=520;
		bg.height=214;
		bg.setPosition((this.viewBg.width-bg.width)/2,10);
		this.addChildToContainer(bg);

		let txtBg:BaseBitmap=BaseBitmap.create("public_9_bg3");
		txtBg.width=380;
		txtBg.setPosition(bg.x+(bg.width-txtBg.width)/2,bg.y+8);
		this.addChildToContainer(txtBg);

		let txt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("desktopConfirmDesc"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		txt.setPosition(txtBg.x+(txtBg.width-txt.width)/2,txtBg.y+(txtBg.height-txt.height)/2);
		this.addChildToContainer(txt);

		let rewardTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("desktopSuccessDesc"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		rewardTxt.setPosition(bg.x+10,txtBg.y+txtBg.height+15);
		this.addChildToContainer(rewardTxt);

		let iconList:BaseDisplayObjectContainer[]=GameData.getRewardItemIcons(Config.GameprojectCfg.rewardWB1,true);
		let l:number=iconList?iconList.length:0;
		for(let i:number=0;i<l;i++)
		{
			let icon:BaseDisplayObjectContainer=iconList[i];
			icon.setPosition(bg.x+10+(icon.width+10)*i,rewardTxt.y+rewardTxt.height+5);
			this.addChildToContainer(icon);
		}

		let confirmBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"sysConfirm",this.confirmHandler,this);
		confirmBtn.setPosition(bg.x+(bg.width-confirmBtn.width)/2,bg.y+bg.height+10);
		this.addChildToContainer(confirmBtn);
	}

	private confirmHandler():void
	{
		if (PlatformManager.checkIsTWBSp()) {
			// window.open("resource/other/一個官人七個妻.url");
			
			if(App.DeviceUtil.IsMobile() )
			{
				// this.showHand2();
			}
			else{
				this.showHand();
			}
		} else {
			PlatformManager.sendToDesktop(this.sendCallback,this);
			this.request(NetRequestConst.REQUEST_OTHERINFO_GETWBSENDREWARD,{});
		}
		
	}

	private sendCallback(code:string):void
	{	
		// if (String(code) == "0") {
		// 	this.request(NetRequestConst.REQUEST_OTHERINFO_GETWBSENDREWARD,{});
		// }
		// else if (String(code) == "-2"){
		// 	//取消
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("desktopFailTip1"));
		// }
		// else { 
		// 	//失败
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("desktopFailTip2"));
		// }

		this.showHand();
	}

	private showHand()
	{
		if(!this._handContainer){
			this._handContainer = new BaseDisplayObjectContainer();
			this.addChild(this._handContainer)

			let maskBmp = BaseBitmap.create("public_9_viewmask");
			maskBmp.width=GameConfig.stageWidth;
			maskBmp.height=GameConfig.stageHeigth;
			maskBmp.touchEnabled = true;
			this._handContainer.addChild(maskBmp);
			maskBmp.addTouchTap(this.hideMask,this);

			let clickHand = BaseBitmap.create("twsshareDesc");
			// clickHand.skewY = 180;
			clickHand.x = GameConfig.stageWidth/2 - clickHand.width/2;
			clickHand.y = GameConfig.stageHeigth/2 - clickHand.height/2;
			this._handContainer.addChild(clickHand);

			// egret.Tween.get(clickHand,{loop:true})
			// 	.to({y:60}, 500)
			// 	.to({y:10}, 500)

			// let getTxt = ComponentManager.getTextField(LanguageManager.getlocal("savegGameTip"), TextFieldConst.FONTSIZE_TITLE_COMMON);
			// getTxt.textAlign = TextFieldConst.ALIGH_CENTER;
			// getTxt.x = GameConfig.stageWidth/2 - getTxt.width/2;
			// getTxt.y = GameConfig.stageHeigth/2- getTxt.height/2;
			// getTxt.lineSpacing = 10;
			// this._handContainer.addChild(getTxt);

			// egret.Tween.get(clickHand,{loop:true})
			// 		.to({scaleX: 0.9,scaleY:0.9}, 500)
			// 		.to({scaleX: 1,scaleY:1}, 500)

		}
		else{
			this._handContainer.visible = true;
		}
	}

	private showHand2()
	{
		if(!this._handContainer){
			this._handContainer = new BaseDisplayObjectContainer();
			this.addChild(this._handContainer)


			let maskBmp1 = BaseBitmap.create("public_9_viewmask");
			maskBmp1.width=GameConfig.stageWidth;
			maskBmp1.height=GameConfig.stageHeigth;
			// maskBmp1.touchEnabled = true;
			this._handContainer.addChild(maskBmp1);
			// maskBmp1.addTouchTap(this.hideMask,this);

			let maskBmp = BaseBitmap.create("public_9_viewmask");
			maskBmp.width=GameConfig.stageWidth;
			maskBmp.height=GameConfig.stageHeigth;
			maskBmp.touchEnabled = true;
			this._handContainer.addChild(maskBmp);
			maskBmp.addTouchTap(this.hideMask,this);


			let icon = BaseBitmap.create("twshareicon");
			// clickHand.skewY = 180;
			icon.x = GameConfig.stageWidth/2 - icon.width/2;
			icon.y = 170;
			this._handContainer.addChild(icon);

			let iconName = ComponentManager.getTextField(LanguageManager.getlocal("twShareName"), TextFieldConst.FONTSIZE_TITLE_COMMON);
			iconName.textAlign = TextFieldConst.ALIGH_CENTER;
			iconName.x = GameConfig.stageWidth/2 - iconName.width/2;
			iconName.y = icon.y + icon.height + 10;
			iconName.lineSpacing = 10;
			this._handContainer.addChild(iconName);

			let msg1 = ComponentManager.getTextField(LanguageManager.getlocal("twShareMsg1"), TextFieldConst.FONTSIZE_TITLE_COMMON);
			msg1.x = GameConfig.stageWidth/2 - msg1.width/2;
			msg1.y = iconName.y + iconName.height + 100;
			this._handContainer.addChild(msg1);

			let msg2 = ComponentManager.getTextField(LanguageManager.getlocal("twShareMsg2"), TextFieldConst.FONTSIZE_TITLE_COMMON);
			msg2.x = GameConfig.stageWidth/2 - msg2.width/2 - 30;
			msg2.y = msg1.y + msg1.height + 30;
			this._handContainer.addChild(msg2);

			let icon2 = BaseBitmap.create("twsshareDescicon");
			// clickHand.skewY = 180;
			icon2.x = msg2.x + msg2.width + 20;
			icon2.y = msg2.y - 10;
			this._handContainer.addChild(icon2);

			let msg3 = ComponentManager.getTextField(LanguageManager.getlocal("twShareMsg3"), TextFieldConst.FONTSIZE_TITLE_COMMON);
			msg3.x = GameConfig.stageWidth/2 - msg3.width/2;
			msg3.y = msg2.y + msg2.height + 30;
			this._handContainer.addChild(msg3);

			let clickHand = BaseBitmap.create("studyatk_arrow");
			// clickHand.skewY = 180;
			clickHand.x = 300;
			clickHand.y = GameConfig.stageHeigth - clickHand.height - 30;
			this._handContainer.addChild(clickHand);

			egret.Tween.get(clickHand,{loop:true})
				.to({y:GameConfig.stageHeigth - clickHand.height - 70}, 500)
				.to({y:GameConfig.stageHeigth - clickHand.height - 30}, 500)

			// let getTxt = ComponentManager.getTextField(LanguageManager.getlocal("savegGameTip"), TextFieldConst.FONTSIZE_TITLE_COMMON);
			// getTxt.textAlign = TextFieldConst.ALIGH_CENTER;
			// getTxt.x = GameConfig.stageWidth/2 - getTxt.width/2;
			// getTxt.y = GameConfig.stageHeigth/2- getTxt.height/2;
			// getTxt.lineSpacing = 10;
			// this._handContainer.addChild(getTxt);

			// egret.Tween.get(clickHand,{loop:true})
			// 		.to({scaleX: 0.9,scaleY:0.9}, 500)
			// 		.to({scaleX: 1,scaleY:1}, 500)

		}
		else{
			this._handContainer.visible = true;
		}
	}

	private hideMask()
	{
		if(this._handContainer){
			this._handContainer.visible = false;
		}
		// this.sendShareSuccess();
		this.request(NetRequestConst.REQUEST_OTHERINFO_GETWBSENDREWARD,{});
	}

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			 "twsshareDesc","twsshareDescicon","studyatk_arrow","twshareicon",

		]);
	}
	public dispose():void
	{

		this._handContainer = null;
		super.dispose();
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		if(data.ret)
		{
			if(data.data.cmd==NetRequestConst.REQUEST_OTHERINFO_GETWBSENDREWARD)
			{
				if(data.data.data.rewards)
				{
					ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,data.data.data.rewards);
					this.hide();
				}
			}
		}
	}
}