/**
 *选孩子结婚
 * author dky
 * date 2017/11/1
 * @class AdultChooseChildScrollItem
 */
class AdultChooseChildScrollItem extends ScrollListItem
{
	// 亲密度文本
	private _intimacyTF:BaseTextField;
	private _childInfo:any;
	
	public constructor() 
	{
		super();
	}

	public initItem(index:number,childInfo:any):void
	{
		this.width = 618;
		this.height = 185 + this.getSpaceY();
		
		this._childInfo = childInfo;

		let bg:BaseBitmap = BaseBitmap.create("public_listbg");
		bg.width = this.width;
		bg.height = 185;
		bg.x = 5;
		this.addChild(bg);


		let childbg:BaseBitmap = BaseBitmap.create("adult_middlebg");
		this.addChild(childbg);
		childbg.x = bg.x + 6;
		childbg.y = bg.y + bg.height/2 - childbg.height/2-4;
		let iconStr = "adult_boy";
		if(childInfo.sex == 2){
			iconStr = "adult_girl";
		}	

		

		let icon:BaseBitmap = BaseBitmap.create(iconStr);
		icon.x = bg.x + 40;
		icon.y = 13;
		icon.setScale(0.42)
		this.addChild(icon);

		let qualityBg:BaseBitmap = BaseBitmap.create("adult_namebg");
		qualityBg.x = childbg.x + 10;
		qualityBg.y = childbg.y + 10;
		qualityBg.setScale(0.7);
		this.addChild(qualityBg);

		let qualityBB:BaseLoadBitmap = BaseLoadBitmap.create("adult_q" + childInfo.aquality);
		qualityBB.x = childbg.x + 10;
		qualityBB.y = childbg.y + 15;
		qualityBB.setScale(0.7);
		this.addChild(qualityBB);

		if(PlatformManager.checkIsTextHorizontal()){
			qualityBg.rotation = -90;
			qualityBg.x = childbg.x + 40;
			qualityBg.y = childbg.y + childbg.height - 10;
			qualityBB.width = 156;
			qualityBB.height = 46 ;
			qualityBB.x =  qualityBg.x;
			qualityBB.y =  qualityBg.y - 32;
		}
		
		let nameTF = ComponentManager.getTextField(childInfo.name,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		nameTF.x = childbg.x + childbg.width + 10;
		nameTF.y = childbg.y + 7;
		this.addChild(nameTF);

		let fatherStr = LanguageManager.getlocal("adultMarryFather") + Api.playerVoApi.getPlayerName();
		let fatherTF = ComponentManager.getTextField(fatherStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		fatherTF.x = nameTF.x;
		fatherTF.y = nameTF.y + 30;
		this.addChild(fatherTF);

		let attrStr = LanguageManager.getlocal("servant_infoAttr") + childInfo.attrVo.attTotal;
		let attrTF = ComponentManager.getTextField(attrStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		attrTF.x = nameTF.x;
		attrTF.y = fatherTF.y + 30;
		this.addChild(attrTF);

		//新增亲家
		if(Api.adultVoApi.judgeIsSudan(childInfo.info.uid)){
			//属性加成
			let visitlevel = 0;//Api.adultVoApi.getVisitLevel(childInfo.info);
			// let info = Api.adultVoApi.getAdultInfoVoById(bData.childid);
			let str = '';//Api.adultVoApi.getVisitLevel(childInfo);
			let baifang = false;
			let laifang = false;
			let hufang = false;
			if(childInfo.visit == childInfo.info.uid){
				baifang = true;
			}
			if(childInfo.info.visit == Api.playerVoApi.getPlayerID()){
				laifang = true;
			}
			hufang = baifang && laifang;
			if(hufang){
				visitlevel = 3;
			}else if(baifang){
				visitlevel = 1;
			}else if(laifang){
				visitlevel = 2;
			}
			if(visitlevel){
				let arrtnum = Config.SadunCfg[`addExtent${visitlevel == 3 ? 2 : 1}`] * 100;
				let attradd = ComponentManager.getTextField(LanguageManager.getlocal(`adultVisitLevel${visitlevel}`,[arrtnum.toString()]), 20, 0x3e9b00);
				this.setLayoutPosition(LayoutConst.lefttop, attradd, attrTF, [attrTF.textWidth + 10,0]);
				this.addChild(attradd);
			}
		}
		else{
			let lynumTxt = ComponentManager.getTextField(LanguageManager.getlocal('adultLyinNums',[Api.adultVoApi.getLyinnum(childInfo.uid).toString()]), 20, TextFieldConst.COLOR_BLACK);
			lynumTxt.x = fatherTF.x + 240;
			lynumTxt.y = fatherTF.y ;
			this.addChild(lynumTxt);
		}
		
		let chooseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"adultMarryViewTitle",this.chooseBtnClick,this);
		this.setLayoutPosition(LayoutConst.rightbottom, chooseBtn, this, [30,30]);
		this.addChild(chooseBtn);
		
	}


	private chooseBtnClick()
    {
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_CHILDMARRY,{"childId":this._childInfo.id});
    }

	public getSpaceY():number
	{
		return 10;
	}
	public getSpaceX():number
	{
		return 10;
	}

	public dispose():void
	{
		this._intimacyTF = null;
		this._childInfo = null;
		super.dispose();
	}
}