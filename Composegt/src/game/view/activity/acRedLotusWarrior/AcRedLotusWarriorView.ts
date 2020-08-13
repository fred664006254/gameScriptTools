/**
 * 红莲活动
 * @author jiangliuyang
 */
class AcRedLotusWarriorView extends AcCommonView {
    // 血条
    private bloodBar: ProgressBar;
    // 倒计时
    private acCdTxt: BaseTextField;
    // 攻击按钮
    private atkButton: BaseButton;

    private numBg: BaseBitmap;
    private numText: BaseTextField;

    // 剩余攻击次数
    private atkCountTxt: BaseTextField;
    private btnText: BaseTextField;
    private _npcBM: BaseLoadBitmap | BaseLoadDragonBones = null;
    private _npcEffect: BaseLoadDragonBones = null;

    private _bigBg: BaseLoadBitmap;
    //敌人图片
    private _enemyList: BaseLoadBitmap[] = [];
    /**士兵1 */
    private _assaultList1: CustomMovieClip[] = [];
    /**士兵2 */
    private _assaultList2: CustomMovieClip[] = [];
    /**士兵1 */
    private _assaultList3: CustomMovieClip[] = [];
    private _enemyContainer: BaseDisplayObjectContainer = null;
    private _isShake: boolean = false;
    private _npcClip1: CustomMovieClip = null;
    private _npcClip2: CustomMovieClip = null;
    private _buttomBg = null;
    private _isPlayAni: boolean = false;
    private _rewards = null;
    private _otherRewards = null;
    private _showTip = null;
    private _isWin = false;
    private _talkContainer: BaseDisplayObjectContainer = null;


    private _skinContainer: BaseDisplayObjectContainer = null;
    private _poemIocn:BaseBitmap;

    private _userItem:BaseLoadDragonBones = null;
    private _userItemBM:BaseBitmap = null;
    private _centerBg:BaseBitmap = null;
    private _centerText:BaseBitmap = null;
    // 吕布容器
    private lvbuNode : BaseDisplayObjectContainer;
    // 吕布骨骼
    private boneNode : BaseLoadDragonBones;
    // 吕布非骨骼静态图
    private lvbuImg : BaseLoadBitmap;
    // 吕布的缩放值
    private readonly lvbuScale = 1;

    private _randomTalkContainer:BaseDisplayObjectContainer = null;
    private _randomTalkBg:BaseBitmap = null;
    private _randomTalkText:BaseTextField = null;
    // 吕布的x
    private lvbuX = 0;
    // 吕布的y
    private lvbuY = 0;
    private _enemyPosCfg: { x: number, y: number, width: number, height: number }[] = [
        { x: 242 + 20, y: 393 + 70, width: 151, height: 122 },
        { x: 353 + 20, y: 406 + 70, width: 154, height: 130 },
        { x: 462 + 20, y: 426 + 70, width: 159, height: 129 },
        { x: 94 + 20, y: 435 + 70, width: 193, height: 142 },
        { x: 236 + 20, y: 473 + 70, width: 187, height: 135 },
        { x: 385 + 20, y: 494 + 70, width: 198, height: 150 },
    ];
    // /**特效配置1 */
    // private _assaultCfg1: { x: number, y: number, alpha: number, scale: number }[] = [
    // 	{ x: -217, y: 313, alpha: 0, scale: 1 },
    // 	{ x: -137, y: 295, alpha: 0, scale: 1 },
    // 	{ x: -39, y: 294, alpha: 0, scale: 1 },
    // 	{ x: 11, y: 246, alpha: 0, scale: 1 },
    // 	{ x: 103, y: 238, alpha: 0, scale: 1 },
    // ]; 
    /**特效配置1 */
    private _assaultCfg1: { x: number, y: number, alpha: number, scale: number }[] = [
        { x: -217 + 100, y: 313, alpha: 0, scale: 1 },
        { x: -137 + 100, y: 295, alpha: 0, scale: 1 },
        { x: -39 + 100, y: 294, alpha: 0, scale: 1 },
        { x: 11 + 100, y: 246, alpha: 0, scale: 1 },
        // { x: 103, y: 238, alpha: 0, scale: 1 },
    ];
    /**特效配置2 */
    private _assaultCfg2: { x: number, y: number, alpha: number, scale: number }[] = [
        { x: -180 + 100, y: 345, alpha: 1, scale: 0.985 },
        { x: -101 + 100, y: 327, alpha: 1, scale: 0.985 },
        { x: -3 + 100, y: 326, alpha: 1, scale: 0.985 },
        { x: 47 + 100, y: 278, alpha: 1, scale: 0.985 },
        // { x: 139, y: 270, alpha: 1, scale: 0.985 },
    ];

    /**特效配置3 */
    private _assaultCfg3: { x: number, y: number, alpha: number, scale: number }[] = [
        { x: 184 + 100, y: 605, alpha: 1, scale: 0.87 },
        { x: 264 + 100, y: 587, alpha: 1, scale: 0.87 },
        { x: 362 + 100, y: 586, alpha: 1, scale: 0.87 },
        { x: 412 + 100, y: 538, alpha: 1, scale: 0.87 },
        // { x: 504, y: 530, alpha: 1, scale: 0.87 },
    ];

    /**特效配置4 */
    private _assaultCfg4: { x: number, y: number, alpha: number, scale: number }[] = [
        { x: 298 + 100, y: 689, alpha: 1, scale: 0.84 },
        { x: 378 + 100, y: 671, alpha: 1, scale: 0.84 },
        { x: 476 + 100, y: 670, alpha: 1, scale: 0.84 },
        { x: 526 + 100, y: 622, alpha: 1, scale: 0.84 },
        // { x: 618, y: 614, alpha: 1, scale: 0.84 },
    ];

    /**特效配置5 */
    private _assaultCfg5: { x: number, y: number, alpha: number, scale: number }[] = [
        { x: 413 + 100, y: 762, alpha: 0, scale: 0.8 },
        { x: 493 + 100, y: 754, alpha: 0, scale: 0.8 },
        { x: 591 + 100, y: 753, alpha: 0, scale: 0.8 },
        { x: 641 + 100, y: 705, alpha: 0, scale: 0.8 },
        // { x: 733, y: 733, alpha: 0, scale: 0.8 },
    ];

    private code3CastleposCfg = [
        { "x": 424, "y": 696, img: "acredlotuswarrior_ground1", scalex: 1, scaley: 1, arrx: -70, arry: 90 },
        { "x": 321, "y": 504, img: "acredlotuswarrior_ground1", scalex: -1, scaley: 1, arrx: 220, arry: 140 },
        { "x": 427, "y": 360, img: "acredlotuswarrior_ground1", scalex: 1, scaley: 1, arrx: -20, arry: 110 },
        { "x": 330, "y": 216, img: "acredlotuswarrior_ground1", scalex: -1, scaley: 1, arrx: 230, arry: 100 },
        { "x": 49, "y": 241, img: "acredlotuswarrior_ground2", scalex: -1, scaley: -1, arrx: 310, arry: 70 },
    ]
    private _code3RedFlag: BaseBitmap = undefined;//code3的旗子
    private _code3NumFnt: BaseBitmapText | BaseTextField = undefined
    private _clickHand: BaseBitmap;
    /**李白部分 诗,code 5、6 */
    private _wine: BaseLoadDragonBones = null;
    private _wineBG: BaseShape = null;
    private _poemContainer: BaseDisplayObjectContainer = null;
    private _brush: BaseBitmap = null;
    private _paper1: BaseBitmap = null;
    private _paper2: BaseBitmap = null;
    private _paper1_mask: BaseShape = null;
    private _paper2_mask: BaseShape = null;
    private _poemText1: BaseBitmap = null;
    private _poemText2: BaseBitmap = null;
    private _redi_timesbg: BaseBitmap = null;
    private _wineLight: BaseBitmap = null;
    private shape1: BaseShape;
    private shape2: BaseShape;

    public constructor() {
        super();
    }

