class ScorePopupView extends PopupView
{
	private _leftScoreTxt:BaseTextField;
	
	/**
	 * 滑动列表
	 */
	private _scrollList:ScrollList;
	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		this.initMessage();
		let txtBg = BaseBitmap.create("public_tc_bg02");
		txtBg.x = this.viewBg.width/2 - txtBg.width/2;
		txtBg.y = 15;
		this.addChildToContainer(txtBg);

		this._leftScoreTxt=ComponentManager.getTextField(LanguageManager.getlocal("dailybossCanUseScoreNumDesc",[this.getOwnScoreNum().toString()]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._leftScoreTxt.x = txtBg.x + txtBg.width/2 - this._leftScoreTxt.width/2;
		this._leftScoreTxt.y = txtBg.y + txtBg.height/2 - this._leftScoreTxt.height/2+2;
		this.addChildToContainer(this._leftScoreTxt);

		let bg:BaseBitmap=BaseBitmap.create("public_tc_bg01");
		bg.width=540;
		bg.height=610+27;
		bg.x = this.viewBg.width/2 - bg.width/2;
		bg.y = this._leftScoreTxt.y + this._leftScoreTxt.height + 30;
		this.addChildToContainer(bg);
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,530,600+10);
		this._scrollList = ComponentManager.getScrollList(this.getListItemClass(),this.getScoreDataList(),rect);
		this._scrollList.setPosition(bg.x+5,bg.y+5+7);
		this._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
		this.addChildToContainer(this._scrollList);
	}


	protected initMessage():void
	{
	}

	protected refresh(e:egret.Event):void
	{
		let data:{ret:boolean,data:any}=e?e.data:null;
		if(data.data.data&&data.data.data.rewards)
		{
			App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(data.data.data.rewards));
		}
		if(this._leftScoreTxt)
		{
			this._leftScoreTxt.text =LanguageManager.getlocal("dailybossCanUseScoreNumDesc",[this.getOwnScoreNum().toString()]);
		}
	}

	protected getListItemClass():any
	{
		return ScorePopupListItem;
	}

	protected getScoreDataList():any[]
	{
		return [];
	}

	protected getTitleStr():string
	{
		return "dinnerExchangePopupViewTitle";
	}

	protected getOwnScoreNum():number
	{
		return 0;
	}

	protected getBgExtraHeight():number
	{
		return 70;
	}

	public dispose():void
	{
		super.dispose();
	}
}

