/**
 *新邀请好友邀请玩家列表
 * author qianjun
 */
class PlayerComeBackUserinfoPopupView extends PopupView{ 

	public constructor(){
		super();
    }

    private get api(){
		return Api.newrebackVoApi;
	}

	private get cfg(){
		return Config.PlayercomebackCfg;
	}
    
	protected getResourceList():string[]{
		return super.getResourceList().concat([
			`rankinglist_rankbg`,`public_popupscrollitembg`
		]);
    }

    protected getBgName():string{
		return `popupview_bg3`;
	}

	protected getCloseBtnName():string{
		return `popupview_closebtn2`;
	}
	
	protected receiveData(data: { ret: boolean, data: any }): void{
        if(data.ret){
        }
    }
	protected getRequestData():{requestType:string,requestData:any} {
		return {requestType:NetRequestConst.REQUEST_REBACK_GETINFO,requestData:{}};
	}

	public initView():void{		
		// let tabName = ["acPunishRankRewardTab1"];
		let view = this;
		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`playercomebackcodetip8`, [view.api.getInviteFriendNum().toString()]), 22, TextFieldConst.COLOR_BLACK);
		view.addChildToContainer(tipTxt);
		tipTxt.setPosition(view.viewBg.x + (view.viewBg.width - tipTxt.width) / 2, 10);

		let bg = BaseBitmap.create("public_9_bg4");
        bg.width = 525;
        bg.height = 620;
		view.addChildToContainer(bg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, tipTxt, [0,tipTxt.textHeight+10]);
		
		let arr = view.api.getInviteFriendList();
		let list = ComponentManager.getScrollList(PlayerComeBackUserinfoItem, arr, new egret.Rectangle(0,0,515,600));
		view.addChildToContainer(list);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, bg, [0,10]);
		list.setEmptyTip(LanguageManager.getlocal(`playercomebackuserinfo4`),TextFieldConst.COLOR_BLACK);

		let tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(`playercomebackcodetip9`), 22, TextFieldConst.COLOR_BLACK);
		view.addChildToContainer(tipTxt2);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt2, bg, [0,bg.height+20]);
    }

	protected getTitleStr():string{
		return `playercomebackcodetip7`;
	}
	
	protected getShowHeight():number{
		return 800;
	}

	public dispose():void{
        let view = this;
		super.dispose();
	}
}