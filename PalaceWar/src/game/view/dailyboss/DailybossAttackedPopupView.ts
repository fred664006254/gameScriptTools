
class DailybossAttackedPopupView extends PopupView
{
	private _callbackF:Function = null;
	private _obj:any = null;

	public constructor()
	{
		super();
	}
	
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
				//"dailybosslastattackpopupview",
				"dailybosslastattacktitle",
				"allianceboss_fight_text"
		]);
	}

	protected initView():void
	{	

		if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}
		this.addTouchTap(this.hide,this);
		//type 1 最后一击   2 战斗  3 被别人击杀 4 新蛮王攻击
		let dataInfo:any = this.param.data;

		if (dataInfo.type == 3) { 
			let descTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("dailybossHasKill"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);

			descTxt.setPosition((this.viewBg.width-descTxt.width)/2,38);
			this.addChildToContainer(descTxt);
			return;
		}

		let bossName:string = LanguageManager.getlocal("dailybossNameType2");
		let titlePic:string;
		let descStr:string;
		if (dataInfo.type == 1) { 
			titlePic = "dailybosslastattacktitle";
			descStr = LanguageManager.getlocal("alliancebossattacked1",[bossName,bossName,String(dataInfo.damage)]);
		}
		else {
			titlePic = "allianceboss_fight_text";
			descStr = LanguageManager.getlocal("alliancebossattacked2",[bossName,String(dataInfo.damage)]);
		}

		let title:BaseBitmap=BaseBitmap.create(titlePic);
		title.setPosition((this.viewBg.width-title.width)/2,10);
		this.addChildToContainer(title);

		let descTxt:BaseTextField=ComponentManager.getTextField(descStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		descTxt.textAlign=egret.HorizontalAlign.CENTER;
		descTxt.width = 480
		descTxt.lineSpacing=6;
		descTxt.setPosition((this.viewBg.width-descTxt.width)/2,title.y+title.height+18);
		this.addChildToContainer(descTxt);

		let offY:number = 0;
		if (dataInfo.type == 1) {

			let rewardVo:RewardItemVo=GameData.formatRewardItem(dataInfo.rewards)[0];
			let rewardIcon = GameData.getItemIcon(rewardVo);
			rewardIcon.setPosition((this.viewBg.width-rewardIcon.width)/2,descTxt.y+descTxt.height+16);
			this.addChildToContainer(rewardIcon);
			offY = 105;
		}

		let leftScoreTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("dailybossRankValue1Desc")+App.StringUtil.formatStringColor("+"+dataInfo.exp,TextFieldConst.COLOR_WARN_GREEN),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		leftScoreTxt.setPosition(GameConfig.stageWidth/2 - 50 - leftScoreTxt.width,descTxt.y+descTxt.height +offY+30 );
		this.addChildToContainer(leftScoreTxt);

		let rightScoreTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("dailybossPoint")+App.StringUtil.formatStringColor("+"+dataInfo.exp,TextFieldConst.COLOR_WARN_GREEN),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		rightScoreTxt.setPosition(GameConfig.stageWidth/2 + 50 ,leftScoreTxt.y);
		this.addChildToContainer(rightScoreTxt);

		if (dataInfo.type == 4)
		{
			rightScoreTxt.visible = false;
			leftScoreTxt.text = LanguageManager.getlocal("dailybossnewScore")+App.StringUtil.formatStringColor("+"+dataInfo.exp,TextFieldConst.COLOR_WARN_GREEN);
			leftScoreTxt.x = GameConfig.stageWidth/2 - leftScoreTxt.width/2;
		}

		if (this.param.data && this.param.data.autoclose == 1)
		{
			egret.Tween.get(this).wait(1000).call(this.hide,this);
		}

	}

	protected getTitleStr():string
	{
		return null;
	}

	protected getCloseBtnName():string
	{
		return null;
	}

	protected isTouchMaskClose():boolean
	{
		return true;
	}

	protected getBgExtraHeight():number
	{
		return 10;
	}

	protected getBgName():string
	{
		return "public_9_wordbg";
	}

	protected isShowOpenAni():boolean{
		return false;
	}

	public hide()
	{
		if (this._obj && this._callbackF) {
			this._callbackF.apply(this._obj);
		}
		super.hide();
	}

	public dispose():void
	{	
		this._callbackF = null;
		this._obj = null;

		super.dispose();
	}
}