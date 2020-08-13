/**
 * 特殊奖励--头衔
 * @author 张朝阳
 * date 2019/5/10
 * @class SpecialTitle4GetView
 */
class SpecialTitle4GetView extends SpecialBaseView {

    private _smallThorn1: BaseLoadBitmap = null;

    private _smallThorn2: BaseLoadBitmap = null;

    private _sweepLight1: BaseLoadBitmap = null;

    private _sweepLight2: BaseLoadBitmap = null;

    private _textLight1: BaseLoadBitmap = null;

    private _textLight2: BaseLoadBitmap = null;

    private _titleBM: BaseLoadBitmap = null;

    private _titleEffectBM: BaseLoadBitmap = null;

    private _buttombg: BaseLoadBitmap = null;
    private _titleTF: BaseTextField = null;
    private _titleTFLine: BaseBitmap = null;

    private _titleInfoTFList: BaseTextField[] = [];
    private _buttomContainer: BaseDisplayObjectContainer = null;
     private _titleId: number | string = null;


    public constructor() {
        super();
    }
    protected createView(id: number | string) {
        let titlecfg = Config.TitleCfg.getTitleCfgById(id);
        this._titleId = id;
        this._smallThorn1 = BaseLoadBitmap.create("specialview_effect_smallyellowthorn");
        this._smallThorn1.width = 250;
        this._smallThorn1.height = 265;
        this._smallThorn1.anchorOffsetX = this._smallThorn1.width / 2;
        this._smallThorn1.anchorOffsetY = this._smallThorn1.height / 2;
        this._smallThorn1.setPosition(GameConfig.stageWidth / 2, 370);
        this._smallThorn1.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(this._smallThorn1)

        this._smallThorn2 = BaseLoadBitmap.create("specialview_effect_smallyellowthorn");
        this._smallThorn2.width = 250;
        this._smallThorn2.height = 265;
        this._smallThorn2.anchorOffsetX = this._smallThorn2.width / 2;
        this._smallThorn2.anchorOffsetY = this._smallThorn2.height / 2;
        this._smallThorn2.setPosition(this._smallThorn1.x, this._smallThorn1.y);
        this._smallThorn2.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(this._smallThorn2)

        this._sweepLight1 = BaseLoadBitmap.create("specialview_effect_sweeplight");
        this._sweepLight1.width = 230;
        this._sweepLight1.height = 70;
        this._sweepLight1.anchorOffsetX = 0;
        this._sweepLight1.anchorOffsetY = this._sweepLight1.height / 2;
        this._sweepLight1.setPosition(this._smallThorn1.x - this._sweepLight1.width / 2, this._smallThorn1.y);
        this._sweepLight1.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(this._sweepLight1);

        this._sweepLight2 = BaseLoadBitmap.create("specialview_effect_sweeplight");
        this._sweepLight2.width = 230;
        this._sweepLight2.height = 70;
        this._sweepLight2.anchorOffsetX = this._sweepLight1.width;
        this._sweepLight2.anchorOffsetY = this._sweepLight2.height / 2;
        this._sweepLight2.skewX = 180;
        this._sweepLight2.setPosition(this._smallThorn1.x + this._sweepLight2.width / 2, this._smallThorn1.y);
        this._sweepLight2.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(this._sweepLight2);

        let iconpic = titlecfg.titleIcon3;
        // if (titlecfg.isLvUp)
        // {
        //     let tmpstr = titlecfg.titleIcon3;
        //     for (let i=3; i<=12; i++)
        //     {
        //         let newstr = tmpstr+"_"+i;
        //         if (ResourceManager.hasRes(newstr))
        //         {
        //             iconpic = newstr;
        //         }
        //         else
        //         {
        //             break;
        //         }
        //     }
        // }

        this._titleBM = BaseLoadBitmap.create(iconpic, null, {
            callback: () => {
                this._titleBM.anchorOffsetX = this._titleBM.width / 2;
                this._titleBM.anchorOffsetY = this._titleBM.height / 2;
                this._titleBM.setScale(2);
                this._titleBM.setPosition(this._smallThorn1.x, this._smallThorn1.y);
            }, callbackThisObj: this, callbackParams: null
        });
        this.addChildToContainer(this._titleBM);


        this._titleEffectBM = BaseLoadBitmap.create(iconpic, null, {
            callback: () => {
                this._titleEffectBM.anchorOffsetX = this._titleEffectBM.width / 2;
                this._titleEffectBM.anchorOffsetY = this._titleEffectBM.height / 2;
                this._titleEffectBM.setScale(2);
                this._titleEffectBM.setPosition(this._smallThorn1.x, this._smallThorn1.y);
                this._titleEffectBM.blendMode = egret.BlendMode.ADD;
            }, callbackThisObj: this, callbackParams: null
        });
        this.addChildToContainer(this._titleEffectBM);

        this._textLight1 = BaseLoadBitmap.create("specialview_effect_textlight");
        this._textLight1.width = 367;
        this._textLight1.height = 164;
        this._textLight1.anchorOffsetX = this._textLight1.width / 2;
        this._textLight1.anchorOffsetY = this._textLight1.height / 2;
        this._textLight1.setPosition(this._smallThorn1.x - 66, this._sweepLight1.y - this._sweepLight1.height / 2 + 12);
        this._textLight1.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(this._textLight1);

        this._textLight2 = BaseLoadBitmap.create("specialview_effect_textlight");
        this._textLight2.width = 367;
        this._textLight2.height = 164;
        this._textLight2.anchorOffsetX = this._textLight2.width / 2;
        this._textLight2.anchorOffsetY = this._textLight2.height / 2;
        this._textLight2.setPosition(this._smallThorn1.x + 99, this._sweepLight2.y + this._sweepLight2.height / 2 - 12);
        this._textLight2.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(this._textLight2);

        let titleInfo: string[] = this.dealAttrChangeInfo(titlecfg);

        this._buttomContainer = new BaseDisplayObjectContainer();
        this._buttomContainer.width = 640;
        this._buttomContainer.anchorOffsetX = this._buttomContainer.width / 2;
        this._buttomContainer.x = 320;
        this._container.addChild(this._buttomContainer);

        this._buttombg = BaseLoadBitmap.create("specialview_buttombg1");
        this._buttombg.width = 640;
        this._buttombg.height = 222;
        this._buttombg.setPosition(0, GameConfig.stageHeigth - 390);
        this._buttomContainer.addChild(this._buttombg);

        for (let i = 0; i < titleInfo.length; i++) {
            let titleInfoTF = ComponentManager.getTextField(titleInfo[i], TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            if (i % 2 == 0) {
                titleInfoTF.x = this._buttombg.x + 100;
            }
            else {
                titleInfoTF.x = this._buttombg.x + 340;
            }
            titleInfoTF.y = this._buttombg.y + 85 + Math.floor(i / 2) * 50;
            this._buttomContainer.addChild(titleInfoTF);

            this._titleInfoTFList.push(titleInfoTF);
        }


        this._titleTF = ComponentManager.getTextField(titlecfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
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
        let titlecfg = Config.TitleCfg.getTitleCfgById(id);
         this._titleId = id;
        let titleInfo: string[] = this.dealAttrChangeInfo(titlecfg);

        let iconpic = titlecfg.titleIcon3;
        // if (titlecfg.isLvUp)
        // {
        //     let tmpstr = titlecfg.titleIcon3;
        //     for (let i=3; i<=12; i++)
        //     {
        //         let newstr = tmpstr+"_"+i;
        //         if (ResourceManager.hasRes(newstr))
        //         {
        //             iconpic = newstr;
        //         }
        //         else
        //         {
        //             break;
        //         }
        //     }
        // }
        this._titleBM.setload(iconpic)
        this._titleEffectBM.setload(iconpic)
        for (let i = 0; i < titleInfo.length; i++) {
            this._titleInfoTFList[i].text = titleInfo[i];
        }
        this._titleTF.text = titlecfg.name;
        this._titleTF.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTF.width / 2, this._buttombg.y + 35 - this._titleTF.height / 2)
        this._titleTFLine.width = 281 + this._titleTF.width;
        this._titleTFLine.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTFLine.width / 2, this._titleTF.y + this._titleTF.height / 2 - this._titleTFLine.height / 2);

        if (this._golookInfoBtn) {
            this.setgolookPos(this._buttombg.x + this._buttombg.width / 2 - this._golookInfoBtn.width / 2, this._buttombg.y + this._buttombg.height + 10);
        }
        this.playAni();
    }
    private dealAttrChangeInfo(titlecfg: Config.TitleItemCfg): string[] {
        let titleInfoList: string[] = [];
        for (let i = 1; i <= 4; i++) {
            let str = "";
            if (titlecfg.effect1) {
                str = LanguageManager.getlocal("SpecialHeadPortraitGetViewDesc" + i, [String(titlecfg.effect1)]);
            }
            else if (titlecfg.effect2) {
                str = LanguageManager.getlocal("SpecialHeadPortraitGetViewDesc" + i, [String(titlecfg.effect1 * 100) + "%"]);
            }
            titleInfoList.push(str);
        }
        return titleInfoList;
    }

