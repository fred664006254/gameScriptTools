/**
 * 伤害排名
 * author qianjun
 */
class AllianceWarDamageRankView extends PopupView
{
	// 滑动列表
	private _scrollList: ScrollList;
	private _scrollList2: ScrollList;
	private _curTabIdx=0;

	private _acData :any;
	public constructor(){
		super();
	}
	
	private get api():AllianceWarVoApi{
		return Api.allianceWarVoApi;
	}

	public initView():void{	
		let view = this;	
		let tabName = ["allianceWarDamageTab1","allianceWarDamageTab2"];
        let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_WINTAB,tabName,this.tabBtnClickHandler,this);
        tabbarGroup.x = this.viewBg.x+43;
        tabbarGroup.y = this.viewBg.y+10;
		tabbarGroup.setSpace(15);
		view.addChildToContainer(tabbarGroup);
		
		let bg1= BaseBitmap.create("public_tc_bg01");
        bg1.width = 540;
        bg1.height = 685;
        bg1.x = this.viewBg.width/2 - bg1.width/2;
        bg1.y = 53;
        this.addChildToContainer(bg1);
		
		let bottomBg= BaseBitmap.create("public_tc_bg03");
        bottomBg.width = bg1.width - 20;
        bottomBg.height = 110;
        bottomBg.x = bg1.x + 10;
        bottomBg.y = bg1.y + bg1.height- 125;
        this.addChildToContainer(bottomBg);
		let contentBg= BaseBitmap.create("public_tc_bg03");
		contentBg.width = bg1.width - 20;
		contentBg.height = bg1.height - 35 - bottomBg.height;
		contentBg.x = bg1.x + 10;
		contentBg.y = bg1.y + 10;
		this.addChildToContainer(contentBg);

		let bg2= BaseBitmap.create("public_ts_bg01");
        bg2.width = contentBg.width - 10;
        bg2.height = 32;
        bg2.x = contentBg.x + 5;
        bg2.y = contentBg.y + 10;
		this.addChildToContainer(bg2);
		

		let leftWin = view.param.data.type == 'win';
		let coutrywar = view.param.data.wartype == 'countrywar';
		let tipTxt =  ComponentManager.getTextField(LanguageManager.getlocal(coutrywar ? 'CountryWarWinAlliTip' : 'allianceWarWinAlliTip', [view.param.data.winanme]), 24, TextFieldConst.COLOR_BROWN);	
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, bottomBg);
		view.addChildToContainer(tipTxt);
		
		let winData = view.param.data.damageLog[leftWin ? LayoutConst.left : LayoutConst.right];
		let dataList = [];
		for(let i in winData){
			let unit = winData[i];
			dataList.push({
				uid : i,
				name : unit.name,
				damage : unit.damage,
				win : unit.win
			});
		}
		dataList.sort((a,b)=>{
			return b.damage - a.damage;
		});
		
		
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,508,contentBg.height - 60);
		this._scrollList = ComponentManager.getScrollList(AllianceWarDamageRankItem,dataList,rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(contentBg.x + 5 ,contentBg.y + 50);
		this._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData") );

		//个人榜单	
		let titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title1"), TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt1.x = contentBg.x + 40;
        titleTxt1.y = bg2.y + bg2.height/2 - titleTxt1.height/2;
        view.addChildToContainer(titleTxt1);

        let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title2"), 24, TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTF.x = contentBg.x + 135;
        titleTF.y = titleTxt1.y;
		view.addChildToContainer(titleTF);
		
        let titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarWinLastNum"), 24, TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt3.x = contentBg.x + 280;
        titleTxt3.y = titleTxt1.y;
		view.addChildToContainer(titleTxt3);

		let titleTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarDamageNum"), 24, TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt4.x = contentBg.x + 400;
        titleTxt4.y = titleTxt1.y;
		view.addChildToContainer(titleTxt4);

		let loseData = view.param.data.damageLog[leftWin ? LayoutConst.right : LayoutConst.left];
		let rankList = [];
		for(let i in loseData){
			let unit = loseData[i];
			rankList.push({
				uid : i,
				name : unit.name,
				damage : unit.damage,
				win : unit.win
			});
		}
		rankList.sort((a,b)=>{
			return b.damage - a.damage;
		});

		let rect2 = egret.Rectangle.create();
		rect2.setTo(0,0,508,contentBg.height - 60);
        this._scrollList2 = ComponentManager.getScrollList(AllianceWarDamageRankItem,rankList,rect2);
        this.addChildToContainer(this._scrollList2);
		this._scrollList2.setPosition(contentBg.x + 5 ,contentBg.y + 50);
        this._scrollList2.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
		this._scrollList2.visible = false;
    }

	protected tabBtnClickHandler(params:any){
        this._curTabIdx = params.index;
        this.refreshRankList();
	}
	
    protected refreshRankList(){
	   let view = this;
	   let leftWin = view.param.data.type == 'win';
	   this._scrollList.visible = view._curTabIdx == 0;
	   this._scrollList2.visible = !this._scrollList.visible;
    }

	public dispose():void{
		let view = this;
		// 未婚滑动列表
		view._scrollList = null;
		view._scrollList2 = null;
		super.dispose();
	}
}