    private get cfg(): Config.AcCfg.RedLotusWarriorCfg {
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo(): AcRedLotusWarriorVo {
        return <AcRedLotusWarriorVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }
    // 标题背景名称
    protected getTitleBgName(): string {
        return this.getDefaultRes("acredlotuswarrior_title", this.defcode);
    }
    protected getTitleStr(): string {
        return null;
    }

    // 关闭按钮图标名称
    protected getCloseBtnName(): string {
        if(this.defcode == "3"){
            return "btn_win_closebtn";
        } else if(this.defcode == "7"){
            return "btn_win_closebtn";
        } else {
            return this.getDefaultRes("acredlotuswarrior_closebtn");
        }
        // return this.defcode == "3" ? "btn_win_closebtn" : this.getDefaultRes("acredlotuswarrior_closebtn");
    }
    private get activityId(): string {

        return this.aid + "-" + this.code;
    }

    protected initBg(): void {
        let bigBg = BaseLoadBitmap.create(this.getDefaultRes("acredlotuswarrior_bg", this.defcode));
        bigBg.height = 1136;


        bigBg.width = 640;

        bigBg.touchEnabled = true;
        bigBg.y = GameConfig.stageHeigth - 1136;
        this._bigBg = bigBg;
        this.addChild(bigBg);
    }

    private get defcode() {
        let defcode = this.code;
        if (this.code == "1" || this.code == "2") {
            defcode = "1";
        } else if (this.code == "3" || this.code == "4") {
            defcode = "3";
        } else if (this.code == "5" || this.code == "6") {
            defcode = "5";
        } else if (this.code == "7") {
            defcode = "7";
        }
        return defcode;
    }
    public initView() {

        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_MACHAOANI, this.playBgAni, this);
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_MACHAOTAbANI, this.playEnemyShakeAni, this);
        App.MessageHelper.addNetMessage(NetRequestConst.ACTIVITY_REDLOTUSWARRIORNUMREWARD, this.receiveBoxHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.ACTIVITY_REDLOTUSWARRIORATTACKTHEBOSS, this.getRewardHandler, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REDLOTUSWARRIOR_REFRESHVO, this.refreshData, this);

        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN, this.showDBDragon, this);

        if (this.defcode == "3") {
            let title_img = BaseBitmap.create("acredlotuswarrior_title_word");
            title_img.width = 214;
            title_img.height = 73;
            title_img.y = 2;
            title_img.x = GameConfig.stageWidth / 2 - title_img.width / 2;
            this.addChild(title_img);
        } else if (this.defcode == "5") {
            let title_img = BaseBitmap.create("acredlotuswarrior_title_word5");
            // title_img.width = 1;
            // title_img.height = 73;
            title_img.y = 2;
            title_img.x = GameConfig.stageWidth / 2 - title_img.width / 2;
            this.addChild(title_img);
        } else if(this.defcode == "7"){
            let title_img = BaseBitmap.create("acredlotuswarrior_title_word7");
            title_img.y = 2;
            title_img.x = GameConfig.stageWidth / 2 - title_img.width / 2;
            this.addChild(title_img);
        }
        if(this.defcode == "7"){

            this.lvbuNode = new BaseDisplayObjectContainer();

            this.lvbuNode.width = 640;
            this.lvbuNode.height = 482;
            this.lvbuNode.anchorOffsetX = 320;
            this.lvbuNode.setScale(this.lvbuScale);
            this.lvbuNode.x = 320;//GameConfig.stageWidth/2;
           
            this.lvbuNode.y = GameConfig.stageHeigth/2 - this.lvbuNode.height * this.lvbuScale + 230;
            this.lvbuX = this.lvbuNode.x;
            this.lvbuY = this.lvbuNode.y;
            this.addChild(this.lvbuNode);

            // 吕布
            if (App.DeviceUtil.CheckWebglRenderMode() && App.CommonUtil.check_dragon()) {
                this.boneNode=App.DragonBonesUtil.getLoadDragonBones(Config.ServantskinCfg.getServantSkinItemById(this.cfg.zhentianSkinId).bone);
                this.boneNode.x = 320;
                this.boneNode.y = this.lvbuNode.height -60;
                this.lvbuNode.addChild(this.boneNode);
                this.boneNode.setScale(0.65);

                let maskShape = BaseBitmap.create("public_9v_bg01");
                maskShape.width = 640;
                maskShape.height = 800;
                // maskShape.scaleY = -1.3;
                maskShape.x = this.lvbuNode.width/2 - maskShape.width / 2;
                maskShape.y = this.lvbuNode.height - maskShape.height ;
                this.lvbuNode.addChild(maskShape);

                this.boneNode.mask = maskShape;
            } else {
                this.lvbuImg=BaseLoadBitmap.create(Config.ServantskinCfg.getServantSkinItemById(this.cfg.zhentianSkinId).body);//this.cfg.zhentianSkinId  10341
                this.lvbuImg.width  = 640;
                this.lvbuImg.height = 482;
                this.lvbuImg.setScale(0.8);
                this.lvbuImg.x = 320 - this.lvbuImg.width * 0.8 /2;
                this.lvbuImg.y = this.lvbuNode.height - this.lvbuImg.height * 0.8 - 70;
                
                this.lvbuNode.addChild(this.lvbuImg);
                let maskShape = BaseBitmap.create("acredlotuswarrior_sermask");
                // maskShape.scaleY = 1.3;
                maskShape.width = 640;
                maskShape.height = 800;
                maskShape.x = this.lvbuNode.width/2 - maskShape.width / 2;
                maskShape.y = this.lvbuNode.height - maskShape.height ;
                this.lvbuNode.addChild(maskShape);
                this.lvbuImg.mask = maskShape;
            }

    //            private _centerBg:BaseBitmap = null;
    // private _centerText:BaseBitmap = null;

            this._centerBg = BaseBitmap.create("acredlotuswarrior_centerbg-7");
            this._centerBg.x = this.lvbuNode.width/2 - this._centerBg.width/2;
            this._centerBg.y = this.lvbuNode.height - 85;
            this.lvbuNode.addChild(this._centerBg);

            this._centerText = BaseBitmap.create("acredlotuswarrior_center-7");
            this._centerText.x = this._centerBg.x + this._centerBg.width/2 - this._centerText.width/2;
            this._centerText.y = this._centerBg.y + this._centerBg.height/2 - this._centerText.height/2;
            this.lvbuNode.addChild(this._centerText);
            if (App.DeviceUtil.CheckWebglRenderMode() && App.CommonUtil.check_dragon()) {
                this._userItem = App.DragonBonesUtil.getLoadDragonBones("acredlotuswarrior_qteffect");
                this._userItem.x = 495
                this._userItem.y = GameConfig.stageHeigth;//300//70;
                this.addChild(this._userItem);

            } else {
                this._userItemBM = BaseBitmap.create("acredlotuswarrior_useritem-7");
                this._userItemBM.x = 455
                this._userItemBM.y = GameConfig.stageHeigth -this._userItemBM.height + 70;//300//70;
                this.addChild(this._userItemBM);
            }



        }

        //活动规则背景图片
        let acruleTxtBg: BaseBitmap=null;
        if(this.code == "7"){
            acruleTxtBg = BaseBitmap.create("acredlotuswarrior_detailbg-3");
            acruleTxtBg.y = 72;
            acruleTxtBg.height = 122;
            this.addChild(acruleTxtBg);
        } else {
            acruleTxtBg = BaseBitmap.create(this.getDefaultRes("acredlotuswarrior_detailbg", this.defcode));
            acruleTxtBg.y = 72;
            acruleTxtBg.height = 122;
            this.addChild(acruleTxtBg);
        }

        



        //活动时间   
        let actimeText = ComponentManager.getTextField(LanguageManager.getlocal("acRedLotusWarrior_acTime", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        actimeText.x = 10;
        actimeText.y = acruleTxtBg.y + 10;
        this.addChild(actimeText);

        let deltaT = this.acVo.et - GameData.serverTime;
        let timeStr = "";
        if (deltaT > 0) {
            timeStr = LanguageManager.getlocal("acRedLotusWarrior_acCd", [App.DateUtil.getFormatBySecond(deltaT, 8)]);

        } else {
            timeStr = LanguageManager.getlocal("acRedLotusWarrior_acCd", [LanguageManager.getlocal("acSpringOutingTimeEnd")]);
        }
        //剩余时间
        this.acCdTxt = ComponentManager.getTextField(timeStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        // this.acCdTxt.x = actimeText.x + actimeText.width + 20;
        this.acCdTxt.x = GameConfig.stageWidth - 10 - this.acCdTxt.width;
        this.acCdTxt.y = actimeText.y;

        this.addChild(this.acCdTxt);


        if (this.defcode == "3") {
            this._code3RedFlag = BaseBitmap.create("acredlotuswarrior_flag");
            this.initCode3Castle();
            this.addChild(this._code3RedFlag);
            this._code3NumFnt = ComponentManager.getBitmapText("0", "prestige_fnt");
            this._code3NumFnt.x = this._code3RedFlag.x + this._code3RedFlag.width / 2;
            this._code3NumFnt.y = this._code3RedFlag.y + this._code3RedFlag.height / 2 - this._code3RedFlag.height / 2 - 10;
            this.addChild(this._code3NumFnt);
        } else if (this.defcode == "5") {
            // this.initPoems();
        } else if(this.defcode == "7"){

        } else {
            this.initEnemy();
        }





        //活动规则文本
        let acruleTxt: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_desc"), [String(this.cfg.cost), "1", String(this.cfg.helmetItemNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        // acruleTxt.textAlign = egret.HorizontalAlign.CENTER;
        acruleTxt.width = 620;
        acruleTxt.lineSpacing = 5;
        acruleTxt.x = actimeText.x;
        acruleTxt.y = actimeText.y + actimeText.height + 5;
        this.addChild(acruleTxt);

        let createPoem = false;
        //第三套为吕布皮肤，表现形式不一样
        if (this.defcode != "3") {
            // 血条
            let progressStr = this.defcode == '5' ? 'acredlotuswarrior-5_progress' : 'progress_blood';
            this.bloodBar = ComponentManager.getProgressBar(progressStr, progressStr + "bg", 500);
            this.bloodBar.x = GameConfig.stageWidth / 2 - this.bloodBar.width / 2;
            this.bloodBar.y = acruleTxtBg.y + acruleTxtBg.height + 30 //+ (GameConfig.stageHeigth - 960) * 0.4;
        
            if (this.defcode != '5') {
                this.bloodBar.y += (GameConfig.stageHeigth - 960) * 0.4;
            } else {
                this.bloodBar.x += 25;
            }
            if(this.defcode == "7"){
                this.bloodBar.y = acruleTxtBg.y + acruleTxtBg.height + 30
            }
            this.addChild(this.bloodBar);

            //已经攻击次数
            this.numBg = BaseBitmap.create(this.getDefaultRes("acredlotuswarrior_numbg"));
            this.numBg.x = this.bloodBar.x - this.numBg.width + 20;
            this.addChild(this.numBg);
            let _y = this.bloodBar.y + this.bloodBar.height / 2 - this.numBg.height / 2;
            if (this.defcode == "5") {
                this.numBg.y = _y + 20;
                createPoem = true;
                this.numText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_progress"), [String(this.vo.chipnum < this.cfg.helmetItemNum ? this.vo.chipnum : this.cfg.helmetItemNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
                this.numText.width = TextFieldConst.FONTSIZE_CONTENT_SMALL * 2;
                this.numText.x = this.numBg.x + 24//this.numBg.width / 2 - this.numText.width / 2;
                this.numText.y = this.numBg.y + 26;//23//48;
                this.numText.textAlign = egret.HorizontalAlign.CENTER;
            } else if(this.defcode == "7"){
                this.numBg.y = _y;
                this.initAssault();
                this.numText = ComponentManager.getTextField(String(this.vo.chipnum + "%"), 20, 0xffedb4);
                // this.numText = ComponentManager.getTextField(String(this.cfg.helmetItemNum - this.vo.chipnum < 0 ? 0 : this.cfg.helmetItemNum - this.vo.chipnum), 20, 0xffedb4);
                this.numText.x = this.numBg.x + this.numBg.width / 2 - this.numText.width / 2;
                this.numText.y = this.numBg.y + 48;
            } else {
                this.numBg.y = _y;
                this.initAssault();
                this.numText = ComponentManager.getTextField(String(this.cfg.helmetItemNum - this.vo.chipnum < 0 ? 0 : this.cfg.helmetItemNum - this.vo.chipnum), 20, 0xffedb4);
                this.numText.x = this.numBg.x + this.numBg.width / 2 - this.numText.width / 2;
                this.numText.y = this.numBg.y + 48;
            }
            this.addChild(this.numText);
            this.initBox();
        }


        this._skinContainer = new BaseDisplayObjectContainer();
        this.addChild(this._skinContainer);
        this.showDBDragon();
        // 1040
        // if(!Api.switchVoApi.checkServantCloseBone()  && RES.hasRes("servant_full2_"+this.cfg.zhentianSkinId+"_ske") && App.CommonUtil.check_dragon() ){

        //     this._npcBM=App.DragonBonesUtil.getLoadDragonBones("servant_full2_"+this.cfg.zhentianSkinId);
        //     this._npcBM.setScale(0.6);
        //     this._npcBM.x = GameConfig.stageWidth - 100;
        //     this._npcBM.y = GameConfig.stageHeigth - 50;
        //     this.addChild(this._npcBM);

        //     if(RES.hasRes("servant_skineffect_fg_"+this.cfg.zhentianSkinId+"_ske")){
        //         this._npcEffect=App.DragonBonesUtil.getLoadDragonBones("servant_skineffect_fg_"+this.cfg.zhentianSkinId);
        //         this._npcEffect.setScale(0.6);
        //         this._npcEffect.x = GameConfig.stageWidth - 100;
        //         this._npcEffect.y = GameConfig.stageHeigth - 50;
        //         this.addChild(this._npcEffect);
        //     }


        // }else{

        //     let skinW =640;
        //     let skinH = 482;
        //     let tarScale = 1.0;
        //     let serCfg = Config.ServantCfg.getServantItemById(this.cfg.zhentianSkinId);
        //     let skinImgPath = serCfg.fullIcon;
        //     this._npcBM = BaseLoadBitmap.create(skinImgPath);
        //     this._npcBM.width = skinW;
        //     this._npcBM.height = skinH;
        //     this._npcBM.setScale(tarScale);
        //     this._npcBM.x = GameConfig.stageWidth/2 - 100;
        //     this._npcBM.y = GameConfig.stageHeigth - this._npcBM.height;
        //     this.addChild(this._npcBM);

        // }
        // 






        // 底部背景
        let buttomBg: BaseBitmap = BaseBitmap.create(this.getDefaultRes("acredlotuswarrior_btnbg",this.defcode));
        buttomBg.y = GameConfig.stageHeigth - buttomBg.height;
        this.addChild(buttomBg);
        this._buttomBg = buttomBg;

        if (this.defcode == "3") {
            let buttommask = BaseBitmap.create("acredlotuswarrior_bottom");
            buttommask.y = GameConfig.stageHeigth - buttommask.height;
            this.addChild(buttommask);
            this._buttomBg.visible = false;
        }

        // 攻击
        this.atkButton = ComponentManager.getButton(this.getDefaultRes("acredlotuswarrior_btn"), null, this.atkClick, this);
        this.atkButton.y = buttomBg.y - 15;
        this.addChild(this.atkButton);

        if (this.defcode == '5') {
            let atkb = this.atkButton;
            atkb.x = 230;
            atkb.y = buttomBg.y - 92;
            //饮酒光效
            let light = BaseBitmap.create("dailytask_box_light");
            light.anchorOffsetX = light.width / 2;
            light.anchorOffsetY = light.height / 2;
            light.scaleX = light.scaleY = 3;
            light.x = atkb.x + atkb.width / 2 - 15;
            light.y = atkb.y + atkb.height / 2 + 10;
            let ind = this.getChildIndex(atkb);
            this.addChildAt(light, ind);
            egret.Tween.get(light, { loop: true }).to({ rotation: light.rotation + 360 }, 10000);
            this._wineLight = light;

            let poemIocn;
            if(this.vo.attacknum >= 10)
            {
                poemIocn = BaseBitmap.create("acredlotuswarrior_name2-5");
            }else{
                poemIocn = BaseBitmap.create("acredlotuswarrior_name-5");
            }

            poemIocn.x = (GameConfig.stageWidth - poemIocn.width) >> 1;
            poemIocn.y = this.atkButton.y + 218;
            this.addChild(poemIocn);
            this._poemIocn = poemIocn;

            let redi_timesbg = BaseBitmap.create("acredlotuswarrior_residual_times-5");
            redi_timesbg.x = 10;
            redi_timesbg.y = poemIocn.y + (poemIocn.height - redi_timesbg.height) - 2;
            this.addChild(redi_timesbg);
            this._redi_timesbg = redi_timesbg;

            this.atkCountTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_atkvalue"), [String(this.vo.attacknum)]), 18, TextFieldConst.COLOR_WARN_YELLOW);
            this.atkCountTxt.x = redi_timesbg.x + 15;

            this.atkCountTxt.y = redi_timesbg.y + 4;
            this.addChild(this.atkCountTxt);
        } else if(this.defcode == "3"){
            //平定
            this.atkButton.x = GameConfig.stageWidth/2 - this.atkButton.width/2;//buttomBg.x + buttomBg.width / 2 - this.atkButton.width / 2;
            this.atkButton.y = GameConfig.stageHeigth - this.atkButton.height - 10;
            this.btnText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_btn")), 30, TextFieldConst.COLOR_BROWN);
            this.btnText.x = this.atkButton.x + this.atkButton.width / 2 - this.btnText.width / 2;
            this.btnText.y = this.atkButton.y + 23;
            this.addChild(this.btnText);
            //可攻击次数
            this.atkCountTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_atkvalue"), [String(this.vo.attacknum)]), 18, TextFieldConst.COLOR_BROWN);
            this.atkCountTxt.x = this.atkButton.x + this.atkButton.width / 2 - this.atkCountTxt.width / 2;
            this.atkCountTxt.y = this.btnText.y + this.btnText.height + 2;
            this.addChild(this.atkCountTxt);   
        } else if(this.defcode == "7"){
            this.atkButton.x = buttomBg.x + buttomBg.width / 2 - this.atkButton.width / 2;
            this.btnText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_btn")), 30, TextFieldConst.COLOR_BROWN);
            this.btnText.x = this.atkButton.x + this.atkButton.width / 2 - this.btnText.width / 2;
            this.btnText.y = this.atkButton.y + this.atkButton.height/2 - this.btnText.height/2;
            this.addChild(this.btnText);
            //可攻击次数
            this.atkCountTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_atkvalue"), [String(this.vo.attacknum)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            this.atkCountTxt.x = this.atkButton.x + this.atkButton.width / 2 - this.atkCountTxt.width / 2;
            this.atkCountTxt.y = this.btnText.y + this.btnText.height + 27;
            this.addChild(this.atkCountTxt);
            
        } else {
            this.atkButton.x = buttomBg.x + buttomBg.width / 2 - this.atkButton.width / 2;
            this.btnText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_btn")), 30, TextFieldConst.COLOR_BROWN);
            this.btnText.x = this.atkButton.x + this.atkButton.width / 2 - this.btnText.width / 2;
            this.btnText.y = this.atkButton.y + 23;
            this.addChild(this.btnText);
            //可攻击次数
            this.atkCountTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_atkvalue"), [String(this.vo.attacknum)]), 18, TextFieldConst.COLOR_BROWN);
            this.atkCountTxt.x = this.atkButton.x + this.atkButton.width / 2 - this.atkCountTxt.width / 2;
            this.atkCountTxt.y = this.btnText.y + this.btnText.height + 2;
            this.addChild(this.atkCountTxt);
        }


        if (this.code == "2") {
            let off = BaseLoadBitmap.create("acredlotuswarrior_off");
            off.width = 150;
            off.height = 122;
            off.x = this.atkButton.x - 50;
            off.y = this.atkButton.y - 70;
            this.addChild(off);
        }


        let infoBtn = ComponentManager.getButton("acredlotuswarrior_infobtn", null, this.infoBtnListener, this);
        infoBtn.x = GameConfig.stageWidth - infoBtn.width - 10;
        infoBtn.y = GameConfig.stageHeigth - infoBtn.height - 25;
        this.addChild(infoBtn);



        this.refreshData();
        this.checkIsWin();
        if(this.defcode == "7"){
            this.randomSay();
        } else {
            this._talkContainer = new BaseDisplayObjectContainer();
            let talkBg = BaseBitmap.create(this.getDefaultRes("acredlotuswarrior_talkbg"));
            talkBg.x = 0;
            talkBg.y = 0;
            this._talkContainer.width = talkBg.width;
            this._talkContainer.height = talkBg.height;
            this._talkContainer.addChild(talkBg);

            let talkText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_talk")), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
            // talkText.width = 300;
            talkText.x = talkBg.width / 2 - talkText.width / 2;
            talkText.y = 55 - talkText.height / 2;
            this._talkContainer.addChild(talkText);

            this._talkContainer.x = 70;
            this._talkContainer.y = GameConfig.stageHeigth - 375;
            this.addChild(this._talkContainer);
            this._talkContainer.visible = false;

            if (this.defcode == "3") {
                // talkBg.scaleX = -1;
                this._talkContainer.x = 170;
                this._talkContainer.y = GameConfig.stageHeigth - 450;
                talkText.x = talkBg.x + talkBg.width / 2 - talkText.width / 2;
            }
        }

        if (createPoem) {
            this.initPoems();
        }

        if(this.defcode == "7"){
            // if (AcBuildingWorshipView.reportShowed[this.code] == 0) {
                if (this.vo.chipnum < this.cfg.helmetItemNum) {
                    ViewController.getInstance().openView(ViewConst.BASE.ACREDLOTUSWARRIORREPORTVIEW,{aid:this.aid,code:this.code});
                }
                // AcBuildingWorshipView.reportShowed[this.code] = 1;
            // }
        }



    }
	private attackHandle():void
	{
        this.randomAtkSay();
        let moveTime1:number = 60;
        let moveTime2:number = 260;
        let scaleTo:number = 0.85;
       
        let moveX = this.lvbuNode.x + this.lvbuNode.width/2 - this.lvbuNode.width * 0.85 / 2;
        let moveY = GameConfig.stageHeigth - 600;
        let moveTo:egret.Point = egret.Point.create( moveX ,moveY);
        console.log(moveTo.x);
        egret.Tween.get(this.lvbuNode)
        .wait(720)
        .call(()=>{
            this.showCode7Ani();
        },this)	
        .wait(80)
        .to({x : this.lvbuNode.x, y : this.lvbuNode.y - 100},300)//后移	
        
        .to({y:moveTo.y,scaleX:scaleTo,scaleY:scaleTo,},moveTime1)
        .call(this.playShake7,this)
        .to({x:this.lvbuX,y:this.lvbuY,scaleX : this.lvbuScale, scaleY : this.lvbuScale},moveTime2)
        // .wait(100)
       
        .call(this.stopShake,this);
            // egret.Tween.get(this.lvbuNode)
            // .to({x : this.lvbuX, y : this.lvbuY - 50},100)//后移		
            // .to({x:this.lvbuX,y:this.lvbuY},120)    
        // let moveTime1:number = 60;
        // let moveTime2:number = 260;
        // let scaleTo:number = 0.75;
        // let moveY = GameConfig.stageHeigth;
        // let moveTo:egret.Point = egret.Point.create( this.lvbuNode.x + (1-scaleTo)*this.lvbuNode.width/2 ,moveY);
        // egret.Tween.get(this.lvbuNode)
        // .wait(7000)
        // .to({x : this.lvbuNode.x, y : this.lvbuNode.y - 100},300)//后移		
        // .call( this.showCode7Ani,this);
        // .to({x:moveTo.x,y:moveTo.y,scaleX:scaleTo,scaleY:scaleTo,},moveTime1)
        // .call(()=>{
        //     this.beAttackHand(false);
        // },this)
        // .to({x:this.lvbuX,y:this.lvbuY,scaleX : this.lvbuScale, scaleY : this.lvbuScale},moveTime2)
        // .call(()=>{
        //     this.attackWanjiaHandle();
        // });
        
	}
    private randomAtkSay(){
        if(!this._randomTalkContainer){
            this._randomTalkContainer = new BaseDisplayObjectContainer();
            this.addChild(this._randomTalkContainer);
            this._randomTalkBg = BaseBitmap.create("acredlotuswarrior_talkbg-7");
            this._randomTalkBg.scaleX = 0.65;
            this._randomTalkBg.scaleY = 0.65;

            this._randomTalkContainer.addChild(this._randomTalkBg);
            this._randomTalkBg.x = GameConfig.stageWidth /2 + 90;
            this._randomTalkBg.y = GameConfig.stageHeigth/2 - 220;
            
        }
        
        let randomTalkTextId = Math.floor(Math.random() * 5) + 1;
        let randomTalkTextKey = "acRedLotusWarrior_talkA" + randomTalkTextId + "-7";
        if(!this._randomTalkText){
            this._randomTalkText = ComponentManager.getTextField(LanguageManager.getlocal(randomTalkTextKey),18,TextFieldConst.COLOR_LIGHT_YELLOW);
            this._randomTalkContainer.addChild(this._randomTalkText);
        }
        if(this._randomTalkText){
            this._randomTalkText.text = LanguageManager.getlocal(randomTalkTextKey);
        }
        this._randomTalkText.x = this._randomTalkBg.x + 20;
        this._randomTalkText.y = this._randomTalkBg.y + 20;

        egret.Tween.removeTweens(this._randomTalkContainer);

        this._randomTalkContainer.visible = false;
        egret.Tween.get(this._randomTalkContainer)
        .set({visible:true})
        .to({alpha:1},200)
        .wait(1000)
        .to({alpha:0},200)
        .set({visible:false});
        // .call(()=>{
        //     egret.Tween.removeTweens(this._randomTalkContainer);
        //     this.randomSay();
        // },this);  
    }
    private randomSay(){

        if(!this._randomTalkContainer){
            this._randomTalkContainer = new BaseDisplayObjectContainer();
            this.addChild(this._randomTalkContainer);
            this._randomTalkBg = BaseBitmap.create("acredlotuswarrior_talkbg-7");
            this._randomTalkBg.scaleX = 0.65;
            this._randomTalkBg.scaleY = 0.65;

            this._randomTalkContainer.addChild(this._randomTalkBg);
            this._randomTalkBg.x = GameConfig.stageWidth /2 + 90;
            this._randomTalkBg.y = GameConfig.stageHeigth/2 - 220;
            
        }

        
        let randomTalkTextId = Math.floor(Math.random() * 5) + 1;
        let randomTalkTextKey = "acRedLotusWarrior_talk" + randomTalkTextId + "-7";
        if(!this._randomTalkText){
            this._randomTalkText = ComponentManager.getTextField(LanguageManager.getlocal(randomTalkTextKey),18,TextFieldConst.COLOR_LIGHT_YELLOW);
            this._randomTalkContainer.addChild(this._randomTalkText);
        }
        if(this._randomTalkText){
            this._randomTalkText.text = LanguageManager.getlocal(randomTalkTextKey);
        }
        this._randomTalkText.x = this._randomTalkBg.x + 20;
        this._randomTalkText.y = this._randomTalkBg.y + 20;
        egret.Tween.get(this._randomTalkContainer)
        .set({visible:true})
        .to({alpha:1},200)
        .wait(3000)
        .to({alpha:0},200)
        .set({visible:false})
        .wait(3000)
        .call(()=>{
            egret.Tween.removeTweens(this._randomTalkContainer);
            this.randomSay();
        },this);

    }
    protected getSoundBgName(): string {
        return SoundConst.MUSIC_ALLIANCEBOSSBATTLE;
    }
    private showDBDragon() {
        if(this.defcode == "7"){
            return;
        }
        if (!Api.switchVoApi.checkServantCloseBone() && RES.hasRes("servant_full2_" + this.cfg.zhentianSkinId + "_ske") && App.CommonUtil.check_dragon()) {

            if (this._npcBM == null) {
                let _npcBM = App.DragonBonesUtil.getLoadDragonBones("servant_full2_" + this.cfg.zhentianSkinId);
                this._npcBM = _npcBM;
                _npcBM.setScale(0.6);
                this._skinContainer.addChild(_npcBM);
                if (this.defcode == "3") {
                    // this._npcBM.setScale(0.5);
                    _npcBM.x = 120;
                    _npcBM.y = GameConfig.stageHeigth - 100;
                } else if (this.defcode == "5") {
                    _npcBM.setScale(0.8);
                    _npcBM.x = ((GameConfig.stageWidth - _npcBM.width) >> 1) - 28;
                    _npcBM.y = GameConfig.stageHeigth - 170;
                    _npcBM.setDragonBoneEventListener(dragonBones.EventObject.LOOP_COMPLETE, () => {
                        _npcBM.playDragonMovie('idle', 0);
                    }, this);
                } else {
                    _npcBM.x = GameConfig.stageWidth - 100;
                    _npcBM.y = GameConfig.stageHeigth - 50;
                }
            }
            if (RES.hasRes("servant_skineffect_fg_" + this.cfg.zhentianSkinId + "_ske")) {
                if (this._npcEffect == null) {
                    this._npcEffect = App.DragonBonesUtil.getLoadDragonBones("servant_skineffect_fg_" + this.cfg.zhentianSkinId);
                    this._npcEffect.setScale(0.6);
                    this._npcEffect.x = GameConfig.stageWidth - 100;
                    this._npcEffect.y = GameConfig.stageHeigth - 50;
                    this._skinContainer.addChild(this._npcEffect);
                }

            }


        } else {

            let skinW = 640;
            let skinH = 482;
            let tarScale = 1.0;
            // let serCfg = Config.ServantCfg.getServantItemById(this.cfg.zhentianSkinId);
            let serSkincfg = Config.ServantskinCfg.getServantSkinItemById(this.cfg.zhentianSkinId);
            let skinImgPath = serSkincfg.body;
            if (this._npcBM == null) {
                this._npcBM = BaseLoadBitmap.create(skinImgPath);
                this._npcBM.width = skinW;
                this._npcBM.height = skinH;
                this._npcBM.setScale(tarScale);
                this._npcBM.x = GameConfig.stageWidth / 2 - 100;
                this._npcBM.y = GameConfig.stageHeigth - this._npcBM.height;
                this._skinContainer.addChild(this._npcBM);
                if (this.defcode == "3") {
                    // this._npcBM.setScale(0.8);
                    this._npcBM.x = -200;
                    this._npcBM.y = GameConfig.stageHeigth - this._npcBM.height * 0.8 - 80;
                } else if (this.defcode == '5') {
                    this._npcBM.x = (GameConfig.stageWidth - skinW) >> 1;
                    this._npcBM.y = GameConfig.stageHeigth - skinH - 200;
                }
            }


        }
    }


    private checkIsWin() {
        // if(this.code == "3"){return;}
        let isWin = false;
        if (this.vo.chipnum >= this.cfg.helmetItemNum) {
            isWin = true;
        }

        if (!this._isWin && isWin) {
            this._isWin = true;
            for (let i = 0; i < this._enemyList.length; i++) {
                this._enemyContainer.removeChild(this._enemyList[i]);

            }

            this.atkButton.setEnable(false);
            if (this.defcode != '5') {
                this.btnText.text = LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_btn"));
                this.btnText.x = this.atkButton.x + this.atkButton.width / 2 - this.btnText.width / 2;
                this.btnText.y = this.atkButton.y + this.atkButton.height / 2 - this.btnText.height / 2;
                App.DisplayUtil.changeToGray(this.btnText);

                if(this.defcode != "7"){
                    let win = BaseBitmap.create(this.getDefaultRes("acredlotuswarrior_win"));
                    win.x = GameConfig.stageWidth / 2 - win.width / 2;
                    win.y = GameConfig.stageHeigth / 2 - win.height / 2;
                    this.addChild(win);
                }


            } else {
                if (this._redi_timesbg) {
                    this.removeChild(this._redi_timesbg);
                }
                if (this._wineLight) {
                    egret.Tween.removeTweens(this._wineLight);
                    this.removeChild(this._wineLight);
                }
                if (this._poemIocn) {
                    App.DisplayUtil.changeToGray(this._poemIocn);
                    if(this.vo.attacknum >= 10)
                    {
                        this._poemIocn.setRes ("acredlotuswarrior_name2-5");
                    }else{
                        this._poemIocn.setRes ("acredlotuswarrior_name-5");
                    }
                }
            }
            this.atkCountTxt.visible = false;


            if (!Api.switchVoApi.checkServantCloseBone() && RES.hasRes("servant_full2_" + this.cfg.zhentianSkinId + "_ske") && App.CommonUtil.check_dragon()) {
                if (this.defcode != "3" && this.defcode!="7") {
                    this._npcBM.x = GameConfig.stageWidth / 2;
                }
                if (RES.hasRes("servant_skineffect_fg_" + this.cfg.zhentianSkinId + "_ske")) {
                    this._npcEffect.x = GameConfig.stageWidth / 2;
                }

            } else {
                if (this.defcode != "3"&& this.defcode!="7") {
                    this._npcBM.x = GameConfig.stageWidth / 2 - this._npcBM.width / 2 * this._npcBM.scaleX;
                }
            }

        }
    }

    private npcTalk() {

        this._talkContainer.visible = true;
        egret.Tween.get(this._talkContainer)
            .wait(1200)
            .set({ visible: false });

    }

    // private screenShake(){
    //     if(this._isShake){
    //         return;

    //     }
    //     let posX = this.x;
    //     let posY= this.y;
    //     egret.Tween.get(this._bigBg, { loop: true }).call(() => {

    //         let randomX = 10 * Math.random() - 5;
    //         let randomY = 10 * Math.random() - 5;
    //         this.x = posX + randomX;
    //         this.y = posY + randomY;

    //     }, this).wait(20);

    // }
    private playShake7() {
        if (this._isShake) {
            return;
        }

        
        this._isShake = true;
        let posX = this.x;
        let posY = this.y;
        egret.Tween.get(this._bigBg, { loop: true }).call(() => {

            let randomX = 10 * Math.random() - 10;
            let randomY = 10 * Math.random() - 10;
            this.x = posX + randomX;
            this.y = posY + randomY;

        }, this).wait(30);
    }
    private playShake() {
        if (this._isShake) {
            return;
        }
       
        this.npcTalk();
        
        
        this._isShake = true;
        let posX = this.x;
        let posY = this.y;
        egret.Tween.get(this._bigBg, { loop: true }).call(() => {

            let randomX = 10 * Math.random() - 5;
            let randomY = 10 * Math.random() - 5;
            this.x = posX + randomX;
            this.y = posY + randomY;

        }, this).wait(20);
    }
    private stopShake() {
        this._isShake = false;
        this.x = 0;
        this.y = 0;
        egret.Tween.removeTweens(this._bigBg);
    }
    // private playEnemyShakeAni(event: egret.Event) {
    // 	let offest = event.data.offest;
    // 	let type = event.data.type;
    // 	let posX = 0;
    // 	let posY = 0;
    // 	this._enemyContainer.setPosition(posX + offest, posY + offest);


    // }


    /**初始化敌兵 */
    private initEnemy() {

        this._enemyContainer = new BaseDisplayObjectContainer();
        this.addChild(this._enemyContainer);

        this._npcClip1 = ComponentManager.getCustomMovieClip("acredlotuswarrioridle", 5, 300);
        this._npcClip1.setPosition(186, GameConfig.stageHeigth - 472);
        this._enemyContainer.addChild(this._npcClip1);
        this._npcClip1.playWithTime(-1);

        this._npcClip2 = ComponentManager.getCustomMovieClip("acredlotuswarrioratk", 2, 100);
        this._npcClip2.setPosition(189, GameConfig.stageHeigth - 477);
        this._enemyContainer.addChild(this._npcClip2);
        this._npcClip2.playWithTime(1);
        this._npcClip2.setVisible(false);


        for (let i = 0; i < this._enemyPosCfg.length; i++) {
            let posCfg = this._enemyPosCfg[i];
            let enemy = BaseLoadBitmap.create(this.getDefaultRes("acredlotuswarrior_enemy" + String(i + 1)));
            // enemy.setPosition(posCfg.x, GameConfig.stageHeigth - posCfg.height - posCfg.y);
            enemy.setPosition(this._bigBg.x + posCfg.x, this._bigBg.y + posCfg.y);
            this._enemyContainer.addChild(enemy);
            enemy.name = String(i);
            this._enemyList.push(enemy);

        }
    }
    /**初始化诗文部分 */
    private initPoems() {
        //碰酒暗背景
        let _wineBG = new BaseShape, gra = _wineBG.graphics;
        this.addChild(_wineBG);
        this._wineBG = _wineBG;
        _wineBG.touchEnabled = true;
        _wineBG.visible = false;
        gra.beginFill(0x000000, 0.4);
        gra.drawRect(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth);
        gra.endFill();
        //诗文及碰酒部分
        let container: BaseDisplayObjectContainer = new BaseDisplayObjectContainer;
        this._poemContainer = container;
        this.addChild(container);
        container.visible = false;
        container.y = 295;
        container.x = 418;
        //创建纸
        let paper1 = BaseBitmap.create('acredlotuswarrior_poem_bg');
        this._paper1 = paper1;
        container.addChild(paper1);
        paper1.visible = false;
        container.width = paper1.width;
        container.height = paper1.height * 2;

        let paper2 = BaseBitmap.create('acredlotuswarrior_poem_bg');
        this._paper2 = paper2;
        container.addChild(paper2);
        paper2.visible = false;
        paper2.rotation = 180;
        paper2.x = 214;
        paper2.y = 438;

        //创建笔
        let brush = BaseBitmap.create('acredlotuswarrior_poem_brush');
        this._brush = brush;
        container.addChild(brush);
        brush.visible = false;
        //创建诗句文本,
        let poemtext1 = BaseBitmap.create('acredlotuswarrior_poem1');
        container.addChild(poemtext1);
        this._poemText1 = poemtext1;
        let poemtext2 = BaseBitmap.create('acredlotuswarrior_poem1');
        container.addChild(poemtext2);
        this._poemText2 = poemtext2;
        //创建碰酒动画
        if (App.CommonUtil.check_dragon()) {
            let wine = App.DragonBonesUtil.getLoadDragonBones('jiubei');
            this._wine = wine;
            wine.visible = false;
            wine.setScale(0.8);
            wine.x = ((GameConfig.stageWidth - wine.width) >> 1) - 33;
            wine.y = GameConfig.stageHeigth - 175;
            wine.setDragonBoneEventListener(dragonBones.EventObject.LOOP_COMPLETE, () => {
                if (wine.getLastFrameName() == 'appear') {
                    wine.visible = false;
                    this.showPaper();
                }
                wine.playDragonMovie('idle', 0);
            }, this);
            this.addChild(wine);
        }
    }
    /**初始化骑兵 */
    private initAssault() {
        this._assaultList1.length = 0;
        this._assaultList2.length = 0;
        this._assaultList3.length = 0;
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < this._assaultCfg1.length; i++) {
                let assaultCfg = this._assaultCfg1[i];
                let assault = ComponentManager.getCustomMovieClip("acredlotuswarrioraulteffect", 5, 70);
                assault.anchorOffsetX = 227;
                assault.anchorOffsetY = 40;
                assault.rotation = -35;
                assault.alpha = assaultCfg.alpha;
                assault.setPosition(assaultCfg.x, GameConfig.stageHeigth - assaultCfg.y);
                this.addChild(assault);
                assault.playWithTime(-1);
                let key = "_assaultList" + String(Number(j) + 1);
                this[key].push(assault);
            }
        }

    }
    /**
	 * 宝箱的返回数据
	 */
    private receiveBoxHandle(event: egret.Event) {
        let ret = event.data.ret
        let data = event.data.data.data;
        if (ret) {
            let rewards = data.rewards;
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "isPlayAni": true });


            this.refreshData();
        }

    }

    private initCode3Castle() {
        let CastleposCfg = this.code3CastleposCfg;

        // acredlotuswarrior_ground1
        let max = this.vo.maxHelmetNeedNum();
        let helmetNum = this.cfg.helmetNum;

        for (let i = 0; i < helmetNum.length; i++) {
            let helmetObj = helmetNum[i];

            let flagType = i == helmetNum.length - 1 ? 2 : 1;//i < helmetNum.length/2 ? 1:2;

            let flagObj = new BaseDisplayObjectContainer();
            flagObj.width = 58;
            flagObj.height = 58;
            flagObj.name = "flag" + i;

            flagObj.x = CastleposCfg[i].x;
            flagObj.y = CastleposCfg[i].y;
            this.addChild(flagObj);

            let flagBg = BaseBitmap.create(CastleposCfg[i].img);
            flagBg.x = 0;
            flagBg.y = 0;
            flagBg.name = "flagBg";
            flagObj.addChild(flagBg);

            let flag_arrow = BaseBitmap.create("acredlotuswarrior_arrow2");
            flag_arrow.x = CastleposCfg[i].arrx;
            flag_arrow.y = CastleposCfg[i].arry;
            flag_arrow.scaleX = CastleposCfg[i].scalex;
            flag_arrow.scaleY = CastleposCfg[i].scaley;
            flag_arrow.name = "flag_arrow";
            flagObj.addChild(flag_arrow);

            flagObj["flagBg"] = flagBg;
            flagObj["flag_arrow"] = flag_arrow;

            if (this.vo.checkBoxCollected(i)) {
                flagBg.texture = ResourceManager.getRes(CastleposCfg[i].img + "_1");
                //已经领取了
            } else {
                flagBg.texture = ResourceManager.getRes(CastleposCfg[i].img);
            }

            if (this.vo.chipnum >= helmetObj.needNum) {
                flag_arrow.texture = ResourceManager.getRes("acredlotuswarrior_arrow1");
            } else {
                flag_arrow.texture = ResourceManager.getRes("acredlotuswarrior_arrow2");
            }
            if (i == 0) {
                this._clickHand = BaseBitmap.create("guide_hand");
                this._clickHand.x = flagBg.width / 2;
                this._clickHand.y = flagBg.height / 2;
                flagObj.addChild(this._clickHand);
                this._clickHand.visible = false;
                egret.Tween.get(this._clickHand, { loop: true })
                    .to({ scaleX: 0.9, scaleY: 0.9 }, 500)
                    .to({ scaleX: 1, scaleY: 1 }, 500);
            }
            // this.vo.chipnum / this.cfg.helmetItemNum
            let curidx = i;
            flagObj.addTouchTap(() => {
                if (!this.vo.isAcTimeOut()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                    return;
                }

                let voNum = this.vo.chipnum;
                let isRevice = this.vo.checkBoxCollected(curidx);
                let needNum = helmetObj.needNum;

                if (needNum <= voNum) {
                    if (!isRevice) {

                        //判断如果没有门客 不能领取
                        // if(curidx == helmetNum.length - 1 && !Api.servantVoApi.getServantObj(String(this.cfg.sevantID))){
                        //     App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_noservent")));
                        //     return;
                        // }
                        NetManager.request(NetRequestConst.ACTIVITY_REDLOTUSWARRIORNUMREWARD, { activeId: this.activityId, levelId: curidx + 1 });
                        return;
                    }
                }

                let rewardList = helmetObj.getReward;
                let itemcfg = {
                    needNum: needNum,
                    getReward: rewardList
                };

                //最后一个宝箱 现实门课皮肤
                if (curidx == helmetNum.length - 1) {

                    itemcfg = {
                        needNum: helmetObj.needNum,
                        getReward: this.cfg.helmetReward + "|" + helmetObj.getReward
                    };

                }
                let islast = 0;
                if (curidx == helmetNum.length - 1) {
                    islast = 1;
                }

                ViewController.getInstance().openView(ViewConst.POPUP.ACREDLOTUSWARRIORREWARDINFOPOPUPVIEW, { "code": this.code, "aid": this.aid, "itemCfg": itemcfg, islast: islast });
            }, this);
        }
    }
    //进度条物品箱
    private initBox() {
        let max = this.vo.maxHelmetNeedNum();
        let helmetNum = this.cfg.helmetNum;
        for (let i = 0; i < helmetNum.length; i++) {
            let helmetObj = helmetNum[i];

            let flagType: string | number = i == helmetNum.length - 1 ? 2 : 1;//i < helmetNum.length/2 ? 1:2;
            let str = '', showBG = true;
            if (this.defcode == '5') {
                flagType = '';
                showBG = false;
                if (i == helmetNum.length - 1) {
                    str = '1';
                }
            }
            if(this.defcode == "7"){
                showBG = false;
            }

            let flagObj = new BaseDisplayObjectContainer();
            flagObj.width = 58;
            flagObj.height = 58;
            flagObj.name = "flag" + i;

            flagObj.x = this.bloodBar.x + this.bloodBar.width * (helmetObj.needNum / max) - flagObj.width / 2;
            flagObj.y = this.bloodBar.y + this.bloodBar.height / 2 - flagObj.height / 2;
            this.addChild(flagObj);

            let flagBg = BaseBitmap.create(this.getDefaultRes("acredlotuswarrior_flagbg"));
            flagBg.x = 0;
            flagBg.y = 0;
            flagBg.name = "flagBg";
            flagObj.addChild(flagBg);
            flagBg.visible = showBG;


            flagObj["light"] = BaseBitmap.create("dailytask_box_light");
            flagObj["light"].anchorOffsetX = flagObj["light"].width / 2;
            flagObj["light"].anchorOffsetY = flagObj["light"].height / 2;
            flagObj["light"].x = flagObj.width / 2;
            flagObj["light"].y = flagObj.height / 2;
           
            flagObj.addChild(flagObj["light"]);

            // console.log(this.getDefaultRes("acredlotuswarrior_flag" + str + flagType,this.defcode));
            flagObj["flag"] = BaseBitmap.create(this.getDefaultRes("acredlotuswarrior_flag" + str + flagType,this.defcode));
            flagObj["flag"].x = flagObj.width / 2 - flagObj["flag"].width / 2;
            flagObj["flag"].y = flagObj.height / 2 - flagObj["flag"].height / 2;
            flagObj["flag"].name = "flag";
            if(this.defcode == "7" && flagType == 1){
                flagObj["flag"].scaleX = 0.8;
                flagObj["flag"].scaleY = 0.8;
                flagObj["flag"].x = flagObj.width / 2 - flagObj["flag"].width * 0.8 / 2;
                flagObj["flag"].y = flagObj.height / 2 - flagObj["flag"].height * 0.8 / 2 - 10;

            }
            if(this.defcode == "7" && flagType == 2){
                flagObj["flag"].x = flagObj.width / 2 - flagObj["flag"].width * 0.8 / 2;
                flagObj["flag"].y = flagObj.height / 2 - flagObj["flag"].height * 0.8 / 2 - 20;
                flagObj["light"].scaleX = 1.2;
                flagObj["light"].scaleY = 1.2;
            }
            flagObj.addChild(flagObj["flag"]);
            // console.log(this.defcode);
            // console.log(this.getDefaultRes("acredlotuswarrior_flagbreak" + flagType,this.defcode));
            flagObj["flagbreak"] = BaseBitmap.create(this.getDefaultRes("acredlotuswarrior_flagbreak" + flagType,this.defcode));
            flagObj["flagbreak"].x = flagObj.width / 2 - flagObj["flagbreak"].width / 2;
            flagObj["flagbreak"].y = flagObj.height / 2 - flagObj["flagbreak"].height / 2;
            flagObj["flagbreak"].name = "flagbreak";
            flagObj.addChild(flagObj["flagbreak"]);

            if(this.defcode == "7" && flagType == 1){
                flagObj["flagbreak"].scaleX = 0.8;
                flagObj["flagbreak"].scaleY = 0.8;
                flagObj["flagbreak"].x = flagObj.width / 2 - flagObj["flagbreak"].width * 0.8 / 2;
                flagObj["flagbreak"].y = flagObj.height / 2 - flagObj["flagbreak"].height * 0.8 / 2 - 10;

            }
            if(this.defcode == "7" && flagType == 2){
                flagObj["flagbreak"].x = flagObj.width / 2 - flagObj["flagbreak"].width * 0.8 / 2;
                flagObj["flagbreak"].y = flagObj.height / 2 - flagObj["flagbreak"].height * 0.8 / 2 - 20;
            }



            if (this.vo.checkBoxCollected(i)) {
                //已经领取了
                flagObj["light"].visible = false;
                egret.Tween.removeTweens(flagObj["light"]);
                flagObj["flag"].visible = false;
                flagObj["flagbreak"].visible = true;
            } else {
                if (this.vo.chipnum >= helmetObj.needNum) {
                    flagObj["light"].visible = true;
                    egret.Tween.get(flagObj["light"], { loop: true }).to({ rotation: flagObj["light"].rotation + 360 }, 10000);
                } else {
                    egret.Tween.removeTweens(flagObj["light"]);
                    flagObj["light"].visible = false;
                }
                flagObj["flag"].visible = true
                flagObj["flagbreak"].visible = false;
            }

            let curidx = i;
            flagObj.addTouchTap(() => {
                if (!this.vo.isAcTimeOut()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                    return;
                }

                let voNum = this.vo.chipnum;
                let isRevice = this.vo.checkBoxCollected(curidx);
                let needNum = helmetObj.needNum;

                if (needNum <= voNum) {
                    if (!isRevice) {

                        //判断如果没有门客 不能领取
                        // if(curidx == helmetNum.length - 1 && !Api.servantVoApi.getServantObj(String(this.cfg.sevantID))){
                        //     App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_noservent")));
                        //     return;
                        // }
                        NetManager.request(NetRequestConst.ACTIVITY_REDLOTUSWARRIORNUMREWARD, { activeId: this.activityId, levelId: curidx + 1 });
                        return;
                    }
                }

                let rewardList = helmetObj.getReward;
                let itemcfg = {
                    needNum: helmetObj.needNum,
                    getReward: helmetObj.getReward
                };

                //最后一个宝箱 现实门课皮肤
                if (curidx == helmetNum.length - 1) {

                    itemcfg = {
                        needNum: helmetObj.needNum,
                        getReward: this.cfg.helmetReward + "|" + helmetObj.getReward
                    };

                }
                let islast = 0;
                if (curidx == helmetNum.length - 1) {
                    islast = 1;
                }

                ViewController.getInstance().openView(ViewConst.POPUP.ACREDLOTUSWARRIORREWARDINFOPOPUPVIEW, { "code": this.code, "aid": this.aid, "itemCfg": itemcfg, islast: islast });
            }, this);
        }
    }

    private infoBtnListener() {
        // let ReviewReward = this.cfg.ReviewReward;
        // let skinId = ReviewReward.split("_")[1];
        if (this._npcBM) {
            this._npcBM.dispose();
            this._npcBM = null;
        }
        if (this._npcEffect) {
            this._npcEffect.dispose();
            this._npcEffect = null;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.SERVANTSKINCHANGEVIEW, { servantId: this.cfg.sevantID, skinId: this.cfg.zhentianSkinId, isDisplay: true });

    }

    private tick() {
        let deltaT = this.acVo.et - GameData.serverTime;
        let timeStr = "";
        if (deltaT > 0) {
            timeStr = LanguageManager.getlocal("acRedLotusWarrior_acCd", [App.DateUtil.getFormatBySecond(deltaT, 8)]);

        } else {
            timeStr = LanguageManager.getlocal("acRedLotusWarrior_acCd", [LanguageManager.getlocal("acSpringOutingTimeEnd")]);
        }
        this.acCdTxt.text = timeStr;
        this.acCdTxt.x = GameConfig.stageWidth - 10 - this.acCdTxt.width;

    }
    // 刷新数据
    private refreshData() {
        let helmetNum = this.cfg.helmetNum;
        this.atkCountTxt.text = LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_atkvalue"), [String(this.vo.attacknum)]);
        if (this.defcode != '5') {
            if (this.vo.attacknum >= 10) {
                this.btnText.text = LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_btnten"));
            } else {
                this.btnText.text = LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_btn"));
            }
            this.btnText.x = this.atkButton.x + this.atkButton.width / 2 - this.btnText.width / 2;
            this.atkCountTxt.x = this.atkButton.x + this.atkButton.width / 2 - this.atkCountTxt.width / 2;
            // } else {
            //     this.atkCountTxt.text = LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_atkvalue"), [String(this.vo.attacknum)]);
        }else{
            if(this._poemIocn)
            {
                if(this.vo.attacknum >= 10)
                {
                    this._poemIocn.setRes ("acredlotuswarrior_name2-5");
                }else{
                    this._poemIocn.setRes ("acredlotuswarrior_name-5");
                }
            }
            
        }

        if (this.defcode == "3") {
            this._code3NumFnt.text = (this.vo.chipnum / this.cfg.helmetItemNum * 100).toFixed(0) + "%";
            for (let i = 0; i < helmetNum.length; i++) {
                let flagObj = <BaseDisplayObjectContainer>this.getChildByName("flag" + i);
                let flagBg = flagObj["flagBg"];
                let flag_arrow = flagObj["flag_arrow"];


                let helmetObj = helmetNum[i];
                let poscfg = this.code3CastleposCfg[i];
                let needNum = helmetObj.needNum;
                if (this.vo.chipnum < helmetObj.needNum && i == 0) {
                    let deltaV = this.vo.chipnum / helmetObj.needNum;
                    this._code3RedFlag.x = poscfg.x + poscfg.arrx + 100 * deltaV * poscfg.scalex - 5;
                    this._code3RedFlag.y = poscfg.y + poscfg.arry + 60 * poscfg.scaley * (1 - deltaV) - this._code3RedFlag.height + 12;
                }
                if (this.vo.chipnum <= helmetObj.needNum && i > 0 && this.vo.chipnum > helmetNum[i - 1].needNum) {
                    let deltaV = (this.vo.chipnum - helmetNum[i - 1].needNum) / (helmetObj.needNum - helmetNum[i - 1].needNum);
                    this._code3RedFlag.x = poscfg.x + poscfg.arrx + 100 * deltaV * poscfg.scalex - 5;
                    this._code3RedFlag.y = poscfg.y + poscfg.arry + 60 * poscfg.scaley * (1 - deltaV) - this._code3RedFlag.height + 12;
                }

                let xia_cus = <CustomMovieClip>flagObj.getChildByName("xia_cus");//  CustomMovieClip
                let shang_cus = <CustomMovieClip>flagObj.getChildByName("shang_cus");//  CustomMovieClip
                if (this.vo.chipnum >= helmetObj.needNum) {
                    flag_arrow.texture = ResourceManager.getRes("acredlotuswarrior_arrow1");
                } else {
                    flag_arrow.texture = ResourceManager.getRes("acredlotuswarrior_arrow2");
                }

                let iscollect = this.vo.checkBoxCollected(i);
                if (i == 0) {
                    this._clickHand.visible = this.vo.chipnum >= helmetObj.needNum && !iscollect;
                }
                if (iscollect) {
                    flagBg.texture = ResourceManager.getRes(this.code3CastleposCfg[i].img + "_1");
                    //已经领取了
                    if (xia_cus) {
                        flagObj.removeChild(xia_cus);
                        xia_cus = null;
                    }
                    if (shang_cus) {
                        flagObj.removeChild(shang_cus);
                        shang_cus = null;
                    }
                    flagObj["xia_cus"] = null;
                    flagObj["shang_cus"] = null;
                } else {
                    flagBg.texture = ResourceManager.getRes(this.code3CastleposCfg[i].img);
                    if (this.vo.chipnum >= helmetObj.needNum && !xia_cus && !shang_cus) {
                        let xiapath = "XYDxia_";
                        let shangpath = "XYDshang_";
                        let tarw = 260;
                        let tarh = 180;
                        if (i >= helmetNum.length - 1) {
                            xiapath = "DYDxia_";
                            shangpath = "DYDshang_";
                            tarw = 408;
                            tarh = 300;
                        }

                        shang_cus = ComponentManager.getCustomMovieClip(shangpath, 8, 120);
                        shang_cus.x = flagBg.x + flagBg.width / 2 - tarw / 2 - 12;
                        shang_cus.y = flagBg.y + flagBg.height / 2 - tarh / 2 + 11;
                        flagObj.addChild(shang_cus);
                        shang_cus.name = "shang_cus";
                        flagObj["shang_cus"] = shang_cus;

                        xia_cus = ComponentManager.getCustomMovieClip(xiapath, 8, 120);
                        xia_cus.x = flagBg.x + flagBg.width / 2 - tarw / 2 - 12;
                        xia_cus.y = flagBg.y + flagBg.height / 2 - tarh / 2 + 11;
                        flagObj.addChildAt(xia_cus, 0);
                        flagObj["xia_cus"] = xia_cus;
                        xia_cus.name = "xia_cus";
                        xia_cus.blendMode = egret.BlendMode.ADD;
                        shang_cus.blendMode = egret.BlendMode.ADD;
                        xia_cus.playWithTime(0);
                        shang_cus.playWithTime(0);
                    } else {
                        flagObj["xia_cus"] = null;
                        flagObj["shang_cus"] = null;
                    }
                }
            }
            this._code3NumFnt.x = this._code3RedFlag.x + this._code3RedFlag.width / 2 - this._code3NumFnt.width / 2 - 10;
            this._code3NumFnt.y = this._code3RedFlag.y + this._code3RedFlag.height / 2 - this._code3NumFnt.height / 2;
            return;
        }

        this.bloodBar.setPercentage(this.vo.chipnum / this.cfg.helmetItemNum);
        for (let i = 0; i < helmetNum.length; i++) {
            let flagObj = this.getChildByName("flag" + i);

            if (this.vo.checkBoxCollected(i)) {
                flagObj["light"].visible = false;
                egret.Tween.removeTweens(flagObj["light"]);
                flagObj["flag"].visible = false;
                flagObj["flagbreak"].visible = true;
            } else {
                if (this.vo.chipnum >= helmetNum[i].needNum) {
                    flagObj["light"].visible = true;
                    egret.Tween.get(flagObj["light"], { loop: true }).to({ rotation: flagObj["light"].rotation + 360 }, 10000);
                } else {
                    egret.Tween.removeTweens(flagObj["light"]);
                    flagObj["light"].visible = false;
                }
                flagObj["flag"].visible = true;
                flagObj["flagbreak"].visible = false;
            }
        }
        //  ComponentManager.getTextField(String(this.vo.chipnum + "%"), 20, 0xffedb4);
        if(this.defcode == "5"){
             this.numText.text = LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_progress"), [String(this.vo.chipnum < this.cfg.helmetItemNum ? this.vo.chipnum : this.cfg.helmetItemNum)]);
        } else if(this.defcode == "7"){
            this.numText.text = String(this.vo.chipnum + "%");
            
            this.numText.x = this.numBg.x + this.numBg.width / 2 - this.numText.width / 2;
        } else {
            this.numText.text = String(this.cfg.helmetItemNum - this.vo.chipnum < 0 ? 0 : this.cfg.helmetItemNum - this.vo.chipnum);
            this.numText.x = this.numBg.x + this.numBg.width / 2 - this.numText.width / 2;
        }
        // if (this.defcode != '5') {
        //     this.numText.text = String(this.cfg.helmetItemNum - this.vo.chipnum < 0 ? 0 : this.cfg.helmetItemNum - this.vo.chipnum);
        //     this.numText.x = this.numBg.x + this.numBg.width / 2 - this.numText.width / 2;
        // } else {
        //     this.numText.text = LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_progress"), [String(this.vo.chipnum < this.cfg.helmetItemNum ? this.vo.chipnum : this.cfg.helmetItemNum)]);
        // }
    }

    private atkClick() {
        if (this._isPlayAni) {
            return;
        }

        if (!this.vo.isAcTimeOut()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        //已经胜利了
        if (this.vo.chipnum >= this.cfg.helmetItemNum) {//饮酒次数不限
            App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_win")));
            return;
        }
        if (this.vo.attacknum <= 0) {
            // App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_notenough")));
            // return;
            let message = LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_countnotenough"), ["" + this.cfg.cost]);
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: message,
                callback: () => {
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                },
                handler: this,
                needCancel: true
            });
            return;
        }
        this._isPlayAni = true;
        let attackCount = this.vo.attacknum >= 10 ? 10 : 1;
        // this.playAssaultAni();
        NetManager.request(NetRequestConst.ACTIVITY_REDLOTUSWARRIORATTACKTHEBOSS, { activeId: this.aid + "-" + this.code, attack: attackCount });
    }
    // 获得奖励
    private getRewardHandler(event: egret.Event) {
        if (event.data.data.cmd === NetRequestConst.ACTIVITY_REDLOTUSWARRIORATTACKTHEBOSS) {
            if (event.data.data.ret === 0) {
                let data = event.data.data.data;
                // ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
                //     "rewards":data.rewards,
                //     "otherRewards":data.otherrewards,
                //     "isPlayAni":true, 
                //     showTip:data.critnum>0?LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_Baoji")):null
                // });
                this._rewards = data.rewards;
                this._otherRewards = data.otherrewards;
                this._showTip = data.critnum > 0 ? LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_Baoji")) : null;

                if (this.defcode == "3") {
                    this.showCode3Ani();
                } else if (this.defcode == "5") {
                    // 碰酒念诗
                    this.wineAndPoem();
                } else if(this.defcode == "7"){
                    this.attackHandle();
                   
                } else {
                    this.playAssaultAni();
                }
            } else {
                App.CommonUtil.showTip(event.data.data.ret);
            }
        }
    }
    private showCode7Ani(){

       if (App.DeviceUtil.CheckWebglRenderMode() && App.CommonUtil.check_dragon()) {
            this._userItem.playDragonMovie("attack",1);
            this._userItem.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, ()=>{
                // this.recallAniBack();
                this._isPlayAni = false;
                this.checkIsWin();
                this.randomSay()
                this._userItem.playDragonMovie('idle', 0);
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
                    "rewards": this._rewards,
                    "otherRewards": this._otherRewards,
                    "isPlayAni": true,
                    showTip: this._showTip
                });
            }, this);
       } else {
           egret.Tween.get(this._userItemBM)
           .wait(900)
           .call(()=>{
                this._isPlayAni = false;
                this.checkIsWin();
                this.randomSay()
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
                    "rewards": this._rewards,
                    "otherRewards": this._otherRewards,
                    "isPlayAni": true,
                    showTip: this._showTip
                });


           })

       }
        // this._isPlayAni = false;

    }
    private showCode3Ani() {
        this._isPlayAni = false;
        this.npcTalk(); //step1
        //step2 序列帧
        let taridx = this.getChildIndex(this._skinContainer);
        let _luanziClip = ComponentManager.getCustomMovieClip("redlotus_yanwu", 21, 100);//redlotus_yanwu 21
        _luanziClip.setScale(2.5);
        _luanziClip.setPosition(GameConfig.stageWidth / 2 - 256 / 2 * _luanziClip.scaleX, GameConfig.stageHeigth / 2 - 380 / 2 * _luanziClip.scaleX - 100);

        this.addChildAt(_luanziClip, taridx);
        _luanziClip.playWithTime(0);
        let tmpthis = this;
        egret.Tween.get(_luanziClip, { loop: false }).wait(2100).set({ alpha: 0 }).wait(500).call(this.checkIsWin, this).call(() => {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
                "rewards": tmpthis._rewards,
                "otherRewards": tmpthis._otherRewards,
                "isPlayAni": true,
                showTip: tmpthis._showTip
            });
            tmpthis.removeChild(_luanziClip);
        }, this);

    }
    /**动画 */
    private playAssaultAni() {
        SoundManager.playEffect("effect_battleshort");
        // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_MACHAOANI, { type: 1 });

        // this._isShake = true;

        this._npcClip2.setVisible(true);
        this._npcClip1.setVisible(false);
        this._npcClip2.playWithTime(1);
        egret.Tween.removeTweens(this);
        egret.Tween.get(this)
            .call(this.playEachAssaultAni, this, ["_assaultList1"])
            .wait(330)
            .call(this.playEachAssaultAni, this, ["_assaultList2"])
            .wait(330)
            .call(this.playEachAssaultAni, this, ["_assaultList3"])
            .call(() => {
                egret.Tween.removeTweens(this);
            }, this);
    }

	/**	
	 * 十连抽动画
	 */
    private playEachAssaultAni(key: string) {
        for (let i = 0; i < this[key].length; i++) {
            this.playOneAssaultAni(key, i);
        }
    }

    /**一个士兵的动画 */
    private playOneAssaultAni(key: string, index: number) {
        this[key][index].x = this._assaultCfg1[index].x;
        this[key][index].y = GameConfig.stageHeigth - this._assaultCfg1[index].y;
        this[key][index].alpha = this._assaultCfg1[index].alpha;
        this[key][index].scaleX = this._assaultCfg1[index].scale;
        this[key][index].scaleY = this._assaultCfg1[index].scale;
        egret.Tween.removeTweens(this[key][index]);
        egret.Tween.get(this[key][index])
            .to({
                x: this._assaultCfg2[index].x,
                y: GameConfig.stageHeigth - this._assaultCfg2[index].y,
                alpha: this._assaultCfg2[index].alpha,
                scaleX: this._assaultCfg2[index].scale,
                scaleY: this._assaultCfg2[index].scale,
            }, 50)
            .to({
                x: this._assaultCfg3[index].x,
                y: GameConfig.stageHeigth - this._assaultCfg3[index].y,
                alpha: this._assaultCfg3[index].alpha,
                scaleX: this._assaultCfg3[index].scale,
                scaleY: this._assaultCfg3[index].scale,
            }, 400)
            .call(() => {
                this.playShake();
                //大幅度震动
                // if (this._isShake) {
                //     // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_MACHAOANI, { type: 2 });
                //     this.playBgAni(2);
                //     this._isShake = false;
                // }

                for (let i = 0; i < 3; i++) {
                    this.playOneEmenyAni(i);
                }


            }, this)
            .to({
                x: this._assaultCfg4[index].x,
                y: GameConfig.stageHeigth - this._assaultCfg4[index].y,
                alpha: this._assaultCfg4[index].alpha,
                scaleX: this._assaultCfg4[index].scale,
                scaleY: this._assaultCfg4[index].scale,
            }, 150)
            .call(() => {

                // if (index == this._assaultList3.length - 1 && key == "_assaultList3") {
                //     // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_MACHAOANI, { type: 3 });
                //     this.playBgAni(3);
                // }
                for (let i = 3; i < 6; i++) {
                    this.playOneEmenyAni(i);
                }

            }, this)
            // .wait(150)
            .to({
                x: this._assaultCfg5[index].x,
                y: GameConfig.stageHeigth - this._assaultCfg5[index].y,
                alpha: this._assaultCfg5[index].alpha,
                scaleX: this._assaultCfg5[index].scale,
                scaleY: this._assaultCfg5[index].scale,
            }, 150)
            .call(() => {
                egret.Tween.removeTweens(this[key][index]);
                if (index == this._assaultList3.length - 1 && key == "_assaultList3") {
                    this._isPlayAni = false;
                    // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_MACHAOANI, { type: 4 });
                    // this.playBgAni(4);
                    this._npcClip1.setVisible(true);
                    this._npcClip2.setVisible(false);
                    this.checkIsWin();
                    this.stopShake();
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
                        "rewards": this._rewards,
                        "otherRewards": this._otherRewards,
                        "isPlayAni": true,
                        showTip: this._showTip
                    });
                }
            }, this);
    }

    /**一个敌人的动画 */
    private playOneEmenyAni(index: number) {
        let posX = this._enemyList[index].x;
        let posY = this._enemyList[index].y;
        egret.Tween.removeTweens(this._enemyList[index]);
        egret.Tween.get(this._enemyList[index]).call(() => {
            let hurtEffect = ComponentManager.getCustomMovieClip("acredlotuswarriorhurteffect", 8, 70);
            hurtEffect.anchorOffsetX = 125;
            hurtEffect.anchorOffsetY = 120;
            hurtEffect.rotation = 360 * Math.random();
            hurtEffect.setPosition(posX + this._enemyList[index].width / 2, posY + this._enemyList[index].height / 2);
            this.addChild(hurtEffect);
            hurtEffect.playWithTime(1);
            hurtEffect.setEndCallBack(() => {
                this.removeChild(hurtEffect);
                hurtEffect.dispose();
                hurtEffect = null;
            }, this)
        }, this).to({
            x: posX + 15,
            y: posY - 12,
        }, 30).to({
            x: posX,
            y: posY,
        }, 300).call(() => {
            egret.Tween.removeTweens(this._enemyList[index]);
        }, this);
    }
    /**碰酒念诗 */
    private wineAndPoem() {
        if (this._wine) {//存在骨骼
            this._wine.visible = true;
            this._wine.playDragonMovie('appear', 1);
            this._wineLight.visible = this.atkButton.visible = false;
        } else {    
            this.showPaper();
        }
        if (egret.is(this._npcBM, 'BaseLoadDragonBones')) {
            let ani = <BaseLoadDragonBones>this._npcBM;
            ani.playDragonMovie('appear', 1);
        }
    }
    private showPaper() {
        this._wineLight.visible = this.atkButton.visible = true;
        this.checkIsWin();
        //纸展开
        let _poemContainer = this._poemContainer, _paper1 = this._paper1, _paper2 = this._paper2;
        _poemContainer.alpha = 1;
        _paper2.visible = _paper1.visible = _poemContainer.visible = true;
        this._poemText1.visible = this._poemText2.visible = false;
        //创建俩遮罩，显示背景纸
        let shape1 = new BaseShape, shape2 = new BaseShape;
        _poemContainer.addChild(shape1);
        _poemContainer.addChild(shape2);
        shape1.graphics.beginFill(0x000000);
        shape1.graphics.drawRect(0, -10, 214, 235);//229
        shape1.graphics.endFill();
        shape2.graphics.beginFill(0x000000);
        shape2.graphics.drawRect(0, 219, 214, 229);
        shape2.graphics.endFill();
        this._paper1_mask = shape1;
        this._paper2_mask = shape2;
        _paper1.mask = shape1;
        _paper2.mask = shape2;
        _paper1.y = 180;
        _paper2.y = 258;
        egret.setTimeout(this.addFrameFun, this, 50);
    }
    private addFrameFun() {
        let _paper1 = this._paper1;
        if (_paper1.y > 0) {
            _paper1.y -= 20;
            egret.setTimeout(this.addFrameFun, this, 50);
        } else {
            _paper1.y = 0
            egret.setTimeout(this.wirtePoemtext, this, 300);
        }
        let _paper2 = this._paper2;
        if (_paper2.y < 438) {
            _paper2.y += 20;
        } else {
            _paper2.y = 438;
        }
    }
    private wirtePoemtext() {
        let _poemContainer = this._poemContainer;
        //取消纸的遮罩
        
        if(!this._paper1_mask){
            return;
        }
        if(!this._paper2_mask){
            return;
        }
        _poemContainer.removeChild(this._paper1_mask);
        _poemContainer.removeChild(this._paper2_mask);
        this._paper1.mask = null;
        this._paper2.mask = null;

        this._poemText1.visible = this._poemText2.visible = true;
        let ind = (~~(Math.random() * 100)) % 8 + 1;
        this._poemText1.setRes(`acredlotuswarrior_poem${ind}`);
        this._poemText2.setRes(`acredlotuswarrior_poem${ind}`);
        //创建俩遮罩
        let shape1 = new BaseShape, shape2 = new BaseShape;
        _poemContainer.addChild(shape1);
        _poemContainer.addChild(shape2);
        shape1.graphics.beginFill(0x000000);
        shape1.graphics.drawRect(107, 0, 107, 1);
        shape1.graphics.endFill();
        shape2.graphics.beginFill(0x000000);
        shape2.graphics.drawRect(0, 0, 107, 1);
        shape2.graphics.endFill();
        this._poemText1.mask = shape1;
        this._poemText2.mask = shape2;
        this.shape1 = shape1;
        this.shape2 = shape2;
        //第一句诗
        this.height1 = this.height2 = 1;
        egret.setTimeout(this.showpoem1, this, 40);
    }
    private height1 = 1;
    private height2 = 1;
    private ctrl = 0;

    private showpoem1() {
        let brush = this._brush;
        if (brush.visible == false) {
            brush.visible = true;
            brush.x = 110;
            this.ctrl = 0;
        }
        this.height1 += 15;
        this.ctrl++;
        if (this.height1 >= 437) {
            this.height1 = 437;
            //写第二句
            egret.setTimeout(this.showpoem2, this, 70);
            brush.y = this.height2 - brush.height;
            brush.x = 65
            this.ctrl = 0;
        } else {
            brush.y = this.height1 - brush.height;
            if (this.ctrl % 3 == 0) {
                brush.x = brush.x == 110 ? 140 : 110;
            }
            egret.setTimeout(this.showpoem1, this, 40);
        }
        let shape = this.shape1;
        shape.graphics.clear();
        shape.graphics.beginFill(0x000000);
        shape.graphics.drawRect(107, 0, 107, this.height1);
        shape.graphics.endFill();
    }
    private showpoem2() {
        let brush = this._brush;
        this.height2 += 15;
        this.ctrl++;
        if (this.height2 >= 437) {
            this.height2 = 437;
            //写完了
            egret.setTimeout(this.closePoem, this, 1000);
        } else {
            brush.y = this.height2 - brush.height;
            if (this.ctrl % 3 == 0) {
                brush.x = brush.x == 65 ? 95 : 65;
            }
            egret.setTimeout(this.showpoem2, this, 40);
        }
        let shape = this.shape2;
        shape.graphics.clear();
        shape.graphics.beginFill(0x000000);
        shape.graphics.drawRect(0, 0, 107, this.height2);
        shape.graphics.endFill();
    }
    private closePoem() {
        egret.Tween.removeTweens(this._poemContainer);
        egret.Tween.get(this._poemContainer).to({ alpha: 0 }, 300)//.call(this.showReward, this);
        this.showReward()
    }

    private showReward() {
        let _poemContainer = this._poemContainer;
        _poemContainer.visible =
            this._paper1.visible =
            this._poemText1.visible =
            this._brush.visible =
            this._poemText2.visible = false;
        _poemContainer.removeChild(this.shape1);
        _poemContainer.removeChild(this.shape2);
        ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
            "rewards": this._rewards,
            "otherRewards": this._otherRewards,
            "isPlayAni": true,
            showTip: this._showTip
        });
        this._isPlayAni = false;
    }

    // 获得宝箱奖励
    private getNumRewardHandler(event: egret.Event) {
        if (event.data.data.cmd === NetRequestConst.REQUEST_ACTIVITY_HULAONUMREWARD) {
            if (event.data.data.ret === 0) {
                let data = event.data.data.data;
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": data.rewards, "otherRewards": data.otherrewards, "isPlayAni": true });
            } else {
                App.CommonUtil.showTip(event.data.data.ret);
            }
        }
    }

    protected getResourceList(): string[] {
        let resTab = [];
        if (this.defcode == "3") {
            resTab = [
                "acredlotuswarrior_arrow1", "acredlotuswarrior_arrow2",
                "acredlotuswarrior_flag", "acredlotuswarrior_ground1_1", "acredlotuswarrior_ground1", "acredlotuswarrior_ground2_1",
                "acredlotuswarrior_ground2", "acredlotuswarrior_percent", "acredlotuswarrior_title_word", "acredlotuswarrior_bottom", "prestige_fnt",
            ]
        } else if (this.defcode == "5") {
            resTab = ['acredlotuswarrior_title_word5', 'acredlotuswarrior_residual_times-5',
                'acredlotuswarrior_flag-5','acredlotuswarrior_flag-6', 'acredlotuswarrior_flagbreak-5','acredlotuswarrior_flagbreak-6',
                'acredlotuswarrior_name-5', 'acredlotuswarrior_name2-5','acredlotuswarrior_flag1-5',
                'acredlotuswarrior-5_progress', 'acredlotuswarrior-5_progressbg',
                'acredlotuswarrior_poem_bg', 'acredlotuswarrior_poem1', 'acredlotuswarrior_poem2',
                'acredlotuswarrior_poem3', 'acredlotuswarrior_poem4', 'acredlotuswarrior_poem5',
                'acredlotuswarrior_poem6', 'acredlotuswarrior_poem7', 'acredlotuswarrior_poem8',
                'acredlotuswarrior_poem_brush'
            ];
        } else if(this.code == "7"){
            resTab = [
                "acredlotuswarrior_title_word7",
                "acredlotuswarrior_useritem-7",
                "acredlotuswarrior_center-7",
                "acredlotuswarrior_centerbg-7",
                "acredlotuswarrior_detailbg-3",
                "acredlotuswarrior_sermask"
            ]
        }
        
        return super.getResourceList().concat([
            this.getDefaultRes("acredlotuswarrior_btn"),
            this.getDefaultRes("acredlotuswarrior_btnbg",this.defcode),
            this.getDefaultRes("acredlotuswarrior_closebtn"),
            this.getDefaultRes("acredlotuswarrior_detailbg", this.defcode),
            this.getDefaultRes("acredlotuswarrior_flagbg"),
            this.getDefaultRes("acredlotuswarrior_flag1",this.defcode),
            this.getDefaultRes("acredlotuswarrior_flag2",this.defcode),
            this.getDefaultRes("acredlotuswarrior_flagbreak1",this.defcode),
            this.getDefaultRes("acredlotuswarrior_flagbreak2",this.defcode),
            this.getDefaultRes("acredlotuswarrior_numbg"),
            this.getDefaultRes("acredlotuswarrior_talkbg"),
            this.getDefaultRes("acredlotuswarrior_title", this.defcode),
            this.getDefaultRes("acredlotuswarrior_win"),

            "progress_blood",
            "progress_bloodbg",
            "acredlotuswarrior_infobtn",
            "dailytask_box_light", "guide_hand",

        ]).concat(resTab);


    }
    public hide():void {
        if(!this._isPlayAni){
            super.hide();
        }
    }

    public dispose(): void {
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_MACHAOTAbANI, this.playEnemyShakeAni, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.ACTIVITY_REDLOTUSWARRIORNUMREWARD, this.receiveBoxHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.ACTIVITY_REDLOTUSWARRIORATTACKTHEBOSS, this.getRewardHandler, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REDLOTUSWARRIOR_REFRESHVO, this.refreshData, this);

        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN, this.showDBDragon, this);
        this.bloodBar = null;
        this.acCdTxt = null;
        this.atkButton = null;
        this.numBg = null;
        this.numText = null;
        this.atkCountTxt = null;
        this.btnText = null;
        this._npcBM = null;
        this._npcEffect = null;
        this._bigBg = null;
        this._enemyList = [];
        this._assaultList1 = [];
        this._assaultList2 = [];
        this._assaultList3 = [];
        this._enemyContainer = null;
        this._isShake = false;
        this._npcClip1 = null;
        this._npcClip2 = null;
        this._buttomBg = null;
        this._isPlayAni = false;
        this._rewards = null;
        this._otherRewards = null;
        this._showTip = null;
        this._isWin = false;
        this._skinContainer = null;
        this._clickHand = null;
        this._wine = null;
        this._wineBG = null;
        if (this._poemContainer) {
            egret.Tween.removeTweens(this._poemContainer);
        }
        this._poemContainer = null;
        this._brush = null;
        this._paper1 = null;
        this._paper2 = null;
        this._paper1_mask = null;
        this._paper2_mask = null;
        this._poemText1 = null;
        this._poemText2 = null;
        this.shape1 = null;
        this.shape2 = null;
        this._redi_timesbg = null;
        if (this._wineLight) {
            egret.Tween.removeTweens(this._wineLight);
        }
        this._wineLight = null;
        this._poemIocn = null;
        this._userItem = null;
        if(this._userItemBM){
            egret.Tween.removeTweens(this._userItemBM);
        }
        this._userItemBM=  null;

        if (this._clickHand) {
            egret.Tween.removeTweens(this._clickHand);
        }
        this._clickHand = null;

        if (this._talkContainer) {
            egret.Tween.removeTweens(this._talkContainer);
        }
        this._talkContainer = null;
        this._centerBg = null;
        this._centerText = null;
    // 吕布容器
        if(this.lvbuNode){
            egret.Tween.removeTweens(this.lvbuNode);
        }
        this.lvbuNode = null;
   
        this.boneNode = null;

        this.lvbuImg = null;
  
        if(this._randomTalkContainer){
            egret.Tween.removeTweens(this._randomTalkContainer);
        }

        this._randomTalkContainer = null;
        this._randomTalkBg = null;
        this._randomTalkText = null;
    // 吕布的x
        this.lvbuX = 0;
    // 吕布的y
        this.lvbuY = 0;
        super.dispose();
    }
}