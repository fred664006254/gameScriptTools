class ThreeRechargeView  extends PopupView
{
    private  _container:BaseDisplayObjectContainer = null;
    private _getBtn:BaseButton;
    private getBtnY:number =0;
	private _lightArr:Array<BaseBitmap>=[];
    public constructor() 
	{
		super();
	}

    protected initView():void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_THREECHARGEREWARD),this.useCallback,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_SHOP,this.updateButton,this);

		let servantID = 9999;
		let bg2 =BaseLoadBitmap.create("threechargebg1"); 
		bg2.height =942;
		bg2.width = 640;
		bg2.y =bg2.y+(GameConfig.stageHeigth -bg2.height )/2;
		this.addChild(bg2);
		 

		let cfg71 = Config.RechargeCfg.getRechargeItemCfgByKey("g71");

		this.showReward(bg2, bg2.y+579,cfg71.getReward);

        let doButton = ComponentManager.getButton("acarrowbuttonbg","",this.clickGetBtnHandler,this,null,null,32);
        doButton.x = 180;
        doButton.y = bg2.y + 865;
        doButton.setColor(TextFieldConst.COLOR_BROWN);
        this.addChild(doButton);

		let btnStr = "";

		let rechargeFlag = Api.shopVoApi.getThreeRateCharge();
		if(rechargeFlag == 1)
		{
			btnStr = LanguageManager.getlocal("taskCollect");
		}else if(rechargeFlag == 2){
			btnStr = LanguageManager.getlocal("candyGetAlready");
		}else{
			btnStr = LanguageManager.getlocal("anyMoney",[cfg71.cost+""]);
		}
		doButton.setText(btnStr,false);
		this._getBtn = doButton;
		this.setChildIndex(this.closeBtn,-1);

    }  

    private showReward(bg:any,iconY:number=0,rewardStr:string):void
	{
		let temScale = 0.78;
		let spaceW = 8;
		let spaceH = 10;

		let rewardItemVoList = GameData.formatRewardItem(rewardStr);

		let rect = egret.Rectangle.create();
		if(rewardItemVoList.length > 5)
		{
			rect.setTo(0,0,580,175);
		}
		
		
		let scrollListContainer:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
		scrollListContainer.width = rect.width;
		scrollListContainer.height = rect.height;
		scrollListContainer.x = bg.x + 2;
		scrollListContainer.y = bg.y + 635;
		this.addChild(scrollListContainer);

		let scrollList = ComponentManager.getScrollList(MailRewardScrollItem,rewardItemVoList,rect);
		scrollListContainer.addChild(scrollList);
		scrollList.y=3;
		scrollList.x=70;
		
		for(var i = 0;i < rewardItemVoList.length;i++)
		{
			let raeardItem = rewardItemVoList[i];
			if(raeardItem.type == 11)
			{
				let titlepath = Config.TitleCfg.getTitleIcon3WithLv(raeardItem.id);
			
				let _officerImg = BaseLoadBitmap.create(titlepath);
				_officerImg.setScale(1.3);
				_officerImg.x = bg.x+20;
				_officerImg.y = bg.y+240;
				this.addChild(_officerImg);
				
				let maskbg = BaseBitmap.create("public_9v_bg01");
				maskbg.x =70;
				maskbg.y = bg.y + 200;
				maskbg.width = 500;
				maskbg.height = 380;
				maskbg.name = "maskbg";
				this.addChild(maskbg);
				let userPic = Api.playerVoApi.getPlayePicId();

				let roleNode = Api.playerVoApi.getPlayerPortrait(raeardItem.id,userPic);
				roleNode.y =bg.y + 215;
				roleNode.x = 170;
				roleNode.setScale(0.8);
				this.addChild(roleNode);
				roleNode.mask = maskbg;
				
				break;
			}
		}

	}

    private useCallback():void
	{ 
		let btnStr = "";
		let rechargeFlag = Api.shopVoApi.getThreeRateCharge();
		if(rechargeFlag == 1)
		{
			btnStr = LanguageManager.getlocal("taskCollect");
		}else if(rechargeFlag == 2){
			btnStr = LanguageManager.getlocal("candyGetAlready");
			this._getBtn.setEnable(false);
		}
		this._getBtn.setText(btnStr,false);

		
		let cfg71 = Config.RechargeCfg.getRechargeItemCfgByKey("g71");

		let rewardList = GameData.formatRewardItem(cfg71.getReward);
		if(rewardList)
		{
			let globalPt:egret.Point = this.localToGlobal(this._getBtn.x,this._getBtn.y - 40);
			let runPos:egret.Point = new egret.Point(globalPt.x + 55,globalPt.y - 30);
			App.CommonUtil.playRewardFlyAction(rewardList,runPos);
		}
	}

    private clickGetBtnHandler():void
	{
		let rechargeFlag = Api.shopVoApi.getThreeRateCharge();
		if(rechargeFlag == 0){
			let id = "g71";
			console.log(id);
			PlatformManager.pay(id); 
		}else if(rechargeFlag == 1)
		{
			//发送购买请求
			NetManager.request(NetRequestConst.REQUEST_SHOP_THREECHARGEREWARD,{"gtype":"g71"});
		}
	}
    
	private updateButton()
	{
		let btnStr = "";
		let rechargeFlag = Api.shopVoApi.getThreeRateCharge();
		if(rechargeFlag == 1)
		{
			btnStr = LanguageManager.getlocal("taskCollect");
		}else if(rechargeFlag == 2){
			btnStr = LanguageManager.getlocal("candyGetAlready");
			this._getBtn.setEnable(false);
		}
		this._getBtn.setText(btnStr,false);

	}

    protected initBg():void
	{
		this.viewBg = BaseLoadBitmap.create("firstchargebg01"); 
		this.addChild(this.viewBg); 
	} 
    /**
	 * 重置背景的高度 主要设置 btn的位置
	 * 仅适用于新的分享
	 */
	protected resetBgSize():void
	{
		if(PlatformManager.hasSpcialCloseBtn()){
			this.closeBtn.setPosition(520,100);
		} else {
			this.closeBtn.setPosition(545,50);
			
		}
	}

    protected getTitleBgName():string
	{
		return null;
	}
    protected getCloseBtnName(): string {
        return "btn_win_closebtn";
    }
    protected getTitleStr():string
    {
        return  null;
    }
	protected getResourceList():string[]
	{
		return super.getResourceList().concat(
			[  
            "btn_win_closebtn", 
			"threechargebg1", 
			"acarrowbuttonbg",
			]);
	} 
	        
	public dispose(): void 
    {  
        super.dispose();
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_THREECHARGEREWARD),this.useCallback,this);	
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_SHOP,this.updateButton,this);
        this._getBtn = null;
		this._container =null;
		this._lightArr= [];
	}
}