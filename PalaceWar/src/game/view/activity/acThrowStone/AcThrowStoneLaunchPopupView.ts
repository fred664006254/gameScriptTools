/**
 * 投石发射
 * author yangchengguo
 * date 2019.8.27
 * @class AcThrowStoneLaunchPopupView
 */
class AcThrowStoneLaunchPopupView extends PopupView{
    public _meterMask:egret.Rectangle = null;
    public _meter:BaseBitmap = null;
    public _flagYellow:BaseDisplayObjectContainer = null;
    public _flagRed:BaseDisplayObjectContainer = null;
    public _launchBtn:BaseButton = null;
    public _hitPos:number = 0;
    public _meterContainer:BaseDisplayObjectContainer = null;
    public _rewards:string = null;
    public _carBoneIcon:any = null;
    public _isLaunch:boolean = false;

    public constructor(){
        super();
    }

    public initView():void{
        // App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_THROWSTONE_LOTTERY, this.throwStoneCallback, this);
        let infoBgStr = ResourceManager.hasRes("acthrowstone_launch_bg-"+this.getTypeCode())?"acthrowstone_launch_bg-"+this.getTypeCode() : "acthrowstone_launch_bg-1";
        let infoBg = BaseBitmap.create(infoBgStr);
        infoBg.setPosition(this.viewBg.x + this.viewBg.width/2 - infoBg.width/2, this.viewBg.y + 2);
        this.addChildToContainer(infoBg);

        let wifeCfg = Config.WifeCfg.getWifeCfgById(this.cfg.show1);
        // let servantCfg = Config.ServantCfg.getServantItemById(this.cfg.show2);
        let infoIconImg = wifeCfg.icon;
        let infoIcon = BaseLoadBitmap.create(infoIconImg);
        infoIcon.width = 205;
        infoIcon.height = 196;
        infoIcon.setScale(0.85);
        infoBg.height = infoIcon.height * infoIcon.scaleY + 32;
        infoIcon.x = infoBg.x + 7;
        infoIcon.y = infoBg.y + infoBg.height - infoIcon.height * infoIcon.scaleY - 7;
        this.addChildToContainer(infoIcon);
        
        let info = ComponentManager.getTextField(LanguageManager.getlocal("acthrowstoneLaunchInfo-"+this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        info.setPosition(180, infoBg.y + 15);
        info.width = 370;
        info.lineSpacing = 6;
        this.addChildToContainer(info);

        //投石动效背景
        let warBg = BaseBitmap.create("acthrowstone_throw_bg");
        warBg.setPosition(this.viewBg.x + this.viewBg.width/2 - warBg.width/2, infoBg.y + infoBg.height + 5);
        this.addChildToContainer(warBg);

        let stoneCarStr = ResourceManager.hasRes("acthrowstone_car_bg-"+this.getTypeCode())?"acthrowstone_car_bg-"+this.getTypeCode() : "acthrowstone_car_bg-1";
        let stoneCarBg = BaseBitmap.create(stoneCarStr);
        stoneCarBg.setPosition(warBg.x + warBg.width/2 - stoneCarBg.width/2, warBg.y + warBg.height/2 - stoneCarBg.height/2);
        this.addChildToContainer(stoneCarBg);

        let bone = "ac_throwstone_car-"+this.getTypeCode();
        if (bone && !RES.hasRes(bone)){
            bone = "ac_throwstone_car-1";
        }
        let boneName = bone + "_ske";
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            let droIcon = App.DragonBonesUtil.getLoadDragonBones(bone);
            droIcon.setScale(1.2);
            droIcon.anchorOffsetY = droIcon.height;
            droIcon.anchorOffsetX = 0;
            droIcon.setPosition(stoneCarBg.x + 220, stoneCarBg.y + stoneCarBg.height - 20);
            this.addChildToContainer(droIcon);
            this._carBoneIcon = droIcon;
            droIcon.setIdle("idle");
        }
        else {
            let carImg = ResourceManager.hasRes("acthrowstone_car-"+this.getTypeCode()) ? "acthrowstone_car-"+this.getTypeCode() : "acthrowstone_car-1";
            let car = BaseBitmap.create(carImg);
            car.setPosition(stoneCarBg.x + car.width/2 + 10, stoneCarBg.y + 50);
            this.addChildToContainer(car);
        }

        //发射按钮
        let launchBtn = ComponentManager.getButton("btn_big_yellow", "acthrowstoneLaunchBtnName-"+this.getTypeCode(), this.launchBtnClick, this);
        launchBtn.setPosition(this.viewBg.x + this.viewBg.width/2 - launchBtn.width/2, warBg.y + warBg.height + 15);
        this.addChildToContainer(launchBtn);
        this._launchBtn = launchBtn;
        //发射消耗
        if (this.vo.isFree()){
            let freeDesc = ComponentManager.getTextField(LanguageManager.getlocal("acthrowstoneFree"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
            freeDesc.setPosition(launchBtn.x + launchBtn.width/2 - freeDesc.width/2, launchBtn.y + launchBtn.height + 10);
            this.addChildToContainer(freeDesc);
        }
        else{       
            let needBg = BaseBitmap.create("public_9_bg80");
            this.addChildToContainer(needBg);
            let stoneIconImg = ResourceManager.hasRes("acthrowstone_stone_icon-"+this.getTypeCode())?"acthrowstone_stone_icon-"+this.getTypeCode() : "acthrowstone_stone_icon-1";
            let needIcon = BaseBitmap.create(stoneIconImg);
            this.addChildToContainer(needIcon);
            let needDesc = ComponentManager.getTextField(LanguageManager.getlocal("acthrowstoneNeedNum-"+this.getTypeCode(), ["1"]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
            this.addChildToContainer(needDesc);
            needBg.width = needIcon.width/2 + 60 + needDesc.width;
            needBg.setPosition(this.viewBg.x + this.viewBg.width/2 - needBg.width/2, launchBtn.y + launchBtn.height + 15);
            needIcon.setPosition(needBg.x + 25, needBg.y - 5);
            needDesc.setPosition(needIcon.x + needIcon.width/2 + 15, needBg.y + needBg.height/2 - needDesc.height/2 + 3);
        }

        //计量条
        let meterContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(meterContainer);
        this._meterContainer = meterContainer;
        let meterBottom = BaseBitmap.create("acthrowstone_meter_bottom");
        meterContainer.addChild(meterBottom);
        let meter = BaseBitmap.create("acthrowstone_meter");
        meter.setPosition(5, 25);  //16
        meterContainer.addChild(meter);
        this._meter = meter;
        let meterBg = BaseBitmap.create("acthrowstone_meter_bg");
        meterContainer.setPosition(warBg.x + 50, warBg.y + 10);
        meterBg.setPosition(0, 0);
        meterContainer.addChild(meterBg);

        let meterMask = new egret.Rectangle(0, meter.height, meter.width, meter.height);
        meter.mask = meterMask;
        this._meterMask = meterMask;

        //黄色区域特效
        let yellowEffect = ComponentManager.getCustomMovieClip("acthrowstone_meter_yellow_effect", 15, 70);
        yellowEffect.setPosition(meterContainer.x - 45, meterContainer.y - 35);
        yellowEffect.setScale(1.3);
        this.addChildToContainer(yellowEffect);
        yellowEffect.playWithTime(0);
        yellowEffect.visible = false;

        //红色区域特效
        let redEffect = ComponentManager.getCustomMovieClip("acthrowstone_meter_red_effect", 15, 70);
        redEffect.setPosition(meterContainer.x - 38, meterContainer.y - 30);
        redEffect.setScale(1.3);
        this.addChildToContainer(redEffect);
        redEffect.playWithTime(0);
        redEffect.visible = false;

        //标志
        let flagYellowContainer = new BaseDisplayObjectContainer();
        flagYellowContainer.setPosition(meterContainer.x + 24, meterContainer.y + meter.height * 2 / 3 + 7);
        this.addChildToContainer(flagYellowContainer);
        let flagYellow = BaseBitmap.create("acthrowstone_flag_yellow");
        let flagYellowLight = BaseBitmap.create("acthrowstone_flag_light");
        flagYellowLight.setPosition(flagYellow.width/2 - flagYellowLight.width/2, flagYellow.height/2 - flagYellowLight.height/2);
        flagYellowContainer.addChild(flagYellowLight);
        flagYellowContainer.addChild(flagYellow);
        this._flagYellow = flagYellowContainer;
        flagYellowLight.visible = false;
        flagYellowLight.name = "flagYellowLight";
        egret.Tween.get(flagYellowLight, {loop:true}).to({alpha:0}, 300).to({alpha:1}, 300);

        let flagRedContainer = new BaseDisplayObjectContainer();
        flagRedContainer.setPosition(meterContainer.x + 17, meterContainer.y + meter.height /3 + 7);
        this.addChildToContainer(flagRedContainer);
        let flagRed = BaseBitmap.create("acthrowstone_flag_red");
        let flagRedLight = BaseBitmap.create("acthrowstone_flag_light");
        flagRedLight.setPosition(flagRed.width/2 - flagRedLight.width/2, flagRed.height/2 - flagRedLight.height/2);
        flagRedContainer.addChild(flagRedLight);
        flagRedContainer.addChild(flagRed);
        this._flagRed = flagRedContainer;
        flagRedLight.visible = false;
        flagRedLight.name = "flagRedLight";
        egret.Tween.get(flagRedLight, {loop:true}).to({alpha:0}, 300).to({alpha:1}, 300);

        let meterMaskY = meter.height;
        let isAdd = false;
        egret.Tween.get(meterMask, {loop:true}).call(()=>{
            if (isAdd){
                meterMaskY +=3;
            }
            else{
                meterMaskY -=3;
            }
            if (meterMaskY >= meter.height){
                meterMaskY = meter.height;
                isAdd = false;
            }
            else if (meterMaskY <= 0){
                meterMaskY = 0;
                isAdd = true;
            }
            meterMask.setTo(0, meterMaskY, meter.width, meter.height);
            meter.mask = meterMask;
            if (meterMaskY < this._meter.height/3){
                flagRedLight.visible = true;
                flagYellowLight.visible = false;
                redEffect.visible = true;
                yellowEffect.visible = false;
            }
            else if (meterMaskY < this._meter.height * 2 / 3){
                flagRedLight.visible = false;
                flagYellowLight.visible = true;
                redEffect.visible = false;
                yellowEffect.visible = true;
            }
            else{
                flagRedLight.visible = false;
                flagYellowLight.visible = false;
                redEffect.visible = false;
                yellowEffect.visible = false;
            }
        }).wait(20);
    }

    private getHitPos():number{
        let curY = this._meterMask.y;
        if (curY < this._meter.height/3){
            return 3;
        }
        else if (curY < this._meter.height * 2 / 3){
            return 2;
        }
        else{
            return 1;
        }
    }

    //发射回调
    private launchBtnClick():void{
        this._launchBtn.setGray(true);
        this._launchBtn.touchEnabled = false;
        if (!this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
    
        if (!this.vo.isFree() && this.vo.getStoneNum() < 1){
           this.showTipView();
            return;
        }
        this.closeBtn.touchEnabled = false;
        egret.Tween.pauseTweens(this._meterMask);
        this._hitPos = this.getHitPos();
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_THROWSTONE_LOTTERY, { activeId: this.vo.aidAndCode, hitPos: this._hitPos, isTenPlay:0});
    }

    private throwStoneCallback(evt:egret.Event):void{
        let rData = evt.data.data.data;
        App.LogUtil.log("raDATA: "+rData.rewards);
        // let rewardVoList = GameData.formatRewardItem(rData.rewards);
        // App.CommonUtil.playRewardFlyAction(rewardVoList);
        this._rewards = rData.rewards;
        this._isLaunch = true;
        //旗帜加小火星
        if (this._hitPos == 3){
            let flagAni = ComponentManager.getCustomMovieClip("acthrowstone_red_flag_effect", 7, 50);
            flagAni.setPosition(-30, -20);
            this._flagRed.addChild(flagAni);
            flagAni.playWithTime(1);
        }
        else if (this._hitPos == 2){
            let flagAni = ComponentManager.getCustomMovieClip("acthrowstone_yellow_flag_effect", 7, 50);
            flagAni.setPosition(-30, -20);
            this._flagYellow.addChild(flagAni);
            flagAni.playWithTime(1);
        }

        //计量条闪动
        let hideTime = 0;
        if (this._carBoneIcon){
            hideTime = 1300;
        }
        egret.Tween.get(this._meterContainer).to({alpha:0}, 100).to({alpha: 1}, 100).to({alpha:0}, 100).to({alpha: 1}, 100).wait(1000).call(()=>{
            if (this._carBoneIcon){
                this._carBoneIcon.playDragonMovie("attack", 1);
            }
        }).wait(hideTime).call(()=>{
            this.hide();
        });
    }

    //弹窗提示
    public showTipView():void{
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
			title:"acthrowstoneTipTitle",
			msg:LanguageManager.getlocal("acthrowstoneTipMsg-"+this.getTypeCode()),
			callback:()=>{
                ViewController.getInstance().openView(ViewConst.POPUP.ACTHROWSTONEREWARDPOPVIEW, { aid: this.aid, code: this.code });
            },
			handler:this,
            needCancel:true,
        });
        this._launchBtn.setGray(false);
        this._launchBtn.touchEnabled = true;
    }

    private get cfg():Config.AcCfg.ThrowStoneCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo():AcThrowStoneVo{
        return <AcThrowStoneVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }
    
    protected getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }

     /**标题 */
    protected getTitleStr():string{
        return "acthrowstoneTitle-"+this.getTypeCode();
    }
    
    protected getResourceList():string[]
	{
        let list:string[] = [];
        if (this.getTypeCode() != "1"){
            list = ["acthrowstone_launch_bg-1", "acthrowstone_car_bg-1", "acthrowstone_car-1"];
        }
		return super.getResourceList().concat([
            "acthrowstone_meter_bg","acthrowstone_meter","acthrowstone_flag_red","acthrowstone_flag_yellow","acthrowstone_flag_light", "acthrowstone_meter_bottom", 
            "acthrowstone_throw_bg","acthrowstone_launch_bg-"+this.getTypeCode(), "acthrowstone_car_bg-"+this.getTypeCode(), "acthrowstone_car-"+this.getTypeCode(),
		]).concat(list);
    }
    
    protected getBgExtraHeight():number
	{
		return 10;
	}

    public dispose():void{
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_THROWSTONE_CHANGEVIEW, {hitPos:this._hitPos, rewards:this._rewards, isLaunch:this._isLaunch});
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_THROWSTONE_LOTTERY, this.throwStoneCallback, this);
        egret.Tween.removeTweens(this._meterMask);
        this._meterMask = null;
        this._meter = null;
        this._meterContainer = null;
        this._flagRed = null;
        this._flagYellow = null;
        this._hitPos = 0;
        this._launchBtn = null;
        this._rewards = null;
        this._carBoneIcon = null;
        this._isLaunch = false;
        super.dispose();
    }
}