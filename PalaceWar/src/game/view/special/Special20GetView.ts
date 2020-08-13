/**
 * 特殊奖励--场景
 * @author 张朝阳
 * date 2019/3/27
 * @class Special20GetView
 */
class Special20GetView extends SpecialBaseView {

    private _bg: BaseLoadBitmap = null;
    private _buttombg: BaseLoadBitmap = null;
    private _sceneDescTF: BaseTextField = null;
    private _titleTF: BaseTextField = null;
    private _titleTFLine: BaseBitmap = null;

    private _buttomContainer: BaseDisplayObjectContainer = null;

    private _sceneId: number | string = null;

    private _sceneName: string = null;
    public constructor() {
        super();
    }
    protected createView(id: number | string) {
        let senceid = id;
        this._sceneId = id;
        // let senceid = this.param.data.id;
        let sceneName: string = null;
        if (String(senceid)[0] == "1") {
            sceneName = "homescene";
            this._sceneName = "homeScene";
        }
        else if (String(senceid)[0] == "2") {
            sceneName = "cityscene";
            this._sceneName = "cityScene";
        }
        else if (String(senceid)[0] == "3") {
            sceneName = "searchscene";
            this._sceneName = "searchScene";
        }

        let sceneResName = sceneName + "_" + senceid;
        if (senceid == 202) {
            sceneResName = "cityscene_202_2";
        }
        else if (senceid == 303) {
            sceneResName = "searchscene_303_1";
        }

        this._bg = BaseLoadBitmap.create(sceneResName);
        this._bg.width = 640;
        this._bg.height = 1136;
        this._bg.setPosition(GameConfig.stageWidth / 2 - this._bg.width / 2, GameConfig.stageHeigth - this._bg.height);
        this._container.addChild(this._bg);

        this._buttomContainer = new BaseDisplayObjectContainer();
        this._buttomContainer.width = 640;
        this._buttomContainer.anchorOffsetX = this._buttomContainer.width / 2;
        this._buttomContainer.x = 320;
        this._container.addChild(this._buttomContainer);

        this._buttombg = BaseLoadBitmap.create("specialview_buttombg1");
        this._buttombg.width = 640;

        this._sceneDescTF = ComponentManager.getTextField(LanguageManager.getlocal("changebg_desc_" + senceid), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WHITE);
        this._sceneDescTF.width = 550;

        this._buttombg.height = 108 + this._sceneDescTF.height;
        this._buttombg.setPosition(0, GameConfig.stageHeigth - this._buttombg.height - 80);
        this._buttomContainer.addChild(this._buttombg);
        this._buttombg.alpha = 0.8;

        this._sceneDescTF.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._sceneDescTF.width / 2, this._buttombg.y + 60);
        this._buttomContainer.addChild(this._sceneDescTF);


        this._titleTF = ComponentManager.getTextField(LanguageManager.getlocal("changebg_name_" + senceid), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._titleTF.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTF.width / 2, this._buttombg.y + 35 - this._titleTF.height / 2)
        this._buttomContainer.addChild(this._titleTF);

        this._titleTFLine = BaseBitmap.create("public_line3");
        this._titleTFLine.width = 281 + this._titleTF.width;
        this._titleTFLine.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTFLine.width / 2, this._titleTF.y + this._titleTF.height / 2 - this._titleTFLine.height / 2);
        this._buttomContainer.addChild(this._titleTFLine);

        if (this._golookInfoBtn) {
            this.setgolookPos(this._buttombg.x + this._buttombg.width / 2 - this._golookInfoBtn.width / 2, this._buttombg.y + this._buttombg.height + 10);
        }

        this.playAni();

    }
    protected refreashView(id: number | string) {
        let senceid = id;
        this._sceneId = id;
        let sceneName: string = null;
        if (String(senceid)[0] == "1") {
            sceneName = "homescene";
            this._sceneName = "homeScene";
        }
        else if (String(senceid)[0] == "2") {
            sceneName = "cityscene";
            this._sceneName = "cityScene";
        }
        else if (String(senceid)[0] == "3") {
            sceneName = "searchscene";
            this._sceneName = "searchScene";
        }
        let sceneResName = sceneName + "_" + senceid;
        if (senceid == 202) {
            sceneResName = "cityscene_202_2";
        }
        this._bg.setload(sceneResName);
        this._sceneDescTF.text = LanguageManager.getlocal("changebg_desc_" + senceid);
        this._buttombg.height = 108 + this._sceneDescTF.height;
        this._titleTF.text = LanguageManager.getlocal("changebg_name_" + senceid);
        this._buttombg.setPosition(0, GameConfig.stageHeigth - this._buttombg.height - 80);
        this._sceneDescTF.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._sceneDescTF.width / 2, this._buttombg.y + 60);
        this._titleTF.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTF.width / 2, this._buttombg.y + 35 - this._titleTF.height / 2);
        this._titleTFLine.width = 281 + this._titleTF.width;
        this._titleTFLine.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTFLine.width / 2, this._titleTF.y + this._titleTF.height / 2 - this._titleTFLine.height / 2);
        if (this._golookInfoBtn) {
            this.setgolookPos(this._buttombg.x + this._buttombg.width / 2 - this._golookInfoBtn.width / 2, this._buttombg.y + this._buttombg.height + 10);
        }
        this.playAni();
    }
    protected golookInfoBtnClick() {
        let sceneid = this._sceneId;
        let scenename = this._sceneName;
        this.callBack();
        ViewController.getInstance().openView(ViewConst.COMMON.CHANGEBGVIEW, { sceneid: sceneid, scenename: scenename });
       
       
    }
    protected playAni() {
        super.playAni();
        this._buttomContainer.scaleX = 0;
        egret.Tween.get(this._buttomContainer).to({ scaleX: 1 }, 350).call(() => {
            egret.Tween.removeTweens(this._buttomContainer);
        }, this);
    }
    protected isShowBtn() {
        return true;
    }
    public dispose(): void {
        egret.Tween.removeTweens(this._buttomContainer);
        this._buttomContainer = null;
        this._bg = null;
        this._buttombg = null;
        this._sceneDescTF = null;
        this._titleTF = null;
        this._titleTFLine = null;
        this._sceneId = null;
        this._sceneName = null;
        super.dispose();
    }
}