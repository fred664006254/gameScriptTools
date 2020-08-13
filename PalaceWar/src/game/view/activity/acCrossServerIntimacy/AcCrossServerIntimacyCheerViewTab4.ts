//人气商店
class AcCrossServerIntimacyCheerViewTab4 extends CommonViewTab
{
	private _scrollList:ScrollList = null;
    private _scoreNum:BaseTextField = null;
    private _timeDown:BaseTextField = null;
    private _info1:BaseTextField = null;
    private _info2:BaseTextField = null;
    private _scoreNum1:BaseTextField = null;
    private _scoreIcon1:BaseBitmap = null;
    private _scoreIcon2:BaseBitmap = null;
    private _index:number = -1;

	public constructor(data) 
	{
		super();
		this.param = data;
		this.initView();
    }
    
    protected getUiCode():string{
        let code = "";
        switch(Number(this.code)){
            default:
                code = `7`;
                break;
        }
        return code;        
    }
	
    private get aid():string{
        return this.param.data.aid;
    }

    private get code():string{
        return this.param.data.code;
    }

    private get vo() : AcCrossServerIntimacyVo{
        return <AcCrossServerIntimacyVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }	
	private get cfg() : Config.AcCfg.CrossServerIntimacyCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

	protected initView():void
	{
        let baseView = <AcCrossServerIntimacyCheerView>ViewController.getInstance().getView("AcCrossServerIntimacyCheerView");
        this.height = baseView.tabHeight;
        this.width = GameConfig.stageWidth;

		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_SHOPBUY,this.refreshData,this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_SHOP2EXCHANGE,this.refreshData,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);

        this.initTabbarGroup();

        let moveY = 70;

        let code = this.getUiCode();
        let infoBg = BaseBitmap.create(App.CommonUtil.getResByCode(`accrosspower_juanzhou`, code));
		this.addChild(infoBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, infoBg, this, [0,5+moveY], true);
        
        //积分
        let scoreNumBg = BaseBitmap.create("public_9_resbg");
        this.addChild(scoreNumBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scoreNumBg, infoBg, [0, 15]);
        let scoreIcon = BaseBitmap.create(App.CommonUtil.getResByCode("accrosspower_flagicon", this.getUiCode()));
        scoreIcon.setScale(1);
        this.addChild(scoreIcon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, scoreIcon, scoreNumBg, [-3, 0]);
        this._scoreIcon2 = scoreIcon;
        
