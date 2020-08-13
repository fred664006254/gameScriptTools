/*
    author : shaoliang
    date : 2019.5.22
    desc : 粽叶飘香-端午节活动 
*/
class AcDuanWuPopupViewTab4 extends AcCommonViewTab
{
     //滑动列表
    private _claimText:BaseTextField = null;
    private _claimBtn:BaseButton = null;
    private _itemTab:AcDuanWuTab3Item[] = [];

    public constructor() 
	{
		super();
		this.initView();
	}

    private get cfg() : Config.AcCfg.DuanWuCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcDuanWuVo{
        return <AcDuanWuVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    protected initView():void
	{
        let view = this;
		view.height = 620;
		view.width = 545;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CLAIMDUANWUITEM),this.buyCallBack,this);

        let Bg = BaseBitmap.create("public_9_bg4");
		Bg.width = 540;
		Bg.height = 660;
        Bg.x = 20;
        Bg.y = 55;
		view.addChild(Bg);

        let scrollContainer = new BaseDisplayObjectContainer();
		let rect:egret.Rectangle = egret.Rectangle.create();
		rect.setTo(0,0,Bg.width,Bg.height-10);

        let scrollView = ComponentManager.getScrollView(scrollContainer,rect);
		this.addChild(scrollView);

        scrollView.setPosition(Bg.x,Bg.y+5);

        //顶部
        let topBg:BaseBitmap = BaseBitmap.create(`acduanwu_topbg1_${this.getUiCode()}`);
		topBg.setPosition(10,0);
        topBg.setScale(520/topBg.width);
		scrollContainer.addChild(topBg);

        let vo = this.vo;
		let shopArr = vo.getArr("claim"); 

        let topCfg:Config.AcCfg.DWClaimItemCfg = <Config.AcCfg.DWClaimItemCfg>shopArr[0];
        let item1 =  `1013_0_${topCfg.costZongZi}_${this.getUiCode()}`;
        let item2 =  `1014_0_${topCfg.costDaGao}_${this.getUiCode()}`;
        let item3 =  `1015_0_${topCfg.costXiongHuang}_${this.getUiCode()}`;

        let icon1: BaseDisplayObjectContainer = GameData.getRewardItemIcons( item1,true)[0];
        icon1.setPosition(73,22);
        icon1.setScale(0.65);
        scrollContainer.addChild(icon1);
        icon1.getChildByName("numLb").visible = false;
        if (icon1.getChildByName("numbg"))
		{
			icon1.getChildByName("numbg").visible = false;
		}
       
        let icon2: BaseDisplayObjectContainer = GameData.getRewardItemIcons( item2,true)[0];
        icon2.setPosition(icon1.x, icon1.y+95);
        icon2.setScale(0.65);
        scrollContainer.addChild(icon2);
        icon2.getChildByName("numLb").visible = false;
        if (icon2.getChildByName("numbg"))
		{
			icon2.getChildByName("numbg").visible = false;
		}
       
        let icon3: BaseDisplayObjectContainer = GameData.getRewardItemIcons( item3,true)[0];
        icon3.setPosition(icon1.x, icon1.y+190);
        icon3.setScale(0.65);
        scrollContainer.addChild(icon3);
        icon3.getChildByName("numLb").visible = false;
        if (icon3.getChildByName("numbg"))
		{
			icon3.getChildByName("numbg").visible = false;
		}

        let plus1:BaseBitmap = BaseBitmap.create(`acduanwu_plus`);
		plus1.setPosition(icon1.x+18,icon1.y+67);
        plus1.setScale(0.7);
		scrollContainer.addChild(plus1);

        let plus2:BaseBitmap = BaseBitmap.create(`acduanwu_plus`);
		plus2.setPosition(icon1.x+18,icon2.y+67);
        plus2.setScale(0.7);
		scrollContainer.addChild(plus2);

        let arrow:BaseBitmap = BaseBitmap.create(`acduanwu_arrow`);
		arrow.setPosition(255,135);
		scrollContainer.addChild(arrow);

        let number1 = ComponentManager.getTextField("×"+topCfg.costZongZi,TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BLACK);
		number1.setPosition(icon1.x+92,icon1.y+20);
		scrollContainer.addChild(number1);

        let number2 = ComponentManager.getTextField("×"+topCfg.costDaGao,TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BLACK);
		number2.setPosition(icon1.x+92,icon2.y+20);
		scrollContainer.addChild(number2);

