/**
 * 特殊奖励--称号
 * @author 张朝阳
 * date 2019/3/27
 * @class SpecialTitleGetView
 */
class SpecialTitleGetView extends SpecialBaseView {

    private _playerContainer: BaseDisplayObjectContainer = null;


    private _buttombg: BaseLoadBitmap = null;

    private _titleDescTF: BaseTextField = null;
    private _title: BaseLoadBitmap = null;
    private _titleTFLine: BaseBitmap = null;

    private _itembg: BaseBitmap = null;

    private _item: BaseLoadBitmap = null;

    private _buttomContainer: BaseDisplayObjectContainer = null;

    private _titleId: number | string = null;
    private _titleScale: number = 0;
    public constructor() {
        super();
    }
    protected createView(id: number | string) {
        let titlecfg = Config.TitleCfg.getTitleCfgById(id);
        this._titleId = id;
        if (Api.playerVoApi.getNewPalaceRole(this._titleId) || Api.playerVoApi.checkHasDragonBones(id)) {
            this._titleScale = 0.93;
        }
        else {
            this._titleScale = 1;
        }
        if (Api.playerVoApi.checkHasDragonBones(id)) {
            this._playerContainer = App.CommonUtil.getPlayerDragonRole(String(id), Api.playerVoApi.getPlayePicId(),1);
            this._playerContainer.setScale(this._titleScale);
            this._playerContainer.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 115 - 766 + 115);
            this._container.addChild(this._playerContainer);
        }
        else {
            this._playerContainer = Api.playerVoApi.getPlayerPortrait(Number(titlecfg.id), Api.playerVoApi.getPlayePicId());
            this._playerContainer.setScale(this._titleScale)
            this._playerContainer.setPosition(GameConfig.stageWidth / 2 - this._playerContainer.width / 2 * this._titleScale, GameConfig.stageHeigth - this._playerContainer.height * this._titleScale - 115);
            this._container.addChild(this._playerContainer);
        }






        this._buttomContainer = new BaseDisplayObjectContainer();
        this._buttomContainer.width = 640;
        this._buttomContainer.anchorOffsetX = this._buttomContainer.width / 2;
        this._buttomContainer.x = 320;
        this._container.addChild(this._buttomContainer);

        this._buttombg = BaseLoadBitmap.create("specialview_buttombg1");
        this._buttombg.width = 640;

        this._itembg = BaseBitmap.create("specialview_commoni_itembg");

        // this._buttombg.height = this._itembg.height - 10 + 108;
        // this._buttombg.setPosition(0, GameConfig.stageHeigth - this._buttombg.height - 80);
        this._buttomContainer.addChild(this._buttombg);
        this._buttombg.alpha = 0.8;

        // this._itembg.setPosition(this._buttombg.x + this._buttombg.width - this._itembg.width - 20, this._buttombg.y + 60);
        this._buttomContainer.addChild(this._itembg);



