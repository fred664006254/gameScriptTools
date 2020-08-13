/**
 * 标签1 家人列表
 * author qianjun
 */
class WifeTalentViewTab2 extends ViewTab {
	private _scrollList:ScrollList = null;
	private _allTalentTxt:BaseTextField = null;
	private _descTxt:BaseTextField = null;
	

	private _barWifeTxt:BaseTextField = null;
	private _barStatusTxt:BaseTextField = null;
	private _caiyiTxt:BaseTextField = null;
	private _caiqingTxt:BaseTextField = null;
	private _orderImg:BaseButton = null;
	private _opTxt:BaseTextField = null;
	private _title:BaseBitmap = null;

	private _isOrderDown: boolean = true;
	private _acVo = null;
	private _isHaveBuff = null;

	public constructor() {
		super();
		this.initView();
	}

	public initView():void
	{
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL,this.hide,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIFEBATTLE_REFRESH,this.refreshList,this);
		let isHaveBuff = false;
		let h = 80;
		if(this.checkHaveBuff()){
			isHaveBuff = true;
			h = 168;
		}
		let topBg = BaseBitmap.create("wifetalenttopbg");
		topBg.width = 614;
		topBg.x = 640/2 - topBg.width/2;
		topBg.scaleY = 150 / 118;
		topBg.y = 15;
		this.addChild(topBg);

		let model = Api.wifebattleVoApi.wifebattleVo;
		let plusv = model.info.totaltactadd?model.info.totaltactadd:0;
		let allTalentStr = null;
		if(!isHaveBuff){
			allTalentStr = LanguageManager.getlocal("wifeBattleAllTalentTxt1",[String(model.info.totaltalent)]);
		} else {
			allTalentStr = LanguageManager.getlocal("wifeBattleAllTalentTxt2",[String(model.info.totaltalent),String(plusv)]);
		}

