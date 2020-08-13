/*
author : qianjun
desc : 母亲节活动
*/
class AcMotherDayView extends AcCommonView {
    private _cdText: BaseTextField = null;
    private _midGroup: BaseDisplayObjectContainer = null;
    private timebg: BaseBitmap = null;
    private _isPlay: boolean = false;
    private _getOneBtn: BaseButton = null;
    private _getAllBtn: BaseButton;
    private _costNumTxt2: BaseTextField = null;
    private _bigPrize: BaseBitmap = null;
    private _flowerNumTxt: BaseTextField = null;
    private _flowernumbg: BaseBitmap = null;
    private _tenPick: boolean;
    private _rechargeBtn: BaseButton = null;
    private _flowerbg: BaseBitmap = null;
    private _freeTxt: BaseTextField = null;

    private _sceneBtn: BaseButton = null;
    public constructor() {
        super();
    }

    private get cfg(): Config.AcCfg.MotherDayCfg {
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo(): AcMotherDayVo {
        return <AcMotherDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId(): string {
        return `${this.aid}-${this.code}`;
    }

    protected getUiCode(): string {
        let code = '';
        switch (Number(this.code)) {
            case 2:
            case 5:
            case 6:
                code = '1';
                break;
            case 4:
                code = '3';
                break;
            case 7:
            case 8:
                code = '7';
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }

    private isSpecailCode():boolean{
        return Number(this.code) > 4 && Number(this.code) < 7;
    }
    /** 
     * 重写区
    */
    protected getRuleInfo(): string {
        let code = this.getUiCode();
        if(this.isSpecailCode()){
            code = this.code;
        }
        return "acMotherDayInfo-" + code;
    }
    protected getTitleStr(): string {
        return null;
    }
    protected getTitleBgName(): string {
        return "motherdaytitle-" + this.getUiCode();
    }
    protected getProbablyInfo(): string {
        return "acMotherProbablyInfo-" + this.getUiCode();
    }

    protected getResourceList(): string[] {
        let view = this;
        let code = view.getUiCode();
        let arr = [];
        if(this.code == `5` || this.code == `6`){
            arr.push(`motherdaytop-${this.code}`);
        }
        if(code == `7`){
            arr.push(`motherday-3`);
        }
        return super.getResourceList().concat([
            `motherday-${code}`, `arena_bottom`, `motherdaymidbg-${code}`, `motherdayboat-${code}`, `motherdayboxboom1-`, `motherdayboxloop1-`,
            `acwealthcarpview_servantskintxt`, `acwealthcarpview_skineffect1`, `acwealthcarpview_skineffect`, `acturantable_taskbox_light`,
            "acchristmasview_smalldescbg"
        ]).concat(arr);
    }

    /**
	 * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
	 */
    protected getReportTipData(): { title: { key: string, param?: string[] }, msg: { key: string, param?: string[] } } {
        return { title: { key: `motherdayreporttitle-${this.getUiCode()}` }, msg: { key: `motherdayreportkey-${(this.code == `5` || this.code == `6`) ? this.code : this.getUiCode()}` } };
    }

    /** 
     * 自定义实现
    */
    public initView() {
        let view = this;
        let waterclip1: CustomMovieClip = null;
        let waterclip2: CustomMovieClip = null;
        let code = view.getUiCode();
        if (code == "1") {
            waterclip1 = ComponentManager.getCustomMovieClip(`motherdaywater${view.getUiCode()}-`, 10, 70);
            waterclip1.width = 128;
            waterclip1.height = 786;
            waterclip1.anchorOffsetX = waterclip1.width / 2;
            waterclip1.anchorOffsetY = waterclip1.height / 2;
            view.addChild(waterclip1);
            waterclip1.playWithTime(-1);

            waterclip2 = ComponentManager.getCustomMovieClip(`motherdaywater${view.getUiCode()}-`, 10, 70);
            waterclip2.width = 128;
            waterclip2.height = 786;
            waterclip2.anchorOffsetX = waterclip2.width / 2;
            waterclip2.anchorOffsetY = waterclip2.height / 2;
            view.addChild(waterclip2);
            waterclip2.playWithTime(-1);
        }
        if (code == "3" || code == "7") {
            this.mapPos = {
                x: [23, 117, 211, 305, 399],
                y: [23, 117, 211, 305, 399],
            }
        }

        view._tenPick = false;
        view._boxId = 0;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        
        /***顶部信息***/
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MOTHERDAY_FRESH_ITEM, view.freshView, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MOTHERDAY_SENDFLOWERS), view.sendCallBack, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MOTHERDAY_GETBOX), view.boxCallBack, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MOTHERDAY_GETBIGPRIZE), view.boxCallBack, view);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashSceneBtn, this);

        let boat = BaseBitmap.create(`motherdayboat-${code}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, boat, view, [0, -15]);
        view.addChild(boat);

        let topBg: BaseBitmap | BaseLoadBitmap = null;

        if (code == "1") {
            if(ResourceManager.hasRes(`motherdaytop-${this.code}`)){
                topBg = BaseBitmap.create(`motherdaytop-${this.code}`);
            }
            else{
                topBg = BaseBitmap.create(`motherdaytop-${code}`);
            }
            view.addChild(topBg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, view.titleBg, [0, view.titleBg.height - 17]);

            waterclip1.scaleX = -1;
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, waterclip1, topBg, [0, topBg.height - 10]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, waterclip2, topBg, [0, topBg.height - 10]);

            //衣装预览
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
                if (view._isPlay) {
                    return;
                }
                ViewController.getInstance().openView(ViewConst.POPUP.ACMOTHERDAYSKINPOPUPVIEW, {
                    aid: view.aid,
                    code: view.code
                });
            }, ViewController);
        }
        else if (code == "3" || code == "7") {
            topBg = BaseLoadBitmap.create(App.CommonUtil.getResByCode("acmotherdayview_common_descbg", code));
            topBg.width = 640;
            topBg.height = 146;
            topBg.setPosition(this.titleBg.x, this.titleBg.y + this.titleBg.height - 7 - 19);
            view.addChild(topBg);

            let sceneBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("motherdayscenebtn",code), null, () => {
                ViewController.getInstance().openView(ViewConst.POPUP.ACMOTHERDAYSCENEREWARDPOPUPVIEW, { aid: this.aid, code: this.code, uicode: this.getUiCode() });
            }, this);
            sceneBtn.setPosition(topBg.x + 25, topBg.y + topBg.height / 2 - sceneBtn.height / 2 + 9);
            view.addChild(sceneBtn);
            this._sceneBtn = sceneBtn;
        }

        //活动日期
        let tip1Text = ComponentManager.getTextField(LanguageManager.getlocal(`acMotherDayTopTip1-1`, [view.vo.acTimeAndHour]), 18);
        view.addChild(tip1Text);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip1Text, topBg, [222, 54]);
        if (this.getUiCode() == "3" || this.getUiCode() == "7") {
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip1Text, topBg, [120, 18 + 19]);
        }

        let str = '';
        if (view.vo.isInActivity()) {
            str = App.DateUtil.getFormatBySecond(view.vo.getCountDown());
        }
        else {
            str = `<font color=0x21eb39>${LanguageManager.getlocal(`acPunishEnd`)}</font>`;
        }

        let tip3Text = ComponentManager.getTextField(LanguageManager.getlocal(`acMotherDayTopTip2-${this.isSpecailCode()? this.code : code}`), 18);
        tip3Text.lineSpacing = 5;
        tip3Text.width = 390;
        if (this.getUiCode() == "3" || this.getUiCode() == "7") {
            tip3Text.width = 490;
        }
        view.addChild(tip3Text);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip3Text, tip1Text, [0, tip1Text.textHeight + 5]);

        //倒计时位置 
        let timebg = BaseBitmap.create("public_9_bg61");
        view.addChild(timebg);
        timebg.x = 380;
        timebg.y = topBg.y + (topBg.height - timebg.height) * 0.5 + 97;
        if (this.getUiCode() == "3" || this.getUiCode() == "7") {
            timebg.y = topBg.y + topBg.height - timebg.height / 2 - 2;
        }
        view.timebg = timebg;

        let tip2Text = ComponentManager.getTextField(LanguageManager.getlocal(`acMotherDayTopTip3-1`, [str]), 20);
        view.addChild(tip2Text);
        view._cdText = tip2Text;
        tip2Text.x = timebg.x + 25;
        tip2Text.y = timebg.y + 4;
        timebg.width = tip2Text.width + 50;
        if (timebg.width < 270) {
            timebg.width = 270;
            timebg.x = 350;
            tip2Text.x = this.timebg.x + (timebg.width - tip2Text.width) * 0.5;
        }
        let flowerbg = BaseBitmap.create(`motherdaymidbg-${code}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, flowerbg, boat, [75, 405]);
        if (this.getUiCode() == "3" || this.getUiCode() == "7") {
            // flowerbg.setPosition(topBg.x + 60, topBg.y + topBg.height + 70);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, flowerbg, boat, [60, 345]);
        }
        view.addChild(flowerbg);
        view._flowerbg = flowerbg;

        let midGroup = new BaseDisplayObjectContainer();
        midGroup.width = flowerbg.width;
        midGroup.height = flowerbg.height
        view.addChild(midGroup);
        view._midGroup = midGroup;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, midGroup, flowerbg);
        //初始化花朵
        let arr = view.vo.getFlowers();
        for (let i in arr) {
            view.freshFlowerById(Number(i) + 1);
        }
        //初始化宝箱
        for (let i = 1; i < 6; ++i) {
            let boxbg = BaseBitmap.create(`motherdayboxbg2-${Number(code) == 7 ? '3' : code}`);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, boxbg, flowerbg, [flowerbg.width + 8, 15 + (i - 1) * (35 + boxbg.height)]);
            if (this.getUiCode() == "3" || this.getUiCode() == "7") {
                boxbg.setPosition(flowerbg.x + flowerbg.width - 20, flowerbg.y + 20 + 47 + 2 + (i - 1) * 94 - boxbg.height / 2);
            }
            view.addChild(boxbg);

            let box = BaseBitmap.create(`motherdaybox${view.vo.getBoxStatus(i)}-${Number(code) == 7 ? '3' : code}`);
            box.anchorOffsetX = box.width / 2;
            box.anchorOffsetY = box.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, box, boxbg, [5, 0]);
            view.addChild(box);
            box.name = `box${i}`;
            box.addTouchTap(view.boxClick, view, [i]);
        }

        for (let i = 10; i > 5; --i) {
            let boxbg = BaseBitmap.create(`motherdayboxbg1-${Number(code) == 7 ? '3' : code}`);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, boxbg, flowerbg, [28 + (10 - i) * (40 + boxbg.width), flowerbg.height + 3]);
            if (this.getUiCode() == "3" || this.getUiCode() == "7") {
                boxbg.setPosition(flowerbg.x + 20 + 47 + 2 + (10 - i) * 94 - boxbg.width / 2, flowerbg.y + flowerbg.height - 20);
            }
            view.addChild(boxbg);

            let box = BaseBitmap.create(`motherdaybox${view.vo.getBoxStatus(i)}-${Number(code) == 7 ? '3' : code}`);
            box.anchorOffsetX = box.width / 2;
            box.anchorOffsetY = box.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, box, boxbg, [0, 0]);
            view.addChild(box);
            box.name = `box${i}`;
            box.addTouchTap(view.boxClick, view, [i]);

            if (i == 6) {
                let bigBg = BaseBitmap.create(`motherdayboxbg3-${Number(code) == 7 ? '3' : code}`);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, bigBg, box, [20 + box.width, 0]);
                view.addChild(bigBg);

                let bigboxstatus = view.vo.getBigBoxStatus();
                let bigPrize = BaseBitmap.create(`motherdayfinalbox${bigboxstatus == 0 ? 1 : bigboxstatus}-${Number(code) == 7 ? '3' : code}`);
                bigPrize.anchorOffsetX = bigPrize.width / 2;
                bigPrize.anchorOffsetY = bigPrize.height / 2;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bigPrize, bigBg);
                view.addChild(bigPrize);
                view._bigPrize = bigPrize;

                let bigWord = BaseBitmap.create(`motherdayreward-${Number(code) == 7 ? '3' : code}`);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bigWord, bigPrize, [0, -3]);
                view.addChild(bigWord);

                bigPrize.addTouchTap(view.boxClick, view, [11]);
            }
        }
        view.freshBox();
        //鲜花数量
        let flowernumbg = BaseBitmap.create(`public_9_resbg`);
        if (this.getUiCode() == "3" || this.getUiCode() == "7") {
            flowernumbg.setRes("acchristmasview_smalldescbg");
            flowernumbg.width = 160;
            flowernumbg.height = 30;
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, flowernumbg, flowerbg, [0, flowerbg.height + 60]);
        view.addChild(flowernumbg);
        view._flowernumbg = flowernumbg;

        let flowericon = BaseLoadBitmap.create(`motherdayicon2-${code}`);
        flowericon.width = flowericon.height = 50;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, flowericon, flowernumbg, [-5, 0]);
        view.addChild(flowericon);

        let numTxt = ComponentManager.getTextField(`${view.vo.getFlowerNum()}`, 20);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, numTxt, flowernumbg, [40 + (95 - numTxt.textWidth) / 2, 0]);
        view.addChild(numTxt);
        view._flowerNumTxt = numTxt;
        /***底部按钮***/
        let bottombg = BaseBitmap.create(`arena_bottom`);
        bottombg.height = 100;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view);
        view.addChild(bottombg);

        let oneBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, ``, () => {
            if (view._isPlay) {
                return;
            }
            if (!view.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (view.vo.getFlowerNum() == 0 && !view.vo.isFree()) {
                if (this.getUiCode() == "3" || this.getUiCode() == "7") {
                    ViewController.getInstance().openView(ViewConst.POPUP.ACMOTHERDAYACTIVITYREWARDPOPUPVIEW, {
                        aid: this.aid,
                        code: this.code,
                    });
                    return;
                }
                ViewController.getInstance().openView(ViewConst.COMMON.ACMOTHERDAYCHARGEVIEW, {
                    aid: this.aid,
                    code: this.code,
                });
                return;
            }
            //献花一次
            NetManager.request(NetRequestConst.REQUEST_MOTHERDAY_SENDFLOWERS, {
                activeId: view.vo.aidAndCode,
                isTenPlay: 0
            });

        }, view);
        view._getOneBtn = oneBtn;
        view.addChild(oneBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, oneBtn, bottombg, [85, 0]);

        let freeTxt = ComponentManager.getTextField(LanguageManager.getlocal(`sysFreeDesc`), 20);
        view.addChild(freeTxt);
        freeTxt.visible = view.vo.isFree();
        view._freeTxt = freeTxt;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, freeTxt, oneBtn, [0, oneBtn.height]);

        let costNumTxt = ComponentManager.getTextField(LanguageManager.getlocal(`motherdaysendflower-${Number(code) == 7 ? `3` : code}`), 20, TextFieldConst.COLOR_BLACK)
        view.addChild(costNumTxt);

        let icon = BaseLoadBitmap.create(`motherdayicon2-${code}`);
        icon.width = icon.height = 50;
        view.addChild(icon);

        let costNum = ComponentManager.getTextField(`x1`, 20, TextFieldConst.COLOR_BLACK);
        view.addChild(costNum);

        let tmpx = (oneBtn.width - costNumTxt.textWidth - icon.width - costNum.textWidth - 3) / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, costNumTxt, oneBtn, [tmpx, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, costNumTxt, [costNumTxt.width - 2, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, costNum, icon, [55, 0]);

        let allBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, ``, () => {
            if (view._isPlay) {
                return;
            }
            if (!view.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (view.vo.getFlowerNum() < 2) {
                if (this.getUiCode() == "3" || this.getUiCode() == "7") {
                    ViewController.getInstance().openView(ViewConst.POPUP.ACMOTHERDAYACTIVITYREWARDPOPUPVIEW, {
                        aid: this.aid,
                        code: this.code,
                    });
                    return;
                }
                ViewController.getInstance().openView(ViewConst.COMMON.ACMOTHERDAYCHARGEVIEW, {
                    aid: this.aid,
                    code: this.code,
                });
                return;
            }
            //献花多次
            view._tenPick = true;
            NetManager.request(NetRequestConst.REQUEST_MOTHERDAY_SENDFLOWERS, {
                activeId: view.vo.aidAndCode,
                isTenPlay: 1
            });
            //view.pickCallBack();
        }, view);
        view._getAllBtn = allBtn;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, allBtn, bottombg, [85, 0]);
        view.addChild(allBtn);

        let icon2 = BaseLoadBitmap.create(`motherdayicon2-${code}`);
        icon2.width = icon2.height = 50;
        view.addChild(icon2);

        let costTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(`motherdaysendflower-${Number(code) == 7 ? `3` : code}`), 20, TextFieldConst.COLOR_BLACK)
        view.addChild(costTxt2);

        let costNumTxt2 = ComponentManager.getTextField(`x${Math.min(10, Math.max(view.vo.getFlowerNum(), 2))}`, 20, TextFieldConst.COLOR_BLACK);
        view.addChild(costNumTxt2);
        view._costNumTxt2 = costNumTxt2;

        let tmpX2 = (allBtn.width - icon2.width - costNumTxt2.textWidth - costTxt2.textWidth - 3) / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, costTxt2, allBtn, [tmpX2, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon2, costTxt2, [costTxt2.width - 2, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, costNumTxt2, icon2, [52, 0]);
        /***中部展示***/
        let rechargeBtn = ComponentManager.getButton(`motherdaychargebtn-${Number(code) == 7 ? '3' : code}`, ``, () => {
            if (view._isPlay) {
                return;
            }
            if (this.getUiCode() == "3" || this.getUiCode() == "7") {
                ViewController.getInstance().openView(ViewConst.POPUP.ACMOTHERDAYACTIVITYREWARDPOPUPVIEW, {
                    aid: this.aid,
                    code: this.code,
                });
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.ACMOTHERDAYCHARGEVIEW, {
                aid: this.aid,
                code: this.code,
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rechargeBtn, topBg, [3, topBg.height + 3]);
        view.addChild(rechargeBtn);
        view._rechargeBtn = rechargeBtn;
        if (view.vo.getpublicRedhot2()) {
            App.CommonUtil.addIconToBDOC(rechargeBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(rechargeBtn);
        }

        let ckanBtn = ComponentManager.getButton(`motherdayrewardbtn-${Number(code) == 7 ? '3' : code}`, ``, () => {
            if (view._isPlay) {
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACMOTHERDAYCARDPOOLVIEW, {
                aid: this.aid,
                code: this.code,
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, ckanBtn, rechargeBtn, [0, rechargeBtn.height + 3]);
        view.addChild(ckanBtn);
        /***底部进度***/
        view.setChildIndex(view.titleBg, 9999);
        view.setChildIndex(view.closeBtn, 9999);
        view.setChildIndex(view._ruleBtn, 9999)
        view.tick();
    }

    public hide(): void {
        let view = this;
        if (view._isPlay) {
            return;
        }
        super.hide();
    }

    private refreashSceneBtn() {
        let vo = <AcMotherDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (this._sceneBtn) {
            if (vo.sceneRedDot()) {
                App.CommonUtil.addIconToBDOC(this._sceneBtn);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this._sceneBtn);
            }
        }
    }
    public tick(): void {
        let view = this;
        if (view._cdText) {
            let str = '';
            if (view.vo.isInActivity()) {
                str = App.DateUtil.getFormatBySecond(view.vo.getCountDown());
            }
            else {
                str = `<font color=0x21eb39>${LanguageManager.getlocal(`acPunishEnd`)}</font>`;
            }
         
            view._cdText.text = LanguageManager.getlocal(`acLuckyDrawTopTip2-1`, [str]);

            if (view.timebg) {
                view.timebg.width = view._cdText.width + 50;
                view.timebg.x = 350;
                view._cdText.x = view.timebg.x + (view.timebg.width - view._cdText.width) * 0.5;
            }
        }
        if (view.vo.getpublicRedhot2() || view.vo.checTaskRedDot()) {
            App.CommonUtil.addIconToBDOC(view._rechargeBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._rechargeBtn);
        }
        this.refreashSceneBtn();
    }

    private freshFlower(): void {
        let view = this;
        let arr = view.vo.getFlowers();
        for (let i in arr) {
            view.freshFlowerById(Number(i) + 1);
        }
    }

    private freshView(): void {
        let view = this;
        view._costNumTxt2.text = `x${String(Math.min(10, Math.max(view.vo.getFlowerNum(), 2)))}`;
        //鲜花数目
        view._flowerNumTxt.text = String(view.vo.getFlowerNum());
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._flowerNumTxt, view._flowernumbg, [40 + (95 - view._flowerNumTxt.textWidth) / 2, 0]);
        view.freshBox();
        view._freeTxt.visible = view.vo.isFree();
    }

    private freshBox(): void {
        let view = this;
        let code = view.getUiCode();
        for (let i = 1; i < 11; ++i) {
            let box = <BaseBitmap>view.getChildByName(`box${i}`);
            let boxLight = <CustomMovieClip>view.getChildByName(`boxLight${i}`);
            let status = view.vo.getBoxStatus(i);
            if (box) {
                box.setRes(`motherdaybox${status}-${Number(code) == 7 ? '3' : view.getUiCode()}`);
                if (status == 2) {
                    if (!boxLight) {
                        //特效
                        let light = ComponentManager.getCustomMovieClip(`motherdayboxloop1-`, 10, 70);
                        light.width = 86;
                        light.height = 85;
                        light.playWithTime(0);
                        light.name = `boxLight${i}`;
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, light, box, [0, i > 5 ? 3 : 0]);
                        view.addChildAt(light, view.getChildIndex(box));
                        egret.Tween.get(box, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
                    }
                }
                else {
                    if (boxLight) {
                        egret.Tween.removeTweens(box);
                        box.rotation = 0;
                        boxLight.dispose();
                    }
                }
            }
        }

        let bigboxstatus = view.vo.getBigBoxStatus();
        view._bigPrize.setRes(`motherdayfinalbox${bigboxstatus == 0 ? 1 : 2}-${Number(code) == 7 ? '3' : code}`);
        let bigboxLight = <CustomMovieClip>view.getChildByName(`bigboxLight`);
        if (bigboxstatus == 1) {
            if (!bigboxLight) {
                let light = ComponentManager.getCustomMovieClip(`motherdayboxloop1-`, 10, 70);
                light.width = 86;
                light.height = 85;
                light.setScale(1.5);
                light.playWithTime(0);
                light.name = `bigboxLight`;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, light, view._bigPrize);
                view.addChildAt(light, view.getChildIndex(view._bigPrize));
                egret.Tween.get(view._bigPrize, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
            }
        }
        else {
            if (bigboxLight) {
                egret.Tween.removeTweens(view._bigPrize);
                view._bigPrize.rotation = 0;
                bigboxLight.dispose();
            }
        }
    }
    //行
    private mapPos = {
        x: [75, 169, 263, 357, 448],
        y: [365, 456, 538, 640, 737]
    }

    private freshFlowerById(id: number, flag: boolean = false): void {
        let view = this;
        let status = view.vo.getFlowerStatus(id);
        if (flag) {
            status = 2;
        }
        let flower = view._midGroup.getChildByName(`flower${id}`);
        let row = Math.ceil(id / 5);
        let col = (id - 1) % 5 + 1;
        if (status == 1) {
            if (!flower) {
                if (this.getUiCode() == "1") {
                    let flowerbmp = BaseBitmap.create(`motherdayflower${row}-${view.getUiCode()}`);
                    flowerbmp.setScale(0.5);
                    flowerbmp.x = view.mapPos.x[col - 1] - 70;
                    flowerbmp.y = view.mapPos.y[row - 1] - 405;
                    flowerbmp.name = `flower${id}`;
                    view._midGroup.addChild(flowerbmp);
                }
            }
            else {
                if (this.getUiCode() == "3" || this.getUiCode() == "7") {
                    view._midGroup.removeChild(flower);
                }
            }
        }
        else if (status == 2) {
            if (flower) {
                if (this.getUiCode() == "1") {
                    view._midGroup.removeChild(flower);
                }
            }
            else {
                if (this.getUiCode() == "3" || this.getUiCode() == "7") {
                    let flowerbmp = BaseBitmap.create(`motherdayflower${id}-${view.getUiCode()}`);
                    flowerbmp.x = view.mapPos.x[col - 1];
                    flowerbmp.y = view.mapPos.y[row - 1];
                    flowerbmp.name = `flower${id}`;
                    view._midGroup.addChild(flowerbmp);
                }
            }
        }
    }

    private flowerMovie(data: any): void {
        if (this.getUiCode() == "3" || this.getUiCode() == "7") {
            this.flowerNewMovie(data);
            return;
        }
        let code = this.getUiCode();
        let view = this;
        view._isPlay = true;
        let id = Number(data.flowerIndex);
        let flower = view._midGroup.getChildByName(`flower${id}`);
        if (flower) {
            //遮罩
            let mask = BaseBitmap.create(`public_9_viewmask`);
            mask.width = GameConfig.stageWidth;
            mask.height = GameConfig.stageHeigth;
            mask.alpha = 0;
            view.addChild(mask);
            egret.Tween.get(mask).to({ alpha: 1 }, 800).wait(930).to({ alpha: 0 }, 600).call(() => {
                egret.Tween.removeTweens(mask);
                mask.dispose();
                mask = null;
                view._isPlay = false;
            }, view);
            let row = Math.ceil(id / 5);
            let flowereff = BaseBitmap.create(`motherdayfloweff${row}-${view.getUiCode()}`);
            flowereff.anchorOffsetX = flowereff.width / 2;
            flowereff.anchorOffsetY = flowereff.height / 2;
            flowereff.setScale(0.5);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, flowereff, flower, [-flowereff.anchorOffsetX / 2, -flowereff.anchorOffsetY / 2]);
            let global = view._midGroup.localToGlobal(flowereff.x, flowereff.y);
            flowereff.setPosition(global.x, global.y);

            let flowereff2 = BaseBitmap.create(`motherdayfloweff${row}-${view.getUiCode()}`);
            flowereff2.anchorOffsetX = flowereff2.width / 2;
            flowereff2.anchorOffsetY = flowereff2.height / 2;
            flowereff2.setScale(0.5);
            flowereff2.alpha = 0;
            flowereff2.blendMode = egret.BlendMode.ADD;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, flowereff2, flowereff, [0, -74]);

            let flowereff3 = BaseBitmap.create(`motherdayfloweff${row}-${view.getUiCode()}`);
            flowereff3.anchorOffsetX = flowereff3.width / 2;
            flowereff3.anchorOffsetY = flowereff3.height / 2;
            flowereff3.setScale(0.5);
            flowereff3.alpha = 0;
            flowereff3.blendMode = egret.BlendMode.ADD;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, flowereff3, flowereff, [0, -76]);

            let flash = BaseBitmap.create(`motherdayflowerflash-${view.getUiCode()}`);
            flash.anchorOffsetX = flash.width / 2;
            flash.anchorOffsetY = flash.height / 2;
            flash.setScale(0.5);
            flash.alpha = 0;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, flash, flowereff, [0, 43]);
            flash.x = flowereff.x;

            let flowerclip = ComponentManager.getCustomMovieClip(`motherdayflowerflasheff${view.getUiCode()}-`, 9, 70);
            flowerclip.blendMode = egret.BlendMode.ADD;
            flowerclip.width = 172;
            flowerclip.height = 176;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, flowerclip, flowereff, [flowereff.anchorOffsetX / 2, -31]);

            let flowerloop = ComponentManager.getCustomMovieClip(`motherdayflowerloop${view.getUiCode()}-`, 10, 70);
            flowerloop.blendMode = egret.BlendMode.ADD;
            flowerloop.width = 224;
            flowerloop.height = 175;
            flowerloop.anchorOffsetX = flowerloop.width / 2;
            flowerloop.anchorOffsetY = flowerloop.height / 2;
            flowerloop.playWithTime(-1);
            flowerloop.alpha = 0;
            flowerloop.x = flash.x - 10;
            flowerloop.y = flash.y - 40;
            //花束
            view.addChild(flash);
            view.addChild(flowerloop);
            egret.Tween.get(flash).wait(400).to({ alpha: 1 }, 470).
                wait(860).
                to({ alpha: 0 }, 270).
                call(() => {
                    egret.Tween.removeTweens(flash);
                    flash.dispose();
                    flash = null;
                }, view);
            let point1 = new egret.Point(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2 + 105);
            egret.Tween.get(flash).wait(870).to({ scaleX: 1, scaleY: 1, x: point1.x, y: point1.y }, 260)
            //花1
            let point2 = new egret.Point(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2 + 20);
            view.addChild(flowereff);
            egret.Tween.get(flowereff).
                to({ scaleX: 0.7, scaleY: 0.6 }, 130).
                to({ scaleX: 0.35, scaleY: 0.65 }, 140).
                to({ scaleX: 0.55, scaleY: 0.5 }, 200).
                to({ scaleX: 0.5, scaleY: 0.5 }, 260).wait(140).
                to({ scaleX: 1, scaleY: 1 }, 260);

            egret.Tween.get(flowereff).wait(1730).to({ alpha: 0 }, 270).call(() => {
                egret.Tween.removeTweens(flowereff);
                flowereff.dispose();
                flowereff = null;
            }, view);

            let tmpY = flowereff.y;
            egret.Tween.get(flowereff).
                to({ y: tmpY + 9 }, 130).
                to({ y: tmpY - 69 }, 140).
                to({ y: tmpY - 86 }, 200).
                wait(400).
                to({ x: point2.x, y: point2.y }, 260);
            //花2
            view.addChild(flowereff2);
            egret.Tween.get(flowereff2).wait(400).
                to({ alpha: 1 }, 200).
                to({ alpha: 0.4 }, 270).wait(860).
                to({ alpha: 0 }, 270);

            let point3 = new egret.Point(point2.x + 1, point2.y + 19);
            egret.Tween.get(flowereff2).wait(870).
                to({ x: point3.x, y: point3.y, scaleX: 1, scaleY: 1 }, 260).call(() => {
                    egret.Tween.removeTweens(flowereff2);
                    flowereff2.dispose();
                    flowereff2 = null;
                }, view);
            //花3
            view.addChild(flowereff3);
            egret.Tween.get(flowereff3).wait(400).
                to({ alpha: 1 }, 200).
                to({ alpha: 0 }, 270).call(() => {
                    egret.Tween.removeTweens(flowereff3);
                    flowereff3.dispose();
                    flowereff3 = null;
                }, view);

            egret.Tween.get(flowereff3).wait(400).
                to({ scaleX: 1, scaleY: 1 }, 470);
            //花束动画
            view.addChild(flowerclip);
            flowerclip.setEndCallBack(() => {
                flowerclip.dispose();
                flowerclip = null;
            }, view);
            egret.Tween.get(flowerclip).wait(470).call(() => {
                flowerclip.playWithTime(1);
            }, view)
            //花束循环
            egret.Tween.get(flowerloop).wait(200).
                to({ alpha: 1 }, 670).
                wait(860).
                to({ alpha: 0 }, 270).
                call(() => {
                    flowerloop.dispose();
                    flowerloop = null;
                    //播放动画
                    ViewController.getInstance().openView(ViewConst.POPUP.ACMOTHERDAYREWARDSHOWVIEW, {
                        aid: view.aid,
                        code: view.code,
                        rewards: data.rewards,
                        callback: () => {
                            view._isPlay = false;
                            if (data.fullFlag) {
                                view.changeFlower();
                            }
                            else {
                                view.freshFlower();
                            }
                        },
                        callobj: view
                    });
                }, view);

            egret.Tween.get(flowerloop).wait(870).
                to({ x: point2.x - 15, y: point2.y + 3, scaleX: 2, scaleY: 2 }, 260);

        }
        else {
            //播放动画
            ViewController.getInstance().openView(ViewConst.POPUP.ACMOTHERDAYREWARDSHOWVIEW, {
                aid: view.aid,
                code: view.code,
                rewards: data.rewards,
                callback: () => {
                    view._isPlay = false;
                    if (data.fullFlag) {
                        view.changeFlower();
                    }
                    else {
                        view.freshFlower();
                    }
                },
                callobj: view
            });
        }
    }
    /**code 3 4 动画 */
    private flowerNewMovie(data: any) {
        this._isPlay = true;
        let id = Number(data.flowerIndex);
        let flower = this._midGroup.getChildByName(`flower${id}`);
        let code = this.getUiCode();

        // acmotherdayvieweffect_jigsaw
        if (flower) {
            ViewController.getInstance().openView(ViewConst.POPUP.ACMOTHERDAYREWARDSHOWVIEW, {
                aid: this.aid,
                code: this.code,
                rewards: data.rewards,
                callback: () => {
                    this._isPlay = false;
                    if (data.fullFlag) {
                        this.changeFlower();
                    }
                    else {
                        this.freshFlower();
                    }
                },
                callobj: this
            });
        }
        else {
            let r = id % 5 == 0 ? 5 : id % 5;
            let c = id / 5 == 0 ? id / 5 : Math.round(id / 5) + 1;
            let x = this.mapPos.x[r - 1];
            let y = this.mapPos.y[c - 1];

            let flowerEffect = BaseBitmap.create("motherdayflower" + id + "-" + code);
            flowerEffect.anchorOffsetX = flowerEffect.width / 2;
            flowerEffect.anchorOffsetY = flowerEffect.height / 2;
            flowerEffect.setPosition(this._midGroup.width / 2, this._midGroup.height / 2);
            this._midGroup.addChild(flowerEffect);
            flowerEffect.setScale(0);
            egret.Tween.get(flowerEffect).to({
                scaleX: 2.4,
                scaleY: 2.4,
            }, 100).to({
                scaleX: 2,
                scaleY: 2,
            }, 130).wait(440).to({
                scaleX: 1,
                scaleY: 1,
                x: x + 47,
                y: y + 47,
            }, 100).call(() => {
                egret.Tween.removeTweens(flowerEffect);
                this._midGroup.removeChild(flowerEffect);
                flowerEffect.dispose();
                flowerEffect = null;
                if (!data.fullFlag) {
                    this.freshFlower();
                }
                ViewController.getInstance().openView(ViewConst.POPUP.ACMOTHERDAYREWARDSHOWVIEW, {
                    aid: this.aid,
                    code: this.code,
                    rewards: data.rewards,
                    callback: () => {
                        this._isPlay = false;
                        if (data.fullFlag) {
                            this.changeFlower();
                        }
                        else {
                            // this.freshFlower();
                        }
                    },
                    callobj: this
                });
            }, this);


            let clip = ComponentManager.getCustomMovieClip("acmotherdayvieweffect_jigsaw", 10, 70);
            clip.anchorOffsetX = 187;
            clip.anchorOffsetY = 192.5;
            clip.setPosition(this._midGroup.width / 2, this._midGroup.height / 2);
            this._midGroup.addChild(clip);
            clip.playWithTime(1);
            clip.setEndCallBack(() => {
                this._midGroup.removeChild(clip);
                clip.dispose();
                clip = null;
            }, this);



        }

    }

    private sendCallBack(evt: egret.Event): void {
        let view = this;
        if(!evt.data.ret){
            return;
        }
        if (evt.data.data.ret < 0) {
            return;
        }
        let data = evt.data.data.data;
        if (data) {
            if (view._tenPick) {
                view._tenPick = false;
                ViewController.getInstance().openView(ViewConst.POPUP.ACMOTHERDAYREWARDSHOWVIEW, {
                    aid: view.aid,
                    code: view.code,
                    rewards: data.rewards,
                    callback: () => {
                        if (data.fullFlag) {
                            view.changeFlower();
                        }
                        else {
                            view.freshFlower();
                        }
                    },
                    callobj: view
                });
            }
            else {
                view.flowerMovie(data);
            }
        }
    }

    private _boxId = 0;
    private boxClick(event: egret.Event, id: number): void {
        let view = this;
        if (view._isPlay) {
            return;
        }
        if (view.vo.isActyEnd()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if ((id == 11 && view.vo.getBigBoxStatus() == 1) || (id < 11 && view.vo.getBoxStatus(id) == 2)) {
            let box = id == 11 ? view._bigPrize : view.getChildByName(`box${id}`);
            view._isPlay = true;
            let boomeff = ComponentManager.getCustomMovieClip(`motherdayboxboom1-`, 10, 70);
            boomeff.width = 92;
            boomeff.height = 93;
            boomeff.setScale(id == 11 ? 3 : 2);
            boomeff.playWithTime(1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, boomeff, box, [0, 0]);//id > 5 && id != 11 ? 3 : 0
            view.addChild(boomeff);
            boomeff.setEndCallBack(() => {
                boomeff.dispose();
                boomeff = null;
                view._boxId = id;
                if (id == 11) {
                    NetManager.request(NetRequestConst.REQUEST_MOTHERDAY_GETBIGPRIZE, {
                        activeId: view.vo.aidAndCode,
                    });
                }
                else {
                    NetManager.request(NetRequestConst.REQUEST_MOTHERDAY_GETBOX, {
                        activeId: view.vo.aidAndCode,
                        rkey: id
                    });
                }
            }, view);
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.ACMOTHERDAYREWARDPOPUPVIEW, {
                aid: this.aid,
                code: this.code,
                id: id
            });
        }
    }

    //转场
    private changeFlower(): void {
        let view = this;
        let arr = view.vo.getFlowers();
        for (let i in arr) {
            view.freshFlowerById(Number(i) + 1, true);
        }

        view._isPlay = true;
        let tmp = BaseBitmap.create(`motherdaymidbg-${view.getUiCode()}`);
        let endX = view._flowerbg.x;
        let endY = view._flowerbg.y;

        let midX = view._midGroup.x;
        let midY = view._midGroup.y;
        tmp.alpha = 0;
        tmp.x = endX - tmp.width;
        tmp.y = endY;
        view.addChild(tmp);

        egret.Tween.get(view._flowerbg).to({ alpha: 0, x: endX - tmp.width }, 200);
        egret.Tween.get(view._midGroup).to({ alpha: 0, x: endX - tmp.width }, 200);
        egret.Tween.get(tmp).wait(200).to({ alpha: 1, x: endX }, 400).call(() => {
            view._flowerbg.x = endX;
            view._flowerbg.y = endY;
            view._flowerbg.alpha = 1;
            egret.Tween.removeTweens(tmp);
            view.removeChild(tmp);

            view.freshFlower();
            view._midGroup.x = midX;
            view._midGroup.y = midY;
            view._midGroup.alpha = 1;
            view._isPlay = false;
        }, view);
    }

    private boxCallBack(evt: egret.Event): void {
        let view = this;
        if(!evt.data.ret){
            return;
        }
        let data = evt.data.data.data;
        if (data) {
            let rewardVo = GameData.formatRewardItem(data.rewards);
            let point = null;
            if (view._boxId) {
                let box = view.getChildByName(`box${view._boxId}`);
                if (box) {
                    point = new egret.Point(box.x, box.y + 23);
                }
                view._boxId = 0;
            }
            App.CommonUtil.playRewardFlyAction(rewardVo, point);

            let replacerewards = data.replacerewards;
            if (replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
            }
            // ViewController.getInstance().openView(ViewConst.POPUP.ACMOTHERDAYREWARDSHOWVIEW, {
            //     aid: view.aid, 
            //     code: view.code, 
            //     rewards : data.rewards
            // }); 
        }
        view._isPlay = false;
    }

    /** 
     * 关闭释放
    */
    public dispose(): void {
        let view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MOTHERDAY_FRESH_ITEM, view.freshView, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MOTHERDAY_SENDFLOWERS), view.sendCallBack, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MOTHERDAY_GETBOX), view.boxCallBack, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MOTHERDAY_GETBIGPRIZE), view.boxCallBack, view);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashSceneBtn, this);
        view._cdText = null;
        this.mapPos = {
            x: [75, 169, 263, 357, 448],
            y: [365, 456, 538, 640, 737]
        }
        view._midGroup.dispose();
        view._midGroup = null;
        view.timebg = null;
        view._isPlay = false;
        view._getOneBtn = null;
        view._getAllBtn = null;
        view._costNumTxt2 = null;
        view._bigPrize = null;
        view._flowerNumTxt = null;
        view._flowernumbg = null;
        view._tenPick = false;
        view._flowerbg = null;
        view._boxId = 0;
        this._sceneBtn = null;
        super.dispose();
    }
}