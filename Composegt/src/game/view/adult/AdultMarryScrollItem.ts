/**
 *招亲的子嗣列表
 * author dky
 * date 2017/10/30
 * @class AdultMarryScrollItem
 */
class AdultMarryScrollItem extends ScrollListItem
{

	private _childInfo:{total:number,fatherName:string,et:number,id:number,aquality:number,st:number,name:string,uid:number,sex:number};
	
	public constructor() 
	{
		super();
	}

	public initItem(index:number,childInfo:{total:number,fatherName:string,et:number,id:number,aquality:number,st:number,name:string,uid:number,sex:number}):void
	{
		this.width = 618;
		this.height = 192 ;
		
		// childInfo.total
		this._childInfo = childInfo;
		
		let bg:BaseBitmap = BaseBitmap.create("public_listbg");
		bg.width = this.width;
		bg.height = this.height;
		bg.x = 5;
		// nameBg.x = 25;
		// nameBg.y = 40;
		this.addChild(bg);


		let childbg:BaseBitmap = BaseBitmap.create("adult_middlebg");
		this.addChild(childbg);
		childbg.x = bg.x + 6;
		childbg.y = bg.y + bg.height/2 - childbg.height/2-4;
		// let bg2:BaseBitmap = BaseBitmap.create("public_9_managebg");
		// bg2.width = 370;
		// bg2.height = 100;
		// bg2.x = childbg.x + childbg.width + 10;
		// bg2.y = childbg.y + 10;
		// this.addChild(bg2);
		let iconStr = "adult_boy";
		if(childInfo.sex == 2){
			iconStr = "adult_girl";
		}	
		let icon:BaseBitmap = BaseBitmap.create(iconStr);
		icon.x = bg.x + 40;
		icon.y = 15;
		icon.setScale(0.42)
		this.addChild(icon);

		let qualityBg:BaseBitmap = BaseBitmap.create("adult_namebg");
		if(PlatformManager.checkIsTextHorizontal()){

				// nameTxt.x = nameBg.x + nameBg.height / 2 - nameTxt.width/2;
				// nameTxt.y = nameBg.y + nameBg.width/2 - nameTxt.height/ 2 - nameBg.width;
			qualityBg.rotation = -90;
			qualityBg.setScale(0.7);
			qualityBg.x = childbg.x + childbg.width / 2 - qualityBg.height * qualityBg.scaleY/2;
			qualityBg.y = childbg.y + 170;
		} else {
			qualityBg.x = childbg.x + 10;
			qualityBg.y = childbg.y + 10;
			qualityBg.setScale(0.7);
		}

		this.addChild(qualityBg);
		

		let qualityBB:BaseBitmap = BaseBitmap.create("adult_q" + childInfo.aquality);
		if(PlatformManager.checkIsTextHorizontal()){
			qualityBB.setScale(0.7);
			qualityBB.x = qualityBg.x + qualityBg.height * qualityBg.scaleY/ 2 - qualityBB.width * qualityBB.scaleX/2;
			qualityBB.y = qualityBg.y + qualityBg.width * qualityBg.scaleX/2 - qualityBB.height * qualityBB.scaleY/ 2 - qualityBg.width * qualityBB.scaleX;
			
		} else {
			qualityBB.x = childbg.x + 10;
			qualityBB.y = childbg.y + 15;
			qualityBB.setScale(0.7);
		}

		this.addChild(qualityBB);



		let nameTF = ComponentManager.getTextField(childInfo.name,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		nameTF.x = childbg.x + childbg.width+ 15;
		nameTF.y = childbg.y + 7;
		this.addChild(nameTF);

		let fatherStr = LanguageManager.getlocal("adultMarryFather") + childInfo.fatherName;
		let fatherTF = ComponentManager.getTextField(fatherStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		fatherTF.x = nameTF.x;
		fatherTF.y = nameTF.y + nameTF.height + 10;
		this.addChild(fatherTF);

		let attrStr = LanguageManager.getlocal("servant_infoAttr") + childInfo.total;
		let attrTF = ComponentManager.getTextField(attrStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		attrTF.x = nameTF.x;
		attrTF.y = fatherTF.y + nameTF.height + 10;
		this.addChild(attrTF);

		//联姻
		let marrmyBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE,"adultMarry",this.marryBtnClick,this);
		marrmyBtn.x = 410;
		marrmyBtn.y = childbg.y + childbg.height -70;
		// marrmyBtn.
		this.addChild(marrmyBtn);
		// marrmyBtn.setColor(TextFieldConst.COLOR_BLACK);
		
	}

    private marryBtnClick()
    {
		// let data:any = {};
		// data.id = this._childInfo.uid;
		// data.childId = this._childInfo.id;
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_CLICKMARRY,{"id":this._childInfo.id,"childId":this._childInfo.id});
    }

	public getSpaceY():number
	{
		return 10;
	}

	public dispose():void
	{
		this._childInfo = null;
		super.dispose();
	}
}