/*
author : qinajun
date : 2018.4.14
desc : 活动节日任务
*/
class AcDechuanshidaiPopupViewTab2 extends AcCommonViewTab
{
	//滑动列表
	private _claimText:BaseTextField = null;
    private _claimBtn:BaseButton = null;
	private _itemTab:AcDechuanshidaiExchangeItem[] = [];
	
	public constructor(data) 
	{
		super();
		this.param = data;
		this.initView();
	}
	
	private get cfg() : Config.AcCfg.DechuanshidaiCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcDechuanshidaiVo{
        return <AcDechuanshidaiVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}
	
	protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            case 1:
            case 2:
                code = `1`;
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }

	protected initView():void
	{	
		let view = this;
		// let boatview : any = ViewController.getInstance().getView('AcDragonBoatDayView');
		view.height = 660;
		view.width = 545;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DECHUAN_CLAIM),this.rewardCallBack,this);
		
		let code = view.getUiCode();
		let Bg = BaseBitmap.create("public_9_bg4");
		Bg.width = 535;
		Bg.height = 650;
        Bg.x = 30;
        Bg.y = 55;
		view.addChild(Bg);

		let topbg = BaseBitmap.create(`dechuanchangetopbg-${code}`);
		view.addChild(topbg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, Bg, [0,5]);
		

        let pos = {
            1 : [55,40],
            2 : [400,40],
            3 : [55,175],
            4 : [400,175],
		}
		let need:any={};
		let cfg : Config.AcCfg.DeChuanExchangeItemCfg = view.cfg.claim[1];
		if (cfg.costdeZi)
		{
			need[1] = cfg.costdeZi;
		}
		if (cfg.costchuanZi)
		{
			need[2] = cfg.costchuanZi;
		}
		if (cfg.costshiZi)
		{
			need[3] = cfg.costshiZi;
		}
		if (cfg.costdaiZi)
		{
			need[4] = cfg.costdaiZi;
		}
			
        for(let i = 1; i < 5; ++ i){
            let img = BaseBitmap.create(`dechuantype${i}-${code}`);
			view.addChild(img);
			img.setScale(0.8);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, img, Bg, pos[i]);

            let typeTxt = ComponentManager.getTextField(`X${need[i]}`, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            typeTxt.name = `typeTxt${i}`;
            view.addChild(typeTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, typeTxt, img, [0,img.height*img.scaleY-6]);
		}
		
        view._claimBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"exchange",this.claimHandle,this,[1]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, view._claimBtn, topbg, [0,15]);
		view.addChild(view._claimBtn);

		let wife_btnbg = BaseBitmap.create(`wife_btnbg`);
		wife_btnbg.name = `wife_btnbg`;
		view.addChild(wife_btnbg);
		wife_btnbg.width = 130;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, wife_btnbg, view._claimBtn, [0, -wife_btnbg.height-5]);

		view._claimText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._claimText, wife_btnbg);
		view.addChild(this._claimText);


		view.resetTop();
		
		let vo = this.vo;
		let shopArr = vo.getArr("claim"); 

		let container = new BaseDisplayObjectContainer();
		container.width  = 530;

        let posY:number = 0;
        for (let i:number = 1; i<shopArr.length; i++)
		{   
			let item:AcDechuanshidaiExchangeItem = new AcDechuanshidaiExchangeItem();
            item.init(<Config.AcCfg.DeChuanExchangeItemCfg>shopArr[i],view.code,this.claimHandle,this);
            item.setPosition(0,135*(i-1))
            container.addChild(item);
            view._itemTab.push(item);
		}

		let rect:egret.Rectangle = egret.Rectangle.create();
		rect.setTo(0,0,530,350);
		let scrollView = ComponentManager.getScrollView(container,rect);
		scrollView.bounces = false;
		scrollView.horizontalScrollPolicy = "off";
		this.addChild(scrollView);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollView, topbg, [0,topbg.height+3]);

        view.sortItems();
	}

	private update() :void{
		let view = this;
		if(!this.vo){
			return;
		}
		this.resetTop();
		this.sortItems();
		// for(let i = 1; i < 5; ++ i){
        //     let typeTxt = <BaseTextField>view.getChildByName(`typeTxt${i}`);
        //     typeTxt.text = `X${view.vo.dayNumById(i)}`;
        // }
	}

	private sortItems():void
    {
        this._itemTab.sort((a:AcDechuanshidaiExchangeItem,b:AcDechuanshidaiExchangeItem)=>{
            return a.sortId - b.sortId;
        });

        for (let i:number = 0; i<this._itemTab.length; i++)
		{
			this._itemTab[i].y = 135*i;
            this._itemTab[i].resetBtn();
        }
    }

    private resetTop():void
    {   
        let vo = this.vo;
		let shopArr = vo.getArr("claim"); 
        let topCfg:Config.AcCfg.DWClaimItemCfg = <Config.AcCfg.DWClaimItemCfg>shopArr[0];
        let claimNum:number = topCfg.limit - vo.getBuyLimitnum(1);
        if (claimNum>0)
        {
            this._claimText.text = LanguageManager.getlocal("acDechuanshidaiClaimTimes",[String(claimNum)]);
        }
        else
        {
            this._claimText.text = LanguageManager.getlocal("acDechuanshidaiClaimTimes2",[String(claimNum)]);
            this._claimBtn.setEnable(false);
        }
		let claimbg = this.getChildByName(`wife_btnbg`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._claimText, claimbg);
		let cfg : Config.AcCfg.DeChuanExchangeItemCfg = this.cfg.claim[1];
		let need : any = {};
		if (cfg.costdeZi)
		{
			need[1] = cfg.costdeZi;
		}
		if (cfg.costchuanZi)
		{
			need[2] = cfg.costchuanZi;
		}
		if (cfg.costshiZi)
		{
			need[3] = cfg.costshiZi;
		}
		if (cfg.costdaiZi)
		{
			need[4] = cfg.costdaiZi;
		}

		if (vo.dayNumById(1)>=need[1] && vo.dayNumById(2)>=need[2] && vo.dayNumById(3)>=need[3] && vo.dayNumById(4)>=need[4])
		{
			App.DisplayUtil.changeToNormal(this._claimBtn);
		}
		else
		{
			App.DisplayUtil.changeToGray(this._claimBtn);
		}
	}
	
	private claimHandle(idx:number):void
    {
        if(this.vo.et < GameData.serverTime){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        let shopArr = this.vo.getArr("claim"); 
        let oneCfg:Config.AcCfg.DeChuanExchangeItemCfg = <Config.AcCfg.DeChuanExchangeItemCfg>shopArr[idx-1];
        if (oneCfg.costdeZi)
        {
            if (oneCfg.costdeZi > this.vo.dayNumById(1))
            {   
                App.CommonUtil.showTip(LanguageManager.getlocal(`acDechuanshidaitip5-${this.getUiCode()}`, [LanguageManager.getlocal(`acDechuanshidaifont1-${this.getUiCode()}`)]));
                return;
            }
		}
		if (oneCfg.costchuanZi)
        {
            if (oneCfg.costchuanZi > this.vo.dayNumById(2))
            {   
                App.CommonUtil.showTip(LanguageManager.getlocal(`acDechuanshidaitip5-${this.getUiCode()}`, [LanguageManager.getlocal(`acDechuanshidaifont2-${this.getUiCode()}`)]));
                return;
            }
		}
		if (oneCfg.costshiZi)
        {
            if (oneCfg.costshiZi > this.vo.dayNumById(3))
            {   
                App.CommonUtil.showTip(LanguageManager.getlocal(`acDechuanshidaitip5-${this.getUiCode()}`, [LanguageManager.getlocal(`acDechuanshidaifont3-${this.getUiCode()}`)]));
                return;
            }
		}
		if (oneCfg.costdaiZi)
        {
            if (oneCfg.costdaiZi > this.vo.dayNumById(4))
            {   
                App.CommonUtil.showTip(LanguageManager.getlocal(`acDechuanshidaitip5-${this.getUiCode()}`, [LanguageManager.getlocal(`acDechuanshidaifont4-${this.getUiCode()}`)]));
                return;
            }
        }

        this.vo.lastidx = idx;
        if (idx == 1)
        {
            this.vo.lastpos = this._claimText.localToGlobal(this._claimText.width, 20);
        }

        NetManager.request(NetRequestConst.REQUEST_DECHUAN_CLAIM,{
            activeId:this.acTivityId,
            shopId:idx
        })
    }

	private rewardCallBack(evt : egret.Event):void{
		let view = this;
		let rData = evt.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }

		let rewards = rData.rewards;
		let cfg = view.cfg.claim[this.vo.lastidx];
        let str = rewards;

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
		view._claimText = null;
        view._claimBtn = null;
        view._itemTab = [];
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DECHUAN_CLAIM),this.rewardCallBack,this);
		super.dispose();
	}
}