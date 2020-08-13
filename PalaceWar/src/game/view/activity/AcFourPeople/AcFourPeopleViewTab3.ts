/**
 * 梁山五义 整合
 * date 2020.7.27
 */
class AcFourPeopleViewTab3 extends CommonViewTab{
    private _scrollList:ScrollList = null;
    private _acTimeDown:BaseTextField = null;
    private _aid:string = null;
    private _code:string = null;

    public constructor(data?:any) {
        super();
        this.param = data;
        this.initView();
    }

    protected get cfg():Config.AcCfg.FourPeopleCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
    
    protected get vo():AcFourPeopleVo{
        return <AcFourPeopleVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }
    
    protected get code():string{
        return this._code;
    }
    
    protected get aid():string{
        return this._aid;
    }
    
    protected getTypeCode():string{
        return this.code;
    }

    protected getPeopleType():number{
        return 3;
    }

    private getPeopleTypeCode():string{
        let peopleType = this.getPeopleType();
        if (peopleType == 1){
            return "5";
        }
        else if (peopleType == 2){
            return "1";
        }
        else if (peopleType == 3){
            return "2";
        }
        return this.code;
    }

    public initView():void{
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_EXCHANGEFOURPEOPLE, this.refreshView, this);
        let baseView = <AcFourPeopleView>ViewController.getInstance().getView("AcFourPeopleView");
        this._aid = baseView.getAid();
        this._code = baseView.getCode();

        //顶部背景图片
		let forpeople_top: BaseBitmap = BaseBitmap.create("forpeople_top");
		this.addChild(forpeople_top);
        App.LogUtil.log("this.aid "+this.aid+" code "+this.code);
		//活动时间   
		let acDate = ComponentManager.getTextField(this.vo.getAcTimeAndHour(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		acDate.x = 30
		acDate.y = 15;
		this.addChild(acDate);

		//倒计时文本 
		let acTimeDown = ComponentManager.getTextField(this.getTimeDownStr(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		acTimeDown.x = acDate.x;
		acTimeDown.y = acDate.y + 33;
		this.addChild(acTimeDown);
		this._acTimeDown = acTimeDown;

        let typeCode = this.getPeopleTypeCode();
		//规则
		let ruleInfo = ComponentManager.getTextField(LanguageManager.getlocal("acFourPeopleRule"+typeCode), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		ruleInfo.x = 30
		ruleInfo.y = acTimeDown.y + 33;
		this.addChild(ruleInfo);

		//谋士令
		let inOrderText = ComponentManager.getTextField(LanguageManager.getlocal("acFourPeopleInOrder"+typeCode), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		inOrderText.x = 30
		inOrderText.y = ruleInfo.y + 33;
        this.addChild(inOrderText);
        
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACGOODMATCH_GETACHRWD, this.requestCallback, this);
        let data = this.cfg.getPeopleListByType(this.getPeopleType());
        let scrollList = ComponentManager.getScrollList(AcFourPeopleScrollItem, data, new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 310), {aid: this.aid, code: this.code, type: this.getPeopleType()});
        scrollList.setPosition(0, 160);
        this.addChild(scrollList);
        this._scrollList = scrollList;

        TickManager.addTick(this.tick, this);
    }

    protected refreshView(){
        let data = this.cfg.getPeopleListByType(this.getPeopleType());
        this._scrollList.refreshData(data, {aid: this.aid, code: this.code, type: this.getPeopleType()});
    }

    private getTimeDownStr():string{
        let deltaT = this.vo.et - GameData.serverTime;
        if (deltaT > 0) {
            return LanguageManager.getlocal("acFourPeople_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
        } 
        return LanguageManager.getlocal("acFourPeople_acCD", [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
    }

    public tick(): boolean {
        if (this._acTimeDown){
            let deltaT = this.vo.et - GameData.serverTime;
            if (deltaT > 0) {
                this._acTimeDown.text = this.getTimeDownStr();
                return true;
            } else {
                this._acTimeDown.text = this.getTimeDownStr();
            }
        }
		return false;
	}

    public dispose():void{
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_EXCHANGEFOURPEOPLE, this.refreshView, this);
        TickManager.removeTick(this.tick, this);
        this._scrollList = null;
        this._acTimeDown = null;
        this._aid = null;
        this._code = null;

        super.dispose();
    }
}