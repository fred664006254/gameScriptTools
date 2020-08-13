/*
desc : 黑市
*/
class AcBlackMarketView extends AcCommonView{
    public constructor(){
        super();
    } 

    private _list : ScrollList = null;
    private gemTF:BaseTextField = null;
    private _cfg =null;
    private _vo =null;  
    private _acCDTxt:BaseTextField = null; 
    public initView()
    {    
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_BLACKMARKET_REFRESH,this.refreshList,this);

        let topBg:BaseBitmap = BaseLoadBitmap.create("blackmarket_titlebg");
        topBg.width = 640;
        topBg.height = 245;
        topBg.y = -13;
		this.addChildToContainer(topBg);

        // this.aid = this.param.data.aid;
		// this.code =this.param.data.code;

        let cfg =  <Config.AcCfg.BlackMarketCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        this._cfg =cfg;
        let vo=  <AcBlackMarketVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        this._vo =vo;

        let actimeTF = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxTime",[vo.acTimeAndHour]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		actimeTF.width = 365;
		actimeTF.setPosition(250,130);
		this.addChildToContainer(actimeTF);

		let acDesc = ComponentManager.getTextField(LanguageManager.getlocal("acBlackDesc" ),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		acDesc.setPosition(actimeTF.x,actimeTF.y + actimeTF.height+5);
		acDesc.width = 365;
		this.addChildToContainer(acDesc);

        let acCDTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
        acCDTxt.x = acDesc.x; 
		acCDTxt.y = acDesc.y + acDesc.height+5; 
		this.addChildToContainer(acCDTxt);
		this._acCDTxt = acCDTxt; 
        this.tick();

        let view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQYEST_ACTIVITY_BLACKMARKET), view.buyShopCallback, view);
        view.width = GameConfig.stageWidth;
        let bg1:BaseBitmap = BaseBitmap.create("public_9_bg22"); 
		bg1.width = GameConfig.stageWidth;
		bg1.height = GameConfig.stageHeigth - 111 - view.titleBg.y - view.titleBg.height-topBg.height+30;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg1, view.titleBg, [0,view.titleBg.height+topBg.height]);
        view.addChild(bg1);

        let rect:egret.Rectangle=egret.Rectangle.create();
        rect.setTo(0,0,630,bg1.height-35);
        
        let arr = this._cfg.getBlackMarketArr();
		let scrollList=ComponentManager.getScrollList(BlackBuildItem, arr, rect, view.code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, bg1, [0,10]);
        view.addChild(scrollList);
        view._list = scrollList; 
        view.initBottom();
    } 

    //创建底部通用切换按钮，由 initBottom，bottomBtnHandler 两个接口一起完成
    private initBottom()
    {
        let bottombg = BaseBitmap.create("wifeskin_barbg"); 
        bottombg.x = GameConfig.stageWidth/2 - bottombg.width/2;
        bottombg.y = GameConfig.stageHeigth - bottombg.height+30;
        this.addChild(bottombg);

        let servantNumBg = BaseBitmap.create("servant_topresbg");
        servantNumBg.width = 200
        servantNumBg.x =  bottombg.width/2-servantNumBg.width/2;;
		servantNumBg.y = bottombg.y+bottombg.height/2-servantNumBg.height/2-15;
		this.addChild(servantNumBg);
         //金币显示
        let temW = 38;
        let gemIcon = BaseBitmap.create("public_icon1");
		gemIcon.scaleX = temW/gemIcon.width;
		gemIcon.scaleY = temW/gemIcon.height;
		gemIcon.x = servantNumBg.x;//servantNumBg.width/2-gemIcon.width/2;
		gemIcon.y = bottombg.y+bottombg.height/2-gemIcon.height/2+3-15;
		this.addChild(gemIcon);

		this.gemTF = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(),TextFieldConst.FONTSIZE_TITLE_SMALL);
		this.gemTF.x = gemIcon.x + temW + 5;
		this.gemTF.y = gemIcon.y+8;
        servantNumBg.width =this.gemTF.width+60;
        this.addChild(this.gemTF); 

        servantNumBg.x =  bottombg.width/2-servantNumBg.width/2;
        gemIcon.x = servantNumBg.x;
        this.gemTF.x = gemIcon.x + temW + 5;
	
    }

    private buyShopCallback(evt : egret.Event):void{
        let view = this;
        let data = evt.data.data.data;
        if(!data){
            App.CommonUtil.showTip(LanguageManager.getlocal("playerIdError"));
            return;
        }
        let rewards = data.rewards;
        let idx = 0;
        for(let i in view._cfg.blackMarketListCfg){
            let unit = view._cfg.blackMarketListCfg[i];
            if(unit.item === rewards){
                idx = Number(i);
                break;
            }
        }
        let item : any = view._list.getItemByIndex(idx);
        item.refreshItem();
        let rewardList =  GameData.formatRewardItem(rewards); 
        App.CommonUtil.playRewardFlyAction(rewardList); 
        this.gemTF.text  =Api.playerVoApi.getPlayerGem().toString();
    } 

    public tick(): void 
    {
		let deltaT = this._vo.getAcResidueTime();
		if (this._acCDTxt) 
        {   
            if (deltaT > 0)
            {
                this._acCDTxt.text = LanguageManager.getlocal("acAlliance_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
            } 
            else 
            {
                this._acCDTxt.text = LanguageManager.getlocal("acAlliance_acCD", [LanguageManager.getlocal("acAlliance_acCDEnd")]);
            }
        }
	}

    private refreshList():void
    {    
        let arr = this._cfg.getBlackMarketArr();
        this._list.refreshData(arr,this.code);   
    }
    protected getRuleInfo():string{
		return "blackMarketRuleInfo"
    }  
    protected getResourceList():string[]{
		return super.getResourceList().concat([
            "shopview_line","acsingledayitembg","shopview_corner","wifeskin_barbg",
            "servant_topresbg"
        ]);
    }  
    protected getRuleInfoParam():string[]
	{	  
        var zoneStr:number = 0;
		zoneStr = App.DateUtil.formatSvrHourByLocalTimeZone(0).hour; 
		return [zoneStr+""]  
	}
    
    public dispose():void{   
        let view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQYEST_ACTIVITY_BLACKMARKET), view.buyShopCallback, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_BLACKMARKET_REFRESH,this.refreshList,this);

        this.gemTF =null;
        this._acCDTxt = null;

        super.dispose();
    }
}