    protected playAni() {
        super.playAni();
        this._smallThorn1.setScale(0);
        this._smallThorn1.setScale(0);
        this._titleBM.scaleX = 0;
        this._titleEffectBM.scaleX = 0;
        this._titleEffectBM.alpha = 0;
        this._textLight1.alpha = 0;
        this._textLight1.setScale(1);
        this._textLight2.alpha = 0;
        this._textLight2.setScale(1);
        this._sweepLight1.setPosition(this._smallThorn1.x - this._sweepLight1.width / 2 - 162, this._smallThorn1.y);
        this._sweepLight2.setPosition(this._smallThorn1.x + this._sweepLight2.width / 2 + 162, this._smallThorn1.y);

        egret.Tween.removeTweens(this._smallThorn1);
        egret.Tween.removeTweens(this._smallThorn2);
        egret.Tween.removeTweens(this._titleBM);
        egret.Tween.removeTweens(this._titleEffectBM);
        egret.Tween.removeTweens(this._textLight1);
        egret.Tween.removeTweens(this._textLight2);
        egret.Tween.removeTweens(this._sweepLight1);
        egret.Tween.removeTweens(this._sweepLight2);
        egret.Tween.removeTweens(this._buttomContainer);

        egret.Tween.get(this._smallThorn1).to({ scaleX: 1.4, scaleY: 1.4 }, 500).call(() => {
            egret.Tween.removeTweens(this._smallThorn1);
            this._smallThorn1.rotation = 180;
            egret.Tween.get(this._smallThorn1, { loop: true }).to({ rotation: -180 }, 40000).call(() => {
                this._smallThorn1.rotation = 180;
            }, this);
        }, this);

        egret.Tween.get(this._smallThorn2).to({ scaleX: 2, scaleY: 2 }, 500).call(() => {
            egret.Tween.removeTweens(this._smallThorn2);
            this._smallThorn2.rotation = 0;
            egret.Tween.get(this._smallThorn2, { loop: true }).to({ rotation: 360 }, 20000).call(() => {
                this._smallThorn2.rotation = 0;
            }, this);
        }, this);


        egret.Tween.get(this._titleBM).wait(150).to({ scaleX: 2 }, 150);

        egret.Tween.get(this._titleEffectBM).wait(150).to({ scaleX: 2 }, 150).call(() => {
            egret.Tween.removeTweens(this._titleEffectBM);

            egret.Tween.get(this._titleEffectBM, { loop: true }).to({ alpha: 1 }, 150).to({ alpha: 0 }, 500);

        }, this);

        egret.Tween.get(this._textLight1).wait(150).to({ alpha: 1 }, 150).call(() => {
            egret.Tween.removeTweens(this._textLight1);
            egret.Tween.get(this._textLight1, { loop: true }).to({ scaleX: 0.3, scaleY: 0.3 }, 1000).to({ scaleX: 1, scaleY: 1 }, 1000);

        }, this);

        egret.Tween.get(this._textLight2).wait(150).to({ alpha: 1 }, 150).call(() => {
            egret.Tween.removeTweens(this._textLight2);
            egret.Tween.get(this._textLight2, { loop: true }).to({ scaleX: 0.3, scaleY: 0.3 }, 1000).to({ scaleX: 1, scaleY: 1 }, 1000);

        }, this);



        egret.Tween.get(this._sweepLight1).to({ x: this._smallThorn1.x - this._sweepLight1.width / 2 }, 450);
        egret.Tween.get(this._sweepLight1).to({ scaleX: 1 }, 130);
        egret.Tween.get(this._sweepLight1).wait(320).to({ alpha: 0 }, 130);

        egret.Tween.get(this._sweepLight2).to({ x: this._smallThorn1.x + this._sweepLight2.width / 2 }, 450);
        egret.Tween.get(this._sweepLight2).to({ scaleX: 1 }, 130);
        egret.Tween.get(this._sweepLight2).wait(320).to({ alpha: 0 }, 130);

        this._buttomContainer.scaleX = 0;

        egret.Tween.get(this._buttomContainer).to({ scaleX: 1 }, 350).call(() => {
            egret.Tween.removeTweens(this._buttomContainer);
        }, this);


    }
    protected getResourceList() {
        return super.getResourceList().concat([
            "specialview_commoni_itembg"
        ])
    }

