/**
 * 圣诞节
 * 2018/12/4
 * jiangliuyang
 */
class AcMerryXmasView extends AcCommonView {

    private _itemList: any = [];
    private _taskBtn: BaseButton = null;
    //对话
    private _talkText: BaseTextField = null;
    //分数
    private _scoreText: BaseTextField = null;
    //剩余时间
    private _timeText: BaseTextField = null;

    private _treeMask: BaseBitmap = null;


    private _scoreBg: BaseBitmap = null;
    private _havenumTxt: BaseTextField = null;
    private _starClip: CustomMovieClip = null;
    private _lotteryDro:BaseLoadDragonBones = null
    private _isPlay:boolean = false;

    private _curLightCount: number = 0;
    //180,341
    private _pos: { x: number, y: number }[] =
        [
            { x: 73, y: 414 },
            { x: 143, y: 412 },
            { x: 215, y: 423 },
            { x: 288, y: 418 },
            { x: 363, y: 395 },
            { x: 110, y: 280 },
            { x: 168, y: 286 },
            { x: 224, y: 297 },
            { x: 281, y: 292 },
            { x: 330, y: 274 },
            { x: 154, y: 149 },
            { x: 225, y: 158 },
            { x: 280, y: 141 },
            { x: 180, y: -45 }
        ];


