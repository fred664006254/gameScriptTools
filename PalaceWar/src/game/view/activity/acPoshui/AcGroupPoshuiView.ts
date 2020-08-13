/**
 * 泰国泼水节
 * date 2020.3.3
 * @author ycg
 * @class AcGroupPoshuiView
 */
class AcGroupPoshuiView extends AcGroupCommonView {

    private acList = null;
    private _group = null;
    private _poshuiAcCfg = {};
    
    private getAidCode(aid : string):string{
        let code = '3';
        let list:AcBaseVo[] = Api.acVoApi.getActivityVoListByAid(aid);
        if(list && list.length){
            code = list[0].code.toString();
        }
        return code;
    }

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
        // let key = `smashEgg-${this.getAidCode(`smashEgg`)}`;
        // let key2 = `newYearRed-${this.getAidCode(`newYearRed`)}`;

        this._poshuiAcCfg = {
            "newYearSevenDays-2": {index : 1, view : ViewConst.COMMON.ACNEWYEARSEVENDAYSVIEW},//七天欢乐颂
            "blessingOfMammon-5": {index : 2, view : ViewConst.COMMON.ACBLESSINGOFMAMMONVIEW},//水灯祈愿
            "costGemRank-2": {index : 3, view : ViewConst.COMMON.ACCOSTGEMRANKVIEW},//消费排行
            "newYearRed-2": {index : 4, view : ViewConst.COMMON.ACNEWYEARREDVIEW},//泼水祝福
        }
        // this._poshuiAcCfg[key2] = {index : 2, view : ViewConst.COMMON.ACNEWYEARREDVIEW};
        // this._poshuiAcCfg[key] = {index : 6, view : ViewConst.COMMON.ACSMASHEGGVIEW};

    }
    protected initView() {
        let view = this;
        this.initActCfg();
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshHandle, this)

        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        view.container.width = view.width;
        view.container.height = view.height;

        //bg
        let bg = BaseBitmap.create("acposhui_bg");
        bg.setPosition(0, 0);
        view.addChildToContainer(bg);

        //top背景图
        let topBg = BaseBitmap.create(`acposhui_topbg`);
        // view.addChildToContainer(topBg);

        let scrollgroup = new BaseDisplayObjectContainer();
        view._group = scrollgroup;
        scrollgroup.width = GameConfig.stageWidth;
        // view.addChildToContainer(scrollgroup);
       

        for(let key in this._poshuiAcCfg){
            let aidcode : string = key;
            let unit = this._poshuiAcCfg[key];
            let index = unit.index;
            let aid = aidcode.split(`-`)[0];
            let code = aidcode.split(`-`)[1];
            let group = new BaseDisplayObjectContainer();
            group.width = 308;
            group.height = 300;
            scrollgroup.addChild(group);
            // group.setScale(0.95);
            group.x = index % 2 ? 0 : 320;
            group.y = (Math.ceil(index/2) - 1) * (group.height + 2) + 0;
            group.name = `group${aid}`;
            
            let btn = ComponentManager.getButton(`acposhui_btnitem${index}`, ``, ()=>{
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
            }, view);
            btn.setScale(1);
            btn.setPosition(0, 0);
            group.addChild(btn);
            btn.name = `btn${aid}`;

            let str = "";
            this.acList = this.acVo.getAcVoList();
            let vo:AcBaseVo = this.acList[aid];
            if(vo){
                if(GameData.serverTime >= vo.et){
                    str = LanguageManager.getlocal(`acGroupCentralmarketEndDes`);
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
            else{
                str = LanguageManager.getlocal(`acGroupCentralmarketEndDes`);
                App.DisplayUtil.changeToGray(group);
            }
            let timeBg = BaseBitmap.create("acposhui_timebg");
            group.addChild(timeBg);
            timeBg.name = `timebg${aid}`;
            timeBg.x = group.width/2 - timeBg.width/2;
            timeBg.y = group.height - timeBg.height;
            App.LogUtil.log("this.timeBg.y "+timeBg.y);
            let txt = ComponentManager.getTextField(str, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            group.addChild(txt);
            txt.name = `txt${aid}`;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt, timeBg, [0, 0]);
        } 

        App.LogUtil.log("this.container.y "+this.container.y);
        scrollgroup.height = 602;
        let scrollview = ComponentManager.getScrollView(scrollgroup, new egret.Rectangle(0, 0, scrollgroup.width, (GameConfig.stageHeigth - this.container.y - topBg.height + 25)));
        view.addChildToContainer(scrollview);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollview, topBg, [0, topBg.height - 25]);

        view.addChildToContainer(topBg);

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
                        let redDot = <BaseBitmap>btn.getChildByName("reddot");
                        redDot.setPosition(btn.width - 60, 55);
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
            "acposhuiview",
        ]);
    }

    public tick():void{
        for(let key in this._poshuiAcCfg){
            let str = "";
            let aidcode : string = key;
            let unit = this._poshuiAcCfg[key];
            let index = unit.index;
            let aid = aidcode.split(`-`)[0];
            let code = aidcode.split(`-`)[1];

            let group = <BaseDisplayObjectContainer>this._group.getChildByName(`group${aid}`);
            let txt = <BaseTextField>group.getChildByName(`txt${aid}`);
            let timeBg = <BaseButton>group.getChildByName(`timebg${aid}`);
            this.acList = this.acVo.getAcVoList();
            let vo:AcBaseVo = this.acList[aid];
            if(group){
                if(vo){
                    if(GameData.serverTime >= vo.et){
                        str = LanguageManager.getlocal(`acGroupCentralmarketEndDes`);
                    }
                    else{
                        if(GameData.serverTime < (vo.et - 1 * 86400)){
                            str = App.DateUtil.getOpenLocalTime(vo.st, vo.et - 1 * 86400, false);
                        }
                        else{
                            str = LanguageManager.getlocal(`acPunishEnd`);
                        } 
                    }
                    if(GameData.serverTime >= (vo.et - 1 * 86400)){
                        this.refreshHandle();
                    }
                }
                else{
                    str = LanguageManager.getlocal(`acGroupCentralmarketEndDes`);
                }
                txt.text = str;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, txt, timeBg, [0, 0]);
            }
        }
    }

    public dispose(): void {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshHandle, this);

        this.acList = null;
        this._poshuiAcCfg = null;
        this._group = null;
        super.dispose();
    }
}