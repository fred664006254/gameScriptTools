class FourRechargeView  extends PopupView
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
		let bg2 =BaseLoadBitmap.create("fourrechargebg1"); 
		bg2.height =942;
		bg2.width = 640;
		bg2.y =bg2.y+(GameConfig.stageHeigth -bg2.height )/2;
		this.addChild(bg2);
		 

		let cfg72 = Config.RechargeCfg.getRechargeItemCfgByKey("g72");

		this.showReward(bg2, bg2.y+579,cfg72.getReward);

          let doButton = ComponentManager.getButton("acarrowbuttonbg","",this.clickGetBtnHandler,this,null,null,32);
        doButton.x = 180;
        doButton.y = bg2.y + 865;
        doButton.setColor(TextFieldConst.COLOR_BROWN);
        this.addChild(doButton);

		let btnStr = "";

		let rechargeFlag = Api.shopVoApi.getFourRateCharge();
		if(rechargeFlag == 1)
		{
			btnStr = LanguageManager.getlocal("taskCollect");
		}else if(rechargeFlag == 2){
			btnStr = LanguageManager.getlocal("candyGetAlready");
		}else{
			btnStr = LanguageManager.getlocal("anyMoney",[cfg72.cost+""]);
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
		
		let type19Id = 1;
		let type16Id = 1;
		for(var i = 0;i < rewardItemVoList.length;i++)
		{
			let raeardItem = rewardItemVoList[i];
			if(raeardItem.type == 19)
			{
				type19Id = raeardItem.id;
			}else if(raeardItem.type == 16){
				type16Id = raeardItem.id;
			}
		}

		console.log("type19Id is "+type19Id);
		console.log("type16Id is "+type16Id);

	
		let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        nameTxt.text =  LanguageManager.getlocal("servantSkinName"+type19Id);;
		nameTxt.width = 20;
		nameTxt.name = "nameTxt";
		nameTxt.x = 540;
		nameTxt.y = 240;
        this.addChild( nameTxt);

		let servantId = Config.ServantskinCfg.getServantSkinItemById(""+type19Id).servantId;
		let nameTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        nameTxt2.text =  LanguageManager.getlocal("servant_name"+servantId);;
		nameTxt2.width = 20;
		nameTxt2.name = "nameTxt2";
		nameTxt2.x = 563;
		nameTxt2.y = 240;
        this.addChild( nameTxt2);

		if (App.CommonUtil.check_dragon() &&  RES.hasRes("servant_full2_"+type19Id+"_ske")) {

			let maskbg = BaseBitmap.create("public_9v_bg01");
			maskbg.x =170;
			maskbg.y = bg.y + 200;
			maskbg.width = 400;
			maskbg.height = 380;
			maskbg.name = "maskbg";
			this.addChild(maskbg);

			let lvbu = App.DragonBonesUtil.getLoadDragonBones("servant_full2_"+type19Id);
			lvbu.scaleX = 0.7;
			lvbu.scaleY = 0.7;
			lvbu.x = 420;
			lvbu.y = bg.y + 660;
			lvbu.mask = maskbg;
			this.addChild(lvbu);

		} else {
			// servant_full_1033
			let lvbu = BaseLoadBitmap.create("skin_full_"+type19Id); 
			lvbu.scaleX = 0.7;
			lvbu.scaleY = 0.7;
			lvbu.x = 200;
			lvbu.y = bg.y + 240;
			this.addChild(lvbu); 
		}


		
		let nameTxt3 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        nameTxt3.text =  LanguageManager.getlocal("skinName"+type16Id);;
		nameTxt3.width = 20;
		nameTxt3.name = "nameTxt3";
		nameTxt3.x = 60;
		nameTxt3.y = 240;
        this.addChild( nameTxt3);

		let wifeId = Config.WifeskinCfg.getWifeCfgById(type16Id).wifeId;
		let nameTxt4 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        nameTxt4.text =  LanguageManager.getlocal("wifeName_"+wifeId);;
		nameTxt4.width = 20;
		nameTxt4.name = "nameTxt4";
		nameTxt4.x = 83;
		nameTxt4.y = 240;
        this.addChild( nameTxt4);
        
        if(App.CommonUtil.check_dragon() && ResourceManager.hasRes("wife_full3_"+type16Id +"_ske"))
        {
			let maskbg1 = BaseBitmap.create("public_9v_bg01");
			maskbg1.x =50;
			maskbg1.y = bg.y + 200;
			maskbg1.width = 400;
			maskbg1.height = 380;
			maskbg1.name = "maskbg1";
			this.addChild(maskbg1);

			let lwifebu=App.DragonBonesUtil.getLoadDragonBones("wife_full3_"+type16Id);
			lwifebu.scaleX = 0.7;
			lwifebu.scaleY = 0.7;
			lwifebu.x = 210;
			lwifebu.y = bg.y + 650;
			lwifebu.mask = maskbg1;
			this.addChild(lwifebu);

        }
        else
        {
            // wife 的 图片
          
            let wifeBM =  BaseLoadBitmap.create("wife_skin_"+type16Id);
			wifeBM.scaleX = 0.4;
			wifeBM.scaleY = 0.4;
			wifeBM.x = 70;
			wifeBM.y = bg.y + 240;
			this.addChild(wifeBM); 
        } 


		let showBtnBg:BaseBitmap = BaseBitmap.create("mainui_bottombtnbg");
        showBtnBg.x =  bg.x + 520;;
        showBtnBg.y =  bg.y + 490;
		this.addChild(showBtnBg);

		let showBtn = ComponentManager.getButton("moonnight_showbtn-1", "", this.showBtnHandler, this);
		showBtn.x = showBtnBg.x + showBtnBg.width/2 - showBtn.width/2;
		showBtn.y = showBtnBg.y + showBtnBg.height/2 - showBtn.height/2;
		this.addChild(showBtn);

        let showBtnTxt = BaseBitmap.create("moonnight_showbtntxt-1");
		showBtnTxt.x = showBtnBg.x + showBtnBg.width/2 - showBtnTxt.width/2;
		showBtnTxt.y = showBtnBg.x + showBtnBg.width - showBtnTxt.width/2;
		this.addChild(showBtnTxt);

	}
     private useCallback():void
	{ 
		let btnStr = "";
		let rechargeFlag = Api.shopVoApi.getFourRateCharge();
		if(rechargeFlag == 1)
		{
			btnStr = LanguageManager.getlocal("taskCollect");
		}else if(rechargeFlag == 2){
			btnStr = LanguageManager.getlocal("candyGetAlready");
			this._getBtn.setEnable(false);
		}
		this._getBtn.setText(btnStr,false);

		
		let cfg72 = Config.RechargeCfg.getRechargeItemCfgByKey("g72");

		let rewardList = GameData.formatRewardItem(cfg72.getReward);
		if(rewardList)
		{
			let globalPt:egret.Point = this.localToGlobal(this._getBtn.x,this._getBtn.y - 40);
			let runPos:egret.Point = new egret.Point(globalPt.x + 55,globalPt.y - 30);
			App.CommonUtil.playRewardFlyAction(rewardList,runPos);
		}
	}


    private clickGetBtnHandler():void
	{
		let rechargeFlag = Api.shopVoApi.getFourRateCharge();
		if(rechargeFlag == 0){
			let id = "g72";
			console.log(id);
			PlatformManager.pay(id); 
		}else if(rechargeFlag == 1)
		{
			//发送购买请求
			NetManager.request(NetRequestConst.REQUEST_SHOP_THREECHARGEREWARD,{"gtype":"g72"});
		}
	}
    
	 
	private updateButton()
	{
		let btnStr = "";
		let rechargeFlag = Api.shopVoApi.getFourRateCharge();
		if(rechargeFlag == 1)
		{
			btnStr = LanguageManager.getlocal("taskCollect");
		}else if(rechargeFlag == 2){
			btnStr = LanguageManager.getlocal("candyGetAlready");
			this._getBtn.setEnable(false);
		}
		this._getBtn.setText(btnStr,false);

	}


    private showBtnHandler():void
    {
        ViewController.getInstance().openView(ViewConst.COMMON.FOURERECHARGESHOWVIEW);
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
            "fourrechargebg1", 
			// "firstchargemask",
			"acarrowbuttonbg",
			"moonnight_showbtn-1",
			"moonnight_showbtntxt-1",
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