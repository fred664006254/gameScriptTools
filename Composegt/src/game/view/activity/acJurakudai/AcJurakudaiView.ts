/**
 */

class AcJurakudaiView extends AcCommonView {
	public constructor() {
		super();
    }

    /**当前正在展示的门客 */
    private onShowServant: string = null;

    private _timeCD : BaseTextField = null;
    /**当前拥有抽奖次数 */
    private _numTxt : BaseTextField = null;
    private _curHaveTxt : BaseTextField = null;
    private _icon : BaseBitmap = null;
    private _dbDragon : BaseLoadDragonBones = null;
    
    /**保底门客 */
    private _servantBox: BaseDisplayObjectContainer;
    /**门客形象 */
    private _npc : BaseLoadBitmap = null;
    /**门客品质 */
    private _npcQuality: BaseDisplayObjectContainer;
    private _npcText1: BaseBitmap = null;
    private _npcText2: BaseBitmap = null;
    /**好感进度 */
    private _leftTxt: BaseBitmapText = null;
    /**门客名字 */
    private _npcNameTxt : BaseLoadBitmap = null;

    /**最近一次的抽奖数 1or10 */
    private nearlyDrawNum: number = 0;
    /**是否正在抽奖 */
    private isDrawing: boolean = false;
    /**抽奖动画期间盖住，阻止所有操作 */
    private _drawMask: BaseLoadBitmap;

    private _rechargeBtn: BaseButton;
    private _taskBtn: BaseButton;

    private _firstBg: BaseLoadBitmap;

    private _breathEff: egret.Tween;
    private _breathBox: BaseDisplayObjectContainer;

	// private aid:string;
	// private code:string;
	protected get acVo(): AcJurakudaiVo {
		return <AcJurakudaiVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }
	// private get cfg() : Config.AcCfg.JurakudaiCfg{
    //     return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    // }

    protected getUiCode():string{
        return this.code;
    }

    protected init() {
        super.init();
        if (this.acVo.isFirstEnter()) {
            this._firstBg = BaseLoadBitmap.create("jurakudaibg2");
            this.addChild(this._firstBg);
            this._firstBg.setPosition(0, 0);
            Api.rookieVoApi._waitingGuide.length=0;
            Api.rookieVoApi.curGuideKey = "jurakudaistory";
            Api.rookieVoApi.insertWaitingGuide({"idx":"jurakudaistory_1", f:this.onStoryOver, o: this});
            Api.rookieVoApi.checkWaitingGuide();
        }
    }

	protected initView(): void{
        let view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        let uicode = this.getUiCode();
        this.container.setPosition(0, 0);

        let titleName = BaseBitmap.create(App.CommonUtil.getResByCode(`jurakudaititlename`, uicode));
        view.addChild(titleName);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, titleName, view.titleBg);
        
