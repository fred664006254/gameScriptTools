/**
 * 转世界面
 */
class WifeChangeSexView extends CommonView {
    private _sexType = 0;//0女 1男
    private _text: BaseTextField = null;
    private _maletext: BaseTextField = null;
    private _npc: BaseLoadBitmap = null;
    private _malebtn: BaseButton = null;
    private _femalebtn: BaseButton = null;
    private _changebtn: BaseButton = null;
    private _nameBg: BaseBitmap = null;
    private _nameLine: BaseBitmap = null;
    private _droWifeIcon: BaseLoadDragonBones = null;
    private _changebtnName: BaseTextField = null;
    public constructor() {
        super();
    }

    protected getTitleBgName(): string {
        return `wifechangesextitle`;
    }

    protected isShowTitleBgShadow(): boolean {
        return false;
    }

    protected getCloseBtnName(): string {
        return "wifechangesex_closebtn";
    }


    protected getBgName(): string {
        let wid = this.param.data.wid;
        let wifeinfovo = Api.wifeVoApi.getWifeInfoVoById(wid);
        let sex = wifeinfovo.sexflag;
        return `wifechangesexbg${sex ? '_male' : ''}`;
    }

    protected getResourceList(): string[] {
        return super.getResourceList().concat([
            `wifechangesex`, 'wifechangesexbg', 'wifechangesexbg_male', 'createuser_flower', "acredlotuswarrior_btn-1",
        ]);
    }

    protected getTitleStr(): string {
        return null;
    }

    protected initView(): void {
        let view = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFE_WIFESEXSETTING, this.setWifeCallback, this);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;

        let wid = view.param.data.wid;
        let wifeinfovo = Api.wifeVoApi.getWifeInfoVoById(wid);
        let sex = wifeinfovo.sexflag;
        //0女1男
        view._sexType = sex;

        view.titleBg.y = 15;
        view.closeBtn.y = 15;


        let malebtn = ComponentManager.getButton(`malechangebtn`, ``, () => {
            if (view._sexType == 0) {
                view._sexType = 1;
                view.freshView();
            }
        }, view, null, 3);
        malebtn.x = GameConfig.stageWidth - malebtn.width - 30;
        malebtn.y = GameConfig.stageHeigth - 730 + 50;
        view.addChild(malebtn);
        view._malebtn = malebtn;

        let femalebtn = ComponentManager.getButton(`femalechangebtn`, ``, () => {
            if (view._sexType > 0) {
                view._sexType = 0;
                view.freshView();
            }
        }, view, null, 3);
        femalebtn.x = GameConfig.stageWidth - femalebtn.width - 30;
        femalebtn.y = GameConfig.stageHeigth - 555 + 50;
        view.addChild(femalebtn);
        view._femalebtn = femalebtn;


        let npc = BaseLoadBitmap.create(wifeinfovo.body);
        npc.width = 640;
        npc.height = 840;
        npc.setScale(0.75);
        npc.setPosition(-20, malebtn.y - 20);
        view.addChild(npc);
        view._npc = npc;


        if (App.CommonUtil.check_dragon() && Api.wifeVoApi.isHaveBone(wifeinfovo.bone + "_ske")) {
            view._npc.visible = false;
            this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(wifeinfovo.bone);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, this._droWifeIcon, this.viewBg, [220, 90]);//, [100, 200]

