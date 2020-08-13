class WxaddmyproView extends PopupView {

    private okButton:BaseButton;
    private adNode:BaseDisplayObjectContainer;
    private adImgs:Array<BaseLoadBitmap>;
    private bg:BaseBitmap;
    private rewardNode:BaseDisplayObjectContainer;
    private points:Array<BaseBitmap>;
    private pointNode:BaseDisplayObjectContainer;
    private curIndex = 0;
    private leftButton:BaseButton;
    private rightButton:BaseButton;
    private static readOverTime = 0;
    private autoNextPoint = -1;
    private readonly READTIME = 5;
    public constructor() {
        super();
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "uncompress",
		]);
	}

    protected initView(): void {
        this.showBg();
        this.okButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", this.okButtonClick, this);
        this.addChild(this.okButton);

        this.adNode = new BaseDisplayObjectContainer();
        this.adNode.width = 518;
        this.adNode.height = 528;
        this.addChild(this.adNode);
        this.adImgs = [];
        for (let i = 0; i < 4; i++) {
            this.adImgs[i] = BaseLoadBitmap.create("wxaddmypro_" + (i+1));
            this.adNode.addChild(this.adImgs[i]);
        }

        this.rewardNode = new BaseDisplayObjectContainer();
        this.addChild(this.rewardNode);
        let rewards = Config.CustomgiftCfg["3"].content;
        let rewardArr = GameData.formatRewardItem(rewards);
        for (var index = 0; index < rewardArr.length;index ++){
            let iconItem = GameData.getItemIcon(rewardArr[index],true,true);
            iconItem.setScale(0.8);
            iconItem.x = - (108 * rewardArr.length)/2 + 108 * index;
            this.rewardNode.addChild(iconItem);
        }

        this.pointNode = new BaseDisplayObjectContainer();
        this.addChild(this.pointNode);
        this.points = [];
        for (var i = 0; i < 4; i++) {
            this.points[i] = BaseBitmap.create("wxaddmypro_point2");
            this.points[i].x = -37*4/2 + 37 * i;
            this.pointNode.addChild(this.points[i]);

            let indexTxt = ComponentManager.getTextField(String(i+1), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            indexTxt.x = this.points[i].x + this.points[i].width/2 - indexTxt.width/2;
            indexTxt.y = this.points[i].y + this.points[i].height/2 - indexTxt.height/2;
            
            this.pointNode.addChild(indexTxt);
        }

        this.leftButton = ComponentManager.getButton("btn_leftpage", "", this.leftButtonClick, this);
        this.addChild(this.leftButton);
        this.rightButton = ComponentManager.getButton("btn_leftpage", "", this.rightButtonClick, this);
        this.rightButton.scaleX = -1;
        this.addChild(this.rightButton);
        this.autoNextPoint = new Date().getTime();
        this.refreshIndex();
    } 
    private leftButtonClick()
    {
        this.curIndex = Math.max(0, this.curIndex - 1);
        this.autoNextPoint = -1;
        this.refreshIndex();
    }
    private rightButtonClick()
    {
        this.curIndex = Math.min(3, this.curIndex + 1);
        this.autoNextPoint = -1;
        this.refreshIndex();
    }
    private okButtonClick() {
        console.log("okButtonClick");
        if (WxaddmyproView.readOverTime + this.READTIME > GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wxaddmypro_please_read_4_pages"));
            return;
        } else if (Api.otherInfoVoApi.wxaddmyproStatus() == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wxaddmypro_please_open_from_mypro"));
            return;
        } else if (Api.otherInfoVoApi.wxaddmyproStatus() == 1) {
            this.request(NetRequestConst.REQUEST_OTHERINFO_GETWXADDMYPROREWARD,{});
        }

    }
	protected receiveData(data:{ret:boolean, data:any}):void
	{
		if (data.ret) {
			let rewards = data.data.data.rewards;
            let rewardList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardList);
			this.hide();
		}
	}
    private refreshIndex()
    {
        console.log("refreshIndex", this.curIndex);
        if (this.curIndex >= 3 && WxaddmyproView.readOverTime === 0) {
            // 标记一下读完的时间
            WxaddmyproView.readOverTime = GameData.serverTime;
        }
        for (let i = 0; i < 4; i++) {
            this.adImgs[i].visible = this.curIndex === i;
        }

        for (let i = 0; i < 4; i++) {
            this.points[i].texture = ResourceManager.getRes(this.curIndex === i?"wxaddmypro_point1":"wxaddmypro_point2");
        }
        this.leftButton.visible = this.curIndex > 0;
        this.rightButton.visible = this.curIndex < 3;
    }
    protected tick()
    {        
        if (WxaddmyproView.readOverTime > 0 && WxaddmyproView.readOverTime + this.READTIME < GameData.serverTime) {
            App.DisplayUtil.changeToNormal(this.okButton);
        } else {
            App.DisplayUtil.changeToGray(this.okButton);
        }
        this.okButton.setText(
            LanguageManager.getlocal("taskCollect") 
            + ((WxaddmyproView.readOverTime === 0 || WxaddmyproView.readOverTime + this.READTIME < GameData.serverTime) ? "" : ("(" + Math.floor(WxaddmyproView.readOverTime + this.READTIME - GameData.serverTime) + "s)"))
        , false);
        if (this.autoNextPoint !== -1) {
            this.curIndex = Math.min(3, Math.floor((new Date().getTime() - this.autoNextPoint) / 1000 / 3));
            this.refreshIndex();
            if (new Date().getTime() - this.autoNextPoint > 3000 * 4) {
                this.autoNextPoint = -1;
            }
        }
    }
    public showBg():void
    {
        let bg = BaseBitmap.create("load_2");
		bg.width = 562;
	    bg.height = 778;
		this.addChild(bg);
        this.bg = bg;
    }
    protected resetBgSize():void
	{
		this.viewBg.height = 920;
		this.viewBg.y = GameConfig.stageHeigth/2 -this.viewBg.height/2;
        this.bg.x = GameConfig.stageWidth/2 - this.bg.width/2;
        this.bg.y = GameConfig.stageHeigth/2 - this.bg.height/2 + 10;
		this.closeBtn.y = this.viewBg.y + 10;
		this.titleTF.x = GameConfig.stageWidth/2 + 10 - this.titleTF.width/2;  
		this.titleTF.y = this.viewBg.y + 30;
		this.titleTF.size =TextFieldConst.FONTSIZE_BUTTON_COMMON;
        this.okButton.x = GameConfig.stageWidth/2 - this.okButton.width/2;
        this.okButton.y = this.viewBg.y + this.viewBg.height - 95 - this.okButton.height/2;
        this.adNode.x = GameConfig.stageWidth/2 - this.adNode.width/2;
        this.adNode.y = this.viewBg.y + 110;
        this.rewardNode.x = GameConfig.stageWidth/2;
        this.rewardNode.y = this.viewBg.y + this.viewBg.height - 229;
        this.pointNode.x = GameConfig.stageWidth/2;
        this.pointNode.y = this.viewBg.y + this.viewBg.height - 264;
        this.leftButton.x = 0;
        this.leftButton.y = this.viewBg.y + this.viewBg.height - 274;
        this.rightButton.x = GameConfig.stageWidth;
        this.rightButton.y = this.viewBg.y + this.viewBg.height - 274;
	}
    protected getShowHeight():number
	{
		return 775;
	}
	protected getCloseBtnName():string
	{
		return "load_closebtn";
	}
	protected getBgName():string
	{
		return "load_bg";
	}
    protected getSheepType(): number {
        return 1;
    }
    public dispose(): void {

        this.okButton = null;
        this.adNode = null;
        this.adImgs = null;
        this.bg = null;
        this.rewardNode = null;
        this.points = null;
        this.pointNode = null;
        this.curIndex = 0;
        this.leftButton = null;
        this.rightButton = null;
        this.autoNextPoint = -1;
        super.dispose();
    }

}