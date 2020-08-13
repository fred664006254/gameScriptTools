class AcEnjoyNightExchangeView extends PopupView
{   

    private _downNode:BaseDisplayObjectContainer = null;
    private _itemNUm:BaseTextField = null;
    private _desc:BaseTextField = null;
	public constructor(){
		super();
	}

    private get cfg() : Config.AcCfg.EnjoyNightCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcEnjoyNightVo{
        return <AcEnjoyNightVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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


    // protected getRuleInfo() : string
    // {
    //     return `acEnjoyNightExchangeRule-` + this.uicode;
    // }

    protected getResourceList():string[]{
		return super.getResourceList().concat([
			`acenjoynight_prebg-`+this.uicode,"progress3","progress3_bg",`acenjoynight_exchangebb2`,`acenjoynight_exchangebb1`,"servant_detailBtn",
            "acenjoynight_got",
		]);
    }

    protected getShowHeight():number{
		return 795+10
	}

	protected getShowWidth():number{
		return 560;
	}

	protected getTitleStr():string{
		return `acTreasureOfficeTitle-1`;
	}

    private detailBtnHandler():void{
		ViewController.getInstance().openView(ViewConst.POPUP.CHANGEBGDETAILPOPUPVIEW,{
			scene:'cityScene', 
			key:'204',
		});
	}

    public initView():void
    {		

        let view = this;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		let bg = BaseBitmap.create(`acenjoynight_prebg-`+this.uicode);
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2,0);
		view.addChildToContainer(bg);

        let detailBtn = ComponentManager.getButton("servant_detailBtn","",view.detailBtnHandler,view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, detailBtn, bg, [5,35]);
        view.addChildToContainer(detailBtn);

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acEnjoyNightOfficeTip1-${view.uicode}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		view.addChildToContainer(tipTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, bg, [0,5]);

		let line = BaseBitmap.create(`public_line3`);
		line.width = 400;
		view.addChildToContainer(line);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, tipTxt, [0,tipTxt.textHeight + 15]);


        let tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("changebg_name_204"), 22, TextFieldConst.COLOR_WHITE);
		view.addChildToContainer(tipTxt2);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt2, line);

		let tipTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("changebg_desc_204"), 20, TextFieldConst.COLOR_WHITE);
		view.addChildToContainer(tipTxt3);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt3, tipTxt2, [0,tipTxt2.textHeight + 5]);

		// let tipTxt4 = ComponentManager.getTextField(LanguageManager.getlocal(`acEnjoyNightOfficeTip4-${view.uicode}`), 20, TextFieldConst.COLOR_WHITE);
		// view.addChildToContainer(tipTxt4);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipTxt4, bg, [0,130]);


        let desc = ComponentManager.getTextField(" ", 17, TextFieldConst.COLOR_LIGHT_YELLOW);
		desc.width = 510;
        desc.lineSpacing = 5;
        desc.textAlign = egret.HorizontalAlign.CENTER;
        
       
        this._desc = desc;

        let bg2 = BaseBitmap.create(`acenjoynight_exchangebb2`);
		bg2.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg2.width / 2,this.getShowHeight()-bg2.height-63-10);
		view.addChildToContainer(bg2);
        
        let bg1 = BaseBitmap.create(`acenjoynight_exchangebb1`);
		bg1.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg1.width / 2,bg2.y-bg1.height);
		view.addChildToContainer(bg1);
        desc.setPosition(this.viewBg.width/2-desc.width/2, bg2.y+3);
		 view.addChildToContainer(desc);
        let scenesid = this.cfg.getExchangeSceneId();
        if (Api.otherInfoVoApi.isHasSceneNotAboutUnlock(scenesid,"cityScene"))
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
        this.addChildToContainer(this._downNode);
        this._downNode.y = 608;

        let rectd = new egret.Rectangle(0,0,65,65);
        let icon = BaseLoadBitmap.create("itemicon2009",rectd);
        this._downNode.addChild(icon);
        icon.setPosition(10+GameData.popupviewOffsetX,5);

        let progressbar2 = ComponentManager.getProgressBar("progress3", "progress3_bg", 290);
		progressbar2.setPosition(85+GameData.popupviewOffsetX, 25);
		this._downNode.addChild(progressbar2);

        let needparts:string =  this.cfg.exchangeScene.needParts;
        let needNum:string = needparts.split("_")[2];

        let hasNum:number = Api.itemVoApi.getItemNumInfoVoById("2009");
        progressbar2.setText(hasNum+"/"+needNum);
        progressbar2.setPercentage(hasNum/Number(needNum));

        let exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "exchange" , this.exchangeScene, this)
		exchangeBtn.setPosition(385+GameData.popupviewOffsetX, 12);
		this._downNode.addChild(exchangeBtn);

        let str1 = LanguageManager.getlocal("itemName_2009");
        let str2 = LanguageManager.getlocal("changebg_name_"+this.cfg.getExchangeSceneId());
        this._desc.text = LanguageManager.getlocal(`acEnjoyNightExchangeDesc-${this.uicode}`,[str1,str2,str1]);
    }

   

    private showExchangeItem():void
    {
        if (this._downNode)
        {
            this._downNode.dispose();
        }

        this._downNode = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._downNode);
        this._downNode.y = 608;

        let rectd = new egret.Rectangle(0,0,65,65);
        let icon = BaseLoadBitmap.create("itemicon2009",rectd);
        this._downNode.addChild(icon);
        icon.setPosition(180+GameData.popupviewOffsetX,5);

        let hasNum:number = Api.itemVoApi.getItemNumInfoVoById("2009");
        this._itemNUm = ComponentManager.getTextField(String(hasNum), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._itemNUm.setPosition(260+GameData.popupviewOffsetX, 30);
        this._downNode.addChild(this._itemNUm);

        let exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acEnjoyNightExchangeItem" , this.exchangeItem, this)
		exchangeBtn.setPosition(355+GameData.popupviewOffsetX, 12);
		this._downNode.addChild(exchangeBtn);

        let graybg = BaseBitmap.create("public_9_bg8");
        graybg.width = this.viewBg.width;
        graybg.height = 120;
        graybg.setPosition(0+GameData.popupviewOffsetX,300);
        this.addChildToContainer(graybg);

        let gotpic = BaseBitmap.create("acenjoynight_got");

        gotpic.setPosition(this.viewBg.width/2-gotpic.width/2,graybg.y+graybg.height/2-gotpic.height/2);
        this.addChildToContainer(gotpic);

        let str1 = LanguageManager.getlocal("itemName_2009");
        let str2 = LanguageManager.getlocal("changebg_name_"+this.cfg.getExchangeSceneId());

        this._desc.text = LanguageManager.getlocal(`acEnjoyNightExchangeDesc2-${this.uicode}`,[str2,str1,str1]);
        
    }

    private exchangeScene():void
    {
        let needparts:string =  this.cfg.exchangeScene.needParts;
        let needNum:string = needparts.split("_")[2];
        let hasNum:number = Api.itemVoApi.getItemNumInfoVoById("2009");
        if (Number(needNum)>hasNum)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal(`itemNumNotEnough`));
            return;
        }

        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTEXCHANGE),this.useCallback,this); 
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTEXCHANGE,{
            activeId : this.aidAndCode,
            isscene : 1,
        });
        // this.request(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTEXCHANGE, { activeId: this.aidAndCode, isscene: 1 })
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
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTEXCHANGE),this.useCallback,this); 
	}

    // protected receiveData(data: { ret: boolean, data: any }): void 
    // {

    //     if (data.ret)
    //     {
    //         let rewardList =  GameData.formatRewardItem(data.data.data.rewards);
    //         App.CommonUtil.playRewardFlyAction(rewardList);

    //         this.showExchangeItem();
    //     }
	// }
    
    private exchangeItem():void
    {   
        let view = this;
        ViewController.getInstance().openView(ViewConst.COMMON.ACENJOYNIGHTITEMVIEW,{
              aid : view.aid,
            code : view.code,
            uicode : view.uicode,
        });
    }


     private update():void{
		let view = this;
		if(!view.vo){
			return;
		}
        if (this._itemNUm)
        {
            let hasNum:number = Api.itemVoApi.getItemNumInfoVoById("2009");
		    this._itemNUm.text = hasNum.toString();
        }
        
	
	}

    public dispose():void{

		 let view = this;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);

        this._downNode = null;
        this._itemNUm = null;
        this._desc = null;

		super.dispose();
	}
}