/**
 * 追缴敌寇
 * @author hyd
 * @date 2019/9/23
 */
class AcChaseBanditView extends AcCommonView {
    // 血条
    private bloodBar: ProgressBar;
    // 血量百分比
    private bloodTxt: BaseTextField;
    // 剩余攻击次数
    private atkCountTxt: BaseTextField;
    // 倒计时
    private countdownTxt: BaseTextField;
    // 跑马灯数据
    private lampInfo: Array<any>;
    // 攻击按钮
    private atkButton: BaseButton;
    // 吕布容器
    private lvbuNode: BaseDisplayObjectContainer;
    // 吕布骨骼
    private boneNode: BaseLoadDragonBones;
    // 吕布非骨骼静态图
    private lvbuImg: BaseLoadBitmap;
    // 吕布的缩放值
    private readonly lvbuScale = 1;
    // 吕布的x
    private lvbuX = 0;
    // 吕布的y
    private lvbuY = 0;
    // 已击败图片
    private lvbuDie: BaseBitmap;
    // 受击特效
    private beAttackClip: CustomMovieClip;
    // 兑换
    private exchangeButton: BaseButton;

    private wanjia: BaseDisplayObjectContainer;
    private readonly wanjiaScale = 1;
    private wanjiaX = 0;
    private wanjiaY = 0;

    private atkBtnText: BaseTextField = null;

    public constructor() {
        super();
    }
    public static AID: string = null;
    public static CODE: string = null;

    private get cfg(): Config.AcCfg.ChaseBanditCfg {
        return Config.AcCfg.getCfgByActivityIdAndCode(AcChaseBanditView.AID, AcChaseBanditView.CODE);
    }

    private get vo(): AcChaseBanditVo {
        return <AcChaseBanditVo>Api.acVoApi.getActivityVoByAidAndCode(AcChaseBanditView.AID, AcChaseBanditView.CODE);
    }

    private get acTivityId(): string {
        return `${AcChaseBanditView.AID}-${AcChaseBanditView.CODE}`;
    }

    protected initBg(): void {

        let bigBg = BaseLoadBitmap.create("chasebandit_bg");
        bigBg.width = GameConfig.stageWidth;
        bigBg.height = GameConfig.stageHeigth;
        bigBg.touchEnabled = true;
        this.addChild(bigBg);

    }

