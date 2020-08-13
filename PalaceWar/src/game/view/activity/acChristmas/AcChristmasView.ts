/**
 * 	圣诞活动
 * author 张朝阳
 * date 2018/11/27
 * @class AcChristmasView
 */
class AcChristmasView extends AcCommonView {

    private _taskBtn: BaseButton = null;

    private _starTxt: BaseTextField = null;

    private _timeTxt: BaseTextField = null;

    private _tenBtn: BaseButton = null;
    private _oneBtn: BaseButton = null;

    private _tenUseNumTxt: BaseTextField = null;

    private _tenDescTxt: BaseTextField = null;

    private _firstfloorBM: BaseLoadBitmap = null;
    private _secondfloorBM: BaseLoadBitmap = null;
    private _thirdfloorBM: BaseLoadBitmap = null;
    private _finalfloorBM: BaseLoadBitmap = null;

    private _floolStarScaleValue: number = 0.48;
    private _firstFloolBg: BaseBitmap = null;
    private _firstFloolDesc1: BaseTextField = null;
    private _firstFloolStarBM: BaseBitmap = null;
    private _firstFloolDesc2: BaseTextField = null;

    private _secondFloolBg: BaseBitmap = null;
    private _secondFloolDesc1: BaseTextField = null;
    private _secondFloolStarBM: BaseBitmap = null;
    private _secondFloolDesc2: BaseTextField = null;

    private _thirdFloolBg: BaseBitmap = null;
    private _thirdFloolDesc1: BaseTextField = null;
    private _thirdFloolStarBM: BaseBitmap = null;
    private _thirdFloolDesc2: BaseTextField = null;

    private _finalFloolBg: BaseBitmap = null;
    private _finalFloolDesc: BaseTextField = null;
    private _nowFloorRewardList: { id: string, reward: string, weight: number, isLight: boolean }[] = []

    private _firstFloolRewardList: any[] = [];
    private _secondFloolRewardList: any[] = [];
    private _thirdFloolRewardList: any[] = [];
    private _finalloolRewardList: any[] = [];

    private _isTen: boolean = false;

    private _successBg: BaseBitmap = null;
    private _successTxt: BaseTextField = null;
    private _timeBg:BaseBitmap =null;

    //新增
    private _treeContainer:BaseDisplayObjectContainer = null;
    private _onceDesc:BaseTextField = null;
    private _onceIcon:BaseBitmap = null;
    private _tenDesc:BaseTextField = null;
    private _tenIcon:BaseBitmap = null;
    private _floorNumList:any[] = [];
    private _bubbleTip:BaseDisplayObjectContainer = null;
    private _isPlay:boolean = false;

    private _firstFloolCfg: any[] = [
        { x: 67, y: 773, scale: 0.85 },
        { x: 181, y: 792, scale: 0.7 },
        { x: 300, y: 789, scale: 0.95 },
        { x: 421, y: 805, scale: 0.7 },
        { x: 528, y: 789, scale: 0.8 },
    ];
    private _secondFloolCfg: any[] = [
        { x: 119, y: 608, scale: 0.7 },
        { x: 218, y: 637, scale: 0.9 },
        { x: 340, y: 636, scale: 0.7 },
        { x: 479, y: 621, scale: 0.90 },
    ];
    private _thirdFloolCfg: any[] = [
        { x: 173, y: 468, scale: 0.7 },
        { x: 299, y: 432, scale: 0.95 },
        { x: 423, y: 472, scale: 0.7 },
    ];
    private _finalFloolCfg: any[] = [
        { x: 299, y: 301, scale: 0.7 },
    ];

    private _processNumPos:any[] = [];

    public constructor() {
        super();
    }

   protected getContainerY():number
	{
		return 0;
	}

