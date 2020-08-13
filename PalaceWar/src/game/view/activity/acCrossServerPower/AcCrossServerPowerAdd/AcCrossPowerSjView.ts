/**
 * 跨服权势--权势赏金
 * @author weixiaozhe  2020.7.27
 */
class AcCrossPowerSjView extends AcCommonView 
{
    private _topTxtBg:BaseBitmap=null;
    public _scrollList:ScrollList = null;
    private _lockGroup:BaseDisplayObjectContainer = null;
    private _buyBtn:BaseButton = null;
    private _isBuy:boolean = false;
    private _tip1:BaseTextField = null;
    private _tip2:BaseTextField = null;

    protected initBg(): void 
    {
        this.viewBg = BaseBitmap.create(this.getBgName());
        this.addChild(this.viewBg);
        this.viewBg.width = GameConfig.stageWidth;
        this.viewBg.height = this.getStageHeight();

        let titleImg = BaseBitmap.create("crosspower_sjtitle");
        this.addChild(titleImg);

        let topTxtBg = BaseBitmap.create("crosspower_sjinfo");
        topTxtBg.x = GameConfig.stageWidth / 2 - topTxtBg.width / 2;
        topTxtBg.y = 85;
        this.addChild(topTxtBg);
        this._topTxtBg = topTxtBg;
    }  
	protected getBgName():string
	{
		return "public_9_bg84";
	}
    protected getTitleStr(): string {
        return null;
    }
    protected getTitleBgName(): string {
        return null;
    }  

    private getRwdCallback(event:egret.Event):void
    {
        let rData = event.data.data.data;
        if(!rData)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if(rData.rewards)
        {
            let rewardVoList = GameData.formatRewardItem(rData.rewards);
            App.CommonUtil.playRewardFlyAction(rewardVoList);
        }
        this.refreshView();
    }
	// protected getRequestData():{requestType:string,requestData:any}
	// {
	// 	if(this.vo && this.vo.aidAndCode)
	// 	{
	// 		return {requestType:NetRequestConst.REQUEST_AGGREGATION_GETINFO,requestData:{activeId:this.vo.aidAndCode}};
	// 	}
	// }    

	protected getBigFrame():string
	{	
		return "commonview_bigframe";
	}    
    
    public initView() 
    {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_GETGOLDREWARD, this.getRwdCallback, this);      

        //活动规则文本
        let descTxt  = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerPowerSjInfo"), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt.width = 500;
        descTxt.lineSpacing = 3;
        descTxt.x = this._topTxtBg.x+100;
        descTxt.y = this._topTxtBg.y+25;
        this.addChild(descTxt);

        let process = this.vo.getSjProcess();

        let powerTxt  = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerPowerSjPowerTxt",[""+process]), 20, TextFieldConst.COLOR_WHITE);
        powerTxt.width = 480;
        powerTxt.textAlign = egret.HorizontalAlign.CENTER;
        powerTxt.x = this._topTxtBg.x+150;
        powerTxt.y = this._topTxtBg.y+this._topTxtBg.height-powerTxt.height-6;
        this.addChild(powerTxt);        

        let btnComm = ComponentManager.getButton("crosspower_sjbtn1", null, ()=>
        {

        },this,null);
        btnComm.x = this._topTxtBg.x+10;
        btnComm.y = this._topTxtBg.y+this._topTxtBg.height+10;
        this.addChild(btnComm);

        let btnUp = ComponentManager.getButton("crosspower_sjbtn2", null, ()=>
        {

        },this,null);
        btnUp.x = GameConfig.stageWidth-btnUp.width-10;
        btnUp.y = btnComm.y;
        this.addChild(btnUp);        

        let botbg = BaseBitmap.create("arena_bottom");
        botbg.height = 90;
        botbg.x = GameConfig.stageWidth/2 - botbg.width/2;
        botbg.y = GameConfig.stageHeigth - botbg.height;
        this.addChild(botbg);

