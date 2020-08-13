/**
  * 马超排行榜Tab1
  * author 张朝阳
  * date 2019/1/14
  * @class AcMaChaoRankPopupViewTab1
  */
class AcMaChaoRankPopupViewTab1 extends AcCommonViewTab {
	public constructor() {
		super();
		egret.callLater(this.initView, this);
	}
	public initView() {
		let cfg = <Config.AcCfg.MaChaoCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcMaChaoVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let rankBg = BaseBitmap.create("public_9_probiginnerbg");
		rankBg.width = 516;
		rankBg.height = 520;
		rankBg.setPosition(30, 55);
		this.addChild(rankBg);

		let rankTopBg = BaseBitmap.create("public_9_bg37");
		rankTopBg.width = rankBg.width;
		rankTopBg.height = 35;
		rankTopBg.setPosition(rankBg.x, rankBg.y);
		this.addChild(rankTopBg);
		// 排名 
		let rankTF = ComponentManager.getTextField(LanguageManager.getlocal("acMaChaoRankPopupViewTab1RankTitle-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		rankTF.setPosition(rankTopBg.x + 35, rankTopBg.y + rankTopBg.height / 2 - rankTF.height / 2+5);
		this.addChild(rankTF);
		// 玩家昵称 
		let rankPlayNameTF = ComponentManager.getTextField(LanguageManager.getlocal("acMaChaoRankPopupViewTab1NickNameTitle-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		rankPlayNameTF.setPosition(rankTopBg.x + rankTopBg.width / 2 - rankPlayNameTF.width / 2 - 30, rankTF.y);
		this.addChild(rankPlayNameTF);
		// 杀敌数 
		let rankKillNumTF = ComponentManager.getTextField(LanguageManager.getlocal("acMaChaoRankPopupViewTab1ScoreTitle-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		rankKillNumTF.setPosition(rankTopBg.x + rankTopBg.width - rankKillNumTF.width - 75, rankTF.y);
		this.addChild(rankKillNumTF);

		//排行榜的ScrollList
		let rect = new egret.Rectangle(0, 0, rankBg.width, rankBg.height - rankTopBg.height - 10)
		let rankScrollList = ComponentManager.getScrollList(AcMaChaoRankScrollItem, this.param.data.rankData.rankArr, rect);
		rankScrollList.setPosition(rankTopBg.x, rankTopBg.y + rankTopBg.height);
		this.addChild(rankScrollList);
		rankScrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));

		// 底部的bg 
		let buttomBg = BaseBitmap.create("public_9_bg1");
		buttomBg.width = 516;
		buttomBg.height = 85;
		buttomBg.setPosition(rankBg.x, rankBg.y + rankBg.height + 10);
		this.addChild(buttomBg);
		// 我的昵称 
		let rankNiceNameTF = ComponentManager.getTextField(LanguageManager.getlocal("acMaChaoRankPopupViewTab1NickName-" + this.code, [Api.playerVoApi.getPlayerName()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		rankNiceNameTF.setPosition(buttomBg.x + 20, buttomBg.y + 15);
		this.addChild(rankNiceNameTF);
		// 上榜条件 
		let rankUpTF = ComponentManager.getTextField(LanguageManager.getlocal("acMaChaoRankPopupViewTab1Rule-" + this.code, [String(cfg.rankNeedNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		rankUpTF.width = 250;
		rankUpTF.setPosition(buttomBg.x + buttomBg.width - rankUpTF.width - 10, rankNiceNameTF.y);
		this.addChild(rankUpTF);
		// 我的排名 rankorder2
		let rankStr = "";
		let myRank = this.param.data.rankData.myrankArr.myrank;
		if (myRank && myRank <= 100) {
			rankStr = LanguageManager.getlocal("acMaChaoRankPopupViewTab2Rank-" + this.code, [myRank])
		}
		else {
			rankStr = LanguageManager.getlocal("acMaChaoRankPopupViewTab2Rank-" + this.code, [LanguageManager.getlocal("acMaChaoRankPopupViewTab2Unrank-" + this.code)]);
		}
		let rankMyTF = ComponentManager.getTextField(rankStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		rankMyTF.setPosition(rankNiceNameTF.x, buttomBg.y + buttomBg.height - rankMyTF.height - 15);
		this.addChild(rankMyTF);
		// 转的次数
		let maChaoValueTF = ComponentManager.getTextField(LanguageManager.getlocal("acMaChaoRankPopupViewTab1Score-" + this.code, [String(vo.getMaChaoValue())]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		maChaoValueTF.setPosition(rankUpTF.x, rankMyTF.y);
		this.addChild(maChaoValueTF);

	}
	public dispose() {
		super.dispose();
	}

}