    public initView() {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_CHRISTMASLOTTERY, this.christmasLotteryHandel, this);
        let vo = <AcChristmasVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        let acCfg = <Config.AcCfg.ChristmasCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);

        if (this.getTypeCode() == "8"){
            this._firstFloolCfg = [
                { x: 101, y: 416, scale: 1, isEffect:1, percent:1 },
                { x: 170, y: 413, scale: 1, isEffect:1, percent:0.8 },
                { x: 243, y: 426, scale: 1, isEffect:1, percent:0.6 },
                { x: 317, y: 422, scale: 1, isEffect:1, percent:0.4 },
                { x: 389, y: 397, scale: 1, isEffect:1, percent:0.2 },
            ];
            this._secondFloolCfg = [
                { x: 143, y: 281, scale: 1, isEffect:1, percent:0.25},
                { x: 215, y: 288, scale: 1, isEffect:1, percent:0.5 },
                { x: 277, y: 297, scale: 1, isEffect:1, percent:0.75 },
                { x: 357, y: 277, scale: 1, isEffect:1, percent:1 },
            ];
            this._thirdFloolCfg = [
                { x: 182, y: 154, scale: 1, isEffect:1, percent:1 },
                { x: 252, y: 162, scale: 1, isEffect:1 },
                { x: 307, y: 145, scale: 1, isEffect:1, percent:0.5 },
            ];
            this._finalFloolCfg = [
                { x: 239, y: 27, scale: 1, isEffect:2 },
            ];
            this._processNumPos = [
                {x: 0, y: 390},
                {x: 0, y: 267},
                {x: 0, y: 135}
            ];
        }
        else{
            this._firstFloolCfg = [
                { x: 67, y: 773, scale: 0.85 },
                { x: 181, y: 792, scale: 0.7 },
                { x: 300, y: 789, scale: 0.95 },
                { x: 421, y: 805, scale: 0.7 },
                { x: 528, y: 789, scale: 0.8 },
            ];
            this._secondFloolCfg = [
                { x: 119, y: 608, scale: 0.7 },
                { x: 218, y: 637, scale: 0.9 },
                { x: 340, y: 636, scale: 0.7 },
                { x: 479, y: 621, scale: 0.90 },
            ];
            this._thirdFloolCfg = [
                { x: 173, y: 468, scale: 0.7 },
                { x: 299, y: 432, scale: 0.95 },
                { x: 423, y: 472, scale: 0.7 },
            ];
            this._finalFloolCfg = [
                { x: 299, y: 301, scale: 0.7 },
            ];
        }

        let bgStr = "acchristmasview_bg";
        if (this.code != "1" && this.code != "2") {
            bgStr = "acchristmasview_bg_" + this.code;
            if (this.isMagpieBridge()){
                bgStr = "acchristmasview_bg_" + this.isMagpieBridge();
            }
            else if (this.getTypeCode() == "8"){
                bgStr = "acchristmasview_bg_" + this.getTypeCode();
            }
        }
        else{
            if (this.titleTF){
                this.titleTF.setColor(TextFieldConst.COLOR_BLACK);
            }
        }
        let bg = BaseLoadBitmap.create(bgStr);
        bg.width = 640;
        bg.height = 1136;
        bg.setPosition(0, GameConfig.stageHeigth - bg.height - 104);
        this.addChildToContainer(bg);

        //鹊桥相会水动画
        if (this.isMagpieBridge()){
            let moonEffect = ComponentManager.getCustomMovieClip("acchristmas_mooneffect", 8, 70);
            moonEffect.setPosition(bg.x + 111, bg.y + 246);
            moonEffect.playWithTime(-1);
            this.addChildToContainer(moonEffect);

            let waterEffect = ComponentManager.getCustomMovieClip("acchristmas_watereffect", 8, 70);
            waterEffect.setPosition(bg.x , bg.y + 366);
            waterEffect.playWithTime(-1);
            this.addChildToContainer(waterEffect);
        }

        //圣诞树相关
        //最后一层
        if (this.getTypeCode() != "8"){
            let finalfloorStr = "acchristmasview_finalfloor1";
            if (this.code != "1" && this.code != "2") {

                finalfloorStr = "acchristmasview_finalfloor1_" + this.code;
                if (this.isValentines()) {
                    finalfloorStr = "acchristmasview_finalfloor1_" + this.isValentines();
                }
            }
            this._finalfloorBM = BaseLoadBitmap.create(finalfloorStr);
            this._finalfloorBM.width = 268;
            this._finalfloorBM.height = 248;
            this._finalfloorBM.setPosition(bg.x + 202, bg.y + 200);
            this.addChildToContainer(this._finalfloorBM);

            //第三层
            let thirdfloorBMStr = "acchristmasview_thirdfloor2";
            if (this.code != "1" && this.code != "2") {

                thirdfloorBMStr = "acchristmasview_thirdfloor2_" + this.code;
                if (this.isValentines()) {
                    thirdfloorBMStr = "acchristmasview_thirdfloor2_" + this.isValentines();
                }
            }
            this._thirdfloorBM = BaseLoadBitmap.create(thirdfloorBMStr);
            this._thirdfloorBM.width = 431;
            this._thirdfloorBM.height = 211;
            this._thirdfloorBM.setPosition(bg.x + 116, bg.y + 391);
            this.addChildToContainer(this._thirdfloorBM);

            //第二层
            let secondfloorBMStr = "acchristmasview_secondfloor2";
            if (this.code != "1" && this.code != "2") {

                secondfloorBMStr = "acchristmasview_secondfloor2_" + this.code;
                if (this.isValentines()) {
                    secondfloorBMStr = "acchristmasview_secondfloor2_" + this.isValentines();
                }
            }
            this._secondfloorBM = BaseLoadBitmap.create(secondfloorBMStr);
            this._secondfloorBM.width = 555;
            this._secondfloorBM.height = 260;
            this._secondfloorBM.setPosition(bg.x + 66, bg.y + 519);
            this.addChildToContainer(this._secondfloorBM);

            //第一层
            this._firstfloorBM = BaseLoadBitmap.create("acchristmasview_firstfloor1");
            this._firstfloorBM.width = 640;
            this._firstfloorBM.height = 305;
            this._firstfloorBM.setPosition(bg.x + 0, bg.y + 681);
            this.addChildToContainer(this._firstfloorBM);
        }
        //雪花
        // yinghua
        let xuehuaParticleStr = "xuehua";
        if (this.isValentines()) {
            xuehuaParticleStr = "yinghua";
        }
        else if (this.getTypeCode() == "8"){
            xuehuaParticleStr = "christmas_new_snow";
        }
        let xuehuaParticle = App.ParticleUtil.getParticle(xuehuaParticleStr);
        xuehuaParticle.x = 0;
        xuehuaParticle.y = -50;
        xuehuaParticle.start();;
        this.addChildToContainer(xuehuaParticle);
        if (this.isValentines()) {
            xuehuaParticle.x = 120;
        }
        else if (this.getTypeCode() == "8"){
            xuehuaParticle.x = - 320;
        }
        if(this.getUiCode() == "5")
        {
            xuehuaParticle.visible = false;
        }
        if (this.isMagpieBridge()){
            xuehuaParticle.visible = false;
        }
        //点击区域相关
        if (this.getTypeCode() != "8"){
            //第一层
            let firstfloorTouch = BaseBitmap.create("public_alphabg");
            firstfloorTouch.width = 640;
            firstfloorTouch.height = 180;
            firstfloorTouch.setPosition(bg.x + bg.width / 2 - firstfloorTouch.width / 2, bg.y + 766);
            this.addChildToContainer(firstfloorTouch);
            firstfloorTouch.addTouchTap(this.rewardClick, this, ["1"]);
            firstfloorTouch.alpha = 0;


            //第二层
            let secondfloorTouch = BaseBitmap.create("public_alphabg");
            secondfloorTouch.width = 364;
            secondfloorTouch.height = 124;
            secondfloorTouch.setPosition(bg.x + bg.width / 2 - secondfloorTouch.width / 2, bg.y + 583);
            this.addChildToContainer(secondfloorTouch);
            secondfloorTouch.addTouchTap(this.rewardClick, this, ["2"]);
            secondfloorTouch.alpha = 0;

            //第三层
            let thirdfloorTouch = BaseBitmap.create("public_alphabg");
            thirdfloorTouch.width = 270;
            thirdfloorTouch.height = 100;
            thirdfloorTouch.setPosition(bg.x + bg.width / 2 - thirdfloorTouch.width / 2, bg.y + 440);
            this.addChildToContainer(thirdfloorTouch);
            thirdfloorTouch.addTouchTap(this.rewardClick, this, ["3"]);
            thirdfloorTouch.alpha = 0;

            //最后一层
            let finalfloorTouch = BaseBitmap.create("public_alphabg");
            finalfloorTouch.width = 175;
            finalfloorTouch.height = 145;
            finalfloorTouch.setPosition(bg.x + bg.width / 2 - finalfloorTouch.width / 2, bg.y + 250);
            this.addChildToContainer(finalfloorTouch);
            finalfloorTouch.addTouchTap(this.rewardClick, this, ["4"]);
            finalfloorTouch.alpha = 0;
        

            //礼物相关
            //第一层
            let lightFirstFloolRewardList = acCfg.getLightFloorRewardList("1");
            for (let i = 0; i < lightFirstFloolRewardList.length; i++) {
                let offestHeight = 0;
                if (i % 2 == 0) {
                    offestHeight = 772 + 36;
                }
                else {
                    offestHeight = 800 + 36;
                }
                let rewardVo = GameData.formatRewardItem(lightFirstFloolRewardList[i].reward)[0];
                let container = this.getChristmasGiftContainer(rewardVo, false, this._firstFloolCfg[i].scale);
                let offestWeight = 24 + (GameConfig.stageWidth - container.width * lightFirstFloolRewardList.length) / 2;
                container.setPosition(bg.x + offestWeight + container.width * i, bg.y + offestHeight);
                if (this.isValentines()) {
                    container.setPosition(bg.x + this._firstFloolCfg[i].x, bg.y + this._firstFloolCfg[i].y + 38)
                }
                this.addChildToContainer(container);
                let firstFloolReward: { id: string, rewardContainer: BaseDisplayObjectContainer } = { id: lightFirstFloolRewardList[i].id, rewardContainer: container };
                this._firstFloolRewardList.push(firstFloolReward);
            }
            let firstFloolBgStr = "public_9_mainicontimebg";
            if (this.isValentines() || this.getUiCode() == "5") {
                firstFloolBgStr = "public_9_bg58";
            }
            else if (this.isMagpieBridge()){
                firstFloolBgStr = "public_9_bg73";
            }
            this._firstFloolBg = BaseBitmap.create(firstFloolBgStr);
            this._firstFloolBg.height = 22;
            this._firstFloolDesc1 = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasRewardPopupViewFloorDesc1"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._firstFloolStarBM = BaseBitmap.create(this.getItemName());
            this._firstFloolStarBM.setScale(this._floolStarScaleValue);
            this._firstFloolDesc2 = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasRewardPopupViewFloorDesc2"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._firstFloolBg.width += this._firstFloolDesc1.width + this._firstFloolStarBM.width * this._floolStarScaleValue + this._firstFloolDesc2.width;
            this._firstFloolBg.setPosition(bg.x + bg.width / 2 - this._firstFloolBg.width / 2, bg.y + 910);
            this.addChildToContainer(this._firstFloolBg);
            this._firstFloolDesc1.setPosition(this._firstFloolBg.x + this._firstFloolBg.width / 2 - (this._firstFloolDesc1.width + this._firstFloolStarBM.width * this._floolStarScaleValue + this._firstFloolDesc2.width) / 2, this._firstFloolBg.y + this._firstFloolBg.height / 2 - this._firstFloolDesc1.height / 2);
            this.addChildToContainer(this._firstFloolDesc1);
            this._firstFloolStarBM.setPosition(this._firstFloolDesc1.x + this._firstFloolDesc1.width, this._firstFloolDesc1.y + this._firstFloolDesc1.height / 2 - this._firstFloolStarBM.height * this._floolStarScaleValue / 2);
            this.addChildToContainer(this._firstFloolStarBM);
            this._firstFloolDesc2.setPosition(this._firstFloolStarBM.x + this._firstFloolStarBM.width * this._floolStarScaleValue, this._firstFloolStarBM.y + this._firstFloolStarBM.height * this._floolStarScaleValue / 2 - this._firstFloolDesc2.height / 2);
            this.addChildToContainer(this._firstFloolDesc2);


            //第二层
            let lightSecondFloolRewardList = acCfg.getLightFloorRewardList("2");
            for (let i = 0; i < lightSecondFloolRewardList.length; i++) {
                let offestHeight = 0;
                if (i == 1 || i == 2) {
                    offestHeight = 634 + 36;
                }
                else {
                    offestHeight = 606 + 36;
                }
                let rewardVo = GameData.formatRewardItem(lightSecondFloolRewardList[i].reward)[0];
                let container = this.getChristmasGiftContainer(rewardVo, false, this._secondFloolCfg[i].scale);
                let offestWeight = 24 + (GameConfig.stageWidth - container.width * lightSecondFloolRewardList.length) / 2;
                container.setPosition(bg.x + offestWeight + container.width * i, bg.y + offestHeight);
                if (this.isValentines()) {
                    container.setPosition(bg.x + this._secondFloolCfg[i].x, bg.y + this._secondFloolCfg[i].y + 38)
                }
                this.addChildToContainer(container);
                let secondFloolReward: { id: string, rewardContainer: BaseDisplayObjectContainer } = { id: lightSecondFloolRewardList[i].id, rewardContainer: container };
                this._secondFloolRewardList.push(secondFloolReward);
            }
            this._secondFloolBg = BaseBitmap.create(firstFloolBgStr);
            this._secondFloolBg.height = 22;
            this._secondFloolDesc1 = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasRewardPopupViewFloorDesc1"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._secondFloolStarBM = BaseBitmap.create(this.getItemName());
            this._secondFloolStarBM.setScale(this._floolStarScaleValue);
            this._secondFloolDesc2 = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasRewardPopupViewFloorDesc2"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._secondFloolBg.width += this._secondFloolDesc1.width + this._secondFloolStarBM.width * this._floolStarScaleValue + this._secondFloolDesc2.width;
            this._secondFloolBg.setPosition(bg.x + bg.width / 2 - this._secondFloolBg.width / 2, bg.y + 740);
            this.addChildToContainer(this._secondFloolBg);
            this._secondFloolDesc1.setPosition(this._secondFloolBg.x + this._secondFloolBg.width / 2 - (this._secondFloolDesc1.width + this._secondFloolStarBM.width * this._floolStarScaleValue + this._secondFloolDesc2.width) / 2, this._secondFloolBg.y + this._secondFloolBg.height / 2 - this._secondFloolDesc1.height / 2);
            this.addChildToContainer(this._secondFloolDesc1);
            this._secondFloolStarBM.setPosition(this._secondFloolDesc1.x + this._secondFloolDesc1.width, this._secondFloolDesc1.y + this._secondFloolDesc1.height / 2 - this._secondFloolStarBM.height * this._floolStarScaleValue / 2);
            this.addChildToContainer(this._secondFloolStarBM);
            this._secondFloolDesc2.setPosition(this._secondFloolStarBM.x + this._secondFloolStarBM.width * this._floolStarScaleValue, this._secondFloolStarBM.y + this._secondFloolStarBM.height * this._floolStarScaleValue / 2 - this._secondFloolDesc2.height / 2);
            this.addChildToContainer(this._secondFloolDesc2);
            //第三层
            let lightThirdFloolRewardList = acCfg.getLightFloorRewardList("3");
            for (let i = 0; i < lightThirdFloolRewardList.length; i++) {
                let offestHeight = 0;
                if (i % 2 == 0) {
                    offestHeight = 470 + 36;
                }
                else {
                    offestHeight = 442 + 36;
                }
                let rewardVo = GameData.formatRewardItem(lightThirdFloolRewardList[i].reward)[0];
                let container = this.getChristmasGiftContainer(rewardVo, false, this._thirdFloolCfg[i].scale);
                let offestWeight = 24 + (GameConfig.stageWidth - container.width * lightThirdFloolRewardList.length) / 2;
                container.setPosition(bg.x + offestWeight + container.width * i, bg.y + offestHeight);
                if (this.isValentines()) {
                    container.setPosition(bg.x + this._thirdFloolCfg[i].x, bg.y + this._thirdFloolCfg[i].y + 38)
                }
                this.addChildToContainer(container);
                let thirdFloolReward: { id: string, rewardContainer: BaseDisplayObjectContainer } = { id: lightThirdFloolRewardList[i].id, rewardContainer: container };
                this._thirdFloolRewardList.push(thirdFloolReward);
            }
            this._thirdFloolBg = BaseBitmap.create(firstFloolBgStr);
            this._thirdFloolBg.height = 22;
            this._thirdFloolDesc1 = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasRewardPopupViewFloorDesc1"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._thirdFloolStarBM = BaseBitmap.create(this.getItemName());
            this._thirdFloolStarBM.setScale(this._floolStarScaleValue);
            this._thirdFloolDesc2 = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasRewardPopupViewFloorDesc2"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._thirdFloolBg.width += this._thirdFloolDesc1.width + this._thirdFloolStarBM.width * this._floolStarScaleValue + this._thirdFloolDesc2.width;
            this._thirdFloolBg.setPosition(bg.x + bg.width / 2 - this._thirdFloolBg.width / 2, bg.y + 575);
            this.addChildToContainer(this._thirdFloolBg);
            this._thirdFloolDesc1.setPosition(this._thirdFloolBg.x + this._thirdFloolBg.width / 2 - (this._thirdFloolDesc1.width + this._thirdFloolStarBM.width * this._floolStarScaleValue + this._thirdFloolDesc2.width) / 2, this._thirdFloolBg.y + this._thirdFloolBg.height / 2 - this._thirdFloolDesc1.height / 2);
            this.addChildToContainer(this._thirdFloolDesc1);
            this._thirdFloolStarBM.setPosition(this._thirdFloolDesc1.x + this._thirdFloolDesc1.width, this._thirdFloolDesc1.y + this._thirdFloolDesc1.height / 2 - this._thirdFloolStarBM.height * this._floolStarScaleValue / 2);
            this.addChildToContainer(this._thirdFloolStarBM);
            this._thirdFloolDesc2.setPosition(this._thirdFloolStarBM.x + this._thirdFloolStarBM.width * this._floolStarScaleValue, this._thirdFloolStarBM.y + this._thirdFloolStarBM.height * this._floolStarScaleValue / 2 - this._thirdFloolDesc2.height / 2);
            this.addChildToContainer(this._thirdFloolDesc2);

            //最后一层
            let lightFinalFloolRewardList = acCfg.getLightFloorRewardList("4");
            for (let i = 0; i < lightFinalFloolRewardList.length; i++) {
                let offestHeight = 306 + 36;
                let rewardVo = GameData.formatRewardItem(lightFinalFloolRewardList[i].reward)[0];
                let container = this.getChristmasGiftContainer(rewardVo, true, this._finalFloolCfg[i].scale);
                let offestWeight = 24 + (GameConfig.stageWidth - container.width * lightFinalFloolRewardList.length) / 2;
                container.setPosition(bg.x + offestWeight + container.width * i, bg.y + offestHeight);
                if (this.isValentines()) {
                    container.setPosition(bg.x + this._finalFloolCfg[i].x, bg.y + this._finalFloolCfg[i].y + 38)
                }
                this.addChildToContainer(container);
                let finalFloolReward: { id: string, rewardContainer: BaseDisplayObjectContainer } = { id: lightFinalFloolRewardList[i].id, rewardContainer: container };
                this._finalloolRewardList.push(finalFloolReward);
            }
            this._finalFloolBg = BaseBitmap.create(firstFloolBgStr);
            this._finalFloolBg.height = 22;
            let finalFloolDescKey = "acChristmasRewardPopupViewFloorDesc3";
            if (this.code != "1" && this.code != "2") {
                finalFloolDescKey = "acChristmasRewardPopupViewFloorDesc3_" + this.code;
            }
            this._finalFloolDesc = ComponentManager.getTextField(LanguageManager.getlocal(finalFloolDescKey), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);

            this._finalFloolBg.width += this._finalFloolDesc.width;
            this._finalFloolBg.setPosition(bg.x + bg.width / 2 - this._finalFloolBg.width / 2, bg.y + 410);
            this.addChildToContainer(this._finalFloolBg);
            this._finalFloolDesc.setPosition(this._finalFloolBg.x + this._finalFloolBg.width / 2 - this._finalFloolDesc.width / 2, this._finalFloolBg.y + this._finalFloolBg.height / 2 - this._finalFloolDesc.height / 2);
            this.addChildToContainer(this._finalFloolDesc);
        }

        if (this.isValentines() || this.getUiCode() || this.isMagpieBridge()) {
            this.titleBg.setVisible(false);
            let code = this.code;
            if (this.isMagpieBridge()){
                code = this.isMagpieBridge();
            }
            let titleNewBg = BaseLoadBitmap.create("acchristmasview_titlebg_" + code);
            titleNewBg.setPosition(0, -104);
            this.addChildToContainer(titleNewBg);
        }


        //上部相关
        if (this.getTypeCode() != "8"){
            let topBgStr = "acchristmasview_topbg";
            if (this.isValentines()) {
                topBgStr = "acchristmasview_topbg_" + this.isValentines();
            }
            else if (this.isMagpieBridge()){
                topBgStr = "acchristmasview_topbg_" + this.isMagpieBridge();
            }
            else if (this.getUiCode()) {
                topBgStr = "acchristmasview_topbg_" + this.getUiCode();
            }
            let topBg = BaseLoadBitmap.create(topBgStr);
            topBg.width = 640;
            topBg.height = 38;
            topBg.setPosition(0, -15);
            this.addChildToContainer(topBg);

            let topDescKey = "acChristmasViewTopDesc";
            if (this.code != "1" && this.code != "2") {
                topDescKey = "acChristmasViewTopDesc_" + this.code;
            }
            let topDesc = ComponentManager.getTextField(LanguageManager.getlocal(topDescKey), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            topDesc.setPosition(topBg.x + topBg.width / 2 - topDesc.width / 2, topBg.y + topBg.height / 2 - topDesc.height / 2);
            this.addChildToContainer(topDesc);
            //任务按钮
            let taskBtnStr = "acchristmasview_taskbtn";
            if (this.isValentines()) {
                taskBtnStr = "acchristmasview_taskbtn_" + this.isValentines();
            }
            else if (this.isMagpieBridge()){
                taskBtnStr = "acchristmasview_taskbtn_" + this.isMagpieBridge();
            }
            else if (this.getUiCode()) {
                taskBtnStr = "acchristmasview_taskbtn_" + this.getUiCode();
            }
            this._taskBtn = ComponentManager.getButton(taskBtnStr, null, this.taskBtnClick, this);
            this._taskBtn.setPosition(topBg.x + 5, topBg.y + topBg.height + 5);
            this.addChildToContainer(this._taskBtn);
            if (this.code == "1" || this.code == "2"  || this.isValentines() || this.getUiCode() || this.isMagpieBridge()) {
                let rewardBtnStr = "acchristmasview_infobtn";
                if (this.isValentines() || this.getUiCode() || this.code == "2") {
                    rewardBtnStr = "acchristmasview_infobtn_" + this.code;
                }
                else if (this.isMagpieBridge()){
                    rewardBtnStr = "acchristmasview_infobtn_" + this.isMagpieBridge();
                }
                let rewardBtn = ComponentManager.getButton(rewardBtnStr, null, () => {
                    if (this.code == "1") { //门客皮肤
                        ViewController.getInstance().openView(ViewConst.POPUP.ACCHRISTMASBIGREWARDPOOLPOPUPVIEW, { aid: this.aid, code: this.code });
                    }
                    else if (this.code == "3") { //头像框
                        ViewController.getInstance().openView(ViewConst.POPUP.ACCHRISTMASTITLEREWARDPOPUPVIEW, { aid: this.aid, code: this.code });
                    }
                    else if (this.code == "4" || this.code == "2") { //红颜皮肤
                        ViewController.getInstance().openView(ViewConst.POPUP.ACCHRISTMASWIFESKINREWARDPOPUPVIEW, { aid: this.aid, code: this.code });
                    }
                    else if (this.code == "5") { //门客
                        ViewController.getInstance().openView(ViewConst.POPUP.ACCHRISTMASSERVANTREWARDPOPUPVIEW, { aid: this.aid, code: this.code });
                    }
                    else if (this.code == "6" || this.code == "7"){ //牛郎织女
                        // ViewController.getInstance().openView(ViewConst.POPUP.ACCHRISTMASMAGPIESBRIDGEREWARDPOPUPVIEW, {aid: this.aid, code: this.code});
                        let topMsg = LanguageManager.getlocal("acChristmasWifeSkinTopMsg_"+this.code);
                        ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONTITLEREWARDPOPUPVIEW, {titleIds:[acCfg.skin, acCfg.skin], bgType:1, topMsg:topMsg});
                    }

                }, this);
                rewardBtn.setPosition(this._taskBtn.x + this._taskBtn.width / 2 - rewardBtn.width / 2, this._taskBtn.y + this._taskBtn.height + 5);
                this.addChildToContainer(rewardBtn);
            }


            let resbg = BaseBitmap.create("public_9_resbg");
            resbg.setPosition(topBg.x + topBg.width - resbg.width - 5, this._taskBtn.y);
            this.addChildToContainer(resbg);

            let starBM = BaseBitmap.create(this.getItemName());
            starBM.setPosition(resbg.x + 1, resbg.y + 1);
            this.addChildToContainer(starBM);
            if (this.isMagpieBridge()){
                starBM.setScale(0.8);
            }

            this._starTxt = ComponentManager.getTextField(String(vo.getItemValue()), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            this._starTxt.setPosition(starBM.x + starBM.width + 6, resbg.y + resbg.height / 2 - this._starTxt.height / 2);
            this.addChildToContainer(this._starTxt);

            let buttomBgStr = "acchristmasview_buttombg";
            if (this.code != "1" && this.code != "2") {
                buttomBgStr = "acchristmasview_buttombg_" + this.code;
            }
            let buttomBg = BaseLoadBitmap.create(buttomBgStr);
            buttomBg.width = 640;
            buttomBg.height = 96;
            buttomBg.setPosition(bg.x, bg.y + bg.height - buttomBg.height);
            this.addChildToContainer(buttomBg);

            //抽一次相关
            let starScaleValue = 0.65;
            this._oneBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, null, this.oneBtnClick, this);
            this._oneBtn.setPosition(buttomBg.x + 75, buttomBg.y + 10);
            this.addChildToContainer(this._oneBtn);
            this._oneBtn.setText(String(vo.getFloorCost()), false);
            this._oneBtn.addTextIcon(this.getItemName());

            // let oneUseTxt = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasViewUse"), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BLACK);
            // oneUseTxt.setPosition(this._oneBtn.x + this._oneBtn.width / 2 - oneUseTxt.width, this._oneBtn.y + this._oneBtn.height / 2 - oneUseTxt.height / 2);
            // this.addChildToContainer(oneUseTxt);

            // let oneStarBM = BaseBitmap.create("acchristmasview_star");
            // oneStarBM.setScale(starScaleValue);
            // oneStarBM.setPosition(oneUseTxt.x + oneUseTxt.width, this._oneBtn.y + this._oneBtn.height / 2 - oneStarBM.height * starScaleValue / 2)
            // this.addChildToContainer(oneStarBM);

            // let oneUseNumTxt = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasViewUseNum", ["1"]), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BLACK);
            // oneUseNumTxt.setPosition(oneStarBM.x + oneStarBM.width * starScaleValue, this._oneBtn.y + this._oneBtn.height / 2 - oneUseNumTxt.height / 2);
            // this.addChildToContainer(oneUseNumTxt);
            let oneDescTxtStr = LanguageManager.getlocal("acChristmasViewUseNumDesc", ["1"]);
            if (this.isValentines()||this.getUiCode() || this.isMagpieBridge()) {
                oneDescTxtStr = LanguageManager.getlocal("acChristmasViewUseNumDesc_" + this.code, ["1"]);
            }
            let oneDescTxt = ComponentManager.getTextField(oneDescTxtStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            oneDescTxt.setPosition(this._oneBtn.x + this._oneBtn.width / 2 - oneDescTxt.width / 2, this._oneBtn.y + this._oneBtn.height + 3);
            this.addChildToContainer(oneDescTxt);

            this._successBg = BaseBitmap.create("public_9_mainicontimebg");
            this._successBg.width = 235;
            let successTxtStr = LanguageManager.getlocal("acChristmasViewSuccessTip");
            if (this.isValentines()||this.getUiCode() || this.isMagpieBridge()) {
                successTxtStr = LanguageManager.getlocal("acChristmasViewSuccessTip_" + this.code);
            }
            this._successTxt = ComponentManager.getTextField(successTxtStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._successTxt.width = 200;
            this._successBg.height += this._successTxt.height + 20;

            this._successBg.setPosition(bg.x + bg.width / 2 - this._successBg.width / 2, bg.y + 600);
            this._successTxt.setPosition(this._successBg.x + this._successBg.width / 2 - this._successTxt.width / 2, this._successBg.y + this._successBg.height / 2 - this._successTxt.height / 2);
            this.addChildToContainer(this._successBg);
            this.addChildToContainer(this._successTxt);



            //抽多次相关
            this._tenBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, null, this.tenBtnClick, this);
            this._tenBtn.setPosition(buttomBg.x + buttomBg.width - this._tenBtn.width - 75, buttomBg.y + 10);
            this.addChildToContainer(this._tenBtn);
            this._tenBtn.setText(String(vo.getFloorCost() * 10), false);
            this._tenBtn.addTextIcon(this.getItemName())

            // let tenUseTxt = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasViewUse"), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BLACK);
            // tenUseTxt.setPosition(this._tenBtn.x + this._tenBtn.width / 2 - tenUseTxt.width, this._tenBtn.y + this._tenBtn.height / 2 - tenUseTxt.height / 2);
            // this.addChildToContainer(tenUseTxt);

            // let tenStarBM = BaseBitmap.create("acchristmasview_star");
            // tenStarBM.setScale(starScaleValue);
            // tenStarBM.setPosition(tenUseTxt.x + tenUseTxt.width, this._tenBtn.y + this._tenBtn.height / 2 - tenStarBM.height * starScaleValue / 2)
            // this.addChildToContainer(tenStarBM);

            // this._tenUseNumTxt = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasViewUseNum", ["10"]), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BLACK);
            // this._tenUseNumTxt.setPosition(tenStarBM.x + tenStarBM.width * starScaleValue, this._tenBtn.y + this._tenBtn.height / 2 - this._tenUseNumTxt.height / 2);
            // this.addChildToContainer(this._tenUseNumTxt);
            let tenDescTxtStr = LanguageManager.getlocal("acChristmasViewUseNumDesc", ["1"]);
            if (this.isValentines()||this.getUiCode() || this.isMagpieBridge()) {
                tenDescTxtStr = LanguageManager.getlocal("acChristmasViewUseNumDesc_" + this.code, ["1"]);
            }
            this._tenDescTxt = ComponentManager.getTextField(tenDescTxtStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._tenDescTxt.setPosition(this._tenBtn.x + this._tenBtn.width / 2 - this._tenDescTxt.width / 2, this._tenBtn.y + this._tenBtn.height + 3);
            this.addChildToContainer(this._tenDescTxt);

            // 说明相关
            let descBgStr = "acchristmasview_descbg";
            if (this.isValentines()) {
                descBgStr = "acchristmasview_descbg_" + this.isValentines();
            }
            else if (this.getUiCode()) {
                descBgStr = "acchristmasview_descbg_" + this.getUiCode();
            }
            else if (this.isMagpieBridge()) {
                descBgStr = "acchristmasview_descbg_" + this.isMagpieBridge();
            }
            let descBg = BaseLoadBitmap.create(descBgStr)
            descBg.width = 640;
            descBg.height = 159;
            descBg.setPosition(buttomBg.x, buttomBg.y - descBg.height);
            this.addChildToContainer(descBg);

            //倒计时背景
            let timeBg = BaseBitmap.create("public_9_bg61");
            timeBg.x = descBg.x + descBg.width / 2 - timeBg.width / 2;
            timeBg.y =descBg.y+62;
            this._timeBg = timeBg;
            this.addChildToContainer(timeBg);

            //倒计时
            this._timeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasViewDescTime", [vo.acCountDown]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._timeTxt.setPosition(timeBg.x+5, timeBg.y + 4);
            this.addChildToContainer(this._timeTxt);
            timeBg.width = this._timeTxt.width+50;
            //活动说明
            let descTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasViewDesc1", [String(acCfg.ratio)]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
            descTxt1.lineSpacing = 3;
            descTxt1.setPosition(descBg.x + 10, this._timeTxt.y + this._timeTxt.height + 9);
            this.addChildToContainer(descTxt1);

            let descstar = BaseBitmap.create(this.getItemName());
            descstar.setScale(this._floolStarScaleValue);
            descstar.setPosition(descTxt1.x + descTxt1.width, descTxt1.y + descTxt1.height / 2 - descstar.height * this._floolStarScaleValue / 2);
            if (this.isValentines()) {
                let descstarScale = 0.6;
                descstar.setScale(descstarScale);
                descstar.setPosition(descTxt1.x + descTxt1.width, descTxt1.y + descTxt1.height / 2 - descstar.height * descstarScale / 2);
            }
            this.addChildToContainer(descstar);

            let descTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasViewDesc2_" + this.code), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
            descTxt2.width = 620;
            descTxt2.lineSpacing = 3;
            descTxt2.setPosition(descTxt1.x, descTxt1.y + descTxt1.height + 3);
            this.addChildToContainer(descTxt2);

            //descBg 自适应 设置位置
            // let offestHeigth = 60;
            // if (descTxt.height > offestHeigth) {
            //     descBg.height += (descTxt.height - offestHeigth)
            // }
            // descBg.setPosition(buttomBg.x, buttomBg.y - descBg.height);
            // this._timeTxt.setPosition(descBg.x + 10, descBg.y + 70);
            // descTxt.setPosition(this._timeTxt.x, this._timeTxt.y + this._timeTxt.height + 3);
            // this.addChildToContainer(this.starEffect());  
        }

        if (this.getTypeCode() == "8"){
            this.showChristmasNewView();
        }
        this.refreashView();
        this.tick();
    }

    //code 8
    private showChristmasNewView():void{
        let vo = <AcChristmasVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        let infoBgStr = ResourceManager.hasRes("acchristmas-"+this.getTypeCode()+"_infobg") ? "acchristmas-"+this.getTypeCode()+"_infobg" : "acchristmas-8_infobg";
        let infoBg = BaseBitmap.create(infoBgStr);
        infoBg.setPosition(GameConfig.stageWidth/2 - infoBg.width/2, this.titleBg.y + this.titleBg.height - 1);
        this.addChildToContainer(infoBg);

        let lineStr = ResourceManager.hasRes("acchristmas-"+this.getTypeCode()+"_line") ? "acchristmas-"+this.getTypeCode()+"_line" : "acchristmas-_line";
        let line = BaseBitmap.create(lineStr);
        line.setPosition(infoBg.x + infoBg.width/2 - line.width/2, infoBg.y + 1);
        this.addChildToContainer(line);

        //活动时间
        let acDate = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasAcTime", [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDate.setPosition(infoBg.x + 10, infoBg.y + 20);
        this.addChildToContainer(acDate);
         
        //活动说明
        let acDesc = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasViewDesc_"+this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDesc.setPosition(acDate.x , acDate.y + acDate.height + 3);
        acDesc.width = 620;
        acDesc.lineSpacing = 3;
        this.addChildToContainer(acDesc);
        infoBg.height = acDate.height + acDesc.height + 50;
        
        //倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
		this._timeBg.y = infoBg.y + infoBg.height - this._timeBg.height / 2 - 2;
		this.addChildToContainer(this._timeBg);
		this._timeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acTravelWithBeautyTimeCountDown", [vo.acCountDown]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._timeBg.width = 60 + this._timeTxt.width;
		this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
		this._timeTxt.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTxt.height / 2);
        this.addChildToContainer(this._timeTxt);

        //道具数量
        let numBg = BaseBitmap.create("actravelwithbeauty_numbg");
        numBg.setPosition(GameConfig.stageWidth - numBg.width - 15, infoBg.y + infoBg.height + 25);
        this.addChildToContainer(numBg);
        let numIcon = BaseBitmap.create(this.getItemName());
        numIcon.setPosition(numBg.x + 25, numBg.y + numBg.height/2 - numIcon.height/2);
        this.addChildToContainer(numIcon);
        this._starTxt = ComponentManager.getTextField(String(vo.getItemValue()), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this._starTxt.anchorOffsetX = this._starTxt.width/2;
        this._starTxt.setPosition(numBg.x + numBg.width/2 + 6, numBg.y + numBg.height / 2 - this._starTxt.height / 2 + 3);
        this.addChildToContainer(this._starTxt);

        let bottomBgStr = ResourceManager.hasRes("acchristmas-"+this.getTypeCode()+"_bottombg") ? "acchristmas-"+this.getTypeCode()+"_bottombg" : "acchristmas-8_bottombg";
        let bottomBg = BaseBitmap.create(bottomBgStr);
        bottomBg.setPosition(GameConfig.stageWidth/2 - bottomBg.width/2, GameConfig.stageHeigth - bottomBg.height);
        
        //圣诞树
        let treeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(treeContainer);
        this._treeContainer = treeContainer;

        let treeStr = ResourceManager.hasRes("acchristmas-"+this.getTypeCode()+"_tree") ? "acchristmas-"+this.getTypeCode()+"_tree" : "acchristmas-8_tree";
        let tree = BaseBitmap.create(treeStr);
        treeContainer.addChild(tree);
        treeContainer.width = tree.width;
        treeContainer.height = tree.height;
        treeContainer.setPosition(bottomBg.width - treeContainer.width + 10, bottomBg.y  + 140 - treeContainer.height);

        //role
        //佳人衣装
        let acCfg = <Config.AcCfg.ChristmasCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        let skinCfg = Config.WifeskinCfg.getWifeCfgById(acCfg.skin);
        let boneName = skinCfg.bone + "_ske";
        let wife = null;
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            wife = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            wife.setScale(0.8);  //0.53
            wife.anchorOffsetY = wife.height;
            wife.anchorOffsetX = wife.width / 2;
            wife.x = bottomBg.x + bottomBg.width / 4 - 20;
            wife.y = bottomBg.y + 65;
        }
        else {
            wife = BaseLoadBitmap.create(skinCfg.body);
            wife.width = 640;
            wife.height = 840;
            wife.setScale(0.6);
            wife.anchorOffsetY = wife.height;
            wife.anchorOffsetX = wife.width / 2;
            wife.x = bottomBg.x + bottomBg.width / 4;
            wife.y = bottomBg.y + 65;
        }
        this.addChildToContainer(wife);

        //衣装预览
		let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		skinTxtEffect.width = 208;
		skinTxtEffect.height = 154;
		skinTxtEffect.setPosition(bottomBg.x + bottomBg.width/4 - skinTxtEffect.width/2 - 20, bottomBg.y - 70);
		skinTxtEffect.blendMode = egret.BlendMode.ADD;
		this.addChildToContainer(skinTxtEffect);
		skinTxtEffect.playWithTime(-1);

		let skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
		skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
		this.addChildToContainer(skinTxt);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

		let skinTxteffect = BaseBitmap.create("acwealthcarpview_servantskintxt");
		skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
		skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxteffect, skinTxtEffect);
		this.addChildToContainer(skinTxteffect);
		skinTxteffect.blendMode = egret.BlendMode.ADD;
		skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        let wifeSkinTopMsg = LanguageManager.getlocal("acChristmasWifeSkinTopMsg_"+this.getTypeCode());
		skinTxteffect.addTouchTap(() => {
            if (acCfg.skin){
                let wifeSkinId = Config.WifeskinCfg.formatRewardItemVoStr(acCfg.skin);
                let title = "acChristmasPreviewSkinTitle-"+this.getTypeCode();
                let data = {data:[
                    {idType: wifeSkinId, topMsg:wifeSkinTopMsg, bgName:"", scale: 0.6, title:title},
                ]};
                ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
            }
        }, this);

        //活动任务按钮
        let taskBtnStr = ResourceManager.hasRes("acchristmasview_taskbtn_"+this.getTypeCode()) ? "acchristmasview_taskbtn_"+this.getTypeCode() : "acchristmasview_taskbtn_8";
        this._taskBtn = ComponentManager.getButton(taskBtnStr, null, this.taskBtnClick, this);
        this._taskBtn.setPosition(infoBg.x + 10, infoBg.y + infoBg.height + 5);
        this.addChildToContainer(this._taskBtn);

        this.addChildToContainer(bottomBg);
        //底部按钮
        //一次
        let onceBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "acChristmasDressBtnOnceName-"+this.getTypeCode(), this.oneBtnClick, this);
        onceBtn.setPosition(bottomBg.x + 60, bottomBg.y + 110);
        this.addChildToContainer(onceBtn);
        this._oneBtn = onceBtn;
        let onceNeedDesc = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasDressNeedInfo-"+this.getTypeCode(), [String(vo.getFloorCost())]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChildToContainer(onceNeedDesc);
        this._onceDesc = onceNeedDesc;
        let onceNeedIcon = BaseBitmap.create(this.getItemName());
        onceNeedIcon.setScale(1);
        this.addChildToContainer(onceNeedIcon);
        this._onceIcon = onceNeedIcon;
        onceNeedDesc.setPosition(onceBtn.x + onceBtn.width/2 - (onceNeedDesc.width + onceNeedIcon.width)/2 + 3, onceBtn.y - onceNeedDesc.height - 10);
        onceNeedIcon.setPosition(onceNeedDesc.x + onceNeedDesc.width, onceNeedDesc.y + onceNeedDesc.height/2 - onceNeedIcon.height/2);
        
        //十次
        let tenBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "acChristmasDressBtnTenName-"+this.getTypeCode(), this.tenBtnClick, this);
        tenBtn.setPosition(bottomBg.x + bottomBg.width - tenBtn.width - 60, bottomBg.y + 110);
        this.addChildToContainer(tenBtn);
        this._tenBtn = tenBtn;
        let tenNeedDesc = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasDressNeedInfo-"+this.getTypeCode(), [String(vo.getFloorCost() * vo.getlotteryValue())]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChildToContainer(tenNeedDesc);
        this._tenDesc = tenNeedDesc;
        let tenNeedIcon = BaseBitmap.create(this.getItemName());
        tenNeedIcon.setScale(1);
        this.addChildToContainer(tenNeedIcon);
        this._tenIcon = tenNeedIcon;
        tenNeedDesc.setPosition(tenBtn.x + tenBtn.width/2 - (tenNeedDesc.width + tenNeedIcon.width)/2 + 3, tenBtn.y - tenNeedDesc.height - 10);
        tenNeedIcon.setPosition(tenNeedDesc.x + tenNeedDesc.width, tenNeedDesc.y + tenNeedDesc.height/2 - tenNeedIcon.height/2);

        this.initTreeNewView();

        let startStr = LanguageManager.getlocal("acChristmasTip-"+this.getTypeCode()+"_start");
        if (vo.getFloor() >= 4){
            startStr = LanguageManager.getlocal("acChristmasTip-"+this.getTypeCode()+"_end");
        }
        let bubbleTip = this.createBubbleTip(startStr, false);
        bubbleTip.setPosition(bottomBg.x + 100, bottomBg.y - 500);
        this.addChildToContainer(bubbleTip);
        this._bubbleTip = bubbleTip;
        egret.Tween.get(bubbleTip, {loop: true}).wait(5000).to({alpha: 0}, 500).call(()=>{
            this.freshBubbleTip(bubbleTip);
        }).wait(5000).to({alpha: 1}, 800);
    }

    private initTreeNewView():void{
        //第一层
        let firstfloorTouch = BaseBitmap.create("public_alphabg");
        firstfloorTouch.width = 350;
        firstfloorTouch.height = 100;
        firstfloorTouch.setPosition(68, 425);
        this._treeContainer.addChild(firstfloorTouch);
        firstfloorTouch.addTouchTap(this.rewardNewClick, this, ["1"]);
        // firstfloorTouch.alpha = 0;

        //第二层
        let secondfloorTouch = BaseBitmap.create("public_alphabg");
        secondfloorTouch.width = 271;
        secondfloorTouch.height = 96;
        secondfloorTouch.setPosition(111, 287);
        this._treeContainer.addChild(secondfloorTouch);
        secondfloorTouch.addTouchTap(this.rewardNewClick, this, ["2"]);
        // secondfloorTouch.alpha = 0;

        //第三层
        let thirdfloorTouch = BaseBitmap.create("public_alphabg");
        thirdfloorTouch.width = 200;
        thirdfloorTouch.height = 93;
        thirdfloorTouch.setPosition(146, 155);
        this._treeContainer.addChild(thirdfloorTouch);
        thirdfloorTouch.addTouchTap(this.rewardNewClick, this, ["3"]);
        // thirdfloorTouch.alpha = 0;

        //最后一层
        let finalfloorTouch = BaseBitmap.create("public_alphabg");
        finalfloorTouch.width = 147;
        finalfloorTouch.height = 95;
        finalfloorTouch.setPosition(157, 5);
        this._treeContainer.addChild(finalfloorTouch);
        finalfloorTouch.addTouchTap(this.rewardNewClick, this, ["4"]);
        // finalfloorTouch.alpha = 0;

        let firstDataLength = this._firstFloolCfg.length;
        for (let i = 0; i < firstDataLength; i++) {
            let data = this._firstFloolCfg[firstDataLength - 1 - i];
            let container = this.getChristmasNewGiftContainer(1, firstDataLength - i, data.isEffect);
            container.setPosition(data.x, data.y);
            this._treeContainer.addChild(container);
            let firstFloolReward: { id: string, rewardContainer: BaseDisplayObjectContainer, percent:number } = { id: ""+(firstDataLength - i), rewardContainer: container, percent: data.percent };
            this._firstFloolRewardList.push(firstFloolReward);
        }

        let secondDataLength = this._secondFloolCfg.length;
        for (let i = 0; i < secondDataLength; i++) {
            let data = this._secondFloolCfg[i];
            let container = this.getChristmasNewGiftContainer(2, i+1, data.isEffect);
            container.setPosition(data.x, data.y);
            this._treeContainer.addChild(container);
            let firstFloolReward: { id: string, rewardContainer: BaseDisplayObjectContainer, percent:number } = { id: ""+(1 + i), rewardContainer: container, percent:data.percent };
            this._secondFloolRewardList.push(firstFloolReward);
        }

        let thridDataLength = this._thirdFloolCfg.length;
        for (let i = 0; i < thridDataLength; i++) {
            let data = this._thirdFloolCfg[thridDataLength - 1 - i];
            let container = this.getChristmasNewGiftContainer(3, thridDataLength - i, data.isEffect);
            container.setPosition(data.x, data.y);
            this._treeContainer.addChild(container);
            let firstFloolReward: { id: string, rewardContainer: BaseDisplayObjectContainer, percent:number } = { id: ""+(thridDataLength - i), rewardContainer: container, percent:data.percent };
            this._thirdFloolRewardList.push(firstFloolReward);
        }

        let finalDataLength = this._finalFloolCfg.length;
        for (let i = 0; i < finalDataLength; i++) {
            let data = this._finalFloolCfg[i];
            let container = this.getChristmasNewGiftContainer(4, 1 + i, data.isEffect);
            container.setPosition(data.x, data.y);
            this._treeContainer.addChild(container);
            let firstFloolReward: { id: string, rewardContainer: BaseDisplayObjectContainer, percent:number } = { id: ""+(1 + i), rewardContainer: container, percent:1 };
            this._finalloolRewardList.push(firstFloolReward);
        }

        //数量 进度
        for (let i = 0; i < 3; i++){
            let numBgStr = ResourceManager.hasRes("acchristmas-"+this.getTypeCode()+"_numbg") ? "acchristmas-"+this.getTypeCode()+"_numbg" : "acchristmas-8_numbg";
            let numBg = BaseBitmap.create(numBgStr);
            this._treeContainer.addChild(numBg);
            let processNum = ComponentManager.getTextField("0/0", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            this._treeContainer.addChild(processNum);
            numBg.setPosition(this._treeContainer.width - numBg.width - 15, this._processNumPos[i].y);
            processNum.setPosition(numBg.x + numBg.width/2 - processNum.width/2, numBg.y + numBg.height/2 - processNum.width/2);
            let data = {numBg:numBg, numTf:processNum};
            this._floorNumList[i] = data;
        }
    }

    private getChristmasNewGiftContainer(floor:number, index:number, effectType:number):BaseDisplayObjectContainer{
        let container = new BaseDisplayObjectContainer();
        let ropeStr = ResourceManager.hasRes("acchristmas-"+this.getTypeCode()+"_rope") ? "acchristmas-"+this.getTypeCode()+"_rope" : "acchristmas-8_rope";
        let rope = BaseBitmap.create(ropeStr);
        container.addChild(rope);
        rope.name = "giftpole";
        let giftStr = ResourceManager.hasRes("acchristmas-"+this.getTypeCode()+"_gift"+floor+"_"+index) ? "acchristmas-"+this.getTypeCode()+"_gift"+floor+"_"+index : "acchristmas-8_gift2_1";
        let gift = BaseBitmap.create(giftStr);
        if (effectType == 2){
            let boxLight = BaseBitmap.create("acturantable_taskbox_light");
            boxLight.anchorOffsetX = boxLight.width / 2;
            boxLight.anchorOffsetY = boxLight.height / 2;
            boxLight.setScale(2);
            boxLight.setPosition(gift.x + gift.width / 2, gift.y + gift.height / 2);
            container.addChild(boxLight);
            egret.Tween.get(boxLight, { loop: true }).to({ rotation: boxLight.rotation + 360 }, 10000);
            boxLight.name = "giftEffect";
        }
        container.addChild(gift);
        gift.name = "gift";
        container.width = gift.width;
        container.anchorOffsetX = container.width/2;
        rope.setPosition(container.width/2 - rope.width/2, 0);
        if (floor == 4){
            rope.visible = false;
            gift.setPosition(0, rope.y - 10);
        }
        else{
            gift.setPosition(0, rope.y + rope.height - 13);
        }
        
        if (effectType == 1){
            let effectStr = ResourceManager.hasRes("acchristmas_"+this.getTypeCode()+"_stareffect") ? "acchristmas_"+this.getTypeCode()+"_stareffect" : "acchristmas_8_stareffect";
            let giftEffect = ComponentManager.getCustomMovieClip(effectStr, 9, 70);
            giftEffect.blendMode = egret.BlendMode.ADD;
            giftEffect.setPosition(gift.x - 3, gift.y - 1);
            container.addChild(giftEffect);
            giftEffect.playWithTime(0);
            giftEffect.name = "giftEffect";
        }

        if (floor < 4){
            let rotation = App.MathUtil.getRandom(4, 9);
            // let rotation = 10 * randomNumber;
            container.rotation = 0;
            let rotationTime = 150 * rotation;
            egret.Tween.get(container, { loop: true }).to({ rotation: Math.abs(rotation) }, rotationTime).to({ rotation: 0 }, rotationTime).to({ rotation: -Math.abs(rotation) }, rotationTime).to({ rotation: 0 }, rotationTime);
        }

        // let star = this.starEffect();
        // star.anchorOffsetX = star.width / 2;
        // star.anchorOffsetY = star.height / 2;
        // let starScale = 0.7 + Math.random() * 0.31;
        // star.setScale(starScale);
        // star.rotation = 360 * Math.random();
        // star.setPosition(rope.x + rope.width / 2, rope.y + rope.height);
        // container.addChild(star);
        // star.name = "star";
        // star.visible = false;
    
        return container;
    }

    /**抽奖 */
    private christmasLotteryHandel(event: egret.Event) {
        if (event && event.data && event.data.ret) {
            let rewards = event.data.data.data.rewards;
            let vo = <AcChristmasVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
            this._isPlay = false;
            let lastItemId = event.data.data.data.lastnum;
            let replacerewards = event.data.data.data.replacerewards;
            if (this._isTen) {
                let newRewards = vo.formatLastRewards(rewards);
                if (newRewards){
                    rewards = newRewards;
                }
                if (replacerewards) {
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, {
                        "replacerewards": replacerewards, "message": "changeOtherRewardTip", callback: () => {
                            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { rewards: rewards, isPlayAni: true });
                        }, handler: this
                    })
                }
                else {
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { rewards: rewards, isPlayAni: true });
                }
                // if (replacerewards) {
                //     if (this.code == "2") {
                //         let oldReward = "";
                //         let newReward = "";
                //         for (let key in replacerewards[0]) {
                //             if (key && replacerewards[0][key]) {
                //                 oldReward = String(key);
                //                 newReward = replacerewards[0][key];
                //             }

                //         }
                //         let rewardName = Config.WifeskinCfg.getWifeCfgById(GameData.formatRewardItem(oldReward)[0].id).name;
                //         ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, {
                //             "name": rewardName, "touch": newReward, "message": "changeOtherRewardTip", callback: () => {
                //                 ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { rewards: rewards, isPlayAni: true });
                //             }, handler: this
                //         })
                //     }
                // }
                // else {
                //     ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { rewards: rewards, isPlayAni: true });
                // }

            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.ACCHRISTMASREWARDPOOLPOPUPVIEW, { aid: this.aid, code: this.code, floorRewardList: this._nowFloorRewardList, lastItemId: lastItemId, rewards: rewards, replacerewards: replacerewards });
            }

            // let rewardVo = GameData.formatRewardItem(rewards);
            // App.CommonUtil.playRewardFlyAction(rewardVo);
        }
        else{
            this._isPlay = false;
        }
    }
    private refreashView() {
        let vo = <AcChristmasVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        let acCfg = <Config.AcCfg.ChristmasCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (this.getTypeCode() != "8"){
            for (let key in this._firstFloolRewardList) {
                let rewardDB = <BaseDisplayObjectContainer>this._firstFloolRewardList[key].rewardContainer.getChildByName("reward");
                let giftpole = <BaseBitmap>this._firstFloolRewardList[key].rewardContainer.getChildByName("giftpole");
                let star = <BaseBitmap>this._firstFloolRewardList[key].rewardContainer.getChildByName("star");
                if (vo.getFloorReward(this._firstFloolRewardList[key].id, 1)) {
                    rewardDB.setVisible(false);
                    giftpole.setVisible(false);
                    star.setVisible(true);
                }
                else {
                    rewardDB.setVisible(true);
                    giftpole.setVisible(true);
                    star.setVisible(false);
                }
            }
            for (let key in this._secondFloolRewardList) {
                let rewardDB = <BaseDisplayObjectContainer>this._secondFloolRewardList[key].rewardContainer.getChildByName("reward");
                let giftpole = <BaseBitmap>this._secondFloolRewardList[key].rewardContainer.getChildByName("giftpole");
                let star = <BaseBitmap>this._secondFloolRewardList[key].rewardContainer.getChildByName("star");
                if (vo.getFloorReward(this._secondFloolRewardList[key].id, 2)) {
                    rewardDB.setVisible(false);
                    giftpole.setVisible(false);
                    star.setVisible(true);
                }
                else {
                    rewardDB.setVisible(true);
                    giftpole.setVisible(true);
                    star.setVisible(false);
                }
            }
            for (let key in this._thirdFloolRewardList) {
                let rewardDB = <BaseDisplayObjectContainer>this._thirdFloolRewardList[key].rewardContainer.getChildByName("reward");
                let giftpole = <BaseBitmap>this._thirdFloolRewardList[key].rewardContainer.getChildByName("giftpole");
                let star = <BaseBitmap>this._thirdFloolRewardList[key].rewardContainer.getChildByName("star");
                if (vo.getFloorReward(this._thirdFloolRewardList[key].id, 3)) {
                    rewardDB.setVisible(false);
                    giftpole.setVisible(false);
                    star.setVisible(true);
                }
                else {
                    rewardDB.setVisible(true);
                    giftpole.setVisible(true);
                    star.setVisible(false);
                }
            }
            for (let key in this._finalloolRewardList) {
                let rewardDB = <BaseDisplayObjectContainer>this._finalloolRewardList[key].rewardContainer.getChildByName("reward");
                let giftpole = <BaseBitmap>this._finalloolRewardList[key].rewardContainer.getChildByName("giftpole");
                let star = <BaseBitmap>this._finalloolRewardList[key].rewardContainer.getChildByName("star");
                let light = <BaseBitmap>this._finalloolRewardList[key].rewardContainer.getChildByName("ligth");
                if (vo.getFloor() >= 4) {
                    rewardDB.setVisible(false);
                    giftpole.setVisible(false);
                    if (light) {
                        light.setVisible(false);
                    }

                    star.setVisible(true);
                }
                else {
                    rewardDB.setVisible(true);
                    giftpole.setVisible(true);
                    if (light) {
                        light.setVisible(true);
                    }
                    star.setVisible(false);
                }
            }
            this._starTxt.text = String(vo.getItemValue());

            this._oneBtn.removeTextIcon();
            this._oneBtn.setText(String(vo.getFloorCost()), false);
            this._oneBtn.addTextIcon(this.getItemName());
            this._tenBtn.removeTextIcon();
            this._tenBtn.setText(String(vo.getFloorCost() * vo.getlotteryValue()), false);
            this._tenBtn.addTextIcon(this.getItemName())
            let tenDescTxtStr = LanguageManager.getlocal("acChristmasViewUseNumDesc", [String(vo.getlotteryValue())]);
            if (this.isValentines()|| this.getUiCode() || this.isMagpieBridge()) {
                tenDescTxtStr = LanguageManager.getlocal("acChristmasViewUseNumDesc_" + this.code, [String(vo.getlotteryValue())]);
            }
            this._tenDescTxt.text = tenDescTxtStr;
            this._tenDescTxt.setPosition(this._tenBtn.x + this._tenBtn.width / 2 - this._tenDescTxt.width / 2, this._tenBtn.y + this._tenBtn.height + 3);

            switch (vo.getFloor()) {
                case 1:
                    this._firstfloorBM.setVisible(false);
                    let secondfloorBMStr = "acchristmasview_secondfloor2";
                    if (this.code != "1" && this.code != "2") {

                        secondfloorBMStr = "acchristmasview_secondfloor2_" + this.code;
                        if (this.isValentines()) {
                            secondfloorBMStr = "acchristmasview_secondfloor2_" + this.isValentines();
                        }
                    }
                    this._secondfloorBM.setload(secondfloorBMStr);
                    let thirdfloorBMStr1 = "acchristmasview_thirdfloor2";
                    if (this.code != "1" && this.code != "2") {

                        thirdfloorBMStr1 = "acchristmasview_thirdfloor2_" + this.code;
                        if (this.isValentines()) {
                            thirdfloorBMStr1 = "acchristmasview_thirdfloor2_" + this.isValentines();
                        }
                    }
                    this._thirdfloorBM.setload(thirdfloorBMStr1);
                    let finalfloorStr1 = "acchristmasview_finalfloor1";
                    if (this.code != "1" && this.code != "2") {

                        finalfloorStr1 = "acchristmasview_finalfloor1_" + this.code;
                        if (this.isValentines()) {
                            finalfloorStr1 = "acchristmasview_finalfloor1_" + this.isValentines();
                        }
                    }
                    this._finalfloorBM.setload(finalfloorStr1);
                    this._successBg.setVisible(false);
                    this._successTxt.setVisible(false);
                    let firstFloolDesc1Key = "acChristmasRewardPopupViewFloorDesc1";
                    if (this.isValentines()||this.getUiCode() || this.isMagpieBridge()) {
                        firstFloolDesc1Key = "acChristmasRewardPopupViewFloorDesc1_" + this.code;
                    }
                    this._firstFloolDesc1.text = LanguageManager.getlocal(firstFloolDesc1Key, [String(vo.getFloorValue(1)), String(acCfg.getFloorStarNum("1"))]);
                    this._firstFloolDesc2.text = LanguageManager.getlocal("acChristmasRewardPopupViewFloorDesc2", [String(acCfg.getFloorCost("1"))]);
                    this._firstFloolDesc1.setPosition(this._firstFloolBg.x + this._firstFloolBg.width / 2 - (this._firstFloolDesc1.width + this._firstFloolStarBM.width * this._floolStarScaleValue + this._firstFloolDesc2.width) / 2, this._firstFloolBg.y + this._firstFloolBg.height / 2 - this._firstFloolDesc1.height / 2);
                    this._firstFloolStarBM.setPosition(this._firstFloolDesc1.x + this._firstFloolDesc1.width, this._firstFloolDesc1.y + this._firstFloolDesc1.height / 2 - this._firstFloolStarBM.height * this._floolStarScaleValue / 2);
                    this._firstFloolDesc2.setPosition(this._firstFloolStarBM.x + this._firstFloolStarBM.width * this._floolStarScaleValue, this._firstFloolStarBM.y + this._firstFloolStarBM.height * this._floolStarScaleValue / 2 - this._firstFloolDesc2.height / 2);

                    let secondFloolDesc1_4Key = "acChristmasRewardPopupViewFloorDesc4";
                    if (this.isValentines()||this.getUiCode() || this.isMagpieBridge()) {
                        secondFloolDesc1_4Key = "acChristmasRewardPopupViewFloorDesc4_" + this.code;
                    }
                    this._secondFloolDesc1.text = LanguageManager.getlocal(secondFloolDesc1_4Key, [String(vo.getFloorValue(2)), String(acCfg.getFloorStarNum("2"))]);
                    this._secondFloolDesc2.text = LanguageManager.getlocal("acChristmasRewardPopupViewFloorDesc5", [String(acCfg.getFloorCost("2"))]);
                    this._secondFloolDesc1.setPosition(this._secondFloolBg.x + this._secondFloolBg.width / 2 - (this._secondFloolDesc1.width + this._secondFloolStarBM.width * this._floolStarScaleValue + this._secondFloolDesc2.width) / 2, this._secondFloolBg.y + this._secondFloolBg.height / 2 - this._secondFloolDesc1.height / 2);
                    this._secondFloolStarBM.setPosition(this._secondFloolDesc1.x + this._secondFloolDesc1.width, this._secondFloolDesc1.y + this._secondFloolDesc1.height / 2 - this._secondFloolStarBM.height * this._floolStarScaleValue / 2);
                    this._secondFloolDesc2.setPosition(this._secondFloolStarBM.x + this._secondFloolStarBM.width * this._floolStarScaleValue, this._secondFloolStarBM.y + this._secondFloolStarBM.height * this._floolStarScaleValue / 2 - this._secondFloolDesc2.height / 2);

                    let thirdFloolDesc1_4Key = "acChristmasRewardPopupViewFloorDesc4";
                    if (this.isValentines()||this.getUiCode() || this.isMagpieBridge()) {
                        thirdFloolDesc1_4Key = "acChristmasRewardPopupViewFloorDesc4_" + this.code;
                    }
                    this._thirdFloolDesc1.text = LanguageManager.getlocal(thirdFloolDesc1_4Key, [String(vo.getFloorValue(3)), String(acCfg.getFloorStarNum("3"))]);
                    this._thirdFloolDesc2.text = LanguageManager.getlocal("acChristmasRewardPopupViewFloorDesc5", [String(acCfg.getFloorCost("3"))]);
                    this._thirdFloolDesc1.setPosition(this._thirdFloolBg.x + this._thirdFloolBg.width / 2 - (this._thirdFloolDesc1.width + this._thirdFloolStarBM.width * this._floolStarScaleValue + this._thirdFloolDesc2.width) / 2, this._thirdFloolBg.y + this._thirdFloolBg.height / 2 - this._thirdFloolDesc1.height / 2);
                    this._thirdFloolStarBM.setPosition(this._thirdFloolDesc1.x + this._thirdFloolDesc1.width, this._thirdFloolDesc1.y + this._thirdFloolDesc1.height / 2 - this._thirdFloolStarBM.height * this._floolStarScaleValue / 2);
                    this._thirdFloolDesc2.setPosition(this._thirdFloolStarBM.x + this._thirdFloolStarBM.width * this._floolStarScaleValue, this._thirdFloolStarBM.y + this._thirdFloolStarBM.height * this._floolStarScaleValue / 2 - this._thirdFloolDesc2.height / 2);


                    break;
                case 2:
                    this._firstfloorBM.setVisible(false);
                    this._secondfloorBM.setVisible(false);
                    let thirdfloorBMStr2 = "acchristmasview_thirdfloor2";
                    if (this.code != "1" && this.code != "2") {

                        thirdfloorBMStr2 = "acchristmasview_thirdfloor2_" + this.code;
                        if (this.isValentines()) {
                            thirdfloorBMStr2 = "acchristmasview_thirdfloor2_" + this.isValentines();
                        }
                    }
                    this._thirdfloorBM.setload(thirdfloorBMStr2);
                    let finalfloorStr2 = "acchristmasview_finalfloor1";
                    if (this.code != "1" && this.code != "2") {

                        finalfloorStr2 = "acchristmasview_finalfloor1_" + this.code;
                        if (this.isValentines()) {
                            finalfloorStr2 = "acchristmasview_finalfloor1_" + this.isValentines();
                        }
                    }
                    this._finalfloorBM.setload(finalfloorStr2);
                    this._successBg.setVisible(false);
                    this._successTxt.setVisible(false);
                    let firstFloolDesc1_6Key = "acChristmasRewardPopupViewFloorDesc6";
                    if (this.isValentines()||this.getUiCode() || this.isMagpieBridge()) {
                        firstFloolDesc1_6Key = "acChristmasRewardPopupViewFloorDesc6_" + this.code;
                    }
                    this._firstFloolDesc1.text = LanguageManager.getlocal(firstFloolDesc1_6Key, [String(vo.getFloorValue(1)), String(acCfg.getFloorStarNum("1"))]);
                    this._firstFloolDesc1.setPosition(this._firstFloolBg.x + this._firstFloolBg.width / 2 - this._firstFloolDesc1.width / 2, this._firstFloolBg.y + this._firstFloolBg.height / 2 - this._firstFloolDesc1.height / 2);
                    this._firstFloolDesc2.setVisible(false);
                    this._firstFloolStarBM.setVisible(false);

                    let secondFloolDesc1Key = "acChristmasRewardPopupViewFloorDesc1";
                    if (this.isValentines()||this.getUiCode() || this.isMagpieBridge()) {
                        secondFloolDesc1Key = "acChristmasRewardPopupViewFloorDesc1_" + this.code;
                    }
                    this._secondFloolDesc1.text = LanguageManager.getlocal(secondFloolDesc1Key, [String(vo.getFloorValue(2)), String(acCfg.getFloorStarNum("2"))]);
                    this._secondFloolDesc2.text = LanguageManager.getlocal("acChristmasRewardPopupViewFloorDesc2", [String(acCfg.getFloorCost("2"))]);
                    this._secondFloolDesc1.setPosition(this._secondFloolBg.x + this._secondFloolBg.width / 2 - (this._secondFloolDesc1.width + this._secondFloolStarBM.width * this._floolStarScaleValue + this._secondFloolDesc2.width) / 2, this._secondFloolBg.y + this._secondFloolBg.height / 2 - this._secondFloolDesc1.height / 2);
                    this._secondFloolStarBM.setPosition(this._secondFloolDesc1.x + this._secondFloolDesc1.width, this._secondFloolDesc1.y + this._secondFloolDesc1.height / 2 - this._secondFloolStarBM.height * this._floolStarScaleValue / 2);
                    this._secondFloolDesc2.setPosition(this._secondFloolStarBM.x + this._secondFloolStarBM.width * this._floolStarScaleValue, this._secondFloolStarBM.y + this._secondFloolStarBM.height * this._floolStarScaleValue / 2 - this._secondFloolDesc2.height / 2);

                    let thirdFloolDesc1_3Key = "acChristmasRewardPopupViewFloorDesc4";
                    if (this.isValentines()||this.getUiCode() || this.isMagpieBridge()) {
                        thirdFloolDesc1_3Key = "acChristmasRewardPopupViewFloorDesc4_" + this.code;
                    }
                    this._thirdFloolDesc1.text = LanguageManager.getlocal(thirdFloolDesc1_3Key, [String(vo.getFloorValue(3)), String(acCfg.getFloorStarNum("3"))]);
                    this._thirdFloolDesc2.text = LanguageManager.getlocal("acChristmasRewardPopupViewFloorDesc5", [String(acCfg.getFloorCost("3"))]);
                    this._thirdFloolDesc1.setPosition(this._thirdFloolBg.x + this._thirdFloolBg.width / 2 - (this._thirdFloolDesc1.width + this._thirdFloolStarBM.width * this._floolStarScaleValue + this._thirdFloolDesc2.width) / 2, this._thirdFloolBg.y + this._thirdFloolBg.height / 2 - this._thirdFloolDesc1.height / 2);
                    this._thirdFloolStarBM.setPosition(this._thirdFloolDesc1.x + this._thirdFloolDesc1.width, this._thirdFloolDesc1.y + this._thirdFloolDesc1.height / 2 - this._thirdFloolStarBM.height * this._floolStarScaleValue / 2);
                    this._thirdFloolDesc2.setPosition(this._thirdFloolStarBM.x + this._thirdFloolStarBM.width * this._floolStarScaleValue, this._thirdFloolStarBM.y + this._thirdFloolStarBM.height * this._floolStarScaleValue / 2 - this._thirdFloolDesc2.height / 2);

                    break;
                case 3:
                    this._firstfloorBM.setVisible(false);
                    this._secondfloorBM.setVisible(false);
                    this._thirdfloorBM.setVisible(false);
                    let finalfloorStr3 = "acchristmasview_finalfloor1";
                    if (this.code != "1" && this.code != "2") {

                        finalfloorStr3 = "acchristmasview_finalfloor1_" + this.code;
                        if (this.isValentines()) {
                            finalfloorStr3 = "acchristmasview_finalfloor1_" + this.isValentines();
                        }
                    }
                    this._finalfloorBM.setload(finalfloorStr3);
                    this._successBg.setVisible(false);
                    this._successTxt.setVisible(false);
                    let firstFloolDesc1_6_2Key = "acChristmasRewardPopupViewFloorDesc6";
                    if (this.isValentines()||this.getUiCode() || this.isMagpieBridge()) {
                        firstFloolDesc1_6_2Key = "acChristmasRewardPopupViewFloorDesc6_" + this.code;
                    }
                    this._firstFloolDesc1.text = LanguageManager.getlocal(firstFloolDesc1_6_2Key, [String(vo.getFloorValue(1)), String(acCfg.getFloorStarNum("1"))]);
                    this._firstFloolDesc1.setPosition(this._firstFloolBg.x + this._firstFloolBg.width / 2 - this._firstFloolDesc1.width / 2, this._firstFloolBg.y + this._firstFloolBg.height / 2 - this._firstFloolDesc1.height / 2);
                    this._firstFloolDesc2.setVisible(false);
                    this._firstFloolStarBM.setVisible(false);
                    let secondFloolDesc1_6_1Key = "acChristmasRewardPopupViewFloorDesc6";
                    if (this.isValentines()||this.getUiCode() || this.isMagpieBridge()) {
                        secondFloolDesc1_6_1Key = "acChristmasRewardPopupViewFloorDesc6_" + this.code;
                    }
                    this._secondFloolDesc1.text = LanguageManager.getlocal(secondFloolDesc1_6_1Key, [String(vo.getFloorValue(2)), String(acCfg.getFloorStarNum("2"))]);
                    this._secondFloolDesc1.setPosition(this._secondFloolBg.x + this._secondFloolBg.width / 2 - this._secondFloolDesc1.width / 2, this._secondFloolBg.y + this._secondFloolBg.height / 2 - this._secondFloolDesc1.height / 2);
                    this._secondFloolStarBM.setVisible(false);
                    this._secondFloolDesc2.setVisible(false);

                    let thirdFloolDesc1Key = "acChristmasRewardPopupViewFloorDesc1";
                    if (this.isValentines()||this.getUiCode() || this.isMagpieBridge()) {
                        thirdFloolDesc1Key = "acChristmasRewardPopupViewFloorDesc1_" + this.code;
                    }
                    this._thirdFloolDesc1.text = LanguageManager.getlocal(thirdFloolDesc1Key, [String(vo.getFloorValue(3)), String(acCfg.getFloorStarNum("3"))]);
                    this._thirdFloolDesc2.text = LanguageManager.getlocal("acChristmasRewardPopupViewFloorDesc2", [String(acCfg.getFloorCost("3"))]);
                    this._thirdFloolDesc1.setPosition(this._thirdFloolBg.x + this._thirdFloolBg.width / 2 - (this._thirdFloolDesc1.width + this._thirdFloolStarBM.width * this._floolStarScaleValue + this._thirdFloolDesc2.width) / 2, this._thirdFloolBg.y + this._thirdFloolBg.height / 2 - this._thirdFloolDesc1.height / 2);
                    this._thirdFloolStarBM.setPosition(this._thirdFloolDesc1.x + this._thirdFloolDesc1.width, this._thirdFloolDesc1.y + this._thirdFloolDesc1.height / 2 - this._thirdFloolStarBM.height * this._floolStarScaleValue / 2);
                    this._thirdFloolDesc2.setPosition(this._thirdFloolStarBM.x + this._thirdFloolStarBM.width * this._floolStarScaleValue, this._thirdFloolStarBM.y + this._thirdFloolStarBM.height * this._floolStarScaleValue / 2 - this._thirdFloolDesc2.height / 2);

                    break;
                default:
                    this._firstfloorBM.setVisible(false);
                    this._secondfloorBM.setVisible(false);
                    this._thirdfloorBM.setVisible(false);
                    this._finalfloorBM.setVisible(false);
                    this._firstFloolBg.setVisible(false);
                    this._firstFloolDesc1.setVisible(false);
                    this._firstFloolStarBM.setVisible(false);
                    this._firstFloolDesc2.setVisible(false);
                    this._secondFloolBg.setVisible(false);
                    this._secondFloolDesc1.setVisible(false);
                    this._secondFloolStarBM.setVisible(false);
                    this._secondFloolDesc2.setVisible(false);
                    this._thirdFloolBg.setVisible(false);
                    this._thirdFloolDesc1.setVisible(false);
                    this._thirdFloolStarBM.setVisible(false);
                    this._thirdFloolDesc2.setVisible(false);
                    this._finalFloolDesc.setVisible(false);
                    this._finalFloolBg.setVisible(false);
                    this._successBg.setVisible(true);
                    this._successTxt.setVisible(true);
                    break;
            }
        }
        else{
            this._starTxt.text = String(vo.getItemValue());
            this._starTxt.anchorOffsetX = this._starTxt.width/2;
            this._onceDesc.text = LanguageManager.getlocal("acChristmasDressNeedInfo-"+this.getTypeCode(), [""+vo.getFloorCost()]);
            this._onceDesc.x = this._oneBtn.x + this._oneBtn.width/2 - (this._onceDesc.width + this._onceIcon.width)/2 + 3;
            this._onceIcon.x = this._onceDesc.x + this._onceDesc.width;

            this._tenDesc.text = LanguageManager.getlocal("acChristmasDressNeedInfo-"+this.getTypeCode(), [String(vo.getFloorCost() * vo.getlotteryValue())]);
            this._tenDesc.x = this._tenBtn.x + this._tenBtn.width/2 - (this._tenDesc.width + this._tenIcon.width)/2 + 3;
            this._tenIcon.x = this._tenDesc.x + this._tenDesc.width;

            let firstFloorNum = vo.getFloorValue(1);
            let firstFloorTotalNum = acCfg.getFloorStarNum("1");
            this.freshProcessNum(0, firstFloorNum, firstFloorTotalNum);
            for (let key in this._firstFloolRewardList) {
                let gift = <BaseBitmap>this._firstFloolRewardList[key].rewardContainer.getChildByName("gift");
                let giftEffect = <CustomMovieClip>this._firstFloolRewardList[key].rewardContainer.getChildByName("giftEffect");
                let percent = this._firstFloolRewardList[key].percent;
                if (firstFloorNum / firstFloorTotalNum >= percent){
                    gift.visible = false;
                    if (giftEffect){
                        giftEffect.visible = false;
                    }
                    egret.Tween.removeTweens(this._firstFloolRewardList[key].rewardContainer);
                    this._firstFloolRewardList[key].rewardContainer.rotation = 0;
                }
                else{
                    gift.visible = true;
                    if (giftEffect){
                        giftEffect.visible = true;
                    }
                }   
            }
            let senondFloorNum = vo.getFloorValue(2);
            let senondFloorTotalNum = acCfg.getFloorStarNum("2");
            this.freshProcessNum(1, senondFloorNum, senondFloorTotalNum);
            for (let key in this._secondFloolRewardList) {
                let gift = <BaseBitmap>this._secondFloolRewardList[key].rewardContainer.getChildByName("gift");
                let giftEffect = <CustomMovieClip>this._secondFloolRewardList[key].rewardContainer.getChildByName("giftEffect");
                let percent = this._secondFloolRewardList[key].percent;
                if (senondFloorNum / senondFloorTotalNum >= percent){
                    gift.visible = false;
                    if (giftEffect){
                        giftEffect.visible = false;
                    }
                    egret.Tween.removeTweens(this._secondFloolRewardList[key].rewardContainer);
                    this._secondFloolRewardList[key].rewardContainer.rotation = 0;
                }
                else{
                    gift.visible = true;
                    if (giftEffect){
                        giftEffect.visible = true;
                    }
                }
            }
            let thridFloorNum = vo.getFloorValue(3);
            let thridFloorTotalNum = acCfg.getFloorStarNum("3");
            let currThirdFloorTotalNum = thridFloorTotalNum - 1;
            this.freshProcessNum(2, thridFloorNum, thridFloorTotalNum);
            for (let key in this._thirdFloolRewardList) {
                let gift = <BaseBitmap>this._thirdFloolRewardList[key].rewardContainer.getChildByName("gift");
                let giftEffect = <CustomMovieClip>this._thirdFloolRewardList[key].rewardContainer.getChildByName("giftEffect");
                let percent = this._thirdFloolRewardList[key].percent;
                if (key != "1"){
                    let currThridFloorNum = thridFloorNum;
                    if (vo.getFloorReward("1", 3)){
                        currThridFloorNum = currThridFloorNum - 1;
                    }
                    if (currThridFloorNum / currThirdFloorTotalNum >= percent){
                        gift.visible = false;
                        if (giftEffect){
                            giftEffect.visible = false;
                        }
                        egret.Tween.removeTweens(this._thirdFloolRewardList[key].rewardContainer);
                        this._thirdFloolRewardList[key].rewardContainer.rotation = 0;
                    }
                    else{
                        gift.visible = true;
                        if (giftEffect){
                            giftEffect.visible = true;
                        }
                    }
                }
                else{
                    if (vo.getFloorReward("1", 3)){
                        gift.visible = false;
                        if (giftEffect){
                            giftEffect.visible = false;
                        }
                        egret.Tween.removeTweens(this._thirdFloolRewardList[key].rewardContainer);
                        this._thirdFloolRewardList[key].rewardContainer.rotation = 0;
                    }
                    else{
                        gift.visible = true;
                        if (giftEffect){
                            giftEffect.visible = true;
                        }
                    }
                }
            }
            for (let key in this._finalloolRewardList) {
                let gift = <BaseBitmap>this._finalloolRewardList[key].rewardContainer.getChildByName("gift");
                let giftEffect = <CustomMovieClip>this._finalloolRewardList[key].rewardContainer.getChildByName("giftEffect");
                if (vo.getFloor() >= 4){
                    gift.visible = false;
                    if (giftEffect){
                        giftEffect.visible = false;
                    }
                }
                else{
                    gift.visible = true;
                    if (giftEffect){
                        giftEffect.visible = true;
                    }
                }
            }


        }
        if (vo.isHaveTaskRedDot()) {
            App.CommonUtil.addIconToBDOC(this._taskBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._taskBtn);
        }
        if (this.getTypeCode() == "8" && this._bubbleTip){
            this.freshBubbleTip(this._bubbleTip);
        }
    }

    private freshProcessNum(index:number, currNum:number, totalNum:number):void{
        this._floorNumList[index].numTf.text = LanguageManager.getlocal("acChristmasDressProcessNum-"+this.getTypeCode(), [""+(totalNum - currNum), ""+totalNum]);
        this._floorNumList[index].numBg.width = this._floorNumList[index].numTf.width + 34;
        this._floorNumList[index].numBg.x = this._treeContainer.width - this._floorNumList[index].numBg.width - 15;
        this._floorNumList[index].numBg.y = this._processNumPos[index].y;
        this._floorNumList[index].numTf.x = this._floorNumList[index].numBg.x + this._floorNumList[index].numBg.width/2 - this._floorNumList[index].numTf.width/2;
        this._floorNumList[index].numTf.y = this._floorNumList[index].numBg.y + this._floorNumList[index].numBg.height/2 - this._floorNumList[index].numTf.height/2;
    }

    public tick() {
        let vo = <AcChristmasVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        this._timeTxt.text = LanguageManager.getlocal("acChristmasViewDescTime", [vo.acCountDown]);
        if (this.getTypeCode() == "8"){
            this._timeBg.width = 60 + this._timeTxt.width;
            this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
            this._timeTxt.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTxt.height / 2);
        }
        else{
            this._timeTxt.x = GameConfig.stageWidth / 2 - this._timeTxt.width / 2;
            if(this._timeBg)
            {
                this._timeBg.x = this._timeTxt.x -25;
                this._timeBg.width = this._timeTxt.width+50;
            }
        }
    }

    //创建气泡提示
    public createBubbleTip(str:string, isSpecialTip:boolean):BaseDisplayObjectContainer{
        let tipContainer = new BaseDisplayObjectContainer();
        let tipBg = BaseBitmap.create("public_9_bg42");
        tipBg.name = "tipBg";
        
        let tipTail = BaseBitmap.create("public_9_bg42_tail");
        tipContainer.addChild(tipTail);
        tipTail.name = "tipTail";
        tipContainer.addChild(tipBg);

        let tipDesc = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        tipBg.height = tipDesc.height + 20;
        tipBg.width = tipDesc.width + 30;
        if (isSpecialTip){
            tipTail.scaleX = -1;
            tipTail.setPosition(tipBg.x + tipBg.width - tipTail.width + 15, tipBg.y + tipBg.height);
        }
        else{
            tipTail.setPosition(tipBg.x + 30, tipBg.y + tipBg.height - 3);
        }
        tipDesc.setPosition(tipBg.x + 15, tipBg.y + tipBg.height/2 - tipDesc.height/2 + 2);
        tipContainer.addChild(tipDesc);
        tipDesc.name = "tipDesc";
        tipContainer.height = tipBg.height + tipTail.height + 20;
        tipContainer.width = tipBg.width;
        return tipContainer;
    }

    private freshBubbleTip(obj:BaseDisplayObjectContainer){
        let acCfg = <Config.AcCfg.ChristmasCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        let vo = <AcChristmasVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        let str = LanguageManager.getlocal("acChristmasTip-"+this.getTypeCode()+"_end");
        let floor = vo.getFloor();
        if (floor < 4){
            let floorNum = vo.getFloorValue(floor);
            let floorTotalNum = acCfg.getFloorStarNum(""+floor);
            str = LanguageManager.getlocal("acChristmasTip-"+this.getTypeCode()+"_floor_"+vo.getFloor(), [""+floorNum, ""+floorTotalNum]);
        }
        let tipBg = <BaseBitmap>obj.getChildByName("tipBg");
        let tipDesc = <BaseTextField>obj.getChildByName("tipDesc");
        tipDesc.text = str;
        tipBg.width = tipDesc.width + 30;
        obj.width = tipBg.width; 
    }

    /**
     * 任务
     */
    private taskBtnClick() {
        ViewController.getInstance().openView(ViewConst.COMMON.ACCHRISTMASTASKVIEW, { code: this.code, aid: this.aid });
    }
    /**
     * 抽一次
     */
    private oneBtnClick() {
        let vo = <AcChristmasVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        let cfg = <Config.AcCfg.ChristmasCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        let deltaT = vo.et - GameData.serverTime - 86400 * cfg.extraTime;
        if (deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (vo.getFloorCost() > vo.getItemValue()) {
            ViewController.getInstance().openView(ViewConst.POPUP.ACCHRISTMASCONFIRMPOPUPVIEW, { aid: this.aid, code: this.code });
            // App.CommonUtil.showTip(LanguageManager.getlocal("acChristmasViewTip1"));
            return;
        }
        if (this._isPlay){
            return;
        }
        this._isPlay = true;
        this._nowFloorRewardList = vo.getNowRewardPool();
        this._isTen = false;
        this.request(NetRequestConst.REQUST_ACTIVITY_CHRISTMASLOTTERY, { activeId: this.aid + "-" + this.code, ten: 0 });
    }

    /**
     * 抽一次
     */
    private tenBtnClick() {
        let vo = <AcChristmasVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        let cfg = <Config.AcCfg.ChristmasCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        let deltaT = vo.et - GameData.serverTime - 86400 * cfg.extraTime;
        if (deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }

        if ((vo.getFloorCost() * vo.getlotteryValue()) > vo.getItemValue()) {
            ViewController.getInstance().openView(ViewConst.POPUP.ACCHRISTMASCONFIRMPOPUPVIEW, { aid: this.aid, code: this.code });
            // App.CommonUtil.showTip(LanguageManager.getlocal("acChristmasViewTip1"));
            return;
        }
        if (this._isPlay){
            return;
        }
        this._isPlay = true;
        this._nowFloorRewardList = vo.getNowRewardPool();
        if (vo.getlotteryValue() > 1) {
            this._isTen = true;
            this.request(NetRequestConst.REQUST_ACTIVITY_CHRISTMASLOTTERY, { activeId: this.aid + "-" + this.code, ten: 1 });
        }
        else {
            this._isTen = false;
            this.request(NetRequestConst.REQUST_ACTIVITY_CHRISTMASLOTTERY, { activeId: this.aid + "-" + this.code, ten: 0 });
        }
    }

    private rewardClick(event: egret.TouchEvent, args: any[]) {
        let vo = <AcChristmasVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        let acCfg = <Config.AcCfg.ChristmasCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        let floorRewardList = acCfg.getFloorRewardList(args[0])
        if (vo.getFloor() >= 4) {
            floorRewardList = acCfg.getFloorRewardPoolList("4");
            ViewController.getInstance().openView(ViewConst.POPUP.ACCHRISTMASREWARDPOPUPVIEW, { floorRewardList: floorRewardList, aid: this.aid, code: this.code, floor: args[0] });
            return;
        }
        if (args[0] == "4") {
            let reward = GameData.formatRewardItem(floorRewardList[0].reward)[0];

            ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW, reward);


            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACCHRISTMASREWARDPOPUPVIEW, { floorRewardList: floorRewardList, aid: this.aid, code: this.code, floor: args[0] });
    }

    private rewardNewClick(evt:any, args: any[]):void{
        App.LogUtil.log("rewardnewClick: "+args[0]);
        let vo = <AcChristmasVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        let acCfg = <Config.AcCfg.ChristmasCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        let floorRewardList = acCfg.getFloorRewardList(args[0]);
        if (vo.getFloor() < 4 && args[0] == "4"){
            let reward = GameData.formatRewardItem(floorRewardList[0].reward)[0];
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW, reward);
            return ;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.ACCHRISTMASNEWREWARDVIEW, {aid: this.aid, code: this.code, floor: Number(args[0])});
    }
    /**
     * 奖励item
     */
    private getChristmasGiftContainer(rewardVo: RewardItemVo, isLigth?: boolean, starScaleValue?: number): BaseDisplayObjectContainer {
        let container = new BaseDisplayObjectContainer();
        let scaleValue = 0.55;
        let reward = GameData.getItemIcon(rewardVo, false, true);
        reward.setScale(scaleValue);
        if (isLigth) {
            let boxLight = BaseBitmap.create("acturantable_taskbox_light");
            boxLight.anchorOffsetX = boxLight.width / 2;
            boxLight.anchorOffsetY = boxLight.height / 2;
            boxLight.setScale(2);
            boxLight.setPosition(reward.x + reward.width * scaleValue / 2, reward.y + reward.height * scaleValue / 2);
            container.addChild(boxLight);
            egret.Tween.get(boxLight, { loop: true }).to({ rotation: boxLight.rotation + 360 }, 10000);
            boxLight.name = "ligth";
        }
        container.addChild(reward);
        reward.name = "reward";

        let giftpoleStr = "acchristmasview_giftpole";
        if (this.isValentines()) {
            giftpoleStr = "acchristmasview_giftpole_" + this.isValentines();
        }
        else if (this.isMagpieBridge()){
            giftpoleStr = "acchristmasview_giftpole_" + this.isMagpieBridge();
        }
        let giftpole = BaseBitmap.create(giftpoleStr);
        giftpole.setPosition(reward.x + reward.width * scaleValue / 2 - giftpole.width / 2, reward.y - giftpole.height);
        container.addChild(giftpole);
        giftpole.name = "giftpole";

        let star = this.starEffect();
        star.anchorOffsetX = star.width / 2;
        star.anchorOffsetY = star.height / 2;
        let starScale = 0.7 + Math.random() * 0.31;
        if (this.isValentines()) {
            starScale = 1;
            if (starScaleValue) {
                starScale = starScaleValue;
            }
        }
        star.setScale(starScale);
        star.rotation = 360 * Math.random();
        if (this.isValentines()||this.getUiCode() == "5" || this.isMagpieBridge()) {
            star.rotation = 0;
        }
        star.setPosition(giftpole.x + giftpole.width / 2, giftpole.y + giftpole.height);
        container.addChild(star);
        star.name = "star";
        if (this.isValentines()) {
            star.anchorOffsetY = 25;
            // star.y = giftpole.y + giftpole.height - 25;
            let randomNumber = Math.random();
            let rotation = 10 * randomNumber;
            star.rotation = 0;
            let rotationTime = 2000 * randomNumber;
            egret.Tween.get(star, { loop: true }).to({ rotation: Math.abs(rotation) }, rotationTime).to({ rotation: 0 }, rotationTime).to({ rotation: -Math.abs(rotation) }, rotationTime).to({ rotation: 0 }, rotationTime);
        }
        else if (this.isMagpieBridge()){
            star.anchorOffsetY = 25;
            let randomNumber = Math.random();
            let posX = 10 * randomNumber;
            let moveTime = 2000 * randomNumber;
            let startX = giftpole.x + giftpole.width / 2;
        egret.Tween.get(star, { loop: true }).to({ x: posX + star.x }, moveTime).to({ x: -posX + star.x}, moveTime * 2).to({ x: startX}, moveTime);
        }

        container.width = 110;



        return container;
    }
    /**星星特效 */
    public starEffect(): BaseDisplayObjectContainer {
        let container = new BaseDisplayObjectContainer();
        let startStr = "acchristmasview_effectstarnormal";
        if (this.isValentines()) {
            startStr = "acchristmasview_effectstarnormal_" + this.isValentines();
        }
        else if (this.isMagpieBridge()){
            startStr = "acchristmasview_effectstarnormal_" + this.isMagpieBridge();
        }
        else if(this.getUiCode())
        {
            startStr = "acchristmasview_effectstarnormal_" + this.getUiCode();
        }
        let start = BaseBitmap.create(startStr);
        container.addChild(start);
        let starEffectStr = "acchristmasview_effectstar";
        // if (this.isValentines()) {
        //     starEffectStr = "acchristmasview_effectstar_" + this.isValentines();
        // }
        if(this.getUiCode())
        {
            starEffectStr = "acchristmasview_effectstar_" + this.getUiCode();
        }
        let starEffect = BaseBitmap.create(starEffectStr);
        starEffect.alpha = 0;
        container.addChild(starEffect);
        let effectBMStr = "acchristmas_stareffect1";
        // if (this.isValentines()) {
        //     effectBMStr = "acchristmas_yinghuaeffect1";
        // }
        let effectBM = BaseBitmap.create(effectBMStr);
        let effectStr = "acchristmas_stareffect";
        // if (this.isValentines()) {
        //     effectStr = "acchristmas_yinghuaeffect";
        // }
        let effect = ComponentManager.getCustomMovieClip(effectStr, 10, 70);
        effect.setPosition(starEffect.x + starEffect.width / 2 - effectBM.width / 2, starEffect.y + starEffect.height / 2 - effectBM.height / 2)
        effect.playWithTime(-1);
        effect.alpha = 0;
        container.addChild(effect);
        if (this.isValentines() || this.isMagpieBridge()) {
            effect.setVisible(false);
            starEffect.setVisible(false)
        }

        egret.Tween.get(container).wait(0).call(() => {
            egret.Tween.get(starEffect, { loop: true }).to({ alpha: 0.5 }, 270).to({ alpha: 0 }, 330).wait(1700);
            egret.Tween.get(effect, { loop: true }).to({ alpha: 1 }, 400).wait(1070).to({ alpha: 0 }, 830);
        }, this)
        return container;
    }
    /**道具item名字 */
    private getItemName() {
        let itemName = "acchristmasview_star";
        if (this.isValentines()) {
            itemName = "acchristmasview_star_" + this.isValentines();
        }
        else if(this.isMagpieBridge()){
            itemName = "acchristmasview_star_" + this.isMagpieBridge();
        }
        else if(this.getUiCode())
        {
            itemName = "acchristmasview_star_" + this.getUiCode();
        }
        else if (this.getTypeCode() == "8"){
            itemName = ResourceManager.hasRes("acchristmasview_staricon-"+this.getTypeCode()) ? "acchristmasview_staricon-"+this.getTypeCode() : "acchristmasview_staricon-8";
        }
        return itemName;
    }
    /**是否情人节 */
    private isValentines() {
        if (this.code == "3" || this.code == "4") {
            return "3";
        }
        return null;
    }

    /**是否为鹊桥相会 7泰国*/
    private isMagpieBridge(){
        if (this.code == "6" || this.code == "7"){
            return "6";
        }
        return null;
    }
    protected getUiCode(): string {
        if (this.code == "5") {
            return "5"
        }
        return null;
    }

    private getTypeCode():string{
        if (this.code == "9" || this.code == "10"){
            return "8";
        }
        return this.code;
    }
    // 标题背景名称
    protected getTitleBgName(): string {
        super.getTitleBgName
        if (this.isValentines()) {
            return "commonview_titlebg";
        }
        else if (this.getTypeCode() == "8"){
            return "acchristmasview_titlebg_"+this.getTypeCode();
        }
        else {
            return "commonview_snowtitlebg";
        }
    }
    protected getRuleInfo(): string {
        return "acChristmasRuleInfo_" + this.code;
    }
    protected getRuleInfoParam(): string[] {
        if (this.code == "2") {
            let acCfg = <Config.AcCfg.ChristmasCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            let reward = GameData.formatRewardItem(acCfg.getFloorRewardList("4")[0].reward)[0];
            let wifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(reward.id);
            return [String(wifeSkinCfg.itemNum)]
        }
        return [];
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }
    protected getResourceList(): string[] {
        let list: string[] = [];
        if (this.isValentines()) {
            list = ["acchristmasviewcode3", "acchristmasview_itemiconstar_3", "yinghua_json", "yinghua", "acchristmas_yinghuaeffect", "sharepopupview_closebtn", "sharepopupview_closebtn_down"];
        }
        if (this.getUiCode()) {
            list.push("acchristmasviewcode" + this.getUiCode());
        }
        if (this.isMagpieBridge()){
            list = ["acchristmasviewcode6", "sharepopupview_closebtn", "sharepopupview_closebtn_down", "acchristmasview_watereffect"];
        }
        if (this.code == "2") {
            list.push("acchristmasviewcode2");
        }
        if (this.getTypeCode() == "8"){
            list = ["acchristmasviewcode8", "actravelwithbeauty_numbg", "acwealthcarpview_servantskintxt", "christmas_new_snow_json", "christmas_new_snow"];
        }
        return super.getResourceList().concat([
            "xuehua_json", "xuehua", "acchristmas_stareffect", "acturantable_taskbox_light", "commonview_snowtitlebg", "commonview_titlebgshadow"
        ]).concat(list);
    }
    protected getCloseBtnName(): string {
        if (this.isValentines()) {
            return "sharepopupview_closebtn";
        }
        return super.getCloseBtnName();
    }
    protected getTitleStr(): string {
        if (this.isValentines() || this.getUiCode() || this.isMagpieBridge() || this.getTypeCode() == "8") {
            return null;
        }
        return super.getTitleStr();
    }
    protected getRequestData(): { requestType: string, requestData: any } {
        if (GameData.isSendAcChristmasMessage) {
            let vo = <AcChristmasVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
            return { requestType: NetRequestConst.REQUST_ACTIVITY_CHRISTMASCLICKICON, requestData: { activeId: vo.aidAndCode } };
        }
        return null;
    }
    protected receiveData(data: { ret: boolean, data: any }): void {
        if (data.ret) {
            GameData.isSendAcChristmasMessage = false;
        }
    }
    public dispose(): void {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_CHRISTMASLOTTERY, this.christmasLotteryHandel, this);
        this._taskBtn = null;
        this._starTxt = null;
        this._timeTxt = null;
        this._tenBtn = null;
        this._tenUseNumTxt = null;
        this._tenDescTxt = null;
        this._firstfloorBM = null;
        this._secondfloorBM = null;
        this._thirdfloorBM = null;
        this._finalfloorBM = null;
        this._floolStarScaleValue = 0.48;
        this._firstFloolBg = null;
        this._firstFloolDesc1 = null;
        this._firstFloolStarBM = null;
        this._firstFloolDesc2 = null;
        this._secondFloolBg = null;
        this._secondFloolDesc1 = null;
        this._secondFloolStarBM = null;
        this._secondFloolDesc2 = null;
        this._thirdFloolBg = null;
        this._thirdFloolDesc1 = null;
        this._thirdFloolStarBM = null;
        this._thirdFloolDesc2 = null;
        this._oneBtn = null;
        this._finalFloolDesc = null;
        this._finalFloolBg = null;
        this._nowFloorRewardList.length = 0;
        this._firstFloolRewardList.length = 0;
        this._secondFloolRewardList.length = 0;
        this._thirdFloolRewardList.length = 0;
        this._finalloolRewardList.length = 0;
        this._isTen = false;
        this._successBg = null;
        this._successTxt = null;
        this._timeBg =null;
        this._firstFloolCfg = [];
        this._secondFloolCfg = [];
        this._thirdFloolCfg = [];
        this._finalFloolCfg = [];
        //
        this._treeContainer = null;
        this._onceDesc = null;
        this._onceIcon = null;
        this._tenDesc = null;
        this._tenIcon = null;
        this._floorNumList = [];
        this._bubbleTip = null;
        this._isPlay = false;
        super.dispose();
    }

}