    private get cfg(): Config.AcCfg.MerryXmasCfg {
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
    protected get acVo(): AcMerryXmasVo {
        return <AcMerryXmasVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }
    public constructor() {
        super();
    }
    public getUiCode(): string {
        return this.code;
    }
    private get starItem(): BaseDisplayObjectContainer {
        return this._itemList[this._itemList.length - 1];
    }

    public initView(): void {
        let code = this.code;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MERRYXMAS_REFRESHVO, this.refreshUi, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETMERRYXMASREWARD, this.buyBtnHandlerCaller, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETMERRYXMASTASKREWARD, this.taskRewardHandel, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETMERRYXMASBOXREWARD, this.taskRewardHandel, this);
        let titletxt = BaseBitmap.create(`acmerryxmasview_title-${this.code}`);
        titletxt.x = GameConfig.stageWidth / 2 - titletxt.width / 2;
        titletxt.y = 5;
        this.addChild(titletxt);

        //活动规则背景图片
        let descBg: BaseBitmap = BaseBitmap.create(`acmerryxmasview_descbg-${this.code}`);
        descBg.y = 75;
        this.addChild(descBg);
        //活动规则文本
        let descTxt: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acMerryXmas_desc-" + this.code), TextFieldConst.FONTSIZE_ACTIVITY_COMMON);
        descTxt.width = descBg.width - 20;
        descTxt.lineSpacing = 5;
        descTxt.x = descBg.x + 13;
        descTxt.y = descBg.y + descBg.height / 2 - 22;
        this.addChild(descTxt);
        //活动日期        
        let dateText = ComponentManager.getTextField(LanguageManager.getlocal("acChaseBanditTopDate", [this.acVo.acTimeAndHour]), 18);
        this.addChild(dateText);
        dateText.x = descBg.x + 13;
        dateText.y = descBg.y + 7;
        //剩余时间
        let timeText = ComponentManager.getTextField(LanguageManager.getlocal("acChaseBanditTopTime", [this.acVo.acCountDown]), 18);
        this.addChild(timeText);
        timeText.x = GameConfig.stageWidth - timeText.width - 13;
        timeText.y = descBg.y + 7;
        this._timeText = timeText;


        this._taskBtn = ComponentManager.getButton(`acmerryxmasview_taskbtn-${this.getUiCode()}`, null, this.taskBtnListener, this);
        this._taskBtn.x = 10;
        this._taskBtn.y = descBg.y + descBg.height;
        this.addChild(this._taskBtn);

        let taskName = BaseBitmap.create("acspringouting_taskname-1");
        taskName.x = this._taskBtn.x + this._taskBtn.width / 2 - taskName.width / 2;
        taskName.y = this._taskBtn.y + this._taskBtn.height - 15;
        this.addChild(taskName);

        let tree = BaseLoadBitmap.create("acmerryxmasview_tree");
        tree.width = 476;
        tree.height = 630;
        tree.x = this.x + 180;
        tree.y = this.y + GameConfig.stageHeigth - tree.height - 100;
        this.addChildToContainer(tree);
        tree.addTouchTap(this.treeListener, this);
        let pos = null;
        let itemImg: BaseBitmap = null;
        let item: BaseDisplayObjectContainer = null;
        for (let i = 0; i < this._pos.length; i++) {
            pos = this._pos[i];
            itemImg = BaseBitmap.create(`acmerryxmasview_item${(i + 1)}-${this.getUiCode()}`);
            item = new BaseDisplayObjectContainer();
            item.width = itemImg.width;
            item.height = itemImg.height;
            item["itemImg"] = itemImg;
            item.addChild(itemImg);
            item.anchorOffsetX = item.width / 2;
            item.x = tree.x + pos.x + item.width / 2;
            item.y = tree.y + pos.y;
            this._itemList.push(item);
            this.addChildToContainer(item);
        }

        this.itemAddAnim();


        this._starClip = ComponentManager.getCustomMovieClip("merryxmas_star", 8);
        this._starClip.setPosition(-120, -120);
        this._starClip.playWithTime(-1);
        this.starItem.addChild(this._starClip);
        this._starClip.visible = false;

        this._treeMask = BaseBitmap.create("");
        this._treeMask.setScale(2.5);
        this._treeMask.x = tree.x;
        this._treeMask.y = tree.y;
        this.addChildToContainer(this._treeMask);


        let bottomBg = BaseBitmap.create("acmerryxmasview_bottombg-" + this.getUiCode());
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height;


        if (App.CommonUtil.check_dragon()) {
            let droWifeIcon = App.DragonBonesUtil.getLoadDragonBones("wife_full3_" + this.cfg.wifeSkinID);
            // droWifeIcon.setScale(0.7)
            // droWifeIcon.skewY = 180;
            droWifeIcon.setScale(0.97);
            droWifeIcon.x = 126;//this.x + 190;
            droWifeIcon.y = bottomBg.y + 50;//this.y + this.height + 5-160;
            this.addChild(droWifeIcon);
        }
        else {
            let people = BaseLoadBitmap.create("acmerryxmasview_people");
            people.width = 350;
            people.height = 589;
            people.x = -50;
            people.y = bottomBg.y - people.height + 40;
            this.addChild(people);
        }

        let talkBg = BaseBitmap.create("acmerryxmasview_dialog");
        talkBg.width = 190;
        talkBg.x = this.x + 200;
        talkBg.y = this.y + 280;
        this.addChild(talkBg);

        this._talkText = ComponentManager.getTextField(LanguageManager.getlocal(`acMerryXmas_talk-${code}`), 20, TextFieldConst.COLOR_BROWN);
        this._talkText.lineSpacing = 5;
        this._talkText.x = talkBg.x + talkBg.width / 2 - this._talkText.width / 2;// - talkBg.width + 15;
        this._talkText.y = talkBg.y + 15;
        this.addChild(this._talkText);

        this.addChild(bottomBg);


        this._scoreBg = BaseBitmap.create("acmerryxmasview_planbg-" + code);
        this._scoreBg.x = 350;
        this._scoreBg.y = bottomBg.y - 10;
        this.addChild(this._scoreBg);

        this._scoreText = ComponentManager.getTextField(LanguageManager.getlocal(`acMerryXmas_buyNum-${this.code}`, [this.acVo.useNum.toString()]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._scoreText.x = this._scoreBg.x + this._scoreBg.width / 2 - this._scoreText.width / 2;
        this._scoreText.y = this._scoreBg.y + this._scoreBg.height / 2 - this._scoreText.height / 2 + 5;
        this.addChild(this._scoreText);
        //抽一次按钮
        let onceBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_BLUE, "acChristmas-1_onceBtn", this.buyBtnHandler, this, [1]);
        onceBtn.x = bottomBg.x + 50;
        onceBtn.y = bottomBg.y + bottomBg.height / 2 - onceBtn.height / 2 + 30;
        this.addChild(onceBtn);

        //抽十次按钮
        let tenBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "acChristmas-1_tenBtn", this.buyBtnHandler, this, [10]);
        tenBtn.x = bottomBg.x + bottomBg.width - tenBtn.width - 50;
        tenBtn.y = onceBtn.y;
        this.addChild(tenBtn);

        let star1 = BaseBitmap.create("acmerryxmasview_star");
        star1.setScale(0.8);
        star1.x = onceBtn.x + 75;
        star1.y = onceBtn.y - star1.height * star1.scaleY + 2;
        this.addChild(star1);

        let onceText = ComponentManager.getTextField("1", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        onceText.x = star1.x + star1.width + 15;
        onceText.y = star1.y + star1.height * star1.scaleY / 2 - onceText.height / 2 + 5;
        this.addChild(onceText);

        let star2 = BaseBitmap.create("acmerryxmasview_star");
        star2.setScale(0.8);
        star2.x = tenBtn.x + 75;
        star2.y = tenBtn.y - star2.height * star2.scaleY + 2;
        this.addChild(star2);

        let tenText = ComponentManager.getTextField("10", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        tenText.x = star2.x + star2.width + 15;
        tenText.y = star2.y + star2.height * star2.scaleY / 2 - tenText.height / 2 + 5;
        this.addChild(tenText);

        let havenumBg = BaseBitmap.create("public_lockbg");
        this.addChild(havenumBg);
        havenumBg.setPosition(bottomBg.x + bottomBg.width / 2 - havenumBg.width / 2 + 15, bottomBg.y + 153);

        let havenumStar = BaseBitmap.create("acmerryxmasview_star");
        havenumStar.x = havenumBg.x - havenumStar.width / 2 + 45;
        havenumStar.y = havenumBg.y + havenumBg.height / 2 - havenumStar.height / 2 - 4;
        this.addChild(havenumStar);

        let havenumTxt = ComponentManager.getTextField(this.acVo.starNum + '', 22);
        this.addChild(havenumTxt);
        havenumTxt.width = 100;
        havenumTxt.textAlign = egret.HorizontalAlign.CENTER;
        havenumTxt.setPosition(havenumBg.x + havenumBg.width / 2 - havenumTxt.width / 2, havenumBg.y + havenumBg.height / 2 - havenumTxt.height / 2);
        this._havenumTxt = havenumTxt;

        if(App.CommonUtil.check_dragon()){
            this._lotteryDro = App.DragonBonesUtil.getLoadDragonBones('shengdanshu',0,'',()=>{
                this._lotteryDro.stop();
                this._lotteryDro.visible = false;
            });
            this._lotteryDro.setDragonBoneEventListener(dragonBones.EventObject.LOOP_COMPLETE, this.hideAni, this);
            this.addChild(this._lotteryDro);
            this._lotteryDro.setPosition(290,500);
        }

        this.refreshUi();
    }

    private itemAddAnim(): void {
        let item = null;
        for (let i = 0; i < (this._itemList.length - 1); i++) {
            item = this._itemList[i];
            let randomT = 500 + Math.floor(Math.random() * 800);
            let randomR = 2.5 + Math.random();
            egret.Tween.get(item, { loop: true })
                .to({ rotation: randomR }, randomT, egret.Ease.quadOut)
                .to({ rotation: -randomR }, randomT * 2, egret.Ease.quadInOut)
                .to({ rotation: 0 }, randomT, egret.Ease.quadIn);

        }
    }
    private playAni(){
        this._isPlay = true;
        if(this._lotteryDro){
            this._lotteryDro.visible = true;
            this._lotteryDro.stop();
            this._lotteryDro.playDragonMovie('idle',1);
 
        }
    }
    private hideAni(){
        this._isPlay = false;
        if(this._lotteryDro){
            this._lotteryDro.stop();
            this._lotteryDro.visible = false;
        }
    }
    private treeListener(): void {
        //弹活动任务第三页
        ViewController.getInstance().openView(ViewConst.COMMON.ACMERRYXMASTASKPOPUPVIEW_TAB3, {
            aid: this.aid,
            code: this.code,
            uiCode: this.getUiCode(),
            tabbarTextArr: [
                "acCarnivalNightTaskPopupViewTabTitle1",
                "acCarnivalNightTaskPopupViewTabTitle2",
                "acCarnivalNightTaskPopupViewTabTitle3"
            ],
            specialIconId: "1011"
        });
        //ViewController.getInstance().openView(ViewConst.COMMON.ACCHRISTMASRESULTVIEW,{aid:this.aid,code:this.code});
    }
    private buyBtnHandlerCaller(event: egret.Event): void {
        if (event.data.data.ret === 0) {
            let rewards = event.data.data.data.rewards;
            this.playAni();
            if(this._lotteryDro){
                egret.setTimeout(() => {
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "otherRewards": null, "isPlayAni": true ,"callback":this.hideAni})
                },this, 2000);
            }else{
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "otherRewards": null, "isPlayAni": true ,"callback":this.hideAni})
            }


            
        }





    }
    private commonCallback(): void {
        egret.setTimeout(() => {
            let reward = this.cfg.getFinalFloor();
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": reward, "otherRewards": null, "isPlayAni": true });

        }, this, 100);


    }
    //购买按钮点击
    private buyBtnHandler(num: number): void {

        if(this._isPlay){
            return;
        }
        if (this.acVo.et - GameData.serverTime <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_error"));
            return;
        }

        if (num == 1) {
            if (this.acVo.starNum < 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acChristmasViewStarNotEnough"));
                return;
            }
        } else {
            if (this.acVo.starNum < 10) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acChristmasViewStarNotEnough"));
                return;
            }
        }




        NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETMERRYXMASREWARD, { activeId: this.aid + "-" + this.code, gid: num == 1 ? 1 : 10 });

    }
    //任务按钮
    private taskBtnListener(): void {

        ViewController.getInstance().openView(ViewConst.COMMON.ACMERRYXMASTASKPOPUPVIEW, {
            aid: this.aid,
            code: this.code,
            uiCode: this.getUiCode(),
            tabbarTextArr: [
                "acCarnivalNightTaskPopupViewTabTitle1",
                "acCarnivalNightTaskPopupViewTabTitle2",
                "acCarnivalNightTaskPopupViewTabTitle3"
            ],
            specialIconId: "1011"
        });

    }
    protected getTitleStr(): string {


        return null;
    }
    protected getTitleBgName(): string {
        return `acmerryxmasview_titlebg-${this.getUiCode()}`;
    }
    //刷新界面
    private refreshUi(): void {
        if (this.acVo.isHaveTaskRedDot()) {

            App.CommonUtil.addIconToBDOC(this._taskBtn, null, null, 5, -5);
        } else {
            App.CommonUtil.removeIconFromBDOC(this._taskBtn);
        }


        let count = this.acVo.curStep;

        let item: BaseDisplayObjectContainer = null;
        let mark = 0;
        let itemAnim: CustomMovieClip = null;
        this._curLightCount = 0;
        for (let i = 0; i < (this._itemList.length - 1); i++) {
            item = this._itemList[i];
            if (mark < count) {
                if (!item["itemAnim"]) {
                    let lampName = "acchristmas_star_";
                    let num = 0;
                    let offX = -25;
                    let delay = 70 + Math.floor(Math.random() * 50);
                    itemAnim = ComponentManager.getCustomMovieClip(lampName, 6, delay);
                    itemAnim.playWithTime(-1);
                    itemAnim.x = offX;
                    item["itemAnim"] = itemAnim;
                    item.addChild(itemAnim);
                    itemAnim.alpha = 0;
                }
                this._curLightCount++;



                App.DisplayUtil.changeToNormal(item["itemImg"]);
                mark++;
            } else {

                App.DisplayUtil.changeToGray(item["itemImg"]);
            }

        }



        //刷新已用星星数
        this._scoreText.text = LanguageManager.getlocal(`acMerryXmas_buyNum-${this.code}`, [this.acVo.useNum.toString()]);
        this._scoreText.x = this._scoreBg.x + this._scoreBg.width / 2 - this._scoreText.width / 2;
        this._scoreText.y = this._scoreBg.y + this._scoreBg.height / 2 - this._scoreText.height / 2;

        //刷新拥有
        this._havenumTxt.text = this.acVo.starNum + '';

        //刷新树遮罩
        let curF = 1;
        const step = this.acVo.curStep;
        if (step < 1) {
            curF = 1;
        } else if (step < 6) {
            curF = 2;
        } else if (step < 11) {
            curF = 3;
        } else {
            curF = 4;
        }
        this._treeMask.setRes("acmerryxmasview_mask" + curF);

        let isStar: boolean = (step == this.cfg.progress.length)
        if (isStar) {
            App.DisplayUtil.changeToNormal(this.starItem);
        } else {
            App.DisplayUtil.changeToGray(this.starItem);
        }
        this._starClip.visible = isStar;





    }

    /**
     * 领奖回调
     */
    private taskRewardHandel(event: egret.Event) {
        let view = this;
        if (event.data.ret) {
            // taskId
            let list: { icon: string, tipMessage: string, type: number }[] = [];
            //let rechargeId = view.vo.selIdx;
            let starnum = event.data.data.data.addnum;
            if (starnum) {
                let icon = `merryxmas_icon-${view.getUiCode()}`;
                let starItem: { icon: string, tipMessage: string, type: number } = { icon: icon, tipMessage: "+" + String(starnum), type: 0 };
                list.push(starItem);
            }

            let reward = event.data.data.data.rewards;
            let rewardVo = GameData.formatRewardItem(reward);
            for (let key in rewardVo) {
                let item: { icon: string, tipMessage: string, type: number } = { icon: rewardVo[key].icon, tipMessage: rewardVo[key].tipMessage, type: rewardVo[key].type };
                list.push(item);
            }
            App.CommonUtil.playRewardFlyAction(list);
            this.refreshUi();
        }
    }

    private tick(): void {

        let item: BaseDisplayObjectContainer = null;
        let itemAnim: CustomMovieClip = null;
        // this._curLightCount

        let lightRate = 0.3;
        let lightCount = Math.ceil(lightRate * this._curLightCount);
        let realRate = lightCount / this._curLightCount;

        for (let i = 0; i < (this._itemList.length - 1); i++) {

            item = this._itemList[i];
            if (item["itemAnim"]) {
                itemAnim = item["itemAnim"];
                if (itemAnim.alpha == 0) {
                    if (realRate >= Math.random()) {
                        //开始闪烁
                        let time = 800 + Math.random() * 800;
                        egret.Tween.removeTweens(itemAnim);
                        egret.Tween.get(itemAnim)
                            .to({ alpha: 1 }, 700)
                            .wait(time)
                            .to({ alpha: 0 }, 700)

                    }
                }
            }
        }
        this._timeText.text = LanguageManager.getlocal("acChaseBanditTopTime", [this.acVo.acCountDown]);
        this._timeText.x = GameConfig.stageWidth - this._timeText.width - 13;


    }

    protected getCloseBtnName(): string {
        return "commonview_closebtn1";
    }
    protected getRuleInfo(): string {
        return "acMerryXmasViewRule-" + this.code;
    }
    protected getBgName(): string {
        return `acmerryxmasview_bg-${this.getUiCode()}`
    }

    private goToRechargeHandler(): void {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    }

    protected getResourceList(): string[] {
        let code = this.getUiCode();
        let itemRes = [];
        super.getResourceList();
        for (let i = 1; i <= 14; i++) {
            itemRes.push(`acmerryxmasview_item${i}-${code}`);
        }
        let res = super.getResourceList().concat(itemRes);

        return res.concat([
            `acspringouting_taskname-${code}`, `acmerryxmasview_bottombg-${code}`, `acmerryxmasview_title-${code}`,
            `acmerryxmasview_star`, `acmerryxmasview_planbg-${code}`, `merryxmas_star`,
            `acmerryxmasview_titlebg-${code}`, `acmerryxmasview_taskbtn-${code}`, `acmerryxmasview_dialog`,
            `acmerryxmasview_bg-${code}`, `acmerryxmasview_descbg-${code}`,
            `acmerryxmasview_maskstar`, `acmerryxmasview_mask1`, `acmerryxmasview_mask2`, `acmerryxmasview_mask3`
        ]);
    }
    public dispose(): void {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MERRYXMAS_REFRESHVO, this.refreshUi, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETMERRYXMASREWARD, this.buyBtnHandlerCaller, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETMERRYXMASTASKREWARD, this.taskRewardHandel, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETMERRYXMASBOXREWARD, this.taskRewardHandel, this);
        this._itemList = [];
        this._talkText = null;
        this._scoreText = null;
        this._timeText = null;
        this._taskBtn = null;
        this._scoreBg = null;
        this._curLightCount = 0;
        this._havenumTxt = null;
        this._starClip = null;
        this._lotteryDro = null
        this._isPlay = false;
        super.dispose();
    }
}