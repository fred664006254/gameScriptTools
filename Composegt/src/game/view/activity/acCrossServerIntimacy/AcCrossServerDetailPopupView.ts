/**
 * author:qianjun
 * desc:规则详情弹窗
*/
class AcCrossServerDetailPopupView extends PopupView
{

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"atkracecross_explain_bg","atkracecross_explain_pic","crossserverinti_detailbg-1"
		]);
	}

	protected getTitleStr():string
	{
		return "atkracecrossDetailTitle";
	}

	private get cfg() : Config.AcCfg.CrossServerIntimacyCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcCrossServerIntimacyView.AID, AcCrossServerIntimacyView.CODE);
    }

    private get vo() : AcCrossServerIntimacyVo{
        return <AcCrossServerIntimacyVo>Api.acVoApi.getActivityVoByAidAndCode(AcCrossServerIntimacyView.AID, AcCrossServerIntimacyView.CODE);
	}
	
	private get api() : CrossImacyVoApi{
        return Api.crossImacyVoApi;
    }

	protected initView():void
	{

		let typeBg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		typeBg.width = 540;
		typeBg.height = 664;
		typeBg.setPosition(this.viewBg.width/2-typeBg.width/2, 12);
		this.addChildToContainer(typeBg);

		let map = `crossserverinti_detailbg-${this.vo.code}`
		if(!RES.hasRes(map))
		{
			map = `crossserverinti_detailbg-1`
		}
		
		let topPic:BaseBitmap = BaseBitmap.create(map);
		topPic.setPosition(this.viewBg.width/2-topPic.width/2, typeBg.y+4);
		this.addChildToContainer(topPic);

		let innerBg = BaseBitmap.create("public_tc_srkbg05");
		innerBg.width = typeBg.width - 20;
		innerBg.height = 350;
		innerBg.setPosition(this.viewBg.width/2-innerBg.width/2, topPic.y+ topPic.height + 5);
		this.addChildToContainer(innerBg);
		
		//区服排名
		let serverRank:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`crossImacyOpenDesc3-${this.vo.code}`), TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		serverRank.setPosition(topPic.x+15,topPic.y+topPic.height+15);
		this.addChildToContainer(serverRank);


		let rankDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`crossImacyDetailDesc1-${this.vo.code}`), TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
		rankDesc.setPosition(serverRank.x , serverRank.y+ 32);
		rankDesc.width = 480;
		rankDesc.lineSpacing = 6;
		this.addChildToContainer(rankDesc);

		//个人排名
		let persionRank:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acPunishRankRewardTab1"), TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		persionRank.setPosition(serverRank.x, rankDesc.y +87);
		this.addChildToContainer(persionRank);


		let persionDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`crossImacyDetailDesc2-${this.vo.code}`), 19,TextFieldConst.COLOR_WHITE);
		persionDesc.setPosition(persionRank.x, persionRank.y+32);
		persionDesc.width = rankDesc.width;
		persionDesc.lineSpacing = 6;
		this.addChildToContainer(persionDesc);

		let crossVo = this.vo;
		let timeDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossTime",[crossVo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL);
		timeDesc.x = persionDesc.x;
		timeDesc.y = persionDesc.y + 60;
		this.addChildToContainer(timeDesc);
		//底部描述
		let bottomBg:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		bottomBg.width = typeBg.width - 20;
		bottomBg.height = 90;
		bottomBg.setPosition(this.viewBg.width/2-bottomBg.width/2, typeBg.y+typeBg.height - bottomBg.height - 10 );
		this.addChildToContainer(bottomBg);

		let bottomDesc:BaseTextField = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_RED);
		bottomDesc.setPosition(bottomBg.x+10, bottomBg.y+12);
		bottomDesc.width = bottomBg.width-20;
		bottomDesc.height = bottomBg.height-24;
		bottomDesc.lineSpacing = 6;
		bottomDesc.textAlign = egret.HorizontalAlign.CENTER;
		bottomDesc.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.addChildToContainer(bottomDesc);

		if (crossVo.getIsCanJoin())
		{
			bottomDesc.text = LanguageManager.getlocal(`crossImacyOpenDesc1-${crossVo.code}`);
		}
		else 
		{
			bottomDesc.text = LanguageManager.getlocal(`crossImacyOpenDesc2-${crossVo.code}`);
		}
		let closeButton = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"sysConfirm",this.hide,this);
       	closeButton.setPosition(this.viewBg.width/2-closeButton.width/2, typeBg.y+typeBg.height+20);
		this.addChildToContainer(closeButton);
	}

	protected getBgExtraHeight():number
	{
		return 20;
	}

	public dispose():void
	{
		super.dispose();
	}
}