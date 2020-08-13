class LadderRankViewTab3 extends CommonViewTab
{  

    //滑动列表
    private _scrollList:ScrollList = null; 
    private _numTxt : BaseTextField = null;
    private _length:number = 0;

    public constructor() 
	{
		super();
		this.initView();
    }

    private get vo() : AcLadderTournamentVo{
        return <AcLadderTournamentVo>Api.acVoApi.getActivityVoByAidAndCode("ladderTournament", "1");
    }

    protected initView():void
    {   
        let view = this;  
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view); 
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_SHOPBUY),this.useCallback,this);

        let listbg = BaseBitmap.create("public_9_bg24");
        listbg.width = 624;
        listbg.height = GameConfig.stageHeigth - 150;
        listbg.setPosition(8,0);
        this.addChild(listbg);

        let titleBg = BaseBitmap.create("ladder_ranktitle_bg");
        titleBg.width = listbg.width;
        titleBg.height = 60;
        titleBg.x = listbg.x;
        this.addChild(titleBg);

        let numbg = BaseBitmap.create(`acchristmasview_smalldescbg`);
		numbg.height = 34;
		numbg.width = 140;
        numbg.setPosition(GameConfig.stageWidth/2 - numbg.width/2, titleBg.y+titleBg.height/2 - numbg.height/2);
		this.addChild(numbg);

		let rectd = new egret.Rectangle(0,0,40,40);
        let icon = BaseLoadBitmap.create("ladder_training_small",rectd);
        icon.setPosition(numbg.x+5, numbg.y+numbg.height/2-icon.height/2);
		view.addChild(icon);

        let hasNum:number = Api.laddertournamentVoApi.getShopscore();
        let numTxt = ComponentManager.getTextField(String(hasNum), 20);
        numTxt.setPosition(icon.x+icon.width+5,numbg.y+numbg.height/2-numTxt.height/2);
		view.addChild(numTxt);
		view._numTxt = numTxt;

        let tmpRect =  new egret.Rectangle(0,0,listbg.width,listbg.height-titleBg.height-16);
        let tempArry = this.vo.getArr("shop");
        this._length = tempArry.length;
		let scrollList = ComponentManager.getScrollList(LadderRankViewTab3Item,tempArry,tmpRect,this.vo);
        view._scrollList = scrollList;     
		scrollList.setPosition(6,titleBg.y+titleBg.height+8)
        view.addChild(scrollList); 
        scrollList.bounces = false;

        
    }

    

    private update():void{
		let view = this;
		if(!view.vo){
			return;
		}

		let numTxt = view._numTxt;
        let hasNum:number = Api.laddertournamentVoApi.getShopscore();
		numTxt.text = hasNum.toString();
	
    }
    
    public useCallback(event:egret.Event):void
	{   
        if(! event.data.ret){
            return;
        }

		let view = this;
		let data = event.data.data.data;
		if(data && data.rewards){
			let rewards = data.rewards;
			let selIdx = view.vo.selIdx;
			let item = <LadderRankViewTab3Item>view._scrollList.getItemByIndex(selIdx);
			if(item){
				item.refreshItem(rewards);
			}
			view.vo.selIdx = -1;
        }
        this.update();
	}

    public tick():void
    {
        for (let i = 0 ; i<this._length; i++)
        {
            let item:LadderRankViewTab3Item = <LadderRankViewTab3Item>this._scrollList.getItemByIndex(i);
            if (item)
            {
                item.tick();
            }
        }
    }


    public dispose():void
	{ 
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_SHOPBUY),this.useCallback,this);

        this._numTxt = null;
        this._scrollList = null;
        this._length = 0;
		
        super.dispose();
    }
}