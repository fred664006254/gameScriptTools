/**
* 皇城六部 mainui
* date 2020.5.7
* author ycg
* @name SixSectionView
*/
class SixSectionView extends CommonView{
    private _buildList:any[] = [];
    public constructor() {
        super();
    }

    protected getBgName():string{
        return "sixsectionmainui_bg";
    }

    protected getTitleStr():string{
        return null;
    }

    protected getTitleBgName():string{
        return "";
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected getRuleInfo():string{
        return "sixSectionRuleInfo";
    }

    protected getExtraRuleInfo():string{
        let str = LanguageManager.getlocal("sixSectionRuleInfo");
        if (Api.switchVoApi.checkOpenSixSectionBuilding(1)){
            let param = LanguageManager.getlocal("officialTitle"+Config.Sixsection1Cfg.needLv);
            str += LanguageManager.getlocal("sixSectionRuleInfoBuild1", [param]);
        }
		return str;
	}

    protected getProbablyInfo():string{
        return ""
    }

    protected getRuleBtnName():string
	{	
		return ButtonConst.BTN2_RULE;
	}

    // protected getCloseBtnName():string
	// {
	// 	return ButtonConst.COMMON_CLOSE_2;
	// }

    protected getResourceList():string[]{
        let list:string[] = [];
        return super.getResourceList().concat(
            "sixsectionmainui", "sixsection1"
        ).concat(list);
    }

    //建筑顶部居中对齐 标签顶部居中对齐
    private getBuildPosCfg():any[]{
        return [
            {id:0, build:{x: 0, y: 92, scale: 4}, nameBg:{x: 320, y: 300}},//皇城
            {id:1, build:{x: 0, y: 377, scale: 4}, nameBg:{x: 122, y: 469}},//兵部
            {id:2, build:{x: 394, y: 370, scale: 4}, nameBg:{x: 518, y: 469}}, //吏部
            {id:3, build:{x: 44, y: 561, scale: 4}, nameBg:{x: 102, y: 690}}, //户部
            {id:4, build:{x: 356, y: 456, scale: 4}, nameBg:{x: 538, y: 690}}, //礼部
            {id:5, build:{x: 0, y: 764, scale: 4}, nameBg:{x: 82, y: 970}}, //刑部
            {id:6, build:{x: 378, y: 766, scale: 4}, nameBg:{x: 558, y: 970}}, //工部
        ];
    }

    public initView():void{
        this.setLayoutPosition(LayoutConst.righttop, this.closeBtn, this, [0,0]);
        let bgContainer = new BaseDisplayObjectContainer();
        bgContainer.width = GameConfig.stageWidth;
        let bgScrollView = ComponentManager.getScrollView(bgContainer, new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth));
        this.addChildToContainer(bgScrollView);
        bgScrollView.bounces = false;

        let titleBg = BaseBitmap.create("sixsectionmainui_titblebg");
        titleBg.setPosition(GameConfig.stageWidth/2 - titleBg.width/2, 0);
        this.addChildToContainer(titleBg);

        let bg = BaseBitmap.create("sixsectionmainui_bg");
        bgContainer.addChild(bg);
        bgContainer.height = bg.height;
        bgScrollView.setScrollTop(bg.height - bgScrollView.height);

        let buildCfg = this.getBuildPosCfg();
        let count = buildCfg.length;
        for (let i=0; i < count; i++){
            let posCfg = buildCfg[i];
            let build = BaseBitmap.create("sixsectionmainui_build"+(posCfg.id+1));
            build.setPosition(posCfg.build.x, posCfg.build.y);
            bgContainer.addChild(build);

            let nameContainer = new BaseDisplayObjectContainer();
            bgContainer.addChild(nameContainer);
            let nameBgImg = "sixsectionmainui_buildname"+(buildCfg[i].id + 1);
            // if (i == 0){
            //     nameBgImg = "sixsectionmainui_buildnamebg1";
            // }
            let nameBg = BaseBitmap.create(nameBgImg);
            nameContainer.width = nameBg.width;
            nameContainer.height = nameBg.height;
            nameContainer.addChild(nameBg);
            // nameBg.anchorOffsetX = nameBg.width/2;
            nameContainer.setPosition(posCfg.nameBg.x - nameContainer.width/2, posCfg.nameBg.y);

            let timeContainer = new BaseDisplayObjectContainer();
            bgContainer.addChild(timeContainer);
            let timeBg = BaseBitmap.create("public_itemtipbg2");
            timeContainer.addChild(timeBg);
            timeContainer.height = timeBg.height;
            let time = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
            timeContainer.addChild(time);
            time.y = timeBg.height/2 - time.size/2;
            timeContainer.setPosition(nameContainer.x, nameContainer.y + nameContainer.height);
            timeContainer.visible = false;
            
            // let nameStr = "sixSectionBuildName"+(posCfg.id + 1);
            if (!this.checkBuildIsOpen(posCfg.id)){
                // App.DisplayUtil.changeToGray(nameBg);
                // nameStr = "sixSectionBuildNotOpen1";
                nameBg.setRes("sixsectionmainui_buildname_notopen");
            }
            else{
                if (this.checkIsInBuildTime(posCfg.id)){
                    timeContainer.visible = true;
                    time.text = this.getTimeCountDown(posCfg.id);
                    timeBg.width = time.width + 40;
                    time.x = timeBg.x + timeBg.width/2 - time.width/2;
                    time.y = timeBg.y + timeBg.height/2 - time.height/2;
                    timeContainer.setPosition(nameContainer.x + nameContainer.width/2 - timeBg.width/2, nameContainer.y + nameContainer.height);
                }
                else{
                    // nameStr = "sixSectionBuildNotOpen2";
                    App.DisplayUtil.changeToGray(nameBg);
                }
            }
            // let name = ComponentManager.getTextField(LanguageManager.getlocal(nameStr), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            // name.anchorOffsetX = name.width/2;
            // name.setPosition(nameBg.x + nameBg.width/2, nameBg.y + nameBg.height/2 - name.height/2);
            // nameContainer.addChild(name);
            build.alpha = 0;
            build.setScale(4);
            build.addTouch((event: egret.TouchEvent) => {
                switch (event.type) {
                    case egret.TouchEvent.TOUCH_BEGIN:
                        build.alpha = 0.5;
                        break;
                    case egret.TouchEvent.TOUCH_TAP:
                        build.alpha = 0.5;
                        break;
                    case egret.TouchEvent.TOUCH_CANCEL:
                        build.alpha = 0;
                        break;
                    case egret.TouchEvent.TOUCH_END:
                        build.alpha = 0;
                        this.buildClick(i);
                        break;
                }
            }, this);

            let builds = {build: build, nameContainer: nameContainer, nameBg: nameBg, timeContainer: timeContainer, timeBg: timeBg, time: time};
            this._buildList[i] = builds;
        }

        this.checkBuildRedPoint();
    }