		this._allTalentTxt = ComponentManager.getTextField(allTalentStr,20,TextFieldConst.COLOR_BLACK);
		this._allTalentTxt.lineSpacing = 5;
		this._allTalentTxt.textAlign = egret.HorizontalAlign.CENTER;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._allTalentTxt, topBg, [0,10]);
		this.addChild(this._allTalentTxt);


		// if(isHaveBuff){
		// 	let wifeBattleBuff = this.getCfg().wifeBattleBuff;
		// 	let curlv = 1;
		// 	let nextAdd = 0;
		// 	let artsum = model.info.artsum?model.info.artsum:0;
		// 	for (let index = 0; index < wifeBattleBuff.length; index++) {
		// 		let element = wifeBattleBuff[index];
		// 		let artistryRange = element.artistryRange;
		// 		if(artistryRange[0]<=artsum && artsum <= artistryRange[1])
		// 		{
		// 			nextAdd = element.rankBuff;
		// 			break;
		// 		}
		// 		++curlv;
		// 	}
		// 	// if(wifeBattleBuff[curlv]){
		// 	// 	nextAdd = wifeBattleBuff[curlv].rankBuff;
		// 	// }

		// 	this._descTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeAllTalentViewTip",[""+nextAdd]),20,TextFieldConst.COLOR_WARN_YELLOW2);
		// 	this._descTxt.x = this._allTalentTxt.x + (this._allTalentTxt.width - this._descTxt.width) / 2;
		// 	this._descTxt.y = this._allTalentTxt.y + this._allTalentTxt.height + 8;
		// 	this.addChild(this._descTxt);
		
		// 	// let acTime = this.getAcVo().getAcLocalTime();
		// 	// this._acTxt = ComponentManager.getTextField(acTime,20,0x65e74b);
		// 	// this._acTxt.width = 550;
		// 	// this._acTxt.x = this._descTxt.x;
		// 	// this._acTxt.y = this._descTxt.y + this._descTxt.height + 10;
		// 	// this.addChild(this._acTxt);
		// }

		//边框
		let borderBg = BaseBitmap.create("public_9_bg32");
		borderBg.width = 610;
		borderBg.height =  GameConfig.stageHeigth -143 - 133-40-18; //666
		borderBg.x = 320-borderBg.width/2;
		borderBg.y = topBg.y + topBg.height * topBg.scaleY + 8;
		this.addChild(borderBg);

		let title= BaseBitmap.create("qingyuanitemtitlebg");
		title.width = borderBg.width - 20;

        title.x = borderBg.x + borderBg.width/2 - title.width/2;
        title.y = borderBg.y + 15;
		this._title = title;
        this.addChild(title);
		
	// 		private _barWifeTxt:BaseTextField = null;
	// private _barStatusTxt:BaseTextField = null;
	// private _caiyiTxt:BaseTextField = null;
	// private _caiqingTxt:BaseTextField = null;
	// private _orderImg:BaseBitmap = null;
	// private _opTxt:BaseTextField = null;

		this._barWifeTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleAllBarWife"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._barWifeTxt.x = title.x + 47;
		this._barWifeTxt.y = title.y + title.height/2 - this._barWifeTxt.height/2;
		this.addChild(this._barWifeTxt);

		this._barStatusTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleAllBarStatus"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._barStatusTxt.x = 198- 19 - this._barStatusTxt.height/2;
		this._barStatusTxt.y = title.y + title.height/2 - this._barStatusTxt.height/2;
		this.addChild(this._barStatusTxt);

		this._caiyiTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleAllBarCaiyi"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._caiyiTxt.x = 280-23 - this._caiyiTxt.height/2;
		this._caiyiTxt.y = title.y + title.height/2 - this._caiyiTxt.height/2;
		this.addChild(this._caiyiTxt);

		this._caiqingTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleAllBarCaiqing"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._caiqingTxt.x = 380 - 16 - this._caiqingTxt.height/2;
		this._caiqingTxt.y = title.y + title.height/2 - this._caiqingTxt.height/2;
		this.addChild(this._caiqingTxt);

		this._opTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleAllBarOp"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._opTxt.x = 530 - this._opTxt.height/2;
		this._opTxt.y = title.y + title.height/2 - this._opTxt.height/2;
		this.addChild(this._opTxt);

		this._orderImg = ComponentManager.getButton("wifebattleview_updown",null,this.orderHandler,this,null,3);
		this._orderImg.scaleY = -1
		this._orderImg.x = this._caiqingTxt.x + this._caiqingTxt.width - 50;
		this._orderImg.y = title.y + title.height/2 - this._orderImg.height * this._orderImg.scaleY/2;
		// this._orderImg.y = title.y + title.height/2 - this._orderImg.height/2;
		this.addChild(this._orderImg);

		let rect = new egret.Rectangle(0,0,600,borderBg.height - 70);

		// let list = Api.dailytaskVoApi.getTaskIdListAfterSort();
		let list = [];
		if(Api.wifebattleVoApi.wifebattleVo.info && Api.wifebattleVoApi.wifebattleVo.info.tmpattr && Api.wifebattleVoApi.wifebattleVo.info.tmpattr.wifeadd_arr){
			for(let i in Api.wifebattleVoApi.wifebattleVo.info.tmpattr.wifeadd_arr){
				let unit = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.wifeadd_arr[i];
				if(Api.wifestatusVoApi.getWifestatusLevelById(unit.wid) == `1`){
					continue;
				}
				list.push(unit);
			}
		}
		list = list?list:[];
		list.sort((a,b)=>{
			return b.talentadd - a.talentadd;
		});
		this._scrollList = ComponentManager.getScrollList(WifeAllTalentScrollItem,list ,rect);
		this._scrollList.x = 320 - this._scrollList.width/2;
		this._scrollList.y = title.y+title.height + 5;
		this.addChild(this._scrollList);
	}
 
 	private orderHandler():void
	{
		this._isOrderDown = !this._isOrderDown;
		if(this._isOrderDown){
			this._orderImg.scaleY = -1;
		} else {
			this._orderImg.scaleY = 1;
		}
		this._orderImg.y = this._title.y + this._title.height/2 - this._orderImg.height * this._orderImg.scaleY/2;

		this.refreshList();



	}

	private tick(){
        if(!this._acVo){
            this._acVo = this.getAcVo();
        }
		if(!this._acVo){
            return;
        }
        let t = this._acVo.et - GameData.serverTime - 86400 * 1;

		let isHaveBuff = false;
		if(t > 0){
			isHaveBuff = true;
		} else {
			isHaveBuff = false;
		}

		if(this._isHaveBuff != null && isHaveBuff != this._isHaveBuff){
			App.CommonUtil.showTip(LanguageManager.getlocal("wifeTalentUpPopupViewAcOver"));
			NetManager.request(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL,{});
			// this.hide();
		}

		this._isHaveBuff = isHaveBuff;


    }

	// private tick(){
    //     if(!this._acVo){
    //         this._acVo = this.getAcVo();
    //     }
    //     let t = this._acVo.et - GameData.serverTime  - 86400 * 1;
    //     if(t<0){
    //          App.CommonUtil.showTip(LanguageManager.getlocal("wifeTalentUpPopupViewAcOver"));
    //          this.hide();
    //     } 
    // }
	private checkHaveBuff():boolean
	{
		let modelList:AcBaseVo[] = Api.acVoApi.getRanActives();
		for(let i in modelList){
			let unit = modelList[i];
			if(unit.atype == `22`){
				let t = unit.et - GameData.serverTime - 86400 * 1;
				if(t>0){
					return true;
				}
			}
		}
		return false;
	}
	private getAcVo():AcBaseVo
	{
		let modelList:AcBaseVo[] = Api.acVoApi.getRanActives();
		for(let i in modelList){
			let unit = modelList[i];
			if(unit.atype == `22`){
				let t = unit.et - GameData.serverTime - 86400 * 1;
				if(t>0){
					return unit;
				}
			}
		}
		return null;

	}
	
	private getCfg(){
        return Config.WifebattleCfg;
	}
	
	private refreshList():void
	{

		let model = Api.wifebattleVoApi.wifebattleVo;
		let plusv = model.info.totaltactadd?model.info.totaltactadd:0;
		let allTalentStr = null;
		if(!this.checkHaveBuff()){
			allTalentStr = LanguageManager.getlocal("wifeBattleAllTalentTxt1",[String(model.info.totaltalent)]);
		} else {
			allTalentStr = LanguageManager.getlocal("wifeBattleAllTalentTxt2",[String(model.info.totaltalent),String(plusv)]);
		}

		this._allTalentTxt.text = allTalentStr;

		let list = [];
		if(Api.wifebattleVoApi.wifebattleVo.info && Api.wifebattleVoApi.wifebattleVo.info.tmpattr && Api.wifebattleVoApi.wifebattleVo.info.tmpattr.wifeadd_arr){
			for(let i in Api.wifebattleVoApi.wifebattleVo.info.tmpattr.wifeadd_arr){
				let unit = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.wifeadd_arr[i];
				if(Api.wifestatusVoApi.getWifestatusLevelById(unit.wid) == `1`){
					continue;
				}
				list.push(unit);
			}
		}
		list = list?list:[];
		if(this._isOrderDown){
			list.sort((a,b)=>{
			return b.talentadd - a.talentadd;
			});
			this._scrollList.refreshData(list);
		} else {
			list.sort((a,b)=>{
				return a.talentadd - b.talentadd;
			});
			this._scrollList.refreshData(list);
		}


	}
	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL,this.hide,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WIFEBATTLE_REFRESH,this.refreshList,this);
		this._scrollList = null;
		this._allTalentTxt = null;
		this._descTxt = null;
	

		this._barWifeTxt = null;
		this._barStatusTxt = null;
		this._caiyiTxt = null;
		this._caiqingTxt = null;
		this._orderImg = null;
		this._opTxt = null;
		this._title = null;

		this._isOrderDown = true;

		this._acVo = null;
		this._isHaveBuff = null;
		super.dispose();
	}
}