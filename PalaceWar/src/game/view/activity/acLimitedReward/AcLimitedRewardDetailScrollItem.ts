class AcLimitedRewardDetailScrollItem extends ScrollListItem
{
	private _limitedRewardInfoVo:AcLimitedRewardInfoVo;
	private _selectedIndex:number;
	private _getBtn:BaseButton;
	private _rewardList:Array<RewardItemVo>;
	public constructor() 
	{
		super();
	}

	protected initItem(index:number,data:any)
    {
		this._limitedRewardInfoVo = <AcLimitedRewardInfoVo>data;
		let acLimitedRewardVo = <AcLimitedRewardVo>Api.acVoApi.getActivityVoByAidAndCode(this._limitedRewardInfoVo.aid,this._limitedRewardInfoVo.code.toString());
		let flag:number = acLimitedRewardVo.getFlagByIdAndCondition(this._limitedRewardInfoVo.id,this._limitedRewardInfoVo.condition);

		let temW = 520;
		let temH = 148;
		this._selectedIndex = index;
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg14");
		bg.width = temW;
		bg.height=148;
		this.addChild(bg);

		let rewardGradeTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rewardGradeNum",[this._limitedRewardInfoVo.id.toString()]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		rewardGradeTF.x = 20;
		rewardGradeTF.y = 15;
		this.addChild(rewardGradeTF);
		
		let progress = "(" + App.StringUtil.changeIntToText(acLimitedRewardVo.v,1) + "/" +  App.StringUtil.changeIntToText(this._limitedRewardInfoVo.condition,1) + ")"
		let conditonTF:BaseTextField = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		let textStrKey  = "limitedCondition2";
		if(flag == 2)
		{
			textStrKey  = "limitedCondition";
			// textStr = LanguageManager.getlocal("limitedCondition2",[this._limitedRewardInfoVo.getTitleStr,progress]);
		}
		conditonTF.text = LanguageManager.getlocal(textStrKey,[this._limitedRewardInfoVo.getTitleStr,progress]);
		conditonTF.x = temW - conditonTF.width - 20;
		conditonTF.y = 16;
		this.addChild(conditonTF);

		let lineSp = BaseBitmap.create("public_line1");
		lineSp.x = temW/2 - lineSp.width/2;
		lineSp.y = rewardGradeTF.y + rewardGradeTF.height +5;
		this.addChild(lineSp);

		let rewardList = GameData.formatRewardItem(this._limitedRewardInfoVo.reward);
		this._rewardList = rewardList;
		if(rewardList)
		{	
			let temX = 0;
			let temScale = 0.7;
			for(let i = 0;i<rewardList.length;i++)
			{
				let icon = GameData.getItemIcon(rewardList[i],true);
				icon.x = 10 + 7*(i + 1) + icon.width*temScale*i;
				icon.y = lineSp.y + 13;
				icon.scaleX = icon.scaleY = temScale;
				this.addChild(icon);
			}
		}

		

		if(flag == 1)
		{
			let hasGetSp = BaseBitmap.create("signin_had_get");
			hasGetSp.x = temW - 85 - hasGetSp.width/2;
			hasGetSp.y = bg.y + bg.height/2 - hasGetSp.height/2 + 18;
			this.addChild(hasGetSp);
		}
		else
		{
			let getBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskCollect",this.clickGetBtnHandler,this);
			getBtn.x = temW - 85 - getBtn.width/2;
			getBtn.y = bg.y + bg.height/2 - getBtn.height/2 + 18;
			this.addChild(getBtn);
			this._getBtn = getBtn;
			if(flag == 2)
			{
				getBtn.setEnable(false);
			}
			if(flag == 0)
			{}
		}
	}

	public updateButtonState():void
	{
		let acLimitedRewardVo = <AcLimitedRewardVo>Api.acVoApi.getActivityVoByAidAndCode(this._limitedRewardInfoVo.aid,this._limitedRewardInfoVo.code.toString());
		let flag:number = acLimitedRewardVo.getFlagByIdAndCondition(this._limitedRewardInfoVo.id,this._limitedRewardInfoVo.condition);
		if(flag == 1 && this._getBtn)
		{
			this._getBtn.visible = false;
			let hasGetSp = BaseBitmap.create("signin_had_get");
			hasGetSp.x = this._getBtn.x + this._getBtn.width/2 - hasGetSp.width/2;
			hasGetSp.y = this._getBtn.y + this._getBtn.height/2 - hasGetSp.height/2;
			this.addChild(hasGetSp);
		}
		if(this._rewardList)
		{
			let globalPt:egret.Point = this._getBtn.localToGlobal(this._getBtn.width/2,this._getBtn.height/2);
			let runPos:egret.Point = new egret.Point(globalPt.x + 55,globalPt.y - 30);
			App.CommonUtil.playRewardFlyAction(this._rewardList,runPos);
		}

	}

	private clickGetBtnHandler(param:any):void
	{
		// if(Api.acVoApi.checkActivityStartByAid(this._limitedRewardInfoVo.aid,String(this._limitedRewardInfoVo.code))){
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ACTIVITY_LIMITEDREWARD ,{"rkey":this._limitedRewardInfoVo.id,"index":this._selectedIndex});
		// }else{
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("composeLimitTimeEndDesc"));
		// }
	}

	public getSpaceX():number
	{
		return 0;
	}

	public update():void
	{

	}

	public getSpaceY():number
	{
		return 5;
	}

	public dispose():void
    {
		this._limitedRewardInfoVo = null;
		this._selectedIndex = null;
		this._getBtn = null;
		this._rewardList = null;
		
		super.dispose();
	}
}