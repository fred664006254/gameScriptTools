
class WifeTalentPlusPopupScrollItem2 extends ScrollListItem
{
	public constructor() {
		super();
	}

	protected initItem(index:number,data:any)
    {
		this.width = 510;
        this.height = 40;
        let rankTxt:BaseTextField;

        if(index % 2 == 1){
            let bg = BaseBitmap.create("public_tc_bg05");
            // bg.x = 5;
            // bg.y = 10;
            bg.width = 510;
            bg.height = 40;
            bg.x = 0;
            // bg.y = 5;ß
            this.addChild(bg);

        }

        let fontSize = 22;
        if(PlatformManager.checkIsViSp()){
            fontSize = 18;
        }

        let wifeVo:WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(data.wid);
        rankTxt = ComponentManager.getTextField("",fontSize,TextFieldConst.COLOR_BROWN_NEW);
        rankTxt.text = wifeVo.name;
        rankTxt.x = 75 - rankTxt.width/2;
        rankTxt.y = this.height/2 - rankTxt.height/2;
        this.addChild(rankTxt);

        

        let nameTxt = ComponentManager.getTextField(data.artadd?data.artadd:0,fontSize,TextFieldConst.COLOR_BROWN_NEW);
		nameTxt.x = 230 - nameTxt.width/2
        nameTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(nameTxt);

        let caiqing:number = data.talentadd;

        let caiqingp:number = data.taddnum?data.taddnum:0;

		
        let cqStr = caiqingp > 0?caiqing+"<font color=0x2b8729>(+"+caiqingp+")</font>":caiqing+"";

		let scoreTxt = ComponentManager.getTextField(cqStr,fontSize,TextFieldConst.COLOR_BROWN_NEW);
		scoreTxt.x = 404 - scoreTxt.width/2
        scoreTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(scoreTxt);
		
        
        // if (data.isused) {
        //     rankTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
        //     nameTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
        //     scoreTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
        // }

        




	}

	public dispose():void
    {
        super.dispose();
    }
}