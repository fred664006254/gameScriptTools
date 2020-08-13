/**
  * 新皇宫界面
  * @author 张朝阳
  * date 2019/5/6
  * @class PalaceNewView
  */
class PalaceNewView extends CommonView {

    private _bg: BaseLoadBitmap = null;

    private _scrollView: ScrollView = null;

    private _svContainer: BaseDisplayObjectContainer = null;

    private _titleUpBtn:BaseButton = null;
    private _titleUpBtnEff:CustomMovieClip = null;
    private _achieveBtn:BaseButton = null;
    private _achieveBtnEff:CustomMovieClip = null;
    private _mainTaskHandKey:string = null;


    /**建筑的坐标 */
    // private posBuildingCfgList = [
    //     { id: 47, pic: "palacenewview_building_47", x: 62, y: 922, width: 27, heigh: 20, scale: 4 },
    //     { id: 61, pic: "palacenewview_building_61", x: 143, y: 1095, width: 25, heigh: 17, scale: 4 },
    //     { id: 63, pic: "palacenewview_building_63", x: 391, y: 1100, width: 25, heigh: 15, scale: 4 },
    //     { id: 46, pic: "palacenewview_building_46", x: 473, y: 922, width: 26, heigh: 20, scale: 4 },
    //     { id: 31, pic: "palacenewview_building_31", x: 193, y: 442, width: 63, heigh: 33, scale: 4 },
    //     { id: 62, pic: "palacenewview_building_62", x: 260, y: 1009, width: 30, heigh: 19, scale: 4 },
    //     { id: 13, pic: "palacenewview_building_13", x: 38, y: 360, width: 29, heigh: 24, scale: 4 },
    //     { id: 1, pic: "palacenewview_building_1", x: 183, y: 80, width: 69, heigh: 31, scale: 4 },
    //     { id: 43, pic: "palacenewview_building_43", x: 466, y: 837, width: 26, heigh: 20, scale: 4 },
    //     { id: 11, pic: "palacenewview_building_11", x: 64, y: 266, width: 32, heigh: 23, scale: 4 },
    //     { id: 41, pic: "palacenewview_building_41", x: 90, y: 755, width: 24, heigh: 19, scale: 4 },
    //     { id: 14, pic: "palacenewview_building_14", x: 482, y: 360, width: 30, heigh: 23, scale: 4 },
    //     { id: 42, pic: "palacenewview_building_42", x: 48, y: 1010, width: 26, heigh: 21, scale: 4 },
    //     { id: 45, pic: "palacenewview_building_45", x: 270, y: 700, width: 24, heigh: 19, scale: 4 },
    //     { id: 16, pic: "palacenewview_building_16", x: 522, y: 461, width: 30, heigh: 23, scale: 4 },
    //     { id: 48, pic: "palacenewview_building_48", x: 454, y: 755, width: 24, heigh: 19, scale: 4 },
    //     { id: 49, pic: "palacenewview_building_49", x: 485, y: 1010, width: 27, heigh: 21, scale: 4 },
    //     { id: 15, pic: "palacenewview_building_15", x: -7, y: 461, width: 32, heigh: 24, scale: 4 },
    //     { id: 51, pic: "palacenewview_building_51", x: 444, y: 675, width: 24, heigh: 19, scale: 4 },
    //     { id: 12, pic: "palacenewview_building_12", x: 432, y: 266, width: 32, heigh: 23, scale: 4 },
    //     { id: 44, pic: "palacenewview_building_44", x: 70, y: 837, width: 26, heigh: 20, scale: 4 },
    //     { id: 17, pic: "palacenewview_building_17", x: 30, y: 137, width: 31, heigh: 23, scale: 4 },
    //     { id: 50, pic: "palacenewview_building_50", x: 99, y: 675, width: 25, heigh: 19, scale: 4 },
    //     { id: 18, pic: "palacenewview_building_18", x: 479, y: 137, width: 31, heigh: 23, scale: 4 },
    // ];
    /**新建筑坐标 */
    private posBuildingCfgList = [
        { id: 47, pic: "palacenewview_building_47", x: 62, y: 1150, width: 27, heigh: 20, scale: 4 }, // 八贤王
        { id: 61, pic: "palacenewview_building_61", x: 139, y: 1324, width: 26, heigh: 20, scale: 4 }, //公爵府
        { id: 63, pic: "palacenewview_building_63", x: 389, y: 1328, width: 25, heigh: 19, scale: 4 }, //侯爵府
        { id: 46, pic: "palacenewview_building_46", x: 473, y: 1149, width: 27, heigh: 20, scale: 4 }, //靖安王府
        { id: 31, pic: "palacenewview_building_31", x: 182, y: 674, width: 67, heigh: 42, scale: 4 }, //金銮殿
        { id: 62, pic: "palacenewview_building_62", x: 257, y: 1235, width: 32, heigh: 24, scale: 4 }, //军机处
        { id: 13, pic: "palacenewview_building_13", x: 0, y: 599, width: 27, heigh: 23, scale: 4 }, //礼帝殿
        { id: 1, pic: "palacenewview_building_1", x: 151, y: 134, width: 79, heigh: 59, scale: 4 }, //凌霄殿
        { id: 43, pic: "palacenewview_building_43", x: 463, y: 1063, width: 27, heigh: 21, scale: 4 }, //平西王府
        { id: 11, pic: "palacenewview_building_11", x: 38, y: 527, width: 29, heigh: 23, scale: 4 }, //仁帝殿
        { id: 41, pic: "palacenewview_building_41", x: 89, y: 981, width: 25, heigh: 20, scale: 4 }, //摄政王府
        { id: 14, pic: "palacenewview_building_14", x: 535, y: 602, width: 27, heigh: 22, scale: 4 }, //文帝殿
        { id: 42, pic: "palacenewview_building_42", x: 46, y: 1239, width: 26, heigh: 22, scale: 4 }, //文宣王府
        { id: 45, pic: "palacenewview_building_45", x: 268, y: 923, width: 24, heigh: 19, scale: 4 }, //武成王府
        { id: 16, pic: "palacenewview_building_16", x: 522, y: 691, width: 29, heigh: 24, scale: 4 },//武帝殿
        { id: 48, pic: "palacenewview_building_48", x: 453, y: 979, width: 26, heigh: 22, scale: 4 },//逍遥王府
        { id: 49, pic: "palacenewview_building_49", x: 488, y: 1240, width: 26, heigh: 22, scale: 4 },//宣烈王府
        { id: 15, pic: "palacenewview_building_15", x: 6, y: 689, width: 27, heigh: 26, scale: 4 },//义帝殿
        { id: 51, pic: "palacenewview_building_51", x: 444, y: 901, width: 25, heigh: 21, scale: 4 },//礼乐王府
        { id: 12, pic: "palacenewview_building_12", x: 481, y: 527, width: 26, heigh: 23, scale: 4 },//政帝殿
        { id: 44, pic: "palacenewview_building_44", x: 68, y: 1055, width: 27, heigh: 21, scale: 4 },//镇南王府
        { id: 17, pic: "palacenewview_building_17", x: 79, y: 446, width: 26, heigh: 21, scale: 4 },//智帝殿
        { id: 50, pic: "palacenewview_building_50", x: 97, y: 899, width: 24, heigh: 21, scale: 4 },//智桓王府
        { id: 18, pic: "palacenewview_building_18", x: 432, y: 446, width: 31, heigh: 23, scale: 4 },//忠帝殿
        { id: 71, pic: "palacenewview_building_71", x: 0, y: 291, width: 49, heigh: 34, scale: 4 },//崇德皇
        { id: 72, pic: "palacenewview_building_72", x: 161, y: 311, width: 81, heigh: 36, scale: 4 },//昭烈皇
        { id: 73, pic: "palacenewview_building_73", x: 436, y: 293, width: 51, heigh: 34, scale: 4 },//玄明皇
        { id: 20, pic: "palacenewview_building_20", x: 151, y: 588, width: 30, heigh: 25, scale: 4 },//信帝殿
        { id: 19, pic: "palacenewview_building_19", x: 373, y: 584, width: 30, heigh: 25, scale: 4 },//孝帝殿
    ];

