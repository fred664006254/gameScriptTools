

class ChallengeAutoPopupView  extends PopupView
{
	private _callbackF:Function = null;
	private _obj:any = null;

	public constructor() {
		super();
	}

	protected getTitleStr():string
	{
		return "challengeAutoFight";
	}
	/**生成新标头 */
	protected isHaveTitle():boolean
	{
		return true;
	}
	protected initView():void
	{	
		if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}
		
		// let grayBg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		// grayBg.width = 518;
		// grayBg.height = 180;
		// grayBg.setPosition(this.viewBg.width/2 - grayBg.width/2 , 65);
		// this.addChildToContainer(grayBg);

		// let innerBg = BaseBitmap.create("public_9v_bg04");
		// innerBg.width = 498;
		// innerBg.height = 160;
		// innerBg.x = this.viewBg.width/2 - innerBg.width/2;
		// innerBg.y = grayBg.y + grayBg.height/2 - innerBg.height/2;
		// this.addChildToContainer(innerBg);
		
		let goldBg = BaseBitmap.create("public_hb_bg01");
		goldBg.setPosition(this.viewBg.width/2 - goldBg.width/2, 28);
		this.addChildToContainer(goldBg);

		let goldIcon = BaseLoadBitmap.create("itemicon4");
		goldIcon.setScale(0.5);
		goldIcon.x = goldBg.x - 3 ;
		goldIcon.y = goldBg.y + goldBg.height/2 - 100/2 + 22;
		this.addChildToContainer(goldIcon);

		let goldText:BaseTextField = ComponentManager.getTextField(App.StringUtil.changeIntToText(Api.playerVoApi.getSoldier()),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		goldText.setPosition(goldBg.x + 50, goldBg.y+goldBg.height/2 - goldText.height/2);
		this.addChildToContainer(goldText);

		goldBg.width = goldText.width + 70;
		

		let bg = BaseBitmap.create("public_9v_bg12");
		bg.width = 530;
		bg.height = 300;
		bg.x = this.viewBg.width/2 - bg.width/2;
		bg.y = 75;
		this.addChildToContainer(bg);

		let line = BaseBitmap.create("public_line4");
		line.width = 460;
		line.x = this.viewBg.width/2 - line.width/2;
		line.y = 270;
		this.addChildToContainer(line);

		let fightBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"challengeAutoFightBtn",this.goToFight,this);
		fightBtn.setPosition(this.viewBg.width/2 - fightBtn.width/2 , 254 + 40);
		this.addChildToContainer(fightBtn);
		// fightBtn.setColor(TextFieldConst.COLOR_BLACK);

		//计算消耗
		let nowCid:number = Api.challengeVoApi.getCurChannelId()-1;
		let targetCid:number = nowCid;
		//剩余士兵
		let ksoldier:number = Api.playerVoApi.getSoldier();
		let cost = 0;
		for (let i:number = nowCid; i<=nowCid+40; i++)
		{
			let challengeCfg:any = ChallengeCfg.getChallengeCfgById(i+1);
			if (challengeCfg.type == 1)
			{
				let atk2:number = challengeCfg.atk;
				let soldier2:number = challengeCfg.soldier;
				if (i == Api.challengeVoApi.getCurChannelId())
				{
					soldier2 -=Api.challengeVoApi.getCurKilledNum();
				}
				let atk1:number = Api.playerVoApi.getAtk();
				let soldier1:number = ksoldier;
				let report:any = Api.conquestVoApi.getBattleResult2(atk1,soldier1,atk2,soldier2,challengeCfg.personLv);

				if (report.success == true)
				{
					targetCid++;
					ksoldier = report.left1;
					cost = cost + report.cost
				}
				else {
					ksoldier = 0;
					break;
				}	
			}
			else {
				break;
			}
		}
		
		// let consume = App.StringUtil.changeIntToText(Api.playerVoApi.getSoldier()-ksoldier);
		let consume = App.StringUtil.changeIntToText(cost)
		let consumeText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("challengeAutoFightConsume",[String(consume)]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW);
		consumeText.setPosition(this.viewBg.width/2 - consumeText.width/2,bg.y + 55);
		this.addChildToContainer(consumeText);

		// let bcid:number = Math.floor(targetCid / 41) + 1;
		// let mcid:number = Math.floor(targetCid % 41 / 8 ) + 1;
		let bcid = Api.challengeVoApi.getBigChannelIdByCid2(targetCid);
		let mcid = Api.challengeVoApi.getMiddleChannelById(targetCid);
		// mcid = mcid == 6 ? 5 : mcid;
		let targetStr:string = LanguageManager.getlocal("challengeTitle" + bcid);
		let targetText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("challengeAutoFightTarget",[String(bcid),targetStr,String(mcid)]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW);
		targetText.setPosition(this.viewBg.width/2 - targetText.width/2, consumeText.y + consumeText.height + 12);
		this.addChildToContainer(targetText);

		
		let dialogText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("challengeAutoFightNoDialog",),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		dialogText.setPosition(this.viewBg.width/2 - dialogText.width/2, targetText.y + targetText.height + 12);
		this.addChildToContainer(dialogText);

	}	



	private goToFight():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.CHALLENGEAUTOREWARDSPOPUOVIEW,{f:this._callbackF,o:this._obj});

		this.hide();
	}

	// 计算背景高度时使用，在container高度的基础上添加该高度
	protected getBgExtraHeight():number
	{
		return 30;
	}


	public dispose():void
	{	 	
		this._callbackF = null;
		this._obj = null;

		super.dispose();
	}
}