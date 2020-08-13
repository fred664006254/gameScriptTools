/**
 * 金鼠闹春
 * @author 钱竣
 * @class AcGroupSpring2020View
 */
class AcGroupSpring2020View extends AcGroupCommonView {

    private acList = null;
    private _group = null;

    // private ThposhuijieCfg = [
    //     { buildId: "christmas", buildPos: { x: 407, y: 820 }, buildScale: 4, brandPos: { x: 401, y: 809 } },
    //     { buildId: "courier", buildPos: { x: 298, y: 355 }, buildScale: 4, brandPos: { x: 365, y: 339 } },
    //     { buildId: "marry", buildPos: { x: 0, y: 400 }, buildScale: 4, brandPos: { x: 44, y: 367 } },
    // ];
    private getAidCode(aid : string):string{
        let code = '3';
        let list:AcBaseVo[] = Api.acVoApi.getActivityVoListByAid(aid);
        if(list && list.length){
            code = list[0].code.toString();
        }
        return code;
    }

    private newYearActivityCfg = {};

    public constructor() {
        super();
    }

    protected isHideTitleBgShadow():boolean{
		return true;
	}

    //背景图名称
	protected getBgName():string{
		return null;
    }

    protected getTitleBgName():string{
        return null;
    }

    protected getTitleStr():string{
        return null;
    }

    protected getContainerY():number{
        return 0;
    }

    private initActCfg():void{
        let key = `smashEgg-${this.getAidCode(`smashEgg`)}`;
        let key2 = `newYearRed-${this.getAidCode(`newYearRed`)}`;

        this.newYearActivityCfg = {
            "newYearSignUp-2": {index : 1, view : ViewConst.COMMON.ACNEWYEARSIGNUPVIEW},//岁末签到
            "newYearSevenDays-1": {index : 3, view : ViewConst.COMMON.ACNEWYEARSEVENDAYSVIEW},//新春七天乐
            "rechargeBoxSP-2": {index : 4, view : ViewConst.COMMON.ACRECHARGEBOXSPVIEW},//年夜饭
            "costGemRank-1": {index : 5, view : ViewConst.COMMON.ACCOSTGEMRANKVIEW},//消费排行
        }
        this.newYearActivityCfg[key2] = {index : 2, view : ViewConst.COMMON.ACNEWYEARREDVIEW};
        this.newYearActivityCfg[key] = {index : 6, view : ViewConst.COMMON.ACSMASHEGGVIEW};

    }
    protected initView() {
        let view = this;
        this.initActCfg();
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshHandle, this)

        let code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        view.container.width = view.width;
        view.container.height = view.height;

         //top背景图
        let topbg = BaseBitmap.create(`spring2020top`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.container, [0,0], true);

        let midbg = BaseBitmap.create(`spring2020bottombg`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, midbg, topbg, [0,topbg.height-50]);
        view.addChildToContainer(midbg);
        view.addChildToContainer(topbg);

        let eff = ComponentManager.getCustomMovieClip(`newsingledaytitleeff`, 12);
        eff.width = 430;
        eff.height = 250;
        eff.blendMode = egret.BlendMode.ADD;
        eff.playWithTime(-1);
        eff.setPosition(101,120);
        //App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, eff, topbg, [101,120]);
        view.addChildToContainer(eff);

        let bottombg = BaseBitmap.create(`spring2020zshi`);
        view.addChildToContainer(bottombg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view.container, [0,0], true);

        let selectbg = BaseBitmap.create(`spring2020select`);
        let scrollgroup = new BaseDisplayObjectContainer();
        view._group = scrollgroup;
        scrollgroup.width = GameConfig.stageWidth;
        view.addChildToContainer(scrollgroup);
       

        for(let key in this.newYearActivityCfg){
            let aidcode : string = key;
            let unit = this.newYearActivityCfg[key];
            let index = unit.index;
            let aid = aidcode.split(`-`)[0];
            let code = aidcode.split(`-`)[1];
            let group = new BaseDisplayObjectContainer();
            group.width = 337;
            group.height = 142;
            scrollgroup.addChild(group);
            group.setScale(0.9);
            group.x = index & 1 ? 7 : 320;
            group.y = 10 + (index - 1)* 85;
            group.name = `group${aid}`;
            if(index == 1){
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, selectbg, group);
            }

