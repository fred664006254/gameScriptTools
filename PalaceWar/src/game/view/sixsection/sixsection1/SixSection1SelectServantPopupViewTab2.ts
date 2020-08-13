/**
* 门客buff
* date 2020.
* author ycg
* @name SixSection1SelectServantPopupViewTab2
*/
class SixSection1SelectServantPopupViewTab2 extends CommonViewTab{

    public constructor(data?:any) {
        super();
        this.param = data;
        this.initView();
    }

    public initView():void{
        this.width = 530;
        this.height = 400;
        let bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 360;
        bg.x = 26;
        bg.y = 0;
        this.addChild(bg);

        let buffList = Config.Sixsection1Cfg.buff;
        let scrollList = ComponentManager.getScrollList(SixSection1SelectServantScrollItem2, buffList, new egret.Rectangle(0, 0, 510, 350));
        scrollList.setPosition(bg.x + 10, bg.y + 5);
        this.addChild(scrollList);
    }

    public dispose():void{
        
        super.dispose();
    }
}