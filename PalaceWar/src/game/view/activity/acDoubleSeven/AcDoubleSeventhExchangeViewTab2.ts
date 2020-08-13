class AcDoubleSeventhExchangeViewTab2 extends AcCommonViewTab
{


    private _scrollList:ScrollList = null; 
    private _numTxt : BaseTextField = null;
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

    protected initView():void
	{
        let view = this;
         view.height = 677;
		view.width = 560;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(this.requestStr),this.useCallback,this);  

        let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 522;
        bg.height = 658
		bg.setPosition(this.width / 2 - bg.width /2+5,55);
		this.addChild(bg);

        let topbg:BaseBitmap = BaseBitmap.create("scene_exchange_topbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, bg, [0,8]);
        this.addChild(topbg);

        let rectd = new egret.Rectangle(0,0,65,65);
        let icon = BaseLoadBitmap.create("itemicon"+this.cfg.getExchangeNeedItemId(),rectd);
        this.addChild(icon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, topbg, [38,15]);

        let sid = this.cfg.getExchangeSceneId();
        let tipTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("exchangeSceneShopDesc_"+sid), 20, TextFieldConst.COLOR_BROWN);
        tipTxt3.width = 362;
        tipTxt3.lineSpacing = 6;
		this.addChild(tipTxt3);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt3, topbg, [123,15]);


        let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(this.cfg.getExchangeNeedItemId());
        let numTxt = ComponentManager.getTextField(String(hasNum), 18);
        numTxt.width = 88;
        numTxt.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, numTxt, topbg, [23,89]);
		view.addChild(numTxt);
		view._numTxt = numTxt;


        let objList = view.cfg.getShopArr();
        
 		let tmpRect =  new egret.Rectangle(0,0,bg.width-4,517);
		let scrollList = ComponentManager.getScrollList(AcDoubleSeventhExchangeItem, objList, tmpRect,{code:this.code,aid:this.aid});
		view._scrollList = scrollList;     
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, bg, [0,135]);
		view.addChild(scrollList); 


        this.update();
    }

    private update():void{
		let view = this;
		if(!view.vo){
			return;
		}

		let numTxt = view._numTxt;
        let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(this.cfg.getExchangeNeedItemId());
		numTxt.text = hasNum.toString();
	
	}

    public useCallback(event:egret.Event):void
	{
		let view = this;
		let data = event.data.data.data;
		if(data && data.rewards){
			let rewards = data.rewards;
			let selIdx = view.vo.selIdx;
			let item = <AcDoubleSeventhExchangeItem>view._scrollList.getItemByIndex(selIdx);
			if(item){
				item.refreshItem(rewards);
			}
			view.vo.selIdx = -1;
		}
	}

    public dispose():void
	{ 
        let view = this;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(this.requestStr),this.useCallback,this);  

        this._numTxt = null;
        this._scrollList = null;
		
        super.dispose();
    }
}