
class AcSeaWomanPopViewTab2 extends CommonViewTab{

    public constructor(data?:any){
        super();
        this.param = data;
        this.initView();
    }

    public initView():void{
        
        this.height = 670;
        this.width = 520;
        let Bg = BaseBitmap.create("public_9_bg4");
		Bg.width = 530;
		Bg.height = 695;
		Bg.setPosition(26, 53);
        this.addChild(Bg);
        
        let rect = new egret.Rectangle(0, 0, 530, 675);
        let scrollList = ComponentManager.getScrollList(AcSeaWomanScrollItem2, this.cfg.getPlayAwards(), rect, { aid: this.aid, code: this.code,uicode:this.param.data.uicode });
        scrollList.setPosition(Bg.x+10, Bg.y+10);
        this.addChild(scrollList);
    }

    private get cfg():Config.AcCfg.SeaWomanCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
        
    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    public dispose():void{
        super.dispose();
    }
}