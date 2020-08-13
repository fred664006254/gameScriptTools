class WelfareViewOfficialWeChat extends WelfareViewTab
{

	public constructor() 
	{
		super();
	}

	protected init():void
	{		
		super.init();
		let temW = 491;
		let temH = this.bottomBg.height + this.bottomBg.y;

		let bg1 = BaseBitmap.create("public_9_bg21");
		bg1.width = temW - 40;
		bg1.height = 40;
		bg1.x = temW/2 - bg1.width/2;
		bg1.y =  this.bottomBg.y+ 30;
		this.addChild(bg1);

		// wechatdes1 微信描述
		let publicdes:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wechatdes1"),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BROWN);
		publicdes.x = bg1.x + bg1.width/2 - publicdes.width/2;
		publicdes.y = bg1.y + bg1.height/2 - publicdes.height/2;
		this.addChild(publicdes);

		
		let line1 = BaseBitmap.create("public_line3");
		line1.width = temW - 100;
		line1.x = temW/2 - line1.width/2;
		line1.y = this.bottomBg.y+ 90;
		this.addChild(line1);

		let nameTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("officialWeChat"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		nameTF.x = line1.x + line1.width/2 - nameTF.width/2;
		nameTF.y = line1.y + line1.height/2 - nameTF.height/2;
		this.addChild(nameTF);

		let bg = BaseBitmap.create("public_9_bg21");
		bg.width = temW - 40;
		bg.height = 100;
		bg.x = temW/2 - bg.width/2;
		bg.y =  line1.y + 35;
		this.addChild(bg);


		//复制按钮
		let copyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "copyDes", this.copyBtnHandler, this);
		copyBtn.setPosition(bg.x + 150, bg.y + 130);
		this.addChild(copyBtn);


		//关注描述长
		let publicdes2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wechatdes"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		publicdes2.x =bg1.x+55;
		publicdes2.width =491;
		publicdes2.y = GameConfig.stageHeigth-150;
		this.addChild(publicdes2);

		let temScale = 0.8;
		let spaceW = 15;
		let spaceH = 10;
		let rewardList = GameData.formatRewardItem(Config.GameprojectCfg.reward3K); 
		let totalNum = rewardList.length;

		for(let i = 0;i<rewardList.length;i++)
		{
			let icon =GameData.getItemIcon(rewardList[i],true,true);
			icon.scaleX = icon.scaleY = temScale;
			icon.x = bg.x + bg.width/2 + (icon.width*temScale)*(i - totalNum/2)+ spaceW*(i - (totalNum-1)/2);
			icon.y = bg.y + 7;
			this.addChild(icon);
		}
		
	}
	private copyBtnHandler():void
	{
		if(App.DeviceUtil.IsHtml5())
		{
			var str = LanguageManager.getlocal("officialWeChatcontentdes");
			var input = document.createElement("input");
			input.value = str;
			document.body.appendChild(input);
			input.select();
			input.setSelectionRange(0, input.value.length),
			document.execCommand('Copy');
			document.body.removeChild(input);
			App.CommonUtil.showTip(LanguageManager.getlocal("followSuccessdes"));
		}
       
	}
}