        let number3 = ComponentManager.getTextField("×"+topCfg.costXiongHuang,TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BLACK);
		number3.setPosition(icon1.x+92,icon3.y+20);
		scrollContainer.addChild(number3);

        this._claimText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._claimText.setPosition(392,205);
		scrollContainer.addChild(this._claimText);

        this._claimBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"exchange",this.claimHandle,this,[1]);
        this._claimBtn.setPosition(332,230);
		scrollContainer.addChild(this._claimBtn);

        this.resetTop();

        let posY:number = 0;
        for (let i:number = 1; i<shopArr.length; i++)
		{   
            let item:AcDuanWuTab3Item = new AcDuanWuTab3Item();
            item.init(<Config.AcCfg.DWClaimItemCfg>shopArr[i],[view.code,view.getUiCode()],this.claimHandle,this);
            item.setPosition(10,300+148*(i-1))
            scrollContainer.addChild(item);
            this._itemTab.push(item);
        }
        this.sortItems();
    }

    private sortItems():void
    {
        this._itemTab.sort((a:AcDuanWuTab3Item,b:AcDuanWuTab3Item)=>{
            return a.sortId - b.sortId;
        });

        for (let i:number = 0; i<this._itemTab.length; i++)
		{
			this._itemTab[i].y = 300+148*i;
            this._itemTab[i].resetBtn();
        }
    }

    private resetTop():void
    {   
        let vo = this.vo;
		let shopArr = vo.getArr("claim"); 
        let topCfg:Config.AcCfg.DWClaimItemCfg = <Config.AcCfg.DWClaimItemCfg>shopArr[0];
        let claimNum:number = topCfg.limit - vo.getClaim(1);
        if (claimNum>0)
        {
            this._claimText.text = LanguageManager.getlocal("acDuanWuClaimTimes",[String(claimNum)]);
        }
        else
        {
            this._claimText.text = LanguageManager.getlocal("acDuanWuClaimTimes2",[String(claimNum)]);
            this._claimBtn.setEnable(false);
        }
        this._claimText.x = 392-this._claimText.width/2;
    }

    private claimHandle(idx:number):void
    {
        if(this.vo.et < GameData.serverTime){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        let shopArr = this.vo.getArr("claim"); 
        let oneCfg:Config.AcCfg.DWClaimItemCfg = <Config.AcCfg.DWClaimItemCfg>shopArr[idx-1];
        if (oneCfg.costZongZi)
        {
            if (oneCfg.costZongZi > this.vo.getActivityItem(1))
            {   
                App.CommonUtil.showTip(LanguageManager.getlocal("acDuanWuClaimTip1"));
                return;
            }
        }
        if (oneCfg.costDaGao)
        {   
            if (oneCfg.costDaGao > this.vo.getActivityItem(2))
            {   
                App.CommonUtil.showTip(LanguageManager.getlocal("acDuanWuClaimTip2"));
                return;
            }
        }
        if (oneCfg.costXiongHuang)
        {   
            if (oneCfg.costXiongHuang > this.vo.getActivityItem(3))
            {   
                App.CommonUtil.showTip(LanguageManager.getlocal("acDuanWuClaimTip3"));
                return;
            }
        }

        this.vo.lastidx = idx;
        if (idx == 1)
        {
            this.vo.lastpos = this._claimText.localToGlobal(this._claimText.width, 20);
        }

        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CLAIMDUANWUITEM,{
            activeId:this.acTivityId,
            shopId:idx
        })
    }


    private update() :void{

		if(!this.vo){
			return;
		}
		this.resetTop();
        this.sortItems();
	}

    private buyCallBack(evt : egret.Event):void{
		let view = this;
		let rData = evt.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }

		let rewards = rData.rewards;
		let cfg = view.cfg.claim[this.vo.lastidx];
        let str = rewards;

        if (rData.getDaGao)
        {
            str = `1014_0_${rData.getDaGao}_${view.getUiCode()}`
        }
        if (rData.getXiongHuang)
        {
            str = `1015_0_${rData.getXiongHuang}_${view.getUiCode()}`
        }
        let replacerewards = rData.replacerewards;
        if (replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
        }

		let rewardList =  GameData.formatRewardItem(str);
        let pos = this.vo.lastpos;
		App.CommonUtil.playRewardFlyAction(rewardList,pos);

        
	}

    public dispose():void
	{	
		let view = this;
        this._claimText = null;
        this._claimBtn = null;
        this._itemTab.length = 0;

		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CLAIMDUANWUITEM),this.buyCallBack,this);

		super.dispose();
	}
}