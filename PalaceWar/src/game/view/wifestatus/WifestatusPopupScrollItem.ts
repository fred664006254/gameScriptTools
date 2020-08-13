/**
 * 册封详情Item
 * author dky
 * date 2018/4/26
 * @class WifestatusPopupScrollItem
 */
class WifestatusPopupScrollItem extends ScrollListItem
{
	
	private _achIndex:number;
		
	public constructor() 
	{
		super();
	}

	public initItem(index:number,data:any):void
	{
		this.width = 520;
		this.height = 57 + this.getSpaceY();

		// let parent = <AchievementDetailPopupView>this.par
		let id = data.id;

		let wifestatusVo = Api.wifestatusVoApi.getWifestatusVo();
		let wifeVo = Api.wifeVoApi.getWifeInfoVoById(WifestatusPopupView.wifeId);


		

		let bgStr = "childview_bg1";
		//未解锁
		if(Number(id) > Number(wifestatusVo.level) && id!="2")
		{
			bgStr = "childview_bg2";
		}
		if(wifeVo.intimacy < data.needIntimacy ||wifeVo.glamour < data.needGlamour)
		{
			bgStr = "childview_bg2";
		}

		if(WifestatusPopupView.wifeLevel == data.id)
		{
			bgStr = "childview_bg3";
		}

		let bgBg:BaseBitmap = BaseBitmap.create(bgStr);
		bgBg.width = this.width;
		bgBg.height = 57;
		this.addChild(bgBg);
		
		//未解锁
		if(Number(id) > Number(wifestatusVo.level) && id!="2")
		{
			let lockIcon:BaseBitmap = BaseBitmap.create("wifestatus_lock");
			lockIcon.x = 450;
			lockIcon.y = this.height/2 - lockIcon.height/2;
			this.addChild(lockIcon);
		}
		//当前位份
		if(WifestatusPopupView.wifeLevel == data.id)
		{

			let nodeTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeStatusCurStatus"),TextFieldConst.FONTSIZE_CONTENT_SMALL);
			nodeTF.textColor = TextFieldConst.COLOR_BROWN;
			nodeTF.x = bgBg.width - nodeTF.width - 15;
			nodeTF.y = this.height/2 - nodeTF.height/2;
			this.addChild(nodeTF);
		}
		// let nameStr = LanguageManager.getlocal("wifestatusTitle" + data.id) + "(" + Api.wifestatusVoApi.getWifesNumByLevel(data.id) + "/" + data.maxNum+ ")"

		let numStr = LanguageManager.getlocal("wifestatusTitle" + data.id) + "(" + Api.wifestatusVoApi.getWifesNumByLevel(data.id) + "/" + data.maxNum + ")";
		if(data.id == "1"){
			numStr = LanguageManager.getlocal("wifestatusTitle" + data.id) + "(" + Api.wifestatusVoApi.getNoStatusWife().length + ")";
		}
		let nameTF = ComponentManager.getTextField(numStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nameTF.textColor = TextFieldConst.COLOR_BLACK;
		nameTF.x = this.width/2 - nameTF.width/2
		nameTF.y = this.height/2 - nameTF.height/2;
		this.addChild(nameTF);


		
		
	}


	public refreshData(index:number)
	{	
		
	}

	private getBtnClickHandler()
	{
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ACH_GETDETAILREWARD,{"achIndex":this._achIndex});
	}

	public getSpaceY():number
	{
		return 3;
	}

	public dispose():void
	{
		this._achIndex = null;;

		super.dispose();
	}
}