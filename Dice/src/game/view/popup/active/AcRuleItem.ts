class AcRuleItem extends ScrollListItem {

// need dispose var start
// need dispose end
    constructor(){
        super()
     }
    protected initItem(index:number,data:any,itemParam?:any):void {
        let idx = data.index;
        let key = data.acKey;
        let bg = BaseBitmap.create("public_info_item_bg");
        this.addChild(bg); 
        
        let icon = BaseLoadBitmap.create(`${key}_icon${idx}`);
        this.addChild(icon);
        icon.setPosition(24, 47);

        let title = ComponentMgr.getTextField('11', TextFieldConst.SIZE_24, ColorEnums.white);
        this.addChild(title);
        title.strokeColor = 0x7B2A0E;
        title.text = LangMger.getlocal(`${key}tip_title${idx}`);
        title.setPosition(153, 25); 

        let desstr = ``;
        if(idx == 2){
            let tem =`${Config.FairarenaCfg.getDiceCrip()}00%`;
            desstr = LangMger.getlocal(`${key}tip_des${idx}`,[tem]);
        } else {
            desstr = LangMger.getlocal(`${key}tip_des${idx}`);
        }

        let des = ComponentMgr.getTextField('11', TextFieldConst.SIZE_20, ColorEnums.white);
        this.addChild(des);
        des.strokeColor = 0;
        des.lineSpacing = 3;
        des.text = desstr;
        des.width = 335;
        des.x = title.x;
        des.y = title.y + title.height + 28;
    }

    /**
     * 不同格子X间距
     */
     public getSpaceX():number
    {
        return super.getSpaceX();
    }
    /**
     * 不同格子Y间距
     */
    public getSpaceY():number
    {
        return super.getSpaceY();
    }

    public dispose():void
    {
// dispose start
// dispose end
        super.dispose();
    }
}