class BuyGiftPopupView extends PopupView
{

	private _callbackF:Function = null;
	private _obj:any = null;
	private _titleResName:string;

	public constructor()
	{
		super();
	}

	protected getResourceList():string[]
	{
		let resArr:string[]=[];
		// if(GameData.wbrewardsFlag)
		// {
			this._titleResName="reward_success";
		// }
		// else
		// {
			// this._titleResName="reward_hasget_title";
		// }
		resArr.push(this._titleResName);
		return super.getResourceList().concat(resArr);
	}

	protected initView():void
	{	

		if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}

		if(this.param.data && this.param.data.code == "0"){
			let titlePic:string = this._titleResName;
			let title:BaseBitmap=BaseBitmap.create(titlePic);
			title.setPosition((this.viewBg.width-title.width)/2,-25);
			this.addChildToContainer(title);

			let msg:string=LanguageManager.getlocal("wanbaRewardTitle");
			let titleText:BaseTextField=ComponentManager.getTextField(msg,TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			titleText.setPosition((this.viewBg.width-titleText.width)/2,32);
			this.addChildToContainer(titleText);

			let descStr = LanguageManager.getlocal("wanbaRewardGetDesc",["100"]);

			if(PlatformManager.getGiftId() == "502"){
				descStr = LanguageManager.getlocal("wanbaRewardGetDesc",["200"]);
			}

			let descText:BaseTextField=ComponentManager.getTextField(descStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
			descText.setPosition((this.viewBg.width-descText.width)/2,titleText.y + titleText.height + 10);
			this.addChildToContainer(descText);

			let rewardVoList:RewardItemVo[]=GameData.formatRewardItem(this.param.data.rewards);
			let itemContainer:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
			let l:number=rewardVoList.length;
			let scaleNum:number=0.88;
			var newnum :number =0;
			for(let i:number=0;i<l;i++)
			{
				let icon:BaseDisplayObjectContainer=GameData.getItemIcon(rewardVoList[i],true);
				var num= i%5;
				icon.setPosition((icon.width+20)*num,(icon.height+20)*Math.floor(i/5));
				icon.setScale(scaleNum);
				itemContainer.addChild(icon);
				newnum =(icon.height+20)*Math.floor(i/5);
			}
			itemContainer.setPosition(this.viewBg.x+(this.viewBg.width-itemContainer.width)/2,100);
			this.addChildToContainer(itemContainer);

			GameData.wbrewards = null;
			GameData.wbrewardsFlag=false;
		}else{
			let msg:string=this.getErrorTitle(this.param.data.code);
			let titleText:BaseTextField=ComponentManager.getTextField(msg,TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_WARN_RED);
			titleText.setPosition((this.viewBg.width-titleText.width)/2,32);
			this.addChildToContainer(titleText);

			let descStr = this.getErrorMsg(this.param.data.code);
			let descText:BaseTextField=ComponentManager.getTextField(descStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
			descText.setPosition((this.viewBg.width-descText.width)/2,titleText.y + titleText.height + 20);
			this.addChildToContainer(descText);
		}

		
	}

	private getErrorTitle(code:string):string
	{
		let codeList = {
			"2000":"系统繁忙",
			"2001":"参数错误",
			"2002":"拉取礼包数据出错",
			"2003":"礼包兑换达到上限",
			"2004":"非积分兑换礼包及VIP礼包，无需校验",
			"2005":"积分不足，无法兑换积分礼包",
			"2006":"用户非VIP，无法兑换VIP礼包",
			"2007":"用户VIP等级与VIP礼包等级不符，无法兑换",
			"2008":"礼包已过期",
			"2009":"单用户兑换礼包次数限制",

		}
		return codeList[code]?codeList[code]:"";
	}

	private getErrorMsg(code:string):string
	{
		let codeList = {
			"2000":"请您稍后重试",
			"2001":"请核实再尝试",
			"2002":"请重新尝试",
			"2003":"礼包每日仅可兑换一次\n请明天再来哦~！",
			"2004":"祝您游戏愉快~！",
			"2005":"请获得积分后，再来尝试",
			"2006":"请升级VIP后再来尝试",
			"2007":"请升级VIP后再来尝试",
			"2008":"无法领取",
			"2009":"超出兑换礼包次数上限",

		}
		return codeList[code]?codeList[code]:"";
	}

	protected resetBgSize():void
	{
		super.resetBgSize();

		this.closeBtn.y = this.closeBtn.y-15;
	}

	protected getTitleStr():string
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