/**
  * 电玩大本营活动
  * @author 张朝阳
  * date 2019/6/6
  * @class AcArcadeView
  */
class AcArcadeView extends AcCommonView {

    private _activityTimerText: BaseTextField = null;
	private _acCDTxt: BaseTextField = null;
	private _ruleText: BaseTextField = null;

    private _isPlayAni = false;

    private _gameBM: BaseLoadBitmap = null;
    private _useBg: BaseLoadBitmap = null;
    private _useTF: BaseTextField = null;
    private _machineContainer: BaseDisplayObjectContainer = null;
    private _numBg: BaseLoadBitmap = null;
    private _numTF: BaseTextField = null;
    private _pullrodUp: BaseBitmap = null;
    private _pullrodDown: BaseBitmap = null;
    private _leftBtn: BaseButton = null;
    private _rightBtn: BaseButton = null;
    private _leftBtnTxt: BaseTextField = null;
    private _rightBtnTxt: BaseTextField = null;
    private _gameCoin: BaseLoadBitmap = null;
    private _leftPoint: BaseBitmap = null;
    private _rightPoint: BaseBitmap = null;
    private _rewardsVoList: RewardItemVo[] = null;

     /** 对象池 */
    private _rewardsPool: Object = {};
    /**位置信息1 */
    private _posList1: { x: number, y: number, visible: boolean }[] = [];
    /**位置信息2 */
    private _posList2: { x: number, y: number, visible: boolean }[] = [];
    /**位置信息3 */
    private _posList3: { x: number, y: number, visible: boolean }[] = [];
    /**reward 信息 */
    private _containerList1: BaseDisplayObjectContainer[] = [];
    /**reward 信息 */
    private _containerList2: BaseDisplayObjectContainer[] = [];
    /**reward 信息 */
    private _containerList3: BaseDisplayObjectContainer[] = [];
    private _startPosY1: number = 0;
    private _startPosY2: number = 0;
    private _startPosY3: number = 0;


    private _index1: number = 0;

    private _slideIndex1: number = 0;

    private _index2: number = 0;

    private _slideIndex2: number = 0;

    private _index3: number = 0;

    private _slideIndex3: number = 0;

    private _endPosY1: number = 0;
    private _isStop1: boolean = false;

    private _stopIndex1: number = 0;

    private _endPosY2: number = 0;
    private _isStop2: boolean = false;

    private _stopIndex2: number = 0;

    private _endPosY3: number = 0;
    private _isStop3: boolean = false;

    private _stopIndex3: number = 0;

    private _lastId1: string = null;
    private _lastId2: string = null;
    private _lastId3: string = null;



    private _offestId1: number = 0;
    private _offestId2: number = 0;
    private _offestId3: number = 0;

    // private _farmelightEffect: BaseBitmap = null;
    private _container1: BaseDisplayObjectContainer = null;
    private _container2: BaseDisplayObjectContainer = null;
    private _container3: BaseDisplayObjectContainer = null;
    private _handlerData: any = null;
    private _isBatch: boolean = false;

    private lampwinfos= {} 
    private totalgem:number = 0;
    private _cost_Centertxt:BaseBitmapText | BaseTextField = null
  
    private _loopList:any[] = [];
    private _titleBar: BaseBitmap = null;
    private _titleBarText: BaseTextField = null;
    private _titleBg: BaseLoadBitmap = null;

    private _lihua: BaseDisplayObjectContainer = null;
    private _lihuaMsg:any = null;
    private _tipCon = null;
    private _tempObj = null;
    private _onceBtn:BaseButton = null;
    private _tenBtn:BaseButton = null;
    private _changeList:any[] = [];
    private _rRewards = null;
    private _oRewards = null;
    private _lihuaIndex:number = 0;

    private _dbdragon:BaseLoadDragonBones = undefined;
    private _choujiangEndNum:string = undefined; // 抽奖几个相同的
    // laohuji_ske.dbbin
    private _enterLiHuaData:{name: string, gem: string} = undefined;
    public constructor() {
        super();
    }
    protected get acVo():AcArcadeVo
	{
		return <AcArcadeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
    }
    
    public initView() {
        let cfg = <Config.AcCfg.ArcadeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_ARCADELOTTERY, this.lotteryHandle, this);

        let titletxt = BaseBitmap.create("arcadegame_title_1");
        titletxt.x = GameConfig.stageWidth/2 - titletxt.width/2;
        // titletxt.y = 5;
        this.addChild(titletxt);

        let flag = BaseBitmap.create("oneyear_flag");
        flag.x = GameConfig.stageWidth - flag.width-60;
        flag.y =  35;
        this.addChild(flag);

		//顶部背景图片
		let forpeople_top: BaseLoadBitmap = BaseLoadBitmap.create('arcadegame_topbg_1');
        forpeople_top.width = 640;
        forpeople_top.height = 146;
        this.addChildToContainer(forpeople_top);
        forpeople_top.y = 75;

