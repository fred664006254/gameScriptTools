class WelfareViewQgroup extends WelfareViewTab
{
	
	private _qqNo:string;
	public constructor() 
	{
		super();
	}

	protected init():void
	{
		super.init(); 
		this.bottomBg.visible = false;
		
		let btBg = BaseBitmap.create("firstrecharge_bottom");
		btBg.x = 0;
		btBg.y = GameConfig.stageHeigth - btBg.height-80;
		this.addChild(btBg);
		
		let wordImg = BaseBitmap.create("qgroup_font");
		wordImg.anchorOffsetY = wordImg.height;
		wordImg.x = this.bottomBg.x + this.bottomBg.width/2 - wordImg.width/2;
		wordImg.y = btBg.y;
		this.addChild(wordImg);

		let cenX = 245;
		let txt1 =  ComponentManager.getTextField(LanguageManager.getlocal( "welfareViewQQGroup1",[this._qqNo]),20);
        txt1.x = cenX - txt1.width/2;
        txt1.y = wordImg.y -33;
        this.addChild(txt1);

		let txt2 =  ComponentManager.getTextField(LanguageManager.getlocal("welfareViewQQGroup2"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
        txt2.x = cenX - txt2.width/2;
        txt2.y = btBg.y + 11;
        this.addChild(txt2);

		let temScale = 0.8;
		let spaceW = 15;
		let spaceH = 10;
		let shareShowZJ = Config.GameprojectCfg.shareShowZJ
		let rIconArr = GameData.getRewardItemIcons(shareShowZJ,true,true);
		let totalNum = rIconArr.length
		for (var index = 0; index < totalNum; index++) {
			let icon = rIconArr[index]
			icon.scaleX = icon.scaleY = temScale;
			icon.x = btBg.x + btBg.width/2 + (icon.width*temScale)*(index - totalNum/2)+ spaceW*(index - (totalNum-1)/2);
			icon.y =btBg.y + 50;
			this.addChild(icon);
		}

		let copyBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"welfareViewQQGroup3",this.copyBtnHandler,this);
        copyBtn.x = cenX - copyBtn.width/2;
        copyBtn.y = btBg.y + 200;
        this.addChild(copyBtn);

		let txt4 =  ComponentManager.getTextField(LanguageManager.getlocal("welfareViewQQGroup4"),18,TextFieldConst.COLOR_WARN_YELLOW2);
		txt4.width = GameConfig.stageWidth - 220;
		txt4.multiline = true;
		txt4.lineSpacing = 5;
        txt4.x = cenX - txt4.width/2;
        txt4.y = copyBtn.y + 80;
        this.addChild(txt4);
	}

	protected copyBtnHandler()
	{
		var input = document.createElement("input");
        input.value = this._qqNo;
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, input.value.length),
        document.execCommand('Copy');
        document.body.removeChild(input);
		App.CommonUtil.showTip(LanguageManager.getlocal("welfareViewQQGroup5"));
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"qgroup_font",
		]);
	}
	protected getRequestData():{requestType:string,requestData:any}
	{
		
		return {requestType:NetRequestConst.REQUEST_USER_GETKFCARDMSG,requestData:{}};
	}
		//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {
		if(data.data.cmd == NetRequestConst.REQUEST_USER_GETKFCARDMSG)
		{
			let rData = data.data.data;
			this._qqNo = rData.msg;
		}
	}
	public dispose():void
	{
		this._qqNo = null;
		super.dispose();
	}
}