    // protected getRequestData(): { requestType: string, requestData: any } {
    //     return { requestType: NetRequestConst.REQUEST_ACTIVITY_TIGERTRAPPASSINFO, requestData: { activeId: this.aid + "-" + this.code } };
    // }
    public initView() {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHASEBANDIT_ATKBOSS), this.getRewardHandler, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshData, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHASEBANDIT_FRESH_ITEM, this.refreshData, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_CHASEBANDIT_BOXREWARD, this.weathRewardHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_CHASEBANDIT_TASKREWARD, this.refreshRedDot, this);


        AcChaseBanditView.AID = this.aid;
        AcChaseBanditView.CODE = this.code;
        this.width = GameConfig.stageWidth;

        let titletxt = BaseBitmap.create(`chasebandit_title-${this.code}`);
        titletxt.x = GameConfig.stageWidth / 2 - titletxt.width / 2;
        titletxt.y = 5;
        this.addChild(titletxt);

        this.lvbuNode = new BaseDisplayObjectContainer();
        this.lvbuNode.x = GameConfig.stageWidth / 2 + 20;
        this.lvbuNode.setScale(this.lvbuScale);
        this.addChild(this.lvbuNode);

        // 贼寇
        this.lvbuImg = BaseLoadBitmap.create("chasebandit_bandit-" + this.code);
        this.lvbuImg.x = -200;
        this.lvbuImg.y = -200;
        this.lvbuNode.addChild(this.lvbuImg);

        // let maskShape = BaseBitmap.create("tigertrappass_lvbumask");
        // maskShape.scaleY = 1.3;
        // maskShape.x = -this.lvbuNode.x;
        // maskShape.y = 100;
        // this.lvbuNode.addChild(maskShape);

        this.lvbuDie = BaseBitmap.create("tigertrappass_lvbu_die");
        this.lvbuDie.x = -this.lvbuDie.width / 2 - 40;
        this.lvbuDie.y = -this.lvbuDie.height / 2;
        //this.lvbuDie.visible = false;
        this.lvbuNode.addChild(this.lvbuDie);


        //活动规则背景图片
        let acruleTxtBg: BaseBitmap = BaseBitmap.create("chasebandit_topbg");
        acruleTxtBg.y = 75;
        this.addChild(acruleTxtBg);
        //活动规则文本
        let acruleTxt: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acChaseBanditRuleInView", [String(this.cfg.cost)]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON);
        acruleTxt.width = acruleTxtBg.width - 20;
        acruleTxt.x = acruleTxtBg.x + 10;
        acruleTxt.y = acruleTxtBg.y + acruleTxtBg.height / 2 - 22;
        this.addChild(acruleTxt);

        //活动日期        
        let tip1Text = ComponentManager.getTextField(LanguageManager.getlocal("acChaseBanditTopDate", [this.vo.acTimeAndHour]), 18);
        this.addChild(tip1Text);
        tip1Text.x = acruleTxtBg.x + 15;
        tip1Text.y = acruleTxtBg.y + 7;
        //剩余时间

        let deltaT = this.acVo.et - GameData.serverTime;
        let timeStr = "";
        if (deltaT > 0) {
            timeStr = LanguageManager.getlocal("acChaseBanditTopTime", [App.DateUtil.getFormatBySecond(deltaT, 8)]);

        } else {
            timeStr = LanguageManager.getlocal("acChaseBanditTopTime", [LanguageManager.getlocal("acPunishEnd")]);
        }
        let tip2Text = ComponentManager.getTextField(timeStr, 18);
        this.addChild(tip2Text);
        tip2Text.x = GameConfig.stageWidth - tip2Text.width - 15;
        tip2Text.y = acruleTxtBg.y + 7;
        this.countdownTxt = tip2Text;
        if (!this.vo.isInActivity()) {
            this.countdownTxt.text = LanguageManager.getlocal("acChaseBanditTopTime", [LanguageManager.getlocal('acPunishEnd')]);
        }


        // 血条
        this.bloodBar = ComponentManager.getProgressBar("chasebandit_progress_content", "chasebandit_progress_bg", 500);
        this.bloodBar.x = GameConfig.stageWidth / 2 - this.bloodBar.width / 2 - 5;
        this.bloodBar.y = acruleTxtBg.y + acruleTxtBg.height - 7;
        this.addChild(this.bloodBar);
        for (var i = 0; i < 9; i++) {
            let bloodSplite: BaseBitmap = BaseBitmap.create("chasebandit_blood_splite");
            bloodSplite.x = 24 / 2 + (i + 1) * (this.bloodBar.width - 24) / 10;
            this.bloodBar.addChild(bloodSplite);
        }
        let bloodTitle = ComponentManager.getTextField(LanguageManager.getlocal("acChaseBandit_blood_title"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE)
        this.bloodBar.addChild(bloodTitle);
        bloodTitle.width = 100;
        bloodTitle.textAlign = egret.HorizontalAlign.CENTER;
        bloodTitle.anchorOffsetX = bloodTitle.width / 2;
        bloodTitle.setPosition(45, this.bloodBar.height / 2 - bloodTitle.height / 2 - 10);

        this.bloodTxt = ComponentManager.getTextField("100", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        this.bloodTxt.width = 100;
        this.bloodTxt.textAlign = egret.HorizontalAlign.CENTER;
        this.bloodTxt.x = bloodTitle.x - this.bloodTxt.width / 2;
        this.bloodTxt.y = bloodTitle.y + 22;
        this.bloodBar.addChild(this.bloodTxt);

        // 宝箱
        for (var i = 0; i < this.cfg.lotteryNum.length; i++) {
            let tmprcfg = this.cfg.lotteryNum[i];


            let rStatus = 1;
            if (this.vo.ainfo.stageinfo[i + 1]) {
                rStatus = 3; // 已领取
            } else if (this.vo.ainfo.lotterynum >= tmprcfg.needNum) {
                rStatus = 2;
            }
            let imgres = "dailytask_box1_";
            let bgres = "chasebandit_progress_boxbg1";
            if (i == this.cfg.lotteryNum.length - 1) {
                imgres = "dailytask_box2_";
                bgres = "chasebandit_progress_boxbg2";
            }
            let boxBg = BaseBitmap.create(bgres);
            let boxImg = BaseBitmap.create(imgres + String(rStatus));
            boxBg.anchorOffsetX = 60 / 2;
            boxBg.anchorOffsetY = 63 / 2;
            boxImg.anchorOffsetX = 60 / 2;
            boxImg.anchorOffsetY = 64 / 2;

            boxBg.x = this.bloodBar.x + this.bloodBar.width * (0.15 + 0.85 * (tmprcfg.needNum / this.cfg.getMaxBoxNeedNum())) - 10;
            boxBg.y = this.bloodBar.y + 43;
            boxImg.x = this.bloodBar.x + this.bloodBar.width * (0.15 + 0.85 * (tmprcfg.needNum / this.cfg.getMaxBoxNeedNum())) - 11;
            boxImg.y = this.bloodBar.y + 36;
            boxImg.setScale(0.8);
            boxImg.name = "boxImg" + i;

            let lightImg = BaseLoadBitmap.create("dailytask_box_light");
            lightImg.anchorOffsetX = 80 / 2;
            lightImg.anchorOffsetY = 80 / 2;
            lightImg.x = boxImg.x + 5;
            lightImg.name = "lightImg" + i;
            lightImg.y = boxImg.y;
            lightImg.visible = false;
            this.addChild(boxBg);
            this.addChild(lightImg);
            this.addChild(boxImg);
            boxImg.addTouchTap(this.boxClick, this, [i]);

        }

        // 查看吕布
        let skinLookBg: BaseBitmap = BaseBitmap.create(`chasebandit_lookbg-${this.code}`);
        skinLookBg.x = this.x + GameConfig.stageWidth / 2 - skinLookBg.width / 2 - 10;
        this.addChild(skinLookBg);
        let skinLookName: BaseBitmap = BaseBitmap.create(`chasebandit_lookname-${this.code}`);
        skinLookName.x = skinLookBg.x + skinLookBg.width / 2 - skinLookName.width / 2;
        this.addChild(skinLookName);

        // 大火苗
        let upgradeClip1 = ComponentManager.getCustomMovieClip("tigertrappass_smoke", 10, 1000 / 15);
        upgradeClip1.y = GameConfig.stageHeigth - 230;
        this.addChild(upgradeClip1);
        upgradeClip1.playWithTime();
        let upgradeClip2 = ComponentManager.getCustomMovieClip("tigertrappass_smoke", 10, 1000 / 15);
        upgradeClip2.scaleX = -1;
        upgradeClip2.x = GameConfig.stageWidth;
        upgradeClip2.y = GameConfig.stageHeigth - 230;
        this.addChild(upgradeClip2);
        upgradeClip2.playWithTime();

        // 玩家形象
        let userContainer = Api.playerVoApi.getPlayerPortrait(Number(this.cfg.superp), Api.playerVoApi.getPlayePicId());
        userContainer.scaleX = this.wanjiaScale;
        userContainer.scaleY = this.wanjiaScale;
        // userContainer.x = GameConfig.stageWidth/2 - userContainer.width * userContainer.scaleX /2;
        if (userContainer.width > 700) {
            userContainer.x = this.width / 2 - 130;
        } else {
            userContainer.x = this.width / 2 - userContainer.width / 2 * userContainer.scaleX - 10;
        }
        userContainer.y = GameConfig.stageHeigth - 360;
        this.wanjiaX = userContainer.x;
        this.wanjiaY = userContainer.y;
        this.addChild(userContainer);
        this.wanjia = userContainer;
        userContainer.mask = new egret.Rectangle(0, 0, GameConfig.stageWidth, 300);;

        this.lvbuNode.y = this.bloodBar.y + (userContainer.y - this.bloodBar.y) / 2;
        this.lvbuX = this.lvbuNode.x;
        this.lvbuY = this.lvbuNode.y;
        skinLookBg.y = this.lvbuNode.y + 100;
        skinLookName.y = skinLookBg.y + skinLookBg.height / 2 - skinLookName.height / 2 + 15;

        // 小火星
        let starBoneNode = App.DragonBonesUtil.getLoadDragonBones("actigertrappass");
        starBoneNode.x = GameConfig.stageWidth / 2
        starBoneNode.y = GameConfig.stageHeigth;
        this.addChild(starBoneNode);

        // 底部背景
        let buttomBg: BaseBitmap = BaseBitmap.create("chasebandit_atkbtn_bg");
        buttomBg.y = GameConfig.stageHeigth - buttomBg.height;
        this.addChild(buttomBg);

        // 攻击
        this.atkButton = ComponentManager.getButton("chasebandit_atkbtn", "", this.atkClick, this);
        this.atkButton.x = buttomBg.x + buttomBg.width / 2 - this.atkButton.width / 2 * this.atkButton.scaleX;
        this.atkButton.y = buttomBg.y + buttomBg.height / 2 - this.atkButton.height / 2 * this.atkButton.scaleY - 25;
        this.addChild(this.atkButton);

        this.atkBtnText = ComponentManager.getTextField("atkrace_property1", TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_BROWN);
        this.atkBtnText.width = this.atkButton.width - 20;
        this.atkBtnText.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this.atkBtnText, this.atkButton, [0, 4]);
        this.addChild(this.atkBtnText);
        //可攻击次数
        this.atkCountTxt = ComponentManager.getTextField(LanguageManager.getlocal("acChaseBandit_atk_count", [String(this.vo.canatknum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.atkCountTxt.x = this.atkButton.x + this.atkButton.width / 2 - this.atkCountTxt.width / 2;
        this.atkCountTxt.y = this.atkButton.y + this.atkButton.height + 2;
        this.addChild(this.atkCountTxt);

        //任务
        let rechargeBtn: BaseButton = ComponentManager.getButton("chasebandit_taskbtn-" + this.getUiCode(), "", this.rechargeClick, this);
        rechargeBtn.name = 'taskBtn';
        rechargeBtn.x = GameConfig.stageWidth - 20 - rechargeBtn.width;
        rechargeBtn.y = buttomBg.y - rechargeBtn.height / 2;
        this.addChild(rechargeBtn);
        let rechargeTxt = BaseBitmap.create("moonnight_taskbtntxt-1");
        rechargeTxt.x = rechargeBtn.x + rechargeBtn.width / 2 - rechargeTxt.width / 2;
        rechargeTxt.y = rechargeBtn.y + 50;
        this.addChild(rechargeTxt);

        let infoBtn = ComponentManager.getButton("chasebandit_showbtn-" + this.getUiCode(), null, () => {
            ViewController.getInstance().openView(ViewConst.POPUP.ACCHASEBANDITREWARDPOPUPVIEW, { aid: this.aid, code: this.code });
        }, this);
        infoBtn.setPosition(rechargeBtn.x - 8, rechargeBtn.y - infoBtn.height - 10);
        this.addChild(infoBtn);

        let infoTxt = BaseBitmap.create("moonnight_showbtntxt-1");
        infoTxt.x = infoBtn.x + infoBtn.width / 2 - infoTxt.width / 2 + 2;
        infoTxt.y = infoBtn.y + 50;
        this.addChild(infoTxt);

        // 受击特效
        this.beAttackClip = ComponentManager.getCustomMovieClip(this.getHitAnimInfo()[0], this.getHitAnimInfo()[1], 70);
        this.beAttackClip.setEndCallBack(this.clipEndCallback, this);
        this.beAttackClip.visible = false;
        this.addChild(this.beAttackClip);

        // 开始攻击玩家
        this.attackWanjiaHandle();

        // 开始随机说话
        this.randomSay();
        this.refreshData();
        this.refreshRedDot();
    }
    private randomSay() {
        if (this.vo.attacknum < this.cfg.num) {
            // 随机一个人说话
            let self = this;
            let rndMan = Math.floor(Math.random() * 2);
            let rndSay = Math.floor(Math.random() * 5) + 1;
            let rndSayBg: BaseBitmap = BaseBitmap.create("public_9v_bg11");
            let lvbuStr = 'lvbu1';
            if (self.vo.attacknum >= this.cfg.num * 7 / 10) {
                lvbuStr = 'lvbu2';
            }

            let rndSayTxt: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acChaseBandit_" + [lvbuStr, "me"][rndMan] + "_say" + rndSay), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            rndSayBg.width = rndSayTxt.width + 30;
            rndSayBg.height = rndSayTxt.height + 60;
            if (rndMan === 0) {
                rndSayBg.x = 500 + rndSayBg.width / 2
                rndSayBg.y = 300 - rndSayBg.height / 2;
                rndSayBg.scaleX = -1;
            } else if (rndMan === 1) {
                rndSayBg.x = 140 - rndSayBg.width / 2;
                rndSayBg.y = GameConfig.stageHeigth - 350 - rndSayBg.height / 2;
            }
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
    //请求回调

    private refreshRedDot() {
        let taskBtn = <BaseButton>this.getChildByName("taskBtn");
        if (this.vo.isHaveTaskRedDot()) {
            App.CommonUtil.addIconToBDOC(taskBtn);
        } else {
            App.CommonUtil.removeIconFromBDOC(taskBtn);
        }


    }
    protected receiveData(data: { ret: boolean, data: any }): void {
        // if (data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_TIGERTRAPPASSINFO) {
        //     if (data.data.data && data.data.data.lampInfo) {
        //         this.lampInfo = data.data.data.lampInfo;
        //     }
        // }
    }
    private runText(y) {
        let strList = new Array<string>();

        for (var index = 0; index < this.lampInfo.length; index++) {
            let str = this.getTipText(this.lampInfo[index]);
            strList.push(str);
        }
        let lampContainer = new LoopLamp(strList);
        lampContainer.y = y;
        this.addChild(lampContainer);
    }
    private tick() {
        if (this.vo.isInActivity()) {
            let deltaT = this.acVo.et - GameData.serverTime;
            this.countdownTxt.text = LanguageManager.getlocal("acChaseBanditTopTime", [App.DateUtil.getFormatBySecond(deltaT, 8)]);
            this.countdownTxt.x = GameConfig.stageWidth - this.countdownTxt.width - 15;

        } else {
            this.countdownTxt.text = LanguageManager.getlocal("acChaseBanditTopTime", [LanguageManager.getlocal('acPunishEnd')]);
            this.countdownTxt.x = GameConfig.stageWidth - this.countdownTxt.width - 15;

        }
    }
    // 刷新数据
    private refreshData() {
        let lvbuDieFlag = this.vo.attacknum >= this.cfg.num;
        this.atkCountTxt.text = LanguageManager.getlocal("acChaseBandit_atk_count", [String(this.vo.canatknum)]);
        this.atkCountTxt.visible = this.vo.attacknum < this.cfg.num;
        //进度条特殊 左边有图 起点在16%的地方
        let percent = 0.15 + (this.vo.attacknum / this.cfg.num) * 0.85;
        this.bloodBar.setPercentage(percent);
        let _atkNum = (this.vo.attacknum > this.cfg.num) ? this.cfg.num : this.vo.attacknum
        this.bloodTxt.text = _atkNum + '';

        if (lvbuDieFlag) {
            this.atkBtnText.text = LanguageManager.getlocal("acChaseBandit_win")
        } else if (this.vo.canatknum >= 10) {
            this.atkBtnText.text = LanguageManager.getlocal("acChaseBandit_atk_ten");
        } else {
            this.atkBtnText.text = LanguageManager.getlocal("atkrace_property1");
        }

        if (this.vo.attacknum < this.cfg.num) {
            App.DisplayUtil.changeToNormal(this.atkButton);
            App.DisplayUtil.changeToNormal(this.atkBtnText);

        } else {
            App.DisplayUtil.changeToGray(this.atkButton);
            App.DisplayUtil.changeToGray(this.atkBtnText);
        }

        let costItemId = '';//this.cfg.needChipid;
        let costItemInfo = Api.itemVoApi.getItemInfoVoById(Number(costItemId));


        this.lvbuDie.visible = lvbuDieFlag;

        if (lvbuDieFlag) {
            App.DisplayUtil.changeToGray(this.boneNode ? this.boneNode : this.lvbuImg);
        } else {
            App.DisplayUtil.changeToNormal(this.boneNode ? this.boneNode : this.lvbuImg);
        }

        // 宝箱状态
        for (var i = 0; i < this.cfg.lotteryNum.length; i++) {
            let tmprcfg = this.cfg.lotteryNum[i];
            // let tmpRew = Config.DailytaskCfg.getDailyRewardsCfgByRewardId(tmpK);
            let boxImg = this.getChildByName("boxImg" + i);
            let lightImg = this.getChildByName("lightImg" + i);

            let rStatus = 1;
            if (this.vo.ainfo.stageinfo[i + 1]) {
                rStatus = 3; // 已领取
            } else if (this.vo.ainfo.lotterynum >= tmprcfg.needNum) {
                rStatus = 2;
            }
            let imgres = "dailytask_box1_";
            if (i == this.cfg.lotteryNum.length - 1) {
                imgres = "dailytask_box2_";
            }

            if (boxImg instanceof (BaseBitmap)) {
                boxImg.texture = ResourceManager.getRes(imgres + rStatus);
            }

            if (rStatus == 2) //可领取状态需要添加背景光
            {
                lightImg.visible = true;
                egret.Tween.get(lightImg, { loop: true }).to({ rotation: lightImg.rotation + 360 }, 10000);
                egret.Tween.get(boxImg, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
            } else {
                lightImg.visible = false;
                egret.Tween.removeTweens(lightImg);
                egret.Tween.removeTweens(boxImg);
            }
        }
    }


    private getTipText(data: any): string {
        let tipStr = "";
        if (!data) {
            return "";
        }
        let itemName = "";
        if (data.ltype == 1) {
            let itemcfg = Config.ItemCfg.getItemCfgById(Number(data.item));
            itemName = itemcfg.name;
        }
        tipStr = LanguageManager.getlocal("acChaseBandit_runTxt" + data.ltype, [data.lname, itemName]);

        return tipStr;
    }

    private atkClick() {
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (this.vo.attacknum >= this.cfg.num) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acChaseBandit_win"));
            return;
        }
        if (this.vo.canatknum <= 0) {
            this.rechargeClick();
            //App.CommonUtil.showTip(LanguageManager.getlocal("acChaseBandit_attack_num_notenough"));
            return;
        }
        let attackCount = this.vo.canatknum >= 10 ? 10 : 1;
        this.attackLvbuHandle(() => {
            NetManager.request(NetRequestConst.REQUEST_CHASEBANDIT_ATKBOSS, { "activeId": this.aid + "-" + this.code, "gid": attackCount });
        });
    }
    //任务界面
    private rechargeClick(): void {
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACCHASEBANDITCHARGEPOPUPVIEW, {
            aid: this.aid,
            code: this.code,
        });
    }

    private boxClick(event, index) {
        App.LogUtil.log("boxClick", index);

        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if ((!this.vo.ainfo.stageinfo[index + 1]) && this.vo.ainfo.lotterynum >= this.cfg.lotteryNum[index].needNum) {
            NetManager.request(NetRequestConst.REQUEST_CHASEBANDIT_BOXREWARD, { "activeId": this.aid + "-" + this.code, "gid": index + 1 });
        } else {
            ViewController.getInstance().openView(ViewConst.POPUP.DAILYTASK_REWARDPREVIEWPOPUPVIEW, { type: this.aid, activeCode: this.code, id: index });
        }
    }

    private attackWanjiaHandle(): void {
        if (this.vo.attacknum < this.cfg.num) {
            let moveTime1: number = 60;
            let moveTime2: number = 260;
            let scaleTo: number = 0.75;
            let moveY = GameConfig.stageHeigth;
            let moveTo: egret.Point = egret.Point.create(this.lvbuNode.x + (1 - scaleTo) * this.lvbuNode.width / 2, moveY);
            egret.Tween.get(this.lvbuNode)
                .wait(7000)
                .to({ x: this.lvbuNode.x, y: this.lvbuNode.y - 100 }, 300)//后移		
                .to({ x: moveTo.x, y: moveTo.y, scaleX: scaleTo, scaleY: scaleTo, }, moveTime1)
                .call(() => {
                    this.beAttackHand(false);
                }, this)
                .to({ x: this.lvbuX, y: this.lvbuY, scaleX: this.lvbuScale, scaleY: this.lvbuScale }, moveTime2)
                .call(() => {
                    this.attackWanjiaHandle();
                });
        }
    }
    private attackLvbuHandle(attackCb): void {
        // 还原吕布位置
        egret.Tween.removeTweens(this.lvbuNode);
        this.lvbuNode.setScale(this.lvbuScale);
        this.lvbuNode.x = this.lvbuX;
        this.lvbuNode.y = this.lvbuY;
        // 还原玩家位置
        egret.Tween.removeTweens(this.wanjia);
        this.wanjia.setScale(this.wanjiaScale);
        this.wanjia.x = this.wanjiaX;
        this.wanjia.y = this.wanjiaY;

        let moveTime1: number = 60;
        let moveTime2: number = 260;
        egret.Tween.get(this.wanjia)
            .to({ x: this.wanjiaX, y: this.wanjiaY + 50 }, 300)//后移		
            .to({ x: this.wanjiaX, y: this.lvbuY, scaleX: this.wanjiaScale, scaleY: this.wanjiaScale }, moveTime1)
            .call(() => {
                this.beAttackHand(true);
            }, this)
            .to({ x: this.wanjiaX, y: this.wanjiaY, scaleX: this.wanjiaScale, scaleY: this.wanjiaScale }, moveTime2)
            .call(() => {
                if (
                    (this.vo.canatknum < 10 && this.vo.attacknum + 1 < this.cfg.num)
                    ||
                    (this.vo.canatknum >= 10 && this.vo.attacknum + 10 < this.cfg.num)
                ) {
                    this.attackWanjiaHandle(); // 如果仅能再打一次了，就不再让吕布攻击了
                }
                attackCb();
            });
    }

    protected getHitAnimInfo(): any[] {
        return ["atk_anim_", 8];
    }
    private beAttackHand(attackLvbu: boolean): void {
        this.beAttackClip.visible = true;
        if (attackLvbu) {
            this.beAttackClip.setPosition(GameConfig.stageWidth / 2 - 420 / 2, this.lvbuY - 379 / 2);
        } else {
            this.beAttackClip.setPosition(GameConfig.stageWidth / 2 - 420 / 2, this.wanjiaY + 100 - 379 / 2);
        }
        this.beAttackClip.goToAndPlay(0);
        this.beAttackClip.playWithTime(1);

        if (attackLvbu) {
            egret.Tween.get(this.lvbuNode)
                .to({ x: this.lvbuX, y: this.lvbuY - 50 }, 100)//后移		
                .to({ x: this.lvbuX, y: this.lvbuY }, 120)
        } else {
            egret.Tween.get(this.wanjia)
                .to({ x: this.wanjiaX, y: this.wanjiaY + 30 }, 100)//后移		
                .to({ x: this.wanjiaX, y: this.wanjiaY }, 120)
        }
    }
    // 受击动画播放完成回调
    private clipEndCallback() {
        App.LogUtil.log("clipEndCallback");
    }

    // 获得奖励
    private getRewardHandler(event: egret.Event) {
        if (event.data.data.cmd === NetRequestConst.REQUEST_CHASEBANDIT_ATKBOSS) {
            if (event.data.data.ret === 0) {
                let data = event.data.data.data;
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": data.rewards, "otherRewards": data.otherrewards, "isPlayAni": true });
            } else {
                App.CommonUtil.showTip(event.data.data.ret);
            }
        }
    }

    //进度奖励
    private weathRewardHandle(event: egret.Event) {
        if (event.data.ret) {
            let rewards = event.data.data.data.rewards;
            let rewardVo = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardVo);
        }
    }
    protected getSoundBgName(): string {
        return "music_dailyboss";
    }
    protected getTitleBgName(): string {
        return "chasebandit_titlebg";
    }
    protected getTitleStr(): string {
        return "";
    }
    protected getRuleInfo(): string {
        return "acChaseBanditRuleInfo";
    }
    protected getResourceList(): string[] {
        let code = this.code;
        return super.getResourceList().concat([
            "punish_reward_icon",
            "acsevenczhi",
            "chasebandit_topbg",
            "skin_half_10331",
            "chasebandit_progress_bg",
            "chasebandit_progress_content",
            `chasebandit_bandit-${code}`,
            `chasebandit_lookbg-${code}`,
            `chasebandit_lookname-${code}`,
            `chasebandit_title-${code}`,
            "dailytask_box1_1",
            "dailytask_box1_2",
            "dailytask_box1_3",
            "dailytask_box2_1",
            "dailytask_box2_2",
            "dailytask_box2_3",
            "chasebandit_progress_boxbg1",
            "chasebandit_progress_boxbg2",
            "tigertrappass_lvbu_die",
            "chasebandit_atkbtn_bg",
            "chasebandit_atkbtn",
            `chasebandit_taskbtn-${code}`,
            `moonnight_taskbtntxt-1`,
            `chasebandit_showbtn-${code}`,
            `moonnight_showbtntxt-1`,
            "chasebandit_titlebg",
        ]);
    }

    public dispose(): void {
        this.bloodBar = null;
        this.bloodTxt = null;
        this.atkCountTxt = null;
        this.countdownTxt = null;
        this.lampInfo = null;
        this.atkButton = null;
        this.lvbuNode = null;
        this.boneNode = null;
        this.lvbuImg = null;
        this.lvbuX = 0;
        this.lvbuY = 0;
        this.lvbuDie = null;
        this.beAttackClip = null;
        this.exchangeButton = null;
        this.wanjia = null;
        this.wanjiaX = 0;
        this.wanjiaY = 0;
        this.atkBtnText = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHASEBANDIT_ATKBOSS), this.getRewardHandler, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshData, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHASEBANDIT_FRESH_ITEM, this.refreshData, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_CHASEBANDIT_BOXREWARD, this.weathRewardHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_CHASEBANDIT_TASKREWARD, this.refreshRedDot, this);
        super.dispose();
    }
}