class AcDoubleSeventhExchangeView extends PopupView
{ 

    private _clickHand:BaseBitmap = null;
    public constructor(){
		super();
	}


    private get cfg() : Config.AcCfg.DoubleSeventhCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcDoubleSeventhVo{
        return <AcDoubleSeventhVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get uicode():string{
        return this.param.data.uicode;
    }

    private get aid():string{
        return this.param.data.aid;
	}

    public get aidAndCode():string
	{
		return this.aid+"-"+this.code;
	}

    protected getTabbarTextArr():Array<string>{
        let code = this.uicode;
        return [
			`exchangeSceneTab1`,
            `exchangeSceneTab2`,
		];
    }

    protected getTitleStr():string{
        return `acTreasureOfficeTitle-1`;
    }

    protected getShowHeight():number{
		return 795+8;
	}

    protected getOffsetX():number
	{
		return 34;
	}

	protected getShowWidth():number{
		return 560;
	}

    protected getResourceList():string[]{
		return super.getResourceList().concat([
            `scene_preview_bg_`+this.cfg.getExchangeSceneId(),"progress3","progress3_bg",
            `acenjoynight_exchangebb2`,`acenjoynight_exchangebb1`,"servant_detailBtn",
            "scene_exchange_topbg","scene_exchange_itembg","acenjoynight_got","guide_hand"
		]);
    }

    private get requestStr():string
    {
        return NetRequestConst.REQUST_ACTIVITY_GETDOUBLESEVENTHEXCHANGE;
    }

    private get sceneType():string
    {
        return "searchScene";
    }


    public initView():void
    {

         App.MessageHelper.addEventListener(NetManager.getMessageName(this.requestStr),this.useCallback,this);  

         this.useCallback(null);

        //  this.showHand();
    }

    public useCallback(event:egret.Event):void
	{
		let view = this;
        let scenesid = this.cfg.getExchangeSceneId();
		if (Api.otherInfoVoApi.isHasSceneNotAboutUnlock(scenesid,this.sceneType))
        {
            App.DisplayUtil.changeToNormal(this.tabbarGroup.getTabBar(1));
            this.tabbarGroup.setLocked(1,false);
            if (event && event.data.ret && event.data.data.data.rewards == "20_303_1")
            {
                this.showHand();
            }
            if (this.vo.isCanExchange())
            {
                 this.tabbarGroup.addRedPoint(1);
            }
            else
            {
                this.tabbarGroup.removeRedPoint(1);
            }
        }
        else
        {
            App.DisplayUtil.changeToGray(this.tabbarGroup.getTabBar(1));
            this.tabbarGroup.setLocked(1,true);
        }
	}

    private showHand()
	{
		this._clickHand = BaseBitmap.create("guide_hand");
		this._clickHand.x = 290;
		this._clickHand.y = GameConfig.stageHeigth/2 - 320;
		this.addChild(this._clickHand);

		egret.Tween.get(this._clickHand,{loop:true})
				.to({scaleX: 0.9,scaleY:0.9}, 500)
				.to({scaleX: 1,scaleY:1}, 500)
	}

    protected clickTabbarHandler(data:any):void
	{
		
		var index = Number(data.index);
        if (index == 1)
        {
            let view = this;
            let scenesid = this.cfg.getExchangeSceneId();
            if (!Api.otherInfoVoApi.isHasSceneNotAboutUnlock(scenesid,this.sceneType))
            {   
                App.CommonUtil.showTip(LanguageManager.getlocal("exchangeScene_noScene"));
                return;
            }
            if (this._clickHand)
            {
                this._clickHand.dispose();
                this._clickHand = null;
            }
        }
		super.clickTabbarHandler(data);
	}

    public dispose():void
	{ 
        let view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(this.requestStr),this.useCallback,this);  
        this._clickHand = null;
		
        super.dispose();
    }
}