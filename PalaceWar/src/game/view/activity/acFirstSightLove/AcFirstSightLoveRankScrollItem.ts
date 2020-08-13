/**
 * 报名item
 * author ycg
 * date 2019.10.18
 * @class AcFirstSightLoveRankScrollItem
 */
class AcFirstSightLoveRankScrollItem extends ScrollListItem{
    public constructor(){
        super();
    }

    public initItem(index:number, data:any, itemParam: any):void{
        this.width = 550;
        this.height = 65; //65
        let stIndex = itemParam.stIndex;
        if (!stIndex || stIndex <=0){
            stIndex = 0;
        }
        let num = ComponentManager.getTextField(""+(stIndex+index+1), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        num.anchorOffsetX = num.width/2;
        num.setPosition(60, this.height/2 - num.height/2);
        this.addChild(num);

        let name = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        name.anchorOffsetX = name.width/2;
        name.setPosition(190, this.height/2 - name.height/2);
        this.addChild(name);

        let level = ComponentManager.getTextField(LanguageManager.getlocal("officialTitle"+ data.level), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        level.anchorOffsetX = level.width/2;
        level.setPosition(this.width/2 + 70, this.height/2 - level.height/2);
        this.addChild(level);

        let zoneTxt = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveJoinListServerNum", [data.zid]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN)
        // let sidname = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, data.zid);
        // zoneTxt.text = LanguageManager.getlocal("acFirstSightLoveJoinListServerNum", [sidname]);
        zoneTxt.anchorOffsetX = zoneTxt.width/2;
        zoneTxt.x = this.width - 85;
        zoneTxt.y = this.height/2 - zoneTxt.height/2 ;
        this.addChild(zoneTxt);

        let lineImg = BaseBitmap.create("public_line1");
        lineImg.x = this.width/2 - lineImg.width/2;
        lineImg.y = this.height - lineImg.height;
        this.addChild(lineImg);

        if (data.uid == Api.playerVoApi.getPlayerID()){
            num.setColor(TextFieldConst.COLOR_WARN_YELLOW);
            name.setColor(TextFieldConst.COLOR_WARN_YELLOW);
            zoneTxt.setColor(TextFieldConst.COLOR_WARN_YELLOW);
            level.setColor(TextFieldConst.COLOR_WARN_YELLOW);
        }
    }

    public dispose():void{
        super.dispose();
    }
}