/**
 * 出巡确认
 * date 2019.12.10
 * author ycg
 * @class EmperorOutStartPopupView
 */
class EmperorOutStartPopupView extends PopupView{
    private _startTip:BaseTextField = null;
    private _btnContainer:BaseDisplayObjectContainer = null;
    private _duringContainer:BaseDisplayObjectContainer = null;
    private _endContainer:BaseDisplayObjectContainer = null;

    public constructor(){
        super();
    }
 
    public initView():void{
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_OUTING, this.outingCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_GETBARRAGE_LIST, this.getBarrageListCallback, this);
        let viewBg = BaseBitmap.create("decree_popbg");
        viewBg.height = 600;
        viewBg.setPosition(GameConfig.stageWidth/2 - viewBg.width/2, GameConfig.stageHeigth/2 - viewBg.height/2);
        this.addChildToContainer(viewBg);
        this.closeBtn.y = viewBg.y - 10;
        this.closeBtn.x = viewBg.x + viewBg.width - 80;

        let title = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutStartTitle"), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WHITE);
        title.setPosition(viewBg.x + viewBg.width/2 - title.width/2, viewBg.y + 20);
        this.addChildToContainer(title);

        let bg = BaseBitmap.create("emperorachieve_startbg");
        bg.setPosition(viewBg.x + viewBg.width/2 - bg.width/2, viewBg.y + 68);
        this.addChildToContainer(bg);

        let descBg = BaseBitmap.create("emperorachieve_startdescbg");
        descBg.setPosition(viewBg.x + viewBg.width/2 - descBg.width/2, bg.y + bg.height + 10);
        this.addChildToContainer(descBg);

        let ruleTitle = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutStartRuleTitle"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BROWN);
        ruleTitle.setPosition(viewBg.x + viewBg.width/2 - ruleTitle.width/2, descBg.y + 18);
        this.addChildToContainer(ruleTitle);

        let descLine: BaseBitmap = BaseBitmap.create("public_line3");
		descLine.width += (ruleTitle.width + 20);
		descLine.setPosition(descBg.x + descBg.width / 2 - descLine.width / 2, ruleTitle.y + 1);
		this.addChildToContainer(descLine);

        let outTime = Api.emperorAchieveVoApi.localOutTime();
        let ruleInfo = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutStartRuleInfo", [""+outTime.st, ""+outTime.et]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        // ruleInfo.textAlign = TextFieldConst.ALIGH_CENTER;
        ruleInfo.width = descBg.width - 30;
        ruleInfo.lineSpacing = 5;
        ruleInfo.setPosition(descBg.x + descBg.width/2 - ruleInfo.width/2, ruleTitle.y + ruleTitle.height + 10);
        this.addChildToContainer(ruleInfo);

        let btnContainer = new BaseDisplayObjectContainer();
        btnContainer.width = viewBg.height;
        btnContainer.setPosition(viewBg.x, viewBg.y + viewBg.height - 100);
        this.addChildToContainer(btnContainer);
        
