/**
 * 皇榜任务
 * date 2019.10.28
 * author ycg
 * @class AcCourtDutyViewTab2
 */
class AcCourtDutyViewTab2 extends AcCommonViewTab{
    private _scrollList:ScrollList = null;
    private _maskPanel:BaseDisplayObjectContainer = null;
    private _lockDialog:BaseDisplayObjectContainer = null;
    private _fettersList:CustomMovieClip[] = [];
    private _fettersBaseList:BaseLoadBitmap[] = [];
    private _lock:BaseBitmap = null;
    private _clickHand:BaseBitmap = null;
    private _isUnlock:boolean = false;

    public constructor(){
        super();
        this.initView();
    }

    public initView(){
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_COURTDUTY_UNLOCK, this.unlockCallback, this);
        let parentView = <AcCourtDutyView>ViewController.getInstance().getView("AcCourtDutyView");
        this.width = GameConfig.stageWidth;
        this.height = parentView.getListHeight();

        let bottomBg = BaseBitmap.create("public_9_bg22");
        bottomBg.width = this.width;
        bottomBg.height = this.height;
        bottomBg.setPosition(0, 0);
        this.addChild(bottomBg);

        //public_9_bg32 public_9_probiginnerbg
        let listBg = BaseBitmap.create("public_9_bg32");
        listBg.width = bottomBg.width - 30;
        listBg.height = bottomBg.height - 40;
        listBg.setPosition(15, 20);
        this.addChild(listBg);

        let dataList = this.vo.getSortHuangBangTaskCfg();
        let rect =  new egret.Rectangle(0, 0, listBg.width - 10, listBg.height - 10);
        let scrollList = ComponentManager.getScrollList(AcCourtDutyViewTaskScrollItem, dataList, rect, {aid:this.aid, code:this.code, type:2});
        scrollList.setPosition(listBg.x + 5, listBg.y + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;

        this.initFetters();
    }

    public refreshView():void{
        App.LogUtil.log("tab2 refreshview");
        let dataList = this.vo.getSortHuangBangTaskCfg();
        this._scrollList.refreshData(dataList, {aid:this.aid, code:this.code, type:2});

        this.refreshFetterPanel()
    }

    private _fettersDataList:any = 
    [
        {x:0, y:20, scaleX:1, scaleY:1, rotation: 0},
        {x:650, y:32, scaleX:1, scaleY:1, rotation: 108},
    ];

