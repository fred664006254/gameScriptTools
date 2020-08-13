class WelfareViewSignin extends WelfareViewTab
{
	private _scrollList:ScrollList;
	private _signRewardList:{index:number,rewardList:Array<RewardItemVo>,flag:number}[];
	private _index:number;
	public constructor() 
	{
		super();
	}

	protected init():void
	{
		super.init();


		let dibian:BaseBitmap=BaseBitmap.create("public_line");
		dibian.width = 479; 
		dibian.y =250;
		dibian.x =5;
		this.addChild(dibian);

		let totalSignDay = Api.arrivalVoApi.getTotalSignDay();
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_WELFARE_SIGNIN,this.clickItemHandler,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_ARRIVAL),this.useCallback,this);
		
		let totalDayTF:BaseTextField = ComponentManager.getTextField(totalSignDay + "",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		totalDayTF.x = 56; 
		totalDayTF.y = 234; 
		totalDayTF.width=90;
		totalDayTF.textAlign ="center";
		this.addChild(totalDayTF);

		if(PlatformManager.checkIsKRSp()||PlatformManager.checkIsKRNewSp())
		{
			totalDayTF.x = 50;//130 - totalDayTF.width/2;
		} 
		else if(PlatformManager.checkIsJPSp())
		{
			totalDayTF.x = 46;//130 - totalDayTF.width/2;
		} 
		else if(PlatformManager.checkIsViSp()){
			totalDayTF.x = 15
		}

		let bg = BaseBitmap.create("public_tc_bg01");
		bg.x=17;
		bg.width=455;
		bg.height= this.bottomBg.height-93;//570;
		bg.y=320;
		this.addChild(bg);

		this._signRewardList = Api.arrivalVoApi.getSignRewardList();
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,492,GameConfig.stageHeigth - 312 - 140);
		this._scrollList = ComponentManager.getScrollList(WelfareViewSignScrollItem,this._signRewardList,rect);
		this.addChild(this._scrollList);
		this._scrollList.setPosition(7,330);
		let showIndex = Api.arrivalVoApi.getIndexByCurday();
		if(showIndex>3)
		{
			showIndex = showIndex > 2?showIndex - 1:1;
			this._scrollList.setScrollTopByIndex(showIndex); 
		}
	

		//签到福利 
		let signinTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("signinTxt"),TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_BROWN);
		signinTxt.x = 180;
		signinTxt.y = 285;
		signinTxt.textAlign ="center";
		this.addChild(signinTxt);


		let leftLine = BaseBitmap.create("public_v_huawen01");
		leftLine.x = signinTxt.x - 40 - leftLine.width;
		leftLine.y = signinTxt.y + signinTxt.height/2 - leftLine.height/2

		let rightLine = BaseBitmap.create("public_v_huawen01");
		rightLine.scaleX = -1;
		rightLine.x = signinTxt.x + signinTxt.width + 40 + rightLine.width;
		rightLine.y = signinTxt.y + signinTxt.height/2 - rightLine.height/2
		this.addChild(leftLine);
		this.addChild(rightLine);


		let bottomBg = BaseBitmap.create("public_9v_bg03");
		bottomBg.width = 490;
		bottomBg.height = GameConfig.stageHeigth - 65;
		bottomBg.x = 0;
		bottomBg.y = 0;
		this.addChild(bottomBg); 
	}

	private useCallback(event:egret.Event):void
	{
		
		let welfareViewSignScrollItem = <WelfareViewSignScrollItem>this._scrollList.getItemByIndex(this._index);
		if(welfareViewSignScrollItem)
		{
			welfareViewSignScrollItem.updateButtonState();
		}
		// let rewardList = this._signRewardList[this._index].rewardList;
		// if(rewardList)
		// {
		// 	let runPos =  new egret.Point(this._collectFlag.x,this._collectFlag.y - 40) ;
		// 	App.CommonUtil.playRewardFlyAction(rewardVoList,runPos);
		// }
	}

	private clickItemHandler(event:egret.TouchEvent):void
	{
		this._index = Number(event.data.index);

		// let welfareViewSignScrollItem = <WelfareViewSignScrollItem>this._scrollList.getItemByIndex(this._index);
		// if(welfareViewSignScrollItem)
		// {
		// 	welfareViewSignScrollItem.updateButtonState();
		// }

		NetManager.request(NetRequestConst.REQUEST_USER_ARRIVAL,null);

	}

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			 "signin2_bg","signin3_bg",
		]);
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_WELFARE_SIGNIN,this.clickItemHandler,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_ARRIVAL),this.useCallback,this);
		super.dispose();
	}
}