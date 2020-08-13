class SecondRechargeView  extends PopupView
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
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_SECONDCHARGEREWARD),this.useCallback,this);	
		// let bg2 = BaseLoadBitmap.create("firstchargebg02"); 
		let bg2 = null;


		if (App.CommonUtil.check_dragon() &&  RES.hasRes("wife_full_"+Config.SecondchargeCfg.getWifeId()+"_ske")) {

			bg2 = BaseLoadBitmap.create("secondchargebg"); 
			// bg2.height =958;
			// bg2.width = 640;
			bg2.height =913;
			bg2.width = 611;

			// bg2.y =bg2.y+(GameConfig.stageHeigth -bg2.height )/2;
			bg2.x = GameConfig.stageWidth/2 - bg2.width/2;
			bg2.y =bg2.y+(GameConfig.stageHeigth -bg2.height )/2;
			this.addChild(bg2); 

			let mask = BaseBitmap.create("firstchargemask_new");
			mask.y =bg2.y;
			this.addChild(mask);

			let lvbu = App.DragonBonesUtil.getLoadDragonBones("wife_full_"+Config.SecondchargeCfg.getWifeId());
			lvbu.scaleX = 1;
			lvbu.scaleY = 1;
			lvbu.x = 270;
			lvbu.y = bg2.y + 750 - 80;
			lvbu.mask = mask;
			this.addChild(lvbu);

			// let fg = BaseLoadBitmap.create("secondchargefg"); 
			// // if(Api.switchVoApi.checkOpenFirstCharge6Times()){
			// // 	fg = BaseLoadBitmap.create("secondchargefg"); 
			// // } else {
			// // 	fg = BaseLoadBitmap.create("secondchargefg"); 
			// // }
			
			// fg.height = 640;
			// fg.width = 588;
			// fg.y = bg2.y - 40;
			// this.addChild(fg); 

		} else {
			bg2 = BaseLoadBitmap.create("secondchargebg"); 
			// bg2.height =958;
			// bg2.width = 640;
			bg2.height =913;
			bg2.width = 611;

			// bg2.y =bg2.y+(GameConfig.stageHeigth -bg2.height )/2;
			bg2.x = GameConfig.stageWidth/2 - bg2.width/2;
			bg2.y =bg2.y+(GameConfig.stageHeigth -bg2.height )/2;
			this.addChild(bg2); 

			let mask = BaseBitmap.create("firstchargemask_new");
			mask.x = bg2.x;
			mask.y =bg2.y;
			this.addChild(mask);

			let lvbu = BaseLoadBitmap.create("wife_full_" + Config.SecondchargeCfg.getWifeId());
			lvbu.width = 640;
			lvbu.height = 840;
			lvbu.x = 25;
			lvbu.y = bg2.y + 50;
			lvbu.setScale(0.7)
			lvbu.mask = mask;
			this.addChild(lvbu);

		}

		let fg = BaseLoadBitmap.create("secondchargefg"); 
		fg.width = 611;
		fg.height = 500;
		fg.x = GameConfig.stageWidth / 2 - fg.width/2;
		fg.y = bg2.y-40;
		this.addChild(fg); 

	   
	    let  rechargeArr:Array<any> =[]
		let rechargeArr2=Config.RechargeCfg.getNormalRechargeCfg();
		for(var i:number=0;i<rechargeArr2.length;i++)
		{
			 let _id =rechargeArr2[i].id;
			 let boo = Config.SecondchargeCfg.getneedRecharge(_id);
			 if(boo)
			 {
				 rechargeArr.push(rechargeArr2[i])
			 }
		}
		rechargeArr = rechargeArr.reverse();  
		this.showReward(bg2, bg2.y+569);  
			
		let starX =90; 
		let payflag = Api.shopVoApi.getSecondRateCharge();
		
		this._container = new BaseDisplayObjectContainer();
		this.addChild(this._container);

		let getBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"taskCollect",this.clickBtnHandler,this);
		getBtn.x = 220;
		getBtn.y = this.viewBg.y+770;
		this.addChild(getBtn);
		this._getBtn = getBtn;
		getBtn.visible =false;
	
		if(payflag==0 && Api.wifeVoApi.getWifeInfoVoById(Config.SecondchargeCfg.getWifeId()) == null)
		{	
			App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback2,this);
			let butStr:string = ButtonConst.BTN_NORMAL_ORANGE;
			for(var  i:number=0; i<rechargeArr.length; i++ )
			{ 
				if(i>=2)
				{
					butStr =ButtonConst.BTN_NORMAL_YELLOW;
				}

				let getBtn = ComponentManager.getButton(butStr,"",this.clickGetBtnHandler,this,[rechargeArr[i]["id"]]);
				var num= i%2; 
				getBtn.setPosition(starX+(getBtn.width+75)*num,(getBtn.height+40)*Math.floor(i/2)+bg2.y+680);
				let btnStr = LanguageManager.getlocal("firstRecharge"+(i+1),[rechargeArr[i].cost+""]);
				getBtn.setText(btnStr,false) 
				// getBtn.setColor(TextFieldConst.COLOR_BROWN);
				this._container.addChild(getBtn);

				let btnMark = BaseBitmap.create("firstchargemark2_4");
				btnMark.x = getBtn.x + 17;
				btnMark.y = getBtn.y + 3;
				this._container.addChild(btnMark);
				if(i == rechargeArr.length - 1){
					let btnMark2 = BaseBitmap.create("firstchargemark");
					btnMark2.x = getBtn.x + getBtn.width - btnMark2.width/2 -25;
					btnMark2.y = getBtn.y  - btnMark2.height /2 +3;
					this._container.addChild(btnMark2);
				}

				let rechargeDes:BaseTextField = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,0xfdda38);
				rechargeDes.text =LanguageManager.getlocal("firstRechargeDes1",[rechargeArr[i].gemCost * Config.SecondchargeCfg.getextra()+""]);
				rechargeDes.x = getBtn.x+30;
				rechargeDes.y = getBtn.y+getBtn.height+5;
				this._container.addChild(rechargeDes); 
			}

			let firstDes:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("firstRechargeNewDes",[String(Config.SecondchargeCfg.getextra())]),TextFieldConst.FONTSIZE_CONTENT_COMMON,0xf2e6ab);
            firstDes.width = GameConfig.stageWidth;
            firstDes.textAlign = TextFieldConst.ALIGH_CENTER;
			firstDes.y = bg2.y+885-9;
			this._container.addChild(firstDes);
		}   
		else if(payflag == 1 && Api.wifeVoApi.getWifeInfoVoById(Config.SecondchargeCfg.getWifeId()) == null)
		{
			let getBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"taskCollect",this.clickBtnHandler,this);
			// this.setLayoutPosition(LayoutConst.horizontalCenter, getBtn, this.viewBg);  
			getBtn.x = 220;
			getBtn.y = this.viewBg.y+770;
			this.addChild(getBtn);
			this._getBtn = getBtn; 
		}  
		// this.closeBtn.x =510; 
		this.closeBtn.x = bg2.x+bg2.width - this.closeBtn.width;
		this.closeBtn.y = bg2.y - this.closeBtn.height/2+20;
		
		this.setChildIndex(this.closeBtn,this.numChildren-3)
		 
    }  

    private showReward(bg:any,iconY:number=0):void
	{
		let temScale = 0.78;
		let spaceW = 8;
		let spaceH = 10;
		
		let rewardList = Config.SecondchargeCfg.getRewardItemVoList();
		let totalNum = rewardList.length;
	
		for(let i = 0;i<rewardList.length;i++)
		{
			let icon = GameData.getItemIcon(rewardList[i],true,true);
			icon.scaleX = icon.scaleY = temScale;
			icon.x = bg.x+75 + (bg.width-150)/2 + (icon.width*temScale)*(i - totalNum/2)+ spaceW*(i - (totalNum-1)/2);
			icon.y =iconY;
			this.addChild(icon); 
		} 
	}
    private clickBtnHandler():void
	{
		let payflag = Api.shopVoApi.getSecondRateCharge();
		if(payflag == 1 && Api.wifeVoApi.getWifeInfoVoById(Config.SecondchargeCfg.getWifeId()) == null)
		{	 
			NetManager.request(NetRequestConst.REQUEST_SHOP_SECONDCHARGEREWARD,null);
		}
		else
		{
			ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
		}
		
	}

    private useCallback2(evt:egret.Event):void
	{
		let payflag = Api.shopVoApi.getSecondRateCharge();
		if(payflag == 1 && Api.wifeVoApi.getWifeInfoVoById(Config.SecondchargeCfg.getWifeId()) == null)
		{
			if(this._container)
			{
				this._container.visible = false;
			}
			if(this._getBtn)
			{
				this._getBtn.visible =true; 
			} 
		}
	}

    private useCallback(event:egret.Event=null):void
	{ 
		
		let payflag = Api.shopVoApi.getSecondRateCharge(); 
		if((payflag == 2 || Api.wifeVoApi.getWifeInfoVoById(Config.SecondchargeCfg.getWifeId()) != null )&& this._getBtn)
		{
			this._getBtn.visible = false;
			let hasGetSp = BaseBitmap.create("collectflag");
			hasGetSp.x = this._getBtn.x + this._getBtn.width/2 - hasGetSp.width/2;
			hasGetSp.y = this._getBtn.y + this._getBtn.height/2 - hasGetSp.height/2;
			this.addChild(hasGetSp);

			let rewardList = Config.SecondchargeCfg.getRewardItemVoList();
			if(rewardList)
			{
				let globalPt:egret.Point = this.localToGlobal(this._getBtn.x,this._getBtn.y - 40);
				let runPos:egret.Point = new egret.Point(globalPt.x + 55,globalPt.y - 30);
				App.CommonUtil.playRewardFlyAction(rewardList,runPos);
			}
			App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
		}
		else if(payflag == 1 && this._getBtn)
		{
			this._getBtn.setText("taskCollect");
		}
		
	}

    private clickGetBtnHandler(id:string):void
	{
		// ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
		PlatformManager.pay(id); 
	}
    
    protected initBg():void
	{
		this.viewBg = BaseLoadBitmap.create("firstchargebg01"); 
		// this.viewBg.height = 960;
		// this.viewBg.width = 640;
		// this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2,GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
		this.addChild(this.viewBg); 
	} 
    /**
	 * 重置背景的高度 主要设置 btn的位置
	 * 仅适用于新的分享
	 */
	protected resetBgSize():void
	{
		// this.closeBtn.setPosition(480,40);
		// this.closeBtn.setPosition(480,GameConfig.stageHeigth / 2 - 958/2 + 40 );
		
		// if(PlatformManager.hasSpcialCloseBtn()){
		// 	this.closeBtn.setPosition(520,100);
		// } else {
		// 	this.closeBtn.setPosition(480,40);
			
		// }
	}

    protected getTitleBgName():string
	{
		return null;
	}
    protected getCloseBtnName():string
	{
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
            "firstchargebutton01", 
			"firstchargebutton02", 
			// "firstchargebg",
			"firstchargemask_new",
			// "firstchargefg",
			"firstchargemark2_4",
			"firstchargemark"
			]);
	} 
	        
	public dispose(): void 
    {  
        super.dispose();
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_SECONDCHARGEREWARD),this.useCallback,this);	
        this._getBtn = null;
		this._container =null;
		this._lightArr= [];
	}
}