        //奖励预览
        let preBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acCrossServerPowerSjBtn1", ()=>
        {
            ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSPOWERPREREWARDPOPUPVIEW,{
                aid : this.param.data.aid,
                code : this.param.data.code
            });
        }, this,null,);
        this.setLayoutPosition(LayoutConst.lefttop,preBtn,botbg,[80,15]);
        this.addChild(preBtn);

        //高级赏金
        let buyBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", ()=>
        {
            if ((!this.vo.isStart) || this.vo.checkIsInEndShowTime())
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            } 
            App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
            PlatformManager.checkPay(this.cfg.recharge);
        }, this,null,);
        this.setLayoutPosition(LayoutConst.righttop,buyBtn,botbg,[80,15]);
        this.addChild(buyBtn);
        this._buyBtn = buyBtn;

        let tipTxt1  = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerPowerSjBtn2"), 20, TextFieldConst.COLOR_BROWN);
        tipTxt1.setPosition(buyBtn.width/2-tipTxt1.width/2+5,10);
        buyBtn.addChild(tipTxt1);

        let tipTxt2  = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);

        let rechargeCfg = Config.RechargeCfg.getRechargeItemCfgByKey(this.cfg.recharge);
		let twStr = PlatformManager.getMoneySign();
		tipTxt2.text = `${twStr + rechargeCfg.cost}`;
		if(PlatformManager.checkIsEnLang())
		{
            tipTxt2.text = `${twStr + rechargeCfg.cost}`;
		}
        if(PlatformManager.checkisLocalPrice()&&rechargeCfg.platFullPrice)
        {
            tipTxt2.text = rechargeCfg.platFullPrice;
        }
        tipTxt2.x = tipTxt1.x+tipTxt1.width/2-tipTxt2.width/2;
        tipTxt2.y = tipTxt1.y+tipTxt1.height;
        buyBtn.addChild(tipTxt2);   

        this._tip1 = tipTxt1;
        this._tip2 = tipTxt2;

        if(this.vo.isBuySj())
        {
            buyBtn.setText("acCrossServerPowerSjBuyBtnTxt");
            buyBtn.setEnable(false);

            this._tip1.visible = false;
            this._tip2.visible = false;
        }

        let lockGroup = new BaseDisplayObjectContainer();
        this._lockGroup = lockGroup;
        let lock = BaseBitmap.create("crosspower_toplock");
        lock.width = lock.height = buyBtn.height;
        lockGroup.addChild(lock);

        let shareEffect = ComponentManager.getCustomMovieClip("fenxiang_",15,1000/15);
        shareEffect.setScale(1.2);
        shareEffect.setPosition(lock.x + lock.width/2 - 59*shareEffect.scaleX/2, lock.y + lock.height/2 - 60*shareEffect.scaleY/2 - 2);
        shareEffect.playWithTime(0);
        lockGroup.addChild(shareEffect);

        lockGroup.setPosition(buyBtn.x-25,buyBtn.y);
        this.addChild(lockGroup);

        lockGroup.visible = !this.vo.isBuySj();

        let h = botbg.y - btnComm.y - btnComm.height;
        let rect =  new egret.Rectangle(0, 0, 624, h);
        let arr = this.cfg.getSjList()

        let showlist = [];
        let len = arr.length;
        for(let i = 0; i < len; i++)
        {
            let obj = arr[i];
            obj["isfirst"] = i == 0;
            obj["islast"] = i == len-1;
            showlist.push(obj);
        }

        let scrollList = ComponentManager.getScrollList(AcCrossPowerSjItem,showlist,rect,{aid:this.vo.aid, code:this.vo.code});
        scrollList.setPosition((GameConfig.stageWidth-rect.width)/2, btnComm.y + btnComm.height);
        this.addChild(scrollList);
        this._scrollList = scrollList;

        this._isBuy = this.vo.isBuySj();

		this.setBigFameY(this._topTxtBg.y+this._topTxtBg.height);
        this.setBigFameHeight(botbg.y - this._topTxtBg.y - this._topTxtBg.height+20)        
    }

    private useCallback(event:egret.Event=null):void
    {
        this.refreshView();
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
    }

    protected getResourceList(): string[] {
        let baseList = [
            "arena_bottom",
        ];
        let codeList = null;
        if (this.code == "1") {
            codeList = [
            ]
        }
        return super.getResourceList().concat(baseList).concat(codeList);
    }

    private refreshView():void
    {
        if (!this.vo)
        {
            return;
        }
        if(!this._isBuy && this.vo.isBuySj())
        {
            this._isBuy = this.vo.isBuySj();
            App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerPowerSjBuyTips"));          
        }

        if(this.vo.isBuySj())
        {
            this._buyBtn.setText("acCrossServerPowerSjBuyBtnTxt");
            this._buyBtn.setEnable(false);
            this._lockGroup.visible = false;

            this._tip1.visible = false;
            this._tip2.visible = false;            
        }

        let arr = this.cfg.getSjList()
        this._scrollList.refreshData(arr, {aid:this.vo.aid, code:this.vo.code});  
    }

    private tick() 
    {
        // if(this.vo.checkIsAtEndShowTime())
        // {
        //     this.request(NetRequestConst.REQUEST_AGGREGATION_GETINFO, {activeId:this.vo.aidAndCode});
        // }
    }
	private get cfg() : Config.AcCfg.CrossServerPowerCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcCrossServerPowerVo{
        return <AcCrossServerPowerVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

    protected getDefaultCn(cnName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(LanguageManager.checkHasKey(cnName+"-"+this.code)){
            return cnName + "-" + this.code;
        } else {
            return cnName + "-" + defaultCode;
        }
    }     
     
    public dispose(): void {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);   
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_GETGOLDREWARD, this.getRwdCallback, this);  
        this._lockGroup = null;
        this._topTxtBg = null;
        this._isBuy = false;
        this._tip1 = null;
        this._tip2 = null;
        super.dispose();
    }
}