    //初始化锁链
    private initFetters()
    {   
        if (this.cfg.needRecharge2 <= 0){
            return;
        }
        // let locakKey = this.vo.aidAndCode + Api.playerVoApi.getPlayerID() + "2"+ this.vo.et;
        // let lock = LocalStorageManager.get(locakKey);
        // App.LogUtil.log("infiFetters: "+lock);
        // if (lock && Number(lock) == 1){
        //     return;
        // }
        if (this.vo.unlock && this.vo.unlock["huangBangTask"] && this.vo.unlock["huangBangTask"] == 1){
            return ;
        }
        if(this._maskPanel == null)
        {
            this._maskPanel = new BaseDisplayObjectContainer();
            this._maskPanel.width = GameConfig.stageWidth;
            this._maskPanel.height = this.height;
            this.addChild(this._maskPanel);

            let mask = BaseBitmap.create("public_9_bg90");
            mask.width = this._maskPanel.width;
            mask.height = this._maskPanel.height;
            this._maskPanel.addChild(mask);
            this._maskPanel.touchEnabled = true;

            let clip:CustomMovieClip = null;
            let bs: BaseLoadBitmap = null;
            //初始化锁链
            for(let i = 0; i < this._fettersDataList.length; i++)
            {
                clip = ComponentManager.getCustomMovieClip("accourtduty_effect_unlock", 10, 70);
                clip.x = this._fettersDataList[i].x;
                clip.y = this._fettersDataList[i].y;
                clip.scaleX = this._fettersDataList[i].scaleX;
                clip.scaleY = this._fettersDataList[i].scaleY;
                clip.rotation = this._fettersDataList[i].rotation;
                this._fettersList.push(clip);
                this._maskPanel.addChild(clip);

                bs = BaseLoadBitmap.create("accourtduty_effect_unlock1");
                bs.x = this._fettersDataList[i].x;
                bs.y = this._fettersDataList[i].y;
                bs.scaleX = this._fettersDataList[i].scaleX;
                bs.scaleY = this._fettersDataList[i].scaleY;
                bs.rotation = this._fettersDataList[i].rotation;
                this._fettersBaseList.push(bs);
                this._maskPanel.addChild(bs);
            }  
            
            //锁
            let lockBgStr = ResourceManager.hasRes("accourtduty_unlock-"+this.getTypeCode()) ? "accourtduty_unlock-"+this.getTypeCode() : "accourtduty_unlock-1";
            this._lock = BaseBitmap.create(lockBgStr);
            this._lock.setPosition(this._maskPanel.x + this._maskPanel.width/2 - this._lock.width/2, this._maskPanel.y + 240);
            this._maskPanel.addChild(this._lock);

            this._lockDialog = new BaseDisplayObjectContainer();
            this._lockDialog.width = GameConfig.stageWidth;
            this._lockDialog.height = this.height;
            this._maskPanel.addChild(this._lockDialog);

            let dalogBgStr = ResourceManager.hasRes("accourtduty_chargetipbg-"+this.getTypeCode()) ? "accourtduty_chargetipbg-"+this.getTypeCode() : "accourtduty_chargetipbg-1";
            let dialogBg = BaseBitmap.create(dalogBgStr);
            dialogBg.x = this._lockDialog.width/2 - dialogBg.width/2;
            dialogBg.y = this._lockDialog.height - dialogBg.height;
            this._lockDialog.addChild(dialogBg);

            let dialogTxtBg = BaseBitmap.create("accourtduty_txtbg");
            dialogTxtBg.x = dialogBg.x + 211;
            dialogTxtBg.y = dialogBg.y + 85;
            this._lockDialog.addChild(dialogTxtBg);

            let dialogText = ComponentManager.getTextField(LanguageManager.getlocal("acCourtDutyRechargeInfo2-"+this.getTypeCode(), [""+this.cfg.needRecharge2]), TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
            dialogText.width = dialogTxtBg.width - 20;
            dialogText.x = dialogTxtBg.x + dialogTxtBg.width/2 - dialogText.width/2;
            dialogText.y = dialogTxtBg.y + 5;
            this._lockDialog.addChild(dialogText);

            let rechargeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCourtDutyRechargeTitle-"+this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
            rechargeTxt.x = dialogTxtBg.x + dialogTxtBg.width/2 - rechargeTxt.width/2;
            rechargeTxt.y = dialogTxtBg.y + dialogTxtBg.height + 5;
            this._lockDialog.addChild(rechargeTxt);

            //进度条
            let progress = ComponentManager.getProgressBar("progress7", "progress7_bg", 380);
            progress.setPosition(dialogTxtBg.x + dialogTxtBg.width/2 - progress.width/2, rechargeTxt.y + rechargeTxt.height + 3);
            this._lockDialog.addChild(progress);
            let currRechargeNum = this.vo.getRechargeNum();
            let currRechargeNumStr = LanguageManager.getlocal("acCourtDutyRechargeNum-"+this.getTypeCode(),[""+currRechargeNum, ""+this.cfg.needRecharge2]);
            progress.setPercentage(currRechargeNum/this.cfg.needRecharge2, currRechargeNumStr);
            progress.name = "progress";

            let rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED,"acCourtDutyRechargeGo-"+this.getTypeCode(), this.rechargeHandler, this);
            rechargeBtn.x = progress.x + progress.width/2 - rechargeBtn.width/2;
            rechargeBtn.y = progress.y + progress.height + 2;
            this._lockDialog.addChild(rechargeBtn);
            rechargeBtn.name = "rechargeBtn";

            let unlockBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"acCourtDutyRechargeUnlock-"+this.getTypeCode(), this.unlockHandler, this);
            unlockBtn.x = progress.x + progress.width/2 - unlockBtn.width/2;
            unlockBtn.y = progress.y + progress.height + 2;
            this._lockDialog.addChild(unlockBtn);
            unlockBtn.name = "unlockBtn";
            this._clickHand = BaseBitmap.create("guide_hand");
            this._clickHand.setPosition(unlockBtn.x + unlockBtn.width/2 - 10, unlockBtn.y + unlockBtn.height/2 - 15);
		    this._lockDialog.addChild(this._clickHand);
            this._clickHand.visible = false;
            egret.Tween.removeTweens(this._clickHand);
                egret.Tween.get(this._clickHand,{loop:true})
				.to({scaleX: 0.9,scaleY:0.9}, 500)
                .to({scaleX: 1,scaleY:1}, 500);

            if (this.cfg.needRecharge2 <= this.vo.getRechargeNum()){
                unlockBtn.visible = true;
                rechargeBtn.visible = false;
                this._clickHand.visible = true;
                App.CommonUtil.addIconToBDOC(unlockBtn);
            }
            else{
                unlockBtn.visible = false;
                rechargeBtn.visible = true;
                this._clickHand.visible = false;
                if (!this.vo.isInActivity()){
                    rechargeBtn.setGray(true);
                }
                else{
                    rechargeBtn.setGray(false);
                }
            }
        } 
    }

    //播放锁链特效
    private playFetters()
    {
        // let locakKey = this.vo.aidAndCode + Api.playerVoApi.getPlayerID() + "2" + this.vo.et;
        // LocalStorageManager.set(locakKey, String(1));
        if (!this._maskPanel){
            return;
        }
        this._lockDialog.visible = false;
        this._lock.visible = false;
        let unlockEffect = ComponentManager.getCustomMovieClip("qingyuanclicked", 12, 70);
        unlockEffect.setPosition(this._lock.x - 100, this._lock.y - 120);
        this._maskPanel.addChild(unlockEffect);
        unlockEffect.playWithTime(1);
        let view = this;
        unlockEffect.setEndCallBack(()=>{
            unlockEffect.visible = false;
            for (let i = 0; i < view._fettersDataList.length; i++){
                view._maskPanel.removeChild(view._fettersBaseList[i]);
            }
            for(let i = 0 ;i < this._fettersList.length; i ++)
            {
                view._fettersList[i].playWithTime(1);
                if (i == view._fettersList.length - 1){
                    view._fettersList[i].setEndCallBack(()=>{
                        view.hideMaskPanel();
                    }, view);
                }
            }
        }, view);
        
        // egret.Tween.get(this._maskPanel)
        // .wait(1000)
        // .call(this.hideMaskPanel, this);
    }

    private hideMaskPanel()
    {
        this._maskPanel.visible = false;
    }

    //刷新充值进度
    private refreshFetterPanel():void{
        if (this._lockDialog){
            let currNum = this.vo.getRechargeNum();
            let progress = <ProgressBar>this._lockDialog.getChildByName("progress");
            let currNumStr = LanguageManager.getlocal("acCourtDutyRechargeNum-"+this.getTypeCode(),[""+currNum, ""+this.cfg.needRecharge2]);
            progress.setPercentage(currNum/this.cfg.needRecharge2, currNumStr);

            let unlockBtn = <BaseButton>this._lockDialog.getChildByName("unlockBtn");
            let rechargeBtn = <BaseButton>this._lockDialog.getChildByName("rechargeBtn");
            if (this.cfg.needRecharge2 <= currNum){
                unlockBtn.visible = true;
                rechargeBtn.visible = false;
                this._clickHand.visible = true;
                App.CommonUtil.addIconToBDOC(unlockBtn);
            }
            else{
                unlockBtn.visible = false;
                rechargeBtn.visible = true;
                this._clickHand.visible = false;
                if (!this.vo.isInActivity()){
                    rechargeBtn.setGray(true);
                }
                else{
                    rechargeBtn.setGray(false);
                }
            }
        }
    }

    private rechargeHandler():void{
        if (!this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    }

    private unlockHandler():void{
        let unlockBtn = <BaseButton>this._lockDialog.getChildByName("unlockBtn");
        unlockBtn.touchEnabled = false;
        this._isUnlock = true;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_COURTDUTY_UNLOCK, { activeId: this.vo.aidAndCode, bigType: "huangBangTask"});
    }

    private unlockCallback(evt:egret.Event){
        if (!this._isUnlock){
            return;
        }
        if(evt && evt.data && evt.data.ret){
            this.playFetters();
        }
        else{
            let unlockBtn = <BaseButton>this._lockDialog.getChildByName("unlockBtn");
            if (unlockBtn){
                unlockBtn.touchEnabled = true;
            }
        }
        this._isUnlock = false;
    }

    public getTypeCode():string{
        return this.code;
    }

    private get cfg():Config.AcCfg.CourtDutyCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo():AcCourtDutyVo{
        return <AcCourtDutyVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_COURTDUTY_UNLOCK, this.unlockCallback, this);
        this._scrollList = null;
        this._maskPanel = null;
        this._lockDialog = null;
        this._lock = null;
        this._fettersList = [];
        this._fettersBaseList = [];
        this._clickHand = null;
        this._isUnlock = false;

        super.dispose();
    }

}