		//活动时间   
		this._activityTimerText = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._activityTimerText.x = 15
		this._activityTimerText.y = 109-25;
		this._activityTimerText.text  = this.acVo.getAcLocalTime(true);
		this.addChildToContainer(this._activityTimerText);
		let deltaY = 5;
        if(PlatformManager.checkIsJPSp()|| PlatformManager.checkIsKRSp()|| PlatformManager.checkIsViSp()||PlatformManager.checkIsKRNewSp()){
            deltaY = 3;
            this._activityTimerText.y = 109-27;
        }
		//倒计时文本 
		let acCDTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [""]);
		acCDTxt.x = this._activityTimerText.x;//forpeople_top.x + forpeople_top.width - 220;//this._activityTimerText.x;
		acCDTxt.y = this._activityTimerText.y + this._activityTimerText.height + deltaY; //this._activityTimerText.y ;//
		this.addChildToContainer(acCDTxt);
		this._acCDTxt = acCDTxt;

		//规则
		this._ruleText = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._ruleText.x = this._activityTimerText.x
        this._ruleText.multiline = true;
        this._ruleText.lineSpacing = 4;
        if(PlatformManager.checkIsJPSp()){
            this._ruleText.lineSpacing = 2;
        }
        this._ruleText.width = GameConfig.stageWidth - this._ruleText.x*2;
		this._ruleText.y = this._acCDTxt.y + this._activityTimerText.height + deltaY;
		this._ruleText.text = LanguageManager.getlocal("acArcadeView_acDesc-"+this.getCnCode(),[""+cfg.cost,""+cfg.addPrize,""+cfg.totalNum]);
		this.addChildToContainer(this._ruleText);

        //跑马灯
        this.initLoop();

        let bottom = BaseBitmap.create("arcadegame_bottombg-"+this.getUiCode());
        bottom.x = 0;
        bottom.y = GameConfig.stageHeigth - bottom.height - this.container.y;


        //log 
        let logBg:BaseButton = ComponentManager.getButton("mainui_bottombtnbg",null,this.logBtnHandler,this,null,0);
        logBg.setPosition(GameConfig.stageWidth - logBg.width - 5,forpeople_top.y + forpeople_top.height +40);
        this.addChildToContainer(logBg);

        let logIcon:BaseBitmap = BaseBitmap.create("arcadegame_logbtn");
        logIcon.setPosition(logBg.width/2-logIcon.width/2,logBg.height/2-logIcon.height/2);
        logBg.addChild(logIcon);

        let logText:BaseBitmap = BaseBitmap.create("arcadegame_logtxt");
        logText.setPosition(logBg.width/2- logText.width/2,logIcon.y + logIcon.height -30);
        logBg.addChild(logText);

        //jiangchi
        let rewardBg:BaseButton = ComponentManager.getButton("mainui_bottombtnbg",null,this.rewardBtnHandler,this,null,0);
        rewardBg.setPosition(logBg.x -  rewardBg.width - 25,logBg.y);
        this.addChildToContainer(rewardBg);

        let rewardIcon:BaseBitmap = BaseBitmap.create("arcadegame_rewardbtn");
        rewardIcon.setPosition(rewardBg.width/2-rewardIcon.width/2,rewardBg.height/2-rewardIcon.height/2);
        rewardBg.addChild(rewardIcon);

        let rewardText:BaseBitmap = BaseBitmap.create("arcadegame_rewardtxt");
        rewardText.setPosition(rewardBg.width/2- rewardText.width/2,rewardIcon.y + rewardIcon.height -30);
        rewardBg.addChild(rewardText);

        //中奖名单
        let listBtn:BaseButton = ComponentManager.getButton("arcadegame_listbtn",null,this.listBtnHandler,this,null,0);
        listBtn.setPosition(5 ,logBg.y);
        this.addChildToContainer(listBtn);

        this._gameBM = BaseLoadBitmap.create("acarcadeview_machine-" + this.getUiCode());
        this._gameBM.width = 611;
        this._gameBM.height = 613;
        // this._gameBM.setPosition(GameConfig.stageWidth / 2 - this._gameBM.width/2 , forpeople_top.y + forpeople_top.height + 160);
        let tmpPosY2 = forpeople_top.y + forpeople_top.height + 160;
        let tmpPosY = (bottom.y + 120 - tmpPosY2)/2 - this._gameBM.height/2 + tmpPosY2;
         if(tmpPosY < tmpPosY2)
         {
             tmpPosY = tmpPosY2;
         }
         this._gameBM.setPosition(GameConfig.stageWidth / 2 - this._gameBM.width/2 , tmpPosY);
        this._pullrodUp = BaseBitmap.create("acarcadeview_pullrodup-" + this.getUiCode());
        this._pullrodUp.setPosition(this._gameBM.x + 551, this._gameBM.y + 94);
        this.addChildToContainer(this._pullrodUp);

        this._pullrodDown = BaseBitmap.create("acarcadeview_pullroddown-" + this.getUiCode());
        this._pullrodDown.setPosition(this._pullrodUp.x, this._pullrodUp.y);
        this.addChildToContainer(this._pullrodDown);
        this.addChildToContainer(this._gameBM);
        
        this._useBg = BaseLoadBitmap.create("acarcadeview_usebg-1");
        this._useBg.width = 259;
        this._useBg.height = 32;
        this._useBg.setPosition(GameConfig.stageWidth / 2 - this._useBg.width/2, this._gameBM.y + 80-2);
        this.addChildToContainer(this._useBg);

        this._useTF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._useTF.text = LanguageManager.getlocal("acArcadeGameViewUse-" + this.getCnCode(), ["1"]);
        this._useTF.anchorOffsetX = this._useTF.width / 2;
        this._useTF.setPosition(this._useBg.x + this._useBg.width / 2 , this._useBg.y + this._useBg.height / 2 - this._useTF.height / 2);
        this.addChildToContainer(this._useTF);

        this._machineContainer = new BaseDisplayObjectContainer();
        this._machineContainer.width = 410;
        this._machineContainer.height = 176;
        this._machineContainer.setPosition(this._gameBM.x + 100, this._gameBM.y + 130);
        this.addChildToContainer(this._machineContainer);
        this._machineContainer.mask = new egret.Rectangle(0, 0, 410, 170);
        this.showDBdragons();

        let topflag = BaseBitmap.create("acarcadeview_machine-flag");
        topflag.setPosition(GameConfig.stageWidth / 2 - topflag.width/2, this._gameBM.y - topflag.height + 110);
        let titleTxt = BaseBitmap.create("arcadegame_txt_gold");
        titleTxt.setPosition(GameConfig.stageWidth / 2 - titleTxt.width/2, topflag.y - titleTxt.height + 20);
        this.addChildToContainer(topflag);
        this.addChildToContainer(titleTxt);

        let machineMask = BaseLoadBitmap.create("acarcadeview_machinemask-1");
        machineMask.setPosition(this._machineContainer.x, this._machineContainer.y);
        this.addChildToContainer(machineMask);

        this._leftPoint = BaseBitmap.create("arcadegame_arrow");
        this._leftPoint.width = 56;
        this._leftPoint.height = 53;
        this._leftPoint.rotation = -180;
        this._leftPoint.anchorOffsetY = this._leftPoint.height/2-3;
        this._leftPoint.anchorOffsetX = 37
        this._leftPoint.setPosition(this._machineContainer.x-10, this._machineContainer.y + this._machineContainer.height / 2);
        this.addChildToContainer(this._leftPoint);
        this._rightPoint = BaseBitmap.create("arcadegame_arrow");
        this._rightPoint.anchorOffsetX = this._leftPoint.anchorOffsetX;
        this._rightPoint.anchorOffsetY = this._leftPoint.anchorOffsetY;
        this._rightPoint.setPosition(this._machineContainer.x + this._machineContainer.width+10, this._machineContainer.y + this._machineContainer.height / 2+5);
        this.addChildToContainer(this._rightPoint);
        this._leftPoint.visible = this._rightPoint.visible = false;
        
        let colorribbonBM = BaseBitmap.create("acarcadeview_machine-flag2");
        colorribbonBM.setPosition(GameConfig.stageWidth/2 - colorribbonBM.width/2, this._gameBM.y + this._gameBM.height - colorribbonBM.height - 10);
        this.addChildToContainer(colorribbonBM);

        this._leftBtn = ComponentManager.getButton("arcadegame_btn2" , "", this.rollHandler, this,[0]);
        this._leftBtn.setPosition(this._gameBM.x + 80, this._gameBM.y + 370);
        this.addChildToContainer(this._leftBtn);

        this._leftBtnTxt = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeGameViewUseOne-" + this.getCnCode()), TextFieldConst.FONTSIZE_BUTTON_COMMON +2, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._leftBtnTxt.setPosition(this._leftBtn.x + this._leftBtn.width / 2 - this._leftBtnTxt.width / 2, this._leftBtn.y + this._leftBtn.height / 2 - this._leftBtnTxt.height / 2 -5);
        this.addChildToContainer(this._leftBtnTxt);

        this._rightBtn = ComponentManager.getButton("arcadegame_btn1", "", this.rollHandler, this,[1]);
        this._rightBtn.setPosition(this._gameBM.x + 330, this._leftBtn.y );
        this.addChildToContainer(this._rightBtn);

        this._rightBtnTxt = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeGameViewUseTen-" + this.getCnCode()), TextFieldConst.FONTSIZE_BUTTON_COMMON +2, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._rightBtnTxt.setPosition(this._rightBtn.x + this._rightBtn.width / 2 - this._rightBtnTxt.width / 2, this._leftBtnTxt.y  );
        this.addChildToContainer(this._rightBtnTxt);

        let costbg_left =  BaseBitmap.create("arcadegame_costbg");
        costbg_left.setPosition(this._leftBtn.x + this._leftBtn.width/2 - costbg_left.width/2, this._leftBtn.y + this._leftBtn.height + 10);
        this.addChildToContainer(costbg_left);

        let goldLeft = BaseBitmap.create("public_icon1");
        goldLeft.setPosition(costbg_left.x + costbg_left.width/2 - goldLeft.width , costbg_left.y + costbg_left.height/2 - goldLeft.height/2);
        this.addChildToContainer(goldLeft);

        let cost_Lefttxt = ComponentManager.getTextField(""+ cfg.cost, 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        cost_Lefttxt.setPosition(goldLeft.x + goldLeft.width , costbg_left.y + costbg_left.height/2 - cost_Lefttxt.height/2+2);
        this.addChildToContainer(cost_Lefttxt);

        let costbg_right =  BaseBitmap.create("arcadegame_costbg");
        costbg_right.setPosition(this._rightBtn.x + this._rightBtn.width/2 - costbg_right.width/2, costbg_left.y );
        this.addChildToContainer(costbg_right);

        let goldright = BaseBitmap.create("public_icon1");
        goldright.setPosition(costbg_right.x + costbg_right.width/2 - goldright.width , goldLeft.y );
        this.addChildToContainer(goldright);

        let cost_righttxt = ComponentManager.getTextField(""+(cfg.cost*10 *cfg.discount), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        cost_righttxt.setPosition(goldright.x + goldright.width , cost_Lefttxt.y );
        this.addChildToContainer(cost_righttxt);

        let goldcenter = BaseBitmap.create("public_icon1");
        goldcenter.setPosition(GameConfig.stageWidth/2 - goldcenter.width -50, topflag.y + 30 );
        this.addChildToContainer(goldcenter);

        let cost_Centertxt = ComponentManager.getBitmapText("","activity_fnt",30);
        this._cost_Centertxt = cost_Centertxt;
        this._cost_Centertxt.text = ""+this.totalgem;
        cost_Centertxt.setScale(0.8);
        cost_Centertxt.setPosition(goldcenter.x + goldcenter.width , goldcenter.y -2 );
        this.addChildToContainer(cost_Centertxt);
        
        this.initRewardPoolList();
        this.refreshPullrod(false);
        this.refreshView();

        
        this.addChildToContainer(bottom);
        if(this._enterLiHuaData){
             this.showLihua(this._enterLiHuaData);
        }
    }


    private refreshView() {
        this._useTF.text = LanguageManager.getlocal("acArcadeGameViewUse-" + this.getCnCode(), [""+this.acVo.getTotalTimes()]);
        this._useTF.anchorOffsetX = this._useTF.width / 2;
        this._cost_Centertxt.text = ""+this.totalgem;
    }

    private refreshPullrod(isDown: boolean) {
        this._pullrodUp.setVisible(!isDown);
        this._pullrodDown.setVisible(isDown);
    }

    private lotteryHandle(event: egret.Event) {
        if (event.data.ret) {
            this._handlerData = event.data.data.data;
            this._lastId1 = this._handlerData.shootSet[0] + "1";
            this._lastId2 = this._handlerData.shootSet[1] + "2";
            this._lastId3 = this._handlerData.shootSet[2] + "3";
            this._isBatch = this._handlerData.isBatch == 0 ? false : true;
            this.totalgem = this._handlerData.nowtotalgem ;
            this.refreshView();
            let buffers = this._handlerData.buffers;
  
            if(buffers["3"] >= 1){
                this._choujiangEndNum = "3";
            }else if (buffers["2"] >= 1){
                 this._choujiangEndNum = "2";
            }else{
                this._choujiangEndNum = "1";
            }
            this.movePos();
            if(this._isBatch){
                egret.Tween.get(this,{loop:false}).wait(1500).call(this.showEndReward,this);
            }
            let lampwinfos = this._handlerData.lampwinfos || [];
            let lampcwardinfos = this._handlerData.lampcwardinfos || [];
            this.dealLampinfos(lampwinfos,lampcwardinfos);
            this.initLoop();
            if(this._handlerData.wuid){
                this.showLihua({name:this._handlerData.wname, gem:this._handlerData.wgem});
                let loopStr = LanguageManager.getlocal("acLotteryLoopMsg1",[this._handlerData.wname,""+this._handlerData.wgem]);
                this._loopList.push(loopStr);
            }
        }
    }

   
    private showDBdragons()
    {
        this._dbdragon=App.DragonBonesUtil.getLoadDragonBones("laohuji");
        this._dbdragon.x = this._gameBM.x;//-10;
        this._dbdragon.y = this._gameBM.y +this._gameBM.height;//+100;
        this.addChildToContainer(this._dbdragon);
        this._dbdragon.playDragonMovie("zhongjiang_idle",0); //COMPLETE

        let tmpthis = this;
        this._dbdragon.setDragonBoneEventListener(dragonBones.EventObject.LOOP_COMPLETE, (param1:dragonBones.EgretEvent)=>{
            // this._dbdragon.playDragonMovie('idle',0);
            let animationName = param1.animationName;
            if(animationName == "choujiang"){
                if(this._choujiangEndNum == "1"){
                    tmpthis._dbdragon.playDragonMovie("zhongjiang"+this._choujiangEndNum,1);
                }
            }else if(animationName == "zhongjiang1"){
                tmpthis._dbdragon.playDragonMovie("zhongjiang1",0);
            }else if(animationName == "zhongjiang2"){
                tmpthis._dbdragon.playDragonMovie("zhongjiang1",0);
            }else if(animationName == "zhongjiang3"){
                tmpthis._dbdragon.playDragonMovie("zhongjiang_idle",0);
            }else if(animationName == "zhongjiang_idle"){
                
            } 
        }, this); 
    }

    private titleBtnHandler():void
    {
        let deltaT = this.acVo.et - GameData.serverTime;
        if(deltaT < 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACLOTTERYPOPUPVIEW,{activeId:this.aid+"-"+this.code});
    }

    private rollHandler(isBatch:any)
    {
        if(!this.acVo.isStart ){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this._isPlayAni) {
            return;
        }

        if (this.acVo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        let config = this.acVo.config;
        let needgold = config.cost;
        if(isBatch){
            needgold = config.cost *10 * config.discount;
        }
        if (needgold > Api.playerVoApi.getPlayerGem()) {
            let msg = LanguageManager.getlocal("acArcadeGameViewTipMsg-" + this.getCnCode(),[""+Api.playerVoApi.getPlayerGem()]);
            let title = "itemUseConstPopupViewTitle";
            if(  PlatformManager.checkHideIconByIP()){
                msg = LanguageManager.getlocal("acArcadeGameViewTipMsg_hideByIp-" + this.getCnCode(),[""+Api.playerVoApi.getPlayerGem()]);
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    msg: msg, title: title, needCancel: true, confirmTxt: "sysConfirm", handler: this, callback:null,
                });
            }else{
                 ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    msg: msg, title: title, needCancel: true, confirmTxt: "acArcadeGameViewGoCharge-" + this.code, handler: this, callback: () => {
                        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW, { code: this.code, aid: this.aid });
                    }
                });
            }
            return;


        }
        SoundManager.playEffect("effect_acarcade");
        this._dbdragon.playDragonMovie("choujiang",1);
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_ARCADELOTTERY, { activeId: this.acVo.aidAndCode, isBatch: isBatch });
    }

    private logBtnHandler()
    {
        if(!this.acVo.isStart ){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.ACARCADEGAMELOGVIEW, { activeId: this.acVo.aidAndCode, aid: this.aid, code: this.code });
    }

    private rewardBtnHandler()
    {
        if(!this.acVo.isStart ){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.ACARCADEGAMEREWARDVIEW, { code: this.code, aid: this.aid });
    }

    //中奖名单
    private listBtnHandler()
    {
        if(!this.acVo.isStart ){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.ACARCADEGAMELISTVIEW, { activeId: this.acVo.aidAndCode,aid: this.aid, code: this.code });
    }
    

    /**初始化奖池 */
    private initRewardPoolList() {
        let cfg = <Config.AcCfg.ArcadeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        let vo = <AcArcadeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);

        let rewardList = [];
        let rewards0 = cfg.poolListItemCfg[0].rewardPoolList();
        let rewards1 = cfg.poolListItemCfg[1].rewardPoolList();
        let rewards2 = cfg.poolListItemCfg[2].rewardPoolList();
        rewardList.push(rewards0);
        rewardList.push(rewards1);
        rewardList.push(rewards2);
        let rewards = rewardList.join("|");
        this._rewardsVoList = GameData.formatRewardItem(rewards);
        this._posList1 = [];
        this._containerList1 = [];
        this._posList2 = [];
        this._containerList2 = [];
        this._posList3 = [];
        this._containerList3 = [];

        //第一条
        for (let i = 0; i < this._rewardsVoList.length; i++) {
            let rewardVo = this._rewardsVoList[i];
            let rewardContainer = this.getRewardContainer(rewardVo.type + "_" + rewardVo.id + "_" + rewardVo.num + "1", rewardVo);
            rewardContainer.setPosition(15 + rewardContainer.width / 2, this._machineContainer.height / 2 - (i - 2) * (rewardContainer.height + 22));
            let itemlightEffect = rewardContainer.getChildByName("itemlight");
            if (itemlightEffect) {
                egret.Tween.removeTweens(itemlightEffect);
                itemlightEffect.alpha = 0;
            }
            this._posList1.push({ x: rewardContainer.x, y: rewardContainer.y, visible: rewardContainer.visible });
            this._containerList1.push(rewardContainer);
            this._index1++;
            if (i == 0) {
                this._startPosY1 = rewardContainer.y;
            }
            if (i == 2) {
                this._endPosY1 = rewardContainer.y;
            }
        }
        //第二条
        for (let i = 0; i < this._rewardsVoList.length; i++) {
            let rewardVo = this._rewardsVoList[i];
            let rewardContainer = this.getRewardContainer(rewardVo.type + "_" + rewardVo.id + "_" + rewardVo.num + "2", rewardVo);
            rewardContainer.setPosition(this._machineContainer.width / 2+1, this._machineContainer.height / 2 - (i - 2) * (rewardContainer.height + 22));
            let itemlightEffect = rewardContainer.getChildByName("itemlight");
            if (itemlightEffect) {
                egret.Tween.removeTweens(itemlightEffect);
                itemlightEffect.alpha = 0;
            }
            this._posList2.push({ x: rewardContainer.x, y: rewardContainer.y, visible: rewardContainer.visible });
            this._containerList2.push(rewardContainer);
            if (i == 0) {
                this._startPosY2 = rewardContainer.y;
            }
            if (i == 2) {
                this._endPosY2 = rewardContainer.y;
            }
        }
        //第三条
        for (let i = 0; i < this._rewardsVoList.length; i++) {
            let rewardVo = this._rewardsVoList[i];
            let rewardContainer = this.getRewardContainer(rewardVo.type + "_" + rewardVo.id + "_" + rewardVo.num + "3", rewardVo);
            rewardContainer.setPosition(this._machineContainer.width - rewardContainer.width / 2 - 13, this._machineContainer.height / 2 - (i - 2) * (rewardContainer.height + 22));
            let itemlightEffect = rewardContainer.getChildByName("itemlight");
            if (itemlightEffect) {
                egret.Tween.removeTweens(itemlightEffect);
                itemlightEffect.alpha = 0;
            }
            this._posList3.push({ x: rewardContainer.x, y: rewardContainer.y, visible: rewardContainer.visible });
            this._containerList3.push(rewardContainer);
            if (i == 0) {
                this._startPosY3 = rewardContainer.y;
            }
            if (i == 2) {
                this._endPosY3 = rewardContainer.y;
            }
        }
    }

    private get pollTime()
    {
        return  60;// 20;
    }
    private movePos() {
        if (this._isPlayAni) {
            return;
        }
        this._isPlayAni = true;
        this.refreshPullrod(true);

        this._isStop1 = false;
        this._stopIndex1 = 0;
        this._slideIndex1 = this._offestId1;

        this._isStop2 = false;
        this._stopIndex2 = 0;
        this._slideIndex2 = this._offestId2;

        this._isStop3 = false;
        this._stopIndex3 = 0;
        this._slideIndex3 = this._offestId3;
   
        egret.Tween.get(this,{loop:false}).call(this.movePos1,this,[this.pollTime]).wait(this.pollTime/3*1).call(this.movePos2,this,[this.pollTime]).wait(this.pollTime/3*2).call(this.movePos3,this,[this.pollTime])
        this.playPointAni1();
        this.playPointAni2();
    }


    /**
    * 位置移动
    */
    private movePos1(time: number) {
        
        this._slideIndex1++;
        let lastid = this._lastId1;

        if (this._slideIndex1 >= (this._rewardsVoList.length * 1 + this._offestId1) && this._isStop1 == false) {
            for (let i = 0; i < this._containerList1.length; i++) {
                let rewardContainer = this._containerList1[i];
                if (rewardContainer.y == this._endPosY1 && rewardContainer.name == lastid) {
                    this._isStop1 = true;
                    break;
                }
            }
        }
        
        if (this._isStop1) {
            this._stopIndex1++;
        }
        if ( this._isStop1 || this._stopIndex1 > (this._rewardsVoList.length * 2)) {
            this._offestId1 = (this._slideIndex1 % this._rewardsVoList.length - 1 + this._rewardsVoList.length) % this._rewardsVoList.length;
            return;
        }
        for (let i = 0; i < this._posList1.length; i++) {
            let movePos = this._posList1[(i - (this._slideIndex1 % this._posList1.length) + this._posList1.length) % this._posList1.length];
            let timetmp = time;
            if (this._containerList1[i].y == this._startPosY1) {
                let floorReward = this._rewardsVoList[this._index1 % this._rewardsVoList.length];
                this._containerList1[i] = this.getRewardContainer(floorReward.type + "_" + floorReward.id + "_" + floorReward.num + "1", floorReward);
                let itemlightEffect = this._containerList1[i].getChildByName("itemlight");
                if (itemlightEffect) {
                    egret.Tween.removeTweens(itemlightEffect);
                    itemlightEffect.alpha = 0;
                }
                this._containerList1[i].visible = false;

            }
            egret.Tween.get(this._containerList1[i]).to({ x: movePos.x, y: movePos.y, visible: movePos.visible }, time).call(() => {
                egret.Tween.removeTweens(this._containerList1[i]);
                if (i == this._posList1.length - 1) {
                    egret.Tween.get(this._containerList1[i]).wait(0).call(() => {
                        egret.Tween.removeTweens(this._containerList1[i]);
                        this._index1++
                        if (this._isStop1) {
                            // this.movePos1(this.pollTime + (this._stopIndex1 * 0.05) * (this._stopIndex1 * 0.04) * (52 * this._stopIndex1));
                            //  this.movePos1(this.pollTime + (this._stopIndex1 * 10) );
                            this.movePos1(this.pollTime  );
                        }
                        else {
                            this.movePos1(time);
                        }
                    }, this)
                }
            }, this);
        }
    }

    /**
    * 位置移动
    */
    private movePos2(time: number) {

        this._slideIndex2++;
        let lastid = this._lastId2;
       
        if (this._slideIndex2 >= (this._rewardsVoList.length * 2 + this._offestId2) && this._isStop2 == false) {
            for (let i = 0; i < this._containerList2.length; i++) {
                if (this._containerList2[i].y == this._endPosY2 && this._containerList2[i].name == lastid) {
                    this._isStop2 = true;
                    break;
                }
            }
        }
        if (this._isStop2) {
            this._stopIndex2++;
        }

        if ( this._isStop2 || this._stopIndex2 >= (this._rewardsVoList.length * 2)) {
            this._offestId2 = (this._slideIndex2 % this._rewardsVoList.length - 1 + this._rewardsVoList.length) % this._rewardsVoList.length;
            return;
        }

        for (let i = 0; i < this._posList2.length; i++) {
            let movePos = this._posList2[(i - (this._slideIndex2 % this._posList2.length) + this._posList2.length) % this._posList2.length];
            let timetmp = time;
            if (this._containerList2[i].y == this._startPosY2) {
                let floorReward = this._rewardsVoList[this._index2 % this._rewardsVoList.length];
                this._containerList2[i] = this.getRewardContainer(floorReward.type + "_" + floorReward.id + "_" + floorReward.num + "2", floorReward);
                let itemlightEffect = this._containerList1[i].getChildByName("itemlight");
                if (itemlightEffect) {
                    egret.Tween.removeTweens(itemlightEffect);
                    itemlightEffect.alpha = 0;
                }
                this._containerList2[i].visible = false;
            }

            egret.Tween.get(this._containerList2[i]).to({ x: movePos.x, y: movePos.y, visible: movePos.visible }, time).call(() => {
                egret.Tween.removeTweens(this._containerList2[i]);
                if (i == this._posList2.length - 1) {
                    egret.Tween.get(this._containerList2[i]).wait(0).call(() => {
                        egret.Tween.removeTweens(this._containerList2[i]);
                        this._index2++
                        if (this._isStop2) {
                            // this.movePos2(this.pollTime + (this._stopIndex2 * 0.05) * (this._stopIndex2 * 0.04) * (52 * this._stopIndex2));
                            //  this.movePos2(this.pollTime + (this._stopIndex2 * 10));
                            this.movePos2(this.pollTime );
                        }
                        else {
                            this.movePos2(time);
                        }
                    }, this)
                }
            }, this);
        }
    }
    /**
    * 位置移动
    */
    private movePos3(time: number) {
        this._slideIndex3++;
        let lastid = this._lastId3;

        if (this._slideIndex3 >= (this._rewardsVoList.length * 3 + this._offestId3) && this._isStop3 == false) {
            for (let i = 0; i < this._containerList3.length; i++) {
                if (this._containerList3[i].y == this._endPosY3 && this._containerList3[i].name == lastid) {
                    this._isStop3 = true;
                    break;
                }
            }
        }
        if (this._isStop3) {
            this._stopIndex3++;
        }
        if ( this._isStop3||  this._stopIndex3 >= (this._rewardsVoList.length * 2)) {
            this._offestId3 = (this._slideIndex3 % this._rewardsVoList.length - 1 + this._rewardsVoList.length) % this._rewardsVoList.length;
            this.playLotteryEndAni();
            return;
        }

        for (let i = 0; i < this._posList3.length; i++) {
            let movePos = this._posList3[(i - (this._slideIndex3 % this._posList3.length) + this._posList3.length) % this._posList3.length];
            let timetmp = time;
            if (this._containerList3[i].y == this._startPosY3) {
                let floorReward = this._rewardsVoList[this._index3 % this._rewardsVoList.length];
                this._containerList3[i] = this.getRewardContainer(floorReward.type + "_" + floorReward.id + "_" + floorReward.num + "3", floorReward);
                let itemlightEffect = this._containerList1[i].getChildByName("itemlight");
                if (itemlightEffect) {
                    egret.Tween.removeTweens(itemlightEffect);
                    itemlightEffect.alpha = 0;
                }
                this._containerList3[i].visible = false;

            }
            egret.Tween.get(this._containerList3[i]).to({ x: movePos.x, y: movePos.y, visible: movePos.visible }, time).call(() => {
                egret.Tween.removeTweens(this._containerList3[i]);
                if (i == this._posList3.length - 1) {
                    egret.Tween.get(this._containerList3[i]).wait(0).call(() => {
                        egret.Tween.removeTweens(this._containerList3[i]);
                        this._index3++
                        if (this._isStop3) {
                            // this.movePos3(this.pollTime + (this._stopIndex3 * 0.05) * (this._stopIndex3 * 0.04) * (52 * this._stopIndex3));
                            //  this.movePos3(this.pollTime + (this._stopIndex3 * 10)  );
                             this.movePos3(this.pollTime  );
                        }
                        else {
                            this.movePos3(time);
                        }
                    }, this)
                }
            }, this);
        }
    }
    /**对象池操作 */
    private getRewardContainer(id: string, rewardVo: RewardItemVo): BaseDisplayObjectContainer {
        if (this._rewardsPool[id]) {
            return this._rewardsPool[id];
        }
        else {
            let rewardContainer = GameData.getItemIcon(rewardVo);
            rewardContainer.name = id;
            rewardContainer.anchorOffsetX = rewardContainer.width / 2;
            rewardContainer.anchorOffsetY = rewardContainer.height / 2;
            this._machineContainer.addChild(rewardContainer);
            let numLb = rewardContainer.getChildByName("numLb");
            let magnifierIcon = rewardContainer.getChildByName("magnifierIcon");
            if (numLb) {
                numLb.visible = false;
            }
            if (magnifierIcon) {
                magnifierIcon.visible = false;
            }

            let itemlightEffect = ComponentManager.getCustomMovieClip("xiangkuang",6,70);
            itemlightEffect.anchorOffsetX = 23;// 150/2;
            itemlightEffect.anchorOffsetY =25;// 150/2;
            rewardContainer.addChild(itemlightEffect);
            itemlightEffect.name = "itemlight";
            itemlightEffect.playWithTime(0);
            itemlightEffect.alpha = 0;
            this._rewardsPool[id] = rewardContainer;
            return this._rewardsPool[id];
        }
    }

    private showEndReward()
    {
        if (!this._isBatch) {
             let otherRewards = null;
            let tmpthis = this;
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{rewards: this._handlerData.rewards, otherRewards: otherRewards,isPlayAni:true,callback: () => {
                tmpthis._isPlayAni = false;
            }, target: this});
        }else{
            this._lihuaIndex = 0;
            let batchList = this._handlerData.batchList || [];
            let tmpthis = this;
            // ViewController.getInstance().openView(ViewConst.COMMON.ACARCADEGAMEBATCHPOPUPVIEW,{f:this.showRewards,o:this,batchList:batchList,aid:this.aid,code:this.code,lotteytime: this._handlerData.lotteytime});
		    ViewController.getInstance().openView(ViewConst.COMMON.ACARCADEGAMEBATCHPOPUPVIEW,{batchList:batchList,aid:this.aid,code:this.code,lotteytime: this._handlerData.lotteytime,f:() => {
                tmpthis._isPlayAni = false;
            },o:this});
        }
    }
    private playLotteryEndAni() 
    {
        this.refreshPullrod(false);
        if(this._choujiangEndNum != "1"){
            this._dbdragon.playDragonMovie("zhongjiang"+this._choujiangEndNum,1);
        }

        if (!this._isBatch) {
            // this.showEndReward();
             egret.Tween.get(this,{loop:false}).wait(1000).call(this.showEndReward,this);
        }
        
        let loopNum = 0;
        this._container1 = <BaseDisplayObjectContainer>this._machineContainer.getChildByName(this._lastId1);
        this._container2 = <BaseDisplayObjectContainer>this._machineContainer.getChildByName(this._lastId2);
        this._container3 = <BaseDisplayObjectContainer>this._machineContainer.getChildByName(this._lastId3);

        if (this._container1) {
            let itemlightEffect = this._container1.getChildByName("itemlight");
            if (itemlightEffect) {
                itemlightEffect.alpha = 1;
                egret.Tween.removeTweens(itemlightEffect);
                egret.Tween.get(itemlightEffect, { loop: false }).wait(3000).to({ alpha: 0 }, 100);
             }
        }

        if (this._container2) {
            let itemlightEffect = this._container2.getChildByName("itemlight");
            if (itemlightEffect) {
                itemlightEffect.alpha = 1;
                egret.Tween.removeTweens(itemlightEffect);
                 egret.Tween.get(itemlightEffect, { loop: false }).wait(3000).to({ alpha: 0 }, 100);
            }
        }

        if (this._container3) {
            let itemlightEffect = this._container3.getChildByName("itemlight");
            if (itemlightEffect) {
                itemlightEffect.alpha = 1;
                egret.Tween.removeTweens(itemlightEffect);
                 egret.Tween.get(itemlightEffect, { loop: false }).wait(3000).to({ alpha: 0 }, 100);
            }
        }
    }

    /**指针动画1 */
    private playPointAni1() {
        this._rightPoint.rotation = 0;
        egret.Tween.removeTweens(this._rightPoint);
        let time = 75;
        let loopTime = 0;
        egret.Tween.get(this._rightPoint, { loop: true }).to({ rotation: -90 }, time).to({ rotation: 0 }, time).to({ rotation: 90 }, time).to({ rotation: 0 }, time).call(() => {
            loopTime++;
            if (loopTime > 11) {
                this._rightPoint.rotation = 0;
                egret.Tween.removeTweens(this._rightPoint);
            }
        }, this);
    }

    /**指针动画1 */
    private playPointAni2() {
        this._leftPoint.rotation = -180;
        egret.Tween.removeTweens(this._leftPoint);
        let time = 75;
        let loopTime = 0;
        egret.Tween.get(this._leftPoint, { loop: true }).to({ rotation: -270 }, time).to({ rotation: -180 }, time).to({ rotation: -90 }, time).to({ rotation: -180 }, time).call(() => {
            loopTime++;
            if (loopTime > 8) {
                this._leftPoint.rotation = -180;
                egret.Tween.removeTweens(this._leftPoint);
            }
        }, this);
    }

    private showLihua(msg?:any):void{
        let view = this;
        if(!this._lihua){
            this._lihua = new BaseDisplayObjectContainer();
            this._lihua.width = GameConfig.stageWidth;
            this._lihua.height = GameConfig.stageHeigth;
            this._lihua.x = 0;
            this._lihua.y = this._gameBM.y-170;
            this.addChildToContainer(this._lihua);
        }

		let deviationNum  = 0;
		let param = {
            "1" : {color : 'caise_0000', pos : [500,40+deviationNum], scale : 0.9, wait : 0},
			"2" : {color : 'lv_0000', pos : [80,10+deviationNum], scale : 1.85, wait : 200},
			"3" : {color : 'lv_0000', pos : [300,0+deviationNum], scale : 1.5, wait : 400},
			"4" : {color : 'yanhua_0000', pos : [200,-50+deviationNum], scale : 2, wait : 650},
			"5" : {color : 'caise_0000', pos : [40,60+deviationNum], scale : 1, wait : 900}
		};

		for(let i in param){
			if(view._lihua && !view._lihua.getChildByName(`lihua${i}`)){
				let unit = param[i];
				let lihuaclip = ComponentManager.getCustomMovieClip(`${unit.color}`, 11, 115);
				lihuaclip.setScale(unit.scale);
				lihuaclip.name = `lihua${i}`;

				lihuaclip.x =  unit.pos[0];
				lihuaclip.y = unit.pos[1];
  
 
				view._lihua.addChild(lihuaclip);
				egret.Tween.get(lihuaclip).wait(unit.wait).call(()=>{
 
					egret.Tween.removeTweens(lihuaclip);
					if(view._lihua){
						view._lihua.addChild(lihuaclip);
						lihuaclip.playWithTime(3);
                        lihuaclip.setEndCallBack(()=>{
                            this._lihua.removeChild(lihuaclip);
                        },this);
					}
				},view);
			}
		}
        
        if(msg){
            this.showTip(LanguageManager.getlocal("acLotteryShowMsg",[msg.name,msg.gem.toString()]));
        }
	}

    public showTip(message:string):void
    {
        let tipContainer:BaseDisplayObjectContainer = this._tipCon;
        let msgText:BaseTextField= undefined;
        let tipBg:BaseBitmap=undefined;

        let txtLine:number=1;
        if(!tipContainer)
        {
            tipContainer = new BaseDisplayObjectContainer();
            tipBg=BaseBitmap.create("public_tipbg");
            tipBg.setPosition(-tipBg.width/2,-tipBg.height/2 - 20);
            tipBg.height = 200;
            tipBg.name="tipBg";
            tipContainer.addChild(tipBg);

            msgText=ComponentManager.getTextField(message,34,TextFieldConst.COLOR_LIGHT_YELLOW);
            msgText.textAlign=egret.HorizontalAlign.CENTER;
            msgText.name="msgText";
            msgText.lineSpacing=10;
            txtLine=msgText.numLines;
            tipContainer.addChild(msgText);
            tipContainer.setPosition(GameConfig.stageWidth/2,GameConfig.stageHeigth/2);
            this.addChild(tipContainer);
            this._tipCon=tipContainer;
        }
        else
        {
            tipBg=<BaseBitmap>tipContainer.getChildByName("tipBg");
            msgText = <BaseTextField>this._tipCon.getChildByName("msgText");
        }

        msgText.text=message;
        msgText.setPosition(tipBg.x+(tipBg.width-msgText.width)/2,tipBg.y+(tipBg.height-msgText.height)/2);
        egret.Tween.removeTweens(tipContainer);

        egret.Tween.get(this._tipCon).to({scaleX:1.1,scaleY:1.1},100).to({scaleX:1,scaleY:1},70).wait(2300*txtLine).to({alpha:0},200).call(function(tipContainer:BaseDisplayObjectContainer){
            if(tipContainer)
            {
                egret.Tween.removeTweens(tipContainer);
                if(this.contains(tipContainer))
                {
                    this.removeChild(tipContainer);
                }
                tipContainer.setScale(1);
                tipContainer.alpha=1;
            }
        }.bind(this,this._tipCon),this);
    }

    public tick(): boolean {

		let deltaT = this.acVo.acCountDown;
		let cdStrK = "acFanliReviewReward_acCD";
		if (this._acCDTxt && deltaT ) {
			this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [deltaT]);
			return true;
		}
		return false;
	}

    private initLoop():void
    {   
        if(!this._titleBar){
            this._titleBar = BaseBitmap.create("mainui_chatbg");
            this._titleBar.width = 640;
            this._titleBar.height = 32;
            this._titleBar.x = 0;
            this._titleBar.y = 222;
            this.addChildToContainer(this._titleBar);

            this._titleBarText = ComponentManager.getTextField("",24,TextFieldConst.COLOR_LIGHT_YELLOW);
            this._titleBarText.x = this._titleBar.x + this._titleBar.width / 2 - this._titleBarText.width/2;
            this._titleBarText.y = this._titleBar.y + this._titleBar.height / 2 - this._titleBarText.height/2;
            this.addChildToContainer(this._titleBarText);
        }

        if(this._loopList.length >0){
            this.nextLoop(0);
        } else {
            this._titleBarText.text = LanguageManager.getlocal("acLotteryLoopEmpty");
            this._titleBarText.x = this._titleBar.x + this._titleBar.width / 2 - this._titleBarText.width /2;
            this._titleBarText.y = this._titleBar.y + this._titleBar.height / 2 - this._titleBarText.height/2;
        }

    }
    //下一个跑马灯
    private nextLoop(index:number):void
    {
        if(index >= this._loopList.length){
            index = 0;
        }
        let str = this._loopList[index];
        this._titleBarText.text = str;
        this._titleBarText.x = this._titleBar.x + this._titleBar.width;
        this._titleBarText.y = this._titleBar.y + this._titleBar.height / 2 - this._titleBarText.height/2;
        let overX = this._titleBar.x - this._titleBarText.width;
        egret.Tween.removeTweens(this._titleBarText);
        egret.Tween.get(this._titleBarText).to({x:overX},10000)
        .call(()=>{
            this.nextLoop(index + 1);
        });
    }

  
    /**
     * 刷新红点相关
     */
    protected refreshRedDot() {
       
    }


    protected getRuleInfo(): string {
        return "acArcadeRuleInfo-" + this.getCnCode();
    }
    protected getRuleParam():string[]
	{
        let cfg = this.acVo.config;
		return [""+cfg.cost,""+cfg.addPrize,""+cfg.totalNum];
	}
    protected getBgName(): string {
        return "acarcadeview_bg-"+this.getUiCode();
    }

    protected getTitleBgName(): string {
        return "arcadegame_titlebg-" + this.getUiCode();
    }
    protected getTitleStr(): string {
        return null;
    }
    protected getResourceList(): string[] {
        let code = this.getUiCode();
        return super.getResourceList().concat([
            `acarcadeview_bg-${code}`,`acarcadeview_machine-${code}`,
            "acarcadeview_machine-flag", "acarcadeview_machine-flag2", "acarcadeview_machinemask-1", `acarcadeview_pullroddown-${code}`, `acarcadeview_pullrodup-${code}`,
            "acarcadeview_usebg-1","arcadegame_arrow", `arcadegame_bottombg-${code}`,
            "arcadegame_costbg", "arcadegame_title_1","arcadegame_topbg_1", "arcadegame_topbg_2",
            "arcadegame_btn1","arcadegame_btn2", "arcadegame_listbtn", "arcadegame_logbtn","arcadegame_logtxt", "arcadegame_rewardbtn",
            "arcadegame_rewardtxt",`arcadegame_titlebg-${code}`,"arcadegame_txt_gold","activity_fnt",
            "caise_0000", "lv_0000", "yanhua_0000",
          
        ]);
    }
    protected getRequestData():{requestType:string,requestData:any}
	{	
		return {requestType:NetRequestConst.REQUST_ACTIVITY_ARCADEINFO,requestData:{activeId: this.acVo.aidAndCode}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
        this.lampwinfos= data.data.data.lampwinfos ;
        this.totalgem= data.data.data.totalgem ;
        // this._loopList
        let lampwinfos = data.data.data.lampwinfos || [];
        let lampcwardinfos = data.data.data.lampcwardinfos || [];
        this.dealLampinfos(lampwinfos,lampcwardinfos);
         if(data.data.data.wuid){
            let wname = data.data.data.wname;
            let wgem = data.data.data.wgem;
            this._enterLiHuaData = {name: wname, gem: wgem};
        }
	}

    private dealLampinfos(lampwinfos:any,lampcwardinfos:any)
    {
        lampwinfos = lampwinfos || [];
        lampcwardinfos = lampcwardinfos || [];
        this._loopList = [];
        let loopStr = "";
        let msgObj = null;
        for(let i = 0; i < lampwinfos.length;i++){
            msgObj = lampwinfos[i];
            loopStr = LanguageManager.getlocal("acLotteryLoopMsg1",[msgObj[1],msgObj[2].toString()]);
            this._loopList.push(loopStr);
        }
        for(let i = 0; i < lampcwardinfos.length;i++){
            msgObj =lampcwardinfos[i];
            let randRewardStr = msgObj[3];
            let reward = GameData.formatRewardItem(randRewardStr)[0];
            loopStr = LanguageManager.getlocal("acLotteryLoopMsg2",[msgObj[1],reward.name,reward.num.toString()]);
            this._loopList.push(loopStr);
        }
    }

    protected getUiCode(): string {
        if (this.code == "2") {
            return "1";
        }
        return super.getUiCode();
    }
    protected getCnCode(): string {
        if (this.code == "2" ||this.code == "3" ) {
            return "1";
        }
        return super.getUiCode();
    }
    public dispose(): void {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_ARCADELOTTERY, this.lotteryHandle, this);

        this._activityTimerText = null;
        this._acCDTxt = null;
        this._ruleText = null;
        this._isPlayAni = false;

        this._gameBM = null;
        this._useBg = null;
        this._useTF  = null;
        this._machineContainer  = null;
        this._numBg  = null;
        this._numTF  = null;
        this._pullrodUp  = null;
        this._pullrodDown  = null;
        this._leftBtn  = null;
        this._rightBtn  = null;
        this._leftBtnTxt  = null;
        this._rightBtnTxt = null;
        this._gameCoin  = null;
        this._leftPoint  = null;
        this._rightPoint  = null;
        this.lampwinfos= null ;
        this.totalgem=0 ;
        this._cost_Centertxt = null;

        this._posList1 = [];
        this._containerList1 = [];
        this._posList2 = [];
        this._containerList2 = [];
        this._posList3 = [];
        this._containerList3 = [];
        this._machineContainer = null;
        this._rewardsPool = [];

        this._index1  = 0;
        this._slideIndex1  = 0;
        this._index2  = 0;
        this._slideIndex2  = 0;
        this._index3  = 0;
        this._slideIndex3  = 0;
        this._endPosY1  = 0;
        this._isStop1  = false;
        this._stopIndex1  = 0;
        this._endPosY2  = 0;
        this._isStop2 = false;
        this._stopIndex2  = 0;
        this._endPosY3  = 0;
        this._isStop3  = false;
        this._stopIndex3  = 0;
        this._lastId1  = null;
        this._lastId2  = null;
        this._lastId3  = null;
        this._offestId1  = 0;
        this._offestId2  = 0;
        this._offestId3  = 0;
        this._container1  = null;
        this._container2  = null;
        this._container3  = null;
        this._handlerData  = null;
        this._isBatch  = false;

        this._loopList  = [];
        this._titleBar  = null;
        this._titleBarText  = null;
        this._titleBg  = null;
        
        this._rewardsVoList = [];
        this._lihua = null;
        this._lihuaMsg = null;
        this._tipCon = null;
        this._tempObj = null;
        this._onceBtn = null;
        this._tenBtn = null;
        this._changeList = [];
        this._rRewards = null;
        this._oRewards = null;
        this._lihuaIndex = 0;
        if(this._dbdragon){
			this._dbdragon.stop();
			this._dbdragon.dispose();
			this._dbdragon = null;
		}
        this._choujiangEndNum = "";
        this._enterLiHuaData = null;
        
        super.dispose();
    }
}
