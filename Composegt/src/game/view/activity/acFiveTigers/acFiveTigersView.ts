
/**
 * 五虎活动
 * @author hyd
 */
class AcFiveTigersView extends AcCommonView {
    // 血条
    private bloodBar: ProgressBar;
    // 倒计时
    private acCdTxt: BaseTextField;
    // 攻击按钮
    private atkButton: BaseButton;
    private numBg: BaseBitmap;
    private numText: BaseTextField;
    // 剩余攻击次数
    private atkCountTxt: BaseTextField;
    private btnText: BaseTextField;
    private _bigBg: BaseDisplayObjectContainer;
    private _enemy:BaseLoadBitmap;
    private _isShake: boolean = false;
    private _isPlayAni: boolean = false;
    private _rewards = null;
    private _otherRewards = null;
    private _showTip = null;
    private _isWin = false;
    private _skinContainer: BaseDisplayObjectContainer = null;

    private _userItem: BaseLoadDragonBones = null;
    // 吕布容器
    private lvbuNode: BaseDisplayObjectContainer;
    // 吕布骨骼
    private boneNode: BaseLoadDragonBones;
    // 吕布非骨骼静态图
    private lvbuImg: BaseLoadBitmap;
    // 吕布的缩放值
    private readonly lvbuScale = 0.9;
    // 吕布的x
    private lvbuX = 0;
    // 吕布的y
    private lvbuY = 0;
    private _effectCount:number;

    public constructor() {
        super();
    }

