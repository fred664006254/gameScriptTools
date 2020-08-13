/**
 * 金蛋赠礼
 * author hyd
 * date 2019/9/4
 * @class AcSmashEggView
 */

class AcSmashEggView extends AcCommonView {
    private _timeCountTxt: BaseTextField = null;
    private _timebg: BaseBitmap = null;
    private _sceneLayer: BaseDisplayObjectContainer = null;
    private _progressContainer: BaseDisplayObjectContainer = null;
    private _progressBar: ProgressBar = null;
    private _startPercent: number = 0;
    private _progressBM: BaseBitmap = null;
    private _progressLight: BaseBitmap = null;
    private _numTF: BaseTextField = null;
    private _boxBM: BaseBitmap = null;
    private _boxLightBM: BaseBitmap = null;
    private _redDot: BaseBitmap = null;
    private _progressTF: BaseTextField = null;
    private _boxInfoList: { boxBM: BaseBitmap, isPlayAni: boolean, percent: number, itemCfg: Config.AcCfg.WorshipAchievementItemCfg }[] = [];
    private _eggContainer: BaseDisplayObjectContainer = null;
    private _detailBtn: BaseButton = null;
    private _nowEggIndex: number = 0;
    private _isPlay: boolean = false;
    private _isPlayEgg: boolean = false;
    //前端记录的10个蛋的状态 0未开 >1 已开
    private _eggStateList: number[] = [];
    //前端记录的10个蛋的类型 0银蛋 1金蛋
    private _eggInfoList: number[] = [];

    private _curItem: BaseTextField = null;
    private _itemNumBg: BaseBitmap = null;

    //特效部分
    private _leftCurtain: BaseBitmap = null;
    private _rightCurtain: BaseBitmap = null;

    private _isResetEgg: boolean = false;
    private _skinReddot: BaseBitmap = null;

    public constructor() {
        super();
    }

    // 标题背景名称
    protected getTitleBgName(): string {
        return "smashegg_titlebg-" + this.getUiCode();
    }

    protected getTitleStr(): string {
        return null;
    }

    protected getRuleInfo(): string {
        return "acSmashEggRuleInfo-" + this.getUiCode();
    }

    protected getProbablyInfo(): string {
        return "acSmashEggProbablyInfo-" + this.getUiCode();
    }

    protected initProbablyBtn(): void {
        return;
    }

    // protected get code():string{
    //     if (typeof(this.code) == "object"){
    //         return this.param.data.code;
    //     }
    //     return this.code;
    // }

    protected clickProbablyBtnHandler(param: any): void {
        let keyParam = this.getProbablyInfoParam();
        let msg = LanguageManager.getlocal(this.getProbablyInfo(), keyParam);
        ViewController.getInstance().openView(ViewConst.POPUP.PROBABLYINFOPOPUPVIEW, msg);
    }

    /**
	 * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
	 */
    protected getReportTipData(): { title: { key: string, param?: string[] }, msg: { key: string, param?: string[] } } {
        return { title: { key: `acSmashEggReportTitle-${this.getUiCode()}` }, msg: { key: `acSmashEggReportKey-${this.getUiCode()}` } };
    }

