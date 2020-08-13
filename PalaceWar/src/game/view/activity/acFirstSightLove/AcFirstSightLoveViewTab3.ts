/**
 * 钟情聚会
 * author ycg
 * date 2019.10.17
 * @class AcFirstSightLoveViewTab3
 */
class AcFirstSightLoveViewTab3 extends AcCommonViewTab{
    public _notRewardContainer:BaseDisplayObjectContainer = null;
    public _rewardContainer:BaseDisplayObjectContainer = null;
    public _timeCountDown:BaseTextField = null;
    public _isFirstIn:boolean = false;
    public _joinBtn:BaseButton = null;
    public _joinBtnText:BaseTextField = null;
    public _joinedTxt:BaseTextField = null;
    public _acEndTxt:BaseTextField = null;
    public _rewardInfo:BaseTextField = null;
    public _freshTw:egret.Tween = null;
    public _heartBg:BaseBitmap = null;
    public _heartIcon:BaseBitmap = null;
    public _heartNum:BaseTextField = null;

    public constructor(){
        super();
        this._isFirstIn = true;
        App.LogUtil.log("tab3: "+this.aid);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETINFO, this.requestGetInfoCallBack, this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETINFO, { activeId: this.vo.aidAndCode});
        // egret.callLater(this.initView, this);
    }

    public initView():void{
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACFIRSTSIGHTLOVE_FRESHVIEW, this.refreshWhenSwitchBack, this);

        let parentView = <AcFirstSightLoveView>ViewController.getInstance().getView("AcFirstSightLoveView");
        App.LogUtil.log("parent tab1: "+parentView.getChildShowHeight());
        this.width = GameConfig.stageWidth;
        this.height = parentView.getChildShowHeight();

        let bgStr = ResourceManager.hasRes("ac_firstsightlove_meet_bg-"+this.getTypeCode()) ? "ac_firstsightlove_meet_bg-"+this.getTypeCode() : "ac_firstsightlove_meet_bg-1";
        let bg = BaseBitmap.create(bgStr);
        bg.setPosition(this.width/2 - bg.width/2, 15);
        this.addChild(bg);
        bg.height = this.height - 36;

        let roleEmpty = BaseBitmap.create("ac_firstsightlove_emptyrole");
        roleEmpty.setPosition(this.width/2 - 150, 75);
        this.addChild(roleEmpty);

        let roleStr = ResourceManager.hasRes("ac_firstsightlove_meetrole-"+this.getTypeCode()) ? "ac_firstsightlove_meetrole-"+this.getTypeCode() : "ac_firstsightlove_meetrole-1";
        let role = BaseBitmap.create(roleStr);
        role.setPosition(70, 110);
        this.addChild(role);

        let topMsg = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveMeetTopMsg-"+this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        topMsg.width = bg.width - 10;
        topMsg.lineSpacing = 6;
        topMsg.setPosition(bg.x + bg.width/2 - topMsg.width/2, bg.y + 5);
        this.addChild(topMsg);

        let bottomBgStr = ResourceManager.hasRes("ac_firstsightlove_meet_mailbg-"+this.getTypeCode()) ? "ac_firstsightlove_meet_mailbg-"+this.getTypeCode() : "ac_firstsightlove_meet_mailbg-1";
        let bottomBg = BaseBitmap.create(bottomBgStr);
        bottomBg.setPosition(this.width/2 - bottomBg.width/2 + 13, this.height - bottomBg.height - 15);

        // roleEmpty.setPosition(this.width/2 - 150, bottomBg.y - roleEmpty.height + 165);
        // role.setPosition(70, bottomBg.y - role.height + 165);

        let welcomeBg = BaseBitmap.create("ac_firstsightlove_textbg");
        welcomeBg.setPosition(GameConfig.stageWidth/2 - welcomeBg.width/2, bottomBg.y - welcomeBg.height + 70);
        this.addChild(welcomeBg);

        let welcomeTxtStr = ResourceManager.hasRes("ac_firstsightlove_meet_txt-"+this.getTypeCode()) ? "ac_firstsightlove_meet_txt-"+this.getTypeCode() : "ac_firstsightlove_meet_txt-1";
        let welcomeTxt = BaseBitmap.create(welcomeTxtStr);
        welcomeTxt.setPosition(welcomeBg.x + welcomeBg.width/2 - welcomeTxt.width/2, welcomeBg.y - 0);
        this.addChild(welcomeTxt);

        this.addChild(bottomBg);

        //抽奖前
        let notRewardContainer = new BaseDisplayObjectContainer();
        notRewardContainer.width = bottomBg.width;
        notRewardContainer.height = bottomBg.height;
        notRewardContainer.setPosition(bottomBg.x + bottomBg.width/2 -  notRewardContainer.width/2, bottomBg.y + 20);
        this.addChild(notRewardContainer);
        this._notRewardContainer = notRewardContainer;
        //抽奖介绍
        let notRewardInfo = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveMeetDesc-"+this.getTypeCode(), [String(this.cfg.favorNeed), String(this.cfg.lotteryNum)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        notRewardInfo.width = bottomBg.width - 110;
        notRewardInfo.lineSpacing = 5;
        notRewardInfo.setPosition(notRewardContainer.width/2 - notRewardInfo.width/2 - 10, 45);
        notRewardContainer.addChild(notRewardInfo);
        //抽奖倾心值限制
        let heartInfoBg = BaseBitmap.create("public_9_bg87");
        heartInfoBg.y = notRewardInfo.y + notRewardInfo.height + 10;
        notRewardContainer.addChild(heartInfoBg);
        let heartIconStr = ResourceManager.hasRes("ac_firstsightlove_loveitem-"+this.getTypeCode()) ? "ac_firstsightlove_loveitem-"+this.getTypeCode() : "ac_firstsightlove_loveitem-1";
        let heartIcon = BaseBitmap.create(heartIconStr);
        notRewardContainer.addChild(heartIcon);
        let heartNumStr = "_1"
        if (this.vo.getCurrLove() >= this.cfg.favorNeed){
            heartNumStr = "_2";
        }
        let heartNum = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveMeetHeartNum-"+this.getTypeCode()+heartNumStr, [String(this.vo.getCurrLove()), String(this.cfg.favorNeed)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        notRewardContainer.addChild(heartNum);
        heartInfoBg.width = heartIcon.width + heartNum.width + 60;
        heartInfoBg.x = notRewardContainer.width/2 - heartInfoBg.width/2 - 10;
        heartIcon.setPosition(heartInfoBg.x + 30, heartInfoBg.y + heartInfoBg.height/2 - heartIcon.height/2);
        heartNum.setPosition(heartIcon.x + heartIcon.width, heartIcon.y + heartIcon.height/2 - heartNum.height/2);
        this._heartBg = heartInfoBg;
        this._heartIcon = heartIcon;
        this._heartNum = heartNum;
        //报名按钮
        let joinBtn = ComponentManager.getButton("ac_firstsightlove_joinbtn", "", ()=>{
            //活动报名接口
            if (this.vo.getCurrLove() >= this.cfg.favorNeed && !this.vo.bm){
                ViewController.getInstance().openView(ViewConst.POPUP.ACFIRSTSIGHTLOVEUSERMSGPOPUPVIEW, {aid:this.aid, code:this.code});
            }
            else{
                if (!this.vo.bm){
                    App.CommonUtil.showTip(LanguageManager.getlocal("acFirstSightLoveMeetLimitTip-"+this.getTypeCode(), [""+this.cfg.favorNeed]));
                }
                else{
                    App.CommonUtil.showTip(LanguageManager.getlocal("acFirstSightLoveMeetJoined"));
                }
                return;
            }

        }, this);
        joinBtn.setPosition(notRewardContainer.width/2 - joinBtn.width/2 - 10, heartInfoBg.y + heartInfoBg.height + 5);
        notRewardContainer.addChild(joinBtn);
        let joinBtnText = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveMeetJoin"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        joinBtn.addChild(joinBtnText);
        joinBtnText.setPosition(joinBtn.width/2 - joinBtnText.width/2 + 6, joinBtn.height/2 - joinBtnText.height/2 - 4);
        this._joinBtn = joinBtn;
        this._joinBtnText = joinBtnText;
        //已报名
        let joinedTxt = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveMeetJoined"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        joinedTxt.setPosition(notRewardContainer.width/2 - joinedTxt.width/2 - 10, heartInfoBg.y + heartInfoBg.height + 15);
        notRewardContainer.addChild(joinedTxt);
        this._joinedTxt = joinedTxt;
        joinedTxt.visible = false;
        //活动已结束
        let acEndTxt = ComponentManager.getTextField(LanguageManager.getlocal("acPunishEnd"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        acEndTxt.setPosition(notRewardContainer.width/2 - acEndTxt.width/2 - 10, heartInfoBg.y + heartInfoBg.height + 15);
        notRewardContainer.addChild(acEndTxt);
        this._acEndTxt = acEndTxt;
        
        //倒计时
        let timeCountDown = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveMeetResultTip", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeCountDown.setPosition(notRewardContainer.width/2 - timeCountDown.width/2 - 10, notRewardContainer.height - 70);
        notRewardContainer.addChild(timeCountDown);
        this._timeCountDown = timeCountDown;

        //名单按钮
        let lookJoinBtn = ComponentManager.getButton("ac_firstsightlove_lookbtn", "", ()=>{
            //报名列表
            // 
            this.getBmDataList();
        }, this);
        lookJoinBtn.setPosition(notRewardContainer.width - lookJoinBtn.width - 40, notRewardContainer.height - lookJoinBtn.height - 25);
        notRewardContainer.addChild(lookJoinBtn);

        /******///抽奖结果展示
        let rewardContainer = new BaseDisplayObjectContainer();
        rewardContainer.width = bottomBg.width;
        rewardContainer.height = bottomBg.height;
        this.addChild(rewardContainer);
        rewardContainer.visible = false;
        this._rewardContainer = rewardContainer;
        rewardContainer.setPosition(bottomBg.x + bottomBg.width/2 -  rewardContainer.width/2, bottomBg.y + 20);
        //结果标题
        let rewardTitle = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveMeetResultTitle"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        rewardTitle.setPosition(rewardContainer.width/2 - rewardTitle.width/2, 45);
        rewardContainer.addChild(rewardTitle);
        //结果信息
        let rewardInfoStr = "acFirstSightLoveMeetResultInfo-"+this.getTypeCode();
        if (this.vo.resultFlag == 1){
            if (this.vo.bm){
                if (this.vo.mychooseFlag != 1){
                    rewardInfoStr = "acFirstSightLoveMeetResultFailInfo-"+this.getTypeCode();
                }
            }
            else{
                rewardInfoStr = "acFirstSightLoveMeetResultNotIn-"+this.getTypeCode();
            }
        }
        let rewardInfo = ComponentManager.getTextField(LanguageManager.getlocal(rewardInfoStr), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
        rewardInfo.width = rewardContainer.width - 90;
        rewardInfo.textAlign = TextFieldConst.ALIGH_CENTER;
        rewardInfo.lineSpacing = 6;
        rewardInfo.setPosition(rewardContainer.width/2 - rewardInfo.width/2 - 10, rewardTitle.y + rewardTitle.height + 15);
        rewardContainer.addChild(rewardInfo);
        this._rewardInfo = rewardInfo;

        //结果按钮
        let lookRewardBtn = ComponentManager.getButton("ac_firstsightlove_lookbtn", "", ()=>{
            //获奖列表
            // ViewController.getInstance().openView(ViewConst.POPUP.ACFIRSTSIGHTLOVERANKPOPUPVIEW, {aid:this.aid, code:this.code, isResult:true});
            if (this.vo.resultFlag == 1){
                this.getRewardDataList();
            }
            else{
                this.getBmDataList();
            }

        }, this);
        lookRewardBtn.setPosition(rewardContainer.width/2 - lookRewardBtn.width/2 - 10, rewardContainer.height - lookRewardBtn.height - 30);
        rewardContainer.addChild(lookRewardBtn);

        App.CommonUtil.removeIconFromBDOC(joinBtn);
        if (this.vo.isInActivity()){
            notRewardContainer.visible = true;
            rewardContainer.visible = false;
            TickManager.addTick(this.tick, this);
            if (!this.vo.bm){
                this._joinBtn.visible = true;
                this._joinBtnText.visible = true;
                joinedTxt.visible = false;
                acEndTxt.visible = false;
                if (this.vo.getCurrLove() >= this.cfg.favorNeed){
                    joinBtn.setGray(false);
                    App.DisplayUtil.changeToGray(joinBtnText);
                    App.CommonUtil.addIconToBDOC(joinBtn);
                }
                else{
                    joinBtn.setGray(true);
                    App.DisplayUtil.changeToNormal(joinBtnText);
                }
            }
            else{
                this._joinBtn.visible = false;
                this._joinBtnText.visible = false;
                joinedTxt.visible = true;
                acEndTxt.visible = false;
            }
        }
        else{
            acEndTxt.visible = true;
            this._joinBtn.visible = false;
            this._joinBtnText.visible = false;
            joinedTxt.visible = false;
            timeCountDown.text =  LanguageManager.getlocal("acFirstSightLoveTimeEndTip");
            if (this.vo.resultFlag == 1){
                notRewardContainer.visible = false;
                rewardContainer.visible = true;
            }
            else{
                this.freshQuestGetInfo();
                notRewardContainer.visible = true;
                rewardContainer.visible = false;
            }
        }
    }

    public tick():void{
        if (this.vo.isInActivity()){
            //刷新倒计时
            this._timeCountDown.text = LanguageManager.getlocal("acFirstSightLoveMeetResultTip", [this.vo.getCountDown()]);
            this._timeCountDown.x = this._notRewardContainer.width/2 - this._timeCountDown.width/2 - 10;
        }
        else{
            TickManager.removeTick(this.tick, this);
            this._timeCountDown.text =  LanguageManager.getlocal("acFirstSightLoveTimeEndTip");
            // 30秒刷一次结果
            this.freshQuestGetInfo();
        }
    }

    public freshQuestGetInfo():void{
        let view = this;
        if (view._freshTw){
            egret.Tween.removeTweens(view);
            view._freshTw = null;
        }
        view._freshTw = egret.Tween.get(view, {loop:true}).call(()=>{
            if (view.vo.resultFlag == 1){
                egret.Tween.removeTweens(view);
                view._freshTw = null;
            }
            else{
                view.refreshWhenSwitchBack();
            }
        }).wait(30000);
    }

    public refreshView():void{
        if (this.vo.resultFlag == 1){
            this._notRewardContainer.visible = false;
            this._rewardContainer.visible = true;
            let rewardInfoStr = "acFirstSightLoveMeetResultInfo-"+this.getTypeCode();
            if (this.vo.mychooseFlag != 1){
                if (this.vo.bm){
                    rewardInfoStr = "acFirstSightLoveMeetResultFailInfo-"+this.getTypeCode();
                }
                else{
                    rewardInfoStr = "acFirstSightLoveMeetResultNotIn-"+this.getTypeCode();
                }
            }
            this._rewardInfo.text = LanguageManager.getlocal(rewardInfoStr);
            this._rewardInfo.x = this._rewardContainer.width/2 - this._rewardInfo.width/2 - 10;
        }
        else{
            this._notRewardContainer.visible = true;
            this._rewardContainer.visible = false;
            App.CommonUtil.removeIconFromBDOC(this._joinBtn);
            if (this.vo.isInActivity()){
                if (this.vo.bm){
                    this._joinedTxt.visible = true;
                    this._joinBtnText.visible = false;
                    this._joinBtn.visible = false;
                    this._acEndTxt.visible = false;
                }
                else{
                    this._joinedTxt.visible = false;
                    this._joinBtnText.visible = true;
                    this._joinBtn.visible = true;
                    this._acEndTxt.visible = false;
                    
                    if (this.vo.getCurrLove() >= this.cfg.favorNeed){
                        App.CommonUtil.addIconToBDOC(this._joinBtn);
                        this._joinBtn.setGray(false);
                        App.DisplayUtil.changeToGray(this._joinBtnText);
                    }
                    else{
                        this._joinBtn.setGray(true);
                        App.DisplayUtil.changeToNormal(this._joinBtnText);
                    }
                }
            }
            else{
                this._timeCountDown.text =  LanguageManager.getlocal("acFirstSightLoveTimeEndTip");
                if (this.vo.bm){
                    this._joinedTxt.visible = true;
                    this._joinBtnText.visible = false;
                    this._joinBtn.visible = false;
                    this._acEndTxt.visible = false;
                }
                else{
                    this._joinedTxt.visible = false;
                    this._joinBtnText.visible = false;
                    this._joinBtn.visible = false;
                    this._acEndTxt.visible = true;
                }
            }
            let heartNumStr = "_1"
            if (this.vo.getCurrLove() >= this.cfg.favorNeed){
                heartNumStr = "_2";
            }
            this._heartNum.text = LanguageManager.getlocal("acFirstSightLoveMeetHeartNum-"+this.getTypeCode()+heartNumStr, [String(this.vo.getCurrLove()), String(this.cfg.favorNeed)]);

            this._heartBg.width = this._heartIcon.width + this._heartNum.width + 60;
            this._heartBg.x = this._notRewardContainer.width/2 - this._heartBg.width/2 - 10;
            this._heartIcon.x = this._heartBg.x + 30;
            this._heartNum.x = this._heartIcon.x + this._heartIcon.width;
        }
    }

    public refreshWhenSwitchBack(){
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETINFO, { activeId: this.vo.aidAndCode});
    }

    private requestGetInfoCallBack(evt:egret.Event){
        let rData = evt.data.data.data;
        if (rData){
            this.vo.totalLove = rData.totalv;
            this.vo.mychooseFlag = rData.mychooseFlag;
            this.vo.resultFlag = rData.resultFlag;
            if (this._isFirstIn){
                egret.callLater(this.initView, this);
                this._isFirstIn = false;
            }
            else{
                this.refreshView();
            }
        }
        else{
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
        }
    }

    //获取报名列表
    private getBmDataList():void{
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_BMLIST, this.getBmDataListCallback, this);
        
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_BMLIST, { activeId: this.vo.aidAndCode, page: "1"});
    }

    private getBmDataListCallback(evt:egret.Event):void{
        let rData = evt.data.data.data;
        if (rData){
            let data = rData.list;
            //打开面板  取消注册
            ViewController.getInstance().openView(ViewConst.POPUP.ACFIRSTSIGHTLOVERANKPOPUPVIEW, {aid:this.aid, code:this.code, isResult:false, data:data});
            App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_BMLIST, this.getBmDataListCallback, this);
        }
        else{
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
        }
    }

    //获取得奖列表
    private getRewardDataList():void{
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETLIST, this.getRewardCallback, this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETLIST, { activeId: this.vo.aidAndCode});
    }

    private getRewardCallback(evt:egret.Event):void{
        let rData = evt.data.data.data;
        if (rData){
            let data = rData.list;
            //打开面板  获奖名单
            ViewController.getInstance().openView(ViewConst.POPUP.ACFIRSTSIGHTLOVERANKPOPUPVIEW, {aid:this.aid, code:this.code, isResult:true, data:data});

            App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETLIST, this.getRewardCallback, this);
        }
        else{
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
        }
    }

    public getTypeCode():string{
        return this.code;
    }

    private get cfg():Config.AcCfg.FirstSightLoveCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo():AcFirstSightLoveVo{
        return <AcFirstSightLoveVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    public dispose():void{
        TickManager.removeTick(this.tick, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETINFO, this.requestGetInfoCallBack, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_BMLIST, this.getBmDataListCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETLIST, this.getRewardCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACFIRSTSIGHTLOVE_FRESHVIEW, this.refreshWhenSwitchBack, this);

        this._notRewardContainer = null;
        this._rewardContainer = null;
        this._timeCountDown = null;
        this._isFirstIn = false;
        this._joinBtn = null;
        this._joinBtnText = null;
        this._joinedTxt = null;
        this._acEndTxt = null;
        this._rewardInfo = null;
        if (this._freshTw){
            egret.Tween.removeTweens(this);
            this._freshTw = null;
        }
        super.dispose();
    }
}