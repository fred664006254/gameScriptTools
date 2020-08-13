/**
 * 门客出海舰队buff 选择门客
 * author shaolaing
 * date 2020/5/21
 * @class ServantExileServantBuffView
 */

class ServantExileServantBuffView  extends PopupView
{   
    private _list:ScrollList = null;
    private _addBtn:BaseLoadBitmap = null;
    private _servantIcon:BaseLoadBitmap = null;
    private _posId:number = null;
    /**
	 * "3":{
			"servantId":"1007",
			"st":1595815367,
			"freeEndTime":1595901767,
			"et":1604455367,
			"buffSid":"1001"
		}
	*/
    private _seatInfo:any = null;

    public constructor() {
		super();
	}

    protected getTitleStr():string
	{
		return "exileBuff_choose_title";
	}

     protected getResourceList():string[]
	{
		let resArr:string[]=["exile_buff_choose_top","public_popupscrollitembg"];
		
		return super.getResourceList().concat(resArr);
	}

    protected getBgExtraHeight():number
	{
		return 20;
	}

    private getBuffSid():string
    {
        let sid = "";
        if (this._seatInfo && this._seatInfo.servantId)
        {
            sid = this._seatInfo.servantId;
        }
        return sid;
    }

    public initView():void
    {
        this._posId = this.param.data.pos;
        this._seatInfo = Api.servantExileVoApi.getServantExileInfoForKey(String(this._posId));

        let toppic = BaseBitmap.create("exile_buff_choose_top");
        toppic.setPosition(this.viewBg.width/2-toppic.width/2,10);
        this.addChildToContainer(toppic);
        

        let itembg = BaseLoadBitmap.create("itembg_0");
        itembg.width = 110;
        itembg.height = 110;
        itembg.setPosition(this.viewBg.width/2-itembg.width/2,toppic.y+1);
        this.addChildToContainer(itembg);
        itembg.addTouchTap(this.addTouchHandle,this);

        let add = BaseLoadBitmap.create("childview_addicon");
        add.width = 64;
        add.height = 64;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, add, itembg);
        this.addChildToContainer(add);
        this._addBtn = add;

        let sicon = BaseLoadBitmap.create("childview_addicon");
        sicon.width = 105;
        sicon.height = 105;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, sicon, itembg);
        this.addChildToContainer(sicon);
        this._servantIcon = sicon;

        this.resetIcon();

        let desc = ComponentManager.getTextField(LanguageManager.getlocal(`exileBuff_choose_desc`),22,TextFieldConst.COLOR_LIGHT_YELLOW);
		desc.lineSpacing = 6;
        desc.setPosition(this.viewBg.width/2-desc.width/2,toppic.y+135);
        this.addChildToContainer(desc);

        let itemBg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		itemBg.width = 530;
		
        itemBg.setPosition(this.viewBg.width/2-itemBg.width/2,toppic.y+toppic.height+8);
		this.addChildToContainer(itemBg);

        let stringArray = Api.servantVoApi.getOneExileBuffStrings(this.getBuffSid());
        let h = stringArray.length * 132 + 16;
        if (h>490)
        {
            h = 490;
        }
        itemBg.height = h;

        let rect = egret.Rectangle.create();
        rect.setTo(0,0,510,itemBg.height-16);
        let list = ComponentManager.getScrollList(ServantExileServantBuffItem, stringArray, rect);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, list, itemBg);
        this.addChildToContainer(list);
        this._list = list;
    }


    private addTouchHandle():void
    {
        ViewController.getInstance().openView(ViewConst.POPUP.SERVANTEXILEBUFFCHOOSEVIEW,{pos:this._posId, f:this.chooseCallback,o:this});
    }

    private chooseCallback(sid:string):void
    {
        this.request(NetRequestConst.REQUEST_SERVANT_BANISHBUFF,{servantId:sid,pos:this._posId});
    }

    protected receiveData(data:{ret:boolean,data:any}):void
	{	
        if (data.ret)
        {
             this._seatInfo = Api.servantExileVoApi.getServantExileInfoForKey(String(this._posId));
             this.resetIcon();

            let stringArray = Api.servantVoApi.getOneExileBuffStrings(this.getBuffSid());
            this._list.refreshData(stringArray);
        }
	}
    
    private resetIcon():void
    {
        if (this._seatInfo && this._seatInfo.buffSid)
        {
            this._addBtn.visible = false;
            this._servantIcon.visible = true;
            let servantcfg = Api.servantVoApi.getServantObj(this._seatInfo.buffSid);
            this._servantIcon.setload(servantcfg.halfImgPath);
        }
        else
        {
            this._addBtn.visible = true;
            this._servantIcon.visible = false;
        }
    }

    public dispose():void
	{   
        this._list = null;
        this._addBtn = null;
        this._servantIcon = null;
        this._posId = null;
        this._seatInfo = null;

		super.dispose();
	}
}