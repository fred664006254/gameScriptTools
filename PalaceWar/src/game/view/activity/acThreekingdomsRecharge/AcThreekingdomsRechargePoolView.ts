/**
 * 奖励预览
 * author ycg
 * date 2020.1.19
 */
class AcThreekingdomsRechargePoolView extends PopupView
{
	public constructor(){
		super();
	}

	protected getResourceList():string[]{
		return super.getResourceList().concat([
            `public_textbrownbg`,
		]);
    }

    protected getBgName():string{
		return `popupview_bg3`;
	}

	protected getCloseBtnName():string{
		return `popupview_closebtn2`;
	}

	public initView():void{		
		// let tabName = ["acPunishRankRewardTab1"];
		let view = this;

        let tipbg = BaseBitmap.create(`public_textbrownbg`);
        tipbg.width = 510;
        view.addChildToContainer(tipbg);
        tipbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - tipbg.width / 2,10);

        let tipTxtStr1 = view.param.data.topMsg;
		let tipTxt = ComponentManager.getTextField(tipTxtStr1, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, tipbg);
		view.addChildToContainer(tipTxt);

		let rewards = view.param.data.rewards;
		let rewardArr = GameData.getRewardItemIcons(rewards, true, true);//view.cfg.getWealthGod()
        
        let listbg = BaseBitmap.create(`public_9_bg94`);
		listbg.width = 520;
		// listbg.height = 370;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, tipbg, [0,tipbg.height+55]);
		view.addChildToContainer(listbg);

        let tip2Txt = ComponentManager.getTextField(LanguageManager.getlocal(`dailyTask_rewardTip`), 18, TextFieldConst.COLOR_BLACK);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip2Txt, listbg, [3,-tip2Txt.height-2]);
        view.addChildToContainer(tip2Txt);
        
		let scrolNode : BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
		view.addChildToContainer(scrolNode);
		for(let i in rewardArr){
			let icon = rewardArr[i];
			let idx = Number(i);

			icon.x = 7 + (idx % 4) * (108 + 18);
			icon.y = 5 + Math.floor(idx / 4) * (108 + 8);
			scrolNode.addChild(icon);
		}
		scrolNode.height = Math.ceil(rewardArr.length / 4) * (108 + 8);
		scrolNode.width = listbg.width - 20;
		listbg.height = scrolNode.height + 20;
		let rect = new egret.Rectangle(0, 0, listbg.width - 20, listbg.height - 20);
        let scrollview : ScrollView = ComponentManager.getScrollView(scrolNode,rect)
		scrollview.bounces = false;
		scrollview.x = listbg.x + 10;
		scrollview.y = listbg.y + 10;
		scrollview.horizontalScrollPolicy = 'off';
		this.addChildToContainer(scrollview);

		let btn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, `sysConfirm`, ()=>{
			view.hide();
		}, view);	
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, listbg, [0,listbg.height+15]);
		this.addChildToContainer(btn);	
	}
	
	// protected getShowHeight():number{
	// 	return 640;
	// }

	protected getBgExtraHeight():number{
		return 20;
	}

	protected getTitleStr():string{
		return "acThreekingdomsRechargePoolTitle";
	}

	public dispose():void{
		let view = this;
		super.dispose();
	}
}