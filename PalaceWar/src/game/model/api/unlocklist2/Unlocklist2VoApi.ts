/**
 * 功能解锁弹窗特效
 * author ycg
 * date 2020.6.19
 */
class Unlocklist2VoApi extends BaseVoApi{
    private _isAtHome:boolean = true;
    private _isShowing:boolean = false;
    private _showList:any[] = [];
    private _baseId:string = null;
    public _isInGuide:boolean = false;
    public _isNeedWait:boolean = false;

    public constructor() {
		super();
    }

    //是否在府内
    public setAtHome(isAtHome:boolean):void{
        this._isAtHome = isAtHome;
    }

    public getAtHome():boolean{
        return this._isAtHome;
    }

    //是否可以刷新界面按钮
    public setShowBase(name:string){
        this._baseId = name;
    }

    public clearBaseId(){
        this._baseId = null;
    }

    //解锁列表
    public get cfg():any{
        return Config.Unlocklist2Cfg;
    }

    //是否在解锁列表内
    public isInUnlockList(name:string):boolean{
        if (!name){
            return false;
        }
        let cfgList = this.cfg.getUnLockCfgList();
        for (let i=0; i < cfgList.length; i++){
            if (name == cfgList[i].gameName){
                return true;
            }
        }
        return false;
    }

    //是否需要判断功能解锁
    public checkShowOpenFunc():boolean{
        if (Api.switchVoApi.checkOpenUnlockFuncEffect()){
            let unlockData = Api.otherInfoVoApi.getOpenFunUnlockList2();
            if (unlockData){
                return true;
            }
        }
        return false;
    }

    public isNeedShowById(id:string|number):boolean{
        let unlockData = Api.otherInfoVoApi.getOpenFunUnlockList2();
        if (unlockData){
            if (unlockData[id]){
                return false;
            }
            return true;
        }
        return false;
    }

    //是否需要弹特效
    public isInNeedShowEffect(name:string):boolean{
        if (!name){
            return false;
        }
        if (this.isInUnlockList(name)){
            let cfgList = Config.Unlocklist2Cfg.getUnlockCfgListByShow(true);
            for (let i=0; i < cfgList.length; i++){
                if (name == cfgList[i].gameName){
                    if (this.isNeedShowById(cfgList[i].id) || this._baseId == cfgList[i].id){
                        return true;
                    }
                    break;
                }
            }
        }
        return false;
    }

