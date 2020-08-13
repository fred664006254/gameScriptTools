/*
author : qianjun
desc : PromotePlayerPopViewTab1 帮会成员
*/
class PromotePlayerPopViewTab1 extends CommonViewTab
{ 
	private _scrollList : ScrollList = null; 
	private _posArr : number[]= [];
	public promoteType = 1;
	private _maskBg : BaseBitmap = null;
	private _listBg : BaseBitmap = null;

	public constructor() 
	{
		super();
		this.initView();
	}

	private get api(){
        return Api.promoteVoApi;
	}
	
	private get cfg(){
        return Config.PromoteCfg;
    }
	
	protected initView():void
	{
		let view = this;
		view.width = GameConfig.stageWidth - 40;
		view.height = GameConfig.stageHeigth - 370;

		let listBg = BaseBitmap.create("public_9_bg32");
        listBg.width = GameConfig.stageWidth - 40;
		listBg.height = GameConfig.stageHeigth - 370;
		view._listBg = listBg;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, listBg, view, [0,20]);
        view.addChild(listBg);

        let maskBg = BaseBitmap.create("public_9_bg33");
        maskBg.width = listBg.width;
		maskBg.height = 30;
		view._maskBg = maskBg;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, maskBg, listBg, [0,0]);
		view.addChild(maskBg);
		
		//添加标题文字
		view.refreshTopTitle(maskBg);
		//获取数据
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PROMOTE_GETLIST), view.getPromotePlayerlistCallBack, view);
		NetManager.request(NetRequestConst.REQUEST_PROMOTE_GETLIST, {
			sortKey : 1
		});
	}

	private refreshTopTitle(maskBg : BaseBitmap)
    {
        let view = this;
        let title_nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        title_nameTxt.text = LanguageManager.getlocal("PromotePlayersPopViewList1");
        view.addChild(title_nameTxt);

        let title_officerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
		title_officerTxt.text = LanguageManager.getlocal("acRankPop_title2");
		title_officerTxt.alpha = 0;
        view.addChild(title_officerTxt);

        let title_powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        title_powerTxt.text = LanguageManager.getlocal("rankpower");
		view.addChild(title_powerTxt);
		
		
		let rmTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        rmTxt.text = LanguageManager.getlocal("PromotePlayersPopViewRm");
		view.addChild(rmTxt);
		if(PlatformManager.checkIsEnSp())
		{
			title_nameTxt.x = 42;  
		}
        view._posArr = [];
        let desc = ((maskBg.width - TextFieldConst.FONTSIZE_TITLE_SMALL * (2 + 4 + 2 + 2)) / 5);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, title_nameTxt, maskBg, [desc-20,0]);
        view._posArr.push(title_nameTxt.x - maskBg.x);
        view.setLayoutPosition(LayoutConst.lefttop, title_officerTxt, title_nameTxt, [title_nameTxt.textWidth + desc+10,0]);
        view._posArr.push(title_officerTxt.x - maskBg.x);
        view.setLayoutPosition(LayoutConst.lefttop, title_powerTxt, title_officerTxt, [title_officerTxt.textWidth + desc+10,0]);
		if(PlatformManager.checkIsEnSp())
		{
			view.setLayoutPosition(LayoutConst.lefttop, title_powerTxt, title_officerTxt, [title_officerTxt.textWidth + desc+10-72,0]);
			view._posArr.push(360);
		}
		else
		{
			view._posArr.push(title_powerTxt.x - maskBg.x);
		}
		
		view.setLayoutPosition(LayoutConst.rightverticalCenter, rmTxt, maskBg, [50,0]);
        view._posArr.push(rmTxt.x - maskBg.x);

	
	}

	public refreshWhenSwitchBack():void{
		NetManager.request(NetRequestConst.REQUEST_PROMOTE_GETLIST, {
			sortKey : 1
		});
	}

    private getPromotePlayerlistCallBack(evt : egret.Event):void{
		if (evt && evt.data && evt.data.ret){
			let view = this;
			let data = evt.data.data.data;
			view.api.initPlayerListData(data);
			view.freshList();
		}
	}
	
	private freshList():void{
		let view = this;
		//列表
        let data = view.api.getPromotePlayerList();
        let lenth = data.length;//Math.floor(Math.random() * 10) + 1;
		let arr = [];
		let parent:any = ViewController.getInstance().getView('PromotePlayerPopView');
        for(let i = 0; i < lenth; ++i){
            let unit = data[i];
            unit.pos_arr = view._posArr;
			unit.width = view._maskBg.width;
			unit.promoteType = parent.promoteType;
            arr.push(unit);
		}
		
		 
		if(!view._scrollList){
			let scrollList  = ComponentManager.getScrollList(PromotePlayerScrollItem, arr, new egret.Rectangle(view._maskBg.x, view._maskBg.y + view._maskBg.height, view._listBg.width, view._listBg.height - 80));
			view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view._maskBg, [0,view._maskBg.height + 20]);
			view.addChild(scrollList);
			view._scrollList = scrollList;
		}
		else{
			view._scrollList.refreshData(arr);
		}
		
		if(data.length){
			
		}
		else{
			view._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData") );
		}
	}

	// protected getTabbarGroupY() : number{
	// 	return 220;
	// };

	protected getSheepType():number
	{
		return 1;
	}
	
	public dispose():void
	{	
		let view = this;
		this._scrollList =null;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PROMOTE_GETLIST), view.getPromotePlayerlistCallBack, view);
		super.dispose();
	}
}