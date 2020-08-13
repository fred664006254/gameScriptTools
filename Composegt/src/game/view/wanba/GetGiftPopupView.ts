class GetGiftPopupView extends PopupView
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
		if(GameData.wbrewardsFlag)
		{
			this._titleResName="reward_success";
		}
		else
		{
			// this._titleResName="reward_hasget_title";
			this._titleResName="";
		}
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

		let titlePic:string = this._titleResName;
		let title:BaseBitmap=BaseBitmap.create(titlePic);
		title.setPosition((this.viewBg.width-title.width)/2,-25);
		this.addChildToContainer(title);

		let giftId = PlatformManager.getGiftId();
		let msg = "";
		if (GameData.wbrewardsFlag) {
			if (LanguageManager.checkHasKey("wanbaGiftOk_" + giftId)) {
				msg = LanguageManager.getlocal("wanbaGiftOk_" + giftId);
			} else {
				msg = LanguageManager.getlocal("getRewardTitle");
			}
		} else {
			if (LanguageManager.checkHasKey("wanbaGiftFail_" + giftId)) {
				msg = LanguageManager.getlocal("wanbaGiftFail_" + giftId);
			} else {
				msg = LanguageManager.getlocal("hasGetRewardTodayTitle");
			}
		}
		
		let titleText:BaseTextField=ComponentManager.getTextField(msg,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		titleText.setPosition((this.viewBg.width-titleText.width)/2,28);
		this.addChildToContainer(titleText);

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
        itemContainer.setPosition(this.viewBg.x+(this.viewBg.width-itemContainer.width)/2,65);
        this.addChildToContainer(itemContainer);

		let descText:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("getRewardDesc"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_QUALITY_GREEN);
		descText.setPosition((this.viewBg.width-descText.width)/2,newnum + 178);
		descText.visible = false;
		this.addChildToContainer(descText);

		GameData.wbrewards = null;
		GameData.wbrewardsFlag=false;
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