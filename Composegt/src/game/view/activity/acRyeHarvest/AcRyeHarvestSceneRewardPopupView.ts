/**
  * 缤纷拼图 场景
  * @author 张朝阳
  * date 2019/7/15
  * @class AcRyeHarvestSceneRewardPopupView
  */
class AcRyeHarvestSceneRewardPopupView extends PopupView {

    private _downNode: BaseDisplayObjectContainer = null;
    private _itemNUm: BaseTextField = null;
    private _desc: BaseTextField = null;

    private _needPartsVo: RewardItemVo = null;
    private _sceneRewardVo: RewardItemVo = null;
    public constructor() {
        super();
    }
    public initView(): void {

        let view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MOTHERDAY_EXCHANGEMOTHERDAYSCENE, this.useCallback, this);

        this._needPartsVo = GameData.formatRewardItem(this.cfg.exchangeScene.needParts)[0];
        this._sceneRewardVo = GameData.formatRewardItem(this.cfg.exchangeScene.getReward)[0];
        let scenesid = String(this._sceneRewardVo.id);
        let sceneName = "";
        if (String(scenesid)[0] == "1") {
            sceneName = "homeScene";
        }
        else if (String(scenesid)[0] == "2") {
            sceneName = "cityScene";
        }
        else if (String(scenesid)[0] == "3") {
            sceneName = "searchScene";
        }

        let bg = BaseLoadBitmap.create(`acmotherdayview_scenebg-` + this.uicode);
        bg.width = 548;
        bg.height = 731;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
        view.addChildToContainer(bg);

