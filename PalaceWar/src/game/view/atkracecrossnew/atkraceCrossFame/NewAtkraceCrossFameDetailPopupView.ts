/**
 * 江湖名望 席位效果
 * date 2020.7.9
 * author ycg
 */
class NewAtkraceCrossFameDetailPopupView extends PopupView{

    public constructor(){
        super();
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get vo():AcNewCrossServerAtkRaceVo{
        return <AcNewCrossServerAtkRaceVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    public initView():void{
        let bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 660;
        bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
        bg.y = 10;
        this.addChildToContainer(bg);

        let data = this.vo.cfg.getFameSeatList();
        let scrollList = ComponentManager.getScrollList(NewAtkraceCrossFameDetailScrollItem, data, new egret.Rectangle(0, 0 , bg.width-20, bg.height - 10));
        scrollList.setPosition(bg.x + 10, bg.y + 5);
        this.addChildToContainer(scrollList);
    }

    protected getTitleStr():string{
        return "newatkrackcross_fameEffectPopupTitle";
    }

    public getResourceList():string[]{
        return super.getResourceList().concat([
            "public_popupscrollitembg", "public_line3"
        ]);
    }

    public getShowHeight():number{
        return 760;
    }

    public dispose():void{

        super.dispose();
    }
}