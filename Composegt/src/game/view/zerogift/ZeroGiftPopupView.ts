class ZeroGiftPopupView extends PopupView {
    private lb_time: BaseTextField;
    private time = 0;
    constructor() {
        super();
    }
    protected initView(): void {
        let lb_time = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_WARN_RED);
        lb_time.width = 620;
        lb_time.textAlign = egret.HorizontalAlign.CENTER;
        lb_time.x = -20;
        lb_time.y = 796;
        this.addChildToContainer(lb_time);
        this.lb_time = lb_time;
        //
        let et = Api.otherInfoVoApi.getOtherInfo().info["zeroGift"]['et'];
        this.time = et - GameData.serverTime;
        let time = App.DateUtil.getFormatBySecond(this.time, 8);
        lb_time.text = LanguageManager.getlocal("zeroGift_endtime", [time]);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_BUY_ZEROGIFT, this.receiveData, this);
    }
    protected setTabBarPosition(): void {
        let tab_group = this.tabbarGroup;
        if (tab_group) {
            tab_group.setPosition(88, this.viewBg.y + 90);
            tab_group.setSpace(24);
            tab_group.setColor(0x4a2308, 0x4a2308);
        }
    }
    protected getCloseBtnName(): string {
        return "btn_win_closebtn";
    }
    protected getBgName(): string {
        return "zerogift_bg";
    }
    protected getTitleStr(): string {
        return "";
    }
    // 页签图名称
    protected getTabbarName(): string | string[] {
        return "zerogift_tab"
    }
    protected getTabbarTextArr(): Array<string> {
        return ['zeroGiftTab1', 'zeroGiftTab2', 'zeroGiftTab3'];
    }
    protected getResourceList(): string[] {
        return ["zerogift_bg", "zerogift_des6888", "zerogift_attr",
            "zerogift_des4888", "zerogift_des9888", "zerogift_shili_40000",
            "zerogift_shili_80000", "zerogift_tab", "zerogift_tab_down",
            "zerogift_headicon", "acredlotuswarrior_btn-1"];
    }
    protected getRequestData(): { requestType: string, requestData: any } {
        let zeroGift = Api.otherInfoVoApi.getOtherInfo().info["zeroGift"];
        if (zeroGift && zeroGift["firstflag"] >= 1) {
            return null;
        } else {
            return { requestType: NetRequestConst.REQUEST_ZEROGIFT_FIRSTFLAG, requestData: null };
        }
    }
    public tick() {
        if (this.lb_time) {
            if (this.time <= 0) {
                this.hide();
                return;
            }
            let time = App.DateUtil.getFormatBySecond(--this.time, 8);
            this.lb_time.text = LanguageManager.getlocal("zeroGift_endtime", [time]);
        }
    }
    public dispose(): void {
        super.dispose();
        this.lb_time = null;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_BUY_ZEROGIFT, this.receiveData, this);
    }
    public toBuy(id: string, price: number) {
        if (this.time <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal('zeroprice_end'));
            return;
        }
        if (price > Api.playerVoApi.getPlayerGem()) {
            let str = LanguageManager.getlocal("zerogemnotenough");
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "",
                msg: str,
                callback: () => {
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                },
                handler: this,
                needCancel: true
            });
            return;
        }
        let sendData = {};
        sendData["typeid"] = id;
        this.request(NetRequestConst.REQUEST_BUY_ZEROGIFT, sendData);
    }
    public receiveData(event) {
        let data: { ret: boolean, data: any, cmd: any } = event.data;
        if (!data.ret && data.cmd != NetRequestConst.REQUEST_ZEROGIFT_FIRSTFLAG) {
            // App.CommonUtil.showTip(LanguageManager.getlocal(data.data.msg));
            return;
        }
        if (data.data.data && data.data.data.rewards) {
            let rewards = GameData.formatRewardItem(data.data.data.rewards);
            let length = rewards.length
            if (rewards && length > 0) {
                App.CommonUtil.playRewardFlyAction(rewards);
            }
        }
    }
    /**
     * id 奖励的id，门客、红颜、或皮肤
     * obj 所在节点
     */
    public addAni(id, node): void {
        //创建一个容器，存放动画
        let parent: BaseDisplayObjectContainer = new BaseDisplayObjectContainer;
        node.addChild(parent);
        parent.y = 150;
        //绘一遮罩
        let shape = new BaseShape, graphics = shape.graphics;
        node.addChild(shape);
        graphics.beginFill(0x000000, 1);
        graphics.drawRect(0, 150, 600, 400);
        graphics.endFill();
        parent.mask = shape;

        let ids = GameData.formatRewardItem(id), leng = ids.length;
        for (let i = 0; i < leng; i++) {
            let itemCfg = null;
            if (ids[i].type == 8) {
                itemCfg = Config.ServantCfg.getServantItemById(ids[i].id);
            } else if (ids[i].type == 10) {
                itemCfg = Config.WifeCfg.getWifeCfgById(ids[i].id);
            } else if (ids[i].type == 16) {
                itemCfg = Config.WifeskinCfg.getWifeCfgById(ids[i].id);
            }
            let dagonBonesName = itemCfg.bone,
                picName = itemCfg.body,
                boneName = dagonBonesName + "_ske";
            if (boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                let boneAni = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
                boneAni.visible = true;
                boneAni.setScale(0.5);
                let half_h = boneAni.height / 2;
                boneAni.anchorOffsetY = half_h;
                boneAni.anchorOffsetX = boneAni.width / 2;
                if (leng > 1) {
                    boneAni.x = 200 + i * 200;
                } else {
                    boneAni.x = 290;
                }
                boneAni.y = 415 - half_h;//ids[i].type == 8 ? 405 - half_h : 415 - half_h;
                parent.addChild(boneAni);
            } else {
                let Img = BaseLoadBitmap.create(picName, null, {
                    callback: (...args) => {
                        let scale = ids[i].type == 8 ? 0.6 : 0.35;
                        Img.width *= scale;
                        Img.height *= scale;
                        Img.anchorOffsetY = Img.height / 2;
                        Img.anchorOffsetX = Img.width / 2;
                        Img.y = 398 - Img.height / 2;
                    }, callbackThisObj: node
                });
                if (leng > 1) {
                    Img.x = 220 + i * 200;
                } else {
                    Img.x = 290;
                }
                parent.addChild(Img);
            }
        }
    }
}