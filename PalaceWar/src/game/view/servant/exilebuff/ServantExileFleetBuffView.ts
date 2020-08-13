/**
 * 门客出海舰队buff
 * author shaolaing
 * date 2020/5/21
 * @class ServantExileFleetBuffView
 */

class ServantExileFleetBuffView  extends PopupView
{
    public constructor() {
		super();
	}

    protected getBgName():string
    {
         return "exile_fleet_buff_bg";   
    }

    protected getResourceList():string[]
	{
		let resArr:string[]=["exile_fleet_buff_title",]
		
		return super.getResourceList().concat(resArr);
	}

    protected getTitleStr():string
	{
        return null;
    } 

    public initView():void
    {   
        this.viewBg.width = 634;

        let titlepic = BaseBitmap.create("exile_fleet_buff_title");
        titlepic.setPosition(this.viewBg.width/2-titlepic.width/2,6);
        this.addChildToContainer(titlepic);

        let desc = ComponentManager.getTextField(LanguageManager.getlocal(`exileBuff_fleet_desc`),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		desc.lineSpacing = 4;
        desc.width = 560;
        desc.textAlign = egret.HorizontalAlign.CENTER;
        desc.setPosition(this.viewBg.width/2-desc.width/2,254);
        this.addChildToContainer(desc);

        // let num = Api.servantVoApi.getServantCountExiled();
        // let count = ComponentManager.getTextField(LanguageManager.getlocal(`exileBuff_fleet_count`,[String(num)]),22,TextFieldConst.COLOR_BLACK);
        // count.setPosition(this.viewBg.width/2-count.width/2,356);
        // this.addChildToContainer(count);

        let buffStrings = Api.servantVoApi.getExileBuffStrings();
        let posy = 360;
        for (let i=0; i<buffStrings.length; i++)
        {
             let onebuff = ComponentManager.getTextField(buffStrings[i],20,TextFieldConst.COLOR_BLACK);
             onebuff.width = 470;
             onebuff.lineSpacing = 5;
             onebuff.textAlign = egret.HorizontalAlign.CENTER;
             onebuff.setPosition(this.viewBg.width/2-onebuff.width/2,posy);
             this.addChildToContainer(onebuff); 

             posy+=onebuff.height+7;
        }

        let addDetailBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "exileBuff_effect_btnstr", ()=>{
            ViewController.getInstance().openView(ViewConst.POPUP.SERVANTEXILEBUFFLISTVIEW,{
            });
        }, this);
		this.addChildToContainer(addDetailBtn);
		addDetailBtn.setPosition(this.viewBg.width/2-addDetailBtn.width/2,posy+2);

        this.viewBg.height = posy+130;
    }

    public dispose():void
	{
		super.dispose();
	}
}