            this.addChildAt(this._droWifeIcon, this.getChildIndex(view._npc));
        } else {
            view._npc.visible = true;
        }

        let bottombg = BaseBitmap.create(`wifechangesexbottom`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view);
        view.addChild(bottombg);

        let changebtn = ComponentManager.getButton("acredlotuswarrior_btn-1", ``, () => {
            //发消息
            NetManager.request(NetRequestConst.REQUEST_WIFE_WIFESEXSETTING, {
                wifeId: wid,
                sexflag: this._sexType
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, changebtn, bottombg, [0, 15]);
        view.addChild(changebtn);
        view._changebtn = changebtn;

        this._changebtnName = ComponentManager.getTextField(LanguageManager.getlocal('blueWife'), 32, TextFieldConst.COLOR_BROWN);
        this.addChild(this._changebtnName);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._changebtnName, this._changebtn);


        let line = BaseBitmap.create(`wifechangesex_nameline${this._sexType ? '_male' : ''}`);
        line.width = 360;
        view.addChild(line);
        line.setPosition(GameConfig.stageWidth - line.width - 20, malebtn.y / 2 + 55);
        view._nameLine = line;

        let text = ComponentManager.getTextField(wifeinfovo.desc, 22, TextFieldConst.COLOR_QUALITY_WHITE);
        text.width = 360;
        text.lineSpacing = 5;
        view.addChild(text);
        view._text = text;
        text.setPosition(line.x, line.y + 10);


        let nameBg = BaseBitmap.create(`wifechangesex_namebg${view._sexType ? '_male' : ''}`);
        view.addChild(nameBg);
        nameBg.setPosition(line.x, line.y - nameBg.height);
        view._nameBg = nameBg;

        let maletext = ComponentManager.getTextField(LanguageManager.getlocal(`changewife${view._sexType == 0 ? `female` : `male`}`, [wifeinfovo.name]), 24, TextFieldConst.COLOR_LIGHT_YELLOW)
        view._maletext = maletext;
        view.addChild(maletext);
        if (PlatformManager.checkIsTextHorizontal()){
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, maletext, nameBg, [25, 10]);
        }else{
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, maletext, nameBg, [-20, 3]);
        }


        //樱花
        let flower = BaseBitmap.create("wifechangesex_flower");
        flower.x = -20;
        flower.y = -30;
        this.addChild(flower);

        this.swapChildren(flower, this.titleBg);

        //樱花动效
        let randomT = 2000 + Math.floor(Math.random() * 800);
        let randomR = 2.5 + Math.random();
        egret.Tween.get(flower, { loop: true })
            .to({ rotation: 1.5 * randomR }, randomT, egret.Ease.quadOut)
            .to({ rotation: -0.5 * randomR }, randomT * 2, egret.Ease.quadInOut)
            .to({ rotation: 0 }, randomT, egret.Ease.quadIn);

        let randomTT = 5000 + Math.floor(Math.random() * 800);
        let x = flower.x;
        let y = flower.y;
        egret.Tween.get(flower, { loop: true })
            .to({ x: x + 10, y: y + 5 }, randomTT, egret.Ease.quadOut)
            .to({ x: x - 10, y: y - 5 }, randomTT * 2, egret.Ease.quadInOut)
            .to({ x: x, y: y }, randomTT, egret.Ease.quadIn);

        //花瓣骨骼
        if (App.DeviceUtil.CheckWebglRenderMode() && App.CommonUtil.check_dragon()) {

            let flowerDragon = App.DragonBonesUtil.getLoadDragonBones("createuser_huaban");
            flowerDragon.x = 100;
            flowerDragon.y = 100;
            flowerDragon.setIdle("huaban");

            this.addChild(flowerDragon);

        }



        view.freshView(1);
    }

    private setWifeCallback(evt: egret.Event): void {
        let view = this;
        if (evt.data.data) {
            ViewController.getInstance().openView(ViewConst.COMMON.WIFECHANGESEXSUCCESSVIEW, {
                wid: view.param.data.wid,
                type: 10,
                sex: view._sexType
            });
            view.hide();
        }
    }

    private freshView(isInit?: number): void {
        let view = this;

        let isfemale = view._sexType == 0;
        let wid = view.param.data.wid;
        let wifeinfovo = Api.wifeVoApi.getWifeInfoVoById(wid);
        let bg = <BaseBitmap>view.viewBg;
        bg.setRes(`wifechangesexbg${view._sexType ? '_male' : ''}`);
        view._npc.setload(isfemale ? ("wife_full_" + wid) : ("wife_full_" + wid + "_male"));
        let nowBone = isfemale ? ("wife_full_" + wid) : ("wife_full_" + wid + "_male");
        if (!isInit) {
            if (App.CommonUtil.check_dragon() && Api.wifeVoApi.isHaveBone(nowBone + '_ske')) {
                view._npc.visible = false;
                if (this._droWifeIcon) {
                    this.removeChild(this._droWifeIcon);
                    this._droWifeIcon.dispose();
                    this._droWifeIcon = null;
                    this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(nowBone);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, this._droWifeIcon, this.viewBg, [220, 90]);
                    this.addChildAt(this._droWifeIcon, this.getChildIndex(view._npc));
                } else {
                    this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(nowBone);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, this._droWifeIcon, this.viewBg, [220, 90]);//, [100, 200]
                    this.addChildAt(this._droWifeIcon, this.getChildIndex(view._npc));
                }
            } else {
                view._npc.visible = true;
                if (this._droWifeIcon) {
                    this._droWifeIcon.visible = false;
                }
            }
        }

        view._femalebtn.setBtnBitMap(isfemale ? `femalechangebtn` : `femalechangebtn_down`);
        view._malebtn.setBtnBitMap(isfemale ? `malechangebtn_down` : `malechangebtn`);
        view._text.text = LanguageManager.getlocal(isfemale ? ("wifeDesc_" + wid) : ("wifeDesc_" + wid + "_male"));
        view._text.setColor((isfemale ? 0x954815 : TextFieldConst.COLOR_QUALITY_WHITE));
        view._maletext.text = LanguageManager.getlocal(`changewife${isfemale ? `female` : `male`}`, [LanguageManager.getlocal(isfemale ? `wifeName_${wid}` : `wifeName_${wid}_male`)]);
        view._changebtn.setEnable(wifeinfovo.sexflag != view._sexType);
        if (wifeinfovo.sexflag == view._sexType) {
            App.DisplayUtil.changeToGray(view._changebtnName);
        } else {
            App.DisplayUtil.changeToNormal(view._changebtnName);
        }
        view._nameBg.setRes(`wifechangesex_namebg${view._sexType ? '_male' : ''}`);
        view._nameLine.setRes(`wifechangesex_nameline${view._sexType ? '_male' : ''}`);
        // view._text.x = 30;
        // view._text.y = view._maletext.y + view._maletext.height + 10;

    }

    public dispose(): void {
        let view = this;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFE_WIFESEXSETTING, this.setWifeCallback, this);
        view._sexType = 0;//0女 1男
        view._text = null;
        view._maletext = null;
        view._npc = null;
        view._malebtn = null;
        view._femalebtn = null;
        view._changebtn = null;
        view._nameBg = null;
        view._nameLine = null;
        view._droWifeIcon = null;
        view._changebtnName = null;
        super.dispose();
    }
}