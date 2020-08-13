/**
  * 搜查魏府 活动
  * @author 张朝阳
  * date 2019/6/24
  * @class AcSearchProofView
  */
class AcSearchProofView extends AcCommonView {

    private _countDownTime: BaseTextField = null;
    private _countDownTimeBg: BaseBitmap = null;

    private bubbleTip: AcBubbleTip = null;

    private redDotObj: Object = {};

    private brandObj: Object = {};

    private _oneBtn: BaseButton = null;

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

    private _bg: BaseLoadBitmap = null;

    private _isPlay = false;

    private _proofTF: BaseTextField = null;

    private _searchTF: BaseTextField = null;




    private buildingCfg() {
        return [
            { buildId: "charge", buildingPic: "acsearchproofview_building_charge-" + this.getUiCode(), buildPos: { x: 9, y: 761 }, buildScale: 4, brandPic: "acsearchproofview_brand_charge-" + this.getUiCode(), brandPos: { x: 76, y: 747 }, brandName: LanguageManager.getlocal("acSearchProofViewBrandCharge-" + this.code) },
            { buildId: "skin", buildingPic: "acsearchproofview_building_skin-" + this.getUiCode(), buildPos: { x: 489, y: 761 }, buildScale: 4, brandPic: "acsearchproofview_brand_skin-" + this.getUiCode(), brandPos: { x: 564, y: 747 }, brandName: LanguageManager.getlocal("acSearchProofViewBrandSkin-" + this.code) },
            { buildId: "rewardsPool", buildingPic: "acsearchproofview_building_rewardpool-" + this.getUiCode(), buildPos: { x: 218, y: 662 }, buildScale: 4, brandPic: "acsearchproofview_brand_rewardpool-" + this.getUiCode(), brandPos: { x: 320, y: 662 }, brandName: LanguageManager.getlocal("acSearchProofViewBrandRewardPool-" + this.code) },
        ];
    }

    private getNotUseBrandCfg() {
        return [
            { id: 1, x: 317, y: 430 },
            { id: 2, x: 192, y: 492 },
            { id: 3, x: 443, y: 492 },
            { id: 4, x: 66, y: 528 },
            { id: 5, x: 573, y: 528 },
            { id: 6, x: 234, y: 548 },
            { id: 7, x: 403, y: 548 },
        ];
    }

    private getPosCfg() {
        return [
            { x: 128, y: 454 },
            { x: 390, y: 454 },
            { x: 0, y: 512 },
            { x: 521, y: 512 },
            { x: 174, y: 526 },
            { x: 336, y: 526 },
            // { x: 16, y: 614 },
            // { x: 502, y: 614 },
        ];
    }


    public constructor() {
        super();
    }

