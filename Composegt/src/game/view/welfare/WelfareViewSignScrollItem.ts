/**
 * 签到滑动item
 * author dmj
 * date 2017/11/04
 * @class WelfareViewSignScrollItem
 */
class WelfareViewSignScrollItem extends ScrollListItem
{
	//领取按钮
	private _getBtn:BaseButton = null;
	//当前是第几天
	private _curDay:number = 0;
	//当前是第几个cell
	private _selectedIndex:number = 0;
	private _rewardList:Array<RewardItemVo>;

	public constructor() 
	{
		super();
	}

	protected initItem(index:number,data:{index:number,rewardList:Array<RewardItemVo>,flag:number})
    {
		this._selectedIndex = index;
		this._curDay = data.index;
		this._rewardList = data.rewardList;
		let temW = 491;
		let temH = 145; 

		let bg = BaseBitmap.create("public_listbg");
		bg.width = 434;//temW - 40;
		bg.height = 165;//0;
		bg.x = temW/2 - bg.width/2-7;
		bg.y =  5;
		this.addChild(bg);
		
		let cardNameTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("signinDay",[String(this._curDay)]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		cardNameTF.x = bg.x+160;
		cardNameTF.y = bg.y+10;//line1.y + line1.height/2 - cardNameTF.height/2;
		this.addChild(cardNameTF);

		let temX = 0;
		let temScale = 0.8;
		for(let i = 0;i<data.rewardList.length;i++)
		{
			// getRewardItemIcons
			let icon = GameData.getItemIcon(data.rewardList[i],true,true);
			icon.x = 30 + 7*(i + 1) + icon.width*temScale*i;
			icon.y = bg.y + 47;
			icon.scaleX = icon.scaleY = temScale;
			this.addChild(icon);

			temX = icon.x + icon.width;
		}


		if(data.flag == 1)
		{
			let hasGetSp = BaseBitmap.create("collectflag");
			hasGetSp.x = 315;//temW - 100 - hasGetSp.width/2+15;
			hasGetSp.y = bg.y + bg.height/2 - hasGetSp.height/2//+10;
			// hasGetSp.scaleX=0.7;
			// hasGetSp.scaleY=0.7; 
			this.addChild(hasGetSp);
		}
		else
		{
			let getBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskCollect",this.clickGetBtnHandler,this);
			getBtn.x = temW - 100 - getBtn.width/2-10;
			getBtn.y = bg.y + bg.height/2 - getBtn.height/2+8;
			this.addChild(getBtn);
			this._getBtn = getBtn;
			if(data.flag == 2)
			{
				getBtn.setEnable(false);
			}
		}
	}

	public updateButtonState():void
	{
		let flag = Api.arrivalVoApi.checkFlagByIndex(this._curDay);
		if(flag == 1 && this._getBtn)
		{
			this._getBtn.visible = false;
			let hasGetSp = BaseBitmap.create("collectflag");
			hasGetSp.x = 315;//this._getBtn.x + this._getBtn.width/2 - hasGetSp.width/2+15;
			hasGetSp.y = this._getBtn.y + this._getBtn.height/2 - hasGetSp.height/2//-20;//+30;
			// hasGetSp.scaleX=0.7;
			// hasGetSp.scaleY=0.7; 
			this.addChild(hasGetSp);
		}
		if(this._rewardList)
		{
			let globalPt:egret.Point = this.localToGlobal(this._getBtn.x,this._getBtn.y - 40);
			let runPos:egret.Point = new egret.Point(globalPt.x + 55,globalPt.y - 30);
			App.CommonUtil.playRewardFlyAction(this._rewardList,runPos);
		}

	}
	private clickGetBtnHandler(param:any):void
	{
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_WELFARE_SIGNIN ,{"day":this._curDay,"index":this._selectedIndex});
	}

	

	public dispose():void
	{
		this._getBtn = null;
		this._curDay = 0;
		this._rewardList = null;
		super.dispose();
	}
}