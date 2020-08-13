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
		this.showReward(this.viewBg, this.viewBg.y+587);  
			
		let starX =90+GameData.popupviewOffsetX; 
		let payflag = Api.shopVoApi.getPayFlag();
		
		this._container = new BaseDisplayObjectContainer();
		this.addChild(this._container);

		let getBtn = ComponentManager.getButton("recharge_bigbtn","taskCollect",this.clickBtnHandler,this);
		// getBtn.x = this.viewBg.width/2 - getBtn.width/2;//this.viewBg.x+250;
		this.setLayoutPosition(LayoutConst.horizontalCenter, getBtn, this.viewBg);  
		getBtn.y = this.viewBg.y+770;
		this.addChild(getBtn);
		this._getBtn = getBtn;
		getBtn.visible =false;

		if(payflag==0)
		{	
			App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback2,this);
		
			for(var  i:number=0; i<rechargeArr.length; i++ )
			{ 
				let getBtn = ComponentManager.getButton("recharge_bigbtn","",this.clickGetBtnHandler,this);
				var num= i%2;
				getBtn.setTextSize(20);
				getBtn.setPosition(starX+(getBtn.width+75)*num,(getBtn.height+40)*Math.floor(i/2)+this.viewBg.y+700);

				let params:string[]=[];
				if(PlatformManager.checkisLocalPrice()&&rechargeArr[i].platFullPrice)
				{
					params.push(rechargeArr[i].platFullPrice);
				}
				else
				{
					params.push(String(rechargeArr[i].cost));
				}
				let btnStr = LanguageManager.getlocal("firstRecharge"+(i+1),params);	
				getBtn.setText(btnStr,false) 
				this._container.addChild(getBtn);

				let rechargeDes:BaseTextField = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
				rechargeDes.text =LanguageManager.getlocal("firstRechargeDes1",[rechargeArr[i].gemCost*4+""]);
				rechargeDes.x = getBtn.x+30;
				rechargeDes.y = getBtn.y+getBtn.height+5;
				this._container.addChild(rechargeDes); 
			}

			let firstDes:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("firstRechargeDes"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_YELLOW);
            firstDes.width = GameConfig.stageWidth;
            firstDes.textAlign = TextFieldConst.ALIGH_CENTER;
			firstDes.y = this.viewBg.y+915;
			this._container.addChild(firstDes);
		}   
		else if(payflag == 1)
		{
			let getBtn = ComponentManager.getButton("recharge_bigbtn","taskCollect",this.clickBtnHandler,this);
			this.setLayoutPosition(LayoutConst.horizontalCenter, getBtn, this.viewBg);  
			getBtn.y = this.viewBg.y+770;
			this.addChild(getBtn);
			this._getBtn = getBtn; 
		} 

        let firstrEffect = ComponentManager.getCustomMovieClip("firstrecharge_",18,100);
        firstrEffect.x = 376;
        firstrEffect.y = this.viewBg.y+190; 
        this.addChild(firstrEffect);
        firstrEffect.playWithTime(0);
		
		let ths =this;  
	
		let lightxArr=[384,464,525,605];
		let lightyArr=[243,210,243,195];
		let lightTime=[150,300,450,600];
		for(var i:number =0; i<4; i++)
		{
			let light:BaseBitmap= BaseBitmap.create("firstecharge_light");
			this.addChild(light); 
			light.anchorOffsetX = light.width/2;
			light.anchorOffsetY = light.height/2;
			light.x = lightxArr[i]; 
			light.y = lightyArr[i]+this.viewBg.y;
			this._lightArr.push(light);

			egret.Tween.get(light,{loop:true}).wait(lightTime[i]).to({rotation:150,scaleX:0,scaleY:0},1450);
		} 
    }  

    private showReward(bg:any,iconY:number=0):void
	{
		let temScale = 0.78;
		let spaceW = 8;
		let spaceH = 10;
		
		let rewardList = Config.FirstchargeCfg.getRewardItemVoList();
		let totalNum = rewardList.length;
	
		for(let i = 0;i<rewardList.length;i++)
		{
			let icon = GameData.getItemIcon(rewardList[i],true,true);
			icon.scaleX = icon.scaleY = temScale;
			icon.x = bg.x + bg.width/2 + (icon.width*temScale)*(i - totalNum/2)+ spaceW*(i - (totalNum-1)/2);
			icon.y =iconY;
			this.addChild(icon); 
		} 
	}
    private clickBtnHandler():void
	{
		let payflag = Api.shopVoApi.getPayFlag();
		if(payflag == 1)
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
		if(payflag == 1)
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
		if(payflag == 2 && this._getBtn)
		{
			this._getBtn.visible = false;
			let hasGetSp = BaseBitmap.create("signin_had_get");
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
		
	}
    private clickGetBtnHandler():void
	{
		ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
	}
    
    protected initBg():void
	{
		this.viewBg = BaseLoadBitmap.create("firstrecharge_newbg");
		this.viewBg.height = 960;
		this.viewBg.width = 640;
		this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2,GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
		this.addChild(this.viewBg); 
	} 
    /**
	 * 重置背景的高度 主要设置 btn的位置
	 * 仅适用于新的分享
	 */
	protected resetBgSize():void
	{
		this.closeBtn.setPosition(this.viewBg.x + this.viewBg.width - this.closeBtn.width,this.viewBg.y + this.closeBtn.height -40);
	}

    protected getTitleBgName():string
	{
		return null;
	}
    protected getCloseBtnName():string
	{
		return "firstrecharge_newbtn";
	}
    protected getTitleStr():string
    {
        return  null;
    }
	protected getResourceList():string[]
	{
		return super.getResourceList().concat(
			[ 
			"firstrecharge_newbtn",  
            "firstrecharge_newbtn_down",
            "recharge_bigbtn",
            "recharge_bigbtn_down",
            "signin_had_get",
            "firstrecharge",
			"firstecharge_light"
			]);
	}
	private clearlight():void
	{
		for(let i:number =0; i<this._lightArr.length; i++)
		{ 
			egret.Tween.removeTweens(this._lightArr[i]);
			if(this._lightArr[i]&&this._lightArr[i].parent)
			{
				this._lightArr[i].parent.removeChild(this._lightArr[i]);  
			} 
		}
	}
	        
	public dispose(): void 
    {  
		this.clearlight()
        super.dispose();
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_FIRSTCHARGEREWARD),this.useCallback,this);	
        this._getBtn = null;
		this._container =null;
		this._lightArr= [];
	}
}