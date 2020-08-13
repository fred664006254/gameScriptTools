/**
  * 客栈活动详情
  * @author 张朝阳
  * date 2018/12/10
  * @class AcHotelAcInfoPopupView
  */
class AcHotelAcInfoPopupView extends PopupView {

	public constructor() {
		super();
	}
	public initView() {
		let aid = this.param.data.aid;
		let code = this.param.data.code;
		let vo = <AcHotelVo>Api.acVoApi.getActivityVoByAidAndCode(aid, code);

		let bgStr = "achotelview_infobg-" + this.getUiCode();
		if (code == "1") {
			bgStr = "achotelview_infobg";
		}
		let bg = BaseLoadBitmap.create(bgStr);
		bg.width = 548;
		bg.height = 489;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
		this.addChildToContainer(bg);

		let acTimeTFKey = "acHotelAcInfoTime-" + code;
		if (code == "1") {
			acTimeTFKey = "acHotelAcInfoTime";
		}
		let acTimeTF = ComponentManager.getTextField(LanguageManager.getlocal(acTimeTFKey, [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_WHITE);
		acTimeTF.setPosition(bg.x + 20, bg.y + bg.height - acTimeTF.height - 80);
		this.addChildToContainer(acTimeTF);

		let acDescKey = "acHotelAcInfoDesc-" + code;
		if (code == "1") {
			acDescKey = "acHotelAcInfoDesc";
			if(Api.switchVoApi.checkServantRefuseBattle()){
				acDescKey =  "acHotelAcInfoDesc_withOpenRefusal";
			}
		}
		let acDesc = ComponentManager.getTextField(LanguageManager.getlocal(acDescKey), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		acDesc.width = 508;
		acDesc.lineSpacing = 3;
		acDesc.setPosition(acTimeTF.x, acTimeTF.y + acTimeTF.height + 3);
		this.addChildToContainer(acDesc);

		let servantCfg = Config.ServantCfg.getServantItemById("1054");
		if(servantCfg.quality2)
        {	
            let cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
            cornerImg.x = 475;
            cornerImg.y = 290;
            cornerImg.setScale(1.3);
            this.addChildToContainer(cornerImg);
        }
	}

	protected getShowHeight(): number {
		return 555;
	}
	protected getUiCode() {
		// if (this.param.data.code == "3") {
		// 	return "2"
		// }
		return this.param.data.code;
	}

	protected getTitleStr(): string {
		if (this.param.data.code == "1") {
			return "acmidAutumnAcInfoTitle";
		}
		return "acHotelAcInfoPopupViewTitle-" + this.param.data.code;
	}
	public dispose() {
		super.dispose();
	}

}