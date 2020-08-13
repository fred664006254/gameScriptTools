/**
 * 20190401
 * 奸臣皮肤兑换
 */
class AcRansackTraitorSPPopupView extends PopupView {

	public constructor() {
		super();
	}


	protected initView(): void {

		let findItemIndex = this.param.data.findItemIndex;
		let isFind = this.param.data.isFind;



		let bg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		bg.width = 528;
		bg.height = 292+25;
		bg.setPosition((this.viewBg.width-bg.width)/2,10);
		this.addChildToContainer(bg);
		
		let rbg:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		rbg.width = bg.width - 20;
		rbg.height = 170;
		rbg.setPosition(bg.x+ 10,bg.y + bg.height -10 - rbg.height);
		this.addChildToContainer(rbg);

		let txt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		txt.text  = LanguageManager.getlocal("ransackTraitorSP_gettxt2");
		if(this.param.data.isFind){
			txt.text  = LanguageManager.getlocal("ransackTraitorSP_gettxt1");
		}
		txt.y = rbg.y/2 +  bg.y/2  - txt.height/2;
		txt.x = bg.x + bg.width/2 - txt.width/2;
		this.addChildToContainer(txt);

		let txt2 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
		txt2.text  = LanguageManager.getlocal("ransackTraitorSP_gettxt3");
		txt2.y = rbg.y + 15;
		txt2.x = rbg.x + 15;
		this.addChildToContainer(txt2);

		let _rewardContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(_rewardContainer);
		let rewards = this.param.data.rewards;
		let rewardArr =  GameData.formatRewardItem(rewards);
		let startX = 10;
		let startY = 10;
		for (var index = 0; index < rewardArr.length; index++) {
			let iconItem = GameData.getItemIcon(rewardArr[index],true,true);
			startX = 10 + index%4 * (iconItem.width+13);
			if(index >0 && index%4 ==0){
			 	startX = 10 ;
				startY += iconItem.height + 10;
			}
			iconItem.x = startX;
			iconItem.y = startY;
			_rewardContainer.addChild(iconItem);
		}
		rbg.height = txt2.y + _rewardContainer.height+40 - rbg.y;
		bg.height = rbg.y + rbg.height + 10;
		// _rewardContainer.width += 20;
		let rect = new egret.Rectangle(0,0,rbg.width - 20,rbg.y + rbg.height - txt2.y - 30);
		let scrView = ComponentManager.getScrollView(_rewardContainer,rect);
		scrView.horizontalScrollPolicy = "off";
		// scrView.verticalScrollPolicy = "on";
		scrView.x = rbg.x +10;
		scrView.y = txt2.y + 25;
		this.addChildToContainer(scrView);
		

		let confirmBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"sysConfirm",this.hide,this);
		confirmBtn.x = bg.x + bg.width/2 - confirmBtn.width/2;
		confirmBtn.y = bg.y + bg.height + 15;
		this.addChildToContainer(confirmBtn);
	}
	public hide(){
		// if( this.param.data.findAll){
		// 	ViewController.getInstance().openView(ViewConst.POPUP.ACRANKSACKTRAITOREXCHANGEPOPUPVIEW,{"aid":this.param.data.aid,"code":this.param.data.code});
		// }
		super.hide();
	}
	protected getTitleStr():string
	{
		return "itemUseConstPopupViewTitle";
	}

	public dispose(): void {

		super.dispose();
	}

}