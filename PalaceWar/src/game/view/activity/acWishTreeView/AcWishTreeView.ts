/**
 * 红颜许愿
 * author yanyuling
 * date 2018/03/13
 * @class AcWishTreeView
 */
class AcWishTreeView  extends AcCommonView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _lastTimeTxt:BaseTextField;
    private _bottomTipTxt:BaseTextField;
    private _buyBtn:BaseButton;
    private _exchangeBtn:BaseButton;
    private _cdNum:number = -2;
	public constructor() 
	{
		super();
	}

    public initView()
    {  
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY,this.receivePushData,this);
          App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.refreshUI,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_EXCHANGEWIFE),this.exchangeHandler,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_WISHTRER_NEXTDAY,this.refreshUI,this);

        this._nodeContainer = new  BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);
        
        let forpeople_top = BaseBitmap.create("forpeople_top");
        forpeople_top.y = -15;
        this._nodeContainer.addChild(forpeople_top);

        let durTimeTxt = ComponentManager.getTextField("",22,TextFieldConst.COLOR_LIGHT_YELLOW);
        durTimeTxt.text   = this.acVo.getAcLocalTime(true,"0xffffff");
        durTimeTxt.x = 8;
        durTimeTxt.y = 5;
        this._nodeContainer.addChild(durTimeTxt);

        let topTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acWishTreeTip1"),22,TextFieldConst.COLOR_LIGHT_YELLOW);
        topTipTxt.x = durTimeTxt.x;
        topTipTxt.y = durTimeTxt.y + 35;
        this._nodeContainer.addChild(topTipTxt);

        let wishtree_bg = BaseBitmap.create("wishtree_bg");
        wishtree_bg.y = 80;
        this._nodeContainer.addChild(wishtree_bg);

        let wordImg =  BaseBitmap.create("wishtree_word");
        wordImg.y = wishtree_bg.y + 80;
        wordImg.x = GameConfig.stageWidth - 100;
        this._nodeContainer.addChild(wordImg);

        let exchangeBtn =  ComponentManager.getButton("wishtree_btn1","",this.exchangeBtnHandler,this);
        exchangeBtn.x = 5;
        exchangeBtn.y = wishtree_bg.y + 5;
        this._exchangeBtn = exchangeBtn;
        this._nodeContainer.addChild(exchangeBtn);

        let bottomBg =  BaseBitmap.create("wifeskin_barbg");
        bottomBg.y = GameConfig.stageHeigth - this.container.y-bottomBg.height;
        this._nodeContainer.addChild(bottomBg);
        
        let timesBg =  BaseBitmap.create("wifeview_skingetbg");
        timesBg.width = 260;
        timesBg.height = 40;
        timesBg.x = GameConfig.stageWidth - timesBg.width;
        timesBg.y = bottomBg.y - timesBg.height;
        timesBg.name = "timesBg";
        this._nodeContainer.addChild(timesBg);
        
        this._lastTimeTxt =  ComponentManager.getTextField("",24,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._lastTimeTxt.text =  LanguageManager.getlocal("acWishTreeTimesTxt",["",""]);
        this._lastTimeTxt.x = timesBg.x + timesBg.width/2 - this._lastTimeTxt.width/2-5;
        this._lastTimeTxt.y =  timesBg.y + timesBg.height/2 - this._lastTimeTxt.height/2;
        this._nodeContainer.addChild( this._lastTimeTxt);

        let buyBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"acTailorBtnOne",this.buyHandler,this);
        buyBtn.setText("");
        buyBtn.x = GameConfig.stageWidth/2 - buyBtn.width/2;
        buyBtn.y = bottomBg.y + 15;
        this._buyBtn = buyBtn;
        this._nodeContainer.addChild(buyBtn);

        let param:string[]=[];
        let cfg:Config.AcCfg.WishTreeCfg=Config.AcCfg.getCfgByActivityIdAndCode(this.aid,this.code);
        if(cfg)
        {
            Api.rechargeVoApi.formatThHwMoneyInfo(param,cfg.cost1);
        }
        let bottomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acWishTreeTip2",param),20,TextFieldConst.COLOR_LIGHT_YELLOW);
        bottomTipTxt.name = "bottomTipTxt";
        this._bottomTipTxt = bottomTipTxt;
        bottomTipTxt.x = GameConfig.stageWidth/2 - bottomTipTxt.width/2;
        bottomTipTxt.y = bottomBg.y+bottomBg.height - 30;
        this._nodeContainer.addChild(bottomTipTxt);
        this.refreshUI();
        this.showEffect();
    }

    protected refreshUI()
    {
        let cfg  = <Config.AcCfg.WishTreeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid,this.code);
        let numL = cfg.getLastWishTimes();
        let itemNum = Api.itemVoApi.getItemNumInfoVoById("2102");
        let wishTime = numL - itemNum;
        if(wishTime <= 0){
            wishTime = 0;
        }
        this._lastTimeTxt.text =  LanguageManager.getlocal("acWishTreeTimesTxt",[String(wishTime),""+numL]);
        /**
         * 无许愿次数
         */
        if(numL == 0)
        {
            this._nodeContainer.getChildByName("timesBg").visible = false;
            this._lastTimeTxt.visible = false;
            this._buyBtn.visible = false;
            this._bottomTipTxt.text = LanguageManager.getlocal("acWishTreeTip3");
            this._bottomTipTxt.x = GameConfig.stageWidth/2 - this._bottomTipTxt.width/2;
            this._bottomTipTxt.y = this._buyBtn.y + 30;
        }

        let vo:AcWishTreeVo = <AcWishTreeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
        if (vo.isShowRedDot )
        {
            App.CommonUtil.addIconToBDOC(this._exchangeBtn);
        }else{
            App.CommonUtil.removeIconFromBDOC(this._exchangeBtn);
        }
        if(this._cdNum == -2)
        {
            let param:string[]=[];
            if(vo.getDiscount() == 0)
            {
                Api.rechargeVoApi.formatThHwMoneyInfo(param,cfg.cost1);
                this._buyBtn.setText(LanguageManager.getlocal("acWishTreeBtnTxt1",param),false);
            }else{
                Api.rechargeVoApi.formatThHwMoneyInfo(param,cfg.cost2);
                this._buyBtn.setText(LanguageManager.getlocal("acWishTreeBtnTxt2",param),false);
            }
        }
    }

    protected buyHandler()
    {
        if(this._cdNum > 0)
        {
            return;
        }
        let cfg  = <Config.AcCfg.WishTreeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid,this.code);
        let vo:AcWishTreeVo = <AcWishTreeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
        if(!vo.isStart)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return
        }
        let numL = cfg.getLastWishTimes();
        let itemNum = Api.itemVoApi.getItemNumInfoVoById("2102");
        if(itemNum >= numL)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("acWishTreebuytip2"));
            return;
        }

        if (GameData.idcardSwitch==true && GameData.idcardNormal==1 && Api.gameinfoVoApi.getRealnameRewards()==null)
		{	
			ViewController.getInstance().openView(ViewConst.POPUP.REALNAMEREWARDSPOPUPVIEW);
            return;
		}

        this._cdNum = 15;
        if(vo.getDiscount() == 0)
        {
            PlatformManager.checkPay(cfg.cost1);
        }else{
            PlatformManager.checkPay(cfg.cost2);
        }
    }

    protected exchangeBtnHandler()
    {
         let vo:AcWishTreeVo = <AcWishTreeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
        if(!vo.isStart)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return
        }
        ViewController.getInstance().openView(ViewConst.COMMON.ACWISHTREEEXCHANGEVIEW,{aid:this.aid,code:this.code});
    }
     protected exchangeHandler(event:egret.Event)
    {
        let rdata = event.data.data
        if(rdata.ret != 0)
        {
            return;
        }
        this.refreshUI();
    }
    private showEffect():void
	{
		let time1 = App.MathUtil.getRandom(10000, 20000) ;
		let time2 = App.MathUtil.getRandom(0, 1500) ;

        let taohuaParticle = App.ParticleUtil.getParticle("taohua");
        taohuaParticle.x = 0;
        taohuaParticle.y = this.height - 700;
        taohuaParticle.rotation = -66;
        taohuaParticle.start();	
        // this._effectLayer.addChild(taohuaParticle);
        this._nodeContainer.addChild(taohuaParticle);
        egret.Tween.get( taohuaParticle)
        .call(function(){
            taohuaParticle.start();
        },this)
	}
    protected receivePushData(event:egret.Event):void
	{
		let data:{ret:boolean,data:any}=event.data;
		if(data.data.ret == 0 && data.data.cmd==NetPushConst.PUSH_PAY)
		{
            this.refreshUI();
            let rewardStr = "6_2102_1";
            let rewObj = GameData.formatRewardItem(rewardStr);
            App.CommonUtil.playRewardFlyAction(rewObj);
			if(data.data.data.payment)
			{
				let itemid=data.data.data.payment.itemId;
				PlatformManager.analyticsPay(itemid,data.data.data.payment.orderId);
			}
		}
	}
    public tick(): boolean 
    {
        if(this._cdNum >=0)
        {
            let text =  App.DateUtil.getFormatBySecond(this._cdNum,3);
            this._buyBtn.setText(text,false);
            this._cdNum -- ;
            return true;
        }else{
            if(this._cdNum == -1)
            {
                this._cdNum = -2;
                let vo:AcWishTreeVo = <AcWishTreeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
                let param:string[]=[];
                let cfg  = <Config.AcCfg.WishTreeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid,this.code);
                if(vo.getDiscount() == 0)
                {
                    Api.rechargeVoApi.formatThHwMoneyInfo(param,cfg.cost1);
                    this._buyBtn.setText(LanguageManager.getlocal("acWishTreeBtnTxt1",param),false);
                }else{
                    Api.rechargeVoApi.formatThHwMoneyInfo(param,cfg.cost2);
                    this._buyBtn.setText(LanguageManager.getlocal("acWishTreeBtnTxt2",param),false);
                }
            }
        }
        return false;
    }

    protected getTitleStr():string
	{
		// return "ac"+App.StringUtil.firstCharToUper(this.acVo.aidAndCode)+"_Title";
        return "acWishTree-1_Title"
	}
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "wishtree_bg",
            "wishtree_btn_down",
            "wishtree_btn1",
            "wishtree_headmask",
            "wishtree_listbg",
            "wishtree_word",
            "wifeskin_barbg",
            "forpeople_top",
            "wishtree_get",
            "wishtree_mask",
            "taohua","taohua_json",
            "wifeview_skingetbg",
		]);
	}

    public dispose():void
	{
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.receivePushData,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_EXCHANGEWIFE),this.exchangeHandler,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WISHTRER_NEXTDAY,this.refreshUI,this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.refreshUI,this);

        this._nodeContainer = null;
        this._lastTimeTxt = null;
        this._cdNum = -2;

		super.dispose();
	}

}