/**
 * 帮会充值列表节点
 * author jiangliuyang
 * date 2019/2/12
 * @class AcAllianceRechargeRankScrollItem
 */
class AcAllianceRechargeRankScrollItem  extends ScrollListItem
{
    public constructor()
    {
        super();
     
    }

    protected initItem(index:number,data:any)
    {
        // let wordsBg:BaseBitmap = BaseBitmap.create("public_9v_bg11");  
		// wordsBg.width = 640;
		// wordsBg.height =50;
		// wordsBg.x=0;
		// wordsBg.y=0;
		// this.addChild(wordsBg);
		// wordsBg.visible  =false;

        let tarColor = TextFieldConst.COLOR_LIGHT_YELLOW
        // if(data.uid){
        //     if( data.uid == Api.playerVoApi.getPlayerID())
        //     {
        //         tarColor = TextFieldConst.COLOR_WARN_YELLOW;
        //     }
        // }else{
        //     if( data.id == Api.playerVoApi.getPlayerAllianceId())
        //     {
        //         tarColor = TextFieldConst.COLOR_WARN_YELLOW;
        //     }
        // }

        let startY = 16;
 
        let titleTxt1 = ComponentManager.getTextField("",20,tarColor)
        titleTxt1.text = String(index+1) +"."+ data[0] +"";
        titleTxt1.x = 100;
        titleTxt1.y = startY;
        this.addChild(titleTxt1);
   
    
        // let titleTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        // if(data[0])
        // {
        //     titleTxt2.text =data[0]+""; 
        //     titleTxt2.x = 245 - titleTxt2.width/2 + 30;
        // }
  
        
        // titleTxt2.y = startY;
        // this.addChild(titleTxt2);

        let titleTxt3 = ComponentManager.getTextField("",titleTxt1.size,tarColor);
        titleTxt3.text = LanguageManager.getlocal("allianceMemberPo"+data[1]);
        titleTxt3.x = 460- titleTxt3.width/2;
        titleTxt3.y = startY;
        this.addChild(titleTxt3);

        this.height = 50;


    }



    public getSpaceX():number
	{
		return 0;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 0;
	}
    public dispose():void
    {
        super.dispose();
    }
}