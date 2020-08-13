class ActivityPopView extends PopupView
{	
    private _checkBtn:BaseBitmap = null;
    private _sureBtn:BaseButton = null;
    private _isCheck:boolean = false;
    private _itemTab:ActivityPopItem[] = [];
    private _infoTab:any[] = [];
    private _posY:number = 0;

    public constructor() 
	{
		super();
	}

	protected getResourceList():string[]
	{	
        this._infoTab = this.param.data.info;//Api.acVoApi.getAcPopInfo();
		let picArray:string[] = ["acpop_effect"];
        for (let i:number = 0; i<this._infoTab.length; i++)
		{       
            let info = this._infoTab[i];
            let bgres = info.p + (info.vo && info.vo.zids && info.vo.isCrossLeague() ? `_multicross` : ``);
            if (info.vo && info.vo.zids && info.vo.isCrossFengYun())
            {
                bgres = info.p + "_fengyun";
            }
			picArray.push(bgres);
        }
        if (Api.otherInfoVoApi.checkHasNewYear())
        {   
            picArray.push("acpopicon_newyear");
        }
        if (Api.otherInfoVoApi.checkHasHomeNewYear())
        {   
            picArray.push("acpopicon_homenewyear");
        }
		return super.getResourceList().concat(picArray);
	}

    protected initView():void
	{	
        if (this._infoTab.length == 0)
        {   
            this.hide();
            return;
        }

        if (Api.rookieVoApi.isGuiding)
        {
            let view = ViewController.getInstance().getView(ViewConst.BASE.ROOKIEVIEW);
            if (view)
            {
                view.hide();
            }
        }

        let scrollBg:BaseBitmap = BaseBitmap.create("activitypop_itembg");
		scrollBg.width = 538;
		scrollBg.height = 516;
		scrollBg.setPosition(this.viewBg.width/2 - scrollBg.width/2 , 10);
		this.addChildToContainer(scrollBg);

        this._checkBtn = BaseBitmap.create("activitypop_check1");
        this._checkBtn.y = scrollBg.y+scrollBg.height+5;
        this._checkBtn.addTouchTap(this.checkHandle,this);
        this.addChildToContainer(this._checkBtn);
        
        let tipText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("activityPopTip"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
        tipText.y = this._checkBtn.y + 10;
        tipText.x = this.viewBg.width-tipText.width-50;
        this.addChildToContainer(tipText);

        this._checkBtn.x = tipText.x - this._checkBtn.width-3;

        this._sureBtn = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW,"activityPopSureTip",this.clickSureHandler,this);
        this._sureBtn.setPosition(GameConfig.stageWidth/2 - this._sureBtn.width/2, GameConfig.stageHeigth/2+380);
        this.addChild(this._sureBtn);

        let scrollContainer = new BaseDisplayObjectContainer();
		let rect:egret.Rectangle = egret.Rectangle.create();
		rect.setTo(0,0,580,510);

        let scrollView = ComponentManager.getScrollView(scrollContainer,rect);
		this.addChildToContainer(scrollView);

        scrollView.setPosition(scrollBg.x+3,scrollBg.y+3);

        let posY:number = 0;
        for (let i:number = 0; i<this._infoTab.length; i++)
		{   
            if(GameData.serverTime>this._infoTab[i].vo.et)
		    {
                this._itemTab.splice(i,1);
            }
            else
            {
                let item:ActivityPopItem = new ActivityPopItem();
                item.init(this._infoTab[i]);
                scrollContainer.addChild(item);
                this._itemTab.push(item);
            }
        }

        if (Api.otherInfoVoApi.checkHasNewYear())
        {   
            App.MessageHelper.addEventListener(MessageConst.MESSAGE_DINNER_GUIDE,this.hide,this);
            let item:ActivityPopItem = new ActivityPopItem();
            item.init({label:5,p:"acpopicon_newyear",sortId:0,vo:{aid:"newyear"}});
            scrollContainer.addChild(item);
            this._itemTab.push(item);
        }

        if (Api.otherInfoVoApi.checkHasHomeNewYear())
        {   
            let item:ActivityPopItem = new ActivityPopItem();
            item.init({label:5,p:"acpopicon_homenewyear",sortId:0,vo:{aid:"homenewyear"}});
            scrollContainer.addChild(item);
            this._itemTab.push(item);
        }

        this.sortItems();

        let descbg:BaseBitmap = BaseBitmap.create("public_searchdescbg");
		descbg.width = 540;
		descbg.height = 46;
        descbg.setPosition(GameConfig.stageWidth/2 - descbg.width/2, GameConfig.stageHeigth/2+320);
        this.addChild(descbg);

        let descTipTxt =  ComponentManager.getTextField(LanguageManager.getlocal("activityPopClickTip"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        descTipTxt.x = GameConfig.stageWidth/2 - descTipTxt.width/2;
        descTipTxt.y =  descbg.y + descbg.height/2 -descTipTxt.height/2 ;
        this.addChild(descTipTxt);

    }

    protected resetBgSize():void
    {
        super.resetBgSize();
        if(!Api.rookieVoApi.isInGuiding && Api.switchVoApi.checkShowOpenViewAni() && this.isShowOpenAni())
        {
            this.y = GameConfig.stageHeigth/2 - 60;
            this._maskBmp.y = 60;
        }else
        {
            this.y = -60;
            this._maskBmp.y = 60;
        }
    }
	protected playOpenViewEffect():void{
		if(!Api.rookieVoApi.isInGuiding && Api.switchVoApi.checkShowOpenViewAni() && this.isShowOpenAni())
		{
			//打开特效
			this.alpha=0;
			this.scaleX=0.5;
			this.scaleY=0.5;
			this.anchorOffsetX=GameConfig.stageWidth/2;
			this.anchorOffsetY=GameConfig.stageHeigth/2;
			this.x = GameConfig.stageWidth/2;
			this.y = GameConfig.stageHeigth/2;
			if(this._maskBmp)
			{
				this._maskBmp.setScale(2);
				this._maskBmp.x = -GameConfig.stageWidth/2;
				this._maskBmp.y = -GameConfig.stageHeigth/2;
			}
			egret.Tween.get(this, {loop : false}).to({scaleX : 1.1, scaleY : 1.1,alpha:1},200).to({scaleX : 1, scaleY : 1},100)
			.call(function()
			{
				egret.Tween.removeTweens(this);
				if(this._maskBmp)
				{
					this._maskBmp.setScale(1);
					this._maskBmp.x = 0;
					this._maskBmp.y = 60;
				}
				
			},this);	
		}
	}
    private sortItems():void
    {
        this._itemTab.sort((a:ActivityPopItem,b:ActivityPopItem)=>{
            return a.sortId - b.sortId;
        });

        let posY:number = 0;
        for (let i:number = 0; i<this._itemTab.length; i++)
		{
			this._itemTab[i].y = posY;
            posY+=this._itemTab[i].height+2;
        }
    }

    private checkHandle():void
    {
        if (this._isCheck)
        {
            this._isCheck = false;
            this._checkBtn.texture = ResourceManager.getRes("activitypop_check1");
        }
        else
        {
            this._isCheck = true;
            this._checkBtn.texture = ResourceManager.getRes("activitypop_check2");
        }
    }

    private tick():void
	{   
        let needSort:boolean = false;
        if (this._itemTab.length > 0)
        {
            for (let i:number = 0; i<this._itemTab.length; i++)
            {
                let type:number = this._itemTab[i].tick();
                if (type>0)
                {
                    needSort = true;
                }
                if (type == 2)
                {   
                    this._itemTab[i].dispose();
                    this._itemTab.splice(i,1);
                }
            }
            if (needSort)
            {
                this.sortItems();
            }
        }
    }

    private clickSureHandler():void
    {
        this.hide();
    }

    public hide():void
    {
        if (this._isCheck)
        {
            NetManager.request(NetRequestConst.REQYEST_OTHER_INFO_SETACTIVITYPOP,{});
        }

        // if(Api.switchVoApi.checkOpenReback() && Api.playerReturnVoApi.version > 0 && Api.playerReturnVoApi.isInActTime())
		// {
		// 	if(Api.playerReturnVoApi.getRebackRewards() != ''){
		// 		ViewController.getInstance().openView(ViewConst.POPUP.REBACKPOPUPVIEW);
        //     }
        //     else{
        //         if(Api.rookieVoApi.curGuideKey == "zhenqifang"){
        //             App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_NEEDGUIDE);
        //         }
        //     }
        // }
        // else{
        //     if(Api.rookieVoApi.curGuideKey == "zhenqifang"){
        //         App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_NEEDGUIDE);
        //     }
        // }
        GameData.acPopTime = GameData.serverTime;
        super.hide();

    }

    protected getBgExtraHeight():number
	{
		return 10;
	}

    // protected isShowOpenAni():boolean{
    //     return false;
    // }

    public dispose():void
	{   
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DINNER_GUIDE,this.hide,this);
        this._checkBtn = null;
        this._isCheck = false;
        this._sureBtn = null;
        this._itemTab.length = 0;
        this._infoTab.length = 0;
		super.dispose();
	}
}