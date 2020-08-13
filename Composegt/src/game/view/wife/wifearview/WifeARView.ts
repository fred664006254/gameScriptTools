/*
* 日本特有新手引导
*/

class WifeARView extends BaseDisplayObjectContainer {



    private btnList: any[] = [];
    private wife: BaseDisplayObjectContainer = null;
    private wifeDro: BaseLoadDragonBones = null;
    //控制移动事件的频率，提高性能
    public lockTime: number = 0;

    private isPlaying: boolean = false;
    private scaleMin: number = 0;
    private scaleMax: number = 0;

    private touchPoints: Object = { names: [] }; //{touchid:touch local,names:[ID1,ID2]};
    private distance: number = 0;
    private touchCon: number = 0;
    private photoWidth: number = 0;
    private photoHeight: number = 0;
    //控制缩放速率[0,1000]
    private scaleOffset: number = 0;


    private lastScale: number = 0;

    public constructor(wifeId: number) {
        super();
        this.init(wifeId);
    }


    public setProtoSize(photoWidth, photoHeight) {
        this.photoWidth = photoWidth;
        this.photoHeight = photoHeight;
    }



    public init(wifeId: number): void {
        GameConfig.stage.maxTouches = 3;
        let layerHeight = LayerManager.panelLayer.y * 2;
        this.width = GameConfig.stageWidth;
        this.height = GameConfig.stageHeigth + layerHeight;
        this.scaleMin = 0.6;
        this.scaleMax = 1.2;
        this.scaleOffset = 200;

        let alphaBg = BaseLoadBitmap.create('public_alphabg', new egret.Rectangle(0, 0, this.width, this.height));
        alphaBg.width = this.width;
        alphaBg.height = this.height;
        this.addChild(alphaBg);

        let bottombg = BaseLoadBitmap.create("public_9_black", new egret.Rectangle(0, 0, this.width, 120));
        bottombg.width = this.width;
        bottombg.height = 120;
        this.addChild(bottombg);
        bottombg.alpha = 0.7;
        bottombg.setPosition(0, this.height - bottombg.height);

        let btn0 = ComponentManager.getButton("wifearview_takephoto", "", this.onBtnClick0, this);
        let btn1 = ComponentManager.getButton('wifearview_back', "", this.onBtnClick1, this);
        let btn2 = ComponentManager.getButton("wifearview_switch", "", this.onBtnClick2, this);
        btn0.anchorOffsetY = btn0.height / 2;
        btn1.anchorOffsetY = btn1.height / 2;
        btn2.anchorOffsetY = btn2.height / 2;
        this.addChild(btn0);
        this.addChild(btn1);
        this.addChild(btn2);
        btn0.setScale(0.8);
        btn1.setScale(0.8);
        btn2.setScale(0.8);

        btn0.setPosition(bottombg.x + bottombg.width / 2 - btn1.width / 2, bottombg.y + bottombg.height / 2);
        btn1.setPosition(bottombg.x + 80, bottombg.y + bottombg.height / 2);
        btn2.setPosition(bottombg.x + bottombg.width - btn2.width - 80, bottombg.y + bottombg.height / 2);

        this.btnList.push(btn0, btn1, btn2, bottombg);
        alphaBg.touchEnabled = true;

        this.wife = new BaseDisplayObjectContainer();
        this.wife.width = 700;
        this.wife.height = 500;
        this.wife.anchorOffsetX = 0;
        this.wife.anchorOffsetY = this.wife.height / 2;
        this.wife.setPosition(0, 500 / 2 + 50);
        this.addChild(this.wife);

        this.wife.touchEnabled = true;

        GameConfig.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        GameConfig.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
        GameConfig.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
        this.wife.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this)


