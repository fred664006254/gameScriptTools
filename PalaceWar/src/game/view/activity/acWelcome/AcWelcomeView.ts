/**
 * 功能预告
 * author ycg
 * date 2019.9.29
 * @class AcWelcomeView
 */
class AcWelcomeView extends AcCommonView{
    private _acTimeDown:BaseTextField = null;
    private _bottomBg:BaseBitmap = null;

    public constructor(){
        super();
    }

    public initView():void{
        let maskBmp = BaseBitmap.create("public_9_viewmask");
		maskBmp.width=GameConfig.stageWidth;
		maskBmp.height=GameConfig.stageHeigth;
        this.addChildToContainer(maskBmp);
        maskBmp.alpha = 0.8;
        //标题
        let titleBgStr = ResourceManager.hasRes("acwelcome_title-"+this.getTypeCode()) ? "acwelcome_title-"+this.getTypeCode() : "acwelcome_title-1";
        let titleBg = BaseBitmap.create(titleBgStr);
        titleBg.setPosition(GameConfig.stageWidth/2 - titleBg.width/2, 60);
        
        //底部
        let bottomBgStr = ResourceManager.hasRes("acwelcome_bottombg-"+this.getTypeCode()) ? "acwelcome_bottombg-"+this.getTypeCode() : "acwelcome_bottombg-1";
        let bottomBg = BaseBitmap.create(bottomBgStr);
        bottomBg.setPosition(GameConfig.stageWidth/2 - bottomBg.width/2, GameConfig.stageHeigth - bottomBg.height - 80);
        this._bottomBg = bottomBg;

        //红颜
        if (this.code == "1"){
            this.showWifeContainer();
            //樱花特效
            let blossomBone = "acwelcome_blossom";
            let blossomBoneName = blossomBone + "_ske";
            if ((!Api.switchVoApi.checkCloseBone()) && RES.hasRes(blossomBoneName) && App.CommonUtil.check_dragon()) {
                let blossomIcon = App.DragonBonesUtil.getLoadDragonBones("acwelcome_blossom");
                blossomIcon.x = 100;
                blossomIcon.y = 170;
                this.addChildToContainer(blossomIcon);
            }
            //蝴蝶
            let buttflyEffect = ComponentManager.getCustomMovieClip("acwelcome_effect_butflay", 15, 70);
            buttflyEffect.setPosition(40, bottomBg.y - 330);
            buttflyEffect.playWithTime(0);
            this.addChildToContainer(buttflyEffect);
            //扇子
            let funEffect = ComponentManager.getCustomMovieClip("acwelcome_effect_fun", 15, 70);
            funEffect.setPosition(0, bottomBg.y);
            funEffect.playWithTime(0);
            this.addChildToContainer(funEffect);
            bottomBg.visible = false;
        }

        this.addChildToContainer(titleBg);
        this.addChildToContainer(bottomBg);

        //即将开启
        let openInfoBg = BaseBitmap.create("qingyuanitemtitlebg");
        openInfoBg.y = bottomBg.y + 40;
        this.addChildToContainer(openInfoBg);

        let openInfo = ComponentManager.getTextField(LanguageManager.getlocal("acWelcomeOpenInfo"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_WHITE);
        openInfoBg.width = openInfo.width + 60;
        openInfoBg.x = GameConfig.stageWidth/2 - openInfoBg.width/2;
        openInfo.setPosition(openInfoBg.x + openInfoBg.width/2 - openInfo.width/2, openInfoBg.y + openInfoBg.height/2 - openInfo.height/2);
        this.addChildToContainer(openInfo);

        //倒计时
        let timeBg = BaseBitmap.create("countrywarrewardview_itembg");
        timeBg.width = 300;
        timeBg.height = 66;
        timeBg.x = GameConfig.stageWidth/2 - timeBg.width/2;
        timeBg.y = openInfoBg.y + openInfoBg.height + 20;
        this.addChildToContainer(timeBg);

        let acTimeDown = ComponentManager.getTextField(LanguageManager.getlocal("acWelcomeTimeDown", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        acTimeDown.textAlign = TextFieldConst.ALIGH_CENTER;
        acTimeDown.setPosition(timeBg.x + timeBg.width/2 - acTimeDown.width/2, timeBg.y + timeBg.height/2 - acTimeDown.height/2);
        this.addChildToContainer(acTimeDown);
        this._acTimeDown = acTimeDown;
        acTimeDown.lineSpacing = 5;

        let bottomInfo = ComponentManager.getTextField(LanguageManager.getlocal("acWelcomeBottomInfo-"+this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        bottomInfo.setPosition(GameConfig.stageWidth/2 - bottomInfo.width/2, GameConfig.stageHeigth - 80);
        this.addChildToContainer(bottomInfo);
    }

    public showWifeContainer():void{
        let wifeIdArr = [311, 304, 303];
        let infoArr = [
            // {x: 320, y:30, imgY: -20},
            // {x: 420, y:130, imgY: 150},
            // {x: 220, y:180, imgY: 200}
            {x: 320, y:-5, imgY: -20},
            {x: 440, y:110, imgY: 150},
            {x: 200, y:170, imgY: 200}
        ];
        for (let i=0; i < wifeIdArr.length; i++){
            let container = this.getWifeContainer(wifeIdArr[i], infoArr[i].x, infoArr[i].y, infoArr[i].imgY);
            // container.setPosition(infoArr[i].x, this._bottomBg.y + infoArr[i].y);
            this.addChildToContainer(container);
        }
    }

    public tick():void{
        this._acTimeDown.text = LanguageManager.getlocal("acWelcomeTimeDown", [this.vo.getCountDown()]);
    }

    public getWifeContainer(wifeId:number, posX:number, posY:number, imgY:number):BaseDisplayObjectContainer{
        let container = new BaseDisplayObjectContainer();
        let wifeCfg:any = Config.WifeCfg.getWifeCfgById(wifeId);
        let boneName = undefined;
        if (wifeCfg && wifeCfg.bone) {
            boneName = wifeCfg.bone + "_ske";
        }
        container.x = posX;
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            let droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(wifeCfg.bone);
            // droWifeIcon.setScale(0.8);
            droWifeIcon.setScale(0.8);
            droWifeIcon.anchorOffsetY = droWifeIcon.height;
            droWifeIcon.anchorOffsetX = droWifeIcon.width / 2; 
            container.addChild(droWifeIcon);  
            container.y = this._bottomBg.y + posY;        
        }
        else {
            let wifeImg = BaseLoadBitmap.create(wifeCfg.body);
            wifeImg.width = 640;
            wifeImg.height = 840;
            wifeImg.anchorOffsetY = wifeImg.height;
            wifeImg.anchorOffsetX = wifeImg.width / 2;
            wifeImg.setScale(0.67);
            container.addChild(wifeImg);
            container.y = this._bottomBg.y + imgY;
        }
        return container;
    }

    public getTypeCode():string{
        return this.code;
    }

    private get vo():AcWelcomeVo{
        return <AcWelcomeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    public get cfg(){
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    protected getTitleBgName():string{
        return "";
    }

    protected getTitleStr():string{
        return "";
    }

    protected getBgName():string{
        return "";
    }


    public getResourceList():string[]{
        let list:string[] = [];
        if (this.getTypeCode() == "1"){
            list = [
                "acwelcome_title-1",
                "acwelcome_bottombg-1"
            ];
        }
        return super.getResourceList().concat([
            "countrywarrewardview_itembg", "qingyuanitemtitlebg",
        ]).concat(list);
    }

    public dispose():void{
        this._acTimeDown = null;
        this._bottomBg = null;  
        super.dispose();
    }
}