        let cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "cancelBtn", this.hide, this);	
        cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
        cancelBtn.x = 100;
        cancelBtn.y = 0;
        btnContainer.addChild(cancelBtn);

        //确认巡街
        let conBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "emperorOutStartOutBtnName", ()=>{
            NetManager.request(NetRequestConst.REQUEST_EMPERORACHIEVE_OUTING, null);
        }, this);
		conBtn.setColor(TextFieldConst.COLOR_BLACK);
		conBtn.x = viewBg.width - conBtn.width - 100;
		conBtn.y = 0;
        btnContainer.addChild(conBtn); 
        btnContainer.visible = false;
        this._btnContainer = btnContainer;

        //时间未到
        let startTip = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutStartNotOpenTip", [""+outTime.st, ""+outTime.et]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        startTip.setPosition(descBg.x + descBg.width/2 - startTip.width/2, descBg.y + descBg.height + 50);
        this.addChildToContainer(startTip);
        startTip.visible = false;
        this._startTip = startTip;

        //进行中
        let duringOutContainer = new BaseDisplayObjectContainer();
        duringOutContainer.setPosition(viewBg.x,  descBg.y + descBg.height + 20);
        this.addChildToContainer(duringOutContainer);
        let duringTip = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutStartingTip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        duringTip.setPosition(viewBg.width/2 - duringTip.width/2, 0);
        duringOutContainer.addChild(duringTip);
        //前往查看
        let goBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "emperorOutStartGoBtnName", ()=>{
            let playerId = Api.playerVoApi.getPlayerID();
            ViewController.getInstance().openView(ViewConst.COMMON.EMPEROROUTVIEW, {uid: playerId});
        }, this);
        goBtn.setPosition(duringTip.x + duringTip.width/2 - goBtn.width/2, duringTip.y + duringTip.height + 15);
        duringOutContainer.addChild(goBtn);
        duringOutContainer.visible = false;
        this._duringContainer = duringOutContainer;

        //已结束
        let endContainer = new BaseDisplayObjectContainer();
        endContainer.setPosition(viewBg.x,  descBg.y + descBg.height + 20);
        this.addChildToContainer(endContainer);
        let endTip = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutStartEndTip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        endTip.setPosition(viewBg.width/2 - endTip.width/2, 0);
        endContainer.addChild(endTip);

        //请安列表
        let wishBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "emperorOutStartWishListBtnName", ()=>{
            // if (!Api.emperorAchieveVoApi.isInOutTime()){
                let playerUid = Api.playerVoApi.getPlayerID();
                NetManager.request(NetRequestConst.REQUEST_EMPERORACHIEVE_GETBARRAGE_LIST, {fuid: playerUid});
            // }
            // this.hide();
        }, this);
        wishBtn.setPosition(endTip.x + endTip.width/2 - wishBtn.width/2, endTip.y + endTip.height + 15);
        endContainer.addChild(wishBtn);
        endContainer.visible = false;
        this._endContainer = endContainer;

        App.LogUtil.log("outingst: "+this.emperorApi.emperorAchieveVo.outingst);
        this.freshView();
        // endContainer.visible = true;
    }

    private outingCallback(evt:egret.Event){
        if (evt && evt.data && evt.data.ret){
            this.freshView();
            let playerId = Api.playerVoApi.getPlayerID();
            ViewController.getInstance().openView(ViewConst.COMMON.EMPEROROUTVIEW, {uid: playerId});
        }
    }

    public tick():void{
        this.freshView();
    }

    public freshView():void{
        let outSt = this.emperorApi.emperorAchieveVo.outingst;
        if (outSt == 0){
            this._duringContainer.visible = false;
            this._endContainer.visible = false;
            if (this.emperorApi.isInOutTime()){
                this._btnContainer.visible = true;
                this._startTip.visible = false;
            }
            else{
                this._btnContainer.visible = false;
                this._startTip.visible = true;
            }
        }
        else{
            this._btnContainer.visible = false;
            this._startTip.visible = false;
            if (App.DateUtil.checkIsToday(outSt) && Api.emperorAchieveVoApi.isInOuting(outSt)){
                this._duringContainer.visible = true;
                this._endContainer.visible = false;
            }
            else{
                this._duringContainer.visible = false;
                this._endContainer.visible = true;
            }
        }
    }

    //请安列表
    private getBarrageListCallback(evt:egret.Event){
        if (evt && evt.data && evt.data.ret){
            let rData = evt.data.data.data;
            let dataList = rData.barrageList;
            let _data:any = [];
            for (let key in dataList){
                if (dataList[key]){
                    _data.push(dataList[key]);
                }
            }
            if (_data.length > 0){
                let playerUid = Api.playerVoApi.getPlayerID();
                ViewController.getInstance().openView(ViewConst.POPUP.EMPEROROUTWISHPOPUPVIEW, {data: _data, uid: playerUid});
            }
            else{
                App.CommonUtil.showTip(LanguageManager.getlocal("emperorOutWishListNotHave"));
                return ;
            }
        }
        this.hide();
    }

    public get emperorApi():EmperorAchieveVoApi{
        return Api.emperorAchieveVoApi;
    }

    public getResourceList():string[]{
        return super.getResourceList().concat([
            "decree_popbg"
        ]);
    }

    protected getTitleStr():string{
        return "";
    }

    protected getTitleBgName():string{
        return null;
    }

    protected getBgName():string{
        return null;
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_OUTING, this.outingCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_GETBARRAGE_LIST, this.getBarrageListCallback, this);
        this._startTip = null;
        this._duringContainer = null;
        this._btnContainer = null;
        this._endContainer = null;

        super.dispose();
    }
}