        let isTest = false;
        if (!isTest) {
            let wifeVo = Api.wifeVoApi.getWifeInfoVoById(wifeId);
            if (Api.wifeSkinVoApi.isHaveSkin(wifeId)) {
                let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeId);
                if (wifeSkinVo && wifeSkinVo.equip != "") {
                    let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
                    if (Api.wifeVoApi.isHaveBone(skinCfg.bone + "_ske")) {
                        this.wifeDro = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                        this.wife.addChild(this.wifeDro);
                    }
                }
                else {
                    if (Api.wifeVoApi.isHaveBone(wifeVo.bone + "_ske")) {

                        this.wifeDro = App.DragonBonesUtil.getLoadDragonBones(wifeVo.bone);
                        this.wife.addChild(this.wifeDro);
                    }
                }

            } else {
                if (Api.wifeVoApi.isHaveBone(wifeVo.bone + "_ske")) {

                    this.wifeDro = App.DragonBonesUtil.getLoadDragonBones(wifeVo.bone);
                    this.wife.addChild(this.wifeDro);

                }
            }
        } else {
            let wifeDro = App.DragonBonesUtil.getLoadDragonBones('wife_full_101');
            this.wifeDro = wifeDro;
            this.wifeDro.setPosition(-15, 250);
            this.wifeDro.rotation = 90;
            this.wife.addChild(wifeDro);
        }




        let logo = BaseBitmap.create("loginres_logo");
        logo.rotation = 90;
        logo.setScale(0.4);
        this.addChild(logo);
        logo.setPosition(this.width, 0);

        let erweima = BaseBitmap.create("wifearview_erweima");
        erweima.anchorOffsetX = erweima.width;
        erweima.anchorOffsetY = erweima.height;
        erweima.rotation = 90;
        erweima.setScale(0.5);
        this.addChild(erweima);
        erweima.setPosition(10, bottombg.y - 10);

    }

    private onTouchMove(e: egret.TouchEvent) {
        if (this.isPlaying) return;
        //console.log("this.touchCon", this.touchCon)
        if (this.touchCon == 1 && !this.lockTime) {
            let y = e.stageY;

            if (y < 100) {
                y = 100;
            }
            if (y > this.height - 200) {
                y = this.height - 200;
            }
            this.wife.y = y;
        }

    }


    private mouseDown(evt: egret.TouchEvent) {
        if (this.isPlaying) return;
        if (this.touchPoints[evt.touchPointID] == null) {
            this.touchPoints[evt.touchPointID] = new egret.Point(evt.stageX, evt.stageY);
            this.touchPoints["names"].push(evt.touchPointID);
        }
        this.touchCon++;

        if (this.touchCon == 2) {

            this.distance = this.getTouchDistance();


        }

    }

    private mouseMove(evt: egret.TouchEvent) {
        if (this.isPlaying) return;
        this.touchPoints[evt.touchPointID].x = evt.stageX;
        this.touchPoints[evt.touchPointID].y = evt.stageY;
        if (this.touchCon == 2) {
            var newdistance = this.getTouchDistance();
            let scale = (newdistance + this.scaleOffset) / (this.distance + this.scaleOffset);
            if (this.lastScale) {
                scale *= this.lastScale;
            }
            if (!scale) scale = 1;
            if (scale > this.scaleMax) {
                scale = this.scaleMax;
            }
            if (scale < this.scaleMin) {
                scale = this.scaleMin;
            }
            this.wife.setScale(scale)
        }
    }

    private mouseUp(evt: egret.TouchEvent) {
        if (this.isPlaying) return;
        delete this.touchPoints[evt.touchPointID];
        //console.log("mouseUp");
        this.touchCon--;
        if (this.touchCon == 1) {
            this.lockTime = 1;
            setTimeout(() => {
                this.lockTime = 0;
            }, 100);
        }
        this.lastScale = this.wife.scaleX;
    }

    private getTouchDistance(): number {
        var _distance: number = 0;
        var names = this.touchPoints["names"];
        _distance = egret.Point.distance(this.touchPoints[names[names.length - 1]],
            this.touchPoints[names[names.length - 2]]);
        return _distance;
    }


    private onBtnClick0(param: any) {
        if (this.isPlaying) return
        this.isPlaying = true;
        for (let i = 0; i < this.btnList.length; i++) {
            const element = this.btnList[i];
            element.visible = false;
        }
        this.wifeDro.stop();

        let data = null;
        //ios和安卓实现方式不同 ios需要传图片base64数据 安卓不需
        if (App.DeviceUtil.isIOS()) {
            var renderTexture: egret.RenderTexture = new egret.RenderTexture();
            renderTexture.drawToTexture(this);
            let rect = new egret.Rectangle(0, 0, this.width, this.height);
            if (this.photoWidth && this.photoHeight) {
                rect.setTo(this.width - this.photoWidth, this.height - this.photoHeight, this.photoWidth, this.photoHeight)
            }
            data = renderTexture.toDataURL("image/png");
        }
        RSDKHelper.takePhoto(data || null, () => {
            console.log('拍照callback')
            this.isPlaying = false;
            this.touchCon = 0;
            this.wifeDro.resume();
            for (let i = 0; i < this.btnList.length; i++) {
                const element = this.btnList[i];
                element.visible = true;
            }
        });
        data = null;
    }

    private onBtnClick1(param: any) {
        RSDKHelper.closeARCamera(() => {
            console.log('关闭相机callback')
            LayerManager.showLayer();
            this.dispose();
        });

    }
    private onBtnClick2(param: any) {
        RSDKHelper.switchCamera(null);
    }


    public dispose(): void {
        GameConfig.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        GameConfig.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
        GameConfig.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
        GameConfig.stage.maxTouches = 1;
        this.wife.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.wife = null;
        this.btnList = [];
        this.lockTime = 0;
        this.isPlaying = false;
        this.scaleMin = 0;
        this.scaleMax = 0;
        this.touchPoints = { names: [] };
        this.distance = 0;
        this.touchCon = 0;
        this.photoWidth = 0;
        this.photoHeight = 0;
        this.scaleOffset = 0;
        this.lastScale = 0;
        super.dispose();
    }
}