    private get cfg(): Config.AcCfg.FiveTigersCfg {
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo(): AcFiveTigersVo {
        return <AcFiveTigersVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }
    // 标题背景名称
    protected getTitleBgName(): string {
        return this.getDefaultRes("fivetigers_titlebg", this.defcode);
    }
    protected getTitleStr(): string {
        return null;
    }

    private get activityId(): string {
        return this.aid + "-" + this.code;
    }

    protected initBg(): void {
        this._bigBg = new BaseDisplayObjectContainer();
        this._bigBg.height = 1136;
        this._bigBg.width = 640;
        this.addChild(this._bigBg);
        this._bigBg.touchEnabled = true;
        this._bigBg.y = GameConfig.stageHeigth - 1136;

        let bigBg = BaseLoadBitmap.create(this.getDefaultRes("fivetigers_bg", this.defcode));
        bigBg.height = 1156;
        bigBg.width = 660;
        bigBg.setPosition(-10,-10)

        this._bigBg.addChild(bigBg);

        this._enemy = BaseLoadBitmap.create(this.getDefaultRes("fivetigers_enemy",this.defcode));
        this._enemy.height = 384;
        this._enemy.width = 927;
        this._enemy.anchorOffsetX = this._enemy.width/2;
        this._enemy.anchorOffsetY = this._enemy.height/2;
        this._enemy.setPosition(this._bigBg.x + this._bigBg.width/2,this._bigBg.height - 600)
        
        this._bigBg.addChild(this._enemy);
    }

    private get defcode() {
        let defcode = this.code;
        return defcode;
    }
    public initView() {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETFIVETIGERBOXREWARD, this.receiveBoxHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETFIVETIGERREWARD, this.getRewardHandler, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_FIVETIGERS_REFRESHVO, this.refreshData, this);

        let titletxt = BaseBitmap.create(this.getDefaultRes("fivetigers_titlename",this.defcode));
        titletxt.x = GameConfig.stageWidth / 2 - titletxt.width / 2;
        titletxt.y = 5;
        this.addChild(titletxt);


        this.lvbuNode = new BaseDisplayObjectContainer();
        this.lvbuNode.width = 640;
        this.lvbuNode.height = 482;
        this.lvbuNode.anchorOffsetX = 320;
        this.lvbuNode.setScale(this.lvbuScale);
        this.lvbuNode.x = 320;

        this.lvbuNode.y = GameConfig.stageHeigth - this.lvbuNode.height * this.lvbuScale;
        this.lvbuX = this.lvbuNode.x;
        this.lvbuY = this.lvbuNode.y;
        this.addChild(this.lvbuNode);
        // 五虎
        if (App.DeviceUtil.CheckWebglRenderMode() && App.CommonUtil.check_dragon()) {
            this.boneNode = App.DragonBonesUtil.getLoadDragonBones(Config.ServantskinCfg.getServantSkinItemById(this.cfg.servantSkinID).bone);
            this.boneNode.x = 320;
            this.boneNode.y = this.lvbuNode.height - 60;
            this.lvbuNode.addChild(this.boneNode);
            this.boneNode.setScale(0.65);

            let maskShape = BaseBitmap.create("public_9v_bg01");
            maskShape.width = 640;
            maskShape.height = 800;
            maskShape.x = this.lvbuNode.width / 2 - maskShape.width / 2;
            maskShape.y = this.lvbuNode.height - maskShape.height;
            this.lvbuNode.addChild(maskShape);

            this.boneNode.mask = maskShape;
        } else {
            this.lvbuImg = BaseLoadBitmap.create(Config.ServantskinCfg.getServantSkinItemById(this.cfg.servantSkinID).body);
            this.lvbuImg.width = 640;
            this.lvbuImg.height = 482;
            this.lvbuImg.setScale(0.8);
            this.lvbuImg.x = 320 - this.lvbuImg.width * 0.8 / 2;
            this.lvbuImg.y = this.lvbuNode.height - this.lvbuImg.height * 0.8 - 70;

            this.lvbuNode.addChild(this.lvbuImg);
        }

        if (App.DeviceUtil.CheckWebglRenderMode() && App.CommonUtil.check_dragon()) {
            this._userItem = App.DragonBonesUtil.getLoadDragonBones("baimazhizhan");
            this._userItem.x = 0
            this._userItem.y = GameConfig.stageHeigth + 100;
            this.addChild(this._userItem);
        }

        //活动规则背景图片
        let acruleTxtBg: BaseBitmap = BaseBitmap.create(this.getDefaultRes("fivetigers_descbg",this.defcode));
        acruleTxtBg.y = this.titleBg.height ;
        this.addChild(acruleTxtBg);
        //活动时间   
        let actimeText = ComponentManager.getTextField(this.vo.acTimeAndHour, 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        actimeText.x = 10;
        actimeText.y = acruleTxtBg.y + 5;
        this.addChild(actimeText);
        
        //剩余时间
        this.acCdTxt = ComponentManager.getTextField(this.vo.acCountDown, 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.acCdTxt.x = GameConfig.stageWidth - 10 - this.acCdTxt.width;
        this.acCdTxt.y = actimeText.y;
        this.addChild(this.acCdTxt);


        //活动规则文本
        let acruleTxt: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acFiveTigers_desc"), [String(this.cfg.cost), "1", String(this.cfg.exchangeNum)]), 18);
        acruleTxt.width = 620;
        acruleTxt.lineSpacing = 5;
        acruleTxt.x = actimeText.x;
        acruleTxt.y = actimeText.y + actimeText.height + 5;
        this.addChild(acruleTxt);

        this.numBg = BaseBitmap.create(this.getDefaultRes("fivetigers_progresshead",this.defcode));

        // 血条
        this.bloodBar = ComponentManager.getProgressBar("fivetigers_progresscontent","fivetigers_progressbg", 500);
        this.bloodBar.x = GameConfig.stageWidth / 2 - this.bloodBar.width / 2 + this.numBg.width/2 - 10;
        this.bloodBar.y = acruleTxtBg.y + acruleTxtBg.height + 30;
        this.bloodBar.y = acruleTxtBg.y + acruleTxtBg.height + 30
        this.addChild(this.bloodBar);

        //已经攻击次数
        this.numBg.x = this.bloodBar.x - this.numBg.width + 15;
        this.addChild(this.numBg);
        this.numBg.y = this.bloodBar.y + this.bloodBar.height / 2 - this.numBg.height / 2-2;


        this.numText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acFiveTigers_progresstitle",this.defcode),[String(this.vo.lotterysnum)]), 18, 0xffedb4);
        this.numText.textAlign = egret.HorizontalAlign.CENTER;
        this.numText.lineSpacing = 7;
        this.numText.x = this.numBg.x + this.numBg.width / 2 - this.numText.width / 2;
        this.numText.y = this.numBg.y + this.numBg.height/2 - this.numText.height/2;
        
        this.addChild(this.numText);

        this.initBox();

        this._skinContainer = new BaseDisplayObjectContainer();
        this.addChild(this._skinContainer);


        // 底部背景
        let buttomBg: BaseBitmap = BaseBitmap.create("fivetigers_bottombg");
        buttomBg.y = GameConfig.stageHeigth - buttomBg.height;
        this.addChild(buttomBg);

        // 攻击
        this.atkButton = ComponentManager.getButton("acredlotuswarrior_btn-1", null, this.atkClick, this);
        this.atkButton.y = buttomBg.y + buttomBg.height -this.atkButton.height- 27;
        this.addChild(this.atkButton);


        this.atkButton.x = buttomBg.x + buttomBg.width / 2 - this.atkButton.width / 2;
        this.btnText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acFiveTigers_btn")), 30, TextFieldConst.COLOR_BROWN);
        this.btnText.x = this.atkButton.x + this.atkButton.width / 2 - this.btnText.width / 2;
        this.btnText.y = this.atkButton.y + this.atkButton.height / 2 - this.btnText.height / 2;
        this.addChild(this.btnText);
        //可攻击次数
        this.atkCountTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acFiveTigers_atkvalue"), [String(this.vo.lotterynum)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.atkCountTxt.x = this.atkButton.x + this.atkButton.width / 2 - this.atkCountTxt.width / 2;
        this.atkCountTxt.y = this.btnText.y + this.btnText.height + 27;
        this.addChild(this.atkCountTxt);

        let btnBg:BaseBitmap=BaseBitmap.create("mainui_bottombtnbg");
        btnBg.setPosition(GameConfig.stageWidth - btnBg.width - 10,GameConfig.stageHeigth - btnBg.height - 100)
        this.addChild(btnBg);

        let infoBtn = ComponentManager.getButton("chasebandit_showbtn-1", null, this.infoBtnListener, this);
        infoBtn.x = btnBg.x+btnBg.width/2 - infoBtn.width/2;
        infoBtn.y = btnBg.y+btnBg.height/2 - infoBtn.height/2;
        this.addChild(infoBtn);

        let infoTxt = BaseBitmap.create("moonnight_showbtntxt-1");
        infoTxt.x = infoBtn.x + infoBtn.width / 2 - infoTxt.width / 2 + 2;
        infoTxt.y = infoBtn.y + 50;
        this.addChild(infoTxt);

        this.refreshData();
        this.checkIsWin();
        this.randomSay();


        if (this.vo.lotterysnum < this.cfg.exchangeNum) {
            ViewController.getInstance().openView(ViewConst.POPUP.ACFIVETIGERSREPORTVIEW, { aid: this.aid, code: this.code });
        }

    }
    
    private attackHandle(): void {
        let moveTime1: number = 150;
        let moveTime2: number = 150;
        let scaleTo: number = 0.3;

        let moveX = this.lvbuNode.x + this.lvbuNode.width / 2 - this.lvbuNode.width * 0.85 / 2;
        let moveY = GameConfig.stageHeigth - 600;
        let moveTo: egret.Point = egret.Point.create(moveX, moveY);
        egret.Tween.get(this.lvbuNode)
            .to({ y: moveTo.y, scaleX: scaleTo, scaleY: scaleTo, }, moveTime1,egret.Ease.backIn)//elasticInOut
            .call(() => {
                this.showCode7Ani();
            }, this)
            .wait(50)
            .call(this.playShake, this)
            .to({ x: this.lvbuX, y: this.lvbuY, scaleX: this.lvbuScale, scaleY: this.lvbuScale }, moveTime2,egret.Ease.sineOut)
            .wait(500)
            .call(this.stopShake, this)
            .call(()=>{
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
                    "rewards": this._rewards,
                    "otherRewards": this._otherRewards,
                    "isPlayAni": true,
                    showTip: this._showTip
                });
            },this)


    }

