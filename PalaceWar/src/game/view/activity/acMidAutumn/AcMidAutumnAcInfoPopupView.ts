/**
  * 中秋活动详情
  * @author 张朝阳
  * date 2018/8/30
  * @class AcMidAutumnAcInfoPopupView
  */
class AcMidAutumnAcInfoPopupView extends PopupView {

	public constructor() {
		super();
	}
	public initView()
	{
		let aid = this.param.data.aid;
		let code = this.param.data.code;
		let vo  = <AcMidAutumnVo>Api.acVoApi.getActivityVoByAidAndCode(aid, code);
		let bg = BaseLoadBitmap.create("acmidautumnview_infobg");
		bg.width = 548;
		bg.height = 489;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2,0);
		this.addChildToContainer(bg);

		let acTimeTF = ComponentManager.getTextField(LanguageManager.getlocal("acmidAutumnAcInfoTime",[vo.acTimeAndHour]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_QUALITY_WHITE);
		acTimeTF.setPosition(bg.x + 20,bg.y + bg.height - acTimeTF.height - 80);
		this.addChildToContainer(acTimeTF);

		let infoDec = '';
		if(Api.switchVoApi.checkServantRefuseBattle()){
			infoDec =  "acmidAutumnAcInfoDesc_withOpenRefusal";
		}else{
			infoDec = "acmidAutumnAcInfoDesc";
		}
		let acDesc = ComponentManager.getTextField(LanguageManager.getlocal(infoDec),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		acDesc.width = 508;
		acDesc.lineSpacing = 3;
		acDesc.setPosition(acTimeTF.x,acTimeTF.y + acTimeTF.height + 3);
		this.addChildToContainer(acDesc);

		let servantCfg: Config.ServantItemCfg = Config.ServantCfg.getServantItemById("1052");
		if(servantCfg.quality2)
			{	
				let cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
				cornerImg.x = 45;
				cornerImg.y = 260;
				cornerImg.setScale(1.3);
				this.addChildToContainer(cornerImg);
			}
	}
	
	protected getShowHeight():number
	{
		return  555;
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