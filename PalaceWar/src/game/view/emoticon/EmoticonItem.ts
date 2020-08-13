/**
 * 表情包Item
 * author yangchengguo
 * date 2019.8.12
 * @class EmoticonView
 */
class EmoticonItem extends BaseDisplayObjectContainer{

    public _iconBg:BaseLoadBitmap = null;
    public _iconLock:BaseBitmap = null;
    public _selectBg:BaseBitmap = null;

    public constructor(){
        super();
    }

    public initItem(index:number, data:any):void{
        this.width = 110;
        this.height = 110;
        let selectBg = BaseBitmap.create("public_9_bg76");
        selectBg.width = this.width;
        selectBg.height = this.height;
        this.addChild(selectBg);
        this._selectBg = selectBg;
        selectBg.visible = false;

        let iconBg = BaseLoadBitmap.create("emoticonicon_"+ data.id);
        iconBg.width = this.width;
        iconBg.height = this.width;
        this.addChild(iconBg);
        this._iconBg = iconBg;

        if (data.status == 0){
            let iconLock = BaseBitmap.create("emoticon_lock");
            iconLock.setPosition(iconBg.x +  this._iconBg.width - iconLock.width, iconBg.y);
            this.addChild(iconLock);
            this._iconLock = iconLock;
        }
    }

    public refreshEmoticonItem(data):void{
        this._iconBg.setload("emoticonicon_" + data.id);
        if (data.status == 0){
            if (this._iconLock){
                this._iconLock.visible = true;
            }
            else{
                let iconLock = BaseBitmap.create("emoticon_lock");
                iconLock.setPosition(this._iconBg.x + this._iconBg.width - iconLock.width, this._iconBg.y);
                this.addChild(iconLock);
                this._iconLock = iconLock;
            }
        }
        else{
            if (this._iconLock){
                this._iconLock.visible = false;
            }
        }  
    }

    public setSelected(isSelect:boolean):void{
        this._selectBg.visible = isSelect;
    }

    public dispose():void{
        this._iconBg = null;
        this._iconLock = null;
        this._selectBg = null;
    }
}