    private buildClick(index:number){
        App.LogUtil.log("buildClick "+index);
        if (this.checkBuildIsOpen(index)){
            if (this.checkIsInBuildTime(index)){
                if (index == 1){
                    let pLv = Api.playerVoApi.getPlayerLevel();
                    let needLv = Config.Sixsection1Cfg.needLv;
                    NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_CLICK, {stype: 1});
                    if (pLv < needLv){
                        App.CommonUtil.showTip(LanguageManager.getlocal("sixSectionBuildNotOpenTip2", [LanguageManager.getlocal("officialTitle"+needLv)]));
                        return;
                    }
                    if (!Api.sixsection1VoApi.checkServantLimit()){
                        App.CommonUtil.showTip(LanguageManager.getlocal("sixSectionBuildNotOpenTip3", [""+Api.sixsection1VoApi.getServantLimit()]));
                        return ;
                    }
                }
                let className = "SixSection"+index+"View";
                ViewController.getInstance().openView(className);
            }
            else{
                App.CommonUtil.showTip(LanguageManager.getlocal("sixSectionBuildNotOpenTip3_"+index));
            }
        }
        else{
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSectionBuildNotOpenTip1"));
        }
    }

    private freshBuild():void{
        let buildCfg = this.getBuildPosCfg();
        for (let i=0; i < this._buildList.length; i++){
            let buildData = this._buildList[i];
            if (this.checkBuildIsOpen(buildCfg[i].id)){
                // buildData.name.text = LanguageManager.getlocal("sixSectionBuildName"+(buildCfg[i].id + 1));
                // buildData.name.anchorOffsetX = buildData.name.width/2;
                buildData.nameBg.setRes("sixsectionmainui_buildname"+(buildCfg[i].id + 1));
                if (this.checkIsInBuildTime(buildCfg[i].id)){
                    App.DisplayUtil.changeToNormal(buildData.nameBg);
                    buildData.timeContainer.visible = true;
                    buildData.time.text = this.getTimeCountDown(buildCfg[i].id);
                    buildData.timeBg.width = buildData.time.width + 40;
                    buildData.time.x = buildData.timeBg.x + buildData.timeBg.width/2 - buildData.time.width/2;
                    // buildData.time.y = buildData.timeBg.y + buildData.timeBg.height/2 - buildData.time.height/2;
                    buildData.timeContainer.x = buildData.nameContainer.x + buildData.nameContainer.width/2 - buildData.timeBg.width/2;
                }
                else{
                    buildData.timeContainer.visible = false;
                    App.DisplayUtil.changeToGray(buildData.nameBg);
                }
            }
            else{
                buildData.timeContainer.visible = false;
                // App.DisplayUtil.changeToGray(buildData.nameBg);
                // buildData.name.text = LanguageManager.getlocal("sixSectionBuildNotOpen1");
                // buildData.name.anchorOffsetX = buildData.name.width/2;
                buildData.nameBg.setRes("sixsectionmainui_buildname_notopen");
            }
        }
    }

    //开关是否打开
    private checkBuildIsOpen(buildId:string|number):boolean{
        if (Api.switchVoApi.checkOpenSixSectionBuilding(buildId)){
            return true;
        }
        return false;
    }

    //是否在开启时间内
    private checkIsInBuildTime(buildId:string|number):boolean{
        if (Number(buildId) == 1){
            return Api.sixsection1VoApi && Api.sixsection1VoApi.isInPeriousTime();
        }
        return false;
    }

    //红点
    private checkBuildRedPoint(){
        for (let i=0; i < this._buildList.length; i++){
            let apiName = "sixsection"+i+"VoApi";
            if (Api[apiName] && Api[apiName].checkRedPoint()){
                App.CommonUtil.addIconToBDOC(this._buildList[i].nameContainer);
            }
            else{
                App.CommonUtil.removeIconFromBDOC(this._buildList[i].nameContainer);
            }
        }
    }

    //功能倒计时
    private getTimeCountDown(id:number|string):string{
        let str = "";
        if (Number(id) == 1){
            let et = Api.sixsection1VoApi.et - GameData.serverTime;
            if (et < 0){
                et = 0;
            }
            str = App.DateUtil.getFormatBySecond(et, 17);
        }
        return str;
    }

    public tick():void{
        this.freshBuild();
        this.checkBuildRedPoint();
    }

    public dispose():void{
        this._buildList = [];
        super.dispose();
    }
}