            let btn = ComponentManager.getButton(`spring2020sorticon${index}`, ``, ()=>{
                this.acList = this.acVo.getAcVoList();
                let currentVo:AcBaseVo = this.acList[aid];
                let tipstr = "";
                if(currentVo){
                    if(GameData.serverTime < currentVo.st){
                        tipstr = LanguageManager.getlocal(`acPunishNotOpen`);
                    }
                    else if(GameData.serverTime >= currentVo.et){
                        tipstr = LanguageManager.getlocal(`acGroupCentralmarketEndDes`);
                    }
                    else{
                        if(GameData.serverTime < (currentVo.et - 1 * 86400)){
                            // tipstr = App.DateUtil.getOpenLocalTime(vo.st, vo.et - 1 * 86400, false);
                        }
                        else{
                            tipstr = LanguageManager.getlocal(`acPunishEnd`);
                        }
                    }
                }
                else{
                    tipstr = LanguageManager.getlocal(`acGroupCentralmarketEndDes`);
                }

                
                if (currentVo && currentVo.isStart) {
                    if (unit.view) {
                        ViewController.getInstance().openView(unit.view, code);
                    }
                    else {
                        let str = LanguageManager.getlocal("acPunishNotOpen");
                        App.CommonUtil.showTip(str);
                        return;
                    }
                }
                else{
                    App.CommonUtil.showTip(tipstr);
                    return;
                }
    
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, selectbg, group);
                
            }, view);
            group.addChild(btn);
            btn.name = `btn${aid}`;

            let txt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            group.addChild(txt);
            txt.name = `txt${aid}`;

            let str = "";
            this.acList = this.acVo.getAcVoList();
            let vo:AcBaseVo = this.acList[aid];
            if(vo){
                if(GameData.serverTime >= vo.et){
                    str = LanguageManager.getlocal(`acGroupCentralmarketEndDes`);
                }
                else{
                    if (key == "rechargeBoxSP-2"){
                        if(GameData.serverTime < vo.et){
                            str = App.DateUtil.getOpenLocalTime(vo.st, vo.et, false);
                        }
                        else{
                            str = LanguageManager.getlocal(`acPunishEnd`);
                        }
                    }
                    else{
                        if(GameData.serverTime < (vo.et - 1 * 86400)){
                            str = App.DateUtil.getOpenLocalTime(vo.st, vo.et - 1 * 86400, false);
                        }
                        else{
                            str = LanguageManager.getlocal(`acPunishEnd`);
                        }
                    }
                }
            }
            else{
                str = LanguageManager.getlocal(`acGroupCentralmarketEndDes`);
                App.DisplayUtil.changeToGray(group);
            }
            txt.text = str;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, txt, btn, [index & 1 ? 40 : -40 ,25]);
           

            let eff = ComponentManager.getCustomMovieClip(index & 1 ? `newsingledaybtnlefteff` : `newsingledaybtnrighteff`, 12);
            eff.width = index & 1 ? 400 : 420;
            eff.height = index & 1 ? 200 : 300;
            eff.anchorOffsetX = eff.width / 2;
            eff.anchorOffsetY = eff.height / 2;
            eff.blendMode = egret.BlendMode.ADD;
            eff.playWithTime(-1);
            eff.scaleX = 1.15;
            eff.scaleY = 1.2;
            eff.x = index & 1 ? 160 : 165;
            eff.y = index & 1 ? 66 : 77;
            group.addChild(eff);
        } 
        scrollgroup.addChild(selectbg);
        scrollgroup.height = 560;
        let scrollview = ComponentManager.getScrollView(scrollgroup, new egret.Rectangle(0,0,scrollgroup.width,(GameConfig.stageHeigth - this.container.y - topbg.height - 20)));
        this.addChildToContainer(scrollview);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollview, topbg, [0,topbg.height + 10]);

        this.refreshHandle();
    }
    /**
     * 刷新红点相关
     */
    private refreshRedDot() {
        let acVoList = this.acVo.getAcVoList();
        let btnname = 1;
        for (let key in acVoList) {
            let group = <BaseDisplayObjectContainer>this._group.getChildByName(`group${key}`);
            if(group){
                let btn = <BaseButton>group.getChildByName(`btn${key}`);
                if(btn){
                    let acVo = acVoList[key];
                    if (acVo.isShowRedDot == true && acVo.isStart) {
                        App.CommonUtil.addIconToBDOC(btn);
                    }
                    else {
                        App.CommonUtil.removeIconFromBDOC(btn);
                    }
                }
            }
            ++ btnname;
        }
    }
    /**刷新牌子的状态 */
    private refreshBrand() {
        let acVoList = this.acVo.getAcVoList();
        let btnname = 1;
        for (let key in acVoList) {
            let group = <BaseDisplayObjectContainer>this._group.getChildByName(`group${key}`);
            if(group){
                let btn = <BaseButton>group.getChildByName(`btn${key}`);
                if(btn){
                    let acVo = acVoList[key];
                    if (acVo && acVo.isStart) {
                        App.DisplayUtil.changeToNormal(group);
                    }
                    else {
                        App.DisplayUtil.changeToGray(group);
                    }
                }
            }
            ++ btnname;
        }
    }
    /**
     * 刷新返回消息
     */
    private refreshHandle() {
        this.refreshRedDot();
        this.refreshBrand();
    }

    protected getResourceList(): string[] {
        return super.getResourceList().concat([
            "acspring2020view",
        ]);
    }

    public tick():void{
        for(let key in this.newYearActivityCfg){
            let str = "";
            let aidcode : string = key;
            let unit = this.newYearActivityCfg[key];
            let index = unit.index;
            let aid = aidcode.split(`-`)[0];
            let code = aidcode.split(`-`)[1];

            let group = <BaseDisplayObjectContainer>this._group.getChildByName(`group${aid}`);
            let txt = <BaseTextField>group.getChildByName(`txt${aid}`);
            let btn = <BaseButton>group.getChildByName(`btn${aid}`);
            this.acList = this.acVo.getAcVoList();
            let vo:AcBaseVo = this.acList[aid];
            if(group){
                if(vo){
                    // if(GameData.serverTime < vo.st){
                    //     str = LanguageManager.getlocal(`acPunishNotOpen`);
                    // }
                    // else 
                    if(GameData.serverTime >= vo.et){
                        str = LanguageManager.getlocal(`acGroupCentralmarketEndDes`);
                    }
                    else{
                        if (key == "rechargeBoxSP-2"){
                            if(GameData.serverTime < vo.et){
                                str = App.DateUtil.getOpenLocalTime(vo.st, vo.et, false);
                            }
                            else{
                                str = LanguageManager.getlocal(`acPunishEnd`);
                            }
                        }
                        else{
                            if(GameData.serverTime < (vo.et - 1 * 86400)){
                                str = App.DateUtil.getOpenLocalTime(vo.st, vo.et - 1 * 86400, false);
                            }
                            else{
                                str = LanguageManager.getlocal(`acPunishEnd`);
                            }
                        }
                    }
                    if (key == "rechargeBoxSP-2"){
                        if(GameData.serverTime >= vo.et){
                            this.refreshHandle();
                        }
                    }
                    else{
                        if(GameData.serverTime >= (vo.et - 1 * 86400)){
                            this.refreshHandle();
                        }
                    }
                }
                else{
                    str = LanguageManager.getlocal(`acGroupCentralmarketEndDes`);
                }
                txt.text = str;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, txt, btn, [index & 1 ? 40 : -40]);
            }
        }
    }

    public dispose(): void {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshHandle, this)
        this.acList = null;
        this.newYearActivityCfg = null;
        this._group = null;
        super.dispose();
    }
}