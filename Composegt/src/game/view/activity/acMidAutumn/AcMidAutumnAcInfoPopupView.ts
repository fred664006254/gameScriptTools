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
		let vo  =undefined;
		let bg:BaseLoadBitmap = null;
		if(aid == "flipCard"){
			vo = <AcFlipCardVo>Api.acVoApi.getActivityVoByAidAndCode(aid, code);
			bg = BaseLoadBitmap.create("flipcard_infobg"+code);
		}
		else{
			vo = <AcMidAutumnVo>Api.acVoApi.getActivityVoByAidAndCode(aid, code);
			if(code == "6" || code == "7" || code == "9"){
				bg = BaseLoadBitmap.create("acmidautumnview_infobg6");
			} else {
				bg = BaseLoadBitmap.create("acmidautumnview_infobg");
			}
		}
		
		
		
		bg.width = 548;
		bg.height = 489;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2,5);
		this.addChildToContainer(bg);

		let acTimeTF = ComponentManager.getTextField(LanguageManager.getlocal("acmidAutumnAcInfoTime",[vo.acTime]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_QUALITY_WHITE);
		acTimeTF.setPosition(bg.x + 20,bg.y + bg.height - acTimeTF.height - 80);
		this.addChildToContainer(acTimeTF);

		let acDesc = ComponentManager.getTextField(LanguageManager.getlocal("acmidAutumnAcInfoDesc"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		if(aid == "flipCard"){
			// acDesc.text = LanguageManager.getlocal("acFlipCard_acmidAutumnAcInfoDesc1");
			acDesc.text ="";
			acTimeTF.text = "";
		}
		else{
			if(code =="6" || code =="7"){
				acDesc.text = LanguageManager.getlocal("acmidAutumnAcInfoDesc6");
			}else{
				acDesc.text = LanguageManager.getlocal("acmidAutumnAcInfoDesc");
			}
		}
		acDesc.width = 508;
		acDesc.lineSpacing = 3;
		acDesc.setPosition(acTimeTF.x,acTimeTF.y + acTimeTF.height + 3);
		this.addChildToContainer(acDesc);


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