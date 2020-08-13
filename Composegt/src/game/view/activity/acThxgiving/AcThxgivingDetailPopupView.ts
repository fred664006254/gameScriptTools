/**
  * 洗澡详情
  * @author jiangliuyang
  * date 2019/4/1
  * @class AcThxgivingDetailPopupView
  */
class AcThxgivingDetailPopupView extends PopupView {

	private aid : string;
	private code :string;
	public constructor() {
		super();
	}
	private get cfg() : Config.AcCfg.ThxgivingCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
    private get vo() : AcThxgivingVo{
        return <AcThxgivingVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }
	/**
	 * 重写 初始化viewbg
	 * 
	 */
    protected initBg():void
    {
        this.viewBg = BaseLoadBitmap.create(this.getDefaultRes("acwifebathingview_detailbg"));
        this.viewBg.width = 640;
        this.viewBg.height = 861;
		this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2,GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
		
		let leftBorder = BaseBitmap.create(this.getDefaultRes("acwifebathingview_detailborder"));
		leftBorder.scaleX = -1;
		leftBorder.x = leftBorder.width;
		leftBorder.y = this.viewBg.y + 50;
		this.addChild(leftBorder);

		let rightBorder = BaseBitmap.create(this.getDefaultRes("acwifebathingview_detailborder"));
		rightBorder.x = GameConfig.stageWidth - rightBorder.width;
		rightBorder.y = leftBorder.y;
		this.addChild(rightBorder);


		this.addChild(this.viewBg);
    }
	protected resetBgSize():void
    {
		// this.closeBtn.setPosition(this.viewBg.x + this.viewBg.width - this.closeBtn.width + 10,this.viewBg.y + 50);
		this.titleTF.y = this.viewBg.y + 30;
		this.closeBtn.y = this.viewBg.y;


    }
	public initView()
	{
		this.aid = this.param.data.aid;
		this.code = this.param.data.code;

		let bg = BaseLoadBitmap.create(this.getDefaultRes("acthxgivingview_detailcontext"));
		bg.width = 548;
		bg.height = 504;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2,this.viewBg.y + 25 + 50);
		this.addChildToContainer(bg);


		let acDesc = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acThxgvingViewDetailDesc")),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		acDesc.width = 450;
		acDesc.lineSpacing = 5;
		acDesc.setPosition(this.viewBg.width / 2 - acDesc.width/2, bg.y + bg.height + 25);
		this.addChildToContainer(acDesc);

		let detailBg1 = BaseBitmap.create(this.getDefaultRes("acwifebathingview_detaildescbg"));
		detailBg1.width = 400;
		if(PlatformManager.checkIsViSp()){
			detailBg1.width = 430;
		} 
		detailBg1.x = this.viewBg.width/2 - detailBg1.width/2;
		detailBg1.y = bg.y + bg.height + 140;
		this.addChildToContainer(detailBg1);

		let icon1 = BaseBitmap.create("wifeview_charmicon");
		icon1.x = detailBg1.x + 25;
		icon1.y = detailBg1.y + detailBg1.height/2 - icon1.height/2;
		this.addChildToContainer(icon1);
		
		let sceneItemCfg:Config.WifeBathSceneItemCfg =Config.WifebathsceneCfg.getSceneCfgById(this.cfg.wifeBathSceneID)

		let detailText1 = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acThxgvingViewDetailDescText1"),[String(sceneItemCfg.wifeBathingGlamour)]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
		detailText1.x = detailBg1.x + 80;
		detailText1.y = detailBg1.y + detailBg1.height/2 - detailText1.height/2;
		this.addChildToContainer(detailText1);

		let detailBg2 = BaseBitmap.create(this.getDefaultRes("acwifebathingview_detaildescbg"));
		detailBg2.width = detailBg1.width;
		if(PlatformManager.checkIsViSp()){
			detailBg2.width = 430;
		} 
		detailBg2.x = this.viewBg.width/2 - detailBg2.width/2;
		detailBg2.y = detailBg1.y + detailBg1.height + 15;
		this.addChildToContainer(detailBg2);


		let icon2 = BaseBitmap.create("acwifebathingview_expicon");
		icon2.x = detailBg2.x + 25;
		icon2.y = detailBg2.y + detailBg2.height/2 - icon2.height/2;
		this.addChildToContainer(icon2);

		let detailText2 = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acThxgvingViewDetailDescText2"),[String(sceneItemCfg.wifeBathingExpRate * 100)+"%"]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
		detailText2.x = detailBg2.x + 80;
		detailText2.y = detailBg2.y + detailBg2.height/2 - detailText2.height/2;
		this.addChildToContainer(detailText2);

	}
	
	// protected getShowHeight():number
	// {
	// 	return 700;
	// }
	// 关闭按钮图标名称
    protected getCloseBtnName():string
	{
		return "load_closebtn";
	}	
	// 背景图名称
	protected getBgName():string
	{
		
		return null;
	}
	protected getTitleStr():string
	{
		return this.getDefaultCn("acThxgvingViewDetailTitle",this.param.data.code);
	}
    private getDefaultCn(cnName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(LanguageManager.checkHasKey(cnName+"-"+this.code)){
            return cnName + "-" + this.code;
        } else {
            return cnName + "-" + defaultCode;
        }
    }
    //根据资源名字得到完整资源名字
    private getDefaultRes(resName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(ResourceManager.hasRes( resName+ "-" +this.code )){
            return resName+ "-" +this.code;
        } else {
            return resName+ "-" +defaultCode;
        }
    }	
	public dispose()
	{
		super.dispose();
	}
	
}