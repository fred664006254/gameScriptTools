/**
 * 江湖名望详情item
 */
class NewAtkraceCrossFameDetailScrollItem extends ScrollListItem{

    public constructor() {
        super();
    }

    public initItem(index:number, data:any, param?:any){
        let bg = BaseBitmap.create("public_popupscrollitembg");
        this.addChild(bg);
        bg.height = 140;

        let title = ComponentManager.getTextField(LanguageManager.getlocal("newatkrackcross_fameTitleName"+(data.index+1)), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        title.setPosition(bg.x + bg.width/2 - title.width/2, bg.y + 25);
        this.addChild(title);

        let titleLine = BaseBitmap.create("public_line3");
        titleLine.width += title.width + 30;
        titleLine.setPosition(bg.x + bg.width/2 - titleLine.width/2, title.y + title.height/2 - titleLine.height/2);
        this.addChild(titleLine);

        let atkInfo = ComponentManager.getTextField(LanguageManager.getlocal("newatkrackcross_fameEffectAtk", [""+Math.floor(data.baseBuff*100)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN3);
        atkInfo.setPosition(bg.x + bg.width/2 - atkInfo.width/2, title.y + title.height + 15);
        this.addChild(atkInfo);

        let extraAtk = ComponentManager.getTextField(LanguageManager.getlocal("newatkrackcross_fameEffectExtraAtk", [""+Math.floor(data.addBuff*100)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN3);
        extraAtk.setPosition(bg.x + bg.width/2 - extraAtk.width/2, atkInfo.y + atkInfo.height + 15);
        this.addChild(extraAtk);

    }

    public dipose():void{

        super.dispose();
    }
}