        let detailBtn = ComponentManager.getButton("servant_detailBtn", "", () => {
            // ViewController.getInstance().openView(ViewConst.POPUP.CHANGEBGDETAILPOPUPVIEW, {
            //     scene: sceneName,
            //     key: scenesid,
            // });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, detailBtn, bg, [5, 35]);
        view.addChildToContainer(detailBtn);

        // let servantCfg = Config.ServantCfg.getServantItemById(Config.SceneCfg.getSceneCfgBySceneName(sceneName, scenesid).personalityCfg.servant);
        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`changebg_servant_promote`, [""]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, bg, [0, 7]);

        let line = BaseBitmap.create(`public_line3`);
        let tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("changebg_name_" + scenesid), 22, TextFieldConst.COLOR_WHITE);
        line.width += tipTxt2.width;
        view.addChildToContainer(line);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, tipTxt, [0, tipTxt.textHeight + 15]);
        view.addChildToContainer(tipTxt2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt2, line);

        let tipTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("changebg_desc_" + scenesid), 20, TextFieldConst.COLOR_WHITE);
        view.addChildToContainer(tipTxt3);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt3, tipTxt2, [0, tipTxt2.textHeight + 5]);

        let desc = ComponentManager.getTextField(" ", 17, TextFieldConst.COLOR_LIGHT_YELLOW);
        desc.width = 510;
        desc.lineSpacing = 5;
        desc.textAlign = egret.HorizontalAlign.CENTER;


        this._desc = desc;

        let bg2 = BaseBitmap.create(`acenjoynight_exchangebb2`);
        bg2.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg2.width / 2, this.getShowHeight() - bg2.height - 63);
        view.addChildToContainer(bg2);

        let bg1 = BaseBitmap.create(`acenjoynight_exchangebb1`);
        bg1.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg1.width / 2, bg2.y - bg1.height);
        view.addChildToContainer(bg1);
        bg1.name = "bg1"

        desc.setPosition(this.viewBg.width / 2 - desc.width / 2, bg2.y + 3);
        view.addChildToContainer(desc);

        this.showExchangeScene();
    }

    private showExchangeScene(): void {
        this._downNode = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._downNode);
        this._downNode.y = 608;

        let rectd = new egret.Rectangle(0, 0, 65, 65);
        let icon = BaseLoadBitmap.create("itemicon" + this._needPartsVo.id, rectd);
        this._downNode.addChild(icon);
        icon.setPosition(10, 5);

        let progressbar2 = ComponentManager.getProgressBar("progress3", "progress3_bg", 290);
        progressbar2.setPosition(85, 25);
        this._downNode.addChild(progressbar2);

        let needparts: string = this.cfg.exchangeScene.needParts;
        let needNum: string = needparts.split("_")[2];

        let hasNum: number = Api.itemVoApi.getItemNumInfoVoById(this._needPartsVo.id);
        progressbar2.setText(hasNum + "/" + needNum);
        progressbar2.setPercentage(hasNum / Number(needNum));

        let exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "exchange", this.exchangeScene, this)
        exchangeBtn.setPosition(385, 12);
        this._downNode.addChild(exchangeBtn);
        let scenesid = String(this._sceneRewardVo.id);
        let sceneName = "";
        if (String(scenesid)[0] == "1") {
            sceneName = "homeScene";
        }
        else if (String(scenesid)[0] == "2") {
            sceneName = "cityScene";
        }
        else if (String(scenesid)[0] == "3") {
            sceneName = "searchScene";
        }


        let str1 = LanguageManager.getlocal("itemName_" + this._needPartsVo.id);
        let str2 = LanguageManager.getlocal("changebg_name_" + String(this._sceneRewardVo.id));
        this._desc.text = LanguageManager.getlocal(`acRyeHarvestSceneRewardPopupViewDesc-${this.code}`, [String(this._needPartsVo.num), str1, str2, str1]);
    }



    private showExchangeItem(): void {
        if (this._downNode) {
            this._downNode.dispose();
        }

        this._downNode = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._downNode);
        this._downNode.y = 608;

        // let rectd = new egret.Rectangle(0, 0, 65, 65);
        // let icon = BaseLoadBitmap.create("itemicon" + this._needPartsVo.id, rectd);
        // this._downNode.addChild(icon);
        // icon.setPosition(180, 5);

        // let hasNum: number = Api.itemVoApi.getItemNumInfoVoById(this._needPartsVo.id);
        // this._itemNUm = ComponentManager.getTextField(String(hasNum), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        // this._itemNUm.setPosition(260, 30);
        // this._downNode.addChild(this._itemNUm);

        // let exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acEnjoyNightExchangeItem", this.exchangeItem, this)
        // exchangeBtn.setPosition(355, 12);
        // this._downNode.addChild(exchangeBtn);

        let bg1 = this.container.getChildByName("bg1");
        if (bg1) {
            bg1.visible = false;
        }

        let graybg = BaseBitmap.create("public_9_bg8");
        graybg.width = this.viewBg.width;
        graybg.height = 120;
        graybg.setPosition(0, 300);
        this.addChildToContainer(graybg);

        let gotpic = BaseBitmap.create("acenjoynight_got");

        gotpic.setPosition(this.viewBg.width / 2 - gotpic.width / 2, graybg.y + graybg.height / 2 - gotpic.height / 2);
        this.addChildToContainer(gotpic);

        let str1 = LanguageManager.getlocal("itemName_" + this._needPartsVo.id);
        let str2 = LanguageManager.getlocal("changebg_name_" + String(this._sceneRewardVo.id));

        this._desc.text = LanguageManager.getlocal(`acRyeHarvestSceneRewardPopupViewDesc2-${this.code}`, [str2, str1, str1]);

    }

    private exchangeScene(): void {
        let needparts: string = this.cfg.exchangeScene.needParts;
        let needNum: string = needparts.split("_")[2];
        let hasNum: number = Api.itemVoApi.getItemNumInfoVoById(this._needPartsVo.id);
        if (Number(needNum) > hasNum) {
            App.CommonUtil.showTip(LanguageManager.getlocal(`itemNumNotEnough`));
            return;
        }

        NetManager.request(NetRequestConst.REQUEST_MOTHERDAY_EXCHANGEMOTHERDAYSCENE, {
            activeId: this.aidAndCode,
        });
    }

    public useCallback(event: egret.Event): void {
        let view = this;
        let data = event.data.data.data;
        if (data && data.rewards) {
            let rewards = data.rewards;
            let rewardList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardList);

            this.showExchangeItem();
        }
    }

    // protected receiveData(data: { ret: boolean, data: any }): void 
    // {

    //     if (data.ret)
    //     {
    //         let rewardList =  GameData.formatRewardItem(data.data.data.rewards);
    //         App.CommonUtil.playRewardFlyAction(rewardList);

    //         this.showExchangeItem();
    //     }
    // }

    private exchangeItem(): void {
        let view = this;
        // ViewController.getInstance().openView(ViewConst.COMMON.ACENJOYNIGHTITEMVIEW, {
        //     aid: view.aid,
        //     code: view.code,
        //     uicode: view.uicode,
        // });
    }


    private update(): void {
        let view = this;
        if (!view.vo) {
            return;
        }
        if (this._itemNUm) {
            let hasNum: number = Api.itemVoApi.getItemNumInfoVoById(this._needPartsVo.id);
            this._itemNUm.text = hasNum.toString();
        }


    }

    private get cfg(): Config.AcCfg.RyeHarvestCfg {
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo(): AcRyeHarvestVo {
        return <AcRyeHarvestVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code(): string {
        return this.param.data.code;
    }

    private get uicode(): string {
        return this.param.data.uicode;
    }

    private get aid(): string {
        return this.param.data.aid;
    }

    public get aidAndCode(): string {
        return this.aid + "-" + this.code;
    }

    protected getResourceList(): string[] {
        return super.getResourceList().concat([
            "progress3", "progress3_bg", `acenjoynight_exchangebb2`, `acenjoynight_exchangebb1`, "servant_detailBtn",
            "acenjoynight_got",
        ]);
    }

    protected getShowHeight(): number {
        return 795
    }

    protected getShowWidth(): number {
        return 560;
    }

    protected getTitleStr(): string {
        return `acTreasureOfficeTitle-1`;
    }

    public dispose(): void {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MOTHERDAY_EXCHANGEMOTHERDAYSCENE, this.useCallback, this);
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);

        this._downNode = null;
        this._itemNUm = null;
        this._desc = null;

        super.dispose();
    }
}