class ScorePopupListItem extends ScrollListItem
{
	protected _data:{name:string,iconContainer:BaseDisplayObjectContainer,id:string|number,limit?:number,limitType?:number,limitNum?:number};
	protected _needTxt:BaseTextField=null;
	protected _canNumTxt:BaseTextField=null;
	protected _idx:number = 0;
	public constructor()
	{
		super();
	}
	protected initItem(index:number,data:{name:string,iconContainer:BaseDisplayObjectContainer,id:string|number}):void
	{
		App.MessageHelper.addNetMessage(this.getRequestType(),this.refresh,this);

		this._data=data;
		this._idx = index;
		let bg:BaseBitmap=BaseBitmap.create("public_listbg");
		bg.width=520;
		bg.height=139;
		bg.x = 5;

		this.addChild(bg);

        let leftBg = BaseBitmap.create("public_left");
		leftBg.width = 139;
		leftBg.height = 120.5;
		leftBg.x = 11.5;
		leftBg.y = 5.5;
		this.addChild(leftBg);


		let icon:BaseDisplayObjectContainer = data.iconContainer;
		icon.x = 30;
		icon.y = leftBg.y+(leftBg.height-icon.height)/2;
		this.addChild(icon);


		let taskNameBg = BaseBitmap.create("public_biaoti2");
        taskNameBg.x = icon.x + icon.width + 20;
        taskNameBg.y = icon.y + 3;

		let nameTxt:BaseTextField=ComponentManager.getTextField(data.name,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_GREEN);
		taskNameBg.width = nameTxt.width + 50;
		// taskNameBg.width = nameTxt.width + 100;
		nameTxt.setPosition(taskNameBg.x + taskNameBg.width / 2 - nameTxt.width / 2,taskNameBg.y + taskNameBg.height / 2 - nameTxt.height / 2);
		this.addChild(nameTxt);
		this.addChild(taskNameBg);

		let score:number = this.needScore();
		if (!score) {
			score = 0;
		}
		this._needTxt=ComponentManager.getTextField(LanguageManager.getlocal("dailybossScoreShopNeedDesc",[score.toString()]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		this._needTxt.setPosition(taskNameBg.x + 8,nameTxt.y+nameTxt.height+20);
		this.addChild(this._needTxt);

		let limitType = this.limitType();
		if(limitType == null){
			this._canNumTxt=ComponentManager.getTextField(LanguageManager.getlocal("dailybossScoreShopExchangeNumDesc",[this.canExchangeNum().toString()]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
			this._canNumTxt.setPosition(this._needTxt.x,this._needTxt.y+this._needTxt.height+12);
			this.addChild(this._canNumTxt);
		} else {
			switch(limitType){
				case 0:

					break;
				case 1:
					this._canNumTxt=ComponentManager.getTextField(LanguageManager.getlocal("wifebattleShopLimitNum1",[this.canExchangeNum().toString()]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
					this._canNumTxt.setPosition(this._needTxt.x,this._needTxt.y+this._needTxt.height+12);
					this.addChild(this._canNumTxt);
					break;
				case 2:
					this._canNumTxt=ComponentManager.getTextField(LanguageManager.getlocal("wifebattleShopLimitNum2",[this.canExchangeNum().toString()]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
					this._canNumTxt.setPosition(this._needTxt.x,this._needTxt.y+this._needTxt.height+12);
					this.addChild(this._canNumTxt);
					break;
				case 3:
					this._canNumTxt=ComponentManager.getTextField(LanguageManager.getlocal("wifebattleShopLimitNum3",[this.canExchangeNum().toString()]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
					this._canNumTxt.setPosition(this._needTxt.x,this._needTxt.y+this._needTxt.height+12);
					this.addChild(this._canNumTxt);
					break;
			}

		}



		let btn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"exchange",this.exchangeHandler,this);
		btn.x = bg.x + bg.width-btn.width-10;
		btn.y = leftBg.y+(leftBg.height-btn.height * btn.scaleY)/2;
		
		
		
		// btn.setPosition(bg.x+bg.width-btn.width-20,bg.y+(bg.height-btn.height)/2);
		this.addChild(btn);
	}
	protected limitType():number
	{
		return null;
	}
	protected needScore():number
	{
		return 0;
	}

	protected canExchangeNum():number
	{	
		if(this._data.limit)
		{
			return this._data.limit;
		}
		return 1;
	}

	protected getOwnScoreNum():number
	{
		return Api.dailybossVoApi.getScore();
	}

	protected exchangeHandler():void
	{
		if(this.getOwnScoreNum()<this.needScore())
		{	
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishShopTip2"));
			return ;
		}
		if(this.canExchangeNum()<=0)
		{	
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishShopTip1"));
			return ;
		}
		NetManager.request(this.getRequestType(),{itemKey:this._data.id});
	}

	protected refresh():void
	{	
		let score:number = this.needScore();
		if (!score) {
			score = 0;
		}
		this._needTxt.text = LanguageManager.getlocal("dailybossScoreShopNeedDesc",[score.toString()]);

		if(this._canNumTxt){
			let limitType = this.limitType();
			if(limitType == null){
				this._canNumTxt.text = LanguageManager.getlocal("dailybossScoreShopExchangeNumDesc",[this.canExchangeNum().toString()]);
			} else {
				switch(limitType){
					case 1:
						this._canNumTxt.text = LanguageManager.getlocal("wifebattleShopLimitNum1",[this.canExchangeNum().toString()]);
						break;
					case 2:
						this._canNumTxt.text = LanguageManager.getlocal("wifebattleShopLimitNum2",[this.canExchangeNum().toString()]);
						break;
					case 3:
						this._canNumTxt.text = LanguageManager.getlocal("wifebattleShopLimitNum3",[this.canExchangeNum().toString()]);
						break;
				}

			}


		}

		
	}

	protected getRequestType():string
	{
		return "重写getRequestType方法，返回cmd";
	}

	public dispose():void
	{	
		App.MessageHelper.removeNetMessage(this.getRequestType(),this.refresh,this);
		this._needTxt = null;
		this._canNumTxt = null;
		this._idx = 0;

		super.dispose();
	}
}