    private get cfg(): Config.AcCfg.SmashEggCfg {
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo(): AcSmashEggVo {
        return <AcSmashEggVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId(): string {
        return `${this.aid}-${this.code}`;
    }

    protected initBg(): void {
        let view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;

        let bgName: string = this.getBgName();
        if (bgName) {
            this.viewBg = BaseBitmap.create(bgName);
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
        }
    }

    protected getBgName(): string {
        let code = this.getUiCode();
        return `smashegg_bg-${code}`;
    }

    protected getUiCode(): string {
        let code = ``;
        switch(Number(this.code)){
            case 1:
            case 2:
                code = `1`;
                break;
            case 3:
            case 4:
                code = `3`;
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }

    protected getResourceList(): string[] {
        let view = this;
        let code = view.getUiCode();
        return super.getResourceList().concat([
            `smasheggcode${code}`,'luckdrawprogressbg-1', "progress12", "progress12_bg", "acwealthcomingview_progresslight", "acworshipview_slider", "acwealthcomingview_box_light", "acwealthcomingview_box_1", "acwealthcomingview_box_2", "luckydrawrewardword-2",
            "acworshipview_box3", "acworshipview_box2", "acworshipview_box1", "acwealthcomingview_numbg", "acwealthcomingview_lightball", "boxboomeffect", "fourpeople_bottom", 'smashegg_itemblast',
            ,'duanwu_handrail',"acwealthcarpview_skineffect1", "acwealthcarpview", "acliangbiographyview_common_acbg", "countrywarrewardview_itembg", `smashegg_shopbg-${code}`, 'smashegg_itembg',
            `smashegg_bg-${code}`, `smashegg_leftcurtain-1`, `smashegg_rightcurtain-1`, 'acsmashegg_smasheffect', 'acsmashegg_goldeneggeffect', 'acsmashegg_changegoldeffect', 'acthrowarrowview_common_txtline',`smashegg_logbg`

        ]);
    }

    private _eggPos = [
        { x: 136, y: 0 },
        { x: 94, y: 86 }, { x: 180, y: 86 },
        { x: 49, y: 167 }, { x: 136, y: 183 }, { x: 223, y: 167 },
        { x: 1, y: 251 }, { x: 89, y: 274 }, { x: 185, y: 274 }, { x: 280, y: 251 }
    ];

    //开界面时存一下蛋池状态
    initData() {
        this._eggStateList = this.vo.egginfo;
        this._eggInfoList = this.vo.info;
        this._startPercent = this.vo.getnum() / this.cfg.getMaxAchievementValue();
        if (this._startPercent > 1) this._startPercent = 1;

    }
    public initView() {
        this.initData();
        let view = this;
        let code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_SMASHEGG_CLICK, this.onEggOpenHandler, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_SMASHEGG_GETREWARD, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_SMASHEGG_BUY, this.refreshView, this);


        if (Api.switchVoApi.checkOpenProbably() == true && this.getProbablyInfo()) {
            let probablyBtn = ComponentManager.getButton("btn_probably", "", this.clickProbablyBtnHandler, this);
            let posX: number = 12;
            if (PlatformManager.hasSpcialCloseBtn()) {
                posX += 80;
            }
            if (this._ruleBtn) {
                posX = this._ruleBtn.x + this._ruleBtn.width - 10;
            }
            probablyBtn.x = posX;
            probablyBtn.y = 22;
            this.addChild(probablyBtn);
        }


        //top背景图
        let topbg = BaseBitmap.create(`acliangbiographyview_common_acbg`);
        topbg.width = GameConfig.stageWidth;
        topbg.height = 144;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.titleBg, [0, view.titleBg.height - 7]);
        view.addChildAt(topbg, this.getChildIndex(this.container));

        let timeTxt = ComponentManager.getTextField(`${view.vo.getAcLocalTime(true)}`, 20);
        timeTxt.width = 600;
        timeTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, topbg, [20, 23]);
        view.addChild(timeTxt);

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acSmashEggTip1-${code}`), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.width = 600;
        tipTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, timeTxt, [0, timeTxt.textHeight + 5]);
        view.addChild(tipTxt);


        //进度条
        this._progressContainer = this.getProgressContainer();
        this._progressContainer.name = 'progressContainer';
        view.addChild(this._progressContainer);
        this._progressContainer.setPosition(0, topbg.y + topbg.height);

        //倒计时位置 
        let timebg = BaseBitmap.create("public_9_bg61");
        view.addChild(timebg);
        timebg.y = (topbg.y + topbg.height - 14);
        view._timebg = timebg;

        let str = view.vo.isInActivity() ? `acLuckyDrawTopTip2-1` : `acLaborDaytime-1`;
        let tip2Text = ComponentManager.getTextField(LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]), 18);
        view.addChild(tip2Text);
        view._timeCountTxt = tip2Text;
        tip2Text.y = timebg.y + 6;

        timebg.width = tip2Text.width + 50;
        timebg.x = GameConfig.stageWidth - timebg.width - 12;
        tip2Text.x = timebg.x + (timebg.width - tip2Text.width) * 0.5;

        //活动详情按钮
        this._detailBtn = ComponentManager.getButton("smashegg_detailbtn-" + this.getUiCode(), null, () => {
            ViewController.getInstance().openView(ViewConst.POPUP.ACSMASHEGGDETAILPOPUPVIEW, { aid: this.aid, code: this.code });
        }, this);
        this._detailBtn.setPosition(this._progressContainer.x + 15, this._progressContainer.y + this._progressContainer.height + 20);
        this.addChild(this._detailBtn);

        //金蛋池
        this._eggContainer = this.getEggContainer();
        view.addChild(this._eggContainer);
        this._eggContainer.setPosition(this.viewBg.x + 259, this.viewBg.y + 576);
        // if(Number(code) == 3){
        //     this._eggContainer.setPosition(this.viewBg.x + 249, this.viewBg.y + 566);
        // }

        //下方拥有锤子数量
        this._itemNumBg = BaseBitmap.create('smashegg_itembg');
        this.addChild(this._itemNumBg);
        this._itemNumBg.setPosition(this.viewBg.x + 370, this.viewBg.y + this.viewBg.height - 160);

        let hammerIcon = BaseBitmap.create('smashegg_hammer-' + this.getUiCode());
        this.addChild(hammerIcon);
        hammerIcon.width = hammerIcon.height = 50;
        hammerIcon.setPosition(this._itemNumBg.x - 5, this._itemNumBg.y - 5);

        this._curItem = ComponentManager.getTextField('999', TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_YELLOW);
        this._curItem.setPosition(this._itemNumBg.x + 47, this._itemNumBg.y + 12);
        this.addChild(this._curItem);


        //窗帘
        this._leftCurtain = BaseBitmap.create(App.CommonUtil.getResByCode(`smashegg_leftcurtain`, code));
        this._rightCurtain = BaseBitmap.create(App.CommonUtil.getResByCode(`smashegg_rightcurtain`, code));
        this.addChild(this._leftCurtain);
        this.addChild(this._rightCurtain);
        this._leftCurtain.setPosition(this.viewBg.x - this._leftCurtain.width, this.viewBg.y);
        this._rightCurtain.setPosition(this.viewBg.x + this.viewBg.width, this.viewBg.y);

        let skinCfg = Config.ServantskinCfg.getServantSkinItemById(this.cfg.show);

        let boneName = "";
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }

        if (Api.switchVoApi.checkIsServantSkinState(skinCfg.id)) {
            if (!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon() && RES.hasRes(boneName)) {
                let servantDB = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                servantDB.setPosition(0 + view.viewBg.x + 140, 627 + view.viewBg.y + 410);
                servantDB.scaleX = -0.8;
                servantDB.scaleY = 0.8;
                this.addChild(servantDB);
            }
            else {
                let rect = egret.Rectangle.create();
                rect.setTo(0, 0, 370, 427);
                let servantPic = BaseLoadBitmap.create(skinCfg.body, rect);
                servantPic.setPosition(view.viewBg.x + 280, 627 + view.viewBg.y);
                this.addChild(servantPic);
                servantPic.scaleX = -1;
            }
        }


        //扶栏
        let handrail: BaseBitmap = BaseBitmap.create(`duanwu_handrail`);
        handrail.y = GameConfig.stageHeigth - handrail.height;
        view.addChild(handrail);

        //预览
        let topBg = { x: 20, y: GameConfig.stageHeigth - 270 };
        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        // this._effect.setScale(2);
        let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
        skinTxtEffect.setPosition(topBg.x + 103 - skinTxtEffectBM.width / 2, topBg.y + 160 - skinTxtEffectBM.height / 2);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        this.addChild(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);

        let skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        skinTxt.setPosition(topBg.x + 103, topBg.y + 160);
        this.addChild(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);


        let skinTxteffect = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
        skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
        skinTxteffect.setPosition(topBg.x + 103, topBg.y + 160);
        this.addChild(skinTxteffect);
        skinTxteffect.blendMode = egret.BlendMode.ADD;
        skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);

        //透明点击区域
        let touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = 180;
        touchPos.height = 176;
        touchPos.setPosition(topBg.x, topBg.y);
        view.addChild(touchPos);
        touchPos.addTouchTap(() => {

            let num = this.vo.getSkinNeedItemNum();
            let titleStr: string = LanguageManager.getlocal("acSmashEggClothesTip-" + code, [String(num)]);
            //ViewController.getInstance().openView(ViewConst.POPUP.CLOSHESPREVIEWSEVRVANTSKINPOPUPVIEW, { sid: this.cfg.show, title: titleStr });
            ViewController.getInstance().openView("AcSmashEggSkinPopupView", { code: this.code, aid: this.aid });

        }, ViewController);


        this._skinReddot = BaseBitmap.create('public_dot2');
        this.addChild(this._skinReddot);
        this._skinReddot.setPosition(skinTxteffect.x + skinTxteffect.width / 2 + 5, skinTxteffect.y - skinTxteffect.height / 2 - 15);




        //活动详情按钮


        this.refreshEgg();
        this.refreshView();
    }

    private getProgressContainer(): BaseDisplayObjectContainer {
        let progressContainer = new BaseDisplayObjectContainer();

        //进度条
        let progressbg = BaseLoadBitmap.create("luckdrawprogressbg-1");
        progressbg.width = 640;
        progressbg.height = 107;
        progressContainer.addChild(progressbg);

        this._progressBar = ComponentManager.getProgressBar("progress12", "progress12_bg", 435);
        this._progressBar.setPosition(progressbg.x + progressbg.width / 2 - this._progressBar.width / 2 - 10, progressbg.y + progressbg.height / 2 - this._progressBar.height / 2);
        progressContainer.addChild(this._progressBar);
        this._progressBar.setPercentage(this._startPercent);

        let progressNumber = 0;//this.cfg.getMaxAchievementValue();
        this._progressTF = ComponentManager.getTextField(this.vo.getnum() + "/" + progressNumber, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this._progressTF.setPosition(this._progressBar.x + this._progressBar.width / 2 - this._progressTF.width / 2, this._progressBar.y + this._progressBar.height + 12);
        progressContainer.addChild(this._progressTF);

        this._progressBM = BaseBitmap.create("acworshipview_slider");
        this._progressBM.anchorOffsetX = this._progressBM.width / 2;
        this._progressBM.anchorOffsetY = this._progressBM.height;
        let posWidthValue: number = this._startPercent >= 1 ? 1 : this._startPercent;
        this._progressBM.setPosition(this._progressBar.x + this._progressBar.width * posWidthValue, this._progressBar.y);
        progressContainer.addChild(this._progressBM);



        this._progressLight = BaseBitmap.create("acwealthcomingview_progresslight");
        this._progressLight.anchorOffsetX = this._progressLight.width;
        this._progressLight.anchorOffsetY = this._progressLight.height / 2;
        this._progressLight.setPosition(this._progressBar.x + this._progressBar.width * this._startPercent, this._progressBar.y + this._progressBar.height / 2);
        progressContainer.addChild(this._progressLight);
        this._progressLight.setVisible(false);

        //次数this._bg
        let numbg = BaseBitmap.create("acwealthcomingview_numbg");
        numbg.setPosition(this._progressBar.x + 12 - numbg.width, this._progressBar.y + this._progressBar.height / 2 - numbg.height / 2);
        progressContainer.addChild(numbg);


        //数量TF
        let numDescTF = ComponentManager.getTextField(LanguageManager.getlocal("acSmashEggBoxNumDesc-" + this.code), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        numDescTF.setPosition(numbg.x + numbg.width / 2 - numDescTF.width / 2, numbg.y + 28);
        progressContainer.addChild(numDescTF);

        //数量TF
        this._numTF = ComponentManager.getTextField("9999", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        this._numTF.width = 60;
        this._numTF.textAlign = egret.HorizontalAlign.CENTER;
        this._numTF.setPosition(numDescTF.x + numDescTF.width / 2 - this._numTF.width / 2, numDescTF.y + numDescTF.height + 2);
        progressContainer.addChild(this._numTF);

        //奖励宝箱
        this._boxBM = BaseBitmap.create("acwealthcomingview_box_1");
        this._boxBM.anchorOffsetX = this._boxBM.width / 2;
        this._boxBM.anchorOffsetY = this._boxBM.height;
        this._boxBM.setPosition(this._progressBar.x + this._progressBar.width + this._boxBM.width / 2 + 22, this._progressBar.y + this._progressBar.height / 2 + this._boxBM.height / 2 - 3);
        progressContainer.addChild(this._boxBM);
        this._boxBM.addTouchTap(() => {
            ViewController.getInstance().openView("AcSmashEggAchievementPopupView", { aid: this.aid, code: this.code });
        }, this);
        //宝箱光 584 816  582.5 810
        this._boxLightBM = BaseBitmap.create("acwealthcomingview_box_light");
        this._boxLightBM.anchorOffsetX = this._boxLightBM.width / 2 - 1.5;
        this._boxLightBM.anchorOffsetY = this._boxLightBM.height / 2 + this._boxBM.width / 2 + 3;
        this._boxLightBM.setPosition(this._boxBM.x, this._boxBM.y);
        progressContainer.addChild(this._boxLightBM);
        this._boxLightBM.alpha = 0;

        //红点	
        this._redDot = BaseBitmap.create("public_dot2");
        this._redDot.setPosition(this._boxBM.x + this._boxBM.width / 2 - this._redDot.width / 2, this._boxBM.y - this._boxBM.height + this._redDot.height / 2)
        progressContainer.addChild(this._redDot);
        if (this.vo.checkAchievementRedDot()) {
            this._boxBM.setRes("acwealthcomingview_box_2")
            this._redDot.setVisible(true);
        }
        else {
            this._boxBM.setRes("acwealthcomingview_box_1")
            this._redDot.setVisible(false);
        }

        //文字
        let boxWordBM = BaseBitmap.create("luckydrawrewardword-2")
        boxWordBM.setPosition(this._boxBM.x - boxWordBM.width / 2, this._boxBM.y - boxWordBM.height / 2 - 3);
        progressContainer.addChild(boxWordBM);

        this.initBox(progressContainer);

        return progressContainer

    }

    /**初始化宝箱相关 */
    private initBox(container: BaseDisplayObjectContainer) {
        let vo = <AcSmashEggVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        let cfg = <Config.AcCfg.SmashEggCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        this._boxInfoList = [];
        let procsscfg = cfg.achievementItemCfgList;
        procsscfg.sort((a, b) => {
            return a.needNum - b.needNum;
        })
        for (let i = 0; i < procsscfg.length; i++) {
            let itemCfg = procsscfg[i];
            let value = itemCfg.needNum;
            let v = procsscfg[procsscfg.length - 1].needNum;
            let p = value / v;
            let boxBM = BaseBitmap.create("acworshipview_box3");
            boxBM.anchorOffsetX = boxBM.width / 2;
            boxBM.anchorOffsetY = boxBM.height / 2;
            boxBM.setPosition(this._progressBar.x + this._progressBar.width * p, this._progressBar.y + this._progressBar.height / 2 - 7);
            container.addChild(boxBM);
            boxBM.addTouchTap(() => {
                ViewController.getInstance().openView("AcSmashEggAchievementPopupView", { aid: this.aid, code: this.code, id: itemCfg.id });
            }, this);
            let isPlayAni: boolean = vo.getnum() >= value ? false : true;
            let percent = Math.round(p * 1000);
            let boxInfo = { boxBM: boxBM, isPlayAni: isPlayAni, percent: percent, itemCfg: itemCfg }
            this._boxInfoList.push(boxInfo);

        }

        this.refreshBanger(this._startPercent)
    }

    /**刷新 宝箱 */
    private refreshBanger(percent: number) {
        let percentTmp = Math.round(percent * 1000)
        let vo = <AcSmashEggVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        for (let i = 0; i < this._boxInfoList.length; i++) {
            let boxInfo = this._boxInfoList[i];
            if (percentTmp >= boxInfo.percent) {
                if (vo.checkRewardFlag(Number(boxInfo.itemCfg.id))) {
                    boxInfo.boxBM.setRes("acworshipview_box3");
                }
                else {
                    boxInfo.boxBM.setRes("acworshipview_box1");
                }

                if (boxInfo.isPlayAni) {
                    boxInfo.isPlayAni = false;
                    //播放动画
                    this.playBangerAni(boxInfo.boxBM, boxInfo.boxBM.x, boxInfo.boxBM.y, this._boxBM.x, this._boxBM.y - this._boxBM.height / 2);
                }
            }
            else {
                boxInfo.boxBM.setRes("acworshipview_box2");
            }
        }
    }

    private getEggContainer(): BaseDisplayObjectContainer {
        let eggContainer = new BaseDisplayObjectContainer();
        let eggNum = 10;

        let code = Number(this.getUiCode());
        for (let i = 0; i < eggNum; i++) {
            let egg = this.getEgg(i);
            eggContainer.addChild(egg);
            if(code == 3){
                egg.anchorOffsetY = egg.width / 2;
                egg.anchorOffsetY = egg.height / 2;
                egg.setScale(0.8);
                egg.setPosition(this._eggPos[i].x + egg.anchorOffsetX, this._eggPos[i].y + egg.anchorOffsetY)
            }
            else{
                egg.setPosition(this._eggPos[i].x, this._eggPos[i].y)
            }
        }
        return eggContainer;
    }

    private getEgg(i: number): BaseDisplayObjectContainer {
        let egg = new BaseDisplayObjectContainer();
        egg.name = 'egg' + i;
        let eggBg = BaseBitmap.create('');
        egg.addChild(eggBg);

        let eggBM = BaseBitmap.create('smashegg_eggintact-' + this.getUiCode());
        eggBM.name = 'eggBM';
        egg.addChild(eggBM);

        eggBM.addTouchTap(this.onClickEgg, this, [i])
        return egg;
    }

    private onClickEgg(event: egret.Event, param: number) {

        param = Number(param);
        if (this._isPlayEgg || this._isResetEgg || this.checkEggIsOpen(param)) {
            return;
        }
        let vo = <AcSmashEggVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        let cfg = <Config.AcCfg.SmashEggCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        //后端序号从1开始,都加一
        let eggIndex = param + 1;

        if ((!vo.checkIsInEndShowTime()) && vo.isStart) {
            if (vo.isFree()) {
                this._isPlayEgg = true;
                this._nowEggIndex = Number(param);
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SMASHEGG_CLICK, { activeId: vo.aidAndCode, isFree: 1, hitPos: eggIndex });

            }
            else {
                let hasNum: number = Api.itemVoApi.getItemNumInfoVoById(cfg.useItem);
                if (!hasNum || hasNum < 1) {
                    this._isPlayEgg = false;
                    this.showRechargeTipView();
                    return;
                }
                this._isPlayEgg = true;
                this._nowEggIndex = Number(param);
                //this.playClickEgg(callback);
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SMASHEGG_CLICK, { activeId: vo.aidAndCode, isFree: 0, hitPos: eggIndex });

            }

        } else {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
        }

    }

    private playClickEgg(callback: any) {
        let code = this.getUiCode();
        if (this._isPlay) return;
        this._isPlay = true;
        let egg = <BaseDisplayObjectContainer>this._eggContainer.getChildAt(this._nowEggIndex);
        if(Number(code) == 3){
            egg.alpha = 0;
            let majiangclip = ComponentManager.getCustomMovieClip(`smasheggsmajiang`, 6);
            majiangclip.width = 260;
            majiangclip.height = 280;
            majiangclip.setScale(0.8);
            majiangclip.anchorOffsetX = majiangclip.width / 2;
            majiangclip.anchorOffsetY = majiangclip.height / 2;
            this._eggContainer.addChild(majiangclip);
            majiangclip.x = egg.x + 36;
            majiangclip.y = egg.y + 35;
            majiangclip.playWithTime(1);
            majiangclip.setEndCallBack(() => {
                this._eggContainer.removeChild(majiangclip);
                majiangclip = null;
            }, this)

            let light = ComponentManager.getCustomMovieClip(`smasheggsguang`, 7);
            light.blendMode = egret.BlendMode.ADD;
            light.width = 280;
            light.height = 280;
            light.anchorOffsetX = light.width / 2;
            light.anchorOffsetY = light.height / 2;
            this._eggContainer.addChild(light);
            light.x = egg.x + 43;
            light.y = egg.y - 5;
            light.setScale(0.8);
            light.setEndCallBack(() => {
                this._eggContainer.removeChild(light);
                light = null;
            }, this);
            light.setFrameEvent(5, callback, this);

            majiangclip.setFrameEvent(6, ()=>{
                let eggBM = <BaseBitmap>egg.getChildByName('eggBM');
                const egginfo = this.vo.egginfo;
                const info = this.vo.info;
                let eggres = ``; 
                if(this._eggInfoList[this._nowEggIndex]){
                    eggres = `smashegg_eggbroken_gold-3`;
                }
                else{
                    if(egginfo[this._nowEggIndex] > 0){
                        eggres = `smashegg_eggbroken_normal${egginfo[this._nowEggIndex]}-3`;
                    }
                    else{
                        eggres = `smashegg_eggbroken_normal${App.MathUtil.getRandom(1,10)}-${code}`;//``;
                    }
                }
                eggBM.setRes(eggres);
                egg.alpha = 1;
                light.playWithTime(1);
            }, this);
        }
        else{
            let smashEffect = ComponentManager.getCustomMovieClip('acsmashegg_smasheffect', 10);
            egg.addChild(smashEffect);
            smashEffect.setPosition(-160, -200);
            smashEffect.playWithTime(1);
            smashEffect.setFrameEvent(6, callback, this)
            smashEffect.setEndCallBack(() => {
                egg.removeChild(smashEffect);
                smashEffect = null;
            }, this)
        }

    }


    private getNowEggPoint(): egret.Point {
        /*
         * 添加砸蛋动画后,container大小变了,坐标无法准确取到,所以使用最初的坐标做判断
         * 蛋中心位置 = this._eggcontainer的位置+egg的位置+egg中心的位置
         */
        let x = this.viewBg.x + 259 + this._eggPos[this._nowEggIndex].x + 35 / 2;
        let y = this.viewBg.y + 576 + this._eggPos[this._nowEggIndex].y + 97 / 2;
        let point = new egret.Point(x, y);
        return point
    }


    private onEggOpenHandler(event: egret.Event) {
        if (event.data.ret) {
            let self = this;
            let callback = function () {
                self._isPlayEgg = false;
                self._isPlay = false;
                let eggIndex = Number(self._nowEggIndex);
                let rewards = event.data.data.data.rewards;
                let rewardVoList = GameData.formatRewardItem(rewards);
                let eggPoint = self.getNowEggPoint();
                eggPoint.x += 20;
                eggPoint.y -= 50;
                if (self.checkIsGold(self._nowEggIndex)) {
                    self.playGetGoodItem(rewardVoList);
                    egret.setTimeout(() => {
                        App.CommonUtil.playRewardFlyAction(rewardVoList, eggPoint);
                    }, self, 1500)
                } else {
                    App.CommonUtil.playRewardFlyAction(rewardVoList, eggPoint);
                }
                self.refreshEgg();
                self.refreshView();
            }

            this.playClickEgg(callback);

        }
    }

    private checkEggIsOpen(eggIndex: number) {
        const vo = <AcSmashEggVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        const egginfo = vo.egginfo;
        if (egginfo[eggIndex] > 0) {
            return true;
        }
        return false;
    }
    private refreshEgg() {
        const code = Number(this.getUiCode());
        const vo = <AcSmashEggVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        const info = vo.info;
        const egginfo = vo.egginfo;
        //判断是否开启最后一个蛋 不是最后一个蛋时absNum不会大于1
        let nowChangeEgg = -1;
        let count = 0;

        for (let i = 0; i < egginfo.length; i++) {
            let tempAbs = egginfo[i] - this._eggStateList[i];
            if(tempAbs > 0 && nowChangeEgg < 0){
               nowChangeEgg = i;
            }
            else if(tempAbs < 0){
                ++ count;
            }
        }

        if (!count) {
            this._eggStateList = egginfo;
        } else if (count == (egginfo.length - 1)) {
            //砸到最后一个蛋了,可能需要处理为金蛋的情况
            for (let i = 0; i < this._eggStateList.length; i++) {
                if (this._eggStateList[i] == 0) {
                    nowChangeEgg = i
                }

            }
        } else {
            nowChangeEgg = -1
        }

        if (!count) {
            //不是最后一个蛋
            for (let i = 0; i < egginfo.length; i++) {
                let egg = <BaseDisplayObjectContainer>this._eggContainer.getChildAt(i);
                let eggBM = <BaseBitmap>egg.getChildByName('eggBM');

                if (info[i] && (nowChangeEgg + 1) > 0 && nowChangeEgg == i) {
                    //砸到金蛋单独做处理
                    this.playSmashGoldEgg(egg);

                } else {
                    if (egginfo[i]) {
                        if (info[i]) {
                            eggBM.setRes('smashegg_eggbroken_gold-' + this.getUiCode());
                            if (!egg.getChildByName('goldEggIdleEffet')) {
                                this.playGoldEggEffect(egg);
                            }
                        } else {
                            let eggres = `smashegg_eggbroken_normal-${code}`;
                            if(Number(code) == 3){
                                eggres = `smashegg_eggbroken_normal${egginfo[i]}-${code}`;//;
                            }
                            eggBM.setRes(eggres);
                        }
                    } else {
                        eggBM.setRes('smashegg_eggintact-' + this.getUiCode());
                    }
                }


            }
        } else {
            //最后一个蛋 刷新蛋池
            if (this._eggInfoList[nowChangeEgg] && (nowChangeEgg + 1) > 0) {
                //最后一个蛋是金蛋
                let egg = <BaseDisplayObjectContainer>this._eggContainer.getChildAt(nowChangeEgg);
                this._isResetEgg = true;
                this.playSmashGoldEgg(egg, this.resetEggPool.bind(this))
            } else {
                let egg = <BaseDisplayObjectContainer>this._eggContainer.getChildAt(nowChangeEgg);
                let eggBM = <BaseBitmap>egg.getChildByName('eggBM');
                let eggres = `smashegg_eggbroken_normal-${code}`;
                if(Number(code) == 3){
                   // eggres = `smashegg_eggbroken_normal${App.MathUtil.getRandom(1,10)}-${code}`;//``;
                }
                else{
                    eggBM.setRes(eggres);
                }
               
                this._isResetEgg = true;
                this.resetEggPool();
            }


        }
    }

    //砸到金蛋特殊处理
    private playSmashGoldEgg(egg: BaseDisplayObjectContainer, callback?: any) {
        let view = this;
        const code = view.getUiCode();
        let eggBM = <BaseBitmap>egg.getChildByName('eggBM');
        eggBM.setRes('smashegg_eggbroken_gold-' + this.getUiCode());
        if(Number(code) == 3){
    
            let changeGoldEffet = ComponentManager.getCustomMovieClip('smasheggsfacai', 8);
            changeGoldEffet.width = 120;
            changeGoldEffet.height = 150;
            changeGoldEffet.anchorOffsetX = changeGoldEffet.width / 2;
            changeGoldEffet.anchorOffsetY = changeGoldEffet.height / 2;
            changeGoldEffet.setScale(0.8);
            changeGoldEffet.x = 45;
            changeGoldEffet.y = 67;
            changeGoldEffet.blendMode = egret.BlendMode.ADD;
            egg.addChild(changeGoldEffet);
            changeGoldEffet.playWithTime(1);
            changeGoldEffet.setEndCallBack(() => {
                egg.removeChild(changeGoldEffet);
                this.playGoldEggEffect(egg);
                if (callback) {
                    egret.setTimeout(callback, this, 1000)
                    // callback();
                }
            }, this)
        }
        else{
            let changeGoldEffet = ComponentManager.getCustomMovieClip('acsmashegg_changegoldeffect', 6);
            egg.addChild(changeGoldEffet);
            changeGoldEffet.playWithTime(1);
            changeGoldEffet.setPosition(-43, -15)
            changeGoldEffet.setEndCallBack(() => {
                egg.removeChild(changeGoldEffet);
                this.playGoldEggEffect(egg);
                if (callback) {
                    egret.setTimeout(callback, this, 1000)
                    // callback();
                }
            }, this)
        }
    }

    private playGoldEggEffect(egg: BaseDisplayObjectContainer) {
        let view = this;
        const code = view.getUiCode();
        
        let goldEggIdleEffet = null;
        let pos : any = {};
        if(Number(code) == 3){
            pos.x = -15;
            pos.y = -15;
            goldEggIdleEffet = ComponentManager.getCustomMovieClip('smasheggskuang', 10);
            goldEggIdleEffet.blendMode = egret.BlendMode.ADD;
        }
        else{
            pos.x = -27;
            pos.y = -1;
            goldEggIdleEffet = ComponentManager.getCustomMovieClip('acsmashegg_goldeneggeffect', 14);
        }
        //
        goldEggIdleEffet.name = 'goldEggIdleEffet';
        if(!egg.getChildByName('goldEggIdleEffet')){
            if(Number(code) == 3){
                egg.addChildAt(goldEggIdleEffet, 0);
            }
            else{
                egg.addChild(goldEggIdleEffet);
            }
            goldEggIdleEffet.playWithTime(0);
            goldEggIdleEffet.setPosition(pos.x, pos.y)
        }
    }

    private resetEggPool() {
        const vo = <AcSmashEggVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        const info = vo.info;
        const egginfo = vo.egginfo;
        this._eggStateList = egginfo;
        this._eggInfoList = info;
        egret.setTimeout(this.playResetEggPool, this, 1000)
        //this.playResetEggPool();
    }

    //开完10个后刷新蛋池
    private playResetEggPool() {
        const leftStartX = this.viewBg.x - this._leftCurtain.width;
        const rightStartX = this.viewBg.x + this.viewBg.width;
        egret.Tween.get(this._leftCurtain)
            .to({ x: leftStartX + 299 }, 500)
            .to({ x: leftStartX + 340 }, 500)
            .call(this.resetAllEgg, this)
            .wait(600)
            .to({ x: leftStartX }, 500)
            .call(() => {
                this._isResetEgg = false;
            }, this);
        egret.Tween.get(this._rightCurtain)
            .to({ x: rightStartX - 299 }, 500)
            .to({ x: rightStartX - 340 }, 500)
            .wait(600)
            .to({ x: rightStartX }, 500);


    }

    private resetAllEgg() {
        const vo = <AcSmashEggVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        const egginfo = vo.egginfo;
        for (let i = 0; i < egginfo.length; i++) {
            let egg = <BaseDisplayObjectContainer>this._eggContainer.getChildAt(i);
            let eggBM = <BaseBitmap>egg.getChildByName('eggBM');
            let goldIdleEffect = egg.getChildByName('goldEggIdleEffet');
            if (goldIdleEffect) {
                egg.removeChild(goldIdleEffect);
                goldIdleEffect = null;
            }
            eggBM.setRes('smashegg_eggintact-' + this.getUiCode());
            eggBM.alpha = 0;
            egret.Tween.get(eggBM).to({ alpha: 1 }, 500);
        }
    }

    private checkIsGold(eggIndex: number): boolean {
        if (this._eggInfoList[eggIndex]) {
            return true;
        }
        return false;
    }

    private playGetGoodItem(rewardVoList: RewardItemVo[]) {
        const code = this.getUiCode();
        const self = this;
        const eggPos = this.getNowEggPoint();
        let blastBM = BaseBitmap.create('smashegg_itemblast');
        const [icon, itemtype] = [rewardVoList[0].icon, rewardVoList[0].type];
        let container: BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
        let iconBt: BaseBitmap = null;
        if (icon) {
            let iconBg = BaseBitmap.create("public_tipiconbg");
            container.addChild(iconBg);
            let rect: egret.Rectangle = egret.Rectangle.create();
            rect.setTo(0, 0, 100, 100);
            if (icon.indexOf("public_") == 0 && ResourceManager.getRes(icon)) {
                iconBt = BaseBitmap.create(icon);
                iconBt.width = rect.width;
                iconBt.height = rect.height;
            }
            else {
                iconBt = BaseLoadBitmap.create(icon, rect);
            }
            iconBt.setScale(0.6);
            if (itemtype == 10 || itemtype == 8) {
                iconBt.scaleX = iconBt.scaleY = 0.5;
            }
            container.addChild(iconBt);

            //皮肤会超框 做处理
            if(Api.itemVoApi.checkIsServantSkinItem(rewardVoList[0].id)){
                iconBt.setScale(0.4);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,iconBt,container,[0,-5]);
            }
        }


        this.addChild(container);
        this.addChild(blastBM);

        blastBM.blendMode = egret.BlendMode.ADD;
        blastBM.anchorOffsetX = blastBM.width / 2;
        blastBM.anchorOffsetY = blastBM.height / 2;
        blastBM.alpha = 0;
        blastBM.setPosition(eggPos.x + blastBM.width / 2 - 60, eggPos.y + blastBM.height / 2 - 60);
        egret.Tween.get(blastBM).to({ alpha: 1 }, 100).to({ alpha: 0 }, 100)
            .to({
                x: GameConfig.stageWidth / 2,
                y: GameConfig.stageHeigth / 2,
                scaleX: 2.5,
                scaleY: 2.5
            }, 500)
            .call(() => {
                blastBM.alpha = 1;
                this.swapChildren(container, blastBM);
            })
            .to({ alpha: 1 }, 200).to({ alpha: 0 }, 200)
            .to({ alpha: 0 }, 500)
            .call(() => {
                self.removeChild(blastBM);
                blastBM = null;
            });




        container.anchorOffsetX = container.width / 2;
        container.anchorOffsetY = container.height / 2;
        container.setPosition(eggPos.x + container.width / 2, eggPos.y + container.height / 2);
        egret.Tween.get(container).wait(200)
            .to({
                x: GameConfig.stageWidth / 2,
                y: GameConfig.stageHeigth / 2,
                scaleX: 2.5,
                scaleY: 2.5
            }, 500)
            .wait(400)
            .to({ alpha: 0 }, 500)
            .call(() => {
                self.removeChild(container)
                container.dispose();
                container = null
            });

    }

    public tick(): void {
        let view = this;
        let str = view.vo.isInActivity() ? `acLuckyDrawTopTip2-1` : `acLaborDaytime-1`;
        view._timeCountTxt.text = LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]);
        view._timebg.x = GameConfig.stageWidth - view._timebg.width - 12;
        view._timeCountTxt.x = view._timebg.x + (view._timebg.width - view._timeCountTxt.width) * 0.5;
    }

    public showRechargeTipView(): void {
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            title: `acSmashEggViewSmashTipTitle-${this.code}`,
            msg: LanguageManager.getlocal(`acSmashEggViewSmashTipMsg-${this.code}`),
            callback: () => {
                ViewController.getInstance().openView(ViewConst.POPUP.ACSMASHEGGDETAILPOPUPVIEW, { aid: this.aid, code: this.code });
            },
            handler: this,
            needCancel: true,
        });
    }

    private refreshView() {
        let vo = <AcSmashEggVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        let cfg = <Config.AcCfg.SmashEggCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);

        this._numTF.text = String(vo.getnum());
        let progressNumber = cfg.getMaxAchievementValue();

        let hasNum: number = Api.itemVoApi.getItemNumInfoVoById(this.cfg.useItem);

        let curItemStr = LanguageManager.getlocal('acSmashEggCurItemNum', [String(hasNum) || '0']);
        if (vo.isFree()) {
            curItemStr += LanguageManager.getlocal('acSmashEggSmashFree');
        }
        this._curItem.text = curItemStr;
        this._itemNumBg.width = this._curItem.width + 70;

        if (vo.getnum() <= progressNumber) {
            this._progressTF.text = vo.getnum() + "/" + progressNumber;
        }
        else {
            this._progressTF.text = LanguageManager.getlocal("acSearchProoViewLotteryEndTip-" + this.code);
        }
        this._progressTF.x = this._progressBar.x + this._progressBar.width / 2 - this._progressTF.width / 2;

        // if (vo.isFree() && (!vo.checkIsInEndShowTime())) {
        //     this._oneBtn.setText("acSmashEggOneBtnFree-" + this.code);
        // }
        // else {
        //     this._oneBtn.setText("acSearchProofView_oneBtn-" + this.code);
        // }
        if (!vo.checkAchievementRedDot()) {
            this._boxBM.setRes("acwealthcomingview_box_1");
            this._redDot.setVisible(false);
        }
        else {
            this._boxBM.setRes("acwealthcomingview_box_2");
            this._redDot.setVisible(true);
        }
        this.refreshRedDot();
        let percent = vo.getnum() / cfg.getMaxAchievementValue();
        if (percent > 1) percent = 1;
        if (this._startPercent < 1) {
            this.playProgressBarAni(this._startPercent, percent, 0.005);
        }
        // this.refreshBanger(percent);
    }

    /**
* 进度条的动画
*/
    private playProgressBarAni(startPercent: number, endPercent: number, speed: number) {

        //每次初始化
        this._progressBar.setPercentage(startPercent);
        egret.Tween.removeTweens(this._progressBar);
        let posWidthValue: number = this._startPercent >= 1 ? 1 : this._startPercent;
        this._progressBM.setPosition(this._progressBar.x + this._progressBar.width * posWidthValue, this._progressBar.y);
        this._progressLight.setPosition(this._progressBar.x + this._progressBar.width * posWidthValue, this._progressBar.y + this._progressBar.height / 2);

        let startTemp = Math.round(startPercent * 1000);
        let endTemp = Math.round(endPercent * 1000);
        let maxTemp = Math.round(1 * 1000);
        let everyTimeValue = speed;

        egret.Tween.get(this._progressBar, { loop: true }).wait(0.1).call(() => {
            this._progressLight.setVisible(true);
            //增量动画
            startPercent += everyTimeValue;
            this.refreshBanger(startPercent);
            startTemp = Math.round(startPercent * 1000);
            if (startTemp > endTemp) {
                egret.Tween.removeTweens(this._progressBar);
                this._progressLight.setVisible(false);
                if (startTemp > maxTemp) {
                    egret.Tween.removeTweens(this._progressBar);
                    this._progressLight.setVisible(false);
                    return;
                }
                else {
                    this._isPlay = false;
                }
                return;
            }
            this.refreshBanger(startPercent);
            this._progressBar.setPercentage(startPercent);
            let posWidthValue: number = this._startPercent >= 1 ? 1 : this._startPercent;
            this._progressBM.setPosition(this._progressBar.x + this._progressBar.width * posWidthValue, this._progressBar.y);
            this._progressLight.setPosition(this._progressBar.x + this._progressBar.width * posWidthValue, this._progressBar.y + this._progressBar.height / 2);
            this._startPercent = startPercent;

        }, this)

    }

    /**鞭炮的动画 */
    private playBangerAni(bangerBM: BaseBitmap, startPosX: number, startPosY: number, endPosX: number, endPosY: number) {
        let vo = <AcSmashEggVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        let cfg = <Config.AcCfg.SmashEggCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        // bangerBM.setVisible(false);
        let boomEffect = ComponentManager.getCustomMovieClip("boxboomeffect", 8, 70);
        let boom = BaseBitmap.create("boxboomeffect1");
        boomEffect.setScale(1.25);
        boom.setScale(1.25);
        boomEffect.setPosition(startPosX - boom.width * 1.25 / 2, startPosY - boom.height * 1.25 / 2);
        this._progressContainer.addChild(boomEffect);
        boomEffect.playWithTime(1);
        boomEffect.setEndCallBack(() => {
            this._progressContainer.removeChild(boomEffect);
            boomEffect.dispose();
            let lightBall = BaseBitmap.create("acwealthcomingview_lightball")
            lightBall.anchorOffsetX = lightBall.width / 2;
            lightBall.anchorOffsetY = lightBall.height / 2;
            //oneone模式
            lightBall.blendMode = egret.BlendMode.ADD;
            this._progressContainer.addChild(lightBall);
            lightBall.alpha = 0;
            lightBall.setPosition(startPosX, startPosY);
            lightBall.alpha = 1;
            lightBall.setScale(0.1);
            lightBall.rotation = 0;
            let distanceX = endPosX - startPosX;
            let distanceY = endPosY - startPosY;
            egret.Tween.get(lightBall).to({
                rotation: 360 * 0.14,
                scaleX: 0.8,
                scaleY: 0.8,
                x: startPosX + distanceX * 0.3,
                y: startPosY + distanceY * 0.3
            }, 140).to({
                rotation: 360 * 0.54,
                scaleX: 1,
                scaleY: 1,
                x: startPosX + distanceX * 1,
                y: startPosY + distanceY * 1
            }, 400).call(() => {
                if (vo.checkAchievementRedDot()) {
                    this._boxBM.setRes("acwealthcomingview_box_2");
                }
                else {
                    this._boxBM.setRes("acwealthcomingview_box_1");
                }
                this._redDot.setVisible(false);
                this._boxBM.setScale(1.1);
                this._boxLightBM.setScale(1.1);
                this._boxLightBM.alpha = 1;
                egret.Tween.get(this._boxBM).to({
                    scaleX: 1,
                    scaleY: 1,
                }, 750).call(() => {
                    if (vo.checkAchievementRedDot()) {
                        this._redDot.setVisible(true);
                    }
                    else {
                        this._redDot.setVisible(false);
                    }
                    // egret.Tween.removeTweens(this._boxBM);
                    bangerBM.setVisible(true);
                }, this);
                egret.Tween.get(this._boxLightBM).to({
                    scaleX: 1,
                    scaleY: 1,
                    alpha: 0,
                }, 750).call(() => {
                    // egret.Tween.removeTweens(this._boxLightBM);
                }, this);
            }, this).to({
                scaleX: 1.3,
                scaleY: 1,
                rotation: 360 * 1,
                alpha: 0,
            }, 460).call(() => {
                egret.Tween.removeTweens(lightBall);
                this._progressContainer.removeChild(lightBall);
                lightBall.dispose();
            }, this);

        }, this);
    }
    /**
* 刷新红点相关
*/
    protected refreshRedDot() {
        let vo = <AcSmashEggVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        let cfg = <Config.AcCfg.SmashEggCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);

        // if (vo.checkAchievementRedDot()) {
        //     App.CommonUtil.addIconToBDOC(this._detailBtn);
        // }
        // else {
        //     App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        // }
        //     }
        if (vo.checkSkinRedDot()) {
            this._skinReddot.setVisible(true);
        } else {
            this._skinReddot.setVisible(false);
        }


    }

    public dispose(): void {

        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_SMASHEGG_CLICK, this.onEggOpenHandler, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_SMASHEGG_GETREWARD, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_SMASHEGG_BUY, this.refreshView, this);

        this._timeCountTxt = null;
        this._timebg = null;
        this._sceneLayer = null;
        this._progressContainer = null;
        this._progressBar = null;
        this._startPercent = 0;
        this._progressBM = null;
        this._progressLight = null;
        this._numTF = null;
        this._boxBM = null;
        this._boxLightBM = null;
        this._redDot = null;
        this._progressTF = null;
        this._boxInfoList = [];
        this._eggContainer = null;
        this._detailBtn = null;
        this._nowEggIndex = 0;
        this._isPlay = false;
        this._isPlayEgg = false;
        this._curItem = null;
        this._itemNumBg = null;
        this._eggStateList = [];
        this._leftCurtain = null;
        this._rightCurtain = null;
        this._isResetEgg = false;
        this._skinReddot = null;


        super.dispose();
    }
}