    private randomSay() {
        if (this.vo.lotterysnum < this.cfg.exchangeNum) {
            let self = this;
            let rndSay = Math.floor(Math.random() * 5) + 1;
            let rndSayBg: BaseBitmap = BaseBitmap.create("childview_talkbg");
            let txtCn = this.getDefaultCn("acFiveTigers_talk"+rndSay,this.defcode)
            let rndSayTxt: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(txtCn), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            rndSayTxt.width = 220;
            rndSayBg.width = rndSayTxt.width + 30;
            rndSayBg.height = rndSayTxt.height + 30;
            rndSayBg.x = 140 - rndSayBg.width / 2;
            rndSayBg.y = GameConfig.stageHeigth - 420 - rndSayBg.height / 2;
            self.addChild(rndSayBg);
            rndSayTxt.x = rndSayBg.x + rndSayBg.scaleX * rndSayBg.width / 2 - rndSayTxt.width / 2;
            rndSayTxt.y = rndSayBg.y + 20;
            self.addChild(rndSayTxt);
            egret.Tween.get(rndSayBg)
                .wait(2000)
                .call(() => {
                    rndSayBg.visible = false;
                    rndSayTxt.visible = false;
                })
                .wait(5000)
                .call(() => {
                    self.randomSay();
                    if (rndSayBg) {
                        self.removeChild(rndSayBg);
                    }
                    if (rndSayTxt) {
                        self.removeChild(rndSayTxt);
                    }
                });
        }
    }