    public constructor() {
        super();
    }

    protected get uiType():string
	{
		return "2";
	}

    protected getContainerY():number
	{
		return 0;
	}

    protected getBigFrame():string
	{	
		return null;
	}

    protected getCloseBtnName():string
	{
		return "palacenewview_close";
	}

    protected getRuleBtnName():string
	{	
		return "palacenewview_ask";
	}

    protected getTitleBgName():string
	{
		return "palacenewview_titlebg";
	}

    protected getTitlePic():string
	{	
		return "palacenewview_title";
	}

    protected isHideTitleBgShadow():boolean
	{
		return true;
	}

    protected initView(): void {

        this.closeBtn.x = 572;
        this.closeBtn.y = 8;
        this._ruleBtn.x = 10;
        this._ruleBtn.y = 15;
        this.titleBmp.y = 1;

        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PROMOTE_INDEX), this.getPromoteList, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_TITLEUPGRADE_MODEL,this.upgradeCallBack,this);
        NetManager.request(NetRequestConst.REQUEST_PROMOTE_INDEX, {});//分封的相关数据
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPERORACHIEVE_GETREWARD), this.refreshEmperorAchieve, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPERORACHIEVE_BARRAGE), this.refreshEmperorAchieve, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPERORACHIEVE_GETPOPULARRWD), this.refreshEmperorAchieve, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPERORACHIEVE_GETBONUS), this.refreshEmperorAchieve, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PALACE_GETSALARY),this.collectHandlerCallback,this);
        Api.mainTaskVoApi.isKeepGuide = true;
        Api.mainTaskVoApi.checkShowGuide();

        let bgInfo = this.getPalaceBgInfo();

        this._svContainer = new BaseDisplayObjectContainer();
        if (this.isCrossOpen()) {
            this._svContainer.width = 640;
            // let rect = new egret.Rectangle(0, 0, 640, GameConfig.stageHeigth - 90);
            // this._scrollView = ComponentManager.getScrollView(this._svContainer, rect);
            // this._scrollView.setPosition(0, -15);
            let rect = new egret.Rectangle(0, 0, 640, GameConfig.stageHeigth);
            this._scrollView = ComponentManager.getScrollView(this._svContainer, rect);
            this._scrollView.setPosition(0, 0);
            this._scrollView.bounces = false;
            this.addChildToContainer(this._scrollView);
        }
        else {
            this._svContainer.height = bgInfo.height;
            this._svContainer.width = bgInfo.width;
            this._svContainer.y = GameConfig.stageHeigth - this._svContainer.height ;
            this.addChildToContainer(this._svContainer);
        }

        this._bg = BaseLoadBitmap.create(bgInfo.bgName);
        this._bg.width = bgInfo.width;
        this._bg.height = bgInfo.height;
        this._svContainer.addChild(this._bg);
        // if (this.isCrossOpen()) {
        //     let leftfountaine = ComponentManager.getCustomMovieClip("palacenewfountaineffect", 8, 70);
        //     leftfountaine.setPosition(this._bg.x + 167, this.y + 406);
        //     this._svContainer.addChild(leftfountaine);
        //     leftfountaine.playWithTime(-1);

        //     let rightfountaine = ComponentManager.getCustomMovieClip("palacenewfountaineffect", 8, 70);
        //     rightfountaine.setPosition(this._bg.x + 402, this.y + 406);
        //     this._svContainer.addChild(rightfountaine);
        //     rightfountaine.playWithTime(-1);
        // }


        let bird1 = ComponentManager.getCustomMovieClip("palacenewbirdeffect", 4, 70);
        bird1.setPosition(this._bg.x + 671, this._bg.y + 140);
        bird1.setScale(1);
        this._svContainer.addChild(bird1);
        bird1.playWithTime(-1);


        let bird2 = ComponentManager.getCustomMovieClip("palacenewbirdeffect", 4, 70);
        bird2.setPosition(this._bg.x + 671, this._bg.y + 140);
        bird2.setScale(0.6);
        this._svContainer.addChild(bird2);
        bird2.playWithTime(-1);


        let bird3 = ComponentManager.getCustomMovieClip("palacenewbirdeffect", 4, 70);
        bird3.setPosition(this._bg.x + 674, this._bg.y + 140);
        bird3.setScale(0.8);
        this._svContainer.addChild(bird3);
        bird3.playWithTime(-1);

        if (this.isCrossOpen()) {
            bird1.y = this._bg.y + 215;
            bird2.y = this._bg.y + 215;
            bird3.y = this._bg.y + 215;
            egret.Tween.get(this).call(() => {
                egret.Tween.get(bird1, { loop: true }).to({
                    x: this._bg.x + 671,
                    y: this._bg.y + 215 - 100
                }, 0).to({
                    x: this._bg.x - 57,
                    y: this._bg.y + 217 - 100,
                    scaleX: 0.3,
                    scaleY: 0.3,
                }, 11000);


            }, this).wait(2000).call(() => {
                egret.Tween.get(bird2, { loop: true }).to({
                    x: this._bg.x + 690,
                    y: this._bg.y + 250 - 100
                }, 0).to({
                    x: this._bg.x - 57,
                    y: this._bg.y + 217 - 100,
                    scaleX: 0.3,
                    scaleY: 0.3,
                }, 11000);
                egret.Tween.get(bird3, { loop: true }).to({
                    x: this._bg.x + 674,
                    y: this._bg.y + 193 - 100
                }, 0).to({
                    x: this._bg.x - 57,
                    y: this._bg.y + 217 - 100,
                    scaleX: 0.3,
                    scaleY: 0.3,
                }, 11000);
            }, this)
        }
        else {
            egret.Tween.get(this).call(() => {
                egret.Tween.get(bird1, { loop: true }).to({
                    x: this._bg.x + 671,
                    y: this._bg.y + 140 - 100 + 250
                }, 0).to({
                    x: this._bg.x - 57,
                    y: this._bg.y + 142 - 100 + 150,
                    scaleX: 0.3,
                    scaleY: 0.3,
                }, 11000);


            }, this).wait(2000).call(() => {
                egret.Tween.get(bird2, { loop: true }).to({
                    x: this._bg.x + 690,
                    y: this._bg.y + 175 - 100 + 250
                }, 0).to({
                    x: this._bg.x - 57,
                    y: this._bg.y + 142 - 100 + 150,
                    scaleX: 0.3,
                    scaleY: 0.3,
                }, 11000);
                egret.Tween.get(bird3, { loop: true }).to({
                    x: this._bg.x + 674,
                    y: this._bg.y + 118 - 100 + 250
                }, 0).to({
                    x: this._bg.x - 57,
                    y: this._bg.y + 142 - 100 + 150,
                    scaleX: 0.3,
                    scaleY: 0.3,
                }, 11000);
            }, this)
        }



        let particle = App.ParticleUtil.getParticle("petalparticle");
        particle.x = this._bg.x + 320;
        particle.y = this._bg.y + 1040; //833
        particle.scaleX = 0.8;
        particle.scaleY = 0.8;
        particle.start();
        this._svContainer.addChild(particle);
        if (!this.isCrossOpen()) {
            particle.y = this._bg.y + 693;
        }

        //主线任务非强制引导
        let buildId = this.getMainTaskHandBuildId();
        if (buildId && buildId.openBuildId){
            let buildCfg = this.getBuildingCfgList()[buildId.index];
            this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(
                this._svContainer,
                this._bg.x + buildCfg.x + buildCfg.width * buildCfg.scale /2, 
                this._bg.y + buildCfg.y + buildCfg.heigh * buildCfg.scale /2 - 30,
                [this._svContainer],
                115,
                true,
                function (){
                    return true;
                },
                this,
            );
        }
    }

    //主线任务非强制引导
    private getMainTaskHandBuildId():any{
        let taskId = Api.mainTaskVoApi.getCurMainTaskId();
        let taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
        if (taskCfg && taskCfg.questType == 115 && Api.otherInfoVoApi.getPalaceFlag() == 0) {
            let buildingCfgList = this.getBuildingCfgList();
            let openBuildId = null;
            let openSortId = 0;
            let index = 0;
            for (let i = 0; i < buildingCfgList.length; i++) {
                let posBuildingCfg = buildingCfgList[i];
                if (!this.isLockedWithSwitch(String(posBuildingCfg.id)) && posBuildingCfg.id != 62) {
                    let buildcfg = GameConfig.config.buildingCfg[String(posBuildingCfg.id)];
                    let titleId = buildcfg.title;
                    if (titleId && Object.keys(titleId).length == 1){
                        let tid = titleId[0];
                        if (Config.TitleCfg.isTitleOPend(tid)) {
                            let titleCfg = Config.TitleCfg.getTitleCfgById(tid);
                            if (Config.TitleCfg.isTheKingTitleId(tid)){
                                return {openBuildId: posBuildingCfg.id, index: i};
                            }
                            else{
                                if (!openBuildId){
                                    openSortId = titleCfg.sortId;
                                    openBuildId = posBuildingCfg.id;
                                    index = i;
                                }
                                else {
                                    if (openSortId > titleCfg.sortId){
                                        openSortId = titleCfg.sortId;
                                        openBuildId = posBuildingCfg.id;
                                        index = i;
                                    }
                                }
                            }  
                        }
                    }
                }
            }
            if (openBuildId){
                return {openBuildId: openBuildId, index: index};
            } 
        }
        return null;
    }

    //添加flag
    private showInHouseFalg():void{
        //是否在位单独处理 层级问题
        // let buildingCfgList = this.getBuildingCfgList();
        // for (let i = 0; i < buildingCfgList.length; i++) {
        //     let posBuildingCfg = buildingCfgList[i];
        //     if(Api.switchVoApi.checkTitleUpgrade()){
        //         let cfg = GameConfig.config.buildingCfg[posBuildingCfg.id];
        //         if(cfg && cfg.title){
        //             let title = cfg.title;
        //             let pic = <BaseLoadBitmap>this._svContainer.getChildByName("pic"+title[0]);
        //             let isHasMan = Api.palaceVoApi.isHasMan(title);
        //             if (Api.palaceVoApi.isInKingsHouse() && title[0] == "3201"){
        //                 let flag = this.getInHouseFlag();
        //                 this._svContainer.addChild(flag);
        //                 flag.name = "flag"+title[0];
        //                 App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, flag, pic, [0, -flag.height + 10]);
        //             }
        //             else if(isHasMan && (!this.isLockedWithSwitch(String(posBuildingCfg.id)))){
        //                 //是否是自己
        //                 if (this.isInHouse(title)){
        //                     let flag = this.getInHouseFlag();
        //                     this._svContainer.addChild(flag);
        //                     flag.name = "flag"+title[0];
        //                     App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, flag, pic, [0, -flag.height + 5]);
        //                 }
        //             }
        //         }
        //     }
        // }
    }

    //自己是否在宫殿中
    private isInHouse(titleCfg:any):boolean{
        for (let key in titleCfg){
            if (Api.palaceVoApi.isInThePalaceByPalaceId(titleCfg[key])){
                return true;
            }
        }
        return false;
    }

    //当前在位标记
    private getInHouseFlag():BaseDisplayObjectContainer{
        let container = new BaseDisplayObjectContainer();
        let bg = BaseBitmap.create("emperorout_inemperor"); // 54 62
        container.addChild(bg);
        container.width = bg.width;
        container.height = bg.height;

        let ani = ComponentManager.getCustomMovieClip("palacenewinhouseeffect", 20, 70); // 65 75
        container.addChild(ani);
        ani.blendMode = egret.BlendMode.ADD;
        ani.setPosition(-5, -6);
        ani.playWithTime(0);
        return container;
    }

    private refreshEmperorAchieve():void{
        if (Api.switchVoApi.checkTitleUpgrade() && Api.switchVoApi.checkOpenEmperorsAchievement()){
            if (Api.emperorAchieveVoApi.isShowKingAchieveRedDot()){
                App.CommonUtil.addIconToBDOC(this._achieveBtn);
                this._achieveBtnEff.visible = true;
            }
            else{
                App.CommonUtil.removeIconFromBDOC(this._achieveBtn);
                this._achieveBtnEff.visible = false;
            }
        } 
    }

    private getPalaceBgInfo(): { bgName: string, height: number, width: number } {
        let bgName: string = "";
        let height: number = 0;
        let width: number = 0;
        if (this.isCrossOpen()) {
            // bgName = "palacenewview_bg";
            // width = 640;
            // height = 1219;
            bgName = "palacenewview_bg";
            width = 640;
            height = 1453;  
        }
        else {
            bgName = "palacenewview_same_bg";
            width = 640;
            height = 1136;
        }
        return { bgName, height, width };
    }
    private getBuildingCfgList() {
        let buildingCfgList: { id: number, pic: string, x: number, y: number, width: number, heigh: number, scale: number, }[] = [];
        if (this.isCrossOpen()) {
            buildingCfgList = this.posBuildingCfgList;
        }
        else {
            buildingCfgList = [
                { id: 31, pic: "palacenewview_same_building_31", x: 192, y: 272, width: 63, heigh: 36, scale: 4 },
                { id: 41, pic: "palacenewview_same_building_41", x: 89, y: 619, width: 24, heigh: 21, scale: 4 },
                { id: 42, pic: "palacenewview_same_building_42", x: 47, y: 902, width: 26, heigh: 23, scale: 4 },
                { id: 43, pic: "palacenewview_same_building_43", x: 465, y: 710, width: 26, heigh: 23, scale: 4 },
                { id: 44, pic: "palacenewview_same_building_44", x: 69, y: 710, width: 26, heigh: 23, scale: 4 },
                { id: 45, pic: "palacenewview_same_building_45", x: 269, y: 558, width: 24, heigh: 21, scale: 4 },
                { id: 46, pic: "palacenewview_same_building_46", x: 472, y: 805, width: 26, heigh: 22, scale: 4 },
                { id: 47, pic: "palacenewview_same_building_47", x: 61, y: 805, width: 27, heigh: 22, scale: 4 },
                { id: 48, pic: "palacenewview_same_building_48", x: 453, y: 619, width: 24, heigh: 21, scale: 4 },
                { id: 49, pic: "palacenewview_same_building_49", x: 484, y: 902, width: 27, heigh: 23, scale: 4 },
                { id: 50, pic: "palacenewview_same_building_50", x: 98, y: 531, width: 25, heigh: 21, scale: 4 },
                { id: 51, pic: "palacenewview_same_building_51", x: 443, y: 531, width: 24, heigh: 21, scale: 4 },
                { id: 61, pic: "palacenewview_same_building_61", x: 142, y: 997, width: 25, heigh: 18, scale: 4 },
                { id: 62, pic: "palacenewview_same_building_62", x: 259, y: 901, width: 30, heigh: 22, scale: 4 },
                { id: 63, pic: "palacenewview_same_building_63", x: 390, y: 997, width: 25, heigh: 17, scale: 4 },
            ];
        }

        return buildingCfgList;
    }
    private getBrandsCfgList() {
        let brandsCfgList: { id: number, pic: string, x: number, y: number }[] = []
        if (this.isCrossOpen()) {
            if (PlatformManager.checkIsTextHorizontal()) {
                brandsCfgList = [
                    { id: 47, pic: "palacenewview_brands_47", x: 43, y: 1129 },
                    { id: 61, pic: "palacenewview_brands_61", x: 120, y: 1302 },
                    { id: 63, pic: "palacenewview_brands_63", x: 369, y: 1302 },
                    { id: 46, pic: "palacenewview_brands_46", x: 456, y: 1129 },
                    { id: 31, pic: "palacenewview_brands_31", x: 248, y: 650 },
                    { id: 62, pic: "palacenewview_brands_62", x: 248, y: 1213 },
                    { id: 13, pic: "palacenewview_brands_13", x: 0, y: 595 },
                    { id: 1, pic: "palacenewview_brands_1", x: 248, y: 122 },
                    { id: 43, pic: "palacenewview_brands_43", x: 449, y: 1045 },
                    { id: 11, pic: "palacenewview_brands_11", x: 21, y: 507 },
                    { id: 41, pic: "palacenewview_brands_41", x: 65, y: 960 },
                    { id: 14, pic: "palacenewview_brands_14", x: 497, y: 595 },
                    { id: 42, pic: "palacenewview_brands_42", x: 29, y: 1220 },
                    { id: 45, pic: "palacenewview_brands_45", x: 248, y: 902 },
                    { id: 16, pic: "palacenewview_brands_16", x: 492, y: 680 },
                    { id: 48, pic: "palacenewview_brands_48", x: 434, y: 960 },
                    { id: 49, pic: "palacenewview_brands_49", x: 472, y: 1220 },
                    { id: 15, pic: "palacenewview_brands_15", x: 7, y: 680 },
                    { id: 51, pic: "palacenewview_brands_51", x: 425, y: 877 },
                    { id: 12, pic: "palacenewview_brands_12", x: 470, y: 507 },
                    { id: 44, pic: "palacenewview_brands_44", x: 50, y: 1045 },
                    { id: 17, pic: "palacenewview_brands_17", x: 64, y: 422 },
                    { id: 50, pic: "palacenewview_brands_50", x: 74, y: 877 },
                    { id: 18, pic: "palacenewview_brands_18", x: 417, y: 422 },
                    { id: 71, pic: "palacenewview_brands_71", x: 20, y: 273 },//崇德皇
                    { id: 72, pic: "palacenewview_brands_72", x: 248, y: 298 },//昭烈皇
                    { id: 73, pic: "palacenewview_brands_73", x: 485, y: 273 },//玄明皇
                    { id: 20, pic: "palacenewview_brands_20", x: 145, y: 566 },//信帝殿
                    { id: 19, pic: "palacenewview_brands_19", x: 358, y: 566 },//孝帝殿
                ];
                // brandsCfgList = [
                //     { id: 47, pic: "palacenewview_brands_47", x: 46, y: 898 },
                //     { id: 61, pic: "palacenewview_brands_61", x: 132, y: 1073 },
                //     { id: 63, pic: "palacenewview_brands_63", x: 375, y: 1073 },
                //     { id: 46, pic: "palacenewview_brands_46", x: 461, y: 898 },
                //     { id: 31, pic: "palacenewview_brands_31", x: 247, y: 430 },
                //     { id: 62, pic: "palacenewview_brands_62", x: 254, y: 988 },
                //     { id: 13, pic: "palacenewview_brands_13", x: 32, y: 338 },
                //     { id: 1, pic: "palacenewview_brands_1", x: 257, y: 63 },
                //     { id: 43, pic: "palacenewview_brands_43", x: 449, y: 815 },
                //     { id: 11, pic: "palacenewview_brands_11", x: 71, y: 242 },
                //     { id: 41, pic: "palacenewview_brands_41", x: 69, y: 731 },
                //     { id: 14, pic: "palacenewview_brands_14", x: 474, y: 338 },
                //     { id: 42, pic: "palacenewview_brands_42", x: 31, y: 988 },
                //     { id: 45, pic: "palacenewview_brands_45", x: 254, y: 675 },
                //     { id: 16, pic: "palacenewview_brands_16", x: 498, y: 444 },
                //     { id: 48, pic: "palacenewview_brands_48", x: 438, y: 731 },
                //     { id: 49, pic: "palacenewview_brands_49", x: 476, y: 988 },
                //     { id: 15, pic: "palacenewview_brands_15", x: 16, y: 444 },
                //     { id: 51, pic: "palacenewview_brands_51", x: 427, y: 648 },
                //     { id: 12, pic: "palacenewview_brands_12", x: 430, y: 242 },
                //     { id: 44, pic: "palacenewview_brands_44", x: 58, y: 815 },
                //     { id: 17, pic: "palacenewview_brands_17", x: 38, y: 115 },
                //     { id: 50, pic: "palacenewview_brands_50", x: 80, y: 648 },
                //     { id: 18, pic: "palacenewview_brands_18", x: 476, y: 115 },
                // ];
            }
            else {
                brandsCfgList = [
                    { id: 47, pic: "palacenewview_brands_47", x: 35, y: 1144 },// 八贤王
                    { id: 61, pic: "palacenewview_brands_61", x: 105, y: 1303 },//公爵府
                    { id: 63, pic: "palacenewview_brands_63", x: 496, y: 1303 },//侯爵府
                    { id: 46, pic: "palacenewview_brands_46", x: 580, y: 1144 },//靖安王府
                    { id: 31, pic: "palacenewview_brands_31", x: 196, y: 680 },//金銮殿
                    { id: 62, pic: "palacenewview_brands_62", x: 232, y: 1212 },//军机处
                    { id: 13, pic: "palacenewview_brands_13", x: 97, y: 600 },//礼帝殿
                    { id: 1, pic: "palacenewview_brands_1", x: 172, y: 154 },//凌霄殿
                    { id: 43, pic: "palacenewview_brands_43", x: 570, y: 1057 },//平西王府
                    { id: 11, pic: "palacenewview_brands_11", x: 23, y: 505 },//仁帝殿
                    { id: 41, pic: "palacenewview_brands_41", x: 55, y: 977 },//摄政王府
                    { id: 14, pic: "palacenewview_brands_14", x: 520, y: 600 },//文帝殿
                    { id: 42, pic: "palacenewview_brands_42", x: 21, y: 1227 },//文宣王府
                    { id: 45, pic: "palacenewview_brands_45", x: 242, y: 920 },//武成王府
                    { id: 16, pic: "palacenewview_brands_16", x: 504, y: 693 },//武帝殿
                    { id: 48, pic: "palacenewview_brands_48", x: 556, y: 977 },//逍遥王府
                    { id: 49, pic: "palacenewview_brands_49", x: 594, y: 1227 },//宣烈王府
                    { id: 15, pic: "palacenewview_brands_15", x: 111, y: 693 },//义帝殿
                    { id: 51, pic: "palacenewview_brands_51", x: 544, y: 894 },//礼乐王府
                    { id: 12, pic: "palacenewview_brands_12", x: 584, y: 505 },//政帝殿
                    { id: 44, pic: "palacenewview_brands_44", x: 43, y: 1057 },//镇南王府
                    { id: 17, pic: "palacenewview_brands_17", x: 68, y: 413 },//智帝殿
                    { id: 50, pic: "palacenewview_brands_50", x: 67, y: 894 },//智桓王府
                    { id: 18, pic: "palacenewview_brands_18", x: 531, y: 413 },//忠帝殿
                    { id: 71, pic: "palacenewview_brands_71", x: 11, y: 277 },//崇德皇
                    { id: 72, pic: "palacenewview_brands_72", x: 210, y: 312 },//昭烈皇
                    { id: 73, pic: "palacenewview_brands_73", x: 596, y: 277 },//玄明皇
                    { id: 20, pic: "palacenewview_brands_20", x: 142, y: 566 },//信帝殿
                    { id: 19, pic: "palacenewview_brands_19", x: 363, y: 566 },//孝帝殿
                ];
                // brandsCfgList = [
                //     { id: 47, pic: "palacenewview_brands_47", x: 30, y: 924 },
                //     { id: 61, pic: "palacenewview_brands_61", x: 111, y: 1092 },
                //     { id: 63, pic: "palacenewview_brands_63", x: 496, y: 1092 },
                //     { id: 46, pic: "palacenewview_brands_46", x: 583, y: 924 },
                //     { id: 31, pic: "palacenewview_brands_31", x: 206, y: 428 },
                //     { id: 62, pic: "palacenewview_brands_62", x: 233, y: 981 },
                //     { id: 13, pic: "palacenewview_brands_13", x: 27, y: 349 },
                //     { id: 1, pic: "palacenewview_brands_1", x: 206, y: 88 },
                //     { id: 43, pic: "palacenewview_brands_43", x: 571, y: 839 },
                //     { id: 11, pic: "palacenewview_brands_11", x: 65, y: 237 },
                //     { id: 41, pic: "palacenewview_brands_41", x: 54, y: 757 },
                //     { id: 14, pic: "palacenewview_brands_14", x: 582, y: 349 },
                //     { id: 42, pic: "palacenewview_brands_42", x: 18, y: 1009 },
                //     { id: 45, pic: "palacenewview_brands_45", x: 238, y: 682 },
                //     { id: 16, pic: "palacenewview_brands_16", x: 507, y: 456 },
                //     { id: 48, pic: "palacenewview_brands_48", x: 559, y: 754 },
                //     { id: 49, pic: "palacenewview_brands_49", x: 595, y: 1009 },
                //     { id: 15, pic: "palacenewview_brands_15", x: 102, y: 456 },
                //     { id: 51, pic: "palacenewview_brands_51", x: 546, y: 666 },
                //     { id: 12, pic: "palacenewview_brands_12", x: 531, y: 237 },
                //     { id: 44, pic: "palacenewview_brands_44", x: 42, y: 839 },
                //     { id: 17, pic: "palacenewview_brands_17", x: 34, y: 121 },
                //     { id: 50, pic: "palacenewview_brands_50", x: 68, y: 666 },
                //     { id: 18, pic: "palacenewview_brands_18", x: 570, y: 121 },
                // ];
            }
        }
        else {
            if (PlatformManager.checkIsTextHorizontal()) {
                brandsCfgList = [
                    { id: 31, pic: "palacenewview_brands_31", x: 256, y: 279 },
                    { id: 41, pic: "palacenewview_brands_41", x: 68, y: 615 },
                    { id: 42, pic: "palacenewview_brands_42", x: 30, y: 893 },
                    { id: 43, pic: "palacenewview_brands_43", x: 448, y: 707 },
                    { id: 44, pic: "palacenewview_brands_44", x: 57, y: 707 },
                    { id: 45, pic: "palacenewview_brands_45", x: 253, y: 539 },
                    { id: 46, pic: "palacenewview_brands_46", x: 460, y: 796 },
                    { id: 47, pic: "palacenewview_brands_47", x: 45, y: 796 },
                    { id: 48, pic: "palacenewview_brands_48", x: 437, y: 615 },
                    { id: 49, pic: "palacenewview_brands_49", x: 475, y: 893 },
                    { id: 50, pic: "palacenewview_brands_50", x: 79, y: 526 },
                    { id: 51, pic: "palacenewview_brands_51", x: 426, y: 526 },
                    { id: 61, pic: "palacenewview_brands_61", x: 131, y: 982 },
                    { id: 62, pic: "palacenewview_brands_62", x: 253, y: 885 },
                    { id: 63, pic: "palacenewview_brands_63", x: 374, y: 982 },
                ];
            }
            else {
                brandsCfgList = [
                    { id: 31, pic: "palacenewview_brands_31", x: 204, y: 293 },
                    { id: 41, pic: "palacenewview_brands_41", x: 53, y: 615 },
                    { id: 42, pic: "palacenewview_brands_42", x: 17, y: 893 },
                    { id: 43, pic: "palacenewview_brands_43", x: 570, y: 707 },
                    { id: 44, pic: "palacenewview_brands_44", x: 41, y: 707 },
                    { id: 45, pic: "palacenewview_brands_45", x: 237, y: 539 },
                    { id: 46, pic: "palacenewview_brands_46", x: 582, y: 796 },
                    { id: 47, pic: "palacenewview_brands_47", x: 29, y: 796 },
                    { id: 48, pic: "palacenewview_brands_48", x: 558, y: 615 },
                    { id: 49, pic: "palacenewview_brands_49", x: 594, y: 893 },
                    { id: 50, pic: "palacenewview_brands_50", x: 67, y: 526 },
                    { id: 51, pic: "palacenewview_brands_51", x: 545, y: 526 },
                    { id: 61, pic: "palacenewview_brands_61", x: 110, y: 990 },
                    { id: 62, pic: "palacenewview_brands_62", x: 232, y: 885 },
                    { id: 63, pic: "palacenewview_brands_63", x: 495, y: 990 },

                ];
            }
        }
        if (Api.switchVoApi.checkOpenCrossRank())
        {
            for (let i =0; i<brandsCfgList.length; i++)
            {   
                if (brandsCfgList[i].id == 61 || brandsCfgList[i].id == 63)
                {
                    brandsCfgList[i].pic = "palacenewview_brands2_"+brandsCfgList[i].id;
                }
            }
        }
        return brandsCfgList;
    }

    protected isLockedWithSwitch(buiId: string) {
        if ((buiId == "31" || buiId == "62") && !Api.switchVoApi.checkEmperorOpen()) {
            return true;
        }

        let buildcfg = GameConfig.config.buildingCfg[buiId];
        if(buildcfg){
            if (buildcfg.state == 0 && !Api.switchVoApi.checkIsBuildingState(buiId)) {
                return true;
            }
    
            if (buildcfg.state == 1) {
                return false;
            }
        }
        return false
    }


    private onBgTouchHandler(e: egret.TouchEvent): void {
        // if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
        //     let hitPos = new egret.Point(Math.floor(e.localX), Math.floor(e.localY));
        //     this._hitKey = "";
        //     for (let key = 0; key < this._posList.length; key++) {
        //         let cfgPos = this._posList[key];
        //         if (cfgPos.x <= hitPos.x && hitPos.x <= cfgPos.x + cfgPos.width) {
        //             if (cfgPos.y <= hitPos.y && hitPos.y <= cfgPos.y + cfgPos.heigh) {
        //                 this._curTouchShadow = this._shadowList[key];
        //                 let buiId = this._curTouchShadow.name;
        //                 this._curTouchShadow.visible = true;
        //                 let bcfg = GameConfig.config.buildingCfg[buiId];

        //                 if (this.isLockedWithSwitch(buiId)) {
        //                     App.CommonUtil.showTip(LanguageManager.getlocal("palace_buildingNotOpen"));
        //                 } else {
        //                     this._hitKey = this._curTouchShadow.name;
        //                 }
        //                 break;
        //             }
        //         }
        //     }
        // }

        // if (e.type == egret.TouchEvent.TOUCH_CANCEL) {
        //     this._touchCancel = true;
        //     this._hitKey = "";
        //     if (this._curTouchShadow) {
        //         this._curTouchShadow.visible = false;
        //     }
        //     this._curTouchShadow = null;
        // }

        // if (e.type == egret.TouchEvent.TOUCH_END) {
        //     if (!this._touchCancel && this._hitKey != "") {
        //         // this._hitKey 处理点击
        //         this.doHitProcess(this._hitKey);
        //     }
        //     this._touchCancel = false;
        //     this._hitKey = "";
        //     if (this._curTouchShadow) {
        //         this._curTouchShadow.visible = false;
        //     }
        //     this._curTouchShadow = null;
        // }
    }

    protected doHitProcess(key: string) {
        let buildcfg = GameConfig.config.buildingCfg[key];

        let titleId = buildcfg.title;
        let buildingId = key;
        if (buildingId == '62') {
            ViewController.getInstance().openView(ViewConst.COMMON.PROMOTEVIEW);
            return;
        }
        if (Object.keys(titleId).length == 1) {
            let tid = titleId[0];
            let titlecfg = Config.TitleCfg.getTitleCfgById(tid);
            if (!Config.TitleCfg.isTitleOPend(tid)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("palace_titleNotOpen"));
                return;
            }
            let buildId = this.getMainTaskHandBuildId();
            if (buildId && String(buildId.openBuildId) == key){
                if (this._mainTaskHandKey){

                    App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
                    this._mainTaskHandKey = null;
                }
            }
            if (Config.TitleCfg.isTheKingTitleId(tid)) {
                Api.palaceVoApi.enterKingsHouse(tid, buildingId);
            } else {
                ViewController.getInstance().openView(ViewConst.COMMON.PALACEHOUSEVIEW, { titleId: tid, buildingId: buildingId});
            }
        }
        else {
            ViewController.getInstance().openView(ViewConst.COMMON.PALACEHOUSEGROUPVIEW, { buildingId: buildingId });
        }
    }
    /**是否开启跨服 */
    private isCrossOpen() {
        return Api.palaceVoApi.isCrossOpen();
    }

    protected getSoundBgName(): string {
        return SoundConst.MUSIC_PALACE;
    }
    protected getResourceList(): string[] {
        return super.getResourceList().concat([
            // "palace_bg2","palace_bg3",
            "palacenewview_ask_down","palacenewview_close_down",
            "palace_hisBtn1", "palace_hisBtn1_down",
            "palace_hisBtn2", "palace_hisBtn2_down",
            "palace_hisBtn3", "palace_hisBtn3_down",
            "palacenewbirdeffect", "palacenewfountaineffect", "palacenewsweepeffect",
            "palacenewview_effect_light2", "palacenewview_effect_light1", "palacenewview_effect_light3",
            "petalparticle_json", "petalparticle",
            "emperor_achievebtn", "emperor_achievebtn_down", "emperor_titleupbtn", "emperor_titleupbtn_down", "emperorout_inemperor"
        ]);
    };

    protected getRequestData(): { requestType: string, requestData: any } {
        return { requestType: NetRequestConst.REQUEST_PALACE_GETPALACEINFO, requestData: {} };
    }
    protected getRuleInfoParam(): string[] {
        var zoneStr: number = 0;
        zoneStr = App.DateUtil.formatSvrHourByLocalTimeZone(0).hour;
        return [zoneStr + ""];
    }
    protected getRuleInfo() {
        return "palaceRuleInfo";
    }

    protected getExtraRuleInfo():string
    {
        let ruleInfo =  LanguageManager.getlocal(this.getRuleInfo(), this.getRuleInfoParam());
        if (Api.switchVoApi.checkOpenEmperorsAchievement()){
            let achieveInfo = LanguageManager.getlocal("emperorAchieveRuleInfo1");
            ruleInfo += "\n\n"+achieveInfo;
            let outTime = Api.emperorAchieveVoApi.localOutTime();
            let time = Config.EmperoroutingCfg.lastTime / 3600;
            let outInfo = LanguageManager.getlocal("emperorAchieveRuleInfo2", [""+outTime.st, ""+outTime.et, ""+time]);
            ruleInfo += outInfo;
        }
        
        return ruleInfo;
    }

    private upgradeCallBack():void{
        let view = this;
        let brandsCfgList = this.getBrandsCfgList();
        for (let i = 0; i < brandsCfgList.length; i++) {
            let brandsCfg = brandsCfgList[i];
            let cfg = GameConfig.config.buildingCfg[brandsCfg.id];
            let title = null;
            if(cfg && cfg.title){
                title = cfg.title;
            }
            let isHasMan = Api.palaceVoApi.isHasMan(title)
            let isemperor = title && title[0] && Config.TitleCfg.getTitleCfgById(title[0]).titleType == 1 ? true : false;
            let redGroup = <BaseDisplayObjectContainer>view._svContainer.getChildByName(`redPot${i}`);
            if(redGroup){
                if(Api.switchVoApi.checkTitleUpgrade()){
                    if(isHasMan && (!this.isLockedWithSwitch(String(brandsCfg.id)))){
                        let roleinfo = Api.palaceVoApi.getRoleInfoByTitleId(title[0]);
                        if(Number(Api.playerVoApi.getPlayerID() == Number(roleinfo.uid))){
                            if(Api.titleupgradeVoApi.canTitleLevelUp(title[0]) && Api.titleupgradeVoApi.isinTitle(title[0])){
                                App.CommonUtil.addIconToBDOC(redGroup);
                            }
                            else{
                                App.CommonUtil.removeIconFromBDOC(redGroup);
                            }
                            let titleCfg = Config.TitleCfg.getTitleCfgById(title[0]); 
                            let arr = [];
                            switch(titleCfg.titleType){
                                case 1:
                                    arr = Config.TitleupgradeCfg.diList;
                                    break;
                                case 2:
                                    arr = Config.TitleupgradeCfg.wangList;
                                    break;
                                case 7:
                                    arr = Config.TitleupgradeCfg.huangList;
                                    break;
                            }
                            let titlelv = Api.titleupgradeVoApi.getTitleInfo(title[0]).level;
                            if(arr && arr[titlelv - 1] && arr[titlelv - 1].outside){
                                if(!this._svContainer.getChildByName(`palacetitletype${title[0]}`)){
                                    let framenum = 0;
                                    let width = 0;
                                    let height = 0;
                                    let pos = 0;
                                    //千古一帝
                                    let eff = `palacetitletype${titleCfg.titleType}eff`;
                                    let scale = 1;
                                    framenum = titleCfg.titleType == 1 ? 14 : 15;
                                    width = 320;
                                    height = 256;
                                    switch(Number(title[0])){
                                        case 3101:
                                            pos = -120;
                                            scale = 1.5;
                                            break;
                                        case 3201:
                                            pos = -80;
                                            scale = 1.2;
                                            break;
                                        default:                                   
                                            pos = titleCfg.titleType == 1 ? -80 : -90;
                                            break; 
                                    }

                                    let pic = this._svContainer.getChildByName(`pic${title[0]}`);
                                    let clip = ComponentManager.getCustomMovieClip(eff, framenum, 100);
                                    clip.name = `palacetitletype${title[0]}`;
                                    clip.width = width;
                                    clip.height = height;
                                    clip.setScale(scale);
                                    clip.playWithTime(-1);
                                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, clip, pic, [0,pos]);
                                    this._svContainer.addChild(clip);
                                }
                            }
                        }
                    }
                }
            }
        }

        if (this._titleUpBtn){
            if (Api.titleupgradeVoApi.checkNpcMessage()){
                App.CommonUtil.addIconToBDOC(this._titleUpBtn);
                this._titleUpBtnEff.visible = true;
            }
            else{
                App.CommonUtil.removeIconFromBDOC(this._titleUpBtn);
                this._titleUpBtnEff.visible = false;
            }
        }
    }
    protected receiveData(data: { ret: boolean, data: any }): void {
        // data: { ret: boolean, data: any }
        // return {requestType:NetRequestConst.REQUEST_PALACE_GETPALACEINFO,requestData:{}};
        if (data && data.ret && data.data.promoteFlag) {
            Api.promoteVoApi._showNotice = true;
        }
    }
    protected getPromoteList(evt: egret.Event): void {
        if (evt && evt.data && evt.data.ret){
            let list = evt.data.data.data.promoteList;
            if (list) {
                Api.promoteVoApi.initListData(list);
            }
            Api.promoteVoApi._ishaveking = evt.data.data.data.ishaveking;
        }

        let buildingCfgList = this.getBuildingCfgList();
        for (let i = 0; i < buildingCfgList.length; i++) {
            let posBuildingCfg = buildingCfgList[i];
            let pic = BaseLoadBitmap.create(posBuildingCfg.pic);
            pic.width = posBuildingCfg.width;
            pic.height = posBuildingCfg.heigh;
            pic.setScale(posBuildingCfg.scale);
            pic.alpha = 0;
            pic.addTouch((event: egret.TouchEvent) => {
                switch (event.type) {
                    case egret.TouchEvent.TOUCH_BEGIN:
                        pic.alpha = 0.5;
                        break;
                    case egret.TouchEvent.TOUCH_TAP:
                        pic.alpha = 0.5;
                        break;
                    case egret.TouchEvent.TOUCH_CANCEL:
                        pic.alpha = 0;
                        break;
                    case egret.TouchEvent.TOUCH_END:
                        pic.alpha = 0;
                        if (this.isLockedWithSwitch(String(posBuildingCfg.id))) {
                            App.CommonUtil.showTip(LanguageManager.getlocal("palace_buildingNotOpen"));
                        } else {
                            this.doHitProcess(String(posBuildingCfg.id));
                        }
                        break;

                }
            }, this)
            pic.setPosition(this._bg.x + posBuildingCfg.x, this._bg.y + posBuildingCfg.y);
            this._svContainer.addChild(pic);
             /** 有人占据 已解锁开关 帝王霸业已开*/
            if(Api.switchVoApi.checkTitleUpgrade()){
                let cfg = GameConfig.config.buildingCfg[posBuildingCfg.id];
                if(cfg && cfg.title){
                    let title = cfg.title;
                    pic.name = `pic${title[0]}`;
                    let isHasMan = Api.palaceVoApi.isHasMan(title)
                    let titleCfg = Config.TitleCfg.getTitleCfgById(title[0]); 
                    if(isHasMan && (!this.isLockedWithSwitch(String(posBuildingCfg.id)))){//
                        if(titleCfg && titleCfg.isTitle == 1 && titleCfg.titleType < 3){
                            let roleinfo = Api.palaceVoApi.getRoleInfoByTitleId(title[0]);
                            let arr = [];
                            switch(titleCfg.titleType){
                                case 1:
                                    arr = Config.TitleupgradeCfg.diList;
                                    break;
                                case 2:
                                    arr = Config.TitleupgradeCfg.wangList;
                                    break;
                                case 7:
                                    arr = Config.TitleupgradeCfg.huangList;
                                    break;
                            }
                            if(arr && roleinfo.tlv && arr[roleinfo.tlv - 1] && arr[roleinfo.tlv - 1].outside){//
                                let framenum = 0;
                                let width = 0;
                                let height = 0;
                                let pos = 0;
                                //千古一帝
                                let eff = `palacetitletype${titleCfg.titleType}eff`;
                                let scale = 1;
                                framenum = titleCfg.titleType == 1 ? 14 : 15;
                                width = 320;
                                height = 256;
                                switch(Number(title[0])){
                                    case 3101:
                                        pos = -120;
                                        scale = 1.5;
                                        break;
                                    case 3201:
                                        pos = -80;
                                        scale = 1.2;
                                        break;
                                    default:                                   
                                        pos = titleCfg.titleType == 1 ? -80 : -90;
                                        break; 
                                }
                                let clip = ComponentManager.getCustomMovieClip(eff, framenum, 100);
                                clip.width = width;
                                clip.name = `palacetitletype${title[0]}`;
                                clip.height = height;
                                clip.setScale(scale);
                                clip.playWithTime(-1);
                                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, clip, pic, [0,pos]);
                                this._svContainer.addChild(clip);
                            }
                        } 
                    }
                }
                
                //titleType  称号类型，称号二级页签的二级判断(仅作用于isTitle=1时)  1：帝 2：王 3：公 4：侯 
            }
        }
        let brandsCfgList = this.getBrandsCfgList();
        for (let i = 0; i < brandsCfgList.length; i++) {
            let brandsCfg = brandsCfgList[i];
            let cfg = GameConfig.config.buildingCfg[brandsCfg.id];
            let title = null;
            if(cfg && cfg.title){
                title = cfg.title;
            }
            
            let isHasMan = Api.palaceVoApi.isHasMan(title)
            let isemperor = title && title[0] && Config.TitleCfg.getTitleCfgById(title[0]).titleType == 1 ? true : false;
            let ths=this;
            let pic = BaseLoadBitmap.create(brandsCfg.pic, null, {
                callback: () => {
                    ths=ths||this;
                    if(!ths._bg)
                    {
                        return;
                    }
                    pic.setPosition(ths._bg.x + brandsCfg.x, ths._bg.y + brandsCfg.y);
                    ths._svContainer.addChild(pic);

                    if (isHasMan && (!ths.isLockedWithSwitch(String(brandsCfg.id)))){
                        let lightRes = "palacenewview_effect_light2";
                        let scaleX = 0.69;
                        let scaleY = 1.22;
                        let rotation = 90;
                        if (!isemperor) {
                            lightRes = "palacenewview_effect_light3";
                            scaleX = 0.64;
                            scaleY = 1.1;
                        }
                        if (PlatformManager.checkIsTextHorizontal()) {
                            lightRes = "palacenewview_effect_light1";
                            scaleX = 1.12;
                            scaleY = 0.81;
                            rotation = 0;
                        }
                        let light = BaseBitmap.create(lightRes);
                        light.setPosition(pic.x + pic.width / 2 - light.width / 2, pic.y + pic.height / 2 - light.height / 2);
                        ths._svContainer.addChild(light);
                        light.blendMode = egret.BlendMode.ADD;
                        light.alpha = 0;

                        let sweep = ComponentManager.getCustomMovieClip("palacenewsweepeffect", 15, 70);
                        let sweepBM = BaseBitmap.create("palacenewsweepeffect1");
                        sweep.anchorOffsetX = sweepBM.width / 2;
                        sweep.anchorOffsetY = sweepBM.height / 2;
                        sweep.rotation = rotation;
                        sweep.blendMode = egret.BlendMode.ADD;
                        sweep.setPosition(pic.x + pic.width / 2, pic.y + pic.height / 2)
                        sweep.scaleX = scaleX;
                        sweep.scaleY = scaleY;
                        ths._svContainer.addChild(sweep);
                        egret.Tween.get(light, { loop: true }).to({ alpha: 0.2 }, 500).call(() => {
                            sweep.playWithTime(1);
                        }, ths).to({ alpha: 1 }, 750).to({ alpha: 0 }, 1250);
                    }

                    let redGroup = new BaseDisplayObjectContainer();
                    redGroup.width = pic.width;
                    redGroup.height = pic.height;
                    ths._svContainer.addChild(redGroup);
                    redGroup.name = `redPot${i}`;
                    // redGroup.setPosition(ths._bg.x + brandsCfg.x + 13, this._bg.y + brandsCfg.y);
                    redGroup.setPosition(ths._bg.x + brandsCfg.x, this._bg.y + brandsCfg.y);
                    
                    if(i == brandsCfgList.length - 1){
                        ths.upgradeCallBack();
                        ths.showInHouseFalg();
                    }
                }, callbackThisObj: this, callbackParams: null
            });
            if (this.isLockedWithSwitch(String(brandsCfg.id))) {
                App.DisplayUtil.changeToGray(pic);
            }
            else {
                App.DisplayUtil.changeToNormal(pic);

            }
        }

        //帝王霸业
        let titleUpBtn = null;
        if (Api.switchVoApi.checkTitleUpgrade()){
            App.LogUtil.log("帝王霸业&&");
            titleUpBtn = ComponentManager.getButton("emperor_titleupbtn", "", ()=>{
                ViewController.getInstance().openViewByFunName("titleupgrade");
            }, this);
            titleUpBtn.setPosition(GameConfig.stageWidth - titleUpBtn.width - 10, GameConfig.stageHeigth - titleUpBtn.height - 30);
            this.addChildToContainer(titleUpBtn);
            let titleUpEff = ComponentManager.getCustomMovieClip("emperortitle_iconeffect", 10, 70);
            titleUpEff.setPosition(titleUpBtn.x - 17, titleUpBtn.y - 13);
            titleUpEff.playWithTime(0);
            this.addChildToContainer(titleUpEff);
            this._titleUpBtnEff = titleUpEff;
            this._titleUpBtnEff.visible = false;
            if (Api.titleupgradeVoApi.checkNpcMessage()){
                App.CommonUtil.addIconToBDOC(titleUpBtn);
                this._titleUpBtnEff.visible = true;
            }
            else{
                App.CommonUtil.removeIconFromBDOC(titleUpBtn);
            }
            this._titleUpBtn = titleUpBtn;
        }

        //帝王成就
        if (Api.switchVoApi.checkTitleUpgrade() && Api.switchVoApi.checkOpenEmperorsAchievement()){
            let achieveBtn = ComponentManager.getButton("emperor_achievebtn", "", ()=>{
                ViewController.getInstance().openView(ViewConst.COMMON.EMPERORACHIEVEVIEW);
            }, this);
            if (titleUpBtn){
                achieveBtn.setPosition(titleUpBtn.x - 10 - achieveBtn.width, titleUpBtn.y);
            }
            else{
                achieveBtn.setPosition(GameConfig.stageWidth - achieveBtn.width - 10, GameConfig.stageHeigth - achieveBtn.height - 120);
            }
            this.addChildToContainer(achieveBtn);
            let achieveBtnEff = ComponentManager.getCustomMovieClip("emperorachieve_iconeffect", 10, 70);
            achieveBtnEff.setPosition(achieveBtn.x - 15, achieveBtn.y - 15);
            achieveBtnEff.playWithTime(0);
            this.addChildToContainer(achieveBtnEff);
            achieveBtnEff.visible = false;
            this._achieveBtn = achieveBtn;
            this._achieveBtnEff = achieveBtnEff;
            this.refreshEmperorAchieve();
        }
    }

    private collectHandlerCallback(evt?:any):void{
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
    }

    public dispose(): void {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PROMOTE_INDEX), this.getPromoteList, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_TITLEUPGRADE_MODEL,this.upgradeCallBack,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPERORACHIEVE_GETREWARD), this.refreshEmperorAchieve, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPERORACHIEVE_BARRAGE), this.refreshEmperorAchieve, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPERORACHIEVE_GETPOPULARRWD), this.refreshEmperorAchieve, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPERORACHIEVE_GETBONUS), this.refreshEmperorAchieve, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PALACE_GETSALARY),this.collectHandlerCallback,this);
        egret.Tween.removeTweens(this);
        this._bg = null;
        this._scrollView = null;
        this._svContainer = null;
        Api.mainTaskVoApi.isKeepGuide = false;
        Api.mainTaskVoApi.hideGuide();
        this._achieveBtn = null;
        this._titleUpBtn = null;
        this._achieveBtnEff = null;
        this._titleUpBtnEff = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;

        super.dispose();
    }
}