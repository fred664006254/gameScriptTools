/**
 * 大奖奖池中奖名单
 * author jiangliuyang
 * date 2018/10/17
 * @class AcLotteryRandBoxPopupView
 */
class AcLotteryRandBoxPopupView extends PopupView
{

	public constructor() 
	{
		super();
	}

	protected initView():void
	{

		let bg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		bg.width = 530;
		bg.height = 380;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this.addChildToContainer(bg);


		let bg2:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		bg2.width = bg.width - 20;
		bg2.height = 170;
		bg2.x = bg.x + 10;
		bg2.y = bg.y +  10;
		this.addChildToContainer(bg2);


		let bg3:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		bg3.width = bg2.width ;
		bg3.height = bg2.height;
		bg3.x = bg2.x;
		bg3.y = bg2.y +  bg2.height + 20;
		this.addChildToContainer(bg3);

		let title2 =ComponentManager.getTextField(LanguageManager.getlocal("acLotteryRandBoxPopupView_txt1"),20,TextFieldConst.COLOR_BROWN);
		title2.x = bg2.x +  20;
		title2.y = bg2.y + 15;
		this.addChildToContainer(title2);

		let title3 = ComponentManager.getTextField(LanguageManager.getlocal("acLotteryRandBoxPopupView_txt2"),20,TextFieldConst.COLOR_BROWN);
		title3.x = title2.x ;
		title3.y = bg3.y + 15;
		this.addChildToContainer(title3);

		let cfgData = this.param.data.cfgData;
		let randReward = cfgData.randReward;
		
		let ranArr = [];
		for (var key in randReward) {
			if (randReward.hasOwnProperty(key)) {
				var element = randReward[key];
				ranArr.push(element[0]);
			}
		}

		let content2 = new BaseDisplayObjectContainer();
		let ranArrStr = ranArr.join("|")
		let rewardArr2 = GameData.getRewardItemIcons(ranArrStr,true,true);
		for (let index = 0; index < rewardArr2.length; index++) {
			let rewardIcon = rewardArr2[index];
			rewardIcon.setScale(0.9);
			// rewardIcon.height = 42;
			// rewardIcon.width = 42;
			rewardIcon.setPosition(10 + 110 * index ,10);
			content2.addChild(rewardIcon);
		}
		
		let rect1 = new egret.Rectangle(0,0,bg2.width - 30 ,bg2.height - 40);
		let scrollList1 = ComponentManager.getScrollView(content2,rect1);
		scrollList1.horizontalScrollPolicy = "on";
		scrollList1.verticalScrollPolicy = "off";
		scrollList1.x = bg2.x + 15;
		scrollList1.y = title2.y + 20;
		this.addChildToContainer(scrollList1);


		let getReward = cfgData.getReward;
		let content3 = new BaseDisplayObjectContainer();
		let rewardArr = GameData.getRewardItemIcons(getReward,true,true);
		for (let index = 0; index < rewardArr.length; index++) {
			let rewardIcon = rewardArr[index];
			rewardIcon.setScale(0.9);
			// rewardIcon.height = 42;
			// rewardIcon.width = 42;
			rewardIcon.setPosition(10 + 110 * index ,10);
			content3.addChild(rewardIcon);
		}
		
		let rect3 = new egret.Rectangle(0,0,bg3.width - 30 ,bg3.height - 40);
		let scrollList3 = ComponentManager.getScrollView(content3,rect3);
		scrollList3.horizontalScrollPolicy = "on";
		scrollList3.verticalScrollPolicy = "off";
		scrollList3.x = bg3.x + 15;
		scrollList3.y = title3.y + 20;
		this.addChildToContainer(scrollList3);

		let txt4 = ComponentManager.getTextField(LanguageManager.getlocal("acLotteryRandBoxPopupView_txt3"),20,TextFieldConst.COLOR_BROWN);
		txt4.multiline = true;
		txt4.lineSpacing = 4;
		txt4.width = bg3.width - 60;
		txt4.x = bg.x  + bg.width/2 - txt4.width/2;
		txt4.y = bg.y + bg.height + 15;
		this.addChildToContainer(txt4);
		
	}

	
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		]);
	}

	protected getTitleStr():string
	{
		let boxId = this.param.data.boxId;
		boxId = boxId.split("_")[1];
		return "itemName_"+boxId;
	}


	public dispose():void
	{
		super.dispose();
	}

}