    public checkWaitingShowInHome():void{
        if (!this.checkShowOpenFunc()){
            return ;
        }
        this._isShowing = false;
        this._showList = [];
        let cfgList = Config.Unlocklist2Cfg.getNeedShowCfgListByType(2);
        App.LogUtil.log("checkWaitingShowInHome "+this._isAtHome);
        if (this._isAtHome){
            cfgList = Config.Unlocklist2Cfg.getNeedShowCfgListByType(1);
            let friendCfg = this.getNeedShowCfgByName("friend");
            if (friendCfg){
                this._showList.push(friendCfg);
            }
        }
        App.LogUtil.log("checkWaitingShowInHome 1");
        if (!cfgList){
            return;
        }
        App.LogUtil.log("checkWaitingShowInHome 2");
        for (let i=0; i < cfgList.length; i++){
            if (cfgList[i].unlockOpen == 1){
                let key = cfgList[i].gameName;
                let functionName:string = "checkOpen"+App.StringUtil.firstCharToUper(key);
                if(Api.switchVoApi[functionName])
                {
                    if(!Api.switchVoApi[functionName]())
                    {
                        continue;
                    }
                }
                if (Api[key+"VoApi"] && Api[key+"VoApi"].isShowNpc){
                    if (Api[key+"VoApi"].isShowNpc() && this.isInNeedShowEffect(key)){
                        this._showList.push(cfgList[i]);
                    }
                }
            }
        }

        console.log("checkwaitingshowinhome ", this._showList);
        App.LogUtil.log("this.isInHomeCanShow() "+this.isInHomeCanShow());
        if (this._showList.length > 0 && this.isInHomeCanShow()){
            if (!this._isAtHome){
                this._isShowing = true;
                let data = this.getHomeEffectCfg(this._showList[0]);
                this._showList.shift();
                if (data.scrollX > -1){
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CHECK_FUNCTION_CITYSCENE_SCROLL, {data: data});
                }
                ViewController.getInstance().openView(ViewConst.COMMON.UNLOCKFUNCTIONVIEW, {data: data}); 
            }
            else{
                let key = this._showList[0].gameName;
                let data:any = {};
                if (key == "friend"){
                    // this._isShowing = true;
                    if (Api.switchVoApi.checkOpenHouseBtnUp()){
                        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CHECK_FUNCTION_OPEN_HOUSEFUNC, {key: "friend"});
                        data = {
                            icon: "mainui_friends_btn",
                            data: this._showList[0],
                            iconX: GameConfig.stageWidth - 116,
                            iconY: GameConfig.stageHeigth - 374,
                            iconW: 76,
                            iconH: 76,
                        }
                    }
                    else{
                        data = {
                            icon: "mainui_friends_btn",
                            data: this._showList[0],
                            iconX: GameConfig.stageWidth - 76,
                            iconY: GameConfig.stageHeigth - 231,
                            iconW: 76,
                            iconH: 76,
                        }
                    }
                    App.LogUtil.log("checkwaitingshowinhome data "+key);
                    ViewController.getInstance().openView(ViewConst.COMMON.UNLOCKFUNCTIONVIEW, {data: data});
                }
            } 
        }
    }

    public getHomeEffectCfg(data:any):any{
        let sceneName = "homeScene";
        let bgKey = "home";
        let nameX = 0;
        let nameY = 0;
        let scrollX = -1;
        let sceneWidth = 640;
        let sceneHeight = 1136;
        let nameBgW = 35;
        let nameBgH = 96;

        if (data.position == 2){
            sceneName = "cityScene";
            bgKey = "city";
            let curCfg=Config.SceneCfg.getSceneCfgBySceneName(sceneName, Api.otherInfoVoApi.getCurSceneId(sceneName));
            if (Api.otherInfoVoApi.isSceneCanScroll(sceneName)){
                if (data.gameName == "alliance"){//帮会
                    scrollX = 640;
                }
                else if (data.gameName == "studyatk"){//演武场
                    scrollX = 0;
                }
                else if (data.gameName == "conquest"){//征伐
                    scrollX = 0;
                }
                else if (data.gameName == "trade"){//商贸
                    scrollX = 1280;
                }
                else if (data.gameName == "council"){//议事院
                    scrollX = 640;
                }
                sceneWidth = 1920;
                sceneHeight = 1003;
            }
            nameY= curCfg.namePosCfg[data.gameName+"name"] ? curCfg.namePosCfg[data.gameName+"name"].y : curCfg.posCfg[data.gameName].y;
            nameX = curCfg.namePosCfg[data.gameName+"name"] ? curCfg.namePosCfg[data.gameName+"name"].x : curCfg.posCfg[data.gameName].x;
        }
        else if (data.position == 1) {
            let curCfg=Config.SceneCfg.getSceneCfgBySceneName(sceneName, Api.otherInfoVoApi.getCurSceneId(sceneName));
            if (Api.otherInfoVoApi.isSceneCanScroll(sceneName)){
               
            }
            nameY= curCfg.namePosCfg[data.gameName+"name"] ? curCfg.namePosCfg[data.gameName+"name"].y : curCfg.posCfg[data.gameName].y;
            nameX = curCfg.namePosCfg[data.gameName+"name"] ? curCfg.namePosCfg[data.gameName+"name"].x : curCfg.posCfg[data.gameName].x;
        }
        let nameBg:string = bgKey+"npc"+data.gameName+"name";
        if (PlatformManager.checkIsTextHorizontal()){
            nameBgW = 148;
            nameBgH = 30;
        }
        return {
            data: data,
            iconX: nameX,
            iconY: nameY,
            icon: nameBg,
            iconW: nameBgW,
            iconH: nameBgH,
            sceneWidth: sceneWidth,
            sceneHeight: sceneHeight,
            scrollX: scrollX,
            isHome: true
        }
    }

    //是否需要显示解锁，府内府外建筑除外
    public checkNeedShowByName(name:string):boolean{
        if (!name){
            return false;
        }
        let cfg = this.cfg.getUnlockCfgByName(name);
        if (!cfg){
            return false;
        }
        if (name == "friend" || name == "servantExile" || name == "wifebanish" || name == "wifebattle"){
            if (Api[name+"VoApi"] && Api[name+"VoApi"].isShowNpc){
                if (Api[name+"VoApi"].isShowNpc() && this.isInNeedShowEffect(name)){
                    return true;
                }
            }
        }
        else if (name == "practice"){
            if (Api[name+"VoApi"] && Api[name+"VoApi"].isPlayerPracticeEnable){
                if (Api[name+"VoApi"].isPlayerPracticeEnable() && this.isInNeedShowEffect(name)){
                    return true;
                }
            }
        }
        else if (name == "officialCareer"){
            if (Api.switchVoApi.checkOpenOfficialCareer() && Api.playerVoApi.getPlayerLevel() >= Config.CareerCfg.getStoryNeedLv() && this.isInNeedShowEffect(name)){
                return true;
            }
        }
        return false;
    }

    //是否可以显示按钮 在此加条件时需确认是否有voApi, isshownpc中是否有开关判断
    public checkIsCanShowFunc(name:string):boolean{
        if (!name){
            return true;
        }
        let cfg = this.cfg.getUnlockCfgByName(name);
        if (!cfg){
            return true;
        }
        if (name == "friend" || name == "servantExile" || name == "wifebanish" || name == "wifebattle"){
            if (Api[name+"VoApi"] && Api[name+"VoApi"].isShowNpc){
                if (Api[name+"VoApi"].isShowNpc() && (!this.isInNeedShowEffect(name))){
                    return true;
                }
                else{
                    return false;
                }
            }
        }
        else if (name == "practice"){
            if (Api[name+"VoApi"] && Api[name+"VoApi"].isPlayerPracticeEnable){
                if (Api[name+"VoApi"].isPlayerPracticeEnable() && (!this.isInNeedShowEffect(name))){
                    return true;
                }
            }
        }
        else if (name == "officialCareer"){
            if (Api.switchVoApi.checkOpenOfficialCareer() && Api.playerVoApi.getPlayerLevel() >= Config.CareerCfg.getStoryNeedLv() && (!this.isInNeedShowEffect(name))){
                return true;
            }
        }
        return false;
    }

    //功能按钮配置
    public getNeedShowCfgByName(name:string):any{
        if (!name){
            return null;
        }
        let isShow = this.checkNeedShowByName(name);
        if (isShow){
            let cfg = this.cfg.getUnlockCfgByName(name);
            if (!cfg){
                return null;
            }
            return cfg;
        }
        return null;
    }

    /** 功能内 解锁*/
    public checkWaitingShowByName(name:string){
        let data = this.getWaitingShowDataByName(name);
        if (data){
            ViewController.getInstance().openView(ViewConst.COMMON.UNLOCKFUNCTIONVIEW, {data: data}); 
        }
    }

    //功能内系列解锁
    public checkWaitingShowInFunc(type?:string, name?:string):void{
        if (!type && (!name)){
            return ;
        }
        if (!this.isCanShow()){
            return ;
        }
        if (!this.checkShowOpenFunc()){
            return ;
        }
        App.LogUtil.log("checkWaitingShowInFunc "+type);
        if (type){
            let inFuncList = [];
            if (type == "wife"){
                let checkList = ["wifebanish", "wifebattle"];
                for (let i=0; i < checkList.length; i++){
                    let data = this.getWaitingShowDataByName(checkList[i]);
                    if (data){
                        inFuncList.push(data);
                    }
                }
            }
            else if (type == "player"){
                let checkList = ["practice", "officialCareer"];
                for (let i=0; i < checkList.length; i++){
                    let data = this.getWaitingShowDataByName(checkList[i]);
                    if (data){
                        inFuncList.push(data);
                    }
                }
            }
            console.log("infunclist ", inFuncList);
            if (inFuncList.length > 0){
                ViewController.getInstance().openView(ViewConst.COMMON.UNLOCKFUNCTIONVIEW, {data: inFuncList[0]});
            }
        }
        else if (name){
            this.checkWaitingShowByName(name);
        }
    }

    public getWaitingShowDataByName(name:string){
        if (!name){
            return null;
        }
        if (this.checkNeedShowByName(name)){
            let data:any = {};
            let cfg = this.cfg.getUnlockCfgByName(name);
            if (!cfg){
                return ;
            }
            if (name == "servantExile"){
                data = {
                    data: cfg,
                    icon: "btn2_big_tab",
                    iconStr: "servantViewTab2Title_exile",
                    iconX: GameConfig.stageWidth/2,
                    iconY: 94,
                    iconW: 218,
                    iconH: 50,
                    type: "servant",
                }
            }
            else if (name == "wifebanish"){
                data = {
                    data: cfg,
                    icon: "wifebanish_btn",
                    iconStr: "",
                    iconX: GameConfig.stageWidth - 141,
                    iconY: 95,
                    iconW: 136,
                    iconH: 116,
                    type: "wife",
                }
            }
            else if (name == "wifebattle"){
                data = {
                    data: cfg,
                    icon: "wifebattleshanzi",
                    iconStr: "",
                    iconX: GameConfig.stageWidth - 173,
                    iconY: GameConfig.stageHeigth - 253,
                    iconW: 158,
                    iconH: 153,
                    type: "wife"
                }
            }
            else if (name == "practice"){
                data = {
                    data: cfg,
                    icon: "player_tab2",
                    iconStr: "",
                    iconX: this.checkIsCanShowFunc("officialCareer") ? 340 : 473,
                    iconY: GameConfig.stageHeigth - 117,
                    iconW: 120,
                    iconH: 120,
                    type: "player",
                }
            }
            else if (name == "officialCareer"){
                data = {
                    data: cfg,
                    icon: "player_tab4",
                    iconStr: "",
                    iconX: this.checkIsCanShowFunc("practice") ? 500 : 473,
                    iconY: GameConfig.stageHeigth - 117,
                    iconW: 120,
                    iconH: 120,
                    type: "player",
                }
            }
            return data;
        }
        return null;
    }

    //是否可以展示特效
    private isInHomeCanShow():boolean{
        let hasView = ViewController.getInstance().checkHasShowedView();
        App.LogUtil.log("isInHomeCanShow "+this.isCanShow() + " hasview "+hasView+" this._isNeedWait "+this._isNeedWait);
        if (this.isCanShow() && (!hasView) && (!this._isNeedWait)){
            return true;
        }
        return false;
    }

    private isCanShow():boolean{
        App.LogUtil.log("isCanShow "+Api.rookieVoApi.isGuiding + " Api.rookieVoApi.isInGuiding "+Api.rookieVoApi.isInGuiding + " isinGuideFlag "+this._isInGuide);
        if (this._isShowing || Api.rookieVoApi.isGuiding || Api.rookieVoApi.isInGuiding || this._isInGuide)
		{
			return false;
		}
		return true;
    }
    
    public dispose():void{
        this._isAtHome = true;
        this._isShowing = false;
        this._showList = [];
        this._baseId = null;
        this._isInGuide = false;
        this._isNeedWait = false;

        super.dispose();
    }
}