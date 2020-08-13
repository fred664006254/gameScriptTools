/**
 * 标签2 佳人列表
 * author qianjun----wxz
 */
class AcGroupWifeBattleTalentViewTab2 extends CommonViewTab {
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
	private _isHaveBuff = null;
	public constructor(data?) 
	{
		super();
		this.param = data;
		this.initView();
	}

	public initView():void
	{
		App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_CRASHMODEL,this.refreshList,this);
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
		topBg.y = 5;
		this.addChild(topBg);

		let model = this.vo.wifebattlecross;
		let plusv = this.vo.test ? 0:(model.info.totaltactadd?model.info.totaltactadd:0);
		let allTalentStr = null;
		if(!isHaveBuff){
			allTalentStr = LanguageManager.getlocal("wifeBattleAllTalentTxt1",[String(model.info.totaltalent)]);
		} else {
			allTalentStr = LanguageManager.getlocal("wifeBattleAllTalentTxt2",[String(this.vo.test ? 0 : model.info.totaltalent),String(plusv)]);
		}

		this._allTalentTxt = ComponentManager.getTextField(allTalentStr,20,TextFieldConst.COLOR_BLACK);
		this._allTalentTxt.lineSpacing = 5;
		this._allTalentTxt.textAlign = egret.HorizontalAlign.CENTER;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._allTalentTxt, topBg, [0,10]);
		this.addChild(this._allTalentTxt);

		//边框
		// let borderBg = BaseBitmap.create("public_9_bg32");
		// borderBg.width = 610;
		// borderBg.height =  GameConfig.stageHeigth -143 - 133-40-18; //666
		// borderBg.x = 320-borderBg.width/2;
		// borderBg.y = topBg.y + topBg.height * topBg.scaleY + 8;
		// this.addChild(borderBg);

		let title= BaseBitmap.create("qingyuanitemtitlebg");
		title.width = 594;
		title.x = GameConfig.stageWidth/2 - title.width/2;
		title.y = topBg.y + topBg.height * topBg.scaleY + 5;
		this._title = title;
        this.addChild(title);

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

		let rect = new egret.Rectangle(0,0,title.width+10, 770-(1136-GameConfig.stageHeigth));

		// let list = Api.dailytaskVoApi.getTaskIdListAfterSort();
		let list = [];
		let wifeadd_arr = this.vo.test ? [] : (model.info.tmpattr.wifeadd_arr ? model.info.tmpattr.wifeadd_arr : [])
		if(wifeadd_arr.length){
			for(let i in wifeadd_arr){
				let unit = wifeadd_arr[i];
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
		this._scrollList = ComponentManager.getScrollList(AcGroupWifeBattleTalentViewTab2Item, list ,rect, {
			aid : this.param.data.aid,
			code : this.param.data.code
		});
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

		this.refreshList(null);
	}

	private checkHaveBuff():boolean
	{
		return true;
	}

	private get cfg() : Config.AcCfg.GroupWifeBattleCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid,this.param.data.code);
	}
	private get vo() : AcGroupWifeBattleVo{
		return <AcGroupWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid,this.param.data.code);
	}

	public refreshWhenSwitchBack():void{
		super.refreshWhenSwitchBack();
		this.refreshList(null);
	}

	private refreshList(evt : egret.Event):void
	{
		if(evt){
			let data = evt.data.data.data;
			if(data.groupwifebattle)
			{
				this.vo.setWifebattleInfo(data.groupwifebattle);
			}
		}
		
		let model = this.vo.wifebattlecross;
		let plusv = this.vo.test ? 0 : (model.info.totaltactadd?model.info.totaltactadd:0);
		let allTalentStr = null;
		if(!this.checkHaveBuff()){
			allTalentStr = LanguageManager.getlocal("wifeBattleAllTalentTxt1",[String(this.vo.test ? 0 : model.info.totaltalent)]);
		} else {
			allTalentStr = LanguageManager.getlocal("wifeBattleAllTalentTxt2",[String(this.vo.test ? 0 : model.info.totaltalent),String(plusv)]);
		}

		this._allTalentTxt.text = allTalentStr;

		let list = [];
		let wifeadd_arr = this.vo.test ? [] : (model.info.tmpattr.wifeadd_arr ? model.info.tmpattr.wifeadd_arr : [])
		if(wifeadd_arr.length){
			for(let i in wifeadd_arr){
				let unit = wifeadd_arr[i];
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
			this._scrollList.refreshData(list, {
				aid : this.param.data.aid,
				code : this.param.data.code
			});
		} else {
			list.sort((a,b)=>{
				return a.talentadd - b.talentadd;
			});
			this._scrollList.refreshData(list, {
				aid : this.param.data.aid,
				code : this.param.data.code
			});
		}
	}
	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_CRASHMODEL,this.refreshList,this);
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
		this._isHaveBuff = null;
		super.dispose();
	}
}