    protected getSoundBgName(): string {
        return SoundConst.MUSIC_ALLIANCEBOSSBATTLE;
    }


    private checkIsWin() {
        let isWin = false;
        if (this.vo.lotterysnum >= this.cfg.exchangeNum) {
            isWin = true;
        }

        if (!this._isWin && isWin) {
            this._isWin = true;

            this.atkButton.setEnable(false);
            this.btnText.text = LanguageManager.getlocal(this.getDefaultCn("acFiveTigers_btn"))
            this.btnText.x = this.atkButton.x + this.atkButton.width / 2 - this.btnText.width / 2;
            this.btnText.y = this.atkButton.y + this.atkButton.height / 2 - this.btnText.height / 2;
            App.DisplayUtil.changeToGray(this.btnText);

            this.atkCountTxt.visible = false;

            this._enemy.visible = false;

        }
    }

    private playShake() {
        if (this._isShake) {
            return;
        }


        this._isShake = true;
        let posX = this.x;
        let posY = this.y;
        egret.Tween.get(this._bigBg, { loop: true }).call(() => {

            let randomX = 10 * Math.random() - 5;
            let randomY = 10 * Math.random() - 5;
            this.x = posX + randomX;
            this.y = posY + randomY;

        }, this).wait(20);
    }
    private stopShake() {
        this._isShake = false;
        this.x = 0;
        this.y = 0;
        egret.Tween.removeTweens(this._bigBg);
    }


