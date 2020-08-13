/**
 * 门客信息 消耗道具升级部分
 * author yanyuling
 * date 2017/11/20
 * @class ServantInfoItemsScrollItem
 */

class ServantEquipCostItem extends ScrollListItem
{
    private _curNum:number=0;
    private _subTme=-1;
    private _subBtn:BaseButton;
    private _itemId:string;
    private _numTxt:BaseTextField;
    private _equipParams:{sid:string,eid:number,equipParams:{[key:string]:number}}=null;

    private _addTime=-1;
	public constructor() 
	{
		super();
	}

	protected initItem(index:number,data:any,param:any)
    {
        let view = this;
        this._equipParams=param;

        let itemid = data.item;
        this._itemId=itemid;
        // let quality = param;

        let selectNum=Api.servantVoApi.getEquipItemSelectNum(itemid);

        let itemVo =GameData.getRewardItemVoByIdAndType(ItemEnums.item,itemid);
        let itemIcon=GameData.getItemIcon(itemVo,false,false);
        itemIcon.y=2;
        itemIcon.setScale(82/itemIcon.width);

        view.addChild(itemIcon);

        let total = Api.itemVoApi.getItemNumInfoVoById(itemid);
        this._curNum = selectNum;
        let numTxt = ComponentManager.getTextField(this._curNum?`${this._curNum}/${total}`:total+"", 16);
        this._numTxt=numTxt;
        numTxt.width=itemIcon.width*itemIcon.scaleX;
        numTxt.textAlign=egret.HorizontalAlign.RIGHT;
        numTxt.verticalAlign=egret.VerticalAlign.BOTTOM;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, numTxt, itemIcon, [2,2]);
        view.addChild(numTxt);
        // numTxt.visible = quality != -1;

        let subbtn = ComponentManager.getButton(`servantequip_sub`, ``,null,null);
        subbtn.addTouch((e:egret.TouchEvent)=>{
            switch(e.type)
            {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this.clearSubTime();
                    this.subBtnHandler();
                    this.checkSubTime();
                    break;
                case egret.TouchEvent.TOUCH_CANCEL:
                case egret.TouchEvent.TOUCH_END:
                    this.clearSubTime();
                    break;
                default:
            }
        },this,null,true);
        this._subBtn=subbtn;
        view.addChild(subbtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, subbtn, itemIcon, [-4,-2]);
        subbtn.visible = this._curNum>0;
        // console.log(subbtn.visible);

        itemIcon.addTouch((e:egret.TouchEvent)=>{
            switch(e.type)
            {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this.clearAddTIme();
                    this.addHandler();
                    this.checkAddTime();
                    break;
                case egret.TouchEvent.TOUCH_CANCEL:
                case egret.TouchEvent.TOUCH_END:
                    this.clearAddTIme();
                    break;
                default:
            }
        }, view,null,true);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SELECTALL_EQUIPITEM,this.refreshText,this);
    }

    private refreshText(e:egret.Event):void
    {
        let itemId=e.data;
        if(itemId==this._itemId)
        {
            this._curNum=Api.servantVoApi.getEquipItemSelectNum(this._itemId);
            let total = Api.itemVoApi.getItemNumInfoVoById(this._itemId);
            this._numTxt.text = this._curNum?`${this._curNum}/${total}`:total+"";
        }
    }

    private clearSubTime():void
    {
        if(this._subTme!=-1)
        {
            egret.clearInterval(this._subTme);
            this._subTme=-1;
        }
    }

    private subBtnHandler():void
    {
        let total = Api.itemVoApi.getItemNumInfoVoById(this._itemId);
        let addType=-1;
        let equipParams=this._equipParams;
        let {num,result} = Api.servantVoApi.checkAddEquipExp(equipParams.sid,equipParams.eid,this._itemId,addType);
        this._curNum = num;
        if(this._curNum == 0){
            this._subBtn.visible = false;
            this.clearSubTime();
            // numTxt.visible = false;
        }
        this._numTxt.text = this._curNum?`${this._curNum}/${total}`:total+""
        App.MessageHelper.dispatchEvent(MessageConst.EQUIP_REVOLUTION_CHOOSE,{
            id : this._itemId,
            num : this._curNum,
            add:addType
        })
    }

    private checkSubTime():void
    {
        if(this._subTme==-1)
        {
            this._subTme=egret.setInterval(this.subBtnHandler,this,100);
        }
    }

    private clearAddTIme():void
    {
        if(this._addTime!=-1)
        {
            egret.clearInterval(this._addTime);
            this._addTime=-1;
        }
    }

    private addHandler():void
    {
        let total = Api.itemVoApi.getItemNumInfoVoById(this._itemId);
        let addType=1;
        let equipParams=this._equipParams;
        let {num,result} = Api.servantVoApi.checkAddEquipExp(equipParams.sid,equipParams.eid,this._itemId,addType);
        if(result)
        {
            this._curNum = num;
            this._numTxt.text = this._curNum?`${this._curNum}/${total}`:total+""
            if(!this._subBtn.visible){
                this._subBtn.visible = true;
            }
            let itemExp = Config.ServantequiplCfg.getCostEquipAddExp(this._itemId);
            if(itemExp)
            {
                App.CommonUtil.playRewardFlyAction([{tipMessage:LanguageManager.getlocal("gameExp")+"+"+itemExp}]);
            }
            App.MessageHelper.dispatchEvent(MessageConst.EQUIP_REVOLUTION_CHOOSE,{
                id : this._itemId,
                num : this._curNum,
                add:addType
            })
        }
    }

    private checkAddTime():void
    {
        if(this._addTime==-1)
        {
            this._addTime=egret.setInterval(this.addHandler,this,100);
        }
    }

    /**
	 * 不同格子X间距
	 */
	public getSpaceX():number
	{
		return 5;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 10;
	}

    public dispose():void
    {
        this.clearSubTime();
        this.clearAddTIme();
        this._curNum=0;
        this._subBtn=null;
        this._itemId=null;
        this._numTxt=null;
        this._equipParams=null;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM),this.useBtnHandlerCallBaclk,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SELECTALL_EQUIPITEM,this.refreshText,this);
        super.dispose()
    }
}