/**
 * 新服庆典
 * author ycg
 * date 2020.6.29
 * @class AcNewappointView
 */
class AcNewappointView extends AcCommonView{
    private _topBg:BaseBitmap = null;
    private _timeTxt:BaseTextField = null;

    public constructor(){
        super();
    }

    protected getBgName():string{
        return null;
    }

    protected getTitleBgName():string{
        return null;
    }

    protected getTitleStr():string{
        return null;
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected isShowOpenAni():boolean{
        return false;
    }

    protected getCloseBtnName():string{
        return null;
    }

    private getTypeCode():string{
        return this.code;
    }

    private get cfg():Config.AcCfg.NewappointCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo():AcNewappointVo{
        return <AcNewappointVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);

        let bg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_bg", this.getTypeCode()));
        bg.height = 782;
        this.addChildToContainer(bg);
        bg.setPosition(GameConfig.stageWidth/2 - bg.width/2, GameConfig.stageHeigth/2 - bg.height/2);

        let titleBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_titlebg", this.getTypeCode()));
        this.addChildToContainer(titleBg);
        titleBg.setPosition(bg.x + bg.width/2 - titleBg.width/2, bg.y - titleBg.height + 45);

        let closeBtn = ComponentManager.getButton(ButtonConst.POPUP_CLOSE_BTN_2, "", this.hide, this);
        closeBtn.x = bg.x + bg.width - closeBtn.width;
        closeBtn.y = bg.y - closeBtn.height/2 + 10;
        this.addChildToContainer(closeBtn);

        let hudieClip = ComponentManager.getCustomMovieClip("popupviewhudie", 10);
        hudieClip.x = closeBtn.x-45;
        hudieClip.y = closeBtn.y-45;
        hudieClip.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(hudieClip);
        hudieClip.playWithTime();

        let topBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_topbg", this.getTypeCode()));
        topBg.setPosition(bg.x + bg.width/2 - topBg.width/2, bg.y + 43);
        this.addChildToContainer(topBg);
        this._topBg = topBg;

        // let server = Api.mergeServerVoApi.getAfterMergeSeverName();
        // let serverInfo = ComponentManager.getTextField(""+server, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
        // serverInfo.setPosition(topBg.x + 262 + 82/2 - serverInfo.width/2, topBg.y + 45 + 36/2 - serverInfo.height/2);
        // this.addChildToContainer(serverInfo);

        //倒计时
        // this._timeBg = BaseBitmap.create("public_9_bg61");
		// this._timeBg.y = topBg.y + topBg.height - 15 - this._timeBg.height / 2;
		// this.addChildToContainer(this._timeBg);
		this._timeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_GREEN);
		// this._timeBg.width = 40 + this._timeTxt.width;
		// this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 50;
        // this._timeTxt.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTxt.height / 2);
        this._timeTxt.setPosition(topBg.x + topBg.width - this._timeTxt.width - 15, topBg.y + 130);
        this.addChildToContainer(this._timeTxt);

        //tabbar
        let tabbarName = [App.CommonUtil.getCnByCode("acNewappointTab1", this.getTypeCode()), App.CommonUtil.getCnByCode("acNewappointTab2", this.getTypeCode())];
        let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN2_TAB, tabbarName, this.clickTabbarHandler, this);
        tabbarGroup.setSpace(0);
        tabbarGroup.setPosition(bg.x + 65, topBg.y + topBg.height - 13);
        this.addChild(tabbarGroup);
        this.tabbarGroup = tabbarGroup;   
        this.changeTab();

        this.refreshView();
    }

    private refreshView():void{
        if (this.vo.checkGiftRed()){
            this.tabbarGroup.addRedPoint(0);
        }
        else{
            this.tabbarGroup.removeRedPoint(0);
        }

        if (this.vo.checkExchangeRed()){
            this.tabbarGroup.addRedPoint(1);
        }
        else{
            this.tabbarGroup.removeRedPoint(1);
        }
    }

    public tick():void{
        this._timeTxt.text = LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]);
		// this._timeBg.width = 40 + this._timeTxt.width;
		// this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 50;
		this._timeTxt.x = this._topBg.x + this._topBg.width - 15 - this._timeTxt.width;
    }

    protected getTabbarGroupY():number{
        let offY = this.tabbarGroup.y + this.tabbarGroup.height - 2;
        return offY;
    }

    public getResourceList():string[]{
        let list:string[] = [];

        return super.getResourceList().concat([
            "collectflag", "acnewappoint_collect", "acnewappoint_line",
            "acnewappoint_bg-1", "acnewappoint_gift1-1", "acnewappoint_gift2-1", "acnewappoint_gift3-1", "acnewappoint_giftbottombg-1",  "acnewappoint_giftitembg1-1", "acnewappoint_giftitembg2-1", "acnewappoint_titlebg-1", "acnewappoint_topbg-1", "acnewappoint_scoreitemicon-1", "acnewappoint_toptxtbg-1", "acnewappoint_giftinfobg-1",
            "acnewappoint_bg-"+this.getTypeCode(), "acnewappoint_gift1-"+this.getTypeCode(), "acnewappoint_gift2-"+this.getTypeCode(), "acnewappoint_gift3-"+this.getTypeCode(), "acnewappoint_giftbottombg-"+this.getTypeCode(),  "acnewappoint_giftitembg1-"+this.getTypeCode(), "acnewappoint_giftitembg2-"+this.getTypeCode(), "acnewappoint_titlebg-"+this.getTypeCode(), "acnewappoint_topbg-"+this.getTypeCode(), "acnewappoint_scoreitemicon-"+this.getTypeCode(), "acnewappoint_toptxtbg-"+this.getTypeCode(), "acnewappoint_giftinfobg-"+this.getTypeCode(),
        ]).concat(list);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);

        super.dispose();
    }
}