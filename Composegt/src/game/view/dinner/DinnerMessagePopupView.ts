/**
 * 离线消息弹版
 * author shaoliang
 * date 2017/11/2
 * @class DinnerMessagePopupView
 */
//				ViewController.getInstance().openView(ViewConst.POPUP.DINNERMESSAGEPOPUPVIEW,{info:[{"uid":1000579,"phototitle":"4001","name":"芮映波","dtype":1,"pic":1,"join_time":1529761952},{"uid":1000579,"phototitle":"4001","name":"芮映波","dtype":1,"pic":1,"join_time":1529761952},{"uid":1000579,"phototitle":"4001","name":"芮映波","dtype":1,"pic":1,"join_time":1529761952},{"uid":1000579,"phototitle":"4001","name":"芮映波","dtype":1,"pic":1,"join_time":1529761952},{"uid":1000579,"phototitle":"4001","name":"芮映波","dtype":1,"pic":1,"join_time":1529761952},{"uid":1000579,"phototitle":"4001","name":"芮映波","dtype":1,"pic":1,"join_time":1529761952},{"uid":1000579,"phototitle":"4001","name":"芮映波","dtype":1,"pic":1,"join_time":1529761952},{"uid":1000579,"phototitle":"4001","name":"芮映波","dtype":1,"pic":1,"join_time":1529761952},{"uid":1000579,"phototitle":"4001","name":"芮映波","dtype":1,"pic":1,"join_time":1529761952},{"uid":1000579,"phototitle":"4001","name":"芮映波","dtype":1,"pic":1,"join_time":1529761952},{"uid":1000579,"phototitle":"4001","name":"芮映波","dtype":1,"pic":1,"join_time":1529761952}]});

class DinnerMessagePopupView extends PopupView
{
	protected _scrollList:ScrollList;
	public constructor() {
		super();
	}
	protected getResourceList():string[]
	{
		
		return super.getResourceList().concat(["rank_biao"]);
	}
	protected initView():void
	{
		let myInfo:any[] = this.param.data.info;
		let totalGuset:number = 0;
		let bagGust:number = 0;
		let totalScore:number = 0;
		for (let k in myInfo) 
		{
			let info:any = myInfo[k];
			let dinnerCfg = Config.DinnerCfg.getGoToFeastItemCfg(info.dtype);
			if (dinnerCfg.getPoint < 0) {
				bagGust+=1;
			}
			totalScore+= dinnerCfg.getPoint;
			totalGuset+=1;
		}
		let titleStr:string = "";
		if (totalScore >= 0) {
			titleStr = LanguageManager.getlocal("dinnerMessage1",[totalGuset.toString(),bagGust.toString(),totalScore.toString()]);
		}
		else {
			titleStr = LanguageManager.getlocal("dinnerMessage2",[totalGuset.toString(),bagGust.toString(),totalScore.toString()]);
		}

		let typeBg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		typeBg.width = 538;
		typeBg.height = 426;
		typeBg.setPosition(this.viewBg.width/2-typeBg.width/2, 12);
		this.addChildToContainer(typeBg);

		let titleText:BaseTextField = ComponentManager.getTextField(titleStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		titleText.width = this.viewBg.width - 104;
		titleText.lineSpacing = 6;
		titleText.setPosition(52 , 14 + typeBg.y);
		this.addChildToContainer(titleText);

		let rankBg:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		rankBg.width = typeBg.width - 20;
		rankBg.height = 340;
		rankBg.setPosition(this.viewBg.width/2  - rankBg.width/2, typeBg.y + 75);
		this.addChildToContainer(rankBg);

		let titleBg:BaseBitmap = BaseBitmap.create("rank_biao");
		// titleBg.width = rankBg.width - 130;
		// titleBg.height = 36;
		titleBg.x = this.viewBg.width/2 - titleBg.width/2;
		titleBg.y = rankBg.y + 10;
		// titleBg.setPosition(rankBg.x , rankBg.y + 10);
		this.addChildToContainer(titleBg);

		let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("dinnerPlayerName"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameText.setPosition(135 , titleBg.y + titleBg.height/2 - nameText.height/2);
		this.addChildToContainer(nameText);

		let scoreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("playerScore"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		scoreText.setPosition(385 , nameText.y);
		this.addChildToContainer(scoreText);

		
		let scroRect = new egret.Rectangle(titleBg.x, titleBg.y + titleBg.height, titleBg.width,rankBg.height -titleBg.height - 15);
		this._scrollList  = ComponentManager.getScrollList(DinnerMessageItem,myInfo,scroRect);
		this._scrollList.x = titleBg.x;
		this._scrollList.y = titleBg.y + titleBg.height;
		this.addChildToContainer(this._scrollList);

	}

	public dispose():void
	{
		 this._scrollList = null;
		super.dispose();
	}
}