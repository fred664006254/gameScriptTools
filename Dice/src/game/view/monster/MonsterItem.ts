class MonsterItem extends ScrollListItem {

// need dispose var start
// need dispose end
    constructor(){
        super()
     }
    protected initItem(index:number,data:any,itemParam?:any):void {
        let bossKey = data;
        let bg = BaseBitmap.create("public_info_item_bg");
        this.addChild(bg);
        // bg.width = 504;
        // bg.height = 152;
        bg.x = 0;
        bg.y = 13;

        let bossIconBg = BaseBitmap.create("boss_info_icon_bg");
        // this.addChild(bossIconBg);
        bossIconBg.x = 7;
        bossIconBg.y = bg.y + 22; 
        
        let bossIcon = BaseLoadBitmap.create(`boss_icon_${bossKey}`);
        bossIcon.setScale(0.50);
        this.addChild(bossIcon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bossIcon, bossIconBg, [0,0]);
       
        let beizhen = BaseBitmap.create("boss_info_biezhen_icon");
        this.addChild(beizhen);
        beizhen.x = 12;
        beizhen.y = 0

        let title = ComponentMgr.getTextField('11', TextFieldConst.SIZE_22, ColorEnums.white);
        this.addChild(title);
        title.text = LangMger.getlocal(`monster_boss_name_${bossKey}`);
        title.x = bossIcon.x + bossIcon.width * bossIcon.scaleX + 20;
        title.y = bg.y + 32;

        let des = ComponentMgr.getTextField('11', TextFieldConst.SIZE_20, 0xCFDEFF);
        this.addChild(des);
        des.width = 300;// bg.width - bossIcon.width * bossIcon.scaleX - 20;
        des.stroke = 1.5;
        des.lineSpacing = 5;
        if(PlatMgr.checkIsEnLang()){
            des.wordWrap = true
        } else {
            des.wordWrap = false;
        }
        des.text = LangMger.getlocal(`monster_boss_des_${bossKey}`);//bossKey
        des.x = title.x;
        des.y = title.y + title.height + 26;
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