    /**
	 * 宝箱的返回数据
	 */
    private receiveBoxHandle(event: egret.Event) {
        let ret = event.data.ret
        let data = event.data.data.data;
        if (ret) {
            let rewards = data.rewards;
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "isPlayAni": true });
            this.refreshData();
        }

    }

    //进度条物品箱
    private initBox() {
        let max = this.vo.maxHelmetNeedNum();
        let helmetNum = this.cfg.progress;
        for (let i = 0; i < helmetNum.length; i++) {
            let helmetObj = helmetNum[i];

            let str = '';
            let flagObj = new BaseDisplayObjectContainer();
            flagObj.width = 58;
            flagObj.height = 58;
            flagObj.name = "flag" + i;

            flagObj.x = this.bloodBar.x + this.bloodBar.width * (helmetObj.needNum / max) - flagObj.width / 2 - 5;
            flagObj.y = this.bloodBar.y + this.bloodBar.height / 2 - flagObj.height / 2 + 5;
            this.addChild(flagObj);

            let flagBg = BaseBitmap.create("acredlotuswarrior_flagbg-1");
            flagBg.x = 0;
            flagBg.y = 0;
            flagBg.name = "flagBg";
            flagObj.addChild(flagBg);
            flagBg.visible = false;

            flagObj["light"] = BaseBitmap.create("dailytask_box_light");
            flagObj["light"].anchorOffsetX = flagObj["light"].width / 2;
            flagObj["light"].anchorOffsetY = flagObj["light"].height / 2;
            flagObj["light"].x = flagObj.width / 2;
            flagObj["light"].y = flagObj.height / 2 - 5;

            flagObj.addChild(flagObj["light"]);

            flagObj["flag"] = BaseBitmap.create(this.getDefaultRes("fivetigers_flag1", this.defcode));
            flagObj["flag"].x = flagObj.width / 2 - flagObj["flag"].width / 2;
            flagObj["flag"].y = flagObj.height / 2 - flagObj["flag"].height / 2;
            flagObj["flag"].name = "flag";

            flagObj["flag"].scaleX = 0.8;
            flagObj["flag"].scaleY = 0.8;
            flagObj["flag"].x = flagObj.width / 2 - flagObj["flag"].width * 0.8 / 2;
            flagObj["flag"].y = flagObj.height / 2 - flagObj["flag"].height * 0.8 / 2 - 10;

            

            flagObj.addChild(flagObj["flag"]);
            flagObj["flagbreak"] = BaseBitmap.create(this.getDefaultRes("fivetigers_flagbreak", this.defcode));
            flagObj["flagbreak"].x = flagObj.width / 2 - flagObj["flagbreak"].width / 2;
            flagObj["flagbreak"].y = flagObj.height / 2 - flagObj["flagbreak"].height / 2;
            flagObj["flagbreak"].name = "flagbreak";
            flagObj.addChild(flagObj["flagbreak"]);


            flagObj["flagbreak"].scaleX = 0.8;
            flagObj["flagbreak"].scaleY = 0.8;
            flagObj["flagbreak"].x = flagObj.width / 2 - flagObj["flagbreak"].width * 0.8 / 2;
            flagObj["flagbreak"].y = flagObj.height / 2 - flagObj["flagbreak"].height * 0.8 / 2 - 10;

            

            if (this.vo.checkBoxCollected(i)) {
                //已经领取了
                flagObj["light"].visible = false;
                egret.Tween.removeTweens(flagObj["light"]);
                flagObj["flag"].visible = false;
                flagObj["flagbreak"].visible = true;
            } else {
                if (this.vo.lotterysnum >= helmetObj.needNum) {
                    flagObj["light"].visible = true;
                    flagObj["flag"].setRes(this.getDefaultRes("fivetigers_flag2", this.defcode))
                    egret.Tween.get(flagObj["light"], { loop: true }).to({ rotation: flagObj["light"].rotation + 360 }, 10000);
                } else {
                    flagObj["flag"].setRes(this.getDefaultRes("fivetigers_flag1", this.defcode))
                    egret.Tween.removeTweens(flagObj["light"]);
                    flagObj["light"].visible = false;
                }
                flagObj["flag"].visible = true
                flagObj["flagbreak"].visible = false;
            }

            let curidx = i;
            flagObj.addTouchTap(() => {
                if (!this.vo.isInActivity()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                    return;
                }

                let voNum = this.vo.lotterysnum;
                let isRevice = this.vo.checkBoxCollected(curidx);
                let needNum = helmetObj.needNum;

                if (needNum <= voNum) {
                    if (!isRevice) {
                        NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETFIVETIGERBOXREWARD, { activeId: this.activityId, gid: curidx + 1 });
                        return;
                    }
                }

                let rewardList = helmetObj.getReward;
                let itemcfg = {
                    needNum: helmetObj.needNum,
                    getReward: helmetObj.getReward
                };
                ViewController.getInstance().openView(ViewConst.POPUP.ACFIVETIGERSREWARDINFOPOPUPVIEW, { "code": this.code, "aid": this.aid, "itemCfg": itemcfg });
            }, this);
        }
    }

    private infoBtnListener() {
        ViewController.getInstance().openView(ViewConst.COMMON.SERVANTSKINCHANGEVIEW, { servantId: this.cfg.servantID, skinId: this.cfg.servantSkinID, isDisplay: true });

    }

    private tick() {
        this.acCdTxt.text = this.vo.acCountDown;
        this.acCdTxt.x = GameConfig.stageWidth - 10 - this.acCdTxt.width;

        // if(this.vo.acCountDown[this.vo.acCountDown.length-2] == "0"){
        //     this.attackHandle();
        // }

    }

    // 刷新数据
    private refreshData() {
        let helmetNum = this.cfg.progress;
        this.atkCountTxt.text = LanguageManager.getlocal(this.getDefaultCn("acFiveTigers_atkvalue"), [String(this.vo.lotterynum)]);
        if (this.vo.lotterynum >= 10) {
            this.btnText.text = LanguageManager.getlocal(this.getDefaultCn("acFiveTigers_btnten"));
        } else {
            this.btnText.text = LanguageManager.getlocal(this.getDefaultCn("acFiveTigers_btn"));
        }
        this.btnText.x = this.atkButton.x + this.atkButton.width / 2 - this.btnText.width / 2;
        this.atkCountTxt.x = this.atkButton.x + this.atkButton.width / 2 - this.atkCountTxt.width / 2;
        

        this.bloodBar.setPercentage(this.vo.lotterysnum / this.cfg.exchangeNum);
        for (let i = 0; i < helmetNum.length; i++) {
            let flagObj = this.getChildByName("flag" + i);

            if (this.vo.checkBoxCollected(i)) {
                flagObj["light"].visible = false;
                egret.Tween.removeTweens(flagObj["light"]);
                flagObj["flag"].visible = false;
                flagObj["flagbreak"].visible = true;
            } else {
                if (this.vo.lotterysnum >= helmetNum[i].needNum) {
                    flagObj["flag"].setRes(this.getDefaultRes("fivetigers_flag2", this.defcode))
                    flagObj["light"].visible = true;
                    egret.Tween.get(flagObj["light"], { loop: true }).to({ rotation: flagObj["light"].rotation + 360 }, 10000);
                } else {
                    flagObj["flag"].setRes(this.getDefaultRes("fivetigers_flag1", this.defcode))
                    egret.Tween.removeTweens(flagObj["light"]);
                    flagObj["light"].visible = false;
                }
                flagObj["flag"].visible = true;
                flagObj["flagbreak"].visible = false;
            }
        }

        this.numText.text = LanguageManager.getlocal(this.getDefaultCn("acFiveTigers_progresstitle",this.defcode),[String(this.vo.lotterysnum)]);
        this.numText.x = this.numBg.x + this.numBg.width / 2 - this.numText.width / 2;

    }

    private atkClick() {
        if (this._isPlayAni) {
            return;
        }

        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        //已经胜利了
        if (this.vo.lotterysnum >= this.cfg.exchangeNum) {
            App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acFiveTigers_win")));
            return;
        }
        if (this.vo.lotterynum <= 0) {

            let message = LanguageManager.getlocal(this.getDefaultCn("acFiveTigers_countnotenough"), ["" + this.cfg.cost]);
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: message,
                callback: () => {
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                },
                handler: this,
                needCancel: true
            });
            return;
        }
        this._isPlayAni = true;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETFIVETIGERREWARD, { activeId: this.aid + "-" + this.code});
    }
    // 获得奖励
    private getRewardHandler(event: egret.Event) {
        if (event.data.data.cmd === NetRequestConst.REQUEST_ACTIVITY2S_GETFIVETIGERREWARD) {
            if (event.data.data.ret === 0) {
                let data = event.data.data.data;
                this._rewards = data.rewards;
                this._otherRewards = data.otherrewards;
                this._showTip = null;
                this.attackHandle();
                this.checkIsWin();

            } else {
                App.CommonUtil.showTip(event.data.data.ret);
            }
        }
    }
    private showCode7Ani() {
        egret.Tween.get(this._enemy).to({alpha:0},800,egret.Ease.sineIn);
        if(this._userItem){
            this._userItem.playDragonMovie("attack", 1);
            this._effectCount = 1;
            // this._userItem.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, () => {
            //     if(this._effectCount) return;
                
            // }, this);
        }     
        setTimeout(() => {
            egret.Tween.get(this._enemy).to({alpha:1},800,egret.Ease.sineIn)
            .call(()=>{
                this._isPlayAni = false;
            })
            ;
            if(this._userItem){
                this._userItem.playDragonMovie('appear', 1);
                this._effectCount = 0;
            }
        }, 2000);





    }


    protected getResourceList(): string[] {
        let resTab = [];
        resTab = [
            "fivetigers_bottombg",
            "fivetigers_progresscontent",
            "fivetigers_progressbg",
            "acredlotuswarrior_sermask",
            "chasebandit_showbtn-1",
            "moonnight_showbtntxt-1",
            "dailytask_box_light",
            "acredlotuswarrior_flagbg-1",
            "acredlotuswarrior_btn-1",
            "childview_talkbg"
        ]
        

        return super.getResourceList().concat([
            this.getDefaultRes("fivetigers_titlename", this.defcode),
            this.getDefaultRes("fivetigers_titlebg", this.defcode),
            this.getDefaultRes("fivetigers_progresshead", this.defcode),
            this.getDefaultRes("fivetigers_descbg", this.defcode),
            this.getDefaultRes("fivetigers_enemy", this.defcode),
            this.getDefaultRes("fivetigers_flag1", this.defcode),
            this.getDefaultRes("fivetigers_flag2", this.defcode),
            this.getDefaultRes("fivetigers_flagbreak", this.defcode),


        ]).concat(resTab);


    }
    public hide(): void {
        if (!this._isPlayAni) {
            super.hide();
        }
    }

    public dispose(): void {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETFIVETIGERBOXREWARD, this.receiveBoxHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETFIVETIGERREWARD, this.getRewardHandler, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FIVETIGERS_REFRESHVO, this.refreshData, this);

        this.bloodBar = null;
        this.acCdTxt = null;
        this.atkButton = null;
        this.numBg = null;
        this.numText = null;
        this.atkCountTxt = null;
        this.btnText = null;
        this._bigBg = null;
        this._isShake = false;
        this._isPlayAni = false;
        this._rewards = null;
        this._otherRewards = null;
        this._showTip = null;
        this._isWin = false;
        this._skinContainer = null;
        this._userItem = null;
        // 吕布容器
        if (this.lvbuNode) {
            egret.Tween.removeTweens(this.lvbuNode);
        }
        this.lvbuNode = null;
        this.boneNode = null;
        this.lvbuImg = null;
        if(this._enemy){
            egret.Tween.removeTweens(this._enemy);
        }
        this._enemy = null;
        // 吕布的x
        this.lvbuX = 0;
        // 吕布的y
        this.lvbuY = 0;
        this._effectCount = 0;
        super.dispose();
    }
}