    public initView() {
        let cfg = <Config.AcCfg.SearchProofCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        let vo = <AcSearchProofVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        let skinCfg = Config.ServantskinCfg.getServantSkinItemById(cfg.show);
        let servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
        let rewards = GameData.formatRewardItem(cfg.itemExchange[0].costProof)[0];

        let desc = LanguageManager.getlocal("acSearchProofSearchViewDesc-" + this.code);
        ViewController.getInstance().openView(ViewConst.POPUP.ACSEARCHPROOFSEARCHVIEW, { aid: this.aid, code: this.code, skin: skinCfg.body, name: servantCfg.name, desc: desc });

        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this)
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_SEARCHPROOF, this.worshipRewardsHandle, this);

        this._startPercent = vo.getnum() / cfg.getMaxAchievementValue();

        let bg = BaseLoadBitmap.create("acsearchproofview_bg-" + this.getUiCode());
        bg.width = 640;
        bg.height = 1136;
        bg.setPosition(0, GameConfig.stageHeigth - bg.height);
        this.addChildToContainer(bg);
        this._bg = bg;

        let notUseBrandCfg = this.getNotUseBrandCfg();
        for (let key in notUseBrandCfg) {
            let item = notUseBrandCfg[key];
            let brandName = ComponentManager.getTextField(LanguageManager.getlocal("acSearchProofViewNotUseBrandName" + item.id + "-" + this.code), 15, 0xc5b69b);
            let offestWidth: number = brandName.width > 60 ? brandName.width - 60 : 0;

            let brandPic = BaseBitmap.create("acsearchproofview_common_dark")
            let startWidth: number = brandPic.width;
            brandPic.width += offestWidth;
            brandPic.setPosition(item.x - brandPic.width / 2, item.y + bg.y - brandPic.height / 2);
            this.addChildToContainer(brandPic);

            brandName.setPosition(brandPic.x + brandPic.width / 2 - brandName.width / 2, brandPic.y + brandPic.height / 2 - brandName.height / 2);
            this.addChildToContainer(brandName);
        }

        let buildingCfg = this.buildingCfg();
        for (let key in buildingCfg) {
            let item = buildingCfg[key];
            let buildPic = BaseLoadBitmap.create(item.buildingPic);
            buildPic.setScale(item.buildScale);
            buildPic.setPosition(item.buildPos.x, item.buildPos.y + bg.y);
            buildPic.name = item.buildId;
            this.addChildToContainer(buildPic);
            buildPic.addTouch(this.onNPCTouchHandler, this, null, true);
            buildPic.alpha = 0;

            let brandName = ComponentManager.getTextField(item.brandName, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            let offestWidth: number = brandName.width > 80 ? brandName.width - 80 : 0;

            let brandPic = BaseBitmap.create("acsearchproofview_common_yellow")
            let startWidth: number = brandPic.width;
            brandPic.width += offestWidth;
            brandPic.setPosition(item.brandPos.x - brandPic.width / 2, item.brandPos.y + bg.y - brandPic.height / 2);
            brandPic.name = item.buildId;
            brandPic.addTouch(this.onNPCTouchHandler, this, null, true);
            this.addChildToContainer(brandPic);

            brandName.setPosition(brandPic.x + brandPic.width / 2 - brandName.width / 2, brandPic.y + brandPic.height / 2 - brandName.height / 2);
            this.addChildToContainer(brandName);

            if (item.buildId == "charge") {
                let clip = ComponentManager.getCustomMovieClip("acsearchproofvieweffect_charge", 8, 128);
                let clipBM = BaseBitmap.create("acsearchproofvieweffect_charge1");
                let scaleX: number = 1;
                if (offestWidth > 0) {
                    scaleX = brandPic.width / startWidth;
                }
                clip.scaleX = scaleX;
                clip.setPosition(brandPic.x + brandPic.width / 2 - clipBM.width / 2 * scaleX, brandPic.y + brandPic.height / 2 - clipBM.height / 2);
                this.addChildToContainer(clip);
                clip.playWithTime(-1);
            }

            let dot = BaseBitmap.create(`public_dot2`);
            dot.setScale(0.88);
            dot.x = brandPic.x + brandPic.width - 22;
            dot.y = brandPic.y - 5;
            this.addChildToContainer(dot);
            dot.setVisible(false);
            this.redDotObj[item.buildId] = dot;
            this.refreshRedDot();
        }

        let titleBg = BaseLoadBitmap.create("acsearchproofview_titlebg-" + this.getUiCode());
        titleBg.width = 640;
        titleBg.height = 92;
        titleBg.setPosition(0, 0);

        let topBg = BaseLoadBitmap.create("acsearchproofview_topbg-" + this.code);
        topBg.width = 640;
        topBg.height = 146;
        topBg.setPosition(titleBg.x, titleBg.y + titleBg.height - 7);

        this.addChildToContainer(topBg);
        this.addChildToContainer(titleBg);

        // let descBg = BaseBitmap.create("public_9_downbg");
        // descBg.width = 421;
        // descBg.height = 126;
        // descBg.setPosition(topBg.x + 206, topBg.y + 31);
        // this.addChildToContainer(descBg);

        let acTime = ComponentManager.getTextField(LanguageManager.getlocal("acSearchProofView_acTime-" + this.code, [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        acTime.setPosition(topBg.x + 210, topBg.y + 15);
        this.addChildToContainer(acTime);

        let descTF = ComponentManager.getTextField(LanguageManager.getlocal("acSearchProofView_acDesc-" + this.code, [String(rewards.num)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTF.width = 400;
        descTF.lineSpacing = 3;
        descTF.setPosition(acTime.x, acTime.y + acTime.height + 5);
        this.addChildToContainer(descTF);

        this._proofTF = ComponentManager.getTextField(LanguageManager.getlocal("acSearchProoViewProof-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._proofTF.setPosition(acTime.x, topBg.y + topBg.height - this._proofTF.height - 10);
        this.addChildToContainer(this._proofTF);

        let offestX = 105;
        let offestY = 118;

        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        // this._effect.setScale(2);
        let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
        skinTxtEffect.setPosition(topBg.x + offestX - skinTxtEffectBM.width / 2, topBg.y + offestY - skinTxtEffectBM.height / 2);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);

        let skinTxt = BaseBitmap.create("acsearchproofview_common_skintxt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        skinTxt.setPosition(topBg.x + offestX, topBg.y + offestY);
        this.addChildToContainer(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);


        let skinTxteffect = BaseBitmap.create("acsearchproofview_common_skintxt");
        skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
        skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
        skinTxteffect.setPosition(topBg.x + offestX, topBg.y + offestY);
        this.addChildToContainer(skinTxteffect);
        skinTxteffect.blendMode = egret.BlendMode.ADD;
        skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);


        //透明点击区域
        let touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = 180;
        touchPos.height = 200;
        touchPos.setPosition(topBg.x, topBg.y);
        this.addChildToContainer(touchPos);
        touchPos.addTouchTap(() => {
            ViewController.getInstance().openView(ViewConst.POPUP.ACSEARCHPROOFSKINPOPUPVIEW, { code: this.code, aid: this.aid });
        }, this);

        this._countDownTimeBg = BaseBitmap.create("public_9_bg61");
        this._countDownTimeBg.y = topBg.y + topBg.height - this._countDownTimeBg.height / 2 - 2;
        this.addChildToContainer(this._countDownTimeBg);

        this._countDownTime = ComponentManager.getTextField(LanguageManager.getlocal("acSearchProofView_acCountTime-" + this.code, [vo.acCountDown]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        this._countDownTimeBg.width = 60 + this._countDownTime.width;
        this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
        this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);
        this.addChildToContainer(this._countDownTime);

        this._hammerEffect = ComponentManager.getCustomMovieClip("acsearchproofvieweffect_search", 17, 70);
        this.addChild(this._hammerEffect)
        this._hammerEffect.setVisible(false);

        this.initButtom();

        this.tick();
        this.refreshView();

    }
    private initButtom() {
        let cfg = <Config.AcCfg.SearchProofCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        let vo = <AcSearchProofVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);

        let buttombg = BaseLoadBitmap.create("arena_bottom");
        buttombg.width = 640;
        buttombg.height = 140;
        buttombg.setPosition(0, GameConfig.stageHeigth - buttombg.height);
        this.addChildToContainer(buttombg);

        this._searchTF = ComponentManager.getTextField(LanguageManager.getlocal("acSearchProoViewSearchDesc-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._searchTF.setPosition(buttombg.x + 270, buttombg.y + 15);
        this.addChildToContainer(this._searchTF);

        let searchBMScale = 0.43;
        let searchBM = BaseLoadBitmap.create("acsearchproofview_item_searchtoken-" + this.code);
        searchBM.width = 100;
        searchBM.height = 100;
        searchBM.setScale(0.43);
        searchBM.setPosition(this._searchTF.x - searchBM.width * searchBMScale, this._searchTF.y + this._searchTF.height / 2 - searchBM.height / 2 * searchBMScale);
        this.addChildToContainer(searchBM);



        //一次相关
        //按钮
        this._oneBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acSearchProofView_oneBtn-" + this.code, this.oneBtnClick, this)
        this._oneBtn.setPosition(85, buttombg.y + buttombg.height - this._oneBtn.height - 20);
        this.addChildToContainer(this._oneBtn);


        //十次相关
        //按钮
        let tenBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acSearchProofView_tenBtn-" + this.code, this.tenBtnClick, this);
        tenBtn.setPosition(buttombg.x + buttombg.width - tenBtn.width - 90, buttombg.y + buttombg.height - tenBtn.height - 20);
        this.addChildToContainer(tenBtn);

        let mustTF = ComponentManager.getTextField(LanguageManager.getlocal("acSearchProofView_Must-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        mustTF.setPosition(tenBtn.x + tenBtn.width / 2 - mustTF.width / 2, tenBtn.y - mustTF.height - 5);
        this.addChildToContainer(mustTF);


        let progressbg = BaseLoadBitmap.create("luckdrawprogressbg-1");
        progressbg.width = 640;
        progressbg.height = 107;
        progressbg.setPosition(0, buttombg.y - progressbg.height);
        this.addChildToContainer(progressbg);

        //进度条
        this._progressBar = ComponentManager.getProgressBar("progress12", "progress12_bg", 435);
        this._progressBar.setPosition(progressbg.x + progressbg.width / 2 - this._progressBar.width / 2 - 10, progressbg.y + progressbg.height / 2 - this._progressBar.height / 2);
        this.addChildToContainer(this._progressBar);
        this._progressBar.setPercentage(this._startPercent);

        let progressNumber = cfg.getMaxAchievementValue();
        this._progressTF = ComponentManager.getTextField(vo.getnum() + "/" + progressNumber, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this._progressTF.setPosition(this._progressBar.x + this._progressBar.width / 2 - this._progressTF.width / 2, this._progressBar.y + this._progressBar.height + 12);
        this.addChildToContainer(this._progressTF);

        this._progressBM = BaseBitmap.create("acworshipview_slider");
        this._progressBM.anchorOffsetX = this._progressBM.width / 2;
        this._progressBM.anchorOffsetY = this._progressBM.height;
        let posWidthValue: number = this._startPercent >= 1 ? 1 : this._startPercent;
        this._progressBM.setPosition(this._progressBar.x + this._progressBar.width * posWidthValue, this._progressBar.y);
        this.addChildToContainer(this._progressBM);



        this._progressLight = BaseBitmap.create("acwealthcomingview_progresslight");
        this._progressLight.anchorOffsetX = this._progressLight.width;
        this._progressLight.anchorOffsetY = this._progressLight.height / 2;
        this._progressLight.setPosition(this._progressBar.x + this._progressBar.width * this._startPercent, this._progressBar.y + this._progressBar.height / 2);
        this.addChildToContainer(this._progressLight);
        this._progressLight.setVisible(false);

        //次数this._bg
        let numbg = BaseBitmap.create("acwealthcomingview_numbg");
        numbg.setPosition(this._progressBar.x + 12 - numbg.width, this._progressBar.y + this._progressBar.height / 2 - numbg.height / 2);
        this.addChildToContainer(numbg);


        //数量TF
        let numDescTF = ComponentManager.getTextField(LanguageManager.getlocal("acSearchProofViewNumDesc-" + this.code), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        numDescTF.setPosition(numbg.x + numbg.width / 2 - numDescTF.width / 2, numbg.y + 28);
        this.addChildToContainer(numDescTF);

        //数量TF
        this._numTF = ComponentManager.getTextField("9999", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        this._numTF.width = 60;
        this._numTF.textAlign = egret.HorizontalAlign.CENTER;
        this._numTF.setPosition(numDescTF.x + numDescTF.width / 2 - this._numTF.width / 2, numDescTF.y + numDescTF.height + 2);
        this.addChildToContainer(this._numTF);

        //奖励宝箱
        this._boxBM = BaseBitmap.create("acwealthcomingview_box_1");
        this._boxBM.anchorOffsetX = this._boxBM.width / 2;
        this._boxBM.anchorOffsetY = this._boxBM.height;
        this._boxBM.setPosition(this._progressBar.x + this._progressBar.width + this._boxBM.width / 2 + 22, this._progressBar.y + this._progressBar.height / 2 + this._boxBM.height / 2 - 3);
        this.addChildToContainer(this._boxBM);
        this._boxBM.addTouchTap(() => {
            ViewController.getInstance().openView(ViewConst.POPUP.ACSEARCHPROOFACHIEVEMENTPOPUPVIEW, { aid: this.aid, code: this.code });
        }, this);
        //宝箱光 584 816  582.5 810
        this._boxLightBM = BaseBitmap.create("acwealthcomingview_box_light");
        this._boxLightBM.anchorOffsetX = this._boxLightBM.width / 2 - 1.5;
        this._boxLightBM.anchorOffsetY = this._boxLightBM.height / 2 + this._boxBM.width / 2 + 3;
        this._boxLightBM.setPosition(this._boxBM.x, this._boxBM.y);
        this.addChildToContainer(this._boxLightBM);
        this._boxLightBM.alpha = 0;

        //红点	
        this._redDot = BaseBitmap.create("public_dot2");
        this._redDot.setPosition(this._boxBM.x + this._boxBM.width / 2 - this._redDot.width / 2, this._boxBM.y - this._boxBM.height + this._redDot.height / 2)
        this.addChildToContainer(this._redDot);
        if (vo.checkAchievementRedDot()) {
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
        this.addChildToContainer(boxWordBM);

        this.initBox();
    }

    /**初始化宝箱相关 */
    private initBox() {
        let vo = <AcSearchProofVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        let cfg = <Config.AcCfg.SearchProofCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
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
            this.addChildToContainer(boxBM);
            boxBM.addTouchTap(() => {
                ViewController.getInstance().openView(ViewConst.POPUP.ACSEARCHPROOFACHIEVEMENTPOPUPVIEW, { aid: this.aid, code: this.code, id: itemCfg.id });
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
        let vo = <AcSearchProofVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
                    this.playBangerAni(boxInfo.boxBM, boxInfo.boxBM.x, boxInfo.boxBM.y, this._boxBM.x, this._boxBM.y - this._boxBM.height / 2, );
                }
            }
            else {
                boxInfo.boxBM.setRes("acworshipview_box2");
            }
        }
    }



    /**
    * 刷新红点相关
    */
    protected refreshRedDot() {
        let vo = <AcSearchProofVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        let cfg = <Config.AcCfg.SearchProofCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);

        if (this.redDotObj["skin"]) {
            if (vo.checkSkinRedDot()) {
                this.redDotObj["skin"].setVisible(true);
            }
            else {
                this.redDotObj["skin"].setVisible(false);
            }
        }

        if (this.redDotObj["charge"]) {
            if (vo.checkRechargeRedDot()) {
                this.redDotObj["charge"].setVisible(true);
            }
            else {
                this.redDotObj["charge"].setVisible(false);
            }
        }
    }
    private refreshView() {
        let vo = <AcSearchProofVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        let cfg = <Config.AcCfg.SearchProofCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);

        let id = GameData.formatRewardItem(cfg.mustGet2)[0].id;
        this._proofTF.text = LanguageManager.getlocal("acSearchProoViewProof-" + this.code, [String(Api.itemVoApi.getItemNumInfoVoById(id))]);

        this._searchTF.text = LanguageManager.getlocal("acSearchProoViewSearchDesc-" + this.code, [String(vo.getItemValue())])

        this._numTF.text = String(vo.getnum());
        let progressNumber = cfg.getMaxAchievementValue();

        if (vo.getnum() <= progressNumber) {
            this._progressTF.text = vo.getnum() + "/" + progressNumber;
        }
        else {
            this._progressTF.text = LanguageManager.getlocal("acSearchProoViewLotteryEndTip-" + this.code);
        }
        this._progressTF.x = this._progressBar.x + this._progressBar.width / 2 - this._progressTF.width / 2;

        if (vo.isFree() && (!vo.checkIsInEndShowTime())) {
            this._oneBtn.setText("acSearchProofView_Free-" + this.code);
        }
        else {
            this._oneBtn.setText("acSearchProofView_oneBtn-" + this.code);
        }
        if (!vo.checkAchievementRedDot()) {
            this._boxBM.setRes("acwealthcomingview_box_1");
            this._redDot.setVisible(false);
        }
        else {
            this._boxBM.setRes("acwealthcomingview_box_2");
            this._redDot.setVisible(true);
        }
        this.refreshRedDot();
    }
    /**一次抽奖 */
    private oneBtnClick() {
        let cfg = <Config.AcCfg.SearchProofCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        let vo = <AcSearchProofVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (this._isPlay) {
            return;
        }
        if ((!vo.checkIsInEndShowTime()) && vo.isStart) {
            if (vo.isFree()) {
                this._isPlay = true;
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SEARCHPROOF, { activeId: vo.aidAndCode, isFree: 1, isTenPlay: 0 });

            }
            else {
                let cost = vo.getItemValue();
                if (cost < 1) {
                    // App.CommonUtil.showTip(LanguageManager.getlocal("acSearchProofViewNotEnoughItem-" + this.code));
                    let msg = LanguageManager.getlocal("acSearchProofViewTipMsg-" + this.code);
                    let title = "itemUseConstPopupViewTitle";
                    ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                        msg: msg, title: title, needCancel: true, confirmTxt: "acSearchProofViewGoCharge-" + this.code, handler: this, callback: () => {
                            ViewController.getInstance().openView(ViewConst.POPUP.ACSEARCHPROOFRECHARGEPOPUPVIEW, { code: this.code, aid: this.aid });
                        }
                    });
                    return;
                }
                this._isPlay = true;
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SEARCHPROOF, { activeId: vo.aidAndCode, isFree: 0, isTenPlay: 0 });

            }
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
    }
    /**十次抽奖 */
    private tenBtnClick() {
        let cfg = <Config.AcCfg.SearchProofCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        let vo = <AcSearchProofVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (this._isPlay) {
            return;
        }
        if ((!vo.checkIsInEndShowTime()) && vo.isStart) {
            let cost = vo.getItemValue();
            if (cost < 10) {
                // App.CommonUtil.showTip(LanguageManager.getlocal("acSearchProofViewNotEnoughItem-" + this.code));
                let msg = LanguageManager.getlocal("acSearchProofViewTipMsg-" + this.code);
                let title = "itemUseConstPopupViewTitle";
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    msg: msg, title: title, needCancel: true, confirmTxt: "acSearchProofViewGoCharge-" + this.code, handler: this, callback: () => {
                        ViewController.getInstance().openView(ViewConst.POPUP.ACSEARCHPROOFRECHARGEPOPUPVIEW, { code: this.code, aid: this.aid });
                    }
                });
                return;
            }
            this._isPlay = true;
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SEARCHPROOF, { activeId: vo.aidAndCode, isFree: 0, isTenPlay: 1 });
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
    }

    protected onNPCTouchHandler(e: egret.TouchEvent): void {
        if (this._isPlay) {
            return;
        }
        if (e.type != egret.TouchEvent.TOUCH_BEGIN && e.type != egret.TouchEvent.TOUCH_CANCEL && e.type != egret.TouchEvent.TOUCH_END) {
            return;
        }
        if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
            if (e.currentTarget.alpha != 1) {
                e.currentTarget.alpha = 0.3;
            }

        }
        else if (e.type == egret.TouchEvent.TOUCH_CANCEL) {
            if (e.currentTarget.alpha != 1) {
                e.currentTarget.alpha = 0;
            }

        }
        if (e.type == egret.TouchEvent.TOUCH_END) {
            if (e.currentTarget.alpha != 1) {
                e.currentTarget.alpha = 0;
            }
            let viewName = e.currentTarget.name;
            switch (viewName) {
                case "charge":
                    ViewController.getInstance().openView(ViewConst.POPUP.ACSEARCHPROOFRECHARGEPOPUPVIEW, { code: this.code, aid: this.aid });
                    break;
                case "skin":
                    ViewController.getInstance().openView(ViewConst.POPUP.ACSEARCHPROOFSKINPOPUPVIEW, { code: this.code, aid: this.aid });
                    break;
                case "rewardsPool":
                    ViewController.getInstance().openView(ViewConst.POPUP.ACSEARCHPROOFREWARDSPOOLPOPUPVIEW, { code: this.code, aid: this.aid });
                    break;
            }
        }
    }
    protected tick(): void {
        let cfg = <Config.AcCfg.SearchProofCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        let vo = <AcSearchProofVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);

        if (vo.checkIsInEndShowTime()) {
            this._countDownTime.text = LanguageManager.getlocal("acPunishEnd");
        }
        else {
            this._countDownTime.text = LanguageManager.getlocal("acSearchProofView_acCountTime-" + this.code, [vo.acCountDown]);
        }
        this._countDownTimeBg.width = 60 + this._countDownTime.width;
        this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
        this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);

    }

    private _handlerData = null;
    private _hammerEffect: CustomMovieClip = null;
    private worshipRewardsHandle(event: egret.Event) {
        if (event.data.ret) {

            this._handlerData = event.data.data.data;
            this._hammerEffect.setVisible(true);
            let posCfg = this.getPosCfg()[Math.round(Math.random() * this.getPosCfg().length)];
            if (!posCfg) {
                posCfg = this.getPosCfg()[0];
            }

            this._hammerEffect.setPosition(this._bg.x + posCfg.x, this._bg.y + posCfg.y);
            this._hammerEffect.playWithTime(1);
            this._hammerEffect.setEndCallBack(() => {
                this._hammerEffect.setVisible(false);
                ViewController.getInstance().openView(ViewConst.POPUP.ACWORSHIPGETREWARDPOPUPVIEW, {
                    rewards: this._handlerData.rewards, otherRewards: this._handlerData.otherrewards, criArr: this._handlerData.criArr, code: this.code, aid: this.aid, isPlayAni: true, callback: () => {
                        let vo = <AcSearchProofVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
                        let cfg = <Config.AcCfg.SearchProofCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
                        this._isPlay = false;
                        if (this._startPercent < 1) {
                            let endPercent = vo.getnum() / cfg.getMaxAchievementValue();
                            this.playProgressBarAni(this._startPercent, endPercent, 0.005);
                        }

                        let rewardsVo = GameData.formatRewardItem(this._handlerData.rewards);
                        let itemRewardVo = GameData.formatRewardItem(cfg.mustGet2)[0];
                        let randomType: number = 0;
                        for (let i = 0; i < rewardsVo.length; i++) {
                            if (rewardsVo[0].id == itemRewardVo.id) {
                                randomType = App.MathUtil.getRandom(4, 7);
                                ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW, { idx: "acSearchProof_1_" + randomType + "-" + this.getSearchProofRookCode()});
                                return;
                            }
                        }
                        randomType = App.MathUtil.getRandom(1, 4);
                        ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW, { idx: "acSearchProof_1_" + randomType +  "-" + this.getSearchProofRookCode() });
                    }, handler: this
                });

            }, this);

        }
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
            // this.refreshBanger(startPercent);
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
        let vo = <AcSearchProofVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        let cfg = <Config.AcCfg.SearchProofCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        // bangerBM.setVisible(false);
        let boomEffect = ComponentManager.getCustomMovieClip("boxboomeffect", 8, 70);
        let boom = BaseBitmap.create("boxboomeffect1");
        boomEffect.setScale(1.25);
        boom.setScale(1.25);
        boomEffect.setPosition(startPosX - boom.width * 1.25 / 2, startPosY - boom.height * 1.25 / 2);
        this.addChildToContainer(boomEffect);
        boomEffect.playWithTime(1);
        boomEffect.setEndCallBack(() => {
            this.container.removeChild(boomEffect);
            boomEffect.dispose();
            let lightBall = BaseBitmap.create("acwealthcomingview_lightball")
            lightBall.anchorOffsetX = lightBall.width / 2;
            lightBall.anchorOffsetY = lightBall.height / 2;
            //oneone模式
            lightBall.blendMode = egret.BlendMode.ADD;
            this.addChildToContainer(lightBall);
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
                this.container.removeChild(lightBall);
                lightBall.dispose();
            }, this);

        }, this);
    }





    protected getRuleInfo(): string {
        return "acSearchProofRuleInfo-" + this.code;
    }
    protected getBgName(): string {
        return null;
    }

    protected getTitleBgName(): string {
        return null;
    }
    protected getTitleStr(): string {
        return null;
    }
    protected getResourceList(): string[] {
        return super.getResourceList().concat([
            "acwealthcarpview_skineffect", "acsearchproofview_common_skintxt", "acarcadeview-" + this.getUiCode(),
            "acwealthcomingview_numbg", "progress12", "progress12_bg", "acwealthcomingview_progresslight", "acworshipview_slider",
            "luckdrawprogressbg-1", "acwealthcomingview_box_light", "acwealthcomingview_box_1", "acwealthcomingview_box_2", "luckydrawrewardword-2",
            "acworshipview_box3", "acworshipview_box2", "acworshipview_box1", "boxboomeffect", "acsearchproofvieweffect_search", "acsearchproofview_common_dark", "acsearchproofview_common_yellow",
            "acsearchproofvieweffect_charge"
        ]);
    }
    protected getUiCode(): string {
        if (this.code == "2") {
            return "1";
        }
        return super.getUiCode();
    }

    protected getSearchProofRookCode():string{
        if (this.code == "2"){
            return "1";
        }
        else if (this.code == "4"){
            return "3";
        }else if (this.code == "6"){
            return "5";
        }else if (this.code == "8"){
            return "7";
        }

        return super.getUiCode();
    }

    protected getProbablyInfo(): string {
        return "";
    }

    public dispose(): void {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_SEARCHPROOF, this.worshipRewardsHandle, this);
        this._countDownTime = null;
        this._countDownTimeBg = null;
        this.bubbleTip = null;
        this.redDotObj = {};
        this.brandObj = {};
        this._bg = null;
        this._isPlay = false;
        this._oneBtn = null;
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
        super.dispose();
    }
}
