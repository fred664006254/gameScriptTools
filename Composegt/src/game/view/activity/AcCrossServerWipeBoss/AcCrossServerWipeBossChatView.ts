/**
 * 跨服活动聊天
 * author qianjun
 */
class AcCrossServerWipeBossChatView extends CommonView
{

	public constructor() 
	{
		super();
	}
	public initView():void
	{
		NetManager.chat.checkAndReConnect();
		// App.MessageHelper.addEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK,this.doQuickAlliance,this);

		// let bottom: BaseBitmap = BaseBitmap.create("chatview_bottom");

		// bottom.height = 200;
		
		// bottom.y = GameConfig.stageHeigth - 143 - bottom.height;
		// this.addChildToContainer(bottom);

		// let lisetBg = BaseBitmap.create("servant_bottombg");
		// lisetBg.width = GameConfig.stageWidth+14;
		// lisetBg.height = GameConfig.stageHeigth - 250;
		// lisetBg.x = -7;
		// lisetBg.y = -70;
		// this.addChildToContainer(lisetBg);
	}

    // public get activeID():string{
    //     let view = this;
    //     return view.param.data.activeID;
    // } 
    public get tabHeight():number{
        let view = this;
        return view.tabViewData[0].height;
    }
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					// "servant_bottombg","adult_lowbg",
					// "chatview_morebg",
					// "wifeview_bottombg","shield_cn",
					// "chatview_arrow","chatview_bottom",
					// "chatview_inputbg","mainui_missionIcon1","prichatview_bottom","chatlaba"
					"adult_lowbg","chatview_morebg",
					"wifeview_bottombg","shield_cn","public_9_bg33",
					"chat_share_bg_1","chat_share_bg_2","chat_share_bg_3",
					"itemicon1501", "itemicon1511","chatlaba","char_cross_hornbg","chatview_arrow","chat_morebg",
					"public_chatbg_king","chatview_bottom",
					]);
	}

	// (有页签加锁时，需要重新该方法)检查该页签条件是否满足切换条件

	protected getTabbarTextArr():Array<string>
	{
		let tab = [];

		tab.push(`accrossserverwipeBoss_chatTabTitle1`);	
		tab.push(`accrossserverwipeBoss_chatTabTitle2`);
		//openChatType3		
		// tab.push("chatViewTab3Title");
			//tab.push("chatViewTab4Title");
		return tab;
	}
	protected doQuickAlliance()
	{
		this.hide();
		App.CommonUtil.showTip(LanguageManager.getlocal("alliance_beKick"));
	}
	public dispose():void
	{
		// App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK,this.doQuickAlliance,this);

		super.dispose();
	}
}