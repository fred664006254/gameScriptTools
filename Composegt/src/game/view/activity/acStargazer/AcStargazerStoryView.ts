/**
 * 20190401
 * 奸臣皮肤兑换
 */
class AcStargazerStoryView extends AcCommonView {

	public constructor() {
		super();
	}
	private _droWifeIcon:BaseLoadDragonBones=undefined;
	private _skinImg:BaseLoadBitmap=undefined;
	private _aid:string = null;
	private _code:string = null;
	//根据资源名字得到完整资源名字
    protected getDefaultRes(resName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(ResourceManager.hasRes(resName+"-"+this._code)){
            return resName+"-"+this._code;
        } else {
            return resName+"-"+defaultCode;
        }
    }
    protected getDefaultCn(cnName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(LanguageManager.checkHasKey(cnName+"-"+this._code)){
            return cnName + "-" + this._code;
        } else {
            return cnName + "-" + defaultCode;
        }
    }
	protected initView(): void {


		let aid = this.param.data.aid;
		let code = this.param.data.code;
		this._aid = aid;
		this._code = code;
		let acvo  = <AcStargazerVo> Api.acVoApi.getActivityVoByAidAndCode(aid,code);
		let cfg = <Config.AcCfg.StargazerCfg>acvo.config;





		let topbg:BaseBitmap = BaseBitmap.create(this.getDefaultRes("acstargazer_firstbg"));

		topbg.x =  GameConfig.stageWidth/2 - topbg.width/2;
		topbg.y = GameConfig.stageHeigth/2 - topbg.height/2;


		this.addChildToContainer(topbg);


		let searchtxt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		searchtxt1.text  = LanguageManager.getlocal(this.getDefaultCn("acStargazer_storybgtxt1"));
		searchtxt1.multiline = true;
		searchtxt1.lineSpacing = 3;
		searchtxt1.width = 484;//topbg.width - 140;
		searchtxt1.x = topbg.x + topbg.width/2 -searchtxt1.width/2 ;
		searchtxt1.y = topbg.y + 56;

		this.addChildToContainer(searchtxt1);




		let nametxt1 = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acStargazer_storyName1")) , TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		nametxt1.x = topbg.x + 245 - nametxt1.width/2;
		nametxt1.y = topbg.y + 648 - nametxt1.height/2;
		this.addChildToContainer(nametxt1);

		let nametxt2 = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acStargazer_storyName2")) , TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		nametxt2.x = topbg.x + 127 - nametxt2.width/2;
		nametxt2.y = topbg.y + 431 - nametxt2.height/2;
		this.addChildToContainer(nametxt2);

		let nametxt3 = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acStargazer_storyName3")) , TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		nametxt3.x = topbg.x + 471 - nametxt3.width/2;
		nametxt3.y = topbg.y + 465 - nametxt3.height/2;
		this.addChildToContainer(nametxt3);

		let nametxt4 = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acStargazer_storyName4")) , TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		nametxt4.x = topbg.x + 451 - nametxt4.width/2;
		nametxt4.y = topbg.y + 218 - nametxt4.height/2;
		this.addChildToContainer(nametxt4);



		this.addTouchTap(this.hide,this);
	}
   


	protected getBgName():string
	{
		return null;
	}

	protected getResourceList():string[]
	{
		return [
		];
	}
	protected getTitleStr():string
	{
		return null;
	}
	protected getButtomLineBg():string
	{
		return null;
	}

	protected getCloseBtnName():string
	{
		return null;
	}

	protected getTitleBgName():string
	{
		return null;
	}

	public dispose():void
	{
		if(this._droWifeIcon){
			this._droWifeIcon.dispose();
			this._droWifeIcon = null;
		}
        this._skinImg = null;
		this._code = null;
		this._aid = null;
		super.dispose();
	}
}