        let scoreNum = ComponentManager.getTextField(""+this.vo.getFlagScore(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreNum.x = scoreNumBg.x + 55;
        scoreNum.y = scoreNumBg.y + scoreNumBg.height/2 - scoreNum.height/2 + 3;
        this.addChild(scoreNum);
        this._scoreNum = scoreNum;

        let needId = this.cfg.change.needNum.split("_")[1];
        let have = Api.itemVoApi.getItemNumInfoVoById(needId);
        let scoreIcon1 = BaseLoadBitmap.create("itemicon"+needId);
        scoreIcon1.setScale(0.5);
        this.addChild(scoreIcon1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, scoreIcon1, scoreNumBg, [-3, -3]); 
        this._scoreIcon1 = scoreIcon1;   

        let scoreNum1 = ComponentManager.getTextField(""+have, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreNum1.x = scoreNumBg.x + 55;
        scoreNum1.y = scoreNumBg.y + scoreNumBg.height/2 - scoreNum1.height/2 + 3;
        this.addChild(scoreNum1);
        this._scoreNum1 = scoreNum1;         
		
        //描述
        let infoStr = "acCrossserverPowerCheerScoreShopInfo1";
        if (this.vo.checkIsInEndShowTime()){
            infoStr = "acCrossserverPowerCheerScoreShopInfo2";
        }
        let info = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(infoStr, this.getUiCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        info.textAlign = TextFieldConst.ALIGH_CENTER;
        if (!this.vo.checkIsInEndShowTime()){
            info.textAlign = TextFieldConst.ALIGH_LEFT;
        }
        info.width = infoBg.width - 56;
        info.lineSpacing = 5;
        info.anchorOffsetX = info.width/2;
        info.x = infoBg.x + infoBg.width/2;
        info.y = scoreNumBg.y + scoreNumBg.height + 10;
        this.addChild(info);
        this._info2 = info;

        this._info1 = ComponentManager.getTextField(LanguageManager.getlocal("croessServerImacyExchangeTxt"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        if(this._info1.numLines > 1)
        {
            this._info1.textAlign = TextFieldConst.ALIGH_LEFT;
        }else
        {
            this._info1.textAlign = TextFieldConst.ALIGH_CENTER;
        }
        this._info1.setPosition(GameConfig.stageWidth/2-this._info1.width/2,info.y);
        this.addChild(this._info1);

        if (this.vo.checkIsInEndShowTime()){
            let timeDown = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerCheerScoreShopTimeDown", this.getUiCode()), [""+this.vo.getEndTimeDown()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
            timeDown.anchorOffsetX = timeDown.width/2;
            timeDown.x = infoBg.x + infoBg.width/2;
            timeDown.y = info.y + info.height + 10;
            this.addChild(timeDown);
            this._timeDown = timeDown;
            TickManager.addTick(this.tick, this);
        }

		let tmpRect =  new egret.Rectangle(0, 0, 612, this.height - infoBg.y - infoBg.height - 10);
        let scrollList = ComponentManager.getScrollList(AcCrossServerIntimacyCheerViewScrollItem4, [], tmpRect, {aid:this.aid, code:this.code});
		scrollList.x = GameConfig.stageWidth/2 - scrollList.width/2;
		scrollList.y = infoBg.y + infoBg.height + 5;
		this.addChild(scrollList);
        this._scrollList = scrollList;

        this.tabbarHandler(0);
        this.checkRed();
    }

    public tick():void{
        if (this._timeDown){
            this._timeDown.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerCheerScoreShopTimeDown", this.getUiCode()), [""+this.vo.getEndTimeDown()]);
            this._timeDown.anchorOffsetX = this._timeDown.width/2;
        }
        if(this.vo.checkIsAtEndShowTime())
        {
            this.freshList();
        }
    }
    
	public refreshData(event:egret.Event):void{
		if(event){
			if(event.data && event.data.ret){
				let data = event.data.data.data;
				let rewards = data.rewards;
				let rList = GameData.formatRewardItem(rewards);
                App.CommonUtil.playRewardFlyAction(rList);
			}
		}
        this.checkRed();
    }
    private checkRed():void
    {
        if(this.vo.checkShopRedDot())
        {
            this.tabbarGroup.addRedPoint(1);
        }else
        {
            this.tabbarGroup.removeRedPoint(1);
        }
    }    
    public refreshView():void
    {
        this.freshList();
        this._scoreNum.text = ""+this.vo.getFlagScore();

        let needId = this.cfg.change.needNum.split("_")[1];
        let have = Api.itemVoApi.getItemNumInfoVoById(needId);
        this._scoreNum1.text = ""+have;
    }

	public formatFlagScoreShopCfg():any[]{
		let data = this.cfg.getShopList();
		let list:any[] = [];
		for (let i=0; i < data.length; i++){
			let itemArr = GameData.formatRewardItem(data[i].sell);
			if (itemArr.length > 0){
				list.push(data[i]);
			}
		}
		return list;
	}
	public formatFlagScoreShop2Cfg():any[]{
		let data = this.cfg.getShop2List();
		let list:any[] = [];
		for (let i=0; i < data.length; i++){
			let itemArr = GameData.formatRewardItem(data[i].sell);
			if (itemArr.length > 0){
				list.push(data[i]);
			}
		}
		return list;
	}     
	protected getTabbarTextArr():Array<string>
	{
		return ["croessServerImacyTab1","croessServerImacyTab2"];
	}    
	protected initTabbarGroup():void
	{	
		let tabBarTextArr:string[]=this.getTabbarTextArr();
		if(tabBarTextArr&&tabBarTextArr.length>0)
		{	
			let tabbg = BaseBitmap.create("commonview_tabbar_bg");
			tabbg.x = 10;
			tabbg.y = 10;
			this.addChild(tabbg);

			this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(),tabBarTextArr,this.clickTabbarHandler,this);
			this.tabbarGroup.setSpace(0);
			this.addChild(this.tabbarGroup);
			this.setTabBarPosition();
			this.tabbarGroup.selectedIndex=this._selectedTabIndex;
			this.tabbarGroup.y=0;
			this.tabbarGroup.x=(this.width - this.tabbarGroup.width)/2;
			this.tabbarGroup.setColor(0xe1ba86,0x472c26);
			this.tabbarGroup.addZshi();
		}
	}
	protected clickTabbarHandler(data:any):void
	{
		super.clickTabbarHandler(data);
        let index = Number(data.index);
        this.tabbarHandler(index);
	}    
    private tabbarHandler(index:number):void
    {
        if(this._index == index)
        {
            return;
        }
        this._index = index;        
        if(index == 0)
        {
            this._info1.visible = true;
            this._info2.visible = false;
            this._scoreIcon1.visible = true;
            this._scoreIcon2.visible = false;
            this._scoreNum1.visible = true;
            this._scoreNum.visible = false;

            this.freshList();
        }else
        {
            this._info1.visible = false;
            this._info2.visible = true;  
            this._scoreIcon1.visible = false;
            this._scoreIcon2.visible = true;
            this._scoreNum1.visible = false;
            this._scoreNum.visible = true;      

            this.freshList();
        }
    }
    private freshList():void
    {
        if(this._index == 0)
        {
            let shopList = this.formatFlagScoreShop2Cfg();
            this._scrollList.refreshData(shopList, {aid:this.aid,code:this.code});
        }else
        {
            let shopList = this.formatFlagScoreShopCfg();
            this._scrollList.refreshData(shopList, {aid:this.aid,code:this.code});            
        }
    }    
	protected addTabbarGroupBg():boolean{
		return true;
	}    
	protected getTabbarName():string|string[]
	{
		return ButtonConst.BTN_BIG_TAB2;
	}    
	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_SHOPBUY,this.refreshData,this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_SHOP2EXCHANGE,this.refreshData,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        TickManager.removeTick(this.tick, this);
		this._scrollList = null;
        this._scoreNum = null;
        this._timeDown = null;
        this._scoreNum1 = null;
        this._scoreIcon1 = null;
        this._scoreIcon2 = null;
        this._info1 = null;
        this._info2 = null;

		super.dispose();
	}
}