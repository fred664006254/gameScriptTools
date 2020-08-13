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
		this.width = 522;
		this.height = 84 + this.getSpaceY();

		// let parent = <AchievementDetailPopupView>this.par
		let id = data.id;

		let wifestatusVo = Api.wifestatusVoApi.getWifestatusVo();
		let wifeVo = Api.wifeVoApi.getWifeInfoVoById(WifestatusPopupView.wifeId);


		

		let bgStr = "wifestatus_itembg_an2";
		let islock = false;
		let showStr = "";

		//属性不足不足为解锁
		if(wifeVo.intimacy < data.needIntimacy ||wifeVo.glamour < data.needGlamour)
		{
			bgStr = "wifestatus_itembg_an1";
			islock = true;
			showStr = LanguageManager.getlocal("wifeStatusCannotIn");
		}
		//未解锁
		if(Number(id) > Number(wifestatusVo.level) && id!="2")
		{
			bgStr = "wifestatus_itembg_an1";
			islock = true;
			showStr = LanguageManager.getlocal("wifeStatusLocked");
		}
		//不可选
		if(data.id == "1")
		{
			bgStr = "wifestatus_itembg_an1";
			islock = true;
			showStr = LanguageManager.getlocal("wifeStatusCannotSelect");
		}

		//当前
		if(WifestatusPopupView.wifeLevel == data.id)
		{
			bgStr = "wifestatus_itembg_an3";
			islock = true;
			showStr = LanguageManager.getlocal("wifeStatusCurrent");
		}

		let bgBg:BaseBitmap = BaseBitmap.create(bgStr);
		bgBg.width = this.width;
		bgBg.height = 84;
		this.addChild(bgBg);
		
		
		// if(islock)
		// {
		// 	let lockIcon:BaseBitmap = BaseBitmap.create("wifestatus_lock");
		// 	lockIcon.x = 45;
		// 	lockIcon.y = this.height/2 - lockIcon.height/2;
		// 	this.addChild(lockIcon);
		// }


		// //当前位份
		// if(WifestatusPopupView.wifeLevel == data.id)
		// {

		// 	let nodeTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeStatusCurStatus"),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		// 	nodeTF.textColor = TextFieldConst.COLOR_BROWN;
		// 	nodeTF.x = bgBg.width - nodeTF.width - 15;
		// 	nodeTF.y = this.height/2 - nodeTF.height/2;
		// 	this.addChild(nodeTF);
		// }
		// let nameStr = LanguageManager.getlocal("wifestatusTitle" + data.id) + "(" + Api.wifestatusVoApi.getWifesNumByLevel(data.id) + "/" + data.maxNum+ ")"

/*
		if(showStr != ""){
			let nodeTF = ComponentManager.getTextField(showStr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
			nodeTF.textColor = TextFieldConst.COLOR_BROWN;
			nodeTF.x = bgBg.width - nodeTF.width - 35;
			nodeTF.y = this.height/2 - nodeTF.height/2;
			this.addChild(nodeTF);
		}

		let numStr = LanguageManager.getlocal("wifestatusTitle" + data.id) + "(" + Api.wifestatusVoApi.getWifesNumByLevel(data.id) + "/" + data.maxNum + ")";
		if(data.id == "1"){
			numStr = LanguageManager.getlocal("wifestatusTitle" + data.id) + "(" + Api.wifestatusVoApi.getNoStatusWife().length + ")";
			// App.DisplayUtil.changeToGray(bgBg);
		}
		let nameTF = ComponentManager.getTextField(numStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nameTF.textColor = TextFieldConst.COLOR_BROWN;
		nameTF.x = this.width/2 - nameTF.width/2
		nameTF.y = this.height/2 - nameTF.height/2;
		this.addChild(nameTF);

*/
		
		let str1 = LanguageManager.getlocal("wifestatusTitle" + data.id);
		if(showStr != ""){
			str1 += "(" + showStr + ")";
		}
		let str2 = "(" + Api.wifestatusVoApi.getWifesNumByLevel(data.id) + "/" + data.maxNum + ")";
		if(data.id == "1"){
			str2 = "(" + Api.wifestatusVoApi.getNoStatusWife().length + ")";
		}
		let color = TextFieldConst.COLOR_BROWN_NEW;
		if(WifestatusPopupView.wifeLevel == data.id){
			color = TextFieldConst.COLOR_WARN_YELLOW_NEW;
		}

		let strTF1 = ComponentManager.getTextField(str1,TextFieldConst.FONTSIZE_CONTENT_COMMON,color);
		let strTF2 = ComponentManager.getTextField(str2,TextFieldConst.FONTSIZE_CONTENT_COMMON,color);

		strTF1.x = this.width/2 - strTF1.width/2;
		strTF1.y = this.y + 18;

		if(WifestatusPopupView.wifeLevel == data.id){
			let mark = BaseBitmap.create("wifestatus_curmark");
			mark.x = strTF1.x + strTF1.width;
			mark.y = strTF1.y - 7;// + strTF1.height / 2 - mark.height/2;
			this.addChild(mark);
		}

		strTF2.x = this.width/2 - strTF2.width/2;
		strTF2.y = strTF1.y + strTF1.height + 6;

		this.addChild(strTF1);
		this.addChild(strTF2);
		
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
		return -3;
	}

	public dispose():void
	{
		this._achIndex = null;;

		super.dispose();
	}
}