        this._titleDescTF = ComponentManager.getTextField(LanguageManager.getlocal("itemDesc_" + titlecfg.id), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        // this._titleDescTF.setPosition(this._buttombg.x + 75, this._buttombg.y + 75);
        this._titleDescTF.lineSpacing = 20;
        this._titleDescTF.width = 440;
        this._buttomContainer.addChild(this._titleDescTF);


        // this._buttombg.height = this._titleDescTF.height + 10 + 108;
        let h = this._titleDescTF.height > this._itembg.height ? this._titleDescTF.height : this._itembg.height;
        this._buttombg.height = h - 10 + 108;
        this._buttombg.setPosition(0, GameConfig.stageHeigth - this._buttombg.height - 80);

        this._itembg.setPosition(this._buttombg.x + this._buttombg.width - this._itembg.width - 20, this._buttombg.y + 60);
        this._titleDescTF.setPosition(this._buttombg.x + 75, this._buttombg.y + 75);

        this._item = BaseLoadBitmap.create("itemicon" + titlecfg.id, null, {
            callback: () => {
                this._item.setPosition(this._itembg.x + this._itembg.width / 2 - this._item.width / 2, this._itembg.y + this._itembg.height / 2 - this._item.height / 2);
            }, callbackThisObj: this, callbackParams: null
        });
        this._buttomContainer.addChild(this._item);


        this._titleTFLine = BaseBitmap.create("public_line3");
        this._buttomContainer.addChild(this._titleTFLine);
        this._title = BaseLoadBitmap.create(titlecfg.titleIcon3, null, {
            callback: () => {
                this._title.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._title.width / 2, this._buttombg.y + 35 - this._title.height / 2);
                this._titleTFLine.width = 281 + this._title.width;
                this._titleTFLine.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTFLine.width / 2, this._title.y + this._title.height / 2 - this._titleTFLine.height / 2);

            }, callbackThisObj: this, callbackParams: null
        });
        this._buttomContainer.addChild(this._title);
        if (this._golookInfoBtn) {
            // this.setgolookPos(this._buttombg.x + this._buttombg.width - this._golookInfoBtn.width - 10, this._buttombg.y - this._golookInfoBtn.height - 17);
            this.setgolookPos(this._buttombg.x + this._buttombg.width / 2 - this._golookInfoBtn.width / 2, this._buttombg.y + this._buttombg.height + 10);
        }
        this.playAni();
    }
    protected refreashView(id: number | string) {
        let titlecfg = Config.TitleCfg.getTitleCfgById(id);
        this._titleId = id;
        let depth: number = 0;
        if (this._playerContainer) {
            depth = this._container.getChildIndex(this._playerContainer);
            this._container.removeChild(this._playerContainer);
            this._playerContainer.dispose();
            this._playerContainer = null;
        }
        if (Api.playerVoApi.getNewPalaceRole(this._titleId) || Api.playerVoApi.checkHasDragonBones(id)) {
            this._titleScale = 0.93;
        }
        else {
            this._titleScale = 1;
        }
        if (Api.playerVoApi.checkHasDragonBones(id)) {
            this._playerContainer = Api.playerVoApi.getPlayerDragonBonesPortrait(id, Api.playerVoApi.getPlayePicId());
            this._playerContainer.setScale(this._titleScale);
            this._playerContainer.setPosition(GameConfig.stageWidth / 2 - this._playerContainer.width / 2 * this._titleScale, GameConfig.stageHeigth - 115 - 766 + 115);
            this._container.addChildAt(this._playerContainer, depth);
        }
        else {
            this._playerContainer = Api.playerVoApi.getPlayerPortrait(Number(titlecfg.id), Api.playerVoApi.getPlayePicId());
            this._playerContainer.setScale(this._titleScale)
            this._playerContainer.setPosition(GameConfig.stageWidth / 2 - this._playerContainer.width / 2 * this._titleScale, GameConfig.stageHeigth - this._playerContainer.height * this._titleScale - 115);
            this._container.addChildAt(this._playerContainer, depth);
        }
        // this._playerContainer = Api.playerVoApi.getPlayerPortrait(Number(titlecfg.id), Api.playerVoApi.getPlayePicId());
        // this._playerContainer.setPosition(GameConfig.stageWidth / 2 - this._playerContainer.width / 2 * this._titleScale, GameConfig.stageHeigth - this._playerContainer.height * this._titleScale - 115);
        // this._container.addChildAt(this._playerContainer, depth);

        // this._item.setload("itemicon" + titlecfg.id);
        this._titleDescTF.text = LanguageManager.getlocal("itemDesc_" + titlecfg.id);

        let h = this._titleDescTF.height > this._itembg.height ? this._titleDescTF.height : this._itembg.height;
        this._buttombg.height = h - 10 + 108;
        this._buttombg.setPosition(0, GameConfig.stageHeigth - this._buttombg.height - 80);

        this._itembg.setPosition(this._buttombg.x + this._buttombg.width - this._itembg.width - 20, this._buttombg.y + 60);
        this._titleDescTF.setPosition(this._buttombg.x + 75, this._buttombg.y + 75);
        this._item.setload("itemicon" + titlecfg.id, null, {
            callback: () => {
                this._item.setPosition(this._itembg.x + this._itembg.width / 2 - this._item.width / 2, this._itembg.y + this._itembg.height / 2 - this._item.height / 2);
            }, callbackThisObj: this, callbackParams: null
        });

        this._title.setload(titlecfg.titleIcon3, null, {
            callback: () => {
                this._title.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._title.width / 2, this._buttombg.y + 35 - this._title.height / 2);
                this._titleTFLine.width = 281 + this._title.width;
                this._titleTFLine.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTFLine.width / 2, this._title.y + this._title.height / 2 - this._titleTFLine.height / 2);
            }, callbackThisObj: this, callbackParams: null
        });
        if (this._golookInfoBtn) {
            // this.setgolookPos(this._buttombg.x + this._buttombg.width - this._golookInfoBtn.width - 10, this._buttombg.y - this._golookInfoBtn.height - 17);
            this.setgolookPos(this._buttombg.x + this._buttombg.width / 2 - this._golookInfoBtn.width / 2, this._buttombg.y + this._buttombg.height + 10);
        }
        this.playAni();
    }
    protected playAni() {
        super.playAni();
        this._buttomContainer.scaleX = 0;
        this._playerContainer.alpha = 0;
        egret.Tween.get(this._buttomContainer).to({ scaleX: 1 }, 350).call(() => {
            egret.Tween.removeTweens(this._buttomContainer);
        }, this);
        egret.Tween.get(this._playerContainer).wait(500).to({ alpha: 1 }, 100).call(() => {
            egret.Tween.removeTweens(this._playerContainer);
        }, this);
    }
    protected golookInfoBtnClick() {
        let titleId = this._titleId;
        let titlecfg = Config.TitleCfg.getTitleCfgById(titleId);
        let allVoList = Api.itemVoApi.getTitleVoListByType(3);
        let titleTypes: string[] = [];
        let type: string = null;
        let idx = 0;
        // for (let k in allVoList) {

        //     let typeKey: string = allVoList[k].titleKey;
        //     if (!GameData.isInArray(typeKey, titleTypes)) {
        //         titleTypes.push(typeKey);
        //     }
        //     if (allVoList[k].id == titleId) {
        //         type = typeKey;
        //     }
        // }
        for (let k in allVoList)
        {   
            let typeKey:string = allVoList[k].titleKey;
            if (allVoList[k].id == titleId) {
                type = typeKey;
            }
            if (!GameData.isInArray(typeKey,titleTypes))
            {	
				if (typeKey == "1_5")
				{	
					let idx = -1;
					for (let i=0 ; i<titleTypes.length; i++)					
					{
						if (titleTypes[i] == "1_3" || titleTypes[i] == "1_4")
						{
							idx = i;
							break;
						}
					}
					if (idx>=0)
					{
						titleTypes.splice(idx,0,typeKey);
						continue;
					}
				}
				else if (typeKey == "1_6")
				{
					let idx = -1;
					for (let i=0 ; i<titleTypes.length; i++)					
					{
						if (titleTypes[i] == "1_3" || titleTypes[i] == "1_4")
						{
							idx = i;
							break;
						}
					}
					if (idx>=0)
					{
						titleTypes.splice(idx,0,typeKey);
						continue;
					}
                }
                	//皇位排在第一位
				if (typeKey == "1_7"){
					titleTypes.unshift(typeKey);
				}
				else{
					titleTypes.push(typeKey);
				}
            }
        }
        for (let k in titleTypes) {
            if (titleTypes[k] == type) {
                idx = Number(k);
            }
        }
        this.callBack();
        ViewController.getInstance().openView(ViewConst.COMMON.ITEMVIEW_TAB3, { titleId: titleId, idx: idx });
    }
    protected isShowBtn() {
        return true;
    }
    protected getResourceList() {
        return super.getResourceList().concat([
            "specialview_commoni_itembg"
        ])
    }
    public dispose(): void {
        egret.Tween.removeTweens(this._playerContainer);
        egret.Tween.removeTweens(this._buttomContainer);
        this._buttomContainer = null;
        this._playerContainer = null;
        this._buttombg = null;
        this._titleDescTF = null;
        this._title = null;
        this._titleTFLine = null;
        this._itembg = null;
        this._item = null;
        this._titleId = null;
        this._titleScale = 0;
        super.dispose();
    }
}