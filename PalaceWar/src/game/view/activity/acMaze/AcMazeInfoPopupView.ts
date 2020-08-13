/**
  * 赵云信息显示
  * author 张朝阳
  * date 2018/7/10
  * @class AcMazeInfoPopupView
  */
class AcMazeInfoPopupView extends PopupView{
	public constructor() {
		super();
	}
	/**
	 * 服务器返回数据
	 */
	private get vo() : AcMazeVo{
        return <AcMazeVo>Api.acVoApi.getActivityVoByAidAndCode(AcMazeView.AID, AcMazeView.CODE);
    }
	public initView()
	{
		let infobg:BaseBitmap = BaseBitmap.create("acmazeview_infobg");
		infobg.setPosition(this.getShowWidth() / 2 - infobg.width / 2,0);
		this.addChildToContainer(infobg);

		let detailBg = BaseBitmap.create("public_9_downbg");
		detailBg.width = 281
		detailBg.height = 172
		detailBg.setPosition(infobg.x + infobg.width - detailBg.width - 10,infobg.y + infobg.height - detailBg.height - 10);
		this.addChildToContainer(detailBg);

		let acTimeTF = ComponentManager.getTextField(LanguageManager.getlocal("AcMazeViewAcTime",[this.vo.acTimeAndHour]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		acTimeTF.setPosition(detailBg.x + 20,detailBg.y + 10);
		acTimeTF.lineSpacing = 2;

		this.addChildToContainer(acTimeTF);

		let acDetailTF = ComponentManager.getTextField(LanguageManager.getlocal("AcMazeViewAcDetail"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		acDetailTF.width = 250;
		acDetailTF.lineSpacing = 2;
		acDetailTF.setPosition(acTimeTF.x,acTimeTF.y + acTimeTF.height + 2);
		this.addChildToContainer(acDetailTF);

		let servantCfg: Config.ServantItemCfg = Config.ServantCfg.getServantItemById("2017");
		if(servantCfg.quality2)
		{	
			let cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
			cornerImg.x = 30+GameData.popupviewOffsetX;
			cornerImg.y = 250;
			cornerImg.setScale(1.3);
			this.addChildToContainer(cornerImg);
		}
	}

	protected getTitleStr():string
	{
		return "atkracecrossDetailTitle";
	}

	protected getShowHeight():number
	{
		return 395+9;
	}

	public dispose()
	{
		super.dispose();
	}

}