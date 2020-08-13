class FirstRechargeView  extends PopupView
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
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_FIRSTCHARGEREWARD),this.useCallback,this);	
		// let bg2 = BaseLoadBitmap.create("firstchargebg02"); 
		let bg2 = null;
		if (App.CommonUtil.check_dragon() &&  RES.hasRes("servant_full2_1033_ske")) {

			bg2 = BaseLoadBitmap.create("firstchargebg_new");
			// bg2.height =942;
			// bg2.width = 640;
			bg2.height =913;
			bg2.width = 611;
			bg2.x = GameConfig.stageWidth/2 - bg2.width/2;
			bg2.y =bg2.y+(GameConfig.stageHeigth -bg2.height )/2;
			this.addChild(bg2);

			let mask = BaseBitmap.create("firstchargemask_new");
			mask.x = bg2.x;
			mask.y =bg2.y;
			this.addChild(mask);

			let droContainer = new BaseDisplayObjectContainer();
			this.addChild(droContainer);

			let lvbu = App.DragonBonesUtil.getLoadDragonBones("servant_full2_1033");
			lvbu.scaleX = 0.8;
			lvbu.scaleY = 0.8;
			lvbu.x = 270;
			lvbu.y = bg2.y + 650 - 120;

			// if(PlatformManager.checkIsKRNewSp())
			// {
			// 	lvbu.scaleX = 0.7;
			// 	lvbu.scaleY = 0.7;
			// }
			droContainer.addChild(lvbu);
			droContainer.mask = mask;

			let fg = null;
			if(Api.switchVoApi.checkOpenFirstCharge6Times()) {
				fg = BaseLoadBitmap.create("firstchargefg_new_6"); 
			} else {
				fg = BaseLoadBitmap.create("firstchargefg_new_4"); 
			}
			
			fg.height =611;
			fg.width = 606;
			fg.y = bg2.y - 40;
			this.addChild(fg); 
		} else {
			// servant_full_1033
			// bg2 = BaseLoadBitmap.create("firstchargebg02"); 
			// bg2.height =942;
			// bg2.width = 640;
			// bg2.y =bg2.y+(GameConfig.stageHeigth -bg2.height )/2;
			// this.addChild(bg2); 
			bg2 = BaseLoadBitmap.create("firstchargebg_new"); 
			bg2.height =913;
			bg2.width = 611;
			bg2.x = GameConfig.stageWidth/2 - bg2.width/2;
			bg2.y =bg2.y+(GameConfig.stageHeigth -bg2.height )/2;
			this.addChild(bg2); 

			let mask = BaseBitmap.create("firstchargemask_new");
			mask.x = bg2.x;
			mask.y =bg2.y;
			this.addChild(mask);

			let lvbu = BaseLoadBitmap.create("servant_full_1033");
			lvbu.width = 640;
			lvbu.height = 482;
			lvbu.scaleX = 1;
			lvbu.scaleY = 1;
			lvbu.x = 270 - 320 + 40;
			lvbu.y = bg2.y + 650 - 120 - 482;
			lvbu.mask = mask;
			// if(PlatformManager.checkIsKRNewSp())
			// {
			// 	lvbu.scaleX = 0.7;
			// 	lvbu.scaleY = 0.7;
			// }
			this.addChild(lvbu);

			let fg = null;
			if(Api.switchVoApi.checkOpenFirstCharge6Times()){
				fg = BaseLoadBitmap.create("firstchargefg_new_6"); 
			} else {
				fg = BaseLoadBitmap.create("firstchargefg_new_4"); 
			}
			
			fg.height =611;
			fg.width = 606;
			fg.y = bg2.y - 40;
			this.addChild(fg); 
		}



	   
	    let  rechargeArr:Array<any> =[]
		let rechargeArr2=Config.RechargeCfg.getNormalRechargeCfg();
		for(var i:number=0;i<rechargeArr2.length;i++)
		{
			 let _id =rechargeArr2[i].id;
			 let boo = Config.FirstchargeCfg.getneedRecharge(_id);
			 if(boo)
			 {
				 rechargeArr.push(rechargeArr2[i])
			 }
		}
		rechargeArr = rechargeArr.reverse();  
		this.showReward(bg2, bg2.y+569);  
		// console.log(rechargeArr);
		let starX =90; 
		let payflag = Api.shopVoApi.getPayFlag();
		
		this._container = new BaseDisplayObjectContainer();
		this.addChild(this._container);

		let getBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"taskCollect",this.clickBtnHandler,this);
		getBtn.x = 220;
		getBtn.y = this.viewBg.y+770;
		this.addChild(getBtn);
		this._getBtn = getBtn;
		getBtn.visible =false;

		if(payflag==0 && Api.servantVoApi.getServantObj("1033") == null)
		{	
			App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback2,this);
			let butStr:string = ButtonConst.BTN_NORMAL_ORANGE;
			let markStr:string = null;
			if(Api.switchVoApi.checkOpenFirstCharge6Times()){
				markStr = "firstchargemark2_6";
			} else {
				markStr = "firstchargemark2_4";
			}
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

				let btnMark = BaseBitmap.create(markStr);
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
				rechargeDes.text =LanguageManager.getlocal("firstRechargeDes1",[rechargeArr[i].gemCost*Config.FirstchargeCfg.getextra()+""]);
				rechargeDes.x = getBtn.x+30;
				rechargeDes.y = getBtn.y+getBtn.height+5;
				this._container.addChild(rechargeDes); 
			}

			let firstDes:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("firstRechargeNewDes",[String(Config.FirstchargeCfg.getextra())]),TextFieldConst.FONTSIZE_CONTENT_COMMON,0xf2e6ab);
            firstDes.width = GameConfig.stageWidth;
            firstDes.textAlign = TextFieldConst.ALIGH_CENTER;
			firstDes.y = bg2.y+885-9;
			this._container.addChild(firstDes);
		}   
		else if(payflag == 1 && Api.servantVoApi.getServantObj("1033") == null)
		{
			let getBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"taskCollect",this.clickBtnHandler,this);
			// this.setLayoutPosition(LayoutConst.horizontalCenter, getBtn, this.viewBg);  
			getBtn.x = 220;
			getBtn.y = this.viewBg.y+770;
			this.addChild(getBtn);
			this._getBtn = getBtn; 
		}  
		this.closeBtn.x = bg2.x+bg2.width - this.closeBtn.width;
		this.closeBtn.y = bg2.y - this.closeBtn.height/2+20;
	
		
		this.setChildIndex(this.closeBtn,this.numChildren-3);

		// todo 门客羁绊&技能

		let _sid: string = Api.shopVoApi.firstChargeServantId.toString();
		let _fetterBtn = GameData.getServantFetterBtn(_sid);
		if (_fetterBtn) {
			this.addChild(_fetterBtn);
			_fetterBtn.setPosition(463, bg2.y + 435);
			_fetterBtn.setScale(100/_fetterBtn.width);
		}

		let skillBar = ComponentManager.getSkillBar(_sid, 86);
		this.addChild(skillBar);
		skillBar.setPosition(84, bg2.y + 445);

		let qualityIcon = GameData.getServantQualityIconBySid(_sid);
		if (qualityIcon) {
			this.addChild(qualityIcon);
			qualityIcon.setPosition(0, bg2.y);
		} 
    }  

    private showReward(bg:any,iconY:number=0):void
	{
		let temScale = 0.78;
		let spaceW = 8;//15;
		let spaceH = 10;
		
		let rewardList = Config.FirstchargeCfg.getRewardItemVoList();
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
		let payflag = Api.shopVoApi.getPayFlag();
		if(payflag == 1 && Api.servantVoApi.getServantObj("1033") == null)
		{	 
			NetManager.request(NetRequestConst.REQUEST_SHOP_FIRSTCHARGEREWARD,null);
		}
		else
		{
			ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
		}
		
	}

    private useCallback2(evt:egret.Event):void
	{
		let payflag = Api.shopVoApi.getPayFlag();
		if(payflag == 1 && Api.servantVoApi.getServantObj("1033") == null)
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
		
		let payflag = Api.shopVoApi.getPayFlag(); 
		if((payflag == 2 || Api.servantVoApi.getServantObj("1033") != null )&& this._getBtn)
		{
			this._getBtn.visible = false;
			let hasGetSp = BaseBitmap.create("collectflag");
			hasGetSp.x = this._getBtn.x + this._getBtn.width/2 - hasGetSp.width/2;
			hasGetSp.y = this._getBtn.y + this._getBtn.height/2 - hasGetSp.height/2;
			this.addChild(hasGetSp);

			let rewardList = Config.FirstchargeCfg.getRewardItemVoList();
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
		
		if(Api.switchVoApi.checkOpenSecondCharge() && Api.shopVoApi.getPayFlag()==2 && Api.shopVoApi.getSecondRateCharge() != 2){
			this.hide();
			ViewController.getInstance().openView(ViewConst.POPUP.SECONDRECHARGEVIEW);
		}
		
	}

    private clickGetBtnHandler(id:string):void
	{
		// console.log(id);
		// ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
		PlatformManager.pay(id); 
	}
    
    protected initBg():void
	{
		this.viewBg = BaseLoadBitmap.create("firstchargebg01_new"); 
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

		
		// if(PlatformManager.hasSpcialCloseBtn()){
		// 	this.closeBtn.setPosition(540,90);

		// } else {
		// 	this.closeBtn.setPosition(540,90);
			
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
			"firstchargemark",
			// "firstchargebg",
			// "firstchargemask",
			"firstchargemask_new",
			"firstchargemark2_6",
			"firstchargemark2_4"
			// "firstchargefg",
			]);
	} 
	        
	public dispose(): void 
    {  
        super.dispose();
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_FIRSTCHARGEREWARD),this.useCallback,this);	
        this._getBtn = null;
		this._container =null;
		this._lightArr= [];
	}
}