/**
 * 称帝战商城
 * author qianjun
 */
class EmperorWarShopView extends CommonView{

    private gemTF:BaseTextField = null;
    
    public constructor(){
        super();
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"empshopbg","empshop_tag","empshopscenebg","empshopman","empshopscenebg"
		]);
    }

    private get api(){
        return Api.emperorwarVoApi;
    }

    private get cfg(){
        return Config.EmperorwarCfg;
    }

    protected getBgName():string{
        return "empshopscenebg";
    }
    
    protected initView():void{
        let view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.useCallback,this);
        let temW = 38;
        let gemIcon = BaseBitmap.create("public_icon1");
		gemIcon.scaleX = temW/gemIcon.width;
		gemIcon.scaleY = temW/gemIcon.height;
		gemIcon.x = PlatformManager.hasSpcialCloseBtn()?430:5;
		gemIcon.y = PlatformManager.hasSpcialCloseBtn()?320:44;
		this.addChild(gemIcon);

		this.gemTF = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this.gemTF.x = gemIcon.x + temW + 5;
		this.gemTF.y = gemIcon.y + 9;
		this.addChild(this.gemTF);

		let goToRechargeBtn:BaseButton = ComponentManager.getButton("mainui_btn1","",this.goToRechargeHandler,this);
		// goToRechargeBtn.scaleX = temW/goToRechargeBtn.width;
		// goToRechargeBtn.scaleY = temW/goToRechargeBtn.height;
		goToRechargeBtn.setScale(0.85);
		goToRechargeBtn.x = gemIcon.x + 118;
		goToRechargeBtn.y = gemIcon.y + 4;
        this.addChild(goToRechargeBtn);
        
        let topbg = BaseBitmap.create("public_9_bg25");
        topbg.width = 387;
        topbg.height = 84;
        view.setLayoutPosition(LayoutConst.righttop, topbg, view, [20,view.titleBg.height + 10]);
        view.addChild(topbg);

        let topTxt = ComponentManager.getTextField(LanguageManager.getlocal('emperorWarShopViewDesc'), 22, TextFieldConst.COLOR_BLACK);
        topTxt.width = 347;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, topTxt, topbg);
        view.addChild(topTxt);

        let listbg = BaseBitmap.create("empshopbg");
        listbg.width = 405;
        listbg.height = GameConfig.stageHeigth - topbg.y - topbg.height - 60;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, topbg, [0,topbg.height + 10]);
        view.addChild(listbg);
        //
        let man = BaseBitmap.create("empshopman");
        view.setLayoutPosition(LayoutConst.lefttop, man, view, [-10,120]);
        view.addChild(man);
        //商品列表 
        let arr = [];
        let shopData = view.cfg.shop;
        for(let i in shopData){
			let unit = shopData[i];
			arr.push(unit);
		}
        let scrollList  = ComponentManager.getScrollList(EmperorWarShopScrollItem, arr, new egret.Rectangle(listbg.x, listbg.y, listbg.width - 63, listbg.height - 50));
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scrollList, listbg, [0,10]);
        view.addChild(scrollList);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_BM),this.bmCallBack,this);
    }

    private goToRechargeHandler():void
	{
		// App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
		ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    }
    
    private useCallback():void
	{
		this.gemTF.text = Api.playerVoApi.getPlayerGem().toString();
	}

    // 背景图名称
	// protected getBgName():string{
	// 	return "empbmcbg";
    // }

    public dispose():void{
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.useCallback,this);
        super.dispose();
    }
}