    protected golookInfoBtnClick() {
        let titleId = this._titleId;
        let idx = 0;
        let allVoList = Api.itemVoApi.getTitleVoListByType(4);
        let titleTypes: string[] = [];
        let type: string = null;
       
        for (let k in allVoList)
        {
            let typeKey:string = allVoList[k].titleKey;
            if (!GameData.isInArray(typeKey,titleTypes))
            {
                titleTypes.push(typeKey);
            }
            if (allVoList[k].id == titleId) {
                type = typeKey;
            }
        }
		GameData.arrayPutItemLast("5",titleTypes);
		GameData.arrayPutItemLast("7",titleTypes);
		GameData.arrayPutItemLast("8",titleTypes);
        for (let k in titleTypes) {
            if (titleTypes[k] == type) {
                idx = Number(k);
            }
        }
        this.callBack();
        let itemview : any = ViewController.getInstance().getView(ViewConst.COMMON.ITEMVIEW_TAB4);
        if(itemview && itemview.tabViewData && itemview.tabViewData[3]){
            
        }
        else{
            ViewController.getInstance().openView(ViewConst.COMMON.ITEMVIEW_TAB4, { titleId: titleId, idx: idx });
        }
        
    }
    protected isShowBtn() {
        return true;
    }

    public dispose(): void {
        egret.Tween.removeTweens(this._smallThorn1);
        egret.Tween.removeTweens(this._smallThorn2);
        egret.Tween.removeTweens(this._titleBM);
        egret.Tween.removeTweens(this._titleEffectBM);
        egret.Tween.removeTweens(this._textLight1);
        egret.Tween.removeTweens(this._textLight2);
        egret.Tween.removeTweens(this._sweepLight1);
        egret.Tween.removeTweens(this._sweepLight2);
        egret.Tween.removeTweens(this._buttomContainer);
        this._smallThorn1 = null;
        this._smallThorn2 = null;
        this._sweepLight1 = null;
        this._sweepLight2 = null;
        this._textLight1 = null;
        this._textLight2 = null;
        this._titleBM = null;
        this._titleEffectBM = null;
        this._buttomContainer = null;
        this._buttombg = null;
        this._titleTF = null;
        this._titleTFLine = null;
        this._titleInfoTFList = [];
        this._titleId = null;
        super.dispose();
    }
}