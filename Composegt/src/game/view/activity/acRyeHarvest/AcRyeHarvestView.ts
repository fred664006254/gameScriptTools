/**
 * 麦田飘香 （移植于江山美人的母亲节活动）
 * @author 赵占涛
 */
class AcRyeHarvestView extends AcCommonView {
    private _cdText: BaseTextField = null;
    private _tip3Txt: BaseTextField = null;
    private _midGroup: BaseDisplayObjectContainer = null;
    private _isPlay: boolean = false;
    private _getOneBtn: BaseButton = null;
    private _getAllBtn: BaseButton;
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

    private get cfg(): Config.AcCfg.RyeHarvestCfg {
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo(): AcRyeHarvestVo {
        return <AcRyeHarvestVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId(): string {
        return `${this.aid}-${this.code}`;
    }

    protected getUiCode(): string {
        let code = '';
        switch (Number(this.code)) {
            case 2:
                code = '1';
                break;
            case 4:
                code = '3';
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }


    /** 
     * 重写区
    */
    protected getRuleInfo(): string {
        return "acRyeHarvestInfo-" + this.getUiCode();
    }
    protected getTitleStr(): string {
        return null;
    }
    protected getTitleBgName(): string {
        return "ryeharvesttitle-" + this.getUiCode();
    }
    protected getProbablyInfo(): string {
        return "acMotherProbablyInfo-" + this.getUiCode();
    }
    protected getBgName() {
        return "ryeharvestboat-" + this.getUiCode();
    }
    protected getResourceList(): string[] {
        let view = this;
        let code = view.getUiCode();
        let arr = [];
        return super.getResourceList().concat([
            `ryeharvest-${code}`, `arena_bottom`, `ryeharvestmidbg-${code}`, `ryeharvestboat-${code}`, `ryeharvestboxboom1-`, `ryeharvestboxloop1-`,
            `acwealthcarpview_servantskintxt`, `acwealthcarpview_skineffect1`, `acwealthcarpview_skineffect`, `acturantable_taskbox_light`,
            `ryeharvesteff-${code}`, `ryeharvestflowerflasheff${code}-`, `ryeharvestflowerloop${code}-`, "acchristmasview_smalldescbg"
        ]).concat(arr);
    }

    /**
	 * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
	 */
    protected getReportTipData(): { title: { key: string, param?: string[] }, msg: { key: string, param?: string[] } } {
        return { title: { key: `ryeharvestreporttitle-${this.getUiCode()}` }, msg: { key: `ryeharvestreportkey-${this.getUiCode()}` } };
    }

    /** 
     * 自定义实现
    */
    public initView() {
        let view = this;

        view._tenPick = false;
        view._boxId = 0;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        let code = view.getUiCode();
        /***顶部信息***/
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RYEHARVEST_FRESH_ITEM, view.freshView, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RYEHARVEST_SENDFLOWERS), view.sendCallBack, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RYEHARVEST_GETBOX), view.boxCallBack, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RYEHARVEST_GETBIGPRIZE), view.boxCallBack, view);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashSceneBtn, this);


        // 标题
        let titletxt = BaseBitmap.create(`ryeharvesttitlelabel-${code}`);
        titletxt.x = GameConfig.stageWidth / 2 - titletxt.width / 2;
        titletxt.y = 5;
        view.addChild(titletxt);

        // let boat = BaseBitmap.create(`ryeharvestboat-${code}`);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, boat, view, [0, -15]);
        // view.addChild(boat);

        let topBg: BaseBitmap | BaseLoadBitmap = null;
        let headReward = GameData.formatRewardItem("11_4111_0")[0];
        if (this.getUiCode() == "1") {
            topBg = BaseBitmap.create(`ryeharvesttop-${code}`);
            view.addChild(topBg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, view.titleBg, [0, view.titleBg.height]);

            let headIcon = BaseLoadBitmap.create(headReward.icon);
            headIcon.width = 100;
            headIcon.height = 100;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, headIcon, topBg, [20, -5]);
            view.addChild(headIcon);

            let headEffect = ComponentManager.getCustomMovieClip(`ryeharvestheadeffect1-`, 14, 70);
            headEffect.width = 150;
            headEffect.height = 145;
            headEffect.playWithTime(0);
            headEffect.name = `headEffect`;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, headEffect, headIcon, [2, -2]);
            view.addChild(headEffect);


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
                ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW,headReward);
            }, ViewController);
        }

        //活动日期
        let tip1Text = ComponentManager.getTextField(LanguageManager.getlocal(`acRyeHarvestTopTip1-${code}`, [view.vo.acTimeAndHour]), 18);
        view.addChild(tip1Text);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip1Text, topBg, [140, 7]);
        if (this.getUiCode() == "3") {
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip1Text, topBg, [120, 18 + 19]);
        }

        let str = '';
        if (view.vo.isInActivity()) {
            str = App.DateUtil.getFormatBySecond(view.vo.getCountDown());
        }
        else {
            str = `<font color=0x21eb39>${LanguageManager.getlocal(`acPunishEnd`)}</font>`;
        }
        let tip3Text = ComponentManager.getTextField(LanguageManager.getlocal(`acRyeHarvestTopTip2-${code}`, [headReward.name]), 18);
        tip3Text.lineSpacing = 5;
        tip3Text.width = 490;
        if (this.getUiCode() == "3") {
            tip3Text.width = 490;
        }
        view.addChild(tip3Text);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip3Text, tip1Text, [0, tip1Text.textHeight + 5]);
        this._tip3Txt = tip3Text;

        let tip2Text = ComponentManager.getTextField(LanguageManager.getlocal(`acRyeHarvestTopTip3-${code}`, [str]), 20);
        view.addChild(tip2Text);
        view._cdText = tip2Text;
        tip2Text.y = tip1Text.y;
        tip2Text.x = tip3Text.x + tip3Text.width - tip2Text.width;
        let flowerbg = BaseBitmap.create(`ryeharvestmidbg-${code}`);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, flowerbg, this.viewBg, [28, 405]);
        flowerbg.x = 30;
        flowerbg.y = 280 + (GameConfig.stageHeigth - 280 - 103) / 2 - 583 / 2;
        view._flowerbg = flowerbg;

        let midGroup = new BaseDisplayObjectContainer();
        midGroup.width = flowerbg.width;
        midGroup.height = flowerbg.height
        view.addChild(midGroup);
        view.addChild(flowerbg);
        view._midGroup = midGroup;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, midGroup, flowerbg);
        //初始化花朵
        let arr = view.vo.getFlowers();
        for (let i in arr) {
            view.freshFlowerById(Number(i) + 1);
        }
        //初始化宝箱
        for (let i = 1; i < 6; ++i) {
            let box = BaseBitmap.create(`ryeharvestbox${view.vo.getBoxStatus(i)}-${code}`);
            box.anchorOffsetX = box.width / 2;
            box.anchorOffsetY = box.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, box, flowerbg, [flowerbg.width + 15, 0 + (i - 1) * (97)]);
            view.addChild(box);
            box.name = `box${i}`;
            box.addTouchTap(view.boxClick, view, [i]);
        }

        for (let i = 10; i > 5; --i) {
            let box = BaseBitmap.create(`ryeharvestbox${view.vo.getBoxStatus(i)}-${code}`);
            box.anchorOffsetX = box.width / 2;
            box.anchorOffsetY = box.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, box, flowerbg, [0 + (10 - i) * (97), flowerbg.height + 10]);
            view.addChild(box);
            box.name = `box${i}`;
            box.addTouchTap(view.boxClick, view, [i]);

            if (i == 6) {
                let bigboxstatus = view.vo.getBigBoxStatus();
                let bigPrize = BaseBitmap.create(`ryeharvestfinalbox${bigboxstatus}-${code}`);
                bigPrize.anchorOffsetX = bigPrize.width / 2;
                bigPrize.anchorOffsetY = bigPrize.height / 2;
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, bigPrize, box, [10 + box.width, -10]);
                view.addChild(bigPrize);
                view._bigPrize = bigPrize;

                bigPrize.addTouchTap(view.boxClick, view, [11]);
            }
        }
        view.freshBox();
        //鲜花数量
        let flowernumbg = BaseBitmap.create(`public_lockbg`);
        flowernumbg.setScale(0.6);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, flowernumbg, topBg, [0, -40]);
        view.addChild(flowernumbg);
        view._flowernumbg = flowernumbg;

        let flowericon = BaseLoadBitmap.create(`ryeharvesticon3-${code}`);
        flowericon.width = flowericon.height = 50;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, flowericon, flowernumbg, [5, 0]);
        view.addChild(flowericon);

        let numTxt = ComponentManager.getTextField(`${view.vo.getFlowerNum()}`, 20);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, numTxt, flowernumbg, [0, 0]);
        view.addChild(numTxt);
        view._flowerNumTxt = numTxt;


        let addButton = ComponentManager.getButton("ryeharvestaddbtn", "", () => {
            ViewController.getInstance().openView(ViewConst.COMMON.ACRYEHARVESTCHARGEVIEW, {
                aid: this.aid,
                code: this.code,
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, addButton, flowernumbg, [20, -2]);
        view.addChild(addButton);

        /***底部按钮***/
        let bottombg = BaseBitmap.create(`ryeharvestbottom-${code}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view);
        view.addChild(bottombg);

        let oneBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE, "", () => {
            if (view._isPlay) {
                return;
            }
            if (!view.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (view.vo.getFlowerNum() == 0 && !view.vo.isFree()) {
                
                let tipMsg = LanguageManager.getlocal(`acRyeHarvestNoNumTip-${code}`, [String(view.vo.getFlowerNum())]);
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                    title:"itemUseConstPopupViewTitle",
                    msg:tipMsg,
                    callback:()=>{
                        ViewController.getInstance().openView(ViewConst.COMMON.ACRYEHARVESTCHARGEVIEW, {
                            aid: this.aid,
                            code: this.code,
                        });
                    },
                    handler:this,
                    needCancel:true
                });
                return;
            }
            //献花一次
            NetManager.request(NetRequestConst.REQUEST_RYEHARVEST_SENDFLOWERS, {
                activeId: view.vo.aidAndCode,
                lotterynum: 1
            });

        }, view);
        oneBtn.setText(LanguageManager.getlocal(`ryeharvestsendflower-${code}`, ["1"]), false);
        view._getOneBtn = oneBtn;
        view.addChild(oneBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, oneBtn, bottombg, [85, 10]);

        let freeTxt = ComponentManager.getTextField(LanguageManager.getlocal(`sysFreeDesc`), 20);
        view.addChild(freeTxt);
        freeTxt.visible = view.vo.isFree();
        view._freeTxt = freeTxt;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, freeTxt, oneBtn, [0, oneBtn.height]);

        let icon = BaseLoadBitmap.create(`ryeharvesticon2-${code}`);
        icon.width = icon.height = 50;
        view.addChild(icon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, icon, oneBtn, [-10, -28]);

        let allBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, ``, () => {
            if (view._isPlay) {
                return;
            }
            if (!view.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (view.vo.getFlowerNum() < 2) {

                let tipMsg = LanguageManager.getlocal(`acRyeHarvestNoNumTip-${code}`, [String(view.vo.getFlowerNum())]);
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                    title:"itemUseConstPopupViewTitle",
                    msg:tipMsg,
                    callback:()=>{
                        ViewController.getInstance().openView(ViewConst.COMMON.ACRYEHARVESTCHARGEVIEW, {
                            aid: this.aid,
                            code: this.code,
                        });
                    },
                    handler:this,
                    needCancel:true
                });
                return;
            }
            //献花多次
            view._tenPick = true;
            NetManager.request(NetRequestConst.REQUEST_RYEHARVEST_SENDFLOWERS, {
                activeId: view.vo.aidAndCode,
                lotterynum: Math.min(10, Math.max(view.vo.getFlowerNum(), 2))
            });
            //view.pickCallBack();
        }, view);
        allBtn.setText(LanguageManager.getlocal(`ryeharvestsendflower-${code}`, [String(Math.min(10, Math.max(view.vo.getFlowerNum(), 2)))]), false);
        view._getAllBtn = allBtn;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, allBtn, bottombg, [85, 10]);
        view.addChild(allBtn);

        let icon2 = BaseLoadBitmap.create(`ryeharvesticon2-${code}`);
        icon2.width = icon2.height = 50;
        view.addChild(icon2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, icon2, allBtn, [-10, -28]);


        /***中部展示***/
        let rechargeBtn = ComponentManager.getButton(`ryeharvestchargebtn-${code}`, ``, () => {
            if (view._isPlay) {
                return;
            }
            if (this.getUiCode() == "3") {
                ViewController.getInstance().openView(ViewConst.POPUP.ACRYEHARVESTACTIVITYREWARDPOPUPVIEW, {
                    aid: this.aid,
                    code: this.code,
                });
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.ACRYEHARVESTCHARGEVIEW, {
                aid: this.aid,
                code: this.code,
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rechargeBtn, topBg, [3, topBg.height - 10]);
        view.addChild(rechargeBtn);
        view._rechargeBtn = rechargeBtn;
        let rechargeBtnLabel = BaseBitmap.create(`ryeharvestchargebtnlabel-${code}`);
        rechargeBtnLabel.x = rechargeBtn.width / 2 - rechargeBtnLabel.width / 2 + 1;
        rechargeBtnLabel.y = rechargeBtn.height - rechargeBtnLabel.height;
        rechargeBtn.addChild(rechargeBtnLabel);
        if (view.vo.getpublicRedhot2()) {
            App.CommonUtil.addIconToBDOC(rechargeBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(rechargeBtn);
        }

        /***底部进度***/
        // view.setChildIndex(view.titleBg, 9999);
        view.setChildIndex(view.closeBtn, 9999);
        // view.setChildIndex(view._ruleBtn, 9999)
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
        let vo = <AcRyeHarvestVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
            view._cdText.text = LanguageManager.getlocal(`acLuckyDrawTopTip2-${view.getUiCode()}`, [str]);
            view._cdText.x = this._tip3Txt.x + this._tip3Txt.width - view._cdText.width;
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
        //鲜花数目
        view._flowerNumTxt.text = String(view.vo.getFlowerNum());
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._flowerNumTxt, view._flowernumbg, [0, 0]);
        view.freshBox();
        view._freeTxt.visible = view.vo.isFree();

        view._getAllBtn.setText(LanguageManager.getlocal(`ryeharvestsendflower-${this.getUiCode()}`, [String(Math.min(10, Math.max(view.vo.getFlowerNum(), 2)))]), false);
    }

    private freshBox(): void {
        let view = this;
        for (let i = 1; i < 11; ++i) {
            let box = <BaseBitmap>view.getChildByName(`box${i}`);
            let boxLight = <CustomMovieClip>view.getChildByName(`boxLight${i}`);
            let status = view.vo.getBoxStatus(i);
            if (box) {
                box.setRes(`ryeharvestbox${status}-${view.getUiCode()}`);
                if (status == 2) {
                    if (!boxLight) {
                        //特效
                        let light = ComponentManager.getCustomMovieClip(`ryeharvestboxloop1-`, 10, 70);
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
        view._bigPrize.setRes(`ryeharvestfinalbox${bigboxstatus}-${view.getUiCode()}`);
        let bigboxLight = <CustomMovieClip>view.getChildByName(`bigboxLight`);
        if (bigboxstatus == 1) {
            if (!bigboxLight) {
                let light = ComponentManager.getCustomMovieClip(`ryeharvestboxloop1-`, 10, 70);
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
        x: [(97) * 0, (97) * 1, (97) * 2, (97) * 3, (97) * 4],
        y: [(97) * 0, (97) * 1, (97) * 2, (97) * 3, (97) * 4]
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
                let flowerbmp = BaseBitmap.create(`ryeharvestflower${status}-${view.getUiCode()}`);
                // flowerbmp.setScale(0.5);
                flowerbmp.x = view.mapPos.x[col - 1] + 2;
                flowerbmp.y = view.mapPos.y[row - 1] + 2;
                flowerbmp.name = `flower${id}`;
                view._midGroup.addChild(flowerbmp);
            }
            else {
                (<BaseBitmap>flower).texture = ResourceManager.getRes(`ryeharvestflower${status}-${view.getUiCode()}`);
            }
        }
        else if (status == 2) {
            if (flower) {
                (<BaseBitmap>flower).texture = ResourceManager.getRes(`ryeharvestflower${status}-${view.getUiCode()}`);
            }
            else {
                let flowerbmp = BaseBitmap.create(`ryeharvestflower${status}-${view.getUiCode()}`);
                flowerbmp.x = view.mapPos.x[col - 1] + 2;
                flowerbmp.y = view.mapPos.y[row - 1] + 2;
                flowerbmp.name = `flower${id}`;
                view._midGroup.addChild(flowerbmp);
            }
        }
    }

    private flowerMovie(data: any): void {
        let view = this;
        view._isPlay = true;
        let id = Number(data.flowerIndex);
        let flower = view._midGroup.getChildByName(`flower${id}`);
        if (flower) {
            let globalPos = view._midGroup.localToGlobal(flower.x - 50, flower.y - 50);

            let flowerclip = ComponentManager.getCustomMovieClip(`ryeharvestflowerflasheff${view.getUiCode()}-`, 17, 70);
            flowerclip.blendMode = egret.BlendMode.ADD;
            flowerclip.setPosition(globalPos);
            view.addChild(flowerclip);
            flowerclip.playWithTime(1);

            let flowerloop = ComponentManager.getCustomMovieClip(`ryeharvestflowerloop${view.getUiCode()}-`, 17, 70);
            flowerloop.blendMode = egret.BlendMode.ADD;
            flowerloop.setPosition(globalPos);
            view.addChild(flowerloop);
            flowerloop.playWithTime(1);

            egret.Tween.get(flowerloop).wait(1700).
                call(() => {
                    flowerloop.dispose();
                    flowerloop = null;
                    flowerclip.dispose();
                    flowerclip = null;
                    //播放动画
                    ViewController.getInstance().openView(ViewConst.POPUP.ACRYEHARVESTREWARDSHOWVIEW, {
                        aid: view.aid,
                        code: view.code,
                        rewards: data.rewards,
                        callback: () => {
                            view._isPlay = false;
                            // if (data.fullFlag) {
                            //     view.changeFlower();
                            // }
                            // else {
                                view.freshFlower();
                            // }
                        },
                        callobj: view
                    });
                }, view);


            // //遮罩
            // let mask = BaseBitmap.create(`public_9_viewmask`);
            // mask.width = GameConfig.stageWidth;
            // mask.height = GameConfig.stageHeigth;
            // mask.alpha = 0;
            // view.addChild(mask);
            // egret.Tween.get(mask).to({ alpha: 1 }, 800).wait(930).to({ alpha: 0 }, 600).call(() => {
            //     egret.Tween.removeTweens(mask);
            //     mask.dispose();
            //     mask = null;
            //     view._isPlay = false;
            // }, view);
            // let row = Math.ceil(id / 5);
            // let flowereff = BaseBitmap.create(`ryeharvestfloweff${row}-${view.getUiCode()}`);
            // flowereff.anchorOffsetX = flowereff.width / 2;
            // flowereff.anchorOffsetY = flowereff.height / 2;
            // flowereff.setScale(0.5);
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, flowereff, flower, [-flowereff.anchorOffsetX / 2, -flowereff.anchorOffsetY / 2]);
            // let global = view._midGroup.localToGlobal(flowereff.x, flowereff.y);
            // flowereff.setPosition(global.x, global.y);

            // let flowereff2 = BaseBitmap.create(`ryeharvestfloweff${row}-${view.getUiCode()}`);
            // flowereff2.anchorOffsetX = flowereff2.width / 2;
            // flowereff2.anchorOffsetY = flowereff2.height / 2;
            // flowereff2.setScale(0.5);
            // flowereff2.alpha = 0;
            // flowereff2.blendMode = egret.BlendMode.ADD;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, flowereff2, flowereff, [0, -74]);

            // let flowereff3 = BaseBitmap.create(`ryeharvestfloweff${row}-${view.getUiCode()}`);
            // flowereff3.anchorOffsetX = flowereff3.width / 2;
            // flowereff3.anchorOffsetY = flowereff3.height / 2;
            // flowereff3.setScale(0.5);
            // flowereff3.alpha = 0;
            // flowereff3.blendMode = egret.BlendMode.ADD;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, flowereff3, flowereff, [0, -76]);

            // let flash = BaseBitmap.create(`ryeharvestflowerflash-${view.getUiCode()}`);
            // flash.anchorOffsetX = flash.width / 2;
            // flash.anchorOffsetY = flash.height / 2;
            // flash.setScale(0.5);
            // flash.alpha = 0;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, flash, flowereff, [0, 43]);
            // flash.x = flowereff.x;

            // let flowerclip = ComponentManager.getCustomMovieClip(`ryeharvestflowerflasheff${view.getUiCode()}-`, 9, 70);
            // flowerclip.blendMode = egret.BlendMode.ADD;
            // flowerclip.width = 172;
            // flowerclip.height = 176;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, flowerclip, flowereff, [flowereff.anchorOffsetX / 2, -31]);

            // let flowerloop = ComponentManager.getCustomMovieClip(`ryeharvestflowerloop${view.getUiCode()}-`, 10, 70);
            // flowerloop.blendMode = egret.BlendMode.ADD;
            // flowerloop.width = 224;
            // flowerloop.height = 175;
            // flowerloop.anchorOffsetX = flowerloop.width / 2;
            // flowerloop.anchorOffsetY = flowerloop.height / 2;
            // flowerloop.playWithTime(-1);
            // flowerloop.alpha = 0;
            // flowerloop.x = flash.x - 10;
            // flowerloop.y = flash.y - 40;
            // //花束
            // view.addChild(flash);
            // view.addChild(flowerloop);
            // egret.Tween.get(flash).wait(400).to({ alpha: 1 }, 470).
            //     wait(860).
            //     to({ alpha: 0 }, 270).
            //     call(() => {
            //         egret.Tween.removeTweens(flash);
            //         flash.dispose();
            //         flash = null;
            //     }, view);
            // let point1 = new egret.Point(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2 + 105);
            // egret.Tween.get(flash).wait(870).to({ scaleX: 1, scaleY: 1, x: point1.x, y: point1.y }, 260)
            // //花1
            // let point2 = new egret.Point(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2 + 20);
            // view.addChild(flowereff);
            // egret.Tween.get(flowereff).
            //     to({ scaleX: 0.7, scaleY: 0.6 }, 130).
            //     to({ scaleX: 0.35, scaleY: 0.65 }, 140).
            //     to({ scaleX: 0.55, scaleY: 0.5 }, 200).
            //     to({ scaleX: 0.5, scaleY: 0.5 }, 260).wait(140).
            //     to({ scaleX: 1, scaleY: 1 }, 260);

            // egret.Tween.get(flowereff).wait(1730).to({ alpha: 0 }, 270).call(() => {
            //     egret.Tween.removeTweens(flowereff);
            //     flowereff.dispose();
            //     flowereff = null;
            // }, view);

            // let tmpY = flowereff.y;
            // egret.Tween.get(flowereff).
            //     to({ y: tmpY + 9 }, 130).
            //     to({ y: tmpY - 69 }, 140).
            //     to({ y: tmpY - 86 }, 200).
            //     wait(400).
            //     to({ x: point2.x, y: point2.y }, 260);
            // //花2
            // view.addChild(flowereff2);
            // egret.Tween.get(flowereff2).wait(400).
            //     to({ alpha: 1 }, 200).
            //     to({ alpha: 0.4 }, 270).wait(860).
            //     to({ alpha: 0 }, 270);

            // let point3 = new egret.Point(point2.x + 1, point2.y + 19);
            // egret.Tween.get(flowereff2).wait(870).
            //     to({ x: point3.x, y: point3.y, scaleX: 1, scaleY: 1 }, 260).call(() => {
            //         egret.Tween.removeTweens(flowereff2);
            //         flowereff2.dispose();
            //         flowereff2 = null;
            //     }, view);
            // //花3
            // view.addChild(flowereff3);
            // egret.Tween.get(flowereff3).wait(400).
            //     to({ alpha: 1 }, 200).
            //     to({ alpha: 0 }, 270).call(() => {
            //         egret.Tween.removeTweens(flowereff3);
            //         flowereff3.dispose();
            //         flowereff3 = null;
            //     }, view);

            // egret.Tween.get(flowereff3).wait(400).
            //     to({ scaleX: 1, scaleY: 1 }, 470);
            // //花束动画
            // view.addChild(flowerclip);
            // flowerclip.setEndCallBack(() => {
            //     flowerclip.dispose();
            //     flowerclip = null;
            // }, view);
            // egret.Tween.get(flowerclip).wait(470).call(() => {
            //     flowerclip.playWithTime(1);
            // }, view)
            // //花束循环
            // egret.Tween.get(flowerloop).wait(200).
            //     to({ alpha: 1 }, 670).
            //     wait(860).
            //     to({ alpha: 0 }, 270).
            //     call(() => {
            //         flowerloop.dispose();
            //         flowerloop = null;
            //         //播放动画
            //         ViewController.getInstance().openView(ViewConst.POPUP.ACRYEHARVESTREWARDSHOWVIEW, {
            //             aid: view.aid,
            //             code: view.code,
            //             rewards: data.rewards,
            //             callback: () => {
            //                 view._isPlay = false;
            //                 // if (data.fullFlag) {
            //                 //     view.changeFlower();
            //                 // }
            //                 // else {
            //                     view.freshFlower();
            //                 // }
            //             },
            //             callobj: view
            //         });
            //     }, view);

            // egret.Tween.get(flowerloop).wait(870).
            //     to({ x: point2.x - 15, y: point2.y + 3, scaleX: 2, scaleY: 2 }, 260);

        }
        else {
            //播放动画
            ViewController.getInstance().openView(ViewConst.POPUP.ACRYEHARVESTREWARDSHOWVIEW, {
                aid: view.aid,
                code: view.code,
                rewards: data.rewards,
                callback: () => {
                    view._isPlay = false;
                    // if (data.fullFlag) {
                    //     view.changeFlower();
                    // }
                    // else {
                        view.freshFlower();
                    // }
                },
                callobj: view
            });
        }
    }

    private sendCallBack(evt: egret.Event): void {
        let view = this;
        if (evt.data.data.ret < 0) {
            return;
        }
        let data = evt.data.data.data;
        if (data) {
            if (view._tenPick) {
                view._tenPick = false;
                ViewController.getInstance().openView(ViewConst.POPUP.ACRYEHARVESTREWARDSHOWVIEW, {
                    aid: view.aid,
                    code: view.code,
                    rewards: data.rewards,
                    callback: () => {
                        // if (data.fullFlag) {
                        //     view.changeFlower();
                        // }
                        // else {
                            view.freshFlower();
                        // }
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
        if (id == 11) {
            ViewController.getInstance().openView(ViewConst.POPUP.ACRYEHARVESTBIGBOXPOPUPVIEW, {
                aid: this.aid,
                code: this.code,
                id:id
            });
            return;
        }
        if (id < 11 && view.vo.getBoxStatus(id) == 2) {
            let box = id == 11 ? view._bigPrize : view.getChildByName(`box${id}`);
            view._isPlay = true;
            let boomeff = ComponentManager.getCustomMovieClip(`ryeharvestboxboom1-`, 10, 70);
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
                    NetManager.request(NetRequestConst.REQUEST_RYEHARVEST_GETBIGPRIZE, {
                        activeId: view.vo.aidAndCode,
                    });
                }
                else {
                    NetManager.request(NetRequestConst.REQUEST_RYEHARVEST_GETBOX, {
                        activeId: view.vo.aidAndCode,
                        gid: id
                    });
                }
            }, view);
        } else {
            ViewController.getInstance().openView(ViewConst.POPUP.ACRYEHARVESTREWARDPOPUPVIEW, {
                aid: this.aid,
                code: this.code,
                id: id
            });
            return;
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
        let tmp = BaseBitmap.create(`ryeharvestmidbg-${view.getUiCode()}`);
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
            // ViewController.getInstance().openView(ViewConst.POPUP.ACRyeHarvestREWARDSHOWVIEW, {
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
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RYEHARVEST_FRESH_ITEM, view.freshView, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RYEHARVEST_SENDFLOWERS), view.sendCallBack, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RYEHARVEST_GETBOX), view.boxCallBack, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RYEHARVEST_GETBIGPRIZE), view.boxCallBack, view);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashSceneBtn, this);
        view._cdText = null;
        view._midGroup.dispose();
        view._midGroup = null;
        view._isPlay = false;
        view._getOneBtn = null;
        view._getAllBtn = null;
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