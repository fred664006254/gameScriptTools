
class AllianceMoreItem extends ScrollListItem {


	private uid:number =0;
	public constructor() {
		super();
	}

	protected initItem(index: number, data: any) 
    {
		
		let wordsBg:BaseBitmap = BaseBitmap.create("public_9v_bg11");  
		wordsBg.width = 640;
		wordsBg.height =124;
		wordsBg.x=0;
		wordsBg.y=0;
		this.addChild(wordsBg);
		wordsBg.visible  =false;

		let rankinglist_line:BaseBitmap = BaseBitmap.create("atkrace_xian_1"); 
		rankinglist_line.x =10;
		this.addChild(rankinglist_line); 
		rankinglist_line.y =130;   
		

		let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		rankTxt.text = String(index+1);
		rankTxt.x = 20;
		rankTxt.y = 15;
		rankTxt.width = 30;
		rankTxt.textAlign= TextFieldConst.ALIGH_CENTER;
		this.addChild(rankTxt);
			
		//名称  
		let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nameTxt.text = data[2];
		let dtype = data[0];
		if(PlatformManager.checkIsJPSp() && dtype != 2 && dtype != 8 && dtype != 13 && dtype != 14 && dtype != 15 ){
			nameTxt.text = data[2] + LanguageManager.getlocal("alliancelogdes_name_suffix_jp");
		}
		nameTxt.x = rankTxt.x+40;
		nameTxt.y = rankTxt.y;
		this.addChild(nameTxt);

		//时间  
		let timerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_ORANGE);
		timerTxt.text =App.DateUtil.getFormatBySecond(data[1], 2);
		timerTxt.x = nameTxt.x;
		timerTxt.y = 98;
		this.addChild(timerTxt);

		//描述
		let describeTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		describeTxt.width=560;
		describeTxt.x = nameTxt.x;
		describeTxt.y =50;
		describeTxt.lineSpacing =3;
		this.addChild(describeTxt);
		let str:string ="";
		str =LanguageManager.getlocal("alliancelogdes"+data[0]);

		str = Api.allianceVoApi.getStr(data);
		describeTxt.text =str;
	}

	public getSpaceY(): number {
		return 1;
	}
	public getSpaceX(): number {
		return 0;
	}
	public dispose(): void 
	{
		this.uid = 0;
		super.dispose();
	}
}