class AtkracecrossDetailPopupView extends PopupView
{
	
	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		"atkracecross_explain_bg","atkracecross_explain_pic"
		]);
	}

	protected getTitleStr():string
	{
		return "atkracecrossDetailTitle";
	}

	protected initView():void
	{
		let crossServerType = this.param.data.crossServerType;

		let typeBg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		typeBg.width = 536;
		typeBg.height = 704;
		typeBg.setPosition(40, 12);
		this.addChildToContainer(typeBg);

		let topPic:BaseBitmap = BaseBitmap.create("atkracecross_explain_pic");
		topPic.setPosition(this.viewBg.width/2-topPic.width/2, typeBg.y+4);
		this.addChildToContainer(topPic);

		
		let rankBg:BaseBitmap = BaseBitmap.create("dinner_finish_dt01");
		rankBg.width  = 518;
		rankBg.height = 353;
		rankBg.alpha  = 0.4;
		rankBg.setPosition(this.viewBg.width/2-rankBg.width/2, 223);
		this.addChildToContainer(rankBg);

		//区服排名
		let serverRank:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossActivityRewardTab1"), TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		serverRank.setPosition(70,topPic.y+topPic.height+18);
		this.addChildToContainer(serverRank);

		let strName = "atkracecrossDetailDesc1";
		if(LanguageManager.checkHasKey("atkracecrossDetailDesc1-"+crossServerType)){
			strName = "atkracecrossDetailDesc1-"+crossServerType;
		} 

		let rankDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(strName), TextFieldConst.FONTSIZE_CONTENT_SMALL);
		rankDesc.setPosition(rankBg.x+20, rankBg.y+48);
		rankDesc.width = rankBg.width-40;
		rankDesc.lineSpacing = 6;
		this.addChildToContainer(rankDesc);

		//个人排名
		let persionRank:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acPunishRankRewardTab1"), TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		persionRank.setPosition(70, 390);
		this.addChildToContainer(persionRank);

		// let persionBg:BaseBitmap = BaseBitmap.create("atkracecross_explain_bg");
		// persionBg.width = 518;
		// persionBg.height = 40;
		// persionBg.setPosition(this.viewBg.width/2-persionBg.width/2, persionRank.y+persionRank.height+8);
		// this.addChildToContainer(persionBg);

		let persionDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossDetailDesc2"), 19);
		persionDesc.setPosition(70, 430);
		persionDesc.width = rankBg.width-40;
		persionDesc.lineSpacing = 6;
		this.addChildToContainer(persionDesc);

		//活动日期
		// let dateBg:BaseBitmap = BaseBitmap.create("atkracecross_explain_bg");
		// dateBg.width = 518;
		// dateBg.height = 66;
		// dateBg.setPosition(this.viewBg.width/2-dateBg.width/2, persionDesc.y+20);
		// this.addChildToContainer(dateBg);

		let crossVo = <AcCrossServerAtkRaceVo>Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
		let timeDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossTime",[crossVo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL);
		timeDesc.x =persionDesc.x;
		timeDesc.y =persionDesc.y+persionDesc.height+5;
		this.addChildToContainer(timeDesc);

		let dateDesc:BaseTextField = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_RED);
		dateDesc.setPosition(timeDesc.x, timeDesc.y+timeDesc.height+8);
		this.addChildToContainer(dateDesc);

		let timeNumber2:number = 3600*24;
		if (crossVo.et - GameData.serverTime <= timeNumber2)
		{
			dateDesc.text = LanguageManager.getlocal("atkracecrossCDTime3");
		}
		else 
		{
			dateDesc.text = LanguageManager.getlocal("atkracecrossDetailDesc3");
		}

		//底部描述
		let bottomBg:BaseBitmap = BaseBitmap.create("public_9v_bg04");
		bottomBg.width = 515;
		bottomBg.height = 116;
		bottomBg.setPosition(this.viewBg.width/2-bottomBg.width/2, 585);
		this.addChildToContainer(bottomBg);

		let bottomDesc:BaseTextField = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_RED);
		bottomDesc.setPosition(bottomBg.x+20, bottomBg.y+12);
		bottomDesc.width = bottomBg.width-40;
		bottomDesc.height = bottomBg.height-24;
		bottomDesc.lineSpacing = 6;
		bottomDesc.textAlign = egret.HorizontalAlign.CENTER;
		bottomDesc.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.addChildToContainer(bottomDesc);

		if (crossVo.info && crossVo.info.iscanjoin == 1)
		{
			if(LanguageManager.checkHasKey("atkraceCrossOpenDesc2-"+crossServerType)){
				bottomDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc2-"+crossServerType);
			} else {
				bottomDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc2");
			}
			
		}
		else 
		{
			if(LanguageManager.checkHasKey("atkraceCrossOpenDesc3-"+crossServerType)){
				bottomDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc3-"+crossServerType);
			} else {
				bottomDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc3");
			}
			
		}


		let closeButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"sysConfirm",this.hide,this);
       	closeButton.setPosition(this.viewBg.width/2-closeButton.width/2, typeBg.y+typeBg.height+20);
		this.addChildToContainer(closeButton);

	}

	protected getBgExtraHeight():number
	{
		return 20;
	}

}