        this._servantBox = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._servantBox);
        this._servantBox.addTouchTap(this.onServantTap, this);
        this._breathBox = new BaseDisplayObjectContainer();
        this._servantBox.addChild(this._breathBox);

        let topbg = BaseBitmap.create(App.CommonUtil.getResByCode(`jurakudaibottombg`, uicode));
        this.addChildToContainer(topbg);
        topbg.setPosition(0, this.titleBg.height);

        let bottombg = BaseBitmap.create(App.CommonUtil.getResByCode(`jurakudaidesk`, uicode));
        this.addChildToContainer(bottombg);
        bottombg.setPosition(0, GameConfig.stageHeigth - bottombg.height);

        let timeDateTxt = ComponentManager.getTextField(this.acVo.getAcLocalTime(), 18, 0xFDF3B5);
        this.addChildToContainer(timeDateTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeDateTxt, topbg, [27,8]);

        let acDescTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acJurakudaidesc`, uicode)), 18, 0xFDF3B5);
        this.addChildToContainer(acDescTxt);
        acDescTxt.lineSpacing = 5;
        acDescTxt.width = GameConfig.stageWidth - 27*2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, acDescTxt, timeDateTxt, [0,timeDateTxt.height+8]);

        this._timeCD = ComponentManager.getTextField(LanguageManager.getlocal(`acFanliReviewReward_acCD`, [this.acVo.acCountDown]), 18, 0xFDF3B5);
        this.addChildToContainer(this._timeCD);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, this._timeCD, topbg, [36, 8]);

        // 每日充值
        let lamp1 = ComponentManager.getButton(App.CommonUtil.getResByCode(`jurakudailamp`, uicode), ``, this.onRechargeTap, this, null, 0);
        this.addChildToContainer(lamp1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, lamp1, topbg, [13, topbg.height]);
        let dailychargeTxt = BaseBitmap.create(App.CommonUtil.getResByCode(`jurakudaicharge_fnt`, uicode));
        lamp1.addChild(dailychargeTxt);
        dailychargeTxt.setPosition((lamp1.width - dailychargeTxt.width)/2, (lamp1.height - dailychargeTxt.height)/2 - 12);
        this._rechargeBtn = lamp1;

        // 任务
        let lamp2 = ComponentManager.getButton(App.CommonUtil.getResByCode(`jurakudailamp`, uicode), ``, this.onTaskTap, this, null, 0);
        this.addChildToContainer(lamp2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, lamp2, topbg, [13, topbg.height]);
        let taskTxt = BaseBitmap.create(App.CommonUtil.getResByCode(`jurakudaitask_fnt`, uicode));
        lamp2.addChild(taskTxt);
        taskTxt.setPosition((lamp1.width - taskTxt.width)/2, (lamp2.height - taskTxt.height)/2 - 12);
        this._taskBtn = lamp2;

        // 保底门客相关
        this.onShowServant = this.acVo.awardServantId;
        let _servantInfo = Config.ServantCfg.getServantItemById(this.acVo.awardServantId);

        this._npc = BaseLoadBitmap.create(_servantInfo.body);
        this._npc.width = 640/2;
        this._npc.height = 482/2;
        this._breathBox.addChild(this._npc);
        this._npc.setPosition((GameConfig.stageWidth - this._npc.width)/2, 0);

        this._npcQuality = GameData.getServantQualityIconBySid(this.acVo.awardServantId);
        if (this._npcQuality) {
            this._servantBox.addChild(this._npcQuality);
            this._npcQuality.setPosition(this._npc.x - 70, -80);
        }

        let _npcBg = BaseBitmap.create(App.CommonUtil.getResByCode(`jurakudainumbg`, uicode));
        this._breathBox.addChild(_npcBg);
        _npcBg.setPosition((GameConfig.stageWidth - _npcBg.width)/2, this._npc.y + this._npc.height - _npcBg.height/2);

        let _npcText = BaseBitmap.create(App.CommonUtil.getResByCode(`jurakudaitxt`, uicode));
        this._breathBox.addChild(_npcText);
        this._npcText1 = _npcText;
        this._npcText1.setPosition(_npcBg.x+55, _npcBg.y + 21);
        this._npcText1.visible = this.acVo.lotteryNeedNum > 0;

        this._npcText2 = BaseBitmap.create(App.CommonUtil.getResByCode(`jurakudaitext1`, uicode));
        this._breathBox.addChild(this._npcText2);
        this._npcText2.setPosition(_npcBg.x + 155, _npcBg.y + 21);
        this._npcText2.visible = this.acVo.lotteryNeedNum <= 0;

        this._leftTxt = <BaseBitmapText>ComponentManager.getBitmapText(`${this.acVo.lotteryNeedNum}`, `jurakudai_fnt`);
        this._breathBox.addChild(this._leftTxt);
        this._leftTxt.setPosition(this._npcText1.x + 80 + (40-this._leftTxt.width)/2, this._npcText1.y + 2);
        this._leftTxt.visible = this.acVo.lotteryNeedNum > 0

        this._npcNameTxt = BaseLoadBitmap.create(`servant_name_${this.acVo.awardServantId}`);
        this._breathBox.addChild(this._npcNameTxt);
        this._npcNameTxt.y = _npcBg.y + 9;
        this._npcNameTxt.x = this.acVo.lotteryNeedNum > 0 ? this._npcText1.width + this._npcText1.x : this._npcText2.width + this._npcText2.x;

        this._breathBox.anchorOffsetX = GameConfig.stageWidth / 2;
        this._breathBox.anchorOffsetY = this._breathBox.height / 2;
        this._breathBox.setPosition(GameConfig.stageWidth / 2, this._breathBox.anchorOffsetY);
        this._servantBox.setPosition(0, topbg.y + topbg.height + 10);

        let curHaveTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acJurakudaicurhave`, uicode)),  22, 0xFBD88D);
        view.addChild(curHaveTxt);
        view._curHaveTxt = curHaveTxt;

        let icon = BaseBitmap.create(App.CommonUtil.getResByCode(`jurakudaiicon2`, uicode));
        view.addChild(icon);
        view._icon = icon;

        let numTxt = ComponentManager.getTextField("", 22, 0xFBD88D);
        view.addChild(numTxt);
        view._numTxt = numTxt;
        this._numTxt.text = ""+this.acVo.lotterynum;

        let tmpx = (bottombg.width - curHaveTxt.textWidth - icon.width - numTxt.width - 7) / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, curHaveTxt, bottombg, [tmpx,13]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, curHaveTxt, [curHaveTxt.width,0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, numTxt, icon, [icon.width + 7,0]);

        let lottery1Btn = ComponentManager.getButton(App.CommonUtil.getResByCode(`jurakudaijiubei1`, uicode), '', this.drawLottery, view, [1]);
        this.addChild(lottery1Btn);
        // let numbg1 = BaseBitmap.create(App.CommonUtil.getResByCode(`jurakudaiqunyanbg`, uicode));
        // lottery1Btn.addChild(numbg1);
        // numbg1.setPosition(-41, 111);
        // let txt1 = BaseBitmap.create(App.CommonUtil.getResByCode(`jurakudaiplay1`, uicode));
        // lottery1Btn.addChild(txt1);
        // txt1.setPosition(-23, 116);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, lottery1Btn, bottombg, [115, 108]);

        let numbg1 = ComponentManager.getButton(App.CommonUtil.getResByCode(`jurakudaiqunyanbg`, uicode), '', this.drawLottery, view, [1]);
        this.addChild(numbg1);
        numbg1.setPosition(lottery1Btn.x-38, lottery1Btn.y+111);
        let txt1 = BaseBitmap.create(App.CommonUtil.getResByCode(`jurakudaiplay1`, uicode));
        numbg1.addChild(txt1);
        txt1.setPosition(12, 2);

        let useicon1 = BaseBitmap.create(App.CommonUtil.getResByCode(`jurakudaiicon2`, uicode));
        view.addChild(useicon1);
        useicon1.setPosition(lottery1Btn.x + 7, lottery1Btn.y + 157);

        let usebg1 = BaseBitmap.create(App.CommonUtil.getResByCode(`jurakudaijiubeinumbg`, uicode));
        view.addChild(usebg1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, usebg1, useicon1);

        let useTxt1 = ComponentManager.getTextField(`1`, 22, 0xffffff);
        view.addChild(useTxt1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, useTxt1, usebg1);

        let lottery10Btn = ComponentManager.getButton(App.CommonUtil.getResByCode(`jurakudaijiubei10`, uicode), '', this.drawLottery, view, [10]);
        this.addChild(lottery10Btn);
        // let numbg2 = BaseBitmap.create(App.CommonUtil.getResByCode(`jurakudaiqunyanbg`, uicode));
        // lottery10Btn.addChild(numbg2);
        // numbg2.setPosition(-41, 111);
        // let txt2 = BaseBitmap.create(App.CommonUtil.getResByCode(`jurakudaiplay10`, uicode));
        // lottery10Btn.addChild(txt2);
        // txt2.setPosition(-23, 116);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, lottery10Btn, bottombg, [415, 108]);

        let numbg2 = ComponentManager.getButton(App.CommonUtil.getResByCode(`jurakudaiqunyanbg`, uicode), '', this.drawLottery, view, [10]);
        this.addChild(numbg2);
        numbg2.setPosition(lottery10Btn.x-38, lottery10Btn.y+111);
        let txt2 = BaseBitmap.create(App.CommonUtil.getResByCode(`jurakudaiplay10`, uicode));
        numbg2.addChild(txt2);
        txt2.setPosition(12, 2);

        // let jiubei2 = BaseBitmap.create(App.CommonUtil.getResByCode(`jurakudaijiubei10`, uicode));
        // view.addChild(jiubei2);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, jiubei2, bottombg, [97,114]);

        // let numbg2 = BaseBitmap.create(App.CommonUtil.getResByCode(`jurakudaiqunyanbg`, uicode));
        // view.addChild(numbg2);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, numbg2, jiubei2, [0,115]);

        // let txt2 = ComponentManager.getButton(App.CommonUtil.getResByCode(`jurakudaiplay10`, uicode), '', this.drawLottery, view, [10]);
        // view.addChild(txt2);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, txt2, numbg2, [0,5]);

        let useicon2 = BaseBitmap.create(App.CommonUtil.getResByCode(`jurakudaiicon2`, uicode));
        view.addChild(useicon2);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, useicon2, numbg2, [48,46]);
        useicon2.setPosition(lottery10Btn.x + 7, lottery10Btn.y + 157);

        let usebg2 = BaseBitmap.create(App.CommonUtil.getResByCode(`jurakudaijiubeinumbg`, uicode));
        view.addChild(usebg2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, usebg2, useicon2);

        let useTxt2 = ComponentManager.getTextField(`10`, 22, 0xffffff);
        view.addChild(useTxt2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, useTxt2, usebg2);

        // let probabilityBtn = ComponentManager.getButton("public_lefticon_bg", "", this.onProbabilityShow, this);
        // this.addChild(probabilityBtn);
        // probabilityBtn.setPosition(10, GameConfig.stageHeigth / 2);

        if(App.CommonUtil.check_dragon()){
            let dbDragon = App.DragonBonesUtil.getLoadDragonBones(`qunyan_penbei`);
            view.addChild(dbDragon);
            dbDragon.width = 307;
            dbDragon.height = 416;
            dbDragon.visible = false;
            dbDragon.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, () => {
                dbDragon.stop();
                dbDragon.visible = false;
                this.onDrawEffectOver();
            }, this);
            view._dbDragon = dbDragon;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, dbDragon, view, [340,0]);
        }

        App.MessageHelper.addEventListener(MessageConst.MESSAGE_JURAKUDAI_REFRESHVO, this.freshView,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY2S_GETJURAKUDAIREWARD), this.onReciveRew, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_JURAKUDAI_GOTOMAIN, this.hide, this);
        this.freshView();
        this.playBreath();
    }

    private onStoryOver() {
        if (!this._firstBg) return;
        egret.Tween.get(this._firstBg)
        .to({alpha: 0}, 2000)
        .call(() => {
            this._firstBg.dispose();
        })
    }

    /**点击每日充值 */
    private onRechargeTap() {
        ViewController.getInstance().openView(ViewConst.POPUP.ACJURAKUDAICHARGEVIEW, {
            aid: this.aid,
            code: this.code
        })
    }
    /**点击任务 */
    private onTaskTap() {
        ViewController.getInstance().openView(ViewConst.POPUP.ACJURAKUDAITASKVIEW, {
            aid: this.aid,
            code: this.code
        })
    }
    /**点击查看门客详情 */
    private onServantTap() {
        ViewController.getInstance().openView(ViewConst.POPUP.ACJURAKUDAIDETAILINFOVIEW, {
            aid: this.aid,
            code: this.code
        })
    }

    /**
     * 宴请（抽奖）
     * @param num 宴请次数
     * */
    private drawLottery(num: number) {
        if (this.isDrawing) return;
        if (this.acVo.lotterynum < num) {
            // todo 次数不足提示
            App.CommonUtil.showTip(LanguageManager.getlocal("acJurakudaiText4"));
            return;
        }

        console.log("抽奖"+num+"次～");
        this.isDrawing = true;
        this.showMask();
        this.nearlyDrawNum = num;
        // todo 发送请求
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETJURAKUDAIREWARD, {
            activeId: this.acVo.aidAndCode,
            anum: num
        })

        // this.playDrawEffect(`idle${num}ci`);
    }

    private _recItems: string = null;
    private onReciveRew(e: egret.Event) {
        if (e.data.ret) {
            this._recItems = e.data.data.data.rewards;
            this.playDrawEffect(`idle${this.nearlyDrawNum}ci`);
        } else {
            this.isDrawing = false;
            this.hideMask();
        }
    }

    private showMask() {
        if (!this._drawMask) {
            this._drawMask = BaseLoadBitmap.create("public_9_bg8");
            this._drawMask.width = GameConfig.stageWidth;
            this._drawMask.height = GameConfig.stageHeigth;
            this.addChild(this._drawMask);
            this._drawMask.touchEnabled = true;
            this._drawMask.alpha = 0;
        }
        this._drawMask.visible = true;
    }

    private hideMask() {
        this._drawMask && (this._drawMask.visible = false);
    }

    /**
     * 播放碰杯动画
     */
    private playDrawEffect(idle: string) {
        if (this._dbDragon) {
            this._dbDragon.visible = true;
            this._dbDragon.playDragonMovie(idle, 1);
        } else {
            this.onDrawEffectOver();
        }
        // let view = this;
        // return new Promise((resolve, reject) => {
        //     if (App.CommonUtil.check_dragon()) {
        //         let dbDragon = App.DragonBonesUtil.getLoadDragonBones(`qunyan_penbei`);
        //         view.addChild(dbDragon);
        //         dbDragon.width = 307;
        //         dbDragon.height = 416;
        //         dbDragon.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, () => {
        //             resolve();
        //             dbDragon.dispose();
        //         }, view);
        //         App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, dbDragon, view, [340,0]);
        //         dbDragon.playDragonMovie(idle, 1);
        //     } else {
        //         resolve();
        //     }
        // })
    }

    /**
     * 动画播放完
     */
    private onDrawEffectOver() {
        this.isDrawing = false;
        this.hideMask();
        this.nearlyDrawNum = 0;
        ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, this._recItems);
    }

    private playBreath() {
        let range = [0.94, 1], rate = 3000;
        this.stopBreath();
        egret.Tween.get(this._breathBox)
            .to({scaleX: range[0], scaleY: range[0]}, rate * 0.6)
            .to({scaleX: range[1], scaleY: range[1]}, rate * 0.4)
            .call(this.playBreath, this);
    }

    private stopBreath() {
        egret.Tween.removeTweens(this._breathBox);
        this._breathBox.setScale(1);
    }

    /**
     * 概率公示
     */
    protected getProbText():string {
        return this.acVo.probability;
    }

    public tick():void{
        let view = this;
        view._timeCD.text = LanguageManager.getlocal(`acFanliReviewReward_acCD`, [this.acVo.acCountDown]);
    }

    /**刷新保底门客信息 */
    private refreshAwardServant() {
        if (this.onShowServant != this.acVo.awardServantId) {
            this.onShowServant = this.acVo.awardServantId;
            let _servant: Config.ServantItemCfg = Config.ServantCfg.getServantItemById(this.acVo.awardServantId);
            this._npc.setload(_servant.body);
            this._npc.width = 640/2;
            this._npc.height = 482/2;
            this._npcQuality && this._npcQuality.dispose();
            this._npcQuality = GameData.getServantQualityIconBySid(this.acVo.awardServantId);
            if (this._npcQuality) {
                this._servantBox.addChild(this._npcQuality);
                this._npcQuality.setPosition(this._npc.x - 70, -80);
            }
            this._npcNameTxt.setload(`servant_name_${this.acVo.awardServantId}`);
        }
        this._leftTxt.text = this.acVo.lotteryNeedNum + "";
        this._npcText1.visible = this.acVo.lotteryNeedNum > 0;
        this._npcText2.visible = this.acVo.lotteryNeedNum <= 0;
        this._leftTxt.visible = this.acVo.lotteryNeedNum > 0;
        this._leftTxt.setPosition(this._npcText1.x + 80 + (40-this._leftTxt.width)/2, this._npcText1.y + 2);
        this._npcNameTxt.x = this.acVo.lotteryNeedNum > 0 ? this._npcText1.width + this._npcText1.x : this._npcText2.width + this._npcText2.x;
    }

    /**刷新视图 */
    private freshView(){
        this._numTxt.text = this.acVo.lotterynum + "";

        if (this.acVo.isRedCharge) {
            App.CommonUtil.addIconToBDOC(this._rechargeBtn);
        } else {
            App.CommonUtil.removeIconFromBDOC(this._rechargeBtn);
        }

        if (this.acVo.isRedTask) {
            App.CommonUtil.addIconToBDOC(this._taskBtn);
        } else {
            App.CommonUtil.removeIconFromBDOC(this._taskBtn);
        }

        this.refreshAwardServant();

        // if (this.acVo.isRedServant) {
        //     this.playBreath();
        // } else {
        //     this.stopBreath();
        // }
        
    }

    protected getRuleInfo():string{
		return App.CommonUtil.getCnByCode(`acJurakudairuleinfo`, this.getUiCode());
	}
    
    protected getBgName():string{
        return App.CommonUtil.getResByCode(`jurakudaibg`, this.getUiCode());
    }

    protected getTitleBgName():string
	{
		return App.CommonUtil.getResByCode(`jurakudaititlebg`, this.getUiCode());
    }

	protected getTitleStr():string
	{
        return null;
    }

    protected getResourceList(): string[] {
		return super.getResourceList().concat(`acjurakudaiview`, `jurakudai_fnt`);
	}

	public dispose(): void {
        let view = this;
        view._timeCD = null;
        view._numTxt = null;
        view._curHaveTxt = null;
        view._icon = null;
        view._dbDragon = null;
        this._rechargeBtn = null;
        this._taskBtn = null;
        this._firstBg = null;
        this._breathEff = null;
        this._breathBox = null;
        this._drawMask = null;

        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_JURAKUDAI_REFRESHVO, this.freshView,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY2S_GETJURAKUDAIREWARD), this.onReciveRew, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_JURAKUDAI_GOTOMAIN, this.hide, this);
		super.dispose();
	}
}



