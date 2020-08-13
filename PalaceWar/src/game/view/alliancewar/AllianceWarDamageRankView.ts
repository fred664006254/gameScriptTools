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
        let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB,tabName,this.tabBtnClickHandler,this);
        tabbarGroup.x = 35+GameData.popupviewOffsetX;
        tabbarGroup.y = 15;
		view.addChildToContainer(tabbarGroup);
		
		let contentBg = BaseBitmap.create("public_9_probiginnerbg");
		contentBg.width = 518;
		contentBg.height = 522;
		contentBg.x = this.viewBg.x + this.viewBg.width/2 - contentBg.width/2;
		contentBg.y = 60;
		view.addChildToContainer(contentBg);

		let bg2= BaseBitmap.create("public_9_bg37");
        bg2.width = contentBg.width;
        bg2.height = 40;
        bg2.x = contentBg.x;
        bg2.y = contentBg.y;
		this.addChildToContainer(bg2);
		
		let bottomBg = BaseBitmap.create("public_9_probiginnerbg");
		bottomBg.width = 518;
		bottomBg.height = 85;
		
		bottomBg.x = this.viewBg.x + this.viewBg.width/2 - bottomBg.width/2;
		bottomBg.y = contentBg.y + contentBg.height + 5;
		view.addChildToContainer(bottomBg);

		let leftWin = view.param.data.type == 'win';
		let coutrywar = view.param.data.wartype == 'countrywar';
		let tipTxt =  ComponentManager.getTextField(LanguageManager.getlocal(coutrywar ? 'CountryWarWinAlliTip' : 'allianceWarWinAlliTip', [view.param.data.winanme]), 24);	
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, bottomBg);
		view.addChildToContainer(tipTxt);
		
		let winData = view.param.data.damageLog[leftWin ? LayoutConst.left : LayoutConst.right];
		let dataList = [];
		for(let i in winData){
			let unit = winData[i];
			let num = 0;
			if(typeof unit.win == `number`){
				num = unit.win;
			}
			else if(typeof unit.win == `object`){
				for(let k in unit.win){
					num = unit.win[k];
					break;
				}
			}
			dataList.push({
				uid : i,
				name : unit.name,
				damage : unit.damage,
				win : num
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
        titleTxt1.y = contentBg.y + 8;
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
			let num = 0;
			if(typeof unit.win == `number`){
				num = unit.win;
			}
			else if(typeof unit.win == `object`){
				for(let k in unit.win){
					num = unit.win[k];
					break;
				}
			}
			rankList.push({
				uid : i,
				name : unit.name,
				damage : unit.damage,
				win : num
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