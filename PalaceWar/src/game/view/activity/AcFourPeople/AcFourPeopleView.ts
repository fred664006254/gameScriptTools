class AcFourPeopleView extends AcCommonView {


	private _scrollList: ScrollList = null; 
	private _fourPeopleInfoVoList =null;

	private _activityTimerText: BaseTextField = null;
	private _acCDTxt: BaseTextField = null;
	private _ruleText: BaseTextField = null;
	private _inOrderText: BaseTextField = null;

	public constructor() {
		super();
	}
	protected getResourceList(): string[] {

		let array:string[] = ["forpeople_bottom",
			"forpeople_qualifications",
			"forpeople_top",
			"fourpeople_bg_1",
			"fourpeople_bg_2",
			"fourpeople_bg_3",
			"fourpeople_bg_4",
			"servant_star",
			"achievement_state3",
			"recharge_fnt",
			"fourfloor",
			"fourpecialaura",
			"fourpeople_mask",
			"fourpeople_bottom",
			"commonview_tabbar_bg",
			"commonview_tabbar_bg2"
		];

		if (this.code == "2" || this.code == "3" || this.code == "5")
		{
			array.push("forpeople_bg"+this.code);
		}

		let typeList:any[] = this.cfg.getTypeList();
		if (typeList && typeList.length > 0){
			array.push("forpeople_bg2");
			array.push("forpeople_bg3");
			array.push("forpeople_bg5");
		}
		return super.getResourceList().concat(array);
	}

	protected getTabbarTextArr():string[]{
		let typeList:any[] = this.cfg.getTypeList();
		let textArr:string[] = [];
		if (typeList && typeList.length > 0){
			for (let i=0; i < typeList.length; i++){
				textArr.push(App.CommonUtil.getCnByCode("acFourPeopleTabName"+typeList[i], this.code));
			}
			return textArr;
		}
		
		return null;
	}

	// protected getContainerY():number{
	// 	let typeList:any[] = this.cfg.getTypeList();
	// 	let textArr:string[] = [];
	// 	if (typeList && typeList.length > 0){
	// 		return 148;
	// 	}
	// 	return 0;
	// }

	public getCode():string{
		return this.code;
	}

	public getAid():string{
		return this.aid;
	}

	private get cfg():Config.AcCfg.FourPeopleCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	private get vo():AcFourPeopleVo{
        return <AcFourPeopleVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
	}
	
	protected addTabbarGroupBg():boolean{
		return true;
	}

	protected initView(): void {
		let maskSp = new egret.Shape();
		maskSp.graphics.beginFill(0x000000);
		
		let typeList:any[] = this.cfg.getTypeList();
		if (typeList && typeList.length > 0){
			this.tabbarGroupBg.setRes("commonview_tabbar_bg2");
			this.tabbarGroupBg.x = GameConfig.stageWidth/2 - this.tabbarGroupBg.width/2;
			this.tabbarGroupBg.y = this.tabbarGroup.y + 7;
			App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_EXCHANGEFOURPEOPLE), this.useCallback, this);
			maskSp.graphics.drawRect(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 90);
			maskSp.graphics.endFill();
			maskSp.y = 90;
			this.addChildToContainer(maskSp);
			this.refreshTabBar();
			return ;
		}

		maskSp.graphics.drawRect(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 180);
		maskSp.graphics.endFill();
		maskSp.y = 180;
		this.addChildToContainer(maskSp);

		this.showText();
		this.showList();
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_EXCHANGEFOURPEOPLE), this.useCallback, this);

		//初始化 时间
		let deltaT = this.acVo.et - GameData.serverTime;
		if (this._acCDTxt && deltaT > 0) {
			this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
		} else {
			this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
		}

	}

	private showText(): void {
		//顶部背景图片
		let forpeople_top: BaseBitmap = BaseBitmap.create("forpeople_top");
		this.addChildToContainer(forpeople_top);
		forpeople_top.y = 85;

		//活动时间   
		this._activityTimerText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._activityTimerText.x = 30
		this._activityTimerText.y = 109;
		this._activityTimerText.text  = this.acVo.getAcLocalTime(true);
		this.addChildToContainer(this._activityTimerText);

		//倒计时文本 
		let acCDTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [""]);
		acCDTxt.x = this._activityTimerText.x;
		acCDTxt.y = this._activityTimerText.y + 33;
		this.addChildToContainer(acCDTxt);
		this._acCDTxt = acCDTxt;

		//规则
		this._ruleText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._ruleText.x = 30
		this._ruleText.y = this._acCDTxt.y + 33;
		this._ruleText.text = LanguageManager.getlocal("acFourPeopleRule"+this.code);
		this.addChildToContainer(this._ruleText);

		//谋士令
		this._inOrderText = ComponentManager.getTextField(LanguageManager.getlocal("acFourPeopleInOrder"+this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._inOrderText.x = 30
		this._inOrderText.y = this._ruleText.y + 33;
		this.addChildToContainer(this._inOrderText);

	}

	protected addChildToContainer(obj: egret.DisplayObject): void {
		if (obj) {
			this.container.addChild(obj);
			let typeList:any[] = this.cfg.getTypeList();
			if (typeList && typeList.length > 0){

			}
			else{
				this.container.y = 0;
			}
		}
	}
	private showList(): void {

		this._fourPeopleInfoVoList=[];
		let cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		this._fourPeopleInfoVoList = cfg.getPeopleList(); 
		AcFourPeopleScrollItem.CODE = this.code;
		// if(this.code=="5")
		// {
		// 	AcFourPeopleScrollItem.CODE = "6";
		// }

		this._scrollList =null;
		let rect = egret.Rectangle.create();
		rect.setTo(0, 0, 640, GameConfig.stageHeigth - 260);
		this._scrollList = ComponentManager.getScrollList(AcFourPeopleScrollItem, this._fourPeopleInfoVoList, rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(0, 250);

	}

	public tick(): boolean {
		let typeList:any[] = this.cfg.getTypeList();
		if (typeList && typeList.length > 0){
			return ;
		}
		let deltaT = this.acVo.et - GameData.serverTime;
		if (this._acCDTxt && deltaT > 0) {
			this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
			return true;
		} else {
			this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
		}
		return false;
	}

	public useCallback(event: egret.Event): void 
	{
		if (event.data.ret == true) {
			if (this._scrollList){
				let cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
				let arr = cfg.getPeopleList();
				this._scrollList.refreshData(arr);
			}
			else{
				this.refreshTabBar();
			}
		}
	}

	private refreshTabBar():void{
		if (this.vo.checkRedByPeopleType(1)){
			this.tabbarGroup.addRedPoint(0);
		}
		else{
			this.tabbarGroup.removeRedPoint(0);
		}
		if (this.vo.checkRedByPeopleType(2)){
			this.tabbarGroup.addRedPoint(1);
		}
		else{
			this.tabbarGroup.removeRedPoint(1);
		}
		if (this.vo.checkRedByPeopleType(3)){
			this.tabbarGroup.addRedPoint(2);
		}
		else{
			this.tabbarGroup.removeRedPoint(2);
		}
	}

	protected getSheepType(): number {
		return 1;
	}

	public dispose(): void {
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_EXCHANGEFOURPEOPLE), this.useCallback, this);
		this._scrollList = null;
		this._activityTimerText = null;
		this._acCDTxt = null;
		this._inOrderText = null;
		this._ruleText = null;
		this._fourPeopleInfoVoList = null;
		super.dispose();
	}

}