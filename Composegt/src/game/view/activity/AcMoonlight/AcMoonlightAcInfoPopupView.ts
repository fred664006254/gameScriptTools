/**
  * 荷塘月色
  * @author jiangliuyang
  * date 2018/8/30
  * @class AcMoonlightAcInfoPopupView
  */
class AcMoonlightAcInfoPopupView extends PopupView {

    private aid: string=null;
    private code : string = null;
	public constructor() {
		super();
	}
	public initView()
	{
		let aid = this.param.data.aid;
		let code = this.param.data.code;
        this.aid = aid;
        this.code = code;
		let vo  =undefined;
		let bg:BaseLoadBitmap = null;
	    vo = <AcMidAutumnVo>Api.acVoApi.getActivityVoByAidAndCode(aid, code);
        // if(code == "6" || code == "7"){
        //     bg = BaseLoadBitmap.create("acmidautumnview_infobg6");
        // } else {
        //     bg = BaseLoadBitmap.create("acmidautumnview_infobg");
        // }
		
		bg = BaseLoadBitmap.create(this.getDefaultRes("acmoonlightview_infobg"));
		
		bg.width = 537;
		bg.height =487;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2,5);
		this.addChildToContainer(bg);

		// let acTimeTF = ComponentManager.getTextField(LanguageManager.getlocal("acmidAutumnAcInfoTime",[vo.acTime]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_QUALITY_WHITE);
		// acTimeTF.setPosition(bg.x + 20,bg.y + bg.height - acTimeTF.height - 80);
		// this.addChildToContainer(acTimeTF);

		// let acDesc = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acMoonlight_acInfoDesc")),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		
		// acDesc.width = 508;
		// acDesc.lineSpacing = 3;
		// acDesc.setPosition(acTimeTF.x,acTimeTF.y + acTimeTF.height + 3);
		// this.addChildToContainer(acDesc);


	}
    //根据资源名字得到完整资源名字
    protected getDefaultRes(resName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(ResourceManager.hasRes(resName+"-"+this.code)){
            return resName+"-"+this.code;
        } else {
            return resName+"-"+defaultCode;
        }
    }
    protected getDefaultCn(cnName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(LanguageManager.checkHasKey(cnName+"-"+this.code)){
            return cnName + "-" + this.code;
        } else {
            return cnName + "-" + defaultCode;
        }
    }
	protected getShowHeight():number
	{
		return  575;
	}

	protected getTitleStr():string
	{
		return "acmidAutumnAcInfoTitle";
	}
	public dispose()
	{
		super.dispose();
	}
	
}