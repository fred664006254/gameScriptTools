
class AcEnjoyNightItemView extends CommonView
{  

    private _scrollList:ScrollList = null; 
    private _numTxt : BaseTextField = null;
    public constructor() {
		super();
	}

    protected getTitleStr():string
	{
		return "acEnjoyNightExchange";
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([ 

			 "servant_bottombg",`acchristmasview_smalldescbg`,"acsingledayitembg","battlepasscollect3-1"
         ]);
	}


    private get vo():AcEnjoyNightVo
	{
		 let springCelebrateVo = <AcEnjoyNightVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code); 
		 return  springCelebrateVo;
	} 

    private get cfg() : Config.AcCfg.EnjoyNightCfg
    {
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
	}

	 private get code():string{
        return this.param.data.code;
    }

	 private get uicode():string{
        return this.param.data.uicode;
    }

    
    public initView():void
	{   
        let view = this;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTEXCHANGE),this.useCallback,this);  

        let bottomBg = BaseBitmap.create("servant_bottombg");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = GameConfig.stageHeigth -this.container.y+89;
        bottomBg.x = 0; 
        bottomBg.y = -82; 
		this.addChildToContainer(bottomBg);

        let bottomBg2 = BaseBitmap.create("public_9_bg32");
        bottomBg2.height = bottomBg.height - 190;
        bottomBg2.width = 610;
        bottomBg2.x = GameConfig.stageWidth/2  - bottomBg2.width/2;
        bottomBg2.y = bottomBg.y + 125;
		this.addChildToContainer(bottomBg2);
        
        let numbg = BaseBitmap.create(`acchristmasview_smalldescbg`);
		numbg.height = 34;
		numbg.width = 120;
        numbg.setPosition(GameConfig.stageWidth/2 - numbg.width/2, bottomBg2.y-10 - numbg.height);
		this.addChildToContainer(numbg);

		let rectd = new egret.Rectangle(0,0,40,40);
        let icon = BaseLoadBitmap.create("itemicon2009",rectd);
        icon.setPosition(numbg.x+ 10, numbg.y+numbg.height/2-icon.height/2);
		view.addChildToContainer(icon);

        let hasNum:number = Api.itemVoApi.getItemNumInfoVoById("2009");
        let numTxt = ComponentManager.getTextField(String(hasNum), 20);
        numTxt.setPosition(icon.x+icon.width+10,numbg.y+numbg.height/2-numTxt.height/2);
		view.addChildToContainer(numTxt);
		view._numTxt = numTxt;

        let objList = view.cfg.getShopArr();
        
        let listbg = bottomBg2;
 		let tmpRect =  new egret.Rectangle(0,0,612,listbg.height - 10);
		let scrollList = ComponentManager.getScrollList(AcEnjoyNightItemScrollItem, objList, tmpRect,this.param.data.code);
		view._scrollList = scrollList;     
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [0,5]);
		view.addChildToContainer(scrollList); 
		view.update();
		
		let resetText = ComponentManager.getTextField(LanguageManager.getlocal("acEnjoyNightExchangeReset"), 20,TextFieldConst.COLOR_BROWN);
        resetText.setPosition(GameConfig.stageWidth/2 - resetText.width/2, bottomBg2.y+bottomBg2.height+12);
		view.addChildToContainer(resetText);
        
    }

    private update():void{
		let view = this;
		if(!view.vo){
			return;
		}

		let numTxt = view._numTxt;
        let hasNum:number = Api.itemVoApi.getItemNumInfoVoById("2009");
		numTxt.text = hasNum.toString();
	
	}

    public useCallback(event:egret.Event):void
	{
		let view = this;
		let data = event.data.data.data;
		if(data && data.rewards){
			let rewards = data.rewards;
			let selIdx = view.vo.selIdx;
			let item = <AcEnjoyNightItemScrollItem>view._scrollList.getItemByIndex(selIdx);
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
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTEXCHANGE),this.useCallback,this);  

        this._numTxt = null;
        this._scrollList = null;
		
        super.dispose();
    }
}