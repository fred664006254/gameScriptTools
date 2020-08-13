class AcDoubleSeventhExchangeViewTab1 extends AcCommonViewTab
{
    private _downNode:BaseDisplayObjectContainer = null;
    private _itemNUm:BaseTextField = null;
    private _desc:BaseTextField = null;
    private _bg2:BaseBitmap = null;

    public constructor() 
	{
		super();
		this.initView();
	}   

    private get cfg() : Config.AcCfg.DoubleSeventhCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcDoubleSeventhVo{
        return <AcDoubleSeventhVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get sceneType():string
    {
        return "searchScene";
    }

    private get requestStr():string
    {
        return NetRequestConst.REQUST_ACTIVITY_GETDOUBLESEVENTHEXCHANGE;
    }

    private detailBtnHandler():void{
		ViewController.getInstance().openView(ViewConst.POPUP.CHANGEBGDETAILPOPUPVIEW,{
			scene:this.sceneType, 
			key:this.cfg.getExchangeSceneId(),
		});
	}

    protected initView():void
	{   
        let view = this;
        view.height = 677;
		view.width = 560;
        let sid = this.cfg.getExchangeSceneId();
        let bg = BaseBitmap.create(`scene_preview_bg_`+sid);
		bg.setPosition(this.width / 2 - bg.width /2+5,55);
		view.addChild(bg);

        let detailBtn = ComponentManager.getButton("servant_detailBtn","",view.detailBtnHandler,view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, detailBtn, bg, [5,35]);
        view.addChild(detailBtn);

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`exchangeSceneDesc_`+sid), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		view.addChild(tipTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, bg, [0,8]);

		let line = BaseBitmap.create(`public_line3`);
		line.width = 400;
		view.addChild(line);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, tipTxt, [0,tipTxt.textHeight + 15]);


        let tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("changebg_name_"+sid), 22, TextFieldConst.COLOR_WHITE);
		view.addChild(tipTxt2);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt2, line);

		let tipTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("changebg_desc_"+sid), 20, TextFieldConst.COLOR_WHITE);
		view.addChild(tipTxt3);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt3, tipTxt2, [0,tipTxt2.textHeight + 5]);

        let desc = ComponentManager.getTextField(" ", 17, TextFieldConst.COLOR_LIGHT_YELLOW);
		desc.width = 510;
        desc.lineSpacing = 5;
        desc.textAlign = egret.HorizontalAlign.CENTER;
        
       
        this._desc = desc;

        let bg2 = BaseBitmap.create(`acenjoynight_exchangebb2`);
        bg2.height = 32;
        bg2.width = bg.width+2;
		bg2.setPosition( bg.x-1,bg.y+bg.height-bg2.height+2);
		view.addChild(bg2);
        
        let bg1 = BaseBitmap.create(`acenjoynight_exchangebb1`);
		bg1.setPosition(bg.x-1,bg2.y-bg1.height);
		view.addChild(bg1);
         bg1.width = bg.width+2;
        desc.setPosition(this.width/2-desc.width/2, bg2.y+9);
		view.addChild(desc);

        this._bg2 = bg1;
        let scenesid = this.cfg.getExchangeSceneId();
        if (Api.otherInfoVoApi.isHasSceneNotAboutUnlock(scenesid,this.sceneType))
        {
            this.showExchangeItem();
        }
        else
        {
            this.showExchangeScene();
        }
    }

    private showExchangeScene():void
    {
        this._downNode = new BaseDisplayObjectContainer();
        this.addChild(this._downNode);
        this._downNode.y = 630;

        let rectd = new egret.Rectangle(0,0,65,65);
        let icon = BaseLoadBitmap.create("itemicon"+this.cfg.getExchangeNeedItemId(),rectd);
        this._downNode.addChild(icon);
        icon.setPosition(10,5);

        let progressbar2 = ComponentManager.getProgressBar("progress3", "progress3_bg", 290);
		progressbar2.setPosition(85, 25);
		this._downNode.addChild(progressbar2);

        let needparts:string =  this.cfg.exchange.needPart;
        let needNum:string = needparts.split("_")[2];

        let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(this.cfg.getExchangeNeedItemId());
        progressbar2.setText(hasNum+"/"+needNum);
        progressbar2.setPercentage(hasNum/Number(needNum));

        let exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "exchange" , this.exchangeScene, this)
		exchangeBtn.setPosition(385, 12);
		this._downNode.addChild(exchangeBtn);


        let graybg2 = BaseBitmap.create("public_9_bg8");
        graybg2.width = this._bg2.width;
        graybg2.height = 35;
        graybg2.setPosition(this._bg2.x,-graybg2.height);
        this._downNode.addChild(graybg2);

        let sid = this.cfg.getExchangeSceneId();
        let tipTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("exchangeSceneFit_"+sid), 20, TextFieldConst.COLOR_WHITE);
		this._downNode.addChild(tipTxt3);
		tipTxt3.setPosition(graybg2.x+graybg2.width/2 - tipTxt3.width/2,graybg2.y+8);
        

        let str1 = LanguageManager.getlocal("itemName_"+this.cfg.getExchangeNeedItemId());
        let str2 = LanguageManager.getlocal("changebg_name_"+this.cfg.getExchangeSceneId());
        this._desc.text = LanguageManager.getlocal(`exchangeSceneDesc1`,[str1,str2]);
    }

   

    private showExchangeItem():void
    {
        if (this._downNode)
        {
            this._downNode.dispose();
        }

        if (this._bg2)
        {
            this._bg2.visible = false;
        }

        this._downNode = new BaseDisplayObjectContainer();
        this.addChild(this._downNode);
        this._downNode.y = 608;


        let graybg = BaseBitmap.create("public_9_bg8");
        graybg.width = this._bg2.width;
        graybg.height = 120;
        graybg.setPosition(this._bg2.x,300);
        this.addChild(graybg);


        let gotpic = BaseBitmap.create("acenjoynight_got");
        gotpic.setPosition(this.width/2-gotpic.width/2,graybg.y+graybg.height/2-gotpic.height/2);
        this.addChild(gotpic);

      
        let graybg2 = BaseBitmap.create("public_9_bg8");
        graybg2.width = this._bg2.width;
        graybg2.height = 35;
        graybg2.setPosition(this._bg2.x,this._bg2.y+this._bg2.height-graybg2.height+1);
        this.addChild(graybg2);

        let sid = this.cfg.getExchangeSceneId();
        let tipTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("exchangeSceneFit_"+sid), 20, TextFieldConst.COLOR_WHITE);
		this.addChild(tipTxt3);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt3, graybg2, [0,0]);

        this._desc.text = LanguageManager.getlocal(`exchangeSceneDesc2`);
        
    }

    private exchangeScene():void
    {
        let needparts:string =  this.cfg.exchange.needPart;
        let needNum:string = needparts.split("_")[2];
        let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(this.cfg.getExchangeNeedItemId());
        if (Number(needNum)>hasNum)
        {   
            App.CommonUtil.showTip(LanguageManager.getlocal(`itemNumNotEnough`));
            return;
        }

        App.MessageHelper.addEventListener(NetManager.getMessageName(this.requestStr),this.useCallback,this); 
        NetManager.request(this.requestStr,{
            activeId : this.acTivityId,
            isscene : 1,
        });
    }

    public useCallback(event:egret.Event):void
	{
		let view = this;
		let data = event.data.data.data;
		if(data && data.rewards){
			let rewards = data.rewards;
			let rewardList =  GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardList);

            this.showExchangeItem();
		}
        App.MessageHelper.removeEventListener(NetManager.getMessageName(this.requestStr),this.useCallback,this); 
	}


    public dispose():void{

        App.MessageHelper.removeEventListener(NetManager.getMessageName(this.requestStr),this.useCallback,this); 

        this._downNode = null;
        this._itemNUm = null;
        this._desc = null;
        this._bg2 = null;

		super.dispose();
	}
}