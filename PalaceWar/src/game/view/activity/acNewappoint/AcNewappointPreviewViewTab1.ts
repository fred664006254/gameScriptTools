/**
 * 新服预约 tab1
 * date 2020.6.29
 * author ycg
 */
class AcNewappointPreviewViewTab1 extends CommonViewTab{
    public _scrollView:ScrollView = null;
    public _giftContainer:BaseDisplayObjectContainer = null;
    public _giftList:any[] = [];
    private _appointBtn:BaseButton = null;
    private _goBtn:BaseButton = null;
    private _appointSuccess:BaseTextField = null;

    public constructor(data?:any){
        super();
        this.param = data;
        this.initView();
    }

    public initView():void{
        let bg = BaseBitmap.create("public_9_bg93");
        bg.width = 540;
        bg.height = 450;
        bg.setPosition(50, 0);
        this.addChild(bg);

        let topInfoBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_toptxtbg", this.getTypeCode()));
        topInfoBg.setPosition(bg.x + bg.width/2 - topInfoBg.width/2, bg.y + 10);
        this.addChild(topInfoBg);

        let topInfo = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewGiftTop", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        topInfo.setPosition(topInfoBg.x + topInfoBg.width/2 - topInfo.width/2, topInfoBg.y + topInfoBg.height/2 - topInfo.height/2);
        this.addChild(topInfo);

        let giftBottomBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_giftbottombg", this.getTypeCode()));
        giftBottomBg.setPosition(bg.x + bg.width/2 - giftBottomBg.width/2, topInfoBg.y + topInfoBg.height);
        this.addChild(giftBottomBg);

        let giftContainer = new BaseDisplayObjectContainer();
        this._giftContainer = giftContainer;

        let scrollView = ComponentManager.getScrollView(giftContainer, new egret.Rectangle(0, 0, giftBottomBg.width, giftBottomBg.height));
        this.addChild(scrollView);
        scrollView.horizontalScrollPolicy = "on";
        scrollView.verticalScrollPolicy = "off";
        scrollView.bounces = false;
        scrollView.setPosition(giftBottomBg.x, giftBottomBg.y);
        this._scrollView = scrollView;
        
        let data = this.cfg.getGiftListCfg();
        for (let i=0; i < data.length; i++){
            let container = new BaseDisplayObjectContainer();
            giftContainer.addChild(container);
            let giftBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_giftitembg1", this.getTypeCode()));
            container.width = giftBg.width;
            container.height = scrollView.height;
            container.addChild(giftBg);
            giftBg.setPosition(0, container.height - giftBg.height + 2);

            let giftImgIndex = i % 3 + 1;
            let gift = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_gift"+giftImgIndex, this.getTypeCode()));
            gift.setPosition(giftBg.x + giftBg.width/2 - gift.width/2, container.height - gift.height - 30);
            container.addChild(gift);

            let giftName = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointGiftName"+(i+1), this.getTypeCode())), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            giftName.setPosition(giftBg.x + giftBg.width/2 - giftName.width/2, giftBg.y + 34);
            container.addChild(giftName);

            container.setPosition(5 + i * (container.width + 10), 0);
            container.addTouchTap(this.giftClickHandler, this, [i]);
            let giftItem = {giftBg: giftBg, gift: gift, container: container}
            this._giftList.push(giftItem);
        }

        //预约介绍
        let info = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewInfo", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        info.width = 510;
        info.lineSpacing = 5;
        info.setPosition(giftBottomBg.x + giftBottomBg.width/2 - info.width/2, giftBottomBg.y + giftBottomBg.height + 15);
        this.addChild(info);

        //预约按钮
        let appointBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, App.CommonUtil.getCnByCode("acNewappointPreviewappointBtn1", this.getTypeCode()), this.appointBtnClick, this, null, null, null, TextFieldConst.COLOR_BLACK);
        appointBtn.setPosition(bg.x + bg.width/2 - appointBtn.width/2, bg.y + bg.height - appointBtn.height - 10);
        this.addChild(appointBtn);
        this._appointBtn = appointBtn;
        //前往按钮
        let goBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, App.CommonUtil.getCnByCode("acNewappointPreviewappointBtn2", this.getTypeCode()), this.goBtnClick, this, null, null, null, TextFieldConst.COLOR_BLACK);
        goBtn.setPosition(bg.x + bg.width/2 - goBtn.width/2, bg.y + bg.height - goBtn.height - 10);
        this.addChild(goBtn);
        goBtn.visible = false;
        this._goBtn = goBtn;
        //预约成功
        let appointSuccess = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewappointSuccess", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN4);
        appointSuccess.setPosition(giftBottomBg.x + giftBottomBg.width/2 - appointSuccess.width/2, appointBtn.y + appointBtn.height/2 - appointSuccess.height/2);
        this.addChild(appointSuccess);
        appointSuccess.visible = false;
        this._appointSuccess = appointSuccess;
        //预约时间
        let timeInfo = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewTime", this.getTypeCode()),[Api.acnewappointApi.getStartTime()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        timeInfo.width = 510;
        timeInfo.lineSpacing = 5;
        timeInfo.setPosition(giftBottomBg.x + giftBottomBg.width/2 - timeInfo.width/2, appointBtn.y - timeInfo.height - 10);
        this.addChild(timeInfo);

        this.refreshView();

    }

    //预约按钮点击事件
    private appointBtnClick():void{
        if (Api.acnewappointApi.isInActivity()){
            let acData = Api.acnewappointApi.getAcData();
            let ast = acData.yrst;
            let newZid = acData.newzid;
            let reqData:any={t:"mackappinitment",pid:LoginManager.getLocalUserName(), yrst: ast, newzid: newZid};
            NetManager.http.get(ServerCfg.svrCfgUrl, reqData, this.appointCallback, this.appointErrorCallback, this);
        }
        else{
            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewappointTip2", this.getTypeCode())));
        }
    }

    private appointCallback(data:any):void{
        if (data && data.ret){
            if (data.ret == -1){
                App.CommonUtil.showTip(LanguageManager.getlocal("requestFailCode-1"));
            }
            else if (data.ret == -2){
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewappointTip2", this.getTypeCode()))); 
            }
            return;
        }
        if (data && data.activeData){
            Api.acnewappointApi.setAcData(data.activeData);
            
            this.refreshView();
        }
    }

    private appointErrorCallback():void{
        App.CommonUtil.showTip(LanguageManager.getlocal("requestFailCode-1"));
    }

    //前往按钮点击事件
    private goBtnClick():void{
        if (Api.acnewappointApi.isStart){
            if (Api.acnewappointApi.isBeforeServerOpenTime()){
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewappointTip3", this.getTypeCode())));
                return ;
            }
            if (!Api.acnewappointApi.isInActivity()){
                ServerCfg.setAcNewServerData(Api.acnewappointApi.getNewServerInfo());
                let baseView = <AcNewappointPreviewView>ViewController.getInstance().getView("AcNewappointPreviewView");
                baseView.hide();
            }
        }
        else{
            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewappointTip2", this.getTypeCode())));
        }
    }

    private giftClickHandler(target:any, index:number){
        App.LogUtil.log("giftClickHandler "+index);
        let data = this.cfg.getGiftListCfg();
        let itemCfg = data[index];
        ViewController.getInstance().openView(ViewConst.POPUP.ACNEWAPPOINTPREVIEWGIFTDETAILPOPUPVIEW, {aid: this.aid, code: this.code, rewards: itemCfg.getReward});
    }

    private refreshView():void{
        if (Api.acnewappointApi.isInActivity()){
            if (Api.acnewappointApi.isJoin()){
                this._appointBtn.visible = false;
                this._appointSuccess.visible = true;
                this._goBtn.visible = false;
            }
            else{
                this._appointBtn.visible = true;
                this._appointSuccess.visible = false;
                this._goBtn.visible = false;
            }
        }
        else{
            if (Api.acnewappointApi.isJoin()){
                this._appointBtn.visible = false;
                this._appointSuccess.visible = false;
                this._goBtn.visible = true;
            }
            else{
                this._appointBtn.visible = true;
                this._appointSuccess.visible = false;
                this._goBtn.visible = false;
            }
        }
    }

    private get cfg() : Config.AcCfg.NewappointCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

    protected get code():string{
		return Api.acnewappointApi.code ? Api.acnewappointApi.code : "";
    }

    private get aid():string{
        return "newappoint";
    }

    private getTypeCode():string{
        return this.code;
    }

    public dispose():void{
        this._scrollView = null;
        this._giftContainer = null;
        this._giftList = [];
        this._appointBtn = null;
        this._goBtn = null;
        this._appointSuccess = null;

        super.dispose();
    }
}